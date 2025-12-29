/**
 * Permissions Library
 * SMK Marhas Admin Dashboard
 * 
 * Utility untuk permission management
 */

import type { AdminRole, Permission, PermissionAction, PermissionResource } from '@/types/auth';

// Permission matrix - defines what each role can do
export const PERMISSION_MATRIX: Record<AdminRole, Record<PermissionResource, PermissionAction[]>> = {
    super_admin: {
        admin: ['create', 'read', 'update', 'delete', 'ban'],
        user: ['create', 'read', 'update', 'delete', 'ban'],
        student: ['create', 'read', 'update', 'delete', 'export'],
        teacher: ['create', 'read', 'update', 'delete', 'export'],
        parent: ['create', 'read', 'update', 'delete', 'export'],
        book: ['create', 'read', 'update', 'delete'],
        lending: ['create', 'read', 'update', 'delete', 'approve'],
        fine: ['create', 'read', 'update', 'delete'],
        payment: ['create', 'read', 'update', 'delete', 'approve'],
        attendance: ['create', 'read', 'update', 'delete'],
        schedule: ['create', 'read', 'update', 'delete'],
        announcement: ['create', 'read', 'update', 'delete'],
        news: ['create', 'read', 'update', 'delete'],
        achievement: ['create', 'read', 'update', 'delete'],
        notification: ['create', 'read', 'update', 'delete'],
        report: ['read', 'export'],
        audit_log: ['read', 'export'],
        system: ['read', 'update'],
    },
    admin_perpustakaan: {
        admin: [],
        user: [],
        student: ['read'],
        teacher: ['read'],
        parent: [],
        book: ['create', 'read', 'update', 'delete'],
        lending: ['create', 'read', 'update', 'approve'],
        fine: ['create', 'read', 'update'],
        payment: [],
        attendance: [],
        schedule: [],
        announcement: [],
        news: [],
        achievement: [],
        notification: ['read'],
        report: ['read', 'export'],
        audit_log: [],
        system: [],
    },
    admin_keuangan: {
        admin: [],
        user: [],
        student: ['read'],
        teacher: [],
        parent: ['read'],
        book: [],
        lending: [],
        fine: ['read'],
        payment: ['create', 'read', 'update', 'approve'],
        attendance: [],
        schedule: [],
        announcement: [],
        news: [],
        achievement: [],
        notification: ['read'],
        report: ['read', 'export'],
        audit_log: [],
        system: [],
    },
    admin_absensi: {
        admin: [],
        user: [],
        student: ['read'],
        teacher: ['read'],
        parent: [],
        book: [],
        lending: [],
        fine: [],
        payment: [],
        attendance: ['create', 'read', 'update', 'delete'],
        schedule: ['read'],
        announcement: [],
        news: [],
        achievement: [],
        notification: ['read'],
        report: ['read', 'export'],
        audit_log: [],
        system: [],
    },
    admin_jadwal: {
        admin: [],
        user: [],
        student: ['read'],
        teacher: ['read'],
        parent: [],
        book: [],
        lending: [],
        fine: [],
        payment: [],
        attendance: ['read'],
        schedule: ['create', 'read', 'update', 'delete'],
        announcement: ['read'],
        news: [],
        achievement: [],
        notification: ['read'],
        report: ['read'],
        audit_log: [],
        system: [],
    },
    admin_aplikasi: {
        admin: [],
        user: [],
        student: ['read'],
        teacher: ['read'],
        parent: ['read'],
        book: [],
        lending: [],
        fine: [],
        payment: [],
        attendance: [],
        schedule: ['read'],
        announcement: ['create', 'read', 'update', 'delete'],
        news: ['create', 'read', 'update', 'delete'],
        achievement: ['create', 'read', 'update', 'delete'],
        notification: ['create', 'read', 'update', 'delete'],
        report: ['read'],
        audit_log: [],
        system: [],
    },
};

/**
 * Check if role can perform action on resource
 */
export function canPerform(
    role: AdminRole,
    resource: PermissionResource,
    action: PermissionAction
): boolean {
    const rolePerms = PERMISSION_MATRIX[role];
    if (!rolePerms) return false;

    const resourcePerms = rolePerms[resource];
    if (!resourcePerms) return false;

    return resourcePerms.includes(action);
}

/**
 * Get all permissions for a role as array
 */
export function getPermissions(role: AdminRole): Permission[] {
    const rolePerms = PERMISSION_MATRIX[role];
    if (!rolePerms) return [];

    return Object.entries(rolePerms)
        .filter(([, actions]) => actions.length > 0)
        .map(([resource, actions]) => ({
            resource: resource as PermissionResource,
            actions: actions as PermissionAction[],
        }));
}

/**
 * Get accessible resources for a role
 */
export function getAccessibleResources(role: AdminRole): PermissionResource[] {
    const rolePerms = PERMISSION_MATRIX[role];
    if (!rolePerms) return [];

    return Object.entries(rolePerms)
        .filter(([, actions]) => actions.length > 0)
        .map(([resource]) => resource as PermissionResource);
}

/**
 * Check if role is super admin
 */
export function isSuperAdmin(role: AdminRole): boolean {
    return role === 'super_admin';
}
