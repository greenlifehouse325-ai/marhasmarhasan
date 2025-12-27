'use client';

import React from 'react';
import {
    LayoutDashboard,
    CalendarCheck,
    Users,
    GraduationCap,
    CreditCard,
    Bot,
    Megaphone,
    BarChart3,
    Settings,
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot size={20} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

interface SidebarProps {
    activeItem?: string;
    onNavClick?: (id: string) => void;
}

export default function Sidebar({ activeItem = 'dashboard', onNavClick }: SidebarProps) {
    return (
        <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white flex flex-col py-6 px-4 shadow-[2px_0_8px_rgba(0,0,0,0.04)] rounded-r-[24px] z-50">
            {/* Logo Header */}
            <div className="flex items-center gap-3 px-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-[var(--text-dark)] text-lg">Marhas Admin</span>
                    <span className="badge badge-admin text-[10px] w-fit">ADMIN</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavClick?.(item.id)}
                        className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                    >
                        <span className={activeItem === item.id ? 'text-[var(--primary-blue)]' : 'text-[var(--text-grey)]'}>
                            {item.icon}
                        </span>
                        <span className="text-[15px]">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
