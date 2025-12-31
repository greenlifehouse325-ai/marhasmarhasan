# SMK Marhas - Export & Report Service

## 1. Overview

Export service menangani:
- Export data ke Excel/PDF/CSV
- Generate laporan
- Scheduled reports

---

## 2. Export Service

**`src/modules/report/export.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as PDFDocument from 'pdfkit';
import { SupabaseService } from '../../database/supabase.service';
import { UploadService } from '../upload/upload.service';

export interface ExportOptions {
  format: 'xlsx' | 'pdf' | 'csv';
  title: string;
  filename: string;
  columns: ExportColumn[];
  filters?: Record<string, any>;
  dateRange?: { from: Date; to: Date };
}

export interface ExportColumn {
  key: string;
  header: string;
  width?: number;
  type?: 'string' | 'number' | 'date' | 'currency';
  format?: string;
}

@Injectable()
export class ExportService {
  constructor(
    private supabase: SupabaseService,
    private upload: UploadService,
  ) {}

  /**
   * Export data to Excel
   */
  async toExcel(data: any[], options: ExportOptions): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(options.title);

    // Add header row
    worksheet.columns = options.columns.map(col => ({
      header: col.header,
      key: col.key,
      width: col.width || 15,
    }));

    // Style header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    // Add data rows
    data.forEach((row, index) => {
      const rowData: any = {};
      options.columns.forEach(col => {
        let value = row[col.key];

        // Format based on type
        if (col.type === 'date' && value) {
          value = new Date(value).toLocaleDateString('id-ID');
        } else if (col.type === 'currency' && value) {
          value = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(value);
        }

        rowData[col.key] = value;
      });
      worksheet.addRow(rowData);

      // Alternate row colors
      if (index % 2 === 1) {
        worksheet.getRow(index + 2).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF2F2F2' },
        };
      }
    });

    // Add borders
    worksheet.eachRow(row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    return workbook.xlsx.writeBuffer() as Promise<Buffer>;
  }

  /**
   * Export data to CSV
   */
  async toCsv(data: any[], options: ExportOptions): Promise<Buffer> {
    const headers = options.columns.map(c => c.header).join(',');
    const rows = data.map(row => {
      return options.columns.map(col => {
        let value = row[col.key];
        if (typeof value === 'string' && value.includes(',')) {
          value = `"${value}"`;
        }
        return value ?? '';
      }).join(',');
    });

    const csv = [headers, ...rows].join('\n');
    return Buffer.from(csv, 'utf-8');
  }

  /**
   * Export data to PDF
   */
  async toPdf(data: any[], options: ExportOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Title
      doc.fontSize(18).text(options.title, { align: 'center' });
      doc.moveDown();

      // Date range
      if (options.dateRange) {
        doc.fontSize(10).text(
          `Periode: ${options.dateRange.from.toLocaleDateString('id-ID')} - ${options.dateRange.to.toLocaleDateString('id-ID')}`,
          { align: 'center' }
        );
        doc.moveDown();
      }

      // Table
      const tableTop = doc.y;
      const tableLeft = 50;
      const columnWidth = (doc.page.width - 100) / options.columns.length;

      // Headers
      doc.fontSize(10).font('Helvetica-Bold');
      options.columns.forEach((col, i) => {
        doc.text(col.header, tableLeft + (i * columnWidth), tableTop, {
          width: columnWidth,
          align: 'left',
        });
      });

      // Data rows
      doc.font('Helvetica');
      let y = tableTop + 25;
      data.forEach(row => {
        if (y > doc.page.height - 100) {
          doc.addPage();
          y = 50;
        }

        options.columns.forEach((col, i) => {
          let value = row[col.key];
          if (col.type === 'currency') {
            value = `Rp ${Number(value).toLocaleString('id-ID')}`;
          }
          doc.text(String(value ?? '-'), tableLeft + (i * columnWidth), y, {
            width: columnWidth,
            align: 'left',
          });
        });
        y += 20;
      });

      // Footer
      doc.fontSize(8).text(
        `Digenerate pada: ${new Date().toLocaleString('id-ID')}`,
        50, doc.page.height - 50
      );

      doc.end();
    });
  }

  /**
   * Export and save to storage
   */
  async exportAndSave(data: any[], options: ExportOptions): Promise<string> {
    let buffer: Buffer;

    switch (options.format) {
      case 'xlsx':
        buffer = await this.toExcel(data, options);
        break;
      case 'csv':
        buffer = await this.toCsv(data, options);
        break;
      case 'pdf':
        buffer = await this.toPdf(data, options);
        break;
    }

    // Upload to storage
    const result = await this.upload.upload(
      { buffer, mimetype: this.getMimeType(options.format), size: buffer.length } as any,
      {
        bucket: 'exports',
        folder: new Date().toISOString().split('T')[0],
        fileName: `${options.filename}.${options.format}`,
      }
    );

    return result.url;
  }

  private getMimeType(format: string): string {
    switch (format) {
      case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'pdf': return 'application/pdf';
      case 'csv': return 'text/csv';
      default: return 'application/octet-stream';
    }
  }
}
```

---

## 3. Report Templates

### Siswa Report
```typescript
const siswaColumns: ExportColumn[] = [
  { key: 'nis', header: 'NIS', width: 15 },
  { key: 'nisn', header: 'NISN', width: 15 },
  { key: 'name', header: 'Nama', width: 30 },
  { key: 'gender', header: 'L/P', width: 5 },
  { key: 'kelas_name', header: 'Kelas', width: 15 },
  { key: 'jurusan', header: 'Jurusan', width: 10 },
  { key: 'status', header: 'Status', width: 12 },
];
```

### SPP Report
```typescript
const sppColumns: ExportColumn[] = [
  { key: 'siswa_name', header: 'Nama Siswa', width: 25 },
  { key: 'siswa_class', header: 'Kelas', width: 12 },
  { key: 'bulan', header: 'Bulan', width: 10 },
  { key: 'tahun', header: 'Tahun', width: 8 },
  { key: 'amount', header: 'Jumlah', width: 15, type: 'currency' },
  { key: 'status', header: 'Status', width: 12 },
  { key: 'paid_at', header: 'Tanggal Bayar', width: 15, type: 'date' },
];
```

### Absensi Recap
```typescript
const absensiColumns: ExportColumn[] = [
  { key: 'siswa_name', header: 'Nama', width: 25 },
  { key: 'siswa_class', header: 'Kelas', width: 12 },
  { key: 'hadir', header: 'Hadir', width: 8 },
  { key: 'izin', header: 'Izin', width: 8 },
  { key: 'sakit', header: 'Sakit', width: 8 },
  { key: 'alpha', header: 'Alpha', width: 8 },
  { key: 'percentage', header: '%', width: 8 },
];
```

---

## 4. Report Controller

```typescript
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(
    private export: ExportService,
    private siswaService: SiswaService,
    private sppService: SppService,
  ) {}

  @Get('siswa')
  async exportSiswa(
    @Query('format') format: 'xlsx' | 'pdf' | 'csv' = 'xlsx',
    @Query('kelasId') kelasId?: string,
    @Query('status') status?: string,
    @Res() res: Response,
  ) {
    const data = await this.siswaService.findAll({ kelasId, status, limit: 10000 });
    
    const buffer = await this.export.toExcel(data.data, {
      format,
      title: 'Daftar Siswa',
      filename: `siswa_${Date.now()}`,
      columns: siswaColumns,
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=siswa.xlsx`);
    res.send(buffer);
  }

  @Get('spp')
  async exportSpp(
    @Query('format') format: 'xlsx' | 'pdf' = 'xlsx',
    @Query('bulan') bulan?: number,
    @Query('tahun') tahun?: number,
    @Query('status') status?: string,
    @Res() res: Response,
  ) {
    const data = await this.sppService.findAll({ bulan, tahun, status, limit: 10000 });
    
    const buffer = format === 'pdf'
      ? await this.export.toPdf(data.data, { ...options, format })
      : await this.export.toExcel(data.data, { ...options, format });

    // Set headers and send
  }

  @Get('keuangan')
  async exportKeuangan(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('format') format: 'xlsx' | 'pdf' = 'xlsx',
    @Res() res: Response,
  ) {
    // Generate financial report
  }
}
```

---

## 5. Scheduled Reports

```typescript
// report.task.ts
@Injectable()
export class ReportTask {
  constructor(
    private export: ExportService,
    private notification: NotificationService,
    private sppService: SppService,
  ) {}

  // Daily SPP reminder
  @Cron('0 8 * * *')
  async dailySppReminder() {
    const pendingPayments = await this.sppService.findPending();
    // Send reminders
  }

  // Monthly attendance report
  @Cron('0 0 1 * *')
  async monthlyAbsensiReport() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const data = await this.absensiService.getMonthlyRecap(lastMonth);
    const url = await this.export.exportAndSave(data, {
      format: 'pdf',
      title: `Rekap Absensi ${lastMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`,
      filename: `absensi-${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1}`,
      columns: absensiColumns,
    });

    // Notify super admins
    await this.notification.sendToRole('super_admin', {
      title: 'Laporan Absensi Bulanan',
      message: 'Laporan absensi bulan lalu sudah tersedia',
      data: { downloadUrl: url },
    });
  }
}
```

---

## 6. Import Service

```typescript
@Injectable()
export class ImportService {
  async importSiswa(filePath: string): Promise<ImportResult> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    const results = { total: 0, success: 0, failed: 0, errors: [] };

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header

      try {
        const siswaData = {
          nisn: row.getCell(1).value?.toString(),
          nis: row.getCell(2).value?.toString(),
          name: row.getCell(3).value?.toString(),
          // ... map other columns
        };

        // Validate and insert
        await this.siswaService.create(siswaData);
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({ row: rowNumber, error: error.message });
      }
      results.total++;
    });

    return results;
  }
}
```

---

## Related Documentation

- [File Upload Service](./file-upload.md)
- [Base Service](./base-service.md)
