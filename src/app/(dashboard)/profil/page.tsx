/**
 * Halaman Profil Admin
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk melihat dan mengedit profil admin
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
    MapPin,
    Calendar,
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
                <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
                <p className="text-gray-500">Kelola informasi akun dan keamanan</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                            <span className="text-3xl font-bold text-indigo-600">
                                {user?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Camera size={16} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span
                                className="px-3 py-1 text-xs font-medium rounded-full text-white"
                                style={{ backgroundColor: roleColors[user?.role || 'super_admin'] }}
                            >
                                {roleLabels[user?.role || 'super_admin']}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                Aktif
                            </span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">156</p>
                            <p className="text-xs text-gray-500">Hari Login</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">2.4K</p>
                            <p className="text-xs text-gray-500">Aksi</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">99%</p>
                            <p className="text-xs text-gray-500">Uptime</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'profile' | 'security' | 'activity')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800">Informasi Profil</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Nama Lengkap</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">No. Telepon</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800">Keamanan Akun</h3>

                        <div className="space-y-4">
                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <CheckCircle size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">Terverifikasi via OTP</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                        Aktif
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Key size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Password</p>
                                            <p className="text-sm text-gray-500">Terakhir diubah 30 hari lalu</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                        Ubah Password
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <LogOut size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Sesi Aktif</p>
                                            <p className="text-sm text-gray-500">2 perangkat terhubung</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        Logout Semua
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800">Riwayat Aktivitas</h3>

                        <div className="space-y-3">
                            {[
                                { action: 'Login berhasil', time: '2 menit lalu', icon: <CheckCircle size={16} />, color: 'text-green-600' },
                                { action: 'Menambah buku baru', time: '1 jam lalu', icon: <CheckCircle size={16} />, color: 'text-green-600' },
                                { action: 'Mengubah pengaturan', time: '3 jam lalu', icon: <AlertCircle size={16} />, color: 'text-amber-600' },
                                { action: 'Verifikasi pembayaran SPP', time: '5 jam lalu', icon: <CheckCircle size={16} />, color: 'text-green-600' },
                                { action: 'Login dari perangkat baru', time: '1 hari lalu', icon: <AlertCircle size={16} />, color: 'text-amber-600' },
                            ].map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className={activity.color}>{activity.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
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
