# Railway Deployment Guide for Marhas Admin Dashboard

## 1. Project Configuration
The project is configured for Railway deployment:
- **Node Engine**: `>=18.0.0` (in `package.json`)
- **Standalone Output**: Enabled (in `next.config.ts`)

## 2. Railway Setup
1. **New Service**: Select "Deploy from GitHub repo".
2. **Root Directory**: Leave as `/` (unless this is a monorepo).
3. **Build Command**: `npm run build`
4. **Start Command**: `npm start`

## 3. Environment Variables
Add these in Railway "Variables":
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```
