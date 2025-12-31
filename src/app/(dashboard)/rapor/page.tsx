/**
 * Rapor Dashboard Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { BookOpen, Users, FileText, BarChart3, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';

const MENU_ITEMS = [
    { href: '/rapor/nilai', icon: BarChart3, label: 'Input Nilai', desc: 'Input nilai siswa', color: 'blue' },
    { href: '/rapor/cetak', icon: FileText, label: 'Cetak Rapor', desc: 'Cetak rapor semester', color: 'green' },
    { href: '/rapor/rekap', icon: BookOpen, label: 'Rekap Nilai', desc: 'Rekap nilai per kelas', color: 'purple' },
    { href: '/rapor/legger', icon: FileText, label: 'Legger', desc: 'Buku legger nilai', color: 'orange' },
];

export default function RaporPage() {
    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-[var(--text-primary)]">Rapor</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Manajemen Rapor</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola nilai dan rapor siswa</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Download size={16} />
                    Export Semua
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white col-span-2 lg:col-span-1">
                    <BookOpen size={24} className="mb-2" />
                    <p className="text-2xl font-bold">2024/2025</p>
                    <p className="text-sm text-blue-100">Semester Ganjil</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">688</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Siswa</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <BarChart3 size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">85%</p>
                    <p className="text-xs text-[var(--text-muted)]">Nilai Tuntas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MENU_ITEMS.map(item => (
                    <Link key={item.href} href={item.href} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors group">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-500/10' : item.color === 'green' ? 'bg-green-500/10' : item.color === 'purple' ? 'bg-purple-500/10' : 'bg-orange-500/10'}`}>
                                <item.icon size={20} className={item.color === 'blue' ? 'text-blue-500' : item.color === 'green' ? 'text-green-500' : item.color === 'purple' ? 'text-purple-500' : 'text-orange-500'} />
                            </div>
                            <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)]" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">{item.label}</h3>
                        <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                    </Link>
                ))}
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Link href="/siswa" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Data Siswa</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                    <Link href="/teachers" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Data Guru</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                    <Link href="/data-master/kelas" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Data Kelas</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                    <Link href="/data-master/mapel" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Mata Pelajaran</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
