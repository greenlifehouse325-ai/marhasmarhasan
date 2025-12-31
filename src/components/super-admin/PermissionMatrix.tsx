/**
 * Permission Matrix Component
 * SMK Marhas Admin Dashboard
 * 
 * Visual grid showing permissions for each role
 */

'use client';

import React, { useState } from 'react';
import {
    Check,
    X,
    Shield,
    BookOpen,
    Wallet,
    ClipboardCheck,
    Calendar,
    Smartphone,
    Info
} from 'lucide-react';
import type { AdminRole } from '@/types/auth';
import { PERMISSION_MATRIX, canPerform } from '@/lib/permissions';
import { ROLE_CONFIGS } from '@/types/admin';

// ============================================
// TYPES
// ============================================

interface PermissionMatrixProps {
    editable?: boolean;
    selectedRole?: AdminRole;
    onPermissionChange?: (role: AdminRole, resource: string, action: string, enabled: boolean) => void;
}

const RESOURCES = [
    { key: 'admin', label: 'Kelola Admin', icon: Shield },
    { key: 'user', label: 'User Database', icon: Shield },
    { key: 'student', label: 'Data Siswa', icon: Shield },
    { key: 'teacher', label: 'Data Guru', icon: Shield },
    { key: 'book', label: 'Buku', icon: BookOpen },
    { key: 'lending', label: 'Peminjaman', icon: BookOpen },
    { key: 'fine', label: 'Denda', icon: Wallet },
    { key: 'payment', label: 'Pembayaran', icon: Wallet },
    { key: 'attendance', label: 'Absensi', icon: ClipboardCheck },
    { key: 'schedule', label: 'Jadwal', icon: Calendar },
    { key: 'announcement', label: 'Pengumuman', icon: Smartphone },
    { key: 'news', label: 'Berita', icon: Smartphone },
    { key: 'notification', label: 'Notifikasi', icon: Smartphone },
    { key: 'report', label: 'Laporan', icon: Shield },
    { key: 'audit_log', label: 'Audit Log', icon: Shield },
    { key: 'system', label: 'Sistem', icon: Shield },
];

const ACTIONS = ['create', 'read', 'update', 'delete', 'export', 'approve', 'ban'];

const ROLES: AdminRole[] = [
    'super_admin',
    'admin_perpustakaan',
    'admin_keuangan',
    'admin_absensi',
    'admin_jadwal',
    'admin_aplikasi'
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function PermissionMatrix({
    editable = false,
    selectedRole,
    onPermissionChange
}: PermissionMatrixProps) {
    const [hoveredCell, setHoveredCell] = useState<string | null>(null);
    const displayRoles = selectedRole ? [selectedRole] : ROLES;

    return (
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border-light)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    Matrix Perizinan
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                    Hak akses untuk setiap role admin
                </p>
            </div>

            {/* Legend */}
            <div className="px-4 py-3 bg-[var(--bg-hover)] border-b border-[var(--border-light)] flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-green-500/20 flex items-center justify-center">
                        <Check size={12} className="text-green-500" />
                    </div>
                    <span className="text-[var(--text-secondary)]">Diizinkan</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-red-500/10 flex items-center justify-center">
                        <X size={12} className="text-red-400" />
                    </div>
                    <span className="text-[var(--text-secondary)]">Tidak Diizinkan</span>
                </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[var(--bg-hover)]">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider sticky left-0 bg-[var(--bg-hover)] z-10">
                                Resource
                            </th>
                            {ACTIONS.map(action => (
                                <th key={action} className="px-3 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                    {action}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayRoles.map((role, roleIdx) => (
                            <React.Fragment key={role}>
                                {/* Role Header Row */}
                                <tr className="bg-[var(--bg-elevated)]">
                                    <td colSpan={ACTIONS.length + 1} className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: ROLE_CONFIGS[role].color }}
                                            />
                                            <span className="font-medium text-[var(--text-primary)]">
                                                {ROLE_CONFIGS[role].displayNameId}
                                            </span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Resource Rows */}
                                {RESOURCES.map((resource, resIdx) => {
                                    const Icon = resource.icon;
                                    const hasAnyPermission = ACTIONS.some(action =>
                                        canPerform(role, resource.key as any, action as any)
                                    );

                                    if (!hasAnyPermission && selectedRole) return null;

                                    return (
                                        <tr
                                            key={`${role}-${resource.key}`}
                                            className={`
                                                border-b border-[var(--border-light)]
                                                ${resIdx % 2 === 0 ? 'bg-[var(--bg-card)]' : 'bg-[var(--bg-hover)]/50'}
                                            `}
                                        >
                                            <td className="px-4 py-2 sticky left-0 bg-inherit z-10">
                                                <div className="flex items-center gap-2">
                                                    <Icon size={14} className="text-[var(--text-muted)]" />
                                                    <span className="text-sm text-[var(--text-secondary)]">
                                                        {resource.label}
                                                    </span>
                                                </div>
                                            </td>
                                            {ACTIONS.map(action => {
                                                const hasPermission = canPerform(role, resource.key as any, action as any);
                                                const cellKey = `${role}-${resource.key}-${action}`;

                                                return (
                                                    <td
                                                        key={cellKey}
                                                        className="px-3 py-2 text-center"
                                                        onMouseEnter={() => setHoveredCell(cellKey)}
                                                        onMouseLeave={() => setHoveredCell(null)}
                                                    >
                                                        {editable ? (
                                                            <button
                                                                onClick={() => onPermissionChange?.(role, resource.key, action, !hasPermission)}
                                                                className={`
                                                                    w-6 h-6 rounded flex items-center justify-center
                                                                    transition-all duration-150
                                                                    ${hasPermission
                                                                        ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                                        : 'bg-[var(--bg-hover)] text-[var(--text-muted)] hover:bg-[var(--bg-active)]'
                                                                    }
                                                                `}
                                                            >
                                                                {hasPermission ? <Check size={14} /> : <X size={14} />}
                                                            </button>
                                                        ) : (
                                                            <div className={`
                                                                w-6 h-6 rounded flex items-center justify-center mx-auto
                                                                ${hasPermission
                                                                    ? 'bg-green-500/20 text-green-500'
                                                                    : 'bg-red-500/10 text-red-400'
                                                                }
                                                            `}>
                                                                {hasPermission ? <Check size={14} /> : <X size={14} />}
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Info Footer */}
            <div className="p-4 bg-[var(--bg-hover)] border-t border-[var(--border-light)] flex items-start gap-2">
                <Info size={16} className="text-[var(--info)] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--text-muted)]">
                    Super Admin memiliki akses penuh ke semua resource dan action.
                    Perubahan permission akan tercatat di Audit Log.
                </p>
            </div>
        </div>
    );
}

// ============================================
// COMPACT VERSION
// ============================================

export function PermissionMatrixCompact({ role }: { role: AdminRole }) {
    const roleConfig = ROLE_CONFIGS[role];
    const accessibleResources = RESOURCES.filter(resource =>
        ACTIONS.some(action => canPerform(role, resource.key as any, action as any))
    );

    return (
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${roleConfig.color}20`, color: roleConfig.color }}
                >
                    <Shield size={20} />
                </div>
                <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">{roleConfig.displayNameId}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{roleConfig.description}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {accessibleResources.map(resource => {
                    const Icon = resource.icon;
                    return (
                        <div
                            key={resource.key}
                            className="flex items-center gap-1.5 px-2 py-1 bg-[var(--bg-hover)] rounded-lg text-xs"
                        >
                            <Icon size={12} className="text-[var(--text-muted)]" />
                            <span className="text-[var(--text-secondary)]">{resource.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
