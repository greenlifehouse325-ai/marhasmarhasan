/**
 * Detail Siswa Page
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk melihat detail informasi siswa
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    DollarSign,
    Clock,
    Edit,
    Trophy,
} from 'lucide-react';
import { MOCK_STUDENTS } from '@/data/mock-students';

export default function DetailSiswaPage() {
    const params = useParams();
    const studentId = params.id as string;
    const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'payment' | 'attendance'>('profile');

    const student = MOCK_STUDENTS.find(s => s.id === studentId);

    if (!student) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Siswa tidak ditemukan</p>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profil', icon: <User size={16} /> },
        { id: 'academic', label: 'Akademik', icon: <BookOpen size={16} /> },
        { id: 'payment', label: 'Pembayaran', icon: <DollarSign size={16} /> },
        { id: 'attendance', label: 'Absensi', icon: <Clock size={16} /> },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/siswa"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/siswa" className="hover:text-blue-600">Data Siswa</Link>
                        <span>/</span>
                        <span>Detail</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Detail Siswa</h1>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                    <Edit size={16} />
                    Edit Data
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="text-3xl font-bold">{student.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">{student.name}</h2>
                        <p className="text-blue-100">NIS: {student.nis}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-blue-200">{student.email}</span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${student.status === 'active'
                                ? 'bg-green-400/20 text-green-100'
                                : 'bg-red-400/20 text-red-100'
                                }`}>
                                {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-200">Kampus</p>
                        <p className="text-2xl font-bold">{student.campus}</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Kehadiran" value="95%" icon={<Clock size={20} />} color="#10B981" />
                <StatCard label="SPP Lunas" value="10/12" icon={<DollarSign size={20} />} color="#F59E0B" />
                <StatCard label="Prestasi" value="3" icon={<Trophy size={20} />} color="#8B5CF6" />
                <StatCard label="Buku Dipinjam" value="2" icon={<BookOpen size={20} />} color="#3B82F6" />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 pb-px">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors ${activeTab === tab.id
                            ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 -mb-px'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-2 gap-6">
                        <InfoSection title="Informasi Pribadi">
                            <InfoRow icon={<User size={16} />} label="Nama Lengkap" value={student.name} />
                            <InfoRow icon={<Mail size={16} />} label="Email" value={student.email || '-'} />
                            <InfoRow icon={<Phone size={16} />} label="Telepon" value={student.phone || '-'} />
                            <InfoRow icon={<MapPin size={16} />} label="Alamat" value="Jl. Contoh No. 123, Kota" />
                            <InfoRow icon={<Calendar size={16} />} label="Tempat, Tanggal Lahir" value="Jakarta, 01 Jan 2008" />
                        </InfoSection>
                        <InfoSection title="Informasi Akademik">
                            <InfoRow icon={<BookOpen size={16} />} label="Kelas" value={student.class} />
                            <InfoRow icon={<MapPin size={16} />} label="Kampus" value={`Kampus ${student.campus}`} />
                            <InfoRow icon={<Calendar size={16} />} label="Tahun Masuk" value="2022" />
                            <InfoRow icon={<User size={16} />} label="Wali Kelas" value="Budi Santoso, S.Pd" />
                        </InfoSection>
                    </div>
                )}

                {activeTab === 'academic' && (
                    <div className="text-center py-12 text-gray-500">
                        <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Data akademik akan ditampilkan di sini</p>
                    </div>
                )}

                {activeTab === 'payment' && (
                    <div className="text-center py-12 text-gray-500">
                        <DollarSign size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Riwayat pembayaran akan ditampilkan di sini</p>
                    </div>
                )}

                {activeTab === 'attendance' && (
                    <div className="text-center py-12 text-gray-500">
                        <Clock size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Rekap absensi akan ditampilkan di sini</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                    {icon}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-800">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </div>
        </div>
    );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-gray-400">{icon}</span>
            <div className="flex-1">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );
}
