'use client';

import React, { useState } from 'react';
import { CreditCard, Check, AlertCircle, Calendar } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface Payment {
    id: string;
    description: string;
    amount: number;
    date: string;
    method: string;
    status: 'paid' | 'pending';
}

interface PaymentsTabProps {
    tuitionStatus: {
        period: string;
        amount: number;
        dueDate: string;
        status: 'paid' | 'due' | 'overdue';
    };
    payments: Payment[];
    accessLimited: boolean;
    onToggleAccess: (limited: boolean) => void;
}

export default function PaymentsTab({ tuitionStatus, payments, accessLimited, onToggleAccess }: PaymentsTabProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Current Tuition Status */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <CreditCard size={18} className="text-[var(--primary-blue)]" />
                    Current Tuition Status
                </h3>
                <div className={`p-5 rounded-xl ${tuitionStatus.status === 'paid' ? 'bg-green-50' :
                        tuitionStatus.status === 'due' ? 'bg-orange-50' : 'bg-red-50'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-[var(--text-grey)]">{tuitionStatus.period}</p>
                            <p className="text-2xl font-bold text-[var(--text-dark)]">{formatCurrency(tuitionStatus.amount)}</p>
                        </div>
                        <StatusBadge
                            variant={tuitionStatus.status === 'paid' ? 'success' : tuitionStatus.status === 'due' ? 'warning' : 'error'}
                            size="md"
                        >
                            {tuitionStatus.status === 'paid' ? 'Paid' : tuitionStatus.status === 'due' ? 'Due' : 'Overdue'}
                        </StatusBadge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-grey)]">
                        <Calendar size={14} />
                        <span>Due Date: {tuitionStatus.dueDate}</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary-blue)] hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
                        <Check size={16} />
                        Mark as Paid
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-[var(--text-dark)] text-sm font-medium rounded-xl transition-colors">
                        Add Manual Payment
                    </button>
                </div>
            </div>

            {/* Access Control */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Access Control</h3>

                <div className={`p-4 rounded-xl mb-4 ${accessLimited ? 'bg-red-50' : 'bg-green-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={18} className={accessLimited ? 'text-red-500' : 'text-green-500'} />
                        <span className={`text-sm font-medium ${accessLimited ? 'text-red-700' : 'text-green-700'}`}>
                            {accessLimited ? 'Access Limited' : 'Full Access'}
                        </span>
                    </div>
                    <p className="text-xs text-[var(--text-grey)]">
                        {accessLimited
                            ? 'Student access is currently limited due to payment issues.'
                            : 'Student has full access to all features.'}
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-dark)]">Limit Access</span>
                    <button
                        onClick={() => onToggleAccess(!accessLimited)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${accessLimited ? 'bg-red-500' : 'bg-gray-300'
                            }`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${accessLimited ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                    </button>
                </div>
            </div>

            {/* Payment History */}
            <div className="card col-span-3">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Payment History</h3>
                <div className="space-y-3">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <CreditCard size={18} className="text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{payment.description}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{payment.date} • {payment.method}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-[var(--text-dark)]">
                                    {formatCurrency(payment.amount)}
                                </span>
                                <StatusBadge variant={payment.status === 'paid' ? 'success' : 'warning'}>
                                    {payment.status === 'paid' ? 'Paid' : 'Pending'}
                                </StatusBadge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
