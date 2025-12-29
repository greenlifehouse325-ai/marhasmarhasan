/**
 * Return Form Component
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Form pengembalian buku
 */

'use client';

import React, { useState } from 'react';
import { Search, BookOpen, AlertTriangle, CheckCircle, Loader2, DollarSign } from 'lucide-react';

interface ReturnFormProps {
    onSubmit: (data: { lendingId: string; condition: string; fine?: number }) => Promise<void>;
    onCancel?: () => void;
}

interface LendingInfo {
    id: string;
    studentName: string;
    bookTitle: string;
    borrowDate: Date;
    dueDate: Date;
    isOverdue: boolean;
    daysOverdue: number;
}

export function ReturnForm({ onSubmit, onCancel }: ReturnFormProps) {
    const [lendingCode, setLendingCode] = useState('');
    const [lendingInfo, setLendingInfo] = useState<LendingInfo | null>(null);
    const [condition, setCondition] = useState<'good' | 'damaged' | 'lost'>('good');
    const [fine, setFine] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const searchLending = async () => {
        if (lendingCode.length < 5) return;
        setIsSearching(true);
        await new Promise(r => setTimeout(r, 1000));

        // Mock data
        const dueDate = new Date('2024-12-20');
        const isOverdue = new Date() > dueDate;
        const daysOverdue = isOverdue ? Math.ceil((Date.now() - dueDate.getTime()) / (24 * 60 * 60 * 1000)) : 0;

        setLendingInfo({
            id: lendingCode,
            studentName: 'Ahmad Rizky - XII RPL 1',
            bookTitle: 'Pemrograman Web dengan PHP',
            borrowDate: new Date('2024-12-06'),
            dueDate,
            isOverdue,
            daysOverdue,
        });

        if (isOverdue) {
            setFine(daysOverdue * 1000); // Rp 1.000 per hari
        }

        setIsSearching(false);
    };

    const handleConditionChange = (newCondition: typeof condition) => {
        setCondition(newCondition);
        if (newCondition === 'lost') {
            setFine(75000); // Replacement cost
        } else if (newCondition === 'damaged') {
            setFine(25000);
        } else if (lendingInfo?.isOverdue) {
            setFine(lendingInfo.daysOverdue * 1000);
        } else {
            setFine(0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lendingInfo) return;

        setIsLoading(true);
        try {
            await onSubmit({ lendingId: lendingInfo.id, condition, fine });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Search Lending */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Search size={14} className="inline mr-1" />
                    Kode Peminjaman
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={lendingCode}
                        onChange={(e) => setLendingCode(e.target.value)}
                        placeholder="Masukkan kode peminjaman..."
                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <button
                        type="button"
                        onClick={searchLending}
                        disabled={isSearching || lendingCode.length < 5}
                        className="px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    </button>
                </div>
            </div>

            {/* Lending Info */}
            {lendingInfo && (
                <>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <BookOpen size={20} className="text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{lendingInfo.bookTitle}</p>
                                <p className="text-sm text-gray-500">{lendingInfo.studentName}</p>
                                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                    <span>Pinjam: {lendingInfo.borrowDate.toLocaleDateString('id-ID')}</span>
                                    <span>Jatuh tempo: {lendingInfo.dueDate.toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                            {lendingInfo.isOverdue && (
                                <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                                    {lendingInfo.daysOverdue} hari terlambat
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi Buku</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { value: 'good', label: 'Baik', icon: <CheckCircle size={16} />, color: 'emerald' },
                                { value: 'damaged', label: 'Rusak', icon: <AlertTriangle size={16} />, color: 'amber' },
                                { value: 'lost', label: 'Hilang', icon: <AlertTriangle size={16} />, color: 'red' },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleConditionChange(opt.value as typeof condition)}
                                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${condition === opt.value
                                            ? opt.color === 'emerald'
                                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                : opt.color === 'amber'
                                                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                                                    : 'bg-red-50 border-red-300 text-red-700'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {opt.icon}
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Fine */}
                    {fine > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-red-700">
                                    <DollarSign size={18} />
                                    Denda
                                </span>
                                <span className="text-lg font-bold text-red-700">
                                    Rp {fine.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Proses Pengembalian'}
                        </button>
                        {onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                            >
                                Batal
                            </button>
                        )}
                    </div>
                </>
            )}
        </form>
    );
}

export default ReturnForm;
