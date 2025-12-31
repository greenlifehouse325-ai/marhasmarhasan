/**
 * Aplikasi Settings Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Settings, Save, Smartphone, Bell, Palette, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AplikasiSettingsPage() {
    const [appName, setAppName] = useState('SMK Marhas App');
    const [version, setVersion] = useState('2.1.0');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/aplikasi" className="hover:text-[var(--brand-primary)]">Aplikasi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Pengaturan</span>
            </div>

            {/* Header - Responsive */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Pengaturan Aplikasi</h1>
                    <p className="text-sm text-[var(--text-muted)]">Konfigurasi aplikasi mobile</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Save size={16} />
                    Simpan
                </button>
            </div>

            {/* Settings Grid - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* App Info */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Smartphone size={20} className="text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Info Aplikasi</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Nama Aplikasi</label>
                            <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Versi</label>
                            <input type="text" value={version} onChange={(e) => setVersion(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                        </div>
                    </div>
                </div>

                {/* Push Notifications */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Bell size={20} className="text-yellow-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Push Notification</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: 'Pengumuman Sekolah', checked: true },
                            { label: 'Jadwal Pelajaran', checked: true },
                            { label: 'Nilai & Rapor', checked: true },
                            { label: 'Pembayaran SPP', checked: false },
                        ].map(item => (
                            <div key={item.label} className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                                <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                                <input type="checkbox" defaultChecked={item.checked} className="rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Theme */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Palette size={20} className="text-purple-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Tema Aplikasi</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { name: 'Light', color: '#FFFFFF', border: true },
                            { name: 'Dark', color: '#1a1a2e', border: false },
                            { name: 'Blue', color: '#3B82F6', border: false },
                        ].map(theme => (
                            <button key={theme.name} className="p-3 rounded-xl border border-[var(--border-light)] hover:border-[var(--brand-primary)] transition-colors">
                                <div className={`w-full h-8 rounded-lg mb-2 ${theme.border ? 'border border-[var(--border-light)]' : ''}`} style={{ backgroundColor: theme.color }} />
                                <p className="text-xs text-center text-[var(--text-secondary)]">{theme.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <Shield size={20} className="text-red-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Keamanan</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Wajib PIN/Fingerprint</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Auto Logout (30 menit)</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Halaman Lainnya</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                        { href: '/aplikasi', label: 'Dashboard' },
                        { href: '/aplikasi/pengumuman', label: 'Pengumuman' },
                        { href: '/aplikasi/berita', label: 'Berita' },
                        { href: '/aplikasi/notifikasi', label: 'Notifikasi' },
                        { href: '/aplikasi/moderasi', label: 'Moderasi' },
                        { href: '/aplikasi/bug-reports', label: 'Bug Reports' },
                    ].map(link => (
                        <Link key={link.href} href={link.href} className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)] transition-colors">
                            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">{link.label}</span>
                            <ChevronRight size={14} className="text-[var(--text-muted)]" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
