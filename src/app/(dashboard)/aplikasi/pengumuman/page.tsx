/**
 * Halaman Pengumuman
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Halaman untuk mengelola pengumuman sekolah
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Megaphone,
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    Clock,
    CheckCircle,
    FileText,
    Filter,
    ChevronLeft,
    ChevronRight,
    X,
    Users,
    AlertTriangle,
    Calendar,
} from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '@/data/mock-content';
import type { Announcement } from '@/types/aplikasi';

export default function PengumumanPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter
    const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(announcement => {
        const matchesSearch =
            announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.content.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatus === 'all' || announcement.status === selectedStatus;
        const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Stats
    const publishedCount = MOCK_ANNOUNCEMENTS.filter(a => a.status === 'published').length;
    const draftCount = MOCK_ANNOUNCEMENTS.filter(a => a.status === 'draft').length;
    const totalViews = MOCK_ANNOUNCEMENTS.reduce((sum, a) => sum + a.views, 0);

    // Pagination
    const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
    const paginatedAnnouncements = filteredAnnouncements.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all';

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedCategory('all');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/aplikasi" className="hover:text-indigo-600">Dashboard</Link>
                        <span>/</span>
                        <span>Pengumuman</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Pengumuman</h1>
                </div>

                <Link
                    href="/aplikasi/pengumuman/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={16} />
                    Buat Pengumuman
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Pengumuman"
                    value={MOCK_ANNOUNCEMENTS.length.toString()}
                    icon={<Megaphone size={20} />}
                    color="#6366F1"
                />
                <StatCard
                    label="Dipublikasi"
                    value={publishedCount.toString()}
                    icon={<CheckCircle size={20} />}
                    color="#10B981"
                />
                <StatCard
                    label="Draft"
                    value={draftCount.toString()}
                    icon={<FileText size={20} />}
                    color="#6B7280"
                />
                <StatCard
                    label="Total Views"
                    value={totalViews.toLocaleString()}
                    icon={<Eye size={20} />}
                    color="#3B82F6"
                />
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari pengumuman..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${showFilters || hasActiveFilters
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            >
                                <option value="all">Semua Status</option>
                                <option value="published">Dipublikasi</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Diarsipkan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Kategori</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            >
                                <option value="all">Semua Kategori</option>
                                <option value="academic">Akademik</option>
                                <option value="event">Kegiatan</option>
                                <option value="administrative">Administrasi</option>
                                <option value="holiday">Libur</option>
                                <option value="general">Umum</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <X size={16} />
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
                {paginatedAnnouncements.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
                        <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada pengumuman</h3>
                        <p className="text-gray-500">Belum ada pengumuman yang sesuai dengan filter</p>
                    </div>
                ) : (
                    paginatedAnnouncements.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAnnouncements.length)} dari {filteredAnnouncements.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
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

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
    const statusStyles = {
        published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Dipublikasi', icon: <CheckCircle size={12} /> },
        draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft', icon: <FileText size={12} /> },
        archived: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Diarsipkan', icon: <Clock size={12} /> },
    };

    const categoryStyles = {
        academic: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Akademik' },
        event: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Kegiatan' },
        administrative: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Administrasi' },
        holiday: { bg: 'bg-green-50', text: 'text-green-600', label: 'Libur' },
        general: { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Umum' },
    };

    const priorityStyles = {
        low: { color: '#6B7280' },
        normal: { color: '#3B82F6' },
        high: { color: '#F59E0B' },
        urgent: { color: '#EF4444' },
    };

    const status = statusStyles[announcement.status];
    const category = categoryStyles[announcement.category];
    const priority = priorityStyles[announcement.priority];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                {/* Priority Indicator */}
                <div
                    className="w-1 h-16 rounded-full flex-shrink-0"
                    style={{ backgroundColor: priority.color }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                                    {status.icon}
                                    {status.label}
                                </span>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${category.bg} ${category.text}`}>
                                    {category.label}
                                </span>
                                {announcement.priority === 'high' && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                                        <AlertTriangle size={10} />
                                        Penting
                                    </span>
                                )}
                                {announcement.priority === 'urgent' && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                                        <AlertTriangle size={10} />
                                        Urgent
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{announcement.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{announcement.excerpt || announcement.content}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <Link
                                href={`/aplikasi/pengumuman/${announcement.id}`}
                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Lihat"
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
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                        {announcement.publishedAt && (
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(announcement.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Users size={12} />
                            {[
                                announcement.targetAudience.students && 'Siswa',
                                announcement.targetAudience.teachers && 'Guru',
                                announcement.targetAudience.parents && 'Ortu',
                            ].filter(Boolean).join(', ')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {announcement.views.toLocaleString()} views
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
