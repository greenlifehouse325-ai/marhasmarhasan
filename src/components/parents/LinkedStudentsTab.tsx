'use client';

import React from 'react';
import { Users, GraduationCap } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface Student {
    id: string;
    name: string;
    studentId: string;
    class: string;
    relation: string;
    attendanceRate: number;
    paymentStatus: 'paid' | 'due' | 'overdue';
}

interface LinkedStudentsTabProps {
    students: Student[];
}

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

export default function LinkedStudentsTab({ students }: LinkedStudentsTabProps) {
    return (
        <div className="card">
            <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                <Users size={18} className="text-amber-500" />
                Linked Students ({students.length})
            </h3>

            <div className="space-y-3">
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium shadow-md">
                                    {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{student.name}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className="text-xs text-[var(--text-grey)]">{student.studentId}</span>
                                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{student.class}</span>
                                        <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full">{student.relation}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="text-center">
                                    <p className="text-lg font-semibold text-[var(--text-dark)]">{student.attendanceRate}%</p>
                                    <p className="text-xs text-[var(--text-grey)]">Attendance</p>
                                </div>
                                <StatusBadge variant={paymentBadgeVariant[student.paymentStatus]}>
                                    SPP {paymentLabels[student.paymentStatus]}
                                </StatusBadge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {students.length === 0 && (
                <div className="text-center py-12 text-[var(--text-grey)]">
                    <GraduationCap size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No linked students found</p>
                </div>
            )}
        </div>
    );
}
