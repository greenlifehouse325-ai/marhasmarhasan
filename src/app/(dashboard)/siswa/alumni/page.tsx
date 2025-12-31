/**
 * Alumni Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Search, Download, GraduationCap, Briefcase, Eye } from 'lucide-react';
import Link from 'next/link';

const MOCK_ALUMNI = [
    { id: 'A001', name: 'Budi Santoso', nisn: '0012345670', jurusan: 'RPL', tahunLulus: 2023, status: 'Bekerja', company: 'PT Tech Indonesia' },
    { id: 'A002', name: 'Siti Rahayu', nisn: '0012345671', jurusan: 'TKJ', tahunLulus: 2023, status: 'Kuliah', company: 'ITB' },
    { id: 'A003', name: 'Ahmad Fauzi', nisn: '0012345672', jurusan: 'MM', tahunLulus: 2022, status: 'Bekerja', company: 'Creative Agency' },
];

export default function AlumniPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tahunFilter, setTahunFilter] = useState('all');

    const filteredAlumni = MOCK_ALUMNI.filter(alumni => {
        const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTahun = tahunFilter === 'all' || alumni.tahunLulus.toString() === tahunFilter;
        return matchesSearch && matchesTahun;
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Data Alumni</h1>
                    <p className="text-[var(--text-muted)]">Kelola dan lacak data alumni SMK Marhas</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium">
                    <Download size={16} />
                    Export
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Alumni', value: 2456, color: '#8B5CF6' },
                    { label: 'Bekerja', value: 1520, color: '#10B981' },
                    { label: 'Kuliah', value: 680, color: '#3B82F6' },
                    { label: 'Wirausaha', value: 256, color: '#F59E0B' },
                ].map(stat => (
                    <div key={stat.label} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value.toLocaleString()}</p>
                        <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari nama..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                    />
                </div>
                <select value={tahunFilter} onChange={(e) => setTahunFilter(e.target.value)} className="px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]">
                    <option value="all">Semua Tahun</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Alumni</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Jurusan</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tahun</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {filteredAlumni.map(alumni => (
                            <tr key={alumni.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-4 font-medium text-[var(--text-primary)]">{alumni.name}</td>
                                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{alumni.jurusan}</td>
                                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{alumni.tahunLulus}</td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${alumni.status === 'Bekerja' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                        {alumni.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <Link href={`/siswa/${alumni.id}`} className="p-2 hover:bg-[var(--bg-active)] rounded-lg inline-flex">
                                        <Eye size={16} className="text-[var(--text-muted)]" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
