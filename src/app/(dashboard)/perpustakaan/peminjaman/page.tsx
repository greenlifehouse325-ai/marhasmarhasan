/**
 * Halaman Peminjaman
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman untuk mengelola peminjaman buku
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BookMarked,
    Plus,
    Search,
    Filter,
    Eye,
    RotateCcw,
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ChevronLeft,
    ChevronRight,
    X,
    Calendar,
    User,
} from 'lucide-react';
import { MOCK_LENDINGS } from '@/data/mock-books';

export default function PeminjamanPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter
    const filteredLendings = MOCK_LENDINGS.filter(lending => {
        const matchesSearch =
            lending.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lending.book.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatus === 'all' || lending.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredLendings.length / itemsPerPage);
    const paginatedLendings = filteredLendings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const activeLendings = MOCK_LENDINGS.filter(l => l.status === 'active').length;
    const overdueLendings = MOCK_LENDINGS.filter(l => l.status === 'overdue').length;

    const hasActiveFilters = searchQuery || selectedStatus !== 'all';

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <span>Peminjaman</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Peminjaman Buku</h1>
                </div>

                <Link
                    href="/perpustakaan/peminjaman/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                    <Plus size={16} />
                    Peminjaman Baru
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Peminjaman"
                    value={MOCK_LENDINGS.length.toString()}
                    icon={<BookMarked size={20} />}
                    color="#10B981"
                />
                <StatCard
                    label="Sedang Dipinjam"
                    value={activeLendings.toString()}
                    icon={<Clock size={20} />}
                    color="#3B82F6"
                />
                <StatCard
                    label="Terlambat"
                    value={overdueLendings.toString()}
                    icon={<AlertTriangle size={20} />}
                    color="#EF4444"
                    urgent={overdueLendings > 0}
                />
                <StatCard
                    label="Dikembalikan"
                    value={MOCK_LENDINGS.filter(l => l.status === 'returned').length.toString()}
                    icon={<CheckCircle size={20} />}
                    color="#10B981"
                />
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari peminjam atau judul buku..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${showFilters || hasActiveFilters
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Dipinjam</option>
                                <option value="overdue">Terlambat</option>
                                <option value="returned">Dikembalikan</option>
                            </select>
                        </div>
                        {hasActiveFilters && (
                            <div className="flex items-end">
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <X size={16} />
                                    Reset
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm text-gray-500">
                                <th className="px-6 py-4 font-medium">Peminjam</th>
                                <th className="px-6 py-4 font-medium">Buku</th>
                                <th className="px-6 py-4 font-medium">Tanggal Pinjam</th>
                                <th className="px-6 py-4 font-medium">Jatuh Tempo</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedLendings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        Tidak ada data peminjaman
                                    </td>
                                </tr>
                            ) : (
                                paginatedLendings.map((lending) => (
                                    <LendingRow key={lending.id} lending={lending} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredLendings.length)} dari {filteredLendings.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({
    label,
    value,
    icon,
    color,
    urgent = false
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    urgent?: boolean;
}) {
    return (
        <div className={`bg-white rounded-xl p-4 shadow-sm ${urgent ? 'ring-2 ring-red-200' : ''}`}>
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </div>
        </div>
    );
}

function LendingRow({ lending }: { lending: typeof MOCK_LENDINGS[0] }) {
    const statusStyles = {
        active: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Dipinjam', icon: <Clock size={12} /> },
        overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Terlambat', icon: <AlertTriangle size={12} /> },
        returned: { bg: 'bg-green-100', text: 'text-green-700', label: 'Dikembalikan', icon: <CheckCircle size={12} /> },
        returned_late: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Terlambat Kembali', icon: <Clock size={12} /> },
        lost: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Hilang', icon: <XCircle size={12} /> },
    };

    const status = statusStyles[lending.status];
    const isOverdue = lending.status === 'overdue';

    return (
        <tr className={`hover:bg-gray-50 transition-colors ${isOverdue ? 'bg-red-50/50' : ''}`}>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User size={18} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">{lending.borrowerName}</p>
                        <p className="text-xs text-gray-500">{lending.borrowerClass}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <p className="text-sm text-gray-800 line-clamp-1">{lending.book.title}</p>
                <p className="text-xs text-gray-500">ISBN: {lending.book.isbn}</p>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar size={14} />
                    {new Date(lending.borrowDate).toLocaleDateString('id-ID')}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    <Clock size={14} />
                    {new Date(lending.dueDate).toLocaleDateString('id-ID')}
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                    {status.icon}
                    {status.label}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-1">
                    <Link
                        href={`/perpustakaan/peminjaman/${lending.id}`}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                    >
                        <Eye size={16} />
                    </Link>
                    {(lending.status === 'active' || lending.status === 'overdue') && (
                        <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Proses Pengembalian"
                        >
                            <RotateCcw size={16} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}
