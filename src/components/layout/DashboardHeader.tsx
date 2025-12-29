/**
 * Dashboard Header
 * SMK Marhas Admin Dashboard
 * 
 * Header untuk dashboard dengan info user, notifikasi, dan search
 */

'use client';

import React, { useState } from 'react';
import {
    Search,
    Bell,
    Sun,
    Moon,
    Menu,
    ChevronDown,
    User as UserIcon,
    Settings,
    LogOut,
    Shield
} from 'lucide-react';
import type { User } from '@/types/auth';
import type { RoleConfig } from '@/types/admin';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
    user: User;
    roleConfig: RoleConfig;
    onMenuClick: () => void;
}

export default function DashboardHeader({ user, roleConfig, onMenuClick }: DashboardHeaderProps) {
    const router = useRouter();
    const { logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
                {/* Left: Mobile menu + Greeting */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <Menu size={20} className="text-gray-600" />
                    </button>

                    {/* Greeting */}
                    <div className="hidden sm:block">
                        <p className="text-sm text-gray-500">{getGreeting()},</p>
                        <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            {user.name}
                            {user.role === 'super_admin' && (
                                <Shield size={16} className="text-purple-500" />
                            )}
                        </h1>
                    </div>
                </div>

                {/* Center: Search (Desktop) */}
                <div className="hidden md:block flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari siswa, guru, data..."
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/10 focus:border-[#1E4D8C]/30 transition-all"
                        />
                        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:inline-flex px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Mobile Search */}
                    <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Search size={18} className="text-gray-600" />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        {isDarkMode ? (
                            <Sun size={18} className="text-amber-500" />
                        ) : (
                            <Moon size={18} className="text-gray-600" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Bell size={18} className="text-gray-600" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-medium text-sm"
                                style={{
                                    background: `linear-gradient(135deg, ${roleConfig.color} 0%, ${roleConfig.color}CC 100%)`
                                }}
                            >
                                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                        </button>

                        {/* Dropdown Menu */}
                        {showUserMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowUserMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                        <span
                                            className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full"
                                            style={{
                                                backgroundColor: roleConfig.bgColor,
                                                color: roleConfig.color
                                            }}
                                        >
                                            {roleConfig.displayNameId}
                                        </span>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                            <UserIcon size={16} />
                                            <span>Profil Saya</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                            <Settings size={16} />
                                            <span>Pengaturan</span>
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className="pt-2 border-t border-gray-100">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            <span>Keluar</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
