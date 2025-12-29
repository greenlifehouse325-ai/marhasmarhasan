/**
 * Halaman Notifikasi
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk melihat dan mengelola notifikasi
 */

'use client';

import React, { useState } from 'react';
import {
    Bell,
    CheckCircle,
    AlertTriangle,
    Info,
    MessageSquare,
    Calendar,
    DollarSign,
    BookOpen,
    Clock,
    Check,
    Trash2,
    MoreVertical,
} from 'lucide-react';

interface Notification {
    id: string;
    type: 'info' | 'warning' | 'success' | 'message';
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    category: 'attendance' | 'payment' | 'library' | 'schedule' | 'system';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', type: 'warning', title: 'Peringatan Kehadiran', message: 'Ahmad Budi (XII PPLG 1) sudah 3 hari tidak hadir tanpa keterangan.', time: '5 menit lalu', isRead: false, category: 'attendance' },
    { id: '2', type: 'success', title: 'Pembayaran Diterima', message: 'SPP bulan Desember untuk Siti Aminah (XI TKJ 2) telah dikonfirmasi.', time: '30 menit lalu', isRead: false, category: 'payment' },
    { id: '3', type: 'info', title: 'Buku Dikembalikan', message: 'Buku "Pemrograman Web" telah dikembalikan oleh Dewi Lestari.', time: '1 jam lalu', isRead: false, category: 'library' },
    { id: '4', type: 'warning', title: 'Perubahan Jadwal', message: 'Jadwal mata pelajaran Matematika kelas XII diubah ke ruang 203.', time: '2 jam lalu', isRead: true, category: 'schedule' },
    { id: '5', type: 'message', title: 'Pengumuman Baru', message: 'Libur Tahun Baru 2025 dimulai tanggal 31 Desember - 1 Januari.', time: '3 jam lalu', isRead: true, category: 'system' },
    { id: '6', type: 'info', title: 'Backup Sukses', message: 'Backup database harian telah selesai dilakukan.', time: '5 jam lalu', isRead: true, category: 'system' },
];

const TYPE_ICONS = {
    info: <Info size={18} className="text-blue-500" />,
    warning: <AlertTriangle size={18} className="text-amber-500" />,
    success: <CheckCircle size={18} className="text-green-500" />,
    message: <MessageSquare size={18} className="text-indigo-500" />,
};

const CATEGORY_ICONS = {
    attendance: <Clock size={14} />,
    payment: <DollarSign size={14} />,
    library: <BookOpen size={14} />,
    schedule: <Calendar size={14} />,
    system: <Bell size={14} />,
};

export default function NotifikasiPage() {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.isRead);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notifikasi</h1>
                    <p className="text-gray-500">{unreadCount} notifikasi belum dibaca</p>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                    >
                        <Check size={16} />
                        Tandai Semua Dibaca
                    </button>
                )}
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50'
                        }`}
                >
                    Semua
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${filter === 'unread' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50'
                        }`}
                >
                    Belum Dibaca
                    {unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Notification List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {filteredNotifications.length === 0 ? (
                    <div className="p-12 text-center">
                        <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada notifikasi</h3>
                        <p className="text-gray-500">Semua notifikasi sudah dibaca</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredNotifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notification.type === 'info' ? 'bg-blue-100' :
                                            notification.type === 'warning' ? 'bg-amber-100' :
                                                notification.type === 'success' ? 'bg-green-100' : 'bg-indigo-100'
                                        }`}>
                                        {TYPE_ICONS[notification.type]}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                                            </div>
                                            {!notification.isRead && (
                                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    {CATEGORY_ICONS[notification.category]}
                                                    {notification.category === 'attendance' ? 'Absensi' :
                                                        notification.category === 'payment' ? 'Keuangan' :
                                                            notification.category === 'library' ? 'Perpustakaan' :
                                                                notification.category === 'schedule' ? 'Jadwal' : 'Sistem'}
                                                </span>
                                                <span>{notification.time}</span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                {!notification.isRead && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Tandai dibaca"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
