'use client';

import React, { memo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface ParentFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedStatus: string;
    onStatusChange: (status: string) => void;
    selectedEngagement: string;
    onEngagementChange: (engagement: string) => void;
}

const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'active', label: 'Active' },
    { id: 'limited', label: 'Limited' },
    { id: 'blocked', label: 'Blocked' },
];

const engagementLevels = [
    { id: 'all', label: 'All Engagement' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
];

function ParentFiltersComponent({
    searchQuery,
    onSearchChange,
    selectedStatus,
    onStatusChange,
    selectedEngagement,
    onEngagementChange,
}: ParentFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)]"
                    size={18}
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search parents..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-gray-100 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-grey)] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/30 transition-all"
                />
            </div>

            <div className="flex gap-2 md:gap-3">
                {/* Status Filter */}
                <div className="relative flex-1 sm:flex-none">
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full sm:w-auto h-10 pl-3 md:pl-4 pr-8 md:pr-10 rounded-xl bg-white border border-gray-100 text-xs md:text-sm text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none cursor-pointer"
                    >
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>{status.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)] pointer-events-none" />
                </div>

                {/* Engagement Filter */}
                <div className="relative flex-1 sm:flex-none">
                    <select
                        value={selectedEngagement}
                        onChange={(e) => onEngagementChange(e.target.value)}
                        className="w-full sm:w-auto h-10 pl-3 md:pl-4 pr-8 md:pr-10 rounded-xl bg-white border border-gray-100 text-xs md:text-sm text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none cursor-pointer"
                    >
                        {engagementLevels.map((level) => (
                            <option key={level.id} value={level.id}>{level.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)] pointer-events-none" />
                </div>

                {/* More Filters - hidden on mobile */}
                <button className="hidden md:flex h-10 px-4 items-center gap-2 rounded-xl bg-white border border-gray-100 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] hover:border-gray-200 transition-colors">
                    <Filter size={16} />
                    <span>More</span>
                </button>
            </div>
        </div>
    );
}

const ParentFilters = memo(ParentFiltersComponent);
ParentFilters.displayName = 'ParentFilters';

export default ParentFilters;
