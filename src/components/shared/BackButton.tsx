/**
 * Back Button Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen tombol kembali yang reusable dengan dukungan navigasi router
 * dan styling yang konsisten dengan design system
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    /**
     * URL tujuan ketika diklik. Jika tidak disediakan, akan menggunakan router.back()
     */
    href?: string;
    /**
     * Label yang ditampilkan di samping icon
     * @default "Kembali"
     */
    label?: string;
    /**
     * Apakah hanya menampilkan icon tanpa label
     * @default false
     */
    iconOnly?: boolean;
    /**
     * Variant styling tombol
     * @default "ghost"
     */
    variant?: 'ghost' | 'outline' | 'solid';
    /**
     * Custom className tambahan
     */
    className?: string;
}

export function BackButton({
    href,
    label = 'Kembali',
    iconOnly = false,
    variant = 'ghost',
    className = ''
}: BackButtonProps) {
    const router = useRouter();

    const baseStyles = 'inline-flex items-center gap-2 rounded-xl text-sm font-medium transition-all duration-200';

    const variantStyles = {
        ghost: 'px-3 py-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
        outline: 'px-4 py-2 border border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-medium)]',
        solid: 'px-4 py-2 bg-[var(--bg-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-active)]'
    };

    const iconOnlyStyles = iconOnly ? 'p-2' : '';

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${iconOnlyStyles} ${className}`;

    const content = (
        <>
            <ArrowLeft size={18} />
            {!iconOnly && <span>{label}</span>}
        </>
    );

    // Jika href disediakan, gunakan Link untuk navigasi
    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {content}
            </Link>
        );
    }

    // Jika tidak ada href, gunakan router.back()
    return (
        <button
            type="button"
            onClick={() => router.back()}
            className={combinedStyles}
        >
            {content}
        </button>
    );
}

export default BackButton;
