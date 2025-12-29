/**
 * Data Buku Page
 * SMark Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman list buku dengan search, filter, dan actions
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Plus,
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    X,
    BookMarked,
    AlertCircle,
} from 'lucide-react';
import { MOCK_BOOKS } from '@/data/mock-books';
import type { Book, BookCategory } from '@/types/perpustakaan';

const CATEGORIES: BookCategory[] = [
    'Fiksi', 'Non-Fiksi', 'Pendidikan', 'Teknologi',
    'Sains', 'Agama', 'Sejarah', 'Bahasa', 'Referensi', 'Lainnya'
];

export default function DataBukuPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 10;

    // Filter books
    const filteredBooks = useMemo(() => {
        return MOCK_BOOKS.filter(book => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.isbn.includes(searchQuery);

            const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
            const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [searchQuery, selectedCategory, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all';

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <span>Data Buku</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Data Buku</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                    <Link
                        href="/perpustakaan/buku/create"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                        <Plus size={16} />
                        Tambah Buku
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Buku" value={MOCK_BOOKS.length.toString()} icon={<BookOpen size={20} />} color="#10B981" />
                <StatCard label="Total Eksemplar" value="134" icon={<BookMarked size={20} />} color="#3B82F6" />
                <StatCard label="Tersedia" value="98" icon={<BookOpen size={20} />} color="#10B981" />
                <StatCard label="Dipinjam" value="36" icon={<AlertCircle size={20} />} color="#F59E0B" />
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari judul, penulis, atau ISBN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${showFilters || hasActiveFilters
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Filter size={16} />
                        Filter
                        {hasActiveFilters && (
                            <span className="w-5 h-5 flex items-center justify-center bg-emerald-600 text-white text-xs rounded-full">
                                !
                            </span>
                        )}
                    </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Kategori</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="all">Semua Kategori</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="all">Semua Status</option>
                                <option value="available">Tersedia</option>
                                <option value="limited">Terbatas</option>
                                <option value="unavailable">Tidak Tersedia</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <X size={16} />
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm text-gray-500">
                                <th className="px-6 py-4 font-medium">Buku</th>
                                <th className="px-6 py-4 font-medium">Kategori</th>
                                <th className="px-6 py-4 font-medium">Lokasi</th>
                                <th className="px-6 py-4 font-medium text-center">Eksemplar</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedBooks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        Tidak ada buku yang ditemukan
                                    </td>
                                </tr>
                            ) : (
                                paginatedBooks.map((book) => (
                                    <BookRow key={book.id} book={book} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredBooks.length)} dari {filteredBooks.length} buku
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 rounded-lg text-sm font-medium ${currentPage === page
                                                ? 'bg-emerald-600 text-white'
                                                : 'hover:bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
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

function BookRow({ book }: { book: Book }) {
    const statusStyles = {
        available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Tersedia' },
        limited: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Terbatas' },
        unavailable: { bg: 'bg-red-100', text: 'text-red-700', label: 'Tidak Tersedia' },
    };

    const status = statusStyles[book.status];

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen size={20} className="text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                        <Link
                            href={`/perpustakaan/buku/${book.id}`}
                            className="text-sm font-medium text-gray-800 hover:text-emerald-600 line-clamp-1"
                        >
                            {book.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
                        <p className="text-xs text-gray-400 mt-0.5">ISBN: {book.isbn}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{book.category}</span>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{book.location}</span>
            </td>
            <td className="px-6 py-4 text-center">
                <span className="text-sm">
                    <span className="font-medium text-gray-800">{book.availableCopies}</span>
                    <span className="text-gray-400">/{book.totalCopies}</span>
                </span>
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                    {status.label}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-1">
                    <Link
                        href={`/perpustakaan/buku/${book.id}`}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                    >
                        <Eye size={16} />
                    </Link>
                    <button
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
