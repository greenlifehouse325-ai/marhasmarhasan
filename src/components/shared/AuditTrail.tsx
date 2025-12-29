/**
 * Audit Trail Component
 * SMK Marhas Admin Dashboard
 * 
 * Timeline audit log per resource
 */

'use client';

import React from 'react';
import {
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    Download,
    User,
    Clock,
    Globe,
} from 'lucide-react';

interface AuditEntry {
    id: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'EXPORT';
    timestamp: Date;
    userId: string;
    userName: string;
    userRole: string;
    ipAddress: string;
    details?: string;
}

interface AuditTrailProps {
    entries: AuditEntry[];
    title?: string;
    showHeader?: boolean;
}

const ACTION_ICONS = {
    CREATE: <PlusCircle size={14} className="text-green-500" />,
    UPDATE: <Edit size={14} className="text-blue-500" />,
    DELETE: <Trash2 size={14} className="text-red-500" />,
    VIEW: <Eye size={14} className="text-gray-500" />,
    EXPORT: <Download size={14} className="text-purple-500" />,
};

const ACTION_LABELS = {
    CREATE: 'Membuat',
    UPDATE: 'Mengubah',
    DELETE: 'Menghapus',
    VIEW: 'Melihat',
    EXPORT: 'Mengekspor',
};

const ACTION_COLORS = {
    CREATE: 'bg-green-100 border-green-300',
    UPDATE: 'bg-blue-100 border-blue-300',
    DELETE: 'bg-red-100 border-red-300',
    VIEW: 'bg-gray-100 border-gray-300',
    EXPORT: 'bg-purple-100 border-purple-300',
};

export function AuditTrail({ entries, title = 'Riwayat Aktivitas', showHeader = true }: AuditTrailProps) {
    if (entries.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                <p>Belum ada riwayat aktivitas</p>
            </div>
        );
    }

    return (
        <div>
            {showHeader && (
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            )}

            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

                {/* Entries */}
                <div className="space-y-4">
                    {entries.map((entry, index) => (
                        <div key={entry.id} className="relative flex gap-4">
                            {/* Icon */}
                            <div
                                className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center ${ACTION_COLORS[entry.action]}`}
                            >
                                {ACTION_ICONS[entry.action]}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-4">
                                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                <span className="text-gray-600">{entry.userName}</span>
                                                <span className="mx-1 text-gray-400">→</span>
                                                {ACTION_LABELS[entry.action]}
                                            </p>
                                            {entry.details && (
                                                <p className="text-sm text-gray-500 mt-0.5">{entry.details}</p>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">
                                            {formatTimeAgo(entry.timestamp)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <User size={10} />
                                            {entry.userRole}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Globe size={10} />
                                            {entry.ipAddress}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {entry.timestamp.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID');
}

export default AuditTrail;
