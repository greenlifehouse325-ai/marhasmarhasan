/**
 * Guru Detail Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_GURU = {
    id: 'G001',
    name: 'Dr. Ahmad Suryadi, M.Pd',
    nip: '197504152001121001',
    nuptk: '1234567890123456',
    phone: '081234567890',
    email: 'ahmad.suryadi@marhas.sch.id',
    address: 'Jl. Margahayu Raya No. 45, Bandung',
    gender: 'Laki-laki',
    birthDate: '1975-04-15',
    status: 'PNS',
    bidangStudi: 'Matematika',
    pendidikan: 'S3 Pendidikan Matematika',
    startDate: '2001-01-12',
    jadwal: ['X RPL 1 - Senin 07:00', 'X RPL 2 - Selasa 07:00', 'XI TKJ 1 - Rabu 08:00'],
};

export default function GuruDetailPage() {
    const params = useParams();

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/guru" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                        <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_GURU.name}</h1>
                        <p className="text-[var(--text-muted)]">NIP: {MOCK_GURU.nip}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/guru/${params.id}/edit`} className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Edit size={16} />
                        Edit
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 text-sm font-medium transition-colors">
                        <Trash2 size={16} />
                        Hapus
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600">AS</span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{MOCK_GURU.name}</h2>
                                <p className="text-[var(--text-muted)]">{MOCK_GURU.bidangStudi} • {MOCK_GURU.status}</p>
                                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                        <Phone size={16} className="text-[var(--brand-primary)]" />
                                        {MOCK_GURU.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                        <Mail size={16} className="text-[var(--brand-primary)]" />
                                        {MOCK_GURU.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Informasi Lengkap</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">NUPTK</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_GURU.nuptk}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Jenis Kelamin</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_GURU.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Tanggal Lahir</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_GURU.birthDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Pendidikan Terakhir</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_GURU.pendidikan}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Mulai Mengajar</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_GURU.startDate}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-[var(--text-muted)]">Alamat</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_GURU.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-blue-500" />
                            Jadwal Mengajar
                        </h3>
                        <div className="space-y-2">
                            {MOCK_GURU.jadwal.map((jadwal, idx) => (
                                <div key={idx} className="p-3 bg-[var(--bg-hover)] rounded-lg">
                                    <p className="text-sm text-[var(--text-primary)]">{jadwal}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/jadwal/jadwal-guru" className="block mt-4 text-sm text-[var(--brand-primary)] hover:underline text-center">
                            Lihat jadwal lengkap →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
