/**
 * Admin Aplikasi Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk Admin Aplikasi dengan overview konten dan moderasi
 */

'use client';

import React from 'react';
import {
    Smartphone,
    Megaphone,
    Newspaper,
    Trophy,
    Bell,
    Flag,
    Bug,
    ArrowRight,
    Plus,
    Eye,
    Users,
    TrendingUp,
    MessageSquare,
    CheckCircle,
    Clock,
    AlertTriangle,
    Send,
} from 'lucide-react';
import Link from 'next/link';

export default function AplikasiDashboard() {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Smartphone size={20} />
                        <span className="text-sm font-medium text-indigo-200">Admin Aplikasi</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Dashboard Aplikasi 📱
                    </h1>
                    <p className="text-indigo-200 max-w-xl">
                        Kelola konten aplikasi Marhas Connect, push notifikasi, dan
                        moderasi laporan pengguna.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <Smartphone className="absolute right-10 top-10 w-32 h-32" />
                    <Bell className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Pengumuman Aktif"
                    value="12"
                    icon={<Megaphone size={20} />}
                    color="#6366F1"
                    subtext="3 baru minggu ini"
                />
                <StatCard
                    label="Berita Dipublikasi"
                    value="45"
                    icon={<Newspaper size={20} />}
                    color="#10B981"
                    subtext="8 bulan ini"
                />
                <StatCard
                    label="Laporan Pending"
                    value="7"
                    icon={<Flag size={20} />}
                    color="#EF4444"
                    subtext="Perlu review"
                    urgent
                />
                <StatCard
                    label="Bug Reports"
                    value="3"
                    icon={<Bug size={20} />}
                    color="#F59E0B"
                    subtext="Belum ditangani"
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <QuickAction
                                label="Buat Pengumuman"
                                icon={<Megaphone size={20} />}
                                color="#6366F1"
                                href="/aplikasi/pengumuman/create"
                            />
                            <QuickAction
                                label="Kirim Notifikasi"
                                icon={<Send size={20} />}
                                color="#3B82F6"
                                href="/aplikasi/notifikasi/compose"
                            />
                            <QuickAction
                                label="Tambah Berita"
                                icon={<Plus size={20} />}
                                color="#10B981"
                                href="/aplikasi/berita/create"
                            />
                            <QuickAction
                                label="Catat Prestasi"
                                icon={<Trophy size={20} />}
                                color="#F59E0B"
                                href="/aplikasi/prestasi/create"
                            />
                        </div>
                    </div>

                    {/* App Statistics */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Statistik Aplikasi</h2>
                            <span className="text-sm text-gray-500">7 hari terakhir</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <MiniStat
                                label="Active Users"
                                value="2,547"
                                trend="+12%"
                                positive
                            />
                            <MiniStat
                                label="Opens"
                                value="15,234"
                                trend="+8%"
                                positive
                            />
                            <MiniStat
                                label="Notif Terkirim"
                                value="8,923"
                                trend="+5%"
                                positive
                            />
                            <MiniStat
                                label="Bounce Rate"
                                value="2.3%"
                                trend="-0.5%"
                                positive
                            />
                        </div>

                        {/* Simple Activity Chart */}
                        <div className="flex items-end justify-between h-32 px-4">
                            {[65, 82, 75, 90, 85, 95, 88].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div
                                        className="w-8 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t transition-all hover:from-indigo-600"
                                        style={{ height: `${value}px` }}
                                    />
                                    <span className="text-xs text-gray-400">
                                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Content */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Konten Terbaru</h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-lg font-medium">
                                    Semua
                                </button>
                                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">
                                    Pengumuman
                                </button>
                                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">
                                    Berita
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ContentItem
                                type="announcement"
                                title="Jadwal UAS Semester Ganjil 2024"
                                date="29 Des 2024"
                                views={1250}
                                status="published"
                            />
                            <ContentItem
                                type="news"
                                title="SMK Marhas Juara 1 LKS Tingkat Provinsi"
                                date="28 Des 2024"
                                views={890}
                                status="published"
                            />
                            <ContentItem
                                type="announcement"
                                title="Libur Tahun Baru 2025"
                                date="27 Des 2024"
                                views={2100}
                                status="published"
                            />
                            <ContentItem
                                type="achievement"
                                title="Prestasi Tim Robotik PPLG"
                                date="26 Des 2024"
                                views={456}
                                status="draft"
                            />
                        </div>

                        <Link
                            href="/aplikasi/pengumuman"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                            Lihat Semua Konten <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Moderation Queue */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Laporan User</h2>
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-medium">
                                7 pending
                            </span>
                        </div>

                        <div className="space-y-3">
                            <ReportItem
                                type="inappropriate"
                                reporter="Ahmad R."
                                target="@denipratama"
                                reason="Konten tidak pantas"
                                time="2 jam lalu"
                            />
                            <ReportItem
                                type="spam"
                                reporter="Siti N."
                                target="@buguser123"
                                reason="Spam di komentar"
                                time="5 jam lalu"
                            />
                            <ReportItem
                                type="harassment"
                                reporter="Budi S."
                                target="@anonymous"
                                reason="Pelecehan verbal"
                                time="1 hari lalu"
                            />
                        </div>

                        <Link
                            href="/aplikasi/moderasi"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                            Review Semua <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Recent Notifications */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Notifikasi Terkirim</h2>
                            <Link
                                href="/aplikasi/notifikasi"
                                className="text-sm text-indigo-600 hover:text-indigo-700"
                            >
                                Riwayat
                            </Link>
                        </div>

                        <div className="space-y-3">
                            <NotificationItem
                                title="Pengingat UAS"
                                target="Semua Siswa"
                                sent={1247}
                                read={1089}
                                time="1 jam lalu"
                            />
                            <NotificationItem
                                title="Perubahan Jadwal"
                                target="XII PPLG 1"
                                sent={34}
                                read={28}
                                time="3 jam lalu"
                            />
                            <NotificationItem
                                title="Tagihan SPP"
                                target="Orang Tua"
                                sent={45}
                                read={32}
                                time="Kemarin"
                            />
                        </div>
                    </div>

                    {/* Bug Reports */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Bug Reports</h2>
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full font-medium">
                                3 baru
                            </span>
                        </div>

                        <div className="space-y-3">
                            <BugItem
                                title="Error saat scan QR"
                                reporter="User #1234"
                                priority="high"
                                time="2 jam lalu"
                            />
                            <BugItem
                                title="Tidak bisa upload foto"
                                reporter="User #5678"
                                priority="medium"
                                time="5 jam lalu"
                            />
                            <BugItem
                                title="Loading lambat"
                                reporter="User #9012"
                                priority="low"
                                time="1 hari lalu"
                            />
                        </div>

                        <Link
                            href="/aplikasi/bug-reports"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                            Lihat Semua <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Recent Achievements */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Prestasi Terbaru</h2>

                        <div className="space-y-3">
                            <AchievementItem
                                title="Juara 1 LKS Provinsi"
                                student="Tim PPLG"
                                category="Lomba"
                                date="28 Des 2024"
                            />
                            <AchievementItem
                                title="Finalis Olimpiade IT"
                                student="Ahmad Rizky"
                                category="Akademik"
                                date="25 Des 2024"
                            />
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
    subtext,
    urgent = false
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    subtext: string;
    urgent?: boolean;
}) {
    return (
        <div className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${urgent ? 'ring-2 ring-red-200' : ''}`}>
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                {urgent && <AlertTriangle size={14} className="text-red-500" />}
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-xs mt-1 ${urgent ? 'text-red-600' : 'text-gray-400'}`}>{subtext}</p>
        </div>
    );
}

function QuickAction({
    label,
    icon,
    color,
    href
}: {
    label: string;
    icon: React.ReactNode;
    color: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
        </Link>
    );
}

function MiniStat({
    label,
    value,
    trend,
    positive
}: {
    label: string;
    value: string;
    trend: string;
    positive: boolean;
}) {
    return (
        <div className="p-3 rounded-xl bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-lg font-bold text-gray-800">{value}</p>
            <p className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
            </p>
        </div>
    );
}

function ContentItem({
    type,
    title,
    date,
    views,
    status
}: {
    type: 'announcement' | 'news' | 'achievement';
    title: string;
    date: string;
    views: number;
    status: 'published' | 'draft';
}) {
    const typeIcons = {
        announcement: <Megaphone size={16} />,
        news: <Newspaper size={16} />,
        achievement: <Trophy size={16} />,
    };

    const typeColors = {
        announcement: 'bg-indigo-100 text-indigo-600',
        news: 'bg-green-100 text-green-600',
        achievement: 'bg-amber-100 text-amber-600',
    };

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[type]}`}>
                {typeIcons[type]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{date}</span>
                    <span className="flex items-center gap-1">
                        <Eye size={10} />
                        {views}
                    </span>
                </div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${status === 'published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                {status === 'published' ? 'Published' : 'Draft'}
            </span>
        </div>
    );
}

function ReportItem({
    type,
    reporter,
    target,
    reason,
    time
}: {
    type: 'inappropriate' | 'spam' | 'harassment';
    reporter: string;
    target: string;
    reason: string;
    time: string;
}) {
    const typeColors = {
        inappropriate: 'bg-red-100 text-red-600',
        spam: 'bg-amber-100 text-amber-600',
        harassment: 'bg-purple-100 text-purple-600',
    };

    return (
        <div className="p-3 rounded-xl bg-red-50 border border-red-100">
            <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-gray-800">{target}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[type]}`}>
                    {type}
                </span>
            </div>
            <p className="text-xs text-gray-500 mb-1">{reason}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Dilaporkan oleh {reporter}</span>
                <span>{time}</span>
            </div>
        </div>
    );
}

function NotificationItem({
    title,
    target,
    sent,
    read,
    time
}: {
    title: string;
    target: string;
    sent: number;
    read: number;
    time: string;
}) {
    const readPercentage = Math.round((read / sent) * 100);

    return (
        <div className="p-3 rounded-xl bg-gray-50">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <p className="text-sm font-medium text-gray-800">{title}</p>
                    <p className="text-xs text-gray-400">{target}</p>
                </div>
                <span className="text-xs text-gray-400">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Terkirim: {sent}</span>
                <span className="text-gray-300">•</span>
                <span className="text-green-600">Dibaca: {read} ({readPercentage}%)</span>
            </div>
        </div>
    );
}

function BugItem({
    title,
    reporter,
    priority,
    time
}: {
    title: string;
    reporter: string;
    priority: 'high' | 'medium' | 'low';
    time: string;
}) {
    const priorityColors = {
        high: 'bg-red-100 text-red-600',
        medium: 'bg-amber-100 text-amber-600',
        low: 'bg-gray-100 text-gray-600',
    };

    const priorityLabels = {
        high: 'Tinggi',
        medium: 'Sedang',
        low: 'Rendah',
    };

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <Bug size={18} className="text-amber-600" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
                <p className="text-xs text-gray-400">{reporter} • {time}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]}`}>
                {priorityLabels[priority]}
            </span>
        </div>
    );
}

function AchievementItem({
    title,
    student,
    category,
    date
}: {
    title: string;
    student: string;
    category: string;
    date: string;
}) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <Trophy size={18} className="text-amber-600" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
                <p className="text-xs text-gray-500">{student} • {category}</p>
            </div>
            <span className="text-xs text-gray-400">{date}</span>
        </div>
    );
}
