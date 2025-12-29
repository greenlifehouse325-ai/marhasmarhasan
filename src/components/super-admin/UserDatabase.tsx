/**
 * User Database Component
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Tabel database user (siswa, guru, ortu)
 */

'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Eye,
    Ban,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Users,
    UserCheck,
} from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: 'student' | 'teacher' | 'parent';
    status: 'active' | 'inactive' | 'banned';
    createdAt: Date;
}

interface UserDatabaseProps {
    users: User[];
    onViewUser?: (user: User) => void;
    onBanUser?: (user: User) => void;
}

const USER_TYPE_ICONS = {
    student: <GraduationCap size={16} />,
    teacher: <UserCheck size={16} />,
    parent: <Users size={16} />,
};

const USER_TYPE_LABELS = {
    student: 'Siswa',
    teacher: 'Guru',
    parent: 'Orang Tua',
};

export function UserDatabase({ users, onViewUser, onBanUser }: UserDatabaseProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | User['type']>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Filter users
    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || u.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Stats
    const stats = {
        total: users.length,
        students: users.filter((u) => u.type === 'student').length,
        teachers: users.filter((u) => u.type === 'teacher').length,
        parents: users.filter((u) => u.type === 'parent').length,
        active: users.filter((u) => u.status === 'active').length,
    };

    return (
        <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-5 gap-3">
                <StatMini label="Total" value={stats.total} />
                <StatMini label="Siswa" value={stats.students} color="#3B82F6" />
                <StatMini label="Guru" value={stats.teachers} color="#10B981" />
                <StatMini label="Orang Tua" value={stats.parents} color="#F59E0B" />
                <StatMini label="Aktif" value={stats.active} color="#8B5CF6" />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px] relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>
                    <select
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value as typeof typeFilter); setCurrentPage(1); }}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg"
                    >
                        <option value="all">Semua Tipe</option>
                        <option value="student">Siswa</option>
                        <option value="teacher">Guru</option>
                        <option value="parent">Orang Tua</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setCurrentPage(1); }}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg"
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                        <option value="banned">Banned</option>
                    </select>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 text-left text-sm text-gray-500">
                            <th className="px-4 py-3 font-medium">User</th>
                            <th className="px-4 py-3 font-medium">Tipe</th>
                            <th className="px-4 py-3 font-medium">Kontak</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Terdaftar</th>
                            <th className="px-4 py-3 font-medium text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">{user.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                            <p className="text-xs text-gray-400">ID: {user.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                        {USER_TYPE_ICONS[user.type]}
                                        {USER_TYPE_LABELS[user.type]}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                    <p className="text-xs text-gray-400">{user.phone}</p>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' :
                                            user.status === 'banned' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {user.status === 'active' ? 'Aktif' : user.status === 'banned' ? 'Banned' : 'Nonaktif'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {user.createdAt.toLocaleDateString('id-ID')}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            onClick={() => onViewUser?.(user)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg"
                                        >
                                            <Eye size={14} />
                                        </button>
                                        <button
                                            onClick={() => onBanUser?.(user)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                                        >
                                            <Ban size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        {filteredUsers.length} user ditemukan
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-sm">{currentPage} / {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatMini({ label, value, color }: { label: string; value: number; color?: string }) {
    return (
        <div className="bg-white rounded-lg p-3 border border-gray-100">
            <p className="text-2xl font-bold" style={{ color: color || '#374151' }}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
}

export default UserDatabase;
