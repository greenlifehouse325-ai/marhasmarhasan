/**
 * Bar Chart Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';

interface BarData {
    label: string;
    value: number;
    color?: string;
}

interface BarChartProps {
    data: BarData[];
    height?: number;
    showValues?: boolean;
    horizontal?: boolean;
}

export function BarChart({ data, height = 200, showValues = true, horizontal = false }: BarChartProps) {
    if (data.length === 0) return null;

    const max = Math.max(...data.map(d => d.value));

    if (horizontal) {
        return (
            <div className="space-y-3">
                {data.map((d, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--text-secondary)]">{d.label}</span>
                            {showValues && <span className="font-medium text-[var(--text-primary)]">{d.value}</span>}
                        </div>
                        <div className="h-3 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color || 'var(--brand-primary)' }} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-end gap-2 justify-between" style={{ height }}>
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center justify-end" style={{ height: height - 40 }}>
                        {showValues && <span className="text-xs font-medium text-[var(--text-primary)] mb-1">{d.value}</span>}
                        <div className="w-full max-w-[40px] rounded-t-lg transition-all duration-500" style={{ height: `${(d.value / max) * 100}%`, backgroundColor: d.color || 'var(--brand-primary)' }} />
                    </div>
                    <span className="text-xs text-[var(--text-muted)] truncate max-w-full">{d.label}</span>
                </div>
            ))}
        </div>
    );
}
