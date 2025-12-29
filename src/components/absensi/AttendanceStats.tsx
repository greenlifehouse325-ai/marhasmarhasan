/**
 * Attendance Stats Component
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Komponen untuk menampilkan statistik kehadiran
 */

'use client';

import React from 'react';
import { CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

interface AttendanceStatsProps {
    present: number;
    late: number;
    absent: number;
    sick: number;
    permission: number;
    total: number;
}

export function AttendanceStats({
    present,
    late,
    absent,
    sick,
    permission,
    total,
}: AttendanceStatsProps) {
    const presentRate = total > 0 ? Math.round((present / total) * 100) : 0;
    const hadirTotal = present + late;

    const stats = [
        {
            label: 'Hadir',
            value: present,
            icon: <CheckCircle size={20} />,
            color: '#10B981',
            bg: 'bg-green-100',
        },
        {
            label: 'Terlambat',
            value: late,
            icon: <Clock size={20} />,
            color: '#F59E0B',
            bg: 'bg-amber-100',
        },
        {
            label: 'Sakit',
            value: sick,
            icon: <AlertTriangle size={20} />,
            color: '#6366F1',
            bg: 'bg-indigo-100',
        },
        {
            label: 'Izin',
            value: permission,
            icon: <AlertTriangle size={20} />,
            color: '#8B5CF6',
            bg: 'bg-purple-100',
        },
        {
            label: 'Alpha',
            value: absent,
            icon: <XCircle size={20} />,
            color: '#EF4444',
            bg: 'bg-red-100',
        },
    ];

    return (
        <div className="space-y-4">
            {/* Main Stat */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100">Tingkat Kehadiran</p>
                        <p className="text-4xl font-bold mt-1">{presentRate}%</p>
                        <p className="text-sm text-blue-200 mt-1">
                            {hadirTotal} dari {total} siswa
                        </p>
                    </div>
                    <div className="w-24 h-24 relative">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="white"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${presentRate * 2.51} 1000`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-5 gap-2">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`${stat.bg} rounded-xl p-3 text-center`}
                    >
                        <div
                            className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-2"
                            style={{ backgroundColor: `${stat.color}30`, color: stat.color }}
                        >
                            {stat.icon}
                        </div>
                        <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AttendanceStats;
