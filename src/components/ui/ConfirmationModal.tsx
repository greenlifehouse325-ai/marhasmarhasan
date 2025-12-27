'use client';

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason?: string) => void;
    title: string;
    message: string;
    confirmText?: string;
    confirmVariant?: 'danger' | 'warning' | 'primary';
    requireReason?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    confirmVariant = 'danger',
    requireReason = false,
}: ConfirmationModalProps) {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const confirmStyles = {
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        warning: 'bg-orange-500 hover:bg-orange-600 text-white',
        primary: 'bg-[var(--primary-blue)] hover:bg-blue-600 text-white',
    };

    const handleConfirm = () => {
        onConfirm(requireReason ? reason : undefined);
        setReason('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X size={18} className="text-[var(--text-grey)]" />
                </button>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertTriangle size={24} className="text-red-500" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">{title}</h3>

                {/* Message */}
                <p className="text-sm text-[var(--text-grey)] mb-4">{message}</p>

                {/* Reason input */}
                {requireReason && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                            Reason (required)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20 focus:border-[var(--primary-blue)]/30 resize-none"
                            rows={3}
                            placeholder="Enter reason for this action..."
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-[var(--text-grey)] hover:text-[var(--text-dark)] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={requireReason && !reason.trim()}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${confirmStyles[confirmVariant]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
