/**
 * Admin Detail Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk melihat detail admin
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
    Shield,
    Calendar,
    Activity,
    Edit,
    Ban,
    CheckCircle,
    Clock,
    Globe,
    Key,
} from 'lucide-react';

// Mock admin data
const MOCK_ADMINS = [
    {
        id: '1',
        name: 'Administrator Utama',
        email: 'superadmin@marhas.sch.id',
        phone: '081234567890',
        role: 'super_admin' as const,
        isActive: true,
        lastLogin: new Date('2024-12-29T10:30:00'),
        createdAt: new Date('2024-01-01'),
        ipAddress: '192.168.1.100',
        deviceCount: 2,
    },
    {
        id: '2',
        name: 'Admin Perpustakaan',
        email: 'perpus@marhas.sch.id',
        phone: '081234567891',
        role: 'admin_perpustakaan' as const,
        isActive: true,
        lastLogin: new Date('2024-12-29T09:00:00'),
        createdAt: new Date('2024-02-15'),
        ipAddress: '192.168.1.101',
        deviceCount: 1,
    },
];

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
    super_admin: { label: 'Super Admin', color: '#8B5CF6' },
    admin_perpustakaan: { label: 'Perpustakaan', color: '#10B981' },
    admin_keuangan: { label: 'Keuangan', color: '#F59E0B' },
    admin_absensi: { label: 'Absensi', color: '#3B82F6' },
    admin_jadwal: { label: 'Jadwal', color: '#EC4899' },
    admin_aplikasi: { label: 'Aplikasi', color: '#6366F1' },
};

export default function AdminDetailPage() {
    const params = useParams();
    const adminId = params.id as string;
    const [activeTab, setActiveTab] = useState<'info' | 'activity' | 'security'>('info');

    const admin = MOCK_ADMINS.find(a => a.id === adminId);

    if (!admin) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Admin tidak ditemukan</p>
            </div>
        );
    }

    const roleInfo = ROLE_LABELS[admin.role];

    const tabs = [
        { id: 'info', label: 'Informasi', icon: <User size={16} /> },
        { id: 'activity', label: 'Aktivitas', icon: <Activity size={16} /> },
        { id: 'security', label: 'Keamanan', icon: <Shield size={16} /> },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/super-admin/admins"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/super-admin/admins" className="hover:text-purple-600">Admins</Link>
                        <span>/</span>
                        <span>Detail</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Detail Admin</h1>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors">
                        <Edit size={16} />
                        Edit
                    </button>
                    {admin.isActive ? (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                            <Ban size={16} />
                            Nonaktifkan
                        </button>
                    ) : (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 border border-green-200 rounded-xl hover:bg-green-50 transition-colors">
                            <CheckCircle size={16} />
                            Aktifkan
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="text-3xl font-bold">{admin.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">{admin.name}</h2>
                        <p className="text-purple-200">{admin.email}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span
                                className="px-3 py-1 text-xs font-medium rounded-full"
                                style={{ backgroundColor: `${roleInfo.color}40`, color: 'white' }}
                            >
                                {roleInfo.label}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${admin.isActive
                                    ? 'bg-green-400/20 text-green-100'
                                    : 'bg-red-400/20 text-red-100'
                                }`}>
                                {admin.isActive ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 pb-px">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors ${activeTab === tab.id
                                ? 'text-purple-600 bg-purple-50 border-b-2 border-purple-600 -mb-px'
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
                {activeTab === 'info' && (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800 mb-4">Informasi Akun</h3>
                            <InfoRow icon={<User size={16} />} label="Nama" value={admin.name} />
                            <InfoRow icon={<Mail size={16} />} label="Email" value={admin.email} />
                            <InfoRow icon={<Phone size={16} />} label="Telepon" value={admin.phone} />
                            <InfoRow icon={<Shield size={16} />} label="Role" value={roleInfo.label} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800 mb-4">Status & Waktu</h3>
                            <InfoRow icon={<Calendar size={16} />} label="Dibuat" value={admin.createdAt.toLocaleDateString('id-ID')} />
                            <InfoRow icon={<Clock size={16} />} label="Login Terakhir" value={admin.lastLogin.toLocaleString('id-ID')} />
                            <InfoRow icon={<Globe size={16} />} label="IP Address" value={admin.ipAddress} />
                            <InfoRow icon={<Key size={16} />} label="Perangkat" value={`${admin.deviceCount} terhubung`} />
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="text-center py-12 text-gray-500">
                        <Activity size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Log aktivitas akan ditampilkan di sini</p>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="text-center py-12 text-gray-500">
                        <Shield size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Pengaturan keamanan akan ditampilkan di sini</p>
                    </div>
                )}
            </div>
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
