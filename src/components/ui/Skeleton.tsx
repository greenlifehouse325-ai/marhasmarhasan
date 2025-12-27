'use client';

import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-xl ${className}`} />
    );
}

export function StatCardSkeleton() {
    return (
        <div className="card p-4 md:p-5 flex items-center gap-3 md:gap-4">
            <Skeleton className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-6 md:h-8 w-16" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <tr className="border-b border-gray-50">
            <td className="px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 md:py-4 hidden sm:table-cell"><Skeleton className="h-4 w-24" /></td>
            <td className="px-4 py-3 md:py-4 hidden md:table-cell"><Skeleton className="h-6 w-16 rounded-full" /></td>
            <td className="px-4 py-3 md:py-4 hidden lg:table-cell"><Skeleton className="h-6 w-16 rounded-full" /></td>
            <td className="px-4 md:px-6 py-3 md:py-4"><Skeleton className="h-8 w-16" /></td>
        </tr>
    );
}

export function CardSkeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`card p-4 md:p-6 space-y-4 ${className}`}>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
}

export function ContentSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {[...Array(5)].map((_, i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>
            <CardSkeleton />
        </div>
    );
}
