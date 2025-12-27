'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';

interface TopHeaderProps {
    adminName?: string;
}

export default function TopHeader({ adminName = 'Admin Rizky' }: TopHeaderProps) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning,';
        if (hour < 17) return 'Good Afternoon,';
        return 'Good Evening,';
    };

    return (
        <header className="sticky top-0 z-40 bg-[var(--background)] py-4 px-6 flex items-center justify-between">
            {/* Left: Greeting */}
            <div className="flex flex-col">
                <span className="text-[var(--text-grey)] text-sm">{getGreeting()}</span>
                <h1 className="text-xl font-semibold text-[var(--text-dark)]">
                    {adminName} <span className="ml-1">👋</span>
                </h1>
            </div>

            {/* Right: Search, Notification, Avatar */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)]"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-[220px] h-10 pl-10 pr-4 rounded-full bg-white border border-gray-100 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-grey)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20 focus:border-[var(--primary-blue)]/30 transition-all"
                    />
                </div>

                {/* Notification Bell */}
                <button className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <Bell size={20} className="text-[var(--text-grey)]" />
                    {/* Red Dot */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Admin Avatar */}
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow">
                    AR
                </button>
            </div>
        </header>
    );
}
