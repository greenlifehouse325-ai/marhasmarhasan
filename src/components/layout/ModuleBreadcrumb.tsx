/**
 * Module Breadcrumb Component
 * SMK Marhas Admin Dashboard
 * 
 * Breadcrumb kontekstual untuk Super Admin saat di modul lain
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
    getModuleFromPath,
    getModuleConfig,
    generateModuleBreadcrumb,
    isSuperAdminInOtherModule,
} from '@/lib/moduleUtils';

export default function ModuleBreadcrumb() {
    const { user } = useAuth();
    const pathname = usePathname();

    // Only show for super_admin in other modules
    if (!user || !isSuperAdminInOtherModule(user.role, pathname)) {
        return null;
    }

    const currentModule = getModuleFromPath(pathname);
    const moduleConfig = getModuleConfig(currentModule);
    const breadcrumbItems = generateModuleBreadcrumb(pathname);
    const Icon = moduleConfig.icon;

    return (
        <div
            className="mb-4 p-3 rounded-xl border"
            style={{
                backgroundColor: `${moduleConfig.color}08`,
                borderColor: `${moduleConfig.color}30`,
            }}
        >
            <div className="flex items-center justify-between flex-wrap gap-2">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm flex-wrap">
                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={item.href}>
                            {index > 0 && (
                                <ChevronRight
                                    size={14}
                                    className="text-[var(--text-muted)] shrink-0"
                                />
                            )}
                            {index === breadcrumbItems.length - 1 ? (
                                // Current page (not a link)
                                <span
                                    className="font-medium"
                                    style={{ color: item.isModule ? moduleConfig.color : 'var(--text-primary)' }}
                                >
                                    {item.isModule && index === 1 && (
                                        <span className="inline-flex items-center gap-1">
                                            <Icon size={14} />
                                            {item.label}
                                        </span>
                                    )}
                                    {!(item.isModule && index === 1) && item.label}
                                </span>
                            ) : (
                                // Clickable link
                                <Link
                                    href={item.href}
                                    className="hover:underline transition-colors"
                                    style={{
                                        color: item.isModule ? moduleConfig.color : 'var(--text-secondary)'
                                    }}
                                >
                                    {index === 0 ? (
                                        <span className="inline-flex items-center gap-1">
                                            <Home size={14} />
                                            {item.label}
                                        </span>
                                    ) : item.isModule ? (
                                        <span className="inline-flex items-center gap-1">
                                            <Icon size={14} />
                                            {item.label}
                                        </span>
                                    ) : (
                                        item.label
                                    )}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Quick Back Button */}
                <Link
                    href="/super-admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{
                        backgroundColor: `${moduleConfig.color}15`,
                        color: moduleConfig.color,
                    }}
                >
                    <ArrowLeft size={12} />
                    Kembali ke Super Admin
                </Link>
            </div>

            {/* Module Indicator Bar */}
            <div className="mt-2 flex items-center gap-2">
                <div
                    className="w-1 h-4 rounded-full"
                    style={{ backgroundColor: moduleConfig.color }}
                />
                <span className="text-xs text-[var(--text-muted)]">
                    Anda sedang mengakses <strong style={{ color: moduleConfig.color }}>{moduleConfig.nameFull}</strong> sebagai Super Admin
                </span>
            </div>
        </div>
    );
}
