/**
 * Empty State Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen untuk menampilkan state kosong pada list/tabel
 * dengan ilustrasi, pesan, dan optional call-to-action
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
    FileText,
    Search,
    Users,
    BookOpen,
    Calendar,
    Inbox,
    FolderOpen,
    AlertCircle,
    Plus
} from 'lucide-react';

// Preset illustrations berdasarkan tipe konten
const ILLUSTRATIONS = {
    default: Inbox,
    search: Search,
    data: FileText,
    users: Users,
    books: BookOpen,
    schedule: Calendar,
    files: FolderOpen,
    error: AlertCircle
} as const;

type IllustrationType = keyof typeof ILLUSTRATIONS;

interface EmptyStateProps {
    /**
     * Judul pesan empty state
     * @default "Tidak ada data"
     */
    title?: string;
    /**
     * Deskripsi tambahan
     */
    description?: string;
    /**
     * Tipe ilustrasi yang digunakan
     * @default "default"
     */
    illustration?: IllustrationType;
    /**
     * Custom icon jika tidak ingin menggunakan preset
     */
    customIcon?: React.ReactNode;
    /**
     * Teks untuk tombol action
     */
    actionLabel?: string;
    /**
     * URL tujuan action button
     */
    actionHref?: string;
    /**
     * Handler untuk action button (jika tidak menggunakan href)
     */
    onAction?: () => void;
    /**
     * Ukuran komponen
     * @default "md"
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Custom className
     */
    className?: string;
}

export function EmptyState({
    title = 'Tidak ada data',
    description,
    illustration = 'default',
    customIcon,
    actionLabel,
    actionHref,
    onAction,
    size = 'md',
    className = ''
}: EmptyStateProps) {
    const Icon = ILLUSTRATIONS[illustration];

    const sizeStyles = {
        sm: {
            container: 'py-8',
            iconSize: 40,
            iconWrapper: 'w-16 h-16',
            title: 'text-base',
            description: 'text-xs',
            button: 'px-3 py-1.5 text-xs'
        },
        md: {
            container: 'py-12',
            iconSize: 48,
            iconWrapper: 'w-20 h-20',
            title: 'text-lg',
            description: 'text-sm',
            button: 'px-4 py-2 text-sm'
        },
        lg: {
            container: 'py-16',
            iconSize: 56,
            iconWrapper: 'w-24 h-24',
            title: 'text-xl',
            description: 'text-base',
            button: 'px-5 py-2.5 text-sm'
        }
    };

    const styles = sizeStyles[size];

    const ActionButton = () => {
        if (!actionLabel) return null;

        const buttonClasses = `inline-flex items-center gap-2 ${styles.button} bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors`;

        if (actionHref) {
            return (
                <Link href={actionHref} className={buttonClasses}>
                    <Plus size={16} />
                    {actionLabel}
                </Link>
            );
        }

        if (onAction) {
            return (
                <button type="button" onClick={onAction} className={buttonClasses}>
                    <Plus size={16} />
                    {actionLabel}
                </button>
            );
        }

        return null;
    };

    return (
        <div className={`flex flex-col items-center justify-center text-center ${styles.container} ${className}`}>
            {/* Icon/Illustration */}
            <div className={`${styles.iconWrapper} rounded-2xl bg-[var(--bg-hover)] flex items-center justify-center mb-4`}>
                {customIcon || <Icon size={styles.iconSize} className="text-[var(--text-muted)]" />}
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-[var(--text-primary)] mb-1 ${styles.title}`}>
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className={`text-[var(--text-muted)] max-w-sm mb-4 ${styles.description}`}>
                    {description}
                </p>
            )}

            {/* Action Button */}
            <ActionButton />
        </div>
    );
}

/**
 * Preset untuk empty state hasil pencarian
 */
export function SearchEmptyState({
    searchQuery,
    onClear,
    className = ''
}: {
    searchQuery?: string;
    onClear?: () => void;
    className?: string;
}) {
    return (
        <EmptyState
            illustration="search"
            title="Tidak ada hasil"
            description={searchQuery ? `Tidak ditemukan hasil untuk "${searchQuery}"` : 'Coba ubah kata kunci pencarian'}
            actionLabel={onClear ? 'Hapus Filter' : undefined}
            onAction={onClear}
            className={className}
        />
    );
}

/**
 * Preset untuk empty state data tabel
 */
export function TableEmptyState({
    entityName = 'data',
    actionHref,
    actionLabel,
    className = ''
}: {
    entityName?: string;
    actionHref?: string;
    actionLabel?: string;
    className?: string;
}) {
    return (
        <EmptyState
            illustration="data"
            title={`Belum ada ${entityName}`}
            description={`${entityName.charAt(0).toUpperCase() + entityName.slice(1)} yang tersedia akan muncul di sini`}
            actionHref={actionHref}
            actionLabel={actionLabel || `Tambah ${entityName}`}
            className={className}
        />
    );
}

export default EmptyState;
