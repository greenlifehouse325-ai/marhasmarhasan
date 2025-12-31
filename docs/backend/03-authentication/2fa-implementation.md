# SMK Marhas - 2FA Implementation

## 1. 2FA Overview

Two-Factor Authentication menambahkan lapisan keamanan dengan memerlukan:
1. Something you know (password)
2. Something you have (OTP dari authenticator app)

```
┌─────────────────────────────────────────────────────────────────┐
│                        2FA FLOW                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User enables 2FA                                            │
│     └──> Generate secret ──> Show QR code ──> Verify setup      │
│                                                                 │
│  2. Login with 2FA enabled                                      │
│     └──> Email/Password ──> Require OTP ──> Verify OTP ──> OK   │
│                                                                 │
│  3. Recovery (if lost device)                                   │
│     └──> Use backup code ──> Verify ──> Login + Mark used       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Database Schema

```sql
-- Add 2FA columns to admins
ALTER TABLE admins ADD COLUMN two_factor_enabled BOOLEAN DEFAULT false;
ALTER TABLE admins ADD COLUMN two_factor_secret TEXT;
ALTER TABLE admins ADD COLUMN two_factor_verified_at TIMESTAMP;

-- Backup codes table
CREATE TABLE backup_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    is_used BOOLEAN DEFAULT false,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_backup_codes_admin ON backup_codes(admin_id);
```

---

## 3. Install Dependencies

```bash
npm install otplib speakeasy qrcode
npm install -D @types/qrcode
```

---

## 4. 2FA Service

**`src/modules/auth/two-factor.service.ts`**
```typescript
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';
import { SupabaseService } from '../../database/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TwoFactorService {
  private readonly APP_NAME = 'SMK Marhas Admin';
  private readonly BACKUP_CODE_COUNT = 10;

  constructor(private supabase: SupabaseService) {}

  /**
   * Generate 2FA secret and QR code
   */
  async generateSecret(adminId: string, email: string): Promise<{
    secret: string;
    qrCodeUrl: string;
    manualEntryKey: string;
  }> {
    // Generate secret
    const secret = authenticator.generateSecret();

    // Generate OTP Auth URL
    const otpAuthUrl = authenticator.keyuri(email, this.APP_NAME, secret);

    // Generate QR code as data URL
    const qrCodeUrl = await QRCode.toDataURL(otpAuthUrl);

    // Temporarily store secret (not enabled yet)
    await this.supabase.client
      .from('admins')
      .update({ two_factor_secret: secret })
      .eq('id', adminId);

    return {
      secret,
      qrCodeUrl,
      manualEntryKey: secret, // For manual entry in app
    };
  }

  /**
   * Verify and enable 2FA
   */
  async verifyAndEnable(adminId: string, otp: string): Promise<{
    success: boolean;
    backupCodes: string[];
  }> {
    // Get secret
    const { data: admin } = await this.supabase.client
      .from('admins')
      .select('two_factor_secret')
      .eq('id', adminId)
      .single();

    if (!admin?.two_factor_secret) {
      throw new BadRequestException('2FA belum di-setup');
    }

    // Verify OTP
    const isValid = authenticator.verify({
      token: otp,
      secret: admin.two_factor_secret,
    });

    if (!isValid) {
      throw new BadRequestException('Kode OTP tidak valid');
    }

    // Generate backup codes
    const backupCodes = this.generateBackupCodes();

    // Store backup codes (hashed)
    for (const code of backupCodes) {
      await this.supabase.client.from('backup_codes').insert({
        admin_id: adminId,
        code, // In production, hash this
        is_used: false,
      });
    }

    // Enable 2FA
    await this.supabase.client
      .from('admins')
      .update({
        two_factor_enabled: true,
        two_factor_verified_at: new Date().toISOString(),
      })
      .eq('id', adminId);

    return {
      success: true,
      backupCodes,
    };
  }

  /**
   * Verify OTP during login
   */
  async verifyOTP(adminId: string, otp: string): Promise<boolean> {
    const { data: admin } = await this.supabase.client
      .from('admins')
      .select('two_factor_secret, two_factor_enabled')
      .eq('id', adminId)
      .single();

    if (!admin?.two_factor_enabled || !admin.two_factor_secret) {
      throw new BadRequestException('2FA tidak aktif');
    }

    const isValid = authenticator.verify({
      token: otp,
      secret: admin.two_factor_secret,
    });

    return isValid;
  }

  /**
   * Verify backup code
   */
  async verifyBackupCode(adminId: string, code: string): Promise<boolean> {
    const { data: backupCode } = await this.supabase.client
      .from('backup_codes')
      .select('*')
      .eq('admin_id', adminId)
      .eq('code', code.toUpperCase())
      .eq('is_used', false)
      .single();

    if (!backupCode) {
      return false;
    }

    // Mark as used
    await this.supabase.client
      .from('backup_codes')
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq('id', backupCode.id);

    return true;
  }

  /**
   * Disable 2FA
   */
  async disable(adminId: string, password: string): Promise<void> {
    // Verify password first
    const { data: admin } = await this.supabase.client
      .from('admins')
      .select('password')
      .eq('id', adminId)
      .single();

    const isValid = await comparePassword(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedException('Password salah');
    }

    // Disable 2FA
    await this.supabase.client
      .from('admins')
      .update({
        two_factor_enabled: false,
        two_factor_secret: null,
        two_factor_verified_at: null,
      })
      .eq('id', adminId);

    // Delete backup codes
    await this.supabase.client
      .from('backup_codes')
      .delete()
      .eq('admin_id', adminId);
  }

  /**
   * Regenerate backup codes
   */
  async regenerateBackupCodes(adminId: string): Promise<string[]> {
    // Delete old codes
    await this.supabase.client
      .from('backup_codes')
      .delete()
      .eq('admin_id', adminId);

    // Generate new codes
    const backupCodes = this.generateBackupCodes();

    for (const code of backupCodes) {
      await this.supabase.client.from('backup_codes').insert({
        admin_id: adminId,
        code,
        is_used: false,
      });
    }

    return backupCodes;
  }

  /**
   * Get remaining backup codes count
   */
  async getRemainingBackupCodes(adminId: string): Promise<number> {
    const { count } = await this.supabase.client
      .from('backup_codes')
      .select('*', { count: 'exact', head: true })
      .eq('admin_id', adminId)
      .eq('is_used', false);

    return count || 0;
  }

  /**
   * Check if 2FA is enabled
   */
  async is2FAEnabled(adminId: string): Promise<boolean> {
    const { data } = await this.supabase.client
      .from('admins')
      .select('two_factor_enabled')
      .eq('id', adminId)
      .single();

    return data?.two_factor_enabled ?? false;
  }

  /**
   * Generate random backup codes
   */
  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < this.BACKUP_CODE_COUNT; i++) {
      // Format: XXXX-XXXX (8 characters)
      const code = `${this.randomChars(4)}-${this.randomChars(4)}`;
      codes.push(code);
    }
    return codes;
  }

  private randomChars(length: number): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
}
```

---

## 5. 2FA Controller

**`src/modules/auth/two-factor.controller.ts`**
```typescript
import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth/2fa')
@UseGuards(JwtAuthGuard)
export class TwoFactorController {
  constructor(private twoFactorService: TwoFactorService) {}

  @Post('setup')
  @HttpCode(HttpStatus.OK)
  async setup(@CurrentUser() user: any) {
    return this.twoFactorService.generateSecret(user.id, user.email);
  }

  @Post('verify-setup')
  @HttpCode(HttpStatus.OK)
  async verifySetup(
    @CurrentUser() user: any,
    @Body() dto: VerifyOtpDto
  ) {
    return this.twoFactorService.verifyAndEnable(user.id, dto.otp);
  }

  @Post('disable')
  @HttpCode(HttpStatus.OK)
  async disable(
    @CurrentUser() user: any,
    @Body() dto: DisableTwoFactorDto
  ) {
    await this.twoFactorService.disable(user.id, dto.password);
    return { success: true, message: '2FA berhasil dinonaktifkan' };
  }

  @Post('regenerate-backup')
  @HttpCode(HttpStatus.OK)
  async regenerateBackup(@CurrentUser() user: any) {
    const codes = await this.twoFactorService.regenerateBackupCodes(user.id);
    return { backupCodes: codes };
  }

  @Get('status')
  async getStatus(@CurrentUser() user: any) {
    const enabled = await this.twoFactorService.is2FAEnabled(user.id);
    const remainingCodes = enabled 
      ? await this.twoFactorService.getRemainingBackupCodes(user.id)
      : 0;

    return {
      enabled,
      remainingBackupCodes: remainingCodes,
    };
  }
}
```

---

## 6. Login Flow with 2FA

**Modified `auth.service.ts`:**
```typescript
async login(dto: LoginDto, deviceInfo: DeviceInfo) {
  // ... validate credentials ...

  // Check if 2FA is enabled
  if (admin.two_factor_enabled) {
    // Generate temporary token for 2FA verification
    const tempToken = this.jwt.sign(
      { sub: admin.id, purpose: '2fa_pending' },
      { expiresIn: '5m' }
    );

    return {
      requires2FA: true,
      tempToken,
      email: admin.email,
    };
  }

  // Generate full tokens if no 2FA
  return this.generateTokens(admin, deviceInfo);
}

async verify2FA(tempToken: string, otp: string, deviceInfo: DeviceInfo) {
  // Verify temp token
  const payload = this.jwt.verify(tempToken);
  if (payload.purpose !== '2fa_pending') {
    throw new UnauthorizedException('Invalid token');
  }

  // Verify OTP or backup code
  const isOtpValid = await this.twoFactorService.verifyOTP(payload.sub, otp);
  const isBackupValid = !isOtpValid 
    ? await this.twoFactorService.verifyBackupCode(payload.sub, otp)
    : false;

  if (!isOtpValid && !isBackupValid) {
    throw new UnauthorizedException('Kode verifikasi tidak valid');
  }

  // Get admin and generate full tokens
  const { data: admin } = await this.supabase.client
    .from('admins')
    .select('*')
    .eq('id', payload.sub)
    .single();

  return this.generateTokens(admin, deviceInfo);
}
```

---

## 7. Frontend Integration

### Setup 2FA
```typescript
// 1. Request QR code
const { data } = await api.post('/auth/2fa/setup');
// data: { secret, qrCodeUrl, manualEntryKey }

// 2. Show QR code for scanning
<img src={data.qrCodeUrl} alt="2FA QR Code" />

// 3. Verify with OTP from app
const { backupCodes } = await api.post('/auth/2fa/verify-setup', { otp: '123456' });

// 4. Save backup codes somewhere safe!
```

### Login with 2FA
```typescript
// 1. Normal login
const loginResult = await api.post('/auth/login', { email, password });

if (loginResult.requires2FA) {
  // 2. Show OTP input
  const otp = await promptForOTP();

  // 3. Verify 2FA
  const tokens = await api.post('/auth/2fa/verify', {
    tempToken: loginResult.tempToken,
    otp,
  });
}
```

---

## 8. Security Considerations

1. **Secure QR code display** - Show only once during setup
2. **Encrypted secret storage** - Consider encrypting in DB
3. **Backup code security** - Hash codes, one-time use
4. **Rate limit OTP attempts** - Prevent brute force
5. **Temporary token expiry** - 5 minutes max
6. **Recovery flow** - Require identity verification

---

## 9. OTP Validation Window

```typescript
// Configure OTP validation window
import { authenticator } from 'otplib';

// Allow 1 step before/after (30 seconds each)
authenticator.options = { window: 1 };
```

---

## Related Documentation

- [JWT Implementation](./jwt-implementation.md)
- [Password Security](./password-security.md)
- [Session Management](./session-management.md)
