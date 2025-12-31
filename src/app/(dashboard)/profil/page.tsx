/**
 * Halaman Profil Admin
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk melihat dan mengedit profil admin
 * With proper dark mode support
 */

'use client';

import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Shield,
    Camera,
    Save,
    Key,
    Clock,
    LogOut,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'activity'>('profile');
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '081234567890',
        avatar: '',
    });

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
    };

    const tabs = [
        { id: 'profile', label: 'Profil', icon: <User size={18} /> },
        { id: 'security', label: 'Keamanan', icon: <Shield size={18} /> },
        { id: 'activity', label: 'Aktivitas', icon: <Clock size={18} /> },
    ];

    const roleLabels: Record<string, string> = {
        super_admin: 'Super Admin',
        admin_perpustakaan: 'Admin Perpustakaan',
        admin_keuangan: 'Admin Keuangan',
        admin_absensi: 'Admin Absensi',
        admin_jadwal: 'Admin Jadwal',
        admin_aplikasi: 'Admin Aplikasi',
    };

    const roleColors: Record<string, string> = {
        super_admin: '#8B5CF6',
        admin_perpustakaan: '#10B981',
        admin_keuangan: '#F59E0B',
        admin_absensi: '#3B82F6',
        admin_jadwal: '#EC4899',
        admin_aplikasi: '#6366F1',
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Profil Saya</h1>
                <p className="text-[var(--text-muted)]">Kelola informasi akun dan keamanan</p>
            </div>

            {/* Profile Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-3xl font-bold text-[var(--brand-primary)]">
                                {user?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-lg shadow-md flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors">
                            <Camera size={16} className="text-[var(--text-secondary)]" />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">{user?.name}</h2>
                        <p className="text-[var(--text-muted)]">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span
                                className="px-3 py-1 text-xs font-medium rounded-full text-white"
                                style={{ backgroundColor: roleColors[user?.role || 'super_admin'] }}
                            >
                                {roleLabels[user?.role || 'super_admin']}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-500/20 rounded-full">
                                Aktif
                            </span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[var(--text-primary)]">156</p>
                            <p className="text-xs text-[var(--text-muted)]">Hari Login</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[var(--text-primary)]">2.4K</p>
                            <p className="text-xs text-[var(--text-muted)]">Aksi</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[var(--text-primary)]">99%</p>
                            <p className="text-xs text-[var(--text-muted)]">Uptime</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'profile' | 'security' | 'activity')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-[var(--brand-primary)] text-white'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-6 shadow-sm">
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Informasi Profil</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Nama Lengkap</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-hover)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-muted)]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">No. Telepon</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--brand-primary)] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Keamanan Akun</h3>

                        <div className="space-y-4">
                            <div className="p-4 border border-[var(--border-light)] rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <CheckCircle size={20} className="text-green-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Two-Factor Authentication</p>
                                            <p className="text-sm text-[var(--text-muted)]">Terverifikasi via OTP</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-500/20 rounded-full">
                                        Aktif
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 border border-[var(--border-light)] rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--bg-hover)] rounded-lg flex items-center justify-center">
                                            <Key size={20} className="text-[var(--text-secondary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Password</p>
                                            <p className="text-sm text-[var(--text-muted)]">Terakhir diubah 30 hari lalu</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-sm font-medium text-[var(--brand-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                                        Ubah Password
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 border border-[var(--border-light)] rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--bg-hover)] rounded-lg flex items-center justify-center">
                                            <LogOut size={20} className="text-[var(--text-secondary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Sesi Aktif</p>
                                            <p className="text-sm text-[var(--text-muted)]">2 perangkat terhubung</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                        Logout Semua
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Riwayat Aktivitas</h3>

                        <div className="space-y-3">
                            {[
                                { action: 'Login berhasil', time: '2 menit lalu', icon: <CheckCircle size={16} />, color: 'text-green-500' },
                                { action: 'Menambah buku baru', time: '1 jam lalu', icon: <CheckCircle size={16} />, color: 'text-green-500' },
                                { action: 'Mengubah pengaturan', time: '3 jam lalu', icon: <AlertCircle size={16} />, color: 'text-amber-500' },
                                { action: 'Verifikasi pembayaran SPP', time: '5 jam lalu', icon: <CheckCircle size={16} />, color: 'text-green-500' },
                                { action: 'Login dari perangkat baru', time: '1 hari lalu', icon: <AlertCircle size={16} />, color: 'text-amber-500' },
                            ].map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] rounded-xl">
                                    <span className={activity.color}>{activity.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{activity.action}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
