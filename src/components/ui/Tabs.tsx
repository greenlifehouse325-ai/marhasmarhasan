'use client';

import React from 'react';

interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                            ? 'bg-white text-[var(--primary-blue)] shadow-sm'
                            : 'text-[var(--text-grey)] hover:text-[var(--text-dark)]'
                        }`}
                >
                    {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
