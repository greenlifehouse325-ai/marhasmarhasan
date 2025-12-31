/**
 * Perpustakaan Settings Page
 * SMK Marhas Admin Dashboard
 * 
 * Pengaturan modul perpustakaan
 */

'use client';

import React, { useState } from 'react';
import {
    Settings,
    Save,
    Clock,
    Banknote,
    Bell,
    BookOpen,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function PerpustakaanSettingsPage() {
    const [durasi, setDurasi] = useState(7);
    const [dendaPerHari, setDendaPerHari] = useState(500);
    const [reminderDays, setReminderDays] = useState(2);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/perpustakaan" className="hover:text-[var(--brand-primary)]">Perpustakaan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Pengaturan</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Pengaturan Perpustakaan
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Konfigurasi modul perpustakaan
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-xl text-white text-sm font-medium transition-colors">
                    <Save size={16} />
                    Simpan Perubahan
                </button>
            </div>

            {/* Settings Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Durasi Peminjaman */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">Durasi Peminjaman</h3>
                            <p className="text-sm text-[var(--text-muted)]">Lama hari peminjaman buku</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Durasi Default (hari)
                            </label>
                            <input
                                type="number"
                                value={durasi}
                                onChange={(e) => setDurasi(Number(e.target.value))}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="extend" className="rounded" />
                            <label htmlFor="extend" className="text-sm text-[var(--text-secondary)]">
                                Izinkan perpanjangan
                            </label>
                        </div>
                    </div>
                </div>

                {/* Tarif Denda */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <Banknote size={20} className="text-red-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">Tarif Denda</h3>
                            <p className="text-sm text-[var(--text-muted)]">Denda keterlambatan per hari</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Denda per Hari (Rp)
                            </label>
                            <input
                                type="number"
                                value={dendaPerHari}
                                onChange={(e) => setDendaPerHari(Number(e.target.value))}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Maksimal Denda (Rp)
                            </label>
                            <input
                                type="number"
                                defaultValue={50000}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifikasi */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Bell size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">Notifikasi Reminder</h3>
                            <p className="text-sm text-[var(--text-muted)]">Pengingat pengembalian buku</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Kirim reminder (hari sebelum jatuh tempo)
                            </label>
                            <input
                                type="number"
                                value={reminderDays}
                                onChange={(e) => setReminderDays(Number(e.target.value))}
                                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="notif-email" className="rounded" defaultChecked />
                            <label htmlFor="notif-email" className="text-sm text-[var(--text-secondary)]">
                                Kirim email reminder
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="notif-push" className="rounded" defaultChecked />
                            <label htmlFor="notif-push" className="text-sm text-[var(--text-secondary)]">
                                Kirim push notification
                            </label>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <BookOpen size={20} className="text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">Navigasi Cepat</h3>
                            <p className="text-sm text-[var(--text-muted)]">Akses halaman lainnya</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Link
                            href="/perpustakaan"
                            className="flex items-center justify-between p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                        >
                            <span className="text-sm text-[var(--text-secondary)]">Dashboard</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link
                            href="/perpustakaan/buku"
                            className="flex items-center justify-between p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                        >
                            <span className="text-sm text-[var(--text-secondary)]">Katalog Buku</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link
                            href="/perpustakaan/peminjaman"
                            className="flex items-center justify-between p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                        >
                            <span className="text-sm text-[var(--text-secondary)]">Peminjaman</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link
                            href="/perpustakaan/denda"
                            className="flex items-center justify-between p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                        >
                            <span className="text-sm text-[var(--text-secondary)]">Denda</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link
                            href="/perpustakaan/laporan"
                            className="flex items-center justify-between p-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-lg transition-colors"
                        >
                            <span className="text-sm text-[var(--text-secondary)]">Laporan</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
