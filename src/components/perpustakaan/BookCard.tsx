/**
 * Book Card Component
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Card untuk menampilkan info buku
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, User, Calendar, MapPin, Eye, Edit, Trash2 } from 'lucide-react';
import type { Book } from '@/types/perpustakaan';

interface BookCardProps {
    book: Book;
    onEdit?: (book: Book) => void;
    onDelete?: (book: Book) => void;
}

const STATUS_STYLES: Record<Book['status'], { bg: string; text: string; label: string }> = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Tersedia' },
    limited: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Terbatas' },
    unavailable: { bg: 'bg-red-100', text: 'text-red-700', label: 'Tidak Tersedia' },
};

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
    const status = STATUS_STYLES[book.status];

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            {/* Cover */}
            <div className="aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen size={48} className="text-emerald-300" />
                </div>

                {/* Status Badge */}
                <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                    {status.label}
                </span>

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                        href={`/perpustakaan/buku/${book.id}`}
                        className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <Eye size={18} />
                    </Link>
                    {onEdit && (
                        <button
                            onClick={() => onEdit(book)}
                            className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <Edit size={18} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(book)}
                            className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">{book.title}</h3>

                <div className="mt-2 space-y-1">
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                        <User size={14} />
                        <span className="truncate">{book.author}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        {book.publishedYear}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={14} />
                        Rak {book.location}
                    </p>
                </div>

                {/* Stock */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Stok</span>
                    <span className="text-sm font-medium text-gray-800">
                        {book.availableCopies}/{book.totalCopies}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
