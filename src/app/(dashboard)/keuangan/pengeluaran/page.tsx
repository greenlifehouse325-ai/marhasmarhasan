/**
 * Pengeluaran (Expense) Page - Keuangan Module
 * SMK Marhas Admin Dashboard
 * 
 * Halaman pencatatan pengeluaran keuangan
 */

'use client';

import React, { useState } from 'react';
import {
    TrendingDown,
    Plus,
    Search,
    Download,
    Calendar,
    Building,
    Zap,
    Wrench,
    ShoppingCart,
    Users
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const MOCK_EXPENSES = [
    { id: 'EXP001', date: '2024-12-29', category: 'Gaji', description: 'Gaji guru bulan Desember', amount: 45000000, status: 'approved' },
    { id: 'EXP002', date: '2024-12-28', category: 'Listrik', description: 'Tagihan listrik PLN', amount: 3500000, status: 'approved' },
    { id: 'EXP003', date: '2024-12-27', category: 'Perawatan', description: 'Perbaikan AC ruang kelas', amount: 1200000, status: 'pending' },
    { id: 'EXP004', date: '2024-12-26', category: 'ATK', description: 'Pembelian alat tulis kantor', amount: 850000, status: 'approved' },
    { id: 'EXP005', date: '2024-12-25', category: 'Operasional', description: 'Kebutuhan operasional harian', amount: 500000, status: 'approved' },
];

const CATEGORIES = [
    { id: 'gaji', name: 'Gaji', icon: Users, color: '#3B82F6' },
    { id: 'listrik', name: 'Utilitas', icon: Zap, color: '#F59E0B' },
    { id: 'perawatan', name: 'Perawatan', icon: Wrench, color: '#10B981' },
    { id: 'atk', name: 'ATK', icon: ShoppingCart, color: '#8B5CF6' },
];

export default function PengeluaranPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const totalExpense = MOCK_EXPENSES.reduce((sum, item) => sum + item.amount, 0);
    const pendingCount = MOCK_EXPENSES.filter(e => e.status === 'pending').length;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Pengeluaran
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Catat dan kelola semua pengeluaran keuangan
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                    <Link
                        href="/keuangan/pengeluaran/create"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors"
                    >
                        <Plus size={16} />
                        Tambah Pengeluaran
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100 text-sm">Total Pengeluaran Bulan Ini</p>
                            <p className="text-3xl font-bold mt-1">
                                Rp {totalExpense.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                            <TrendingDown size={32} />
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[var(--text-muted)] text-sm">Menunggu Persetujuan</p>
                            <p className="text-3xl font-bold text-[var(--warning)] mt-1">
                                {pendingCount}
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--warning)]/10 flex items-center justify-center">
                            <Building size={32} className="text-[var(--warning)]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const total = MOCK_EXPENSES.filter(e => e.category.toLowerCase() === cat.id).reduce((sum, e) => sum + e.amount, 0);
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
                        placeholder="Cari pengeluaran..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
            </div>

            {/* Expense List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Kategori</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Deskripsi</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {MOCK_EXPENSES.map(item => (
                                <tr key={item.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-[var(--text-muted)]" />
                                            <span className="text-sm text-[var(--text-secondary)]">{item.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-lg">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{item.description}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-lg
                                            ${item.status === 'approved'
                                                ? 'bg-green-500/10 text-green-600'
                                                : 'bg-yellow-500/10 text-yellow-600'
                                            }
                                        `}>
                                            {item.status === 'approved' ? 'Disetujui' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="text-sm font-semibold text-red-500">
                                            -Rp {item.amount.toLocaleString('id-ID')}
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
