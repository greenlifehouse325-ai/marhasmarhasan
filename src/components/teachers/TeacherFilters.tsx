'use client';

import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface TeacherFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedDepartment: string;
    onDepartmentChange: (dept: string) => void;
    selectedStatus: string;
    onStatusChange: (status: string) => void;
}

const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'rpl', label: 'RPL (Software)' },
    { id: 'tkj', label: 'TKJ (Networking)' },
    { id: 'mm', label: 'MM (Multimedia)' },
    { id: 'general', label: 'General Subjects' },
    { id: 'normatif', label: 'Normatif' },
];

const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'active', label: 'Active' },
    { id: 'limited', label: 'Limited' },
    { id: 'suspended', label: 'Suspended' },
];

export default function TeacherFilters({
    searchQuery,
    onSearchChange,
    selectedDepartment,
    onDepartmentChange,
    selectedStatus,
    onStatusChange,
}: TeacherFiltersProps) {
    return (
        <div className="flex items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)]"
                    size={18}
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search teachers by name or ID..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-gray-100 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-grey)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20 focus:border-[var(--primary-blue)]/30 transition-all"
                />
            </div>

            {/* Department Filter */}
            <div className="relative">
                <select
                    value={selectedDepartment}
                    onChange={(e) => onDepartmentChange(e.target.value)}
                    className="h-10 pl-4 pr-10 rounded-xl bg-white border border-gray-100 text-sm text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20 appearance-none cursor-pointer"
                >
                    {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.label}</option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)] pointer-events-none"
                />
            </div>

            {/* Status Filter */}
            <div className="relative">
                <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="h-10 pl-4 pr-10 rounded-xl bg-white border border-gray-100 text-sm text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20 appearance-none cursor-pointer"
                >
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>{status.label}</option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-grey)] pointer-events-none"
                />
            </div>

            {/* More Filters */}
            <button className="h-10 px-4 flex items-center gap-2 rounded-xl bg-white border border-gray-100 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] hover:border-gray-200 transition-colors">
                <Filter size={16} />
                <span>More Filters</span>
            </button>
        </div>
    );
}
