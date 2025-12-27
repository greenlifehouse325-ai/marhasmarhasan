'use client';

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import RightPanel from './RightPanel';

interface MainLayoutProps {
    children: ReactNode;
    activeNav?: string;
    onNavClick?: (id: string) => void;
    adminName?: string;
    showRightPanel?: boolean;
}

export default function MainLayout({
    children,
    activeNav = 'dashboard',
    onNavClick,
    adminName,
    showRightPanel = true,
}: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Left Sidebar */}
            <Sidebar activeItem={activeNav} onNavClick={onNavClick} />

            {/* Main Content Area */}
            <div className="ml-[260px] flex">
                {/* Center Content */}
                <main className={`flex-1 ${showRightPanel ? 'max-w-[calc(100%-280px)]' : ''}`}>
                    <TopHeader adminName={adminName} />
                    <div className="px-6 pb-8">
                        {children}
                    </div>
                </main>

                {/* Right Panel */}
                {showRightPanel && <RightPanel />}
            </div>
        </div>
    );
}
