/**
 * Halaman Berita
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Halaman untuk mengelola berita sekolah
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Newspaper,
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    Clock,
    CheckCircle,
    FileText,
    Image,
    Star,
    Calendar,
} from 'lucide-react';
import { MOCK_NEWS } from '@/data/mock-content';
import type { News } from '@/types/aplikasi';

const CATEGORY_LABELS = {
    achievement: 'Prestasi',
    activity: 'Kegiatan',
    education: 'Pendidikan',
    sports: 'Olahraga',
    technology: 'Teknologi',
};

const CATEGORY_COLORS = {
    achievement: { bg: 'bg-amber-100', text: 'text-amber-700' },
    activity: { bg: 'bg-blue-100', text: 'text-blue-700' },
    education: { bg: 'bg-green-100', text: 'text-green-700' },
    sports: { bg: 'bg-red-100', text: 'text-red-700' },
    technology: { bg: 'bg-purple-100', text: 'text-purple-700' },
};

export default function BeritaPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredNews = MOCK_NEWS.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || news.status === selectedStatus;
        const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const publishedCount = MOCK_NEWS.filter(n => n.status === 'published').length;
    const draftCount = MOCK_NEWS.filter(n => n.status === 'draft').length;
    const featuredCount = MOCK_NEWS.filter(n => n.featured).length;
    const totalViews = MOCK_NEWS.reduce((sum, n) => sum + n.views, 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/aplikasi" className="hover:text-indigo-600">Dashboard</Link>
                        <span>/</span>
                        <span>Berita</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Berita Sekolah</h1>
                </div>

                <Link
                    href="/aplikasi/berita/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={16} />
                    Tulis Berita
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Berita" value={MOCK_NEWS.length.toString()} icon={<Newspaper size={20} />} color="#6366F1" />
                <StatCard label="Dipublikasi" value={publishedCount.toString()} icon={<CheckCircle size={20} />} color="#10B981" />
                <StatCard label="Featured" value={featuredCount.toString()} icon={<Star size={20} />} color="#F59E0B" />
                <StatCard label="Total Views" value={totalViews.toLocaleString()} icon={<Eye size={20} />} color="#3B82F6" />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    <select
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    >
                        <option value="all">Semua Status</option>
                        <option value="published">Dipublikasi</option>
                        <option value="draft">Draft</option>
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    >
                        <option value="all">Semua Kategori</option>
                        <option value="achievement">Prestasi</option>
                        <option value="activity">Kegiatan</option>
                        <option value="education">Pendidikan</option>
                        <option value="sports">Olahraga</option>
                        <option value="technology">Teknologi</option>
                    </select>
                </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-12 shadow-sm text-center">
                        <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada berita</h3>
                        <p className="text-gray-500">Belum ada berita yang sesuai dengan filter</p>
                    </div>
                ) : (
                    filteredNews.map(news => (
                        <NewsCard key={news.id} news={news} />
                    ))
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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
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

function NewsCard({ news }: { news: News }) {
    const categoryStyle = CATEGORY_COLORS[news.category];

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                <Image size={40} className="text-indigo-300" />
                {news.featured && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-500 text-white rounded-full">
                        <Star size={10} />
                        Featured
                    </span>
                )}
                {news.status === 'draft' && (
                    <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-gray-800/70 text-white rounded-full">
                        Draft
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryStyle.bg} ${categoryStyle.text}`}>
                        {CATEGORY_LABELS[news.category]}
                    </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{news.excerpt}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {news.publishedAt
                                ? new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                                : 'Belum publish'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {news.views}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={14} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
