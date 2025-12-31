# SMK Marhas - Security Model

## 1. Security Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                          │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Network        │ HTTPS, CORS, Rate Limiting          │
├──────────────────────────┼──────────────────────────────────────┤
│  Layer 2: Authentication │ JWT, Refresh Token, Device Approval │
├──────────────────────────┼──────────────────────────────────────┤
│  Layer 3: Authorization  │ RBAC, Permission Check              │
├──────────────────────────┼──────────────────────────────────────┤
│  Layer 4: Database       │ RLS Policies, Input Validation      │
├──────────────────────────┼──────────────────────────────────────┤
│  Layer 5: Audit          │ Activity Logging, Alert System      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication Flow

### 2.1 Login Flow
```
User                    Backend                     Supabase
  │                        │                           │
  │  POST /auth/login      │                           │
  │  {email, password}     │                           │
  ├───────────────────────>│                           │
  │                        │  Validate credentials     │
  │                        ├──────────────────────────>│
  │                        │                           │
  │                        │  Check device fingerprint │
  │                        │  (Known device?)          │
  │                        │                           │
  │                        │  [New Device?]            │
  │                        │  ──> Require OTP/Approval │
  │                        │                           │
  │                        │  Generate JWT + Refresh   │
  │                        │                           │
  │  { accessToken,        │                           │
  │    refreshToken,       │                           │
  │    user }              │                           │
  │<───────────────────────│                           │
```

### 2.2 Token Structure

**Access Token (JWT):**
```json
{
  "sub": "admin-uuid",          // Admin ID
  "email": "admin@marhas.sch.id",
  "role": "super_admin",
  "permissions": ["admin:*", "siswa:read"],
  "deviceId": "device-uuid",
  "iat": 1704067200,            // Issued at
  "exp": 1704070800             // Expires in 1 hour
}
```

**Refresh Token:**
- Stored in `sessions` table
- Valid for 7 days
- Single use (rotated on refresh)

---

## 3. Role-Based Access Control (RBAC)

### 3.1 Role Hierarchy

```typescript
// types/auth.ts - Diambil dari frontend
export type AdminRole =
  | 'super_admin'
  | 'admin_perpustakaan'
  | 'admin_keuangan'
  | 'admin_absensi'
  | 'admin_jadwal'
  | 'admin_aplikasi';
```

### 3.2 Permission Matrix

| Resource | super_admin | perpustakaan | keuangan | absensi | jadwal | aplikasi |
|----------|:-----------:|:------------:|:--------:|:-------:|:------:|:--------:|
| admin | CRUD | - | - | - | - | - |
| siswa | CRUD | R | R | R | R | R |
| guru | CRUD | R | R | R | R | R |
| kelas | CRUD | R | R | R | R | R |
| buku | CRUD | CRUD | - | - | - | - |
| peminjaman | CRUD | CRUD | - | - | - | - |
| denda | CRUD | CRU | R | - | - | - |
| spp | CRUD | - | CRUD | - | - | - |
| transaksi | CRUD | - | CRUD | - | - | - |
| absensi | CRUD | - | - | CRUD | - | - |
| dispensasi | CRUD | - | - | CRUD | - | - |
| jadwal | CRUD | - | - | - | CRUD | - |
| pengumuman | CRUD | - | - | - | - | CRUD |
| berita | CRUD | - | - | - | - | CRUD |
| prestasi | CRUD | - | - | - | - | CRUD |
| audit_log | R | - | - | - | - | - |
| settings | RU | - | - | - | - | - |

**Legend:** C=Create, R=Read, U=Update, D=Delete, -=No Access

### 3.3 Guard Implementation

```typescript
// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles required
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Super admin bypasses all checks
    if (user.role === 'super_admin') {
      return true;
    }

    return requiredRoles.includes(user.role);
  }
}
```

---

## 4. Row Level Security (RLS)

### 4.1 Supabase RLS Policies

```sql
-- Enable RLS on all tables
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE buku ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables

-- Policy: Admins can read all siswa
CREATE POLICY "admins_read_siswa" ON siswa
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM admins 
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Policy: Only super_admin can delete
CREATE POLICY "super_admin_delete_siswa" ON siswa
  FOR DELETE
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM admins 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Policy: admin_perpustakaan can only access buku
CREATE POLICY "perpus_access_buku" ON buku
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM admins 
      WHERE id = auth.uid() 
      AND (role = 'super_admin' OR role = 'admin_perpustakaan')
    )
  );
```

### 4.2 Service Key vs Anon Key

| Key | Usage | RLS |
|-----|-------|-----|
| `SUPABASE_ANON_KEY` | Client-side, limited access | ✅ Enforced |
| `SUPABASE_SERVICE_KEY` | Backend, full access | ❌ Bypassed |

**Backend uses SERVICE_KEY** karena RBAC sudah di-handle di application layer.

---

## 5. Input Validation

### 5.1 DTO Validation

```typescript
// create-siswa.dto.ts
export class CreateSiswaDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'NISN harus 10 digit' })
  @Matches(/^\d+$/, { message: 'NISN harus angka' })
  nisn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => sanitizeHtml(value)) // XSS protection
  name: string;

  @IsEmail({}, { message: 'Email tidak valid' })
  @IsOptional()
  email?: string;

  @IsUUID()
  kelasId: string;
}
```

### 5.2 SQL Injection Prevention

Supabase client menggunakan parameterized queries:

```typescript
// SAFE ✅
const { data } = await supabase
  .from('siswa')
  .select('*')
  .eq('name', userInput);

// NEVER DO THIS ❌
// const { data } = await supabase.rpc('raw_query', {
//   sql: `SELECT * FROM siswa WHERE name = '${userInput}'`
// });
```

---

## 6. Rate Limiting

```typescript
// app.module.ts
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,      // 1 second
        limit: 3,       // 3 requests
      },
      {
        name: 'medium',
        ttl: 10000,     // 10 seconds
        limit: 20,      // 20 requests
      },
      {
        name: 'long',
        ttl: 60000,     // 1 minute
        limit: 100,     // 100 requests
      },
    ]),
  ],
})
export class AppModule {}
```

### Endpoint-specific limits:

```typescript
@Controller('auth')
export class AuthController {
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 per minute
  login() { ... }

  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 per 5 minutes
  forgotPassword() { ... }
}
```

---

## 7. Device Management

### 7.1 Device Fingerprint

```typescript
interface DeviceInfo {
  fingerprint: string;  // Unique device hash
  browser: string;      // Chrome 120.0
  os: string;           // Windows 11
  ipAddress: string;    // 192.168.1.100
  location?: string;    // Bandung, ID
}
```

### 7.2 New Device Flow

```
1. User login dari device baru
2. System detect device fingerprint tidak dikenal
3. OTP dikirim ke email
4. User verify OTP
5. Device ditambahkan ke whitelist
6. Login success
```

### 7.3 Device Approval (Super Admin)

Super admin bisa melihat dan approve/reject device:

```sql
-- devices table
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  admin_id UUID REFERENCES admins(id),
  fingerprint TEXT NOT NULL,
  name TEXT,
  browser TEXT,
  os TEXT,
  ip_address TEXT,
  location TEXT,
  is_whitelisted BOOLEAN DEFAULT false,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. Audit Logging

### 8.1 Audit Log Schema

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id),
  admin_name TEXT,
  admin_role TEXT,
  action TEXT NOT NULL,          -- create, update, delete, export, login
  resource TEXT NOT NULL,        -- siswa, buku, spp, etc
  resource_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  request_id TEXT,               -- For request tracing
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_resource ON audit_logs(resource);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

### 8.2 What to Log

| Action | Logged |
|--------|:------:|
| Login/Logout | ✅ |
| Create record | ✅ |
| Update record | ✅ (with diff) |
| Delete record | ✅ |
| Export data | ✅ |
| Failed login | ✅ |
| Permission denied | ✅ |
| Settings change | ✅ |

---

## 9. Emergency Lockdown

### 9.1 Lockdown Mode

Super admin dapat mengaktifkan lockdown:

```typescript
interface EmergencyLockdown {
  isActive: boolean;
  activatedBy: string;
  activatedAt: Date;
  reason: string;
  expiresAt?: Date;
}
```

### 9.2 Lockdown Effects

- Semua session di-invalidate
- Hanya `super_admin` yang bisa login
- Semua API returns 503 (kecuali `/auth/login` untuk super_admin)
- Alert dikirim ke semua super admin

---

## 10. Security Checklist

### Development
- [ ] Semua env variables di `.env` (not committed)
- [ ] CORS configured untuk allowed origins
- [ ] Rate limiting enabled
- [ ] Input validation dengan class-validator
- [ ] SQL injection prevented (parameterized queries)

### Production
- [ ] HTTPS only
- [ ] Secure cookies (httpOnly, sameSite)
- [ ] CORS strict mode
- [ ] Rate limiting configured
- [ ] Audit logging enabled
- [ ] Error messages sanitized
- [ ] Supabase RLS policies active
- [ ] Regular security audits scheduled

---

## Related Documentation

- [JWT Implementation](../03-authentication/jwt-implementation.md)
- [Role-Based Access](../03-authentication/role-based-access.md)
- [Audit Logging](../05-services/audit-logging.md)
