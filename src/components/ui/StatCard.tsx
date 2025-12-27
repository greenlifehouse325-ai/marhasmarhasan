'use client';

import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBgColor?: string;
    iconColor?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export default function StatCard({
    title,
    value,
    icon,
    iconBgColor = 'bg-blue-50',
    iconColor = 'text-blue-500',
    trend,
}: StatCardProps) {
    return (
        <div className="card card-hover flex items-center gap-4 py-5 px-5">
            <div className={`w-14 h-14 rounded-2xl ${iconBgColor} flex items-center justify-center flex-shrink-0`}>
                <span className={iconColor}>{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-2xl font-semibold text-[var(--text-dark)]">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
                <p className="text-sm text-[var(--text-grey)] truncate">{title}</p>
                {trend && (
                    <p className={`text-xs mt-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week
                    </p>
                )}
            </div>
        </div>
    );
}
