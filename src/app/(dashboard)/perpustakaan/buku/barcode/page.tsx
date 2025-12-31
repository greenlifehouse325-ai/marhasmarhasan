/**
 * Barcode Buku Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Printer, Download, Search, QrCode } from 'lucide-react';
import Link from 'next/link';

const MOCK_BOOKS = [
    { id: 'B001', title: 'Pemrograman Web', isbn: '978-602-123-456-7', barcode: 'BKU-001' },
    { id: 'B002', title: 'Algoritma & Struktur Data', isbn: '978-602-123-456-8', barcode: 'BKU-002' },
    { id: 'B003', title: 'Basis Data Lanjut', isbn: '978-602-123-456-9', barcode: 'BKU-003' },
];

export default function BarcodePage() {
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

    const toggleBook = (id: string) => {
        setSelectedBooks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
    };

    const selectAll = () => {
        setSelectedBooks(selectedBooks.length === MOCK_BOOKS.length ? [] : MOCK_BOOKS.map(b => b.id));
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/perpustakaan/buku" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                        <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Cetak Barcode</h1>
                        <p className="text-[var(--text-muted)]">Generate dan cetak barcode untuk buku</p>
                    </div>
                </div>
                {selectedBooks.length > 0 && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium">
                        <Printer size={16} />
                        Cetak {selectedBooks.length} Barcode
                    </button>
                )}
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[var(--border-light)] flex justify-between items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={selectedBooks.length === MOCK_BOOKS.length} onChange={selectAll} className="w-4 h-4" />
                        <span className="text-sm text-[var(--text-secondary)]">Pilih Semua</span>
                    </label>
                </div>
                <div className="divide-y divide-[var(--border-light)]">
                    {MOCK_BOOKS.map(book => (
                        <div key={book.id} className="p-4 flex items-center gap-4 hover:bg-[var(--bg-hover)]">
                            <input type="checkbox" checked={selectedBooks.includes(book.id)} onChange={() => toggleBook(book.id)} className="w-4 h-4" />
                            <div className="flex-1">
                                <p className="font-medium text-[var(--text-primary)]">{book.title}</p>
                                <p className="text-sm text-[var(--text-muted)]">ISBN: {book.isbn}</p>
                            </div>
                            <div className="w-24 h-12 bg-[var(--bg-hover)] rounded flex items-center justify-center">
                                <QrCode size={24} className="text-[var(--text-muted)]" />
                            </div>
                            <span className="font-mono text-sm text-[var(--text-primary)]">{book.barcode}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
