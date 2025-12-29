/**
 * Cooldown Action Component
 * SMK Marhas Admin Dashboard
 * 
 * Tombol dengan cooldown untuk aksi berbahaya
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Loader2, X, CheckCircle } from 'lucide-react';

interface CooldownActionProps {
    label: string;
    description?: string;
    cooldownSeconds?: number;
    icon?: React.ReactNode;
    variant?: 'danger' | 'warning';
    onExecute: () => Promise<void>;
    onCancel?: () => void;
    requireConfirmation?: boolean;
    confirmationText?: string;
}

type Stage = 'idle' | 'confirm' | 'countdown' | 'executing' | 'success' | 'error';

export function CooldownAction({
    label,
    description,
    cooldownSeconds = 30,
    icon,
    variant = 'danger',
    onExecute,
    onCancel,
    requireConfirmation = true,
    confirmationText = 'Saya yakin ingin melakukan aksi ini',
}: CooldownActionProps) {
    const [stage, setStage] = useState<Stage>('idle');
    const [countdown, setCountdown] = useState(cooldownSeconds);
    const [confirmInput, setConfirmInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Countdown timer
    useEffect(() => {
        if (stage !== 'countdown' || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [stage, countdown]);

    // Auto-execute when countdown reaches 0
    useEffect(() => {
        if (stage === 'countdown' && countdown === 0) {
            executeAction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown, stage]);

    const reset = useCallback(() => {
        setStage('idle');
        setCountdown(cooldownSeconds);
        setConfirmInput('');
        setError(null);
    }, [cooldownSeconds]);

    const handleStart = () => {
        if (requireConfirmation) {
            setStage('confirm');
        } else {
            setStage('countdown');
        }
    };

    const handleConfirm = () => {
        if (confirmInput.toLowerCase() === confirmationText.toLowerCase()) {
            setStage('countdown');
        } else {
            setError('Teks konfirmasi tidak cocok');
        }
    };

    const handleCancel = () => {
        reset();
        onCancel?.();
    };

    const executeAction = async () => {
        setStage('executing');
        try {
            await onExecute();
            setStage('success');
            setTimeout(reset, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            setStage('error');
            setTimeout(reset, 3000);
        }
    };

    const variantStyles = {
        danger: {
            bg: 'bg-red-600 hover:bg-red-700',
            text: 'text-white',
            border: 'border-red-600',
            light: 'bg-red-50',
            lightText: 'text-red-700',
        },
        warning: {
            bg: 'bg-amber-500 hover:bg-amber-600',
            text: 'text-white',
            border: 'border-amber-500',
            light: 'bg-amber-50',
            lightText: 'text-amber-700',
        },
    };

    const styles = variantStyles[variant];

    // Idle state
    if (stage === 'idle') {
        return (
            <button
                onClick={handleStart}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${styles.bg} ${styles.text}`}
            >
                {icon || <AlertTriangle size={16} />}
                {label}
            </button>
        );
    }

    // Modal overlay for other stages
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fadeIn">
                {/* Confirmation Stage */}
                {stage === 'confirm' && (
                    <>
                        <div className={`w-14 h-14 rounded-full ${styles.light} flex items-center justify-center mx-auto mb-4`}>
                            <AlertTriangle size={28} className={styles.lightText} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{label}</h3>
                        {description && <p className="text-gray-500 text-center mb-4">{description}</p>}

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Ketik "{confirmationText}" untuk konfirmasi:
                            </label>
                            <input
                                type="text"
                                value={confirmInput}
                                onChange={(e) => { setConfirmInput(e.target.value); setError(null); }}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                placeholder={confirmationText}
                            />
                            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleConfirm}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-xl ${styles.bg} ${styles.text}`}
                            >
                                Lanjutkan
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                            >
                                Batal
                            </button>
                        </div>
                    </>
                )}

                {/* Countdown Stage */}
                {stage === 'countdown' && (
                    <>
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 relative">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke={variant === 'danger' ? '#EF4444' : '#F59E0B'}
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray={`${(countdown / cooldownSeconds) * 283} 283`}
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">
                                    {countdown}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{label}</h3>
                            <p className="text-sm text-gray-500">Eksekusi dalam {countdown} detik...</p>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="w-full py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                        >
                            <X size={16} className="inline mr-1" />
                            Batalkan
                        </button>
                    </>
                )}

                {/* Executing Stage */}
                {stage === 'executing' && (
                    <div className="text-center py-8">
                        <Loader2 size={48} className="mx-auto mb-4 text-gray-400 animate-spin" />
                        <p className="text-gray-600">Memproses...</p>
                    </div>
                )}

                {/* Success Stage */}
                {stage === 'success' && (
                    <div className="text-center py-8">
                        <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                        <p className="text-gray-800 font-medium">Berhasil!</p>
                    </div>
                )}

                {/* Error Stage */}
                {stage === 'error' && (
                    <div className="text-center py-8">
                        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
                        <p className="text-red-600 font-medium">{error || 'Terjadi kesalahan'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CooldownAction;
