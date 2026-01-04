/**
 * Module Utils
 * SMK Marhas Admin Dashboard
 * 
 * Utility untuk deteksi modul, konfigurasi, dan navigasi
 * Digunakan untuk unified role-based architecture
 */

import type { AdminRole } from '@/types/auth';
import {
    BookOpen,
    Wallet,
    ClipboardCheck,
    Calendar,
    Smartphone,
    Shield,
    LucideIcon
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

export type ModuleType =
    | 'super-admin'
    | 'perpustakaan'
    | 'keuangan'
    | 'absensi'
    | 'jadwal'
    | 'aplikasi'
    | 'shared'; // untuk routes seperti /siswa, /guru, dll

export interface ModuleConfig {
    id: ModuleType;
    name: string;
    nameFull: string;
    description: string;
    basePath: string;
    color: string;
    bgColor: string;
    icon: LucideIcon;
    linkedRole: AdminRole;
}

export interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string | number;
}

// ============================================
// MODULE CONFIGURATIONS
// ============================================

export const MODULE_CONFIGS: Record<ModuleType, ModuleConfig> = {
    'super-admin': {
        id: 'super-admin',
        name: 'Super Admin',
        nameFull: 'Panel Super Admin',
        description: 'Kontrol penuh sistem dan manajemen admin',
        basePath: '/super-admin',
        color: '#7C3AED',
        bgColor: '#F3E8FF',
        icon: Shield,
        linkedRole: 'super_admin',
    },
    'perpustakaan': {
        id: 'perpustakaan',
        name: 'Perpustakaan',
        nameFull: 'Modul Perpustakaan',
        description: 'Kelola buku, peminjaman, dan denda',
        basePath: '/perpustakaan',
        color: '#10B981',
        bgColor: '#D1FAE5',
        icon: BookOpen,
        linkedRole: 'admin_perpustakaan',
    },
    'keuangan': {
        id: 'keuangan',
        name: 'Keuangan',
        nameFull: 'Modul Keuangan',
        description: 'Pembayaran SPP, transaksi, dan laporan',
        basePath: '/keuangan',
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        icon: Wallet,
        linkedRole: 'admin_keuangan',
    },
    'absensi': {
        id: 'absensi',
        name: 'Absensi',
        nameFull: 'Modul Absensi',
        description: 'Kelola kehadiran siswa dan guru',
        basePath: '/absensi',
        color: '#3B82F6',
        bgColor: '#DBEAFE',
        icon: ClipboardCheck,
        linkedRole: 'admin_absensi',
    },
    'jadwal': {
        id: 'jadwal',
        name: 'Jadwal',
        nameFull: 'Modul Jadwal',
        description: 'Manajemen jadwal pelajaran dan guru',
        basePath: '/jadwal',
        color: '#EC4899',
        bgColor: '#FCE7F3',
        icon: Calendar,
        linkedRole: 'admin_jadwal',
    },
    'aplikasi': {
        id: 'aplikasi',
        name: 'Aplikasi',
        nameFull: 'Modul Aplikasi',
        description: 'Konten, berita, dan pengumuman',
        basePath: '/aplikasi',
        color: '#6366F1',
        bgColor: '#E0E7FF',
        icon: Smartphone,
        linkedRole: 'admin_aplikasi',
    },
    'shared': {
        id: 'shared',
        name: 'Data',
        nameFull: 'Data Bersama',
        description: 'Data yang diakses banyak modul',
        basePath: '/',
        color: '#64748B',
        bgColor: '#F1F5F9',
        icon: Shield,
        linkedRole: 'super_admin',
    },
};

// ============================================
// MODULE DETECTION
// ============================================

/**
 * Detect module dari pathname
 */
export function getModuleFromPath(pathname: string): ModuleType {
    if (pathname.startsWith('/super-admin')) return 'super-admin';
    if (pathname.startsWith('/perpustakaan')) return 'perpustakaan';
    if (pathname.startsWith('/keuangan')) return 'keuangan';
    if (pathname.startsWith('/absensi')) return 'absensi';
    if (pathname.startsWith('/jadwal')) return 'jadwal';
    if (pathname.startsWith('/aplikasi')) return 'aplikasi';

    // Shared routes
    return 'shared';
}

/**
 * Get module configuration
 */
export function getModuleConfig(module: ModuleType): ModuleConfig {
    return MODULE_CONFIGS[module];
}

/**
 * Get module color
 */
export function getModuleColor(module: ModuleType): string {
    return MODULE_CONFIGS[module]?.color || '#64748B';
}

/**
 * Get module icon
 */
export function getModuleIcon(module: ModuleType): LucideIcon {
    return MODULE_CONFIGS[module]?.icon || Shield;
}

/**
 * Check if Super Admin is in another module
 */
export function isSuperAdminInOtherModule(role: AdminRole, pathname: string): boolean {
    if (role !== 'super_admin') return false;

    const currentModule = getModuleFromPath(pathname);
    return currentModule !== 'super-admin' && currentModule !== 'shared';
}

/**
 * Get all modules accessible by Super Admin (excluding super-admin itself)
 */
export function getAccessibleModulesForSuperAdmin(): ModuleConfig[] {
    return Object.values(MODULE_CONFIGS).filter(
        m => m.id !== 'super-admin' && m.id !== 'shared'
    );
}

// ============================================
// BREADCRUMB UTILITIES
// ============================================

export interface BreadcrumbItem {
    label: string;
    href: string;
    isModule?: boolean;
}

/**
 * Generate breadcrumb items for Super Admin in other module
 */
export function generateModuleBreadcrumb(pathname: string): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
        { label: 'Super Admin', href: '/super-admin', isModule: true },
    ];

    const currentModule = getModuleFromPath(pathname);
    if (currentModule !== 'super-admin' && currentModule !== 'shared') {
        const moduleConfig = getModuleConfig(currentModule);
        items.push({
            label: moduleConfig.name,
            href: moduleConfig.basePath,
            isModule: true,
        });
    }

    // Parse sub-path
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
        // Skip first part (module name)
        for (let i = 1; i < pathParts.length; i++) {
            const subPath = '/' + pathParts.slice(0, i + 1).join('/');
            const label = formatPathLabel(pathParts[i]);
            items.push({ label, href: subPath });
        }
    }

    return items;
}

/**
 * Format path segment to readable label
 */
function formatPathLabel(segment: string): string {
    // Handle special cases
    const labelMap: Record<string, string> = {
        'peminjaman': 'Peminjaman',
        'pengembalian': 'Pengembalian',
        'buku': 'Data Buku',
        'anggota': 'Anggota',
        'denda': 'Denda',
        'laporan': 'Laporan',
        'spp': 'SPP',
        'transaksi': 'Transaksi',
        'pemasukan': 'Pemasukan',
        'pengeluaran': 'Pengeluaran',
        'session': 'Sesi Absensi',
        'rekap-kelas': 'Rekap Kelas',
        'hari-ini': 'Hari Ini',
        'jadwal-kelas': 'Jadwal Kelas',
        'jadwal-guru': 'Jadwal Guru',
        'berita': 'Berita',
        'pengumuman': 'Pengumuman',
        'prestasi': 'Prestasi',
        'create': 'Tambah Baru',
        'edit': 'Edit',
        'settings': 'Pengaturan',
    };

    return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
}

// ============================================
// MODULE STATS (MOCK DATA)
// ============================================

export interface ModuleStats {
    primary: { label: string; value: string | number };
    secondary: { label: string; value: string | number };
}

/**
 * Get mock stats for module cards
 */
export function getModuleStats(module: ModuleType): ModuleStats {
    const stats: Record<ModuleType, ModuleStats> = {
        'perpustakaan': {
            primary: { label: 'Total Buku', value: '3,456' },
            secondary: { label: 'Dipinjam', value: 234 },
        },
        'keuangan': {
            primary: { label: 'Bulan Ini', value: 'Rp 45jt' },
            secondary: { label: 'Pending', value: 23 },
        },
        'absensi': {
            primary: { label: 'Hari Ini', value: '92%' },
            secondary: { label: 'Alpha', value: 12 },
        },
        'jadwal': {
            primary: { label: 'Kelas', value: 36 },
            secondary: { label: 'Guru', value: 89 },
        },
        'aplikasi': {
            primary: { label: 'Pengumuman', value: 15 },
            secondary: { label: 'Berita', value: 42 },
        },
        'super-admin': {
            primary: { label: 'Admin', value: 6 },
            secondary: { label: 'Online', value: 5 },
        },
        'shared': {
            primary: { label: 'Siswa', value: '1,247' },
            secondary: { label: 'Guru', value: 89 },
        },
    };

    return stats[module];
}
