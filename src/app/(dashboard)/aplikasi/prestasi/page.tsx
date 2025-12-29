/**
 * Halaman Prestasi
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Halaman untuk mengelola prestasi siswa/sekolah
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Trophy,
    Plus,
    Search,
    Medal,
    Star,
    Calendar,
    Users,
    Filter,
    Globe,
    Building,
    MapPin,
} from 'lucide-react';
import { MOCK_ACHIEVEMENTS } from '@/data/mock-content';
import type { Achievement } from '@/types/aplikasi';

const LEVEL_LABELS = {
    school: 'Sekolah',
    city: 'Kota',
    province: 'Provinsi',
    national: 'Nasional',
    international: 'Internasional',
};

const LEVEL_ICONS = {
    school: <Building size={14} />,
    city: <MapPin size={14} />,
    province: <MapPin size={14} />,
    national: <Globe size={14} />,
    international: <Globe size={14} />,
};

const MEDAL_COLORS = {
    gold: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Emas' },
    silver: { bg: 'bg-gray-200', text: 'text-gray-700', label: 'Perak' },
    bronze: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Perunggu' },
};

export default function PrestasiPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<string>('all');

    const filteredAchievements = MOCK_ACHIEVEMENTS.filter(ach => {
        const matchesSearch = ach.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'all' || ach.level === selectedLevel;
        return matchesSearch && matchesLevel;
    });

    // Stats
    const goldCount = MOCK_ACHIEVEMENTS.filter(a => a.medal === 'gold').length;
    const silverCount = MOCK_ACHIEVEMENTS.filter(a => a.medal === 'silver').length;
    const bronzeCount = MOCK_ACHIEVEMENTS.filter(a => a.medal === 'bronze').length;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/aplikasi" className="hover:text-indigo-600">Dashboard</Link>
                        <span>/</span>
                        <span>Prestasi</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Prestasi</h1>
                </div>

                <Link
                    href="/aplikasi/prestasi/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={16} />
                    Tambah Prestasi
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Prestasi" value={MOCK_ACHIEVEMENTS.length.toString()} icon={<Trophy size={20} />} color="#6366F1" />
                <StatCard label="Medali Emas" value={goldCount.toString()} icon={<Medal size={20} />} color="#F59E0B" />
                <StatCard label="Medali Perak" value={silverCount.toString()} icon={<Medal size={20} />} color="#6B7280" />
                <StatCard label="Medali Perunggu" value={bronzeCount.toString()} icon={<Medal size={20} />} color="#EA580C" />
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari prestasi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    >
                        <option value="all">Semua Tingkat</option>
                        <option value="school">Sekolah</option>
                        <option value="city">Kota</option>
                        <option value="province">Provinsi</option>
                        <option value="national">Nasional</option>
                        <option value="international">Internasional</option>
                    </select>
                </div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAchievements.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-12 shadow-sm text-center">
                        <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada prestasi</h3>
                        <p className="text-gray-500">Belum ada prestasi yang sesuai dengan filter</p>
                    </div>
                ) : (
                    filteredAchievements.map(achievement => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
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

function AchievementCard({ achievement }: { achievement: Achievement }) {
    const medalStyle = achievement.medal ? MEDAL_COLORS[achievement.medal] : null;
    const levelIcon = LEVEL_ICONS[achievement.level];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {medalStyle && (
                        <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${medalStyle.bg} ${medalStyle.text}`}>
                            <Medal size={12} />
                            {medalStyle.label}
                        </span>
                    )}
                    {achievement.rank && !achievement.medal && (
                        <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                            <Star size={12} />
                            Juara {achievement.rank}
                        </span>
                    )}
                </div>
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                    {levelIcon}
                    {LEVEL_LABELS[achievement.level]}
                </span>
            </div>

            {/* Content */}
            <h3 className="font-semibold text-gray-800 mb-2">{achievement.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{achievement.description}</p>

            {/* Participants */}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                    {achievement.participants.slice(0, 3).map((p, i) => (
                        <div
                            key={p.id}
                            className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center"
                        >
                            <span className="text-xs font-medium text-indigo-600">
                                {p.name.charAt(0)}
                            </span>
                        </div>
                    ))}
                </div>
                <span className="text-xs text-gray-500">
                    {achievement.participants.length} peserta
                </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    {new Date(achievement.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <Link
                    href={`/aplikasi/prestasi/${achievement.id}`}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
}
