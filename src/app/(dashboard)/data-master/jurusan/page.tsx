/**
 * Data Master Jurusan Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Building, Plus, Search, Edit, Trash2, Users } from 'lucide-react';
import Link from 'next/link';

const MOCK_JURUSAN = [
    { id: 1, nama: 'Rekayasa Perangkat Lunak', kode: 'RPL', kaprodi: 'Pak Budi Santoso', kelas: 8, siswa: 280 },
    { id: 2, nama: 'Teknik Komputer Jaringan', kode: 'TKJ', kaprodi: 'Bu Siti Aminah', kelas: 6, siswa: 210 },
    { id: 3, nama: 'Multimedia', kode: 'MM', kaprodi: 'Pak Ahmad Rizki', kelas: 6, siswa: 198 },
];

export default function DataJurusanPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/data-master" className="hover:text-[var(--brand-primary)]">Data Master</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Jurusan</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Data Jurusan</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola data jurusan/kompetensi keahlian</p>
                </div>
                <Link href="/data-master/jurusan/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Tambah Jurusan
                </Link>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" placeholder="Cari jurusan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_JURUSAN.map(j => (
                    <div key={j.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Building size={24} className="text-blue-500" />
                            </div>
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-medium rounded">{j.kode}</span>
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)] text-sm">{j.nama}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">Kaprodi: {j.kaprodi}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                            <span>{j.kelas} kelas</span>
                            <span>{j.siswa} siswa</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="flex-1 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs hover:bg-[var(--bg-active)]">
                                <Edit size={12} className="inline mr-1" /> Edit
                            </button>
                            <button className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20">
                                <Trash2 size={14} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/data-master" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/data-master/kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Kelas</Link>
                <Link href="/data-master/mapel" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Mata Pelajaran</Link>
                <Link href="/data-master/tahun-ajaran" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Tahun Ajaran</Link>
            </div>
        </div>
    );
}
