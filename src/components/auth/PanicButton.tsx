/**
 * PanicButton Component
 * SMK Marhas Admin Dashboard
 * 
 * Tombol darurat untuk lockdown akun
 */

'use client';

import React, { useState } from 'react';
import { AlertOctagon, Loader2, Shield, CheckCircle } from 'lucide-react';

interface PanicButtonProps {
    onPanic?: () => Promise<void>;
}

export function PanicButton({ onPanic }: PanicButtonProps) {
    const [isActivating, setIsActivating] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleActivate = async () => {
        setIsActivating(true);
        try {
            await onPanic?.();
            setIsActivated(true);
        } catch (error) {
            console.error('Panic action failed:', error);
        } finally {
            setIsActivating(false);
        }
    };

    if (isActivated) {
        return (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-xl">
                <CheckCircle size={18} />
                <span className="text-sm font-medium">Akun Diamankan</span>
            </div>
        );
    }

    if (showConfirm) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-red-600">
                    <AlertOctagon size={20} />
                    <span className="font-medium">Konfirmasi Panic Button</span>
                </div>
                <p className="text-sm text-red-700">
                    Ini akan logout semua device, memblokir login baru, dan mengirim alert ke Super Admin.
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleActivate}
                        disabled={isActivating}
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {isActivating ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            'Ya, Amankan Akun!'
                        )}
                    </button>
                    <button
                        onClick={() => setShowConfirm(false)}
                        disabled={isActivating}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Batal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
        >
            <AlertOctagon size={18} />
            Panic Button
        </button>
    );
}

export default PanicButton;
