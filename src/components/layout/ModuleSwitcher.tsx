/**
 * Module Switcher Component
 * SMK Marhas Admin Dashboard
 * 
 * Floating component untuk Super Admin quick-switch antar modul
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Grid3X3,
    X,
    ChevronRight,
    Home,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
    getModuleFromPath,
    getAccessibleModulesForSuperAdmin,
    MODULE_CONFIGS,
    type ModuleType
} from '@/lib/moduleUtils';

export default function ModuleSwitcher() {
    const { user } = useAuth();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Only show for super_admin
    if (user?.role !== 'super_admin') {
        return null;
    }

    const currentModule = getModuleFromPath(pathname);
    const accessibleModules = getAccessibleModulesForSuperAdmin();
    const superAdminConfig = MODULE_CONFIGS['super-admin'];

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed bottom-6 right-6 z-50
                    w-14 h-14 rounded-2xl shadow-lg
                    flex items-center justify-center
                    transition-all duration-300
                    ${isOpen
                        ? 'bg-gray-800 rotate-90'
                        : 'bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600'
                    }
                `}
                title="Pindah Modul"
            >
                {isOpen ? (
                    <X size={24} className="text-white" />
                ) : (
                    <Grid3X3 size={24} className="text-white" />
                )}
            </button>

            {/* Module Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="fixed bottom-24 right-6 z-50 w-80 animate-slideUp">
                        <div className="bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-light)] overflow-hidden">
                            {/* Header */}
                            <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white">
                                <h3 className="font-semibold text-lg">Pindah Modul</h3>
                                <p className="text-sm text-white/80">Pilih modul untuk dikelola</p>
                            </div>

                            {/* Current Module Indicator */}
                            {currentModule !== 'super-admin' && currentModule !== 'shared' && (
                                <div className="px-4 py-3 bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                                    <p className="text-xs text-[var(--text-muted)] mb-1">Sedang di:</p>
                                    <div className="flex items-center gap-2">
                                        {(() => {
                                            const config = MODULE_CONFIGS[currentModule];
                                            const Icon = config.icon;
                                            return (
                                                <>
                                                    <div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                        style={{ backgroundColor: config.color, color: 'white' }}
                                                    >
                                                        <Icon size={18} />
                                                    </div>
                                                    <span className="font-medium text-[var(--text-primary)]">
                                                        {config.nameFull}
                                                    </span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}

                            {/* Module List */}
                            <div className="p-2 max-h-80 overflow-y-auto">
                                {/* Super Admin Home */}
                                <Link
                                    href="/super-admin"
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-xl mb-1
                                        transition-all group
                                        ${currentModule === 'super-admin'
                                            ? 'bg-violet-500/15 border border-violet-500/30'
                                            : 'hover:bg-[var(--bg-hover)]'
                                        }
                                    `}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{
                                            backgroundColor: superAdminConfig.color,
                                            color: 'white'
                                        }}
                                    >
                                        <Home size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-[var(--text-primary)]">
                                            Dashboard Super Admin
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">
                                            Kembali ke beranda
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </Link>

                                {/* Divider */}
                                <div className="h-px bg-[var(--border-light)] my-2" />

                                {/* Other Modules */}
                                {accessibleModules.map((module) => {
                                    const Icon = module.icon;
                                    const isActive = currentModule === module.id;

                                    return (
                                        <Link
                                            key={module.id}
                                            href={module.basePath}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                                                flex items-center gap-3 p-3 rounded-xl mb-1
                                                transition-all group
                                                ${isActive
                                                    ? 'bg-[var(--bg-active)] border border-[var(--border-medium)]'
                                                    : 'hover:bg-[var(--bg-hover)]'
                                                }
                                            `}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                                style={{
                                                    backgroundColor: `${module.color}20`,
                                                    color: module.color
                                                }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-[var(--text-primary)]">
                                                    {module.name}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                                                    {module.description}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                size={16}
                                                className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 bg-[var(--bg-hover)] border-t border-[var(--border-light)]">
                                <p className="text-xs text-[var(--text-muted)] text-center">
                                    Tekan <kbd className="px-1.5 py-0.5 bg-[var(--bg-card)] rounded text-[var(--text-secondary)]">Esc</kbd> untuk menutup
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Animation styles */}
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.2s ease-out;
                }
            `}</style>
        </>
    );
}
