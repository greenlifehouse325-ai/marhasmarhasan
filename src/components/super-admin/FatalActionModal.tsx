/**
 * Fatal Action Modal Component
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Modal konfirmasi untuk aksi berbahaya dengan multi-step verification
 */

'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Lock, Key, Clock, Loader2, CheckCircle } from 'lucide-react';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { OTPInput } from '@/components/auth/OTPInput';

interface FatalActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title: string;
    description: string;
    confirmText?: string;
    cooldownSeconds?: number;
}

type Stage = 'confirm' | 'password' | 'otp' | 'countdown' | 'executing' | 'success';

export function FatalActionModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Konfirmasi',
    cooldownSeconds = 30,
}: FatalActionModalProps) {
    const [stage, setStage] = useState<Stage>('confirm');
    const [password, setPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [countdown, setCountdown] = useState(cooldownSeconds);
    const [error, setError] = useState<string | null>(null);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setStage('confirm');
            setPassword('');
            setOtpCode('');
            setCountdown(cooldownSeconds);
            setError(null);
        }
    }, [isOpen, cooldownSeconds]);

    // Countdown timer
    useEffect(() => {
        if (stage !== 'countdown' || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [stage, countdown]);

    // Execute when countdown reaches 0
    useEffect(() => {
        if (stage === 'countdown' && countdown === 0) {
            handleExecute();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown, stage]);

    const handlePasswordSubmit = () => {
        if (password.length < 6) {
            setError('Password terlalu pendek');
            return;
        }
        // Mock password verification
        if (password !== 'password123') {
            setError('Password salah');
            return;
        }
        setError(null);
        setStage('otp');
    };

    const handleOTPComplete = (code: string) => {
        setOtpCode(code);
        // Mock OTP verification
        if (code.length === 6) {
            setStage('countdown');
        }
    };

    const handleExecute = async () => {
        setStage('executing');
        try {
            await onConfirm();
            setStage('success');
            setTimeout(onClose, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            setStage('confirm');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle size={20} />
                        <span className="font-semibold">Aksi Berbahaya</span>
                    </div>
                    {stage !== 'executing' && stage !== 'success' && (
                        <button
                            onClick={onClose}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Step 1: Confirm */}
                    {stage === 'confirm' && (
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle size={32} className="text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                            <p className="text-gray-500 mb-6">{description}</p>
                            <button
                                onClick={() => setStage('password')}
                                className="w-full py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700"
                            >
                                Lanjutkan
                            </button>
                        </div>
                    )}

                    {/* Step 2: Password */}
                    {stage === 'password' && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Lock size={18} className="text-gray-500" />
                                <span className="font-medium text-gray-800">Verifikasi Password</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">
                                Masukkan password Anda untuk melanjutkan.
                            </p>
                            <PasswordInput
                                value={password}
                                onChange={(val) => { setPassword(val); setError(null); }}
                                placeholder="Masukkan password"
                            />
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                            <button
                                onClick={handlePasswordSubmit}
                                className="w-full mt-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700"
                            >
                                Verifikasi
                            </button>
                        </div>
                    )}

                    {/* Step 3: OTP */}
                    {stage === 'otp' && (
                        <div className="text-center">
                            <div className="flex items-center gap-2 justify-center mb-4">
                                <Key size={18} className="text-gray-500" />
                                <span className="font-medium text-gray-800">Verifikasi OTP</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">
                                Masukkan kode OTP yang dikirim ke email/HP Anda.
                            </p>
                            <OTPInput
                                value={otpCode}
                                onChange={(val) => {
                                    setOtpCode(val);
                                    if (val.length === 6) {
                                        setStage('countdown');
                                    }
                                }}
                            />
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                        </div>
                    )}

                    {/* Step 4: Countdown */}
                    {stage === 'countdown' && (
                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-4 relative">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FEE2E2" strokeWidth="6" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#EF4444"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray={`${(countdown / cooldownSeconds) * 283} 283`}
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <Clock size={20} className="text-red-500 mb-1" />
                                    <span className="text-2xl font-bold text-gray-800">{countdown}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">Aksi akan dieksekusi dalam {countdown} detik...</p>
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                            >
                                Batalkan
                            </button>
                        </div>
                    )}

                    {/* Step 5: Executing */}
                    {stage === 'executing' && (
                        <div className="text-center py-8">
                            <Loader2 size={48} className="mx-auto mb-4 text-gray-400 animate-spin" />
                            <p className="text-gray-600">Memproses...</p>
                        </div>
                    )}

                    {/* Step 6: Success */}
                    {stage === 'success' && (
                        <div className="text-center py-8">
                            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                            <p className="text-gray-800 font-medium">Berhasil!</p>
                        </div>
                    )}
                </div>

                {/* Progress Indicator */}
                {stage !== 'executing' && stage !== 'success' && (
                    <div className="px-6 pb-4">
                        <div className="flex justify-center gap-2">
                            {['confirm', 'password', 'otp', 'countdown'].map((s, i) => (
                                <div
                                    key={s}
                                    className={`w-2 h-2 rounded-full transition-colors ${['confirm', 'password', 'otp', 'countdown'].indexOf(stage) >= i
                                        ? 'bg-red-500'
                                        : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FatalActionModal;
