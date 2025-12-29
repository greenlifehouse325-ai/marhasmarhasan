/**
 * StatWidget Component
 * SMK Marhas Admin Dashboard - Shared Components
 * 
 * Reusable statistics widget with trend indicator
 */

'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatWidgetProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: {
        value: number; // percentage change
        label: string; // e.g., "vs bulan lalu"
    };
    onClick?: () => void;
    loading?: boolean;
    subtitle?: string;
}

export function StatWidget({
    label,
    value,
    icon,
    color,
    trend,
    onClick,
    loading = false,
    subtitle,
}: StatWidgetProps) {
    const isPositive = trend && trend.value > 0;
    const isNegative = trend && trend.value < 0;
    const isNeutral = trend && trend.value === 0;

    return (
        <div
            className={`bg-white rounded-xl p-4 shadow-sm transition-all ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
                }`}
            onClick={onClick}
        >
            {loading ? (
                <div className="animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                        <div className="flex-1">
                            <div className="h-7 bg-gray-200 rounded w-16 mb-1" />
                            <div className="h-4 bg-gray-100 rounded w-20" />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${color}15`, color }}
                        >
                            {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-2xl font-bold text-gray-800 truncate">{value}</p>
                            <p className="text-sm text-gray-500 truncate">{label}</p>
                        </div>
                    </div>

                    {/* Trend indicator */}
                    {trend && (
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                {isPositive && <TrendingUp size={14} />}
                                {isNegative && <TrendingDown size={14} />}
                                {isNeutral && <Minus size={14} />}
                                <span>
                                    {isPositive && '+'}
                                    {trend.value}%
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">{trend.label}</span>
                        </div>
                    )}

                    {/* Subtitle */}
                    {subtitle && !trend && (
                        <p className="mt-2 text-xs text-gray-400">{subtitle}</p>
                    )}
                </>
            )}
        </div>
    );
}

// Compact version for grid layouts
export function StatWidgetCompact({
    label,
    value,
    icon,
    color,
}: Pick<StatWidgetProps, 'label' | 'value' | 'icon' | 'color'>) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}15`, color }}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-lg font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 truncate">{label}</p>
            </div>
        </div>
    );
}

// Large version for hero stats
export function StatWidgetLarge({
    label,
    value,
    icon,
    color,
    trend,
    subtitle,
}: StatWidgetProps) {
    const isPositive = trend && trend.value > 0;
    const isNegative = trend && trend.value < 0;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${isPositive ? 'bg-green-100 text-green-700' : isNegative ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {isPositive && <TrendingUp size={12} />}
                        {isNegative && <TrendingDown size={12} />}
                        {isPositive && '+'}
                        {trend.value}%
                    </div>
                )}
            </div>

            <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>

            {subtitle && (
                <p className="mt-2 text-xs text-gray-400">{subtitle}</p>
            )}
        </div>
    );
}

export default StatWidget;
