# SMK Marhas Admin - Backend API Documentation

## Overview

Dokumentasi ini berisi spesifikasi API untuk integrasi frontend SMK Marhas Admin Dashboard dengan backend Nest.js.

**Base URL:** `https://api.marhas.sch.id/v1`

**Authentication:** Bearer Token (JWT)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Users & Admins](#users--admins)
3. [Siswa](#siswa)
4. [Guru](#guru)
5. [Kelas](#kelas)
6. [Perpustakaan](#perpustakaan)
7. [Keuangan](#keuangan)
8. [Absensi](#absensi)
9. [Jadwal](#jadwal)

---

## Authentication

### POST /auth/login
Login dengan email dan password.

**Request:**
```json
{
  "email": "admin@marhas.sch.id",
  "password": "SuperAdmin123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@marhas.sch.id",
      "name": "Super Admin",
      "role": "super_admin",
      "avatar": "/avatars/admin.jpg"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### POST /auth/logout
Logout dan invalidate token.

**Headers:** `Authorization: Bearer {token}`

### POST /auth/refresh
Refresh access token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /auth/forgot-password
Request password reset link.

**Request:**
```json
{
  "email": "admin@marhas.sch.id"
}
```

### POST /auth/reset-password
Reset password dengan token.

**Request:**
```json
{
  "token": "reset-token",
  "newPassword": "NewPassword123!"
}
```

---

## Users & Admins

### GET /admins
List semua admin.

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| role | string | Filter by role |
| status | string | Filter by status (active/inactive) |
| search | string | Search by name/email |

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Ahmad Suryadi",
        "email": "ahmad@marhas.sch.id",
        "role": "admin_perpustakaan",
        "status": "active",
        "lastLogin": "2024-01-15T08:30:00Z",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

### GET /admins/:id
Get admin detail.

### POST /admins
Create new admin.

**Request:**
```json
{
  "name": "Nama Admin",
  "email": "email@marhas.sch.id",
  "phone": "081234567890",
  "role": "admin_perpustakaan",
  "password": "Password123!"
}
```

### PUT /admins/:id
Update admin.

### DELETE /admins/:id
Delete admin.

### GET /admins/:id/activity
Get admin activity log.

---

## Siswa

### GET /siswa
List semua siswa.

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| kelas | string | Filter by kelas ID |
| jurusan | string | Filter by jurusan |
| status | string | active/alumni/dropout |
| search | string | Search NISN/NIS/nama |

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "nisn": "0012345678",
        "nis": "12345",
        "name": "Ahmad Rizki",
        "gender": "L",
        "birthDate": "2008-05-15",
        "kelas": {
          "id": "uuid",
          "name": "XII RPL 1"
        },
        "jurusan": "RPL",
        "status": "active",
        "photo": "/photos/siswa/ahmad.jpg"
      }
    ],
    "meta": { ... }
  }
}
```

### GET /siswa/:id
Get siswa detail dengan relasi orangtua, nilai, absensi.

### POST /siswa
Create siswa baru.

**Request:**
```json
{
  "nisn": "0012345678",
  "nis": "12345",
  "name": "Nama Siswa",
  "gender": "L",
  "birthDate": "2008-05-15",
  "birthPlace": "Bandung",
  "religion": "Islam",
  "address": "Jl. Margahayu...",
  "phone": "081234567890",
  "email": "siswa@email.com",
  "kelasId": "uuid",
  "tahunMasuk": "2024/2025"
}
```

### PUT /siswa/:id
Update siswa.

### DELETE /siswa/:id
Delete siswa (soft delete).

### POST /siswa/import
Import siswa dari Excel.

**Request:** `multipart/form-data` dengan file `.xlsx`

### GET /siswa/export
Export siswa ke Excel/PDF.

**Query Params:** `format=xlsx|pdf`, `kelas`, `jurusan`, `status`

### GET /siswa/alumni
List alumni dengan filter tahun lulus.

---

## Guru

### GET /guru
List semua guru.

### GET /guru/:id
Get guru detail dengan jadwal mengajar.

### POST /guru
Create guru baru.

**Request:**
```json
{
  "nip": "197504152001121001",
  "nuptk": "1234567890123456",
  "name": "Dr. Ahmad Suryadi, M.Pd",
  "gender": "L",
  "birthDate": "1975-04-15",
  "status": "PNS",
  "bidangStudi": "Matematika",
  "pendidikan": "S3",
  "phone": "081234567890",
  "email": "guru@marhas.sch.id",
  "address": "Alamat lengkap"
}
```

### PUT /guru/:id
Update guru.

### DELETE /guru/:id
Delete guru.

---

## Kelas

### GET /kelas
List semua kelas.

**Query Params:** `jurusan`, `tingkat`, `tahunAjaran`

### GET /kelas/:id
Get kelas detail dengan daftar siswa.

### POST /kelas
Create kelas baru.

**Request:**
```json
{
  "tingkat": "X",
  "jurusan": "RPL",
  "nomor": 1,
  "waliKelasId": "guru-uuid",
  "tahunAjaran": "2024/2025",
  "kapasitas": 36
}
```

### PUT /kelas/:id
Update kelas.

### POST /kelas/:id/siswa
Assign siswa ke kelas.

**Request:**
```json
{
  "siswaIds": ["uuid1", "uuid2", "uuid3"]
}
```

### DELETE /kelas/:id/siswa/:siswaId
Remove siswa dari kelas.

---

## Perpustakaan

### Buku

#### GET /perpustakaan/buku
List buku dengan filter kategori, penerbit.

#### GET /perpustakaan/buku/:id
Detail buku dengan status ketersediaan.

#### POST /perpustakaan/buku
Create buku baru.

#### POST /perpustakaan/buku/import
Import buku dari Excel.

### Peminjaman

#### GET /perpustakaan/peminjaman
List peminjaman dengan filter status.

#### POST /perpustakaan/peminjaman
Create peminjaman baru.

**Request:**
```json
{
  "bukuId": "uuid",
  "peminjamId": "siswa-uuid",
  "tanggalPinjam": "2024-01-15",
  "tanggalKembali": "2024-01-22"
}
```

#### PUT /perpustakaan/peminjaman/:id/return
Proses pengembalian buku.

### Denda

#### GET /perpustakaan/denda
List denda perpustakaan.

#### POST /perpustakaan/denda/:id/pay
Bayar denda.

---

## Keuangan

### SPP

#### GET /keuangan/spp
List tagihan SPP.

#### GET /keuangan/spp/siswa/:siswaId
Tagihan SPP per siswa.

#### POST /keuangan/spp/bayar
Bayar SPP.

**Request:**
```json
{
  "siswaId": "uuid",
  "bulan": "2024-01",
  "jumlah": 500000,
  "metodePembayaran": "transfer"
}
```

### Transaksi

#### GET /keuangan/transaksi
List transaksi (pemasukan/pengeluaran).

#### POST /keuangan/transaksi
Create transaksi baru.

### Rekonsiliasi

#### POST /keuangan/rekonsiliasi/import
Import mutasi bank.

#### GET /keuangan/rekonsiliasi
Get hasil rekonsiliasi.

---

## Absensi

### GET /absensi/hari-ini
Rekap absensi hari ini.

### GET /absensi/kelas/:kelasId
Absensi per kelas.

### POST /absensi/checkin
Checkin siswa (hadir).

**Request:**
```json
{
  "siswaId": "uuid",
  "timestamp": "2024-01-15T07:30:00Z",
  "method": "qrcode|fingerprint|manual"
}
```

### GET /absensi/rekap
Rekap absensi dengan filter periode, kelas.

### Dispensasi

#### GET /absensi/dispensasi
List dispensasi.

#### POST /absensi/dispensasi
Create dispensasi baru.

#### PUT /absensi/dispensasi/:id/approve
Approve dispensasi.

#### PUT /absensi/dispensasi/:id/reject
Reject dispensasi.

---

## Jadwal

### GET /jadwal/kelas/:kelasId
Jadwal per kelas.

### GET /jadwal/guru/:guruId
Jadwal per guru.

### POST /jadwal
Create jadwal baru.

### PUT /jadwal/:id
Update jadwal.

### POST /jadwal/substitusi
Create substitusi guru.

---

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email already exists",
    "details": [
      { "field": "email", "message": "Email must be unique" }
    ]
  }
}
```

### Pagination Meta
```json
{
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Token invalid/expired |
| FORBIDDEN | 403 | No permission |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 422 | Input validation failed |
| SERVER_ERROR | 500 | Internal server error |
