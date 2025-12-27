'use client';

import React from 'react';

interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    timestamp: string;
    icon?: React.ReactNode;
    iconBgColor?: string;
}

interface TimelineProps {
    items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
    return (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Items */}
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4 pl-12">
                        {/* Node */}
                        <div
                            className={`absolute left-2 w-6 h-6 rounded-full flex items-center justify-center ${item.iconBgColor || 'bg-blue-100'
                                } z-10`}
                        >
                            {item.icon || (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-4 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{item.title}</p>
                                    {item.description && (
                                        <p className="text-xs text-[var(--text-grey)] mt-0.5">{item.description}</p>
                                    )}
                                </div>
                                <span className="text-xs text-[var(--text-grey)] whitespace-nowrap">
                                    {item.timestamp}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
