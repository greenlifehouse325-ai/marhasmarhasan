/**
 * Forbidden Page Component
 * SMK Marhas Admin Dashboard
 * 
 * Halaman yang ditampilkan ketika user mencoba mengakses route yang tidak diizinkan
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldX, ArrowLeft, Home, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleDashboardPath } from '@/lib/routeAccessMap';

interface ForbiddenPageProps {
    attemptedPath?: string;
}

export default function ForbiddenPage({ attemptedPath }: ForbiddenPageProps) {
    const router = useRouter();
    const { user } = useAuth();

    const handleGoBack = () => {
        router.back();
    };

    const handleGoToDashboard = () => {
        if (user?.role) {
            const dashboardPath = getRoleDashboardPath(user.role);
            router.push(dashboardPath);
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 40px,
                            rgba(255,255,255,0.03) 40px,
                            rgba(255,255,255,0.03) 80px
                        )`
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-lg w-full">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                            <div className="w-24 h-24 rounded-full bg-red-500/30 flex items-center justify-center">
                                <ShieldX
                                    size={48}
                                    className="text-red-400"
                                />
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                            <Lock size={20} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Error Code */}
                <div className="text-center mb-4">
                    <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                        403
                    </h1>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                    Akses Ditolak
                </h2>

                {/* Message */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                    <p className="text-gray-300 text-center text-lg mb-4">
                        Anda <span className="text-red-400 font-semibold">tidak memiliki izin</span> untuk mengakses modul ini.
                    </p>
                    <p className="text-gray-400 text-center text-sm">
                        Halaman ini hanya dapat diakses oleh role yang berwenang.
                        Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
                    </p>

                    {attemptedPath && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-gray-500 text-xs text-center">
                                Attempted path: <code className="bg-white/10 px-2 py-1 rounded">{attemptedPath}</code>
                            </p>
                        </div>
                    )}
                </div>

                {/* User Info */}
                {user && (
                    <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium text-sm">{user.name}</p>
                                <p className="text-gray-400 text-xs capitalize">
                                    {user.role.replace(/_/g, ' ')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
                    >
                        <ArrowLeft size={20} />
                        <span>Kembali</span>
                    </button>

                    <button
                        onClick={handleGoToDashboard}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25"
                    >
                        <Home size={20} />
                        <span>Ke Dashboard</span>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-gray-500 text-xs text-center mt-8">
                    SMK Marhas Admin Dashboard • Security Gateway
                </p>
            </div>
        </div>
    );
}
