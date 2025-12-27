'use client';

import React from 'react';
import { BookOpen, Users, FileCheck, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface ClassInfo {
    id: string;
    name: string;
    students: number;
    subject: string;
}

interface GradeActivity {
    id: string;
    class: string;
    subject: string;
    type: string;
    submittedDate: string;
    status: 'submitted' | 'pending' | 'overdue';
}

interface TeacherAcademicTabProps {
    classes: ClassInfo[];
    gradeActivities: GradeActivity[];
    totalSubmissions: number;
    pendingSubmissions: number;
    engagementScore: number;
}

const statusBadgeVariant = {
    submitted: 'success',
    pending: 'warning',
    overdue: 'error',
} as const;

const statusLabels = {
    submitted: 'Submitted',
    pending: 'Pending',
    overdue: 'Overdue',
};

export default function TeacherAcademicTab({
    classes,
    gradeActivities,
    totalSubmissions,
    pendingSubmissions,
    engagementScore
}: TeacherAcademicTabProps) {
    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Classes Handled */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <Users size={18} className="text-[var(--primary-blue)]" />
                    Classes Handled
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {classes.map((cls) => (
                        <div key={cls.id} className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-[var(--text-dark)]">{cls.name}</p>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                    {cls.students} students
                                </span>
                            </div>
                            <p className="text-xs text-[var(--text-grey)]">{cls.subject}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Academic Summary */}
            <div className="space-y-4">
                <div className="card">
                    <h3 className="text-sm font-medium text-[var(--text-grey)] mb-3">Engagement Score</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                                <circle
                                    cx="32" cy="32" r="28"
                                    stroke="#7C4DFF"
                                    strokeWidth="6" fill="none"
                                    strokeDasharray={`${(engagementScore / 100) * 175.9} 175.9`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold text-[var(--text-dark)]">{engagementScore}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-[var(--text-dark)]">{engagementScore}%</p>
                            <p className="text-xs text-[var(--text-grey)]">Active</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex justify-between mb-3">
                        <div className="text-center flex-1">
                            <p className="text-2xl font-semibold text-green-500">{totalSubmissions}</p>
                            <p className="text-xs text-[var(--text-grey)]">Submitted</p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="text-center flex-1">
                            <p className="text-2xl font-semibold text-orange-500">{pendingSubmissions}</p>
                            <p className="text-xs text-[var(--text-grey)]">Pending</p>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--text-grey)] text-center">Grade Submissions</p>
                </div>
            </div>

            {/* Grade Submission Activity */}
            <div className="card col-span-3">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <FileCheck size={18} className="text-[var(--primary-blue)]" />
                    Grade Submission Activity
                </h3>
                <div className="space-y-3">
                    {gradeActivities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <BookOpen size={18} className="text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{activity.class} - {activity.subject}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{activity.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-[var(--text-grey)]">{activity.submittedDate}</span>
                                <StatusBadge variant={statusBadgeVariant[activity.status]}>
                                    {statusLabels[activity.status]}
                                </StatusBadge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
