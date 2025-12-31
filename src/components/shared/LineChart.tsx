/**
 * Line Chart Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';

interface DataPoint {
    label: string;
    value: number;
}

interface LineChartProps {
    data: DataPoint[];
    height?: number;
    color?: string;
    showGrid?: boolean;
}

export function LineChart({ data, height = 200, color = 'var(--brand-primary)', showGrid = true }: LineChartProps) {
    if (data.length === 0) return null;

    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    const range = max - min || 1;
    const padding = 40;
    const chartWidth = 100;
    const chartHeight = height - padding * 2;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((d.value - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,100 ${points} 100,100`;

    return (
        <div className="w-full" style={{ height }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {showGrid && (
                    <g className="text-[var(--border-light)]">
                        {[0, 25, 50, 75, 100].map(y => (
                            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                        ))}
                    </g>
                )}
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={areaPoints} fill="url(#lineGradient)" />
                <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - ((d.value - min) / range) * 100;
                    return <circle key={i} cx={x} cy={y} r="3" fill={color} className="hover:r-5 transition-all cursor-pointer" vectorEffect="non-scaling-stroke" />;
                })}
            </svg>
            <div className="flex justify-between mt-2 text-xs text-[var(--text-muted)]">
                {data.map((d, i) => i % Math.ceil(data.length / 6) === 0 && <span key={i}>{d.label}</span>)}
            </div>
        </div>
    );
}
