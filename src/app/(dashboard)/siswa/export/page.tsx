/**
 * Export Siswa Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Download, FileSpreadsheet, FileText, Filter, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExportSiswaPage() {
    const [format, setFormat] = useState('xlsx');
    const [filters, setFilters] = useState({
        kelas: 'all',
        jurusan: 'all',
        status: 'all',
    });
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsExporting(false);
        setExportSuccess(true);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/siswa" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Export Data Siswa</h1>
                    <p className="text-[var(--text-muted)]">Download data siswa dalam format Excel atau PDF</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Options */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Format */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Pilih Format</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setFormat('xlsx')}
                                className={`p-4 rounded-xl border-2 transition-all ${format === 'xlsx'
                                        ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                                        : 'border-[var(--border-light)] hover:border-[var(--border-medium)]'
                                    }`}
                            >
                                <FileSpreadsheet size={32} className={format === 'xlsx' ? 'text-[var(--brand-primary)] mx-auto' : 'text-green-600 mx-auto'} />
                                <p className="font-medium text-[var(--text-primary)] mt-2">Excel (.xlsx)</p>
                                <p className="text-sm text-[var(--text-muted)]">Spreadsheet</p>
                            </button>
                            <button
                                onClick={() => setFormat('pdf')}
                                className={`p-4 rounded-xl border-2 transition-all ${format === 'pdf'
                                        ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                                        : 'border-[var(--border-light)] hover:border-[var(--border-medium)]'
                                    }`}
                            >
                                <FileText size={32} className={format === 'pdf' ? 'text-[var(--brand-primary)] mx-auto' : 'text-red-500 mx-auto'} />
                                <p className="font-medium text-[var(--text-primary)] mt-2">PDF (.pdf)</p>
                                <p className="text-sm text-[var(--text-muted)]">Document</p>
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Filter size={20} className="text-[var(--brand-primary)]" />
                            Filter Data
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Kelas</label>
                                <select
                                    value={filters.kelas}
                                    onChange={(e) => setFilters({ ...filters, kelas: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                                >
                                    <option value="all">Semua Kelas</option>
                                    <option value="X">Kelas X</option>
                                    <option value="XI">Kelas XI</option>
                                    <option value="XII">Kelas XII</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Jurusan</label>
                                <select
                                    value={filters.jurusan}
                                    onChange={(e) => setFilters({ ...filters, jurusan: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                                >
                                    <option value="all">Semua Jurusan</option>
                                    <option value="RPL">RPL</option>
                                    <option value="TKJ">TKJ</option>
                                    <option value="MM">Multimedia</option>
                                    <option value="AKL">Akuntansi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="active">Aktif</option>
                                    <option value="alumni">Alumni</option>
                                    <option value="dropout">Keluar</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview & Action */}
                <div className="space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Estimasi Data</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Total Siswa</span>
                                <span className="font-medium text-[var(--text-primary)]">1,234</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Filter aktif</span>
                                <span className="font-medium text-[var(--text-primary)]">
                                    {Object.values(filters).filter(v => v !== 'all').length} filter
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Format</span>
                                <span className="font-medium text-[var(--text-primary)]">.{format}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        {exportSuccess ? (
                            <div className="text-center py-4">
                                <CheckCircle size={48} className="text-green-600 mx-auto mb-3" />
                                <p className="font-medium text-[var(--text-primary)]">Export Berhasil!</p>
                                <p className="text-sm text-[var(--text-muted)]">File akan otomatis terdownload</p>
                                <button
                                    onClick={() => setExportSuccess(false)}
                                    className="mt-4 text-sm text-[var(--brand-primary)] hover:underline"
                                >
                                    Export lagi
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                            >
                                <Download size={18} />
                                {isExporting ? 'Memproses...' : 'Export Data'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
