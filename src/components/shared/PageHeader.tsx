/**
 * Page Header Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    backHref?: string;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, backHref, actions }: PageHeaderProps) {
    return (
        <div className="space-y-2">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1 text-sm">
                    {breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && <ChevronRight size={14} className="text-[var(--text-muted)]" />}
                            {crumb.href ? (
                                <Link href={crumb.href} className="text-[var(--text-muted)] hover:text-[var(--brand-primary)]">{crumb.label}</Link>
                            ) : (
                                <span className="text-[var(--text-primary)] font-medium">{crumb.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {backHref && (
                        <Link href={backHref} className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                            <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                        </Link>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
                        {description && <p className="text-[var(--text-muted)]">{description}</p>}
                    </div>
                </div>
                {actions && <div className="flex gap-2">{actions}</div>}
            </div>
        </div>
    );
}
