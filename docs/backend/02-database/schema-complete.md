# SMK Marhas - Complete Database Schema

## 1. Schema Overview

Database menggunakan **PostgreSQL** via **Supabase** dengan total **25+ tables** yang terbagi menjadi beberapa domain:

```
┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE SCHEMA                           │
├─────────────────────────────────────────────────────────────────┤
│  CORE           │ admins, sessions, devices, audit_logs        │
├─────────────────┼───────────────────────────────────────────────┤
│  ACADEMIC       │ siswa, guru, kelas, orangtua, siswa_orangtua │
│                 │ mapel, jurusan, tahun_ajaran                 │
├─────────────────┼───────────────────────────────────────────────┤
│  PERPUSTAKAAN   │ buku, kategori_buku, penerbit, peminjaman,   │
│                 │ denda, konten_digital                        │
├─────────────────┼───────────────────────────────────────────────┤
│  KEUANGAN       │ spp, transaksi, anggaran, beasiswa           │
├─────────────────┼───────────────────────────────────────────────┤
│  ABSENSI        │ absensi_session, absensi_record, dispensasi  │
├─────────────────┼───────────────────────────────────────────────┤
│  JADWAL         │ jadwal, kalender_event, substitusi           │
├─────────────────┼───────────────────────────────────────────────┤
│  APLIKASI       │ pengumuman, berita, prestasi, notifikasi,    │
│                 │ moderasi_report, bug_report                   │
└─────────────────┴───────────────────────────────────────────────┘
```

---

## 2. Core Tables

### 2.1 admins
```sql
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(500),
    role admin_role NOT NULL,
    permissions JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    is_banned BOOLEAN DEFAULT false,
    banned_until TIMESTAMP,
    banned_reason TEXT,
    assigned_by UUID REFERENCES admins(id),
    assigned_at TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE admin_role AS ENUM (
    'super_admin',
    'admin_perpustakaan',
    'admin_keuangan',
    'admin_absensi',
    'admin_jadwal',
    'admin_aplikasi'
);

CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_role ON admins(role);
CREATE INDEX idx_admins_status ON admins(status);
```

### 2.2 sessions
```sql
CREATE TABLE sessions (
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

CREATE INDEX idx_sessions_admin ON sessions(admin_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_active ON sessions(is_active) WHERE is_active = true;
```

### 2.3 devices
```sql
CREATE TABLE devices (
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

CREATE UNIQUE INDEX idx_devices_fingerprint ON devices(admin_id, fingerprint);
```

### 2.4 audit_logs
```sql
CREATE TABLE audit_logs (
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

CREATE INDEX idx_audit_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_resource ON audit_logs(resource);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

---

## 3. Academic Tables

### 3.1 siswa
```sql
CREATE TABLE siswa (
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

CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_siswa_nis ON siswa(nis);
CREATE INDEX idx_siswa_kelas ON siswa(kelas_id);
CREATE INDEX idx_siswa_status ON siswa(status);
CREATE INDEX idx_siswa_search ON siswa USING gin(to_tsvector('indonesian', name));
```

### 3.2 guru
```sql
CREATE TABLE guru (
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

CREATE INDEX idx_guru_nip ON guru(nip);
CREATE INDEX idx_guru_status ON guru(status);
```

### 3.3 kelas
```sql
CREATE TABLE kelas (
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

CREATE UNIQUE INDEX idx_kelas_unique ON kelas(grade, jurusan, nomor, tahun_ajaran);
```

### 3.4 orangtua
```sql
CREATE TABLE orangtua (
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

CREATE TABLE siswa_orangtua (
    siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
    orangtua_id UUID REFERENCES orangtua(id) ON DELETE CASCADE,
    PRIMARY KEY (siswa_id, orangtua_id)
);
```

### 3.5 Supporting Tables
```sql
CREATE TABLE jurusan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    kepala_id UUID REFERENCES guru(id),
    description TEXT,
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE tahun_ajaran (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20) UNIQUE NOT NULL,  -- "2024/2025"
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT false
);

CREATE TABLE mapel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode VARCHAR(10) UNIQUE,
    name VARCHAR(100) NOT NULL,
    kategori VARCHAR(50),  -- normatif, adaptif, produktif
    jam_per_minggu SMALLINT
);
```

---

## 4. Perpustakaan Tables

### 4.1 buku
```sql
CREATE TABLE kategori_buku (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE penerbit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20)
);

CREATE TABLE buku (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    isbn VARCHAR(20) UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    publisher_id UUID REFERENCES penerbit(id),
    published_year SMALLINT,
    kategori_id UUID REFERENCES kategori_buku(id),
    location VARCHAR(50),
    total_copies SMALLINT DEFAULT 1,
    available_copies SMALLINT DEFAULT 1,
    cover VARCHAR(500),
    description TEXT,
    language VARCHAR(20) DEFAULT 'Indonesia',
    pages SMALLINT,
    status VARCHAR(20) DEFAULT 'available' 
        CHECK (status IN ('available', 'limited', 'unavailable')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_buku_isbn ON buku(isbn);
CREATE INDEX idx_buku_kategori ON buku(kategori_id);
CREATE INDEX idx_buku_search ON buku USING gin(to_tsvector('indonesian', title || ' ' || author));
```

### 4.2 peminjaman
```sql
CREATE TABLE peminjaman (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buku_id UUID REFERENCES buku(id),
    peminjam_id UUID NOT NULL,
    peminjam_type VARCHAR(20) CHECK (peminjam_type IN ('student', 'teacher')),
    peminjam_name VARCHAR(255),
    peminjam_class VARCHAR(50),
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('active', 'overdue', 'returned', 'returned_late', 'lost')),
    notes TEXT,
    processed_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_peminjaman_buku ON peminjaman(buku_id);
CREATE INDEX idx_peminjaman_peminjam ON peminjaman(peminjam_id);
CREATE INDEX idx_peminjaman_status ON peminjaman(status);
CREATE INDEX idx_peminjaman_due ON peminjaman(due_date) WHERE status = 'active';
```

### 4.3 denda
```sql
CREATE TABLE denda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    peminjaman_id UUID REFERENCES peminjaman(id),
    peminjam_id UUID NOT NULL,
    peminjam_name VARCHAR(255),
    amount DECIMAL(12,2) NOT NULL,
    days_overdue SMALLINT,
    reason VARCHAR(20) CHECK (reason IN ('overdue', 'lost', 'damaged')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'waived')),
    paid_at TIMESTAMP,
    paid_amount DECIMAL(12,2),
    waived_by UUID REFERENCES admins(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_denda_status ON denda(status);
```

---

## 5. Keuangan Tables

### 5.1 spp
```sql
CREATE TABLE spp (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    siswa_id UUID REFERENCES siswa(id),
    siswa_name VARCHAR(255),
    siswa_class VARCHAR(50),
    siswa_nis VARCHAR(20),
    bulan SMALLINT NOT NULL,  -- 1-12
    tahun SMALLINT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'waiting', 'verified', 'rejected')),
    payment_method VARCHAR(50),
    payment_proof VARCHAR(500),
    paid_at TIMESTAMP,
    verified_by UUID REFERENCES admins(id),
    verified_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_spp_unique ON spp(siswa_id, bulan, tahun);
CREATE INDEX idx_spp_status ON spp(status);
```

### 5.2 transaksi
```sql
CREATE TABLE transaksi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    category VARCHAR(100) NOT NULL,
    description TEXT,
    amount DECIMAL(12,2) NOT NULL,
    date DATE NOT NULL,
    reference VARCHAR(100),
    attachments JSONB,  -- [{name, url}]
    created_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transaksi_type ON transaksi(type);
CREATE INDEX idx_transaksi_date ON transaksi(date);
CREATE INDEX idx_transaksi_category ON transaksi(category);
```

---

## 6. Absensi Tables

### 6.1 absensi_session
```sql
CREATE TABLE absensi_session (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('regular', 'ceremony', 'event', 'exam')),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    campus SMALLINT CHECK (campus IN (1, 2)),
    target_classes JSONB,  -- ["XII RPL 1", "XII RPL 2"] or "all"
    qr_code TEXT,
    refresh_interval SMALLINT DEFAULT 30,
    status VARCHAR(20) DEFAULT 'scheduled' 
        CHECK (status IN ('scheduled', 'active', 'ended')),
    scanned_count SMALLINT DEFAULT 0,
    target_count SMALLINT DEFAULT 0,
    created_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_absensi_session_date ON absensi_session(date);
CREATE INDEX idx_absensi_session_status ON absensi_session(status);
```

### 6.2 absensi_record
```sql
CREATE TABLE absensi_record (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES absensi_session(id),
    siswa_id UUID REFERENCES siswa(id),
    siswa_name VARCHAR(255),
    siswa_class VARCHAR(50),
    siswa_nis VARCHAR(20),
    status VARCHAR(20) NOT NULL 
        CHECK (status IN ('hadir', 'alpha', 'izin', 'sakit', 'terlambat')),
    scan_time TIMESTAMP,
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_absensi_record_unique ON absensi_record(session_id, siswa_id);
CREATE INDEX idx_absensi_record_status ON absensi_record(status);
```

### 6.3 dispensasi
```sql
CREATE TABLE dispensasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    siswa_id UUID REFERENCES siswa(id),
    siswa_name VARCHAR(255),
    siswa_class VARCHAR(50),
    date DATE NOT NULL,
    duration VARCHAR(50),
    jenis VARCHAR(50),
    alasan TEXT,
    status VARCHAR(20) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by UUID REFERENCES admins(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_dispensasi_status ON dispensasi(status);
```

---

## 7. Jadwal Tables

```sql
CREATE TABLE jadwal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kelas_id UUID REFERENCES kelas(id),
    mapel_id UUID REFERENCES mapel(id),
    guru_id UUID REFERENCES guru(id),
    hari SMALLINT NOT NULL CHECK (hari BETWEEN 1 AND 6),  -- 1=Senin
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    ruangan VARCHAR(50),
    tahun_ajaran VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE kalender_event (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('holiday', 'exam', 'event', 'meeting', 'competition')),
    date DATE NOT NULL,
    end_date DATE,
    all_day BOOLEAN DEFAULT true,
    description TEXT,
    campus VARCHAR(10),
    affected_classes JSONB,
    created_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE substitusi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jadwal_id UUID REFERENCES jadwal(id),
    guru_pengganti_id UUID REFERENCES guru(id),
    tanggal DATE NOT NULL,
    alasan TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    requested_by UUID REFERENCES admins(id),
    approved_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. Aplikasi Tables

```sql
CREATE TABLE pengumuman (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal',
    target_audience JSONB,  -- {students, teachers, parents, classes, majors}
    image VARCHAR(500),
    attachments JSONB,
    published_at TIMESTAMP,
    expires_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    created_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE berita (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(50),
    images JSONB,
    author VARCHAR(255),
    published_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE prestasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    type VARCHAR(50),
    date DATE,
    participants JSONB,  -- [{id, name, class}]
    medal VARCHAR(20),
    rank SMALLINT,
    images JSONB,
    status VARCHAR(20) DEFAULT 'draft',
    created_by UUID REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifikasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    user_type VARCHAR(20),
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50),
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_unread ON notifikasi(user_id, is_read) WHERE is_read = false;
```

---

## 9. Related Documentation

- [Migrations](./migrations.md)
- [Supabase Setup](./supabase-setup.md)
- [RLS Policies](./rls-policies.md)
- [Indexes & Performance](./indexes-performance.md)
