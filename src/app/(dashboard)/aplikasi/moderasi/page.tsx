/**
 * Aplikasi Moderasi Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Flag, Search, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
import Link from 'next/link';

const MOCK_REPORTS = [
    { id: 'R001', type: 'komentar', content: 'Komentar tidak pantas', reporter: 'Ahmad', reported: 'Budi', date: '2024-12-29', status: 'pending' },
    { id: 'R002', type: 'profil', content: 'Foto tidak sesuai', reporter: 'Siti', reported: 'Dewi', date: '2024-12-28', status: 'reviewed' },
    { id: 'R003', type: 'spam', content: 'Spam di forum', reporter: 'Auto', reported: 'User123', date: '2024-12-27', status: 'resolved' },
];

export default function ModerasiPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const pendingCount = MOCK_REPORTS.filter(r => r.status === 'pending').length;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/aplikasi" className="hover:text-[var(--brand-primary)]">Aplikasi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Moderasi</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Moderasi Konten</h1>
                    <p className="text-[var(--text-muted)]">Review laporan pengguna</p>
                </div>
                {pendingCount > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-xl">
                        <AlertTriangle size={18} className="text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-600">{pendingCount} pending</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Flag size={20} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{pendingCount}</p>
                    <p className="text-xs text-[var(--text-muted)]">Pending</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Eye size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">12</p>
                    <p className="text-xs text-[var(--text-muted)]">Reviewed</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <CheckCircle size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">45</p>
                    <p className="text-xs text-[var(--text-muted)]">Resolved</p>
                </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                {MOCK_REPORTS.map(report => (
                    <div key={report.id} className="p-4 border-b border-[var(--border-light)] hover:bg-[var(--bg-hover)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="px-2 py-0.5 bg-[var(--bg-hover)] rounded text-xs">{report.type}</span>
                                <p className="font-medium text-[var(--text-primary)] mt-1">{report.content}</p>
                                <p className="text-xs text-[var(--text-muted)]">{report.reported} • {report.date}</p>
                            </div>
                            <div className="flex gap-2">
                                {report.status === 'pending' && (
                                    <>
                                        <button className="p-2 hover:bg-green-500/10 rounded-lg"><CheckCircle size={18} className="text-green-500" /></button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg"><XCircle size={18} className="text-red-500" /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/aplikasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/aplikasi/notifikasi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Notifikasi</Link>
                <Link href="/aplikasi/bug-reports" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Bug Reports</Link>
            </div>
        </div>
    );
}
