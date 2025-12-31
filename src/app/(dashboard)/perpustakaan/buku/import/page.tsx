/**
 * Import Buku Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function ImportBukuPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<{ success: number; failed: number } | null>(null);

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResult({ success: 120, failed: 3 });
        setIsUploading(false);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
                <Link href="/perpustakaan/buku" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Import Data Buku</h1>
                    <p className="text-[var(--text-muted)]">Upload file Excel untuk import data buku massal</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        {!file ? (
                            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[var(--border-light)] rounded-xl cursor-pointer hover:border-[var(--brand-primary)]">
                                <Upload size={48} className="text-[var(--text-muted)] mb-4" />
                                <p className="text-[var(--text-primary)] font-medium">Klik untuk upload file</p>
                                <p className="text-sm text-[var(--text-muted)]">.xlsx, .xls (Max 10MB)</p>
                                <input type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
                            </label>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-[var(--bg-hover)] rounded-xl">
                                    <FileSpreadsheet size={24} className="text-green-600" />
                                    <div className="flex-1">
                                        <p className="font-medium text-[var(--text-primary)]">{file.name}</p>
                                        <p className="text-sm text-[var(--text-muted)]">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <button onClick={() => { setFile(null); setResult(null); }}><X size={18} className="text-[var(--text-muted)]" /></button>
                                </div>
                                {!result && (
                                    <button onClick={handleUpload} disabled={isUploading} className="w-full py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium disabled:opacity-50">
                                        {isUploading ? 'Memproses...' : 'Proses Import'}
                                    </button>
                                )}
                                {result && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-xl">
                                            <CheckCircle size={18} className="text-green-600" />
                                            <span className="text-green-600">{result.success} buku berhasil diimport</span>
                                        </div>
                                        {result.failed > 0 && (
                                            <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-xl">
                                                <AlertCircle size={18} className="text-red-500" />
                                                <span className="text-red-500">{result.failed} gagal</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="font-semibold text-[var(--text-primary)] mb-3">Download Template</h3>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] rounded-xl text-[var(--text-secondary)] text-sm font-medium">
                            <Download size={16} />
                            Download Template
                        </button>
                    </div>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h3 className="font-semibold text-[var(--text-primary)] mb-3">Kolom Wajib</h3>
                        <ul className="space-y-1 text-sm text-[var(--text-muted)]">
                            <li>• Judul Buku</li>
                            <li>• ISBN</li>
                            <li>• Pengarang</li>
                            <li>• Penerbit</li>
                            <li>• Tahun Terbit</li>
                            <li>• Jumlah Eksemplar</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
