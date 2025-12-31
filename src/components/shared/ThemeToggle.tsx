/**
 * Theme Toggle Component
 * SMK Marhas Admin Dashboard
 * 
 * Simple toggle button for switching between light/dark themes
 */

'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export default function ThemeToggle({
    size = 'md',
    showLabel = false,
    className = ''
}: ThemeToggleProps) {
    const { actualTheme, toggleTheme } = useTheme();

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24
    };

    return (
        <button
            onClick={toggleTheme}
            className={`
                ${sizeClasses[size]}
                flex items-center justify-center
                rounded-xl
                bg-[var(--bg-hover)]
                hover:bg-[var(--bg-active)]
                text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]
                transition-all duration-200
                ${showLabel ? 'gap-2 px-4 py-2 w-auto' : ''}
                ${className}
            `}
            title={actualTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label={actualTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            <span className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun icon - shows in dark mode */}
                <Sun
                    size={iconSizes[size]}
                    className={`
                        absolute transition-all duration-300 ease-out
                        ${actualTheme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-50'
                        }
                    `}
                />
                {/* Moon icon - shows in light mode */}
                <Moon
                    size={iconSizes[size]}
                    className={`
                        absolute transition-all duration-300 ease-out
                        ${actualTheme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-50'
                        }
                    `}
                />
            </span>
            {showLabel && (
                <span className="text-sm font-medium">
                    {actualTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
            )}
        </button>
    );
}
