/**
 * Data Master Ekstrakurikuler Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Trophy, Plus, Search, Edit, Trash2, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { ConfirmModal } from '@/components/shared/ConfirmModal';

// Mock data moved outside component to simulates "database" but will use state inside
const INITIAL_DATA = [
    { id: 1, nama: 'Pramuka', pembina: 'Pak Budi', anggota: 150, hari: 'Sabtu', jam: '08:00', status: 'active' },
    { id: 2, nama: 'Basket', pembina: 'Pak Ahmad', anggota: 25, hari: 'Rabu, Jumat', jam: '15:00', status: 'active' },
    { id: 3, nama: 'English Club', pembina: 'Bu Dewi', anggota: 30, hari: 'Kamis', jam: '15:00', status: 'active' },
    { id: 4, nama: 'Robotik', pembina: 'Pak Rudi', anggota: 20, hari: 'Selasa', jam: '15:00', status: 'active' },
    { id: 5, nama: 'Seni Tari', pembina: 'Bu Siti', anggota: 35, hari: 'Sabtu', jam: '09:00', status: 'inactive' },
];

export default function EkstrakurikulerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ekskulList, setEkskulList] = useState(INITIAL_DATA);

    // Delete State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            setEkskulList(prev => prev.filter(item => item.id !== selectedId));
            setDeleteModalOpen(false);
            setSelectedId(null);
        }
    };

    const filteredList = ekskulList.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/data-master" className="hover:text-[var(--brand-primary)]">Data Master</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Ekstrakurikuler</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Ekstrakurikuler</h1>
                    <p className="text-sm text-[var(--text-muted)]">Kelola kegiatan ekstrakurikuler</p>
                </div>
                <Link href="/data-master/ekstrakurikuler/create" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto hover:bg-[var(--brand-secondary)] transition-colors">
                    <Plus size={16} />
                    Tambah Ekskul
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Trophy size={18} className="text-yellow-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{ekskulList.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Ekskul</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <Users size={18} className="text-blue-500 mb-1 sm:mb-2" />
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{ekskulList.reduce((s, e) => s + e.anggota, 0)}</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Anggota</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{ekskulList.filter(e => e.status === 'active').length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Aktif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{ekskulList.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Pembina</p>
                </div>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" placeholder="Cari ekstrakurikuler..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredList.map(ekskul => (
                    <div key={ekskul.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 hover:border-[var(--border-medium)] transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <Trophy size={20} className="text-yellow-500" />
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${ekskul.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'}`}>
                                {ekskul.status}
                            </span>
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">{ekskul.nama}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">Pembina: {ekskul.pembina}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                            <span className="flex items-center gap-1"><Users size={12} /> {ekskul.anggota} anggota</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {ekskul.hari}, {ekskul.jam}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <Link
                                href={`/data-master/ekstrakurikuler/${ekskul.id}/edit`}
                                className="flex-1 flex items-center justify-center py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs hover:bg-[var(--bg-active)] transition-colors text-[var(--text-secondary)]"
                            >
                                <Edit size={14} className="mr-1" />
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDeleteClick(ekskul.id)}
                                className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                                title="Hapus Data"
                            >
                                <Trash2 size={14} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredList.length === 0 && (
                <div className="text-center py-10 text-[var(--text-muted)]">
                    Tidak ada data ekstrakurikuler yang ditemukan.
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                <Link href="/data-master" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">← Dashboard</Link>
                <Link href="/data-master/kelas" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">Kelas</Link>
                <Link href="/data-master/ruangan" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-active)]">Ruangan</Link>
            </div>

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Ekstrakurikuler"
                message="Apakah Anda yakin ingin menghapus data ekstrakurikuler ini? Tindakan ini tidak dapat dibatalkan."
                type="danger"
                confirmText="Hapus Data"
                cancelText="Batal"
            />
        </div>
    );
}
