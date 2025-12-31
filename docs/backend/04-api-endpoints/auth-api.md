# SMK Marhas - API Endpoints: Authentication

## Base URL
```
https://api.marhas.sch.id/v1
```

---

## 1. Login

### POST /auth/login

Login dengan email dan password.

**Request:**
```json
{
  "email": "admin@marhas.sch.id",
  "password": "SuperAdmin123!"
}
```

**Response (Success - No 2FA):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "550d778a-1234-4ab5-b678-901234567890-...",
    "expiresAt": "2024-01-15T10:00:00Z",
    "user": {
      "id": "550d778a-1234-4ab5-b678-901234567890",
      "email": "admin@marhas.sch.id",
      "name": "Super Admin",
      "role": "super_admin",
      "avatar": "/avatars/admin.jpg"
    }
  }
}
```

**Response (Requires 2FA):**
```json
{
  "success": true,
  "data": {
    "requires2FA": true,
    "tempToken": "eyJhbGciOiJIUzI1NiIs...",
    "email": "admin@marhas.sch.id"
  }
}
```

**Response (Requires Device Approval):**
```json
{
  "success": true,
  "data": {
    "requiresDeviceApproval": true,
    "deviceId": "device-uuid",
    "email": "admin@marhas.sch.id"
  }
}
```

**Errors:**
| Code | Status | Message |
|------|--------|---------|
| INVALID_CREDENTIALS | 401 | Email atau password salah |
| ACCOUNT_LOCKED | 423 | Akun terkunci. Coba lagi dalam 30 menit |
| ACCOUNT_BANNED | 403 | Akun diblokir |
| ACCOUNT_INACTIVE | 403 | Akun tidak aktif |

---

## 2. Verify 2FA

### POST /auth/2fa/verify

Verifikasi OTP setelah login.

**Request:**
```json
{
  "tempToken": "eyJhbGciOiJIUzI1NiIs...",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "...",
    "user": { ... }
  }
}
```

---

## 3. Logout

### POST /auth/logout

Logout dan invalidasi session.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

## 4. Refresh Token

### POST /auth/refresh

Refresh access token.

**Request:**
```json
{
  "refreshToken": "550d778a-1234-4ab5-b678-901234567890-..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "new-refresh-token...",
    "expiresAt": "2024-01-15T11:00:00Z"
  }
}
```

---

## 5. Forgot Password

### POST /auth/forgot-password

Request password reset link.

**Request:**
```json
{
  "email": "admin@marhas.sch.id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Jika email terdaftar, link reset telah dikirim"
}
```

> Note: Response sama meskipun email tidak ditemukan (security).

---

## 6. Reset Password

### POST /auth/reset-password

Reset password dengan token.

**Request:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password berhasil direset"
}
```

---

## 7. Change Password

### POST /auth/change-password

Ganti password (authenticated).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

---

## 8. Get Current User

### GET /auth/me

Get profil user yang login.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550d778a-1234-4ab5-b678-901234567890",
    "email": "admin@marhas.sch.id",
    "name": "Super Admin",
    "role": "super_admin",
    "avatar": "/avatars/admin.jpg",
    "phone": "081234567890",
    "permissions": [
      { "resource": "admin", "actions": ["create", "read", "update", "delete"] },
      { "resource": "siswa", "actions": ["create", "read", "update", "delete"] }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-15T08:00:00Z"
  }
}
```

---

## 9. 2FA Setup

### POST /auth/2fa/setup

Generate QR code untuk setup 2FA.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qrCodeUrl": "data:image/png;base64,...",
    "manualEntryKey": "JBSWY3DPEHPK3PXP"
  }
}
```

### POST /auth/2fa/verify-setup

Verify dan aktifkan 2FA.

**Request:**
```json
{
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "backupCodes": [
      "AXYR-7K3M",
      "BN3P-QZ9W",
      "CK8L-HV2X",
      "..."
    ]
  }
}
```

### POST /auth/2fa/disable

Nonaktifkan 2FA.

**Request:**
```json
{
  "password": "YourPassword123!"
}
```

---

## 10. Sessions

### GET /auth/sessions

Get semua active sessions.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "session-uuid",
      "device": {
        "name": "Chrome on Windows",
        "browser": "Chrome 120.0",
        "os": "Windows 11",
        "location": "Bandung, ID"
      },
      "ipAddress": "192.168.1.100",
      "createdAt": "2024-01-15T08:00:00Z",
      "lastActivityAt": "2024-01-15T09:30:00Z",
      "isCurrentSession": true
    }
  ]
}
```

### DELETE /auth/sessions/:id

Revoke specific session.

### POST /auth/sessions/revoke-others

Revoke all sessions except current.

### POST /auth/sessions/revoke-all

Revoke all sessions (logout everywhere).

---

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email atau password salah",
    "details": []
  },
  "timestamp": "2024-01-15T09:00:00Z"
}
```

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| POST /auth/login | 5/minute |
| POST /auth/forgot-password | 3/5 minutes |
| POST /auth/2fa/verify | 5/minute |
| Others | 100/minute |
