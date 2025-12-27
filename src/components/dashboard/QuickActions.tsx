'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import {
    Users,
    CalendarCheck,
    CreditCard,
    Bot,
    Megaphone,
    Shield,
    BarChart3,
    Settings,
    UserCircle,
} from 'lucide-react';

interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    shadowColor: string;
    href: string;
}

const quickActions: QuickAction[] = [
    {
        id: 'students',
        label: 'Manage Students',
        icon: <Users size={22} />,
        color: 'text-blue-600',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
        shadowColor: 'shadow-blue-500/10',
        href: '/students'
    },
    {
        id: 'attendance',
        label: 'Attendance Logs',
        icon: <CalendarCheck size={22} />,
        color: 'text-green-600',
        bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
        shadowColor: 'shadow-green-500/10',
        href: '/attendance'
    },
    {
        id: 'parents',
        label: 'Parents',
        icon: <UserCircle size={22} />,
        color: 'text-amber-600',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
        shadowColor: 'shadow-amber-500/10',
        href: '/parents'
    },
    {
        id: 'payments',
        label: 'Payment Control',
        icon: <CreditCard size={22} />,
        color: 'text-orange-600',
        bgColor: 'bg-gradient-to-br from-orange-50 to-red-100',
        shadowColor: 'shadow-orange-500/10',
        href: '/payments'
    },
    {
        id: 'ai',
        label: 'AI Settings',
        icon: <Bot size={22} />,
        color: 'text-purple-600',
        bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
        shadowColor: 'shadow-purple-500/10',
        href: '/ai-assistant'
    },
    {
        id: 'announcements',
        label: 'Announcements',
        icon: <Megaphone size={22} />,
        color: 'text-pink-600',
        bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
        shadowColor: 'shadow-pink-500/10',
        href: '/announcements'
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: <BarChart3 size={22} />,
        color: 'text-teal-600',
        bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100',
        shadowColor: 'shadow-teal-500/10',
        href: '/reports'
    },
    {
        id: 'settings',
        label: 'System Settings',
        icon: <Settings size={22} />,
        color: 'text-gray-600',
        bgColor: 'bg-gradient-to-br from-gray-50 to-slate-100',
        shadowColor: 'shadow-gray-500/10',
        href: '/settings'
    },
];

// Memoized action card for performance
const ActionCard = memo(function ActionCard({ action }: { action: QuickAction }) {
    return (
        <Link
            href={action.href}
            className={`
                card flex flex-col items-center justify-center py-5 md:py-6 gap-3 group
                hover:shadow-lg ${action.shadowColor}
                transition-all duration-200
                hover:-translate-y-1
            `}
        >
            <div className={`
                w-12 h-12 md:w-14 md:h-14 rounded-2xl ${action.bgColor} 
                flex items-center justify-center 
                transition-transform duration-200 
                group-hover:scale-110
                shadow-sm
            `}>
                <span className={action.color}>{action.icon}</span>
            </div>
            <span className="text-xs md:text-sm font-medium text-[var(--text-dark)] text-center px-2">
                {action.label}
            </span>
        </Link>
    );
});

export default function QuickActions() {
    return (
        <div>
            <h2 className="text-base md:text-lg font-semibold text-[var(--text-dark)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {quickActions.map((action) => (
                    <ActionCard key={action.id} action={action} />
                ))}
            </div>
        </div>
    );
}
