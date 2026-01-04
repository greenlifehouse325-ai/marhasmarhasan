/**
 * Route Access Map
 * SMK Marhas Admin Dashboard
 * 
 * Konfigurasi terpusat untuk mapping role ke route
 * Frontend-Only Security Layer
 */

import type { AdminRole } from '@/types/auth';

// ============================================
// ROUTE ACCESS MAP
// ============================================

/**
 * Mapping route prefix ke role yang diizinkan
 * Super admin ALWAYS mendapat akses ke semua route
 */
export const ROUTE_ACCESS_MAP: Record<string, AdminRole[]> = {
    // Super Admin exclusive routes
    '/super-admin': ['super_admin'],

    // Role-specific routes
    '/perpustakaan': ['super_admin', 'admin_perpustakaan'],
    '/keuangan': ['super_admin', 'admin_keuangan'],
    '/absensi': ['super_admin', 'admin_absensi'],
    '/jadwal': ['super_admin', 'admin_jadwal'],
    '/aplikasi': ['super_admin', 'admin_aplikasi'],

    // Data master - super admin only
    '/data-master': ['super_admin'],

    // Shared routes - accessible by multiple roles
    '/siswa': [
        'super_admin',
        'admin_absensi',
        'admin_keuangan',
        'admin_perpustakaan',
    ],
    '/guru': [
        'super_admin',
        'admin_jadwal',
        'admin_absensi',
    ],
    '/kelas': [
        'super_admin',
        'admin_jadwal',
        'admin_absensi',
    ],
    '/orangtua': [
        'super_admin',
        'admin_keuangan',
        'admin_aplikasi',
    ],
    '/rapor': [
        'super_admin',
        'admin_absensi',
    ],

    // Common routes - semua role bisa akses
    '/profil': [
        'super_admin',
        'admin_perpustakaan',
        'admin_keuangan',
        'admin_absensi',
        'admin_jadwal',
        'admin_aplikasi',
    ],
    '/pengaturan': [
        'super_admin',
        'admin_perpustakaan',
        'admin_keuangan',
        'admin_absensi',
        'admin_jadwal',
        'admin_aplikasi',
    ],
    '/notifikasi': [
        'super_admin',
        'admin_perpustakaan',
        'admin_keuangan',
        'admin_absensi',
        'admin_jadwal',
        'admin_aplikasi',
    ],
};

// ============================================
// PUBLIC ROUTES
// ============================================

/**
 * Routes yang tidak memerlukan autentikasi
 */
export const PUBLIC_ROUTES: string[] = [
    '/login',
    '/verify-otp',
    '/forgot-password',
    '/reset-password',
    '/students',
    '/teachers',
    '/parents',
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check apakah route adalah public (tidak perlu auth)
 */
export function isPublicRoute(pathname: string): boolean {
    return PUBLIC_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
}

/**
 * Get allowed roles untuk suatu route
 */
export function getRouteAllowedRoles(pathname: string): AdminRole[] | null {
    // Check exact match first
    if (ROUTE_ACCESS_MAP[pathname]) {
        return ROUTE_ACCESS_MAP[pathname];
    }

    // Check prefix match
    for (const [routePrefix, roles] of Object.entries(ROUTE_ACCESS_MAP)) {
        if (pathname.startsWith(routePrefix)) {
            return roles;
        }
    }

    // Route not in map - return null (will need special handling)
    return null;
}

/**
 * Check apakah role dapat mengakses route
 */
export function canRoleAccessRoute(role: AdminRole, pathname: string): boolean {
    // Super admin can access everything
    if (role === 'super_admin') {
        return true;
    }

    const allowedRoles = getRouteAllowedRoles(pathname);

    // If route not in map, check if it's a common dashboard route
    if (allowedRoles === null) {
        // Unknown routes - default deny for non-super-admin
        return false;
    }

    return allowedRoles.includes(role);
}

/**
 * Get base dashboard path untuk role
 */
export function getRoleDashboardPath(role: AdminRole): string {
    const dashboardPaths: Record<AdminRole, string> = {
        super_admin: '/super-admin',
        admin_perpustakaan: '/perpustakaan',
        admin_keuangan: '/keuangan',
        admin_absensi: '/absensi',
        admin_jadwal: '/jadwal',
        admin_aplikasi: '/aplikasi',
    };

    return dashboardPaths[role] || '/';
}

/**
 * Get redirect path setelah login berdasarkan role
 */
export function getLoginRedirectPath(role: AdminRole): string {
    return getRoleDashboardPath(role);
}

/**
 * Check apakah user sedang di route yang sesuai dengan role-nya
 */
export function isInRoleNamespace(role: AdminRole, pathname: string): boolean {
    const basePath = getRoleDashboardPath(role);
    return pathname.startsWith(basePath);
}

/**
 * Validate route access dan return redirect info jika diperlukan
 */
export interface RouteValidationResult {
    allowed: boolean;
    redirectTo?: string;
    reason?: 'unauthenticated' | 'forbidden' | 'invalid_role';
}

export function validateRouteAccess(
    pathname: string,
    isAuthenticated: boolean,
    role: AdminRole | null
): RouteValidationResult {
    // Public route - always allowed
    if (isPublicRoute(pathname)) {
        return { allowed: true };
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated || !role) {
        return {
            allowed: false,
            redirectTo: '/login',
            reason: 'unauthenticated',
        };
    }

    // Check role access
    if (!canRoleAccessRoute(role, pathname)) {
        return {
            allowed: false,
            reason: 'forbidden',
        };
    }

    return { allowed: true };
}
