/**
 * Halaman Pengembalian Buku
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman untuk memproses pengembalian buku
 * Fixed: Shows success popup instead of redirecting
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, CheckCircle, X } from 'lucide-react';
import { ReturnForm } from '@/components/perpustakaan';

interface SuccessData {
    bookTitle: string;
    borrowerName: string;
    fine: number;
}

export default function ReturnBookPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [successData, setSuccessData] = useState<SuccessData | null>(null);

    const handleReturnSubmit = async (data: { lendingId: string; condition: string; fine?: number }) => {
        // In a real app, this would call an API
        console.log('Processing return:', data);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success popup instead of redirecting
        setSuccessData({
            bookTitle: 'Pemrograman Web dengan PHP', // Would come from API
            borrowerName: 'Ahmad Rizky - XII RPL 1',
            fine: data.fine || 0,
        });
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSuccessData(null);
        // Reset form by reloading page or resetting state
        window.location.reload(); // Simple approach - resets form
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/perpustakaan"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <span>Pengembalian</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Pengembalian Buku</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-[var(--bg-card)] rounded-2xl shadow-sm p-6 border border-[var(--border-light)]">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border-light)]">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                                <RotateCcw size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">Proses Pengembalian</h2>
                                <p className="text-sm text-[var(--text-muted)]">Scan kode peminjaman atau masukkan manual</p>
                            </div>
                        </div>

                        <ReturnForm
                            onSubmit={handleReturnSubmit}
                            onCancel={() => window.history.back()}
                        />
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-500/20">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Panduan Pengembalian</h3>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2 list-disc list-inside">
                            <li>Cek kondisi buku dengan teliti sebelum menerima.</li>
                            <li>Jika buku rusak ringan, kenakan denda Rp 25.000.</li>
                            <li>Jika buku hilang, siswa harus mengganti atau membayar Rp 75.000.</li>
                            <li>Denda keterlambatan dihitung otomatis.</li>
                        </ul>
                    </div>

                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h3 className="font-semibold text-[var(--text-primary)] mb-3">Statistik Hari Ini</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[var(--text-secondary)]">Buku Kembali</span>
                                <span className="font-semibold text-[var(--text-primary)]">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[var(--text-secondary)]">Denda Terkumpul</span>
                                <span className="font-semibold text-emerald-600">Rp 45.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Popup Modal */}
            {showSuccess && successData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleCloseSuccess}
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-md bg-[var(--bg-card)] rounded-2xl shadow-xl border border-[var(--border-light)] animate-fadeIn">
                        <button
                            onClick={handleCloseSuccess}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                        >
                            <X size={18} className="text-[var(--text-muted)]" />
                        </button>

                        <div className="p-8 text-center">
                            {/* Success Icon */}
                            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} className="text-emerald-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                                Pengembalian Berhasil!
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-6">
                                Buku telah berhasil dikembalikan ke perpustakaan.
                            </p>

                            {/* Return Details */}
                            <div className="bg-[var(--bg-hover)] rounded-xl p-4 mb-6 text-left">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-muted)]">Buku</span>
                                        <span className="font-medium text-[var(--text-primary)]">{successData.bookTitle}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-muted)]">Peminjam</span>
                                        <span className="font-medium text-[var(--text-primary)]">{successData.borrowerName}</span>
                                    </div>
                                    {successData.fine > 0 && (
                                        <div className="flex justify-between text-sm pt-2 border-t border-[var(--border-light)]">
                                            <span className="text-red-600">Denda</span>
                                            <span className="font-bold text-red-600">Rp {successData.fine.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCloseSuccess}
                                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
                                >
                                    Proses Lagi
                                </button>
                                <Link
                                    href="/perpustakaan/peminjaman"
                                    className="flex-1 py-3 px-4 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors text-center"
                                >
                                    Lihat Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
