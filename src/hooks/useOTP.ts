/**
 * useOTP Hook
 * SMK Marhas Admin Dashboard
 * 
 * Hook untuk mengelola OTP dengan countdown timer
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseOTPOptions {
    expirySeconds?: number;
    onExpire?: () => void;
}

interface UseOTPReturn {
    otp: string;
    setOTP: (value: string) => void;
    countdown: number;
    isExpired: boolean;
    isLoading: boolean;
    error: string | null;
    verifyOTP: (code: string) => Promise<boolean>;
    resendOTP: () => Promise<void>;
    resetTimer: () => void;
}

export function useOTP(options: UseOTPOptions = {}): UseOTPReturn {
    const { expirySeconds = 300, onExpire } = options; // Default 5 minutes

    const [otp, setOTP] = useState('');
    const [countdown, setCountdown] = useState(expirySeconds);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) {
            onExpire?.();
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, onExpire]);

    const resetTimer = useCallback(() => {
        setCountdown(expirySeconds);
        setError(null);
    }, [expirySeconds]);

    const verifyOTP = useCallback(async (code: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock verification - in real app, call API
            if (code === '123456') {
                return true;
            } else {
                setError('Kode OTP tidak valid');
                return false;
            }
        } catch (err) {
            setError('Gagal memverifikasi OTP');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resendOTP = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            resetTimer();
            setOTP('');
        } catch (err) {
            setError('Gagal mengirim ulang OTP');
        } finally {
            setIsLoading(false);
        }
    }, [resetTimer]);

    return {
        otp,
        setOTP,
        countdown,
        isExpired: countdown <= 0,
        isLoading,
        error,
        verifyOTP,
        resendOTP,
        resetTimer,
    };
}

// Format countdown to MM:SS
export function formatCountdown(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default useOTP;
