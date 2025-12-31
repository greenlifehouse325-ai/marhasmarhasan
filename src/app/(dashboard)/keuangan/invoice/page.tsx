/**
 * Keuangan Invoice Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, Download, Eye, Printer, Send } from 'lucide-react';
import Link from 'next/link';

const MOCK_INVOICES = [
    { id: 'INV-2024-001', siswa: 'Ahmad Rizki', kelas: 'XII RPL 1', jenis: 'SPP', bulan: 'Desember', jumlah: 500000, status: 'paid', tanggal: '2024-12-15' },
    { id: 'INV-2024-002', siswa: 'Siti Nurhaliza', kelas: 'XI TKJ 1', jenis: 'SPP', bulan: 'Desember', jumlah: 500000, status: 'pending', tanggal: '2024-12-20' },
    { id: 'INV-2024-003', siswa: 'Budi Santoso', kelas: 'X MM 1', jenis: 'Registrasi', bulan: '-', jumlah: 2500000, status: 'overdue', tanggal: '2024-12-01' },
];

export default function InvoicePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/keuangan" className="hover:text-[var(--brand-primary)]">Keuangan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Invoice</span>
            </div>

            {/* Header - Responsive */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Invoice</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola invoice pembayaran</p>
                </div>
                <Link href="/keuangan/invoice/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Buat Invoice
                </Link>
            </div>

            {/* Stats - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <FileText size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">45</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Invoice</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <FileText size={18} className="text-yellow-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">12</p>
                    <p className="text-xs text-[var(--text-muted)]">Pending</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <FileText size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">30</p>
                    <p className="text-xs text-[var(--text-muted)]">Paid</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <FileText size={18} className="text-red-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">3</p>
                    <p className="text-xs text-[var(--text-muted)]">Overdue</p>
                </div>
            </div>

            {/* Filters - Responsive */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari invoice..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] text-sm" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {['all', 'pending', 'paid', 'overdue'].map(status => (
                        <button key={status} onClick={() => setStatusFilter(status)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors
                                ${statusFilter === status ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'}`}>
                            {status === 'all' ? 'Semua' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Invoice Cards - Mobile View */}
            <div className="block lg:hidden space-y-3">
                {MOCK_INVOICES.map(inv => (
                    <div key={inv.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="font-mono text-xs text-[var(--text-muted)]">{inv.id}</p>
                                <p className="font-semibold text-[var(--text-primary)]">{inv.siswa}</p>
                                <p className="text-xs text-[var(--text-muted)]">{inv.kelas}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-lg ${inv.status === 'paid' ? 'bg-green-500/10 text-green-600' :
                                    inv.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                                        'bg-red-500/10 text-red-500'
                                }`}>{inv.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[var(--text-muted)]">{inv.jenis} - {inv.bulan}</p>
                                <p className="font-semibold text-[var(--brand-primary)]">Rp {inv.jumlah.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg"><Eye size={16} className="text-[var(--text-muted)]" /></button>
                                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg"><Printer size={16} className="text-[var(--text-muted)]" /></button>
                                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg"><Send size={16} className="text-[var(--text-muted)]" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Invoice Table - Desktop View */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--bg-hover)]">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Invoice</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Siswa</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jenis</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jumlah</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {MOCK_INVOICES.map(inv => (
                                <tr key={inv.id} className="hover:bg-[var(--bg-hover)]">
                                    <td className="px-4 py-3 font-mono text-sm text-[var(--text-muted)]">{inv.id}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-[var(--text-primary)]">{inv.siswa}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{inv.kelas}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{inv.jenis}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-[var(--text-primary)]">Rp {inv.jumlah.toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-lg ${inv.status === 'paid' ? 'bg-green-500/10 text-green-600' :
                                                inv.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                                                    'bg-red-500/10 text-red-500'
                                            }`}>{inv.status}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-1">
                                            <button className="p-1.5 hover:bg-[var(--bg-active)] rounded-lg"><Eye size={14} className="text-[var(--text-muted)]" /></button>
                                            <button className="p-1.5 hover:bg-[var(--bg-active)] rounded-lg"><Printer size={14} className="text-[var(--text-muted)]" /></button>
                                            <button className="p-1.5 hover:bg-[var(--bg-active)] rounded-lg"><Send size={14} className="text-[var(--text-muted)]" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Navigation - Responsive */}
            <div className="flex flex-wrap gap-2">
                <Link href="/keuangan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">← Dashboard</Link>
                <Link href="/keuangan/spp" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">SPP</Link>
                <Link href="/keuangan/transaksi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">Transaksi</Link>
                <Link href="/keuangan/laporan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">Laporan</Link>
            </div>
        </div>
    );
}
