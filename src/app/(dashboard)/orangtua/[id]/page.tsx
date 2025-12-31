/**
 * Orang Tua Detail Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, Users, Calendar, Link2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_PARENT = {
    id: 'P001',
    name: 'Rudi Hartono',
    nik: '3273012345678901',
    phone: '081234567890',
    email: 'rudi.h@gmail.com',
    address: 'Jl. Margahayu Raya No. 123, Bandung',
    job: 'Wiraswasta',
    income: 'Rp 5.000.000 - 10.000.000',
    children: [
        { id: 'S001', name: 'Ahmad Rizki', class: 'XII RPL 1', nisn: '0012345678' },
        { id: 'S002', name: 'Dina Hartono', class: 'X MM 1', nisn: '0012345689' },
    ],
    status: 'active',
    createdAt: '2022-07-15',
};

export default function OrangTuaDetailPage() {
    const params = useParams();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/orangtua" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                        <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_PARENT.name}</h1>
                        <p className="text-[var(--text-muted)]">ID: {params.id}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Edit size={16} />
                        Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 text-sm font-medium transition-colors">
                        <Trash2 size={16} />
                        Hapus
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <span className="text-2xl font-bold text-purple-600">
                                    {MOCK_PARENT.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{MOCK_PARENT.name}</h2>
                                <p className="text-[var(--text-muted)]">NIK: {MOCK_PARENT.nik}</p>
                                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                        <Phone size={16} className="text-[var(--brand-primary)]" />
                                        {MOCK_PARENT.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                        <Mail size={16} className="text-[var(--brand-primary)]" />
                                        {MOCK_PARENT.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Lengkap */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Informasi Lengkap</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Pekerjaan</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_PARENT.job}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Penghasilan</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_PARENT.income}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-[var(--text-muted)]">Alamat</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_PARENT.address}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Terdaftar Sejak</p>
                                <p className="font-medium text-[var(--text-primary)]">{MOCK_PARENT.createdAt}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Status</p>
                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-lg ${MOCK_PARENT.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    {MOCK_PARENT.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Children */}
                <div className="space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Users size={20} className="text-blue-500" />
                            Anak ({MOCK_PARENT.children.length})
                        </h3>
                        <div className="space-y-3">
                            {MOCK_PARENT.children.map(child => (
                                <Link
                                    key={child.id}
                                    href={`/siswa/${child.id}`}
                                    className="block p-3 bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors"
                                >
                                    <p className="font-medium text-[var(--text-primary)]">{child.name}</p>
                                    <p className="text-sm text-[var(--text-muted)]">{child.class}</p>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">NISN: {child.nisn}</p>
                                </Link>
                            ))}
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-[var(--border-light)] rounded-xl text-[var(--brand-primary)] hover:bg-[var(--bg-hover)] transition-colors text-sm font-medium">
                            <Link2 size={16} />
                            Hubungkan Anak Lain
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
