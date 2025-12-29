/**
 * Audit Log Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk melihat semua aktivitas admin dalam sistem
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    FileSearch,
    Search,
    Filter,
    Download,
    Calendar,
    User,
    Activity,
    Shield,
    Plus,
    Edit,
    Trash2,
    Eye,
    LogIn,
    LogOut,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    X,
} from 'lucide-react';

// Mock Audit Log Data
const MOCK_AUDIT_LOGS = [
    {
        id: 'log-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        admin: 'Admin Perpustakaan',
        adminRole: 'admin_perpustakaan',
        action: 'create',
        module: 'Buku',
        description: 'Menambahkan buku baru: "Pemrograman Web Dasar"',
        ip: '192.168.1.100',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-002',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        admin: 'Admin Keuangan',
        adminRole: 'admin_keuangan',
        action: 'update',
        module: 'SPP',
        description: 'Memverifikasi pembayaran SPP Ahmad Rizky',
        ip: '192.168.1.101',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-003',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        admin: 'Admin Absensi',
        adminRole: 'admin_absensi',
        action: 'create',
        module: 'Session',
        description: 'Membuat session absensi: "Upacara Bendera"',
        ip: '192.168.1.102',
        userAgent: 'Firefox/121.0',
    },
    {
        id: 'log-004',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        admin: 'Super Admin',
        adminRole: 'super_admin',
        action: 'login',
        module: 'Auth',
        description: 'Login berhasil dengan verifikasi OTP',
        ip: '192.168.1.1',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-005',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        admin: 'Admin Jadwal',
        adminRole: 'admin_jadwal',
        action: 'update',
        module: 'Jadwal',
        description: 'Mengubah jadwal kelas XII PPLG 1',
        ip: '192.168.1.103',
        userAgent: 'Safari/17.0',
    },
    {
        id: 'log-006',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        admin: 'Admin Aplikasi',
        adminRole: 'admin_aplikasi',
        action: 'create',
        module: 'Pengumuman',
        description: 'Mempublikasikan pengumuman: "Jadwal UAS"',
        ip: '192.168.1.104',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-007',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        admin: 'Admin Perpustakaan',
        adminRole: 'admin_perpustakaan',
        action: 'delete',
        module: 'Buku',
        description: 'Menghapus buku rusak: "Matematika Dasar (ED. Lama)"',
        ip: '192.168.1.100',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-008',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        admin: 'Super Admin',
        adminRole: 'super_admin',
        action: 'security',
        module: 'System',
        description: 'Mengaktifkan mode maintenance',
        ip: '192.168.1.1',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-009',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        admin: 'Admin Keuangan',
        adminRole: 'admin_keuangan',
        action: 'view',
        module: 'Laporan',
        description: 'Mengunduh laporan keuangan bulanan',
        ip: '192.168.1.101',
        userAgent: 'Chrome/120.0',
    },
    {
        id: 'log-010',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        admin: 'Admin Absensi',
        adminRole: 'admin_absensi',
        action: 'logout',
        module: 'Auth',
        description: 'Logout dari sistem',
        ip: '192.168.1.102',
        userAgent: 'Firefox/121.0',
    },
];

const ACTION_ICONS: Record<string, React.ReactNode> = {
    create: <Plus size={14} />,
    update: <Edit size={14} />,
    delete: <Trash2 size={14} />,
    view: <Eye size={14} />,
    login: <LogIn size={14} />,
    logout: <LogOut size={14} />,
    security: <Shield size={14} />,
};

const ACTION_COLORS: Record<string, { bg: string; text: string }> = {
    create: { bg: 'bg-green-100', text: 'text-green-700' },
    update: { bg: 'bg-blue-100', text: 'text-blue-700' },
    delete: { bg: 'bg-red-100', text: 'text-red-700' },
    view: { bg: 'bg-gray-100', text: 'text-gray-700' },
    login: { bg: 'bg-purple-100', text: 'text-purple-700' },
    logout: { bg: 'bg-orange-100', text: 'text-orange-700' },
    security: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

export default function AuditLogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAction, setSelectedAction] = useState<string>('all');
    const [selectedAdmin, setSelectedAdmin] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get unique admins for filter
    const uniqueAdmins = [...new Set(MOCK_AUDIT_LOGS.map(l => l.admin))];

    // Filter logs
    const filteredLogs = MOCK_AUDIT_LOGS.filter(log => {
        const matchesSearch =
            log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.module.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesAction = selectedAction === 'all' || log.action === selectedAction;
        const matchesAdmin = selectedAdmin === 'all' || log.admin === selectedAdmin;

        return matchesSearch && matchesAction && matchesAdmin;
    });

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedAction('all');
        setSelectedAdmin('all');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery || selectedAction !== 'all' || selectedAdmin !== 'all';

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return `${minutes} menit lalu`;
        if (hours < 24) return `${hours} jam lalu`;
        if (days === 1) return 'Kemarin';
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <span>Audit Log</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Audit Log</h1>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download size={16} />
                    Export Log
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Aktivitas" value={MOCK_AUDIT_LOGS.length.toString()} icon={<Activity size={20} />} color="#7C3AED" />
                <StatCard label="Hari Ini" value={MOCK_AUDIT_LOGS.filter(l => {
                    const today = new Date();
                    return l.timestamp.toDateString() === today.toDateString();
                }).length.toString()} icon={<Calendar size={20} />} color="#3B82F6" />
                <StatCard label="Create/Update" value={MOCK_AUDIT_LOGS.filter(l => ['create', 'update'].includes(l.action)).length.toString()} icon={<Edit size={20} />} color="#10B981" />
                <StatCard label="Security Events" value={MOCK_AUDIT_LOGS.filter(l => ['security', 'login', 'logout'].includes(l.action)).length.toString()} icon={<Shield size={20} />} color="#F59E0B" />
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari aktivitas, admin, atau modul..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${showFilters || hasActiveFilters
                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Tipe Aksi</label>
                            <select
                                value={selectedAction}
                                onChange={(e) => setSelectedAction(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            >
                                <option value="all">Semua Aksi</option>
                                <option value="create">Create</option>
                                <option value="update">Update</option>
                                <option value="delete">Delete</option>
                                <option value="view">View</option>
                                <option value="login">Login</option>
                                <option value="logout">Logout</option>
                                <option value="security">Security</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Admin</label>
                            <select
                                value={selectedAdmin}
                                onChange={(e) => setSelectedAdmin(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            >
                                <option value="all">Semua Admin</option>
                                {uniqueAdmins.map(admin => (
                                    <option key={admin} value={admin}>{admin}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <X size={16} />
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Log List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {paginatedLogs.length === 0 ? (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <FileSearch size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>Tidak ada log yang ditemukan</p>
                        </div>
                    ) : (
                        paginatedLogs.map((log) => {
                            const actionStyle = ACTION_COLORS[log.action] || ACTION_COLORS.view;

                            return (
                                <div key={log.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        {/* Action Icon */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${actionStyle.bg} ${actionStyle.text}`}>
                                            {ACTION_ICONS[log.action]}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-800">{log.description}</p>
                                            <div className="flex flex-wrap items-center gap-3 mt-1">
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <User size={12} />
                                                    {log.admin}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Activity size={12} />
                                                    {log.module}
                                                </span>
                                                <span className="text-xs text-gray-400">{log.ip}</span>
                                            </div>
                                        </div>

                                        {/* Timestamp */}
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">{formatTimestamp(log.timestamp)}</p>
                                            <p className="text-xs text-gray-400">
                                                {log.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredLogs.length)} dari {filteredLogs.length} log
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </div>
        </div>
    );
}
