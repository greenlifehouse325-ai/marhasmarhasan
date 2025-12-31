# SMK Marhas - Frontend Integration: Environment & Config

## 1. Environment Variables

### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000/v1
NEXT_PUBLIC_WS_URL=ws://localhost:4000

# Supabase (for direct realtime & storage access)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Configuration
NEXT_PUBLIC_APP_NAME=SMK Marhas Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_SCHOOL_NAME=SMK Marhas

# Feature Flags
NEXT_PUBLIC_ENABLE_2FA=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.marhas.sch.id/v1
NEXT_PUBLIC_WS_URL=wss://api.marhas.sch.id
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=4000

# Database
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_KEY=eyJhbGci...  # Server-side only!

# JWT
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,https://admin.marhas.sch.id

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@marhas.sch.id
SMTP_PASS=app-password

# Storage
STORAGE_URL=https://xxxxx.supabase.co/storage/v1
```

---

## 2. Environment Configuration

**`src/config/env.ts`**
```typescript
interface AppConfig {
  api: {
    baseUrl: string;
    wsUrl: string;
    timeout: number;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
  app: {
    name: string;
    version: string;
    schoolName: string;
  };
  features: {
    enable2FA: boolean;
    enableNotifications: boolean;
    enableDarkMode: boolean;
  };
}

export const config: AppConfig = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1',
    wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000',
    timeout: 30000,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'SMK Marhas Admin',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    schoolName: process.env.NEXT_PUBLIC_SCHOOL_NAME || 'SMK Marhas',
  },
  features: {
    enable2FA: process.env.NEXT_PUBLIC_ENABLE_2FA === 'true',
    enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
    enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
  },
};

// Validate required env vars
const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set`);
  }
});

export default config;
```

---

## 3. Role Constants

**`src/config/roles.ts`**
```typescript
import { AdminRole } from '@/types/auth';

export interface RoleConfig {
  value: AdminRole;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export const ROLES: Record<AdminRole, RoleConfig> = {
  super_admin: {
    value: 'super_admin',
    label: 'Super Admin',
    description: 'Akses penuh ke semua fitur',
    color: '#8B5CF6',
    icon: 'Shield',
  },
  admin_perpustakaan: {
    value: 'admin_perpustakaan',
    label: 'Admin Perpustakaan',
    description: 'Mengelola perpustakaan, buku, dan peminjaman',
    color: '#F59E0B',
    icon: 'BookOpen',
  },
  admin_keuangan: {
    value: 'admin_keuangan',
    label: 'Admin Keuangan',
    description: 'Mengelola SPP, transaksi, dan laporan keuangan',
    color: '#10B981',
    icon: 'Wallet',
  },
  admin_absensi: {
    value: 'admin_absensi',
    label: 'Admin Absensi',
    description: 'Mengelola absensi dan dispensasi',
    color: '#3B82F6',
    icon: 'ClipboardCheck',
  },
  admin_jadwal: {
    value: 'admin_jadwal',
    label: 'Admin Jadwal',
    description: 'Mengelola jadwal pelajaran dan kalender',
    color: '#EC4899',
    icon: 'Calendar',
  },
  admin_aplikasi: {
    value: 'admin_aplikasi',
    label: 'Admin Aplikasi',
    description: 'Mengelola pengumuman, berita, dan moderasi',
    color: '#6366F1',
    icon: 'Smartphone',
  },
};

export const getRoleConfig = (role: AdminRole): RoleConfig => ROLES[role];

export const getAllRoles = (): RoleConfig[] => Object.values(ROLES);
```

---

## 4. Navigation Config

**`src/config/navigation.ts`**
```typescript
import { AdminRole } from '@/types/auth';

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles: AdminRole[] | 'all';
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
    roles: 'all',
  },
  {
    title: 'Siswa',
    href: '/siswa',
    icon: 'GraduationCap',
    roles: ['super_admin', 'admin_absensi', 'admin_keuangan'],
    children: [
      { title: 'Semua Siswa', href: '/siswa', icon: 'Users', roles: 'all' },
      { title: 'Tambah Siswa', href: '/siswa/create', icon: 'UserPlus', roles: ['super_admin'] },
      { title: 'Import', href: '/siswa/import', icon: 'Upload', roles: ['super_admin'] },
      { title: 'Alumni', href: '/siswa/alumni', icon: 'Archive', roles: 'all' },
    ],
  },
  {
    title: 'Guru',
    href: '/guru',
    icon: 'Users',
    roles: ['super_admin', 'admin_jadwal'],
  },
  {
    title: 'Perpustakaan',
    href: '/perpustakaan',
    icon: 'Library',
    roles: ['super_admin', 'admin_perpustakaan'],
    children: [
      { title: 'Buku', href: '/perpustakaan/buku', icon: 'Book', roles: 'all' },
      { title: 'Peminjaman', href: '/perpustakaan/peminjaman', icon: 'BookCopy', roles: 'all' },
      { title: 'Denda', href: '/perpustakaan/denda', icon: 'Receipt', roles: 'all' },
    ],
  },
  {
    title: 'Keuangan',
    href: '/keuangan',
    icon: 'Wallet',
    roles: ['super_admin', 'admin_keuangan'],
    children: [
      { title: 'SPP', href: '/keuangan/spp', icon: 'CreditCard', roles: 'all' },
      { title: 'Transaksi', href: '/keuangan/transaksi', icon: 'Receipt', roles: 'all' },
      { title: 'Laporan', href: '/keuangan/laporan', icon: 'FileText', roles: 'all' },
    ],
  },
  {
    title: 'Absensi',
    href: '/absensi',
    icon: 'ClipboardCheck',
    roles: ['super_admin', 'admin_absensi'],
  },
  {
    title: 'Jadwal',
    href: '/jadwal',
    icon: 'Calendar',
    roles: ['super_admin', 'admin_jadwal'],
  },
  {
    title: 'Aplikasi',
    href: '/aplikasi',
    icon: 'Smartphone',
    roles: ['super_admin', 'admin_aplikasi'],
    children: [
      { title: 'Pengumuman', href: '/aplikasi/pengumuman', icon: 'Bell', roles: 'all' },
      { title: 'Berita', href: '/aplikasi/berita', icon: 'Newspaper', roles: 'all' },
      { title: 'Prestasi', href: '/aplikasi/prestasi', icon: 'Trophy', roles: 'all' },
    ],
  },
  {
    title: 'Super Admin',
    href: '/super-admin',
    icon: 'Shield',
    roles: ['super_admin'],
    children: [
      { title: 'Admins', href: '/super-admin/admins', icon: 'Users', roles: ['super_admin'] },
      { title: 'Audit Log', href: '/super-admin/audit', icon: 'History', roles: ['super_admin'] },
      { title: 'Settings', href: '/super-admin/settings', icon: 'Settings', roles: ['super_admin'] },
    ],
  },
];

// Filter navigation based on user role
export function getNavigationForRole(role: AdminRole): NavItem[] {
  return navigation.filter(item => {
    if (item.roles === 'all') return true;
    return item.roles.includes(role);
  }).map(item => ({
    ...item,
    children: item.children?.filter(child => {
      if (child.roles === 'all') return true;
      return (child.roles as AdminRole[]).includes(role);
    }),
  }));
}
```

---

## 5. Status Constants

**`src/config/status.ts`**
```typescript
export const STATUS_CONFIG = {
  // Student status
  student: {
    active: { label: 'Aktif', color: 'success' },
    inactive: { label: 'Tidak Aktif', color: 'warning' },
    graduated: { label: 'Lulus', color: 'info' },
    dropped: { label: 'Keluar', color: 'error' },
  },
  
  // SPP status
  spp: {
    pending: { label: 'Belum Bayar', color: 'warning' },
    waiting: { label: 'Menunggu Verifikasi', color: 'info' },
    verified: { label: 'Lunas', color: 'success' },
    rejected: { label: 'Ditolak', color: 'error' },
  },
  
  // Peminjaman status
  lending: {
    active: { label: 'Dipinjam', color: 'primary' },
    overdue: { label: 'Terlambat', color: 'error' },
    returned: { label: 'Dikembalikan', color: 'success' },
    returned_late: { label: 'Terlambat Dikembalikan', color: 'warning' },
    lost: { label: 'Hilang', color: 'error' },
  },
  
  // Absensi status
  attendance: {
    hadir: { label: 'Hadir', color: 'success' },
    alpha: { label: 'Alpha', color: 'error' },
    izin: { label: 'Izin', color: 'info' },
    sakit: { label: 'Sakit', color: 'warning' },
    terlambat: { label: 'Terlambat', color: 'warning' },
  },
};
```

---

## 6. API Endpoints Config

**`src/config/endpoints.ts`**
```typescript
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password',
    setup2FA: '/auth/2fa/setup',
    verify2FA: '/auth/2fa/verify',
  },
  siswa: {
    list: '/siswa',
    detail: (id: string) => `/siswa/${id}`,
    create: '/siswa',
    update: (id: string) => `/siswa/${id}`,
    delete: (id: string) => `/siswa/${id}`,
    import: '/siswa/import',
    export: '/siswa/export',
  },
  // ... other endpoints
};
```

---

## Related Documentation

- [API Client](./api-client.md)
- [Authentication](../03-authentication/jwt-implementation.md)
