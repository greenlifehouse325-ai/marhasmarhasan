/**
 * Form Buat Pengumuman
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Halaman untuk membuat pengumuman baru
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Megaphone,
    Calendar,
    Users,
    AlertTriangle,
    Send,
    Save,
    Loader2,
    CheckCircle,
    Eye,
} from 'lucide-react';
import type { AnnouncementCategory, TargetAudience } from '@/types/aplikasi';

const CATEGORIES: { value: AnnouncementCategory; label: string }[] = [
    { value: 'academic', label: 'Akademik' },
    { value: 'event', label: 'Kegiatan' },
    { value: 'administrative', label: 'Administrasi' },
    { value: 'holiday', label: 'Libur' },
    { value: 'general', label: 'Umum' },
];

const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Rendah', color: 'bg-gray-100 text-gray-700' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-700' },
    { value: 'high', label: 'Penting', color: 'bg-amber-100 text-amber-700' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700' },
];

interface FormData {
    title: string;
    content: string;
    category: AnnouncementCategory;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    targetStudents: boolean;
    targetTeachers: boolean;
    targetParents: boolean;
    publishNow: boolean;
    publishDate: string;
    expiresDate: string;
}

export default function CreateAnnouncementPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [action, setAction] = useState<'draft' | 'publish'>('publish');
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        category: 'general',
        priority: 'normal',
        targetStudents: true,
        targetTeachers: true,
        targetParents: true,
        publishNow: true,
        publishDate: new Date().toISOString().split('T')[0],
        expiresDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        router.push('/aplikasi/pengumuman');
    };

    const characterCount = formData.content.length;
    const maxCharacters = 2000;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/aplikasi/pengumuman"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/aplikasi" className="hover:text-indigo-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/aplikasi/pengumuman" className="hover:text-indigo-600">Pengumuman</Link>
                        <span>/</span>
                        <span>Buat Pengumuman</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Buat Pengumuman</h1>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Content */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Konten Pengumuman</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Judul <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Judul pengumuman..."
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Isi Pengumuman <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={8}
                                    placeholder="Tulis isi pengumuman..."
                                    required
                                    maxLength={maxCharacters}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                                <p className={`text-xs mt-1 ${characterCount > maxCharacters * 0.9 ? 'text-amber-600' : 'text-gray-400'}`}>
                                    {characterCount}/{maxCharacters} karakter
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Prioritas</label>
                                    <div className="flex gap-2">
                                        {PRIORITY_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, priority: opt.value as FormData['priority'] }))}
                                                className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${formData.priority === opt.value
                                                        ? `${opt.color} ring-2 ring-offset-2 ring-current`
                                                        : 'bg-gray-100 text-gray-500'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Target Audience */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            <Users size={18} className="inline mr-2" />
                            Target Audiens
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${formData.targetStudents ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                                }`}>
                                <input
                                    type="checkbox"
                                    name="targetStudents"
                                    checked={formData.targetStudents}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded text-indigo-600"
                                />
                                <span className="text-sm font-medium">Siswa</span>
                            </label>

                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${formData.targetTeachers ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                                }`}>
                                <input
                                    type="checkbox"
                                    name="targetTeachers"
                                    checked={formData.targetTeachers}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded text-indigo-600"
                                />
                                <span className="text-sm font-medium">Guru</span>
                            </label>

                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${formData.targetParents ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                                }`}>
                                <input
                                    type="checkbox"
                                    name="targetParents"
                                    checked={formData.targetParents}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded text-indigo-600"
                                />
                                <span className="text-sm font-medium">Orang Tua</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Schedule */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            <Calendar size={18} className="inline mr-2" />
                            Jadwal Publikasi
                        </h2>

                        <div className="space-y-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="publishNow"
                                    checked={formData.publishNow}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded text-indigo-600"
                                />
                                <span className="text-sm">Publikasi sekarang</span>
                            </label>

                            {!formData.publishNow && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Tanggal Publikasi</label>
                                    <input
                                        type="date"
                                        name="publishDate"
                                        value={formData.publishDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Kadaluarsa (opsional)</label>
                                <input
                                    type="date"
                                    name="expiresDate"
                                    value={formData.expiresDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="space-y-3">
                            <button
                                type="submit"
                                onClick={() => setAction('publish')}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting && action === 'publish' ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Mempublikasi...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Publikasi
                                    </>
                                )}
                            </button>

                            <button
                                type="submit"
                                onClick={() => setAction('draft')}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting && action === 'draft' ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Simpan Draft
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
                            >
                                <Eye size={18} />
                                Preview
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
