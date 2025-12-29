/**
 * Password Strength Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen indikator kekuatan password
 */

'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
    password: string;
    showRequirements?: boolean;
}

interface PasswordValidation {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
}

function validatePassword(password: string): PasswordValidation {
    return {
        minLength: password.length >= 10,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
}

function getStrength(validation: PasswordValidation): { level: number; label: string; color: string } {
    const passedRules = Object.values(validation).filter(Boolean).length;

    if (passedRules === 0) return { level: 0, label: 'Sangat Lemah', color: 'bg-gray-300' };
    if (passedRules <= 2) return { level: 1, label: 'Lemah', color: 'bg-red-500' };
    if (passedRules <= 3) return { level: 2, label: 'Sedang', color: 'bg-amber-500' };
    if (passedRules <= 4) return { level: 3, label: 'Kuat', color: 'bg-green-500' };
    return { level: 4, label: 'Sangat Kuat', color: 'bg-emerald-600' };
}

export function PasswordStrength({ password, showRequirements = true }: PasswordStrengthProps) {
    const validation = validatePassword(password);
    const strength = getStrength(validation);

    const requirements = [
        { key: 'minLength', label: 'Minimal 10 karakter', passed: validation.minLength },
        { key: 'hasUppercase', label: 'Huruf besar (A-Z)', passed: validation.hasUppercase },
        { key: 'hasLowercase', label: 'Huruf kecil (a-z)', passed: validation.hasLowercase },
        { key: 'hasNumber', label: 'Angka (0-9)', passed: validation.hasNumber },
        { key: 'hasSymbol', label: 'Simbol (!@#$%^&*)', passed: validation.hasSymbol },
    ];

    if (!password) return null;

    return (
        <div className="space-y-3">
            {/* Strength Bar */}
            <div className="space-y-1">
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.level ? strength.color : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
                <p className={`text-xs font-medium ${strength.level <= 1 ? 'text-red-500' :
                        strength.level === 2 ? 'text-amber-500' : 'text-green-500'
                    }`}>
                    {strength.label}
                </p>
            </div>

            {/* Requirements */}
            {showRequirements && (
                <div className="grid grid-cols-2 gap-1">
                    {requirements.map((req) => (
                        <div
                            key={req.key}
                            className={`flex items-center gap-1.5 text-xs ${req.passed ? 'text-green-600' : 'text-gray-400'
                                }`}
                        >
                            {req.passed ? <Check size={12} /> : <X size={12} />}
                            {req.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function usePasswordValidation(password: string) {
    return {
        validation: validatePassword(password),
        isStrong: Object.values(validatePassword(password)).every(Boolean),
    };
}

export default PasswordStrength;
