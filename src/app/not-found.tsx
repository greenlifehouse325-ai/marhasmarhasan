/**
 * Global 404 Not Found Page
 * SMK Marhas Admin Dashboard
 * 
 * Branded error page dengan navigasi dan animasi premium
 */

import Link from 'next/link';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Animated 404 Illustration */}
                <div className="relative mb-8">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />

                    {/* 404 Number */}
                    <div className="relative">
                        <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] leading-none select-none animate-pulse">
                            404
                        </h1>
                        {/* Floating Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[var(--bg-card)] rounded-2xl shadow-xl flex items-center justify-center border border-[var(--border-light)]">
                            <Search size={32} className="text-[var(--text-muted)]" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-md mx-auto">
                        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                        Silakan periksa URL atau kembali ke beranda.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl font-semibold transition-all duration-200 hover:bg-[var(--bg-hover)]"
                    >
                        <ArrowLeft size={18} />
                        Halaman Sebelumnya
                    </button>
                </div>

                {/* Help Link */}
                <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
                    <p className="text-sm text-[var(--text-muted)]">
                        Butuh bantuan?{' '}
                        <Link
                            href="#"
                            className="text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] font-medium inline-flex items-center gap-1"
                        >
                            <HelpCircle size={14} />
                            Laporkan Masalah
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
