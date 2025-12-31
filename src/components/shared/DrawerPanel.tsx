/**
 * Drawer Panel Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    position?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
};

export function DrawerPanel({ isOpen, onClose, title, children, position = 'right', size = 'md' }: DrawerPanelProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} top-0 h-full w-full ${sizeClasses[size]} bg-[var(--bg-card)] shadow-2xl flex flex-col animate-slideInDrawer`} style={{ '--drawer-dir': position === 'right' ? '1' : '-1' } as React.CSSProperties}>
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                            <X size={20} className="text-[var(--text-muted)]" />
                        </button>
                    </div>
                )}
                <div className="flex-1 overflow-y-auto p-4">{children}</div>
            </div>
            <style jsx global>{`
                @keyframes slideInDrawer { from { transform: translateX(calc(100% * var(--drawer-dir))); } to { transform: translateX(0); } }
                .animate-slideInDrawer { animation: slideInDrawer 0.3s ease-out; }
            `}</style>
        </div>
    );
}
