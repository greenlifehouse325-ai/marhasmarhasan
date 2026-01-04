/**
 * Coming Soon Component
 * SMK Marhas Admin Dashboard
 * 
 * Placeholder untuk halaman yang sedang dalam pengembangan
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
    Construction,
    ArrowLeft,
    Clock,
    Sparkles,
    Bell
} from 'lucide-react';

interface ComingSoonProps {
    /** Nama fitur yang sedang dikembangkan */
    featureName?: string;
    /** Deskripsi singkat fitur */
    description?: string;
    /** Estimasi waktu rilis (opsional) */
    estimatedRelease?: string;
    /** URL untuk kembali */
    backHref?: string;
    /** Label tombol kembali */
    backLabel?: string;
    /** Tampilkan tombol notifikasi */
    showNotifyButton?: boolean;
    /** Custom className */
    className?: string;
}

export function ComingSoon({
    featureName = 'Fitur Baru',
    description = 'Kami sedang bekerja keras untuk menghadirkan fitur ini. Pantau terus untuk update terbaru!',
    estimatedRelease,
    backHref,
    backLabel = 'Kembali',
    showNotifyButton = false,
    className = ''
}: ComingSoonProps) {
    return (
        <div className={`min-h-[60vh] flex items-center justify-center p-4 ${className}`}>
            <div className="max-w-lg w-full text-center">
                {/* Animated Illustration */}
                <div className="relative mb-8">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-3xl rounded-full" />

                    {/* Icon Container */}
                    <div className="relative mx-auto w-28 h-28 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                        <Construction size={56} className="text-amber-600 dark:text-amber-400" />

                        {/* Floating Sparkle */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--bg-card)] rounded-xl shadow-md flex items-center justify-center border border-[var(--border-light)] animate-bounce">
                            <Sparkles size={16} className="text-amber-500" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                        {featureName}
                    </h2>
                    <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
                        {description}
                    </p>

                    {/* Estimated Release */}
                    {estimatedRelease && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-hover)] rounded-full text-sm">
                            <Clock size={14} className="text-[var(--text-muted)]" />
                            <span className="text-[var(--text-secondary)]">
                                Estimasi: <span className="font-medium">{estimatedRelease}</span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Progress Indicator */}
                <div className="mb-8 px-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-[var(--text-muted)]">Progress</span>
                        <span className="text-xs font-semibold text-amber-600">In Development</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"
                            style={{ width: '35%' }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-all duration-200 text-sm"
                        >
                            <ArrowLeft size={16} />
                            {backLabel}
                        </Link>
                    )}

                    {showNotifyButton && (
                        <button
                            onClick={() => alert('Fitur notifikasi akan segera tersedia!')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl font-medium transition-all duration-200 hover:bg-[var(--bg-hover)] text-sm"
                        >
                            <Bell size={16} />
                            Beritahu Saya
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ComingSoon;
