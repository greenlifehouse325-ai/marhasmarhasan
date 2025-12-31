/**
 * Login Page - Redesigned
 * SMK Marhas Admin Dashboard
 * 
 * Elegant minimal design with dark mode support
 * Single brand color scheme for professional look
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    AlertCircle,
    Loader2,
    Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIGS } from '@/types/admin';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error, isAuthenticated, user } = useAuth();

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            const roleConfig = ROLE_CONFIGS[user.role];
            router.replace(roleConfig.basePath);
        }
    }, [isAuthenticated, user, router]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        setIsSubmitting(true);

        try {
            const response = await login({ email, password, rememberDevice });

            if (response.success) {
                if (response.requiresOTP) {
                    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
                } else if (response.user) {
                    const roleConfig = ROLE_CONFIGS[response.user.role];
                    router.push(roleConfig.basePath);
                }
            } else {
                setLocalError(response.error || 'Login gagal');
            }
        } catch {
            setLocalError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayError = localError || error;

    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex transition-colors duration-300">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <span className="text-xl font-bold">M</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">SMK MARHAS</h1>
                            <p className="text-sm text-white/60">Margahayu, Bandung</p>
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="max-w-lg">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                            <Sparkles size={16} className="text-blue-400" />
                            <span className="text-sm font-medium">Admin Dashboard</span>
                        </div>

                        <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                            Sistem Manajemen
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Sekolah Terpadu
                            </span>
                        </h2>

                        <p className="text-lg text-white/70 leading-relaxed">
                            Platform terpadu untuk mengelola perpustakaan, keuangan, absensi,
                            jadwal, dan aplikasi sekolah dalam satu dashboard.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-8 mt-10">
                            <div>
                                <p className="text-3xl font-bold">6</p>
                                <p className="text-sm text-white/60">Modul Admin</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">100%</p>
                                <p className="text-sm text-white/60">Digital</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">24/7</p>
                                <p className="text-sm text-white/60">Akses</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-sm text-white/40">
                        <p>© 2024 Yayasan Pendidikan Marhamah Hasanah</p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Theme Toggle */}
                    <div className="flex justify-end mb-8">
                        <ThemeToggle variant="dropdown" />
                    </div>

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center">
                            <span className="text-xl font-bold text-white">M</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">SMK MARHAS</h1>
                            <p className="text-xs text-[var(--text-muted)]">Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Welcome */}
                    <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-2">
                            Selamat Datang
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            Masuk ke akun admin Anda untuk melanjutkan
                        </p>
                    </div>

                    {/* Error Alert */}
                    {displayError && (
                        <div className="mb-6 p-4 bg-[var(--danger-bg)] border border-[var(--danger)]/20 rounded-xl flex items-start gap-3 animate-fadeIn">
                            <AlertCircle size={20} className="text-[var(--danger)] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-[var(--danger)]">Login Gagal</p>
                                <p className="text-sm text-[var(--danger)]/80">{displayError}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-[var(--text-muted)]" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@marhas.sch.id"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)]">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-[var(--brand-primary)] hover:underline font-medium"
                                    onClick={() => router.push('/forgot-password')}
                                >
                                    Lupa Password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-[var(--text-muted)]" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Device */}
                        <div className="flex items-center gap-3">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberDevice}
                                onChange={(e) => setRememberDevice(e.target.checked)}
                                className="w-4 h-4 rounded border-[var(--border-medium)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/20 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-[var(--text-secondary)] cursor-pointer">
                                Ingat perangkat ini
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="w-full py-3.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[var(--brand-primary)]/20"
                        >
                            {(isSubmitting || isLoading) ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Accounts */}
                    <div className="mt-8 p-4 bg-[var(--bg-hover)] rounded-xl border border-[var(--border-light)]">
                        <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                            Akun Demo (6 Role Admin)
                        </p>
                        <div className="space-y-2">
                            <AccountRow email="superadmin@marhas.sch.id" password="SuperAdmin123!" role="Super Admin" color="#8B5CF6" />
                            <AccountRow email="perpus@marhas.sch.id" password="Perpus123!" role="Perpustakaan" color="#10B981" />
                            <AccountRow email="keuangan@marhas.sch.id" password="Keuangan123!" role="Keuangan" color="#F59E0B" />
                            <AccountRow email="absensi@marhas.sch.id" password="Absensi123!" role="Absensi" color="#3B82F6" />
                            <AccountRow email="jadwal@marhas.sch.id" password="Jadwal123!" role="Jadwal" color="#EC4899" />
                            <AccountRow email="aplikasi@marhas.sch.id" password="Aplikasi123!" role="Aplikasi" color="#6366F1" />
                        </div>
                        <div className="mt-4 pt-3 border-t border-[var(--border-light)]">
                            <p className="text-xs text-[var(--text-muted)]">
                                Format password: <code className="font-mono bg-[var(--bg-active)] px-1 rounded">[Role]123!</code>
                            </p>
                        </div>
                    </div>

                    {/* Help */}
                    <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
                        Butuh bantuan?{' '}
                        <a href="#" className="text-[var(--brand-primary)] hover:underline">
                            Hubungi IT Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

function AccountRow({ email, password, role, color }: { email: string; password: string; role: string; color: string }) {
    return (
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--bg-active)] hover:ring-2 hover:ring-[var(--brand-primary)]/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between gap-2">
                <span className="text-[var(--text-primary)] font-mono text-sm">{email}</span>
                <span
                    className="text-xs px-2 py-0.5 rounded-full text-white font-medium shrink-0"
                    style={{ backgroundColor: color }}
                >
                    {role}
                </span>
            </div>
            <div className="text-xs text-[var(--text-muted)]">
                Password: <code className="font-mono text-[var(--text-secondary)] bg-[var(--bg-hover)] px-1.5 py-0.5 rounded">{password}</code>
            </div>
        </div>
    );
}
