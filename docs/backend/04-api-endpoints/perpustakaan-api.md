# SMK Marhas - API Endpoints: Perpustakaan

## Base URL
```
https://api.marhas.sch.id/v1/perpustakaan
```

---

## 1. Buku API

### GET /buku

List semua buku.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| search | string | Cari judul/ISBN/author |
| kategoriId | uuid | Filter kategori |
| publisherId | uuid | Filter penerbit |
| status | string | available/limited/unavailable |
| page, limit | number | Pagination |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "isbn": "978-602-1234-56-7",
      "title": "Pemrograman Web dengan JavaScript",
      "author": "John Doe",
      "publisher": { "id": "uuid", "name": "Erlangga" },
      "publishedYear": 2023,
      "kategori": { "id": "uuid", "name": "Teknologi" },
      "location": "R1-B3",
      "totalCopies": 5,
      "availableCopies": 3,
      "cover": "/covers/js-book.jpg",
      "language": "Indonesia",
      "pages": 350,
      "status": "available"
    }
  ],
  "meta": { "total": 500, ... }
}
```

### GET /buku/:id

Detail buku dengan history peminjaman.

### POST /buku

Tambah buku baru.

**Request:**
```json
{
  "isbn": "978-602-1234-56-7",
  "title": "Judul Buku",
  "author": "Nama Penulis",
  "publisherId": "publisher-uuid",
  "publishedYear": 2023,
  "kategoriId": "kategori-uuid",
  "location": "R1-B3",
  "totalCopies": 5,
  "description": "Deskripsi buku",
  "language": "Indonesia",
  "pages": 350
}
```

### PUT /buku/:id

Update buku.

### DELETE /buku/:id

Hapus buku.

### POST /buku/import

Import buku dari Excel.

### GET /buku/:id/barcode

Generate barcode untuk buku.

**Response:**
```json
{
  "barcodeImage": "data:image/png;base64,...",
  "isbn": "978-602-1234-56-7"
}
```

---

## 2. Peminjaman API

### GET /peminjaman

List peminjaman.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| status | string | active/overdue/returned |
| peminjamId | uuid | Filter by peminjam |
| bukuId | uuid | Filter by buku |
| dateFrom, dateTo | date | Filter tanggal |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "buku": { "id": "uuid", "title": "Judul Buku", "isbn": "..." },
      "peminjam": {
        "id": "uuid",
        "name": "Ahmad Rizki",
        "type": "student",
        "class": "XII RPL 1"
      },
      "borrowDate": "2024-01-15",
      "dueDate": "2024-01-22",
      "returnDate": null,
      "status": "active",
      "daysRemaining": 5
    }
  ]
}
```

### GET /peminjaman/:id

Detail peminjaman.

### POST /peminjaman

Buat peminjaman baru.

**Request:**
```json
{
  "bukuId": "buku-uuid",
  "peminjamId": "siswa-uuid",
  "peminjamType": "student",
  "dueDate": "2024-01-22",
  "notes": "Catatan"
}
```

### PUT /peminjaman/:id/return

Proses pengembalian.

**Request:**
```json
{
  "condition": "good",  // good, damaged, lost
  "notes": "Catatan kondisi"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "returned",
    "fine": {
      "amount": 0,
      "reason": null
    }
  }
}
```

### PUT /peminjaman/:id/extend

Perpanjang peminjaman.

**Request:**
```json
{
  "newDueDate": "2024-01-29"
}
```

---

## 3. Denda API

### GET /denda

List semua denda.

**Query Parameters:**
- `status`: pending/paid/waived
- `peminjamId`: Filter by peminjam

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "peminjaman": { ... },
      "peminjam": { "name": "Ahmad", "class": "XII RPL 1" },
      "amount": 15000,
      "daysOverdue": 3,
      "reason": "overdue",
      "status": "pending",
      "createdAt": "2024-01-25"
    }
  ]
}
```

### POST /denda/:id/pay

Bayar denda.

**Request:**
```json
{
  "amount": 15000,
  "paymentMethod": "cash"
}
```

### POST /denda/:id/waive

Bebaskan denda (waive).

**Request:**
```json
{
  "reason": "Alasan pembebasan"
}
```

---

## 4. Kategori & Penerbit

### GET /kategori
### POST /kategori
### PUT /kategori/:id
### DELETE /kategori/:id

### GET /penerbit
### POST /penerbit
### PUT /penerbit/:id
### DELETE /penerbit/:id

---

## 5. Anggota (Members)

### GET /anggota

List anggota perpustakaan (siswa + guru yang aktif).

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "student",
      "name": "Ahmad Rizki",
      "identifier": "12345",  // NIS/NIP
      "class": "XII RPL 1",
      "activeLoans": 2,
      "overdueLoans": 0,
      "totalFines": 0
    }
  ]
}
```

### GET /anggota/:id/history

Riwayat peminjaman member.

---

## 6. Konten Digital

### GET /konten-digital

List konten digital (ebook, pdf, video).

### POST /konten-digital

Upload konten digital.

**Request:** `multipart/form-data`
```
title: Judul Konten
type: ebook | pdf | video | audio
kategoriId: uuid
file: [file upload]
description: Deskripsi
```

---

## 7. Laporan

### GET /laporan/peminjaman

Laporan peminjaman.

**Query:** `dateFrom`, `dateTo`, `format`

### GET /laporan/denda

Laporan denda.

### GET /laporan/popular

Buku populer.

---

## Statistics

### GET /stats

```json
{
  "totalBooks": 500,
  "totalCopies": 1250,
  "availableCopies": 980,
  "borrowedCopies": 270,
  "totalMembers": 1500,
  "activeLoans": 150,
  "overdueLoans": 12,
  "totalFines": 250000,
  "unpaidFines": 75000,
  "todayLoans": 15,
  "todayReturns": 8
}
```

---

## Permissions

| Action | super_admin | admin_perpustakaan |
|--------|:-----------:|:------------------:|
| View | ✅ | ✅ |
| Create | ✅ | ✅ |
| Update | ✅ | ✅ |
| Delete | ✅ | ✅ |
| Export | ✅ | ✅ |
