# SMK Marhas - Backend Architecture Overview

## 1. System Overview

SMK Marhas Admin Dashboard adalah sistem manajemen sekolah berbasis cloud yang menggabungkan **Next.js** (Frontend), **Nest.js** (Backend), dan **Supabase** (Database + Auth).

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14)                     │
│                    admin.marhas.sch.id                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │Dashboard │ │Perpust.  │ │Keuangan  │ │Absensi   │ ...       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                            ▼                                     │
│                   React Query + Axios                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Nest.js)                         │
│                     api.marhas.sch.id                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      API Gateway                          │  │
│  │    - Rate Limiting   - CORS   - JWT Validation           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ▼                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │AuthModule│ │SiswaModule│ │Perpust.  │ │Keuangan  │ ...      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                            ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Service Layer (Business Logic)               │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Supabase Client
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE CLOUD                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ PostgreSQL   │  │  Auth        │  │   Storage    │          │
│  │ (Database)   │  │ (JWT/OAuth)  │  │   (Files)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │ Realtime     │  │  Edge Func   │                            │
│  │ (WebSocket)  │  │  (Serverless)│                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Admin Roles Hierarchy

Sistem memiliki **6 role admin** dengan permission berbeda:

```
                    ┌─────────────────┐
                    │   SUPER_ADMIN   │
                    │  Full Control   │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ ADMIN_PERPUST  │  │ ADMIN_KEUANGAN │  │ ADMIN_ABSENSI  │
│   Library      │  │   Finance      │  │  Attendance    │
└────────────────┘  └────────────────┘  └────────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐
│ ADMIN_JADWAL   │  │ ADMIN_APLIKASI │
│   Schedule     │  │   App Content  │
└────────────────┘  └────────────────┘
```

### Role → Module Access Matrix

| Role | Super Admin | Perpustakaan | Keuangan | Absensi | Jadwal | Aplikasi |
|------|:-----------:|:------------:|:--------:|:-------:|:------:|:--------:|
| super_admin | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| admin_perpustakaan | ❌ | ✅ Full | ❌ | ❌ | ❌ | ❌ |
| admin_keuangan | ❌ | ❌ | ✅ Full | ❌ | ❌ | ❌ |
| admin_absensi | ❌ | ❌ | ❌ | ✅ Full | ❌ | ❌ |
| admin_jadwal | ❌ | ❌ | ❌ | ❌ | ✅ Full | ❌ |
| admin_aplikasi | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Full |

---

## 3. Data Flow

### 3.1 Read Flow (GET Request)
```
Frontend                    Backend                     Supabase
   │                           │                           │
   │  GET /api/siswa?page=1    │                           │
   ├──────────────────────────>│                           │
   │                           │  JWT Validation           │
   │                           ├─────────────────>         │
   │                           │  Permission Check         │
   │                           ├─────────────────>         │
   │                           │                           │
   │                           │  SELECT * FROM siswa      │
   │                           ├──────────────────────────>│
   │                           │                           │
   │                           │  rows[]                   │
   │                           │<──────────────────────────│
   │                           │                           │
   │  { data: [...], meta }    │                           │
   │<──────────────────────────│                           │
```

### 3.2 Write Flow (POST/PUT/DELETE)
```
Frontend                    Backend                     Supabase
   │                           │                           │
   │  POST /api/siswa          │                           │
   │  { name, nisn, ... }      │                           │
   ├──────────────────────────>│                           │
   │                           │  Validate Input (DTO)     │
   │                           │  Check Permission         │
   │                           │                           │
   │                           │  INSERT INTO siswa        │
   │                           ├──────────────────────────>│
   │                           │                           │
   │                           │  new_row                  │
   │                           │<──────────────────────────│
   │                           │                           │
   │                           │  Log to audit_logs        │
   │                           ├──────────────────────────>│
   │                           │                           │
   │  { success: true, data }  │                           │
   │<──────────────────────────│                           │
```

---

## 4. Module Dependencies

```
                    ┌─────────────┐
                    │    Auth     │
                    │   Module    │
                    └──────┬──────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
    ▼                      ▼                      ▼
┌─────────┐         ┌─────────────┐        ┌─────────┐
│ Siswa   │◄───────►│ Kelas/Guru  │◄──────►│ Jadwal  │
│ Module  │         │   Module    │        │ Module  │
└────┬────┘         └──────┬──────┘        └─────────┘
     │                     │
     │    ┌────────────────┤
     │    │                │
     ▼    ▼                ▼
┌─────────────┐      ┌─────────────┐
│ Perpustakaan│      │   Absensi   │
│   Module    │      │   Module    │
└─────────────┘      └─────────────┘
     │                     │
     ▼                     ▼
┌─────────────────────────────────┐
│           Keuangan              │
│            Module               │
└─────────────────────────────────┘
                │
                ▼
        ┌─────────────┐
        │   Aplikasi  │ (Notif, News, etc)
        │   Module    │
        └─────────────┘
```

---

## 5. Key Design Decisions

### 5.1 Why Nest.js?
- **Modular Architecture**: Setiap domain (Siswa, Guru, Keuangan) = 1 module
- **TypeScript Native**: Konsisten dengan frontend
- **Decorator Pattern**: Clean validation dengan class-validator
- **Dependency Injection**: Easy testing & maintainability

### 5.2 Why Supabase?
- **PostgreSQL**: Robust relational database
- **Built-in Auth**: JWT, OAuth, Passwordless
- **Row Level Security (RLS)**: Database-level permission
- **Realtime**: WebSocket subscriptions
- **Storage**: File upload dengan CDN
- **Edge Functions**: Serverless untuk webhook

### 5.3 Stateless Architecture
- JWT untuk authentication (tidak butuh session store)
- Horizontal scaling friendly
- CDN-ready untuk static assets

---

## 6. Environments

| Environment | Frontend | Backend | Database |
|-------------|----------|---------|----------|
| Development | localhost:3000 | localhost:4000 | Supabase Local |
| Staging | staging.marhas.sch.id | api-staging.marhas.sch.id | Supabase Staging |
| Production | admin.marhas.sch.id | api.marhas.sch.id | Supabase Production |

---

## 7. External Integrations

1. **Supabase Auth** - JWT authentication
2. **Supabase Storage** - File uploads (foto, dokumen)
3. **Supabase Realtime** - Live notifications
4. **SMTP** - Email notifications (via Supabase Edge Functions)
5. **WhatsApp API** - Parent notifications (optional)

---

## 8. Related Documentation

- [Folder Structure](./folder-structure.md)
- [Design Patterns](./design-patterns.md)
- [Security Model](./security-model.md)
- [Tech Stack Details](./tech-stack.md)
