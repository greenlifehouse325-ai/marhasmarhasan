/**
 * Form Catat Transaksi
 * SMK Marhas Admin Dashboard - Keuangan
 * 
 * Halaman untuk mencatat transaksi baru
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    Calendar,
    FileText,
    Tag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
} from 'lucide-react';

const INCOME_CATEGORIES = ['SPP', 'Uang Gedung', 'Seragam', 'Denda', 'Donasi', 'Lainnya'];
const EXPENSE_CATEGORIES = ['Gaji', 'ATK', 'Listrik', 'Air', 'Internet', 'Pemeliharaan', 'Kegiatan', 'Lainnya'];

interface FormData {
    type: 'income' | 'expense';
    amount: string;
    category: string;
    description: string;
    date: string;
    reference: string;
}

export default function CreateTransaksiPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        type: 'income',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        reference: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push('/keuangan/transaksi');
    };

    const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/keuangan/transaksi"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/keuangan" className="hover:text-amber-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/keuangan/transaksi" className="hover:text-amber-600">Transaksi</Link>
                        <span>/</span>
                        <span>Catat Transaksi</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Catat Transaksi Baru</h1>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-3">Tipe Transaksi</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${formData.type === 'income'
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-gray-200 text-gray-600 hover:border-green-200'
                                    }`}
                            >
                                <ArrowUpRight size={20} />
                                <span className="font-medium">Pemasukan</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${formData.type === 'expense'
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-200 text-gray-600 hover:border-red-200'
                                    }`}
                            >
                                <ArrowDownRight size={20} />
                                <span className="font-medium">Pengeluaran</span>
                            </button>
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Nominal <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Kategori <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Tanggal</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Keterangan transaksi..."
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none"
                        />
                    </div>

                    {/* Reference */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">No. Referensi (Opsional)</label>
                        <div className="relative">
                            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                                placeholder="INV-001"
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-white rounded-xl transition-colors disabled:opacity-50 ${formData.type === 'income'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Simpan Transaksi
                                </>
                            )}
                        </button>
                        <Link
                            href="/keuangan/transaksi"
                            className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Batal
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
