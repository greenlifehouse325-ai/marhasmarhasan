/**
 * OTP Input Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen input OTP 6 digit dengan auto-focus
 */

'use client';

import React, { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: boolean;
    autoFocus?: boolean;
}

export function OTPInput({
    length = 6,
    value,
    onChange,
    disabled = false,
    error = false,
    autoFocus = true,
}: OTPInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [autoFocus]);

    const handleChange = (index: number, digit: string) => {
        if (!/^\d*$/.test(digit)) return; // Only allow digits

        const newValue = value.split('');
        newValue[index] = digit.slice(-1); // Take last digit if multiple
        const joinedValue = newValue.join('');
        onChange(joinedValue);

        // Auto-focus next input
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveIndex(index + 1);
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!value[index] && index > 0) {
                // Move to previous input on backspace if current is empty
                inputRefs.current[index - 1]?.focus();
                setActiveIndex(index - 1);
                const newValue = value.split('');
                newValue[index - 1] = '';
                onChange(newValue.join(''));
            } else {
                const newValue = value.split('');
                newValue[index] = '';
                onChange(newValue.join(''));
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveIndex(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveIndex(index + 1);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        onChange(pastedData);

        // Focus on appropriate input after paste
        const focusIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[focusIndex]?.focus();
        setActiveIndex(focusIndex);
    };

    const handleFocus = (index: number) => {
        setActiveIndex(index);
        inputRefs.current[index]?.select();
    };

    return (
        <div className="flex gap-3 justify-center">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={() => handleFocus(index)}
                    disabled={disabled}
                    className={`
            w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all
            ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}
            ${error ? 'border-red-400 text-red-600 shake' : ''}
            ${!error && activeIndex === index ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-200'}
            ${!error && value[index] ? 'border-green-400 text-green-600' : ''}
            hover:border-gray-300
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
          `}
                    aria-label={`OTP digit ${index + 1}`}
                />
            ))}
        </div>
    );
}

export default OTPInput;
