/**
 * Dashboard Layout
 * SMK Marhas Admin Dashboard
 * 
 * Layout wrapper untuk semua halaman dashboard dengan sidebar dinamis berdasarkan role
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIGS } from '@/types/admin';
import { Loader2 } from 'lucide-react';
import RoleSidebar from '../../components/layout/RoleSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="text-[#1E4D8C] animate-spin" />
                    <p className="text-gray-500">Memuat...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (!isAuthenticated || !user) {
        return null;
    }

    const roleConfig = ROLE_CONFIGS[user.role];

    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            {/* Sidebar */}
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
                    {children}
                </main>
            </div>
        </div>
    );
}
