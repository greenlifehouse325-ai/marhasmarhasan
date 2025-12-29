/**
 * SPP Payment Card Component
 * SMK Marhas Admin Dashboard - Keuangan
 * 
 * Card untuk menampilkan info pembayaran SPP
 */

'use client';

import React from 'react';
import {
    CheckCircle,
    Clock,
    AlertTriangle,
    XCircle,
    Eye,
    FileText,
} from 'lucide-react';
import type { SPPPayment } from '@/types/keuangan';

interface SPPPaymentCardProps {
    payment: SPPPayment;
    onView?: (payment: SPPPayment) => void;
    onVerify?: (payment: SPPPayment) => void;
}

const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const STATUS_STYLES: Record<SPPPayment['status'], { bg: string; text: string; label: string; icon: React.ReactNode }> = {
    pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Belum Bayar', icon: <Clock size={14} /> },
    waiting: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Menunggu', icon: <Clock size={14} /> },
    verified: { bg: 'bg-green-100', text: 'text-green-700', label: 'Lunas', icon: <CheckCircle size={14} /> },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak', icon: <XCircle size={14} /> },
};

export function SPPPaymentCard({ payment, onView, onVerify }: SPPPaymentCardProps) {
    const status = STATUS_STYLES[payment.status];

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{payment.studentName}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                            {status.icon}
                            {status.label}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{payment.studentNIS}</p>
                    <p className="text-sm text-gray-500">{payment.studentClass}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                        Rp {payment.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{MONTH_NAMES[payment.month - 1]} {payment.year}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                    {payment.paidAt
                        ? `Dibayar: ${new Date(payment.paidAt).toLocaleDateString('id-ID')}`
                        : `Jatuh tempo: ${new Date(payment.year, payment.month - 1, 10).toLocaleDateString('id-ID')}`
                    }
                </span>
                <div className="flex items-center gap-1">
                    {onView && (
                        <button
                            onClick={() => onView(payment)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Eye size={14} />
                        </button>
                    )}
                    {onVerify && payment.status === 'waiting' && (
                        <button
                            onClick={() => onVerify(payment)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                        >
                            Verifikasi
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SPPPaymentCard;
