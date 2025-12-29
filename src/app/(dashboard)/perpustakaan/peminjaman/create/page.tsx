/**
 * Halaman Buat Peminjaman Baru
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman untuk mencatat peminjaman buku baru
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { ArrowLeft, BookMarked } from 'lucide-react';
import { LendingForm } from '@/components/perpustakaan';

export default function CreateLendingPage() {
    const router = useRouter();

    const handleLendingSubmit = async (data: { studentId: string; bookId: string; dueDate: string }) => {
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
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/perpustakaan/peminjaman" className="hover:text-emerald-600">Peminjaman</Link>
                        <span>/</span>
                        <span>Baru</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Catat Peminjaman</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <BookMarked size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Data Peminjaman</h2>
                                <p className="text-sm text-gray-500">Isi data siswa dan buku yang dipinjam</p>
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
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                        <h3 className="font-semibold text-emerald-800 mb-2">Informasi Peminjaman</h3>
                        <ul className="text-sm text-emerald-700 space-y-2 list-disc list-inside">
                            <li>Durasi peminjaman standar adalah 14 hari.</li>
                            <li>Maksimal 3 buku per siswa.</li>
                            <li>Denda keterlambatan Rp 500/hari.</li>
                            <li>Pastikan kondisi buku baik saat dipinjamkan.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
