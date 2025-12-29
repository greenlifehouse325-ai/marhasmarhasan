/**
 * Halaman Pengembalian Buku
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman untuk memproses pengembalian buku
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ReturnForm } from '@/components/perpustakaan';

export default function ReturnBookPage() {
    const router = useRouter();

    const handleReturnSubmit = async (data: { lendingId: string; condition: string; fine?: number }) => {
        // In a real app, this would call an API
        console.log('Processing return:', data);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Ideally show success message
        // Redirect back to lending list or dashboard
        router.push('/perpustakaan/peminjaman');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/perpustakaan"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <span>Pengembalian</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Pengembalian Buku</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <RotateCcw size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Proses Pengembalian</h2>
                                <p className="text-sm text-gray-500">Scan kode peminjaman atau masukkan manual</p>
                            </div>
                        </div>

                        <ReturnForm
                            onSubmit={handleReturnSubmit}
                            onCancel={() => router.push('/perpustakaan')}
                        />
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="font-semibold text-blue-800 mb-2">Panduan Pengembalian</h3>
                        <ul className="text-sm text-blue-700 space-y-2 list-disc list-inside">
                            <li>Cek kondisi buku dengan teliti sebelum menerima.</li>
                            <li>Jika buku rusak ringan, kenakan denda Rp 25.000.</li>
                            <li>Jika buku hilang, siswa harus mengganti atau membayar Rp 75.000.</li>
                            <li>Denda keterlambatan dihitung otomatis.</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-3">Statistik Hari Ini</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Buku Kembali</span>
                                <span className="font-semibold text-gray-800">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Denda Terkumpul</span>
                                <span className="font-semibold text-emerald-600">Rp 45.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
