/**
 * Admin Perpustakaan Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk Admin Perpustakaan dengan overview sirkulasi buku
 */

'use client';

import React from 'react';
import {
    BookOpen,
    BookMarked,
    Users,
    TrendingUp,
    AlertTriangle,
    Clock,
    ArrowRight,
    Plus,
    Search,
    Calendar,
    RotateCcw,
    Banknote,
    Upload,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function PerpustakaanDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={20} />
                        <span className="text-sm font-medium text-emerald-200">Admin Perpustakaan</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Dashboard Perpustakaan 📚
                    </h1>
                    <p className="text-emerald-200 max-w-xl">
                        Kelola koleksi buku, peminjaman, pengembalian, dan denda perpustakaan
                        SMK Marhas dengan mudah.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <BookOpen className="absolute right-10 top-10 w-32 h-32" />
                    <BookMarked className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Koleksi"
                    value="3,456"
                    icon={<BookOpen size={20} />}
                    color="#10B981"
                    subtext="Buku tersedia"
                />
                <StatCard
                    label="Sedang Dipinjam"
                    value="234"
                    icon={<BookMarked size={20} />}
                    color="#3B82F6"
                    subtext="Buku keluar"
                />
                <StatCard
                    label="Peminjam Aktif"
                    value="156"
                    icon={<Users size={20} />}
                    color="#8B5CF6"
                    subtext="Siswa & guru"
                />
                <StatCard
                    label="Jatuh Tempo"
                    value="12"
                    icon={<AlertTriangle size={20} />}
                    color="#F59E0B"
                    subtext="Perlu tindakan"
                    urgent
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <QuickAction
                                label="Peminjaman Baru"
                                icon={<Plus size={20} />}
                                color="#10B981"
                                href="/perpustakaan/peminjaman/create"
                            />
                            <QuickAction
                                label="Pengembalian"
                                icon={<RotateCcw size={20} />}
                                color="#3B82F6"
                                href="/perpustakaan/pengembalian"
                            />
                            <QuickAction
                                label="Cari Buku"
                                icon={<Search size={20} />}
                                color="#8B5CF6"
                                href="/perpustakaan/buku"
                            />
                            <QuickAction
                                label="Upload Konten"
                                icon={<Upload size={20} />}
                                color="#F59E0B"
                                href="/perpustakaan/konten-digital/upload"
                            />
                        </div>
                    </div>

                    {/* Recent Loans */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Peminjaman Terbaru</h2>
                            <Link
                                href="/perpustakaan/peminjaman"
                                className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                            >
                                Lihat Semua <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                        <th className="pb-3 font-medium">Peminjam</th>
                                        <th className="pb-3 font-medium">Buku</th>
                                        <th className="pb-3 font-medium">Tanggal</th>
                                        <th className="pb-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <LoanRow
                                        borrower="Ahmad Rizky"
                                        bookTitle="Pemrograman Web Dasar"
                                        date="29 Des 2024"
                                        status="active"
                                    />
                                    <LoanRow
                                        borrower="Siti Nurhaliza"
                                        bookTitle="Matematika Teknik"
                                        date="28 Des 2024"
                                        status="active"
                                    />
                                    <LoanRow
                                        borrower="Budi Santoso"
                                        bookTitle="Fisika SMK Jilid 2"
                                        date="27 Des 2024"
                                        status="overdue"
                                    />
                                    <LoanRow
                                        borrower="Dewi Lestari"
                                        bookTitle="Bahasa Inggris Bisnis"
                                        date="26 Des 2024"
                                        status="returned"
                                    />
                                    <LoanRow
                                        borrower="Reza Pratama"
                                        bookTitle="Database Administration"
                                        date="25 Des 2024"
                                        status="active"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Circulation Chart Placeholder */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Statistik Sirkulasi</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={14} />
                                <span>7 hari terakhir</span>
                            </div>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="flex items-end justify-between h-48 px-4 py-2">
                            {[45, 62, 38, 71, 55, 83, 67].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div className="relative w-full max-w-[40px] group">
                                        <div
                                            className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-300 hover:from-emerald-600 hover:to-emerald-500"
                                            style={{ height: `${value * 1.8}px` }}
                                        />
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                            {value}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-xs text-gray-500">Peminjaman</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Overdue Books */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Jatuh Tempo</h2>
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full font-medium">
                                12 buku
                            </span>
                        </div>

                        <div className="space-y-3">
                            <OverdueItem
                                borrower="Budi Santoso"
                                bookTitle="Fisika SMK Jilid 2"
                                daysOverdue={3}
                                fine={6000}
                            />
                            <OverdueItem
                                borrower="Ani Wijaya"
                                bookTitle="Kimia Dasar"
                                daysOverdue={2}
                                fine={4000}
                            />
                            <OverdueItem
                                borrower="Deni Kusuma"
                                bookTitle="Sejarah Indonesia"
                                daysOverdue={1}
                                fine={2000}
                            />
                        </div>

                        <Link
                            href="/perpustakaan/denda"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                            Lihat Semua Denda <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Popular Books */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Buku Populer</h2>

                        <div className="space-y-3">
                            <PopularBook
                                rank={1}
                                title="Pemrograman Web Dasar"
                                loans={45}
                            />
                            <PopularBook
                                rank={2}
                                title="Database Administration"
                                loans={38}
                            />
                            <PopularBook
                                rank={3}
                                title="Jaringan Komputer"
                                loans={32}
                            />
                            <PopularBook
                                rank={4}
                                title="Bahasa Inggris Bisnis"
                                loans={28}
                            />
                            <PopularBook
                                rank={5}
                                title="Matematika Teknik"
                                loans={24}
                            />
                        </div>
                    </div>

                    {/* Today's Summary */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hari Ini</h2>

                        <div className="space-y-4">
                            <SummaryItem
                                label="Peminjaman"
                                value="12"
                                icon={<BookMarked size={16} />}
                                color="#10B981"
                            />
                            <SummaryItem
                                label="Pengembalian"
                                value="8"
                                icon={<RotateCcw size={16} />}
                                color="#3B82F6"
                            />
                            <SummaryItem
                                label="Denda Terkumpul"
                                value="Rp 45.000"
                                icon={<Banknote size={16} />}
                                color="#F59E0B"
                            />
                        </div>
                    </div>
                </div>
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
    subtext,
    urgent = false
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    subtext: string;
    urgent?: boolean;
}) {
    return (
        <div className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${urgent ? 'ring-2 ring-amber-200' : ''}`}>
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                {urgent && <AlertTriangle size={16} className="text-amber-500" />}
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-xs mt-1 ${urgent ? 'text-amber-600' : 'text-gray-400'}`}>{subtext}</p>
        </div>
    );
}

function QuickAction({
    label,
    icon,
    color,
    href
}: {
    label: string;
    icon: React.ReactNode;
    color: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
        </Link>
    );
}

function LoanRow({
    borrower,
    bookTitle,
    date,
    status
}: {
    borrower: string;
    bookTitle: string;
    date: string;
    status: 'active' | 'overdue' | 'returned';
}) {
    const statusStyles = {
        active: 'bg-blue-100 text-blue-600',
        overdue: 'bg-red-100 text-red-600',
        returned: 'bg-green-100 text-green-600',
    };

    const statusLabels = {
        active: 'Dipinjam',
        overdue: 'Terlambat',
        returned: 'Dikembalikan',
    };

    return (
        <tr className="hover:bg-gray-50">
            <td className="py-3 text-sm text-gray-800">{borrower}</td>
            <td className="py-3 text-sm text-gray-600">{bookTitle}</td>
            <td className="py-3 text-sm text-gray-400">{date}</td>
            <td className="py-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[status]}`}>
                    {statusLabels[status]}
                </span>
            </td>
        </tr>
    );
}

function OverdueItem({
    borrower,
    bookTitle,
    daysOverdue,
    fine
}: {
    borrower: string;
    bookTitle: string;
    daysOverdue: number;
    fine: number;
}) {
    return (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
            <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-gray-800">{borrower}</p>
                <span className="text-xs text-amber-600 font-medium">+{daysOverdue} hari</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">{bookTitle}</p>
            <div className="flex items-center gap-1 text-xs text-amber-700">
                <Banknote size={12} />
                <span>Denda: Rp {fine.toLocaleString('id-ID')}</span>
            </div>
        </div>
    );
}

function PopularBook({
    rank,
    title,
    loans
}: {
    rank: number;
    title: string;
    loans: number;
}) {
    const rankColors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'];

    return (
        <div className="flex items-center gap-3">
            <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: rankColors[rank - 1] || '#6B7280' }}
            >
                {rank}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{title}</p>
                <p className="text-xs text-gray-400">{loans}x dipinjam</p>
            </div>
        </div>
    );
}

function SummaryItem({
    label,
    value,
    icon,
    color
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <span className="text-sm text-gray-600">{label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">{value}</span>
        </div>
    );
}
