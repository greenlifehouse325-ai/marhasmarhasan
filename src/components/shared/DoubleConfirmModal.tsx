/**
 * DoubleConfirmModal Component
 * SMK Marhas Admin Dashboard - Shared Components
 * 
 * Double confirmation dialog untuk aksi berbahaya
 * Requires two-step confirmation: first click, then confirm with cooldown
 */

'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, Loader2, AlertOctagon } from 'lucide-react';
import { Modal } from './Modal';

interface DoubleConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    message: string;
    warningMessage?: string;
    confirmText?: string;
    cancelText?: string;
    requireConfirmText?: string; // User must type this text to enable final confirm
    cooldownSeconds?: number; // Countdown before final confirm button is enabled
}

export function DoubleConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    warningMessage = 'Aksi ini tidak dapat dibatalkan!',
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    requireConfirmText,
    cooldownSeconds = 5,
}: DoubleConfirmModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [countdown, setCountdown] = useState(cooldownSeconds);
    const [confirmInput, setConfirmInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when modal opens or closes
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setCountdown(cooldownSeconds);
            setConfirmInput('');
            setIsLoading(false);
        }
    }, [isOpen, cooldownSeconds]);

    // Countdown timer for step 2
    useEffect(() => {
        if (!isOpen || step !== 2 || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, step, countdown]);

    const goToStep2 = () => {
        setStep(2);
        setCountdown(cooldownSeconds);
    };

    const canFinalConfirm =
        step === 2 &&
        countdown === 0 &&
        (!requireConfirmText || confirmInput === requireConfirmText) &&
        !isLoading;

    const handleFinalConfirm = async () => {
        if (!canFinalConfirm) return;

        setIsLoading(true);
        try {
            await onConfirm();
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            closeOnOverlay={!isLoading}
            closeOnEsc={!isLoading}
            showCloseButton={!isLoading}
        >
            <div className="py-2">
                {/* Step 1: Initial Warning */}
                {step === 1 && (
                    <div className="text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                            <AlertTriangle size={40} className="text-amber-500" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h3>

                        {/* Message */}
                        <p className="text-sm text-[var(--text-secondary)] mb-4">{message}</p>

                        {/* Warning Box */}
                        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6">
                            <div className="flex items-center gap-2 text-amber-600">
                                <ShieldAlert size={20} />
                                <p className="text-sm font-medium">{warningMessage}</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={goToStep2}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-colors"
                            >
                                Saya Mengerti, Lanjutkan
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Final Confirmation */}
                {step === 2 && (
                    <div className="text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                            <AlertOctagon size={40} className="text-red-500" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Konfirmasi Akhir</h3>

                        {/* Message */}
                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                            Anda akan melakukan: <span className="font-semibold text-red-500">{title}</span>
                        </p>

                        {/* Countdown */}
                        {countdown > 0 && (
                            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                <p className="text-sm text-red-500">
                                    Mohon tunggu <span className="font-bold text-lg">{countdown}</span> detik
                                </p>
                                <div className="mt-3 h-2 bg-red-500/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(countdown / cooldownSeconds) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Confirm Text Input */}
                        {requireConfirmText && countdown === 0 && (
                            <div className="mb-4 p-4 bg-[var(--bg-hover)] rounded-xl">
                                <p className="text-sm text-[var(--text-secondary)] mb-3">
                                    Ketik <span className="font-mono font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">{requireConfirmText}</span> untuk konfirmasi:
                                </p>
                                <input
                                    type="text"
                                    value={confirmInput}
                                    onChange={(e) => setConfirmInput(e.target.value)}
                                    placeholder={`Ketik "${requireConfirmText}"`}
                                    className="w-full px-4 py-3 text-center font-mono text-sm text-[var(--text-primary)] bg-[var(--bg-input)] border-2 border-[var(--border-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                                    autoFocus
                                />
                                {confirmInput && confirmInput !== requireConfirmText && (
                                    <p className="text-xs text-red-500 mt-2">Teks tidak sesuai</p>
                                )}
                                {confirmInput === requireConfirmText && (
                                    <p className="text-xs text-green-500 mt-2">✓ Teks sesuai</p>
                                )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setStep(1)}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors disabled:opacity-50"
                            >
                                ← Kembali
                            </button>
                            <button
                                onClick={handleFinalConfirm}
                                disabled={!canFinalConfirm}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 size={18} className="mx-auto animate-spin" />
                                ) : countdown > 0 ? (
                                    `Tunggu ${countdown}s...`
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default DoubleConfirmModal;
