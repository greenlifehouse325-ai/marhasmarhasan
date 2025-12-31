/**
 * Rekonsiliasi Keuangan Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Search, Upload, Download, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const MOCK_TRANSACTIONS = [
    { id: 'T001', tanggal: '2024-01-15', deskripsi: 'Pembayaran SPP', bank: 5000000, sistem: 5000000, status: 'matched' },
    { id: 'T002', tanggal: '2024-01-15', deskripsi: 'Denda Keterlambatan', bank: 250000, sistem: 250000, status: 'matched' },
    { id: 'T003', tanggal: '2024-01-16', deskripsi: 'Biaya Praktikum', bank: 1500000, sistem: 1450000, status: 'mismatch' },
    { id: 'T004', tanggal: '2024-01-16', deskripsi: 'Transfer tidak dikenal', bank: 500000, sistem: 0, status: 'unmatched' },
];

export default function RekonsiliasiPage() {
    const [isImporting, setIsImporting] = useState(false);

    const handleImport = () => {
        setIsImporting(true);
        setTimeout(() => setIsImporting(false), 2000);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Rekonsiliasi</h1>
                    <p className="text-[var(--text-muted)]">Cocokkan transaksi bank dengan data sistem</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleImport} disabled={isImporting} className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl text-sm font-medium disabled:opacity-50">
                        <Upload size={16} />
                        {isImporting ? 'Importing...' : 'Import Mutasi'}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium">
                        <RefreshCw size={16} />
                        Rekonsiliasi
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_TRANSACTIONS.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Transaksi</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">{MOCK_TRANSACTIONS.filter(t => t.status === 'matched').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Matched</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-amber-600">{MOCK_TRANSACTIONS.filter(t => t.status === 'mismatch').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Mismatch</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-500">{MOCK_TRANSACTIONS.filter(t => t.status === 'unmatched').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Unmatched</p>
                </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tanggal</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Deskripsi</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase">Bank</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase">Sistem</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_TRANSACTIONS.map(t => (
                            <tr key={t.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{t.tanggal}</td>
                                <td className="px-4 py-4 text-sm text-[var(--text-primary)]">{t.deskripsi}</td>
                                <td className="px-4 py-4 text-sm text-right font-mono text-[var(--text-primary)]">Rp {t.bank.toLocaleString()}</td>
                                <td className="px-4 py-4 text-sm text-right font-mono text-[var(--text-primary)]">Rp {t.sistem.toLocaleString()}</td>
                                <td className="px-4 py-4 text-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg ${t.status === 'matched' ? 'bg-green-500/10 text-green-600' : t.status === 'mismatch' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-500'}`}>
                                        {t.status === 'matched' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {t.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
