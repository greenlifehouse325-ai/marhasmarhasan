/**
 * Form Buat Session Absensi
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Halaman untuk membuat session absensi baru dengan QR code
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    QrCode,
    Clock,
    Calendar,
    Users,
    MapPin,
    RefreshCw,
    Loader2,
    CheckCircle,
    Info,
} from 'lucide-react';
import { MOCK_CLASSES } from '@/data/mock-students';
import type { SessionType } from '@/types/absensi';

const SESSION_TYPES: { value: SessionType; label: string; description: string }[] = [
    { value: 'regular', label: 'Absensi Reguler', description: 'Absensi harian kelas' },
    { value: 'ceremony', label: 'Upacara', description: 'Upacara bendera/hari besar' },
    { value: 'event', label: 'Kegiatan Khusus', description: 'Workshop, seminar, dll' },
    { value: 'exam', label: 'Ujian', description: 'UTS, UAS, atau ujian lainnya' },
];

interface SessionFormData {
    title: string;
    type: SessionType;
    date: string;
    startTime: string;
    endTime: string;
    campus: 1 | 2;
    targetClasses: string[];
    refreshInterval: number;
}

export default function CreateSessionPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectAllClasses, setSelectAllClasses] = useState(true);
    const [formData, setFormData] = useState<SessionFormData>({
        title: '',
        type: 'regular',
        date: new Date().toISOString().split('T')[0],
        startTime: '07:00',
        endTime: '15:00',
        campus: 1,
        targetClasses: [],
        refreshInterval: 30,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'campus' || name === 'refreshInterval' ? Number(value) : value }));
    };

    const handleClassToggle = (classId: string) => {
        setFormData(prev => ({
            ...prev,
            targetClasses: prev.targetClasses.includes(classId)
                ? prev.targetClasses.filter(c => c !== classId)
                : [...prev.targetClasses, classId]
        }));
        setSelectAllClasses(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to session list
        router.push('/absensi/session');
    };

    const filteredClasses = MOCK_CLASSES.filter(c => c.campus === formData.campus);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/absensi/session"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/absensi" className="hover:text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/absensi/session" className="hover:text-blue-600">Session</Link>
                        <span>/</span>
                        <span>Buat Session</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Buat Session Absensi</h1>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Session Type */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tipe Session</h2>

                        <div className="grid grid-cols-2 gap-3">
                            {SESSION_TYPES.map((type) => (
                                <label
                                    key={type.value}
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.type === type.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-200'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type.value}
                                        checked={formData.type === type.value}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="flex items-start gap-3">
                                        {formData.type === type.value && (
                                            <CheckCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-800">{type.label}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{type.description}</p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Detail Session</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Judul Session <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Contoh: Upacara Bendera Senin"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Tanggal <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Jam Mulai</label>
                                    <div className="relative">
                                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Jam Selesai</label>
                                    <div className="relative">
                                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Target Classes */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Target Kelas</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Kampus:</span>
                                <select
                                    name="campus"
                                    value={formData.campus}
                                    onChange={handleChange}
                                    className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                                >
                                    <option value={1}>Kampus 1</option>
                                    <option value={2}>Kampus 2</option>
                                </select>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 mb-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectAllClasses}
                                onChange={(e) => {
                                    setSelectAllClasses(e.target.checked);
                                    if (e.target.checked) {
                                        setFormData(prev => ({ ...prev, targetClasses: [] }));
                                    }
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Semua Kelas Kampus {formData.campus}</span>
                        </label>

                        {!selectAllClasses && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                                {filteredClasses.map(cls => (
                                    <label
                                        key={cls.id}
                                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.targetClasses.includes(cls.id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-200'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.targetClasses.includes(cls.id)}
                                            onChange={() => handleClassToggle(cls.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600"
                                        />
                                        <span className="text-sm text-gray-700">{cls.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* QR Settings */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan QR</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    <RefreshCw size={14} className="inline mr-1" />
                                    Interval Refresh
                                </label>
                                <select
                                    name="refreshInterval"
                                    value={formData.refreshInterval}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                >
                                    <option value={15}>15 detik</option>
                                    <option value={30}>30 detik</option>
                                    <option value={60}>60 detik</option>
                                </select>
                            </div>

                            <div className="p-3 bg-blue-50 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700">
                                        QR code akan otomatis berubah setiap interval untuk mencegah screenshot
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview QR</h2>

                        <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <QrCode size={80} className="mx-auto text-blue-400 mb-2" />
                                <p className="text-xs text-gray-500">QR akan dibuat saat session aktif</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Membuat Session...
                                    </>
                                ) : (
                                    <>
                                        <QrCode size={18} />
                                        Buat Session
                                    </>
                                )}
                            </button>

                            <Link
                                href="/absensi/session"
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
