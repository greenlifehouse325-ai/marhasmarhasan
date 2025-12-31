/**
 * Absensi Hari Ini Page - Absensi Module
 * SMK Marhas Admin Dashboard
 * 
 * Halaman monitoring absensi realtime
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
    ClipboardCheck,
    Users,
    UserCheck,
    UserX,
    Clock,
    QrCode,
    RefreshCw,
    Search,
    Filter,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// Mock realtime data
const MOCK_ATTENDANCE = [
    { time: '07:15', name: 'Ahmad Rizki', class: 'XII RPL 1', status: 'hadir', method: 'QR Code' },
    { time: '07:18', name: 'Siti Nurhaliza', class: 'XII RPL 1', status: 'hadir', method: 'QR Code' },
    { time: '07:22', name: 'Budi Santoso', class: 'XII RPL 2', status: 'terlambat', method: 'QR Code' },
    { time: '07:25', name: 'Dewi Lestari', class: 'XI TKJ 1', status: 'hadir', method: 'Manual' },
    { time: '07:30', name: 'Rudi Hartono', class: 'XI TKJ 2', status: 'hadir', method: 'QR Code' },
];

const CLASS_STATS = [
    { name: 'XII RPL 1', total: 32, hadir: 30, izin: 1, sakit: 1, alpa: 0 },
    { name: 'XII RPL 2', total: 28, hadir: 25, izin: 2, sakit: 0, alpa: 1 },
    { name: 'XI TKJ 1', total: 35, hadir: 33, izin: 0, sakit: 2, alpa: 0 },
    { name: 'XI TKJ 2', total: 30, hadir: 28, izin: 1, sakit: 1, alpa: 0 },
];

export default function AbsensiHariIniPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const totalStudents = CLASS_STATS.reduce((sum, c) => sum + c.total, 0);
    const totalHadir = CLASS_STATS.reduce((sum, c) => sum + c.hadir, 0);
    const attendanceRate = Math.round((totalHadir / totalStudents) * 100);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Absensi Hari Ini
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        {currentTime.toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-[var(--brand-primary)]" />
                            <span className="font-mono text-lg font-semibold text-[var(--text-primary)]">
                                {currentTime.toLocaleTimeString('id-ID')}
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/absensi/session/create"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors"
                    >
                        <QrCode size={16} />
                        Buat Session
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Users size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalStudents}</p>
                            <p className="text-xs text-[var(--text-muted)]">Total Siswa</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <UserCheck size={20} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalHadir}</p>
                            <p className="text-xs text-[var(--text-muted)]">Hadir</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">4</p>
                            <p className="text-xs text-[var(--text-muted)]">Izin</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <UserX size={20} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">4</p>
                            <p className="text-xs text-[var(--text-muted)]">Sakit</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold">{attendanceRate}%</p>
                            <p className="text-xs text-green-100">Tingkat Kehadiran</p>
                        </div>
                        <TrendingUp size={32} className="text-green-200" />
                    </div>
                </div>
            </div>

            {/* Live Feed & Class Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Feed */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-[var(--border-light)] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <h3 className="font-semibold text-[var(--text-primary)]">Aktivitas Terkini</h3>
                        </div>
                        <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                            <RefreshCw size={16} className="text-[var(--text-muted)]" />
                        </button>
                    </div>
                    <div className="divide-y divide-[var(--border-light)] max-h-[400px] overflow-y-auto">
                        {MOCK_ATTENDANCE.map((item, idx) => (
                            <div key={idx} className="p-4 hover:bg-[var(--bg-hover)] transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                            ${item.status === 'hadir' ? 'bg-green-500/10' : 'bg-yellow-500/10'}
                                        `}>
                                            <UserCheck size={18} className={item.status === 'hadir' ? 'text-green-500' : 'text-yellow-500'} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                                            <p className="text-xs text-[var(--text-muted)]">{item.class}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-sm text-[var(--text-secondary)]">{item.time}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{item.method}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Class Stats */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-[var(--border-light)]">
                        <h3 className="font-semibold text-[var(--text-primary)]">Statistik per Kelas</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {CLASS_STATS.map((cls, idx) => {
                            const rate = Math.round((cls.hadir / cls.total) * 100);
                            return (
                                <div key={idx}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-[var(--text-primary)]">{cls.name}</span>
                                        <span className="text-sm text-[var(--text-muted)]">{cls.hadir}/{cls.total} ({rate}%)</span>
                                    </div>
                                    <div className="h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all"
                                            style={{ width: `${rate}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
