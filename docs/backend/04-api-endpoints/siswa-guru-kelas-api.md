# SMK Marhas - API Endpoints: Siswa, Guru, Kelas

---

## 1. Siswa API

### GET /siswa

List semua siswa dengan pagination dan filter.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Nomor halaman |
| limit | number | 10 | Items per page (max 100) |
| search | string | - | Cari nama/NISN/NIS |
| kelasId | uuid | - | Filter by kelas |
| jurusan | string | - | PPLG/TKJ/TMS |
| campus | number | - | 1 atau 2 |
| status | string | active | active/inactive/graduated/dropped |
| sortBy | string | name | Field untuk sorting |
| sortOrder | string | asc | asc/desc |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nisn": "0012345678",
      "nis": "12345",
      "name": "Ahmad Rizki",
      "email": "ahmad@email.com",
      "phone": "081234567890",
      "gender": "L",
      "birthDate": "2008-05-15",
      "birthPlace": "Bandung",
      "religion": "Islam",
      "address": "Jl. Margahayu No. 123",
      "photo": "/photos/siswa/ahmad.jpg",
      "kelas": {
        "id": "uuid",
        "name": "XII RPL 1"
      },
      "jurusan": "PPLG",
      "campus": 1,
      "tahunMasuk": "2022/2023",
      "status": "active",
      "createdAt": "2022-07-15T00:00:00Z"
    }
  ],
  "meta": {
    "total": 1250,
    "page": 1,
    "limit": 10,
    "totalPages": 125,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /siswa/:id

Get detail siswa dengan relasi.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nisn": "0012345678",
    "nis": "12345",
    "name": "Ahmad Rizki",
    // ... all fields ...
    "orangtua": [
      {
        "id": "uuid",
        "name": "Budi Santoso",
        "relationship": "ayah",
        "phone": "081111111111",
        "email": "budi@email.com",
        "occupation": "Wiraswasta"
      }
    ],
    "absensiSummary": {
      "hadir": 85,
      "alpha": 2,
      "izin": 3,
      "sakit": 5,
      "terlambat": 5,
      "percentage": 85
    },
    "sppStatus": {
      "paidMonths": 6,
      "pendingMonths": 0,
      "totalPaid": 3000000
    }
  }
}
```

### POST /siswa

Create siswa baru.

**Request:**
```json
{
  "nisn": "0012345678",
  "nis": "12345",
  "name": "Nama Siswa",
  "email": "siswa@email.com",
  "phone": "081234567890",
  "gender": "L",
  "birthDate": "2008-05-15",
  "birthPlace": "Bandung",
  "religion": "Islam",
  "address": "Alamat lengkap",
  "kelasId": "kelas-uuid",
  "jurusan": "PPLG",
  "campus": 1,
  "tahunMasuk": "2024/2025"
}
```

### PUT /siswa/:id

Update siswa.

### DELETE /siswa/:id

Soft delete siswa (set status = 'dropped').

### POST /siswa/import

Import siswa dari Excel.

**Request:** `multipart/form-data`
```
file: siswa_import.xlsx
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "imported": 95,
    "failed": 5,
    "errors": [
      { "row": 15, "error": "NISN sudah ada" },
      { "row": 23, "error": "Kelas tidak ditemukan" }
    ]
  }
}
```

### GET /siswa/export

Export siswa ke Excel/PDF.

**Query Parameters:**
- `format`: xlsx | pdf
- `kelasId`: Filter kelas
- `jurusan`: Filter jurusan
- `status`: Filter status

**Response:** File download

### GET /siswa/alumni

List alumni dengan filter tahun lulus.

---

## 2. Guru API

### GET /guru

List semua guru.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| search | string | Cari nama/NIP |
| status | string | active/inactive/retired |
| bidangStudi | string | Filter mata pelajaran |
| isHomeroom | boolean | Filter wali kelas |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nip": "197504152001121001",
      "nuptk": "1234567890123456",
      "name": "Dr. Ahmad Suryadi, M.Pd",
      "email": "ahmad@marhas.sch.id",
      "phone": "081234567890",
      "gender": "L",
      "birthDate": "1975-04-15",
      "statusKepegawaian": "PNS",
      "bidangStudi": "Matematika",
      "pendidikan": "S3",
      "campus": "both",
      "isHomeroom": true,
      "homeroomClass": {
        "id": "uuid",
        "name": "XII RPL 1"
      },
      "status": "active"
    }
  ],
  "meta": { ... }
}
```

### GET /guru/:id

Get detail guru dengan jadwal mengajar.

**Response includes:**
```json
{
  "jadwal": [
    {
      "hari": "senin",
      "jamMulai": "07:00",
      "jamSelesai": "08:30",
      "mapel": "Matematika",
      "kelas": "XII RPL 1",
      "ruangan": "R.201"
    }
  ],
  "totalJamMengajar": 24
}
```

### POST /guru

Create guru baru.

**Request:**
```json
{
  "nip": "197504152001121001",
  "nuptk": "1234567890123456",
  "name": "Dr. Ahmad Suryadi, M.Pd",
  "email": "ahmad@marhas.sch.id",
  "phone": "081234567890",
  "gender": "L",
  "birthDate": "1975-04-15",
  "birthPlace": "Bandung",
  "address": "Alamat lengkap",
  "statusKepegawaian": "PNS",
  "bidangStudi": "Matematika",
  "pendidikan": "S3",
  "campus": "both",
  "startDate": "2001-12-01"
}
```

### PUT /guru/:id

Update guru.

### DELETE /guru/:id

Soft delete guru.

---

## 3. Kelas API

### GET /kelas

List semua kelas.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| grade | number | 10/11/12 |
| jurusan | string | PPLG/TKJ/TMS |
| campus | number | 1/2 |
| tahunAjaran | string | 2024/2025 |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "XII RPL 1",
      "grade": 12,
      "jurusan": "PPLG",
      "nomor": 1,
      "campus": 1,
      "waliKelas": {
        "id": "uuid",
        "name": "Dr. Ahmad Suryadi, M.Pd"
      },
      "tahunAjaran": "2024/2025",
      "kapasitas": 36,
      "studentCount": 34,
      "ruangan": "R.301",
      "status": "active"
    }
  ]
}
```

### GET /kelas/:id

Get detail kelas dengan daftar siswa.

**Response includes:**
```json
{
  "siswa": [
    {
      "id": "uuid",
      "nis": "12345",
      "name": "Ahmad Rizki",
      "gender": "L",
      "photo": "/photos/ahmad.jpg"
    }
  ],
  "jadwal": [
    {
      "hari": "senin",
      "slots": [
        { "jamMulai": "07:00", "jamSelesai": "08:30", "mapel": "Matematika", "guru": "Dr. Ahmad" }
      ]
    }
  ]
}
```

### POST /kelas

Create kelas baru.

**Request:**
```json
{
  "name": "X RPL 1",
  "grade": 10,
  "jurusan": "PPLG",
  "nomor": 1,
  "campus": 1,
  "waliKelasId": "guru-uuid",
  "tahunAjaran": "2024/2025",
  "kapasitas": 36,
  "ruangan": "R.101"
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

## 4. Orangtua API

### GET /orangtua

List semua orangtua.

### GET /orangtua/:id

Get detail orangtua dengan daftar anak.

### POST /orangtua

Create orangtua baru.

**Request:**
```json
{
  "name": "Budi Santoso",
  "relationship": "ayah",
  "phone": "081111111111",
  "email": "budi@email.com",
  "occupation": "Wiraswasta",
  "address": "Alamat lengkap"
}
```

### PUT /orangtua/:id

Update orangtua.

### POST /orangtua/:id/link

Link orangtua dengan siswa.

**Request:**
```json
{
  "siswaId": "siswa-uuid"
}
```

### DELETE /orangtua/:id/link/:siswaId

Unlink orangtua dari siswa.

---

## Common Error Responses

```json
// 400 Bad Request - Validation Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "details": [
      { "field": "nisn", "message": "NISN harus 10 digit" },
      { "field": "email", "message": "Email tidak valid" }
    ]
  }
}

// 404 Not Found
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Siswa tidak ditemukan"
  }
}

// 409 Conflict
{
  "success": false,
  "error": {
    "code": "DUPLICATE",
    "message": "NISN sudah terdaftar"
  }
}
```

---

## Permissions Required

| Endpoint | Roles |
|----------|-------|
| GET /siswa | All admins |
| POST /siswa | super_admin |
| PUT /siswa | super_admin |
| DELETE /siswa | super_admin |
| GET /guru | All admins |
| POST /guru | super_admin |
| GET /kelas | All admins |
| POST /kelas | super_admin, admin_jadwal |
