/**
 * Form Tambah Admin
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk menambah admin baru
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

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/super-admin/admins"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/super-admin/admins" className="hover:text-purple-600">Kelola Admin</Link>
                        <span>/</span>
                        <span>Tambah Admin</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Tambah Admin Baru</h1>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nama lengkap admin"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@marhas.sch.id"
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">No. Telepon</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="08xxxxxxxxxx"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            <Shield size={18} className="inline mr-2" />
                            Pilih Role
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {ROLES.map((role) => (
                                <label
                                    key={role.value}
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.role === role.value
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-200'
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
                                            <p className="font-medium text-gray-800">{role.label}</p>
                                            <p className="text-sm text-gray-500">{role.description}</p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            <Key size={18} className="inline mr-2" />
                            Kredensial
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
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
                                            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
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
                                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm ${formData.confirmPassword && !passwordsMatch
                                                ? 'border-red-300 focus:ring-red-500/20'
                                                : 'border-gray-200 focus:ring-purple-500/20'
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
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs font-medium text-gray-600 mb-2">Persyaratan password:</p>
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
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Options */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Opsi Tambahan</h2>

                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="sendWelcomeEmail"
                                    checked={formData.sendWelcomeEmail}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded text-purple-600 mt-0.5"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Kirim email selamat datang</p>
                                    <p className="text-xs text-gray-500">Kirim instruksi login ke email admin</p>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="requirePasswordChange"
                                    checked={formData.requirePasswordChange}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded text-purple-600 mt-0.5"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Wajib ganti password</p>
                                    <p className="text-xs text-gray-500">Admin harus ganti password saat login pertama</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isPasswordStrong || !passwordsMatch}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
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
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

function PasswordCheck({ valid, label }: { valid: boolean; label: string }) {
    return (
        <div className={`flex items-center gap-1 text-xs ${valid ? 'text-green-600' : 'text-gray-400'}`}>
            {valid ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
            {label}
        </div>
    );
}
