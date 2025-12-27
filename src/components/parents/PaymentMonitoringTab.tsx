'use client';

import React from 'react';
import { CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface StudentPayment {
    studentId: string;
    studentName: string;
    class: string;
    currentStatus: 'paid' | 'due' | 'overdue';
    amount: number;
    dueDate: string;
    lastPaymentDate?: string;
}

interface PaymentHistory {
    id: string;
    studentName: string;
    description: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending';
}

interface PaymentMonitoringTabProps {
    studentPayments: StudentPayment[];
    paymentHistory: PaymentHistory[];
}

const statusConfig = {
    paid: {
        icon: <CheckCircle size={16} />,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Paid'
    },
    due: {
        icon: <Clock size={16} />,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        label: 'Due Soon'
    },
    overdue: {
        icon: <AlertCircle size={16} />,
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Overdue'
    },
};

export default function PaymentMonitoringTab({ studentPayments, paymentHistory }: PaymentMonitoringTabProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="space-y-6">
            {/* SPP Status per Student */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <CreditCard size={18} className="text-amber-500" />
                    SPP Status by Student
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentPayments.map((payment) => {
                        const config = statusConfig[payment.currentStatus];
                        return (
                            <div
                                key={payment.studentId}
                                className={`p-4 rounded-xl border-2 ${config.bg} ${config.border} transition-all hover:shadow-md`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-dark)]">{payment.studentName}</p>
                                        <p className="text-xs text-[var(--text-grey)]">{payment.class}</p>
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                                        {config.icon}
                                        <span className="text-xs font-medium">{config.label}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-[var(--text-grey)] mb-1">Amount</p>
                                        <p className="text-lg font-semibold text-[var(--text-dark)]">{formatCurrency(payment.amount)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[var(--text-grey)]">Due: {payment.dueDate}</p>
                                        {payment.lastPaymentDate && (
                                            <p className="text-xs text-green-600">Last paid: {payment.lastPaymentDate}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Payment History */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Payment History</h3>
                <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payment.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                    }`}>
                                    {payment.status === 'paid' ? <CheckCircle size={18} /> : <Clock size={18} />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{payment.description}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{payment.studentName} • {payment.date}</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-[var(--text-dark)]">
                                {formatCurrency(payment.amount)}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-center text-[var(--text-grey)] mt-4 pt-4 border-t border-gray-100">
                    This is a monitoring view only. Payment actions are not available.
                </p>
            </div>
        </div>
    );
}
