/**
 * Super Admin Backup Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Database, Download, Upload, Clock, HardDrive, RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const MOCK_BACKUPS = [
    { id: 1, name: 'backup_2024-12-29_auto.sql', size: '125 MB', type: 'auto', date: '2024-12-29 02:00', status: 'completed' },
    { id: 2, name: 'backup_2024-12-28_auto.sql', size: '124 MB', type: 'auto', date: '2024-12-28 02:00', status: 'completed' },
    { id: 3, name: 'backup_2024-12-25_manual.sql', size: '123 MB', type: 'manual', date: '2024-12-25 15:30', status: 'completed' },
];

export default function BackupPage() {
    const [isBackingUp, setIsBackingUp] = useState(false);

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/super-admin" className="hover:text-[var(--brand-primary)]">Super Admin</Link>
                <span>/</span>
                <Link href="/super-admin/system" className="hover:text-[var(--brand-primary)]">System</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Backup</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Backup & Restore</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola backup database</p>
                </div>
                <button onClick={() => setIsBackingUp(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    {isBackingUp ? <RefreshCw size={16} className="animate-spin" /> : <Database size={16} />}
                    {isBackingUp ? 'Backing up...' : 'Backup Sekarang'}
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Database size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{MOCK_BACKUPS.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Backup</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <HardDrive size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">372 MB</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Size</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Clock size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">02:00</p>
                    <p className="text-xs text-[var(--text-muted)]">Auto Backup</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <RefreshCw size={18} className="text-orange-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">7</p>
                    <p className="text-xs text-[var(--text-muted)]">Retention Days</p>
                </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-yellow-600 text-sm">Restore akan menimpa data saat ini</p>
                    <p className="text-xs text-yellow-600/80 mt-1">Pastikan untuk backup terlebih dahulu sebelum melakukan restore.</p>
                </div>
            </div>

            {/* Backup List - Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_BACKUPS.map(backup => (
                    <div key={backup.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-medium text-[var(--text-primary)] text-sm">{backup.name}</p>
                                <p className="text-xs text-[var(--text-muted)]">{backup.date}</p>
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded ${backup.type === 'auto' ? 'bg-blue-500/10 text-blue-600' : 'bg-purple-500/10 text-purple-600'}`}>
                                {backup.type}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--text-muted)]">{backup.size}</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[var(--bg-hover)] rounded text-xs">
                                    <Download size={12} className="inline mr-1" /> Download
                                </button>
                                <button className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded text-xs">
                                    <Upload size={12} className="inline mr-1" /> Restore
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Backup List - Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Nama File</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Tanggal</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Size</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Type</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_BACKUPS.map(backup => (
                            <tr key={backup.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3 font-mono text-sm text-[var(--text-primary)]">{backup.name}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{backup.date}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{backup.size}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded ${backup.type === 'auto' ? 'bg-blue-500/10 text-blue-600' : 'bg-purple-500/10 text-purple-600'}`}>
                                        {backup.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 bg-[var(--bg-hover)] rounded text-xs hover:bg-[var(--bg-active)]">Download</button>
                                        <button className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded text-xs hover:bg-yellow-500/20">Restore</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/super-admin" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/super-admin/system" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">System</Link>
                <Link href="/super-admin/security" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Security</Link>
                <Link href="/super-admin/audit-log" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Audit Log</Link>
            </div>
        </div>
    );
}
