/**
 * Kategori Buku Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Tag, Plus, Search, Edit, Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_CATEGORIES = [
    { id: 1, name: 'Fiksi', slug: 'fiksi', count: 234, color: '#3B82F6' },
    { id: 2, name: 'Non-Fiksi', slug: 'non-fiksi', count: 456, color: '#10B981' },
    { id: 3, name: 'Pendidikan', slug: 'pendidikan', count: 789, color: '#8B5CF6' },
    { id: 4, name: 'Sains', slug: 'sains', count: 123, color: '#F59E0B' },
    { id: 5, name: 'Sejarah', slug: 'sejarah', count: 67, color: '#EF4444' },
    { id: 6, name: 'Bahasa', slug: 'bahasa', count: 198, color: '#EC4899' },
];

export default function KategoriPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/perpustakaan" className="hover:text-[var(--brand-primary)]">Perpustakaan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Kategori</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Kategori Buku</h1>
                    <p className="text-[var(--text-muted)]">Kelola kategori koleksi buku</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                    <Plus size={16} />
                    Tambah Kategori
                </button>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                    type="text"
                    placeholder="Cari kategori..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_CATEGORIES.map(cat => (
                    <div key={cat.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                                    <Tag size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)]">{cat.name}</h3>
                                    <p className="text-xs text-[var(--text-muted)]">{cat.count} buku</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-[var(--bg-hover)] rounded-lg"><Edit size={14} className="text-[var(--text-muted)]" /></button>
                                <button className="p-1.5 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/perpustakaan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/perpustakaan/buku" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Katalog Buku</Link>
                <Link href="/perpustakaan/penerbit" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Penerbit</Link>
            </div>
        </div>
    );
}
