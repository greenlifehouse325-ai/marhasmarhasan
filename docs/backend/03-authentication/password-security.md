# SMK Marhas - Password Security

## 1. Password Policy

Kebijakan password untuk keamanan sistem:

| Requirement | Value |
|-------------|-------|
| Minimum length | 8 characters |
| Require uppercase | Yes |
| Require lowercase | Yes |
| Require number | Yes |
| Require symbol | Yes |
| Max age | 90 days |
| History | Last 5 passwords |
| Lock after failed | 5 attempts |
| Lock duration | 30 minutes |

---

## 2. Password Validation

### 2.1 Validation Interface

Dari frontend `types/auth.ts`:

```typescript
export interface PasswordValidation {
  isValid: boolean;
  minLength: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  strength: 'weak' | 'medium' | 'strong' | 'very_strong';
}
```

### 2.2 Backend Validation

**`src/common/utils/password.util.ts`**
```typescript
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: PasswordStrength;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very_strong';

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];
  let score = 0;

  // Check minimum length
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  } else {
    score += 1;
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf kapital');
  } else {
    score += 1;
  }

  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  } else {
    score += 1;
  }

  // Check for number
  if (!/\d/.test(password)) {
    errors.push('Password harus mengandung angka');
  } else {
    score += 1;
  }

  // Check for symbol
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password harus mengandung simbol (!@#$%^&*)');
  } else {
    score += 1;
  }

  // Bonus for length
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Calculate strength
  let strength: PasswordStrength;
  if (score <= 2) strength = 'weak';
  else if (score <= 4) strength = 'medium';
  else if (score <= 5) strength = 'strong';
  else strength = 'very_strong';

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

// Check common/weak passwords
const COMMON_PASSWORDS = [
  'password', '123456', 'qwerty', 'admin', 'letmein',
  'welcome', 'monkey', 'dragon', 'master', 'password1',
];

export function isCommonPassword(password: string): boolean {
  return COMMON_PASSWORDS.includes(password.toLowerCase());
}
```

---

## 3. Password Hashing

### 3.1 Using bcrypt

**`src/common/utils/hash.util.ts`**
```typescript
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
```

### 3.2 Hash Example
```
Plain: SuperAdmin123!
Hash:  $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtE.cQqvbTwYVyEyJzVjU6yGQLu6
```

---

## 4. Password Service

**`src/modules/auth/password.service.ts`**
```typescript
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { hashPassword, comparePassword, validatePassword, isCommonPassword } from '../../common/utils';

@Injectable()
export class PasswordService {
  constructor(private supabase: SupabaseService) {}

  /**
   * Change password for authenticated user
   */
  async changePassword(
    adminId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    // Get current password hash
    const { data: admin } = await this.supabase.client
      .from('admins')
      .select('password, password_history')
      .eq('id', adminId)
      .single();

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    // Verify current password
    const isCurrentValid = await comparePassword(currentPassword, admin.password);
    if (!isCurrentValid) {
      throw new UnauthorizedException('Password saat ini salah');
    }

    // Validate new password
    await this.validateNewPassword(newPassword, admin.password_history || []);

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password history (keep last 5)
    const history = [admin.password, ...(admin.password_history || [])].slice(0, 5);

    // Update password
    await this.supabase.client
      .from('admins')
      .update({
        password: hashedPassword,
        password_history: history,
        password_changed_at: new Date().toISOString(),
      })
      .eq('id', adminId);
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Verify token
    const { data: resetRequest } = await this.supabase.client
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .eq('is_used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (!resetRequest) {
      throw new BadRequestException('Token reset tidak valid atau sudah kadaluarsa');
    }

    // Validate new password
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    // Hash and update
    const hashedPassword = await hashPassword(newPassword);

    await this.supabase.client
      .from('admins')
      .update({
        password: hashedPassword,
        password_changed_at: new Date().toISOString(),
      })
      .eq('id', resetRequest.admin_id);

    // Mark token as used
    await this.supabase.client
      .from('password_resets')
      .update({ is_used: true })
      .eq('id', resetRequest.id);
  }

  /**
   * Validate new password against policy
   */
  private async validateNewPassword(password: string, history: string[]): Promise<void> {
    // Check password policy
    const validation = validatePassword(password);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    // Check common passwords
    if (isCommonPassword(password)) {
      throw new BadRequestException('Password terlalu umum, gunakan password yang lebih unik');
    }

    // Check password history
    for (const oldHash of history) {
      const isSame = await comparePassword(password, oldHash);
      if (isSame) {
        throw new BadRequestException('Password tidak boleh sama dengan 5 password terakhir');
      }
    }
  }

  /**
   * Check if password needs to be changed (expired)
   */
  async isPasswordExpired(adminId: string): Promise<boolean> {
    const { data } = await this.supabase.client
      .from('admins')
      .select('password_changed_at')
      .eq('id', adminId)
      .single();

    if (!data?.password_changed_at) return false;

    const changedAt = new Date(data.password_changed_at);
    const maxAge = 90 * 24 * 60 * 60 * 1000; // 90 days
    
    return Date.now() - changedAt.getTime() > maxAge;
  }

  /**
   * Generate random password
   */
  generateRandomPassword(length = 16): string {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const all = lower + upper + numbers + symbols;

    let password = '';
    
    // Ensure at least one of each
    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest
    for (let i = password.length; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    // Shuffle
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}
```

---

## 5. Forgot Password Flow

### 5.1 Schema
```sql
CREATE TABLE password_resets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_password_resets_token ON password_resets(token);
```

### 5.2 Controller
```typescript
@Controller('auth')
export class AuthController {
  @Post('forgot-password')
  @Public()
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 per 5 minutes
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.requestPasswordReset(dto.email);
    return { 
      success: true, 
      message: 'Jika email terdaftar, link reset telah dikirim' 
    };
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.passwordService.resetPassword(dto.token, dto.newPassword);
    return { 
      success: true, 
      message: 'Password berhasil direset' 
    };
  }
}
```

### 5.3 Request Reset
```typescript
async requestPasswordReset(email: string): Promise<void> {
  // Find admin
  const { data: admin } = await this.supabase.client
    .from('admins')
    .select('id, email, name')
    .eq('email', email)
    .single();

  // Don't reveal if email exists
  if (!admin) return;

  // Generate token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Store reset request
  await this.supabase.client.from('password_resets').insert({
    admin_id: admin.id,
    email: admin.email,
    token,
    expires_at: expiresAt.toISOString(),
  });

  // Send email
  await this.emailService.sendPasswordReset(admin.email, admin.name, token);
}
```

---

## 6. Account Lockout

### 6.1 Failed Login Tracking
```sql
CREATE TABLE login_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    device_fingerprint TEXT,
    success BOOLEAN NOT NULL,
    failure_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_login_attempts_email ON login_attempts(email);
CREATE INDEX idx_login_attempts_created ON login_attempts(created_at DESC);
```

### 6.2 Lockout Service
```typescript
@Injectable()
export class LockoutService {
  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

  async recordAttempt(email: string, success: boolean, reason?: string): Promise<void> {
    await this.supabase.client.from('login_attempts').insert({
      email,
      success,
      failure_reason: reason,
    });
  }

  async isLocked(email: string): Promise<{ locked: boolean; until?: Date }> {
    const since = new Date(Date.now() - this.LOCKOUT_DURATION);

    const { count } = await this.supabase.client
      .from('login_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .eq('success', false)
      .gte('created_at', since.toISOString());

    if (count >= this.MAX_ATTEMPTS) {
      // Get last attempt time
      const { data } = await this.supabase.client
        .from('login_attempts')
        .select('created_at')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const lockedUntil = new Date(
        new Date(data.created_at).getTime() + this.LOCKOUT_DURATION
      );

      return { locked: true, until: lockedUntil };
    }

    return { locked: false };
  }

  async clearAttempts(email: string): Promise<void> {
    // Clear on successful login
    await this.supabase.client
      .from('login_attempts')
      .delete()
      .eq('email', email);
  }
}
```

---

## 7. Password DTO Validation

**`src/modules/auth/dto/change-password.dto.ts`**
```typescript
import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  @Matches(/[A-Z]/, { message: 'Password harus mengandung huruf kapital' })
  @Matches(/[a-z]/, { message: 'Password harus mengandung huruf kecil' })
  @Matches(/\d/, { message: 'Password harus mengandung angka' })
  @Matches(/[!@#$%^&*]/, { message: 'Password harus mengandung simbol' })
  newPassword: string;

  @IsString()
  confirmPassword: string;
}
```

---

## 8. Security Recommendations

1. **Use bcrypt with high rounds** (12+)
2. **Never store plain passwords**
3. **Implement account lockout**
4. **Enforce password policy**
5. **Check password history**
6. **Rate limit password endpoints**
7. **Use secure token generation**
8. **Set token expiry (1 hour)**

---

## Related Documentation

- [JWT Implementation](./jwt-implementation.md)
- [Session Management](./session-management.md)
- [2FA Implementation](./2fa-implementation.md)
