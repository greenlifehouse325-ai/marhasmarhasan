/**
 * Admin List Component
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Tabel list admin
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
    Eye,
    Edit,
    Trash2,
    Shield,
    Ban,
    CheckCircle,
} from 'lucide-react';
import type { AdminRole } from '@/types/auth';

interface Admin {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
}

interface AdminListProps {
    admins: Admin[];
    onView?: (admin: Admin) => void;
    onEdit?: (admin: Admin) => void;
    onDelete?: (admin: Admin) => void;
    onToggleStatus?: (admin: Admin) => void;
}

const ROLE_LABELS: Record<AdminRole, { label: string; color: string }> = {
    super_admin: { label: 'Super Admin', color: '#8B5CF6' },
    admin_perpustakaan: { label: 'Perpustakaan', color: '#10B981' },
    admin_keuangan: { label: 'Keuangan', color: '#F59E0B' },
    admin_absensi: { label: 'Absensi', color: '#3B82F6' },
    admin_jadwal: { label: 'Jadwal', color: '#EC4899' },
    admin_aplikasi: { label: 'Aplikasi', color: '#6366F1' },
};

export function AdminList({
    admins,
    onView,
    onEdit,
    onDelete,
    onToggleStatus,
}: AdminListProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 text-left text-sm text-gray-500">
                            <th className="px-6 py-4 font-medium">Admin</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Login Terakhir</th>
                            <th className="px-6 py-4 font-medium text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {admins.map(admin => (
                            <AdminRow
                                key={admin.id}
                                admin={admin}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleStatus={onToggleStatus}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AdminRow({
    admin,
    onView,
    onEdit,
    onDelete,
    onToggleStatus,
}: {
    admin: Admin;
    onView?: (admin: Admin) => void;
    onEdit?: (admin: Admin) => void;
    onDelete?: (admin: Admin) => void;
    onToggleStatus?: (admin: Admin) => void;
}) {
    const roleInfo = ROLE_LABELS[admin.role];

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">{admin.name.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">{admin.name}</p>
                        <p className="text-xs text-gray-500">{admin.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: `${roleInfo.color}15`, color: roleInfo.color }}
                >
                    <Shield size={12} />
                    {roleInfo.label}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${admin.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {admin.isActive ? <CheckCircle size={12} /> : <Ban size={12} />}
                    {admin.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">
                    {admin.lastLogin
                        ? admin.lastLogin.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '-'
                    }
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-1">
                    {onView && (
                        <button
                            onClick={() => onView(admin)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Lihat"
                        >
                            <Eye size={14} />
                        </button>
                    )}
                    {onEdit && (
                        <button
                            onClick={() => onEdit(admin)}
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Edit size={14} />
                        </button>
                    )}
                    {onToggleStatus && (
                        <button
                            onClick={() => onToggleStatus(admin)}
                            className={`p-1.5 rounded-lg transition-colors ${admin.isActive
                                    ? 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                }`}
                            title={admin.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                            {admin.isActive ? <Ban size={14} /> : <CheckCircle size={14} />}
                        </button>
                    )}
                    {onDelete && admin.role !== 'super_admin' && (
                        <button
                            onClick={() => onDelete(admin)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default AdminList;
