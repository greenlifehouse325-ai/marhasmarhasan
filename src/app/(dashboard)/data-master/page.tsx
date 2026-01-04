/**
 * Data Master Dashboard Page
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk mengelola data master sekolah
 * Redesigned with comprehensive navigation menu
 */

'use client';

import React from 'react';
import {
    Database,
    GraduationCap,
    BookOpen,
    Calendar,
    Users,
    Building,
    ChevronRight,
    User,
    UsersRound,
    UserCog,
    Award,
    Grid3X3,
} from 'lucide-react';
import Link from 'next/link';

// ============================================
// MENU DATA
// ============================================
const DATA_MASTER_ITEMS = [
    { href: '/data-master/kelas', icon: Grid3X3, label: 'Kelas', desc: 'Kelola data kelas', count: 25, color: '#3B82F6' },
    { href: '/data-master/jurusan', icon: Building, label: 'Jurusan', desc: 'Kelola data jurusan', count: 3, color: '#10B981' },
    { href: '/data-master/mapel', icon: BookOpen, label: 'Mata Pelajaran', desc: 'Kelola data mapel', count: 45, color: '#8B5CF6' },
    { href: '/data-master/tahun-ajaran', icon: Calendar, label: 'Tahun Ajaran', desc: 'Kelola tahun ajaran', count: 5, color: '#F59E0B' },
    { href: '/data-master/ruangan', icon: Building, label: 'Ruangan', desc: 'Kelola data ruangan', count: 30, color: '#EF4444' },
    { href: '/data-master/ekstrakurikuler', icon: Award, label: 'Ekstrakurikuler', desc: 'Kelola ekstrakurikuler', count: 12, color: '#EC4899' },
];

const DATA_POKOK_ITEMS = [
    { href: '/siswa', icon: Users, label: 'Data Siswa', desc: 'Kelola data siswa', count: 1247, color: '#3B82F6' },
    { href: '/guru', icon: UserCog, label: 'Data Guru', desc: 'Kelola data guru', count: 68, color: '#10B981' },
    { href: '/kelas', icon: GraduationCap, label: 'Manajemen Kelas', desc: 'Kelola kelas & siswa', count: 25, color: '#8B5CF6' },
    { href: '/orangtua', icon: UsersRound, label: 'Data Orang Tua', desc: 'Kelola data wali', count: 980, color: '#F59E0B' },
];

export default function DataMasterPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Database size={20} />
                        <span className="text-sm font-medium text-blue-200">Data Master</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Data Master Sekolah
                    </h1>
                    <p className="text-blue-200 max-w-xl">
                        Kelola semua data master dan data pokok sekolah termasuk siswa, guru, kelas, dan lainnya.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <Database className="absolute right-10 top-10 w-32 h-32" />
                    <Users className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Data Master"
                    value="120"
                    icon={<Database size={20} />}
                    color="#3B82F6"
                    subtext="Total referensi"
                />
                <StatCard
                    label="Total Siswa"
                    value="1,247"
                    icon={<Users size={20} />}
                    color="#10B981"
                    subtext="Aktif tahun ini"
                />
                <StatCard
                    label="Total Guru"
                    value="68"
                    icon={<UserCog size={20} />}
                    color="#8B5CF6"
                    subtext="Tenaga pendidik"
                />
                <StatCard
                    label="Kelas Aktif"
                    value="25"
                    icon={<GraduationCap size={20} />}
                    color="#F59E0B"
                    subtext="Tahun ajaran aktif"
                />
            </div>

            {/* Data Pokok Section */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Data Pokok</h2>
                    <p className="text-sm text-[var(--text-muted)]">Kelola data utama pengguna sekolah</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {DATA_POKOK_ITEMS.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-5 hover:border-[var(--border-medium)] hover:shadow-md transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <ChevronRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] transition-colors" />
                                </div>
                                <h3 className="font-semibold text-[var(--text-primary)]">{item.label}</h3>
                                <p className="text-xs text-[var(--text-muted)] mb-2">{item.desc}</p>
                                <p className="text-lg font-bold" style={{ color: item.color }}>{item.count.toLocaleString('id-ID')} data</p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Data Master Reference Section */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Data Referensi</h2>
                    <p className="text-sm text-[var(--text-muted)]">Kelola data master referensi sekolah</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {DATA_MASTER_ITEMS.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-5 hover:border-[var(--border-medium)] hover:shadow-md transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] transition-colors" />
                                </div>
                                <h3 className="font-semibold text-[var(--text-primary)]">{item.label}</h3>
                                <p className="text-xs text-[var(--text-muted)] mb-2">{item.desc}</p>
                                <p className="text-sm font-medium" style={{ color: item.color }}>{item.count} data</p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-5">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Aksi Cepat</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link
                        href="/siswa/create"
                        className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/15 text-blue-500">
                            <User size={16} />
                        </div>
                        <span className="text-sm font-medium text-[var(--text-primary)]">Tambah Siswa</span>
                    </Link>
                    <Link
                        href="/guru/create"
                        className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-500/15 text-green-500">
                            <UserCog size={16} />
                        </div>
                        <span className="text-sm font-medium text-[var(--text-primary)]">Tambah Guru</span>
                    </Link>
                    <Link
                        href="/data-master/kelas/create"
                        className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500/15 text-purple-500">
                            <Grid3X3 size={16} />
                        </div>
                        <span className="text-sm font-medium text-[var(--text-primary)]">Tambah Kelas</span>
                    </Link>
                    <Link
                        href="/siswa/import"
                        className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/15 text-amber-500">
                            <Database size={16} />
                        </div>
                        <span className="text-sm font-medium text-[var(--text-primary)]">Import Data</span>
                    </Link>
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
    subtext
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    subtext: string;
}) {
    return (
        <div className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-[var(--border-light)]">
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}20`, color }}
                >
                    {icon}
                </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className="text-xs mt-1 text-[var(--text-muted)]">{subtext}</p>
        </div>
    );
}
