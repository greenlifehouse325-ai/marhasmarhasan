# SMK Marhas Admin - Deployment Guide

## Overview

Panduan deployment untuk frontend (Next.js) dan backend (Nest.js) ke production.

---

## Frontend Deployment (Railway/Vercel)

### Option 1: Railway

#### 1. Setup Project

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init
```

#### 2. Environment Variables

Set di Railway Dashboard:

```
NEXT_PUBLIC_API_URL=https://api.marhas.sch.id/v1
NEXT_PUBLIC_APP_NAME=SMK Marhas Admin
NODE_ENV=production
```

#### 3. Railway Configuration

**`railway.json`**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

#### 4. Deploy

```bash
railway up
```

---

### Option 2: Vercel

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Deploy

```bash
vercel --prod
```

#### 3. vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.marhas.sch.id/v1"
  }
}
```

---

## Backend Deployment (Railway)

### 1. Nest.js Dockerfile

**`Dockerfile`**

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
```

### 2. Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/marhas_db

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# App
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://admin.marhas.sch.id
```

### 3. Railway Deploy

```bash
cd backend
railway init
railway up
```

---

## Database Setup (Supabase)

### 1. Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string

### 2. Run Migrations

```bash
# Using Prisma
npx prisma migrate deploy

# Or direct SQL
psql $DATABASE_URL < migrations/001_initial.sql
```

### 3. Seed Data

```bash
npx prisma db seed
```

---

## CI/CD Pipeline (GitHub Actions)

### Frontend CI/CD

**`.github/workflows/frontend.yml`**

```yaml
name: Frontend CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
      
      - name: Deploy to Railway
        if: github.ref == 'refs/heads/main'
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: frontend
```

### Backend CI/CD

**`.github/workflows/backend.yml`**

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./backend
        run: npm ci
      
      - name: Run tests
        working-directory: ./backend
        run: npm run test
      
      - name: Build
        working-directory: ./backend
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

---

## Domain Configuration

### 1. DNS Settings

Add these records to your domain:

| Type | Name | Value |
|------|------|-------|
| A | admin | Railway/Vercel IP |
| CNAME | api | backend.railway.app |

### 2. SSL

Railway dan Vercel automatically provide SSL certificates.

### 3. Custom Domain in Railway

```bash
railway domain add admin.marhas.sch.id
```

---

## Monitoring & Logging

### 1. Railway Metrics

Dashboard built-in di Railway untuk:
- CPU/Memory usage
- Request count
- Error rates

### 2. Logging

```typescript
// backend/src/main.ts
import { Logger } from '@nestjs/common';

const app = await NestFactory.create(AppModule);
app.useLogger(new Logger());
```

### 3. Health Check Endpoint

```typescript
// backend/src/health/health.controller.ts
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
```

---

## Backup Strategy

### Database Backup (Supabase)

1. Enable Point-in-Time Recovery (PITR)
2. Schedule daily backups
3. Test restore monthly

### Manual Backup

```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

---

## Rollback Procedure

### Railway Rollback

```bash
# List deployments
railway logs

# Rollback to previous
railway rollback
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup_20240115.sql

# Or use Prisma
npx prisma migrate reset
npx prisma migrate deploy
```

---

## Security Checklist

- [ ] Environment variables secured (not in code)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevented (use Prisma/TypeORM)
- [ ] XSS protection headers
- [ ] HTTPS only
- [ ] JWT secret is strong and unique
- [ ] Database credentials rotated regularly
- [ ] Audit logging enabled
- [ ] Error messages don't leak sensitive info

---

## Performance Optimization

### Frontend

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['storage.marhas.sch.id'],
  },
  swcMinify: true,
  compress: true,
};
```

### Backend

```typescript
// Enable compression
app.use(compression());

// Enable caching headers
app.use(helmet());
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### 502 Bad Gateway

1. Check PORT environment variable
2. Verify start command
3. Check logs: `railway logs`

### Database Connection

1. Verify DATABASE_URL
2. Check firewall/IP allowlist
3. Test with: `psql $DATABASE_URL`
