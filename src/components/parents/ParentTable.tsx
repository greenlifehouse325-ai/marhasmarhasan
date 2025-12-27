'use client';

import React, { memo } from 'react';
import { Eye } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import Link from 'next/link';

export interface Parent {
    id: string;
    name: string;
    email: string;
    phone: string;
    linkedStudents: string[];
    contactStatus: 'verified' | 'pending' | 'unverified';
    paymentStatus: 'good' | 'issues' | 'overdue';
    accountStatus: 'active' | 'limited' | 'blocked';
}

interface ParentTableProps {
    parents: Parent[];
}

const contactBadgeVariant = {
    verified: 'success',
    pending: 'warning',
    unverified: 'neutral',
} as const;

const contactLabels = {
    verified: 'Verified',
    pending: 'Pending',
    unverified: 'Unverified',
};

const paymentBadgeVariant = {
    good: 'success',
    issues: 'warning',
    overdue: 'error',
} as const;

const paymentLabels = {
    good: 'Good',
    issues: 'Issues',
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

const ParentRow = memo(function ParentRow({ parent }: { parent: Parent }) {
    return (
        <tr className="border-b border-gray-50 hover:bg-amber-50/50 transition-colors">
            {/* Parent */}
            <td className="px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-medium text-sm shadow-md flex-shrink-0">
                        {parent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-dark)] truncate">{parent.name}</p>
                        <p className="text-xs text-[var(--text-grey)] truncate">{parent.email}</p>
                    </div>
                </div>
            </td>

            {/* Linked Students - hidden on mobile */}
            <td className="px-4 py-3 md:py-4 hidden sm:table-cell">
                <div className="flex items-center gap-1">
                    {parent.linkedStudents.slice(0, 2).map((student, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                            {student}
                        </span>
                    ))}
                    {parent.linkedStudents.length > 2 && (
                        <span className="text-xs text-gray-500">+{parent.linkedStudents.length - 2}</span>
                    )}
                </div>
            </td>

            {/* Contact - hidden on small screens */}
            <td className="px-4 py-3 md:py-4 hidden md:table-cell">
                <StatusBadge variant={contactBadgeVariant[parent.contactStatus]}>
                    {contactLabels[parent.contactStatus]}
                </StatusBadge>
            </td>

            {/* Payment - hidden on small screens */}
            <td className="px-4 py-3 md:py-4 hidden lg:table-cell">
                <StatusBadge variant={paymentBadgeVariant[parent.paymentStatus]}>
                    {paymentLabels[parent.paymentStatus]}
                </StatusBadge>
            </td>

            {/* Account */}
            <td className="px-4 py-3 md:py-4 hidden sm:table-cell">
                <StatusBadge variant={accountBadgeVariant[parent.accountStatus]}>
                    {accountLabels[parent.accountStatus]}
                </StatusBadge>
            </td>

            {/* Action */}
            <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                <Link
                    href={`/parents/${parent.id}`}
                    className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                >
                    <Eye size={14} />
                    <span className="hidden sm:inline">View</span>
                </Link>
            </td>
        </tr>
    );
});

function ParentTableComponent({ parents }: ParentTableProps) {
    return (
        <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 md:px-6 py-3 md:py-4">
                                Parent
                            </th>
                            <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-3 md:py-4 hidden sm:table-cell">
                                Students
                            </th>
                            <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-3 md:py-4 hidden md:table-cell">
                                Contact
                            </th>
                            <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-3 md:py-4 hidden lg:table-cell">
                                Payment
                            </th>
                            <th className="text-left text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 py-3 md:py-4 hidden sm:table-cell">
                                Account
                            </th>
                            <th className="text-right text-xs font-medium text-[var(--text-grey)] uppercase tracking-wider px-4 md:px-6 py-3 md:py-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {parents.map((parent) => (
                            <ParentRow key={parent.id} parent={parent} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const ParentTable = memo(ParentTableComponent);
ParentTable.displayName = 'ParentTable';

export default ParentTable;
