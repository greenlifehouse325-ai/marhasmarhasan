/**
 * System Control Component
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Panel kontrol sistem
 */

'use client';

import React, { useState } from 'react';
import {
    Power,
    RefreshCw,
    Database,
    Shield,
    AlertTriangle,
    CheckCircle,
    Loader2,
    Server,
} from 'lucide-react';
import { CooldownAction } from '@/components/shared/CooldownAction';

interface SystemStatus {
    server: 'online' | 'offline' | 'maintenance';
    database: 'connected' | 'disconnected' | 'slow';
    cache: 'healthy' | 'stale' | 'cleared';
    security: 'normal' | 'alert' | 'lockdown';
}

interface SystemControlProps {
    status: SystemStatus;
    onMaintenance?: () => Promise<void>;
    onClearCache?: () => Promise<void>;
    onRestart?: () => Promise<void>;
    onLockdown?: () => Promise<void>;
}

export function SystemControl({
    status,
    onMaintenance,
    onClearCache,
    onRestart,
    onLockdown,
}: SystemControlProps) {
    const [isClearing, setIsClearing] = useState(false);

    const handleClearCache = async () => {
        setIsClearing(true);
        try {
            await onClearCache?.();
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Status Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatusCard
                    label="Server"
                    status={status.server}
                    icon={<Server size={20} />}
                />
                <StatusCard
                    label="Database"
                    status={status.database === 'connected' ? 'online' : status.database === 'slow' ? 'warning' : 'offline'}
                    icon={<Database size={20} />}
                />
                <StatusCard
                    label="Cache"
                    status={status.cache === 'healthy' ? 'online' : status.cache === 'stale' ? 'warning' : 'offline'}
                    icon={<RefreshCw size={20} />}
                />
                <StatusCard
                    label="Security"
                    status={status.security === 'normal' ? 'online' : status.security === 'alert' ? 'warning' : 'danger'}
                    icon={<Shield size={20} />}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Clear Cache */}
                    <ActionCard
                        title="Clear Cache"
                        description="Hapus semua cache sistem"
                        icon={<RefreshCw size={20} />}
                        variant="blue"
                        isLoading={isClearing}
                        onClick={handleClearCache}
                    />

                    {/* Maintenance Mode */}
                    <div>
                        <CooldownAction
                            label="Maintenance Mode"
                            description="Aktifkan mode maintenance, user tidak bisa akses"
                            icon={<Power size={16} />}
                            variant="warning"
                            cooldownSeconds={10}
                            onExecute={async () => { await onMaintenance?.(); }}
                        />
                    </div>
                </div>
            </div>

            {/* Dangerous Actions */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-red-500" />
                    <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
                </div>
                <p className="text-sm text-red-600 mb-4">
                    Aksi-aksi ini memiliki dampak besar pada sistem. Gunakan dengan hati-hati.
                </p>
                <div className="flex flex-wrap gap-3">
                    <CooldownAction
                        label="Emergency Lockdown"
                        description="Kunci semua akses ke sistem. Logout semua user."
                        icon={<Shield size={16} />}
                        variant="danger"
                        cooldownSeconds={30}
                        confirmationText="Lockdown sistem sekarang"
                        onExecute={async () => { await onLockdown?.(); }}
                    />
                    <CooldownAction
                        label="System Restart"
                        description="Restart server. Downtime sekitar 2-5 menit."
                        icon={<Power size={16} />}
                        variant="danger"
                        cooldownSeconds={60}
                        confirmationText="Restart sistem sekarang"
                        onExecute={async () => { await onRestart?.(); }}
                    />
                </div>
            </div>
        </div>
    );
}

function StatusCard({
    label,
    status,
    icon,
}: {
    label: string;
    status: 'online' | 'offline' | 'warning' | 'maintenance' | 'danger';
    icon: React.ReactNode;
}) {
    const statusConfig = {
        online: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'Online' },
        offline: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'Offline' },
        warning: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Warning' },
        maintenance: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Maintenance' },
        danger: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'Alert' },
    };

    const config = statusConfig[status];

    return (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <span className={config.text}>{icon}</span>
                <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
            </div>
            <p className="font-medium text-gray-800">{label}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        </div>
    );
}

function ActionCard({
    title,
    description,
    icon,
    variant,
    isLoading,
    onClick,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    variant: 'blue' | 'green' | 'amber';
    isLoading?: boolean;
    onClick?: () => void;
}) {
    const variantStyles = {
        blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
        green: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
        amber: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200',
    };

    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`w-full text-left p-4 rounded-xl border transition-colors ${variantStyles[variant]} disabled:opacity-50`}
        >
            <div className="flex items-center gap-3">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : icon}
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-xs opacity-70">{description}</p>
                </div>
            </div>
        </button>
    );
}

export default SystemControl;
