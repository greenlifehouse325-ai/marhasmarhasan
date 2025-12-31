/**
 * Laporan (Reports) Page - Perpustakaan Module
 * SMK Marhas Admin Dashboard
 * 
 * Halaman laporan perpustakaan
 */

'use client';

import React, { useState } from 'react';
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    BookOpen,
    Users,
    Banknote,
    RotateCcw,
    BarChart3,
    PieChart
} from 'lucide-react';

// Report types
const REPORT_TYPES = [
    {
        id: 'circulation',
        name: 'Laporan Sirkulasi',
        description: 'Peminjaman dan pengembalian buku',
        icon: RotateCcw,
        color: '#3B82F6'
    },
    {
        id: 'collection',
        name: 'Laporan Koleksi',
        description: 'Inventaris buku dan kondisi',
        icon: BookOpen,
        color: '#10B981'
    },
    {
        id: 'members',
        name: 'Laporan Anggota',
        description: 'Aktivitas peminjam',
        icon: Users,
        color: '#8B5CF6'
    },
    {
        id: 'fines',
        name: 'Laporan Denda',
        description: 'Denda dan pembayaran',
        icon: Banknote,
        color: '#F59E0B'
    },
];

export default function LaporanPerpustakaanPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedReport, setSelectedReport] = useState('circulation');

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        Laporan Perpustakaan
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Generate dan unduh laporan perpustakaan
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                    >
                        <option value="week">Minggu Ini</option>
                        <option value="month">Bulan Ini</option>
                        <option value="quarter">3 Bulan Terakhir</option>
                        <option value="year">Tahun Ini</option>
                    </select>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <BookOpen size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">1,234</p>
                            <p className="text-xs text-[var(--text-muted)]">Total Koleksi</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <RotateCcw size={20} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">456</p>
                            <p className="text-xs text-[var(--text-muted)]">Peminjaman</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Users size={20} className="text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">789</p>
                            <p className="text-xs text-[var(--text-muted)]">Anggota Aktif</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Banknote size={20} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">Rp 150K</p>
                            <p className="text-xs text-[var(--text-muted)]">Total Denda</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REPORT_TYPES.map(report => {
                    const Icon = report.icon;
                    const isSelected = selectedReport === report.id;
                    return (
                        <button
                            key={report.id}
                            onClick={() => setSelectedReport(report.id)}
                            className={`
                                p-4 rounded-xl border text-left transition-all
                                ${isSelected
                                    ? 'bg-[var(--bg-elevated)] border-[var(--brand-primary)]'
                                    : 'bg-[var(--bg-card)] border-[var(--border-light)] hover:border-[var(--border-medium)]'
                                }
                            `}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${report.color}15`, color: report.color }}
                                >
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[var(--text-primary)]">{report.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] mt-1">{report.description}</p>
                                </div>
                                {isSelected && (
                                    <div className="w-6 h-6 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Chart Placeholder */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-semibold text-[var(--text-primary)]">Grafik {REPORT_TYPES.find(r => r.id === selectedReport)?.name}</h3>
                        <p className="text-sm text-[var(--text-muted)]">Data periode: {selectedPeriod === 'month' ? 'Bulan ini' : selectedPeriod === 'week' ? 'Minggu ini' : 'Tahun ini'}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                            <BarChart3 size={18} className="text-[var(--text-muted)]" />
                        </button>
                        <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                            <PieChart size={18} className="text-[var(--text-muted)]" />
                        </button>
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 bg-[var(--bg-hover)] rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <TrendingUp size={48} className="text-[var(--text-muted)] mx-auto mb-2" />
                        <p className="text-[var(--text-muted)]">Chart akan ditampilkan di sini</p>
                    </div>
                </div>
            </div>

            {/* Export Actions */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Export Laporan</h3>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-xl text-sm font-medium transition-colors">
                        <Download size={16} />
                        Export Excel
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-medium transition-colors">
                        <Download size={16} />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-xl text-sm font-medium transition-colors">
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>
        </div>
    );
}
