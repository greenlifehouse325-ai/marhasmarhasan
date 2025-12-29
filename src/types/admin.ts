/**
 * Admin Types & Interfaces
 * SMK Marhas Admin Dashboard
 */

import { AdminRole, Permission, User } from './auth';

// ============================================
// ADMIN MANAGEMENT
// ============================================

export interface Admin extends User {
    role: AdminRole;
    permissions: Permission[];
    department?: string;
    assignedBy: string;
    assignedAt: Date;
    lastActivity?: Date;
    activityCount: number;
}

export interface AdminCreateRequest {
    email: string;
    name: string;
    password: string;
    role: AdminRole;
    permissions?: Permission[];
    phone?: string;
}

export interface AdminUpdateRequest {
    name?: string;
    email?: string;
    phone?: string;
    role?: AdminRole;
    permissions?: Permission[];
    isActive?: boolean;
}

// ============================================
// ADMIN ACTIVITY
// ============================================

export interface AdminActivity {
    id: string;
    adminId: string;
    adminName: string;
    adminRole: AdminRole;
    action: string;
    resource: string;
    resourceId?: string;
    description: string;
    timestamp: Date;
    ipAddress: string;
    deviceInfo: string;
    metadata?: Record<string, unknown>;
}

// ============================================
// ADMIN BAN
// ============================================

export interface AdminBanRequest {
    adminId: string;
    reason: string;
    duration: 'permanent' | '1_day' | '7_days' | '30_days' | 'custom';
    customDays?: number;
}

export interface AdminBanResponse {
    success: boolean;
    bannedUntil?: Date;
    error?: string;
}

// ============================================
// ROLE CONFIGURATION
// ============================================

export interface RoleConfig {
    role: AdminRole;
    displayName: string;
    displayNameId: string; // Indonesian
    description: string;
    color: string;
    bgColor: string;
    icon: string;
    basePath: string;
    defaultPermissions: Permission[];
}

export const ROLE_CONFIGS: Record<AdminRole, RoleConfig> = {
    super_admin: {
        role: 'super_admin',
        displayName: 'Super Admin',
        displayNameId: 'Super Admin',
        description: 'Full system access and control',
        color: '#7C3AED',
        bgColor: '#F3E8FF',
        icon: 'Shield',
        basePath: '/super-admin',
        defaultPermissions: [
            { resource: 'admin', actions: ['create', 'read', 'update', 'delete', 'ban'] },
            { resource: 'user', actions: ['create', 'read', 'update', 'delete', 'ban'] },
            { resource: 'audit_log', actions: ['read', 'export'] },
            { resource: 'system', actions: ['read', 'update'] },
        ],
    },
    admin_perpustakaan: {
        role: 'admin_perpustakaan',
        displayName: 'Library Admin',
        displayNameId: 'Admin Perpustakaan',
        description: 'Manage books, lending, and library content',
        color: '#10B981',
        bgColor: '#D1FAE5',
        icon: 'BookOpen',
        basePath: '/perpustakaan',
        defaultPermissions: [
            { resource: 'book', actions: ['create', 'read', 'update', 'delete', 'export'] },
            { resource: 'lending', actions: ['create', 'read', 'update', 'export'] },
            { resource: 'fine', actions: ['create', 'read', 'update', 'export'] },
            { resource: 'student', actions: ['read'] },
            { resource: 'report', actions: ['read', 'export'] },
        ],
    },
    admin_keuangan: {
        role: 'admin_keuangan',
        displayName: 'Finance Admin',
        displayNameId: 'Admin Keuangan',
        description: 'Manage payments, fees, and financial records',
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        icon: 'Wallet',
        basePath: '/keuangan',
        defaultPermissions: [
            { resource: 'payment', actions: ['create', 'read', 'update', 'export', 'approve'] },
            { resource: 'fine', actions: ['read', 'update'] },
            { resource: 'student', actions: ['read'] },
            { resource: 'notification', actions: ['create'] },
            { resource: 'report', actions: ['read', 'export'] },
        ],
    },
    admin_absensi: {
        role: 'admin_absensi',
        displayName: 'Attendance Admin',
        displayNameId: 'Admin Absensi',
        description: 'Manage attendance sessions and records',
        color: '#3B82F6',
        bgColor: '#DBEAFE',
        icon: 'ClipboardCheck',
        basePath: '/absensi',
        defaultPermissions: [
            { resource: 'attendance', actions: ['create', 'read', 'update', 'export'] },
            { resource: 'student', actions: ['read'] },
            { resource: 'teacher', actions: ['read'] },
            { resource: 'notification', actions: ['create'] },
            { resource: 'report', actions: ['read', 'export'] },
        ],
    },
    admin_jadwal: {
        role: 'admin_jadwal',
        displayName: 'Schedule Admin',
        displayNameId: 'Admin Jadwal',
        description: 'Manage class and teacher schedules',
        color: '#EC4899',
        bgColor: '#FCE7F3',
        icon: 'Calendar',
        basePath: '/jadwal',
        defaultPermissions: [
            { resource: 'schedule', actions: ['create', 'read', 'update', 'delete', 'export'] },
            { resource: 'teacher', actions: ['read'] },
            { resource: 'notification', actions: ['create'] },
            { resource: 'report', actions: ['read', 'export'] },
        ],
    },
    admin_aplikasi: {
        role: 'admin_aplikasi',
        displayName: 'App Admin',
        displayNameId: 'Admin Aplikasi',
        description: 'Manage app content and user moderation',
        color: '#6366F1',
        bgColor: '#E0E7FF',
        icon: 'Smartphone',
        basePath: '/aplikasi',
        defaultPermissions: [
            { resource: 'announcement', actions: ['create', 'read', 'update', 'delete'] },
            { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
            { resource: 'achievement', actions: ['create', 'read', 'update', 'delete'] },
            { resource: 'notification', actions: ['create', 'read'] },
            { resource: 'user', actions: ['read', 'ban'] },
            { resource: 'report', actions: ['read', 'export'] },
        ],
    },
};

// ============================================
// ADMIN STATS
// ============================================

export interface AdminStats {
    totalAdmins: number;
    activeAdmins: number;
    bannedAdmins: number;
    byRole: Record<AdminRole, number>;
    recentActivity: AdminActivity[];
}
