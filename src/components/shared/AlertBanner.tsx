/**
 * Alert Banner Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertBannerProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    action?: { label: string; onClick: () => void };
}

const CONFIG = {
    success: { icon: CheckCircle, bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-600' },
    error: { icon: AlertCircle, bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-600' },
    info: { icon: Info, bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-600' },
};

export function AlertBanner({ type, title, message, dismissible, onDismiss, action }: AlertBannerProps) {
    const { icon: Icon, bg, border, text } = CONFIG[type];

    return (
        <div className={`flex items-start gap-3 p-4 rounded-xl ${bg} border ${border}`}>
            <Icon size={20} className={text} />
            <div className="flex-1 min-w-0">
                <p className={`font-medium ${text}`}>{title}</p>
                {message && <p className="text-sm text-[var(--text-secondary)] mt-0.5">{message}</p>}
                {action && (
                    <button onClick={action.onClick} className={`text-sm font-medium ${text} hover:underline mt-2`}>{action.label}</button>
                )}
            </div>
            {dismissible && onDismiss && (
                <button onClick={onDismiss} className="p-1 hover:bg-[var(--bg-active)] rounded">
                    <X size={16} className="text-[var(--text-muted)]" />
                </button>
            )}
        </div>
    );
}
