/**
 * TopHeader Component
 * SMK Marhas Admin Dashboard
 * 
 * Header dengan search, notifikasi, dan user avatar dengan dropdown
 */

'use client';

import React, { useState } from 'react';
import { Search, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { DoubleConfirmModal } from '@/components/shared';
import ThemeToggle from '@/components/shared/ThemeToggle';

interface TopHeaderProps {
    adminName?: string;
    role?: string;
}

export default function TopHeader({ adminName, role }: TopHeaderProps) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const displayName = adminName || user?.name || 'Admin';

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi,';
        if (hour < 17) return 'Selamat Siang,';
        return 'Selamat Malam,';
    };

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    return (
        <>
            <header className="sticky top-0 z-40 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-light)] py-3 px-4 sm:px-6 flex items-center justify-between">
                {/* Left: Greeting */}
                <div className="flex flex-col">
                    <span className="text-[var(--text-muted)] text-xs sm:text-sm">{getGreeting()}</span>
                    <h1 className="text-base sm:text-xl font-semibold text-[var(--text-primary)]">
                        {displayName}
                    </h1>
                </div>

                {/* Right: Search, Theme, Notification, Avatar */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Search Bar - Hidden on mobile */}
                    <div className="relative hidden md:block">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Cari siswa, guru, data..."
                            className="w-[200px] lg:w-[280px] h-9 pl-9 pr-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-light)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                        />
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle variant="dropdown" size="sm" />

                    {/* Notification Bell */}
                    <Link href="/notifikasi" className="relative w-9 h-9 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center hover:bg-[var(--bg-active)] transition-colors">
                        <Bell size={18} className="text-[var(--text-secondary)]" />
                        {/* Red Dot */}
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Link>

                    {/* User Avatar with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                {getInitials(displayName)}
                            </div>
                            <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform hidden sm:block ${showUserMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* User Dropdown Menu */}
                        {showUserMenu && (
                            <>
                                {/* Backdrop */}
                                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />

                                {/* Menu */}
                                <div className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl shadow-lg overflow-hidden z-50">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-[var(--border-light)]">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{displayName}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{user?.email || 'admin@marhas.sch.id'}</p>
                                    </div>

                                    <Link
                                        href="/profil"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors"
                                    >
                                        <User size={16} className="text-[var(--text-muted)]" />
                                        <span className="text-sm text-[var(--text-primary)]">Profil Saya</span>
                                    </Link>
                                    <Link
                                        href="/pengaturan"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors"
                                    >
                                        <Settings size={16} className="text-[var(--text-muted)]" />
                                        <span className="text-sm text-[var(--text-primary)]">Pengaturan</span>
                                    </Link>
                                    <div className="border-t border-[var(--border-light)]"></div>
                                    <button
                                        onClick={() => { setShowUserMenu(false); setShowLogoutModal(true); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors"
                                    >
                                        <LogOut size={16} className="text-red-500" />
                                        <span className="text-sm text-red-500">Keluar</span>
                                    </button>
                                </div>
                            </>
                        )}
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
