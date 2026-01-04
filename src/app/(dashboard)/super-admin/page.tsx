/**
 * Super Admin Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard utama untuk Super Admin dengan overview sistem lengkap
 * Redesigned with comprehensive menu navigation and cleaner layout
 */

'use client';

import React from 'react';
import {
    Users,
    UserCog,
    Shield,
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    Server,
    Database,
    Eye,
    ArrowRight,
    BookOpen,
    Wallet,
    ClipboardCheck,
    Calendar,
    Smartphone,
    GraduationCap,
    ChevronRight,
    Settings,
    FileText,
    BarChart3,
    Key,
    History,
    Users2,
    Building,
    Layers,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getAccessibleModulesForSuperAdmin, getModuleStats } from '@/lib/moduleUtils';

// ============================================
// MENU DATA
// ============================================
const SUPER_ADMIN_MENUS = [
    {
        title: 'Manajemen Admin',
        description: 'Kelola administrator sistem',
        items: [
            { label: 'Daftar Admin', href: '/super-admin/admins', icon: UserCog, color: '#7C3AED', description: 'Kelola admin sistem' },
            { label: 'Audit Log', href: '/super-admin/audit-log', icon: History, color: '#3B82F6', description: 'Riwayat aktivitas admin' },
            { label: 'Hak Akses', href: '/super-admin/roles', icon: Key, color: '#F59E0B', description: 'Kelola role & permissions' },
        ]
    },
    {
        title: 'Database Pengguna',
        description: 'Kelola data siswa, guru, dan wali',
        items: [
            { label: 'Semua Pengguna', href: '/super-admin/users', icon: Users, color: '#10B981', description: 'Semua user dalam sistem' },
            { label: 'Data Siswa', href: '/siswa', icon: GraduationCap, color: '#3B82F6', description: 'Kelola data siswa' },
            { label: 'Data Guru', href: '/guru', icon: Users2, color: '#8B5CF6', description: 'Kelola data guru' },
            { label: 'Data Orang Tua', href: '/orangtua', icon: Users, color: '#EC4899', description: 'Kelola data wali' },
        ]
    },
    {
        title: 'Sistem & Pengaturan',
        description: 'Kontrol dan konfigurasi sistem',
        items: [
            { label: 'Kontrol Sistem', href: '/super-admin/system', icon: Server, color: '#10B981', description: 'Status & health sistem' },
            { label: 'Keamanan', href: '/super-admin/security', icon: Shield, color: '#EF4444', description: 'Pengaturan keamanan' },
            { label: 'Pengaturan', href: '/super-admin/settings', icon: Settings, color: '#64748B', description: 'Konfigurasi global' },
            { label: 'Statistik', href: '/super-admin/analytics', icon: BarChart3, color: '#06B6D4', description: 'Analytics & laporan' },
        ]
    },
    {
        title: 'Data Master',
        description: 'Data referensi sekolah',
        items: [
            { label: 'Data Master', href: '/data-master', icon: Database, color: '#3B82F6', description: 'Kelola data referensi' },
            { label: 'Kelas', href: '/kelas', icon: Layers, color: '#8B5CF6', description: 'Manajemen kelas' },
            { label: 'Jurusan & Mapel', href: '/data-master/jurusan', icon: Building, color: '#F59E0B', description: 'Jurusan & mata pelajaran' },
        ]
    },
];

export default function SuperAdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-6 md:p-8 text-white">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield size={20} />
                            <span className="text-sm font-medium text-slate-300">Super Admin</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            Selamat Datang, {user?.name?.split(' ')[0] || 'Admin'}!
                        </h1>
                        <p className="text-slate-300 max-w-xl">
                            Anda memiliki akses penuh ke seluruh sistem. Pantau aktivitas admin,
                            kelola database, dan kontrol sistem dari sini.
                        </p>
                    </div>

                    {/* Key Metrics in Banner */}
                    <div className="grid grid-cols-3 gap-3 lg:gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <p className="text-2xl lg:text-3xl font-bold">6</p>
                            <p className="text-xs text-slate-300">Admin Aktif</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <p className="text-2xl lg:text-3xl font-bold">1,247</p>
                            <p className="text-xs text-slate-300">Total Siswa</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <p className="text-2xl lg:text-3xl font-bold">89</p>
                            <p className="text-xs text-slate-300">Total Guru</p>
                        </div>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
                    <div className="absolute right-10 top-10 w-40 h-40 border-2 border-white rounded-full" />
                    <div className="absolute right-20 bottom-5 w-24 h-24 border-2 border-white rounded-full" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ClickableStatCard
                    label="Total Admin"
                    value="6"
                    icon={<UserCog size={24} />}
                    color="#7C3AED"
                    trend="+1 minggu ini"
                    href="/super-admin/admins"
                />
                <ClickableStatCard
                    label="Total Siswa"
                    value="1,247"
                    icon={<GraduationCap size={24} />}
                    color="#3B82F6"
                    trend="+23 bulan ini"
                    href="/siswa"
                />
                <ClickableStatCard
                    label="Total Guru"
                    value="89"
                    icon={<Users size={24} />}
                    color="#10B981"
                    trend="+2 bulan ini"
                    href="/guru"
                />
                <ClickableStatCard
                    label="Sistem Status"
                    value="Online"
                    icon={<Server size={24} />}
                    color="#10B981"
                    trend="99.9% uptime"
                    href="/super-admin/system"
                />
            </div>

            {/* Module Access Cards - Akses Cepat ke Modul */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Akses Modul Admin</h2>
                        <p className="text-sm text-[var(--text-muted)]">Masuk ke modul yang ingin dikelola</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {getAccessibleModulesForSuperAdmin().map((module) => {
                        const Icon = module.icon;
                        const stats = getModuleStats(module.id);
                        return (
                            <Link
                                key={module.id}
                                href={module.basePath}
                                className="group relative overflow-hidden bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm border border-[var(--border-light)] hover:shadow-lg hover:border-transparent transition-all duration-300"
                                style={{
                                    '--hover-color': module.color,
                                } as React.CSSProperties}
                            >
                                {/* Hover gradient overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                    style={{ background: `linear-gradient(135deg, ${module.color}, transparent)` }}
                                />

                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${module.color}20`,
                                        color: module.color
                                    }}
                                >
                                    <Icon size={24} />
                                </div>

                                {/* Title & Description */}
                                <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--hover-color)] transition-colors">
                                    {module.name}
                                </h3>
                                <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-2">
                                    {module.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-light)]">
                                    <div>
                                        <p className="text-lg font-bold" style={{ color: module.color }}>
                                            {stats.primary.value}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">{stats.primary.label}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                                            {stats.secondary.value}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">{stats.secondary.label}</p>
                                    </div>
                                </div>

                                {/* Enter Button */}
                                <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: module.color }}>
                                    Masuk Modul <ArrowRight size={14} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Menu Navigation */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Menu Super Admin</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SUPER_ADMIN_MENUS.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm border border-[var(--border-light)] hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-[var(--text-primary)]">{section.title}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{section.description}</p>
                            </div>
                            <div className="space-y-2">
                                {section.items.map((item, itemIdx) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-all group"
                                        >
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                                                <p className="text-xs text-[var(--text-muted)] truncate">{item.description}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Grid - Admin Status & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Admin Status Section */}
                <div className="lg:col-span-2">
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">Status Admin</h2>
                                <p className="text-sm text-[var(--text-muted)]">Pantau aktivitas admin secara real-time</p>
                            </div>
                            <Link
                                href="/super-admin/admins"
                                className="text-sm text-[var(--brand-primary)] hover:opacity-80 flex items-center gap-1 font-medium"
                            >
                                Lihat Semua <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <AdminCard
                                role="Perpustakaan"
                                name="Admin Perpus"
                                status="online"
                                lastActivity="2 menit lalu"
                                color="#10B981"
                                icon={<BookOpen size={18} />}
                            />
                            <AdminCard
                                role="Keuangan"
                                name="Admin Keuangan"
                                status="online"
                                lastActivity="5 menit lalu"
                                color="#F59E0B"
                                icon={<Wallet size={18} />}
                            />
                            <AdminCard
                                role="Absensi"
                                name="Admin Absensi"
                                status="online"
                                lastActivity="10 menit lalu"
                                color="#3B82F6"
                                icon={<ClipboardCheck size={18} />}
                            />
                            <AdminCard
                                role="Jadwal"
                                name="Admin Jadwal"
                                status="offline"
                                lastActivity="2 jam lalu"
                                color="#EC4899"
                                icon={<Calendar size={18} />}
                            />
                            <AdminCard
                                role="Aplikasi"
                                name="Admin Aplikasi"
                                status="online"
                                lastActivity="1 menit lalu"
                                color="#6366F1"
                                icon={<Smartphone size={18} />}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Alerts */}
                <div className="space-y-6">
                    {/* System Alerts */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Peringatan Sistem</h2>

                        <div className="space-y-3">
                            <AlertCard
                                type="warning"
                                title="3 Pendaftaran Pending"
                                description="Menunggu approval akun baru"
                                action="Review"
                                href="/super-admin/users"
                            />
                            <AlertCard
                                type="info"
                                title="Backup Terjadwal"
                                description="Backup database malam ini 02:00"
                                action="Detail"
                                href="/super-admin/system"
                            />
                            <AlertCard
                                type="success"
                                title="Sistem Stabil"
                                description="Tidak ada masalah terdeteksi"
                            />
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-[var(--text-primary)]">Kesehatan Sistem</h2>
                            <Link href="/super-admin/system" className="text-xs text-[var(--brand-primary)]">
                                Detail
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <HealthBar label="CPU Usage" value={23} color="#10B981" />
                            <HealthBar label="Memory" value={45} color="#3B82F6" />
                            <HealthBar label="Storage" value={67} color="#F59E0B" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Activity Log */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">Aktivitas Terbaru</h2>
                    <Link
                        href="/super-admin/audit-log"
                        className="text-sm text-[var(--brand-primary)] hover:opacity-80 flex items-center gap-1 font-medium"
                    >
                        Audit Log <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ActivityItem
                        action="Menambahkan buku baru"
                        user="Admin Perpustakaan"
                        time="2 menit lalu"
                        type="create"
                    />
                    <ActivityItem
                        action="Memverifikasi pembayaran SPP"
                        user="Admin Keuangan"
                        time="5 menit lalu"
                        type="update"
                    />
                    <ActivityItem
                        action="Membuat session absensi"
                        user="Admin Absensi"
                        time="15 menit lalu"
                        type="create"
                    />
                    <ActivityItem
                        action="Mengubah jadwal kelas XII PPLG"
                        user="Admin Jadwal"
                        time="2 jam lalu"
                        type="update"
                    />
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS 
// ============================================

function ClickableStatCard({
    label,
    value,
    icon,
    color,
    trend,
    href
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] border border-[var(--border-light)] group"
        >
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <TrendingUp size={16} className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-base font-medium text-[var(--text-secondary)] mt-1">{label}</p>
            <p className="text-sm text-green-600 mt-1">{trend}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                Lihat Detail <ArrowRight size={12} />
            </div>
        </Link>
    );
}

function AdminCard({
    role,
    name,
    status,
    lastActivity,
    color,
    icon
}: {
    role: string;
    name: string;
    status: 'online' | 'offline';
    lastActivity: string;
    color: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="p-4 rounded-xl border border-[var(--border-light)] hover:border-[var(--border-medium)] transition-colors bg-[var(--bg-elevated)]">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{role}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div
                        className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span className={`text-xs font-medium ${status === 'online' ? 'text-green-600' : 'text-[var(--text-muted)]'}`}>
                        {status === 'online' ? 'Online' : 'Offline'}
                    </span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{lastActivity}</span>
            </div>
        </div>
    );
}

function ActivityItem({
    action,
    user,
    time,
    type
}: {
    action: string;
    user: string;
    time: string;
    type: 'create' | 'update' | 'delete';
}) {
    const colors = {
        create: 'bg-green-500/15 text-green-600',
        update: 'bg-blue-500/15 text-blue-600',
        delete: 'bg-red-500/15 text-red-600',
    };

    const icons = {
        create: <CheckCircle size={14} />,
        update: <Activity size={14} />,
        delete: <AlertTriangle size={14} />,
    };

    return (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-hover)]">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors[type]}`}>
                {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)] line-clamp-2">{action}</p>
                <p className="text-xs text-[var(--text-muted)]">{user}</p>
                <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mt-1">
                    <Clock size={10} />
                    {time}
                </div>
            </div>
        </div>
    );
}

function AlertCard({
    type,
    title,
    description,
    action,
    href
}: {
    type: 'warning' | 'info' | 'success' | 'error';
    title: string;
    description: string;
    action?: string;
    href?: string;
}) {
    const styles = {
        warning: 'bg-amber-500/10 border-amber-500/30 text-amber-600',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-600',
        success: 'bg-green-500/10 border-green-500/30 text-green-600',
        error: 'bg-red-500/10 border-red-500/30 text-red-600',
    };

    const icons = {
        warning: <AlertTriangle size={16} />,
        info: <Activity size={16} />,
        success: <CheckCircle size={16} />,
        error: <AlertTriangle size={16} />,
    };

    return (
        <div className={`p-3 rounded-xl border ${styles[type]}`}>
            <div className="flex items-start gap-3">
                {icons[type]}
                <div className="flex-1">
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs opacity-80">{description}</p>
                </div>
                {action && href && (
                    <Link href={href} className="text-xs font-semibold hover:underline">
                        {action}
                    </Link>
                )}
            </div>
        </div>
    );
}

function HealthBar({
    label,
    value,
    color
}: {
    label: string;
    value: number;
    color: string;
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{value}%</span>
            </div>
            <div className="h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${value}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}
