/**
 * Create Siswa Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, User, Phone, Mail, MapPin, GraduationCap, IdCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateSiswaPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/siswa');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/siswa" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tambah Siswa Baru</h1>
                    <p className="text-[var(--text-muted)]">Daftarkan siswa baru ke dalam sistem</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Identitas */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <IdCard size={20} className="text-[var(--brand-primary)]" />
                            Identitas Siswa
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">NISN *</label>
                                <input type="text" required maxLength={10} placeholder="10 digit" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">NIS *</label>
                                <input type="text" required placeholder="Nomor Induk Sekolah" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Nama Lengkap *</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Jenis Kelamin *</label>
                                <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Pilih</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tanggal Lahir *</label>
                                <input type="date" required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tempat Lahir</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Agama</label>
                                <select className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Pilih</option>
                                    <option>Islam</option>
                                    <option>Kristen</option>
                                    <option>Katolik</option>
                                    <option>Hindu</option>
                                    <option>Buddha</option>
                                    <option>Konghucu</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Akademik */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <GraduationCap size={20} className="text-blue-500" />
                            Data Akademik
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tahun Masuk *</label>
                                <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Pilih</option>
                                    <option>2024/2025</option>
                                    <option>2023/2024</option>
                                    <option>2022/2023</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Jurusan *</label>
                                <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Pilih</option>
                                    <option>Rekayasa Perangkat Lunak (RPL)</option>
                                    <option>Teknik Komputer Jaringan (TKJ)</option>
                                    <option>Multimedia (MM)</option>
                                    <option>Akuntansi (AKL)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Kelas</label>
                                <select className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Belum ditentukan</option>
                                    <option>X RPL 1</option>
                                    <option>X RPL 2</option>
                                    <option>X TKJ 1</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Asal Sekolah</label>
                                <input type="text" placeholder="SMP/MTs asal" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                        </div>
                    </div>

                    {/* Kontak */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Phone size={20} className="text-green-500" />
                            Kontak & Alamat
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">No. HP</label>
                                <input type="tel" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Alamat</label>
                                <textarea rows={3} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 resize-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Photo */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Foto Siswa</h2>
                        <div className="aspect-square rounded-xl bg-[var(--bg-hover)] border-2 border-dashed border-[var(--border-light)] flex items-center justify-center cursor-pointer hover:border-[var(--brand-primary)] transition-colors">
                            <div className="text-center p-4">
                                <User size={40} className="mx-auto text-[var(--text-muted)] mb-2" />
                                <p className="text-sm text-[var(--text-muted)]">Upload foto</p>
                                <p className="text-xs text-[var(--text-muted)]">Max 2MB, JPG/PNG</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6 space-y-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                        <Link
                            href="/siswa"
                            className="w-full flex items-center justify-center px-4 py-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors"
                        >
                            Batal
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
