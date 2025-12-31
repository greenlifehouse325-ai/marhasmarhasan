/**
 * Super Admin Sessions Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, Globe, Trash2, Search, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const MOCK_SESSIONS = [
    { id: 'S001', user: 'Admin Rizky', device: 'Windows PC', browser: 'Chrome 120', ip: '192.168.1.1', location: 'Jakarta', lastActive: '2 menit lalu', current: true },
    { id: 'S002', user: 'Admin Siti', device: 'iPhone 14', browser: 'Safari', ip: '192.168.1.25', location: 'Bandung', lastActive: '15 menit lalu', current: false },
    { id: 'S003', user: 'Admin Budi', device: 'MacBook Pro', browser: 'Firefox', ip: '192.168.1.50', location: 'Surabaya', lastActive: '1 jam lalu', current: false },
    { id: 'S004', user: 'Admin Dewi', device: 'Android Tablet', browser: 'Chrome', ip: '192.168.1.75', location: 'Medan', lastActive: '3 jam lalu', current: false },
];

const getDeviceIcon = (device: string) => {
    if (device.includes('iPhone') || device.includes('Android')) return Smartphone;
    if (device.includes('Tablet') || device.includes('iPad')) return Tablet;
    return Monitor;
};

export default function SessionsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/super-admin" className="hover:text-[var(--brand-primary)]">Super Admin</Link>
                <span>/</span>
                <Link href="/super-admin/security" className="hover:text-[var(--brand-primary)]">Security</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Sessions</span>
            </div>

            {/* Header - Responsive */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Active Sessions</h1>
                    <p className="text-sm text-[var(--text-muted)]">Monitor dan kelola sesi aktif</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 text-sm font-medium w-full sm:w-auto">
                    <Trash2 size={16} />
                    Logout Semua
                </button>
            </div>

            {/* Stats - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Globe size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_SESSIONS.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Sessions</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Monitor size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">2</p>
                    <p className="text-xs text-[var(--text-muted)]">Desktop</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Smartphone size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">1</p>
                    <p className="text-xs text-[var(--text-muted)]">Mobile</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Tablet size={18} className="text-orange-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">1</p>
                    <p className="text-xs text-[var(--text-muted)]">Tablet</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" placeholder="Cari user atau device..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
            </div>

            {/* Sessions - Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_SESSIONS.map(session => {
                    const DeviceIcon = getDeviceIcon(session.device);
                    return (
                        <div key={session.id} className={`bg-[var(--bg-card)] border rounded-xl p-4 ${session.current ? 'border-green-500' : 'border-[var(--border-light)]'}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center">
                                        <DeviceIcon size={20} className="text-[var(--text-muted)]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">{session.user}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{session.device}</p>
                                    </div>
                                </div>
                                {session.current && <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded-lg">Current</span>}
                            </div>
                            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                                <span>{session.location} • {session.ip}</span>
                                <span>{session.lastActive}</span>
                            </div>
                            {!session.current && (
                                <button className="mt-3 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-medium rounded-lg">
                                    Logout
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Sessions - Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">User</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Device</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Location</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Last Active</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_SESSIONS.map(session => {
                            const DeviceIcon = getDeviceIcon(session.device);
                            return (
                                <tr key={session.id} className="hover:bg-[var(--bg-hover)]">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-[var(--text-primary)]">{session.user}</span>
                                            {session.current && <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded">Current</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <DeviceIcon size={16} className="text-[var(--text-muted)]" />
                                            <span className="text-sm text-[var(--text-secondary)]">{session.device}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{session.location} ({session.ip})</td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{session.lastActive}</td>
                                    <td className="px-4 py-3 text-center">
                                        {!session.current && (
                                            <button className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs rounded-lg">
                                                Logout
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap gap-2">
                <Link href="/super-admin" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/super-admin/security" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Security</Link>
                <Link href="/super-admin/users" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Users</Link>
                <Link href="/super-admin/audit-log" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Audit Log</Link>
            </div>
        </div>
    );
}
