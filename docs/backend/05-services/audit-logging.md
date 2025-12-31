# SMK Marhas - Audit Logging Service

## 1. Overview

Audit logging mencatat semua perubahan data untuk:
- Tracking perubahan
- Compliance
- Debugging
- Security monitoring

---

## 2. Audit Log Schema

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id),
    admin_name VARCHAR(255),
    admin_role admin_role,
    action VARCHAR(50) NOT NULL,        -- create, read, update, delete, login, logout, export
    resource VARCHAR(50) NOT NULL,       -- siswa, guru, buku, spp, etc.
    resource_id UUID,
    old_data JSONB,                      -- Data sebelum perubahan
    new_data JSONB,                      -- Data setelah perubahan
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_id VARCHAR(50),              -- Untuk tracing
    metadata JSONB,                      -- Extra info
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 3. Audit Service Implementation

**`src/modules/audit/audit.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

export interface AuditLogEntry {
  adminId: string;
  adminName?: string;
  adminRole?: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  oldData?: any;
  newData?: any;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  metadata?: any;
}

export type AuditAction = 
  | 'create' 
  | 'read' 
  | 'update' 
  | 'delete' 
  | 'login' 
  | 'logout' 
  | 'login_failed'
  | 'export'
  | 'import'
  | 'approve'
  | 'reject'
  | 'ban'
  | 'unban';

@Injectable()
export class AuditService {
  constructor(private supabase: SupabaseService) {}

  /**
   * Log an audit event
   */
  async log(entry: AuditLogEntry): Promise<void> {
    try {
      await this.supabase.client.from('audit_logs').insert({
        admin_id: entry.adminId,
        admin_name: entry.adminName,
        admin_role: entry.adminRole,
        action: entry.action,
        resource: entry.resource,
        resource_id: entry.resourceId,
        old_data: entry.oldData ? this.sanitize(entry.oldData) : null,
        new_data: entry.newData ? this.sanitize(entry.newData) : null,
        ip_address: entry.ipAddress,
        user_agent: entry.userAgent,
        request_id: entry.requestId,
        metadata: entry.metadata,
      });
    } catch (error) {
      // Log to console but don't throw - audit shouldn't break main flow
      console.error('Audit log failed:', error);
    }
  }

  /**
   * Get audit logs with filters
   */
  async findAll(options: {
    adminId?: string;
    action?: string;
    resource?: string;
    resourceId?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 50 } = options;
    const offset = (page - 1) * limit;

    let query = this.supabase.client
      .from('audit_logs')
      .select('*', { count: 'exact' });

    if (options.adminId) {
      query = query.eq('admin_id', options.adminId);
    }
    if (options.action) {
      query = query.eq('action', options.action);
    }
    if (options.resource) {
      query = query.eq('resource', options.resource);
    }
    if (options.resourceId) {
      query = query.eq('resource_id', options.resourceId);
    }
    if (options.dateFrom) {
      query = query.gte('created_at', options.dateFrom);
    }
    if (options.dateTo) {
      query = query.lte('created_at', options.dateTo);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data,
      meta: {
        total: count || 0,
        page,
        limit,
      },
    };
  }

  /**
   * Get logs for specific resource
   */
  async getResourceHistory(resource: string, resourceId: string) {
    const { data, error } = await this.supabase.client
      .from('audit_logs')
      .select('*')
      .eq('resource', resource)
      .eq('resource_id', resourceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Get admin activity summary
   */
  async getAdminActivity(adminId: string, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data, error } = await this.supabase.client
      .from('audit_logs')
      .select('action, resource, created_at')
      .eq('admin_id', adminId)
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by action
    const summary: Record<string, number> = {};
    data.forEach(log => {
      const key = `${log.action}_${log.resource}`;
      summary[key] = (summary[key] || 0) + 1;
    });

    return {
      totalActions: data.length,
      recentActions: data.slice(0, 10),
      summary,
    };
  }

  /**
   * Remove sensitive data before logging
   */
  private sanitize(data: any): any {
    if (!data) return data;

    const sensitiveFields = ['password', 'token', 'secret', 'refresh_token'];
    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * Calculate diff between old and new data
   */
  getDiff(oldData: any, newData: any): any {
    if (!oldData || !newData) return null;

    const diff: any = {};
    for (const key in newData) {
      if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
        diff[key] = {
          old: oldData[key],
          new: newData[key],
        };
      }
    }
    return Object.keys(diff).length > 0 ? diff : null;
  }
}
```

---

## 4. Audit Interceptor (Auto-logging)

**`src/common/interceptors/audit.interceptor.ts`**
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from '../../modules/audit/audit.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private audit: AuditService,
    private reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip, headers } = request;

    // Skip GET requests unless explicitly marked
    if (method === 'GET') {
      return next.handle();
    }

    // Get resource info from metadata
    const resource = this.reflector.get<string>('audit_resource', context.getHandler()) 
      || this.extractResource(url);
    
    const action = this.methodToAction(method);

    return next.handle().pipe(
      tap(response => {
        this.audit.log({
          adminId: user?.id,
          adminName: user?.name,
          adminRole: user?.role,
          action,
          resource,
          resourceId: request.params?.id,
          newData: body,
          ipAddress: ip,
          userAgent: headers['user-agent'],
          requestId: headers['x-request-id'],
        });
      }),
    );
  }

  private methodToAction(method: string): string {
    switch (method) {
      case 'POST': return 'create';
      case 'PUT':
      case 'PATCH': return 'update';
      case 'DELETE': return 'delete';
      default: return method.toLowerCase();
    }
  }

  private extractResource(url: string): string {
    const parts = url.split('/').filter(Boolean);
    return parts[1] || 'unknown'; // /api/siswa/123 -> siswa
  }
}
```

---

## 5. Usage in Services

```typescript
// In any service
@Injectable()
export class SiswaService {
  constructor(private audit: AuditService) {}

  async create(dto: CreateSiswaDto, adminId: string) {
    const siswa = await this.supabase.client
      .from('siswa')
      .insert(dto)
      .select()
      .single();

    // Log the creation
    await this.audit.log({
      adminId,
      action: 'create',
      resource: 'siswa',
      resourceId: siswa.id,
      newData: siswa,
    });

    return siswa;
  }

  async update(id: string, dto: UpdateSiswaDto, adminId: string) {
    // Get old data first
    const oldData = await this.findOne(id);
    
    const newData = await this.supabase.client
      .from('siswa')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    // Log with diff
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
}
```

---

## 6. Audit Log Viewer API

```typescript
@Controller('admin/audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('super_admin')
export class AuditController {
  constructor(private audit: AuditService) {}

  @Get()
  findAll(@Query() query: AuditLogQueryDto) {
    return this.audit.findAll(query);
  }

  @Get('resource/:resource/:id')
  getResourceHistory(
    @Param('resource') resource: string,
    @Param('id') id: string,
  ) {
    return this.audit.getResourceHistory(resource, id);
  }

  @Get('admin/:adminId')
  getAdminActivity(@Param('adminId') adminId: string) {
    return this.audit.getAdminActivity(adminId);
  }
}
```

---

## 7. What to Log

| Event | Resource | Action | Log Data |
|-------|----------|--------|----------|
| Login success | auth | login | email, device |
| Login failed | auth | login_failed | email, reason |
| Logout | auth | logout | - |
| Create record | * | create | new_data |
| Update record | * | update | old_data, new_data |
| Delete record | * | delete | old_data |
| Export data | * | export | filters, count |
| Import data | * | import | file, count |
| Approve | spp, dispensasi | approve | - |
| Ban user | admin | ban | reason |

---

## 8. Retention Policy

```sql
-- Delete logs older than 1 year
DELETE FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '1 year';

-- Archive to separate table
INSERT INTO audit_logs_archive
SELECT * FROM audit_logs
WHERE created_at < NOW() - INTERVAL '3 months';
```

---

## Related Documentation

- [Security Model](../01-architecture/security-model.md)
- [Admin API](../04-api-endpoints/aplikasi-admin-api.md)
