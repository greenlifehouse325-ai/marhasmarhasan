/**
 * Audit Log Viewer Component
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Komponen untuk melihat audit logs
 */

'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    User,
    Shield,
    Settings,
    FileText,
    AlertTriangle,
    CheckCircle,
    Clock,
} from 'lucide-react';

interface AuditLog {
    id: string;
    action: string;
    resource: string;
    resourceId?: string;
    userId: string;
    userName: string;
    userRole: string;
    ipAddress: string;
    timestamp: Date;
    status: 'success' | 'failed' | 'warning';
    details?: Record<string, unknown>;
}

interface AuditLogViewerProps {
    logs: AuditLog[];
    onViewDetails?: (log: AuditLog) => void;
}

const ACTION_ICONS: Record<string, React.ReactNode> = {
    create: <FileText size={14} className="text-green-500" />,
    update: <Settings size={14} className="text-blue-500" />,
    delete: <AlertTriangle size={14} className="text-red-500" />,
    login: <User size={14} className="text-indigo-500" />,
    logout: <User size={14} className="text-gray-500" />,
    permission: <Shield size={14} className="text-purple-500" />,
};

const STATUS_STYLES = {
    success: { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle size={12} /> },
    failed: { bg: 'bg-red-100', text: 'text-red-700', icon: <AlertTriangle size={12} /> },
    warning: { bg: 'bg-amber-100', text: 'text-amber-700', icon: <AlertTriangle size={12} /> },
};

export function AuditLogViewer({ logs, onViewDetails }: AuditLogViewerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAction, setSelectedAction] = useState<string>('all');

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAction = selectedAction === 'all' || log.action === selectedAction;
        return matchesSearch && matchesAction;
    });

    const uniqueActions = [...new Set(logs.map(l => l.action))];

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari log..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                </div>
                <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                >
                    <option value="all">Semua Aksi</option>
                    {uniqueActions.map(action => (
                        <option key={action} value={action}>{action}</option>
                    ))}
                </select>
            </div>

            {/* Logs */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {filteredLogs.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">Tidak ada log ditemukan</p>
                        </div>
                    ) : (
                        filteredLogs.map(log => (
                            <LogRow key={log.id} log={log} onViewDetails={onViewDetails} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function LogRow({ log, onViewDetails }: { log: AuditLog; onViewDetails?: (log: AuditLog) => void }) {
    const statusStyle = STATUS_STYLES[log.status];
    const actionIcon = ACTION_ICONS[log.action.toLowerCase()] || <FileText size={14} className="text-gray-500" />;

    return (
        <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {actionIcon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {log.action} - {log.resource}
                                {log.resourceId && <span className="text-gray-500"> #{log.resourceId}</span>}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                oleh {log.userName} ({log.userRole})
                            </p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                            {statusStyle.icon}
                            {log.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {log.timestamp.toLocaleString('id-ID')}
                        </span>
                        <span>IP: {log.ipAddress}</span>
                    </div>
                </div>
                {onViewDetails && (
                    <button
                        onClick={() => onViewDetails(log)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                    >
                        <Eye size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default AuditLogViewer;
