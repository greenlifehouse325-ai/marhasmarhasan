'use client';

import React, { memo } from 'react';
import { Users, UserCheck, Link2, AlertCircle, Activity } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

const stats = [
    {
        id: 'total',
        title: 'Total Parents',
        value: 892,
        icon: <Users size={22} />,
        iconBgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
        iconColor: 'text-amber-600',
    },
    {
        id: 'active',
        title: 'Active Accounts',
        value: 845,
        icon: <UserCheck size={22} />,
        iconBgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
        iconColor: 'text-green-600',
        trend: { value: 2.4, isPositive: true },
    },
    {
        id: 'linked',
        title: 'Linked Students',
        value: '1,245',
        icon: <Link2 size={22} />,
        iconBgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
        iconColor: 'text-blue-600',
    },
    {
        id: 'payment-issues',
        title: 'Payment Issues',
        value: 23,
        icon: <AlertCircle size={22} />,
        iconBgColor: 'bg-gradient-to-br from-red-50 to-rose-100',
        iconColor: 'text-red-500',
    },
    {
        id: 'engagement',
        title: 'Engagement Rate',
        value: '78%',
        icon: <Activity size={22} />,
        iconBgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
        iconColor: 'text-purple-600',
    },
];

function ParentOverviewStatsComponent() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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

const ParentOverviewStats = memo(ParentOverviewStatsComponent);
ParentOverviewStats.displayName = 'ParentOverviewStats';

export default ParentOverviewStats;
