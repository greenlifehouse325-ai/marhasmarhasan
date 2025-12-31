# SMK Marhas - Tutorial: Security Best Practices

## 1. Authentication Security

### 1.1 Strong JWT Configuration
```typescript
// ✅ Good
JwtModule.register({
  secret: process.env.JWT_SECRET,  // Min 32 characters
  signOptions: {
    expiresIn: '1h',               // Short expiry
    issuer: 'marhas-admin',
    audience: 'marhas-api',
  },
});

// ❌ Bad
JwtModule.register({
  secret: 'simple-secret',         // Weak secret
  signOptions: {
    expiresIn: '30d',              // Too long
  },
});
```

### 1.2 Password Requirements
```typescript
// Minimum requirements
const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  maxAge: 90, // days
  historyCount: 5,
};
```

### 1.3 Rate Limiting
```typescript
// Protect auth endpoints
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 per minute
  login() {}

  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 per 5 minutes
  forgotPassword() {}
}
```

---

## 2. Input Validation

### 2.1 Always Use DTOs
```typescript
// ✅ Good - Validated input
@Post()
create(@Body() dto: CreateSiswaDto) {
  return this.service.create(dto);
}

// ❌ Bad - Raw input
@Post()
create(@Body() body: any) {
  return this.service.create(body);
}
```

### 2.2 Sanitize Special Characters
```typescript
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return sanitizeHtml(value, { allowedTags: [] });
    }
    return value;
  }
}
```

### 2.3 Prevent SQL Injection
```typescript
// ✅ Safe - Parameterized query (Supabase does this automatically)
const { data } = await supabase
  .from('siswa')
  .select()
  .eq('id', userId);  // Parameterized

// ❌ Dangerous - String concatenation
const { data } = await supabase
  .rpc('raw_query', { sql: `SELECT * FROM siswa WHERE id = '${userId}'` });
```

---

## 3. Authorization

### 3.1 Always Check Permissions
```typescript
// ✅ Good - Check ownership
async update(id: string, dto: UpdateDto, userId: string) {
  const record = await this.findOne(id);
  
  if (record.ownerId !== userId && user.role !== 'super_admin') {
    throw new ForbiddenException('Tidak memiliki akses');
  }
  
  return this.supabase.client.from('table').update(dto).eq('id', id);
}

// ❌ Bad - No check
async update(id: string, dto: UpdateDto) {
  return this.supabase.client.from('table').update(dto).eq('id', id);
}
```

### 3.2 Role-Based Guards
```typescript
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get()
  @Roles('super_admin')  // Only super admin
  getAllAdmins() {}

  @Put(':id')
  @Roles('super_admin')
  updateAdmin() {}
}
```

---

## 4. Data Protection

### 4.1 Never Expose Sensitive Data
```typescript
// ✅ Good - Exclude sensitive fields
async findOne(id: string) {
  const { data } = await this.supabase.client
    .from('admins')
    .select('id, email, name, role, avatar')  // Exclude password
    .eq('id', id)
    .single();
  return data;
}

// Or use transform
class AdminResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  
  @Exclude()
  password: string;
}
```

### 4.2 Mask Sensitive Data in Logs
```typescript
// In audit logging
private sanitize(data: any): any {
  const sensitiveFields = ['password', 'token', 'secret', 'credit_card'];
  const sanitized = { ...data };
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  return sanitized;
}
```

---

## 5. API Security

### 5.1 CORS Configuration
```typescript
// ✅ Specific origins
app.enableCors({
  origin: ['https://admin.marhas.sch.id', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// ❌ Allow all - DANGEROUS in production
app.enableCors({ origin: '*' });
```

### 5.2 Security Headers
```typescript
import helmet from 'helmet';

// Add security headers
app.use(helmet());
```

### 5.3 Request Size Limit
```typescript
// Limit payload size
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));
```

---

## 6. Session Security

### 6.1 Session Validation
```typescript
// Always validate session on protected routes
async validate(payload: JwtPayload) {
  // Check session is active
  const { data: session } = await this.supabase.client
    .from('sessions')
    .select('is_active')
    .eq('id', payload.sessionId)
    .single();

  if (!session?.is_active) {
    throw new UnauthorizedException('Session expired');
  }
  
  // Check admin is not banned
  const admin = await this.adminService.findOne(payload.sub);
  if (admin.is_banned) {
    throw new UnauthorizedException('Account banned');
  }
  
  return admin;
}
```

### 6.2 Logout All Sessions
```typescript
// Provide way to revoke all sessions
async logoutAllDevices(adminId: string) {
  await this.supabase.client
    .from('sessions')
    .update({ is_active: false })
    .eq('admin_id', adminId);
}
```

---

## 7. File Upload Security

### 7.1 Validate File Types
```typescript
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
  throw new BadRequestException('Tipe file tidak diizinkan');
}
```

### 7.2 Limit File Size
```typescript
@UseInterceptors(
  FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }),
)
```

### 7.3 Scan for Malware
```typescript
// Consider using ClamAV or similar
async scanFile(buffer: Buffer): Promise<boolean> {
  // Implement virus scanning
}
```

---

## 8. Database Security

### 8.1 Use Service Key Server-Side Only
```typescript
// ✅ Backend uses service key
SUPABASE_SERVICE_KEY=eyJhbGci...  // Server-side only

// ❌ Never expose service key to frontend
NEXT_PUBLIC_SUPABASE_SERVICE_KEY=...  // WRONG!
```

### 8.2 Enable RLS
```sql
-- Enable RLS on all tables
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
-- Create appropriate policies
```

### 8.3 Principle of Least Privilege
```typescript
// Each admin role only accesses what they need
const PERPUSTAKAAN_PERMISSIONS = [
  { resource: 'book', actions: ['create', 'read', 'update'] },
  { resource: 'lending', actions: ['create', 'read'] },
  // NO access to siswa, guru, keuangan, etc.
];
```

---

## 9. Error Handling

### 9.1 Don't Leak Internal Details
```typescript
// ✅ Generic error for client
catch (error) {
  this.logger.error('Database error', error.stack);
  throw new InternalServerErrorException('Terjadi kesalahan');
}

// ❌ Exposes internal details
catch (error) {
  throw new InternalServerErrorException(error.message);
}
```

### 9.2 Log Errors Securely
```typescript
// Log full details server-side
this.logger.error({
  message: 'Operation failed',
  error: error.message,
  stack: error.stack,
  userId: user.id,
  operation: 'createSiswa',
});

// Return safe message to client
throw new BadRequestException('Operasi gagal, silakan coba lagi');
```

---

## 10. Security Checklist

### Environment
- [ ] Strong JWT secret (32+ characters)
- [ ] Secure environment variable storage
- [ ] Different secrets for each environment
- [ ] Service keys never exposed to client

### Authentication
- [ ] Password policy enforced
- [ ] Rate limiting on auth endpoints
- [ ] Session management implemented
- [ ] 2FA available for sensitive accounts

### Authorization
- [ ] RBAC implemented
- [ ] Resource ownership checked
- [ ] RLS policies in place

### Input/Output
- [ ] All input validated via DTOs
- [ ] Sensitive data excluded from responses
- [ ] SQL injection prevented
- [ ] XSS protection enabled

### API
- [ ] CORS configured properly
- [ ] Security headers (helmet)
- [ ] Request size limits
- [ ] HTTPS only in production

---

## Related Documentation

- [Security Model](../01-architecture/security-model.md)
- [Authentication](../03-authentication/jwt-implementation.md)
- [RLS Policies](../02-database/rls-policies.md)
