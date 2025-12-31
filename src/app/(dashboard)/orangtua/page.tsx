/**
 * Orang Tua List Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    Plus,
    Download,
    Upload,
    ChevronRight,
    Phone,
    Mail,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Link2
} from 'lucide-react';
import Link from 'next/link';

const MOCK_PARENTS = [
    { id: 'P001', name: 'Rudi Hartono', phone: '081234567890', email: 'rudi.h@gmail.com', children: ['Ahmad Rizki (XII RPL 1)'], status: 'active' },
    { id: 'P002', name: 'Maya Sari', phone: '081234567891', email: 'maya.s@gmail.com', children: ['Siti Nurhaliza (XII RPL 2)'], status: 'active' },
    { id: 'P003', name: 'Budi Prasetyo', phone: '081234567892', email: 'budi.p@gmail.com', children: ['Farhan Akbar (XI TKJ 1)', 'Dina Prasetyo (X MM 1)'], status: 'active' },
    { id: 'P004', name: 'Sri Wahyuni', phone: '081234567893', email: 'sri.w@gmail.com', children: ['Andi Wijaya (XII AKL 1)'], status: 'inactive' },
];

export default function OrangTuaPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredParents = MOCK_PARENTS.filter(parent => {
        const matchesSearch = parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parent.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || parent.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Data Orang Tua</h1>
                    <p className="text-[var(--text-muted)]">Kelola data orang tua/wali siswa</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Upload size={16} />
                        Import
                    </button>
                    <Link
                        href="/orangtua/create"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium transition-colors"
                    >
                        <Plus size={16} />
                        Tambah Orang Tua
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_PARENTS.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Orang Tua</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">{MOCK_PARENTS.filter(p => p.status === 'active').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Aktif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-blue-600">{MOCK_PARENTS.reduce((acc, p) => acc + p.children.length, 0)}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Anak</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-purple-600">98%</p>
                    <p className="text-sm text-[var(--text-muted)]">Terverifikasi</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                >
                    <option value="all">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Orang Tua</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Kontak</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Anak</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {filteredParents.map(parent => (
                                <tr key={parent.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                                <span className="text-sm font-bold text-purple-600">
                                                    {parent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-[var(--text-primary)]">{parent.name}</p>
                                                <p className="text-xs text-[var(--text-muted)]">ID: {parent.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                                <Phone size={14} />
                                                {parent.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                                <Mail size={14} />
                                                {parent.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="space-y-1">
                                            {parent.children.map((child, idx) => (
                                                <span key={idx} className="inline-block px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded-lg mr-1">
                                                    {child}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${parent.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {parent.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link href={`/orangtua/${parent.id}`} className="p-2 hover:bg-[var(--bg-active)] rounded-lg transition-colors">
                                                <Eye size={16} className="text-[var(--text-muted)]" />
                                            </Link>
                                            <button className="p-2 hover:bg-[var(--bg-active)] rounded-lg transition-colors">
                                                <Link2 size={16} className="text-[var(--text-muted)]" />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 size={16} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
