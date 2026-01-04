/**
 * Create Kelas Page Content (Client Component)
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, Users, GraduationCap, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateKelasContent() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/kelas');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
                <Link href="/kelas" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tambah Kelas Baru</h1>
                    <p className="text-[var(--text-muted)]">Buat kelas baru untuk tahun ajaran aktif</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <GraduationCap size={20} className="text-[var(--brand-primary)]" />
                        Informasi Kelas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tingkat *</label>
                            <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                <option value="">Pilih</option>
                                <option value="X">X (Sepuluh)</option>
                                <option value="XI">XI (Sebelas)</option>
                                <option value="XII">XII (Dua Belas)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Jurusan *</label>
                            <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                <option value="">Pilih</option>
                                <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                                <option value="TKJ">Teknik Komputer Jaringan (TKJ)</option>
                                <option value="MM">Multimedia (MM)</option>
                                <option value="AKL">Akuntansi (AKL)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Nomor Kelas *</label>
                            <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                <option value="">Pilih</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tahun Ajaran *</label>
                            <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                <option value="">Pilih</option>
                                <option value="2024/2025">2024/2025</option>
                                <option value="2023/2024">2023/2024</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <User size={20} className="text-green-500" />
                        Wali Kelas
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Pilih Wali Kelas</label>
                        <select className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                            <option value="">Belum ditentukan</option>
                            <option>Ahmad Suryadi, M.Pd</option>
                            <option>Siti Rahayu, S.Pd</option>
                            <option>Budi Santoso, M.Kom</option>
                        </select>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Users size={20} className="text-blue-500" />
                        Kapasitas
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Kapasitas Maksimal</label>
                            <input type="number" defaultValue={36} min={20} max={40} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Ruangan</label>
                            <select className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                <option value="">Pilih ruangan</option>
                                <option>Lab Komputer 1</option>
                                <option>Lab Komputer 2</option>
                                <option>Ruang 101</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors disabled:opacity-50">
                        <Save size={18} />
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Kelas'}
                    </button>
                    <Link href="/kelas" className="px-6 py-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium transition-colors">
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
