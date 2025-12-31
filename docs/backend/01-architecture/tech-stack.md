# SMK Marhas - Tech Stack Details

## 1. Technology Stack Overview

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | Next.js | 14.x | React framework with App Router |
| **Backend** | Nest.js | 10.x | Node.js framework with TypeScript |
| **Database** | PostgreSQL | 15.x | Relational database via Supabase |
| **Auth** | Supabase Auth | - | JWT-based authentication |
| **Storage** | Supabase Storage | - | File uploads (photos, documents) |
| **Realtime** | Supabase Realtime | - | WebSocket for live updates |
| **Cache** | Redis (optional) | 7.x | Session cache, rate limiting |
| **Deployment** | Railway | - | Cloud platform |

---

## 2. Backend: Nest.js

### 2.1 Why Nest.js?

- **TypeScript Native**: Full type safety, consistent with frontend
- **Modular**: Feature-based modules
- **Decorator-based**: Clean, declarative code
- **Dependency Injection**: Easy testing, loose coupling
- **Built-in Support**: Validation, Guards, Interceptors
- **Active Ecosystem**: Large community, many plugins

### 2.2 Core Dependencies

```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/jwt": "^10.1.0",
    "@nestjs/throttler": "^5.0.0",
    "@nestjs/swagger": "^7.1.0",
    "@supabase/supabase-js": "^2.39.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "bcryptjs": "^2.4.3",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.3.1",
    "@types/passport-jwt": "^3.0.13",
    "jest": "^29.5.0",
    "typescript": "^5.1.3"
  }
}
```

### 2.3 Nest.js Module Structure

```typescript
// Standard module structure
@Module({
  imports: [
    ConfigModule,       // Environment config
    SupabaseModule,     // Database connection
    JwtModule,          // JWT handling
  ],
  controllers: [
    SiswaController,    // HTTP endpoints
  ],
  providers: [
    SiswaService,       // Business logic
    AuditService,       // Audit logging
  ],
  exports: [
    SiswaService,       // Export for other modules
  ],
})
export class SiswaModule {}
```

---

## 3. Database: Supabase (PostgreSQL)

### 3.1 Why Supabase?

- **Managed PostgreSQL**: No server management
- **Built-in Auth**: JWT, OAuth, Passwordless
- **Row Level Security**: Database-level authorization
- **Realtime**: WebSocket subscriptions
- **Storage**: File management with CDN
- **Edge Functions**: Serverless functions
- **Dashboard**: Web UI for database management

### 3.2 Supabase Client Setup

```typescript
// supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY, // Service key for backend
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
```

### 3.3 Database Connection

```
Backend ──(SUPABASE_SERVICE_KEY)──> Supabase PostgreSQL
                                          │
                                    PostgREST API
                                          │
                          ┌───────────────┼───────────────┐
                          ▼               ▼               ▼
                       Tables          Views          Functions
```

---

## 4. Authentication: JWT + Supabase Auth

### 4.1 JWT Configuration

```typescript
// jwt.config.ts
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '1h',        // Access token: 1 hour
    issuer: 'marhas-admin',
    audience: 'marhas-api',
  },
};

export const refreshConfig = {
  expiresIn: '7d',          // Refresh token: 7 days
};
```

### 4.2 Token Flow

```
1. Login Request
   ├── Validate credentials with Supabase Auth
   ├── Generate Access Token (1h)
   ├── Generate Refresh Token (7d)
   └── Store session in database

2. API Request
   ├── Extract JWT from Authorization header
   ├── Verify signature and expiry
   ├── Load user from token payload
   └── Check permissions via Guards

3. Token Refresh
   ├── Validate refresh token
   ├── Check session in database
   ├── Generate new Access Token
   ├── Rotate Refresh Token
   └── Update session
```

---

## 5. File Storage: Supabase Storage

### 5.1 Storage Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `avatars` | Private | Admin profile photos |
| `photos-siswa` | Private | Student photos |
| `photos-guru` | Private | Teacher photos |
| `documents` | Private | Official documents |
| `book-covers` | Public | Book cover images |
| `attachments` | Private | General attachments |

### 5.2 Upload Service

```typescript
// upload.service.ts
@Injectable()
export class UploadService {
  constructor(private supabase: SupabaseService) {}

  async uploadFile(
    bucket: string,
    path: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const { data, error } = await this.supabase.getClient()
      .storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = this.supabase.getClient()
      .storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrl;
  }
}
```

---

## 6. Realtime: WebSocket

### 6.1 Notification Gateway

```typescript
// notification.gateway.ts
@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  sendToRole(role: AdminRole, event: string, data: any) {
    this.server.to(`role:${role}`).emit(event, data);
  }

  broadcastAll(event: string, data: any) {
    this.server.emit(event, data);
  }
}
```

### 6.2 Supabase Realtime

```typescript
// Listen to database changes
const channel = supabase
  .channel('siswa-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'siswa' },
    (payload) => {
      console.log('Change received!', payload);
      // Broadcast to connected clients
      this.gateway.broadcastAll('siswa:change', payload);
    }
  )
  .subscribe();
```

---

## 7. Validation: class-validator

### 7.1 Validation Example

```typescript
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateSiswaDto {
  @IsString()
  @IsNotEmpty({ message: 'NISN wajib diisi' })
  @Length(10, 10, { message: 'NISN harus 10 digit' })
  @Matches(/^\d+$/, { message: 'NISN harus angka' })
  nisn: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['L', 'P'], { message: 'Gender harus L atau P' })
  gender: 'L' | 'P';

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsUUID('4', { message: 'Kelas ID tidak valid' })
  kelasId: string;
}
```

### 7.2 Global Validation Pipe

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // Strip unknown properties
    forbidNonWhitelisted: true, // Throw on unknown properties
    transform: true,            // Transform payloads to DTO instances
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

---

## 8. API Documentation: Swagger

```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('SMK Marhas API')
  .setDescription('Backend API for SMK Marhas Admin Dashboard')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('auth', 'Authentication endpoints')
  .addTag('siswa', 'Student management')
  .addTag('guru', 'Teacher management')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

// Access at: http://localhost:4000/docs
```

---

## 9. Testing: Jest

### 9.1 Unit Test Example

```typescript
// siswa.service.spec.ts
describe('SiswaService', () => {
  let service: SiswaService;
  let supabase: MockSupabaseService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SiswaService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    service = module.get<SiswaService>(SiswaService);
  });

  it('should create a siswa', async () => {
    const dto = { nisn: '1234567890', name: 'Test', ... };
    const result = await service.create(dto);
    expect(result.name).toBe('Test');
  });
});
```

---

## 10. Deployment: Railway

### 10.1 Railway Configuration

```json
// railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node dist/main",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### 10.2 Environment Variables (Railway)

```
NODE_ENV=production
PORT=3000

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...

JWT_SECRET=super-secret-key-here
JWT_EXPIRES_IN=1h

FRONTEND_URL=https://admin.marhas.sch.id
CORS_ORIGIN=https://admin.marhas.sch.id
```

---

## Related Documentation

- [Supabase Setup](../02-database/supabase-setup.md)
- [Deployment Guide](../07-deployment/railway-setup.md)
