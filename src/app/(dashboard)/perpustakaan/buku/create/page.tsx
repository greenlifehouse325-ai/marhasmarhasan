/**
 * Form Tambah Buku
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Halaman untuk menambah buku baru ke perpustakaan
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    BookOpen,
    User,
    Building,
    Calendar,
    MapPin,
    Hash,
    FileText,
    Image,
    Loader2,
} from 'lucide-react';

interface BookFormData {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishYear: string;
    category: string;
    language: string;
    pages: string;
    location: string;
    totalCopies: string;
    description: string;
    cover: string;
}

const CATEGORIES = [
    'Fiksi',
    'Non-Fiksi',
    'Sains',
    'Teknologi',
    'Sejarah',
    'Referensi',
    'Pendidikan',
    'Sastra',
    'Agama',
    'Lainnya',
];

export default function CreateBookPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        publishYear: '',
        category: '',
        language: 'Indonesia',
        pages: '',
        location: '',
        totalCopies: '1',
        description: '',
        cover: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to book list
        router.push('/perpustakaan/buku');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/perpustakaan/buku"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/perpustakaan/buku" className="hover:text-emerald-600">Data Buku</Link>
                        <span>/</span>
                        <span>Tambah Buku</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Tambah Buku Baru</h1>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h2>

                        <div className="space-y-4">
                            <FormField
                                label="Judul Buku"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Masukkan judul buku"
                                icon={<BookOpen size={18} />}
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    label="Penulis"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="Nama penulis"
                                    icon={<User size={18} />}
                                    required
                                />
                                <FormField
                                    label="ISBN"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    placeholder="978-xxx-xxx-xxx-x"
                                    icon={<Hash size={18} />}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    label="Penerbit"
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                    placeholder="Nama penerbit"
                                    icon={<Building size={18} />}
                                />
                                <FormField
                                    label="Tahun Terbit"
                                    name="publishYear"
                                    type="number"
                                    value={formData.publishYear}
                                    onChange={handleChange}
                                    placeholder="2024"
                                    icon={<Calendar size={18} />}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Sinopsis atau deskripsi singkat buku..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detail Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Detail Buku</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Bahasa</label>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    >
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Inggris">Inggris</option>
                                        <option value="Arab">Arab</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    label="Jumlah Halaman"
                                    name="pages"
                                    type="number"
                                    value={formData.pages}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                                <FormField
                                    label="Lokasi Rak"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="A-01"
                                    icon={<MapPin size={18} />}
                                />
                                <FormField
                                    label="Jumlah Eksemplar"
                                    name="totalCopies"
                                    type="number"
                                    value={formData.totalCopies}
                                    onChange={handleChange}
                                    placeholder="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Cover Upload */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cover Buku</h2>

                        <div className="aspect-[3/4] bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-emerald-400 transition-colors cursor-pointer">
                            <Image size={40} className="text-gray-300 mb-2" />
                            <p className="text-sm text-gray-500">Klik untuk upload</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG max 2MB</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi</h2>

                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Simpan Buku
                                    </>
                                )}
                            </button>

                            <Link
                                href="/perpustakaan/buku"
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    icon,
    required = false,
}: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${icon ? 'pl-11 pr-4' : 'px-4'
                        }`}
                />
            </div>
        </div>
    );
}
