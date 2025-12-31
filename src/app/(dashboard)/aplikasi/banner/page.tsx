/**
 * Aplikasi Banner Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Image, Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const MOCK_BANNERS = [
    { id: 1, title: 'Selamat Tahun Baru 2025', image: '/banners/newyear.jpg', position: 'home', status: 'active', startDate: '2024-12-25', endDate: '2025-01-07' },
    { id: 2, title: 'Pendaftaran Siswa Baru', image: '/banners/ppdb.jpg', position: 'home', status: 'active', startDate: '2024-12-01', endDate: '2025-03-31' },
    { id: 3, title: 'Promo SPP', image: '/banners/spp.jpg', position: 'payment', status: 'inactive', startDate: '2024-11-01', endDate: '2024-11-30' },
];

export default function BannerPage() {
    const [statusFilter, setStatusFilter] = useState('all');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/aplikasi" className="hover:text-[var(--brand-primary)]">Aplikasi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Banner</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Banner Aplikasi</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola banner promosi di aplikasi</p>
                </div>
                <Link href="/aplikasi/banner/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Tambah Banner
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Image size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_BANNERS.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Banner</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Eye size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_BANNERS.filter(b => b.status === 'active').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Aktif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <EyeOff size={18} className="text-[var(--text-muted)] mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_BANNERS.filter(b => b.status === 'inactive').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Nonaktif</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_BANNERS.map(banner => (
                    <div key={banner.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <Image size={32} className="text-white/50" />
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-[var(--text-primary)] text-sm">{banner.title}</h3>
                                <span className={`px-2 py-0.5 text-xs rounded ${banner.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'}`}>
                                    {banner.status}
                                </span>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mb-3">
                                {banner.startDate} - {banner.endDate}
                            </p>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs hover:bg-[var(--bg-active)]">
                                    <Edit size={12} className="inline mr-1" /> Edit
                                </button>
                                <button className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20">
                                    <Trash2 size={14} className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/aplikasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/aplikasi/pengumuman" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Pengumuman</Link>
                <Link href="/aplikasi/berita" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Berita</Link>
                <Link href="/aplikasi/notifikasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Notifikasi</Link>
                <Link href="/aplikasi/settings" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Settings</Link>
            </div>
        </div>
    );
}
