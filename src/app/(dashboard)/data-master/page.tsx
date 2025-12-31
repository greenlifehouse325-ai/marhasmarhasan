/**
 * Data Master Dashboard Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { Database, GraduationCap, BookOpen, Calendar, Users, Building, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MENU_ITEMS = [
    { href: '/data-master/kelas', icon: GraduationCap, label: 'Kelas', desc: 'Kelola data kelas', count: 25, color: 'blue' },
    { href: '/data-master/jurusan', icon: Building, label: 'Jurusan', desc: 'Kelola data jurusan', count: 3, color: 'green' },
    { href: '/data-master/mapel', icon: BookOpen, label: 'Mata Pelajaran', desc: 'Kelola data mapel', count: 45, color: 'purple' },
    { href: '/data-master/tahun-ajaran', icon: Calendar, label: 'Tahun Ajaran', desc: 'Kelola tahun ajaran', count: 5, color: 'orange' },
    { href: '/data-master/ruangan', icon: Building, label: 'Ruangan', desc: 'Kelola data ruangan', count: 30, color: 'red' },
    { href: '/data-master/ekstrakurikuler', icon: Users, label: 'Ekstrakurikuler', desc: 'Kelola ekstrakurikuler', count: 12, color: 'pink' },
];

export default function DataMasterPage() {
    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-[var(--text-primary)]">Data Master</span>
            </div>

            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Data Master</h1>
                <p className="text-sm text-[var(--text-muted)]">Kelola data master sekolah</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white col-span-2 lg:col-span-1">
                    <Database size={24} className="mb-2" />
                    <p className="text-2xl font-bold">120</p>
                    <p className="text-sm text-blue-100">Total Data Master</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <GraduationCap size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">25</p>
                    <p className="text-xs text-[var(--text-muted)]">Kelas</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <BookOpen size={18} className="text-purple-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">45</p>
                    <p className="text-xs text-[var(--text-muted)]">Mata Pelajaran</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MENU_ITEMS.map(item => (
                    <Link key={item.href} href={item.href} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors group">
                        <div className="flex items-start justify-between">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-500/10' : item.color === 'green' ? 'bg-green-500/10' : item.color === 'purple' ? 'bg-purple-500/10' : item.color === 'orange' ? 'bg-orange-500/10' : item.color === 'red' ? 'bg-red-500/10' : 'bg-pink-500/10'}`}>
                                <item.icon size={20} className={item.color === 'blue' ? 'text-blue-500' : item.color === 'green' ? 'text-green-500' : item.color === 'purple' ? 'text-purple-500' : item.color === 'orange' ? 'text-orange-500' : item.color === 'red' ? 'text-red-500' : 'text-pink-500'} />
                            </div>
                            <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] transition-colors" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)] mt-3">{item.label}</h3>
                        <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                        <p className="text-sm font-medium text-[var(--brand-primary)] mt-2">{item.count} data</p>
                    </Link>
                ))}
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    <Link href="/siswa" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Data Siswa</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                    <Link href="/teachers" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Data Guru</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                    <Link href="/parents" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Data Ortu</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                    <Link href="/super-admin/settings" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                        <span className="text-xs sm:text-sm">Settings</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
