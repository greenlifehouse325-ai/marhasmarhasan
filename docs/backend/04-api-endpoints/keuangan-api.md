# SMK Marhas - API Endpoints: Keuangan

## Base URL
```
https://api.marhas.sch.id/v1/keuangan
```

---

## 1. SPP API

### GET /spp

List tagihan SPP.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| siswaId | uuid | Filter by siswa |
| tahun | number | Tahun (2024) |
| bulan | number | Bulan (1-12) |
| status | string | pending/waiting/verified/rejected |
| kelasId | uuid | Filter by kelas |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "siswa": {
        "id": "uuid",
        "nis": "12345",
        "name": "Ahmad Rizki",
        "class": "XII RPL 1"
      },
      "bulan": 1,
      "tahun": 2024,
      "amount": 500000,
      "status": "pending",
      "paymentMethod": null,
      "paymentProof": null,
      "paidAt": null,
      "verifiedBy": null,
      "verifiedAt": null
    }
  ],
  "summary": {
    "totalTagihan": 50000000,
    "totalLunas": 45000000,
    "totalTertunggak": 5000000
  }
}
```

### GET /spp/siswa/:siswaId

Semua tagihan SPP untuk siswa tertentu.

**Response:**
```json
{
  "siswa": { "id": "uuid", "name": "Ahmad", ... },
  "tagihan": [
    { "bulan": 1, "tahun": 2024, "amount": 500000, "status": "verified" },
    { "bulan": 2, "tahun": 2024, "amount": 500000, "status": "pending" }
  ],
  "summary": {
    "totalTagihan": 6000000,
    "totalBayar": 3000000,
    "sisaBayar": 3000000,
    "paidMonths": 6,
    "pendingMonths": 6
  }
}
```

### POST /spp/bayar

Proses pembayaran SPP.

**Request:**
```json
{
  "siswaId": "siswa-uuid",
  "bulan": 2,
  "tahun": 2024,
  "amount": 500000,
  "paymentMethod": "transfer",
  "paymentProof": "proof-image-url"
}
```

### PUT /spp/:id/verify

Verifikasi pembayaran.

**Request:**
```json
{
  "status": "verified",  // verified | rejected
  "notes": "Catatan verifikasi"
}
```

### POST /spp/generate

Generate tagihan SPP massal.

**Request:**
```json
{
  "tahun": 2024,
  "bulan": 1,
  "kelasIds": ["kelas-uuid-1", "kelas-uuid-2"],  // or "all"
  "amount": 500000
}
```

---

## 2. Transaksi API

### GET /transaksi

List transaksi (pemasukan/pengeluaran).

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| type | string | income/expense |
| category | string | Filter kategori |
| dateFrom, dateTo | date | Filter tanggal |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "income",
      "category": "SPP",
      "description": "Pembayaran SPP bulan Januari",
      "amount": 500000,
      "date": "2024-01-15",
      "reference": "SPP-001-2024",
      "attachments": [],
      "createdBy": { "id": "uuid", "name": "Admin Keuangan" },
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ],
  "summary": {
    "totalIncome": 50000000,
    "totalExpense": 30000000,
    "balance": 20000000
  }
}
```

### POST /transaksi

Buat transaksi baru.

**Request:**
```json
{
  "type": "expense",
  "category": "Operasional",
  "description": "Pembelian ATK",
  "amount": 1500000,
  "date": "2024-01-15",
  "reference": "EXP-001-2024"
}
```

### PUT /transaksi/:id

Update transaksi.

### DELETE /transaksi/:id

Hapus transaksi.

---

## 3. Kategori Transaksi

### Income Categories
- SPP
- Denda Perpustakaan
- Pendaftaran
- Seragam
- Kegiatan
- Lainnya

### Expense Categories
- Gaji
- Operasional
- Pemeliharaan
- ATK
- Kegiatan
- Lainnya

---

## 4. Anggaran API

### GET /anggaran

List anggaran per kategori.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "category": "Operasional",
      "tahun": 2024,
      "budgetAmount": 100000000,
      "usedAmount": 75000000,
      "remainingAmount": 25000000,
      "percentage": 75
    }
  ]
}
```

### POST /anggaran

Set anggaran baru.

### PUT /anggaran/:id

Update anggaran.

---

## 5. Beasiswa API

### GET /beasiswa

List penerima beasiswa.

### POST /beasiswa

Tambah penerima beasiswa.

**Request:**
```json
{
  "siswaId": "siswa-uuid",
  "jenis": "KIP",
  "percentage": 100,
  "startMonth": "2024-01",
  "endMonth": "2024-12",
  "notes": "Catatan"
}
```

---

## 6. Rekonsiliasi API

### POST /rekonsiliasi/import

Import mutasi bank.

**Request:** `multipart/form-data`
```
bank: BCA
file: mutasi.csv
```

### GET /rekonsiliasi

Get hasil rekonsiliasi.

**Response:**
```json
{
  "data": [
    {
      "date": "2024-01-15",
      "description": "Transfer dari Ahmad",
      "bankAmount": 500000,
      "systemAmount": 500000,
      "status": "matched"  // matched, mismatch, unmatched
    }
  ],
  "summary": {
    "total": 100,
    "matched": 95,
    "mismatch": 3,
    "unmatched": 2
  }
}
```

### POST /rekonsiliasi/:id/resolve

Resolve unmatched transaction.

---

## 7. Laporan Keuangan

### GET /laporan

Generate laporan keuangan.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| dateFrom | date | Tanggal mulai |
| dateTo | date | Tanggal akhir |
| type | string | all/income/expense |
| format | string | json/pdf/xlsx |

**Response (JSON):**
```json
{
  "period": {
    "from": "2024-01-01",
    "to": "2024-01-31"
  },
  "summary": {
    "totalIncome": 150000000,
    "totalExpense": 80000000,
    "netBalance": 70000000
  },
  "incomeByCategory": {
    "SPP": 120000000,
    "Denda": 5000000,
    "Lainnya": 25000000
  },
  "expenseByCategory": {
    "Gaji": 50000000,
    "Operasional": 20000000,
    "ATK": 10000000
  },
  "monthlyTrend": [
    { "month": "2024-01", "income": 50000000, "expense": 30000000 }
  ]
}
```

### GET /laporan/spp

Laporan SPP per kelas.

### GET /laporan/tunggakan

Daftar siswa dengan tunggakan.

---

## 8. Invoice API

### GET /invoice

List invoice.

### POST /invoice

Generate invoice untuk pembayaran.

**Request:**
```json
{
  "siswaId": "siswa-uuid",
  "items": [
    { "description": "SPP Januari 2024", "amount": 500000 },
    { "description": "SPP Februari 2024", "amount": 500000 }
  ],
  "dueDate": "2024-02-15"
}
```

### GET /invoice/:id/pdf

Download invoice as PDF.

---

## Statistics

### GET /stats

```json
{
  "monthlyIncome": 150000000,
  "monthlyExpense": 80000000,
  "sppCollection": {
    "target": 200000000,
    "collected": 180000000,
    "percentage": 90
  },
  "pendingPayments": 25,
  "unpaidFines": 750000
}
```

---

## Permissions

| Action | super_admin | admin_keuangan |
|--------|:-----------:|:--------------:|
| View | ✅ | ✅ |
| Create | ✅ | ✅ |
| Approve | ✅ | ✅ |
| Export | ✅ | ✅ |
| Settings | ✅ | ❌ |
