/**
 * Kelas List Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Search, Plus, Users, GraduationCap, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const MOCK_KELAS = [
    { id: 'K001', name: 'X RPL 1', jurusan: 'RPL', waliKelas: 'Ahmad Suryadi', jumlahSiswa: 36, tahunAjaran: '2024/2025' },
    { id: 'K002', name: 'X RPL 2', jurusan: 'RPL', waliKelas: 'Siti Rahayu', jumlahSiswa: 34, tahunAjaran: '2024/2025' },
    { id: 'K003', name: 'X TKJ 1', jurusan: 'TKJ', waliKelas: 'Budi Santoso', jumlahSiswa: 35, tahunAjaran: '2024/2025' },
    { id: 'K004', name: 'XI RPL 1', jurusan: 'RPL', waliKelas: 'Maya Lestari', jumlahSiswa: 32, tahunAjaran: '2024/2025' },
    { id: 'K005', name: 'XII RPL 1', jurusan: 'RPL', waliKelas: 'Andi Wijaya', jumlahSiswa: 30, tahunAjaran: '2024/2025' },
];

export default function KelasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [jurusanFilter, setJurusanFilter] = useState('all');

    const filteredKelas = MOCK_KELAS.filter(kelas => {
        const matchesSearch = kelas.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesJurusan = jurusanFilter === 'all' || kelas.jurusan === jurusanFilter;
        return matchesSearch && matchesJurusan;
    });

    const totalSiswa = MOCK_KELAS.reduce((acc, k) => acc + k.jumlahSiswa, 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Data Kelas</h1>
                    <p className="text-[var(--text-muted)]">Kelola kelas dan pembagian siswa</p>
                </div>
                <Link href="/kelas/create" className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium transition-colors">
                    <Plus size={16} />
                    Tambah Kelas
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_KELAS.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Kelas</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-blue-600">{totalSiswa}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Siswa</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">{Math.round(totalSiswa / MOCK_KELAS.length)}</p>
                    <p className="text-sm text-[var(--text-muted)]">Rata-rata/Kelas</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-purple-600">4</p>
                    <p className="text-sm text-[var(--text-muted)]">Jurusan</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari kelas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                </div>
                <select value={jurusanFilter} onChange={(e) => setJurusanFilter(e.target.value)} className="px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]">
                    <option value="all">Semua Jurusan</option>
                    <option value="RPL">RPL</option>
                    <option value="TKJ">TKJ</option>
                    <option value="MM">MM</option>
                    <option value="AKL">AKL</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredKelas.map(kelas => (
                    <div key={kelas.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{kelas.name}</h3>
                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-600">{kelas.jurusan}</span>
                            </div>
                            <div className="flex gap-1">
                                <Link href={`/kelas/${kelas.id}`} className="p-2 hover:bg-[var(--bg-hover)] rounded-lg"><Eye size={16} className="text-[var(--text-muted)]" /></Link>
                                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg"><Edit size={16} className="text-[var(--text-muted)]" /></button>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Wali Kelas</span>
                                <span className="text-[var(--text-primary)]">{kelas.waliKelas}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Jumlah Siswa</span>
                                <span className="font-medium text-[var(--text-primary)]">{kelas.jumlahSiswa}</span>
                            </div>
                        </div>
                        <Link href={`/kelas/${kelas.id}/siswa`} className="block mt-4 text-center py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg text-sm text-[var(--brand-primary)] font-medium">
                            Lihat Daftar Siswa
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
