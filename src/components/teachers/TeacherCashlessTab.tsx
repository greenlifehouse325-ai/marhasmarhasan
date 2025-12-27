'use client';

import React from 'react';
import { Wallet, Coffee, ShoppingBag, Utensils, AlertCircle } from 'lucide-react';

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
}

interface TeacherCashlessTabProps {
    balance: number;
    monthlySpent: number;
    transactions: Transaction[];
    cashlessEnabled: boolean;
    spendingLimit: number;
    onToggleCashless: (enabled: boolean) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
    food: <Utensils size={16} className="text-orange-500" />,
    drink: <Coffee size={16} className="text-brown-500" />,
    supplies: <ShoppingBag size={16} className="text-blue-500" />,
    other: <Wallet size={16} className="text-gray-500" />,
};

export default function TeacherCashlessTab({
    balance,
    monthlySpent,
    transactions,
    cashlessEnabled,
    spendingLimit,
    onToggleCashless
}: TeacherCashlessTabProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const spendingPercentage = Math.min((monthlySpent / spendingLimit) * 100, 100);

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Balance & Spending */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <Wallet size={18} className="text-[var(--primary-blue)]" />
                    Cashless Overview
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    {/* Current Balance */}
                    <div className="p-5 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white">
                        <p className="text-sm opacity-80 mb-1">Current Balance</p>
                        <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
                    </div>

                    {/* Monthly Spent */}
                    <div className="p-5 bg-gray-50 rounded-xl">
                        <p className="text-sm text-[var(--text-grey)] mb-1">Monthly Spent</p>
                        <p className="text-2xl font-bold text-[var(--text-dark)]">{formatCurrency(monthlySpent)}</p>
                        <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-[var(--text-grey)]">Limit: {formatCurrency(spendingLimit)}</span>
                                <span className="font-medium">{spendingPercentage.toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${spendingPercentage >= 90 ? 'bg-red-500' : spendingPercentage >= 70 ? 'bg-orange-500' : 'bg-teal-500'}`}
                                    style={{ width: `${spendingPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Access Control */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Access Control</h3>

                <div className={`p-4 rounded-xl mb-4 ${cashlessEnabled ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={18} className={cashlessEnabled ? 'text-green-500' : 'text-red-500'} />
                        <span className={`text-sm font-medium ${cashlessEnabled ? 'text-green-700' : 'text-red-700'}`}>
                            {cashlessEnabled ? 'Cashless Active' : 'Cashless Disabled'}
                        </span>
                    </div>
                    <p className="text-xs text-[var(--text-grey)]">
                        {cashlessEnabled
                            ? 'Teacher can use cashless for transactions.'
                            : 'Cashless access is currently disabled.'}
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-dark)]">Enable Cashless</span>
                    <button
                        onClick={() => onToggleCashless(!cashlessEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${cashlessEnabled ? 'bg-teal-500' : 'bg-gray-300'
                            }`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${cashlessEnabled ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                    </button>
                </div>
            </div>

            {/* Transaction History */}
            <div className="card col-span-3">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Transaction History</h3>
                <div className="space-y-3">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    {categoryIcons[transaction.category] || categoryIcons.other}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{transaction.description}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{transaction.date}</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-red-500">
                                -{formatCurrency(transaction.amount)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
