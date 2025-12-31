/**
 * Dispensasi Create Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, User, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateDispensasiPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/absensi/dispensasi');
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
                <Link href="/absensi/dispensasi" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Buat Dispensasi</h1>
                    <p className="text-[var(--text-muted)]">Ajukan dispensasi untuk siswa</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <User size={20} className="text-[var(--brand-primary)]" />
                        Siswa
                    </h2>
                    <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]">
                        <option value="">Pilih siswa...</option>
                        <option>Ahmad Rizki - XII RPL 1</option>
                        <option>Siti Nurhaliza - XII RPL 2</option>
                        <option>Budi Santoso - XI TKJ 1</option>
                    </select>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-blue-500" />
                        Waktu
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tanggal</label>
                            <input type="date" required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Durasi</label>
                            <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)]">
                                <option>1 Jam</option>
                                <option>2 Jam</option>
                                <option>3 Jam</option>
                                <option>Full Day</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-green-500" />
                        Alasan
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Jenis Dispensasi</label>
                        <select required className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] mb-4">
                            <option>Lomba</option>
                            <option>Kegiatan OSIS</option>
                            <option>Keperluan Keluarga</option>
                            <option>Lainnya</option>
                        </select>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Keterangan</label>
                        <textarea rows={3} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] resize-none" />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium disabled:opacity-50">
                        <Save size={18} />
                        {isSubmitting ? 'Menyimpan...' : 'Ajukan Dispensasi'}
                    </button>
                    <Link href="/absensi/dispensasi" className="px-6 py-3 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl font-medium">Batal</Link>
                </div>
            </form>
        </div>
    );
}
