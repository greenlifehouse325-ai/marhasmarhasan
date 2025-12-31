/**
 * Data Master Mata Pelajaran Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const MOCK_MAPEL = [
    { id: 1, nama: 'Matematika', kode: 'MTK', kelompok: 'Umum', jam: 4, guru: 5 },
    { id: 2, nama: 'Bahasa Indonesia', kode: 'BIN', kelompok: 'Umum', jam: 4, guru: 4 },
    { id: 3, nama: 'Bahasa Inggris', kode: 'BIG', kelompok: 'Umum', jam: 4, guru: 3 },
    { id: 4, nama: 'Pemrograman Dasar', kode: 'PD', kelompok: 'Produktif', jam: 8, guru: 4 },
    { id: 5, nama: 'Basis Data', kode: 'BD', kelompok: 'Produktif', jam: 6, guru: 3 },
    { id: 6, nama: 'Desain Grafis', kode: 'DG', kelompok: 'Produktif', jam: 6, guru: 2 },
];

export default function DataMapelPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [kelompokFilter, setKelompokFilter] = useState('all');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/data-master" className="hover:text-[var(--brand-primary)]">Data Master</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Mata Pelajaran</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Mata Pelajaran</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola data mata pelajaran</p>
                </div>
                <Link href="/data-master/mapel/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Tambah Mapel
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <BookOpen size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_MAPEL.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Mapel</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_MAPEL.filter(m => m.kelompok === 'Umum').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Umum</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_MAPEL.filter(m => m.kelompok === 'Produktif').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Produktif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_MAPEL.reduce((s, m) => s + m.guru, 0)}</p>
                    <p className="text-xs text-[var(--text-muted)]">Guru Pengampu</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari mata pelajaran..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                </div>
                <div className="flex gap-2">
                    {['all', 'Umum', 'Produktif'].map(k => (
                        <button key={k} onClick={() => setKelompokFilter(k)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium ${kelompokFilter === k ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'}`}>
                            {k === 'all' ? 'Semua' : k}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_MAPEL.map(m => (
                    <div key={m.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{m.nama}</p>
                                <p className="text-xs text-[var(--text-muted)]">Kode: {m.kode}</p>
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded ${m.kelompok === 'Produktif' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                {m.kelompok}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                            <span>{m.jam} jam | {m.guru} guru</span>
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-[var(--bg-hover)] rounded"><Edit size={12} /></button>
                                <button className="p-1.5 hover:bg-red-500/10 rounded"><Trash2 size={12} className="text-red-500" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Mata Pelajaran</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kode</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kelompok</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jam/Minggu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Guru</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_MAPEL.map(m => (
                            <tr key={m.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{m.nama}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{m.kode}</td>
                                <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded ${m.kelompok === 'Produktif' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>{m.kelompok}</span></td>
                                <td className="px-4 py-3 text-sm">{m.jam} jam</td>
                                <td className="px-4 py-3 text-sm">{m.guru}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-1">
                                        <button className="p-1.5 hover:bg-[var(--bg-active)] rounded-lg"><Edit size={14} /></button>
                                        <button className="p-1.5 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/data-master" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/data-master/kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Kelas</Link>
                <Link href="/data-master/jurusan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Jurusan</Link>
                <Link href="/data-master/tahun-ajaran" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Tahun Ajaran</Link>
            </div>
        </div>
    );
}
