/**
 * Absensi Laporan Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, PieChart, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LaporanAbsensiPage() {
    const [period, setPeriod] = useState('month');

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/absensi" className="hover:text-[var(--brand-primary)]">Absensi</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Laporan</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Laporan Absensi</h1>
                    <p className="text-[var(--text-muted)]">Generate dan export laporan kehadiran</p>
                </div>
                <div className="flex gap-2">
                    <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm">
                        <option value="week">Minggu Ini</option>
                        <option value="month">Bulan Ini</option>
                        <option value="semester">Semester</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Users size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">95.2%</p>
                    <p className="text-xs text-[var(--text-muted)]">Rata-rata Kehadiran</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Calendar size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">22</p>
                    <p className="text-xs text-[var(--text-muted)]">Hari Efektif</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <BarChart3 size={20} className="text-purple-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">12</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Sakit</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <PieChart size={20} className="text-orange-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">5</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Alpa</p>
                </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Kehadiran per Kelas</h3>
                <div className="space-y-4">
                    {['XII RPL 1', 'XII RPL 2', 'XI TKJ 1', 'XI TKJ 2', 'X MM 1'].map((kelas, i) => {
                        const rate = [97, 94, 96, 93, 95][i];
                        return (
                            <div key={kelas}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-[var(--text-secondary)]">{kelas}</span>
                                    <span className="text-[var(--text-primary)] font-medium">{rate}%</span>
                                </div>
                                <div className="h-2 bg-[var(--bg-hover)] rounded-full">
                                    <div className={`h-full rounded-full ${rate >= 95 ? 'bg-green-500' : rate >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${rate}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/absensi" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">← Dashboard</Link>
                <Link href="/absensi/hari-ini" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Hari Ini</Link>
                <Link href="/absensi/riwayat" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Riwayat</Link>
                <Link href="/absensi/izin" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-sm">Izin</Link>
            </div>
        </div>
    );
}
