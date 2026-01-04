/**
 * Role-Based Sidebar
 * SMK Marhas Admin Dashboard
 * 
 * Sidebar dinamis yang menampilkan navigasi berbeda berdasarkan role admin
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    BookMarked,
    RotateCcw,
    Banknote,
    FileText,
    Settings,
    LogOut,
    X,
    ChevronRight,
    Shield,
    UserCog,
    Database,
    Layers,
    FileSearch,
    Server,
    ShieldAlert,
    Wallet,
    Receipt,
    TrendingUp,
    TrendingDown,
    ClipboardCheck,
    QrCode,
    History,
    CalendarDays,
    Calendar,
    Clock,
    CalendarRange,
    RefreshCw,
    Smartphone,
    Megaphone,
    Newspaper,
    Trophy,
    Bell,
    Flag,
    Bug,
    Upload,
    AlertTriangle,
    User,
    ChevronDown,
} from 'lucide-react';
import type { AdminRole } from '@/types/auth';
import { ROLE_CONFIGS } from '@/types/admin';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { DoubleConfirmModal } from '@/components/shared';

// ============================================
// TYPES
// ============================================

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    badge?: number;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

// ============================================
// NAVIGATION CONFIGS
// ============================================

const SUPER_ADMIN_NAV: NavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/super-admin' },
        ],
    },
    {
        title: 'Manajemen',
        items: [
            { id: 'admins', label: 'Kelola Admin', icon: <UserCog size={20} />, href: '/super-admin/admins' },
            { id: 'users', label: 'Database User', icon: <Database size={20} />, href: '/super-admin/users' },
            { id: 'data-master', label: 'Data Master', icon: <Layers size={20} />, href: '/data-master' },
        ],
    },
    {
        title: 'Perpustakaan',
        items: [
            { id: 'perpus-dash', label: 'Dashboard', icon: <BookOpen size={20} />, href: '/perpustakaan' },
            { id: 'perpus-buku', label: 'Katalog Buku', icon: <BookMarked size={20} />, href: '/perpustakaan/buku' },
            { id: 'perpus-pinjam', label: 'Sirkulasi', icon: <RotateCcw size={20} />, href: '/perpustakaan/peminjaman' },
        ],
    },
    {
        title: 'Keuangan',
        items: [
            { id: 'keu-dash', label: 'Dashboard', icon: <Wallet size={20} />, href: '/keuangan' },
            { id: 'keu-spp', label: 'Pembayaran SPP', icon: <Receipt size={20} />, href: '/keuangan/spp' },
            { id: 'keu-trans', label: 'Transaksi', icon: <TrendingUp size={20} />, href: '/keuangan/transaksi' },
        ],
    },
    {
        title: 'Absensi',
        items: [
            { id: 'abs-dash', label: 'Dashboard', icon: <ClipboardCheck size={20} />, href: '/absensi' },
            { id: 'abs-session', label: 'Session QR', icon: <QrCode size={20} />, href: '/absensi/session' },
            { id: 'abs-rekap', label: 'Rekapitulasi', icon: <History size={20} />, href: '/absensi/rekap-kelas' },
        ],
    },
    {
        title: 'Aplikasi',
        items: [
            { id: 'app-dash', label: 'Dashboard', icon: <Smartphone size={20} />, href: '/aplikasi' },
            { id: 'app-pengumuman', label: 'Pengumuman', icon: <Megaphone size={20} />, href: '/aplikasi/pengumuman' },
            { id: 'app-berita', label: 'Berita', icon: <Newspaper size={20} />, href: '/aplikasi/berita' },
        ],
    },
    {
        title: 'Keamanan & Sistem',
        items: [
            { id: 'audit-log', label: 'Audit Log', icon: <FileSearch size={20} />, href: '/super-admin/audit-log' },
            { id: 'system', label: 'Kontrol Sistem', icon: <Server size={20} />, href: '/super-admin/system' },
            { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, href: '/super-admin/settings' },
        ],
    },
];

const PERPUSTAKAAN_NAV: NavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/perpustakaan' },
        ],
    },
    {
        title: 'Katalog',
        items: [
            { id: 'buku', label: 'Data Buku', icon: <BookOpen size={20} />, href: '/perpustakaan/buku' },
            { id: 'konten-digital', label: 'Konten Digital', icon: <Upload size={20} />, href: '/perpustakaan/konten-digital' },
        ],
    },
    {
        title: 'Sirkulasi',
        items: [
            { id: 'peminjaman', label: 'Peminjaman', icon: <BookMarked size={20} />, href: '/perpustakaan/peminjaman' },
            { id: 'pengembalian', label: 'Pengembalian', icon: <RotateCcw size={20} />, href: '/perpustakaan/pengembalian' },
            { id: 'denda', label: 'Denda', icon: <Banknote size={20} />, href: '/perpustakaan/denda' },
        ],
    },
    {
        title: 'Lainnya',
        items: [
            { id: 'laporan', label: 'Laporan', icon: <FileText size={20} />, href: '/perpustakaan/laporan' },
            { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, href: '/perpustakaan/settings' },
        ],
    },
];

const KEUANGAN_NAV: NavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/keuangan' },
        ],
    },
    {
        title: 'Pembayaran',
        items: [
            { id: 'spp', label: 'Pembayaran SPP', icon: <Receipt size={20} />, href: '/keuangan/spp' },
            { id: 'denda-perpus', label: 'Denda Perpustakaan', icon: <BookOpen size={20} />, href: '/keuangan/denda-perpus' },
        ],
    },
    {
        title: 'Keuangan',
        items: [
            { id: 'pemasukan', label: 'Pemasukan', icon: <TrendingUp size={20} />, href: '/keuangan/pemasukan' },
            { id: 'pengeluaran', label: 'Pengeluaran', icon: <TrendingDown size={20} />, href: '/keuangan/pengeluaran' },
        ],
    },
    {
        title: 'Lainnya',
        items: [
            { id: 'laporan', label: 'Laporan Keuangan', icon: <FileText size={20} />, href: '/keuangan/laporan' },
            { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, href: '/keuangan/settings' },
        ],
    },
];

const ABSENSI_NAV: NavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/absensi' },
        ],
    },
    {
        title: 'Kehadiran',
        items: [
            { id: 'hari-ini', label: 'Absensi Hari Ini', icon: <ClipboardCheck size={20} />, href: '/absensi/hari-ini' },
            { id: 'session', label: 'Session QR', icon: <QrCode size={20} />, href: '/absensi/session' },
        ],
    },
    {
        title: 'Rekap',
        items: [
            { id: 'riwayat', label: 'Riwayat Absensi', icon: <History size={20} />, href: '/absensi/riwayat' },
            { id: 'rekap-kelas', label: 'Rekap Per Kelas', icon: <Users size={20} />, href: '/absensi/rekap-kelas' },
        ],
    },
    {
        title: 'Lainnya',
        items: [
            { id: 'laporan', label: 'Laporan', icon: <FileText size={20} />, href: '/absensi/laporan' },
            { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, href: '/absensi/settings' },
        ],
    },
];

const JADWAL_NAV: NavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/jadwal' },
        ],
    },
    {
        title: 'Jadwal',
        items: [
            { id: 'jadwal-kelas', label: 'Jadwal Kelas', icon: <CalendarDays size={20} />, href: '/jadwal/jadwal-kelas' },
            { id: 'jadwal-guru', label: 'Jadwal Guru', icon: <Clock size={20} />, href: '/jadwal/jadwal-guru' },
        ],
    },
    {
        title: 'Kalender',
        items: [
            { id: 'kalender', label: 'Kalender Akademik', icon: <Calendar size={20} />, href: '/jadwal/kalender' },
            { id: 'perubahan', label: 'Perubahan Jadwal', icon: <RefreshCw size={20} />, href: '/jadwal/perubahan' },
        ],
    },
    {
        title: 'Lainnya',
        items: [
            { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, href: '/jadwal/settings' },
        ],
    },
];

const APLIKASI_NAV: NavSection[] = [
    {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/aplikasi' },
        ],
    },
    {
        title: 'Konten',
        items: [
            { id: 'pengumuman', label: 'Pengumuman', icon: <Megaphone size={20} />, href: '/aplikasi/pengumuman' },
            { id: 'berita', label: 'Berita Sekolah', icon: <Newspaper size={20} />, href: '/aplikasi/berita' },
            { id: 'prestasi', label: 'Prestasi', icon: <Trophy size={20} />, href: '/aplikasi/prestasi' },
        ],
    },
    {
        title: 'Notifikasi',
        items: [
            { id: 'notifikasi', label: 'Push Notifikasi', icon: <Bell size={20} />, href: '/aplikasi/notifikasi' },
        ],
    },
    {
        title: 'Moderasi',
        items: [
            { id: 'moderasi', label: 'Laporan User', icon: <Flag size={20} />, href: '/aplikasi/moderasi' },
            { id: 'bug-reports', label: 'Bug Reports', icon: <Bug size={20} />, href: '/aplikasi/bug-reports' },
        ],
    },
    {
        title: 'Lainnya',
        items: [
            { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, href: '/aplikasi/settings' },
        ],
    },
];

const NAV_CONFIGS: Record<AdminRole, NavSection[]> = {
    super_admin: SUPER_ADMIN_NAV,
    admin_perpustakaan: PERPUSTAKAAN_NAV,
    admin_keuangan: KEUANGAN_NAV,
    admin_absensi: ABSENSI_NAV,
    admin_jadwal: JADWAL_NAV,
    admin_aplikasi: APLIKASI_NAV,
};

// ============================================
// COMPONENT
// ============================================

interface RoleSidebarProps {
    role: AdminRole;
    isOpen: boolean;
    onClose: () => void;
    currentPath: string;
}

export default function RoleSidebar({ role, isOpen, onClose, currentPath }: RoleSidebarProps) {
    const router = useRouter();
    const { user, logout } = useAuth();
    const roleConfig = ROLE_CONFIGS[role];
    const navSections = NAV_CONFIGS[role];
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    const isActive = (href: string) => {
        // Only exact match - no parent route matching
        return currentPath === href;
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed left-0 top-0 h-screen w-[280px] lg:w-[260px]
          bg-[var(--bg-sidebar)] backdrop-blur-xl
          flex flex-col py-6 px-4
          shadow-[4px_0_24px_rgba(0,0,0,0.08)]
          border-r border-[var(--border-light)]
          z-50
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                {/* Close button - mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors lg:hidden"
                >
                    <X size={18} className="text-[var(--text-muted)]" />
                </button>

                {/* Logo Header */}
                <div className="flex items-center gap-3 px-3 mb-6">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, ${roleConfig.color} 0%, ${roleConfig.color}CC 100%)`,
                            boxShadow: `0 4px 14px ${roleConfig.color}40`
                        }}
                    >
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-[var(--text-dark)] text-lg tracking-tight">
                            Marhas Admin
                        </span>
                        <span
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full w-fit"
                            style={{
                                backgroundColor: roleConfig.bgColor,
                                color: roleConfig.color
                            }}
                        >
                            {roleConfig.displayNameId.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                    {navSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-2">
                            {section.title && (
                                <p className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                    {section.title}
                                </p>
                            )}
                            {section.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={onClose}
                                        className={`
                      relative flex items-center gap-3 px-4 py-2.5 rounded-xl
                      transition-all duration-200 group
                      ${active
                                                ? 'text-white'
                                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                                            }
                    `}
                                        style={active ? { backgroundColor: roleConfig.color } : {}}
                                    >
                                        <span
                                            className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        transition-all duration-200
                        ${active
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-[var(--bg-hover)] group-hover:bg-[var(--bg-active)]'
                                                }
                      `}
                                        >
                                            {item.icon}
                                        </span>
                                        <span className="text-sm font-medium">{item.label}</span>

                                        {item.badge && (
                                            <span className="ml-auto text-xs px-2 py-0.5 bg-red-500 text-white rounded-full">
                                                {item.badge}
                                            </span>
                                        )}

                                        {active && (
                                            <ChevronRight size={16} className="ml-auto text-white/70" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* User Section with Dropdown */}
                <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition-colors"
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-md"
                                style={{
                                    background: `linear-gradient(135deg, ${roleConfig.color} 0%, ${roleConfig.color}CC 100%)`
                                }}
                            >
                                {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user?.name}</p>
                                <p className="text-xs text-[var(--text-muted)]">{roleConfig.displayNameId}</p>
                            </div>
                            <ChevronDown size={16} className={`text-[var(--text-muted)] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* User Dropdown Menu */}
                        {showUserMenu && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl shadow-lg overflow-hidden z-50">
                                <Link
                                    href="/profil"
                                    onClick={() => { setShowUserMenu(false); onClose(); }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors"
                                >
                                    <User size={18} className="text-[var(--text-muted)]" />
                                    <span className="text-sm font-medium text-[var(--text-primary)]">Profil Saya</span>
                                </Link>
                                <Link
                                    href="/pengaturan"
                                    onClick={() => { setShowUserMenu(false); onClose(); }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors"
                                >
                                    <Settings size={18} className="text-[var(--text-muted)]" />
                                    <span className="text-sm font-medium text-[var(--text-primary)]">Pengaturan</span>
                                </Link>
                                <div className="border-t border-[var(--border-light)]"></div>
                                <button
                                    onClick={() => { setShowUserMenu(false); setShowLogoutModal(true); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut size={18} className="text-red-500" />
                                    <span className="text-sm font-medium text-red-500">Keluar</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            <DoubleConfirmModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                title="Keluar dari Akun"
                message="Anda akan keluar dari dashboard admin. Session Anda akan berakhir."
                warningMessage="Pastikan semua perubahan sudah tersimpan!"
                confirmText="Ya, Keluar"
                cancelText="Batal"
                cooldownSeconds={3}
            />
        </>
    );
}
