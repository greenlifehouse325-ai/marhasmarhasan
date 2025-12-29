/**
 * Halaman Pengaturan Sistem
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk mengatur konfigurasi sistem
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Settings,
    Save,
    Shield,
    Bell,
    Database,
    Mail,
    Globe,
    Clock,
    Lock,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const tabs = [
        { id: 'general', label: 'Umum', icon: <Settings size={18} /> },
        { id: 'security', label: 'Keamanan', icon: <Shield size={18} /> },
        { id: 'notification', label: 'Notifikasi', icon: <Bell size={18} /> },
        { id: 'backup', label: 'Backup', icon: <Database size={18} /> },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/super-admin" className="hover:text-purple-600">Dashboard</Link>
                        <span>/</span>
                        <span>Pengaturan</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Pengaturan Sistem</h1>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                </button>
            </div>

            {/* Tabs & Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tab Navigation */}
                <div className="lg:w-64 space-y-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id
                                    ? 'bg-purple-50 text-purple-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab.icon}
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
                    {activeTab === 'general' && <GeneralSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'notification' && <NotificationSettings />}
                    {activeTab === 'backup' && <BackupSettings />}
                </div>
            </div>
        </div>
    );
}

// ============================================
// TAB CONTENT COMPONENTS
// ============================================

function GeneralSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Umum</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Nama Sekolah</label>
                        <input
                            type="text"
                            defaultValue="SMK 2 Marhas Marginal Harapan Bangsa"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email Sekolah</label>
                        <input
                            type="email"
                            defaultValue="admin@marhas.sch.id"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Timezone</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                            <option>Asia/Jakarta (WIB)</option>
                            <option>Asia/Makassar (WITA)</option>
                            <option>Asia/Jayapura (WIT)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Tahun Ajaran Aktif</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                            <option>2024/2025</option>
                            <option>2023/2024</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecuritySettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Keamanan</h2>

                <div className="space-y-4">
                    <ToggleSetting
                        label="Two-Factor Authentication (2FA)"
                        description="Wajibkan verifikasi OTP untuk semua admin"
                        defaultChecked={true}
                    />

                    <ToggleSetting
                        label="Session Timeout"
                        description="Logout otomatis setelah tidak aktif"
                        defaultChecked={true}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Durasi Session (menit)</label>
                        <input
                            type="number"
                            defaultValue="30"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    <ToggleSetting
                        label="Cooldown untuk Aksi Fatal"
                        description="Tambah delay 30 detik untuk aksi berbahaya"
                        defaultChecked={true}
                    />

                    <div className="p-4 bg-amber-50 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-amber-800">Mode Maintenance</p>
                                <p className="text-sm text-amber-700 mt-1">
                                    Aktifkan untuk menutup sementara akses ke sistem
                                </p>
                                <button className="mt-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700">
                                    Aktifkan Maintenance
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NotificationSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Notifikasi</h2>

                <div className="space-y-4">
                    <ToggleSetting
                        label="Email Notifikasi"
                        description="Kirim email untuk event penting"
                        defaultChecked={true}
                    />

                    <ToggleSetting
                        label="Push Notification"
                        description="Kirim notifikasi ke aplikasi mobile"
                        defaultChecked={true}
                    />

                    <ToggleSetting
                        label="Notifikasi Login Baru"
                        description="Beritahu admin saat ada login dari device baru"
                        defaultChecked={true}
                    />

                    <ToggleSetting
                        label="Notifikasi Pembayaran SPP"
                        description="Beritahu wali saat SPP jatuh tempo"
                        defaultChecked={true}
                    />

                    <ToggleSetting
                        label="Notifikasi Absensi"
                        description="Beritahu wali jika siswa tidak hadir"
                        defaultChecked={true}
                    />
                </div>
            </div>
        </div>
    );
}

function BackupSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Backup Database</h2>

                <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <CheckCircle size={20} className="text-green-600" />
                            <div>
                                <p className="text-sm font-medium text-green-800">Backup Terakhir Berhasil</p>
                                <p className="text-sm text-green-700">29 Desember 2024, 03:00 WIB</p>
                            </div>
                        </div>
                    </div>

                    <ToggleSetting
                        label="Auto Backup Harian"
                        description="Backup otomatis setiap hari jam 03:00"
                        defaultChecked={true}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Retensi Backup (hari)</label>
                        <input
                            type="number"
                            defaultValue="30"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100">
                            <Database size={16} />
                            Backup Sekarang
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200">
                            <RefreshCw size={16} />
                            Restore Backup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToggleSetting({ label, description, defaultChecked }: { label: string; description: string; defaultChecked: boolean }) {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-12 h-7 rounded-full transition-colors ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
}
