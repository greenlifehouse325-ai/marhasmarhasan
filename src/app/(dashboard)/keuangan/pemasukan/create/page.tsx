/**
 * Form Catat Pemasukan Keuangan
 * SMK Marhas Admin Dashboard - Keuangan Module
 * 
 * Halaman untuk mencatat pemasukan keuangan sekolah
 * Terintegrasi dengan Dashboard Keuangan, Riwayat Transaksi, dan Laporan
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    Plus,
    Calendar,
    Wallet,
    Users,
    Banknote,
    CreditCard,
    Building2,
    QrCode,
    Smartphone,
    FileText,
    Tag,
    ChevronDown,
    ChevronUp,
    Loader2,
    CheckCircle,
    CircleDollarSign,
    ArrowRight,
    X,
} from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';

// ============================================
// TYPES & INTERFACES
// ============================================
interface FormData {
    tanggal: string;
    sumberPemasukan: string;
    sumberManual: string;
    namaSiswa: string;
    kelasSiswa: string;
    nominal: string;
    metodePembayaran: string;
    keterangan: string;
    kodeReferensi: string;
    akunKasTujuan: string;
}

interface FormErrors {
    tanggal?: string;
    sumberPemasukan?: string;
    sumberManual?: string;
    namaSiswa?: string;
    nominal?: string;
    metodePembayaran?: string;
}

// ============================================
// CONSTANTS
// ============================================
const SUMBER_PEMASUKAN = [
    { value: 'spp', label: 'SPP', requiresSiswa: true },
    { value: 'uang_gedung', label: 'Uang Gedung', requiresSiswa: true },
    { value: 'donasi', label: 'Donasi', requiresSiswa: false },
    { value: 'kegiatan_sekolah', label: 'Kegiatan Sekolah', requiresSiswa: false },
    { value: 'bantuan_pemerintah', label: 'Bantuan Pemerintah', requiresSiswa: false },
    { value: 'denda', label: 'Denda Perpustakaan', requiresSiswa: true },
    { value: 'lainnya', label: 'Lainnya', requiresSiswa: false },
];

const METODE_PEMBAYARAN = [
    { value: 'tunai', label: 'Tunai', icon: Banknote },
    { value: 'transfer', label: 'Transfer Bank', icon: Building2 },
    { value: 'qris', label: 'QRIS', icon: QrCode },
    { value: 'ewallet', label: 'E-Wallet', icon: Smartphone },
];

const AKUN_KAS = [
    { value: 'kas_utama', label: 'Kas Utama' },
    { value: 'kas_spp', label: 'Kas SPP' },
    { value: 'kas_kegiatan', label: 'Kas Kegiatan' },
    { value: 'rekening_bni', label: 'Rekening BNI' },
    { value: 'rekening_mandiri', label: 'Rekening Mandiri' },
];

// Mock data siswa untuk autocomplete
const MOCK_SISWA = [
    { id: '1', nama: 'Ahmad Rizky', kelas: 'XII PPLG 1', nis: '2021001' },
    { id: '2', nama: 'Siti Nurhaliza', kelas: 'XI TKJ 2', nis: '2022015' },
    { id: '3', nama: 'Budi Santoso', kelas: 'X PPLG 2', nis: '2023008' },
    { id: '4', nama: 'Dewi Lestari', kelas: 'XI TMS 1', nis: '2022032' },
    { id: '5', nama: 'Reza Pratama', kelas: 'X PPLG 1', nis: '2023025' },
    { id: '6', nama: 'Fitri Handayani', kelas: 'XII TKJ 1', nis: '2021045' },
    { id: '7', nama: 'Agus Setiawan', kelas: 'XI PPLG 2', nis: '2022052' },
    { id: '8', nama: 'Rina Wulandari', kelas: 'X TMS 1', nis: '2023078' },
];

// ============================================
// COMPONENT
// ============================================
export default function CatatPemasukanPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showSiswaDropdown, setShowSiswaDropdown] = useState(false);
    const [siswaSearch, setSiswaSearch] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        tanggal: new Date().toISOString().split('T')[0],
        sumberPemasukan: '',
        sumberManual: '',
        namaSiswa: '',
        kelasSiswa: '',
        nominal: '',
        metodePembayaran: '',
        keterangan: '',
        kodeReferensi: '',
        akunKasTujuan: 'kas_utama',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Check if selected source requires student selection
    const requiresSiswa = useMemo(() => {
        const source = SUMBER_PEMASUKAN.find(s => s.value === formData.sumberPemasukan);
        return source?.requiresSiswa || false;
    }, [formData.sumberPemasukan]);

    // Filter students based on search
    const filteredSiswa = useMemo(() => {
        if (!siswaSearch) return MOCK_SISWA;
        const search = siswaSearch.toLowerCase();
        return MOCK_SISWA.filter(
            s => s.nama.toLowerCase().includes(search) ||
                s.nis.includes(search) ||
                s.kelas.toLowerCase().includes(search)
        );
    }, [siswaSearch]);

    // Format currency
    const formatCurrency = (value: string): string => {
        const num = value.replace(/\D/g, '');
        return num ? parseInt(num).toLocaleString('id-ID') : '';
    };

    // Parse currency back to number string
    const parseCurrency = (value: string): string => {
        return value.replace(/\D/g, '');
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.tanggal) {
            newErrors.tanggal = 'Tanggal pemasukan wajib diisi';
        }

        if (!formData.sumberPemasukan) {
            newErrors.sumberPemasukan = 'Pilih sumber pemasukan';
        }

        if (formData.sumberPemasukan === 'lainnya' && !formData.sumberManual.trim()) {
            newErrors.sumberManual = 'Masukkan sumber pemasukan manual';
        }

        if (requiresSiswa && !formData.namaSiswa) {
            newErrors.namaSiswa = 'Pilih nama siswa';
        }

        const nominalValue = parseInt(parseCurrency(formData.nominal));
        if (!formData.nominal || nominalValue <= 0) {
            newErrors.nominal = 'Nominal harus lebih dari Rp 0';
        }

        if (!formData.metodePembayaran) {
            newErrors.metodePembayaran = 'Pilih metode pembayaran';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'nominal') {
            const formattedValue = formatCurrency(value);
            setFormData(prev => ({ ...prev, nominal: formattedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear related errors
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        // Reset siswa when changing sumber
        if (name === 'sumberPemasukan') {
            const source = SUMBER_PEMASUKAN.find(s => s.value === value);
            if (!source?.requiresSiswa) {
                setFormData(prev => ({ ...prev, namaSiswa: '', kelasSiswa: '' }));
                setSiswaSearch('');
            }
        }
    };

    // Handle blur for validation
    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    // Handle siswa selection
    const handleSelectSiswa = (siswa: typeof MOCK_SISWA[0]) => {
        setFormData(prev => ({
            ...prev,
            namaSiswa: siswa.nama,
            kelasSiswa: siswa.kelas,
        }));
        setSiswaSearch(siswa.nama);
        setShowSiswaDropdown(false);
        setErrors(prev => ({ ...prev, namaSiswa: undefined }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent, addAnother: boolean = false) => {
        e.preventDefault();

        // Mark all as touched
        setTouched({
            tanggal: true,
            sumberPemasukan: true,
            sumberManual: true,
            namaSiswa: true,
            nominal: true,
            metodePembayaran: true,
        });

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);

        if (addAnother) {
            // Reset form for new entry
            setFormData({
                tanggal: new Date().toISOString().split('T')[0],
                sumberPemasukan: '',
                sumberManual: '',
                namaSiswa: '',
                kelasSiswa: '',
                nominal: '',
                metodePembayaran: '',
                keterangan: '',
                kodeReferensi: '',
                akunKasTujuan: 'kas_utama',
            });
            setSiswaSearch('');
            setTouched({});
            setErrors({});
            setShowSuccessModal(true);
        } else {
            setShowSuccessModal(true);
        }
    };

    // Check if form is valid for submit button
    const isFormValid = useMemo(() => {
        const hasRequired =
            formData.tanggal &&
            formData.sumberPemasukan &&
            formData.nominal &&
            formData.metodePembayaran &&
            parseInt(parseCurrency(formData.nominal)) > 0;

        const hasSiswaIfRequired = !requiresSiswa || formData.namaSiswa;
        const hasManualIfRequired = formData.sumberPemasukan !== 'lainnya' || formData.sumberManual.trim();

        return hasRequired && hasSiswaIfRequired && hasManualIfRequired;
    }, [formData, requiresSiswa]);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/keuangan/pemasukan"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div className="flex-1">
                    <Breadcrumb
                        items={[
                            { label: 'Keuangan', href: '/keuangan' },
                            { label: 'Pemasukan', href: '/keuangan/pemasukan' },
                            { label: 'Catat Pemasukan' },
                        ]}
                        showHome={false}
                    />
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <Wallet size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                                Catat Pemasukan
                            </h1>
                            <p className="text-sm text-[var(--text-muted)]">
                                Tambahkan data pemasukan keuangan sekolah
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleSubmit(e, false)} className="max-w-2xl">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-6 shadow-sm space-y-6">
                    {/* Tanggal Pemasukan */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Tanggal Pemasukan <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                            <input
                                type="date"
                                name="tanggal"
                                value={formData.tanggal}
                                onChange={handleChange}
                                onBlur={() => handleBlur('tanggal')}
                                className={`w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all ${touched.tanggal && errors.tanggal
                                        ? 'border-red-500'
                                        : 'border-[var(--border-light)]'
                                    }`}
                            />
                        </div>
                        {touched.tanggal && errors.tanggal && (
                            <p className="mt-1 text-sm text-red-500">{errors.tanggal}</p>
                        )}
                    </div>

                    {/* Sumber Pemasukan */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Sumber Pemasukan <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                            <select
                                name="sumberPemasukan"
                                value={formData.sumberPemasukan}
                                onChange={handleChange}
                                onBlur={() => handleBlur('sumberPemasukan')}
                                className={`w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none cursor-pointer ${touched.sumberPemasukan && errors.sumberPemasukan
                                        ? 'border-red-500'
                                        : 'border-[var(--border-light)]'
                                    }`}
                            >
                                <option value="">Pilih Sumber Pemasukan</option>
                                {SUMBER_PEMASUKAN.map(sumber => (
                                    <option key={sumber.value} value={sumber.value}>
                                        {sumber.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                        </div>
                        {touched.sumberPemasukan && errors.sumberPemasukan && (
                            <p className="mt-1 text-sm text-red-500">{errors.sumberPemasukan}</p>
                        )}
                    </div>

                    {/* Sumber Manual (if Lainnya selected) */}
                    {formData.sumberPemasukan === 'lainnya' && (
                        <div className="animate-fadeIn">
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Sumber Pemasukan Manual <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="sumberManual"
                                value={formData.sumberManual}
                                onChange={handleChange}
                                onBlur={() => handleBlur('sumberManual')}
                                placeholder="Contoh: Sewa Lapangan"
                                className={`w-full px-4 py-3 bg-[var(--bg-input)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all ${touched.sumberManual && errors.sumberManual
                                        ? 'border-red-500'
                                        : 'border-[var(--border-light)]'
                                    }`}
                            />
                            {touched.sumberManual && errors.sumberManual && (
                                <p className="mt-1 text-sm text-red-500">{errors.sumberManual}</p>
                            )}
                        </div>
                    )}

                    {/* Nama Siswa (if required) */}
                    {requiresSiswa && (
                        <div className="animate-fadeIn">
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Nama Siswa <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] z-10" />
                                <input
                                    type="text"
                                    value={siswaSearch}
                                    onChange={(e) => {
                                        setSiswaSearch(e.target.value);
                                        setShowSiswaDropdown(true);
                                        if (formData.namaSiswa) {
                                            setFormData(prev => ({ ...prev, namaSiswa: '', kelasSiswa: '' }));
                                        }
                                    }}
                                    onFocus={() => setShowSiswaDropdown(true)}
                                    onBlur={() => {
                                        setTimeout(() => setShowSiswaDropdown(false), 200);
                                        handleBlur('namaSiswa');
                                    }}
                                    placeholder="Cari nama atau NIS siswa..."
                                    className={`w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all ${touched.namaSiswa && errors.namaSiswa
                                            ? 'border-red-500'
                                            : 'border-[var(--border-light)]'
                                        }`}
                                />
                                {showSiswaDropdown && filteredSiswa.length > 0 && (
                                    <div className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl shadow-lg max-h-60 overflow-auto">
                                        {filteredSiswa.map(siswa => (
                                            <button
                                                key={siswa.id}
                                                type="button"
                                                onClick={() => handleSelectSiswa(siswa)}
                                                className="w-full px-4 py-3 text-left hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-[var(--text-primary)]">
                                                        {siswa.nama}
                                                    </p>
                                                    <p className="text-xs text-[var(--text-muted)]">
                                                        NIS: {siswa.nis}
                                                    </p>
                                                </div>
                                                <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-lg">
                                                    {siswa.kelas}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {touched.namaSiswa && errors.namaSiswa && (
                                <p className="mt-1 text-sm text-red-500">{errors.namaSiswa}</p>
                            )}
                            {formData.kelasSiswa && (
                                <p className="mt-2 text-sm text-[var(--text-muted)]">
                                    Kelas: <span className="font-medium text-[var(--text-primary)]">{formData.kelasSiswa}</span>
                                </p>
                            )}
                        </div>
                    )}

                    {/* Nominal Pemasukan */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Nominal Pemasukan <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-medium">
                                Rp
                            </span>
                            <input
                                type="text"
                                name="nominal"
                                value={formData.nominal}
                                onChange={handleChange}
                                onBlur={() => handleBlur('nominal')}
                                placeholder="0"
                                className={`w-full pl-12 pr-4 py-3 bg-[var(--bg-input)] border rounded-xl text-lg font-bold text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all ${touched.nominal && errors.nominal
                                        ? 'border-red-500'
                                        : 'border-[var(--border-light)]'
                                    }`}
                            />
                            <CircleDollarSign size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                        </div>
                        {touched.nominal && errors.nominal && (
                            <p className="mt-1 text-sm text-red-500">{errors.nominal}</p>
                        )}
                    </div>

                    {/* Metode Pembayaran */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Metode Pembayaran <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {METODE_PEMBAYARAN.map(metode => {
                                const Icon = metode.icon;
                                const isSelected = formData.metodePembayaran === metode.value;
                                return (
                                    <button
                                        key={metode.value}
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, metodePembayaran: metode.value }));
                                            setErrors(prev => ({ ...prev, metodePembayaran: undefined }));
                                        }}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${isSelected
                                                ? 'border-green-500 bg-green-500/10 text-green-600'
                                                : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:border-green-300 hover:bg-green-500/5'
                                            }`}
                                    >
                                        <Icon size={24} />
                                        <span className="text-xs font-medium">{metode.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {touched.metodePembayaran && errors.metodePembayaran && (
                            <p className="mt-2 text-sm text-red-500">{errors.metodePembayaran}</p>
                        )}
                    </div>

                    {/* Keterangan */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Keterangan / Catatan
                            <span className="text-[var(--text-muted)] font-normal ml-1">(Opsional)</span>
                        </label>
                        <div className="relative">
                            <FileText size={18} className="absolute left-4 top-4 text-[var(--text-muted)]" />
                            <textarea
                                name="keterangan"
                                value={formData.keterangan}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Contoh: SPP bulan Januari 2026"
                                className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Advanced Options Toggle */}
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        Informasi Tambahan
                    </button>

                    {/* Advanced Options */}
                    {showAdvanced && (
                        <div className="space-y-4 pt-4 border-t border-[var(--border-light)] animate-fadeIn">
                            {/* Kode Referensi */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Kode Referensi / No. Bukti
                                </label>
                                <input
                                    type="text"
                                    name="kodeReferensi"
                                    value={formData.kodeReferensi}
                                    onChange={handleChange}
                                    placeholder="Contoh: INV-2026-001"
                                    className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                />
                            </div>

                            {/* Akun Kas Tujuan */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Akun Kas Tujuan
                                </label>
                                <div className="relative">
                                    <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <select
                                        name="akunKasTujuan"
                                        value={formData.akunKasTujuan}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none cursor-pointer"
                                    >
                                        {AKUN_KAS.map(akun => (
                                            <option key={akun.value} value={akun.value}>
                                                {akun.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                                </div>
                            </div>

                            {/* Ditambahkan oleh */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Ditambahkan oleh
                                </label>
                                <div className="px-4 py-3 bg-[var(--bg-hover)] border border-[var(--border-light)] rounded-xl text-[var(--text-muted)]">
                                    Admin Keuangan (Auto)
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border-light)]">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Simpan Pemasukan
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e as any, true)}
                            disabled={isSubmitting || !isFormValid}
                            className="flex items-center justify-center gap-2 py-3 px-6 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-primary)] font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus size={18} />
                            Simpan & Tambah Baru
                        </button>
                        <Link
                            href="/keuangan/pemasukan"
                            className="flex items-center justify-center py-3 px-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium transition-colors"
                        >
                            Batal
                        </Link>
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scaleIn">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle size={32} className="text-green-500" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                                Berhasil Disimpan!
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] mb-6">
                                Data pemasukan telah berhasil dicatat ke sistem.
                            </p>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/keuangan/pemasukan"
                                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                                >
                                    Lihat Riwayat Pemasukan
                                    <ArrowRight size={16} />
                                </Link>
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="py-3 px-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
                                >
                                    Tambah Pemasukan Lagi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom animations */}
            <style jsx global>{`
                @keyframes scaleIn {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
