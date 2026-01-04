/**
 * Kelola Admin Page Content (Client Component)
 * SMK Marhas Admin Dashboard - Super Admin
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    UserCog,
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    Shield,
    BookOpen,
    Wallet,
    ClipboardCheck,
    Calendar,
    Smartphone,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock,
} from 'lucide-react';
import type { AdminRole } from '@/types/auth';
import { ROLE_CONFIGS } from '@/types/admin';

// Mock Admin Data
const MOCK_ADMINS = [
    {
        id: 'adm-001',
        name: 'Super Admin',
        email: 'superadmin@marhas.sch.id',
        role: 'super_admin' as AdminRole,
        status: 'active',
        lastActive: new Date(),
        createdAt: new Date('2024-01-01'),
    },
    {
        id: 'adm-002',
        name: 'Admin Perpustakaan',
        email: 'perpus@marhas.sch.id',
        role: 'admin_perpustakaan' as AdminRole,
        status: 'active',
        lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 menit lalu
        createdAt: new Date('2024-02-15'),
    },
    {
        id: 'adm-003',
        name: 'Admin Keuangan',
        email: 'keuangan@marhas.sch.id',
        role: 'admin_keuangan' as AdminRole,
        status: 'active',
        lastActive: new Date(Date.now() - 1000 * 60 * 10), // 10 menit lalu
        createdAt: new Date('2024-02-15'),
    },
    {
        id: 'adm-004',
        name: 'Admin Absensi',
        email: 'absensi@marhas.sch.id',
        role: 'admin_absensi' as AdminRole,
        status: 'active',
        lastActive: new Date(Date.now() - 1000 * 60 * 15),
        createdAt: new Date('2024-03-01'),
    },
    {
        id: 'adm-005',
        name: 'Admin Jadwal',
        email: 'jadwal@marhas.sch.id',
        role: 'admin_jadwal' as AdminRole,
        status: 'inactive',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
        createdAt: new Date('2024-03-01'),
    },
    {
        id: 'adm-006',
        name: 'Admin Aplikasi',
        email: 'aplikasi@marhas.sch.id',
        role: 'admin_aplikasi' as AdminRole,
        status: 'active',
        lastActive: new Date(Date.now() - 1000 * 60 * 2),
        createdAt: new Date('2024-04-01'),
    },
];

const ROLE_ICONS: Record<AdminRole, React.ReactNode> = {
    super_admin: <Shield size={18} />,
    admin_perpustakaan: <BookOpen size={18} />,
    admin_keuangan: <Wallet size={18} />,
    admin_absensi: <ClipboardCheck size={18} />,
    admin_jadwal: <Calendar size={18} />,
    admin_aplikasi: <Smartphone size={18} />,
};

export default function AdminsPageContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showMenu, setShowMenu] = useState<string | null>(null);

    const filteredAdmins = MOCK_ADMINS.filter(admin =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatLastActive = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return `${minutes} menit lalu`;
        if (hours < 24) return `${hours} jam lalu`;
        return date.toLocaleDateString('id-ID');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <span>Kelola Admin</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Kelola Admin</h1>
                </div>

                <Link
                    href="/super-admin/admins/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors"
                >
                    <Plus size={16} />
                    Tambah Admin
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Admin"
                    value={MOCK_ADMINS.length.toString()}
                    icon={<UserCog size={20} />}
                    color="#7C3AED"
                />
                <StatCard
                    label="Aktif"
                    value={MOCK_ADMINS.filter(a => a.status === 'active').length.toString()}
                    icon={<CheckCircle size={20} />}
                    color="#10B981"
                />
                <StatCard
                    label="Non-Aktif"
                    value={MOCK_ADMINS.filter(a => a.status === 'inactive').length.toString()}
                    icon={<XCircle size={20} />}
                    color="#6B7280"
                />
                <StatCard
                    label="Online Sekarang"
                    value={MOCK_ADMINS.filter(a => {
                        const diff = Date.now() - a.lastActive.getTime();
                        return diff < 1000 * 60 * 15; // 15 menit
                    }).length.toString()}
                    icon={<Clock size={20} />}
                    color="#3B82F6"
                />
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari nama atau email admin..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Admin Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAdmins.map((admin) => {
                    const roleConfig = ROLE_CONFIGS[admin.role];
                    const isOnline = Date.now() - admin.lastActive.getTime() < 1000 * 60 * 15;

                    return (
                        <div
                            key={admin.id}
                            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            {/* Menu Button */}
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => setShowMenu(showMenu === admin.id ? null : admin.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <MoreVertical size={18} className="text-gray-400" />
                                </button>

                                {showMenu === admin.id && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowMenu(null)} />
                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                                            <Link
                                                href={`/super-admin/admins/${admin.id}`}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                                            >
                                                <Eye size={14} />
                                                Lihat Detail
                                            </Link>
                                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                                <Edit size={14} />
                                                Edit
                                            </button>
                                            {admin.role !== 'super_admin' && (
                                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                    <Trash2 size={14} />
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Avatar & Status */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="relative">
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                                        style={{ backgroundColor: roleConfig.color }}
                                    >
                                        {ROLE_ICONS[admin.role]}
                                    </div>
                                    <div
                                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800 truncate">{admin.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{admin.email}</p>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div className="mb-4">
                                <span
                                    className="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                                    style={{ backgroundColor: roleConfig.bgColor, color: roleConfig.color }}
                                >
                                    {roleConfig.displayNameId}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Status</span>
                                    <span className={`font-medium ${admin.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                                        {admin.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Terakhir Aktif</span>
                                    <span className={`font-medium ${isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                                        {isOnline ? 'Online' : formatLastActive(admin.lastActive)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Bergabung</span>
                                    <span className="text-gray-600">
                                        {admin.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <Link
                                    href={`/super-admin/admins/${admin.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <Eye size={14} />
                                    Detail
                                </Link>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Edit size={14} />
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredAdmins.length === 0 && (
                <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
                    <UserCog size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada admin ditemukan</h3>
                    <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
                </div>
            )}
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="bg-[var(--bg-card)] rounded-xl p-5 shadow-sm border border-[var(--border-light)]">
            <div className="flex items-center gap-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
                    <p className="text-base font-medium text-[var(--text-secondary)]">{label}</p>
                </div>
            </div>
        </div>
    );
}
