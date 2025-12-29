/**
 * Halaman SPP (Pembayaran)
 * SMK Marhas Admin Dashboard - Keuangan
 * 
 * Halaman untuk mengelola pembayaran SPP siswa
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Receipt,
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    X,
    Calendar,
    User,
    CreditCard,
    Banknote,
    Bell,
    Check,
} from 'lucide-react';
import { MOCK_SPP_PAYMENTS, getMonthName } from '@/data/mock-spp';
import type { SPPPayment } from '@/types/keuangan';

export default function SPPPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedMonth, setSelectedMonth] = useState<string>('12');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter
    const filteredPayments = MOCK_SPP_PAYMENTS.filter(payment => {
        const matchesSearch =
            payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.studentNIS.includes(searchQuery) ||
            payment.studentClass.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
        const matchesMonth = selectedMonth === 'all' || payment.month.toString() === selectedMonth;

        return matchesSearch && matchesStatus && matchesMonth;
    });

    // Stats
    const pendingCount = MOCK_SPP_PAYMENTS.filter(p => p.status === 'pending').length;
    const waitingCount = MOCK_SPP_PAYMENTS.filter(p => p.status === 'waiting').length;
    const verifiedCount = MOCK_SPP_PAYMENTS.filter(p => p.status === 'verified').length;
    const totalTunggakan = MOCK_SPP_PAYMENTS.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

    // Pagination
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedMonth !== '12';

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedMonth('12');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/keuangan" className="hover:text-amber-600">Dashboard</Link>
                        <span>/</span>
                        <span>Pembayaran SPP</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Pembayaran SPP</h1>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/keuangan/spp/tagihan"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <Bell size={16} />
                        Kirim Tagihan
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Menunggu Verifikasi"
                    value={waitingCount.toString()}
                    icon={<Clock size={20} />}
                    color="#3B82F6"
                    urgent={waitingCount > 0}
                />
                <StatCard
                    label="Belum Bayar"
                    value={pendingCount.toString()}
                    icon={<AlertTriangle size={20} />}
                    color="#EF4444"
                />
                <StatCard
                    label="Lunas"
                    value={verifiedCount.toString()}
                    icon={<CheckCircle size={20} />}
                    color="#10B981"
                />
                <StatCard
                    label="Total Tunggakan"
                    value={`Rp ${(totalTunggakan / 1000000).toFixed(1)} Jt`}
                    icon={<Banknote size={20} />}
                    color="#F59E0B"
                />
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari nama siswa, NIS, atau kelas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        >
                            <option value="all">Semua Bulan</option>
                            <option value="12">Desember 2024</option>
                            <option value="11">November 2024</option>
                            <option value="10">Oktober 2024</option>
                        </select>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${showFilters || hasActiveFilters
                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            >
                                <option value="all">Semua Status</option>
                                <option value="waiting">Menunggu Verifikasi</option>
                                <option value="pending">Belum Bayar</option>
                                <option value="verified">Lunas</option>
                                <option value="rejected">Ditolak</option>
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
                                <th className="px-6 py-4 font-medium">Siswa</th>
                                <th className="px-6 py-4 font-medium">Periode</th>
                                <th className="px-6 py-4 font-medium">Jumlah</th>
                                <th className="px-6 py-4 font-medium">Metode</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        Tidak ada data pembayaran
                                    </td>
                                </tr>
                            ) : (
                                paginatedPayments.map((payment) => (
                                    <SPPRow key={payment.id} payment={payment} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredPayments.length)} dari {filteredPayments.length}
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
        <div className={`bg-white rounded-xl p-4 shadow-sm ${urgent ? 'ring-2 ring-blue-200' : ''}`}>
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

function SPPRow({ payment }: { payment: SPPPayment }) {
    const statusStyles = {
        pending: { bg: 'bg-red-100', text: 'text-red-700', label: 'Belum Bayar', icon: <AlertTriangle size={12} /> },
        waiting: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Menunggu Verifikasi', icon: <Clock size={12} /> },
        verified: { bg: 'bg-green-100', text: 'text-green-700', label: 'Lunas', icon: <CheckCircle size={12} /> },
        rejected: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Ditolak', icon: <XCircle size={12} /> },
    };

    const methodStyles = {
        transfer: { icon: <CreditCard size={14} />, label: 'Transfer' },
        cash: { icon: <Banknote size={14} />, label: 'Tunai' },
        virtual_account: { icon: <CreditCard size={14} />, label: 'VA' },
    };

    const status = statusStyles[payment.status];
    const method = payment.paymentMethod ? methodStyles[payment.paymentMethod] : null;
    const isPending = payment.status === 'pending';
    const isWaiting = payment.status === 'waiting';

    return (
        <tr className={`hover:bg-gray-50 transition-colors ${isPending ? 'bg-red-50/30' : ''}`}>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <User size={18} className="text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">{payment.studentName}</p>
                        <p className="text-xs text-gray-500">{payment.studentClass} • NIS: {payment.studentNIS}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar size={14} />
                    {getMonthName(payment.month)} {payment.year}
                </div>
            </td>
            <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-800">
                    Rp {payment.amount.toLocaleString('id-ID')}
                </p>
            </td>
            <td className="px-6 py-4">
                {method ? (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        {method.icon}
                        {method.label}
                    </div>
                ) : (
                    <span className="text-sm text-gray-400">-</span>
                )}
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
                        href={`/keuangan/spp/${payment.id}`}
                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                    >
                        <Eye size={16} />
                    </Link>
                    {isWaiting && (
                        <>
                            <button
                                className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Verifikasi"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Tolak"
                            >
                                <XCircle size={16} />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
