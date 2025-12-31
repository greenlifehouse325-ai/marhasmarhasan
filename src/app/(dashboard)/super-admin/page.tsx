/**
 * Super Admin Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard utama untuk Super Admin dengan overview sistem lengkap
 * Redesigned: neutral colors, larger text, proper hierarchy
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
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SuperAdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Banner - Changed from purple to neutral/slate with key metrics */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-6 md:p-8 text-white">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield size={20} />
                            <span className="text-sm font-medium text-slate-300">Super Admin</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            Selamat Datang, {user?.name?.split(' ')[0]}! 👋
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

            {/* Quick Stats - Clickable Cards with Larger Text */}
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
                    href="/super-admin/users?tab=siswa"
                />
                <ClickableStatCard
                    label="Total Guru"
                    value="89"
                    icon={<Users size={24} />}
                    color="#10B981"
                    trend="+2 bulan ini"
                    href="/super-admin/users?tab=guru"
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

            {/* Main Grid - Reorganized: Admin Status + Quick Actions at top */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Admin Status Section - Made more prominent */}
                <div className="lg:col-span-2">
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-[var(--text-primary)]">Sekilas Status Admin</h2>
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

                {/* Right: Quick Actions + Alerts (Moved UP in hierarchy) */}
                <div className="space-y-6">
                    {/* Quick Actions - Now at top of right column */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">⚡ Aksi Cepat</h2>

                        <div className="space-y-2">
                            <QuickActionButton
                                label="Tambah Admin Baru"
                                icon={<UserCog size={18} />}
                                href="/super-admin/admins/create"
                                color="#7C3AED"
                            />
                            <QuickActionButton
                                label="Lihat Audit Log"
                                icon={<Eye size={18} />}
                                href="/super-admin/audit-log"
                                color="#3B82F6"
                            />
                            <QuickActionButton
                                label="Kontrol Sistem"
                                icon={<Server size={18} />}
                                href="/super-admin/system"
                                color="#10B981"
                            />
                            <QuickActionButton
                                label="Database User"
                                icon={<Database size={18} />}
                                href="/super-admin/users"
                                color="#F59E0B"
                            />
                        </div>
                    </div>

                    {/* System Alerts - Improved colors */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">🔔 Peringatan Sistem</h2>

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
                </div>
            </div>

            {/* Bottom Row: Activity Log & System Health (Moved to bottom) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity - Now at bottom */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)]">📋 Aktivitas Terbaru</h2>
                        <Link
                            href="/super-admin/audit-log"
                            className="text-sm text-[var(--brand-primary)] hover:opacity-80 flex items-center gap-1 font-medium"
                        >
                            Audit Log <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="space-y-4">
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
                            action="Mengubah jadwal kelas XII PPLG 1"
                            user="Admin Jadwal"
                            time="2 jam lalu"
                            type="update"
                        />
                    </div>
                </div>

                {/* System Health - Now at bottom */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">💻 Kesehatan Sistem</h2>

                    <div className="space-y-4">
                        <HealthBar label="CPU Usage" value={23} color="#10B981" />
                        <HealthBar label="Memory" value={45} color="#3B82F6" />
                        <HealthBar label="Storage" value={67} color="#F59E0B" />
                        <HealthBar label="Database" value={12} color="#7C3AED" />
                    </div>
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
        create: 'bg-green-100 text-green-600',
        update: 'bg-blue-100 text-blue-600',
        delete: 'bg-red-100 text-red-600',
    };

    const icons = {
        create: <CheckCircle size={14} />,
        update: <Activity size={14} />,
        delete: <AlertTriangle size={14} />,
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[type]}`}>
                {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)]">{action}</p>
                <p className="text-xs text-[var(--text-muted)]">{user}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock size={12} />
                {time}
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
        warning: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-400',
        info: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-800 dark:text-blue-400',
        success: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-800 dark:text-green-400',
        error: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-400',
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

function QuickActionButton({
    label,
    icon,
    href,
    color
}: {
    label: string;
    icon: React.ReactNode;
    href: string;
    color: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors group"
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
            <ArrowRight size={14} className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
        </Link>
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
