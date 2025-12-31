# SMK Marhas - Supabase Setup

## 1. Create Supabase Project

### Step 1: Sign Up / Login
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub or email
3. Click **New Project**

### Step 2: Project Configuration
```
Organization: SMK Marhas
Project Name: marhas-admin
Database Password: [Strong password - SAVE THIS!]
Region: Southeast Asia (Singapore)
Pricing Plan: Free tier / Pro
```

### Step 3: Wait for Setup
- Database provisioning: ~2 minutes
- Save the displayed credentials

---

## 2. Get Credentials

### Dashboard → Settings → API

```
Project URL: https://xxxxxx.supabase.co
Anon Key:    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Dashboard → Settings → Database

```
Host:     db.xxxxxx.supabase.co
Port:     5432
Database: postgres
User:     postgres
Password: [Your database password]

Connection String:
postgresql://postgres:[PASSWORD]@db.xxxxxx.supabase.co:5432/postgres
```

---

## 3. Environment Variables

### Backend (.env)
```env
# Supabase
SUPABASE_URL=https://xxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Direct DB connection (optional, for migrations)
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxxxxx.supabase.co:5432/postgres
```

### Frontend (.env.local)
```env
# Only anon key for frontend (public)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **NEVER expose SERVICE_KEY to frontend!**

---

## 4. Install Supabase Client

### Backend (Nest.js)
```bash
npm install @supabase/supabase-js
```

### Create Supabase Module

**`src/database/supabase.module.ts`**
```typescript
import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
```

**`src/database/supabase.service.ts`**
```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.config.get<string>('SUPABASE_URL');
    const supabaseKey = this.config.get<string>('SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}
```

---

## 5. Run Migrations

### Option 1: SQL Editor (Dashboard)
1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New query**
3. Paste SQL from `migrations/001_initial_schema.sql`
4. Click **Run**
5. Repeat for each migration file

### Option 2: Supabase CLI
```bash
# Install
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Option 3: Direct psql
```bash
# Install psql if needed
# Windows: Install PostgreSQL
# Mac: brew install postgresql

# Connect and run
psql "postgresql://postgres:PASSWORD@db.xxxxxx.supabase.co:5432/postgres" \
  -f migrations/001_initial_schema.sql
```

---

## 6. Setup Storage Buckets

### Dashboard → Storage

Create buckets:

| Bucket Name | Public | File Size Limit |
|-------------|--------|-----------------|
| `avatars` | ❌ | 5MB |
| `photos-siswa` | ❌ | 5MB |
| `photos-guru` | ❌ | 5MB |
| `book-covers` | ✅ | 2MB |
| `documents` | ❌ | 10MB |
| `attachments` | ❌ | 10MB |

### Storage Policies (RLS)
```sql
-- Allow authenticated users to upload to avatars
CREATE POLICY "Admins can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

-- Allow public read for book covers
CREATE POLICY "Public read book covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-covers');
```

---

## 7. Enable Realtime

### Dashboard → Database → Replication

Enable realtime for tables:
- [ ] `notifikasi`
- [ ] `pengumuman`
- [ ] `absensi_record`

```sql
-- Or via SQL
ALTER PUBLICATION supabase_realtime ADD TABLE notifikasi;
ALTER PUBLICATION supabase_realtime ADD TABLE pengumuman;
```

---

## 8. Seed Initial Data

```sql
-- Insert super admin
INSERT INTO admins (email, password, name, role, status) VALUES
('superadmin@marhas.sch.id', '$2b$10$...hashed...', 'Super Admin', 'super_admin', 'active');

-- Insert jurusan
INSERT INTO jurusan (kode, name, description) VALUES
('PPLG', 'Pengembangan Perangkat Lunak dan Gim', 'Program keahlian IT'),
('TKJ', 'Teknik Komputer dan Jaringan', 'Program keahlian jaringan'),
('TMS', 'Teknik Mesin', 'Program keahlian mesin');

-- Insert tahun ajaran
INSERT INTO tahun_ajaran (name, start_date, end_date, is_active) VALUES
('2024/2025', '2024-07-15', '2025-06-30', true);

-- Insert mapel
INSERT INTO mapel (kode, name, kategori, jam_per_minggu) VALUES
('MTK', 'Matematika', 'normatif', 4),
('BIG', 'Bahasa Inggris', 'normatif', 4),
('BIN', 'Bahasa Indonesia', 'normatif', 4),
('PAI', 'Pendidikan Agama Islam', 'normatif', 2),
('PBO', 'Pemrograman Berorientasi Objek', 'produktif', 6),
('WEB', 'Pemrograman Web', 'produktif', 6);
```

---

## 9. Test Connection

### Via Backend
```typescript
// test connection
async testConnection() {
  const { data, error } = await this.supabase.client
    .from('admins')
    .select('count')
    .limit(1);

  if (error) {
    console.error('Connection failed:', error);
    return false;
  }

  console.log('Connected to Supabase!');
  return true;
}
```

### Via Dashboard
1. Go to **Table Editor**
2. Verify tables exist
3. Check row counts

---

## 10. Security Checklist

- [ ] Service Key only in backend `.env`
- [ ] Anon Key only in frontend
- [ ] RLS enabled on all tables
- [ ] Policies properly configured
- [ ] Storage policies set
- [ ] Database password is strong
- [ ] SSL mode enabled (default)

---

## Related Documentation

- [Schema Complete](./schema-complete.md)
- [RLS Policies](./rls-policies.md)
- [Migrations](./migrations.md)
