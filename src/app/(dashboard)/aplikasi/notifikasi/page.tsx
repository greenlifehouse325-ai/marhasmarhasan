/**
 * Notifikasi (Push Notifications) Page - Aplikasi Module  
 * SMK Marhas Admin Dashboard
 * 
 * Halaman manajemen push notification
 */

'use client';

import React, { useState } from 'react';
import {
    Bell,
    Send,
    Plus,
    Search,
    Clock,
    Users,
    CheckCircle,
    Filter,
    Eye
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const MOCK_NOTIFICATIONS = [
    {
        id: 'N001',
        title: 'Pengumuman Libur Natal',
        message: 'Sekolah libur pada tanggal 25-26 Desember 2024',
        target: 'Semua',
        sentAt: '2024-12-23 08:00',
        status: 'sent',
        delivered: 1234,
        read: 987
    },
    {
        id: 'N002',
        title: 'Reminder Pembayaran SPP',
        message: 'Jangan lupa bayar SPP bulan Desember sebelum tanggal 10',
        target: 'Orang Tua',
        sentAt: '2024-12-01 09:00',
        status: 'sent',
        delivered: 456,
        read: 412
    },
    {
        id: 'N003',
        title: 'Jadwal Ujian Semester',
        message: 'Ujian semester ganjil dimulai tanggal 16 Desember',
        target: 'Siswa',
        sentAt: null,
        status: 'scheduled',
        scheduledFor: '2024-12-15 06:00',
        delivered: 0,
        read: 0
    },
];

export default function NotifikasiPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const totalSent = MOCK_NOTIFICATIONS.filter(n => n.status === 'sent').length;
    const totalScheduled = MOCK_NOTIFICATIONS.filter(n => n.status === 'scheduled').length;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Push Notification
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Kelola notifikasi push ke aplikasi siswa dan orang tua
                    </p>
                </div>
                <Link
                    href="/aplikasi/notifikasi/create"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Buat Notifikasi
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <CheckCircle size={20} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalSent}</p>
                            <p className="text-xs text-[var(--text-muted)]">Terkirim</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalScheduled}</p>
                            <p className="text-xs text-[var(--text-muted)]">Terjadwal</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Users size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">1,690</p>
                            <p className="text-xs text-[var(--text-muted)]">Total Penerima</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Compose */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Kirim Cepat</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Judul notifikasi..."
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                    />
                    <textarea
                        placeholder="Isi pesan notifikasi..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] resize-none"
                    />
                    <div className="flex items-center justify-between">
                        <select className="px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none">
                            <option>Semua Pengguna</option>
                            <option>Siswa</option>
                            <option>Orang Tua</option>
                            <option>Guru</option>
                        </select>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors">
                            <Send size={16} />
                            Kirim Sekarang
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification History */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[var(--border-light)]">
                    <h3 className="font-semibold text-[var(--text-primary)]">Riwayat Notifikasi</h3>
                </div>
                <div className="divide-y divide-[var(--border-light)]">
                    {MOCK_NOTIFICATIONS.map(notif => (
                        <div key={notif.id} className="p-4 hover:bg-[var(--bg-hover)] transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                        ${notif.status === 'sent' ? 'bg-green-500/10' : 'bg-yellow-500/10'}
                                    `}>
                                        <Bell size={18} className={notif.status === 'sent' ? 'text-green-500' : 'text-yellow-500'} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[var(--text-primary)]">{notif.title}</h4>
                                        <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-1">{notif.message}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-xs text-[var(--text-muted)]">
                                                Target: {notif.target}
                                            </span>
                                            {notif.status === 'sent' ? (
                                                <span className="text-xs text-[var(--text-muted)]">
                                                    Terkirim: {notif.sentAt}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-yellow-600">
                                                    Dijadwalkan: {notif.scheduledFor}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {notif.status === 'sent' && (
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1 text-[var(--text-muted)]">
                                                <Send size={14} />
                                                <span>{notif.delivered}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[var(--text-muted)]">
                                                <Eye size={14} />
                                                <span>{notif.read}</span>
                                            </div>
                                        </div>
                                    )}
                                    <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-lg
                                        ${notif.status === 'sent'
                                            ? 'bg-green-500/10 text-green-600'
                                            : 'bg-yellow-500/10 text-yellow-600'
                                        }
                                    `}>
                                        {notif.status === 'sent' ? 'Terkirim' : 'Terjadwal'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
