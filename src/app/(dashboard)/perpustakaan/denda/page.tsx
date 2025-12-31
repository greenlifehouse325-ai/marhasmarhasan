/**
 * Denda (Fines) Page - Perpustakaan Module
 * SMK Marhas Admin Dashboard
 * 
 * Halaman manajemen denda keterlambatan pengembalian buku
 */

'use client';

import React, { useState } from 'react';
import {
    Banknote,
    Search,
    Filter,
    Download,
    Check,
    Clock,
    AlertTriangle,
    User,
    BookOpen,
    Calendar
} from 'lucide-react';

// Mock data for fines
const MOCK_FINES = [
    {
        id: 'F001',
        borrower: 'Ahmad Rizki',
        borrowerId: 'STU001',
        bookTitle: 'Matematika Dasar Kelas X',
        borrowDate: '2024-12-01',
        dueDate: '2024-12-08',
        returnDate: '2024-12-15',
        daysLate: 7,
        finePerDay: 500,
        totalFine: 3500,
        status: 'unpaid'
    },
    {
        id: 'F002',
        borrower: 'Siti Nurhaliza',
        borrowerId: 'STU002',
        bookTitle: 'Fisika untuk SMK',
        borrowDate: '2024-12-05',
        dueDate: '2024-12-12',
        returnDate: '2024-12-20',
        daysLate: 8,
        finePerDay: 500,
        totalFine: 4000,
        status: 'paid'
    },
    {
        id: 'F003',
        borrower: 'Budi Santoso',
        borrowerId: 'STU003',
        bookTitle: 'Bahasa Indonesia Kelas XI',
        borrowDate: '2024-12-10',
        dueDate: '2024-12-17',
        returnDate: null,
        daysLate: 13,
        finePerDay: 500,
        totalFine: 6500,
        status: 'pending'
    },
];

export default function DendaPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'unpaid' | 'paid' | 'pending'>('all');

    const filteredFines = MOCK_FINES.filter(fine => {
        const matchesSearch = fine.borrower.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fine.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || fine.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalUnpaid = MOCK_FINES.filter(f => f.status === 'unpaid' || f.status === 'pending')
        .reduce((sum, f) => sum + f.totalFine, 0);
    const totalPaid = MOCK_FINES.filter(f => f.status === 'paid')
        .reduce((sum, f) => sum + f.totalFine, 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Manajemen Denda
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Kelola denda keterlambatan pengembalian buku
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                    <Download size={16} />
                    Export Laporan
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">Belum Dibayar</p>
                            <p className="text-xl font-bold text-[var(--text-primary)]">
                                Rp {totalUnpaid.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Check size={20} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">Sudah Dibayar</p>
                            <p className="text-xl font-bold text-[var(--text-primary)]">
                                Rp {totalPaid.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Banknote size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">Total Denda</p>
                            <p className="text-xl font-bold text-[var(--text-primary)]">
                                {MOCK_FINES.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari nama peminjam atau judul buku..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'unpaid', 'pending', 'paid'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                                ${statusFilter === status
                                    ? 'bg-[var(--brand-primary)] text-white'
                                    : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--bg-active)]'
                                }
                            `}
                        >
                            {status === 'all' ? 'Semua' :
                                status === 'unpaid' ? 'Belum Bayar' :
                                    status === 'pending' ? 'Tertunda' : 'Lunas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Fines List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Peminjam</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Buku</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Terlambat</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Total Denda</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {filteredFines.map(fine => (
                                <tr key={fine.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                    <td className="px-4 py-3 text-sm font-mono text-[var(--text-muted)]">{fine.id}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center">
                                                <User size={16} className="text-[var(--text-muted)]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[var(--text-primary)]">{fine.borrower}</p>
                                                <p className="text-xs text-[var(--text-muted)]">{fine.borrowerId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-[var(--text-primary)] max-w-[200px] truncate">{fine.bookTitle}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Clock size={14} className="text-red-500" />
                                            <span className="text-red-500 font-medium">{fine.daysLate} hari</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                                            Rp {fine.totalFine.toLocaleString('id-ID')}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`
                                            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                            ${fine.status === 'paid' ? 'bg-green-500/10 text-green-500' :
                                                fine.status === 'unpaid' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-yellow-500/10 text-yellow-600'}
                                        `}>
                                            {fine.status === 'paid' ? 'Lunas' :
                                                fine.status === 'unpaid' ? 'Belum Bayar' : 'Tertunda'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {fine.status !== 'paid' && (
                                            <button className="px-3 py-1.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white text-xs font-medium rounded-lg transition-colors">
                                                Bayar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
