/**
 * Auth Layout
 * SMK Marhas Admin Dashboard
 * 
 * Layout wrapper untuk halaman autentikasi (login, OTP, dll)
 */

import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1E4D8C] via-[#1E3A6E] to-[#0F2847] flex">
            {children}
        </div>
    );
}
