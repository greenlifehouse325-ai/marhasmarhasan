# SMK Marhas - API Endpoints: Aplikasi & Admin

---

## APLIKASI API

### Base URL
```
https://api.marhas.sch.id/v1/aplikasi
```

---

### 1. Pengumuman API

#### GET /pengumuman

List pengumuman.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| status | string | draft/published/archived |
| category | string | academic/event/administrative/holiday/general |
| priority | string | low/normal/high/urgent |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Libur Semester Ganjil",
      "content": "Konten lengkap...",
      "excerpt": "Kutipan singkat...",
      "category": "holiday",
      "priority": "high",
      "targetAudience": {
        "students": true,
        "teachers": true,
        "parents": true,
        "classes": [],
        "majors": []
      },
      "image": "/images/holiday-banner.jpg",
      "attachments": [{ "name": "Surat.pdf", "url": "/docs/surat.pdf" }],
      "publishedAt": "2024-01-15T08:00:00Z",
      "expiresAt": "2024-01-30T23:59:59Z",
      "status": "published",
      "views": 1250,
      "createdBy": { "id": "uuid", "name": "Admin Aplikasi" }
    }
  ]
}
```

#### GET /pengumuman/:id

Detail pengumuman.

#### POST /pengumuman

Buat pengumuman baru.

**Request:**
```json
{
  "title": "Judul Pengumuman",
  "content": "Isi lengkap pengumuman...",
  "excerpt": "Ringkasan singkat",
  "category": "academic",
  "priority": "normal",
  "targetAudience": {
    "students": true,
    "teachers": true,
    "parents": false,
    "classes": ["XII RPL 1", "XII RPL 2"],
    "majors": ["PPLG"]
  },
  "publishedAt": "2024-01-15T08:00:00Z",
  "expiresAt": "2024-01-30T23:59:59Z",
  "status": "draft"
}
```

#### PUT /pengumuman/:id

Update pengumuman.

#### DELETE /pengumuman/:id

Hapus pengumuman.

#### PUT /pengumuman/:id/publish

Publish pengumuman.

#### PUT /pengumuman/:id/archive

Arsipkan pengumuman.

---

### 2. Berita API

#### GET /berita

List berita.

**Query Parameters:**
- `status`: draft/published/archived
- `category`: achievement/activity/education/sports/technology
- `featured`: true/false

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Siswa SMK Marhas Juara Olimpiade",
      "content": "Artikel lengkap...",
      "excerpt": "Ringkasan artikel...",
      "category": "achievement",
      "images": ["/images/news1.jpg", "/images/news2.jpg"],
      "author": "Tim Humas",
      "publishedAt": "2024-01-15T08:00:00Z",
      "status": "published",
      "featured": true,
      "views": 3500
    }
  ]
}
```

#### POST /berita

Buat berita baru.

#### PUT /berita/:id
#### DELETE /berita/:id
#### PUT /berita/:id/feature

Toggle featured status.

---

### 3. Prestasi API

#### GET /prestasi

List prestasi.

**Query Parameters:**
- `level`: school/city/province/national/international
- `type`: academic/sports/arts/technology/other

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Juara 1 Lomba Web Design Tingkat Nasional",
      "description": "Deskripsi prestasi...",
      "level": "national",
      "type": "technology",
      "date": "2024-01-10",
      "participants": [
        { "id": "uuid", "name": "Ahmad Rizki", "class": "XII RPL 1" }
      ],
      "medal": "gold",
      "rank": 1,
      "images": ["/images/trophy.jpg"],
      "status": "published"
    }
  ]
}
```

#### POST /prestasi

Tambah prestasi.

**Request:**
```json
{
  "title": "Judul Prestasi",
  "description": "Deskripsi lengkap",
  "level": "national",
  "type": "technology",
  "date": "2024-01-10",
  "participants": [
    { "id": "siswa-uuid", "name": "Ahmad", "class": "XII RPL 1" }
  ],
  "medal": "gold",
  "rank": 1
}
```

---

### 4. Moderasi API

#### GET /moderasi

List laporan moderasi.

**Query:** `status`, `contentType`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "contentType": "post",
      "contentId": "content-uuid",
      "contentPreview": "Konten yang dilaporkan...",
      "reportedUser": { "id": "uuid", "name": "User Name" },
      "reporter": { "id": "uuid", "name": "Reporter Name" },
      "reason": "Konten tidak pantas",
      "status": "pending",
      "action": null,
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ]
}
```

#### PUT /moderasi/:id/review

Review laporan.

**Request:**
```json
{
  "action": "warn",  // warn, delete, ban, dismiss
  "notes": "Catatan moderator"
}
```

---

### 5. Bug Report API

#### GET /bug-report

List bug reports.

#### PUT /bug-report/:id

Update status bug report.

**Request:**
```json
{
  "status": "in_progress",  // open, in_progress, resolved, closed, wont_fix
  "assignedTo": "developer-id",
  "resolution": "Bug fixed in version 1.0.1"
}
```

---

### 6. Notifikasi API

#### GET /notifikasi

List notifikasi user.

#### POST /notifikasi/send

Kirim notifikasi.

**Request:**
```json
{
  "type": "announcement",
  "title": "Judul Notifikasi",
  "message": "Isi pesan",
  "targetRoles": ["student", "teacher"],
  "targetUsers": [],  // optional: specific user IDs
  "data": { "link": "/pengumuman/123" }
}
```

#### PUT /notifikasi/:id/read

Mark as read.

#### POST /notifikasi/read-all

Mark all as read.

---

## ADMIN API

### Base URL
```
https://api.marhas.sch.id/v1/admin
```

---

### 1. Admin Management

#### GET /

List semua admin.

**Query:** `role`, `status`, `search`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "admin@marhas.sch.id",
      "name": "Admin Perpustakaan",
      "phone": "081234567890",
      "avatar": "/avatars/admin.jpg",
      "role": "admin_perpustakaan",
      "status": "active",
      "isBanned": false,
      "lastLoginAt": "2024-01-15T08:00:00Z",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ]
}
```

#### GET /:id

Detail admin.

#### POST /

Create admin baru.

**Request:**
```json
{
  "email": "newadmin@marhas.sch.id",
  "password": "SecurePass123!",
  "name": "Admin Baru",
  "phone": "081234567890",
  "role": "admin_keuangan"
}
```

#### PUT /:id

Update admin.

#### DELETE /:id

Delete admin.

#### PUT /:id/ban

Ban admin.

**Request:**
```json
{
  "bannedUntil": "2024-02-15T00:00:00Z",
  "reason": "Alasan ban"
}
```

#### PUT /:id/unban

Unban admin.

#### PUT /:id/reset-password

Reset password admin.

---

### 2. Activity Log

#### GET /:id/activity

Get admin activity log.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "action": "create",
      "resource": "siswa",
      "resourceId": "siswa-uuid",
      "description": "Created new siswa: Ahmad Rizki",
      "ipAddress": "192.168.1.100",
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ]
}
```

---

### 3. Role & Permission

#### GET /roles

List available roles dengan permissions.

**Response:**
```json
{
  "data": [
    {
      "role": "admin_perpustakaan",
      "label": "Admin Perpustakaan",
      "description": "Mengelola perpustakaan",
      "permissions": [
        { "resource": "book", "actions": ["create", "read", "update", "delete"] },
        { "resource": "lending", "actions": ["create", "read", "update"] }
      ]
    }
  ]
}
```

---

### 4. Audit Log

#### GET /audit-logs

Get audit logs (super_admin only).

**Query:** `adminId`, `action`, `resource`, `dateFrom`, `dateTo`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "admin": { "id": "uuid", "name": "Super Admin", "role": "super_admin" },
      "action": "update",
      "resource": "siswa",
      "resourceId": "siswa-uuid",
      "oldData": { "name": "Ahmad" },
      "newData": { "name": "Ahmad Rizki" },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ]
}
```

---

### 5. System Settings

#### GET /settings

Get system settings (super_admin only).

#### PUT /settings

Update system settings.

**Request:**
```json
{
  "schoolName": "SMK Marhas",
  "sppAmount": 500000,
  "lateThreshold": 15,
  "maxBooksPerStudent": 3,
  "finePerDay": 1000
}
```

---

## Upload API

### POST /upload

Upload file.

**Request:** `multipart/form-data`
```
file: [file]
bucket: avatars | photos | documents
path: optional/subfolder
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.supabase.co/...",
    "path": "avatars/admin-123.jpg",
    "size": 102400,
    "type": "image/jpeg"
  }
}
```

---

## Permissions

| Module | super_admin | admin_aplikasi |
|--------|:-----------:|:--------------:|
| Pengumuman | ✅ | ✅ |
| Berita | ✅ | ✅ |
| Prestasi | ✅ | ✅ |
| Moderasi | ✅ | ✅ |
| Admin Mgmt | ✅ | ❌ |
| Audit Logs | ✅ | ❌ |
| Settings | ✅ | ❌ |
