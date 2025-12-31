/**
 * Edit Admin Page
 * SMK Marhas Admin Dashboard
 * 
 * With 3-layer confirmation for role changes
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, User, Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { TripleConfirmModal } from '@/components/shared';

const MOCK_ADMIN = {
    id: 'ADM001',
    name: 'Ahmad Suryadi',
    email: 'ahmad.suryadi@marhas.sch.id',
    phone: '081234567890',
    role: 'admin_perpustakaan',
    status: 'active',
};

const ROLES = [
    { value: 'super_admin', label: 'Super Admin', color: '#7C3AED' },
    { value: 'admin_perpustakaan', label: 'Admin Perpustakaan', color: '#10B981' },
    { value: 'admin_keuangan', label: 'Admin Keuangan', color: '#F59E0B' },
    { value: 'admin_absensi', label: 'Admin Absensi', color: '#3B82F6' },
    { value: 'admin_jadwal', label: 'Admin Jadwal', color: '#EC4899' },
    { value: 'admin_aplikasi', label: 'Admin Aplikasi', color: '#6366F1' },
];

export default function EditAdminPage() {
    const params = useParams();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(MOCK_ADMIN);
    const [originalRole, setOriginalRole] = useState(MOCK_ADMIN.role);
    const [showRoleConfirm, setShowRoleConfirm] = useState(false);
    const [pendingRole, setPendingRole] = useState<string | null>(null);

    // Track if role changed
    const roleChanged = formData.role !== originalRole;

    const handleRoleChange = (newRole: string) => {
        if (newRole !== originalRole) {
            setPendingRole(newRole);
            setShowRoleConfirm(true);
        } else {
            setFormData({ ...formData, role: newRole });
        }
    };

    const confirmRoleChange = () => {
        if (pendingRole) {
            setFormData({ ...formData, role: pendingRole });
            setOriginalRole(pendingRole);
            setPendingRole(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(`/super-admin/admins/${params.id}`);
    };

    const getRoleLabel = (value: string) => {
        return ROLES.find(r => r.value === value)?.label || value;
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href={`/super-admin/admins/${params.id}`} className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Edit Admin</h1>
                    <p className="text-[var(--text-muted)]">ID: {params.id}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                {/* Basic Info */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <User size={20} className="text-[var(--brand-primary)]" />
                        Informasi Dasar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">No. Telepon</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Role & Access - with confirmation */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-purple-500" />
                        Hak Akses
                        {roleChanged && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                Berubah
                            </span>
                        )}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Role <span className="text-amber-600 text-xs">(Memerlukan konfirmasi)</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {ROLES.map((role) => (
                                    <label
                                        key={role.value}
                                        className={`
                                            flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                                            ${formData.role === role.value
                                                ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                                                : 'border-[var(--border-light)] hover:border-[var(--brand-primary)]/50'
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role.value}
                                            checked={formData.role === role.value}
                                            onChange={(e) => handleRoleChange(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: role.color }}
                                        />
                                        <span className="text-sm font-medium text-[var(--text-primary)]">{role.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                    <Link
                        href={`/super-admin/admins/${params.id}`}
                        className="px-6 py-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors"
                    >
                        Batal
                    </Link>
                </div>
            </form>

            {/* Triple Confirm Modal for Role Change */}
            <TripleConfirmModal
                isOpen={showRoleConfirm}
                onClose={() => {
                    setShowRoleConfirm(false);
                    setPendingRole(null);
                }}
                onConfirm={confirmRoleChange}
                title="Ubah Role Admin"
                description={`Anda akan mengubah role dari "${getRoleLabel(originalRole)}" menjadi "${getRoleLabel(pendingRole || '')}".`}
                warningText="Perubahan role akan mempengaruhi hak akses admin. Pastikan ini adalah tindakan yang benar!"
                confirmText="YAKIN"
                countdownSeconds={5}
                variant="warning"
            />
        </div>
    );
}
