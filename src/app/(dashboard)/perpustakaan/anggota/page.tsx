/**
 * Perpustakaan Anggota Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, UserCheck, UserX, QrCode, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_MEMBERS = [
    { id: 'M001', nama: 'Ahmad Rizki', nis: '12345', kelas: 'XII RPL 1', status: 'active', pinjaman: 2, joinDate: '2022-07-15' },
    { id: 'M002', nama: 'Siti Nurhaliza', nis: '12346', kelas: 'XI TKJ 1', status: 'active', pinjaman: 1, joinDate: '2023-07-15' },
    { id: 'M003', nama: 'Budi Santoso', nis: '12347', kelas: 'X MM 1', status: 'blocked', pinjaman: 0, joinDate: '2024-07-15' },
];

export default function AnggotaPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/perpustakaan" className="hover:text-[var(--brand-primary)]">Perpustakaan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Anggota</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Anggota Perpustakaan</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola keanggotaan perpustakaan</p>
                </div>
                <Link href="/perpustakaan/anggota/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Daftar Anggota
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">1,234</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Anggota</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <UserCheck size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">1,200</p>
                    <p className="text-xs text-[var(--text-muted)]">Aktif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <UserX size={18} className="text-red-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">34</p>
                    <p className="text-xs text-[var(--text-muted)]">Diblokir</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <QrCode size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">856</p>
                    <p className="text-xs text-[var(--text-muted)]">Kartu Aktif</p>
                </div>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" placeholder="Cari anggota..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_MEMBERS.map(member => (
                    <div key={member.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{member.nama}</p>
                                <p className="text-xs text-[var(--text-muted)]">NIS: {member.nis} • {member.kelas}</p>
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded ${member.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                                {member.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                            <span>Pinjaman aktif: {member.pinjaman}</span>
                            <Link href={`/perpustakaan/anggota/${member.id}`} className="text-[var(--brand-primary)]">Detail →</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Anggota</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">NIS</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kelas</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Pinjaman</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_MEMBERS.map(member => (
                            <tr key={member.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{member.nama}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{member.nis}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{member.kelas}</td>
                                <td className="px-4 py-3 text-sm">{member.pinjaman} buku</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded ${member.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>{member.status}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <Link href={`/perpustakaan/anggota/${member.id}`} className="px-3 py-1 bg-[var(--bg-hover)] rounded text-xs hover:bg-[var(--bg-active)]">Detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/perpustakaan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/perpustakaan/buku" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Katalog Buku</Link>
                <Link href="/perpustakaan/peminjaman" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Peminjaman</Link>
                <Link href="/perpustakaan/denda" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Denda</Link>
            </div>
        </div>
    );
}
