# SMK Marhas - Row Level Security Policies

## 1. RLS Overview

Row Level Security (RLS) adalah fitur PostgreSQL yang memungkinkan kontrol akses di level database row. Supabase memanfaatkan RLS untuk mengamankan data.

```
┌─────────────────────────────────────────────────────────────────┐
│                        RLS FLOW                                  │
├─────────────────────────────────────────────────────────────────┤
│  Request → Supabase Client → RLS Policy Check → Data Access    │
│                                    │                            │
│                              ┌─────┴─────┐                      │
│                              │  Policy   │                      │
│                              │  Passed?  │                      │
│                              └─────┬─────┘                      │
│                           Yes │       │ No                      │
│                               ▼       ▼                         │
│                          Return     Empty Result                │
│                          Data       (No Error)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Enable RLS

```sql
-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE kelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE orangtua ENABLE ROW LEVEL SECURITY;
ALTER TABLE buku ENABLE ROW LEVEL SECURITY;
ALTER TABLE peminjaman ENABLE ROW LEVEL SECURITY;
ALTER TABLE denda ENABLE ROW LEVEL SECURITY;
ALTER TABLE spp ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaksi ENABLE ROW LEVEL SECURITY;
ALTER TABLE absensi_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE absensi_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispensasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifikasi ENABLE ROW LEVEL SECURITY;
```

---

## 3. Helper Functions

```sql
-- Function to get current admin role
CREATE OR REPLACE FUNCTION get_admin_role()
RETURNS admin_role AS $$
  SELECT role FROM admins WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to check if current user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins 
    WHERE id = auth.uid() 
    AND role = 'super_admin' 
    AND is_active = true
    AND is_banned = false
  )
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to check if current user has specific role
CREATE OR REPLACE FUNCTION has_role(required_role admin_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins 
    WHERE id = auth.uid() 
    AND (role = 'super_admin' OR role = required_role)
    AND is_active = true
    AND is_banned = false
  )
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to check if admin is active
CREATE OR REPLACE FUNCTION is_active_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins 
    WHERE id = auth.uid() 
    AND status = 'active'
    AND is_banned = false
  )
$$ LANGUAGE SQL SECURITY DEFINER;
```

---

## 4. Core Policies

### 4.1 Admins Table
```sql
-- Super admin can do everything with admins
CREATE POLICY "super_admin_all_admins" ON admins
  FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- Admins can read their own profile
CREATE POLICY "admin_read_self" ON admins
  FOR SELECT
  USING (id = auth.uid());

-- Admins can update their own profile (limited fields)
CREATE POLICY "admin_update_self" ON admins
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND
    role = (SELECT role FROM admins WHERE id = auth.uid()) -- Cannot change own role
  );
```

### 4.2 Sessions Table
```sql
-- Admins can read their own sessions
CREATE POLICY "read_own_sessions" ON sessions
  FOR SELECT
  USING (admin_id = auth.uid());

-- Super admin can read all sessions
CREATE POLICY "super_admin_read_sessions" ON sessions
  FOR SELECT
  USING (is_super_admin());

-- Only backend service can create/delete sessions
CREATE POLICY "service_manage_sessions" ON sessions
  FOR ALL
  USING (auth.role() = 'service_role');
```

### 4.3 Audit Logs Table
```sql
-- Only super admin can read audit logs
CREATE POLICY "super_admin_read_audit" ON audit_logs
  FOR SELECT
  USING (is_super_admin());

-- Only service role can insert audit logs
CREATE POLICY "service_insert_audit" ON audit_logs
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
```

---

## 5. Academic Policies

### 5.1 Siswa
```sql
-- All active admins can read siswa
CREATE POLICY "admins_read_siswa" ON siswa
  FOR SELECT
  USING (is_active_admin());

-- Only super admin can create/update/delete siswa
CREATE POLICY "super_admin_manage_siswa" ON siswa
  FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());
```

### 5.2 Guru
```sql
-- All active admins can read guru
CREATE POLICY "admins_read_guru" ON guru
  FOR SELECT
  USING (is_active_admin());

-- Only super admin can manage guru
CREATE POLICY "super_admin_manage_guru" ON guru
  FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());
```

### 5.3 Kelas
```sql
-- All active admins can read kelas
CREATE POLICY "admins_read_kelas" ON kelas
  FOR SELECT
  USING (is_active_admin());

-- Super admin and jadwal admin can manage
CREATE POLICY "manage_kelas" ON kelas
  FOR ALL
  USING (has_role('admin_jadwal'))
  WITH CHECK (has_role('admin_jadwal'));
```

---

## 6. Module-Specific Policies

### 6.1 Perpustakaan (Buku, Peminjaman, Denda)
```sql
-- Buku: perpustakaan admin can manage
CREATE POLICY "perpus_manage_buku" ON buku
  FOR ALL
  USING (has_role('admin_perpustakaan'))
  WITH CHECK (has_role('admin_perpustakaan'));

-- All admins can read buku
CREATE POLICY "admins_read_buku" ON buku
  FOR SELECT
  USING (is_active_admin());

-- Peminjaman: perpustakaan admin can manage
CREATE POLICY "perpus_manage_peminjaman" ON peminjaman
  FOR ALL
  USING (has_role('admin_perpustakaan'))
  WITH CHECK (has_role('admin_perpustakaan'));

-- Denda: perpustakaan admin can manage
CREATE POLICY "perpus_manage_denda" ON denda
  FOR ALL
  USING (has_role('admin_perpustakaan'))
  WITH CHECK (has_role('admin_perpustakaan'));

-- Keuangan admin can read denda (for reporting)
CREATE POLICY "keuangan_read_denda" ON denda
  FOR SELECT
  USING (has_role('admin_keuangan'));
```

### 6.2 Keuangan (SPP, Transaksi)
```sql
-- SPP: keuangan admin can manage
CREATE POLICY "keuangan_manage_spp" ON spp
  FOR ALL
  USING (has_role('admin_keuangan'))
  WITH CHECK (has_role('admin_keuangan'));

-- Transaksi: keuangan admin can manage
CREATE POLICY "keuangan_manage_transaksi" ON transaksi
  FOR ALL
  USING (has_role('admin_keuangan'))
  WITH CHECK (has_role('admin_keuangan'));
```

### 6.3 Absensi
```sql
-- Absensi session: absensi admin can manage
CREATE POLICY "absensi_manage_session" ON absensi_session
  FOR ALL
  USING (has_role('admin_absensi'))
  WITH CHECK (has_role('admin_absensi'));

-- Absensi record: absensi admin can manage
CREATE POLICY "absensi_manage_record" ON absensi_record
  FOR ALL
  USING (has_role('admin_absensi'))
  WITH CHECK (has_role('admin_absensi'));

-- Dispensasi: absensi admin can manage
CREATE POLICY "absensi_manage_dispensasi" ON dispensasi
  FOR ALL
  USING (has_role('admin_absensi'))
  WITH CHECK (has_role('admin_absensi'));
```

### 6.4 Jadwal
```sql
-- Jadwal: jadwal admin can manage
CREATE POLICY "jadwal_manage_jadwal" ON jadwal
  FOR ALL
  USING (has_role('admin_jadwal'))
  WITH CHECK (has_role('admin_jadwal'));

-- All admins can read jadwal
CREATE POLICY "admins_read_jadwal" ON jadwal
  FOR SELECT
  USING (is_active_admin());
```

### 6.5 Aplikasi (Pengumuman, Berita, Prestasi)
```sql
-- Pengumuman: aplikasi admin can manage
CREATE POLICY "aplikasi_manage_pengumuman" ON pengumuman
  FOR ALL
  USING (has_role('admin_aplikasi'))
  WITH CHECK (has_role('admin_aplikasi'));

-- Published pengumuman readable by all
CREATE POLICY "read_published_pengumuman" ON pengumuman
  FOR SELECT
  USING (status = 'published');

-- Berita: aplikasi admin can manage
CREATE POLICY "aplikasi_manage_berita" ON berita
  FOR ALL
  USING (has_role('admin_aplikasi'))
  WITH CHECK (has_role('admin_aplikasi'));

-- Prestasi: aplikasi admin can manage
CREATE POLICY "aplikasi_manage_prestasi" ON prestasi
  FOR ALL
  USING (has_role('admin_aplikasi'))
  WITH CHECK (has_role('admin_aplikasi'));
```

---

## 7. Notification Policies
```sql
-- Users can read their own notifications
CREATE POLICY "read_own_notifications" ON notifikasi
  FOR SELECT
  USING (user_id = auth.uid());

-- Users can update their own notifications (mark as read)
CREATE POLICY "update_own_notifications" ON notifikasi
  FOR UPDATE
  USING (user_id = auth.uid());

-- Service role can send notifications
CREATE POLICY "service_send_notifications" ON notifikasi
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
```

---

## 8. Storage Policies

```sql
-- Storage: avatars bucket
CREATE POLICY "admin_upload_avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "admin_read_avatar"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

-- Storage: book-covers (public read)
CREATE POLICY "public_read_book_covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-covers');

CREATE POLICY "perpus_upload_book_covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'book-covers' AND
  has_role('admin_perpustakaan')
);
```

---

## 9. Testing Policies

```sql
-- Test as specific user
SET request.jwt.claims = '{"sub": "admin-uuid", "role": "authenticated"}';

-- Check if policy works
SELECT * FROM siswa; -- Should return data if policy passes

-- Reset
RESET request.jwt.claims;
```

---

## 10. Policy Matrix Summary

| Table | super_admin | perpustakaan | keuangan | absensi | jadwal | aplikasi |
|-------|:-----------:|:------------:|:--------:|:-------:|:------:|:--------:|
| admins | CRUD | - | - | - | - | - |
| siswa | CRUD | R | R | R | R | R |
| guru | CRUD | R | R | R | R | R |
| kelas | CRUD | R | R | R | CRUD | R |
| buku | CRUD | CRUD | - | - | - | - |
| peminjaman | CRUD | CRUD | - | - | - | - |
| denda | CRUD | CRUD | R | - | - | - |
| spp | CRUD | - | CRUD | - | - | - |
| transaksi | CRUD | - | CRUD | - | - | - |
| absensi_* | CRUD | - | - | CRUD | - | - |
| jadwal | CRUD | - | - | - | CRUD | R |
| pengumuman | CRUD | - | - | - | - | CRUD |
| berita | CRUD | - | - | - | - | CRUD |
| audit_logs | R | - | - | - | - | - |

---

## Related Documentation

- [Security Model](../01-architecture/security-model.md)
- [Role-Based Access](../03-authentication/role-based-access.md)
