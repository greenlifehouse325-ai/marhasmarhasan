/**
 * Absensi Riwayat Page
 * SMK Marhas Admin Dashboard
 * 
 * Riwayat absensi lengkap
 */

'use client';

import React, { useState } from 'react';
import {
    History,
    Search,
    Filter,
    Download,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Users,
    UserCheck,
    UserX,
    Clock
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const MOCK_HISTORY = [
    { date: '2024-12-29', kelas: 'XII RPL 1', hadir: 30, izin: 1, sakit: 1, alpa: 0, total: 32 },
    { date: '2024-12-28', kelas: 'XII RPL 1', hadir: 29, izin: 2, sakit: 1, alpa: 0, total: 32 },
    { date: '2024-12-27', kelas: 'XII RPL 1', hadir: 31, izin: 0, sakit: 1, alpa: 0, total: 32 },
    { date: '2024-12-26', kelas: 'XII RPL 1', hadir: 28, izin: 2, sakit: 2, alpa: 0, total: 32 },
    { date: '2024-12-29', kelas: 'XII RPL 2', hadir: 26, izin: 1, sakit: 0, alpa: 1, total: 28 },
    { date: '2024-12-28', kelas: 'XII RPL 2', hadir: 27, izin: 0, sakit: 1, alpa: 0, total: 28 },
];

export default function RiwayatAbsensiPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('2024-12');

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/absensi" className="hover:text-[var(--brand-primary)]">Absensi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Riwayat</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Riwayat Absensi
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Lihat riwayat kehadiran siswa
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/absensi/hari-ini"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors"
                    >
                        <Clock size={16} />
                        Hari Ini
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Month Selector */}
            <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                    <ChevronLeft size={20} className="text-[var(--text-muted)]" />
                </button>
                <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-[var(--brand-primary)]" />
                    <span className="font-semibold text-[var(--text-primary)]">Desember 2024</span>
                </div>
                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                    <ChevronRight size={20} className="text-[var(--text-muted)]" />
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Users size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">22</p>
                            <p className="text-xs text-[var(--text-muted)]">Hari Efektif</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <UserCheck size={20} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">94.5%</p>
                            <p className="text-xs text-[var(--text-muted)]">Rata-rata Hadir</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">12</p>
                            <p className="text-xs text-[var(--text-muted)]">Total Izin</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <UserX size={20} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">3</p>
                            <p className="text-xs text-[var(--text-muted)]">Total Alpa</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari kelas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {/* History Table */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Kelas</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Hadir</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Izin</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Sakit</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Alpa</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {MOCK_HISTORY.map((item, idx) => {
                                const rate = Math.round((item.hadir / item.total) * 100);
                                return (
                                    <tr key={idx} className="hover:bg-[var(--bg-hover)] transition-colors">
                                        <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.date}</td>
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/absensi/rekap-kelas?kelas=${item.kelas}`}
                                                className="font-medium text-[var(--brand-primary)] hover:underline"
                                            >
                                                {item.kelas}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-green-600">{item.hadir}</td>
                                        <td className="px-4 py-3 text-center text-sm text-yellow-600">{item.izin}</td>
                                        <td className="px-4 py-3 text-center text-sm text-orange-500">{item.sakit}</td>
                                        <td className="px-4 py-3 text-center text-sm text-red-500">{item.alpa}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-lg
                                                ${rate >= 90 ? 'bg-green-500/10 text-green-600' :
                                                    rate >= 75 ? 'bg-yellow-500/10 text-yellow-600' :
                                                        'bg-red-500/10 text-red-500'}
                                            `}>
                                                {rate}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-2">
                <Link href="/absensi" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    ← Dashboard
                </Link>
                <Link href="/absensi/hari-ini" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    Hari Ini
                </Link>
                <Link href="/absensi/session" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    Session QR
                </Link>
                <Link href="/absensi/rekap-kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    Rekap Kelas
                </Link>
            </div>
        </div>
    );
}
