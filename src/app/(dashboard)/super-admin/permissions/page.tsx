/**
 * Permissions Management Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * View and manage role permissions (Menu Peraturan)
 */

'use client';

import React, { useState } from 'react';
import {
    Shield,
    Settings,
    ChevronLeft,
    Info,
    Download,
    RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import type { AdminRole } from '@/types/auth';
import { ROLE_CONFIGS } from '@/types/admin';
import PermissionMatrix, { PermissionMatrixCompact } from '@/components/super-admin/PermissionMatrix';

const ROLES: AdminRole[] = [
    'super_admin',
    'admin_perpustakaan',
    'admin_keuangan',
    'admin_absensi',
    'admin_jadwal',
    'admin_aplikasi'
];

export default function PermissionsPage() {
    const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null);
    const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/super-admin"
                        className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
                    >
                        <ChevronLeft size={20} className="text-[var(--text-muted)]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                            Menu Peraturan
                        </h1>
                        <p className="text-[var(--text-muted)]">
                            Kelola hak akses untuk setiap role admin
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Download size={16} />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors">
                        <RefreshCw size={16} />
                        <span className="hidden sm:inline">Sinkronkan</span>
                    </button>
                </div>
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-[var(--info-bg)] border border-[var(--info)]/20 rounded-xl flex items-start gap-3">
                <Info size={20} className="text-[var(--info)] mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                        Tentang Menu Peraturan
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                        Halaman ini menampilkan hak akses setiap role admin. Super Admin memiliki akses penuh ke semua
                        fitur. Role lain memiliki akses terbatas sesuai dengan tugas masing-masing.
                    </p>
                </div>
            </div>

            {/* Role Filter */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedRole(null)}
                    className={`
                        px-4 py-2 rounded-xl text-sm font-medium transition-colors
                        ${!selectedRole
                            ? 'bg-[var(--brand-primary)] text-white'
                            : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--bg-active)]'
                        }
                    `}
                >
                    Semua Role
                </button>
                {ROLES.map(role => (
                    <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                            ${selectedRole === role
                                ? 'text-white'
                                : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--bg-active)]'
                            }
                        `}
                        style={selectedRole === role ? { backgroundColor: ROLE_CONFIGS[role].color } : {}}
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: selectedRole === role ? 'white' : ROLE_CONFIGS[role].color }}
                        />
                        {ROLE_CONFIGS[role].displayNameId}
                    </button>
                ))}
            </div>

            {/* View Toggle (Mobile) */}
            <div className="flex rounded-xl bg-[var(--bg-hover)] p-1 w-fit">
                <button
                    onClick={() => setViewMode('matrix')}
                    className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${viewMode === 'matrix'
                            ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                            : 'text-[var(--text-muted)]'
                        }
                    `}
                >
                    Matrix
                </button>
                <button
                    onClick={() => setViewMode('cards')}
                    className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${viewMode === 'cards'
                            ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                            : 'text-[var(--text-muted)]'
                        }
                    `}
                >
                    Cards
                </button>
            </div>

            {/* Content */}
            {viewMode === 'matrix' ? (
                <PermissionMatrix
                    selectedRole={selectedRole || undefined}
                    editable={false}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(selectedRole ? [selectedRole] : ROLES).map(role => (
                        <PermissionMatrixCompact key={role} role={role} />
                    ))}
                </div>
            )}

            {/* Role Descriptions */}
            <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] overflow-hidden">
                <div className="p-4 border-b border-[var(--border-light)]">
                    <h3 className="font-semibold text-[var(--text-primary)]">Deskripsi Role</h3>
                </div>
                <div className="divide-y divide-[var(--border-light)]">
                    {ROLES.map(role => {
                        const config = ROLE_CONFIGS[role];
                        return (
                            <div key={role} className="p-4 flex items-center gap-4 hover:bg-[var(--bg-hover)] transition-colors">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                                >
                                    <Shield size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-[var(--text-primary)]">
                                        {config.displayNameId}
                                    </h4>
                                    <p className="text-sm text-[var(--text-muted)] truncate">
                                        {config.description}
                                    </p>
                                </div>
                                <Link
                                    href={`/super-admin/permissions/${role}`}
                                    className="p-2 hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                                >
                                    <Settings size={18} className="text-[var(--text-muted)]" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
