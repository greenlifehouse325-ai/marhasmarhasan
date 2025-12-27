'use client';

import React from 'react';
import { Edit, Lock, MoreHorizontal } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface TeacherHeaderProps {
    teacher: {
        id: string;
        name: string;
        teacherId: string;
        department: string;
        subject: string;
        photo?: string;
        accountStatus: 'active' | 'limited' | 'suspended';
        email?: string;
    };
    onEdit?: () => void;
    onSuspend?: () => void;
    onMore?: () => void;
}

const accountBadgeVariant = {
    active: 'success',
    limited: 'warning',
    suspended: 'error',
} as const;

const accountLabels = {
    active: 'Active',
    limited: 'Limited Access',
    suspended: 'Suspended',
};

export default function TeacherHeader({ teacher, onEdit, onSuspend, onMore }: TeacherHeaderProps) {
    return (
        <div className="card flex items-center justify-between p-6">
            {/* Left: Teacher Info */}
            <div className="flex items-center gap-5">
                {/* Photo */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                {/* Info */}
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-xl font-semibold text-[var(--text-dark)]">{teacher.name}</h1>
                        <StatusBadge variant={accountBadgeVariant[teacher.accountStatus]} size="md">
                            {accountLabels[teacher.accountStatus]}
                        </StatusBadge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-grey)]">
                        <span>ID: {teacher.teacherId}</span>
                        <span>•</span>
                        <span>{teacher.department}</span>
                        <span>•</span>
                        <span>{teacher.subject}</span>
                        {teacher.email && (
                            <>
                                <span>•</span>
                                <span>{teacher.email}</span>
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
                    Edit Profile
                </button>
                <button
                    onClick={onSuspend}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                >
                    <Lock size={16} />
                    {teacher.accountStatus === 'suspended' ? 'Reactivate' : 'Suspend'}
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
