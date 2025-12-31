# SMK Marhas - Backend Folder Structure

## 1. Complete Project Structure

```
backend/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module
│   │
│   ├── common/                          # Shared utilities
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts       # @Roles('super_admin')
│   │   │   ├── public.decorator.ts      # @Public() skip auth
│   │   │   └── current-user.decorator.ts# @CurrentUser()
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts        # JWT validation
│   │   │   ├── roles.guard.ts           # RBAC check
│   │   │   └── throttler.guard.ts       # Rate limiting
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts # Error formatting
│   │   │   └── validation.filter.ts     # Validation errors
│   │   ├── interceptors/
│   │   │   ├── transform.interceptor.ts # Response formatting
│   │   │   ├── logging.interceptor.ts   # Request logging
│   │   │   └── timeout.interceptor.ts   # Request timeout
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts       # DTO validation
│   │   └── utils/
│   │       ├── pagination.util.ts       # Pagination helper
│   │       ├── hash.util.ts             # Password hashing
│   │       └── date.util.ts             # Date formatting
│   │
│   ├── config/                          # Configuration
│   │   ├── app.config.ts                # App settings
│   │   ├── database.config.ts           # Supabase config
│   │   ├── jwt.config.ts                # JWT settings
│   │   └── env.validation.ts            # Env schema validation
│   │
│   ├── modules/                         # Feature modules
│   │   ├── auth/                        # Authentication
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── forgot-password.dto.ts
│   │   │
│   │   ├── admin/                       # Admin management
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.service.ts
│   │   │   └── dto/
│   │   │       ├── create-admin.dto.ts
│   │   │       └── update-admin.dto.ts
│   │   │
│   │   ├── siswa/                       # Student management
│   │   │   ├── siswa.module.ts
│   │   │   ├── siswa.controller.ts
│   │   │   ├── siswa.service.ts
│   │   │   └── dto/
│   │   │       ├── create-siswa.dto.ts
│   │   │       ├── update-siswa.dto.ts
│   │   │       └── filter-siswa.dto.ts
│   │   │
│   │   ├── guru/                        # Teacher management
│   │   │   ├── guru.module.ts
│   │   │   ├── guru.controller.ts
│   │   │   ├── guru.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── kelas/                       # Class management
│   │   │   ├── kelas.module.ts
│   │   │   ├── kelas.controller.ts
│   │   │   ├── kelas.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── orangtua/                    # Parent management
│   │   │   ├── orangtua.module.ts
│   │   │   ├── orangtua.controller.ts
│   │   │   ├── orangtua.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── perpustakaan/                # Library module
│   │   │   ├── perpustakaan.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── buku.controller.ts
│   │   │   │   ├── peminjaman.controller.ts
│   │   │   │   └── denda.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── buku.service.ts
│   │   │   │   ├── peminjaman.service.ts
│   │   │   │   └── denda.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── keuangan/                    # Finance module
│   │   │   ├── keuangan.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── spp.controller.ts
│   │   │   │   ├── transaksi.controller.ts
│   │   │   │   └── laporan.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── absensi/                     # Attendance module
│   │   │   ├── absensi.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── session.controller.ts
│   │   │   │   ├── record.controller.ts
│   │   │   │   └── dispensasi.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── jadwal/                      # Schedule module
│   │   │   ├── jadwal.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── jadwal.controller.ts
│   │   │   │   ├── kalender.controller.ts
│   │   │   │   └── substitusi.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── aplikasi/                    # App content module
│   │   │   ├── aplikasi.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── pengumuman.controller.ts
│   │   │   │   ├── berita.controller.ts
│   │   │   │   ├── prestasi.controller.ts
│   │   │   │   └── moderasi.controller.ts
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── notification/                # Notifications
│   │   │   ├── notification.module.ts
│   │   │   ├── notification.controller.ts
│   │   │   ├── notification.service.ts
│   │   │   └── notification.gateway.ts  # WebSocket
│   │   │
│   │   ├── upload/                      # File uploads
│   │   │   ├── upload.module.ts
│   │   │   ├── upload.controller.ts
│   │   │   └── upload.service.ts
│   │   │
│   │   ├── audit/                       # Audit logging
│   │   │   ├── audit.module.ts
│   │   │   ├── audit.controller.ts
│   │   │   └── audit.service.ts
│   │   │
│   │   └── report/                      # Reports & exports
│   │       ├── report.module.ts
│   │       ├── report.controller.ts
│   │       └── report.service.ts
│   │
│   └── database/                        # Database layer
│       ├── supabase.module.ts           # Supabase provider
│       ├── supabase.service.ts          # Supabase client
│       └── migrations/                  # SQL migrations
│           ├── 001_initial_schema.sql
│           ├── 002_add_indexes.sql
│           └── 003_add_rls_policies.sql
│
├── test/                                # Tests
│   ├── unit/
│   │   ├── auth.service.spec.ts
│   │   ├── siswa.service.spec.ts
│   │   └── ...
│   └── e2e/
│       ├── auth.e2e-spec.ts
│       └── ...
│
├── .env.example                         # Environment template
├── .env                                 # Local environment (gitignore)
├── .env.production                      # Production env
├── nest-cli.json                        # Nest CLI config
├── tsconfig.json                        # TypeScript config
├── package.json                         # Dependencies
└── README.md                            # Documentation
```

---

## 2. Module Anatomy

Setiap module mengikuti struktur standar:

```
modules/siswa/
├── siswa.module.ts          # Module definition
├── siswa.controller.ts      # HTTP endpoints
├── siswa.service.ts         # Business logic
├── entities/                # (Optional) Entity definitions
│   └── siswa.entity.ts
├── dto/                     # Data Transfer Objects
│   ├── create-siswa.dto.ts  # Create request body
│   ├── update-siswa.dto.ts  # Update request body
│   └── filter-siswa.dto.ts  # Query parameters
└── interfaces/              # TypeScript interfaces
    └── siswa.interface.ts
```

---

## 3. Key File Examples

### 3.1 Module File (`siswa.module.ts`)
```typescript
import { Module } from '@nestjs/common';
import { SiswaController } from './siswa.controller';
import { SiswaService } from './siswa.service';
import { SupabaseModule } from '../../database/supabase.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [SupabaseModule, AuditModule],
  controllers: [SiswaController],
  providers: [SiswaService],
  exports: [SiswaService],
})
export class SiswaModule {}
```

### 3.2 Controller File (`siswa.controller.ts`)
```typescript
import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { CreateSiswaDto, FilterSiswaDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('siswa')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}

  @Get()
  @Roles('super_admin', 'admin_absensi', 'admin_keuangan')
  findAll(@Query() filter: FilterSiswaDto) {
    return this.siswaService.findAll(filter);
  }

  @Get(':id')
  @Roles('super_admin', 'admin_absensi')
  findOne(@Param('id') id: string) {
    return this.siswaService.findOne(id);
  }

  @Post()
  @Roles('super_admin')
  create(@Body() dto: CreateSiswaDto) {
    return this.siswaService.create(dto);
  }
}
```

### 3.3 Service File (`siswa.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateSiswaDto, FilterSiswaDto } from './dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class SiswaService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly audit: AuditService,
  ) {}

  async findAll(filter: FilterSiswaDto) {
    let query = this.supabase.client
      .from('siswa')
      .select('*, kelas(name)');

    if (filter.search) {
      query = query.or(`name.ilike.%${filter.search}%,nisn.ilike.%${filter.search}%`);
    }

    if (filter.kelasId) {
      query = query.eq('kelas_id', filter.kelasId);
    }

    const { data, error, count } = await query
      .range(filter.offset, filter.offset + filter.limit - 1)
      .order('name');

    if (error) throw error;

    return {
      data,
      meta: {
        total: count,
        page: filter.page,
        limit: filter.limit,
      },
    };
  }

  async create(dto: CreateSiswaDto) {
    const { data, error } = await this.supabase.client
      .from('siswa')
      .insert(dto)
      .select()
      .single();

    if (error) throw error;

    await this.audit.log('create', 'siswa', data.id, null, data);

    return data;
  }
}
```

### 3.4 DTO File (`create-siswa.dto.ts`)
```typescript
import { IsString, IsNotEmpty, IsOptional, IsEnum, Length, IsEmail } from 'class-validator';

export class CreateSiswaDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'NISN harus 10 digit' })
  nisn: string;

  @IsString()
  @IsNotEmpty()
  nis: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['L', 'P'])
  gender: 'L' | 'P';

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  kelasId: string;

  @IsEnum(['PPLG', 'TMS', 'TKJ'])
  major: 'PPLG' | 'TMS' | 'TKJ';
}
```

---

## 4. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Folder | lowercase-kebab | `perpustakaan/` |
| Module | PascalCase | `PerpustakaanModule` |
| Controller | PascalCase | `BukuController` |
| Service | PascalCase | `BukuService` |
| DTO | PascalCase | `CreateBukuDto` |
| File | lowercase-kebab | `buku.controller.ts` |
| Database Table | lowercase_snake | `siswa`, `audit_logs` |
| API Route | lowercase-kebab | `/api/perpustakaan/buku` |

---

## 5. Related Documentation

- [Design Patterns](./design-patterns.md)
- [Add New Module Tutorial](../08-tutorials/add-new-module.md)
