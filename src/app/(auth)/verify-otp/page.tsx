/**
 * OTP Verification Page
 * SMK Marhas Admin Dashboard
 * 
 * Halaman verifikasi OTP untuk Super Admin
 * dengan 6-digit input dan countdown timer
 */

'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, ArrowLeft, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIGS } from '@/types/admin';

function OTPVerificationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const { verifyOTP, isLoading } = useAuth();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    // Auto-submit when all 6 digits entered
    useEffect(() => {
        const code = otp.join('');
        if (code.length === 6 && otp.every(digit => digit !== '')) {
            handleVerify(code);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp]);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError(null);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

        if (pastedData.length === 6) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerify = async (code: string) => {
        if (isVerifying) return;

        setIsVerifying(true);
        setError(null);

        try {
            const response = await verifyOTP({
                email,
                code,
                deviceFingerprint: 'mock-fingerprint',
            });

            if (response.success && response.user) {
                setIsSuccess(true);
                // Wait for animation then redirect
                setTimeout(() => {
                    const roleConfig = ROLE_CONFIGS[response.user!.role];
                    router.push(roleConfig.basePath);
                }, 1500);
            } else {
                setError(response.error || 'Verifikasi gagal');
                // Clear OTP on error
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = () => {
        if (!canResend) return;

        // Reset countdown
        setCountdown(60);
        setCanResend(false);
        setError(null);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();

        // TODO: Call resend OTP API
    };

    // Redirect if no email
    if (!email) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-white/70">Email tidak ditemukan</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-4 text-[#F7D611] hover:underline"
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-6">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/login')}
                    className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Kembali ke Login</span>
                </button>

                {/* Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-500/30">
                        {isSuccess ? (
                            <CheckCircle size={32} className="text-white animate-bounce" />
                        ) : (
                            <Shield size={32} className="text-white" />
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        {isSuccess ? 'Verifikasi Berhasil!' : 'Verifikasi OTP'}
                    </h1>
                    <p className="text-center text-gray-500 mb-6">
                        {isSuccess ? (
                            'Mengalihkan ke dashboard...'
                        ) : (
                            <>
                                Masukkan kode 6 digit yang dikirim ke<br />
                                <span className="font-medium text-gray-700">{email}</span>
                            </>
                        )}
                    </p>

                    {/* Success Animation */}
                    {isSuccess && (
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                        </div>
                    )}

                    {/* OTP Input */}
                    {!isSuccess && (
                        <>
                            <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        disabled={isVerifying || isLoading}
                                        className={`
                      w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 
                      transition-all duration-200 outline-none
                      ${error
                                                ? 'border-red-300 bg-red-50 text-red-600'
                                                : digit
                                                    ? 'border-[#1E4D8C] bg-[#1E4D8C]/5 text-[#1E4D8C]'
                                                    : 'border-gray-200 bg-gray-50 text-gray-800'
                                            }
                      focus:border-[#1E4D8C] focus:ring-4 focus:ring-[#1E4D8C]/10
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                                    />
                                ))}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p className="text-center text-red-500 text-sm mb-4 animate-fadeIn">
                                    {error}
                                </p>
                            )}

                            {/* Loading Indicator */}
                            {(isVerifying || isLoading) && (
                                <div className="flex items-center justify-center gap-2 text-[#1E4D8C] mb-4">
                                    <Loader2 size={18} className="animate-spin" />
                                    <span className="text-sm">Memverifikasi...</span>
                                </div>
                            )}

                            {/* Resend */}
                            <div className="text-center">
                                {canResend ? (
                                    <button
                                        onClick={handleResend}
                                        className="flex items-center gap-2 mx-auto text-[#1E4D8C] hover:text-[#163a6d] font-medium transition-colors"
                                    >
                                        <RefreshCw size={16} />
                                        Kirim ulang kode
                                    </button>
                                ) : (
                                    <p className="text-gray-500 text-sm">
                                        Kirim ulang kode dalam{' '}
                                        <span className="font-semibold text-[#1E4D8C]">{countdown}</span> detik
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <p className="text-white/70 text-sm text-center">
                        🔒 Verifikasi 2 langkah aktif untuk keamanan akun Super Admin
                    </p>
                </div>

                {/* Demo Note */}
                <p className="mt-4 text-center text-white/50 text-xs">
                    Demo: Masukkan kode 6 digit apapun (contoh: 123456)
                </p>
            </div>
        </div>
    );
}

export default function VerifyOTPPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center w-full min-h-screen">
                <Loader2 size={32} className="text-white animate-spin" />
            </div>
        }>
            <OTPVerificationContent />
        </Suspense>
    );
}
