/**
 * Role Context
 * SMK Marhas Admin Dashboard
 * 
 * Context untuk role management dan permissions
 */

'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { AdminRole, PermissionResource, PermissionAction } from '@/types/auth';
import { canPerform, getAccessibleResources } from '@/lib/permissions';

interface RoleContextType {
    role: AdminRole;
    canAccess: (resource: PermissionResource, action: PermissionAction) => boolean;
    accessibleResources: PermissionResource[];
    roleLabel: string;
    roleColor: string;
}

const ROLE_LABELS: Record<AdminRole, string> = {
    super_admin: 'Super Admin',
    admin_perpustakaan: 'Admin Perpustakaan',
    admin_keuangan: 'Admin Keuangan',
    admin_absensi: 'Admin Absensi',
    admin_jadwal: 'Admin Jadwal',
    admin_aplikasi: 'Admin Aplikasi',
};

const ROLE_COLORS: Record<AdminRole, string> = {
    super_admin: '#8B5CF6',
    admin_perpustakaan: '#10B981',
    admin_keuangan: '#F59E0B',
    admin_absensi: '#3B82F6',
    admin_jadwal: '#EC4899',
    admin_aplikasi: '#6366F1',
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({
    children,
    role,
}: {
    children: ReactNode;
    role: AdminRole;
}) {
    const canAccess = (resource: PermissionResource, action: PermissionAction) => {
        return canPerform(role, resource, action);
    };

    const value: RoleContextType = {
        role,
        canAccess,
        accessibleResources: getAccessibleResources(role),
        roleLabel: ROLE_LABELS[role],
        roleColor: ROLE_COLORS[role],
    };

    return (
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}

export default RoleContext;
