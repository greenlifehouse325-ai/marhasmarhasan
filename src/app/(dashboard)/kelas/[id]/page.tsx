/**
 * Kelas Detail Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { ArrowLeft, Users, GraduationCap, User, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_KELAS = {
    id: 'K001',
    name: 'X RPL 1',
    jurusan: 'Rekayasa Perangkat Lunak',
    waliKelas: { name: 'Ahmad Suryadi, M.Pd', nip: '197504152001121001' },
    tahunAjaran: '2024/2025',
    siswa: [
        { id: 'S001', name: 'Ahmad Rizki', nisn: '0012345678', gender: 'L' },
        { id: 'S002', name: 'Budi Santoso', nisn: '0012345679', gender: 'L' },
        { id: 'S003', name: 'Citra Dewi', nisn: '0012345680', gender: 'P' },
        { id: 'S004', name: 'Dina Lestari', nisn: '0012345681', gender: 'P' },
    ],
    jadwal: [
        { hari: 'Senin', jam: '07:00-08:30', mapel: 'Matematika', guru: 'Ahmad Suryadi' },
        { hari: 'Senin', jam: '08:30-10:00', mapel: 'B. Indonesia', guru: 'Siti Rahayu' },
        { hari: 'Selasa', jam: '07:00-09:30', mapel: 'Pemrograman Dasar', guru: 'Budi Santoso' },
    ],
};

export default function KelasDetailPage() {
    const params = useParams();

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
                <Link href="/kelas" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_KELAS.name}</h1>
                    <p className="text-[var(--text-muted)]">{MOCK_KELAS.jurusan}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Users size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_KELAS.siswa.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Siswa</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-blue-600">{MOCK_KELAS.siswa.filter(s => s.gender === 'L').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Laki-laki</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-pink-600">{MOCK_KELAS.siswa.filter(s => s.gender === 'P').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Perempuan</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-lg font-bold text-[var(--text-primary)]">{MOCK_KELAS.tahunAjaran}</p>
                    <p className="text-sm text-[var(--text-muted)]">Tahun Ajaran</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Daftar Siswa</h3>
                        <Link href={`/kelas/${params.id}/siswa`} className="text-sm text-[var(--brand-primary)] hover:underline">Lihat semua</Link>
                    </div>
                    <div className="space-y-2">
                        {MOCK_KELAS.siswa.map((siswa, idx) => (
                            <div key={siswa.id} className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] rounded-lg">
                                <span className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center text-sm font-medium text-[var(--brand-primary)]">{idx + 1}</span>
                                <div className="flex-1">
                                    <p className="font-medium text-[var(--text-primary)]">{siswa.name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">NISN: {siswa.nisn}</p>
                                </div>
                                <span className={`px-2 py-0.5 text-xs rounded ${siswa.gender === 'L' ? 'bg-blue-500/10 text-blue-600' : 'bg-pink-500/10 text-pink-600'}`}>{siswa.gender === 'L' ? 'L' : 'P'}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <User size={20} className="text-green-500" />
                            Wali Kelas
                        </h3>
                        <p className="font-medium text-[var(--text-primary)]">{MOCK_KELAS.waliKelas.name}</p>
                        <p className="text-sm text-[var(--text-muted)]">NIP: {MOCK_KELAS.waliKelas.nip}</p>
                    </div>

                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-blue-500" />
                            Jadwal Hari Ini
                        </h3>
                        <div className="space-y-2">
                            {MOCK_KELAS.jadwal.slice(0, 3).map((jadwal, idx) => (
                                <div key={idx} className="p-3 bg-[var(--bg-hover)] rounded-lg">
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{jadwal.mapel}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{jadwal.jam} • {jadwal.guru}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
