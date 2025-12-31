# SMK Marhas - API Endpoints: Absensi & Jadwal

---

## ABSENSI API

### Base URL
```
https://api.marhas.sch.id/v1/absensi
```

---

### 1. Session API

#### GET /session

List absensi sessions.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| date | date | Filter tanggal |
| status | string | scheduled/active/ended |
| campus | number | 1/2 |
| type | string | regular/ceremony/event/exam |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Absensi Pagi - Senin",
      "type": "regular",
      "date": "2024-01-15",
      "startTime": "07:00",
      "endTime": "07:30",
      "campus": 1,
      "targetClasses": ["XII RPL 1", "XII RPL 2"],
      "qrCode": "current-qr-code",
      "status": "active",
      "scannedCount": 45,
      "targetCount": 70
    }
  ]
}
```

#### GET /session/:id

Detail session dengan attendance records.

#### POST /session

Buat session absensi baru.

**Request:**
```json
{
  "title": "Absensi Upacara",
  "type": "ceremony",
  "date": "2024-01-15",
  "startTime": "07:00",
  "endTime": "08:00",
  "campus": 1,
  "targetClasses": ["all"],  // atau ["XII RPL 1"]
  "refreshInterval": 30
}
```

#### PUT /session/:id/start

Mulai session (set status = active).

#### PUT /session/:id/end

Akhiri session (set status = ended).

#### GET /session/:id/qr

Get QR code terbaru.

**Response:**
```json
{
  "qrCode": "data:image/png;base64,...",
  "validUntil": "2024-01-15T07:00:30Z",
  "refreshIn": 30
}
```

---

### 2. Attendance Record API

#### GET /record

List attendance records.

**Query Parameters:**
- `sessionId`: Filter by session
- `siswaId`: Filter by siswa
- `kelasId`: Filter by kelas
- `status`: hadir/alpha/izin/sakit/terlambat
- `date`: Filter tanggal

#### POST /record/checkin

Checkin siswa (dari scan QR).

**Request:**
```json
{
  "sessionId": "session-uuid",
  "siswaId": "siswa-uuid",
  "method": "qrcode"  // qrcode, fingerprint, manual
}
```

#### PUT /record/:id

Update status absensi (manual).

**Request:**
```json
{
  "status": "izin",
  "note": "Keterangan"
}
```

#### POST /record/bulk

Update bulk attendance (untuk kelas).

**Request:**
```json
{
  "sessionId": "session-uuid",
  "records": [
    { "siswaId": "uuid1", "status": "hadir" },
    { "siswaId": "uuid2", "status": "alpha" }
  ]
}
```

---

### 3. Rekap API

#### GET /rekap/hari-ini

Rekap absensi hari ini.

**Response:**
```json
{
  "date": "2024-01-15",
  "summary": {
    "hadir": 1150,
    "alpha": 25,
    "izin": 30,
    "sakit": 20,
    "terlambat": 15,
    "total": 1240,
    "percentage": 92.7
  },
  "byClass": [
    { "classId": "uuid", "className": "XII RPL 1", "hadir": 32, "total": 35, "percentage": 91.4 }
  ]
}
```

#### GET /rekap/kelas/:kelasId

Rekap absensi per kelas.

**Query:** `dateFrom`, `dateTo`

#### GET /rekap/siswa/:siswaId

Rekap absensi per siswa.

---

### 4. Dispensasi API

#### GET /dispensasi

List dispensasi.

**Query:** `status`, `date`, `siswaId`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "siswa": { "id": "uuid", "name": "Ahmad", "class": "XII RPL 1" },
      "date": "2024-01-15",
      "duration": "2 Jam",
      "jenis": "Lomba",
      "alasan": "Mengikuti lomba debat antar sekolah",
      "status": "pending",
      "approvedBy": null,
      "createdAt": "2024-01-14T10:00:00Z"
    }
  ]
}
```

#### POST /dispensasi

Ajukan dispensasi.

**Request:**
```json
{
  "siswaId": "siswa-uuid",
  "date": "2024-01-15",
  "duration": "2 Jam",
  "jenis": "Lomba",
  "alasan": "Mengikuti lomba debat"
}
```

#### PUT /dispensasi/:id/approve

Approve dispensasi.

#### PUT /dispensasi/:id/reject

Reject dispensasi.

**Request:**
```json
{
  "reason": "Alasan penolakan"
}
```

---

### 5. Izin API

#### GET /izin

List izin siswa.

#### POST /izin

Submit izin.

**Request:**
```json
{
  "siswaId": "siswa-uuid",
  "dateFrom": "2024-01-15",
  "dateTo": "2024-01-17",
  "type": "sakit",
  "reason": "Demam",
  "attachment": "surat-dokter.pdf"
}
```

---

### 6. Laporan

#### GET /laporan

Generate laporan absensi.

**Query:** `dateFrom`, `dateTo`, `kelasId`, `format`

---

## JADWAL API

### Base URL
```
https://api.marhas.sch.id/v1/jadwal
```

---

### 1. Jadwal Kelas

#### GET /kelas/:kelasId

Jadwal untuk kelas tertentu.

**Response:**
```json
{
  "kelas": { "id": "uuid", "name": "XII RPL 1" },
  "jadwal": {
    "senin": [
      { "jamMulai": "07:00", "jamSelesai": "08:30", "mapel": "Matematika", "guru": "Dr. Ahmad", "ruangan": "R.201" }
    ],
    "selasa": [ ... ]
  }
}
```

### 2. Jadwal Guru

#### GET /guru/:guruId

Jadwal mengajar guru.

**Response:**
```json
{
  "guru": { "id": "uuid", "name": "Dr. Ahmad Suryadi" },
  "totalJamMengajar": 24,
  "jadwal": [
    { "hari": "senin", "jamMulai": "07:00", "jamSelesai": "08:30", "mapel": "Matematika", "kelas": "XII RPL 1" }
  ]
}
```

### 3. CRUD Jadwal

#### GET /
#### POST /
#### PUT /:id
#### DELETE /:id

---

### 4. Substitusi

#### GET /substitusi

List substitusi guru.

#### POST /substitusi

Ajukan substitusi.

**Request:**
```json
{
  "jadwalId": "jadwal-uuid",
  "guruPenggantiId": "guru-uuid",
  "tanggal": "2024-01-15",
  "alasan": "Guru utama sakit"
}
```

#### PUT /substitusi/:id/approve
#### PUT /substitusi/:id/reject

---

### 5. Kalender

#### GET /kalender

Event kalender akademik.

**Query:** `dateFrom`, `dateTo`, `type`

**Response:**
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Libur Tahun Baru",
      "type": "holiday",
      "date": "2024-01-01",
      "endDate": null,
      "allDay": true,
      "campus": "both"
    }
  ]
}
```

#### POST /kalender

Tambah event.

#### PUT /kalender/:id
#### DELETE /kalender/:id

---

### 6. Perubahan Jadwal

#### GET /perubahan

List perubahan jadwal.

#### POST /perubahan

Ajukan perubahan jadwal.

---

## Permissions

| Module | super_admin | admin_absensi | admin_jadwal |
|--------|:-----------:|:-------------:|:------------:|
| Absensi | ✅ | ✅ | ❌ |
| Dispensasi | ✅ | ✅ | ❌ |
| Jadwal | ✅ | R | ✅ |
| Kalender | ✅ | R | ✅ |
| Substitusi | ✅ | ❌ | ✅ |
