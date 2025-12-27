'use client';

import React from 'react';
import { Users, UserCheck, AlertCircle, CreditCard, ClipboardList } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

const stats = [
    {
        id: 'total',
        title: 'Total Students',
        value: 1245,
        icon: <Users size={24} />,
        iconBgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
    },
    {
        id: 'present',
        title: 'Present Today',
        value: 1180,
        icon: <UserCheck size={24} />,
        iconBgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        trend: { value: 2.5, isPositive: true },
    },
    {
        id: 'attendance-issues',
        title: 'Attendance Issues',
        value: 32,
        icon: <AlertCircle size={24} />,
        iconBgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
    },
    {
        id: 'payment-issues',
        title: 'Payment Issues',
        value: 18,
        icon: <CreditCard size={24} />,
        iconBgColor: 'bg-red-50',
        iconColor: 'text-red-500',
    },
    {
        id: 'pending-tasks',
        title: 'Pending Tasks',
        value: 65,
        icon: <ClipboardList size={24} />,
        iconBgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
    },
];

export default function StudentOverviewStats() {
    return (
        <div className="grid grid-cols-5 gap-4">
            {stats.map((stat) => (
                <StatCard
                    key={stat.id}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    iconBgColor={stat.iconBgColor}
                    iconColor={stat.iconColor}
                    trend={stat.trend}
                />
            ))}
        </div>
    );
}
