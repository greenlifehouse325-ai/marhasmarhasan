/**
 * Halaman Buat Peminjaman Baru - Enhanced
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Features:
 * - User type selection (Siswa/Guru)
 * - NIS/ISBN validation
 * - Auto-generated Kode Pinjam
 * - Theme-aware styling
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookMarked, Info } from 'lucide-react';
import { LendingForm } from '@/components/perpustakaan';

export default function CreateLendingPage() {
    const router = useRouter();

    const handleLendingSubmit = async (data: {
        userType: 'siswa' | 'guru';
        userId: string;
        bookId: string;
        borrowDate: string;
        dueDate: string;
        kodePinjam: string;
    }) => {
        // In a real app, this would call an API
        console.log('Processing lending:', data);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Redirect back to lending list
        router.push('/perpustakaan/peminjaman');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/perpustakaan/peminjaman"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/perpustakaan/peminjaman" className="hover:text-emerald-600">Peminjaman</Link>
                        <span>/</span>
                        <span>Baru</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Catat Peminjaman</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-[var(--bg-card)] rounded-2xl shadow-sm p-6 border border-[var(--border-light)]">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border-light)]">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                                <BookMarked size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">Data Peminjaman</h2>
                                <p className="text-sm text-[var(--text-muted)]">Pilih tipe peminjam dan isi data buku</p>
                            </div>
                        </div>

                        <LendingForm
                            onSubmit={handleLendingSubmit}
                            onCancel={() => router.back()}
                        />
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                    {/* Lending Rules */}
                    <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-emerald-600 mb-3">
                            <Info size={18} />
                            <h3 className="font-semibold">Informasi Peminjaman</h3>
                        </div>
                        <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-2 list-disc list-inside">
                            <li>Durasi peminjaman standar adalah <strong>14 hari</strong></li>
                            <li>Maksimal <strong>3 buku</strong> per siswa</li>
                            <li>Maksimal <strong>5 buku</strong> per guru</li>
                            <li>Denda keterlambatan <strong>Rp 500/hari</strong></li>
                            <li>Pastikan kondisi buku baik saat dipinjamkan</li>
                        </ul>
                    </div>

                    {/* Input Format Guide */}
                    <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-600 mb-3">
                            <Info size={18} />
                            <h3 className="font-semibold">Format Input</h3>
                        </div>
                        <div className="text-sm space-y-3">
                            <div>
                                <p className="font-medium text-blue-700 dark:text-blue-400">NIS (Siswa)</p>
                                <p className="text-blue-600/80 dark:text-blue-400/80">8 digit angka</p>
                                <p className="text-xs text-blue-500/70">Contoh: 12345678</p>
                            </div>
                            <div>
                                <p className="font-medium text-blue-700 dark:text-blue-400">NIP (Guru)</p>
                                <p className="text-blue-600/80 dark:text-blue-400/80">18 digit angka</p>
                                <p className="text-xs text-blue-500/70">Contoh: 198501012010011001</p>
                            </div>
                            <div>
                                <p className="font-medium text-blue-700 dark:text-blue-400">ISBN</p>
                                <p className="text-blue-600/80 dark:text-blue-400/80">10 atau 13 digit</p>
                                <p className="text-xs text-blue-500/70">Contoh: 9781234567890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
