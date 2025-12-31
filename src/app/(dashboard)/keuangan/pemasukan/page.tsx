/**
 * Pemasukan (Income) Page - Keuangan Module
 * SMK Marhas Admin Dashboard
 * 
 * Halaman pencatatan pemasukan keuangan
 */

'use client';

import React, { useState } from 'react';
import {
    TrendingUp,
    Plus,
    Search,
    Filter,
    Download,
    Calendar,
    Wallet,
    Users,
    BookOpen,
    ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const MOCK_INCOME = [
    { id: 'INC001', date: '2024-12-29', category: 'SPP', description: 'Pembayaran SPP Desember 2024', amount: 5000000, source: 'Transfer Bank' },
    { id: 'INC002', date: '2024-12-28', category: 'Denda', description: 'Denda keterlambatan buku', amount: 15000, source: 'Tunai' },
    { id: 'INC003', date: '2024-12-27', category: 'Registrasi', description: 'Biaya pendaftaran siswa baru', amount: 2500000, source: 'Transfer Bank' },
    { id: 'INC004', date: '2024-12-26', category: 'SPP', description: 'Pembayaran SPP November 2024', amount: 3500000, source: 'Transfer Bank' },
    { id: 'INC005', date: '2024-12-25', category: 'Kantin', description: 'Sewa kantin bulanan', amount: 1000000, source: 'Tunai' },
];

const CATEGORIES = [
    { id: 'spp', name: 'SPP', icon: Users, color: '#3B82F6' },
    { id: 'denda', name: 'Denda', icon: BookOpen, color: '#EF4444' },
    { id: 'registrasi', name: 'Registrasi', icon: Users, color: '#10B981' },
    { id: 'kantin', name: 'Kantin', icon: ShoppingBag, color: '#F59E0B' },
];

export default function PemasukanPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const totalIncome = MOCK_INCOME.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Pemasukan
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Catat dan kelola semua pemasukan keuangan
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                    <Link
                        href="/keuangan/pemasukan/create"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors"
                    >
                        <Plus size={16} />
                        Tambah Pemasukan
                    </Link>
                </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-green-100 text-sm">Total Pemasukan Bulan Ini</p>
                        <p className="text-3xl font-bold mt-1">
                            Rp {totalIncome.toLocaleString('id-ID')}
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                        <TrendingUp size={32} />
                    </div>
                </div>
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const total = MOCK_INCOME.filter(i => i.category.toLowerCase() === cat.id).reduce((sum, i) => sum + i.amount, 0);
                    return (
                        <div key={cat.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                                >
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--text-muted)]">{cat.name}</p>
                                    <p className="text-lg font-bold text-[var(--text-primary)]">
                                        Rp {total.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari pemasukan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
            </div>

            {/* Income List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Kategori</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Deskripsi</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Sumber</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {MOCK_INCOME.map(item => (
                                <tr key={item.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-[var(--text-muted)]" />
                                            <span className="text-sm text-[var(--text-secondary)]">{item.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-lg">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{item.description}</td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{item.source}</td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="text-sm font-semibold text-green-600">
                                            +Rp {item.amount.toLocaleString('id-ID')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
