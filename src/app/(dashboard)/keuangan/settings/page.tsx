/**
 * Keuangan Settings Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React from 'react';
import { Settings, Save, Wallet, Calendar, Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function KeuanganSettingsPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/keuangan" className="hover:text-[var(--brand-primary)]">Keuangan</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Pengaturan</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Pengaturan Keuangan</h1>
                    <p className="text-[var(--text-muted)]">Konfigurasi modul keuangan</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                    <Save size={16} />
                    Simpan
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Wallet size={20} className="text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Tarif SPP</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">SPP Bulanan (Rp)</label>
                            <input type="number" defaultValue={500000} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Denda Keterlambatan (%/bulan)</label>
                            <input type="number" defaultValue={5} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]" />
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Calendar size={20} className="text-yellow-500" />
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Jadwal Pembayaran</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tanggal Jatuh Tempo</label>
                            <input type="number" defaultValue={10} min={1} max={28} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="reminder" className="rounded" defaultChecked />
                            <label htmlFor="reminder" className="text-sm text-[var(--text-secondary)]">Kirim reminder H-3</label>
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6 lg:col-span-2">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Navigasi Cepat</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <Link href="/keuangan" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                            <span className="text-sm">Dashboard</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/keuangan/spp" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                            <span className="text-sm">SPP</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/keuangan/pemasukan" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                            <span className="text-sm">Pemasukan</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/keuangan/pengeluaran" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                            <span className="text-sm">Pengeluaran</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/keuangan/transaksi" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                            <span className="text-sm">Transaksi</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/keuangan/laporan" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg hover:bg-[var(--bg-active)]">
                            <span className="text-sm">Laporan</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
