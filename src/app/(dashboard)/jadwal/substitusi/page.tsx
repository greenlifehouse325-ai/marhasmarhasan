/**
 * Jadwal Substitusi Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { RefreshCw, Plus, Search, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_SUBS = [
    { id: 'S001', tanggal: '2024-12-30', kelas: 'XII RPL 1', mapel: 'Matematika', guruAsli: 'Pak Budi', guruPengganti: 'Ibu Siti', alasan: 'Cuti', status: 'active' },
    { id: 'S002', tanggal: '2024-12-29', kelas: 'XI TKJ 1', mapel: 'B. Inggris', guruAsli: 'Ibu Dewi', guruPengganti: 'Pak Ahmad', alasan: 'Sakit', status: 'completed' },
];

export default function SubstitusiPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/jadwal" className="hover:text-[var(--brand-primary)]">Jadwal</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Substitusi</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Substitusi Guru</h1>
                    <p className="text-[var(--text-muted)]">Kelola penggantian guru mengajar</p>
                </div>
                <Link href="/jadwal/substitusi/create" className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                    <Plus size={16} />
                    Buat Substitusi
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <RefreshCw size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">3</p>
                    <p className="text-xs text-[var(--text-muted)]">Substitusi Aktif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Calendar size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">25</p>
                    <p className="text-xs text-[var(--text-muted)]">Bulan Ini</p>
                </div>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                    type="text"
                    placeholder="Cari guru atau kelas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl"
                />
            </div>

            <div className="space-y-4">
                {MOCK_SUBS.map(sub => (
                    <div key={sub.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-[var(--text-primary)]">{sub.kelas}</span>
                                    <span className="text-[var(--text-muted)]">•</span>
                                    <span className="text-[var(--text-secondary)]">{sub.mapel}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <User size={14} className="text-[var(--text-muted)]" />
                                    <span className="text-[var(--text-muted)]">{sub.guruAsli}</span>
                                    <ArrowRight size={14} className="text-[var(--text-muted)]" />
                                    <span className="text-[var(--brand-primary)] font-medium">{sub.guruPengganti}</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1">{sub.tanggal} • {sub.alasan}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-lg ${sub.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'
                                }`}>{sub.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/jadwal" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/jadwal/perubahan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Log Perubahan</Link>
                <Link href="/jadwal/jadwal-guru" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Jadwal Guru</Link>
            </div>
        </div>
    );
}
