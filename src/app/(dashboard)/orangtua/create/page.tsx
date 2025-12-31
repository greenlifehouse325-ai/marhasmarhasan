/**
 * Create Orang Tua Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, User, Phone, Mail, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateOrangTuaPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/orangtua');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/orangtua" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tambah Orang Tua</h1>
                    <p className="text-[var(--text-muted)]">Daftarkan orang tua/wali baru</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Data Pribadi */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <User size={20} className="text-[var(--brand-primary)]" />
                            Data Pribadi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Nama Lengkap *</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">NIK</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Pekerjaan</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Penghasilan</label>
                                <select className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option>Pilih range</option>
                                    <option>{"< Rp 2.000.000"}</option>
                                    <option>Rp 2.000.000 - 5.000.000</option>
                                    <option>Rp 5.000.000 - 10.000.000</option>
                                    <option>{"> Rp 10.000.000"}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Kontak */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Phone size={20} className="text-green-500" />
                            Kontak
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">No. Telepon *</label>
                                <input type="tel" required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
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
                    {/* Link Anak */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Users size={20} className="text-blue-500" />
                            Hubungkan Anak
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-4">Pilih siswa yang merupakan anak dari orang tua/wali ini</p>
                        <select className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                            <option>Pilih siswa...</option>
                            <option>Ahmad Rizki - XII RPL 1</option>
                            <option>Siti Nurhaliza - XII RPL 2</option>
                            <option>Farhan Akbar - XI TKJ 1</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
