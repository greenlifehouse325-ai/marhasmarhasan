/**
 * Chart Card Component
 * SMK Marhas Admin Dashboard
 * 
 * Card container untuk chart dengan header
 */

'use client';

import React from 'react';
import { MoreVertical, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ChartCardProps {
    title: string;
    subtitle?: string;
    value?: string | number;
    change?: number;
    changeLabel?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export function ChartCard({
    title,
    subtitle,
    value,
    change,
    changeLabel,
    children,
    action,
    className = '',
}: ChartCardProps) {
    const isPositive = (change ?? 0) > 0;
    const isNegative = (change ?? 0) < 0;
    const changeIcon = isPositive ? (
        <TrendingUp size={14} />
    ) : isNegative ? (
        <TrendingDown size={14} />
    ) : (
        <Minus size={14} />
    );

    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>
                {action || (
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <MoreVertical size={16} />
                    </button>
                )}
            </div>

            {/* Value & Change */}
            {value !== undefined && (
                <div className="flex items-end gap-3 mb-4">
                    <span className="text-3xl font-bold text-gray-800">{value}</span>
                    {change !== undefined && (
                        <div
                            className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
                                }`}
                        >
                            {changeIcon}
                            {Math.abs(change)}%
                            {changeLabel && <span className="text-gray-400 font-normal ml-1">{changeLabel}</span>}
                        </div>
                    )}
                </div>
            )}

            {/* Chart Content */}
            <div>{children}</div>
        </div>
    );
}

export default ChartCard;
