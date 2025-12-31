/**
 * Cetak Rapor Page - Responsive
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { FileText, Printer, Download, Search, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const MOCK_STUDENTS = [
    { id: 1, nama: 'Ahmad Rizki', nis: '12345', kelas: 'XII RPL 1', status: 'ready', ratarata: 85 },
    { id: 2, nama: 'Siti Nurhaliza', nis: '12346', kelas: 'XII RPL 1', status: 'ready', ratarata: 90 },
    { id: 3, nama: 'Budi Santoso', nis: '12347', kelas: 'XII RPL 1', status: 'pending', ratarata: 78 },
];

export default function CetakRaporPage() {
    const [kelas, setKelas] = useState('XII RPL 1');
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const selectAll = () => {
        if (selected.length === MOCK_STUDENTS.length) {
            setSelected([]);
        } else {
            setSelected(MOCK_STUDENTS.map(s => s.id));
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Link href="/rapor" className="hover:text-[var(--brand-primary)]">Rapor</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Cetak</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Cetak Rapor</h1>
                    <p className="text-sm text-[var(--text-muted)]">Print rapor semester siswa</p>
                </div>
                <button disabled={selected.length === 0} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-primary)] rounded-xl text-white text-sm font-medium w-full sm:w-auto disabled:opacity-50">
                    <Printer size={16} />
                    Cetak ({selected.length})
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
                <div className="flex items-end">
                    <button onClick={selectAll} className="px-4 py-2.5 bg-[var(--bg-hover)] rounded-xl text-sm font-medium w-full sm:w-auto">
                        {selected.length === MOCK_STUDENTS.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
                    </button>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3">
                {MOCK_STUDENTS.map(siswa => (
                    <div key={siswa.id} onClick={() => toggleSelect(siswa.id)} className={`bg-[var(--bg-card)] border rounded-xl p-4 cursor-pointer ${selected.includes(siswa.id) ? 'border-[var(--brand-primary)]' : 'border-[var(--border-light)]'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{siswa.nama}</p>
                                <p className="text-xs text-[var(--text-muted)]">NIS: {siswa.nis}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded ${siswa.status === 'ready' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                                    {siswa.status}
                                </span>
                                {selected.includes(siswa.id) && <CheckCircle size={16} className="text-[var(--brand-primary)]" />}
                            </div>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mt-2">Rata-rata: <span className="font-semibold text-[var(--text-primary)]">{siswa.ratarata}</span></p>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-hover)]">
                        <tr>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">
                                <input type="checkbox" checked={selected.length === MOCK_STUDENTS.length} onChange={selectAll} />
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Nama Siswa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">NIS</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)]">Kelas</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Rata-rata</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {MOCK_STUDENTS.map(siswa => (
                            <tr key={siswa.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-3 text-center">
                                    <input type="checkbox" checked={selected.includes(siswa.id)} onChange={() => toggleSelect(siswa.id)} />
                                </td>
                                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{siswa.nama}</td>
                                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{siswa.nis}</td>
                                <td className="px-4 py-3 text-sm">{siswa.kelas}</td>
                                <td className="px-4 py-3 text-center font-semibold">{siswa.ratarata}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 text-xs rounded ${siswa.status === 'ready' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>{siswa.status}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button className="px-3 py-1 bg-[var(--bg-hover)] rounded text-xs"><Download size={12} className="inline mr-1" /> PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                <Link href="/rapor" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">← Dashboard</Link>
                <Link href="/rapor/nilai" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Input Nilai</Link>
                <Link href="/rapor/rekap" className="px-3 py-1.5 bg-[var(--bg-hover)] rounded-lg text-xs sm:text-sm">Rekap Nilai</Link>
            </div>
        </div>
    );
}
