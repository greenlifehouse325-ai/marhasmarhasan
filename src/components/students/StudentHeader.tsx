'use client';

import React from 'react';
import { Edit, Lock, MoreHorizontal } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface StudentHeaderProps {
    student: {
        id: string;
        name: string;
        studentId: string;
        class: string;
        photo?: string;
        accountStatus: 'active' | 'limited' | 'blocked';
        email?: string;
    };
    onEdit?: () => void;
    onBlock?: () => void;
    onMore?: () => void;
}

const accountBadgeVariant = {
    active: 'success',
    limited: 'warning',
    blocked: 'error',
} as const;

const accountLabels = {
    active: 'Active',
    limited: 'Limited Access',
    blocked: 'Blocked',
};

export default function StudentHeader({ student, onEdit, onBlock, onMore }: StudentHeaderProps) {
    return (
        <div className="card flex items-center justify-between p-6">
            {/* Left: Student Info */}
            <div className="flex items-center gap-5">
                {/* Photo */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                {/* Info */}
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-xl font-semibold text-[var(--text-dark)]">{student.name}</h1>
                        <StatusBadge variant={accountBadgeVariant[student.accountStatus]} size="md">
                            {accountLabels[student.accountStatus]}
                        </StatusBadge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-grey)]">
                        <span>ID: {student.studentId}</span>
                        <span>•</span>
                        <span>{student.class}</span>
                        {student.email && (
                            <>
                                <span>•</span>
                                <span>{student.email}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primary-blue)] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                    <Edit size={16} />
                    Edit Student
                </button>
                <button
                    onClick={onBlock}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                >
                    <Lock size={16} />
                    {student.accountStatus === 'blocked' ? 'Unblock' : 'Block'}
                </button>
                <button
                    onClick={onMore}
                    className="w-10 h-10 flex items-center justify-center text-[var(--text-grey)] hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <MoreHorizontal size={20} />
                </button>
            </div>
        </div>
    );
}
