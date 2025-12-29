/**
 * Halaman Session QR Absensi
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Halaman untuk mengelola session absensi dan QR code
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    QrCode,
    Plus,
    Search,
    Calendar,
    Clock,
    Users,
    Play,
    Pause,
    Eye,
    RefreshCw,
    CheckCircle,
    ChevronRight,
    MapPin,
} from 'lucide-react';
import { MOCK_SESSIONS, getActiveSessions, getScheduledSessions } from '@/data/mock-attendance';
import type { AttendanceSession } from '@/types/absensi';

export default function SessionPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState<'active' | 'scheduled' | 'ended'>('active');

    const activeSessions = getActiveSessions();
    const scheduledSessions = getScheduledSessions();
    const endedSessions = MOCK_SESSIONS.filter(s => s.status === 'ended');

    const filteredSessions = MOCK_SESSIONS.filter(session => {
        const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = session.status === selectedTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/absensi" className="hover:text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span>Session QR</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Session Absensi</h1>
                </div>

                <Link
                    href="/absensi/session/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    Buat Session
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Session Aktif"
                    value={activeSessions.length.toString()}
                    icon={<Play size={20} />}
                    color="#10B981"
                />
                <StatCard
                    label="Terjadwal"
                    value={scheduledSessions.length.toString()}
                    icon={<Clock size={20} />}
                    color="#3B82F6"
                />
                <StatCard
                    label="Selesai Hari Ini"
                    value={endedSessions.length.toString()}
                    icon={<CheckCircle size={20} />}
                    color="#6B7280"
                />
                <StatCard
                    label="Total Scan"
                    value={activeSessions.reduce((sum, s) => sum + s.scannedCount, 0).toLocaleString()}
                    icon={<QrCode size={20} />}
                    color="#8B5CF6"
                />
            </div>

            {/* Search & Tabs */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari session..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex rounded-xl bg-gray-100 p-1">
                        <button
                            onClick={() => setSelectedTab('active')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTab === 'active'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <Play size={14} />
                            Aktif ({activeSessions.length})
                        </button>
                        <button
                            onClick={() => setSelectedTab('scheduled')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTab === 'scheduled'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <Clock size={14} />
                            Terjadwal ({scheduledSessions.length})
                        </button>
                        <button
                            onClick={() => setSelectedTab('ended')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTab === 'ended'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <CheckCircle size={14} />
                            Selesai ({endedSessions.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Session Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSessions.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-12 shadow-sm text-center">
                        <QrCode size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada session</h3>
                        <p className="text-gray-500">
                            {selectedTab === 'active'
                                ? 'Tidak ada session yang sedang aktif'
                                : selectedTab === 'scheduled'
                                    ? 'Tidak ada session terjadwal'
                                    : 'Tidak ada session yang sudah selesai'}
                        </p>
                    </div>
                ) : (
                    filteredSessions.map((session) => (
                        <SessionCard key={session.id} session={session} />
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

function SessionCard({ session }: { session: AttendanceSession }) {
    const percentage = Math.round((session.scannedCount / session.targetCount) * 100);

    const statusStyles = {
        active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aktif', icon: <RefreshCw size={12} className="animate-spin" /> },
        scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Terjadwal', icon: <Clock size={12} /> },
        ended: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Selesai', icon: <CheckCircle size={12} /> },
    };

    const typeStyles = {
        regular: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Reguler' },
        ceremony: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Upacara' },
        event: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Kegiatan' },
        exam: { bg: 'bg-red-50', text: 'text-red-600', label: 'Ujian' },
    };

    const status = statusStyles[session.status];
    const type = typeStyles[session.type];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                            {status.icon}
                            {status.label}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${type.bg} ${type.text}`}>
                            {type.label}
                        </span>
                    </div>
                    <h3 className="font-semibold text-gray-800">{session.title}</h3>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{session.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>{session.startTime} - {session.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>Kampus {session.campus}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={14} />
                    <span>
                        {Array.isArray(session.targetClasses)
                            ? `${session.targetClasses.length} Kelas`
                            : 'Semua Kelas'}
                    </span>
                </div>
            </div>

            {/* Progress */}
            {session.status !== 'scheduled' && (
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-800">{session.scannedCount}/{session.targetCount}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${percentage >= 90 ? 'bg-green-500' : percentage >= 70 ? 'bg-amber-500' : 'bg-blue-500'
                                }`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-right">{percentage}% hadir</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <Link
                    href={`/absensi/session/${session.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    {session.status === 'active' ? (
                        <>
                            <QrCode size={16} />
                            Lihat QR
                        </>
                    ) : (
                        <>
                            <Eye size={16} />
                            Detail
                        </>
                    )}
                </Link>
                {session.status === 'active' && (
                    <button className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <Pause size={18} />
                    </button>
                )}
                {session.status === 'scheduled' && (
                    <button className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors">
                        <Play size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
