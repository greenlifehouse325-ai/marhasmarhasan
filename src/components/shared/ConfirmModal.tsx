/**
 * ConfirmModal Component
 * SMK Marhas Admin Dashboard - Shared Components
 * 
 * Confirmation dialog dengan optional cooldown untuk aksi berbahaya
 */

'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle, Loader2 } from 'lucide-react';
import { Modal } from './Modal';

type ConfirmType = 'warning' | 'danger' | 'info' | 'success';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    message: string;
    type?: ConfirmType;
    confirmText?: string;
    cancelText?: string;
    cooldownSeconds?: number; // Untuk aksi fatal, countdown sebelum bisa confirm
    requireConfirmText?: string; // User harus ketik text tertentu untuk confirm
}

const typeConfig = {
    warning: {
        icon: AlertTriangle,
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-100',
        buttonColor: 'bg-amber-500 hover:bg-amber-600',
    },
    danger: {
        icon: AlertTriangle,
        iconColor: 'text-red-500',
        iconBg: 'bg-red-100',
        buttonColor: 'bg-red-500 hover:bg-red-600',
    },
    info: {
        icon: Info,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-100',
        buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    success: {
        icon: CheckCircle,
        iconColor: 'text-green-500',
        iconBg: 'bg-green-100',
        buttonColor: 'bg-green-500 hover:bg-green-600',
    },
};

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'warning',
    confirmText = 'Konfirmasi',
    cancelText = 'Batal',
    cooldownSeconds = 0,
    requireConfirmText,
}: ConfirmModalProps) {
    const [countdown, setCountdown] = useState(cooldownSeconds);
    const [confirmInput, setConfirmInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const config = typeConfig[type];
    const Icon = config.icon;

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCountdown(cooldownSeconds);
            setConfirmInput('');
            setIsLoading(false);
        }
    }, [isOpen, cooldownSeconds]);

    // Countdown timer
    useEffect(() => {
        if (!isOpen || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, countdown]);

    const canConfirm =
        countdown === 0 &&
        (!requireConfirmText || confirmInput === requireConfirmText) &&
        !isLoading;

    const handleConfirm = async () => {
        if (!canConfirm) return;

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
            <div className="text-center py-2">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto rounded-full ${config.iconBg} flex items-center justify-center mb-4`}>
                    <Icon size={32} className={config.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

                {/* Message */}
                <p className="text-sm text-gray-600 mb-4">{message}</p>

                {/* Countdown */}
                {countdown > 0 && (
                    <div className="mb-4 p-3 bg-amber-50 rounded-xl">
                        <p className="text-sm text-amber-700">
                            Mohon tunggu <span className="font-bold">{countdown} detik</span> sebelum konfirmasi
                        </p>
                        <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                                style={{ width: `${(countdown / cooldownSeconds) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Confirm Text Input */}
                {requireConfirmText && countdown === 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                            Ketik <span className="font-mono font-bold text-red-600">{requireConfirmText}</span> untuk konfirmasi:
                        </p>
                        <input
                            type="text"
                            value={confirmInput}
                            onChange={(e) => setConfirmInput(e.target.value)}
                            placeholder={requireConfirmText}
                            className="w-full px-4 py-2.5 text-center font-mono text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            autoFocus
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                        className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonColor}`}
                    >
                        {isLoading ? (
                            <Loader2 size={18} className="mx-auto animate-spin" />
                        ) : countdown > 0 ? (
                            `${confirmText} (${countdown})`
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
