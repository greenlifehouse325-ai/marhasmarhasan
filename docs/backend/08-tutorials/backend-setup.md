# SMK Marhas - Tutorial: Backend Setup

## 1. Prerequisites

Sebelum memulai, pastikan sudah terinstall:

- **Node.js** v18+ (download dari [nodejs.org](https://nodejs.org))
- **npm** atau **pnpm**
- **Git**
- **VS Code** dengan extensions: ESLint, Prettier

Verifikasi instalasi:
```bash
node --version  # v18.0.0+
npm --version   # 9.0.0+
git --version
```

---

## 2. Create Nest.js Project

### Option 1: Using Nest CLI (Recommended)
```bash
# Install Nest CLI globally
npm install -g @nestjs/cli

# Create new project
nest new smk-marhas-backend

# Navigate to project
cd smk-marhas-backend
```

### Option 2: Using npm
```bash
# Clone starter
git clone https://github.com/nestjs/nest-starter smk-marhas-backend
cd smk-marhas-backend
npm install
```

---

## 3. Install Dependencies

```bash
# Core
npm install @nestjs/config @nestjs/jwt @nestjs/passport
npm install @nestjs/throttler @nestjs/swagger

# Authentication
npm install passport passport-jwt passport-local
npm install bcryptjs

# Supabase
npm install @supabase/supabase-js

# Validation
npm install class-validator class-transformer

# Utils
npm install uuid

# Dev dependencies
npm install -D @types/passport-jwt @types/passport-local
npm install -D @types/bcryptjs @types/uuid
```

---

## 4. Project Structure

Buat struktur folder berikut:

```bash
mkdir -p src/common/{decorators,filters,guards,interceptors,pipes}
mkdir -p src/config
mkdir -p src/database
mkdir -p src/modules/{auth,admin,siswa,guru,perpustakaan,keuangan,absensi,jadwal,aplikasi}
```

Struktur akhir:
```
src/
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/
├── database/
├── modules/
│   ├── auth/
│   ├── admin/
│   ├── siswa/
│   └── ...
├── app.module.ts
└── main.ts
```

---

## 5. Environment Setup

### Create .env file
```env
# Server
NODE_ENV=development
PORT=4000

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_KEY=eyJhbGci...

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Config Module

**`src/config/configuration.ts`**
```typescript
export default () => ({
  port: parseInt(process.env.PORT || '4000', 10),
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  },
});
```

---

## 6. Supabase Module

**`src/database/supabase.module.ts`**
```typescript
import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
```

**`src/database/supabase.service.ts`**
```typescript
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const url = this.config.get<string>('supabase.url');
    const key = this.config.get<string>('supabase.serviceKey');

    if (!url || !key) {
      throw new Error('Supabase credentials not configured');
    }

    this.supabase = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    this.logger.log('Supabase client initialized');
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}
```

---

## 7. App Module

**`src/app.module.ts`**
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import configuration from './config/configuration';
import { SupabaseModule } from './database/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
// ... import other modules

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),

    // Database
    SupabaseModule,

    // Feature modules
    AuthModule,
    AdminModule,
    // ... other modules
  ],
  providers: [
    // Global JWT guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
```

---

## 8. Main.ts

**`src/main.ts`**
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Global prefix
  app.setGlobalPrefix('v1');

  // CORS
  app.enableCors({
    origin: config.get('cors.origin'),
    credentials: true,
  });

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SMK Marhas API')
    .setDescription('Backend API for SMK Marhas Admin Dashboard')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Start server
  const port = config.get('port');
  await app.listen(port);
  
  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`Swagger docs at http://localhost:${port}/docs`);
}

bootstrap();
```

---

## 9. Run Development Server

```bash
# Development (with hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## 10. Test the Setup

```bash
# Health check
curl http://localhost:4000/v1/health

# Response
{"status":"ok","timestamp":"2024-01-15T08:00:00.000Z"}
```

---

## 11. Next Steps

1. ✅ Setup Supabase project dan run migrations
2. ✅ Implement Auth module (login, register, JWT)
3. ✅ Implement feature modules (siswa, guru, etc.)
4. ✅ Add API documentation with Swagger
5. ✅ Deploy to Railway

---

## Related Documentation

- [Supabase Setup](../02-database/supabase-setup.md)
- [Authentication](../03-authentication/jwt-implementation.md)
- [Deployment](../07-deployment/railway-setup.md)
