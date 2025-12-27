'use client';

import React from 'react';
import {
    Users,
    CalendarCheck,
    CreditCard,
    Bot,
    Megaphone,
    Shield,
    BarChart3,
    Settings,
} from 'lucide-react';

interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

const quickActions: QuickAction[] = [
    {
        id: 'students',
        label: 'Manage Students',
        icon: <Users size={24} />,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
    },
    {
        id: 'attendance',
        label: 'Attendance Logs',
        icon: <CalendarCheck size={24} />,
        color: 'text-green-500',
        bgColor: 'bg-green-50'
    },
    {
        id: 'payments',
        label: 'Payment Control',
        icon: <CreditCard size={24} />,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50'
    },
    {
        id: 'ai',
        label: 'AI Settings',
        icon: <Bot size={24} />,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50'
    },
    {
        id: 'announcements',
        label: 'Announcements',
        icon: <Megaphone size={24} />,
        color: 'text-pink-500',
        bgColor: 'bg-pink-50'
    },
    {
        id: 'permissions',
        label: 'Permissions',
        icon: <Shield size={24} />,
        color: 'text-teal-500',
        bgColor: 'bg-teal-50'
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: <BarChart3 size={24} />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
    },
    {
        id: 'settings',
        label: 'System Settings',
        icon: <Settings size={24} />,
        color: 'text-gray-500',
        bgColor: 'bg-gray-50'
    },
];

interface QuickActionsProps {
    onActionClick?: (id: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--text-dark)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-4">
                {quickActions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => onActionClick?.(action.id)}
                        className="card card-hover flex flex-col items-center justify-center py-6 gap-3 group"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${action.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <span className={action.color}>{action.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
