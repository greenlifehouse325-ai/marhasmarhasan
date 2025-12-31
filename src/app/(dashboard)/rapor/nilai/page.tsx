/**
 * Rapor Input Nilai Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { BarChart3, Save, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_STUDENTS = [
    { id: 1, nama: 'Ahmad Rizki', nis: '12345', uh1: 85, uh2: 88, uts: 82, uas: 85 },
    { id: 2, nama: 'Siti Nurhaliza', nis: '12346', uh1: 90, uh2: 92, uts: 88, uas: 90 },
    { id: 3, nama: 'Budi Santoso', nis: '12347', uh1: 78, uh2: 80, uts: 75, uas: 78 },
];

export default function InputNilaiPage() {
    const [kelas, setKelas] = useState('XII RPL 1');
    const [mapel, setMapel] = useState('Matematika');

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/rapor" className="hover:text-[var(--brand-primary)]">Rapor</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Input Nilai</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Input Nilai</h1>
                    <p className="text-sm text-[var(--text-muted)]">Input dan edit nilai siswa</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto">
                    <Save size={16} />
                    Simpan Semua
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Kelas</label>
                    <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm">
                        <option>XII RPL 1</option>
                        <option>XII RPL 2</option>
                        <option>XI TKJ 1</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Mata Pelajaran</label>
                    <select value={mapel} onChange={(e) => setMapel(e.target.value)} className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm">
                        <option>Matematika</option>
                        <option>Bahasa Indonesia</option>
                        <option>Pemrograman Dasar</option>
                    </select>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_STUDENTS.map(siswa => (
                    <div key={siswa.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <p className="font-semibold text-[var(--text-primary)]">{siswa.nama}</p>
                        <p className="text-xs text-[var(--text-muted)] mb-3">NIS: {siswa.nis}</p>
                        <div className="grid grid-cols-4 gap-2">
                            <div>
                                <label className="block text-xs text-[var(--text-muted)]">UH1</label>
                                <input type="number" defaultValue={siswa.uh1} className="w-full px-2 py-1.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-muted)]">UH2</label>
                                <input type="number" defaultValue={siswa.uh2} className="w-full px-2 py-1.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-muted)]">UTS</label>
                                <input type="number" defaultValue={siswa.uts} className="w-full px-2 py-1.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-muted)]">UAS</label>
                                <input type="number" defaultValue={siswa.uas} className="w-full px-2 py-1.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">No</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Nama Siswa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">NIS</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">UH 1</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">UH 2</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">UTS</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">UAS</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Rata-rata</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_STUDENTS.map((siswa, i) => {
                            const avg = Math.round((siswa.uh1 + siswa.uh2 + siswa.uts + siswa.uas) / 4);
                            return (
                                <tr key={siswa.id} className="hover:bg-[var(--bg-hover)]">
                                    <td className="px-4 py-3 text-sm">{i + 1}</td>
                                    <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{siswa.nama}</td>
                                    <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{siswa.nis}</td>
                                    <td className="px-4 py-3"><input type="number" defaultValue={siswa.uh1} className="w-16 px-2 py-1 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" /></td>
                                    <td className="px-4 py-3"><input type="number" defaultValue={siswa.uh2} className="w-16 px-2 py-1 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" /></td>
                                    <td className="px-4 py-3"><input type="number" defaultValue={siswa.uts} className="w-16 px-2 py-1 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" /></td>
                                    <td className="px-4 py-3"><input type="number" defaultValue={siswa.uas} className="w-16 px-2 py-1 bg-[var(--bg-input)] border border-[var(--border-light)] rounded text-sm text-center" /></td>
                                    <td className="px-4 py-3 text-center font-semibold text-[var(--brand-primary)]">{avg}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/rapor" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/rapor/cetak" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Cetak Rapor</Link>
                <Link href="/rapor/rekap" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Rekap Nilai</Link>
            </div>
        </div>
    );
}
