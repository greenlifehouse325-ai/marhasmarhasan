# Railway Deployment Guide for Marhas Admin Dashboard

## 🚀 Quick Deployment

### Method 1: Automatic (Recommended)
Simply push to your connected GitHub repository. Railway will use `railway.toml` and `nixpacks.toml` for configuration.

### Method 2: Manual Configuration
If automatic detection fails, use these settings:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm ci && npm run build && cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/` |
| **Start Command** | `node .next/standalone/server.js` |

---

## 🔧 Environment Variables

Add these in Railway Dashboard → Variables:

```env
# Required
NODE_ENV=production

# Optional - Your backend API
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

---

## ⚠️ Important: 502 Bad Gateway Fix

The 502 error is typically caused by **missing static files in standalone build**. This is fixed by our configuration which copies:
- `public/` → `.next/standalone/public/`
- `.next/static/` → `.next/standalone/.next/static/`

### Configuration Files
1. **`railway.toml`** - Railway-specific configuration
2. **`nixpacks.toml`** - Build phases and dependencies
3. **`next.config.ts`** - Next.js standalone output mode

---

## 🧪 Local Testing

Test the production build locally before deploying:

```powershell
# Step 1: Build
npm run build

# Step 2: Copy static files (Windows PowerShell)
Copy-Item -Path "public" -Destination ".next\standalone\public" -Recurse -Force
Copy-Item -Path ".next\static" -Destination ".next\standalone\.next\static" -Recurse -Force

# Step 3: Start server
$env:PORT = "3000"; $env:HOSTNAME = "0.0.0.0"; node .next/standalone/server.js
```

For Linux/macOS:
```bash
# Build and copy
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Start server
PORT=3000 HOSTNAME=0.0.0.0 node .next/standalone/server.js
```

---

## 📊 Health Check

Railway performs health checks on the `"/"` route. Ensure your homepage returns a 200 status code.

---

## 🔍 Troubleshooting

### Issue: 502 Bad Gateway
**Cause**: Static files not copied to standalone folder
**Solution**: Ensure build command includes the `cp` commands

### Issue: Application crashes on start
**Cause**: Missing environment variables or Node.js version mismatch
**Solution**: 
- Check Railway logs for specific errors
- Ensure `NODE_ENV=production` is set
- Verify Node.js version is >= 20.9.0

### Issue: Images not loading
**Cause**: Public folder not in standalone directory
**Solution**: The `cp -r public .next/standalone/` command should fix this

---

## 📁 Project Structure

```
├── railway.toml           # Railway deployment config
├── nixpacks.toml          # Nixpacks build config
├── next.config.ts         # Next.js config (output: standalone)
├── package.json           # Dependencies and scripts
├── public/                # Static assets (copied to standalone)
├── src/                   # Application source code
└── .next/
    ├── standalone/        # Production build
    │   ├── server.js      # Production server
    │   ├── public/        # Copied from /public
    │   └── .next/
    │       └── static/    # Copied from /.next/static
    └── static/            # Built static assets
```

---

## ✅ Checklist Before Deploy

- [ ] `npm run build` completes without errors
- [ ] `railway.toml` exists in project root
- [ ] `nixpacks.toml` exists in project root
- [ ] Environment variables are set in Railway
- [ ] Local production test works (`node .next/standalone/server.js`)

---

## 📝 Notes
- **Node Version**: >= 20.9.0
- **Standalone Mode**: Enabled in `next.config.ts`
- **Port**: Automatically uses Railway's `PORT` env variable
- **Hostname**: Server binds to `0.0.0.0` for external access
