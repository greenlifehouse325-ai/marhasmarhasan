'use client';

import React from 'react';
import { Edit, Lock, MoreHorizontal } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface ParentHeaderProps {
    parent: {
        id: string;
        name: string;
        email: string;
        phone: string;
        relation: string;
        accountStatus: 'active' | 'limited' | 'blocked';
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

export default function ParentHeader({ parent, onEdit, onBlock, onMore }: ParentHeaderProps) {
    return (
        <div className="card p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Left: Parent Info */}
                <div className="flex items-center gap-4 md:gap-5">
                    {/* Photo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg shadow-orange-500/25 flex-shrink-0">
                        {parent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>

                    {/* Info */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                            <h1 className="text-lg md:text-xl font-semibold text-[var(--text-dark)]">{parent.name}</h1>
                            <StatusBadge variant={accountBadgeVariant[parent.accountStatus]} size="md">
                                {accountLabels[parent.accountStatus]}
                            </StatusBadge>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-[var(--text-grey)]">
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium">{parent.relation}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{parent.email}</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">{parent.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={onEdit}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
                    >
                        <Edit size={16} />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={onBlock}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                    >
                        <Lock size={16} />
                        <span>{parent.accountStatus === 'blocked' ? 'Unblock' : 'Block'}</span>
                    </button>
                    <button
                        onClick={onMore}
                        className="w-10 h-10 flex items-center justify-center text-[var(--text-grey)] hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
