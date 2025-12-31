# SMK Marhas - Role-Based Access Control

## 1. RBAC Overview

Role-Based Access Control membatasi akses berdasarkan **role** admin. Setiap role memiliki **permissions** yang menentukan action apa yang bisa dilakukan.

```
┌─────────────────────────────────────────────────────────────────┐
│                         RBAC MODEL                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     Admin ──has──> Role ──has──> Permissions                    │
│                                                                 │
│     Permission = { resource, actions[] }                        │
│                                                                 │
│     Example:                                                    │
│     admin_perpustakaan ──> [                                    │
│       { resource: 'buku', actions: ['create','read','update']}  │
│       { resource: 'peminjaman', actions: ['create','read'] }    │
│     ]                                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Role Definitions

Diambil dari frontend `types/auth.ts`:

```typescript
export type AdminRole =
  | 'super_admin'
  | 'admin_perpustakaan'
  | 'admin_keuangan'
  | 'admin_absensi'
  | 'admin_jadwal'
  | 'admin_aplikasi';

export type PermissionAction = 
  | 'create' 
  | 'read' 
  | 'update' 
  | 'delete' 
  | 'export' 
  | 'approve' 
  | 'ban';

export type PermissionResource =
  | 'admin'
  | 'user'
  | 'student'
  | 'teacher'
  | 'parent'
  | 'book'
  | 'lending'
  | 'fine'
  | 'payment'
  | 'attendance'
  | 'schedule'
  | 'announcement'
  | 'news'
  | 'achievement'
  | 'notification'
  | 'report'
  | 'audit_log'
  | 'system';

export interface Permission {
  resource: PermissionResource;
  actions: PermissionAction[];
}
```

---

## 3. Default Permissions by Role

### 3.1 Super Admin
```typescript
const SUPER_ADMIN_PERMISSIONS: Permission[] = [
  { resource: 'admin', actions: ['create', 'read', 'update', 'delete', 'ban'] },
  { resource: 'user', actions: ['create', 'read', 'update', 'delete', 'ban'] },
  { resource: 'student', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'teacher', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'parent', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'book', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'lending', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'fine', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'payment', actions: ['create', 'read', 'update', 'delete', 'approve', 'export'] },
  { resource: 'attendance', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'schedule', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'announcement', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'achievement', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'notification', actions: ['create', 'read'] },
  { resource: 'report', actions: ['read', 'export'] },
  { resource: 'audit_log', actions: ['read', 'export'] },
  { resource: 'system', actions: ['read', 'update'] },
];
```

### 3.2 Admin Perpustakaan
```typescript
const PERPUSTAKAAN_PERMISSIONS: Permission[] = [
  { resource: 'book', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'lending', actions: ['create', 'read', 'update', 'export'] },
  { resource: 'fine', actions: ['create', 'read', 'update', 'export'] },
  { resource: 'student', actions: ['read'] },
  { resource: 'teacher', actions: ['read'] },
  { resource: 'report', actions: ['read', 'export'] },
  { resource: 'notification', actions: ['create'] },
];
```

### 3.3 Admin Keuangan
```typescript
const KEUANGAN_PERMISSIONS: Permission[] = [
  { resource: 'payment', actions: ['create', 'read', 'update', 'approve', 'export'] },
  { resource: 'fine', actions: ['read', 'update'] },
  { resource: 'student', actions: ['read'] },
  { resource: 'report', actions: ['read', 'export'] },
  { resource: 'notification', actions: ['create'] },
];
```

### 3.4 Admin Absensi
```typescript
const ABSENSI_PERMISSIONS: Permission[] = [
  { resource: 'attendance', actions: ['create', 'read', 'update', 'export'] },
  { resource: 'student', actions: ['read'] },
  { resource: 'teacher', actions: ['read'] },
  { resource: 'report', actions: ['read', 'export'] },
  { resource: 'notification', actions: ['create'] },
];
```

### 3.5 Admin Jadwal
```typescript
const JADWAL_PERMISSIONS: Permission[] = [
  { resource: 'schedule', actions: ['create', 'read', 'update', 'delete', 'export'] },
  { resource: 'teacher', actions: ['read'] },
  { resource: 'report', actions: ['read', 'export'] },
  { resource: 'notification', actions: ['create'] },
];
```

### 3.6 Admin Aplikasi
```typescript
const APLIKASI_PERMISSIONS: Permission[] = [
  { resource: 'announcement', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'achievement', actions: ['create', 'read', 'update', 'delete'] },
  { resource: 'notification', actions: ['create', 'read'] },
  { resource: 'user', actions: ['read', 'ban'] },
  { resource: 'report', actions: ['read', 'export'] },
];
```

---

## 4. Nest.js Implementation

### 4.1 Roles Decorator

**`src/common/decorators/roles.decorator.ts`**
```typescript
import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '../../types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
```

### 4.2 Permissions Decorator

**`src/common/decorators/permissions.decorator.ts`**
```typescript
import { SetMetadata } from '@nestjs/common';
import { PermissionResource, PermissionAction } from '../../types';

export const PERMISSIONS_KEY = 'permissions';

export interface RequiredPermission {
  resource: PermissionResource;
  action: PermissionAction;
}

export const Permissions = (...permissions: RequiredPermission[]) => 
  SetMetadata(PERMISSIONS_KEY, permissions);

// Shorthand decorators
export const CanCreate = (resource: PermissionResource) => 
  Permissions({ resource, action: 'create' });

export const CanRead = (resource: PermissionResource) => 
  Permissions({ resource, action: 'read' });

export const CanUpdate = (resource: PermissionResource) => 
  Permissions({ resource, action: 'update' });

export const CanDelete = (resource: PermissionResource) => 
  Permissions({ resource, action: 'delete' });

export const CanExport = (resource: PermissionResource) => 
  Permissions({ resource, action: 'export' });
```

### 4.3 Roles Guard

**`src/common/guards/roles.guard.ts`**
```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AdminRole } from '../../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No roles specified = allow all authenticated
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Super admin bypasses all role checks
    if (user.role === 'super_admin') {
      return true;
    }

    // Check if user has required role
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Role '${user.role}' tidak memiliki akses. Diperlukan: ${requiredRoles.join(' atau ')}`
      );
    }

    return true;
  }
}
```

### 4.4 Permissions Guard

**`src/common/guards/permissions.guard.ts`**
```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, RequiredPermission } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<RequiredPermission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Super admin has all permissions
    if (user.role === 'super_admin') {
      return true;
    }

    // Check each required permission
    for (const required of requiredPermissions) {
      const hasPermission = this.checkPermission(user.permissions, required);

      if (!hasPermission) {
        throw new ForbiddenException(
          `Tidak memiliki izin: ${required.action} pada ${required.resource}`
        );
      }
    }

    return true;
  }

  private checkPermission(
    userPermissions: Permission[],
    required: RequiredPermission
  ): boolean {
    const resourcePermission = userPermissions.find(
      p => p.resource === required.resource
    );

    if (!resourcePermission) {
      return false;
    }

    return resourcePermission.actions.includes(required.action);
  }
}
```

---

## 5. Usage Examples

### 5.1 Role-Based Access
```typescript
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  
  @Get()
  @Roles('super_admin')  // Only super admin
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @Roles('super_admin', 'admin_perpustakaan')  // Multiple roles
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }
}
```

### 5.2 Permission-Based Access
```typescript
@Controller('buku')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class BukuController {
  
  @Get()
  @CanRead('book')  // Can read book
  findAll() {
    return this.bukuService.findAll();
  }

  @Post()
  @CanCreate('book')  // Can create book
  create(@Body() dto: CreateBukuDto) {
    return this.bukuService.create(dto);
  }

  @Delete(':id')
  @CanDelete('book')  // Can delete book
  remove(@Param('id') id: string) {
    return this.bukuService.remove(id);
  }
}
```

### 5.3 Combined Guards
```typescript
@Controller('spp')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class SppController {
  
  @Get()
  @Roles('super_admin', 'admin_keuangan')
  @CanRead('payment')
  findAll() { ... }

  @Post(':id/approve')
  @Roles('super_admin', 'admin_keuangan')
  @Permissions({ resource: 'payment', action: 'approve' })
  approve(@Param('id') id: string) { ... }
}
```

---

## 6. Helper Service

**`src/common/services/permission.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { AdminRole, Permission, PermissionResource, PermissionAction } from '../../types';
import { DEFAULT_PERMISSIONS } from '../../config/permissions.config';

@Injectable()
export class PermissionService {
  
  getDefaultPermissions(role: AdminRole): Permission[] {
    return DEFAULT_PERMISSIONS[role] || [];
  }

  hasPermission(
    permissions: Permission[],
    resource: PermissionResource,
    action: PermissionAction
  ): boolean {
    const resourcePerm = permissions.find(p => p.resource === resource);
    return resourcePerm?.actions.includes(action) ?? false;
  }

  canAccess(
    role: AdminRole,
    permissions: Permission[],
    resource: PermissionResource,
    action: PermissionAction
  ): boolean {
    // Super admin always has access
    if (role === 'super_admin') {
      return true;
    }

    return this.hasPermission(permissions, resource, action);
  }
}
```

---

## 7. Frontend Integration

Frontend sudah memiliki `AuthContext` dengan `checkPermission`:

```typescript
// Frontend usage
const { checkPermission } = useAuth();

// Check permission
if (checkPermission('book', 'create')) {
  // Show create button
}
```

Backend returns permissions in JWT payload yang di-decode di frontend.

---

## 8. Permission Matrix

| Resource | Action | super | perpus | keuangan | absensi | jadwal | aplikasi |
|----------|--------|:-----:|:------:|:--------:|:-------:|:------:|:--------:|
| admin | CRUD | ✅ | - | - | - | - | - |
| student | CRUD | ✅ | R | R | R | R | R |
| teacher | CRUD | ✅ | R | R | R | R | - |
| book | CRUD | ✅ | ✅ | - | - | - | - |
| lending | CRUD | ✅ | CRU | - | - | - | - |
| fine | CRUD | ✅ | CRU | RU | - | - | - |
| payment | CRUD+A | ✅ | - | CRUA | - | - | - |
| attendance | CRUD | ✅ | - | - | ✅ | - | - |
| schedule | CRUD | ✅ | - | - | - | ✅ | R |
| announcement | CRUD | ✅ | - | - | - | - | ✅ |
| news | CRUD | ✅ | - | - | - | - | ✅ |
| audit_log | R | ✅ | - | - | - | - | - |

**Legend:** C=Create, R=Read, U=Update, D=Delete, A=Approve

---

## Related Documentation

- [JWT Implementation](./jwt-implementation.md)
- [Security Model](../01-architecture/security-model.md)
- [RLS Policies](../02-database/rls-policies.md)
