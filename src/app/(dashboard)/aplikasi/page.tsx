/**
 * Admin Aplikasi Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk Admin Aplikasi dengan overview konten dan moderasi
 * Redesigned with better menu layout
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
    AlertTriangle,
    Send,
    Settings,
    Image,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

// ============================================
// MENU DATA - Reordered: Konten, Moderasi (left) | Notifikasi, Pengaturan (right)
// ============================================
const APLIKASI_MENUS_ROW1 = [
    {
        title: 'Konten',
        description: 'Kelola konten aplikasi',
        items: [
            { label: 'Pengumuman', href: '/aplikasi/pengumuman', icon: Megaphone, color: '#6366F1', description: 'Buat & kelola pengumuman' },
            { label: 'Berita Sekolah', href: '/aplikasi/berita', icon: Newspaper, color: '#10B981', description: 'Berita & artikel sekolah' },
            { label: 'Prestasi', href: '/aplikasi/prestasi', icon: Trophy, color: '#F59E0B', description: 'Catat prestasi siswa' },
            { label: 'Banner', href: '/aplikasi/banner', icon: Image, color: '#EC4899', description: 'Kelola banner aplikasi' },
        ]
    },
    {
        title: 'Moderasi',
        description: 'Moderasi konten pengguna',
        items: [
            { label: 'Laporan User', href: '/aplikasi/moderasi', icon: Flag, color: '#EF4444', description: 'Review laporan pengguna' },
            { label: 'Bug Reports', href: '/aplikasi/bug-reports', icon: Bug, color: '#F59E0B', description: 'Kelola laporan bug' },
        ]
    },
];

const APLIKASI_MENUS_ROW2 = [
    {
        title: 'Notifikasi',
        description: 'Push notification ke pengguna',
        items: [
            { label: 'Push Notifikasi', href: '/aplikasi/notifikasi', icon: Bell, color: '#3B82F6', description: 'Kirim notifikasi ke user' },
        ]
    },
    {
        title: 'Pengaturan',
        description: 'Konfigurasi aplikasi',
        items: [
            { label: 'Pengaturan Aplikasi', href: '/aplikasi/settings', icon: Settings, color: '#64748B', description: 'Konfigurasi sistem aplikasi' },
        ]
    },
];

export default function AplikasiDashboard() {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Smartphone size={20} />
                        <span className="text-sm font-medium text-indigo-200">Admin Aplikasi</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard Aplikasi</h1>
                    <p className="text-indigo-200 max-w-xl">
                        Kelola konten aplikasi Marhas Connect, push notifikasi, dan moderasi laporan pengguna.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <Smartphone className="absolute right-10 top-10 w-32 h-32" />
                    <Bell className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Pengumuman Aktif" value="12" icon={<Megaphone size={20} />} color="#6366F1" subtext="3 baru minggu ini" />
                <StatCard label="Berita Dipublikasi" value="45" icon={<Newspaper size={20} />} color="#10B981" subtext="8 bulan ini" />
                <StatCard label="Laporan Pending" value="7" icon={<Flag size={20} />} color="#EF4444" subtext="Perlu review" urgent />
                <StatCard label="Bug Reports" value="3" icon={<Bug size={20} />} color="#F59E0B" subtext="Belum ditangani" />
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <QuickAction label="Buat Pengumuman" icon={<Megaphone size={20} />} color="#6366F1" href="/aplikasi/pengumuman/create" />
                    <QuickAction label="Tambah Berita" icon={<Plus size={20} />} color="#10B981" href="/aplikasi/berita/create" />
                    <QuickAction label="Kirim Notifikasi" icon={<Send size={20} />} color="#3B82F6" href="/aplikasi/notifikasi" />
                    <QuickAction label="Kelola Banner" icon={<Image size={20} />} color="#EC4899" href="/aplikasi/banner" />
                </div>
            </div>

            {/* Menu Navigation - Row 1: Konten & Moderasi */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Menu Aplikasi</h2>

                {/* Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {APLIKASI_MENUS_ROW1.map((section, idx) => (
                        <MenuCard key={idx} section={section} />
                    ))}
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {APLIKASI_MENUS_ROW2.map((section, idx) => (
                        <MenuCard key={idx} section={section} />
                    ))}
                </div>
            </div>

            {/* Main Grid - Statistics & Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Statistics & Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* App Statistics */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Statistik Aplikasi</h2>
                            <span className="text-sm text-[var(--text-muted)]">7 hari terakhir</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <MiniStat label="Active Users" value="2,547" trend="+12%" positive />
                            <MiniStat label="Opens" value="15,234" trend="+8%" positive />
                            <MiniStat label="Notif Terkirim" value="8,923" trend="+5%" positive />
                            <MiniStat label="Bounce Rate" value="2.3%" trend="-0.5%" positive />
                        </div>

                        <div className="flex items-end justify-between h-32 px-4">
                            {[65, 82, 75, 90, 85, 95, 88].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-8 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t transition-all hover:from-indigo-600" style={{ height: `${value}px` }} />
                                    <span className="text-xs text-[var(--text-muted)]">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Content */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Konten Terbaru</h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-500 rounded-lg font-medium">Semua</button>
                                <button className="px-3 py-1 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-hover)] rounded-lg">Pengumuman</button>
                                <button className="px-3 py-1 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-hover)] rounded-lg">Berita</button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ContentItem type="announcement" title="Jadwal UAS Semester Ganjil 2025" date="02 Jan 2026" views={1250} status="published" />
                            <ContentItem type="news" title="SMK Marhas Juara 1 LKS Tingkat Provinsi" date="01 Jan 2026" views={890} status="published" />
                            <ContentItem type="announcement" title="Libur Tahun Baru 2026" date="31 Des 2025" views={2100} status="published" />
                            <ContentItem type="achievement" title="Prestasi Tim Robotik PPLG" date="30 Des 2025" views={456} status="draft" />
                        </div>

                        <Link href="/aplikasi/pengumuman" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/10 rounded-lg transition-colors">
                            Lihat Semua Konten <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Right Column - Moderation & Notifications */}
                <div className="space-y-6">
                    {/* Moderation Queue */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Laporan User</h2>
                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full font-medium">7 pending</span>
                        </div>

                        <div className="space-y-3">
                            <ReportItem type="inappropriate" reporter="Ahmad R." target="@denipratama" reason="Konten tidak pantas" time="2 jam lalu" />
                            <ReportItem type="spam" reporter="Siti N." target="@buguser123" reason="Spam di komentar" time="5 jam lalu" />
                            <ReportItem type="harassment" reporter="Budi S." target="@anonymous" reason="Pelecehan verbal" time="1 hari lalu" />
                        </div>

                        <Link href="/aplikasi/moderasi" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/10 rounded-lg transition-colors">
                            Review Semua <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Recent Notifications */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Notifikasi Terkirim</h2>
                            <Link href="/aplikasi/notifikasi" className="text-sm text-indigo-500 hover:text-indigo-600">Riwayat</Link>
                        </div>

                        <div className="space-y-3">
                            <NotificationItem title="Pengingat UAS" target="Semua Siswa" sent={1247} read={1089} time="1 jam lalu" />
                            <NotificationItem title="Perubahan Jadwal" target="XII PPLG 1" sent={34} read={28} time="3 jam lalu" />
                            <NotificationItem title="Tagihan SPP" target="Orang Tua" sent={45} read={32} time="Kemarin" />
                        </div>
                    </div>

                    {/* Bug Reports */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Bug Reports</h2>
                            <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full font-medium">3 baru</span>
                        </div>

                        <div className="space-y-3">
                            <BugItem title="Error saat scan QR" reporter="User #1234" priority="high" time="2 jam lalu" />
                            <BugItem title="Tidak bisa upload foto" reporter="User #5678" priority="medium" time="5 jam lalu" />
                            <BugItem title="Loading lambat" reporter="User #9012" priority="low" time="1 hari lalu" />
                        </div>

                        <Link href="/aplikasi/bug-reports" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/10 rounded-lg transition-colors">
                            Lihat Semua <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function MenuCard({ section }: { section: { title: string; description: string; items: { label: string; href: string; icon: React.ComponentType<{ size?: number }>; color: string; description: string }[] } }) {
    return (
        <div className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm border border-[var(--border-light)] hover:shadow-md transition-shadow">
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
    );
}

function StatCard({ label, value, icon, color, subtext, urgent = false }: { label: string; value: string; icon: React.ReactNode; color: string; subtext: string; urgent?: boolean; }) {
    return (
        <div className={`bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-[var(--border-light)] ${urgent ? 'ring-2 ring-red-500/50' : ''}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color }}>{icon}</div>
                {urgent && <AlertTriangle size={14} className="text-red-500" />}
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className={`text-xs mt-1 ${urgent ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>{subtext}</p>
        </div>
    );
}

function QuickAction({ label, icon, color, href }: { label: string; icon: React.ReactNode; color: string; href: string; }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: color }}>{icon}</div>
            <span className="text-sm font-medium text-[var(--text-primary)] text-center">{label}</span>
        </Link>
    );
}

function MiniStat({ label, value, trend, positive }: { label: string; value: string; trend: string; positive: boolean; }) {
    return (
        <div className="p-3 rounded-xl bg-[var(--bg-hover)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">{value}</p>
            <p className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>{trend}</p>
        </div>
    );
}

function ContentItem({ type, title, date, views, status }: { type: 'announcement' | 'news' | 'achievement'; title: string; date: string; views: number; status: 'published' | 'draft'; }) {
    const typeIcons = { announcement: <Megaphone size={16} />, news: <Newspaper size={16} />, achievement: <Trophy size={16} /> };
    const typeColors = { announcement: 'bg-indigo-500/20 text-indigo-500', news: 'bg-green-500/20 text-green-500', achievement: 'bg-amber-500/20 text-amber-500' };

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[type]}`}>{typeIcons[type]}</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{title}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{date}</span>
                    <span className="flex items-center gap-1"><Eye size={10} />{views}</span>
                </div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${status === 'published' ? 'bg-green-500/20 text-green-500' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'}`}>
                {status === 'published' ? 'Published' : 'Draft'}
            </span>
        </div>
    );
}

function ReportItem({ type, target, reason, time }: { type: 'inappropriate' | 'spam' | 'harassment'; reporter: string; target: string; reason: string; time: string; }) {
    const typeColors = { inappropriate: 'bg-red-500/20 text-red-500', spam: 'bg-amber-500/20 text-amber-500', harassment: 'bg-purple-500/20 text-purple-500' };
    return (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">{target}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[type]}`}>{type}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-1">{reason}</p>
            <p className="text-xs text-[var(--text-muted)]">{time}</p>
        </div>
    );
}

function NotificationItem({ title, target, sent, read, time }: { title: string; target: string; sent: number; read: number; time: string; }) {
    const readPercentage = Math.round((read / sent) * 100);
    return (
        <div className="p-3 rounded-xl bg-[var(--bg-hover)]">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{target}</p>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
                <span className="text-[var(--text-muted)]">Terkirim: {sent}</span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-green-500">Dibaca: {read} ({readPercentage}%)</span>
            </div>
        </div>
    );
}

function BugItem({ title, reporter, priority, time }: { title: string; reporter: string; priority: 'high' | 'medium' | 'low'; time: string; }) {
    const priorityColors = { high: 'bg-red-500/20 text-red-500', medium: 'bg-amber-500/20 text-amber-500', low: 'bg-[var(--bg-hover)] text-[var(--text-muted)]' };
    const priorityLabels = { high: 'Tinggi', medium: 'Sedang', low: 'Rendah' };
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Bug size={18} className="text-amber-500" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{title}</p>
                <p className="text-xs text-[var(--text-muted)]">{reporter} • {time}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]}`}>{priorityLabels[priority]}</span>
        </div>
    );
}
