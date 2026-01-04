/**
 * Route Guard Component
 * SMK Marhas Admin Dashboard
 * 
 * Wrapper component untuk proteksi route berdasarkan autentikasi dan role
 * Frontend-Only Security Layer
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
    validateRouteAccess,
    isPublicRoute,
    getRoleDashboardPath
} from '@/lib/routeAccessMap';
import {
    validateSession,
    clearSession
} from '@/lib/sessionUtils';
import type { AdminRole } from '@/types/auth';
import ForbiddenPage from './ForbiddenPage';

// ============================================
// TYPES
// ============================================

interface RouteGuardProps {
    children: React.ReactNode;
    allowedRoles?: AdminRole[];
    requireAuth?: boolean;
}

type GuardState =
    | 'checking'
    | 'authenticated'
    | 'unauthenticated'
    | 'forbidden'
    | 'session_invalid';

// ============================================
// COMPONENT
// ============================================

export default function RouteGuard({
    children,
    allowedRoles,
    requireAuth = true
}: RouteGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    const [guardState, setGuardState] = useState<GuardState>('checking');
    const [isValidating, setIsValidating] = useState(true);

    /**
     * Handle force logout karena session invalid
     */
    const handleForceLogout = useCallback(async () => {
        clearSession();
        await logout();

        // Block browser back navigation
        window.history.replaceState(null, '', '/login');

        // Force redirect
        window.location.replace('/login');
    }, [logout]);

    /**
     * Validate session dan route access
     */
    const performValidation = useCallback(async () => {
        // Skip validation untuk public routes
        if (isPublicRoute(pathname)) {
            setGuardState('authenticated');
            setIsValidating(false);
            return;
        }

        // Wait for auth context to finish loading
        if (isLoading) {
            return;
        }

        // Validate session integrity
        const sessionValidation = validateSession();

        if (!sessionValidation.isValid) {
            if (sessionValidation.reason === 'tampered') {
                console.warn('[RouteGuard] Session tampering detected! Forcing logout.');
                setGuardState('session_invalid');
                await handleForceLogout();
                return;
            }

            if (sessionValidation.reason === 'expired') {
                console.warn('[RouteGuard] Session expired. Redirecting to login.');
                setGuardState('unauthenticated');
                router.replace('/login');
                return;
            }

            // Not authenticated
            if (!isAuthenticated) {
                setGuardState('unauthenticated');
                router.replace('/login');
                return;
            }
        }

        // Check authentication requirement
        if (requireAuth && !isAuthenticated) {
            setGuardState('unauthenticated');
            router.replace('/login');
            return;
        }

        // Get user role
        const role = user?.role || null;

        // Validate route access
        const routeValidation = validateRouteAccess(pathname, isAuthenticated, role);

        if (!routeValidation.allowed) {
            if (routeValidation.reason === 'unauthenticated') {
                setGuardState('unauthenticated');
                router.replace('/login');
                return;
            }

            if (routeValidation.reason === 'forbidden') {
                setGuardState('forbidden');
                setIsValidating(false);
                return;
            }
        }

        // Additional check: if specific roles are required
        if (allowedRoles && allowedRoles.length > 0 && role) {
            if (!allowedRoles.includes(role) && role !== 'super_admin') {
                setGuardState('forbidden');
                setIsValidating(false);
                return;
            }
        }

        // All checks passed
        setGuardState('authenticated');
        setIsValidating(false);
    }, [
        pathname,
        isLoading,
        isAuthenticated,
        user,
        requireAuth,
        allowedRoles,
        router,
        handleForceLogout
    ]);

    // Run validation on mount and when dependencies change
    useEffect(() => {
        setIsValidating(true);
        setGuardState('checking');
        performValidation();
    }, [performValidation]);

    // Re-validate on focus (tab switch back)
    useEffect(() => {
        const handleFocus = () => {
            performValidation();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [performValidation]);

    // Periodic session check (every 60 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            const sessionValidation = validateSession();
            if (!sessionValidation.isValid && sessionValidation.reason === 'expired') {
                handleForceLogout();
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [handleForceLogout]);

    // ============================================
    // RENDER STATES
    // ============================================

    // Loading/Checking state
    if (isLoading || isValidating || guardState === 'checking') {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <Loader2
                            size={24}
                            className="absolute -bottom-1 -right-1 text-blue-600 animate-spin"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 font-medium">Memverifikasi akses...</p>
                        <p className="text-gray-400 text-sm">Mohon tunggu sebentar</p>
                    </div>
                </div>
            </div>
        );
    }

    // Unauthenticated - should have redirected, but show nothing just in case
    if (guardState === 'unauthenticated' || guardState === 'session_invalid') {
        return null;
    }

    // Forbidden - show 403 page
    if (guardState === 'forbidden') {
        return <ForbiddenPage attemptedPath={pathname} />;
    }

    // Authenticated and authorized - render children
    return <>{children}</>;
}

// ============================================
// EXPORTS
// ============================================

export { RouteGuard };
