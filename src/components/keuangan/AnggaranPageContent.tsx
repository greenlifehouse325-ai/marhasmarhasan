/**
 * Keuangan Anggaran Page Content (Client Component)
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { PieChart, Plus, Search, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Link from 'next/link';

const MOCK_BUDGET = [
    { id: 1, kategori: 'Gaji Guru', anggaran: 500000000, terpakai: 450000000, sisa: 50000000 },
    { id: 2, kategori: 'Operasional', anggaran: 100000000, terpakai: 75000000, sisa: 25000000 },
    { id: 3, kategori: 'Pemeliharaan', anggaran: 50000000, terpakai: 35000000, sisa: 15000000 },
    { id: 4, kategori: 'Pengadaan', anggaran: 75000000, terpakai: 60000000, sisa: 15000000 },
    { id: 5, kategori: 'Kegiatan Siswa', anggaran: 30000000, terpakai: 20000000, sisa: 10000000 },
];

export default function AnggaranPageContent() {
    const totalAnggaran = MOCK_BUDGET.reduce((s, b) => s + b.anggaran, 0);
    const totalTerpakai = MOCK_BUDGET.reduce((s, b) => s + b.terpakai, 0);
    const totalSisa = MOCK_BUDGET.reduce((s, b) => s + b.sisa, 0);
    const persen = Math.round((totalTerpakai / totalAnggaran) * 100);

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/keuangan" className="hover:text-[var(--brand-primary)]">Keuangan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Anggaran</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Anggaran</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola anggaran sekolah</p>
                </div>
                <Link href="/keuangan/anggaran/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Tambah Anggaran
                </Link>
            </div>

            {/* Stats - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Wallet size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-sm sm:text-lg font-bold text-[var(--text-primary)]">{(totalAnggaran / 1000000).toFixed(0)}M</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Anggaran</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <TrendingDown size={18} className="text-red-500 mb-1 sm:mb-2" />
                    <p className="text-sm sm:text-lg font-bold text-[var(--text-primary)]">{(totalTerpakai / 1000000).toFixed(0)}M</p>
                    <p className="text-xs text-[var(--text-muted)]">Terpakai</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <TrendingUp size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-sm sm:text-lg font-bold text-[var(--text-primary)]">{(totalSisa / 1000000).toFixed(0)}M</p>
                    <p className="text-xs text-[var(--text-muted)]">Sisa</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 sm:p-4 text-white">
                    <PieChart size={18} className="mb-1 sm:mb-2" />
                    <p className="text-2xl font-bold">{persen}%</p>
                    <p className="text-xs text-blue-100">Realisasi</p>
                </div>
            </div>

            {/* Budget Cards - Mobile */}
            <div className="block lg:hidden space-y-3">
                {MOCK_BUDGET.map(b => {
                    const pct = Math.round((b.terpakai / b.anggaran) * 100);
                    return (
                        <div key={b.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-[var(--text-primary)]">{b.kategori}</h3>
                                <span className={`px-2 py-1 text-xs rounded-lg ${pct >= 90 ? 'bg-red-500/10 text-red-500' : pct >= 70 ? 'bg-yellow-500/10 text-yellow-600' : 'bg-green-500/10 text-green-600'}`}>
                                    {pct}%
                                </span>
                            </div>
                            <div className="h-2 bg-[var(--bg-hover)] rounded-full mb-2">
                                <div className={`h-full rounded-full ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-[var(--text-muted)]">
                                <span>Rp {(b.terpakai / 1000000).toFixed(0)}M / {(b.anggaran / 1000000).toFixed(0)}M</span>
                                <span>Sisa: Rp {(b.sisa / 1000000).toFixed(0)}M</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Budget Table - Desktop */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kategori</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)]">Anggaran</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)]">Terpakai</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)]">Sisa</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_BUDGET.map(b => {
                            const pct = Math.round((b.terpakai / b.anggaran) * 100);
                            return (
                                <tr key={b.id} className="hover:bg-[var(--bg-hover)]">
                                    <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{b.kategori}</td>
                                    <td className="px-4 py-3 text-right text-sm">Rp {b.anggaran.toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3 text-right text-sm text-red-500">Rp {b.terpakai.toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3 text-right text-sm text-green-600">Rp {b.sisa.toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-[var(--bg-hover)] rounded-full">
                                                <div className={`h-full rounded-full ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className="text-xs text-[var(--text-muted)] w-10">{pct}%</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/keuangan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/keuangan/laporan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Laporan</Link>
                <Link href="/keuangan/pemasukan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Pemasukan</Link>
                <Link href="/keuangan/pengeluaran" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Pengeluaran</Link>
            </div>
        </div>
    );
}
