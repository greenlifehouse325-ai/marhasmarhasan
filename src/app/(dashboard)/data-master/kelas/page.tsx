/**
 * Data Master Kelas Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { ConfirmModal } from '@/components/shared/ConfirmModal';

const INITIAL_CLASSES = [
    { id: 1, nama: 'X RPL 1', jurusan: 'Rekayasa Perangkat Lunak', tingkat: 'X', waliKelas: 'Pak Budi', siswa: 36 },
    { id: 2, nama: 'X RPL 2', jurusan: 'Rekayasa Perangkat Lunak', tingkat: 'X', waliKelas: 'Bu Siti', siswa: 35 },
    { id: 3, nama: 'XI TKJ 1', jurusan: 'Teknik Komputer Jaringan', tingkat: 'XI', waliKelas: 'Pak Ahmad', siswa: 34 },
    { id: 4, nama: 'XI TKJ 2', jurusan: 'Teknik Komputer Jaringan', tingkat: 'XI', waliKelas: 'Bu Dewi', siswa: 33 },
    { id: 5, nama: 'XII MM 1', jurusan: 'Multimedia', tingkat: 'XII', waliKelas: 'Pak Rudi', siswa: 32 },
];

export default function DataKelasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tingkatFilter, setTingkatFilter] = useState('all');
    const [classList, setClassList] = useState(INITIAL_CLASSES);

    // Delete State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            setClassList(prev => prev.filter(item => item.id !== selectedId));
            setDeleteModalOpen(false);
            setSelectedId(null);
        }
    };

    const filteredClasses = classList.filter(c => {
        const matchesSearch = c.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.waliKelas.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTingkat = tingkatFilter === 'all' || c.tingkat === tingkatFilter;
        return matchesSearch && matchesTingkat;
    });

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/data-master" className="hover:text-[var(--brand-primary)]">Data Master</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Kelas</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Data Kelas</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola data kelas sekolah</p>
                </div>
                <Link href="/data-master/kelas/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto hover:bg-[var(--brand-secondary)] transition-colors">
                    <Plus size={16} />
                    Tambah Kelas
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <GraduationCap size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{classList.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Kelas</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-green-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{classList.reduce((s, c) => s + c.siswa, 0)}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Siswa</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">3</p>
                    <p className="text-xs text-[var(--text-muted)]">Jurusan</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">34</p>
                    <p className="text-xs text-[var(--text-muted)]">Rata-rata/Kelas</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Cari kelas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {['all', 'X', 'XI', 'XII'].map(tingkat => (
                        <button key={tingkat} onClick={() => setTingkatFilter(tingkat)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${tingkatFilter === tingkat ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--bg-active)]'}`}>
                            {tingkat === 'all' ? 'Semua' : `Kelas ${tingkat}`}
                        </button>
                    ))}
                </div>
            </div>

            {filteredClasses.length === 0 && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-8 text-center text-[var(--text-muted)]">
                    Tidak ada data kelas yang ditemukan.
                </div>
            )}

            {/* Mobile Cards */}
            <div className={`block lg:hidden space-y-3 ${filteredClasses.length === 0 ? 'hidden' : ''}`}>
                {filteredClasses.map(kelas => (
                    <div key={kelas.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{kelas.nama}</p>
                                <p className="text-xs text-[var(--text-muted)]">{kelas.jurusan}</p>
                            </div>
                            <span className="px-2 py-0.5 text-xs rounded bg-blue-500/10 text-blue-600">{kelas.siswa} siswa</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Wali: {kelas.waliKelas}</p>
                        <div className="flex gap-2 mt-3">
                            <Link
                                href={`/data-master/kelas/${kelas.id}/edit`}
                                className="flex-1 flex items-center justify-center py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs hover:bg-[var(--bg-active)] transition-colors text-[var(--text-secondary)]"
                            >
                                <Edit size={14} className="mr-1" /> Edit
                            </Link>
                            <button
                                onClick={() => handleDeleteClick(kelas.id)}
                                className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={14} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className={`hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden ${filteredClasses.length === 0 ? 'hidden' : ''}`}>
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kelas</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Jurusan</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Wali Kelas</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Siswa</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {filteredClasses.map(kelas => (
                            <tr key={kelas.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{kelas.nama}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{kelas.jurusan}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{kelas.waliKelas}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{kelas.siswa}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        <Link
                                            href={`/data-master/kelas/${kelas.id}/edit`}
                                            className="p-1.5 hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={16} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(kelas.id)}
                                            className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors group"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} className="text-red-500/70 group-hover:text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/data-master" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">← Dashboard</Link>
                <Link href="/data-master/jurusan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">Jurusan</Link>
                <Link href="/data-master/mapel" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">Mata Pelajaran</Link>
                <Link href="/data-master/tahun-ajaran" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">Tahun Ajaran</Link>
            </div>

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Data Kelas"
                message="Apakah Anda yakin ingin menghapus data kelas ini? Pastikan tidak ada siswa aktif di kelas ini sebelum menghapus."
                type="danger"
                requireConfirmText="HAPUS"
                confirmText="Hapus Data"
                cancelText="Batal"
            />
        </div>
    );
}
