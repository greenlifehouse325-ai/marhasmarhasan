/**
 * Data Buku Page - Dark Mode Fixed
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman list buku dengan search, filter, dan actions
 * Updated to use CSS variables for dark mode support
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
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/perpustakaan" className="hover:text-[var(--brand-primary)]">Dashboard</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Data Buku</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Data Buku</h1>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                    <Link
                        href="/perpustakaan/buku/create"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[var(--brand-primary)] rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Plus size={16} />
                        Tambah Buku
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <BookOpen size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_BOOKS.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Buku</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <BookMarked size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">134</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Eksemplar</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <BookOpen size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">98</p>
                    <p className="text-xs text-[var(--text-muted)]">Tersedia</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <AlertCircle size={18} className="text-yellow-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">36</p>
                    <p className="text-xs text-[var(--text-muted)]">Dipinjam</p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Cari judul, penulis, atau ISBN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${showFilters || hasActiveFilters
                            ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]/20 text-[var(--brand-primary)]'
                            : 'bg-[var(--bg-card)] border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                            }`}
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-light)] grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Kategori</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                            >
                                <option value="all">Semua Kategori</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
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
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                >
                                    <X size={16} />
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {paginatedBooks.length === 0 ? (
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-8 text-center text-[var(--text-muted)]">
                        Tidak ada buku yang ditemukan
                    </div>
                ) : (
                    paginatedBooks.map((book) => (
                        <div key={book.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                            <div className="flex gap-3">
                                <div className="w-12 h-16 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <BookOpen size={20} className="text-green-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/perpustakaan/buku/${book.id}`} className="font-medium text-[var(--text-primary)] text-sm line-clamp-1 hover:text-[var(--brand-primary)]">
                                        {book.title}
                                    </Link>
                                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{book.author}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-[var(--text-muted)]">{book.category}</span>
                                        <span className={`px-2 py-0.5 text-xs rounded ${book.status === 'available' ? 'bg-green-500/10 text-green-600' : book.status === 'limited' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-500'}`}>
                                            {book.status === 'available' ? 'Tersedia' : book.status === 'limited' ? 'Terbatas' : 'Tidak Tersedia'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Link href={`/perpustakaan/buku/${book.id}`} className="flex-1 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs text-center">Detail</Link>
                                <button className="p-1.5 bg-[var(--bg-hover)] rounded-lg"><Edit size={14} className="text-[var(--text-muted)]" /></button>
                                <button className="p-1.5 bg-red-500/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] text-left text-sm text-[var(--text-muted)]">
                                <th className="px-6 py-4 font-medium">Buku</th>
                                <th className="px-6 py-4 font-medium">Kategori</th>
                                <th className="px-6 py-4 font-medium">Lokasi</th>
                                <th className="px-6 py-4 font-medium text-center">Eksemplar</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {paginatedBooks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)]">
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
                    <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-light)]">
                        <p className="text-sm text-[var(--text-muted)]">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredBooks.length)} dari {filteredBooks.length} buku
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-secondary)]"
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
                                            ? 'bg-[var(--brand-primary)] text-white'
                                            : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-secondary)]"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-2">
                <Link href="/perpustakaan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">← Dashboard</Link>
                <Link href="/perpustakaan/peminjaman" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">Peminjaman</Link>
                <Link href="/perpustakaan/kategori" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">Kategori</Link>
                <Link href="/perpustakaan/settings" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)]">Settings</Link>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function BookRow({ book }: { book: Book }) {
    const statusStyles = {
        available: { bg: 'bg-green-500/10', text: 'text-green-600', label: 'Tersedia' },
        limited: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', label: 'Terbatas' },
        unavailable: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'Tidak Tersedia' },
    };

    const status = statusStyles[book.status];

    return (
        <tr className="hover:bg-[var(--bg-hover)] transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-16 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen size={20} className="text-green-500" />
                    </div>
                    <div className="min-w-0">
                        <Link
                            href={`/perpustakaan/buku/${book.id}`}
                            className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-primary)] line-clamp-1"
                        >
                            {book.title}
                        </Link>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{book.author}</p>
                        <p className="text-xs text-[var(--text-muted)]">ISBN: {book.isbn}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-[var(--text-secondary)]">{book.category}</span>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-[var(--text-secondary)]">{book.location}</span>
            </td>
            <td className="px-6 py-4 text-center">
                <span className="text-sm">
                    <span className="font-medium text-[var(--text-primary)]">{book.availableCopies}</span>
                    <span className="text-[var(--text-muted)]">/{book.totalCopies}</span>
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
                        className="p-2 text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 rounded-lg transition-colors"
                        title="Lihat Detail"
                    >
                        <Eye size={16} />
                    </Link>
                    <button
                        className="p-2 text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Hapus"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
