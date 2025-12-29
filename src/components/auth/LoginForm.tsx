/**
 * Login Form Component
 * SMK Marhas Admin Dashboard
 * 
 * Form login dengan validasi
 */

'use client';

import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { PasswordInput } from './PasswordInput';

interface LoginFormProps {
    onSubmit: (email: string, password: string, remember: boolean) => Promise<void>;
    error?: string;
    isLoading?: boolean;
}

export function LoginForm({ onSubmit, error, isLoading = false }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberDevice, setRememberDevice] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(email, password, rememberDevice);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle size={20} />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Email */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@marhas.sch.id"
                        required
                        disabled={isLoading}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Masukkan password"
                    disabled={isLoading}
                    required
                />
            </div>

            {/* Remember Device */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        disabled={isLoading}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Ingat perangkat ini</span>
                </label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                    Lupa password?
                </a>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors disabled:opacity-50"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Memproses...
                    </>
                ) : (
                    'Masuk'
                )}
            </button>
        </form>
    );
}

export default LoginForm;
