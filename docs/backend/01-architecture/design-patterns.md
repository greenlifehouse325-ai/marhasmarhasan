# SMK Marhas - Design Patterns

## 1. Repository Pattern

Semua database operations di-abstract melalui Service layer yang berkomunikasi dengan Supabase.

```
Controller → Service → Supabase Client → PostgreSQL
```

**Keuntungan:**
- Business logic terpisah dari database logic
- Mudah switch database provider
- Testable dengan mock

---

## 2. DTO Pattern (Data Transfer Object)

Setiap request/response memiliki DTO dengan validation:

```typescript
// create-siswa.dto.ts
export class CreateSiswaDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  nisn: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
```

**Validation Pipeline:**
```
Request → ValidationPipe → DTO → Controller → Service
                ↓
         400 Bad Request (if invalid)
```

---

## 3. Guard Pattern

Authentication dan Authorization menggunakan Guards:

```typescript
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  
  @Get()
  @Roles('super_admin')  // Only super_admin
  findAll() { ... }

  @Get(':id')
  @Roles('super_admin', 'admin_perpustakaan')  // Multiple roles
  findOne() { ... }
}
```

**Guard Execution Order:**
```
Request → JwtAuthGuard → RolesGuard → Controller
              ↓              ↓
         401 Unauth      403 Forbidden
```

---

## 4. Interceptor Pattern

### 4.1 Transform Response
```typescript
// transform.interceptor.ts
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

// Result:
// { success: true, data: [...], timestamp: "2024-01-15T..." }
```

### 4.2 Logging
```typescript
// logging.interceptor.ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`${method} ${url} - ${Date.now() - now}ms`);
      }),
    );
  }
}
```

---

## 5. Decorator Pattern

### 5.1 Custom Decorators
```typescript
// @CurrentUser() - Get logged in user
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage:
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}
```

```typescript
// @Roles() - Define required roles
export const Roles = (...roles: AdminRole[]) => SetMetadata('roles', roles);

// Usage:
@Post()
@Roles('super_admin')
create() { ... }
```

### 5.2 Combine Decorators
```typescript
// @Auth() - Combine guards + decorators
export function Auth(...roles: AdminRole[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(...roles),
    ApiBearerAuth(),
  );
}

// Usage:
@Get()
@Auth('super_admin', 'admin_keuangan')
findAll() { ... }
```

---

## 6. Singleton Pattern (Supabase Client)

```typescript
// supabase.service.ts
@Injectable()
export class SupabaseService {
  private static instance: SupabaseClient;

  get client(): SupabaseClient {
    if (!SupabaseService.instance) {
      SupabaseService.instance = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY,
      );
    }
    return SupabaseService.instance;
  }
}
```

---

## 7. Factory Pattern (DTO Responses)

```typescript
// response.factory.ts
export class ResponseFactory {
  static success<T>(data: T, message?: string) {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(data: T[], meta: PaginationMeta) {
    return {
      success: true,
      data,
      meta,
      timestamp: new Date().toISOString(),
    };
  }

  static error(code: string, message: string, details?: any) {
    return {
      success: false,
      error: { code, message, details },
      timestamp: new Date().toISOString(),
    };
  }
}
```

---

## 8. Strategy Pattern (Authentication)

```typescript
// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private supabase: SupabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { data: user } = await this.supabase.client
      .from('admins')
      .select('*')
      .eq('id', payload.sub)
      .single();

    if (!user || !user.is_active) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

---

## 9. Observer Pattern (Audit Logging)

```typescript
// audit.service.ts
@Injectable()
export class AuditService {
  constructor(private supabase: SupabaseService) {}

  async log(
    action: string,
    resource: string,
    resourceId: string,
    oldData: any,
    newData: any,
    adminId: string,
  ) {
    await this.supabase.client.from('audit_logs').insert({
      admin_id: adminId,
      action,
      resource,
      resource_id: resourceId,
      old_data: oldData,
      new_data: newData,
      created_at: new Date().toISOString(),
    });
  }
}

// Usage in any service:
await this.audit.log('create', 'siswa', newSiswa.id, null, newSiswa, adminId);
await this.audit.log('update', 'siswa', id, oldData, newData, adminId);
await this.audit.log('delete', 'siswa', id, oldData, null, adminId);
```

---

## 10. Middleware Pattern

```typescript
// request-id.middleware.ts
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['requestId'] = uuidv4();
    res.setHeader('X-Request-Id', req['requestId']);
    next();
  }
}

// app.module.ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
```

---

## 11. Module Dependencies

```
AppModule
├── ConfigModule (global)
├── SupabaseModule (global)
├── AuthModule
├── AdminModule
│   └── AuditModule
├── SiswaModule
│   └── KelasModule
├── GuruModule
├── KelasModule
├── PerpustakaanModule
│   ├── SiswaModule
│   └── AuditModule
├── KeuanganModule
│   ├── SiswaModule
│   └── AuditModule
├── AbsensiModule
│   ├── SiswaModule
│   └── NotificationModule
├── JadwalModule
│   ├── GuruModule
│   └── KelasModule
├── AplikasiModule
│   └── NotificationModule
├── NotificationModule
├── UploadModule
├── AuditModule
└── ReportModule
```

---

## Related Documentation

- [Security Model](./security-model.md)
- [Tech Stack](./tech-stack.md)
