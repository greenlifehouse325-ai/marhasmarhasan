'use client';

import React from 'react';
import { LogIn, User, CreditCard, FileText, Shield } from 'lucide-react';
import Timeline from '@/components/ui/Timeline';

interface ActivityItem {
    id: string;
    type: 'login' | 'profile' | 'payment' | 'content' | 'admin';
    title: string;
    description?: string;
    timestamp: string;
}

interface ParentActivityLogTabProps {
    activities: ActivityItem[];
}

const typeConfig = {
    login: { icon: <LogIn size={12} className="text-blue-500" />, bgColor: 'bg-blue-100' },
    profile: { icon: <User size={12} className="text-green-500" />, bgColor: 'bg-green-100' },
    payment: { icon: <CreditCard size={12} className="text-amber-500" />, bgColor: 'bg-amber-100' },
    content: { icon: <FileText size={12} className="text-purple-500" />, bgColor: 'bg-purple-100' },
    admin: { icon: <Shield size={12} className="text-red-500" />, bgColor: 'bg-red-100' },
};

export default function ParentActivityLogTab({ activities }: ParentActivityLogTabProps) {
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <h3 className="text-base font-semibold text-[var(--text-dark)]">Activity Log</h3>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {['All', 'Login', 'Payment', 'Content'].map((filter) => (
                        <button
                            key={filter}
                            className="px-3 py-1.5 text-xs font-medium text-[var(--text-grey)] hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
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
