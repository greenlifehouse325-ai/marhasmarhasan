/**
 * Lending Table Component
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Tabel peminjaman buku
 */

'use client';

import React from 'react';
import { Eye, CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';
import type { Lending } from '@/types/perpustakaan';

interface LendingTableProps {
    lendings: Lending[];
    onView?: (lending: Lending) => void;
    onReturn?: (lending: Lending) => void;
}

const STATUS_STYLES: Record<Lending['status'], { bg: string; text: string; label: string; icon: React.ReactNode }> = {
    active: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Aktif', icon: <Clock size={12} /> },
    returned: { bg: 'bg-green-100', text: 'text-green-700', label: 'Dikembalikan', icon: <CheckCircle size={12} /> },
    returned_late: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Telat Kembali', icon: <CheckCircle size={12} /> },
    overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Terlambat', icon: <AlertCircle size={12} /> },
    lost: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Hilang', icon: <XCircle size={12} /> },
};

export function LendingTable({ lendings, onView, onReturn }: LendingTableProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 text-left text-sm text-gray-500">
                            <th className="px-6 py-4 font-medium">Peminjam</th>
                            <th className="px-6 py-4 font-medium">Buku</th>
                            <th className="px-6 py-4 font-medium">Tgl Pinjam</th>
                            <th className="px-6 py-4 font-medium">Tenggat</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {lendings.map(lending => {
                            const status = STATUS_STYLES[lending.status];
                            const isOverdue = lending.status === 'active' && new Date(lending.dueDate) < new Date();
                            const displayStatus = isOverdue ? STATUS_STYLES.overdue : status;

                            return (
                                <tr key={lending.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <span className="text-xs font-bold text-emerald-600">
                                                    {lending.borrowerName.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{lending.borrowerName}</p>
                                                <p className="text-xs text-gray-500">{lending.borrowerId} ({lending.borrowerType})</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-800">{lending.book?.title}</p>
                                        <p className="text-xs text-gray-500">{lending.book?.isbn}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">
                                            {new Date(lending.borrowDate).toLocaleDateString('id-ID')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                            {new Date(lending.dueDate).toLocaleDateString('id-ID')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${displayStatus.bg} ${displayStatus.text}`}>
                                            {displayStatus.icon}
                                            {displayStatus.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            {onView && (
                                                <button
                                                    onClick={() => onView(lending)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                            )}
                                            {onReturn && lending.status === 'active' && (
                                                <button
                                                    onClick={() => onReturn(lending)}
                                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                >
                                                    <CheckCircle size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LendingTable;
