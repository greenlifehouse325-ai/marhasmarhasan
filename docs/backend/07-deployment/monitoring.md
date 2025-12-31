# SMK Marhas - Deployment: Monitoring & Logging

## 1. Logging Strategy

### Nest.js Logger

**`src/common/logger/app.logger.ts`**
```typescript
import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      context: context || this.context,
      message,
    }));
  }

  error(message: string, trace?: string, context?: string) {
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      context: context || this.context,
      message,
      trace,
    }));
  }

  warn(message: string, context?: string) {
    console.warn(JSON.stringify({
      level: 'warn',
      timestamp: new Date().toISOString(),
      context: context || this.context,
      message,
    }));
  }

  debug(message: string, context?: string) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(JSON.stringify({
        level: 'debug',
        timestamp: new Date().toISOString(),
        context: context || this.context,
        message,
      }));
    }
  }
}
```

---

## 2. Request Logging

**`src/common/interceptors/logging.interceptor.ts`**
```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, headers } = request;
    const requestId = uuidv4();
    const startTime = Date.now();

    // Add request ID to request
    request.requestId = requestId;

    this.logger.log(JSON.stringify({
      type: 'request',
      requestId,
      method,
      url,
      ip,
      userAgent: headers['user-agent'],
      userId: request.user?.id,
    }));

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const duration = Date.now() - startTime;

          this.logger.log(JSON.stringify({
            type: 'response',
            requestId,
            method,
            url,
            statusCode: response.statusCode,
            duration: `${duration}ms`,
          }));
        },
        error: (error) => {
          const duration = Date.now() - startTime;

          this.logger.error(JSON.stringify({
            type: 'error',
            requestId,
            method,
            url,
            statusCode: error.status || 500,
            message: error.message,
            duration: `${duration}ms`,
          }));
        },
      }),
    );
  }
}
```

---

## 3. Error Tracking

### Global Exception Filter

**`src/common/filters/http-exception.filter.ts`**
```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse = {
      success: false,
      error: {
        code: this.getErrorCode(status),
        message,
        details: this.getDetails(exception),
      },
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: request.requestId,
    };

    // Log error
    this.logger.error(JSON.stringify({
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      status,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
      userId: request.user?.id,
    }));

    response.status(status).json(errorResponse);
  }

  private getErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_ERROR',
    };
    return codes[status] || 'UNKNOWN_ERROR';
  }

  private getDetails(exception: unknown): any[] {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'object' && 'message' in response) {
        const msg = (response as any).message;
        if (Array.isArray(msg)) return msg;
      }
    }
    return [];
  }
}
```

---

## 4. Health Checks

**`src/health/health.controller.ts`**
```typescript
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { SupabaseService } from '../database/supabase.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private supabase: SupabaseService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => {
        try {
          await this.supabase.client.from('admins').select('count').limit(1);
          return { database: { status: 'up' } };
        } catch {
          return { database: { status: 'down' } };
        }
      },
    ]);
  }

  @Get('live')
  liveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  async readiness() {
    try {
      await this.supabase.client.from('admins').select('count').limit(1);
      return { status: 'ready' };
    } catch {
      return { status: 'not ready' };
    }
  }
}
```

---

## 5. Metrics

### Basic Metrics Endpoint

**`src/metrics/metrics.controller.ts`**
```typescript
@Controller('metrics')
export class MetricsController {
  private startTime = Date.now();
  private requestCount = 0;
  private errorCount = 0;

  @Get()
  getMetrics() {
    return {
      uptime: Date.now() - this.startTime,
      requests: this.requestCount,
      errors: this.errorCount,
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
    };
  }

  incrementRequest() {
    this.requestCount++;
  }

  incrementError() {
    this.errorCount++;
  }
}
```

---

## 6. Railway Logs

### Viewing Logs
1. Railway Dashboard → Project → Deployments
2. Click on active deployment
3. View real-time logs

### Log Filtering
```bash
# Using Railway CLI
railway logs -f

# Filter by level
railway logs | grep "error"

# Last N lines
railway logs -n 100
```

---

## 7. Alerting

### Basic Alert Service

**`src/common/services/alert.service.ts`**
```typescript
@Injectable()
export class AlertService {
  async sendAlert(type: 'error' | 'warning', message: string, details?: any) {
    // Log
    console.error(`[ALERT] ${type.toUpperCase()}: ${message}`, details);

    // Optional: Send to Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 *${type.toUpperCase()}*: ${message}`,
          attachments: details ? [{ text: JSON.stringify(details) }] : [],
        }),
      });
    }

    // Optional: Send email
    // await this.emailService.sendAlert(type, message, details);
  }
}
```

### Usage
```typescript
// In exception filter
if (status === 500) {
  this.alertService.sendAlert('error', 'Internal Server Error', {
    path: request.url,
    message: exception.message,
    requestId: request.requestId,
  });
}
```

---

## 8. Performance Monitoring

### Response Time Tracking
```typescript
@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly threshold = 1000; // 1 second

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        
        if (duration > this.threshold) {
          console.warn(JSON.stringify({
            type: 'slow_request',
            method: request.method,
            url: request.url,
            duration: `${duration}ms`,
          }));
        }
      }),
    );
  }
}
```

---

## 9. Dashboard Metrics

### Key Metrics to Track
- Request count per endpoint
- Error rate
- Response times (p50, p90, p99)
- Active sessions
- Database query times
- Memory/CPU usage

### Supabase Dashboard
- Go to Supabase Dashboard → Reports
- View database metrics
- Monitor storage usage
- Check API usage

---

## 10. Checklist

- [ ] Structured JSON logging enabled
- [ ] Request/response logging
- [ ] Error tracking configured
- [ ] Health check endpoints
- [ ] Slow request alerts
- [ ] Error rate monitoring
- [ ] Database monitoring via Supabase

---

## Related Documentation

- [Railway Setup](./railway-setup.md)
- [CI/CD Pipeline](./ci-cd.md)
