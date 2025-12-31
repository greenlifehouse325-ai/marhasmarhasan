# SMK Marhas - Deployment: CI/CD Pipeline

## 1. GitHub Actions

### Backend CI/CD

**`.github/workflows/backend.yml`**
```yaml
name: Backend CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'backend/**'
  pull_request:
    branches: [main]
    paths:
      - 'backend/**'

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
        working-directory: backend
      
      - name: Run linter
        run: npm run lint
        working-directory: backend
      
      - name: Run tests
        run: npm run test
        working-directory: backend
        env:
          NODE_ENV: test
          JWT_SECRET: test-secret-for-ci
      
      - name: Run e2e tests
        run: npm run test:e2e
        working-directory: backend
        env:
          NODE_ENV: test
          JWT_SECRET: test-secret-for-ci

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
        working-directory: backend
      
      - name: Build
        run: npm run build
        working-directory: backend
      
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: backend-dist
          path: backend/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

### Frontend CI/CD

**`.github/workflows/frontend.yml`**
```yaml
name: Frontend CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'frontend/**'
      - 'next.js_admin/**'
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: next.js_admin/package-lock.json
      
      - name: Install dependencies
        run: npm ci
        working-directory: next.js_admin
      
      - name: Run linter
        run: npm run lint
        working-directory: next.js_admin
      
      - name: Type check
        run: npm run type-check
        working-directory: next.js_admin
        continue-on-error: true
      
      - name: Build
        run: npm run build
        working-directory: next.js_admin
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

  deploy:
    needs: lint-and-build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: frontend
```

---

## 2. Branch Strategy

```
main        ─────●─────────────●─────────────●──────
                 │             │             │
                 │             │             │
develop     ────●────●────●────●────●────●────●─────
                │         │         │
                │         │         │
feature/*  ────●─────────●         │
                                   │
bugfix/*                  ────────●
```

### Branches
- `main` - Production ready code
- `develop` - Development integration
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Emergency production fixes

---

## 3. Pull Request Template

**`.github/pull_request_template.md`**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing done

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings

## Screenshots (if applicable)
```

---

## 4. GitHub Secrets

### Required Secrets

| Secret | Description |
|--------|-------------|
| `RAILWAY_TOKEN` | Railway deployment token |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

### Setting Secrets
1. Go to Repository → Settings → Secrets → Actions
2. Click "New repository secret"
3. Add each secret

---

## 5. Release Process

### Semantic Versioning
```
MAJOR.MINOR.PATCH

v1.0.0 - Initial release
v1.1.0 - New feature
v1.1.1 - Bug fix
v2.0.0 - Breaking change
```

### Release Workflow

**`.github/workflows/release.yml`**
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
```

### Creating a Release
```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"

# Push the tag
git push origin v1.0.0
```

---

## 6. Environment-specific Deploys

### Staging
```yaml
deploy-staging:
  if: github.ref == 'refs/heads/develop'
  steps:
    - name: Deploy to Staging
      env:
        RAILWAY_SERVICE: backend-staging
```

### Production
```yaml
deploy-production:
  if: github.ref == 'refs/heads/main'
  needs: [test, build]
  environment: production
  steps:
    - name: Deploy to Production
```

---

## 7. Notification

### Slack Notification
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    fields: repo,message,commit,author,action,eventName,ref,workflow
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

---

## 8. Database Migrations

```yaml
migrate:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - name: Run Migrations
      run: |
        npx supabase db push
      env:
        SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## 9. Rollback Strategy

### Automatic Rollback
```yaml
- name: Health Check
  run: |
    for i in {1..10}; do
      curl -f ${{ env.HEALTH_URL }} && exit 0
      sleep 10
    done
    exit 1

- name: Rollback on Failure
  if: failure()
  run: railway rollback
```

---

## Related Documentation

- [Railway Setup](./railway-setup.md)
- [Monitoring](./monitoring.md)
