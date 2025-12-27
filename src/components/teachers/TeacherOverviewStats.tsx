'use client';

import React from 'react';
import { Users, UserCheck, UserX, BookOpen, Wallet } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

const stats = [
    {
        id: 'total',
        title: 'Total Teachers',
        value: 85,
        icon: <Users size={24} />,
        iconBgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
    },
    {
        id: 'present',
        title: 'Present Today',
        value: 78,
        icon: <UserCheck size={24} />,
        iconBgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        trend: { value: 1.2, isPositive: true },
    },
    {
        id: 'absent',
        title: 'Absent / Late',
        value: 7,
        icon: <UserX size={24} />,
        iconBgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
    },
    {
        id: 'academic',
        title: 'Active Academic',
        value: 72,
        icon: <BookOpen size={24} />,
        iconBgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
    },
    {
        id: 'cashless',
        title: 'Cashless Active',
        value: 65,
        icon: <Wallet size={24} />,
        iconBgColor: 'bg-teal-50',
        iconColor: 'text-teal-500',
    },
];

export default function TeacherOverviewStats() {
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
