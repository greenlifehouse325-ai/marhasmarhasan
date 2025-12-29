/**
 * Device Card Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen untuk menampilkan info device
 */

'use client';

import React from 'react';
import { Monitor, Smartphone, Tablet, Globe, Clock, MapPin, Trash2, Shield, ShieldCheck } from 'lucide-react';

interface DeviceCardProps {
    id: string;
    name: string;
    browser: string;
    os: string;
    ipAddress: string;
    location?: string;
    lastUsed: Date;
    isWhitelisted: boolean;
    isCurrent?: boolean;
    onWhitelist?: (id: string) => void;
    onRemove?: (id: string) => void;
}

function getDeviceIcon(name: string) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('mobile') || lowerName.includes('phone')) {
        return <Smartphone size={24} />;
    }
    if (lowerName.includes('tablet') || lowerName.includes('ipad')) {
        return <Tablet size={24} />;
    }
    return <Monitor size={24} />;
}

export function DeviceCard({
    id,
    name,
    browser,
    os,
    ipAddress,
    location,
    lastUsed,
    isWhitelisted,
    isCurrent = false,
    onWhitelist,
    onRemove,
}: DeviceCardProps) {
    return (
        <div className={`p-4 rounded-xl border ${isCurrent ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start gap-4">
                {/* Device Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCurrent ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {getDeviceIcon(name)}
                </div>

                {/* Device Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{name}</p>
                        {isCurrent && (
                            <span className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                Perangkat Ini
                            </span>
                        )}
                        {isWhitelisted && (
                            <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                <ShieldCheck size={10} />
                                Trusted
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 mt-0.5">{browser} • {os}</p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Globe size={12} />
                            {ipAddress}
                        </span>
                        {location && (
                            <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {location}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {lastUsed.toLocaleDateString('id-ID')}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                {!isCurrent && (
                    <div className="flex items-center gap-1">
                        {!isWhitelisted && onWhitelist && (
                            <button
                                onClick={() => onWhitelist(id)}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Tambah ke whitelist"
                            >
                                <Shield size={16} />
                            </button>
                        )}
                        {onRemove && (
                            <button
                                onClick={() => onRemove(id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus perangkat"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DeviceCard;
