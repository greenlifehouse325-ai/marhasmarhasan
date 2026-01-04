/**
 * Dashboard 404 Not Found Page
 * SMK Marhas Admin Dashboard
 * 
 * 404 page khusus untuk area dashboard dengan quick links
 */

import Link from 'next/link';
import { Home, ArrowLeft, Search, LayoutDashboard, Users, BookOpen, Wallet } from 'lucide-react';

export default function DashboardNotFound() {
    const quickLinks = [
        { href: '/super-admin', label: 'Dashboard', icon: LayoutDashboard, color: '#7C3AED' },
        { href: '/siswa', label: 'Data Siswa', icon: Users, color: '#3B82F6' },
        { href: '/perpustakaan', label: 'Perpustakaan', icon: BookOpen, color: '#10B981' },
        { href: '/keuangan', label: 'Keuangan', icon: Wallet, color: '#F59E0B' },
    ];

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full" />

                    <div className="relative">
                        <h1 className="text-[120px] md:text-[160px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] leading-none select-none">
                            404
                        </h1>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--bg-card)] rounded-2xl shadow-lg flex items-center justify-center border border-[var(--border-light)]">
                            <Search size={28} className="text-[var(--text-muted)]" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
                        Halaman yang Anda cari mungkin sudah dipindahkan atau belum tersedia.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="mb-8">
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-4">
                        Akses Cepat:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group flex flex-col items-center gap-2 p-4 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: link.color }}
                                >
                                    <link.icon size={20} />
                                </div>
                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/super-admin"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-all duration-200 text-sm"
                    >
                        <Home size={16} />
                        Ke Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl font-medium transition-all duration-200 hover:bg-[var(--bg-hover)] text-sm"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}
