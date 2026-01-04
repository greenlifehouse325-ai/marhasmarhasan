/**
 * Halaman Buat Berita Baru
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Form untuk membuat berita sekolah baru
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Newspaper,
    Save,
    Eye,
    Image,
    Plus,
    Star,
    X,
    Upload,
    Check,
    FileText,
    Tag,
    Calendar,
    Type,
    AlignLeft,
} from 'lucide-react';

// Categories
const CATEGORIES = [
    { value: 'achievement', label: 'Prestasi', color: '#F59E0B' },
    { value: 'activity', label: 'Kegiatan', color: '#3B82F6' },
    { value: 'education', label: 'Pendidikan', color: '#10B981' },
    { value: 'sports', label: 'Olahraga', color: '#EF4444' },
    { value: 'technology', label: 'Teknologi', color: '#8B5CF6' },
];

interface FormData {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    featured: boolean;
    status: 'draft' | 'published';
    publishedAt: string;
    tags: string[];
    coverImage: string;
}

export default function CreateBeritaPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newTag, setNewTag] = useState('');

    const [formData, setFormData] = useState<FormData>({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        featured: false,
        status: 'draft',
        publishedAt: new Date().toISOString().split('T')[0],
        tags: [],
        coverImage: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Judul berita wajib diisi';
        }
        if (!formData.excerpt.trim()) {
            newErrors.excerpt = 'Ringkasan berita wajib diisi';
        }
        if (!formData.content.trim()) {
            newErrors.content = 'Konten berita wajib diisi';
        }
        if (!formData.category) {
            newErrors.category = 'Kategori wajib dipilih';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowSuccessModal(true);
    };

    const handlePreview = () => {
        // Could open a preview modal or navigate to preview page
        alert('Preview akan ditampilkan di sini');
    };

    const isFormValid = formData.title.trim() && formData.excerpt.trim() && formData.content.trim() && formData.category;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/aplikasi/berita"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                        <Link href="/aplikasi" className="hover:text-indigo-500">Dashboard</Link>
                        <span>/</span>
                        <Link href="/aplikasi/berita" className="hover:text-indigo-500">Berita</Link>
                        <span>/</span>
                        <span>Tulis Berita</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                            <Newspaper size={20} className="text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">Tulis Berita Baru</h1>
                            <p className="text-sm text-[var(--text-muted)]">Buat berita untuk aplikasi sekolah</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleSubmit(e, false)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title & Excerpt */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Type size={18} className="text-indigo-500" />
                            Informasi Berita
                        </h2>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Judul Berita <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Masukkan judul berita yang menarik"
                                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.title ? 'border-red-500' : 'border-[var(--border-light)]'}`}
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Ringkasan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    placeholder="Tulis ringkasan singkat berita (akan ditampilkan di daftar berita)"
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.excerpt ? 'border-red-500' : 'border-[var(--border-light)]'}`}
                                />
                                {errors.excerpt && <p className="text-xs text-red-500 mt-1">{errors.excerpt}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <AlignLeft size={18} className="text-indigo-500" />
                            Konten Berita
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Isi Berita <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Tulis konten berita lengkap di sini..."
                                rows={12}
                                className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.content ? 'border-red-500' : 'border-[var(--border-light)]'}`}
                            />
                            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                            <p className="text-xs text-[var(--text-muted)] mt-2">
                                {formData.content.length} karakter
                            </p>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Image size={18} className="text-indigo-500" />
                            Gambar Cover
                        </h2>

                        <div className="border-2 border-dashed border-[var(--border-light)] rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                            <div className="w-16 h-16 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                                <Upload size={28} className="text-indigo-500" />
                            </div>
                            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                                Klik untuk upload gambar
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">
                                PNG, JPG, atau GIF (max 2MB)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-6">
                    {/* Publish Settings */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-indigo-500" />
                            Publikasi
                        </h2>

                        <div className="space-y-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] bg-[var(--bg-input)] text-[var(--text-primary)]"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Publikasikan</option>
                                </select>
                            </div>

                            {/* Publish Date */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
                                    <Calendar size={14} />
                                    Tanggal Publikasi
                                </label>
                                <input
                                    type="date"
                                    name="publishedAt"
                                    value={formData.publishedAt}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-light)] bg-[var(--bg-input)] text-[var(--text-primary)]"
                                />
                            </div>

                            {/* Featured */}
                            <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded accent-amber-500"
                                />
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="text-amber-500" />
                                    <span className="text-sm font-medium text-[var(--text-primary)]">Jadikan Featured</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Tag size={18} className="text-indigo-500" />
                            Kategori
                        </h2>

                        <div className="space-y-2">
                            {CATEGORIES.map(cat => (
                                <label
                                    key={cat.value}
                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${formData.category === cat.value
                                            ? 'bg-indigo-500/10 border border-indigo-500/30'
                                            : 'hover:bg-[var(--bg-hover)] border border-transparent'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat.value}
                                        checked={formData.category === cat.value}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-indigo-500"
                                    />
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                    <span className="text-sm text-[var(--text-primary)]">{cat.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.category && <p className="text-xs text-red-500 mt-2">{errors.category}</p>}
                    </div>

                    {/* Tags */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">Tag</h2>

                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Tambah tag"
                                className="flex-1 px-3 py-2 rounded-lg border border-[var(--border-light)] bg-[var(--bg-input)] text-sm text-[var(--text-primary)]"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-500/10 text-indigo-500 rounded-full"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-indigo-700"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save size={18} />
                                )}
                                {isSubmitting ? 'Menyimpan...' : 'Simpan Berita'}
                            </button>

                            <button
                                type="button"
                                onClick={handlePreview}
                                disabled={!isFormValid}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-primary)] rounded-xl font-medium disabled:opacity-50 transition-colors"
                            >
                                <Eye size={18} />
                                Preview
                            </button>

                            <Link
                                href="/aplikasi/berita"
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-xl font-medium transition-colors"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card)] rounded-2xl p-8 max-w-md w-full shadow-xl animate-fadeIn">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] text-center mb-2">
                            Berita Berhasil Disimpan!
                        </h3>
                        <p className="text-[var(--text-muted)] text-center mb-6">
                            Berita telah disimpan {formData.status === 'published' ? 'dan dipublikasikan' : 'sebagai draft'}.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="/aplikasi/berita"
                                className="flex-1 px-4 py-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-primary)] rounded-xl font-medium text-center transition-colors"
                            >
                                Lihat Daftar Berita
                            </Link>
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    setFormData({
                                        title: '',
                                        excerpt: '',
                                        content: '',
                                        category: '',
                                        featured: false,
                                        status: 'draft',
                                        publishedAt: new Date().toISOString().split('T')[0],
                                        tags: [],
                                        coverImage: '',
                                    });
                                }}
                                className="flex-1 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors"
                            >
                                Tulis Berita Lagi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
