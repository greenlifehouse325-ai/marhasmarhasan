# SMK Marhas - Tutorial: Adding New Module

## 1. Overview

Tutorial ini menjelaskan cara menambahkan module baru ke backend Nest.js.

**Contoh:** Menambahkan module `Ekstrakurikuler`

---

## 2. Generate Module Structure

### Using Nest CLI
```bash
# Generate module
nest g module modules/ekstrakurikuler

# Generate controller
nest g controller modules/ekstrakurikuler --no-spec

# Generate service
nest g service modules/ekstrakurikuler --no-spec
```

### Manual Structure
```
src/modules/ekstrakurikuler/
├── dto/
│   ├── create-ekstrakurikuler.dto.ts
│   ├── update-ekstrakurikuler.dto.ts
│   └── index.ts
├── entities/
│   └── ekstrakurikuler.entity.ts
├── ekstrakurikuler.controller.ts
├── ekstrakurikuler.service.ts
└── ekstrakurikuler.module.ts
```

---

## 3. Define Entity

**`src/modules/ekstrakurikuler/entities/ekstrakurikuler.entity.ts`**
```typescript
export interface Ekstrakurikuler {
  id: string;
  name: string;
  description: string;
  schedule: string;
  pembina: {
    id: string;
    name: string;
  };
  kategori: 'olahraga' | 'seni' | 'akademik' | 'teknologi';
  maxMembers: number;
  currentMembers: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EkstrakurikulerMember {
  id: string;
  ekstrakurikulerId: string;
  siswaId: string;
  siswa: {
    id: string;
    name: string;
    class: string;
  };
  joinedAt: Date;
  status: 'active' | 'inactive';
}
```

---

## 4. Create DTOs

**`src/modules/ekstrakurikuler/dto/create-ekstrakurikuler.dto.ts`**
```typescript
import { IsString, IsNumber, IsEnum, IsOptional, IsUUID, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEkstrakurikulerDto {
  @ApiProperty({ example: 'Futsal' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Senin, 15:00 - 17:00' })
  @IsString()
  schedule: string;

  @ApiProperty()
  @IsUUID()
  pembinaId: string;

  @ApiProperty({ enum: ['olahraga', 'seni', 'akademik', 'teknologi'] })
  @IsEnum(['olahraga', 'seni', 'akademik', 'teknologi'])
  kategori: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(1)
  @Max(100)
  maxMembers: number;
}
```

**`src/modules/ekstrakurikuler/dto/update-ekstrakurikuler.dto.ts`**
```typescript
import { PartialType } from '@nestjs/swagger';
import { CreateEkstrakurikulerDto } from './create-ekstrakurikuler.dto';

export class UpdateEkstrakurikulerDto extends PartialType(CreateEkstrakurikulerDto) {}
```

---

## 5. Implement Service

**`src/modules/ekstrakurikuler/ekstrakurikuler.service.ts`**
```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { AuditService } from '../audit/audit.service';
import { CreateEkstrakurikulerDto, UpdateEkstrakurikulerDto } from './dto';
import { Ekstrakurikuler } from './entities/ekstrakurikuler.entity';

@Injectable()
export class EkstrakurikulerService {
  private readonly tableName = 'ekstrakurikuler';

  constructor(
    private supabase: SupabaseService,
    private audit: AuditService,
  ) {}

  async findAll(options: {
    page?: number;
    limit?: number;
    kategori?: string;
    isActive?: boolean;
  } = {}) {
    const { page = 1, limit = 10, kategori, isActive } = options;
    const offset = (page - 1) * limit;

    let query = this.supabase.client
      .from(this.tableName)
      .select('*, pembina:guru(id, name)', { count: 'exact' });

    if (kategori) query = query.eq('kategori', kategori);
    if (isActive !== undefined) query = query.eq('is_active', isActive);

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
      },
    };
  }

  async findOne(id: string): Promise<Ekstrakurikuler> {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .select('*, pembina:guru(id, name)')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Ekstrakurikuler dengan ID ${id} tidak ditemukan`);
    }

    return data;
  }

  async create(dto: CreateEkstrakurikulerDto, adminId: string): Promise<Ekstrakurikuler> {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .insert({
        name: dto.name,
        description: dto.description,
        schedule: dto.schedule,
        pembina_id: dto.pembinaId,
        kategori: dto.kategori,
        max_members: dto.maxMembers,
        current_members: 0,
        is_active: true,
      })
      .select('*, pembina:guru(id, name)')
      .single();

    if (error) throw error;

    await this.audit.log({
      adminId,
      action: 'create',
      resource: 'ekstrakurikuler',
      resourceId: data.id,
      newData: data,
    });

    return data;
  }

  async update(id: string, dto: UpdateEkstrakurikulerDto, adminId: string): Promise<Ekstrakurikuler> {
    const oldData = await this.findOne(id);

    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .update({
        ...(dto.name && { name: dto.name }),
        ...(dto.description && { description: dto.description }),
        ...(dto.schedule && { schedule: dto.schedule }),
        ...(dto.pembinaId && { pembina_id: dto.pembinaId }),
        ...(dto.kategori && { kategori: dto.kategori }),
        ...(dto.maxMembers && { max_members: dto.maxMembers }),
      })
      .eq('id', id)
      .select('*, pembina:guru(id, name)')
      .single();

    if (error) throw error;

    await this.audit.log({
      adminId,
      action: 'update',
      resource: 'ekstrakurikuler',
      resourceId: id,
      oldData,
      newData: data,
    });

    return data;
  }

  async delete(id: string, adminId: string): Promise<void> {
    const oldData = await this.findOne(id);

    const { error } = await this.supabase.client
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;

    await this.audit.log({
      adminId,
      action: 'delete',
      resource: 'ekstrakurikuler',
      resourceId: id,
      oldData,
    });
  }

  // Member management
  async addMember(ekskurId: string, siswaId: string, adminId: string) {
    const ekskur = await this.findOne(ekskurId);

    if (ekskur.currentMembers >= ekskur.maxMembers) {
      throw new BadRequestException('Kuota anggota sudah penuh');
    }

    const { data, error } = await this.supabase.client
      .from('ekstrakurikuler_members')
      .insert({
        ekstrakurikuler_id: ekskurId,
        siswa_id: siswaId,
        status: 'active',
      })
      .select('*, siswa(id, name, kelas_id)')
      .single();

    if (error) throw error;

    // Update member count
    await this.supabase.client
      .from(this.tableName)
      .update({ current_members: ekskur.currentMembers + 1 })
      .eq('id', ekskurId);

    return data;
  }

  async removeMember(ekskurId: string, siswaId: string) {
    const { error } = await this.supabase.client
      .from('ekstrakurikuler_members')
      .delete()
      .eq('ekstrakurikuler_id', ekskurId)
      .eq('siswa_id', siswaId);

    if (error) throw error;

    // Update member count
    const ekskur = await this.findOne(ekskurId);
    await this.supabase.client
      .from(this.tableName)
      .update({ current_members: Math.max(0, ekskur.currentMembers - 1) })
      .eq('id', ekskurId);
  }

  async getMembers(ekskurId: string) {
    const { data, error } = await this.supabase.client
      .from('ekstrakurikuler_members')
      .select('*, siswa(id, name, kelas(name))')
      .eq('ekstrakurikuler_id', ekskurId)
      .order('joined_at');

    if (error) throw error;
    return data;
  }
}
```

---

## 6. Implement Controller

**`src/modules/ekstrakurikuler/ekstrakurikuler.controller.ts`**
```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EkstrakurikulerService } from './ekstrakurikuler.service';
import { CreateEkstrakurikulerDto, UpdateEkstrakurikulerDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('ekstrakurikuler')
@ApiBearerAuth()
@Controller('ekstrakurikuler')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EkstrakurikulerController {
  constructor(private readonly service: EkstrakurikulerService) {}

  @Get()
  @ApiOperation({ summary: 'List all ekstrakurikuler' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('kategori') kategori?: string,
  ) {
    return this.service.findAll({ page, limit, kategori });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ekstrakurikuler by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new ekstrakurikuler' })
  @Roles('super_admin')
  create(
    @Body() dto: CreateEkstrakurikulerDto,
    @CurrentUser() user: any,
  ) {
    return this.service.create(dto, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update ekstrakurikuler' })
  @Roles('super_admin')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEkstrakurikulerDto,
    @CurrentUser() user: any,
  ) {
    return this.service.update(id, dto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete ekstrakurikuler' })
  @Roles('super_admin')
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.delete(id, user.id);
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Get ekstrakurikuler members' })
  getMembers(@Param('id') id: string) {
    return this.service.getMembers(id);
  }

  @Post(':id/members/:siswaId')
  @ApiOperation({ summary: 'Add member to ekstrakurikuler' })
  @Roles('super_admin')
  addMember(
    @Param('id') id: string,
    @Param('siswaId') siswaId: string,
    @CurrentUser() user: any,
  ) {
    return this.service.addMember(id, siswaId, user.id);
  }

  @Delete(':id/members/:siswaId')
  @ApiOperation({ summary: 'Remove member from ekstrakurikuler' })
  @Roles('super_admin')
  removeMember(
    @Param('id') id: string,
    @Param('siswaId') siswaId: string,
  ) {
    return this.service.removeMember(id, siswaId);
  }
}
```

---

## 7. Create Module

**`src/modules/ekstrakurikuler/ekstrakurikuler.module.ts`**
```typescript
import { Module } from '@nestjs/common';
import { EkstrakurikulerController } from './ekstrakurikuler.controller';
import { EkstrakurikulerService } from './ekstrakurikuler.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [EkstrakurikulerController],
  providers: [EkstrakurikulerService],
  exports: [EkstrakurikulerService],
})
export class EkstrakurikulerModule {}
```

---

## 8. Register in App Module

**`src/app.module.ts`**
```typescript
import { EkstrakurikulerModule } from './modules/ekstrakurikuler/ekstrakurikuler.module';

@Module({
  imports: [
    // ... other modules
    EkstrakurikulerModule,
  ],
})
export class AppModule {}
```

---

## 9. Database Migration

```sql
-- Add ekstrakurikuler tables
CREATE TABLE ekstrakurikuler (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    schedule VARCHAR(255),
    pembina_id UUID REFERENCES guru(id),
    kategori VARCHAR(20) CHECK (kategori IN ('olahraga', 'seni', 'akademik', 'teknologi')),
    max_members INT DEFAULT 30,
    current_members INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ekstrakurikuler_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ekstrakurikuler_id UUID REFERENCES ekstrakurikuler(id) ON DELETE CASCADE,
    siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active',
    UNIQUE(ekstrakurikuler_id, siswa_id)
);

CREATE INDEX idx_ekskur_members ON ekstrakurikuler_members(ekstrakurikuler_id);
```

---

## 10. Test the Module

```bash
# List ekstrakurikuler
curl http://localhost:4000/v1/ekstrakurikuler

# Create (with auth header)
curl -X POST http://localhost:4000/v1/ekstrakurikuler \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Futsal", "schedule": "Senin, 15:00", "pembinaId": "...", "kategori": "olahraga", "maxMembers": 25}'
```

---

## Related Documentation

- [Backend Setup](./backend-setup.md)
- [Base Service](../05-services/base-service.md)
