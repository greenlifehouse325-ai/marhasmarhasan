/**
 * QR Code Display Component
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Komponen untuk menampilkan QR code dengan countdown
 */

'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, RefreshCw } from 'lucide-react';

interface QRCodeDisplayProps {
    sessionId: string;
    refreshInterval?: number; // in seconds
    size?: 'sm' | 'md' | 'lg';
    onRefresh?: () => void;
}

const SIZES = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
};

export function QRCodeDisplay({
    sessionId,
    refreshInterval = 30,
    size = 'md',
    onRefresh,
}: QRCodeDisplayProps) {
    const [countdown, setCountdown] = useState(refreshInterval);
    const [qrCode, setQrCode] = useState(`${sessionId}-${Date.now()}`);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Refresh QR code
                    setQrCode(`${sessionId}-${Date.now()}`);
                    onRefresh?.();
                    return refreshInterval;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [sessionId, refreshInterval, onRefresh]);

    const progress = (countdown / refreshInterval) * 100;

    return (
        <div className="flex flex-col items-center">
            {/* QR Code Container */}
            <div className={`${SIZES[size]} relative bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center`}>
                {/* Placeholder QR - in real app, use qrcode.react or similar */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <QrCode className="w-2/3 h-2/3 text-gray-400" />
                </div>

                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke={countdown < 10 ? '#EF4444' : '#3B82F6'}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${progress * 3.02} 1000`}
                        className="transition-all duration-1000"
                    />
                </svg>
            </div>

            {/* Countdown */}
            <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    <RefreshCw
                        size={16}
                        className={`${countdown < 10 ? 'text-red-500' : 'text-blue-500'} ${countdown < 5 ? 'animate-spin' : ''}`}
                    />
                    <span className={`text-lg font-bold ${countdown < 10 ? 'text-red-500' : 'text-gray-800'}`}>
                        {countdown}s
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    QR Code diperbarui otomatis
                </p>
            </div>

            {/* QR Data (for debugging) */}
            <p className="mt-2 text-xs text-gray-400 font-mono truncate max-w-full">
                {qrCode.slice(0, 20)}...
            </p>
        </div>
    );
}

export default QRCodeDisplay;
