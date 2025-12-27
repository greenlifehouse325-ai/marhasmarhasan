'use client';

import React from 'react';
import { LogIn, User, CreditCard, Settings, Shield } from 'lucide-react';
import Timeline from '@/components/ui/Timeline';

interface ActivityItem {
    id: string;
    type: 'login' | 'profile' | 'payment' | 'admin' | 'system';
    title: string;
    description?: string;
    timestamp: string;
}

interface ActivityLogTabProps {
    activities: ActivityItem[];
}

const typeConfig = {
    login: { icon: <LogIn size={12} className="text-blue-500" />, bgColor: 'bg-blue-100' },
    profile: { icon: <User size={12} className="text-green-500" />, bgColor: 'bg-green-100' },
    payment: { icon: <CreditCard size={12} className="text-purple-500" />, bgColor: 'bg-purple-100' },
    admin: { icon: <Shield size={12} className="text-orange-500" />, bgColor: 'bg-orange-100' },
    system: { icon: <Settings size={12} className="text-gray-500" />, bgColor: 'bg-gray-100' },
};

export default function ActivityLogTab({ activities }: ActivityLogTabProps) {
    const timelineItems = activities.map((activity) => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        timestamp: activity.timestamp,
        icon: typeConfig[activity.type].icon,
        iconBgColor: typeConfig[activity.type].bgColor,
    }));

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-[var(--text-dark)]">Activity Log</h3>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    {['All', 'Login', 'Profile', 'Payment', 'Admin'].map((filter) => (
                        <button
                            key={filter}
                            className="px-3 py-1.5 text-xs font-medium text-[var(--text-grey)] hover:text-[var(--text-dark)] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <Timeline items={timelineItems} />
        </div>
    );
}
