/**
 * DataTable Component
 * SMK Marhas Admin Dashboard - Shared Components
 * 
 * Reusable data table with sorting, search, and actions
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
    Search,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
} from 'lucide-react';

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyField: keyof T;
    searchable?: boolean;
    searchPlaceholder?: string;
    searchFields?: (keyof T)[];
    pageSize?: number;
    onRowClick?: (row: T) => void;
    actions?: (row: T) => React.ReactNode;
    emptyMessage?: string;
    loading?: boolean;
}

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    keyField,
    searchable = true,
    searchPlaceholder = 'Cari...',
    searchFields = [],
    pageSize = 10,
    onRowClick,
    actions,
    emptyMessage = 'Tidak ada data',
    loading = false,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter data based on search
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;

        const fieldsToSearch = searchFields.length > 0 ? searchFields : columns.map(c => c.key as keyof T);

        return data.filter(row => {
            return fieldsToSearch.some(field => {
                const value = row[field];
                if (value == null) return false;
                return String(value).toLowerCase().includes(searchQuery.toLowerCase());
            });
        });
    }, [data, searchQuery, searchFields, columns]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = a[sortKey as keyof T];
            const bVal = b[sortKey as keyof T];

            if (aVal == null) return 1;
            if (bVal == null) return -1;

            let comparison = 0;
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                comparison = aVal.localeCompare(bVal);
            } else if (typeof aVal === 'number' && typeof bVal === 'number') {
                comparison = aVal - bVal;
            } else {
                comparison = String(aVal).localeCompare(String(bVal));
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });
    }, [filteredData, sortKey, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const getValue = (row: T, key: string): unknown => {
        return key.includes('.')
            ? key.split('.').reduce((obj: any, k) => obj?.[k], row)
            : row[key];
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Search */}
            {searchable && (
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-4 text-${column.align || 'left'} text-sm font-medium text-gray-500`}
                                    style={{ width: column.width }}
                                >
                                    {column.sortable ? (
                                        <button
                                            onClick={() => handleSort(column.key)}
                                            className="flex items-center gap-1 hover:text-gray-700"
                                        >
                                            {column.label}
                                            <span className="flex flex-col">
                                                <ChevronUp
                                                    size={12}
                                                    className={sortKey === column.key && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-300'}
                                                />
                                                <ChevronDown
                                                    size={12}
                                                    className={`-mt-1 ${sortKey === column.key && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-300'}`}
                                                />
                                            </span>
                                        </button>
                                    ) : (
                                        column.label
                                    )}
                                </th>
                            ))}
                            {actions && (
                                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 w-20">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx}>
                                    {columns.map(column => (
                                        <td key={column.key} className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto" />
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map(row => (
                                <tr
                                    key={String(row[keyField])}
                                    className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                                    onClick={() => onRowClick?.(row)}
                                >
                                    {columns.map(column => {
                                        const value = getValue(row, column.key);
                                        return (
                                            <td
                                                key={column.key}
                                                className={`px-6 py-4 text-${column.align || 'left'} text-sm text-gray-600`}
                                            >
                                                {column.render ? column.render(value, row) : String(value ?? '-')}
                                            </td>
                                        );
                                    })}
                                    {actions && (
                                        <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                                            {actions(row)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedData.length)} dari {sortedData.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let page: number;
                            if (totalPages <= 5) {
                                page = i + 1;
                            } else if (currentPage <= 3) {
                                page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i;
                            } else {
                                page = currentPage - 2 + i;
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-lg text-sm font-medium ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataTable;
