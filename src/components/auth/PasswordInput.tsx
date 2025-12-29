/**
 * Password Input Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen password input dengan visibility toggle
 */

'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    autoComplete?: string;
    showIcon?: boolean;
}

export function PasswordInput({
    value,
    onChange,
    name = 'password',
    placeholder = 'Masukkan password',
    disabled = false,
    error,
    required = false,
    autoComplete = 'current-password',
    showIcon = true,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-1">
            <div className="relative">
                {showIcon && (
                    <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                )}
                <input
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoComplete={autoComplete}
                    className={`
            w-full py-3 pr-12 rounded-xl border outline-none transition-all
            ${showIcon ? 'pl-11' : 'pl-4'}
            ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50'}
            ${error
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }
          `}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={disabled}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {error && (
                <p className="text-sm text-red-500 pl-1">{error}</p>
            )}
        </div>
    );
}

export default PasswordInput;
