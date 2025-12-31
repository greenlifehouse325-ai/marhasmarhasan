/**
 * Bug Reports Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Bug, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const MOCK_BUGS = [
    { id: 'BUG001', title: 'Aplikasi crash saat login', device: 'iPhone 12', version: '2.1.0', date: '2024-12-29', status: 'open', priority: 'high' },
    { id: 'BUG002', title: 'Notifikasi tidak muncul', device: 'Samsung A52', version: '2.1.0', date: '2024-12-28', status: 'investigating', priority: 'medium' },
    { id: 'BUG003', title: 'Jadwal tidak sinkron', device: 'OPPO A5', version: '2.0.5', date: '2024-12-27', status: 'fixed', priority: 'low' },
];

export default function BugReportsPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const openCount = MOCK_BUGS.filter(b => b.status === 'open').length;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/aplikasi" className="hover:text-[var(--brand-primary)]">Aplikasi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Bug Reports</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Bug Reports</h1>
                    <p className="text-[var(--text-muted)]">Laporan bug dari pengguna aplikasi</p>
                </div>
                {openCount > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-xl">
                        <Bug size={18} className="text-red-500" />
                        <span className="text-sm font-medium text-red-500">{openCount} bug open</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <AlertCircle size={20} className="text-red-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{openCount}</p>
                    <p className="text-xs text-[var(--text-muted)]">Open</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Clock size={20} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">3</p>
                    <p className="text-xs text-[var(--text-muted)]">Investigating</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <CheckCircle size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">28</p>
                    <p className="text-xs text-[var(--text-muted)]">Fixed</p>
                </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Bug</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Device</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Priority</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_BUGS.map(bug => (
                            <tr key={bug.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3 font-mono text-sm text-[var(--text-muted)]">{bug.id}</td>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-[var(--text-primary)]">{bug.title}</p>
                                    <p className="text-xs text-[var(--text-muted)]">v{bug.version} • {bug.date}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{bug.device}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${bug.status === 'open' ? 'bg-red-500/10 text-red-500' :
                                            bug.status === 'investigating' ? 'bg-yellow-500/10 text-yellow-600' :
                                                'bg-green-500/10 text-green-600'
                                        }`}>{bug.status}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${bug.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                                            bug.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                                                'bg-[var(--bg-hover)] text-[var(--text-muted)]'
                                        }`}>{bug.priority}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/aplikasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/aplikasi/moderasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Moderasi</Link>
                <Link href="/aplikasi/notifikasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Notifikasi</Link>
            </div>
        </div>
    );
}
