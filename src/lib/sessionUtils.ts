/**
 * Session Utilities
 * SMK Marhas Admin Dashboard
 * 
 * Utility untuk session management dengan encoding dan validasi
 * Frontend-Only Security Layer
 */

import type { User, AdminRole } from '@/types/auth';

// ============================================
// KONSTANTA
// ============================================

const SESSION_KEY = 'marhas_admin_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 jam dalam milliseconds
const OBFUSCATION_KEY = 'MARHAS_SECURE_2024'; // Simple obfuscation key

// ============================================
// TYPES
// ============================================

export interface SessionData {
    user: User;
    loginTimestamp: number;
    sessionExpiry: number;
    checksum: string;
    fingerprint: string;
}

export interface SessionValidationResult {
    isValid: boolean;
    reason?: 'expired' | 'tampered' | 'missing' | 'invalid_format';
    session?: SessionData;
}

// ============================================
// ENCODING/DECODING FUNCTIONS
// ============================================

/**
 * XOR obfuscation dengan key
 */
function xorObfuscate(str: string, key: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(
            str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return result;
}

/**
 * Encode session data ke string yang obfuscated
 */
export function encodeSession(data: SessionData): string {
    try {
        const jsonStr = JSON.stringify(data);
        const obfuscated = xorObfuscate(jsonStr, OBFUSCATION_KEY);
        // Base64 encode untuk safe storage
        return btoa(unescape(encodeURIComponent(obfuscated)));
    } catch {
        console.error('[SessionUtils] Failed to encode session');
        return '';
    }
}

/**
 * Decode session string ke SessionData
 */
export function decodeSession(encoded: string): SessionData | null {
    try {
        const obfuscated = decodeURIComponent(escape(atob(encoded)));
        const jsonStr = xorObfuscate(obfuscated, OBFUSCATION_KEY);
        const data = JSON.parse(jsonStr);

        // Validate structure
        if (!data.user || !data.loginTimestamp || !data.sessionExpiry || !data.checksum) {
            return null;
        }

        // Restore Date objects
        if (data.user.createdAt) data.user.createdAt = new Date(data.user.createdAt);
        if (data.user.updatedAt) data.user.updatedAt = new Date(data.user.updatedAt);
        if (data.user.lastLoginAt) data.user.lastLoginAt = new Date(data.user.lastLoginAt);

        return data as SessionData;
    } catch {
        console.error('[SessionUtils] Failed to decode session');
        return null;
    }
}

// ============================================
// CHECKSUM FUNCTIONS
// ============================================

/**
 * Generate simple hash checksum dari user data
 */
export function generateChecksum(user: User): string {
    const data = `${user.id}|${user.email}|${user.role}|${OBFUSCATION_KEY}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).toUpperCase();
}

/**
 * Validate checksum dari session
 */
export function validateChecksum(session: SessionData): boolean {
    const expectedChecksum = generateChecksum(session.user);
    return session.checksum === expectedChecksum;
}

// ============================================
// FINGERPRINT FUNCTIONS
// ============================================

/**
 * Generate browser fingerprint
 */
export function generateFingerprint(): string {
    const components = [
        navigator.userAgent,
        navigator.language,
        screen.width.toString(),
        screen.height.toString(),
        screen.colorDepth.toString(),
        new Date().getTimezoneOffset().toString(),
        navigator.hardwareConcurrency?.toString() || 'unknown',
    ];

    const data = components.join('|');
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).toUpperCase();
}

/**
 * Validate fingerprint dari session
 */
export function validateFingerprint(session: SessionData): boolean {
    const currentFingerprint = generateFingerprint();
    return session.fingerprint === currentFingerprint;
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Save session ke storage
 */
export function saveSession(user: User): void {
    const now = Date.now();
    const sessionData: SessionData = {
        user: {
            ...user,
            lastLoginAt: new Date(),
        },
        loginTimestamp: now,
        sessionExpiry: now + SESSION_DURATION,
        checksum: generateChecksum(user),
        fingerprint: generateFingerprint(),
    };

    const encoded = encodeSession(sessionData);
    if (encoded) {
        sessionStorage.setItem(SESSION_KEY, encoded);
    }
}

/**
 * Load session dari storage
 */
export function loadSession(): SessionData | null {
    try {
        const encoded = sessionStorage.getItem(SESSION_KEY);
        if (!encoded) return null;

        return decodeSession(encoded);
    } catch {
        return null;
    }
}

/**
 * Validate full session
 */
export function validateSession(): SessionValidationResult {
    const encoded = sessionStorage.getItem(SESSION_KEY);

    if (!encoded) {
        return { isValid: false, reason: 'missing' };
    }

    const session = decodeSession(encoded);

    if (!session) {
        return { isValid: false, reason: 'invalid_format' };
    }

    // Check expiry
    if (Date.now() > session.sessionExpiry) {
        clearSession();
        return { isValid: false, reason: 'expired' };
    }

    // Validate checksum
    if (!validateChecksum(session)) {
        clearSession();
        return { isValid: false, reason: 'tampered' };
    }

    // Optional: Validate fingerprint (dapat di-disable jika terlalu strict)
    // if (!validateFingerprint(session)) {
    //     clearSession();
    //     return { isValid: false, reason: 'tampered' };
    // }

    return { isValid: true, session };
}

/**
 * Clear session dari storage
 */
export function clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
    // Also clear any legacy localStorage
    localStorage.removeItem('marhas_admin_user');
}

/**
 * Get remaining session time in milliseconds
 */
export function getSessionTimeRemaining(): number {
    const session = loadSession();
    if (!session) return 0;

    const remaining = session.sessionExpiry - Date.now();
    return Math.max(0, remaining);
}

/**
 * Check if session is about to expire (within 30 minutes)
 */
export function isSessionAboutToExpire(): boolean {
    const remaining = getSessionTimeRemaining();
    return remaining > 0 && remaining < 30 * 60 * 1000; // 30 menit
}

/**
 * Extend session expiry
 */
export function extendSession(): void {
    const session = loadSession();
    if (!session) return;

    session.sessionExpiry = Date.now() + SESSION_DURATION;
    const encoded = encodeSession(session);
    if (encoded) {
        sessionStorage.setItem(SESSION_KEY, encoded);
    }
}

// ============================================
// ROLE UTILITIES
// ============================================

/**
 * Get current user role from session
 */
export function getCurrentRole(): AdminRole | null {
    const session = loadSession();
    return session?.user?.role || null;
}

/**
 * Check if current user has specific role
 */
export function hasRole(role: AdminRole): boolean {
    const currentRole = getCurrentRole();
    return currentRole === role;
}

/**
 * Check if current user is super admin
 */
export function isSuperAdmin(): boolean {
    return hasRole('super_admin');
}
