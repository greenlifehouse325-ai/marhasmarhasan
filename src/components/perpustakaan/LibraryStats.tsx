/**
 * Library Stats Component
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Widget statistik untuk perpustakaan
 */

'use client';

import React from 'react';
import { BookOpen, Users, Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface LibraryStatsProps {
    totalBooks: number;
    totalMembers: number;
    activeBorrowings: number;
    overdueBooks: number;
    totalCategories?: number;
    monthlyChange?: {
        books: number;
        borrowings: number;
    };
}

export function LibraryStats({
    totalBooks,
    totalMembers,
    activeBorrowings,
    overdueBooks,
    totalCategories = 0,
    monthlyChange,
}: LibraryStatsProps) {
    const stats = [
        {
            label: 'Total Buku',
            value: totalBooks.toLocaleString(),
            icon: <BookOpen size={20} />,
            color: '#10B981',
            change: monthlyChange?.books,
        },
        {
            label: 'Anggota',
            value: totalMembers.toLocaleString(),
            icon: <Users size={20} />,
            color: '#3B82F6',
        },
        {
            label: 'Dipinjam',
            value: activeBorrowings.toLocaleString(),
            icon: <Clock size={20} />,
            color: '#8B5CF6',
            change: monthlyChange?.borrowings,
        },
        {
            label: 'Terlambat',
            value: overdueBooks.toLocaleString(),
            icon: <AlertTriangle size={20} />,
            color: overdueBooks > 0 ? '#EF4444' : '#10B981',
            isWarning: overdueBooks > 0,
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                    <div className="flex items-start justify-between">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            {stat.icon}
                        </div>
                        {stat.change !== undefined && stat.change !== 0 && (
                            <div className={`flex items-center gap-1 text-xs font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.change >= 0 ? '+' : ''}{stat.change}%
                            </div>
                        )}
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

export default LibraryStats;
