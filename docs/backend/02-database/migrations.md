# SMK Marhas - Database Migrations

## 1. Migration Strategy

Migrations dikelola secara manual dengan file SQL yang dieksekusi melalui Supabase Dashboard atau CLI.

```
docs/backend/02-database/sql/
├── 001_initial_schema.sql       # Core tables
├── 002_academic_tables.sql      # Siswa, guru, kelas
├── 003_perpustakaan_tables.sql  # Buku, peminjaman
├── 004_keuangan_tables.sql      # SPP, transaksi
├── 005_absensi_tables.sql       # Session, record
├── 006_jadwal_tables.sql        # Jadwal, kalender
├── 007_aplikasi_tables.sql      # Pengumuman, berita
├── 008_add_indexes.sql          # Performance indexes
├── 009_add_rls_policies.sql     # Row Level Security
└── 010_seed_data.sql            # Initial data
```

---

## 2. Migration Files

### 001_initial_schema.sql
```sql
-- =============================================
-- SMK MARHAS - Initial Schema
-- Version: 001
-- Description: Core tables (admins, sessions, devices, audit)
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full text search for Indonesian
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create admin role enum
DO $$ BEGIN
    CREATE TYPE admin_role AS ENUM (
        'super_admin',
        'admin_perpustakaan',
        'admin_keuangan',
        'admin_absensi',
        'admin_jadwal',
        'admin_aplikasi'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(500),
    role admin_role NOT NULL,
    permissions JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'active',
    is_banned BOOLEAN DEFAULT false,
    banned_until TIMESTAMP,
    banned_reason TEXT,
    assigned_by UUID,
    assigned_at TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT chk_admin_status CHECK (status IN ('active', 'inactive', 'suspended'))
);

-- Self-reference for assigned_by
ALTER TABLE admins ADD CONSTRAINT fk_admin_assigned_by 
    FOREIGN KEY (assigned_by) REFERENCES admins(id);

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    fingerprint TEXT NOT NULL,
    name VARCHAR(255),
    browser VARCHAR(100),
    os VARCHAR(100),
    ip_address VARCHAR(45),
    location VARCHAR(255),
    is_whitelisted BOOLEAN DEFAULT false,
    is_trusted BOOLEAN DEFAULT false,
    last_used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    device_id UUID REFERENCES devices(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id),
    admin_name VARCHAR(255),
    admin_role admin_role,
    action VARCHAR(50) NOT NULL,
    resource VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_id VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_role ON admins(role);
CREATE INDEX idx_admins_status ON admins(status);

CREATE INDEX idx_devices_admin ON devices(admin_id);
CREATE UNIQUE INDEX idx_devices_fingerprint ON devices(admin_id, fingerprint);

CREATE INDEX idx_sessions_admin ON sessions(admin_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_active ON sessions(is_active) WHERE is_active = true;

CREATE INDEX idx_audit_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_resource ON audit_logs(resource);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to admins
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 002_academic_tables.sql
```sql
-- =============================================
-- SMK MARHAS - Academic Tables
-- Version: 002
-- Description: Siswa, guru, kelas, orangtua
-- =============================================

-- Jurusan table
CREATE TABLE IF NOT EXISTS jurusan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    kepala_id UUID,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tahun ajaran table
CREATE TABLE IF NOT EXISTS tahun_ajaran (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20) UNIQUE NOT NULL,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Guru table
CREATE TABLE IF NOT EXISTS guru (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nip VARCHAR(20) UNIQUE,
    nuptk VARCHAR(20),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    gender CHAR(1) CHECK (gender IN ('L', 'P')),
    birth_date DATE,
    birth_place VARCHAR(100),
    address TEXT,
    photo VARCHAR(500),
    status_kepegawaian VARCHAR(20),
    bidang_studi VARCHAR(100),
    pendidikan VARCHAR(50),
    campus VARCHAR(10),
    is_homeroom BOOLEAN DEFAULT false,
    homeroom_class_id UUID,
    start_date DATE,
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'retired')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Kelas table
CREATE TABLE IF NOT EXISTS kelas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    grade SMALLINT CHECK (grade IN (10, 11, 12)),
    jurusan VARCHAR(50),
    nomor SMALLINT,
    campus SMALLINT CHECK (campus IN (1, 2)),
    wali_kelas_id UUID REFERENCES guru(id),
    tahun_ajaran VARCHAR(10),
    kapasitas SMALLINT DEFAULT 36,
    ruangan VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Update guru homeroom reference
ALTER TABLE guru ADD CONSTRAINT fk_guru_homeroom 
    FOREIGN KEY (homeroom_class_id) REFERENCES kelas(id);

-- Siswa table
CREATE TABLE IF NOT EXISTS siswa (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nisn VARCHAR(10) UNIQUE NOT NULL,
    nis VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    gender CHAR(1) NOT NULL CHECK (gender IN ('L', 'P')),
    birth_date DATE,
    birth_place VARCHAR(100),
    religion VARCHAR(20),
    address TEXT,
    photo VARCHAR(500),
    kelas_id UUID REFERENCES kelas(id),
    jurusan VARCHAR(50),
    campus SMALLINT CHECK (campus IN (1, 2)),
    tahun_masuk VARCHAR(10),
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'graduated', 'dropped')),
    enrolled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Orangtua table
CREATE TABLE IF NOT EXISTS orangtua (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(20) CHECK (relationship IN ('ayah', 'ibu', 'wali')),
    phone VARCHAR(20),
    email VARCHAR(255),
    occupation VARCHAR(100),
    address TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Siswa-Orangtua junction table
CREATE TABLE IF NOT EXISTS siswa_orangtua (
    siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    orangtua_id UUID REFERENCES orangtua(id) ON DELETE CASCADE,
    PRIMARY KEY (siswa_id, orangtua_id)
);

-- Mapel table
CREATE TABLE IF NOT EXISTS mapel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode VARCHAR(10) UNIQUE,
    name VARCHAR(100) NOT NULL,
    kategori VARCHAR(50),
    jam_per_minggu SMALLINT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_guru_nip ON guru(nip);
CREATE INDEX idx_guru_status ON guru(status);

CREATE UNIQUE INDEX idx_kelas_unique ON kelas(grade, jurusan, nomor, tahun_ajaran);
CREATE INDEX idx_kelas_tahun ON kelas(tahun_ajaran);

CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_siswa_nis ON siswa(nis);
CREATE INDEX idx_siswa_kelas ON siswa(kelas_id);
CREATE INDEX idx_siswa_status ON siswa(status);
CREATE INDEX idx_siswa_search ON siswa USING gin(to_tsvector('indonesian', name));

-- Triggers
CREATE TRIGGER update_guru_updated_at
    BEFORE UPDATE ON guru
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_siswa_updated_at
    BEFORE UPDATE ON siswa
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 3. Running Migrations

### Via Supabase Dashboard
1. Go to **SQL Editor**
2. Paste migration content
3. Click **Run**

### Via Supabase CLI
```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Run migration
supabase db push < migrations/001_initial_schema.sql
```

### Via psql
```bash
psql -h db.xxxxx.supabase.co -p 5432 -U postgres -d postgres < migrations/001_initial_schema.sql
```

---

## 4. Rollback Strategy

Setiap migration memiliki file rollback:

```sql
-- rollback/001_rollback.sql
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS admins;
DROP TYPE IF EXISTS admin_role;
```

**⚠️ Warning**: Rollback menghapus data. Hanya gunakan di development.

---

## 5. Migration Checklist

Before running migrations:
- [ ] Backup existing data
- [ ] Test on staging first
- [ ] Review SQL for errors
- [ ] Check foreign key order

After running migrations:
- [ ] Verify tables created
- [ ] Check indexes exist
- [ ] Test CRUD operations
- [ ] Verify RLS policies

---

## Related Documentation

- [Schema Complete](./schema-complete.md)
- [Supabase Setup](./supabase-setup.md)
