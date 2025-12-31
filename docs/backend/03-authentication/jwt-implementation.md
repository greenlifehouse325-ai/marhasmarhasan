# SMK Marhas - JWT Implementation

## 1. JWT Overview

JSON Web Token (JWT) digunakan untuk authentication antara frontend dan backend.

```
┌──────────────────────────────────────────────────────────────┐
│                       JWT FLOW                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Login                                                     │
│     User ──(email, password)──> Backend                       │
│                                                               │
│  2. Token Generation                                          │
│     Backend ──(JWT + Refresh)──> User                         │
│                                                               │
│  3. API Request                                               │
│     User ──(Bearer JWT)──> Backend ──(validate)──> Response   │
│                                                               │
│  4. Token Refresh                                             │
│     User ──(Refresh Token)──> Backend ──(new JWT)──> User     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Token Structure

### Access Token Payload
```typescript
interface JwtPayload {
  sub: string;          // Admin ID (UUID)
  email: string;        // Admin email
  name: string;         // Admin name
  role: AdminRole;      // Role enum
  permissions: string[];// Permission array
  deviceId: string;     // Device UUID
  sessionId: string;    // Session UUID
  iat: number;          // Issued at (Unix timestamp)
  exp: number;          // Expires at (Unix timestamp)
  iss: string;          // Issuer: 'marhas-admin'
  aud: string;          // Audience: 'marhas-api'
}
```

### Example Token
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiI1NTBkNzc4YS0xMjM0LTRhYjUtYjY3OC05MDEyMzQ1Njc4OTAiLCJlbWFpbCI6InN1cGVyYWRtaW5AbWFyaGFzLnNjaC5pZCIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTcwNDA2NzIwMCwiZXhwIjoxNzA0MDcwODAwfQ.
abc123signature
```

---

## 3. Nest.js Implementation

### 3.1 Install Dependencies
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local
npm install -D @types/passport-jwt @types/passport-local
```

### 3.2 JWT Module Configuration

**`src/modules/auth/auth.module.ts`**
```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '1h'),
          issuer: 'marhas-admin',
          audience: 'marhas-api',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
```

### 3.3 JWT Strategy

**`src/modules/auth/strategies/jwt.strategy.ts`**
```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../../database/supabase.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  sessionId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private supabase: SupabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
      issuer: 'marhas-admin',
      audience: 'marhas-api',
    });
  }

  async validate(payload: JwtPayload) {
    // Verify session is still active
    const { data: session } = await this.supabase.client
      .from('sessions')
      .select('is_active')
      .eq('id', payload.sessionId)
      .single();

    if (!session?.is_active) {
      throw new UnauthorizedException('Session expired');
    }

    // Get admin from database
    const { data: admin } = await this.supabase.client
      .from('admins')
      .select('*')
      .eq('id', payload.sub)
      .single();

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    if (admin.status !== 'active' || admin.is_banned) {
      throw new UnauthorizedException('Account is inactive or banned');
    }

    // Return user object (attached to request)
    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions,
      sessionId: payload.sessionId,
    };
  }
}
```

---

## 4. Auth Service

**`src/modules/auth/auth.service.ts`**
```typescript
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../database/supabase.service';
import { compare, hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private supabase: SupabaseService,
  ) {}

  async login(dto: LoginDto, deviceInfo: DeviceInfo) {
    // Find admin by email
    const { data: admin, error } = await this.supabase.client
      .from('admins')
      .select('*')
      .eq('email', dto.email)
      .single();

    if (error || !admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await compare(dto.password, admin.password);
    if (!isPasswordValid) {
      await this.logFailedAttempt(dto.email, deviceInfo);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if banned
    if (admin.is_banned) {
      throw new UnauthorizedException('Account is banned');
    }

    // Check device
    const device = await this.checkDevice(admin.id, deviceInfo);
    if (!device.isWhitelisted && !device.exists) {
      // New device - require OTP
      return {
        requiresOTP: true,
        email: admin.email,
        deviceId: device.id,
      };
    }

    // Generate tokens
    return this.generateTokens(admin, device.id);
  }

  async generateTokens(admin: any, deviceId: string) {
    const sessionId = uuidv4();

    // Access token payload
    const payload = {
      sub: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions || [],
      deviceId,
      sessionId,
    };

    // Generate tokens
    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.generateRefreshToken();
    
    // Calculate expiry
    const expiresIn = this.config.get<string>('JWT_EXPIRES_IN', '1h');
    const expiresAt = new Date(Date.now() + this.parseExpiry(expiresIn));

    // Store session
    await this.supabase.client.from('sessions').insert({
      id: sessionId,
      admin_id: admin.id,
      token: accessToken,
      refresh_token: refreshToken,
      device_id: deviceId,
      expires_at: expiresAt.toISOString(),
      is_active: true,
    });

    // Update last login
    await this.supabase.client
      .from('admins')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', admin.id);

    return {
      accessToken,
      refreshToken,
      expiresAt,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        avatar: admin.avatar,
      },
    };
  }

  async refreshTokens(refreshToken: string) {
    // Find session by refresh token
    const { data: session } = await this.supabase.client
      .from('sessions')
      .select('*, admins(*)')
      .eq('refresh_token', refreshToken)
      .eq('is_active', true)
      .single();

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Invalidate old session
    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('id', session.id);

    // Generate new tokens
    return this.generateTokens(session.admins, session.device_id);
  }

  async logout(sessionId: string) {
    // Invalidate session
    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('id', sessionId);

    return { success: true };
  }

  async logoutAllDevices(adminId: string) {
    // Invalidate all sessions
    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('admin_id', adminId);

    return { success: true };
  }

  private generateRefreshToken(): string {
    return uuidv4() + '-' + uuidv4();
  }

  private parseExpiry(expiry: string): number {
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1));
    
    switch (unit) {
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      case 'm': return value * 60 * 1000;
      default: return 60 * 60 * 1000; // Default 1 hour
    }
  }
}
```

---

## 5. JWT Guard

**`src/common/guards/jwt-auth.guard.ts`**
```typescript
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Check if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
```

---

## 6. Auth Controller

**`src/modules/auth/auth.controller.ts`**
```typescript
import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const deviceInfo = this.extractDeviceInfo(req);
    return this.authService.login(dto, deviceInfo);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: any) {
    return this.authService.logout(user.sessionId);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logoutAll(@CurrentUser() user: any) {
    return this.authService.logoutAllDevices(user.id);
  }

  private extractDeviceInfo(req: Request): DeviceInfo {
    return {
      fingerprint: req.headers['x-device-fingerprint'] as string,
      browser: req.headers['user-agent'] as string,
      ipAddress: req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress,
    };
  }
}
```

---

## 7. Environment Variables

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key-min-32-chars-long-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 8. Security Best Practices

1. **Strong Secret**: Minimum 32 characters, random
2. **Short Expiry**: 1 hour for access token
3. **Refresh Rotation**: New refresh token on each use
4. **Session Tracking**: Store sessions in database
5. **Device Binding**: Token tied to device
6. **Secure Transmission**: HTTPS only

---

## Related Documentation

- [Session Management](./session-management.md)
- [Password Security](./password-security.md)
- [2FA Implementation](./2fa-implementation.md)
