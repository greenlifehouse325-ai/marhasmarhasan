/**
 * Authentication Types & Interfaces
 * SMK Marhas Admin Dashboard
 */

// ============================================
// ROLE TYPES
// ============================================

export type AdminRole =
    | 'super_admin'
    | 'admin_perpustakaan'
    | 'admin_keuangan'
    | 'admin_absensi'
    | 'admin_jadwal'
    | 'admin_aplikasi';

export type UserRole = 'student' | 'teacher' | 'parent';

export type AllRoles = AdminRole | UserRole;

// ============================================
// USER TYPES
// ============================================

export interface User {
    id: string;
    email: string;
    name: string;
    role: AdminRole;
    avatar?: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    isActive: boolean;
    isBanned: boolean;
    bannedUntil?: Date;
    bannedReason?: string;
}

export interface AdminUser extends User {
    role: AdminRole;
    permissions: Permission[];
    assignedBy?: string; // Super admin who assigned this role
    assignedAt?: Date;
}

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface LoginCredentials {
    email: string;
    password: string;
    rememberDevice?: boolean;
}

export interface LoginResponse {
    success: boolean;
    user?: User;
    token?: string;
    requiresOTP?: boolean;
    requiresDeviceApproval?: boolean;
    error?: string;
}

export interface OTPVerification {
    email: string;
    code: string;
    deviceFingerprint: string;
}

export interface OTPResponse {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}

// ============================================
// DEVICE TYPES
// ============================================

export interface DeviceInfo {
    id: string;
    fingerprint: string;
    name: string;
    browser: string;
    os: string;
    ipAddress: string;
    location?: string;
    lastUsed: Date;
    isWhitelisted: boolean;
    createdAt: Date;
}

export interface DeviceApprovalRequest {
    deviceInfo: DeviceInfo;
    requestedAt: Date;
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: string;
    approvedAt?: Date;
}

// ============================================
// SESSION TYPES
// ============================================

export interface Session {
    id: string;
    userId: string;
    token: string;
    deviceInfo: DeviceInfo;
    createdAt: Date;
    expiresAt: Date;
    isActive: boolean;
}

// ============================================
// SECURITY TYPES
// ============================================

export interface LoginAttempt {
    id: string;
    email: string;
    success: boolean;
    ipAddress: string;
    deviceFingerprint: string;
    timestamp: Date;
    failureReason?: string;
}

export interface SecurityAlert {
    id: string;
    type: 'failed_login' | 'new_device' | 'password_change' | 'suspicious_activity' | 'lockdown';
    userId?: string;
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: Date;
    isRead: boolean;
    metadata?: Record<string, unknown>;
}

export interface PasswordChangeRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface PasswordValidation {
    isValid: boolean;
    minLength: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    strength: 'weak' | 'medium' | 'strong' | 'very_strong';
}

// ============================================
// PERMISSION TYPES
// ============================================

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'export' | 'approve' | 'ban';

export type PermissionResource =
    | 'admin'
    | 'user'
    | 'student'
    | 'teacher'
    | 'parent'
    | 'book'
    | 'lending'
    | 'fine'
    | 'payment'
    | 'attendance'
    | 'schedule'
    | 'announcement'
    | 'news'
    | 'achievement'
    | 'notification'
    | 'report'
    | 'audit_log'
    | 'system';

export interface Permission {
    resource: PermissionResource;
    actions: PermissionAction[];
}

// ============================================
// AUTH CONTEXT TYPES
// ============================================

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<LoginResponse>;
    logout: () => Promise<void>;
    verifyOTP: (verification: OTPVerification) => Promise<OTPResponse>;
    refreshSession: () => Promise<void>;
    checkPermission: (resource: PermissionResource, action: PermissionAction) => boolean;
    updateUser: (updates: Partial<User>) => void;
}

// ============================================
// BACKUP CODES
// ============================================

export interface BackupCode {
    code: string;
    isUsed: boolean;
    usedAt?: Date;
}

export interface BackupCodesResponse {
    codes: BackupCode[];
    generatedAt: Date;
}

// ============================================
// LOCKDOWN TYPES
// ============================================

export interface EmergencyLockdown {
    isActive: boolean;
    activatedBy: string;
    activatedAt: Date;
    reason: string;
    expiresAt?: Date;
}
