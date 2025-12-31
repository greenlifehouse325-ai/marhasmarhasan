/**
 * Keuangan Denda Perpustakaan Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { BookOpen, Search, DollarSign, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const MOCK_DENDA = [
    { id: 1, siswa: 'Ahmad Rizki', nis: '12345', kelas: 'XII RPL 1', buku: 'Pemrograman Web', jumlah: 15000, status: 'unpaid', tanggal: '2024-12-20' },
    { id: 2, siswa: 'Siti Nurhaliza', nis: '12346', kelas: 'XI TKJ 1', buku: 'Jaringan Komputer', jumlah: 10000, status: 'paid', tanggal: '2024-12-18' },
    { id: 3, siswa: 'Budi Santoso', nis: '12347', kelas: 'X MM 1', buku: 'Desain Grafis', jumlah: 25000, status: 'unpaid', tanggal: '2024-12-15' },
];

export default function DendaPerpusPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const totalDenda = MOCK_DENDA.reduce((s, d) => s + d.jumlah, 0);
    const totalBelumBayar = MOCK_DENDA.filter(d => d.status === 'unpaid').reduce((s, d) => s + d.jumlah, 0);

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/keuangan" className="hover:text-[var(--brand-primary)]">Keuangan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Denda Perpustakaan</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Denda Perpustakaan</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola pembayaran denda keterlambatan buku</p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <DollarSign size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">Rp {(totalDenda / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Denda</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <AlertCircle size={18} className="text-red-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">Rp {(totalBelumBayar / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-[var(--text-muted)]">Belum Bayar</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_DENDA.filter(d => d.status === 'unpaid').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Siswa Belum Bayar</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <CheckCircle size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_DENDA.filter(d => d.status === 'paid').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Sudah Lunas</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari siswa atau buku..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                </div>
                <div className="flex gap-2">
                    {['all', 'unpaid', 'paid'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium ${statusFilter === s ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'}`}>
                            {s === 'all' ? 'Semua' : s === 'unpaid' ? 'Belum Bayar' : 'Lunas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_DENDA.map(d => (
                    <div key={d.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{d.siswa}</p>
                                <p className="text-xs text-[var(--text-muted)]">NIS: {d.nis} • {d.kelas}</p>
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded ${d.status === 'paid' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                                {d.status === 'paid' ? 'Lunas' : 'Belum Bayar'}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]"><BookOpen size={12} className="inline mr-1" /> {d.buku}</p>
                        <div className="flex items-center justify-between mt-3">
                            <p className="font-bold text-[var(--brand-primary)]">Rp {d.jumlah.toLocaleString('id-ID')}</p>
                            {d.status === 'unpaid' && (
                                <button className="px-3 py-1 bg-[var(--brand-primary)] text-white rounded text-xs">Bayar</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Siswa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Buku</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Tanggal</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)]">Jumlah</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_DENDA.map(d => (
                            <tr key={d.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-[var(--text-primary)]">{d.siswa}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{d.nis} • {d.kelas}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{d.buku}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{d.tanggal}</td>
                                <td className="px-4 py-3 text-right font-medium text-[var(--text-primary)]">Rp {d.jumlah.toLocaleString('id-ID')}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 text-xs rounded ${d.status === 'paid' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                                        {d.status === 'paid' ? 'Lunas' : 'Belum Bayar'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {d.status === 'unpaid' && (
                                        <button className="px-3 py-1 bg-[var(--brand-primary)] text-white rounded text-xs">Bayar</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/keuangan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/keuangan/spp" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">SPP</Link>
                <Link href="/keuangan/pemasukan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Pemasukan</Link>
                <Link href="/keuangan/laporan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Laporan</Link>
            </div>
        </div>
    );
}
