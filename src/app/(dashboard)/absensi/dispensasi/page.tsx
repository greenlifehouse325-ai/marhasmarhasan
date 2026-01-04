/**
 * Dispensasi Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Search, Plus, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb, SearchEmptyState } from '@/components/shared';

const MOCK_DISPENSASI = [
    { id: 'D001', siswa: 'Ahmad Rizki', kelas: 'XII RPL 1', alasan: 'Lomba Olimpiade', tanggal: '2024-01-15', waktu: '08:00 - 12:00', status: 'approved' },
    { id: 'D002', siswa: 'Siti Nurhaliza', kelas: 'XII RPL 2', alasan: 'Kegiatan OSIS', tanggal: '2024-01-16', waktu: '10:00 - 12:00', status: 'pending' },
    { id: 'D003', siswa: 'Budi Santoso', kelas: 'XI TKJ 1', alasan: 'Ujian SIM', tanggal: '2024-01-17', waktu: 'Full Day', status: 'rejected' },
];

export default function DispensasiPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = MOCK_DISPENSASI.filter(d => {
        const matchesSearch = d.siswa.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleClearSearch = () => {
        setSearchQuery('');
        setStatusFilter('all');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Absensi', href: '/absensi' },
                    { label: 'Dispensasi' }
                ]}
                showHome
                homeHref="/absensi"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dispensasi</h1>
                    <p className="text-[var(--text-muted)]">Kelola permintaan dispensasi siswa</p>
                </div>
                <Link href="/absensi/dispensasi/create" className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium">
                    <Plus size={16} />
                    Buat Dispensasi
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_DISPENSASI.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-amber-600">{MOCK_DISPENSASI.filter(d => d.status === 'pending').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Pending</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">{MOCK_DISPENSASI.filter(d => d.status === 'approved').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Approved</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-500">{MOCK_DISPENSASI.filter(d => d.status === 'rejected').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Rejected</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari siswa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)]" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]">
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                {filtered.length === 0 ? (
                    <SearchEmptyState
                        searchQuery={searchQuery || (statusFilter !== 'all' ? statusFilter : '')}
                        onClear={handleClearSearch}
                    />
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Siswa</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Alasan</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Waktu</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {filtered.map(d => (
                                <tr key={d.id} className="hover:bg-[var(--bg-hover)]">
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-[var(--text-primary)]">{d.siswa}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{d.kelas}</p>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{d.alasan}</td>
                                    <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{d.tanggal}</td>
                                    <td className="px-4 py-4 text-sm text-[var(--text-muted)]">{d.waktu}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-lg ${d.status === 'approved' ? 'bg-green-500/10 text-green-600' : d.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-600'}`}>
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button className="p-2 hover:bg-[var(--bg-active)] rounded-lg"><Eye size={16} className="text-[var(--text-muted)]" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
