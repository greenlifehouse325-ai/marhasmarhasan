'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { Menu } from 'lucide-react';

// Lazy load RightPanel for performance
const RightPanel = dynamic(() => import('./RightPanel'), {
    loading: () => <div className="w-[320px] h-full bg-white/50 animate-pulse rounded-2xl" />,
    ssr: false
});

interface MainLayoutProps {
    children: React.ReactNode;
    activeNav?: string;
    onNavClick?: (id: string) => void;
    adminName?: string;
    showRightPanel?: boolean;
}

// Loading skeleton component
function ContentSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
                ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
    );
}

export default function MainLayout({
    children,
    activeNav = 'dashboard',
    onNavClick,
    adminName = 'Admin Rizky',
    showRightPanel = false,
}: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            {/* Sidebar */}
            <Sidebar
                activeItem={activeNav}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className={`
                transition-all duration-300
                lg:ml-[260px]
                ${showRightPanel ? 'lg:mr-[340px]' : ''}
            `}>
                {/* Mobile Header */}
                <div className="sticky top-0 z-30 lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-100">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Menu size={20} className="text-gray-600" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="font-semibold text-gray-800">Marhas</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                            AR
                        </div>
                    </div>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block sticky top-0 z-30">
                    <TopHeader adminName={adminName} />
                </div>

                {/* Page Content */}
                <main className="p-4 md:p-6 lg:p-8">
                    <Suspense fallback={<ContentSkeleton />}>
                        {children}
                    </Suspense>
                </main>
            </div>

            {/* Right Panel - Desktop only */}
            {showRightPanel && (
                <div className="hidden lg:block fixed right-0 top-0 h-screen w-[320px] p-4 z-40">
                    <RightPanel />
                </div>
            )}
        </div>
    );
}
