/**
 * Pie Chart Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';

interface PieData {
    label: string;
    value: number;
    color: string;
}

interface PieChartProps {
    data: PieData[];
    size?: number;
    showLegend?: boolean;
    donut?: boolean;
}

export function PieChart({ data, size = 160, showLegend = true, donut = false }: PieChartProps) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) return null;

    let currentAngle = -90;
    const paths = data.map(d => {
        const angle = (d.value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = 50 + 40 * Math.cos(startRad);
        const y1 = 50 + 40 * Math.sin(startRad);
        const x2 = 50 + 40 * Math.cos(endRad);
        const y2 = 50 + 40 * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;

        return { ...d, path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`, angle };
    });

    return (
        <div className={`flex ${showLegend ? 'gap-4' : ''} items-center`}>
            <svg width={size} height={size} viewBox="0 0 100 100">
                {paths.map((d, i) => (
                    <path key={i} d={d.path} fill={d.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
                ))}
                {donut && <circle cx="50" cy="50" r="25" fill="var(--bg-card)" />}
            </svg>
            {showLegend && (
                <div className="space-y-2">
                    {data.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                            <span className="text-[var(--text-secondary)]">{d.label}</span>
                            <span className="font-medium text-[var(--text-primary)]">{Math.round((d.value / total) * 100)}%</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
