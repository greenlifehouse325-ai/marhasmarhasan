# SMK Marhas - File Upload Service

## 1. Overview

File upload menggunakan **Supabase Storage** dengan bucket terpisah untuk berbagai jenis file.

---

## 2. Storage Buckets

| Bucket | Public | Max Size | Types | Purpose |
|--------|:------:|:--------:|-------|---------|
| `avatars` | ❌ | 5MB | jpg, png, webp | Admin & user avatars |
| `photos-siswa` | ❌ | 5MB | jpg, png | Student photos |
| `photos-guru` | ❌ | 5MB | jpg, png | Teacher photos |
| `book-covers` | ✅ | 2MB | jpg, png, webp | Book cover images |
| `documents` | ❌ | 10MB | pdf, doc, docx | Official documents |
| `attachments` | ❌ | 10MB | * | General attachments |
| `imports` | ❌ | 50MB | xlsx, csv | Import files |
| `exports` | ❌ | 100MB | xlsx, pdf | Export files |

---

## 3. Upload Service

**`src/modules/upload/upload.service.ts`**
```typescript
import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export interface UploadOptions {
  bucket: string;
  folder?: string;
  fileName?: string;
  maxSize?: number;      // in bytes
  allowedTypes?: string[]; // MIME types
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

@Injectable()
export class UploadService {
  private readonly DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
  
  private readonly BUCKET_CONFIG: Record<string, {
    maxSize: number;
    allowedTypes: string[];
    isPublic: boolean;
  }> = {
    avatars: {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      isPublic: false,
    },
    'photos-siswa': {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/png'],
      isPublic: false,
    },
    'photos-guru': {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/png'],
      isPublic: false,
    },
    'book-covers': {
      maxSize: 2 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      isPublic: true,
    },
    documents: {
      maxSize: 10 * 1024 * 1024,
      allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      isPublic: false,
    },
    attachments: {
      maxSize: 10 * 1024 * 1024,
      allowedTypes: ['*'],
      isPublic: false,
    },
    imports: {
      maxSize: 50 * 1024 * 1024,
      allowedTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
      isPublic: false,
    },
  };

  constructor(private supabase: SupabaseService) {}

  /**
   * Upload a file to storage
   */
  async upload(
    file: Express.Multer.File,
    options: UploadOptions
  ): Promise<UploadResult> {
    const config = this.BUCKET_CONFIG[options.bucket];
    if (!config) {
      throw new BadRequestException(`Invalid bucket: ${options.bucket}`);
    }

    // Validate file size
    const maxSize = options.maxSize || config.maxSize;
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File terlalu besar. Maksimal ${this.formatBytes(maxSize)}`
      );
    }

    // Validate file type
    const allowedTypes = options.allowedTypes || config.allowedTypes;
    if (allowedTypes[0] !== '*' && !allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipe file tidak diizinkan. Diizinkan: ${allowedTypes.join(', ')}`
      );
    }

    // Generate unique filename
    const ext = path.extname(file.originalname);
    const fileName = options.fileName || `${uuidv4()}${ext}`;
    const filePath = options.folder 
      ? `${options.folder}/${fileName}`
      : fileName;

    // Upload to Supabase Storage
    const { data, error } = await this.supabase.client.storage
      .from(options.bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException(`Upload gagal: ${error.message}`);
    }

    // Get URL
    let url: string;
    if (config.isPublic) {
      const { data: urlData } = this.supabase.client.storage
        .from(options.bucket)
        .getPublicUrl(filePath);
      url = urlData.publicUrl;
    } else {
      const { data: signedData } = await this.supabase.client.storage
        .from(options.bucket)
        .createSignedUrl(filePath, 3600 * 24 * 7); // 7 days
      url = signedData?.signedUrl || '';
    }

    return {
      url,
      path: data.path,
      size: file.size,
      type: file.mimetype,
    };
  }

  /**
   * Upload multiple files
   */
  async uploadMultiple(
    files: Express.Multer.File[],
    options: UploadOptions
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];
    for (const file of files) {
      const result = await this.upload(file, options);
      results.push(result);
    }
    return results;
  }

  /**
   * Delete a file
   */
  async delete(bucket: string, path: string): Promise<void> {
    const { error } = await this.supabase.client.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new BadRequestException(`Delete gagal: ${error.message}`);
    }
  }

  /**
   * Delete multiple files
   */
  async deleteMultiple(bucket: string, paths: string[]): Promise<void> {
    const { error } = await this.supabase.client.storage
      .from(bucket)
      .remove(paths);

    if (error) {
      throw new BadRequestException(`Delete gagal: ${error.message}`);
    }
  }

  /**
   * Get signed URL for private file
   */
  async getSignedUrl(bucket: string, path: string, expiresIn = 3600): Promise<string> {
    const { data, error } = await this.supabase.client.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw new BadRequestException(`Failed to get URL: ${error.message}`);
    }

    return data.signedUrl;
  }

  /**
   * Move/rename file
   */
  async move(bucket: string, fromPath: string, toPath: string): Promise<void> {
    const { error } = await this.supabase.client.storage
      .from(bucket)
      .move(fromPath, toPath);

    if (error) {
      throw new BadRequestException(`Move gagal: ${error.message}`);
    }
  }

  /**
   * List files in folder
   */
  async listFiles(bucket: string, folder?: string) {
    const { data, error } = await this.supabase.client.storage
      .from(bucket)
      .list(folder);

    if (error) {
      throw new BadRequestException(`List gagal: ${error.message}`);
    }

    return data;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
```

---

## 4. Upload Controller

**`src/modules/upload/upload.controller.ts`**
```typescript
import { 
  Controller, 
  Post, 
  Delete,
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  UploadedFiles,
  Body,
  Param,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('bucket') bucket: string,
    @Body('folder') folder?: string,
  ) {
    const result = await this.uploadService.upload(file, { bucket, folder });
    return { success: true, data: result };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('bucket') bucket: string,
    @Body('folder') folder?: string,
  ) {
    const results = await this.uploadService.uploadMultiple(files, { bucket, folder });
    return { success: true, data: results };
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    const result = await this.uploadService.upload(file, {
      bucket: 'avatars',
      folder: userId,
      fileName: 'avatar.jpg',
    });
    return { success: true, data: result };
  }

  @Delete(':bucket/*')
  async deleteFile(
    @Param('bucket') bucket: string,
    @Param('*') path: string,
  ) {
    await this.uploadService.delete(bucket, path);
    return { success: true, message: 'File deleted' };
  }
}
```

---

## 5. Image Processing

**`src/modules/upload/image.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  /**
   * Resize image
   */
  async resize(buffer: Buffer, width: number, height?: number): Promise<Buffer> {
    return sharp(buffer)
      .resize(width, height, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();
  }

  /**
   * Create thumbnail
   */
  async thumbnail(buffer: Buffer, size = 150): Promise<Buffer> {
    return sharp(buffer)
      .resize(size, size, { fit: 'cover' })
      .jpeg({ quality: 70 })
      .toBuffer();
  }

  /**
   * Compress image
   */
  async compress(buffer: Buffer, quality = 80): Promise<Buffer> {
    return sharp(buffer)
      .jpeg({ quality })
      .toBuffer();
  }

  /**
   * Convert to WebP
   */
  async toWebP(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();
  }
}
```

---

## 6. Usage Examples

### Upload Avatar
```typescript
// From controller
const avatar = await this.uploadService.upload(file, {
  bucket: 'avatars',
  folder: user.id,
  fileName: 'avatar.jpg',
});

// Update user record
await this.supabase.client
  .from('admins')
  .update({ avatar: avatar.path })
  .eq('id', user.id);
```

### Upload Book Cover
```typescript
const cover = await this.uploadService.upload(file, {
  bucket: 'book-covers',
  folder: 'covers',
});

// cover.url is public URL
```

### Upload Import File
```typescript
const importFile = await this.uploadService.upload(file, {
  bucket: 'imports',
  folder: `siswa/${new Date().toISOString().split('T')[0]}`,
});

// Process the file
await this.importService.processSiswaImport(importFile.path);
```

---

## 7. Storage Policies

```sql
-- Allow authenticated uploads to avatars
CREATE POLICY "upload_avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read for book covers
CREATE POLICY "public_book_covers" ON storage.objects
FOR SELECT USING (
  bucket_id = 'book-covers'
);

-- Admins can manage all files in their buckets
CREATE POLICY "admin_manage_photos" ON storage.objects
FOR ALL USING (
  bucket_id IN ('photos-siswa', 'photos-guru') AND
  EXISTS (SELECT 1 FROM admins WHERE id = auth.uid())
);
```

---

## 8. Frontend Upload

```typescript
// Using FormData
const formData = new FormData();
formData.append('file', selectedFile);
formData.append('bucket', 'avatars');
formData.append('folder', userId);

const response = await api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

// Get the URL
const imageUrl = response.data.data.url;
```

---

## Related Documentation

- [Supabase Setup](../02-database/supabase-setup.md)
- [Frontend Integration](../06-integration/file-upload.md)
