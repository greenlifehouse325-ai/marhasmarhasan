/**
 * Global Error Page
 * SMK Marhas Admin Dashboard
 * 
 * Error boundary untuk menangani unexpected errors
 */

'use client';

import { useEffect } from 'react';
import { Home, RefreshCw, AlertTriangle, Bug } from 'lucide-react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error untuk debugging (bisa diintegrasikan dengan Sentry/LogRocket)
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Error Illustration */}
                <div className="relative mb-8">
                    {/* Background Glow - Red */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full" />

                    {/* Icon Container */}
                    <div className="relative mx-auto w-32 h-32 bg-[var(--danger-bg)] rounded-3xl flex items-center justify-center mb-6">
                        <AlertTriangle size={64} className="text-[var(--danger)]" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                        Terjadi Kesalahan
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-md mx-auto">
                        Maaf, terjadi kesalahan yang tidak terduga.
                        Tim kami telah diberitahu dan sedang memperbaikinya.
                    </p>

                    {/* Error Details (Development only) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-4 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl text-left">
                            <p className="text-xs font-mono text-[var(--text-muted)] break-all">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="text-xs text-[var(--text-muted)] mt-2">
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                        <RefreshCw size={18} />
                        Coba Lagi
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl font-semibold transition-all duration-200 hover:bg-[var(--bg-hover)]"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </a>
                </div>

                {/* Report Bug Link */}
                <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
                    <p className="text-sm text-[var(--text-muted)]">
                        Masalah berlanjut?{' '}
                        <a
                            href="#"
                            className="text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] font-medium inline-flex items-center gap-1"
                        >
                            <Bug size={14} />
                            Laporkan Bug
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
