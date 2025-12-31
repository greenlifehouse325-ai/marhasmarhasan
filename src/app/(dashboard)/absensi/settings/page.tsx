/**
 * Absensi Settings Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { Settings, Save, Clock, MapPin, QrCode, Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AbsensiSettingsPage() {
    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/absensi" className="hover:text-[var(--brand-primary)]">Absensi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Pengaturan</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Pengaturan Absensi</h1>
                    <p className="text-sm text-[var(--text-muted)]">Konfigurasi sistem absensi</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Save size={16} />
                    Simpan
                </button>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Jam Absensi */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Jam Absensi</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Masuk</label>
                                <input type="time" defaultValue="07:00" className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Terlambat</label>
                                <input type="time" defaultValue="07:15" className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Pulang</label>
                                <input type="time" defaultValue="15:00" className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Toleransi (menit)</label>
                                <input type="number" defaultValue={15} className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <QrCode size={20} className="text-purple-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">QR Code</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Durasi Expired (menit)</label>
                            <input type="number" defaultValue={5} className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Auto-refresh QR</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Wajib scan dari app</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                    </div>
                </div>

                {/* Lokasi */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <MapPin size={20} className="text-green-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Geolokasi</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Aktifkan geolokasi</span>
                            <input type="checkbox" className="rounded" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Radius (meter)</label>
                            <input type="number" defaultValue={100} className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                        </div>
                    </div>
                </div>

                {/* Navigasi */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Halaman Lainnya</h3>
                    <div className="space-y-2">
                        {[
                            { href: '/absensi', label: 'Dashboard' },
                            { href: '/absensi/hari-ini', label: 'Hari Ini' },
                            { href: '/absensi/session', label: 'Session QR' },
                            { href: '/absensi/riwayat', label: 'Riwayat' },
                            { href: '/absensi/izin', label: 'Izin' },
                            { href: '/absensi/laporan', label: 'Laporan' },
                        ].map(link => (
                            <Link key={link.href} href={link.href} className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                                <span className="text-sm text-[var(--text-secondary)]">{link.label}</span>
                                <ChevronRight size={14} className="text-[var(--text-muted)]" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
