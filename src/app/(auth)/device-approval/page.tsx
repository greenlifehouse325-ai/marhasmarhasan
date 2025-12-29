/**
 * Device Approval Page
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk approval perangkat baru
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Monitor,
    Smartphone,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ArrowLeft,
    Loader2,
    Shield,
    Globe,
    Clock,
} from 'lucide-react';

export default function DeviceApprovalPage() {
    const router = useRouter();
    const [isApproving, setIsApproving] = useState(false);
    const [isDenying, setIsDenying] = useState(false);

    // Mock device info
    const deviceInfo = {
        name: 'Chrome on Windows',
        browser: 'Chrome 120',
        os: 'Windows 11',
        ip: '192.168.1.105',
        location: 'Jakarta, Indonesia',
        detectedAt: new Date(),
    };

    const handleApprove = async () => {
        setIsApproving(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/super-admin');
    };

    const handleDeny = async () => {
        setIsDenying(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} className="text-amber-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Perangkat Baru Terdeteksi</h1>
                        <p className="text-gray-500 mt-2">
                            Kami mendeteksi login dari perangkat yang tidak dikenali
                        </p>
                    </div>

                    {/* Device Info Card */}
                    <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Monitor size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{deviceInfo.name}</p>
                                <p className="text-sm text-gray-500">{deviceInfo.browser} • {deviceInfo.os}</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Globe size={14} />
                                <span>IP: {deviceInfo.ip}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Shield size={14} />
                                <span>Lokasi: {deviceInfo.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock size={14} />
                                <span>Terdeteksi: {deviceInfo.detectedAt.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-amber-700">
                            <strong>Apakah ini Anda?</strong> Jika Anda tidak mengenali perangkat ini, pilih "Bukan Saya" untuk mengamankan akun.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={handleApprove}
                            disabled={isApproving || isDenying}
                            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            {isApproving ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Menyetujui...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={18} />
                                    Ya, Ini Saya
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleDeny}
                            disabled={isApproving || isDenying}
                            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                            {isDenying ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Mengamankan...
                                </>
                            ) : (
                                <>
                                    <XCircle size={18} />
                                    Bukan Saya (Amankan Akun)
                                </>
                            )}
                        </button>
                    </div>

                    {/* Help Text */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        Dengan menyetujui, perangkat ini akan ditambahkan ke daftar perangkat terpercaya.
                    </p>
                </div>
            </div>
        </div>
    );
}
