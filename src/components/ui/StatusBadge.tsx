'use client';

import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';

interface StatusBadgeProps {
    variant: BadgeVariant;
    children: React.ReactNode;
    size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    neutral: 'bg-gray-100 text-gray-700',
    purple: 'bg-purple-100 text-purple-700',
};

export default function StatusBadge({ variant, children, size = 'sm' }: StatusBadgeProps) {
    const sizeStyles = size === 'sm'
        ? 'px-2.5 py-0.5 text-xs'
        : 'px-3 py-1 text-sm';

    return (
        <span className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles}`}>
            {children}
        </span>
    );
}
