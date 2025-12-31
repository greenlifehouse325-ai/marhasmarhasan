/**
 * Absensi Izin Page  
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { FileText, Search, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const MOCK_IZIN = [
    { id: 'IZ001', siswa: 'Ahmad Rizki', kelas: 'XII RPL 1', jenis: 'Sakit', tanggal: '2024-12-29', durasi: '3 hari', status: 'approved', keterangan: 'Demam' },
    { id: 'IZ002', siswa: 'Siti Nur', kelas: 'XI TKJ 1', jenis: 'Izin', tanggal: '2024-12-28', durasi: '1 hari', status: 'pending', keterangan: 'Acara keluarga' },
    { id: 'IZ003', siswa: 'Budi Santoso', kelas: 'X MM 1', jenis: 'Dispensasi', tanggal: '2024-12-27', durasi: '2 hari', status: 'approved', keterangan: 'Lomba' },
];

export default function IzinPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const pendingCount = MOCK_IZIN.filter(i => i.status === 'pending').length;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/absensi" className="hover:text-[var(--brand-primary)]">Absensi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Izin & Dispensasi</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Izin & Dispensasi</h1>
                    <p className="text-[var(--text-muted)]">Kelola surat izin siswa</p>
                </div>
                <Link href="/absensi/izin/create" className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                    <Plus size={16} />
                    Buat Izin
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Clock size={20} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{pendingCount}</p>
                    <p className="text-xs text-[var(--text-muted)]">Pending</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <CheckCircle size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">15</p>
                    <p className="text-xs text-[var(--text-muted)]">Approved</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <XCircle size={20} className="text-red-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">2</p>
                    <p className="text-xs text-[var(--text-muted)]">Ditolak</p>
                </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Siswa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jenis</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Tanggal</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Durasi</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_IZIN.map(izin => (
                            <tr key={izin.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-[var(--text-primary)]">{izin.siswa}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{izin.kelas}</p>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${izin.jenis === 'Sakit' ? 'bg-orange-500/10 text-orange-500' :
                                            izin.jenis === 'Izin' ? 'bg-blue-500/10 text-blue-500' :
                                                'bg-purple-500/10 text-purple-500'
                                        }`}>{izin.jenis}</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{izin.tanggal}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{izin.durasi}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${izin.status === 'approved' ? 'bg-green-500/10 text-green-600' :
                                            izin.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                                                'bg-red-500/10 text-red-500'
                                        }`}>{izin.status}</span>
                                </td>
                                <td className="px-4 py-3">
                                    {izin.status === 'pending' && (
                                        <div className="flex gap-1">
                                            <button className="p-1.5 hover:bg-green-500/10 rounded"><CheckCircle size={16} className="text-green-500" /></button>
                                            <button className="p-1.5 hover:bg-red-500/10 rounded"><XCircle size={16} className="text-red-500" /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/absensi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/absensi/hari-ini" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Hari Ini</Link>
                <Link href="/absensi/riwayat" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Riwayat</Link>
            </div>
        </div>
    );
}
