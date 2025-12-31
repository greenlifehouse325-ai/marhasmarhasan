/**
 * Perpustakaan Konten Digital Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, Download, Eye, Book, Video, Music } from 'lucide-react';
import Link from 'next/link';

const MOCK_CONTENT = [
    { id: 1, title: 'E-Book Matematika Kelas X', type: 'ebook', format: 'PDF', size: '15 MB', downloads: 234, author: 'Kemendikbud' },
    { id: 2, title: 'Video Pembelajaran Fisika', type: 'video', format: 'MP4', size: '250 MB', downloads: 567, author: 'Guru Fisika' },
    { id: 3, title: 'Audio Bahasa Inggris', type: 'audio', format: 'MP3', size: '45 MB', downloads: 123, author: 'British Council' },
    { id: 4, title: 'Modul Pemrograman Dasar', type: 'ebook', format: 'PDF', size: '8 MB', downloads: 890, author: 'Tim RPL' },
];

const getIcon = (type: string) => {
    switch (type) {
        case 'video': return Video;
        case 'audio': return Music;
        default: return Book;
    }
};

export default function KontenDigitalPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/perpustakaan" className="hover:text-[var(--brand-primary)]">Perpustakaan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Konten Digital</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Konten Digital</h1>
                    <p className="text-sm text-[var(--text-muted)]">E-Book, video, dan audio pembelajaran</p>
                </div>
                <Link href="/perpustakaan/konten-digital/upload" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Upload Konten
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Book size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_CONTENT.filter(c => c.type === 'ebook').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">E-Book</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Video size={18} className="text-red-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_CONTENT.filter(c => c.type === 'video').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Video</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Music size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_CONTENT.filter(c => c.type === 'audio').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Audio</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari konten..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {['all', 'ebook', 'video', 'audio'].map(type => (
                        <button key={type} onClick={() => setTypeFilter(type)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap ${typeFilter === type ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'}`}>
                            {type === 'all' ? 'Semua' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_CONTENT.map(content => {
                    const Icon = getIcon(content.type);
                    return (
                        <div key={content.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${content.type === 'ebook' ? 'bg-blue-500/10' : content.type === 'video' ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                                    <Icon size={24} className={content.type === 'ebook' ? 'text-blue-500' : content.type === 'video' ? 'text-red-500' : 'text-green-500'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[var(--text-primary)] text-sm truncate">{content.title}</h3>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">
                                        {content.format} • {content.size} • {content.author}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-xs text-[var(--text-muted)]">
                                            <Download size={12} className="inline mr-1" /> {content.downloads} downloads
                                        </span>
                                        <div className="flex gap-2 ml-auto">
                                            <button className="p-1.5 hover:bg-[var(--bg-hover)] rounded-lg">
                                                <Eye size={14} className="text-[var(--text-muted)]" />
                                            </button>
                                            <button className="p-1.5 hover:bg-[var(--bg-hover)] rounded-lg">
                                                <Download size={14} className="text-[var(--text-muted)]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/perpustakaan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/perpustakaan/buku" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Katalog Buku</Link>
                <Link href="/perpustakaan/kategori" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Kategori</Link>
                <Link href="/perpustakaan/settings" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Settings</Link>
            </div>
        </div>
    );
}
