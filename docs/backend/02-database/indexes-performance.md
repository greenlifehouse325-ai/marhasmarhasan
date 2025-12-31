# SMK Marhas - Database Indexes & Performance

## 1. Index Strategy

Indexes dibuat berdasarkan:
1. **Primary Keys** - Otomatis by PostgreSQL
2. **Foreign Keys** - Untuk JOIN performance
3. **Search Fields** - Untuk WHERE clause
4. **Unique Constraints** - Untuk data integrity
5. **Full-Text Search** - Untuk pencarian nama

---

## 2. Complete Index List

### 2.1 Core Tables

```sql
-- admins
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_role ON admins(role);
CREATE INDEX idx_admins_status ON admins(status);
CREATE INDEX idx_admins_active ON admins(is_banned, status) 
    WHERE is_banned = false AND status = 'active';

-- sessions
CREATE INDEX idx_sessions_admin ON sessions(admin_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_refresh ON sessions(refresh_token);
CREATE INDEX idx_sessions_active ON sessions(is_active) WHERE is_active = true;
CREATE INDEX idx_sessions_expires ON sessions(expires_at) WHERE is_active = true;

-- devices
CREATE INDEX idx_devices_admin ON devices(admin_id);
CREATE UNIQUE INDEX idx_devices_fingerprint ON devices(admin_id, fingerprint);
CREATE INDEX idx_devices_trusted ON devices(admin_id, is_trusted) WHERE is_trusted = true;

-- audit_logs
CREATE INDEX idx_audit_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_resource ON audit_logs(resource);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_resource_id ON audit_logs(resource_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_date_range ON audit_logs(created_at);
```

### 2.2 Academic Tables

```sql
-- siswa
CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_siswa_nis ON siswa(nis);
CREATE INDEX idx_siswa_kelas ON siswa(kelas_id);
CREATE INDEX idx_siswa_jurusan ON siswa(jurusan);
CREATE INDEX idx_siswa_status ON siswa(status);
CREATE INDEX idx_siswa_campus ON siswa(campus);
CREATE INDEX idx_siswa_tahun ON siswa(tahun_masuk);

-- Full-text search for siswa name (Indonesian)
CREATE INDEX idx_siswa_search ON siswa 
    USING gin(to_tsvector('indonesian', name));

-- Compound index for common filters
CREATE INDEX idx_siswa_kelas_status ON siswa(kelas_id, status) 
    WHERE status = 'active';

-- guru
CREATE INDEX idx_guru_nip ON guru(nip);
CREATE INDEX idx_guru_nuptk ON guru(nuptk);
CREATE INDEX idx_guru_status ON guru(status);
CREATE INDEX idx_guru_homeroom ON guru(is_homeroom, homeroom_class_id) 
    WHERE is_homeroom = true;
CREATE INDEX idx_guru_search ON guru 
    USING gin(to_tsvector('indonesian', name));

-- kelas
CREATE UNIQUE INDEX idx_kelas_unique ON kelas(grade, jurusan, nomor, tahun_ajaran);
CREATE INDEX idx_kelas_tahun ON kelas(tahun_ajaran);
CREATE INDEX idx_kelas_wali ON kelas(wali_kelas_id);
CREATE INDEX idx_kelas_campus ON kelas(campus);
CREATE INDEX idx_kelas_active ON kelas(tahun_ajaran, status) 
    WHERE status = 'active';

-- orangtua
CREATE INDEX idx_orangtua_phone ON orangtua(phone);
CREATE INDEX idx_orangtua_email ON orangtua(email);
```

### 2.3 Perpustakaan Tables

```sql
-- buku
CREATE INDEX idx_buku_isbn ON buku(isbn);
CREATE INDEX idx_buku_kategori ON buku(kategori_id);
CREATE INDEX idx_buku_publisher ON buku(publisher_id);
CREATE INDEX idx_buku_status ON buku(status);
CREATE INDEX idx_buku_search ON buku 
    USING gin(to_tsvector('indonesian', title || ' ' || COALESCE(author, '')));

-- Compound for availability check
CREATE INDEX idx_buku_available ON buku(status, available_copies) 
    WHERE available_copies > 0;

-- peminjaman
CREATE INDEX idx_peminjaman_buku ON peminjaman(buku_id);
CREATE INDEX idx_peminjaman_peminjam ON peminjaman(peminjam_id);
CREATE INDEX idx_peminjaman_status ON peminjaman(status);
CREATE INDEX idx_peminjaman_due ON peminjaman(due_date) 
    WHERE status = 'active';
CREATE INDEX idx_peminjaman_overdue ON peminjaman(due_date, status) 
    WHERE status IN ('active', 'overdue');

-- denda
CREATE INDEX idx_denda_peminjaman ON denda(peminjaman_id);
CREATE INDEX idx_denda_peminjam ON denda(peminjam_id);
CREATE INDEX idx_denda_status ON denda(status);
CREATE INDEX idx_denda_unpaid ON denda(status) WHERE status = 'pending';
```

### 2.4 Keuangan Tables

```sql
-- spp
CREATE UNIQUE INDEX idx_spp_unique ON spp(siswa_id, bulan, tahun);
CREATE INDEX idx_spp_siswa ON spp(siswa_id);
CREATE INDEX idx_spp_status ON spp(status);
CREATE INDEX idx_spp_period ON spp(tahun, bulan);
CREATE INDEX idx_spp_pending ON spp(status) WHERE status = 'pending';

-- transaksi
CREATE INDEX idx_transaksi_type ON transaksi(type);
CREATE INDEX idx_transaksi_date ON transaksi(date);
CREATE INDEX idx_transaksi_category ON transaksi(category);
CREATE INDEX idx_transaksi_date_range ON transaksi(date DESC);
CREATE INDEX idx_transaksi_type_date ON transaksi(type, date);
```

### 2.5 Absensi Tables

```sql
-- absensi_session
CREATE INDEX idx_absensi_session_date ON absensi_session(date);
CREATE INDEX idx_absensi_session_status ON absensi_session(status);
CREATE INDEX idx_absensi_session_campus ON absensi_session(campus);
CREATE INDEX idx_absensi_session_active ON absensi_session(date, status) 
    WHERE status = 'active';

-- absensi_record
CREATE UNIQUE INDEX idx_absensi_record_unique ON absensi_record(session_id, siswa_id);
CREATE INDEX idx_absensi_record_session ON absensi_record(session_id);
CREATE INDEX idx_absensi_record_siswa ON absensi_record(siswa_id);
CREATE INDEX idx_absensi_record_status ON absensi_record(status);
CREATE INDEX idx_absensi_record_scan ON absensi_record(scan_time);

-- dispensasi
CREATE INDEX idx_dispensasi_siswa ON dispensasi(siswa_id);
CREATE INDEX idx_dispensasi_date ON dispensasi(date);
CREATE INDEX idx_dispensasi_status ON dispensasi(status);
CREATE INDEX idx_dispensasi_pending ON dispensasi(status) 
    WHERE status = 'pending';
```

### 2.6 Jadwal & Aplikasi

```sql
-- jadwal
CREATE INDEX idx_jadwal_kelas ON jadwal(kelas_id);
CREATE INDEX idx_jadwal_guru ON jadwal(guru_id);
CREATE INDEX idx_jadwal_mapel ON jadwal(mapel_id);
CREATE INDEX idx_jadwal_hari ON jadwal(hari);
CREATE INDEX idx_jadwal_tahun ON jadwal(tahun_ajaran);

-- pengumuman
CREATE INDEX idx_pengumuman_status ON pengumuman(status);
CREATE INDEX idx_pengumuman_published ON pengumuman(published_at DESC) 
    WHERE status = 'published';
CREATE INDEX idx_pengumuman_priority ON pengumuman(priority, published_at DESC);

-- berita
CREATE INDEX idx_berita_status ON berita(status);
CREATE INDEX idx_berita_featured ON berita(featured, published_at DESC) 
    WHERE featured = true;

-- notifikasi
CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_unread ON notifikasi(user_id, is_read) 
    WHERE is_read = false;
CREATE INDEX idx_notifikasi_created ON notifikasi(created_at DESC);
```

---

## 3. Query Optimization Tips

### 3.1 Use EXPLAIN ANALYZE
```sql
EXPLAIN ANALYZE
SELECT * FROM siswa 
WHERE kelas_id = 'uuid-here' AND status = 'active';
```

### 3.2 Avoid SELECT *
```sql
-- Bad ❌
SELECT * FROM siswa WHERE status = 'active';

-- Good ✅
SELECT id, nisn, name, kelas_id FROM siswa WHERE status = 'active';
```

### 3.3 Use Pagination
```sql
-- With offset pagination
SELECT * FROM siswa 
ORDER BY name 
LIMIT 20 OFFSET 40;

-- Better: Cursor pagination
SELECT * FROM siswa 
WHERE name > 'last_seen_name' 
ORDER BY name 
LIMIT 20;
```

### 3.4 Batch Operations
```typescript
// Bad ❌ - N queries
for (const id of ids) {
  await supabase.from('siswa').select().eq('id', id);
}

// Good ✅ - 1 query
await supabase.from('siswa').select().in('id', ids);
```

---

## 4. Monitoring Queries

### 4.1 Slow Query Log
```sql
-- Enable in postgresql.conf
log_min_duration_statement = 1000  -- Log queries > 1 second
```

### 4.2 Find Slow Queries
```sql
-- Via pg_stat_statements
SELECT 
    query,
    calls,
    total_time / calls as avg_time,
    rows / calls as avg_rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

### 4.3 Index Usage
```sql
-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

## 5. Vacuum & Maintenance

### 5.1 Auto Vacuum (Supabase)
Supabase mengaktifkan auto-vacuum secara default.

### 5.2 Manual Vacuum
```sql
-- Vacuum specific table
VACUUM ANALYZE siswa;

-- Vacuum all tables
VACUUM ANALYZE;
```

### 5.3 Reindex
```sql
-- Reindex table
REINDEX TABLE siswa;

-- Reindex index
REINDEX INDEX idx_siswa_search;
```

---

## 6. Performance Checklist

### Development
- [ ] All foreign keys indexed
- [ ] Search columns indexed
- [ ] Compound indexes for common queries
- [ ] Full-text search configured

### Production
- [ ] Monitor slow queries
- [ ] Check index usage
- [ ] Review query plans
- [ ] Vacuum scheduled
- [ ] Connection pooling enabled

---

## 7. Supabase-Specific

### Connection Pooling
Supabase uses **PgBouncer** for connection pooling.

```
# Direct connection (for migrations)
postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres

# Pooled connection (for app)
postgresql://postgres:PASSWORD@db.xxx.supabase.co:6543/postgres
```

### Query Limits
- Max rows per request: 1000 (configurable)
- Query timeout: 30 seconds
- Max connections: Based on plan

---

## Related Documentation

- [Schema Complete](./schema-complete.md)
- [Supabase Setup](./supabase-setup.md)
