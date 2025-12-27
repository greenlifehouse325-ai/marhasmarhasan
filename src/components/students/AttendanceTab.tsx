'use client';

import React from 'react';
import { CalendarCheck, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface AttendanceRecord {
    date: string;
    day: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    note?: string;
}

interface AttendanceTabProps {
    weeklyData: number[];
    monthlyRate: number;
    records: AttendanceRecord[];
    riskLevel: 'low' | 'medium' | 'high';
}

const statusIcons = {
    present: <CheckCircle size={16} className="text-green-500" />,
    absent: <XCircle size={16} className="text-red-500" />,
    late: <Clock size={16} className="text-orange-500" />,
    excused: <AlertTriangle size={16} className="text-blue-500" />,
};

const statusLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    excused: 'Excused',
};

const statusBadgeVariant = {
    present: 'success',
    absent: 'error',
    late: 'warning',
    excused: 'info',
} as const;

export default function AttendanceTab({ weeklyData, monthlyRate, records, riskLevel }: AttendanceTabProps) {
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
                                className="w-10 bg-[var(--primary-blue)] rounded-t-lg transition-all hover:bg-blue-600"
                                style={{ height: `${(value / maxValue) * 100}%`, minHeight: '8px' }}
                            />
                            <span className="text-xs text-[var(--text-grey)]">{days[index]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Summary */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Monthly Summary</h3>

                {/* Rate Circle */}
                <div className="flex flex-col items-center mb-4">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#E5E7EB"
                                strokeWidth="8"
                                fill="none"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke={monthlyRate >= 90 ? '#10B981' : monthlyRate >= 75 ? '#F59E0B' : '#EF4444'}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${(monthlyRate / 100) * 251.2} 251.2`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-[var(--text-dark)]">{monthlyRate}%</span>
                        </div>
                    </div>
                    <span className="text-sm text-[var(--text-grey)] mt-2">Attendance Rate</span>
                </div>

                {/* Risk Indicator */}
                <div className={`p-3 rounded-xl ${riskLevel === 'low' ? 'bg-green-50' :
                        riskLevel === 'medium' ? 'bg-orange-50' : 'bg-red-50'
                    }`}>
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className={
                            riskLevel === 'low' ? 'text-green-500' :
                                riskLevel === 'medium' ? 'text-orange-500' : 'text-red-500'
                        } />
                        <span className={`text-sm font-medium ${riskLevel === 'low' ? 'text-green-700' :
                                riskLevel === 'medium' ? 'text-orange-700' : 'text-red-700'
                            }`}>
                            {riskLevel === 'low' ? 'Low Risk' :
                                riskLevel === 'medium' ? 'Moderate Risk' : 'High Risk - Frequent Absence'}
                        </span>
                    </div>
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
                            <div className="flex items-center gap-3">
                                {record.note && (
                                    <span className="text-xs text-[var(--text-grey)]">{record.note}</span>
                                )}
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
