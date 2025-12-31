/**
 * Super Admin Users Page
 * SMK Marhas Admin Dashboard
 * 
 * Database semua user dalam sistem dengan NISN, NIP, NIS
 */

'use client';

import React, { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    Download,
    UserCheck,
    GraduationCap,
    Briefcase,
    Users2,
    ChevronRight,
    Ban,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    IdCard,
    Hash,
    Mail,
    Phone,
    X
} from 'lucide-react';
import Link from 'next/link';
import { DoubleConfirmModal } from '@/components/shared';

// Types
interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: 'student' | 'teacher' | 'parent';
    nisn?: string; // Nomor Induk Siswa Nasional (for students)
    nis?: string;  // Nomor Induk Sekolah (for students)
    nip?: string;  // Nomor Induk Pegawai (for teachers)
    class?: string;
    subject?: string;
    children?: string;
    status: 'active' | 'inactive';
    lastLogin: string;
    registeredAt: string;
}

// Mock data with NISN, NIP, NIS
const MOCK_USERS: User[] = [
    {
        id: 'U001',
        name: 'Ahmad Rizki',
        email: 'ahmad.rizki@student.marhas.sch.id',
        phone: '081234567890',
        type: 'student',
        nisn: '0012345678',
        nis: '12345',
        class: 'XII RPL 1',
        status: 'active',
        lastLogin: '2024-12-29',
        registeredAt: '2022-07-01'
    },
    {
        id: 'U002',
        name: 'Siti Nurhaliza',
        email: 'siti.nur@student.marhas.sch.id',
        phone: '081234567891',
        type: 'student',
        nisn: '0012345679',
        nis: '12346',
        class: 'XII RPL 2',
        status: 'active',
        lastLogin: '2024-12-28',
        registeredAt: '2022-07-01'
    },
    {
        id: 'U003',
        name: 'Budi Santoso, S.Pd',
        email: 'budi.santoso@marhas.sch.id',
        phone: '081234567892',
        type: 'teacher',
        nip: '198501152010011001',
        subject: 'Matematika',
        status: 'active',
        lastLogin: '2024-12-29',
        registeredAt: '2020-01-01'
    },
    {
        id: 'U004',
        name: 'Dewi Lestari, M.Pd',
        email: 'dewi.lestari@marhas.sch.id',
        phone: '081234567893',
        type: 'teacher',
        nip: '198703202012012001',
        subject: 'B. Indonesia',
        status: 'active',
        lastLogin: '2024-12-27',
        registeredAt: '2020-01-01'
    },
    {
        id: 'U005',
        name: 'Rudi Hartono',
        email: 'rudi.h@gmail.com',
        phone: '081234567894',
        type: 'parent',
        children: 'Ahmad Rizki (XII RPL 1)',
        status: 'active',
        lastLogin: '2024-12-25',
        registeredAt: '2022-07-15'
    },
    {
        id: 'U006',
        name: 'Maya Sari',
        email: 'maya.s@gmail.com',
        phone: '081234567895',
        type: 'parent',
        children: 'Siti Nurhaliza (XII RPL 2)',
        status: 'inactive',
        lastLogin: '2024-11-15',
        registeredAt: '2022-07-15'
    },
    {
        id: 'U007',
        name: 'Farhan Akbar',
        email: 'farhan.akbar@student.marhas.sch.id',
        phone: '081234567896',
        type: 'student',
        nisn: '0012345680',
        nis: '12347',
        class: 'XI TKJ 1',
        status: 'active',
        lastLogin: '2024-12-29',
        registeredAt: '2023-07-01'
    },
    {
        id: 'U008',
        name: 'Ratna Wulandari, S.Kom',
        email: 'ratna.wulandari@marhas.sch.id',
        phone: '081234567897',
        type: 'teacher',
        nip: '199001012015012001',
        subject: 'Pemrograman Web',
        status: 'active',
        lastLogin: '2024-12-29',
        registeredAt: '2020-01-01'
    },
];

const USER_STATS = [
    { type: 'student', label: 'Siswa', count: 1234, icon: GraduationCap, color: '#3B82F6' },
    { type: 'teacher', label: 'Guru', count: 87, icon: Briefcase, color: '#10B981' },
    { type: 'parent', label: 'Orang Tua', count: 2156, icon: Users2, color: '#8B5CF6' },
];

export default function SuperAdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const filteredUsers = MOCK_USERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.nisn?.includes(searchQuery) ||
            user.nip?.includes(searchQuery) ||
            user.nis?.includes(searchQuery);
        const matchesType = typeFilter === 'all' || user.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleViewDetail = (user: User) => {
        setSelectedUser(user);
        setShowDetailModal(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        // Simulate delete
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Deleted user:', userToDelete?.id);
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Database User
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Kelola semua pengguna dalam sistem (Siswa, Guru, Orang Tua)
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                    <Download size={16} />
                    Export Users
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {USER_STATS.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <button
                            key={stat.type}
                            onClick={() => setTypeFilter(typeFilter === stat.type ? 'all' : stat.type)}
                            className={`
                                bg-[var(--bg-card)] border rounded-xl p-4 text-left transition-all
                                ${typeFilter === stat.type
                                    ? 'border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/20'
                                    : 'border-[var(--border-light)] hover:border-[var(--border-medium)]'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.count.toLocaleString()}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-[var(--text-muted)]" />
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Cari nama, email, NISN, NIP, atau NIS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">User</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">NISN / NIP / NIS</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Tipe</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Info</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Login Terakhir</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)]">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center">
                                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-[var(--text-primary)]">{user.name}</p>
                                                <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            {user.type === 'student' && (
                                                <div className="space-y-1">
                                                    <p className="text-[var(--text-primary)]"><span className="text-[var(--text-muted)]">NISN:</span> {user.nisn}</p>
                                                    <p className="text-[var(--text-muted)] text-xs">NIS: {user.nis}</p>
                                                </div>
                                            )}
                                            {user.type === 'teacher' && (
                                                <p className="text-[var(--text-primary)]"><span className="text-[var(--text-muted)]">NIP:</span> {user.nip}</p>
                                            )}
                                            {user.type === 'parent' && (
                                                <p className="text-[var(--text-muted)]">-</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-lg
                                            ${user.type === 'student' ? 'bg-blue-500/10 text-blue-600' :
                                                user.type === 'teacher' ? 'bg-green-500/10 text-green-600' :
                                                    'bg-purple-500/10 text-purple-600'
                                            }
                                        `}>
                                            {user.type === 'student' ? 'Siswa' : user.type === 'teacher' ? 'Guru' : 'Orang Tua'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">
                                        {user.type === 'student' ? user.class :
                                            user.type === 'teacher' ? user.subject :
                                                user.children}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-lg
                                            ${user.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}
                                        `}>
                                            {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{user.lastLogin}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => handleViewDetail(user)}
                                                className="p-2 hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <Eye size={16} className="text-[var(--text-muted)]" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} className="text-[var(--text-muted)]" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(user)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {filteredUsers.map(user => (
                    <div key={user.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center">
                                    <span className="text-sm font-bold text-[var(--text-primary)]">
                                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">{user.name}</p>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded
                                        ${user.type === 'student' ? 'bg-blue-500/10 text-blue-600' :
                                            user.type === 'teacher' ? 'bg-green-500/10 text-green-600' :
                                                'bg-purple-500/10 text-purple-600'
                                        }
                                    `}>
                                        {user.type === 'student' ? 'Siswa' : user.type === 'teacher' ? 'Guru' : 'Orang Tua'}
                                    </span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-lg
                                ${user.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}
                            `}>
                                {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>

                        <div className="space-y-2 text-sm mb-3">
                            <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <Mail size={14} />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <Phone size={14} />
                                <span>{user.phone}</span>
                            </div>
                            {user.type === 'student' && (
                                <>
                                    <div className="flex items-center gap-2 text-[var(--text-primary)]">
                                        <IdCard size={14} className="text-[var(--text-muted)]" />
                                        <span>NISN: <b>{user.nisn}</b></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                        <Hash size={14} />
                                        <span>NIS: {user.nis} • Kelas: {user.class}</span>
                                    </div>
                                </>
                            )}
                            {user.type === 'teacher' && (
                                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                                    <IdCard size={14} className="text-[var(--text-muted)]" />
                                    <span>NIP: <b>{user.nip}</b></span>
                                </div>
                            )}
                            {user.type === 'parent' && (
                                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                    <Users2 size={14} />
                                    <span>Anak: {user.children}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-[var(--border-light)]">
                            <button
                                onClick={() => handleViewDetail(user)}
                                className="flex-1 py-2 text-sm font-medium text-[var(--brand-primary)] bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                            >
                                Lihat Detail
                            </button>
                            <button
                                onClick={() => handleDeleteClick(user)}
                                className="px-4 py-2 text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
                    <div className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl shadow-2xl animate-scaleIn">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Detail User</h2>
                            <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                                <X size={18} className="text-[var(--text-muted)]" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-light)]">
                                <div className="w-16 h-16 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center">
                                    <span className="text-xl font-bold text-[var(--text-primary)]">
                                        {selectedUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{selectedUser.name}</h3>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded
                                        ${selectedUser.type === 'student' ? 'bg-blue-500/10 text-blue-600' :
                                            selectedUser.type === 'teacher' ? 'bg-green-500/10 text-green-600' :
                                                'bg-purple-500/10 text-purple-600'
                                        }
                                    `}>
                                        {selectedUser.type === 'student' ? 'Siswa' : selectedUser.type === 'teacher' ? 'Guru' : 'Orang Tua'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[var(--text-muted)]">Email</p>
                                    <p className="font-medium text-[var(--text-primary)]">{selectedUser.email}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)]">Telepon</p>
                                    <p className="font-medium text-[var(--text-primary)]">{selectedUser.phone}</p>
                                </div>
                                {selectedUser.type === 'student' && (
                                    <>
                                        <div>
                                            <p className="text-[var(--text-muted)]">NISN</p>
                                            <p className="font-bold text-[var(--text-primary)]">{selectedUser.nisn}</p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)]">NIS</p>
                                            <p className="font-medium text-[var(--text-primary)]">{selectedUser.nis}</p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)]">Kelas</p>
                                            <p className="font-medium text-[var(--text-primary)]">{selectedUser.class}</p>
                                        </div>
                                    </>
                                )}
                                {selectedUser.type === 'teacher' && (
                                    <>
                                        <div className="col-span-2">
                                            <p className="text-[var(--text-muted)]">NIP</p>
                                            <p className="font-bold text-[var(--text-primary)]">{selectedUser.nip}</p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)]">Mata Pelajaran</p>
                                            <p className="font-medium text-[var(--text-primary)]">{selectedUser.subject}</p>
                                        </div>
                                    </>
                                )}
                                {selectedUser.type === 'parent' && (
                                    <div className="col-span-2">
                                        <p className="text-[var(--text-muted)]">Anak</p>
                                        <p className="font-medium text-[var(--text-primary)]">{selectedUser.children}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-[var(--text-muted)]">Status</p>
                                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded
                                        ${selectedUser.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}
                                    `}>
                                        {selectedUser.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)]">Terdaftar Sejak</p>
                                    <p className="font-medium text-[var(--text-primary)]">{selectedUser.registeredAt}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)]">Login Terakhir</p>
                                    <p className="font-medium text-[var(--text-primary)]">{selectedUser.lastLogin}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-[var(--border-light)] bg-[var(--bg-hover)] rounded-b-2xl">
                            <button className="flex-1 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl hover:bg-[var(--bg-active)] transition-colors">
                                Edit User
                            </button>
                            <button
                                onClick={() => {
                                    setShowDetailModal(false);
                                    handleDeleteClick(selectedUser);
                                }}
                                className="px-6 py-2.5 text-sm font-medium text-red-500 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DoubleConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title={`Hapus User: ${userToDelete?.name}`}
                message={`Semua data user ini akan dihapus termasuk riwayat login, aktivitas, dan data terkait lainnya.`}
                warningMessage="Data yang dihapus tidak dapat dikembalikan!"
                requireConfirmText="HAPUS"
                cooldownSeconds={3}
                confirmText="Ya, Hapus User"
            />

            <style jsx>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
