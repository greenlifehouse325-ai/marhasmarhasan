/**
 * Auth Library
 * SMK Marhas Admin Dashboard
 * 
 * Utility functions untuk autentikasi
 */

import type { AdminRole, User, Permission, PermissionAction, PermissionResource } from '@/types/auth';

// Role permissions mapping
const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
    super_admin: [
        { resource: 'admin', actions: ['create', 'read', 'update', 'delete', 'ban'] },
        { resource: 'user', actions: ['create', 'read', 'update', 'delete', 'ban'] },
        { resource: 'student', actions: ['create', 'read', 'update', 'delete', 'export'] },
        { resource: 'teacher', actions: ['create', 'read', 'update', 'delete', 'export'] },
        { resource: 'parent', actions: ['create', 'read', 'update', 'delete', 'export'] },
        { resource: 'book', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'lending', actions: ['create', 'read', 'update', 'delete', 'approve'] },
        { resource: 'fine', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'payment', actions: ['create', 'read', 'update', 'delete', 'approve'] },
        { resource: 'attendance', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'schedule', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'announcement', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'achievement', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'notification', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'report', actions: ['read', 'export'] },
        { resource: 'audit_log', actions: ['read', 'export'] },
        { resource: 'system', actions: ['read', 'update'] },
    ],
    admin_perpustakaan: [
        { resource: 'book', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'lending', actions: ['create', 'read', 'update', 'approve'] },
        { resource: 'fine', actions: ['create', 'read', 'update'] },
        { resource: 'student', actions: ['read'] },
        { resource: 'report', actions: ['read', 'export'] },
    ],
    admin_keuangan: [
        { resource: 'payment', actions: ['create', 'read', 'update', 'approve'] },
        { resource: 'student', actions: ['read'] },
        { resource: 'report', actions: ['read', 'export'] },
    ],
    admin_absensi: [
        { resource: 'attendance', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'student', actions: ['read'] },
        { resource: 'teacher', actions: ['read'] },
        { resource: 'report', actions: ['read', 'export'] },
    ],
    admin_jadwal: [
        { resource: 'schedule', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'student', actions: ['read'] },
        { resource: 'teacher', actions: ['read'] },
    ],
    admin_aplikasi: [
        { resource: 'announcement', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'achievement', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'notification', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'student', actions: ['read'] },
    ],
};

/**
 * Check if a user has permission to perform an action on a resource
 */
export function hasPermission(
    user: User | null,
    resource: PermissionResource,
    action: PermissionAction
): boolean {
    if (!user) return false;

    const permissions = ROLE_PERMISSIONS[user.role];
    if (!permissions) return false;

    const resourcePermission = permissions.find((p) => p.resource === resource);
    if (!resourcePermission) return false;

    return resourcePermission.actions.includes(action);
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: AdminRole): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if user can access a route
 */
export function canAccessRoute(user: User | null, pathname: string): boolean {
    if (!user) return false;

    // Super admin can access everything
    if (user.role === 'super_admin') return true;

    // Route to role mapping
    const routeRoles: Record<string, AdminRole[]> = {
        '/perpustakaan': ['admin_perpustakaan'],
        '/keuangan': ['admin_keuangan'],
        '/absensi': ['admin_absensi'],
        '/jadwal': ['admin_jadwal'],
        '/aplikasi': ['admin_aplikasi'],
        '/super-admin': ['super_admin'],
    };

    // Check route access
    for (const [route, roles] of Object.entries(routeRoles)) {
        if (pathname.startsWith(route)) {
            return roles.includes(user.role);
        }
    }

    // Common routes accessible by all roles
    const commonRoutes = ['/profil', '/notifikasi', '/siswa'];
    if (commonRoutes.some((route) => pathname.startsWith(route))) {
        return true;
    }

    return false;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: AdminRole): string {
    const names: Record<AdminRole, string> = {
        super_admin: 'Super Admin',
        admin_perpustakaan: 'Admin Perpustakaan',
        admin_keuangan: 'Admin Keuangan',
        admin_absensi: 'Admin Absensi',
        admin_jadwal: 'Admin Jadwal',
        admin_aplikasi: 'Admin Aplikasi',
    };
    return names[role] || role;
}

/**
 * Get role color
 */
export function getRoleColor(role: AdminRole): string {
    const colors: Record<AdminRole, string> = {
        super_admin: '#8B5CF6',
        admin_perpustakaan: '#10B981',
        admin_keuangan: '#F59E0B',
        admin_absensi: '#3B82F6',
        admin_jadwal: '#EC4899',
        admin_aplikasi: '#6366F1',
    };
    return colors[role] || '#6B7280';
}

/**
 * Get the default dashboard route for a role
 */
export function getDefaultRoute(role: AdminRole): string {
    const routes: Record<AdminRole, string> = {
        super_admin: '/super-admin',
        admin_perpustakaan: '/perpustakaan',
        admin_keuangan: '/keuangan',
        admin_absensi: '/absensi',
        admin_jadwal: '/jadwal',
        admin_aplikasi: '/aplikasi',
    };
    return routes[role] || '/';
}
