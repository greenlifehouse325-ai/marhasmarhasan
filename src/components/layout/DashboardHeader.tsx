/**
 * Dashboard Header
 * SMK Marhas Admin Dashboard
 * 
 * Header dengan dark mode support, theme toggle, notifikasi, dan user menu
 * With logout confirmation modal
 */

'use client';

import React, { useState } from 'react';
import {
    Search,
    Bell,
    Menu,
    ChevronDown,
    User as UserIcon,
    Settings,
    LogOut,
    Shield
} from 'lucide-react';
import Link from 'next/link';
import type { User } from '@/types/auth';
import type { RoleConfig } from '@/types/admin';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { DoubleConfirmModal } from '@/components/shared';

interface DashboardHeaderProps {
    user: User;
    roleConfig: RoleConfig;
    onMenuClick: () => void;
}

export default function DashboardHeader({ user, roleConfig, onMenuClick }: DashboardHeaderProps) {
    const router = useRouter();
    const { logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        <>
            <header className="sticky top-0 z-30 bg-[var(--bg-header)] backdrop-blur-xl border-b border-[var(--border-light)] transition-colors duration-200">
                <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
                    {/* Left: Mobile menu + Greeting */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] transition-colors"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Greeting */}
                        <div className="hidden sm:block">
                            <p className="text-sm text-[var(--text-muted)]">{getGreeting()},</p>
                            <h1 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
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
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Cari siswa, guru, data..."
                                className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                            />
                            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:inline-flex px-2 py-0.5 text-xs text-[var(--text-muted)] bg-[var(--bg-hover)] rounded border border-[var(--border-light)]">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Mobile Search */}
                        <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] transition-colors">
                            <Search size={18} />
                        </button>

                        {/* Theme Toggle - Using proper component */}
                        <ThemeToggle variant="dropdown" size="md" />

                        {/* Notifications */}
                        <Link
                            href="/notifikasi"
                            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] transition-colors"
                        >
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </Link>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-[var(--bg-hover)] transition-colors"
                            >
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-medium text-sm"
                                    style={{
                                        background: `linear-gradient(135deg, ${roleConfig.color} 0%, ${roleConfig.color}CC 100%)`
                                    }}
                                >
                                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <ChevronDown size={16} className={`text-[var(--text-muted)] hidden sm:block transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--bg-card)] rounded-xl shadow-lg border border-[var(--border-light)] py-2 z-50 animate-fadeIn">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-[var(--border-light)]">
                                            <p className="font-medium text-[var(--text-primary)]">{user.name}</p>
                                            <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
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
                                            <Link
                                                href="/profil"
                                                onClick={() => setShowUserMenu(false)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                                            >
                                                <UserIcon size={16} />
                                                <span>Profil Saya</span>
                                            </Link>
                                            <Link
                                                href="/pengaturan"
                                                onClick={() => setShowUserMenu(false)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                                            >
                                                <Settings size={16} />
                                                <span>Pengaturan</span>
                                            </Link>
                                        </div>

                                        {/* Logout */}
                                        <div className="pt-2 border-t border-[var(--border-light)]">
                                            <button
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    setShowLogoutModal(true);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
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

            {/* Logout Confirmation Modal */}
            <DoubleConfirmModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                title="Keluar dari Akun"
                message="Anda akan keluar dari dashboard admin. Session Anda akan berakhir."
                warningMessage="Pastikan semua perubahan sudah tersimpan!"
                confirmText="Ya, Keluar"
                cancelText="Batal"
                cooldownSeconds={3}
            />
        </>
    );
}
