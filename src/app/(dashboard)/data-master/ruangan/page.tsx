/**
 * Data Master Ruangan Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Building, Plus, Search, Edit, Trash2, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

const MOCK_ROOMS = [
    { id: 1, nama: 'Lab Komputer 1', kode: 'LK-01', tipe: 'Lab', kapasitas: 40, gedung: 'A', lantai: 2, status: 'available' },
    { id: 2, nama: 'Lab Komputer 2', kode: 'LK-02', tipe: 'Lab', kapasitas: 40, gedung: 'A', lantai: 2, status: 'in_use' },
    { id: 3, nama: 'Ruang Kelas X RPL 1', kode: 'RK-01', tipe: 'Kelas', kapasitas: 36, gedung: 'B', lantai: 1, status: 'available' },
    { id: 4, nama: 'Aula Utama', kode: 'AU-01', tipe: 'Aula', kapasitas: 500, gedung: 'C', lantai: 1, status: 'available' },
];

export default function DataRuanganPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tipeFilter, setTipeFilter] = useState('all');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/data-master" className="hover:text-[var(--brand-primary)]">Data Master</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Ruangan</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Data Ruangan</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola ruangan dan fasilitas</p>
                </div>
                <Link href="/data-master/ruangan/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Plus size={16} />
                    Tambah Ruangan
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Building size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">30</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Ruangan</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">22</p>
                    <p className="text-xs text-[var(--text-muted)]">Kelas</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">6</p>
                    <p className="text-xs text-[var(--text-muted)]">Lab</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">2</p>
                    <p className="text-xs text-[var(--text-muted)]">Aula</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari ruangan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {['all', 'Kelas', 'Lab', 'Aula'].map(t => (
                        <button key={t} onClick={() => setTipeFilter(t)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap ${tipeFilter === t ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'}`}>
                            {t === 'all' ? 'Semua' : t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_ROOMS.map(room => (
                    <div key={room.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Building size={20} className="text-blue-500" />
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${room.status === 'available' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                                {room.status === 'available' ? 'Tersedia' : 'Sedang Digunakan'}
                            </span>
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)] text-sm">{room.nama}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{room.kode} • {room.tipe}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                            <span className="flex items-center gap-1"><Users size={12} /> {room.kapasitas}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} /> Gedung {room.gedung}, Lt {room.lantai}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button className="flex-1 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs">Edit</button>
                            <button className="p-1.5 bg-red-500/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/data-master" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/data-master/kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Kelas</Link>
                <Link href="/data-master/ekstrakurikuler" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Ekstrakurikuler</Link>
            </div>
        </div>
    );
}
