/**
 * Auth Layout
 * SMK Marhas Admin Dashboard
 * 
 * Layout wrapper untuk halaman autentikasi (login, OTP, dll)
 * Dengan dark mode support
 */

import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-300">
            {children}
        </div>
    );
}
