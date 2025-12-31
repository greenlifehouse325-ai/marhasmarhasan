/**
 * Upload Konten Digital Page
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Features:
 * - File upload with drag & drop
 * - Content type selection (E-Book, Video, Audio)
 * - Metadata input (title, author, description)
 * - File format validation
 * - Theme-aware styling
 */

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Upload,
    Book,
    Video,
    Music,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Info
} from 'lucide-react';

type ContentType = 'ebook' | 'video' | 'audio';

const ACCEPTED_FORMATS: Record<ContentType, string[]> = {
    ebook: ['.pdf', '.epub', '.mobi'],
    video: ['.mp4', '.mkv', '.avi', '.webm'],
    audio: ['.mp3', '.wav', '.ogg', '.m4a'],
};

const MAX_FILE_SIZES: Record<ContentType, number> = {
    ebook: 50 * 1024 * 1024, // 50 MB
    video: 500 * 1024 * 1024, // 500 MB
    audio: 100 * 1024 * 1024, // 100 MB
};

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

export default function UploadKontenPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [contentType, setContentType] = useState<ContentType>('ebook');
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');

    const validateFile = (file: File): string | null => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        const acceptedFormats = ACCEPTED_FORMATS[contentType];
        const maxSize = MAX_FILE_SIZES[contentType];

        if (!acceptedFormats.includes(extension)) {
            return `Format tidak didukung. Gunakan: ${acceptedFormats.join(', ')}`;
        }
        if (file.size > maxSize) {
            return `File terlalu besar. Maksimal: ${formatFileSize(maxSize)}`;
        }
        return null;
    };

    const handleFileSelect = (selectedFile: File) => {
        setError('');
        const validationError = validateFile(selectedFile);
        if (validationError) {
            setError(validationError);
            return;
        }
        setFile(selectedFile);
        // Auto-fill title from filename
        if (!title) {
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title || !author) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 20;
            });
        }, 300);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            clearInterval(progressInterval);
            setUploadProgress(100);

            // Redirect after short delay
            setTimeout(() => {
                router.push('/perpustakaan/konten-digital');
            }, 500);
        } catch {
            setError('Upload gagal. Silakan coba lagi.');
            setIsUploading(false);
            clearInterval(progressInterval);
        }
    };

    const contentTypeOptions = [
        { value: 'ebook', label: 'E-Book', icon: Book, color: 'blue' },
        { value: 'video', label: 'Video', icon: Video, color: 'red' },
        { value: 'audio', label: 'Audio', icon: Music, color: 'green' },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/perpustakaan/konten-digital"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                        <Link href="/perpustakaan" className="hover:text-emerald-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/perpustakaan/konten-digital" className="hover:text-emerald-600">Konten Digital</Link>
                        <span>/</span>
                        <span>Upload</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Upload Konten Digital</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Content Type Selection */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Tipe Konten</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {contentTypeOptions.map(option => {
                                const Icon = option.icon;
                                const isSelected = contentType === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setContentType(option.value as ContentType);
                                            setFile(null);
                                            setError('');
                                        }}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${isSelected
                                                ? `border-${option.color}-500 bg-${option.color}-500/10`
                                                : 'border-[var(--border-light)] bg-[var(--bg-hover)] hover:border-[var(--border-medium)]'
                                            }`}
                                    >
                                        <Icon size={24} className={isSelected ? `text-${option.color}-500` : 'text-[var(--text-muted)]'} />
                                        <span className={`text-sm font-medium ${isSelected ? `text-${option.color}-600` : 'text-[var(--text-secondary)]'}`}>
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Upload File</h2>

                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                                    ? 'border-emerald-500 bg-emerald-500/10'
                                    : file
                                        ? 'border-emerald-500 bg-emerald-500/5'
                                        : 'border-[var(--border-light)] hover:border-emerald-500/50 hover:bg-[var(--bg-hover)]'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={ACCEPTED_FORMATS[contentType].join(',')}
                                onChange={handleFileInputChange}
                                className="hidden"
                            />

                            {file ? (
                                <div className="flex items-center justify-center gap-3">
                                    <FileText size={24} className="text-emerald-600" />
                                    <div className="text-left">
                                        <p className="font-medium text-[var(--text-primary)]">{file.name}</p>
                                        <p className="text-sm text-[var(--text-muted)]">{formatFileSize(file.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="p-1 hover:bg-red-500/20 rounded-lg text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload size={32} className={`mx-auto mb-3 ${isDragging ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
                                    <p className="text-[var(--text-primary)] font-medium mb-1">
                                        Drag & drop file atau klik untuk memilih
                                    </p>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Format: {ACCEPTED_FORMATS[contentType].join(', ')} • Max: {formatFileSize(MAX_FILE_SIZES[contentType])}
                                    </p>
                                </>
                            )}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 mt-3 text-red-500 text-sm">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        {isUploading && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-[var(--text-muted)]">Uploading...</span>
                                    <span className="text-emerald-600 font-medium">{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Informasi Konten</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Judul <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masukkan judul konten..."
                                    required
                                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Penulis/Pembuat <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Nama penulis atau pembuat..."
                                    required
                                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Deskripsi singkat konten (opsional)..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={!file || !title || !author || isUploading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Mengupload...
                                </>
                            ) : (
                                <>
                                    <Upload size={16} />
                                    Upload Konten
                                </>
                            )}
                        </button>
                        <Link
                            href="/perpustakaan/konten-digital"
                            className="px-6 py-3 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors"
                        >
                            Batal
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Upload Guidelines */}
                    <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-600 mb-3">
                            <Info size={18} />
                            <h3 className="font-semibold">Panduan Upload</h3>
                        </div>
                        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2 list-disc list-inside">
                            <li>Pastikan konten tidak melanggar hak cipta</li>
                            <li>Gunakan judul yang jelas dan deskriptif</li>
                            <li>Konten akan direview sebelum dipublikasi</li>
                            <li>File yang diupload akan dikompresi otomatis</li>
                        </ul>
                    </div>

                    {/* Format Info */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)]">
                        <h3 className="font-semibold text-[var(--text-primary)] mb-3">Format yang Didukung</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <Book size={16} className="text-blue-500" />
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">E-Book</p>
                                    <p className="text-[var(--text-muted)]">PDF, EPUB, MOBI (max 50MB)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Video size={16} className="text-red-500" />
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">Video</p>
                                    <p className="text-[var(--text-muted)]">MP4, MKV, AVI (max 500MB)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Music size={16} className="text-green-500" />
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">Audio</p>
                                    <p className="text-[var(--text-muted)]">MP3, WAV, OGG (max 100MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
