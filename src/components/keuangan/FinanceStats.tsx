/**
 * Finance Stats Component
 * SMK Marhas Admin Dashboard - Keuangan
 * 
 * Widget statistik untuk keuangan
 */

'use client';

import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Wallet } from 'lucide-react';

interface FinanceStatsProps {
    totalIncome: number;
    totalExpense: number;
    pendingPayments: number;
    overduePayments: number;
    monthlyChange?: {
        income: number;
        expense: number;
    };
}

export function FinanceStats({
    totalIncome,
    totalExpense,
    pendingPayments,
    overduePayments,
    monthlyChange,
}: FinanceStatsProps) {
    const balance = totalIncome - totalExpense;

    const stats = [
        {
            label: 'Total Pemasukan',
            value: `Rp ${totalIncome.toLocaleString()}`,
            icon: <TrendingUp size={20} />,
            color: '#10B981',
            change: monthlyChange?.income,
        },
        {
            label: 'Total Pengeluaran',
            value: `Rp ${totalExpense.toLocaleString()}`,
            icon: <TrendingDown size={20} />,
            color: '#EF4444',
            change: monthlyChange?.expense,
        },
        {
            label: 'Menunggu Verifikasi',
            value: pendingPayments.toString(),
            icon: <AlertCircle size={20} />,
            color: '#F59E0B',
        },
        {
            label: 'Pembayaran Terlambat',
            value: overduePayments.toString(),
            icon: <AlertCircle size={20} />,
            color: overduePayments > 0 ? '#EF4444' : '#10B981',
            isWarning: overduePayments > 0,
        },
    ];

    return (
        <div className="space-y-4">
            {/* Balance Card */}
            <div className={`rounded-2xl p-6 text-white ${balance >= 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-red-400 to-red-600'}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="opacity-80">Saldo Bersih</p>
                        <p className="text-3xl font-bold mt-1">Rp {balance.toLocaleString()}</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                        <Wallet size={28} />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                            >
                                {stat.icon}
                            </div>
                            {stat.change !== undefined && stat.change !== 0 && (
                                <div className={`flex items-center gap-1 text-xs font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                                </div>
                            )}
                        </div>
                        <p className="mt-3 text-lg font-bold text-gray-800">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FinanceStats;
