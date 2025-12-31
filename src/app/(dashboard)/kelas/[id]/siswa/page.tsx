/**
 * Kelas Siswa List Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Download, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_SISWA = [
    { id: 'S001', name: 'Ahmad Rizki', nisn: '0012345678', gender: 'L', status: 'active' },
    { id: 'S002', name: 'Budi Santoso', nisn: '0012345679', gender: 'L', status: 'active' },
    { id: 'S003', name: 'Citra Dewi', nisn: '0012345680', gender: 'P', status: 'active' },
    { id: 'S004', name: 'Dina Lestari', nisn: '0012345681', gender: 'P', status: 'active' },
    { id: 'S005', name: 'Eko Prasetyo', nisn: '0012345682', gender: 'L', status: 'active' },
];

export default function KelasSiswaPage() {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSiswa = MOCK_SISWA.filter(siswa =>
        siswa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        siswa.nisn.includes(searchQuery)
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href={`/kelas/${params.id}`} className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                        <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Daftar Siswa X RPL 1</h1>
                        <p className="text-[var(--text-muted)]">{MOCK_SISWA.length} siswa terdaftar</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium">
                        <Download size={16} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium">
                        <UserPlus size={16} />
                        Tambah Siswa
                    </button>
                </div>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" placeholder="Cari siswa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">No</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Nama Siswa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">NISN</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">L/P</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {filteredSiswa.map((siswa, idx) => (
                            <tr key={siswa.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-4 text-[var(--text-muted)]">{idx + 1}</td>
                                <td className="px-4 py-4 font-medium text-[var(--text-primary)]">{siswa.name}</td>
                                <td className="px-4 py-4 text-sm font-mono text-[var(--text-secondary)]">{siswa.nisn}</td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-0.5 text-xs rounded ${siswa.gender === 'L' ? 'bg-blue-500/10 text-blue-600' : 'bg-pink-500/10 text-pink-600'}`}>
                                        {siswa.gender}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/10 text-green-600">Aktif</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-1">
                                        <Link href={`/siswa/${siswa.id}`} className="p-2 hover:bg-[var(--bg-active)] rounded-lg"><Eye size={16} className="text-[var(--text-muted)]" /></Link>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
