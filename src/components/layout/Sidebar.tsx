'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CalendarCheck,
    Users,
    GraduationCap,
    UserCircle,
    CreditCard,
    Bot,
    Megaphone,
    BarChart3,
    Settings,
    LogOut,
    X,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/' },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={20} />, href: '/attendance' },
    { id: 'students', label: 'Students', icon: <Users size={20} />, href: '/students' },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap size={20} />, href: '/teachers' },
    { id: 'parents', label: 'Parents', icon: <UserCircle size={20} />, href: '/parents' },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} />, href: '/payments' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot size={20} />, href: '/ai-assistant' },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={20} />, href: '/announcements' },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} />, href: '/reports' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
];

interface SidebarProps {
    activeItem?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ activeItem, isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname();

    // Determine active item from pathname if not provided
    const currentActive = activeItem || navItems.find(item =>
        item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
    )?.id || 'dashboard';

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 h-screen w-[280px] lg:w-[260px]
                bg-white/95 backdrop-blur-xl
                flex flex-col py-6 px-4
                shadow-[4px_0_24px_rgba(0,0,0,0.08)]
                rounded-r-[28px]
                z-50
                transition-transform duration-300 ease-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                {/* Close button - mobile only */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors lg:hidden"
                >
                    <X size={18} className="text-gray-500" />
                </button>

                {/* Logo Header */}
                <Link href="/" className="flex items-center gap-3 px-3 mb-8 hover:opacity-90 transition-opacity">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-[var(--text-dark)] text-lg tracking-tight">Marhas Admin</span>
                        <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit">ADMIN</span>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = currentActive === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={onClose}
                                className={`
                                    relative flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                    }
                                `}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full" />
                                )}

                                <span className={`
                                    w-9 h-9 rounded-xl flex items-center justify-center
                                    transition-all duration-200
                                    ${isActive
                                        ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                                        : 'bg-gray-100 group-hover:bg-gray-200'
                                    }
                                `}>
                                    {item.icon}
                                </span>
                                <span className="text-[15px] font-medium">{item.label}</span>

                                {isActive && (
                                    <ChevronRight size={16} className="ml-auto text-blue-400" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-medium text-sm shadow-md">
                            AR
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">Admin Rizky</p>
                            <p className="text-xs text-gray-400">Super Admin</p>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
