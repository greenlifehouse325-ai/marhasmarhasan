/**
 * Super Admin Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard utama untuk Super Admin dengan overview sistem lengkap
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
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SuperAdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield size={20} />
                        <span className="text-sm font-medium text-purple-200">Super Admin</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Selamat Datang, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-purple-200 max-w-xl">
                        Anda memiliki akses penuh ke seluruh sistem. Pantau aktivitas admin,
                        kelola database, dan kontrol sistem dari sini.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <div className="absolute right-10 top-10 w-40 h-40 border-2 border-white rounded-full" />
                    <div className="absolute right-20 bottom-5 w-24 h-24 border-2 border-white rounded-full" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Admin"
                    value="6"
                    icon={<UserCog size={20} />}
                    color="#7C3AED"
                    trend="+1 minggu ini"
                />
                <StatCard
                    label="Total Siswa"
                    value="1,247"
                    icon={<Users size={20} />}
                    color="#3B82F6"
                    trend="+23 bulan ini"
                />
                <StatCard
                    label="Total Guru"
                    value="89"
                    icon={<Users size={20} />}
                    color="#10B981"
                    trend="+2 bulan ini"
                />
                <StatCard
                    label="Sistem Status"
                    value="Online"
                    icon={<Server size={20} />}
                    color="#10B981"
                    trend="99.9% uptime"
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Admin Activity */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Admin Overview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Status Admin</h2>
                            <Link
                                href="/super-admin/admins"
                                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
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

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h2>
                            <Link
                                href="/super-admin/audit-log"
                                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
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
                            <ActivityItem
                                action="Mempublikasikan pengumuman"
                                user="Admin Aplikasi"
                                time="3 jam lalu"
                                type="create"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Alerts & Quick Actions */}
                <div className="space-y-6">
                    {/* Alerts */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Peringatan Sistem</h2>

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

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>

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

                    {/* System Health */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Kesehatan Sistem</h2>

                        <div className="space-y-4">
                            <HealthBar label="CPU Usage" value={23} color="#10B981" />
                            <HealthBar label="Memory" value={45} color="#3B82F6" />
                            <HealthBar label="Storage" value={67} color="#F59E0B" />
                            <HealthBar label="Database" value={12} color="#7C3AED" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({
    label,
    value,
    icon,
    color,
    trend
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend: string;
}) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-xs text-green-600 mt-1">{trend}</p>
        </div>
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
        <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{role}</p>
                    <p className="text-xs text-gray-400 truncate">{name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div
                        className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span className={`text-xs ${status === 'online' ? 'text-green-600' : 'text-gray-400'}`}>
                        {status === 'online' ? 'Online' : 'Offline'}
                    </span>
                </div>
                <span className="text-xs text-gray-400">{lastActivity}</span>
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
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[type]}`}>
                {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">{action}</p>
                <p className="text-xs text-gray-400">{user}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
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
        warning: 'bg-amber-50 border-amber-200 text-amber-700',
        info: 'bg-blue-50 border-blue-200 text-blue-700',
        success: 'bg-green-50 border-green-200 text-green-700',
        error: 'bg-red-50 border-red-200 text-red-700',
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
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs opacity-80">{description}</p>
                </div>
                {action && href && (
                    <Link href={href} className="text-xs font-medium hover:underline">
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
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
        >
            <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <ArrowRight size={14} className="ml-auto text-gray-400 group-hover:text-gray-600" />
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
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${value}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}
