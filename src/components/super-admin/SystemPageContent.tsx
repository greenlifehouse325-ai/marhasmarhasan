/**
 * System Control Page Content (Client Component)
 * SMK Marhas Admin Dashboard - Super Admin
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Settings2,
    Power,
    Database,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    Loader2,
    Server,
    Wifi,
    HardDrive,
} from 'lucide-react';

export default function SystemPageContent() {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [isRestarting, setIsRestarting] = useState(false);
    const [isBackingUp, setIsBackingUp] = useState(false);

    const handleToggleMaintenance = () => {
        setIsMaintenanceMode(!isMaintenanceMode);
    };

    const handleRestart = async () => {
        setIsRestarting(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsRestarting(false);
    };

    const handleBackup = async () => {
        setIsBackingUp(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setIsBackingUp(false);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <span>System Control</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">System Control</h1>
                </div>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatusCard
                    label="Server Status"
                    value="Online"
                    icon={<Server size={20} />}
                    status="online"
                />
                <StatusCard
                    label="Database"
                    value="Connected"
                    icon={<Database size={20} />}
                    status="online"
                />
                <StatusCard
                    label="API"
                    value="Healthy"
                    icon={<Wifi size={20} />}
                    status="online"
                />
            </div>

            {/* Maintenance Mode */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isMaintenanceMode ? 'bg-amber-100' : 'bg-gray-100'
                            }`}>
                            <Settings2 size={28} className={isMaintenanceMode ? 'text-amber-600' : 'text-gray-600'} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Maintenance Mode</h3>
                            <p className="text-gray-500">
                                {isMaintenanceMode
                                    ? 'Sistem sedang dalam maintenance. User tidak bisa akses.'
                                    : 'Aktifkan untuk menonaktifkan akses user sementara.'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleToggleMaintenance}
                        className={`px-6 py-3 text-sm font-medium rounded-xl transition-colors ${isMaintenanceMode
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-amber-500 text-white hover:bg-amber-600'
                            }`}
                    >
                        {isMaintenanceMode ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                </div>

                {isMaintenanceMode && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                        <AlertTriangle className="text-amber-500" />
                        <p className="text-sm text-amber-700">
                            Maintenance mode aktif. Semua user (kecuali Super Admin) tidak bisa akses sistem.
                        </p>
                    </div>
                )}
            </div>

            {/* System Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backup */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <HardDrive size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Database Backup</h3>
                            <p className="text-sm text-gray-500">Last backup: 2 jam lalu</p>
                        </div>
                    </div>
                    <button
                        onClick={handleBackup}
                        disabled={isBackingUp}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isBackingUp ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Backing up...
                            </>
                        ) : (
                            <>
                                <HardDrive size={18} />
                                Backup Now
                            </>
                        )}
                    </button>
                </div>

                {/* Restart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                            <Power size={24} className="text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">System Restart</h3>
                            <p className="text-sm text-gray-500">Uptime: 15 hari, 4 jam</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRestart}
                        disabled={isRestarting}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isRestarting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Restarting...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={18} />
                                Restart System
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Resource Usage */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Resource Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ResourceBar label="CPU" value={45} color="#3B82F6" />
                    <ResourceBar label="Memory" value={62} color="#10B981" />
                    <ResourceBar label="Storage" value={78} color="#F59E0B" />
                </div>
            </div>
        </div>
    );
}

function StatusCard({ label, value, icon, status }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    status: 'online' | 'offline' | 'warning';
}) {
    const statusColors = {
        online: 'bg-green-100 text-green-600',
        offline: 'bg-red-100 text-red-600',
        warning: 'bg-amber-100 text-amber-600',
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[status]}`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-500">{label}</p>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">{value}</p>
                        <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : status === 'offline' ? 'bg-red-500' : 'bg-amber-500'
                            }`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResourceBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-medium" style={{ color }}>{value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${value}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}
