/**
 * Super Admin Analytics Page Content (Client Component)
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { BarChart3, Users, Activity, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPageContent() {
    const [period, setPeriod] = useState('month');

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/super-admin" className="hover:text-[var(--brand-primary)]">Super Admin</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Analytics</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Analytics Dashboard</h1>
                    <p className="text-[var(--text-muted)]">Statistik penggunaan sistem</p>
                </div>
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm"
                >
                    <option value="week">Minggu Ini</option>
                    <option value="month">Bulan Ini</option>
                    <option value="year">Tahun Ini</option>
                </select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Users size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">3,456</p>
                    <p className="text-xs text-[var(--text-muted)]">Total Users</p>
                    <p className="text-xs text-green-500 mt-1">+12% dari bulan lalu</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <Activity size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">1,234</p>
                    <p className="text-xs text-[var(--text-muted)]">Active Sessions</p>
                    <p className="text-xs text-green-500 mt-1">+5% dari yesterday</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <BarChart3 size={20} className="text-purple-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">45.2K</p>
                    <p className="text-xs text-[var(--text-muted)]">Page Views</p>
                    <p className="text-xs text-green-500 mt-1">+8% dari bulan lalu</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <TrendingUp size={20} className="text-orange-500 mb-2" />
                    <p className="text-2xl font-bold text-[var(--text-primary)]">98.5%</p>
                    <p className="text-xs text-[var(--text-muted)]">Uptime</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">30 hari terakhir</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Users per Module</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Perpustakaan', value: 456, color: 'bg-blue-500' },
                            { name: 'Keuangan', value: 234, color: 'bg-green-500' },
                            { name: 'Absensi', value: 567, color: 'bg-purple-500' },
                            { name: 'Jadwal', value: 123, color: 'bg-orange-500' },
                            { name: 'Aplikasi', value: 345, color: 'bg-pink-500' },
                        ].map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-[var(--text-secondary)]">{item.name}</span>
                                    <span className="text-[var(--text-muted)]">{item.value}</span>
                                </div>
                                <div className="h-2 bg-[var(--bg-hover)] rounded-full">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / 567) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Navigasi Cepat</h3>
                    <div className="space-y-2">
                        <Link href="/super-admin" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm">Dashboard</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/super-admin/users" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm">Users</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/super-admin/audit-log" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm">Audit Log</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                        <Link href="/super-admin/system" className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-lg">
                            <span className="text-sm">System</span>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
