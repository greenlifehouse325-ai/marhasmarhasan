/**
 * useLoginAttempts Hook
 * SMK Marhas Admin Dashboard
 * 
 * Hook untuk tracking failed login attempts
 */

'use client';

import { useState, useCallback, useEffect } from 'react';

interface LoginAttempt {
    timestamp: Date;
    email: string;
    success: boolean;
}

interface UseLoginAttemptsReturn {
    attempts: LoginAttempt[];
    failedCount: number;
    isLocked: boolean;
    lockoutRemaining: number;
    recordAttempt: (email: string, success: boolean) => void;
    clearAttempts: () => void;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = 'login_attempts';

export function useLoginAttempts(): UseLoginAttemptsReturn {
    const [attempts, setAttempts] = useState<LoginAttempt[]>([]);
    const [lockoutRemaining, setLockoutRemaining] = useState(0);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                const parsedAttempts = data.attempts.map((a: unknown) => ({
                    ...(a as LoginAttempt),
                    timestamp: new Date((a as LoginAttempt).timestamp),
                }));
                setAttempts(parsedAttempts);

                if (data.lockoutUntil) {
                    const remaining = new Date(data.lockoutUntil).getTime() - Date.now();
                    if (remaining > 0) {
                        setLockoutRemaining(remaining);
                    }
                }
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    // Countdown timer for lockout
    useEffect(() => {
        if (lockoutRemaining <= 0) return;

        const timer = setInterval(() => {
            setLockoutRemaining((prev) => {
                const newValue = prev - 1000;
                if (newValue <= 0) {
                    clearInterval(timer);
                    setAttempts([]);
                    localStorage.removeItem(STORAGE_KEY);
                    return 0;
                }
                return newValue;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [lockoutRemaining]);

    // Get failed attempts in last 15 minutes
    const recentFailedAttempts = attempts.filter(
        (a) => !a.success && Date.now() - a.timestamp.getTime() < LOCKOUT_DURATION
    );

    const failedCount = recentFailedAttempts.length;
    const isLocked = failedCount >= MAX_ATTEMPTS || lockoutRemaining > 0;

    const recordAttempt = useCallback((email: string, success: boolean) => {
        const newAttempt: LoginAttempt = {
            timestamp: new Date(),
            email,
            success,
        };

        setAttempts((prev) => {
            const updated = [...prev, newAttempt];

            // Check if should lock
            const recentFailed = updated.filter(
                (a) => !a.success && Date.now() - a.timestamp.getTime() < LOCKOUT_DURATION
            );

            if (recentFailed.length >= MAX_ATTEMPTS) {
                const lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    attempts: updated,
                    lockoutUntil: lockoutUntil.toISOString(),
                }));
                setLockoutRemaining(LOCKOUT_DURATION);
            } else if (success) {
                // Clear on successful login
                localStorage.removeItem(STORAGE_KEY);
                return [];
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ attempts: updated }));
            }

            return updated;
        });
    }, []);

    const clearAttempts = useCallback(() => {
        setAttempts([]);
        setLockoutRemaining(0);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        attempts,
        failedCount,
        isLocked,
        lockoutRemaining,
        recordAttempt,
        clearAttempts,
    };
}

export function formatLockoutTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default useLoginAttempts;
