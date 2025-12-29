/**
 * SA Dashboard Stats Component
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Widget overview stats untuk Super Admin
 */

'use client';

import React from 'react';
import {
    Users,
    Shield,
    AlertTriangle,
    Activity,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';

interface StatItem {
    label: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
}

interface SADashboardStatsProps {
    stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
    { label: 'Total Siswa', value: '1,250', change: 5.2, icon: <Users size={24} />, color: '#3B82F6' },
    { label: 'Total Admin', value: '12', change: 0, icon: <Shield size={24} />, color: '#8B5CF6' },
    { label: 'Security Alerts', value: '3', change: -40, icon: <AlertTriangle size={24} />, color: '#F59E0B' },
    { label: 'Uptime', value: '99.9%', change: 0.1, icon: <Activity size={24} />, color: '#10B981' },
];

export function SADashboardStats({ stats = DEFAULT_STATS }: SADashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}

function StatCard({ label, value, change, icon, color }: StatItem) {
    const isPositive = (change ?? 0) >= 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                {change !== undefined && change !== 0 && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {isPositive && '+'}{change}%
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
        </div>
    );
}

export default SADashboardStats;
