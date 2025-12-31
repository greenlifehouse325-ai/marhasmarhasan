# SMK Marhas - Backend Documentation Index

## 📚 Documentation Overview

Dokumentasi lengkap untuk backend SMK Marhas Admin Dashboard.

---

## 1. Architecture (01-architecture/)

| File | Description |
|------|-------------|
| [overview.md](./01-architecture/overview.md) | System overview, diagram, dan arsitektur |
| [folder-structure.md](./01-architecture/folder-structure.md) | Struktur folder proyek backend |
| [design-patterns.md](./01-architecture/design-patterns.md) | Design patterns yang digunakan |
| [security-model.md](./01-architecture/security-model.md) | Model keamanan multi-layer |
| [tech-stack.md](./01-architecture/tech-stack.md) | Teknologi yang digunakan |

---

## 2. Database (02-database/)

| File | Description |
|------|-------------|
| [schema-complete.md](./02-database/schema-complete.md) | Schema database lengkap |
| [supabase-setup.md](./02-database/supabase-setup.md) | Panduan setup Supabase |
| [rls-policies.md](./02-database/rls-policies.md) | Row Level Security policies |
| [migrations.md](./02-database/migrations.md) | Database migrations |
| [indexes-performance.md](./02-database/indexes-performance.md) | Indexes dan optimisasi |

---

## 3. Authentication (03-authentication/)

| File | Description |
|------|-------------|
| [jwt-implementation.md](./03-authentication/jwt-implementation.md) | JWT authentication |
| [role-based-access.md](./03-authentication/role-based-access.md) | RBAC implementation |
| [session-management.md](./03-authentication/session-management.md) | Session handling |
| [password-security.md](./03-authentication/password-security.md) | Password security |
| [2fa-implementation.md](./03-authentication/2fa-implementation.md) | Two-factor auth |

---

## 4. API Endpoints (04-api-endpoints/)

| File | Description |
|------|-------------|
| [auth-api.md](./04-api-endpoints/auth-api.md) | Authentication endpoints |
| [siswa-guru-kelas-api.md](./04-api-endpoints/siswa-guru-kelas-api.md) | Academic endpoints |
| [perpustakaan-api.md](./04-api-endpoints/perpustakaan-api.md) | Library endpoints |
| [keuangan-api.md](./04-api-endpoints/keuangan-api.md) | Finance endpoints |
| [absensi-jadwal-api.md](./04-api-endpoints/absensi-jadwal-api.md) | Attendance endpoints |
| [aplikasi-admin-api.md](./04-api-endpoints/aplikasi-admin-api.md) | App & admin endpoints |

---

## 5. Services (05-services/)

| File | Description |
|------|-------------|
| [base-service.md](./05-services/base-service.md) | Base service pattern |
| [audit-logging.md](./05-services/audit-logging.md) | Audit logging service |
| [file-upload.md](./05-services/file-upload.md) | File upload service |
| [notification-service.md](./05-services/notification-service.md) | Notification service |
| [export-report.md](./05-services/export-report.md) | Export & report service |

---

## 6. Integration (06-integration/)

| File | Description |
|------|-------------|
| [api-client.md](./06-integration/api-client.md) | Frontend API client |
| [websocket.md](./06-integration/websocket.md) | WebSocket & realtime |
| [environment-config.md](./06-integration/environment-config.md) | Environment setup |

---

## 7. Deployment (07-deployment/)

| File | Description |
|------|-------------|
| [railway-setup.md](./07-deployment/railway-setup.md) | Railway deployment |
| [ci-cd.md](./07-deployment/ci-cd.md) | CI/CD pipeline |
| [monitoring.md](./07-deployment/monitoring.md) | Monitoring & logging |

---

## 8. Tutorials (08-tutorials/)

| File | Description |
|------|-------------|
| [backend-setup.md](./08-tutorials/backend-setup.md) | Backend setup guide |
| [adding-new-module.md](./08-tutorials/adding-new-module.md) | Adding new module |
| [security-best-practices.md](./08-tutorials/security-best-practices.md) | Security practices |
| [frontend-integration.md](./08-tutorials/frontend-integration.md) | Frontend integration |

---

## Quick Links

### For New Developers
1. Start with [Backend Setup Tutorial](./08-tutorials/backend-setup.md)
2. Understand [Architecture Overview](./01-architecture/overview.md)
3. Learn [Adding New Module](./08-tutorials/adding-new-module.md)

### For Security Review
1. [Security Model](./01-architecture/security-model.md)
2. [RLS Policies](./02-database/rls-policies.md)
3. [Security Best Practices](./08-tutorials/security-best-practices.md)

### For API Integration
1. [API Endpoints](./04-api-endpoints/)
2. [Frontend Integration](./08-tutorials/frontend-integration.md)
3. [API Client](./06-integration/api-client.md)

### For Deployment
1. [Railway Setup](./07-deployment/railway-setup.md)
2. [CI/CD Pipeline](./07-deployment/ci-cd.md)
3. [Monitoring](./07-deployment/monitoring.md)

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Backend Framework | Nest.js (Node.js) |
| Database | PostgreSQL (Supabase) |
| Authentication | JWT + Supabase Auth |
| Storage | Supabase Storage |
| Realtime | WebSocket / Supabase Realtime |
| Validation | class-validator |
| Documentation | Swagger |
| Deployment | Railway |

---

## Admin Roles

| Role | Access |
|------|--------|
| `super_admin` | Full access |
| `admin_perpustakaan` | Library module |
| `admin_keuangan` | Finance module |
| `admin_absensi` | Attendance module |
| `admin_jadwal` | Schedule module |
| `admin_aplikasi` | App content |

---

## Contact

For questions or issues:
- Create issue in repository
- Contact system administrator

---

*Last updated: December 2024*
