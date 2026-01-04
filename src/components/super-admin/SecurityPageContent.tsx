/**
 * Security Center Page Content (Client Component)
 * SMK Marhas Admin Dashboard - Super Admin
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    Monitor,
    Key,
    Lock,
    Globe,
    // Clock, // Unused
    // Eye, // Unused
    // Trash2, // Unused
} from 'lucide-react';
import { SecurityAlert } from '@/components/auth/SecurityAlert';

// Mock security alerts
const MOCK_ALERTS = [
    { id: '1', severity: 'high' as const, title: 'Login Gagal Berulang', message: 'Email admin@test.com mencoba login 5 kali berturut-turut', timestamp: new Date() },
    { id: '2', severity: 'medium' as const, title: 'Perangkat Baru Terdeteksi', message: 'Perangkat baru login untuk akun perpus@marhas.sch.id', timestamp: new Date(Date.now() - 3600000) },
    { id: '3', severity: 'low' as const, title: 'Password Expired', message: 'Password admin jadwal akan expired dalam 7 hari', timestamp: new Date(Date.now() - 7200000) },
];

export default function SecurityPageContent() {
    const [alerts, setAlerts] = useState(MOCK_ALERTS);

    const removeAlert = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <span>Security Center</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Security Center</h1>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    label="Security Score"
                    value="92%"
                    icon={<Shield size={24} />}
                    color="#10B981"
                    status="good"
                />
                <StatCard
                    label="Active Alerts"
                    value={alerts.length.toString()}
                    icon={<AlertTriangle size={24} />}
                    color="#F59E0B"
                    status={alerts.length > 2 ? 'warning' : 'good'}
                />
                <StatCard
                    label="Active Sessions"
                    value="12"
                    icon={<Monitor size={24} />}
                    color="#3B82F6"
                    status="good"
                />
                <StatCard
                    label="2FA Enabled"
                    value="100%"
                    icon={<Key size={24} />}
                    color="#8B5CF6"
                    status="good"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Security Alerts */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Alerts</h2>
                    <div className="space-y-3">
                        {alerts.length === 0 ? (
                            <div className="text-center py-8">
                                <CheckCircle size={40} className="mx-auto text-green-400 mb-3" />
                                <p className="text-gray-500">Tidak ada alert keamanan</p>
                            </div>
                        ) : (
                            alerts.map(alert => (
                                <SecurityAlert
                                    key={alert.id}
                                    severity={alert.severity}
                                    title={alert.title}
                                    message={alert.message}
                                    timestamp={alert.timestamp}
                                    onDismiss={() => removeAlert(alert.id)}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <ActionButton
                            icon={<Lock size={18} />}
                            label="Force Logout All Sessions"
                            description="Paksa semua sesi untuk logout"
                            variant="danger"
                        />
                        <ActionButton
                            icon={<Key size={18} />}
                            label="Reset All Passwords"
                            description="Kirim email reset password ke semua admin"
                            variant="warning"
                        />
                        <ActionButton
                            icon={<Monitor size={18} />}
                            label="View Active Devices"
                            description="Lihat semua perangkat yang terhubung"
                            variant="default"
                            href="/super-admin/security/devices"
                        />
                        <ActionButton
                            icon={<Globe size={18} />}
                            label="IP Whitelist"
                            description="Kelola daftar IP yang diizinkan"
                            variant="default"
                        />
                    </div>
                </div>
            </div>

            {/* Recent Login Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Login Activity</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500">
                                <th className="pb-3 font-medium">Admin</th>
                                <th className="pb-3 font-medium">IP Address</th>
                                <th className="pb-3 font-medium">Device</th>
                                <th className="pb-3 font-medium">Time</th>
                                <th className="pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: 'Super Admin', ip: '192.168.1.100', device: 'Chrome / Windows', time: '2 menit lalu', status: 'success' },
                                { name: 'Admin Perpustakaan', ip: '192.168.1.101', device: 'Firefox / Mac', time: '1 jam lalu', status: 'success' },
                                { name: 'admin@test.com', ip: '185.45.23.12', device: 'Unknown', time: '3 jam lalu', status: 'failed' },
                            ].map((activity, idx) => (
                                <tr key={idx} className="text-sm">
                                    <td className="py-3">{activity.name}</td>
                                    <td className="py-3 font-mono text-gray-600">{activity.ip}</td>
                                    <td className="py-3 text-gray-600">{activity.device}</td>
                                    <td className="py-3 text-gray-500">{activity.time}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${activity.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {activity.status === 'success' ? 'Berhasil' : 'Gagal'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color, status }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    status: 'good' | 'warning' | 'danger';
}) {
    const statusColors = {
        good: 'from-green-500 to-emerald-600',
        warning: 'from-amber-500 to-orange-600',
        danger: 'from-red-500 to-rose-600',
    };

    return (
        <div className={`bg-gradient-to-br ${statusColors[status]} rounded-2xl p-5 text-white`}>
            <div className="flex items-start justify-between">
                <div>{icon}</div>
            </div>
            <div className="mt-4">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm opacity-80 mt-1">{label}</p>
            </div>
        </div>
    );
}

function ActionButton({
    icon,
    label,
    description,
    variant,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    description: string;
    variant: 'default' | 'warning' | 'danger';
    href?: string;
}) {
    const variantStyles = {
        default: 'text-gray-700 hover:bg-gray-100',
        warning: 'text-amber-700 hover:bg-amber-50',
        danger: 'text-red-700 hover:bg-red-50',
    };

    const Wrapper = href ? Link : 'button';

    return (
        <Wrapper
            href={href || ''}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${variantStyles[variant]}`}
        >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${variant === 'danger' ? 'bg-red-100' : variant === 'warning' ? 'bg-amber-100' : 'bg-gray-100'
                }`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="font-medium">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </Wrapper>
    );
}
