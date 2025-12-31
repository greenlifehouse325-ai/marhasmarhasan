/**
 * Assign Kelas Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Search, Check, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_AVAILABLE_SISWA = [
    { id: 'S001', name: 'Ahmad Rizki', nisn: '0012345678', jurusan: 'RPL' },
    { id: 'S002', name: 'Budi Santoso', nisn: '0012345679', jurusan: 'RPL' },
    { id: 'S003', name: 'Citra Dewi', nisn: '0012345680', jurusan: 'RPL' },
    { id: 'S004', name: 'Dina Lestari', nisn: '0012345681', jurusan: 'RPL' },
];

const MOCK_KELAS = [
    { id: 'K001', name: 'X RPL 1', capacity: 36, current: 32 },
    { id: 'K002', name: 'X RPL 2', capacity: 36, current: 34 },
];

export default function AssignKelasPage() {
    const [selectedSiswa, setSelectedSiswa] = useState<string[]>([]);
    const [selectedKelas, setSelectedKelas] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSiswa = (id: string) => {
        setSelectedSiswa(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleAssign = () => {
        if (selectedSiswa.length > 0 && selectedKelas) {
            alert(`${selectedSiswa.length} siswa berhasil ditambahkan ke ${MOCK_KELAS.find(k => k.id === selectedKelas)?.name}`);
        }
    };

    const filteredSiswa = MOCK_AVAILABLE_SISWA.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
                <Link href="/kelas" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Assign Siswa ke Kelas</h1>
                    <p className="text-[var(--text-muted)]">Tempatkan siswa baru ke dalam kelas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Siswa List */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Siswa Belum Terdaftar</h2>
                        <span className="text-sm text-[var(--text-muted)]">{selectedSiswa.length} dipilih</span>
                    </div>
                    <div className="relative mb-4">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input type="text" placeholder="Cari siswa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)]" />
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {filteredSiswa.map(siswa => (
                            <button key={siswa.id} onClick={() => toggleSiswa(siswa.id)} className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between ${selectedSiswa.includes(siswa.id) ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-primary)]'}`}>
                                <div>
                                    <p className="font-medium">{siswa.name}</p>
                                    <p className={`text-sm ${selectedSiswa.includes(siswa.id) ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>NISN: {siswa.nisn}</p>
                                </div>
                                {selectedSiswa.includes(siswa.id) && <Check size={20} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Kelas Selection */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Pilih Kelas Tujuan</h2>
                    <div className="space-y-3">
                        {MOCK_KELAS.map(kelas => (
                            <button key={kelas.id} onClick={() => setSelectedKelas(kelas.id)} className={`w-full p-4 rounded-xl text-left transition-all border-2 ${selectedKelas === kelas.id ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5' : 'border-[var(--border-light)] hover:border-[var(--border-medium)]'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-[var(--text-primary)]">{kelas.name}</p>
                                        <p className="text-sm text-[var(--text-muted)]">{kelas.current}/{kelas.capacity} siswa</p>
                                    </div>
                                    <div className="w-16 h-2 rounded-full bg-[var(--bg-hover)]">
                                        <div className="h-full rounded-full bg-[var(--brand-primary)]" style={{ width: `${(kelas.current / kelas.capacity) * 100}%` }} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {selectedSiswa.length > 0 && selectedKelas && (
                        <button onClick={handleAssign} className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium">
                            <Users size={18} />
                            Assign {selectedSiswa.length} Siswa
                            <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
