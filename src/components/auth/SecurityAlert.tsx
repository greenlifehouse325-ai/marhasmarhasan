/**
 * Security Alert Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen untuk menampilkan alert keamanan
 */

'use client';

import React from 'react';
import { AlertTriangle, Shield, Info, X, ExternalLink } from 'lucide-react';

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

interface SecurityAlertProps {
    severity: AlertSeverity;
    title: string;
    message: string;
    timestamp?: Date;
    onDismiss?: () => void;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const SEVERITY_STYLES = {
    low: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: <Info size={20} className="text-blue-500" />,
        title: 'text-blue-800',
        text: 'text-blue-700',
    },
    medium: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: <AlertTriangle size={20} className="text-amber-500" />,
        title: 'text-amber-800',
        text: 'text-amber-700',
    },
    high: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: <AlertTriangle size={20} className="text-orange-500" />,
        title: 'text-orange-800',
        text: 'text-orange-700',
    },
    critical: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: <Shield size={20} className="text-red-500" />,
        title: 'text-red-800',
        text: 'text-red-700',
    },
};

export function SecurityAlert({
    severity,
    title,
    message,
    timestamp,
    onDismiss,
    action,
}: SecurityAlertProps) {
    const style = SEVERITY_STYLES[severity];

    return (
        <div className={`rounded-xl border p-4 ${style.bg} ${style.border}`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className={`font-medium ${style.title}`}>{title}</p>
                            <p className={`text-sm mt-0.5 ${style.text}`}>{message}</p>
                        </div>
                        {onDismiss && (
                            <button
                                onClick={onDismiss}
                                className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${style.text}`}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        {timestamp && (
                            <span className={`text-xs ${style.text} opacity-70`}>
                                {timestamp.toLocaleString('id-ID')}
                            </span>
                        )}
                        {action && (
                            <button
                                onClick={action.onClick}
                                className={`flex items-center gap-1 text-xs font-medium ${style.title} hover:underline`}
                            >
                                {action.label}
                                <ExternalLink size={12} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecurityAlert;
