# SMK Marhas - Base Service Implementation

## 1. Base Service Pattern

Semua service mengikuti pattern yang sama untuk konsistensi.

---

## 2. Generic Base Service

**`src/common/services/base.service.ts`**
```typescript
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export abstract class BaseService<TEntity, TCreateDto, TUpdateDto> {
  protected abstract tableName: string;
  protected abstract entityName: string;

  constructor(protected supabase: SupabaseService) {}

  /**
   * Find all with pagination
   */
  async findAll(options: PaginationOptions = {}): Promise<PaginatedResult<TEntity>> {
    const page = options.page || 1;
    const limit = Math.min(options.limit || 10, 100);
    const offset = (page - 1) * limit;
    const sortBy = options.sortBy || 'created_at';
    const sortOrder = options.sortOrder || 'desc';

    // Get total count
    const { count } = await this.supabase.client
      .from(this.tableName)
      .select('*', { count: 'exact', head: true });

    // Get paginated data
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .select('*')
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: data as TEntity[],
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Find one by ID
   */
  async findOne(id: string): Promise<TEntity> {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`${this.entityName} dengan ID ${id} tidak ditemukan`);
    }

    return data as TEntity;
  }

  /**
   * Create new entity
   */
  async create(dto: TCreateDto): Promise<TEntity> {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .insert(this.toDbFormat(dto))
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Data sudah ada');
      }
      throw error;
    }

    return data as TEntity;
  }

  /**
   * Update entity
   */
  async update(id: string, dto: TUpdateDto): Promise<TEntity> {
    // Check exists
    await this.findOne(id);

    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .update(this.toDbFormat(dto))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as TEntity;
  }

  /**
   * Delete entity
   */
  async delete(id: string): Promise<void> {
    // Check exists
    await this.findOne(id);

    const { error } = await this.supabase.client
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Soft delete
   */
  async softDelete(id: string): Promise<void> {
    await this.update(id, { status: 'deleted' } as any);
  }

  /**
   * Find by field
   */
  async findByField(field: string, value: any): Promise<TEntity[]> {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .select('*')
      .eq(field, value);

    if (error) throw error;

    return data as TEntity[];
  }

  /**
   * Search
   */
  async search(searchField: string, query: string, options?: PaginationOptions): Promise<PaginatedResult<TEntity>> {
    const page = options?.page || 1;
    const limit = Math.min(options?.limit || 10, 100);
    const offset = (page - 1) * limit;

    const { data, error, count } = await this.supabase.client
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .ilike(searchField, `%${query}%`)
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: data as TEntity[],
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Convert DTO to database format (camelCase to snake_case)
   */
  protected toDbFormat(dto: any): any {
    const result: any = {};
    for (const key in dto) {
      if (dto[key] !== undefined) {
        result[this.camelToSnake(key)] = dto[key];
      }
    }
    return result;
  }

  private camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}
```

---

## 3. Example Implementation

### Siswa Service
```typescript
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { SupabaseService } from '../../database/supabase.service';
import { CreateSiswaDto, UpdateSiswaDto } from './dto';
import { Siswa } from './entities/siswa.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class SiswaService extends BaseService<Siswa, CreateSiswaDto, UpdateSiswaDto> {
  protected tableName = 'siswa';
  protected entityName = 'Siswa';

  constructor(
    protected supabase: SupabaseService,
    private audit: AuditService,
  ) {
    super(supabase);
  }

  // Override findAll with relations
  async findAll(options: any = {}) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      kelasId, 
      jurusan, 
      status = 'active' 
    } = options;

    const offset = (page - 1) * limit;

    let query = this.supabase.client
      .from(this.tableName)
      .select('*, kelas(id, name)', { count: 'exact' });

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,nisn.ilike.%${search}%,nis.ilike.%${search}%`);
    }
    if (kelasId) {
      query = query.eq('kelas_id', kelasId);
    }
    if (jurusan) {
      query = query.eq('jurusan', jurusan);
    }
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order('name')
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1,
      },
    };
  }

  // Override create with audit
  async create(dto: CreateSiswaDto, adminId: string) {
    const data = await super.create(dto);
    
    await this.audit.log({
      adminId,
      action: 'create',
      resource: 'siswa',
      resourceId: data.id,
      newData: data,
    });

    return data;
  }

  // Override update with audit
  async update(id: string, dto: UpdateSiswaDto, adminId: string) {
    const oldData = await this.findOne(id);
    const newData = await super.update(id, dto);

    await this.audit.log({
      adminId,
      action: 'update',
      resource: 'siswa',
      resourceId: id,
      oldData,
      newData,
    });

    return newData;
  }

  // Custom methods
  async findByKelas(kelasId: string) {
    return this.findByField('kelas_id', kelasId);
  }

  async countByJurusan() {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .select('jurusan')
      .eq('status', 'active');

    if (error) throw error;

    const counts: Record<string, number> = {};
    data.forEach(item => {
      counts[item.jurusan] = (counts[item.jurusan] || 0) + 1;
    });

    return counts;
  }
}
```

---

## 4. Service Response Format

### Success Response
```typescript
// Single item
{
  success: true,
  data: { id: 'uuid', name: 'Ahmad', ... }
}

// List with pagination
{
  success: true,
  data: [{ id: 'uuid', name: 'Ahmad' }, ...],
  meta: {
    total: 100,
    page: 1,
    limit: 10,
    totalPages: 10,
    hasNext: true,
    hasPrev: false
  }
}

// Action result
{
  success: true,
  message: 'Data berhasil disimpan'
}
```

### Error Response
```typescript
{
  success: false,
  error: {
    code: 'NOT_FOUND',
    message: 'Siswa tidak ditemukan'
  }
}
```

---

## 5. Common Service Methods

| Method | Description |
|--------|-------------|
| `findAll(options)` | Get paginated list |
| `findOne(id)` | Get by ID |
| `create(dto)` | Create new |
| `update(id, dto)` | Update existing |
| `delete(id)` | Hard delete |
| `softDelete(id)` | Soft delete |
| `findByField(field, value)` | Find by field |
| `search(field, query)` | Search |
| `count(filter)` | Count records |
| `exists(id)` | Check if exists |

---

## Related Documentation

- [Audit Logging Service](./audit-logging.md)
- [File Upload Service](./file-upload.md)
- [Notification Service](./notification-service.md)
