/**
 * Data Master Tahun Ajaran Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const MOCK_TA = [
    { id: 1, tahun: '2024/2025', semester: 'Ganjil', status: 'active', mulai: '2024-07-15', selesai: '2024-12-20' },
    { id: 2, tahun: '2024/2025', semester: 'Genap', status: 'upcoming', mulai: '2025-01-06', selesai: '2025-06-20' },
    { id: 3, tahun: '2023/2024', semester: 'Genap', status: 'completed', mulai: '2024-01-08', selesai: '2024-06-15' },
    { id: 4, tahun: '2023/2024', semester: 'Ganjil', status: 'completed', mulai: '2023-07-17', selesai: '2023-12-22' },
];

export default function TahunAjaranPage() {
    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/data-master" className="hover:text-[var(--brand-primary)]">Data Master</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Tahun Ajaran</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Tahun Ajaran</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola tahun ajaran dan semester</p>
                </div>
                <Link href="/data-master/tahun-ajaran/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Tambah TA
                </Link>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div className="flex items-center gap-3">
                    <Calendar size={24} />
                    <div>
                        <p className="text-xs text-blue-100">Tahun Ajaran Aktif</p>
                        <p className="text-lg font-bold">2024/2025 - Semester Ganjil</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_TA.map(ta => (
                    <div key={ta.id} className={`bg-[var(--bg-card)] border rounded-xl p-4 ${ta.status === 'active' ? 'border-green-500' : 'border-[var(--border-light)]'}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ta.status === 'active' ? 'bg-green-500/10' : ta.status === 'upcoming' ? 'bg-yellow-500/10' : 'bg-[var(--bg-hover)]'}`}>
                                    {ta.status === 'active' ? <CheckCircle size={20} className="text-green-500" /> : ta.status === 'upcoming' ? <Clock size={20} className="text-yellow-500" /> : <Calendar size={20} className="text-[var(--text-muted)]" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">{ta.tahun}</p>
                                    <p className="text-xs text-[var(--text-muted)]">Semester {ta.semester}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${ta.status === 'active' ? 'bg-green-500/10 text-green-600' : ta.status === 'upcoming' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'}`}>
                                {ta.status}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{ta.mulai} s/d {ta.selesai}</p>
                        <div className="flex gap-2 mt-3">
                            <button className="flex-1 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs hover:bg-[var(--bg-active)]">
                                <Edit size={12} className="inline mr-1" /> Edit
                            </button>
                            {ta.status !== 'active' && (
                                <button className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20">
                                    <Trash2 size={14} className="text-red-500" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/data-master" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/data-master/kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Kelas</Link>
                <Link href="/data-master/jurusan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Jurusan</Link>
                <Link href="/data-master/mapel" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Mata Pelajaran</Link>
            </div>
        </div>
    );
}
