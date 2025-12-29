/**
 * Dynamic QR Code Component
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * QR Code dinamis dengan auto-refresh dan countdown
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { QrCode, RefreshCw, Clock, CheckCircle, Users, Pause, Play } from 'lucide-react';

interface DynamicQRCodeProps {
    sessionId: string;
    className?: string;
    refreshInterval?: number;
    onRefresh?: (newCode: string) => void;
    onScan?: (count: number) => void;
}

export function DynamicQRCode({
    sessionId,
    className = '',
    refreshInterval = 30,
    onRefresh,
    onScan,
}: DynamicQRCodeProps) {
    const [countdown, setCountdown] = useState(refreshInterval);
    const [qrCode, setQrCode] = useState(`${sessionId}-${Date.now()}`);
    const [scanCount, setScanCount] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [totalScans, setTotalScans] = useState(0);

    // Generate new QR code
    const refreshQR = useCallback(() => {
        const newCode = `${sessionId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setQrCode(newCode);
        setCountdown(refreshInterval);
        setScanCount(0);
        onRefresh?.(newCode);
    }, [sessionId, refreshInterval, onRefresh]);

    // Countdown timer
    useEffect(() => {
        if (isPaused) return;
        if (countdown <= 0) {
            refreshQR();
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, isPaused, refreshQR]);

    // Simulate random scans for demo
    useEffect(() => {
        if (isPaused) return;

        const scanInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setScanCount((prev) => {
                    const newCount = prev + 1;
                    setTotalScans((t) => t + 1);
                    onScan?.(newCount);
                    return newCount;
                });
            }
        }, 2000);

        return () => clearInterval(scanInterval);
    }, [isPaused, onScan]);

    const progress = (countdown / refreshInterval) * 100;

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* QR Container */}
            <div className="relative w-64 h-64 bg-white rounded-2xl shadow-lg p-4">
                {/* QR Code Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <QrCode className="w-3/4 h-3/4 text-gray-800" strokeWidth={1} />

                    {/* Scan effect overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse"
                        style={{ animationDuration: '2s' }}
                    />

                    {/* Paused overlay */}
                    {isPaused && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                            <div className="text-center text-white">
                                <Pause size={40} />
                                <p className="text-sm mt-2">Di-pause</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke={countdown < 10 ? '#EF4444' : '#3B82F6'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${progress * 3.02} 1000`}
                        className="transition-all duration-1000"
                    />
                </svg>
            </div>

            {/* Info */}
            <div className="mt-4 text-center space-y-2">
                {/* Countdown */}
                <div className="flex items-center justify-center gap-2">
                    <Clock size={16} className={countdown < 10 ? 'text-red-500' : 'text-blue-500'} />
                    <span className={`text-2xl font-bold ${countdown < 10 ? 'text-red-500' : 'text-gray-800'}`}>
                        {countdown}s
                    </span>
                </div>

                {/* Scan Count */}
                <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Users size={14} />
                    <span className="text-sm">{scanCount} scan pada QR ini</span>
                </div>

                {/* Total Scans */}
                <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle size={14} />
                    <span className="text-sm font-medium">Total: {totalScans} siswa</span>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isPaused
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                >
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                    {isPaused ? 'Lanjutkan' : 'Pause'}
                </button>
                <button
                    onClick={refreshQR}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* QR ID (for debugging) */}
            <p className="mt-2 text-xs text-gray-400 font-mono">
                ID: {qrCode.slice(0, 24)}...
            </p>
        </div>
    );
}

export default DynamicQRCode;
