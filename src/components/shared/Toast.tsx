/**
 * Toast Notification Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
}

interface ToastContextType {
    showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
}

const ICONS = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const COLORS = {
    success: { bg: 'bg-green-500', icon: 'text-green-500', border: 'border-green-500/20' },
    error: { bg: 'bg-red-500', icon: 'text-red-500', border: 'border-red-500/20' },
    warning: { bg: 'bg-amber-500', icon: 'text-amber-500', border: 'border-amber-500/20' },
    info: { bg: 'bg-blue-500', icon: 'text-blue-500', border: 'border-blue-500/20' },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, title: string, message?: string) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, title, message }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map(toast => {
                    const Icon = ICONS[toast.type];
                    const colors = COLORS[toast.type];
                    return (
                        <div key={toast.id} className={`flex items-start gap-3 p-4 bg-[var(--bg-card)] border ${colors.border} rounded-xl shadow-lg min-w-[300px] max-w-[400px] animate-slideIn`}>
                            <Icon size={20} className={colors.icon} />
                            <div className="flex-1">
                                <p className="font-medium text-[var(--text-primary)]">{toast.title}</p>
                                {toast.message && <p className="text-sm text-[var(--text-muted)] mt-0.5">{toast.message}</p>}
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                <X size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>
            <style jsx global>{`
                @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                .animate-slideIn { animation: slideIn 0.3s ease-out; }
            `}</style>
        </ToastContext.Provider>
    );
}
