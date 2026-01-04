/**
 * Dashboard Layout
 * SMK Marhas Admin Dashboard
 * 
 * Layout wrapper untuk semua halaman dashboard dengan:
 * - RouteGuard untuk proteksi role-based access
 * - Sidebar dinamis berdasarkan role
 * - Header dengan info user
 * - ModuleSwitcher untuk Super Admin (unified navigation)
 * - ModuleBreadcrumb untuk konteks modul
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIGS } from '@/types/admin';
import { Loader2, Shield } from 'lucide-react';
import RoleSidebar from '../../components/layout/RoleSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import ModuleSwitcher from '../../components/layout/ModuleSwitcher';
import ModuleBreadcrumb from '../../components/layout/ModuleBreadcrumb';
import { RouteGuard } from '@/components/security';
import { getRouteAllowedRoles } from '@/lib/routeAccessMap';
import { getModuleFromPath, isSuperAdminInOtherModule } from '@/lib/moduleUtils';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Get allowed roles untuk current path
    const allowedRoles = getRouteAllowedRoles(pathname);

    // Detect if Super Admin is in another module
    const currentModule = getModuleFromPath(pathname);
    const superAdminInOtherModule = user?.role === 'super_admin' &&
        isSuperAdminInOtherModule(user.role, pathname);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    // Loading state dengan security indicator
    if (isLoading) {
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

    // Not authenticated - return null, RouteGuard akan handle redirect
    if (!isAuthenticated || !user) {
        return null;
    }

    const roleConfig = ROLE_CONFIGS[user.role];

    return (
        <RouteGuard
            requireAuth={true}
            allowedRoles={allowedRoles || undefined}
        >
            <div className="min-h-screen bg-[var(--bg-main)]">
                {/* Sidebar - Pass module info for Super Admin */}
                <RoleSidebar
                    role={user.role}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    currentPath={pathname}
                />

                {/* Main Content */}
                <div className="lg:ml-[260px] transition-all duration-300">
                    {/* Header */}
                    <DashboardHeader
                        user={user}
                        roleConfig={roleConfig}
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                    {/* Page Content */}
                    <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)]">
                        {/* Module Breadcrumb for Super Admin in other modules */}
                        {superAdminInOtherModule && <ModuleBreadcrumb />}

                        {children}
                    </main>
                </div>

                {/* Module Switcher - Only for Super Admin */}
                {user.role === 'super_admin' && <ModuleSwitcher />}
            </div>
        </RouteGuard>
    );
}
