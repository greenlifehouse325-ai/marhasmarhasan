# SMK Marhas - Session Management

## 1. Session Overview

Session management menangani:
- Login/logout
- Token lifecycle
- Device tracking
- Concurrent sessions

```
┌─────────────────────────────────────────────────────────────────┐
│                      SESSION LIFECYCLE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Login ──> Create Session ──> Store in DB                       │
│                                   │                             │
│                                   ▼                             │
│  API Request ──> Validate Token ──> Check Session Active        │
│                                          │                      │
│                              ┌───────────┴───────────┐          │
│                              │                       │          │
│                         Active?                   Expired?      │
│                              │                       │          │
│                              ▼                       ▼          │
│                         Allow                   401 Error       │
│                                                                 │
│  Logout ──> Invalidate Session ──> Remove from DB               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Session Schema

```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    token TEXT NOT NULL,           -- Access token (untuk tracking)
    refresh_token TEXT NOT NULL,   -- Refresh token
    device_id UUID REFERENCES devices(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_activity_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_admin ON sessions(admin_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_refresh ON sessions(refresh_token);
CREATE INDEX idx_sessions_active ON sessions(is_active) WHERE is_active = true;
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
```

---

## 3. Session Service

**`src/modules/auth/session.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { v4 as uuidv4 } from 'uuid';

export interface SessionData {
  adminId: string;
  token: string;
  refreshToken: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
}

export interface SessionInfo {
  id: string;
  device: {
    id: string;
    name: string;
    browser: string;
    os: string;
    location: string;
  };
  ipAddress: string;
  createdAt: Date;
  lastActivityAt: Date;
  isCurrentSession: boolean;
}

@Injectable()
export class SessionService {
  constructor(private supabase: SupabaseService) {}

  /**
   * Create new session
   */
  async createSession(data: SessionData): Promise<string> {
    const sessionId = uuidv4();

    const { error } = await this.supabase.client.from('sessions').insert({
      id: sessionId,
      admin_id: data.adminId,
      token: data.token,
      refresh_token: data.refreshToken,
      device_id: data.deviceId,
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      expires_at: data.expiresAt.toISOString(),
      is_active: true,
      last_activity_at: new Date().toISOString(),
    });

    if (error) throw error;
    return sessionId;
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string) {
    const { data, error } = await this.supabase.client
      .from('sessions')
      .select('*, devices(*)')
      .eq('id', sessionId)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }

  /**
   * Get session by refresh token
   */
  async getSessionByRefreshToken(refreshToken: string) {
    const { data, error } = await this.supabase.client
      .from('sessions')
      .select('*, admins(*), devices(*)')
      .eq('refresh_token', refreshToken)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  }

  /**
   * Validate session is active
   */
  async isSessionActive(sessionId: string): Promise<boolean> {
    const { data } = await this.supabase.client
      .from('sessions')
      .select('is_active, expires_at')
      .eq('id', sessionId)
      .single();

    if (!data) return false;
    if (!data.is_active) return false;
    if (new Date(data.expires_at) < new Date()) return false;

    return true;
  }

  /**
   * Update last activity
   */
  async updateActivity(sessionId: string): Promise<void> {
    await this.supabase.client
      .from('sessions')
      .update({ last_activity_at: new Date().toISOString() })
      .eq('id', sessionId);
  }

  /**
   * Invalidate session (logout)
   */
  async invalidateSession(sessionId: string): Promise<void> {
    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('id', sessionId);
  }

  /**
   * Invalidate all sessions for admin (logout all devices)
   */
  async invalidateAllSessions(adminId: string): Promise<void> {
    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('admin_id', adminId)
      .eq('is_active', true);
  }

  /**
   * Invalidate all sessions except current
   */
  async invalidateOtherSessions(adminId: string, currentSessionId: string): Promise<void> {
    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('admin_id', adminId)
      .eq('is_active', true)
      .neq('id', currentSessionId);
  }

  /**
   * Get all active sessions for admin
   */
  async getActiveSessions(adminId: string, currentSessionId?: string): Promise<SessionInfo[]> {
    const { data, error } = await this.supabase.client
      .from('sessions')
      .select(`
        id,
        ip_address,
        created_at,
        last_activity_at,
        devices (
          id,
          name,
          browser,
          os,
          location
        )
      `)
      .eq('admin_id', adminId)
      .eq('is_active', true)
      .order('last_activity_at', { ascending: false });

    if (error) return [];

    return data.map(session => ({
      id: session.id,
      device: session.devices,
      ipAddress: session.ip_address,
      createdAt: new Date(session.created_at),
      lastActivityAt: new Date(session.last_activity_at),
      isCurrentSession: session.id === currentSessionId,
    }));
  }

  /**
   * Cleanup expired sessions (cron job)
   */
  async cleanupExpiredSessions(): Promise<number> {
    const { data, error } = await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .eq('is_active', true)
      .lt('expires_at', new Date().toISOString())
      .select('id');

    if (error) return 0;
    return data?.length || 0;
  }

  /**
   * Get session count for admin
   */
  async getSessionCount(adminId: string): Promise<number> {
    const { count } = await this.supabase.client
      .from('sessions')
      .select('*', { count: 'exact', head: true })
      .eq('admin_id', adminId)
      .eq('is_active', true);

    return count || 0;
  }

  /**
   * Enforce max sessions (oldest first)
   */
  async enforceMaxSessions(adminId: string, maxSessions: number): Promise<void> {
    const { data } = await this.supabase.client
      .from('sessions')
      .select('id')
      .eq('admin_id', adminId)
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (!data || data.length <= maxSessions) return;

    // Invalidate oldest sessions
    const sessionsToRemove = data.slice(0, data.length - maxSessions);
    const idsToRemove = sessionsToRemove.map(s => s.id);

    await this.supabase.client
      .from('sessions')
      .update({ is_active: false })
      .in('id', idsToRemove);
  }
}
```

---

## 4. Session Controller

**`src/modules/auth/session.controller.ts`**
```typescript
import { Controller, Get, Post, Delete, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth/sessions')
@UseGuards(JwtAuthGuard)
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async getActiveSessions(@CurrentUser() user: any) {
    const sessions = await this.sessionService.getActiveSessions(
      user.id,
      user.sessionId
    );
    return { data: sessions };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async revokeSession(
    @Param('id') sessionId: string,
    @CurrentUser() user: any
  ) {
    // Verify session belongs to user
    const session = await this.sessionService.getSession(sessionId);
    if (!session || session.admin_id !== user.id) {
      throw new ForbiddenException('Cannot revoke this session');
    }

    await this.sessionService.invalidateSession(sessionId);
    return { success: true, message: 'Session revoked' };
  }

  @Post('revoke-others')
  @HttpCode(HttpStatus.OK)
  async revokeOtherSessions(@CurrentUser() user: any) {
    await this.sessionService.invalidateOtherSessions(user.id, user.sessionId);
    return { success: true, message: 'Other sessions revoked' };
  }

  @Post('revoke-all')
  @HttpCode(HttpStatus.OK)
  async revokeAllSessions(@CurrentUser() user: any) {
    await this.sessionService.invalidateAllSessions(user.id);
    return { success: true, message: 'All sessions revoked' };
  }
}
```

---

## 5. Session Activity Interceptor

**`src/common/interceptors/session-activity.interceptor.ts`**
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { SessionService } from '../../modules/auth/session.service';

@Injectable()
export class SessionActivityInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      tap(() => {
        // Update session activity after successful request
        if (user?.sessionId) {
          this.sessionService.updateActivity(user.sessionId).catch(() => {
            // Ignore errors
          });
        }
      }),
    );
  }
}
```

---

## 6. Session Cleanup Cron

**`src/tasks/session-cleanup.task.ts`**
```typescript
import { Injectable as Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SessionService } from '../modules/auth/session.service';

@Injectable()
export class SessionCleanupTask {
  private readonly logger = new Logger(SessionCleanupTask.name);

  constructor(private sessionService: SessionService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredSessions() {
    const count = await this.sessionService.cleanupExpiredSessions();
    this.logger.log(`Cleaned up ${count} expired sessions`);
  }
}
```

---

## 7. Configuration

```typescript
// config/session.config.ts
export const sessionConfig = {
  maxSessionsPerUser: 5,        // Max concurrent sessions
  sessionTimeout: '1h',         // Access token expiry
  refreshTimeout: '7d',         // Refresh token expiry
  activityUpdateInterval: 5,    // Minutes between activity updates
  cleanupInterval: '1h',        // Cleanup cron interval
};
```

---

## 8. Frontend Usage

```typescript
// Get active sessions
const { data: sessions } = await api.get('/auth/sessions');

// Revoke specific session
await api.delete(`/auth/sessions/${sessionId}`);

// Revoke other sessions
await api.post('/auth/sessions/revoke-others');

// Revoke all sessions (logout everywhere)
await api.post('/auth/sessions/revoke-all');
```

---

## Related Documentation

- [JWT Implementation](./jwt-implementation.md)
- [Password Security](./password-security.md)
- [2FA Implementation](./2fa-implementation.md)
