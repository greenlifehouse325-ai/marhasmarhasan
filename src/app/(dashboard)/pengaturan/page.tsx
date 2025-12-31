/**
 * Pengaturan (Global Settings) Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Settings, User, Bell, Globe, Shield, Palette, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PengaturanPage() {
    const [activeTab, setActiveTab] = useState('profil');

    const tabs = [
        { id: 'profil', label: 'Profil', icon: User },
        { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
        { id: 'tampilan', label: 'Tampilan', icon: Palette },
        { id: 'keamanan', label: 'Keamanan', icon: Shield },
    ];

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-[var(--text-primary)]">Pengaturan</span>
            </div>

            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Pengaturan</h1>
                <p className="text-sm text-[var(--text-muted)]">Kelola preferensi akun Anda</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}>
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    {activeTab === 'profil' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Profil</h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Nama Lengkap</label>
                                    <input type="text" defaultValue="Admin Marhas" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
                                    <input type="email" defaultValue="admin@marhas.sch.id" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Telepon</label>
                                    <input type="tel" defaultValue="081234567890" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl" />
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-xl text-sm font-medium">Simpan Perubahan</button>
                        </div>
                    )}

                    {activeTab === 'notifikasi' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Notifikasi</h2>
                            <div className="space-y-4">
                                {['Email Notifikasi', 'Push Notifikasi', 'Notifikasi Login', 'Laporan Mingguan'].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-xl">
                                        <span className="text-sm text-[var(--text-primary)]">{item}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-[var(--border-medium)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-primary)]"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tampilan' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Tampilan</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-[var(--bg-hover)] rounded-xl">
                                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Tema</p>
                                    <p className="text-xs text-[var(--text-muted)]">Gunakan toggle tema di header untuk mengubah mode gelap/terang</p>
                                </div>
                                <div className="p-4 bg-[var(--bg-hover)] rounded-xl">
                                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Bahasa</p>
                                    <select className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-lg text-sm">
                                        <option>Bahasa Indonesia</option>
                                        <option>English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'keamanan' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Keamanan</h2>
                            <div className="space-y-4">
                                <Link href="/profil" className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)]">
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">Ubah Password</p>
                                        <p className="text-xs text-[var(--text-muted)]">Perbarui password akun Anda</p>
                                    </div>
                                    <ChevronRight size={16} className="text-[var(--text-muted)]" />
                                </Link>
                                <div className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-xl">
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">Two-Factor Authentication</p>
                                        <p className="text-xs text-[var(--text-muted)]">Tambahkan lapisan keamanan ekstra</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-[var(--border-medium)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-primary)]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
