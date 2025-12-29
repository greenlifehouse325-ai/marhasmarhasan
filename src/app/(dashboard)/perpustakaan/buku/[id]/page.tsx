/**
 * Detail Buku Page
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman detail buku dengan info lengkap dan riwayat peminjaman
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    BookOpen,
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    User,
    MapPin,
    Hash,
    FileText,
    Globe,
    Clock,
    BookMarked,
    AlertTriangle,
    CheckCircle,
} from 'lucide-react';
import { getBookById, MOCK_LENDINGS } from '@/data/mock-books';

export default function DetailBukuPage() {
    const params = useParams();
    const bookId = params.id as string;
    const book = getBookById(bookId);

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <BookOpen size={48} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Buku Tidak Ditemukan</h2>
                <p className="text-gray-500 mb-4">Buku dengan ID tersebut tidak ada dalam database.</p>
                <Link
                    href="/perpustakaan/buku"
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Data Buku
                </Link>
            </div>
        );
    }

    const bookLendings = MOCK_LENDINGS.filter(l => l.bookId === bookId);
    const activeLendings = bookLendings.filter(l => l.status === 'active' || l.status === 'overdue');

    const statusStyles = {
        available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Tersedia' },
        limited: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Terbatas' },
        unavailable: { bg: 'bg-red-100', text: 'text-red-700', label: 'Tidak Tersedia' },
    };

    const status = statusStyles[book.status];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/perpustakaan/buku" className="hover:text-emerald-600">Data Buku</Link>
                        <span>/</span>
                        <span>Detail</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/perpustakaan/buku"
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Detail Buku</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Edit size={16} />
                        Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                        Hapus
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Book Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Cover */}
                            <div className="w-full md:w-48 h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <BookOpen size={64} className="text-emerald-500" />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h2>
                                        <p className="text-gray-600">oleh {book.author}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${status.bg} ${status.text}`}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <InfoItem icon={<Hash size={16} />} label="ISBN" value={book.isbn} />
                                    <InfoItem icon={<FileText size={16} />} label="Penerbit" value={book.publisher} />
                                    <InfoItem icon={<Calendar size={16} />} label="Tahun Terbit" value={book.publishedYear.toString()} />
                                    <InfoItem icon={<Globe size={16} />} label="Bahasa" value={book.language} />
                                    <InfoItem icon={<MapPin size={16} />} label="Lokasi" value={book.location} />
                                    <InfoItem icon={<FileText size={16} />} label="Halaman" value={`${book.pages} halaman`} />
                                </div>

                                {book.description && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-600">{book.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Lending History */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Peminjaman</h3>

                        {bookLendings.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <BookMarked size={32} className="mx-auto mb-2 text-gray-300" />
                                <p>Belum ada riwayat peminjaman</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {bookLendings.map((lending) => (
                                    <div
                                        key={lending.id}
                                        className={`p-4 rounded-xl border ${lending.status === 'overdue'
                                                ? 'bg-red-50 border-red-100'
                                                : lending.status === 'active'
                                                    ? 'bg-blue-50 border-blue-100'
                                                    : 'bg-gray-50 border-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">{lending.borrowerName}</p>
                                                <p className="text-sm text-gray-500">{lending.borrowerClass}</p>
                                            </div>
                                            <LendingStatusBadge status={lending.status} />
                                        </div>
                                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                Pinjam: {new Date(lending.borrowDate).toLocaleDateString('id-ID')}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                Jatuh Tempo: {new Date(lending.dueDate).toLocaleDateString('id-ID')}
                                            </span>
                                            {lending.returnDate && (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle size={12} />
                                                    Kembali: {new Date(lending.returnDate).toLocaleDateString('id-ID')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Availability */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ketersediaan</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm text-gray-600">Total Eksemplar</span>
                                <span className="text-lg font-bold text-gray-800">{book.totalCopies}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                                <span className="text-sm text-green-700">Tersedia</span>
                                <span className="text-lg font-bold text-green-700">{book.availableCopies}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                                <span className="text-sm text-blue-700">Dipinjam</span>
                                <span className="text-lg font-bold text-blue-700">{book.totalCopies - book.availableCopies}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                    style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                {Math.round((book.availableCopies / book.totalCopies) * 100)}% tersedia
                            </p>
                        </div>
                    </div>

                    {/* Current Borrowers */}
                    {activeLendings.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sedang Dipinjam</h3>

                            <div className="space-y-3">
                                {activeLendings.map((lending) => (
                                    <div key={lending.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User size={14} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{lending.borrowerName}</p>
                                            <p className="text-xs text-gray-500">
                                                {lending.status === 'overdue' ? (
                                                    <span className="text-red-600 flex items-center gap-1">
                                                        <AlertTriangle size={10} />
                                                        Terlambat
                                                    </span>
                                                ) : (
                                                    `Jatuh tempo: ${new Date(lending.dueDate).toLocaleDateString('id-ID')}`
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>

                        <div className="space-y-2">
                            <Link
                                href={`/perpustakaan/peminjaman/create?bookId=${book.id}`}
                                className="w-full flex items-center gap-3 p-3 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                            >
                                <BookMarked size={18} />
                                Pinjamkan Buku Ini
                            </Link>
                            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <FileText size={18} />
                                Cetak Label QR
                            </button>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">Informasi Sistem</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">ID Buku</span>
                                <span className="text-gray-800 font-mono text-xs">{book.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Ditambahkan</span>
                                <span className="text-gray-800">{new Date(book.createdAt).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Diperbarui</span>
                                <span className="text-gray-800">{new Date(book.updatedAt).toLocaleDateString('id-ID')}</span>
                            </div>
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

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-400">{icon}</span>
            <span className="text-gray-500">{label}:</span>
            <span className="text-gray-800 font-medium">{value}</span>
        </div>
    );
}

function LendingStatusBadge({ status }: { status: string }) {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
        active: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Dipinjam' },
        overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Terlambat' },
        returned: { bg: 'bg-green-100', text: 'text-green-700', label: 'Dikembalikan' },
        returned_late: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Terlambat Kembali' },
        lost: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Hilang' },
    };

    const style = styles[status] || styles.active;

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${style.bg} ${style.text}`}>
            {style.label}
        </span>
    );
}
