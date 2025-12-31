/**
 * Import Siswa Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function ImportSiswaPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState<{ success: number; failed: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setUploadResult({ success: 45, failed: 3 });
        setIsUploading(false);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/siswa" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Import Data Siswa</h1>
                    <p className="text-[var(--text-muted)]">Upload file Excel untuk import data siswa massal</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Upload File</h2>

                        {!file ? (
                            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[var(--border-light)] rounded-xl cursor-pointer hover:border-[var(--brand-primary)] transition-colors">
                                <Upload size={48} className="text-[var(--text-muted)] mb-4" />
                                <p className="text-[var(--text-primary)] font-medium">Klik untuk upload file</p>
                                <p className="text-sm text-[var(--text-muted)]">atau drag & drop file di sini</p>
                                <p className="text-xs text-[var(--text-muted)] mt-2">.xlsx, .xls (Max 5MB)</p>
                                <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />
                            </label>
                        ) : (
                            <div className="border border-[var(--border-light)] rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                            <FileSpreadsheet size={24} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">{file.name}</p>
                                            <p className="text-sm text-[var(--text-muted)]">{(file.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setFile(null); setUploadResult(null); }} className="p-2 hover:bg-[var(--bg-hover)] rounded-lg">
                                        <X size={18} className="text-[var(--text-muted)]" />
                                    </button>
                                </div>

                                {!uploadResult && (
                                    <button
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        {isUploading ? 'Memproses...' : 'Proses Import'}
                                    </button>
                                )}

                                {uploadResult && (
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl">
                                            <CheckCircle size={20} className="text-green-600" />
                                            <span className="text-green-600 font-medium">{uploadResult.success} data berhasil diimport</span>
                                        </div>
                                        {uploadResult.failed > 0 && (
                                            <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl">
                                                <AlertCircle size={20} className="text-red-500" />
                                                <span className="text-red-500 font-medium">{uploadResult.failed} data gagal (lihat log)</span>
                                            </div>
                                        )}
                                        <Link href="/siswa" className="block text-center py-2 text-[var(--brand-primary)] hover:underline">
                                            Lihat Data Siswa →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div className="space-y-6">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Template</h2>
                        <p className="text-sm text-[var(--text-muted)] mb-4">
                            Download template Excel untuk memastikan format data sesuai
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors">
                            <Download size={18} />
                            Download Template
                        </button>
                    </div>

                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Kolom Wajib</h2>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>NISN</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>NIS</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Nama Lengkap</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Jenis Kelamin</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Tanggal Lahir</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Jurusan</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
