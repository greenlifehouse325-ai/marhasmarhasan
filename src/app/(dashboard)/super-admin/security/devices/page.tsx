/**
 * Devices Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Phone, Monitor, Tablet, Clock, MapPin, Trash2, Shield } from 'lucide-react';

const MOCK_DEVICES = [
    { id: 'D1', name: 'Chrome - Windows', type: 'desktop', ip: '192.168.1.100', location: 'Bandung', lastActive: '2024-01-15 16:00', current: true },
    { id: 'D2', name: 'Safari - iPhone', type: 'mobile', ip: '172.16.0.50', location: 'Bandung', lastActive: '2024-01-14 20:00', current: false },
    { id: 'D3', name: 'Firefox - MacOS', type: 'desktop', ip: '192.168.1.105', location: 'Jakarta', lastActive: '2024-01-10 09:00', current: false },
];

const deviceIcons = { desktop: Monitor, mobile: Phone, tablet: Tablet };

export default function DevicesPage() {
    const [devices, setDevices] = useState(MOCK_DEVICES);

    const removeDevice = (id: string) => {
        if (confirm('Hapus perangkat ini?')) {
            setDevices(devices.filter(d => d.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Perangkat Terdaftar</h1>
                <p className="text-[var(--text-muted)]">Kelola perangkat yang terhubung dengan akun</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{devices.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Perangkat</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-blue-600">{devices.filter(d => d.type === 'desktop').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Desktop</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">{devices.filter(d => d.type === 'mobile').length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Mobile</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-purple-600">1</p>
                    <p className="text-sm text-[var(--text-muted)]">Aktif Sekarang</p>
                </div>
            </div>

            <div className="space-y-3">
                {devices.map(device => {
                    const Icon = deviceIcons[device.type as keyof typeof deviceIcons] || Monitor;
                    return (
                        <div key={device.id} className={`bg-[var(--bg-card)] border rounded-xl p-4 ${device.current ? 'border-green-500/50' : 'border-[var(--border-light)]'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.current ? 'bg-green-500/10' : 'bg-[var(--bg-hover)]'}`}>
                                        <Icon size={24} className={device.current ? 'text-green-600' : 'text-[var(--text-muted)]'} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-[var(--text-primary)]">{device.name}</p>
                                            {device.current && <span className="px-2 py-0.5 text-xs bg-green-500/10 text-green-600 rounded-full">Perangkat Ini</span>}
                                        </div>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-[var(--text-muted)]">
                                            <span className="flex items-center gap-1"><MapPin size={14} />{device.location} • {device.ip}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} />Terakhir: {device.lastActive}</span>
                                        </div>
                                    </div>
                                </div>
                                {!device.current && (
                                    <button onClick={() => removeDevice(device.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 size={18} className="text-red-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
