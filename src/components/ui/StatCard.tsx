'use client';

import React, { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

function StatCardComponent({ title, value, icon, iconBgColor = 'bg-blue-50', iconColor = 'text-blue-500', trend }: StatCardProps) {
    return (
        <div className="card p-4 md:p-5 flex items-center gap-3 md:gap-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${iconBgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <span className={iconColor}>{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xl md:text-2xl font-bold text-[var(--text-dark)] truncate">{value}</p>
                <p className="text-xs md:text-sm text-[var(--text-grey)] truncate">{title}</p>
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{trend.value}%</span>
                </div>
            )}
        </div>
    );
}

// Memoize for performance
const StatCard = memo(StatCardComponent);
StatCard.displayName = 'StatCard';

export default StatCard;
