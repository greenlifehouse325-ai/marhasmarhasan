# SMK Marhas - Deployment: Railway Setup

## 1. Railway Overview

Railway adalah platform cloud yang memudahkan deployment aplikasi. Cocok untuk Nest.js backend dengan PostgreSQL.

---

## 2. Project Setup

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### Step 2: Connect Repository
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your backend repository
4. Railway will auto-detect Nest.js

---

## 3. Railway Configuration

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node dist/main",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Dockerfile (Alternative)
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main"]
```

---

## 4. Environment Variables

### Railway Dashboard → Variables

```env
# Node
NODE_ENV=production
PORT=3000

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_KEY=eyJhbGci...

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://admin.marhas.sch.id

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

---

## 5. Health Check Endpoint

**`src/app.controller.ts`**
```typescript
@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
```

---

## 6. Deployment Process

### Automatic Deploy
1. Push to `main` branch
2. Railway auto-detects and builds
3. Deploys to production

### Manual Deploy
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

---

## 7. Custom Domain

### Railway Dashboard → Settings → Domains

1. Add custom domain: `api.marhas.sch.id`
2. Get Railway domain: `xxx.railway.app`
3. Add DNS records:

```
Type: CNAME
Name: api
Value: xxx.railway.app
```

### SSL Certificate
Railway provides free SSL automatically.

---

## 8. Monitoring

### Railway Dashboard → Deployments

- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment history

### Logging
```typescript
// Use structured logging
import { Logger } from '@nestjs/common';

const logger = new Logger('AppService');
logger.log('Server started');
logger.error('Error occurred', error.stack);
```

---

## 9. Scaling

### Horizontal Scaling
- Railway automatically handles scaling
- Add replicas in settings if needed

### Vertical Scaling
- Adjust memory/CPU in plan settings
- Monitor usage and optimize

---

## 10. Deployment Checklist

Before deploying to production:

- [ ] All environment variables set in Railway
- [ ] JWT_SECRET is strong and unique
- [ ] CORS_ORIGIN matches frontend domain
- [ ] Supabase credentials are correct
- [ ] Health check endpoint working
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Rate limiting configured
- [ ] Error handling tested
- [ ] Logging configured

---

## 11. Rollback

### Via Dashboard
1. Go to Deployments
2. Click on previous deployment
3. Click "Rollback"

### Via CLI
```bash
railway rollback
```

---

## 12. Common Issues

### Build Fails
- Check build logs
- Verify package.json scripts
- Ensure all dependencies listed

### Start Fails
- Check start command
- Verify dist/ folder exists
- Check environment variables

### Connection Issues
- Verify CORS settings
- Check Supabase connectivity
- Verify PORT configuration

---

## Related Documentation

- [CI/CD Setup](./ci-cd.md)
- [Environment Config](../06-integration/environment-config.md)
