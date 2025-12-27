'use client';

import React from 'react';
import { CalendarCheck, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface AttendanceRecord {
    date: string;
    day: string;
    checkIn: string;
    checkOut: string;
    status: 'present' | 'absent' | 'late' | 'leave';
    note?: string;
}

interface TeacherAttendanceTabProps {
    weeklyData: number[];
    monthlyRate: number;
    records: AttendanceRecord[];
    lateCount: number;
    absentCount: number;
}

const statusIcons = {
    present: <CheckCircle size={16} className="text-green-500" />,
    absent: <XCircle size={16} className="text-red-500" />,
    late: <Clock size={16} className="text-orange-500" />,
    leave: <AlertTriangle size={16} className="text-blue-500" />,
};

const statusLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    leave: 'On Leave',
};

const statusBadgeVariant = {
    present: 'success',
    absent: 'error',
    late: 'warning',
    leave: 'info',
} as const;

export default function TeacherAttendanceTab({ weeklyData, monthlyRate, records, lateCount, absentCount }: TeacherAttendanceTabProps) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxValue = Math.max(...weeklyData, 1);

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Weekly Chart */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <CalendarCheck size={18} className="text-[var(--primary-blue)]" />
                    Weekly Attendance
                </h3>
                <div className="flex items-end justify-between h-40 px-4">
                    {weeklyData.map((value, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div
                                className="w-10 bg-teal-500 rounded-t-lg transition-all hover:bg-teal-600"
                                style={{ height: `${(value / maxValue) * 100}%`, minHeight: '8px' }}
                            />
                            <span className="text-xs text-[var(--text-grey)]">{days[index]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
                {/* Monthly Rate */}
                <div className="card">
                    <h3 className="text-sm font-medium text-[var(--text-grey)] mb-2">Monthly Rate</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                                <circle
                                    cx="32" cy="32" r="28"
                                    stroke={monthlyRate >= 90 ? '#10B981' : monthlyRate >= 75 ? '#F59E0B' : '#EF4444'}
                                    strokeWidth="6" fill="none"
                                    strokeDasharray={`${(monthlyRate / 100) * 175.9} 175.9`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold text-[var(--text-dark)]">{monthlyRate}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-[var(--text-dark)]">{monthlyRate}%</p>
                            <p className="text-xs text-[var(--text-grey)]">Attendance</p>
                        </div>
                    </div>
                </div>

                {/* Late & Absent Count */}
                <div className="card">
                    <div className="flex justify-between mb-3">
                        <div className="text-center flex-1">
                            <p className="text-2xl font-semibold text-orange-500">{lateCount}</p>
                            <p className="text-xs text-[var(--text-grey)]">Late</p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="text-center flex-1">
                            <p className="text-2xl font-semibold text-red-500">{absentCount}</p>
                            <p className="text-xs text-[var(--text-grey)]">Absent</p>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--text-grey)] text-center">This Month</p>
                </div>
            </div>

            {/* Attendance History */}
            <div className="card col-span-3">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Attendance History</h3>
                <div className="space-y-3">
                    {records.map((record, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {statusIcons[record.status]}
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{record.date}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{record.day}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs text-[var(--text-grey)]">Check In</p>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{record.checkIn}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[var(--text-grey)]">Check Out</p>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{record.checkOut}</p>
                                </div>
                                <StatusBadge variant={statusBadgeVariant[record.status]}>
                                    {statusLabels[record.status]}
                                </StatusBadge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
