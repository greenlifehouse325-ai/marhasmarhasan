/**
 * Account Locked Page
 * SMK Marhas Admin Dashboard
 * 
 * Halaman ketika akun terkunci
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Clock, Mail, ArrowLeft } from 'lucide-react';

export default function LockedPage() {
    const [countdown, setCountdown] = useState(15 * 60); // 15 minutes

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield size={40} className="text-red-500" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Akun Terkunci</h1>
                    <p className="text-gray-600 mb-6">
                        Akun Anda telah dikunci sementara karena terlalu banyak percobaan login yang gagal.
                    </p>

                    {/* Countdown */}
                    <div className="bg-red-50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                            <Clock size={20} />
                            <span className="font-medium">Waktu Tunggu</span>
                        </div>
                        <p className="text-4xl font-bold text-red-600">{formatTime(countdown)}</p>
                        <p className="text-sm text-red-500 mt-2">
                            Silakan coba lagi setelah waktu berakhir
                        </p>
                    </div>

                    {/* Help Text */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                        <p className="text-sm text-amber-800">
                            <strong>Butuh bantuan?</strong> Hubungi administrator sistem untuk membuka kunci akun Anda.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <a
                            href="mailto:admin@marhas.sch.id"
                            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            <Mail size={18} />
                            Hubungi Admin
                        </a>

                        {countdown <= 0 && (
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                <ArrowLeft size={18} />
                                Coba Login Lagi
                            </Link>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2024 SMK Marhas. All rights reserved.
                </p>
            </div>
        </div>
    );
}
