/**
 * Auth Context Provider
 * SMK Marhas Admin Dashboard
 * 
 * Frontend-Only Authentication dengan Session Management
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type {
    User,
    AuthState,
    AuthContextType,
    LoginCredentials,
    LoginResponse,
    OTPVerification,
    OTPResponse,
    PermissionResource,
    PermissionAction,
    AdminRole,
} from '@/types/auth';
import { ROLE_CONFIGS } from '@/types/admin';
import {
    saveSession,
    loadSession,
    validateSession,
    clearSession,
} from '@/lib/sessionUtils';

// ============================================
// INITIAL STATE
// ============================================

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

// ============================================
// ACTIONS
// ============================================

type AuthAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: Partial<User> };

// ============================================
// REDUCER
// ============================================

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                isLoading: false,
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };
        default:
            return state;
    }
}

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// MOCK DATA
// ============================================

const MOCK_USERS: Record<string, { password: string; user: User }> = {
    'superadmin@marhas.sch.id': {
        password: 'SuperAdmin123!',
        user: {
            id: 'sa-001',
            email: 'superadmin@marhas.sch.id',
            name: 'Super Admin Marhas',
            role: 'super_admin' as AdminRole,
            avatar: undefined,
            phone: '081234567890',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date(),
            lastLoginAt: new Date(),
            isActive: true,
            isBanned: false,
        },
    },
    'perpus@marhas.sch.id': {
        password: 'Perpus123!',
        user: {
            id: 'adm-perpus-001',
            email: 'perpus@marhas.sch.id',
            name: 'Admin Perpustakaan',
            role: 'admin_perpustakaan' as AdminRole,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date(),
            isActive: true,
            isBanned: false,
        },
    },
    'keuangan@marhas.sch.id': {
        password: 'Keuangan123!',
        user: {
            id: 'adm-keuangan-001',
            email: 'keuangan@marhas.sch.id',
            name: 'Admin Keuangan',
            role: 'admin_keuangan' as AdminRole,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date(),
            isActive: true,
            isBanned: false,
        },
    },
    'absensi@marhas.sch.id': {
        password: 'Absensi123!',
        user: {
            id: 'adm-absensi-001',
            email: 'absensi@marhas.sch.id',
            name: 'Admin Absensi',
            role: 'admin_absensi' as AdminRole,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date(),
            isActive: true,
            isBanned: false,
        },
    },
    'jadwal@marhas.sch.id': {
        password: 'Jadwal123!',
        user: {
            id: 'adm-jadwal-001',
            email: 'jadwal@marhas.sch.id',
            name: 'Admin Jadwal',
            role: 'admin_jadwal' as AdminRole,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date(),
            isActive: true,
            isBanned: false,
        },
    },
    'aplikasi@marhas.sch.id': {
        password: 'Aplikasi123!',
        user: {
            id: 'adm-aplikasi-001',
            email: 'aplikasi@marhas.sch.id',
            name: 'Admin Aplikasi',
            role: 'admin_aplikasi' as AdminRole,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date(),
            isActive: true,
            isBanned: false,
        },
    },
};

// ============================================
// PROVIDER
// ============================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check for existing session on mount
    useEffect(() => {
        const checkExistingSession = async () => {
            try {
                // Validate session dengan encoding dan checksum
                const sessionResult = validateSession();

                if (sessionResult.isValid && sessionResult.session) {
                    dispatch({ type: 'LOGIN_SUCCESS', payload: sessionResult.session.user });
                } else {
                    // Try legacy localStorage (migration)
                    const legacyUser = localStorage.getItem('marhas_admin_user');
                    if (legacyUser) {
                        try {
                            const user = JSON.parse(legacyUser);
                            // Migrate to new session format
                            saveSession(user);
                            // Clear legacy storage
                            localStorage.removeItem('marhas_admin_user');
                            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                        } catch {
                            localStorage.removeItem('marhas_admin_user');
                            dispatch({ type: 'SET_LOADING', payload: false });
                        }
                    } else {
                        dispatch({ type: 'SET_LOADING', payload: false });
                    }
                }
            } catch {
                clearSession();
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
        checkExistingSession();
    }, []);

    // Login function
    const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser = MOCK_USERS[credentials.email.toLowerCase()];

        if (!mockUser) {
            dispatch({ type: 'SET_ERROR', payload: 'Email tidak ditemukan' });
            return { success: false, error: 'Email tidak ditemukan' };
        }

        if (mockUser.password !== credentials.password) {
            dispatch({ type: 'SET_ERROR', payload: 'Password salah' });
            return { success: false, error: 'Password salah' };
        }

        if (mockUser.user.isBanned) {
            dispatch({ type: 'SET_ERROR', payload: 'Akun Anda telah diblokir' });
            return { success: false, error: 'Akun Anda telah diblokir' };
        }

        // For super admin, require OTP
        if (mockUser.user.role === 'super_admin') {
            dispatch({ type: 'SET_LOADING', payload: false });
            return {
                success: true,
                requiresOTP: true,
                user: mockUser.user,
            };
        }

        // Success for regular admin
        const user = { ...mockUser.user, lastLoginAt: new Date() };
        // Save session dengan encoding dan checksum
        saveSession(user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });

        return { success: true, user };
    }, []);

    // Verify OTP
    const verifyOTP = useCallback(async (verification: OTPVerification): Promise<OTPResponse> => {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock OTP verification - accept any 6-digit code for demo
        if (verification.code.length !== 6) {
            dispatch({ type: 'SET_ERROR', payload: 'Kode OTP harus 6 digit' });
            return { success: false, error: 'Kode OTP harus 6 digit' };
        }

        const mockUser = MOCK_USERS[verification.email.toLowerCase()];
        if (mockUser) {
            const user = { ...mockUser.user, lastLoginAt: new Date() };
            // Save session dengan encoding dan checksum
            saveSession(user);
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            return { success: true, user };
        }

        dispatch({ type: 'SET_ERROR', payload: 'Verifikasi gagal' });
        return { success: false, error: 'Verifikasi gagal' };
    }, []);

    // Logout function dengan enhanced security
    const logout = useCallback(async () => {
        // Clear all session data
        clearSession();
        sessionStorage.clear();
        localStorage.removeItem('marhas_admin_user'); // Legacy cleanup

        dispatch({ type: 'LOGOUT' });

        // Block browser back navigation setelah logout
        window.history.replaceState(null, '', '/login');

        // Force redirect ke login
        if (typeof window !== 'undefined') {
            window.location.replace('/login');
        }
    }, []);

    // Refresh session
    const refreshSession = useCallback(async () => {
        const savedUser = localStorage.getItem('marhas_admin_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            dispatch({ type: 'SET_USER', payload: user });
        }
    }, []);

    // Check permission
    const checkPermission = useCallback(
        (resource: PermissionResource, action: PermissionAction): boolean => {
            if (!state.user) return false;

            // Super admin has all permissions
            if (state.user.role === 'super_admin') return true;

            const roleConfig = ROLE_CONFIGS[state.user.role];
            if (!roleConfig) return false;

            const permission = roleConfig.defaultPermissions.find(p => p.resource === resource);
            return permission?.actions.includes(action) ?? false;
        },
        [state.user]
    );

    // Update user
    const updateUser = useCallback((updates: Partial<User>) => {
        dispatch({ type: 'UPDATE_USER', payload: updates });
        const savedUser = localStorage.getItem('marhas_admin_user');
        if (savedUser) {
            const user = { ...JSON.parse(savedUser), ...updates };
            localStorage.setItem('marhas_admin_user', JSON.stringify(user));
        }
    }, []);

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        verifyOTP,
        refreshSession,
        checkPermission,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
