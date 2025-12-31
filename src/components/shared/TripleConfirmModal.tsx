/**
 * Triple Confirmation Modal
 * SMK Marhas Admin Dashboard
 * 
 * 3-layer confirmation for critical actions:
 * 1. Alert dialog with warning
 * 2. Type "YAKIN" to confirm
 * 3. Countdown before action executes
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, X, Shield, Loader2 } from 'lucide-react';

interface TripleConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    description: string;
    warningText?: string;
    confirmText?: string;
    countdownSeconds?: number;
    variant?: 'danger' | 'warning';
}

export default function TripleConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    warningText = 'Tindakan ini tidak dapat dibatalkan!',
    confirmText = 'YAKIN',
    countdownSeconds = 5,
    variant = 'danger'
}: TripleConfirmModalProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [inputValue, setInputValue] = useState('');
    const [countdown, setCountdown] = useState(countdownSeconds);
    const [isExecuting, setIsExecuting] = useState(false);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setInputValue('');
            setCountdown(countdownSeconds);
            setIsExecuting(false);
        }
    }, [isOpen, countdownSeconds]);

    // Countdown logic
    useEffect(() => {
        if (step === 3 && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [step, countdown]);

    const handleProceedToStep2 = () => {
        setStep(2);
    };

    const handleProceedToStep3 = () => {
        if (inputValue.toUpperCase() === confirmText) {
            setStep(3);
            setCountdown(countdownSeconds);
        }
    };

    const handleFinalConfirm = useCallback(async () => {
        if (countdown > 0 || isExecuting) return;

        setIsExecuting(true);
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            console.error('Confirmation action failed:', error);
            setIsExecuting(false);
        }
    }, [countdown, isExecuting, onConfirm, onClose]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            icon: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
            button: 'bg-red-600 hover:bg-red-700',
            border: 'border-red-200 dark:border-red-500/30',
            text: 'text-red-600 dark:text-red-400',
        },
        warning: {
            icon: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
            button: 'bg-amber-600 hover:bg-amber-700',
            border: 'border-amber-200 dark:border-amber-500/30',
            text: 'text-amber-600 dark:text-amber-400',
        },
    };

    const styles = variantStyles[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[var(--bg-card)] rounded-2xl shadow-xl border border-[var(--border-light)] animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                >
                    <X size={18} className="text-[var(--text-muted)]" />
                </button>

                <div className="p-6">
                    {/* Step 1: Alert */}
                    {step === 1 && (
                        <div className="text-center">
                            <div className={`w-16 h-16 rounded-full ${styles.icon} flex items-center justify-center mx-auto mb-4`}>
                                <AlertTriangle size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h2>
                            <p className="text-[var(--text-secondary)] mb-4">{description}</p>
                            <div className={`p-3 rounded-xl ${styles.icon} mb-6`}>
                                <p className={`text-sm font-medium ${styles.text}`}>{warningText}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleProceedToStep2}
                                    className={`flex-1 py-3 px-4 ${styles.button} text-white rounded-xl font-medium transition-colors`}
                                >
                                    Lanjutkan
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Type confirmation */}
                    {step === 2 && (
                        <div className="text-center">
                            <div className={`w-16 h-16 rounded-full ${styles.icon} flex items-center justify-center mx-auto mb-4`}>
                                <Shield size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Konfirmasi Manual</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Ketik <span className="font-bold text-[var(--text-primary)]">&quot;{confirmText}&quot;</span> untuk melanjutkan
                            </p>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                                placeholder={`Ketik "${confirmText}"`}
                                className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-center text-lg font-bold tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 mb-6"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3 px-4 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors"
                                >
                                    Kembali
                                </button>
                                <button
                                    onClick={handleProceedToStep3}
                                    disabled={inputValue.toUpperCase() !== confirmText}
                                    className={`flex-1 py-3 px-4 ${styles.button} text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    Konfirmasi
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Countdown */}
                    {step === 3 && (
                        <div className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="44"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        fill="none"
                                        className="text-[var(--bg-hover)]"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="44"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        fill="none"
                                        strokeDasharray={276}
                                        strokeDashoffset={276 - (276 * (countdownSeconds - countdown)) / countdownSeconds}
                                        className={`${styles.text} transition-all duration-1000`}
                                    />
                                </svg>
                                <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${styles.text}`}>
                                    {countdown}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                                {countdown > 0 ? 'Tunggu...' : 'Siap Eksekusi'}
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-6">
                                {countdown > 0
                                    ? `Tindakan akan tersedia dalam ${countdown} detik`
                                    : 'Klik tombol di bawah untuk menyelesaikan'}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors"
                                >
                                    Batalkan
                                </button>
                                <button
                                    onClick={handleFinalConfirm}
                                    disabled={countdown > 0 || isExecuting}
                                    className={`flex-1 py-3 px-4 ${styles.button} text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                                >
                                    {isExecuting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Memproses...
                                        </>
                                    ) : countdown > 0 ? (
                                        `Tunggu ${countdown}s`
                                    ) : (
                                        'Eksekusi Sekarang'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step indicator */}
                <div className="flex justify-center gap-2 pb-6">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-2 h-2 rounded-full transition-colors ${step >= s ? styles.text.replace('text-', 'bg-') : 'bg-[var(--bg-hover)]'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
