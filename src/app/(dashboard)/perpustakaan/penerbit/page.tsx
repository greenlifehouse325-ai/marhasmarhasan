/**
 * Penerbit Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Building, Plus, Search, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const MOCK_PUBLISHERS = [
    { id: 1, name: 'Erlangga', books: 145, location: 'Jakarta' },
    { id: 2, name: 'Gramedia', books: 234, location: 'Jakarta' },
    { id: 3, name: 'Yudhistira', books: 89, location: 'Jakarta' },
    { id: 4, name: 'Tiga Serangkai', books: 67, location: 'Solo' },
    { id: 5, name: 'Bumi Aksara', books: 112, location: 'Jakarta' },
];

export default function PenerbitPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/perpustakaan" className="hover:text-[var(--brand-primary)]">Perpustakaan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Penerbit</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Penerbit</h1>
                    <p className="text-[var(--text-muted)]">Kelola data penerbit buku</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                    <Plus size={16} />
                    Tambah Penerbit
                </button>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                    type="text"
                    placeholder="Cari penerbit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl"
                />
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Penerbit</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Lokasi</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jumlah Buku</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_PUBLISHERS.map(pub => (
                            <tr key={pub.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <Building size={16} className="text-blue-500" />
                                        </div>
                                        <span className="font-medium text-[var(--text-primary)]">{pub.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{pub.location}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{pub.books} buku</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-1">
                                        <button className="p-1.5 hover:bg-[var(--bg-active)] rounded-lg"><Edit size={14} className="text-[var(--text-muted)]" /></button>
                                        <button className="p-1.5 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/perpustakaan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/perpustakaan/buku" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Katalog Buku</Link>
                <Link href="/perpustakaan/kategori" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Kategori</Link>
            </div>
        </div>
    );
}
