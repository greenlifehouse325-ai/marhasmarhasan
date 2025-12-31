/**
 * Form Tambah Admin
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk menambah admin baru
 * Redesigned: button at bottom, theme-aware styling
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    UserPlus,
    Mail,
    Phone,
    Shield,
    Key,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    CheckCircle,
    Info,
} from 'lucide-react';
import type { AdminRole } from '@/types/auth';

const ROLES: { value: AdminRole; label: string; description: string; color: string }[] = [
    { value: 'admin_perpustakaan', label: 'Admin Perpustakaan', description: 'Kelola buku, peminjaman, denda', color: '#10B981' },
    { value: 'admin_keuangan', label: 'Admin Keuangan', description: 'Kelola SPP, laporan keuangan', color: '#F59E0B' },
    { value: 'admin_absensi', label: 'Admin Absensi', description: 'Kelola QR code, rekap kehadiran', color: '#3B82F6' },
    { value: 'admin_jadwal', label: 'Admin Jadwal', description: 'Kelola jadwal kelas, kalender', color: '#EC4899' },
    { value: 'admin_aplikasi', label: 'Admin Aplikasi', description: 'Kelola konten, notifikasi', color: '#6366F1' },
];

interface FormData {
    name: string;
    email: string;
    phone: string;
    role: AdminRole | '';
    password: string;
    confirmPassword: string;
    sendWelcomeEmail: boolean;
    requirePasswordChange: boolean;
}

export default function CreateAdminPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        confirmPassword: '',
        sendWelcomeEmail: true,
        requirePasswordChange: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        router.push('/super-admin/admins');
    };

    // Password validation
    const passwordValid = {
        length: formData.password.length >= 10,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        symbol: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    };
    const isPasswordStrong = Object.values(passwordValid).every(Boolean);
    const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

    const canSubmit = formData.name && formData.email && formData.role && isPasswordStrong && passwordsMatch;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/super-admin/admins"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                        <Link href="/super-admin" className="hover:text-[var(--brand-primary)]">Dashboard</Link>
                        <span>/</span>
                        <Link href="/super-admin/admins" className="hover:text-[var(--brand-primary)]">Kelola Admin</Link>
                        <span>/</span>
                        <span>Tambah Admin</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tambah Admin Baru</h1>
                </div>
            </div>

            {/* Form - Redesigned with single column layout */}
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                {/* Basic Info */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Informasi Dasar</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nama lengkap admin"
                                required
                                className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@marhas.sch.id"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">No. Telepon</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role Selection - Fixed dark mode styling */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Shield size={18} />
                        Pilih Role
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ROLES.map((role) => (
                            <label
                                key={role.value}
                                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.role === role.value
                                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10'
                                    : 'border-[var(--border-light)] hover:border-[var(--brand-primary)]/50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={role.value}
                                    checked={formData.role === role.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                    required
                                />
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                                        style={{ backgroundColor: role.color }}
                                    />
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">{role.label}</p>
                                        <p className="text-sm text-[var(--text-muted)]">{role.description}</p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Password */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Key size={18} />
                        Kredensial
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Min. 10 karakter"
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Konfirmasi Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Ulangi password"
                                        required
                                        className={`w-full px-4 py-3 bg-[var(--bg-input)] border rounded-xl text-sm text-[var(--text-primary)] ${formData.confirmPassword && !passwordsMatch
                                            ? 'border-red-300 focus:ring-red-500/20'
                                            : 'border-[var(--border-light)] focus:ring-[var(--brand-primary)]/20'
                                            }`}
                                    />
                                    {formData.confirmPassword && (
                                        <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                                            {passwordsMatch ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        {formData.password && (
                            <div className="p-3 bg-[var(--bg-hover)] rounded-xl">
                                <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Persyaratan password:</p>
                                <div className="grid grid-cols-2 gap-1">
                                    <PasswordCheck valid={passwordValid.length} label="Minimal 10 karakter" />
                                    <PasswordCheck valid={passwordValid.uppercase} label="Huruf besar" />
                                    <PasswordCheck valid={passwordValid.lowercase} label="Huruf kecil" />
                                    <PasswordCheck valid={passwordValid.number} label="Angka" />
                                    <PasswordCheck valid={passwordValid.symbol} label="Simbol" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Options */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Info size={18} />
                        Opsi Tambahan
                    </h2>

                    <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="sendWelcomeEmail"
                                checked={formData.sendWelcomeEmail}
                                onChange={handleChange}
                                className="w-4 h-4 rounded text-[var(--brand-primary)] mt-0.5"
                            />
                            <div>
                                <p className="text-sm font-medium text-[var(--text-primary)]">Kirim email selamat datang</p>
                                <p className="text-xs text-[var(--text-muted)]">Kirim instruksi login ke email admin</p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="requirePasswordChange"
                                checked={formData.requirePasswordChange}
                                onChange={handleChange}
                                className="w-4 h-4 rounded text-[var(--brand-primary)] mt-0.5"
                            />
                            <div>
                                <p className="text-sm font-medium text-[var(--text-primary)]">Wajib ganti password</p>
                                <p className="text-xs text-[var(--text-muted)]">Admin harus ganti password saat login pertama</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Actions - Now at bottom of form */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || !canSubmit}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[var(--brand-primary)] rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Membuat Admin...
                            </>
                        ) : (
                            <>
                                <UserPlus size={18} />
                                Buat Admin
                            </>
                        )}
                    </button>

                    <Link
                        href="/super-admin/admins"
                        className="flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}

function PasswordCheck({ valid, label }: { valid: boolean; label: string }) {
    return (
        <div className={`flex items-center gap-1 text-xs ${valid ? 'text-green-600' : 'text-[var(--text-muted)]'}`}>
            {valid ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
            {label}
        </div>
    );
}
