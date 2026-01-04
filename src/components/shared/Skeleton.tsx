/**
 * Skeleton Loading Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen reusable untuk menampilkan loading state
 * dengan animasi shimmer yang smooth
 */

'use client';

import React from 'react';

// ============================================
// BASE SKELETON
// ============================================

interface SkeletonProps {
    /** Lebar skeleton (CSS value) */
    width?: string | number;
    /** Tinggi skeleton (CSS value) */
    height?: string | number;
    /** Border radius */
    borderRadius?: string | number;
    /** Custom className */
    className?: string;
    /** Animasi enabled */
    animate?: boolean;
}

export function Skeleton({
    width = '100%',
    height = '1rem',
    borderRadius = '0.5rem',
    className = '',
    animate = true
}: SkeletonProps) {
    const widthValue = typeof width === 'number' ? `${width}px` : width;
    const heightValue = typeof height === 'number' ? `${height}px` : height;
    const radiusValue = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

    return (
        <div
            className={`skeleton-base ${animate ? 'skeleton-shimmer' : ''} ${className}`}
            style={{
                width: widthValue,
                height: heightValue,
                borderRadius: radiusValue
            }}
        />
    );
}

// ============================================
// SKELETON VARIANTS
// ============================================

/** Skeleton untuk text/paragraph */
export function SkeletonText({
    lines = 3,
    className = ''
}: {
    lines?: number;
    className?: string;
}) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    height="0.875rem"
                    width={i === lines - 1 ? '70%' : '100%'}
                />
            ))}
        </div>
    );
}

/** Skeleton untuk avatar/profile image */
export function SkeletonAvatar({
    size = 40,
    className = ''
}: {
    size?: number;
    className?: string;
}) {
    return (
        <Skeleton
            width={size}
            height={size}
            borderRadius="50%"
            className={className}
        />
    );
}

/** Skeleton untuk card/widget */
export function SkeletonCard({
    className = ''
}: {
    className?: string;
}) {
    return (
        <div className={`bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-5 ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <SkeletonAvatar size={48} />
                <div className="flex-1">
                    <Skeleton height="1rem" width="60%" className="mb-2" />
                    <Skeleton height="0.75rem" width="40%" />
                </div>
            </div>
            <SkeletonText lines={2} />
        </div>
    );
}

/** Skeleton untuk stat widget */
export function SkeletonStat({
    className = ''
}: {
    className?: string;
}) {
    return (
        <div className={`bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-5 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <Skeleton height="0.75rem" width="50%" />
                <Skeleton height={32} width={32} borderRadius="0.75rem" />
            </div>
            <Skeleton height="2rem" width="40%" className="mb-2" />
            <Skeleton height="0.625rem" width="30%" />
        </div>
    );
}

/** Skeleton untuk table row */
export function SkeletonTableRow({
    columns = 5,
    className = ''
}: {
    columns?: number;
    className?: string;
}) {
    return (
        <div className={`flex items-center gap-4 py-3 px-4 border-b border-[var(--border-light)] ${className}`}>
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton
                    key={i}
                    height="0.875rem"
                    width={i === 0 ? '30%' : i === columns - 1 ? '15%' : '20%'}
                />
            ))}
        </div>
    );
}

/** Skeleton untuk table lengkap */
export function SkeletonTable({
    rows = 5,
    columns = 5,
    className = ''
}: {
    rows?: number;
    columns?: number;
    className?: string;
}) {
    return (
        <div className={`bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-4 py-3 px-4 bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton
                        key={i}
                        height="0.75rem"
                        width={i === 0 ? '25%' : '15%'}
                    />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <SkeletonTableRow key={i} columns={columns} />
            ))}
        </div>
    );
}

/** Skeleton untuk chart */
export function SkeletonChart({
    type = 'bar',
    className = ''
}: {
    type?: 'bar' | 'line' | 'pie';
    className?: string;
}) {
    if (type === 'pie') {
        return (
            <div className={`flex items-center justify-center p-8 ${className}`}>
                <Skeleton width={180} height={180} borderRadius="50%" />
            </div>
        );
    }

    return (
        <div className={`bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-5 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <Skeleton height="1.25rem" width="40%" />
                <Skeleton height="2rem" width="6rem" borderRadius="0.5rem" />
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        width="100%"
                        height={`${Math.random() * 60 + 40}%`}
                        borderRadius="0.375rem 0.375rem 0 0"
                    />
                ))}
            </div>
        </div>
    );
}

/** Skeleton untuk page header */
export function SkeletonPageHeader({
    className = ''
}: {
    className?: string;
}) {
    return (
        <div className={`flex items-center justify-between mb-6 ${className}`}>
            <div>
                <Skeleton height="1.75rem" width="200px" className="mb-2" />
                <Skeleton height="0.875rem" width="300px" />
            </div>
            <Skeleton height="2.5rem" width="140px" borderRadius="0.75rem" />
        </div>
    );
}

// ============================================
// SKELETON DASHBOARD PRESET
// ============================================

/** Skeleton untuk dashboard layout */
export function SkeletonDashboard() {
    return (
        <div className="space-y-6">
            <SkeletonPageHeader />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SkeletonChart type="bar" />
                <SkeletonChart type="line" />
            </div>

            {/* Table */}
            <SkeletonTable rows={5} columns={5} />
        </div>
    );
}

export default Skeleton;
