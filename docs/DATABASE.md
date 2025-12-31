# SMK Marhas Admin - Database Schema

## Overview

Database schema untuk backend Nest.js dengan PostgreSQL/Supabase.

---

## Entity Relationship Diagram

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   admins    │      │    siswa    │──────│    kelas    │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│ audit_logs  │      │  orangtua   │      │    guru     │
└─────────────┘      └─────────────┘      └─────────────┘
                            │                    │
                            │                    │
                            ▼                    ▼
                     ┌─────────────┐      ┌─────────────┐
                     │siswa_ortu   │      │   jadwal    │
                     └─────────────┘      └─────────────┘
```

---

## Tables

### admins
Admin users untuk dashboard.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email login |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| name | VARCHAR(255) | NOT NULL | Nama lengkap |
| phone | VARCHAR(20) | | No telepon |
| role | ENUM | NOT NULL | super_admin, admin_perpustakaan, etc |
| status | ENUM | DEFAULT 'active' | active, inactive, suspended |
| avatar | VARCHAR(500) | | URL foto |
| last_login | TIMESTAMP | | Terakhir login |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

```sql
CREATE TYPE admin_role AS ENUM (
  'super_admin',
  'admin_perpustakaan',
  'admin_keuangan',
  'admin_absensi',
  'admin_jadwal',
  'admin_aplikasi'
);

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role admin_role NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  avatar VARCHAR(500),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### siswa
Data siswa.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| nisn | VARCHAR(10) | UNIQUE, NOT NULL | Nomor Induk Siswa Nasional |
| nis | VARCHAR(20) | UNIQUE, NOT NULL | Nomor Induk Sekolah |
| name | VARCHAR(255) | NOT NULL | Nama lengkap |
| gender | CHAR(1) | NOT NULL | L/P |
| birth_date | DATE | | Tanggal lahir |
| birth_place | VARCHAR(100) | | Tempat lahir |
| religion | VARCHAR(20) | | Agama |
| address | TEXT | | Alamat |
| phone | VARCHAR(20) | | No HP |
| email | VARCHAR(255) | | Email |
| photo | VARCHAR(500) | | URL foto |
| kelas_id | UUID | FK → kelas.id | |
| jurusan | VARCHAR(50) | | RPL, TKJ, MM, AKL |
| tahun_masuk | VARCHAR(10) | | 2024/2025 |
| status | ENUM | DEFAULT 'active' | active, alumni, dropout |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

```sql
CREATE TABLE siswa (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nisn VARCHAR(10) UNIQUE NOT NULL,
  nis VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  gender CHAR(1) NOT NULL CHECK (gender IN ('L', 'P')),
  birth_date DATE,
  birth_place VARCHAR(100),
  religion VARCHAR(20),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  photo VARCHAR(500),
  kelas_id UUID REFERENCES kelas(id),
  jurusan VARCHAR(50),
  tahun_masuk VARCHAR(10),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_siswa_kelas ON siswa(kelas_id);
CREATE INDEX idx_siswa_status ON siswa(status);
```

---

### guru
Data guru/tenaga pengajar.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| nip | VARCHAR(20) | UNIQUE | Nomor Induk Pegawai |
| nuptk | VARCHAR(20) | | NUPTK |
| name | VARCHAR(255) | NOT NULL | Nama lengkap |
| gender | CHAR(1) | | L/P |
| birth_date | DATE | | |
| status_kepegawaian | VARCHAR(20) | | PNS, GTY, GTT, Honorer |
| bidang_studi | VARCHAR(100) | | Mata pelajaran utama |
| pendidikan | VARCHAR(50) | | S1, S2, S3 |
| phone | VARCHAR(20) | | |
| email | VARCHAR(255) | | |
| address | TEXT | | |
| photo | VARCHAR(500) | | |
| start_date | DATE | | Mulai mengajar |
| status | VARCHAR(20) | DEFAULT 'active' | |
| created_at | TIMESTAMP | | |
| updated_at | TIMESTAMP | | |

```sql
CREATE TABLE guru (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nip VARCHAR(20) UNIQUE,
  nuptk VARCHAR(20),
  name VARCHAR(255) NOT NULL,
  gender CHAR(1) CHECK (gender IN ('L', 'P')),
  birth_date DATE,
  status_kepegawaian VARCHAR(20),
  bidang_studi VARCHAR(100),
  pendidikan VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  photo VARCHAR(500),
  start_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### kelas
Data kelas.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(50) | NOT NULL | X RPL 1 |
| tingkat | VARCHAR(10) | | X, XI, XII |
| jurusan | VARCHAR(50) | | |
| nomor | INT | | Nomor kelas |
| wali_kelas_id | UUID | FK → guru.id | |
| tahun_ajaran | VARCHAR(10) | | 2024/2025 |
| kapasitas | INT | DEFAULT 36 | |
| ruangan | VARCHAR(50) | | |
| status | VARCHAR(20) | DEFAULT 'active' | |

```sql
CREATE TABLE kelas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  tingkat VARCHAR(10),
  jurusan VARCHAR(50),
  nomor INT,
  wali_kelas_id UUID REFERENCES guru(id),
  tahun_ajaran VARCHAR(10),
  kapasitas INT DEFAULT 36,
  ruangan VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### orangtua
Data orang tua siswa.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | |
| relationship | VARCHAR(20) | | ayah, ibu, wali |
| phone | VARCHAR(20) | | |
| email | VARCHAR(255) | | |
| occupation | VARCHAR(100) | | Pekerjaan |
| address | TEXT | | |
| status | VARCHAR(20) | DEFAULT 'active' | |

```sql
CREATE TABLE orangtua (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  relationship VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  occupation VARCHAR(100),
  address TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Junction table
CREATE TABLE siswa_orangtua (
  siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
  orangtua_id UUID REFERENCES orangtua(id) ON DELETE CASCADE,
  PRIMARY KEY (siswa_id, orangtua_id)
);
```

---

### Perpustakaan Tables

```sql
-- Kategori buku
CREATE TABLE kategori_buku (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Buku
CREATE TABLE buku (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  isbn VARCHAR(20) UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  publisher VARCHAR(255),
  year INT,
  kategori_id UUID REFERENCES kategori_buku(id),
  jumlah_eksemplar INT DEFAULT 1,
  jumlah_tersedia INT DEFAULT 1,
  lokasi VARCHAR(50),
  cover VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Peminjaman
CREATE TABLE peminjaman (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buku_id UUID REFERENCES buku(id),
  peminjam_id UUID REFERENCES siswa(id),
  tanggal_pinjam DATE NOT NULL,
  tanggal_kembali DATE NOT NULL,
  tanggal_dikembalikan DATE,
  status VARCHAR(20) DEFAULT 'dipinjam', -- dipinjam, dikembalikan, terlambat
  denda DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_peminjaman_status ON peminjaman(status);
```

---

### Keuangan Tables

```sql
-- SPP
CREATE TABLE spp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  siswa_id UUID REFERENCES siswa(id),
  bulan VARCHAR(7) NOT NULL, -- 2024-01
  nominal DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'belum_bayar',
  tanggal_bayar DATE,
  metode_pembayaran VARCHAR(50),
  bukti_bayar VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transaksi
CREATE TABLE transaksi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(20) NOT NULL, -- pemasukan, pengeluaran
  kategori VARCHAR(100),
  deskripsi TEXT,
  nominal DECIMAL(12,2) NOT NULL,
  tanggal DATE NOT NULL,
  bukti VARCHAR(500),
  created_by UUID REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Absensi Tables

```sql
-- Absensi
CREATE TABLE absensi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  siswa_id UUID REFERENCES siswa(id),
  tanggal DATE NOT NULL,
  jam_masuk TIME,
  jam_keluar TIME,
  status VARCHAR(20) NOT NULL, -- hadir, izin, sakit, alpha
  keterangan TEXT,
  metode VARCHAR(20), -- qrcode, fingerprint, manual
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_absensi_unique ON absensi(siswa_id, tanggal);

-- Dispensasi
CREATE TABLE dispensasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  siswa_id UUID REFERENCES siswa(id),
  tanggal DATE NOT NULL,
  durasi VARCHAR(50),
  jenis VARCHAR(50),
  alasan TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  approved_by UUID REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Jadwal Tables

```sql
-- Mata Pelajaran
CREATE TABLE mapel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kode VARCHAR(10) UNIQUE,
  name VARCHAR(100) NOT NULL,
  kategori VARCHAR(50) -- normatif, adaptif, produktif
);

-- Jadwal
CREATE TABLE jadwal (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kelas_id UUID REFERENCES kelas(id),
  mapel_id UUID REFERENCES mapel(id),
  guru_id UUID REFERENCES guru(id),
  hari INT NOT NULL, -- 1-7
  jam_mulai TIME NOT NULL,
  jam_selesai TIME NOT NULL,
  ruangan VARCHAR(50),
  tahun_ajaran VARCHAR(10)
);

-- Substitusi
CREATE TABLE substitusi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  jadwal_id UUID REFERENCES jadwal(id),
  guru_pengganti_id UUID REFERENCES guru(id),
  tanggal DATE NOT NULL,
  alasan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Audit Log

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id),
  action VARCHAR(50) NOT NULL,
  entity VARCHAR(50),
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
```

---

## Indexes Summary

```sql
-- Performance indexes
CREATE INDEX idx_siswa_search ON siswa USING gin(to_tsvector('indonesian', name));
CREATE INDEX idx_guru_search ON guru USING gin(to_tsvector('indonesian', name));
CREATE INDEX idx_buku_search ON buku USING gin(to_tsvector('indonesian', title));
```

---

## Supabase RLS Policies

```sql
-- Enable RLS
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE kelas ENABLE ROW LEVEL SECURITY;

-- Admin can read all
CREATE POLICY "Admins can read all siswa" ON siswa
  FOR SELECT USING (auth.role() = 'authenticated');

-- Super admin can do everything
CREATE POLICY "Super admin full access" ON siswa
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );
```
