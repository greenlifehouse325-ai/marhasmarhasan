'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import Link from 'next/link';

export interface Student {
    id: string;
    name: string;
    studentId: string;
    class: string;
    photo?: string;
    attendanceStatus: 'present' | 'absent' | 'late' | 'excused';
    taskStatus: 'complete' | 'pending' | 'overdue';
    paymentStatus: 'paid' | 'due' | 'overdue';
    accountStatus: 'active' | 'limited' | 'blocked';
}

interface StudentTableProps {
    students: Student[];
}

const attendanceBadgeVariant = {
    present: 'success',
    absent: 'error',
    late: 'warning',
    excused: 'info',
} as const;

const attendanceLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    excused: 'Excused',
};

const taskBadgeVariant = {
    complete: 'success',
    pending: 'warning',
    overdue: 'error',
} as const;

const taskLabels = {
    complete: 'Complete',
    pending: 'Pending',
    overdue: 'Overdue',
};

const paymentBadgeVariant = {
    paid: 'success',
    due: 'warning',
    overdue: 'error',
} as const;

const paymentLabels = {
    paid: 'Paid',
    due: 'Due',
    overdue: 'Overdue',
};

const accountBadgeVariant = {
    active: 'success',
    limited: 'warning',
    blocked: 'error',
} as const;

const accountLabels = {
    active: 'Active',
    limited: 'Limited',
    blocked: 'Blocked',
};

export default function StudentTable({ students }: StudentTableProps) {
    return (
        <div className="card p-0 overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-6 py-4">
                            Student
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Class
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Attendance
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Tasks
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-4">
                            Payment
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
                    {students.map((student) => (
                        <tr
                            key={student.id}
                            className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
                        >
                            {/* Student */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-dark)]">{student.name}</p>
                                        <p className="text-xs text-[var(--text-grey)]">{student.studentId}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Class */}
                            <td className="px-4 py-4">
                                <span className="text-sm text-[var(--text-dark)]">{student.class}</span>
                            </td>

                            {/* Attendance */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={attendanceBadgeVariant[student.attendanceStatus]}>
                                    {attendanceLabels[student.attendanceStatus]}
                                </StatusBadge>
                            </td>

                            {/* Tasks */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={taskBadgeVariant[student.taskStatus]}>
                                    {taskLabels[student.taskStatus]}
                                </StatusBadge>
                            </td>

                            {/* Payment */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={paymentBadgeVariant[student.paymentStatus]}>
                                    {paymentLabels[student.paymentStatus]}
                                </StatusBadge>
                            </td>

                            {/* Account */}
                            <td className="px-4 py-4">
                                <StatusBadge variant={accountBadgeVariant[student.accountStatus]}>
                                    {accountLabels[student.accountStatus]}
                                </StatusBadge>
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 text-right">
                                <Link
                                    href={`/students/${student.id}`}
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
