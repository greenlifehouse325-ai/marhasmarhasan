'use client';

import React from 'react';
import { ClipboardList, CheckCircle, Clock, XCircle } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface Task {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'complete' | 'pending' | 'overdue';
    grade?: string;
}

interface Grade {
    subject: string;
    grade: string;
    score: number;
}

interface TasksTabProps {
    tasks: Task[];
    grades: Grade[];
}

const statusIcons = {
    complete: <CheckCircle size={16} className="text-green-500" />,
    pending: <Clock size={16} className="text-orange-500" />,
    overdue: <XCircle size={16} className="text-red-500" />,
};

const statusLabels = {
    complete: 'Complete',
    pending: 'Pending',
    overdue: 'Overdue',
};

const statusBadgeVariant = {
    complete: 'success',
    pending: 'warning',
    overdue: 'error',
} as const;

export default function TasksTab({ tasks, grades }: TasksTabProps) {
    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Assignments List */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <ClipboardList size={18} className="text-[var(--primary-blue)]" />
                    Assignments
                </h3>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {statusIcons[task.status]}
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{task.title}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{task.subject} • Due: {task.dueDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {task.grade && (
                                    <span className="text-sm font-semibold text-[var(--primary-blue)]">{task.grade}</span>
                                )}
                                <StatusBadge variant={statusBadgeVariant[task.status]}>
                                    {statusLabels[task.status]}
                                </StatusBadge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grades Summary */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">Grade Summary</h3>
                <div className="space-y-4">
                    {grades.map((grade, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-[var(--text-grey)]">{grade.subject}</span>
                                <span className="text-sm font-semibold text-[var(--text-dark)]">{grade.grade}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all ${grade.score >= 80 ? 'bg-green-500' :
                                            grade.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${grade.score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Average */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-[var(--text-grey)]">Overall Average</span>
                        <span className="text-lg font-bold text-[var(--primary-blue)]">
                            {(grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
