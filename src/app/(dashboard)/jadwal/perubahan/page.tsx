/**
 * Jadwal Perubahan Page
 * SMK Marhas Admin Dashboard
 * 
 * Log perubahan jadwal dan substitusi
 */

'use client';

import React, { useState } from 'react';
import {
    RefreshCw,
    Search,
    Filter,
    Calendar,
    User,
    Clock,
    ArrowRight,
    AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const MOCK_CHANGES = [
    {
        id: 'C001',
        date: '2024-12-29',
        type: 'substitusi',
        kelas: 'XII RPL 1',
        mapel: 'Matematika',
        original: 'Pak Budi',
        replacement: 'Ibu Siti',
        reason: 'Cuti',
        status: 'active'
    },
    {
        id: 'C002',
        date: '2024-12-28',
        type: 'perubahan_jam',
        kelas: 'XI TKJ 1',
        mapel: 'Bahasa Inggris',
        original: '08:00',
        replacement: '10:00',
        reason: 'Rapat guru',
        status: 'completed'
    },
    {
        id: 'C003',
        date: '2024-12-27',
        type: 'pembatalan',
        kelas: 'X MM 1',
        mapel: 'Desain Grafis',
        original: 'Pak Ahmad',
        replacement: '-',
        reason: 'Sakit',
        status: 'completed'
    },
];

export default function JadwalPerubahanPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/jadwal" className="hover:text-[var(--brand-primary)]">Jadwal</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Perubahan</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Log Perubahan Jadwal
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Riwayat substitusi dan perubahan jadwal
                    </p>
                </div>
                <Link
                    href="/jadwal/substitusi/create"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors"
                >
                    <RefreshCw size={16} />
                    Buat Substitusi
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <RefreshCw size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">5</p>
                            <p className="text-xs text-[var(--text-muted)]">Substitusi Aktif</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">3</p>
                            <p className="text-xs text-[var(--text-muted)]">Perubahan Jam</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">2</p>
                            <p className="text-xs text-[var(--text-muted)]">Pembatalan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari kelas atau guru..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
            </div>

            {/* Changes List */}
            <div className="space-y-4">
                {MOCK_CHANGES.map(change => (
                    <div key={change.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                    ${change.type === 'substitusi' ? 'bg-blue-500/10' :
                                        change.type === 'perubahan_jam' ? 'bg-yellow-500/10' :
                                            'bg-red-500/10'}
                                `}>
                                    <RefreshCw size={20} className={
                                        change.type === 'substitusi' ? 'text-blue-500' :
                                            change.type === 'perubahan_jam' ? 'text-yellow-500' :
                                                'text-red-500'
                                    } />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-[var(--text-primary)]">{change.kelas}</span>
                                        <span className="text-[var(--text-muted)]">•</span>
                                        <span className="text-[var(--text-secondary)]">{change.mapel}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-[var(--text-muted)]">{change.original}</span>
                                        <ArrowRight size={14} className="text-[var(--text-muted)]" />
                                        <span className="text-[var(--brand-primary)] font-medium">{change.replacement}</span>
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">Alasan: {change.reason}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-[var(--text-muted)]">{change.date}</p>
                                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-lg
                                    ${change.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'}
                                `}>
                                    {change.status === 'active' ? 'Aktif' : 'Selesai'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-2">
                <Link href="/jadwal" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    ← Dashboard
                </Link>
                <Link href="/jadwal/jadwal-kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    Jadwal Kelas
                </Link>
                <Link href="/jadwal/jadwal-guru" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    Jadwal Guru
                </Link>
                <Link href="/jadwal/kalender" className="px-3 py-1.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--text-secondary)] transition-colors">
                    Kalender
                </Link>
            </div>
        </div>
    );
}
