/**
 * Admin Activity Log Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { ArrowLeft, Activity, Clock, Monitor, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_ACTIVITIES = [
    { id: 1, action: 'Login', timestamp: '2024-01-15 08:30:00', ip: '192.168.1.100', device: 'Chrome / Windows' },
    { id: 2, action: 'Mengubah data buku', timestamp: '2024-01-15 09:15:00', ip: '192.168.1.100', device: 'Chrome / Windows' },
    { id: 3, action: 'Menambah peminjaman', timestamp: '2024-01-15 10:00:00', ip: '192.168.1.100', device: 'Chrome / Windows' },
    { id: 4, action: 'Export laporan', timestamp: '2024-01-15 11:30:00', ip: '192.168.1.100', device: 'Chrome / Windows' },
    { id: 5, action: 'Logout', timestamp: '2024-01-15 16:00:00', ip: '192.168.1.100', device: 'Chrome / Windows' },
];

export default function AdminActivityPage() {
    const params = useParams();

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
                <Link href={`/super-admin/admins/${params.id}`} className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Log Aktivitas Admin</h1>
                    <p className="text-[var(--text-muted)]">ID: {params.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">156</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Aktivitas</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">23</p>
                    <p className="text-sm text-[var(--text-muted)]">Hari Ini</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-[var(--text-muted)]">Login Minggu Ini</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-purple-600">3</p>
                    <p className="text-sm text-[var(--text-muted)]">Perangkat</p>
                </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[var(--border-light)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <Activity size={20} className="text-[var(--brand-primary)]" />
                        Riwayat Aktivitas
                    </h2>
                </div>
                <div className="divide-y divide-[var(--border-light)]">
                    {MOCK_ACTIVITIES.map(activity => (
                        <div key={activity.id} className="p-4 hover:bg-[var(--bg-hover)] transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">{activity.action}</p>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-[var(--text-muted)]">
                                        <span className="flex items-center gap-1"><Clock size={14} />{activity.timestamp}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} />{activity.ip}</span>
                                        <span className="flex items-center gap-1"><Monitor size={14} />{activity.device}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
