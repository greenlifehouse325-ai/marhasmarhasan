/**
 * Halaman Transaksi
 * SMK Marhas Admin Dashboard - Keuangan
 * 
 * Halaman untuk mengelola semua transaksi masuk dan keluar
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Eye,
    Edit,
    Trash2,
    DollarSign,
} from 'lucide-react';
import { MOCK_TRANSACTIONS } from '@/data/mock-spp';
import type { Transaction } from '@/types/keuangan';

const TYPE_LABELS = {
    income: { label: 'Pemasukan', color: 'bg-green-100 text-green-700', icon: <ArrowUpRight size={14} /> },
    expense: { label: 'Pengeluaran', color: 'bg-red-100 text-red-700', icon: <ArrowDownRight size={14} /> },
};

export default function TransaksiPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedMonth, setSelectedMonth] = useState('12');

    const filteredTransactions = MOCK_TRANSACTIONS.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || t.type === selectedType;
        return matchesSearch && matchesType;
    });

    // Totals
    const totalIncome = MOCK_TRANSACTIONS.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = MOCK_TRANSACTIONS.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/keuangan" className="hover:text-amber-600">Dashboard</Link>
                        <span>/</span>
                        <span>Transaksi</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Transaksi Keuangan</h1>
                </div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                    <Link
                        href="/keuangan/transaksi/create"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-colors"
                    >
                        <Plus size={16} />
                        Catat Transaksi
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Pemasukan</p>
                            <p className="text-2xl font-bold text-green-600">Rp {totalIncome.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <ArrowUpRight size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Pengeluaran</p>
                            <p className="text-2xl font-bold text-red-600">Rp {totalExpense.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <ArrowDownRight size={24} className="text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 shadow-sm text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-amber-100">Saldo</p>
                            <p className="text-2xl font-bold">Rp {balance.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari transaksi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex rounded-xl bg-gray-100 p-1">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedType === 'all' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setSelectedType('income')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedType === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Masuk
                            </button>
                            <button
                                onClick={() => setSelectedType('expense')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedType === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Keluar
                            </button>
                        </div>

                        <select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        >
                            <option value="12">Desember 2024</option>
                            <option value="11">November 2024</option>
                            <option value="10">Oktober 2024</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm text-gray-500">
                                <th className="px-6 py-4 font-medium">Tanggal</th>
                                <th className="px-6 py-4 font-medium">Deskripsi</th>
                                <th className="px-6 py-4 font-medium">Kategori</th>
                                <th className="px-6 py-4 font-medium">Tipe</th>
                                <th className="px-6 py-4 font-medium text-right">Nominal</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTransactions.map(transaction => (
                                <TransactionRow key={transaction.id} transaction={transaction} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
    const typeStyle = TYPE_LABELS[transaction.type];

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
            </td>
            <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                {transaction.reference && (
                    <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>
                )}
            </td>
            <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    {transaction.category}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${typeStyle.color}`}>
                    {typeStyle.icon}
                    {typeStyle.label}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString()}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
