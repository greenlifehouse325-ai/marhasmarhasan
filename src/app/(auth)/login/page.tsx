/**
 * Login Page
 * SMK Marhas Admin Dashboard
 * 
 * Halaman login dengan split layout:
 * - Kiri: Deskripsi aplikasi + branding
 * - Kanan: Form login
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Shield,
    BookOpen,
    Wallet,
    ClipboardCheck,
    Calendar,
    Smartphone,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIGS } from '@/types/admin';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error } = useAuth();

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
                    // Redirect ke halaman OTP verification
                    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
                } else if (response.user) {
                    // Redirect berdasarkan role
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
        <div className="flex w-full min-h-screen">
            {/* Left Panel - Description */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full" />
                    <div className="absolute bottom-40 right-10 w-96 h-96 border border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-white/20 rounded-full" />
                </div>

                {/* Logo & School Name */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <span className="text-2xl font-bold text-white">M</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">SMK MARHAS</h1>
                            <p className="text-sm text-white/70">Yayasan Pendidikan Marhamah Hasanah</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                        Dashboard Admin
                        <span className="block text-[#F7D611]">SMK Marhas</span>
                    </h2>
                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                        Sistem manajemen sekolah terpadu untuk mengelola perpustakaan, keuangan,
                        absensi, jadwal, dan aplikasi sekolah dalam satu platform.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <FeatureCard
                            icon={<BookOpen size={20} />}
                            title="Perpustakaan"
                            description="Kelola buku & peminjaman"
                            color="#10B981"
                        />
                        <FeatureCard
                            icon={<Wallet size={20} />}
                            title="Keuangan"
                            description="SPP & laporan keuangan"
                            color="#F59E0B"
                        />
                        <FeatureCard
                            icon={<ClipboardCheck size={20} />}
                            title="Absensi"
                            description="QR code & rekap kehadiran"
                            color="#3B82F6"
                        />
                        <FeatureCard
                            icon={<Calendar size={20} />}
                            title="Jadwal"
                            description="Manajemen jadwal pelajaran"
                            color="#EC4899"
                        />
                        <FeatureCard
                            icon={<Smartphone size={20} />}
                            title="Aplikasi"
                            description="Konten & notifikasi"
                            color="#6366F1"
                        />
                        <FeatureCard
                            icon={<Shield size={20} />}
                            title="Super Admin"
                            description="Kontrol penuh sistem"
                            color="#7C3AED"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-sm text-white/50">
                    <p>© 2024 SMK Marhas Margahayu. All rights reserved.</p>
                    <p className="mt-1">Powered by Marhas Connect</p>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 lg:p-12 bg-white lg:rounded-l-[40px]">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E4D8C] to-[#1E3A6E] flex items-center justify-center">
                            <span className="text-xl font-bold text-white">M</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">SMK MARHAS</h1>
                            <p className="text-xs text-gray-500">Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                            Selamat Datang! 👋
                        </h2>
                        <p className="text-gray-500">
                            Silakan masuk ke akun admin Anda
                        </p>
                    </div>

                    {/* Error Alert */}
                    {displayError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-fadeIn">
                            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-red-800">Login Gagal</p>
                                <p className="text-sm text-red-600">{displayError}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@marhas.sch.id"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/20 focus:border-[#1E4D8C] transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-[#1E4D8C] hover:text-[#163a6d] font-medium"
                                >
                                    Lupa Password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/20 focus:border-[#1E4D8C] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
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
                                className="w-4 h-4 rounded border-gray-300 text-[#1E4D8C] focus:ring-[#1E4D8C]/20 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                                Ingat perangkat ini
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-[#1E4D8C] to-[#1E3A6E] hover:from-[#163a6d] hover:to-[#0F2847] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#1E4D8C]/25"
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

                    {/* Demo Accounts Info */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Akun Demo</p>
                        <div className="space-y-2 text-sm">
                            <DemoAccount email="superadmin@marhas.sch.id" role="Super Admin" />
                            <DemoAccount email="perpus@marhas.sch.id" role="Perpustakaan" />
                            <DemoAccount email="keuangan@marhas.sch.id" role="Keuangan" />
                            <DemoAccount email="absensi@marhas.sch.id" role="Absensi" />
                            <DemoAccount email="jadwal@marhas.sch.id" role="Jadwal" />
                            <DemoAccount email="aplikasi@marhas.sch.id" role="Aplikasi" />
                        </div>
                        <p className="text-xs text-gray-400 mt-3">Password: [Role]123! (contoh: Perpus123!)</p>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Butuh bantuan? <a href="#" className="text-[#1E4D8C] hover:underline">Hubungi IT Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function FeatureCard({
    icon,
    title,
    description,
    color
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}) {
    return (
        <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${color}20`, color }}
            >
                {icon}
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
            <p className="text-xs text-white/60">{description}</p>
        </div>
    );
}

function DemoAccount({ email, role }: { email: string; role: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-600 font-mono text-xs">{email}</span>
            <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-gray-600">{role}</span>
        </div>
    );
}
