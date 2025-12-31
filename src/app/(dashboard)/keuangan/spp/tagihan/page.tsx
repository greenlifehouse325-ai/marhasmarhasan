/**
 * Keuangan SPP Tagihan Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Receipt, Search, Plus, Download, DollarSign, Users, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const MOCK_TAGIHAN = [
    { id: 1, siswa: 'Ahmad Rizki', nis: '12345', kelas: 'XII RPL 1', bulan: 'Desember 2024', jumlah: 500000, status: 'unpaid', jatuhTempo: '2024-12-10' },
    { id: 2, siswa: 'Siti Nurhaliza', nis: '12346', kelas: 'XI TKJ 1', bulan: 'Desember 2024', jumlah: 500000, status: 'paid', jatuhTempo: '2024-12-10' },
    { id: 3, siswa: 'Budi Santoso', nis: '12347', kelas: 'X MM 1', bulan: 'Desember 2024', jumlah: 500000, status: 'overdue', jatuhTempo: '2024-12-10' },
    { id: 4, siswa: 'Ahmad Rizki', nis: '12345', kelas: 'XII RPL 1', bulan: 'November 2024', jumlah: 500000, status: 'paid', jatuhTempo: '2024-11-10' },
];

export default function TagihanSppPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const totalTagihan = MOCK_TAGIHAN.reduce((s, t) => s + t.jumlah, 0);
    const totalBelumBayar = MOCK_TAGIHAN.filter(t => t.status !== 'paid').reduce((s, t) => s + t.jumlah, 0);

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/keuangan" className="hover:text-[var(--brand-primary)]">Keuangan</Link>
                <span>/</span>
                <Link href="/keuangan/spp" className="hover:text-[var(--brand-primary)]">SPP</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Tagihan</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Tagihan SPP</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola tagihan SPP siswa</p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] rounded-xl text-sm">
                        <Download size={16} /> Export
                    </button>
                    <Link href="/keuangan/spp/tagihan/create" className="flex items-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                        <Plus size={16} /> Buat Tagihan
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Receipt size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_TAGIHAN.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Tagihan</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <DollarSign size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">Rp {(totalTagihan / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Nominal</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <AlertCircle size={18} className="text-red-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">Rp {(totalBelumBayar / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-[var(--text-muted)]">Belum Bayar</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_TAGIHAN.filter(t => t.status === 'overdue').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Jatuh Tempo</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari siswa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {['all', 'unpaid', 'paid', 'overdue'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap ${statusFilter === s ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'}`}>
                            {s === 'all' ? 'Semua' : s === 'unpaid' ? 'Belum Bayar' : s === 'paid' ? 'Lunas' : 'Jatuh Tempo'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_TAGIHAN.map(t => (
                    <div key={t.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{t.siswa}</p>
                                <p className="text-xs text-[var(--text-muted)]">NIS: {t.nis} • {t.kelas}</p>
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded ${t.status === 'paid' ? 'bg-green-500/10 text-green-600' : t.status === 'overdue' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-600'}`}>
                                {t.status === 'paid' ? 'Lunas' : t.status === 'overdue' ? 'Jatuh Tempo' : 'Belum Bayar'}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{t.bulan} • Jatuh Tempo: {t.jatuhTempo}</p>
                        <div className="flex items-center justify-between mt-3">
                            <p className="font-bold text-[var(--brand-primary)]">Rp {t.jumlah.toLocaleString('id-ID')}</p>
                            {t.status !== 'paid' && (
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
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Bulan</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jatuh Tempo</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)]">Jumlah</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_TAGIHAN.map(t => (
                            <tr key={t.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-[var(--text-primary)]">{t.siswa}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{t.nis} • {t.kelas}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{t.bulan}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{t.jatuhTempo}</td>
                                <td className="px-4 py-3 text-right font-medium text-[var(--text-primary)]">Rp {t.jumlah.toLocaleString('id-ID')}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 text-xs rounded ${t.status === 'paid' ? 'bg-green-500/10 text-green-600' : t.status === 'overdue' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-600'}`}>
                                        {t.status === 'paid' ? 'Lunas' : t.status === 'overdue' ? 'Jatuh Tempo' : 'Belum Bayar'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {t.status !== 'paid' && (
                                        <button className="px-3 py-1 bg-[var(--brand-primary)] text-white rounded text-xs">Bayar</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/keuangan/spp" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← SPP</Link>
                <Link href="/keuangan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Dashboard</Link>
                <Link href="/keuangan/laporan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Laporan</Link>
            </div>
        </div>
    );
}
