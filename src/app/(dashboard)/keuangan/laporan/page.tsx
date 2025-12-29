/**
 * Halaman Laporan Keuangan
 * SMK Marhas Admin Dashboard - Keuangan
 * 
 * Halaman untuk melihat ringkasan laporan keuangan
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    FileText,
    Download,
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    Calendar,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    BarChart3,
} from 'lucide-react';
import { MOCK_TRANSACTIONS } from '@/data/mock-spp';

export default function LaporanKeuanganPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
    const [selectedMonth, setSelectedMonth] = useState('12');
    const [selectedYear, setSelectedYear] = useState('2024');

    // Calculate totals
    const totalIncome = MOCK_TRANSACTIONS
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = MOCK_TRANSACTIONS
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Group by category
    const incomeByCategory = MOCK_TRANSACTIONS
        .filter(t => t.type === 'income')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    const expenseByCategory = MOCK_TRANSACTIONS
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/keuangan" className="hover:text-amber-600">Dashboard</Link>
                        <span>/</span>
                        <span>Laporan</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-colors">
                        <FileText size={16} />
                        Cetak Laporan
                    </button>
                </div>
            </div>

            {/* Period Selector */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Period Type */}
                    <div className="flex rounded-xl bg-gray-100 p-1">
                        {(['monthly', 'quarterly', 'yearly'] as const).map(period => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedPeriod === period
                                        ? 'bg-white text-amber-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {period === 'monthly' ? 'Bulanan' : period === 'quarterly' ? 'Triwulan' : 'Tahunan'}
                            </button>
                        ))}
                    </div>

                    {/* Month/Year Selector */}
                    <div className="flex gap-2">
                        {selectedPeriod === 'monthly' && (
                            <select
                                value={selectedMonth}
                                onChange={e => setSelectedMonth(e.target.value)}
                                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                            >
                                <option value="12">Desember</option>
                                <option value="11">November</option>
                                <option value="10">Oktober</option>
                            </select>
                        )}
                        <select
                            value={selectedYear}
                            onChange={e => setSelectedYear(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard
                    title="Total Pemasukan"
                    amount={totalIncome}
                    icon={<ArrowUpRight size={20} />}
                    trend={12.5}
                    color="#10B981"
                />
                <SummaryCard
                    title="Total Pengeluaran"
                    amount={totalExpense}
                    icon={<ArrowDownRight size={20} />}
                    trend={-5.2}
                    color="#EF4444"
                />
                <SummaryCard
                    title="Saldo"
                    amount={balance}
                    icon={<DollarSign size={20} />}
                    trend={8.3}
                    color="#3B82F6"
                    highlight
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Income by Category */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Pemasukan per Kategori</h2>
                        <PieChart size={20} className="text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {Object.entries(incomeByCategory).map(([category, amount]) => (
                            <CategoryBar
                                key={category}
                                category={category}
                                amount={amount}
                                total={totalIncome}
                                color="#10B981"
                            />
                        ))}
                    </div>
                </div>

                {/* Expense by Category */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Pengeluaran per Kategori</h2>
                        <BarChart3 size={20} className="text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {Object.entries(expenseByCategory).map(([category, amount]) => (
                            <CategoryBar
                                key={category}
                                category={category}
                                amount={amount}
                                total={totalExpense}
                                color="#EF4444"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Transaksi Terakhir</h2>
                    <Link href="/keuangan/transaksi" className="text-sm text-amber-600 hover:text-amber-700">
                        Lihat Semua
                    </Link>
                </div>
                <div className="space-y-3">
                    {MOCK_TRANSACTIONS.slice(0, 5).map(transaction => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                    {transaction.type === 'income' ? (
                                        <ArrowUpRight size={18} className="text-green-600" />
                                    ) : (
                                        <ArrowDownRight size={18} className="text-red-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                                    <p className="text-xs text-gray-500">{transaction.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString('id-ID')}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(transaction.date).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SummaryCard({
    title,
    amount,
    icon,
    trend,
    color,
    highlight = false,
}: {
    title: string;
    amount: number;
    icon: React.ReactNode;
    trend: number;
    color: string;
    highlight?: boolean;
}) {
    const isPositive = trend >= 0;

    return (
        <div className={`rounded-2xl p-6 shadow-sm ${highlight
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                : 'bg-white'
            }`}>
            <div className="flex items-center justify-between mb-4">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlight ? 'bg-white/20' : ''
                        }`}
                    style={!highlight ? { backgroundColor: `${color}15`, color } : {}}
                >
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${highlight
                        ? 'text-white/80'
                        : isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isPositive && '+'}{trend}%
                </div>
            </div>
            <p className={`text-sm ${highlight ? 'text-white/70' : 'text-gray-500'}`}>{title}</p>
            <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-white' : 'text-gray-800'}`}>
                Rp {amount.toLocaleString('id-ID')}
            </p>
        </div>
    );
}

function CategoryBar({
    category,
    amount,
    total,
    color,
}: {
    category: string;
    amount: number;
    total: number;
    color: string;
}) {
    const percentage = (amount / total) * 100;

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{category}</span>
                <span className="text-sm font-medium text-gray-800">
                    Rp {amount.toLocaleString('id-ID')}
                </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}
