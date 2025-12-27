'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import Link from 'next/link';

export interface Teacher {
    id: string;
    name: string;
    teacherId: string;
    department: string;
    subject: string;
    photo?: string;
    attendanceStatus: 'present' | 'absent' | 'late' | 'leave';
    academicStatus: 'active' | 'moderate' | 'inactive';
    cashlessStatus: 'active' | 'limited' | 'disabled';
    accountStatus: 'active' | 'limited' | 'suspended';
}

interface TeacherTableProps {
    teachers: Teacher[];
}

const attendanceBadgeVariant = {
    present: 'success',
    absent: 'error',
    late: 'warning',
    leave: 'info',
} as const;

const attendanceLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    leave: 'On Leave',
};

const academicBadgeVariant = {
    active: 'success',
    moderate: 'warning',
    inactive: 'error',
} as const;

const academicLabels = {
    active: 'Active',
    moderate: 'Moderate',
    inactive: 'Inactive',
};

const cashlessBadgeVariant = {
    active: 'success',
    limited: 'warning',
    disabled: 'neutral',
} as const;

const cashlessLabels = {
    active: 'Active',
    limited: 'Limited',
    disabled: 'Disabled',
};

const accountBadgeVariant = {
    active: 'success',
    limited: 'warning',
    suspended: 'error',
} as const;

const accountLabels = {
    active: 'Active',
    limited: 'Limited',
    suspended: 'Suspended',
};

export default function TeacherTable({ teachers }: TeacherTableProps) {
    return (
        <div className="card p-0 overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-6 py-4">
                            Teacher
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Department
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Attendance
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Academic
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Cashless
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Account
                        </th>
                        <th className="text-right text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-6 py-4">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr
                            key={teacher.id}
                            className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
                        >
                            {/* Teacher */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                                        {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-dark)]">{teacher.name}</p>
                                        <p className="text-xs text-[var(--text-grey)]">{teacher.subject}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Department */}
                            <td className="px-4 py-4">
                                <span className="text-sm text-[var(--text-dark)]">{teacher.department}</span>
                            </td>

                            {/* Attendance */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={attendanceBadgeVariant[teacher.attendanceStatus]}>
                                    {attendanceLabels[teacher.attendanceStatus]}
                                </StatusBadge>
                            </td>

                            {/* Academic */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={academicBadgeVariant[teacher.academicStatus]}>
                                    {academicLabels[teacher.academicStatus]}
                                </StatusBadge>
                            </td>

                            {/* Cashless */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={cashlessBadgeVariant[teacher.cashlessStatus]}>
                                    {cashlessLabels[teacher.cashlessStatus]}
                                </StatusBadge>
                            </td>

                            {/* Account */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={accountBadgeVariant[teacher.accountStatus]}>
                                    {accountLabels[teacher.accountStatus]}
                                </StatusBadge>
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 text-right">
                                <Link
                                    href={`/teachers/${teacher.id}`}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--primary-blue)] hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Eye size={16} />
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
