/**
 * Device Approval Component
 * SMK Marhas Admin Dashboard - Auth
 * 
 * Komponen untuk approval device di halaman login
 */

'use client';

import React from 'react';
import { Monitor, Smartphone, Tablet, Globe, Clock, CheckCircle, XCircle } from 'lucide-react';

interface DeviceInfo {
    name: string;
    browser: string;
    os: string;
    ip: string;
    location?: string;
    detectedAt: Date;
}

interface DeviceApprovalProps {
    device: DeviceInfo;
    onApprove: () => void;
    onDeny: () => void;
    isLoading?: boolean;
}

export function DeviceApproval({ device, onApprove, onDeny, isLoading }: DeviceApprovalProps) {
    const getDeviceIcon = () => {
        const name = device.name.toLowerCase();
        if (name.includes('mobile') || name.includes('iphone') || name.includes('android')) {
            return <Smartphone size={28} />;
        }
        if (name.includes('tablet') || name.includes('ipad')) {
            return <Tablet size={28} />;
        }
        return <Monitor size={28} />;
    };

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                    {getDeviceIcon()}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Perangkat Baru Terdeteksi</h3>
                    <p className="text-sm text-gray-600 mt-1">{device.name}</p>

                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Globe size={14} />
                            <span>IP: {device.ip}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Monitor size={14} />
                            <span>{device.browser}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={14} />
                            <span>{device.detectedAt.toLocaleTimeString('id-ID')}</span>
                        </div>
                        {device.location && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <Globe size={14} />
                                <span>{device.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={onApprove}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50"
                >
                    <CheckCircle size={16} />
                    Ini Saya
                </button>
                <button
                    onClick={onDeny}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 disabled:opacity-50"
                >
                    <XCircle size={16} />
                    Bukan Saya
                </button>
            </div>
        </div>
    );
}

export default DeviceApproval;
