/**
 * Keuangan Beasiswa Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { GraduationCap, Plus, Search, Users, Wallet, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const MOCK_BEASISWA = [
    { id: 'BS001', nama: 'Beasiswa Prestasi', penerima: 25, nominal: 1000000, status: 'active' },
    { id: 'BS002', nama: 'Beasiswa KIP', penerima: 50, nominal: 500000, status: 'active' },
    { id: 'BS003', nama: 'Beasiswa Yatim', penerima: 15, nominal: 750000, status: 'active' },
    { id: 'BS004', nama: 'Beasiswa Hafiz', penerima: 10, nominal: 1500000, status: 'inactive' },
];

const MOCK_RECIPIENTS = [
    { id: 'R001', nama: 'Ahmad Rizki', kelas: 'XII RPL 1', beasiswa: 'Prestasi', nominal: 1000000 },
    { id: 'R002', nama: 'Siti Nurhaliza', kelas: 'XI TKJ 1', beasiswa: 'KIP', nominal: 500000 },
    { id: 'R003', nama: 'Budi Santoso', kelas: 'X MM 1', beasiswa: 'Yatim', nominal: 750000 },
];

export default function BeasiswaPage() {
    const [activeTab, setActiveTab] = useState<'programs' | 'recipients'>('programs');
    const totalPenerima = MOCK_BEASISWA.reduce((sum, b) => sum + b.penerima, 0);

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/keuangan" className="hover:text-[var(--brand-primary)]">Keuangan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Beasiswa</span>
            </div>

            {/* Header - Responsive */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Beasiswa</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola program beasiswa siswa</p>
                </div>
                <Link href="/keuangan/beasiswa/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Program Baru
                </Link>
            </div>

            {/* Stats - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <GraduationCap size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_BEASISWA.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Program</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{totalPenerima}</p>
                    <p className="text-xs text-[var(--text-muted)]">Penerima</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Wallet size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">85.5M</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Dana</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <CheckCircle size={18} className="text-orange-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">3</p>
                    <p className="text-xs text-[var(--text-muted)]">Aktif</p>
                </div>
            </div>

            {/* Tabs - Responsive */}
            <div className="flex gap-2 border-b border-[var(--border-light)] pb-2 overflow-x-auto">
                <button onClick={() => setActiveTab('programs')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'programs' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--text-secondary)]'}`}>
                    Program Beasiswa
                </button>
                <button onClick={() => setActiveTab('recipients')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'recipients' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--text-secondary)]'}`}>
                    Penerima
                </button>
            </div>

            {activeTab === 'programs' ? (
                /* Programs Grid - Responsive */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_BEASISWA.map(b => (
                        <div key={b.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <GraduationCap size={20} className="text-blue-500" />
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-lg ${b.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'}`}>
                                    {b.status}
                                </span>
                            </div>
                            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{b.nama}</h3>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--text-muted)]">{b.penerima} penerima</span>
                                <span className="font-medium text-[var(--brand-primary)]">Rp {(b.nominal / 1000)}K/bln</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Recipients - Mobile Cards & Desktop Table */
                <>
                    <div className="block lg:hidden space-y-3">
                        {MOCK_RECIPIENTS.map(r => (
                            <div key={r.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-[var(--text-primary)]">{r.nama}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{r.kelas}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[var(--text-muted)]">{r.beasiswa}</p>
                                        <p className="font-medium text-[var(--brand-primary)]">Rp {r.nominal.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[var(--bg-hover)]">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Siswa</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kelas</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Program</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Nominal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-light)]">
                                {MOCK_RECIPIENTS.map(r => (
                                    <tr key={r.id} className="hover:bg-[var(--bg-hover)]">
                                        <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{r.nama}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{r.kelas}</td>
                                        <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs rounded-lg">{r.beasiswa}</span></td>
                                        <td className="px-4 py-3 font-medium text-[var(--text-primary)]">Rp {r.nominal.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Navigation */}
            <div className="flex flex-wrap gap-2">
                <Link href="/keuangan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/keuangan/spp" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">SPP</Link>
                <Link href="/keuangan/invoice" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Invoice</Link>
            </div>
        </div>
    );
}
