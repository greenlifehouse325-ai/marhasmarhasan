# Railway Deployment Guide for Marhas Admin Dashboard

## 🚀 Deployment Method

This project uses a **custom Dockerfile** for Railway deployment to avoid Nixpacks cache mount issues.

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage Docker build |
| `.dockerignore` | Excludes unnecessary files from build |
| `railway.toml` | Railway configuration |

---

## 🐳 Dockerfile Architecture

```
┌─────────────────────────────────────────┐
│  Stage 1: deps (node:20-alpine)         │
│  - Installs npm dependencies            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Stage 2: builder (node:20-alpine)      │
│  - Copies deps from Stage 1             │
│  - Runs npm build                       │
│  - Copies static files to standalone    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Stage 3: runner (node:20-alpine)       │
│  - Minimal production image             │
│  - Runs as non-root user (nextjs)       │
│  - Exposes port 3000                    │
└─────────────────────────────────────────┘
```

---

## 🔑 Environment Variables

Add these in Railway Dashboard → Variables:

```env
# Required
NODE_ENV=production

# Optional - Your backend API
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

---

## 🧪 Local Docker Testing

Test the Docker build locally:

```bash
# Build the image
docker build -t marhas-admin .

# Run the container
docker run -p 3000:3000 marhas-admin
```

---

## ⚠️ Troubleshooting

### Error: EBUSY cache mount
**Solution**: This is fixed by using custom Dockerfile instead of Nixpacks

### Error: 502 Bad Gateway
**Possible causes**:
1. Static files not copied to standalone folder
2. PORT not bound correctly
3. Application crashes on startup

**Check Railway logs for**:
- `Ready on http://0.0.0.0:3000`
- Any startup errors

### Error: Images not loading
**Solution**: Ensure `public/` is copied in Dockerfile (already done)

---

## ✅ Deployment Checklist

- [x] `Dockerfile` - Multi-stage build
- [x] `.dockerignore` - Excludes node_modules, .next, etc.
- [x] `railway.toml` - Uses DOCKERFILE builder
- [x] `next.config.ts` - output: "standalone"
- [ ] Environment variables set in Railway
- [ ] Health check passes (GET /)

---

## 📝 Notes
- **Node Version**: 20 (Alpine)
- **Port**: 3000 (exposed via Dockerfile)
- **User**: Runs as non-root `nextjs` user for security
- **Image Size**: Optimized with multi-stage build
