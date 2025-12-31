/**
 * Jadwal Settings Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { Settings, Save, Clock, Calendar, Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JadwalSettingsPage() {
    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/jadwal" className="hover:text-[var(--brand-primary)]">Jadwal</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Pengaturan</span>
            </div>

            {/* Header - Responsive */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Pengaturan Jadwal</h1>
                    <p className="text-sm text-[var(--text-muted)]">Konfigurasi modul jadwal</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Save size={16} />
                    Simpan
                </button>
            </div>

            {/* Settings Grid - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Jam Pelajaran */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Jam Pelajaran</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Mulai</label>
                                <input type="time" defaultValue="07:00" className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Selesai</label>
                                <input type="time" defaultValue="15:00" className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Durasi (menit)</label>
                            <input type="number" defaultValue={45} className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Istirahat (menit)</label>
                            <input type="number" defaultValue={15} className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm" />
                        </div>
                    </div>
                </div>

                {/* Hari Aktif */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Calendar size={20} className="text-green-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Hari Aktif</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day, i) => (
                            <label key={day} className="flex items-center gap-2 p-3 bg-[var(--bg-hover)] rounded-lg cursor-pointer">
                                <input type="checkbox" defaultChecked={i < 5} className="rounded" />
                                <span className="text-sm text-[var(--text-secondary)]">{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Notifikasi */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Bell size={20} className="text-yellow-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Notifikasi</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Notifikasi perubahan jadwal</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Notifikasi substitusi guru</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm text-[var(--text-secondary)]">Reminder jadwal harian</span>
                            <input type="checkbox" className="rounded" />
                        </div>
                    </div>
                </div>

                {/* Navigasi */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4 sm:p-6">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Halaman Lainnya</h3>
                    <div className="space-y-2">
                        {[
                            { href: '/jadwal', label: 'Dashboard' },
                            { href: '/jadwal/jadwal-kelas', label: 'Jadwal Kelas' },
                            { href: '/jadwal/jadwal-guru', label: 'Jadwal Guru' },
                            { href: '/jadwal/kalender', label: 'Kalender' },
                            { href: '/jadwal/perubahan', label: 'Log Perubahan' },
                            { href: '/jadwal/substitusi', label: 'Substitusi' },
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
