/**
 * Link Orang Tua ke Siswa Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { ArrowLeft, Search, Link2, Check, Users } from 'lucide-react';
import Link from 'next/link';

const MOCK_STUDENTS = [
    { id: 'S001', name: 'Ahmad Rizki', class: 'XII RPL 1', nisn: '0012345678', hasParent: true },
    { id: 'S002', name: 'Siti Nurhaliza', class: 'XII RPL 2', nisn: '0012345679', hasParent: true },
    { id: 'S003', name: 'Farhan Akbar', class: 'XI TKJ 1', nisn: '0012345680', hasParent: false },
    { id: 'S004', name: 'Dina Prasetyo', class: 'X MM 1', nisn: '0012345681', hasParent: false },
    { id: 'S005', name: 'Budi Santoso', class: 'XII AKL 1', nisn: '0012345682', hasParent: false },
];

const MOCK_PARENTS = [
    { id: 'P001', name: 'Rudi Hartono', phone: '081234567890' },
    { id: 'P002', name: 'Maya Sari', phone: '081234567891' },
    { id: 'P003', name: 'Budi Prasetyo', phone: '081234567892' },
];

export default function LinkOrangTuaPage() {
    const [searchStudent, setSearchStudent] = useState('');
    const [searchParent, setSearchParent] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [selectedParent, setSelectedParent] = useState<string | null>(null);

    const filteredStudents = MOCK_STUDENTS.filter(s =>
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) && !s.hasParent
    );

    const filteredParents = MOCK_PARENTS.filter(p =>
        p.name.toLowerCase().includes(searchParent.toLowerCase())
    );

    const handleLink = () => {
        if (selectedStudent && selectedParent) {
            alert(`Siswa ${selectedStudent} berhasil dihubungkan dengan orang tua ${selectedParent}`);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/orangtua" className="p-2 hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
                    <ArrowLeft size={20} className="text-[var(--text-muted)]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Hubungkan Orang Tua & Siswa</h1>
                    <p className="text-[var(--text-muted)]">Link data orang tua dengan anak (siswa)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Students */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Pilih Siswa</h2>
                    <div className="relative mb-4">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Cari siswa..."
                            value={searchStudent}
                            onChange={(e) => setSearchStudent(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                        />
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {filteredStudents.map(student => (
                            <button
                                key={student.id}
                                onClick={() => setSelectedStudent(student.id)}
                                className={`w-full p-3 rounded-xl text-left transition-all ${selectedStudent === student.id
                                        ? 'bg-[var(--brand-primary)] text-white'
                                        : 'bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-primary)]'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className={`text-sm ${selectedStudent === student.id ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                                            {student.class} • NISN: {student.nisn}
                                        </p>
                                    </div>
                                    {selectedStudent === student.id && <Check size={20} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Parents */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Pilih Orang Tua</h2>
                    <div className="relative mb-4">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Cari orang tua..."
                            value={searchParent}
                            onChange={(e) => setSearchParent(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                        />
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {filteredParents.map(parent => (
                            <button
                                key={parent.id}
                                onClick={() => setSelectedParent(parent.id)}
                                className={`w-full p-3 rounded-xl text-left transition-all ${selectedParent === parent.id
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-primary)]'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{parent.name}</p>
                                        <p className={`text-sm ${selectedParent === parent.id ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                                            {parent.phone}
                                        </p>
                                    </div>
                                    {selectedParent === parent.id && <Check size={20} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action */}
            {selectedStudent && selectedParent && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Users size={24} className="text-[var(--brand-primary)]" />
                            <div>
                                <p className="text-[var(--text-primary)] font-medium">Siap untuk dihubungkan</p>
                                <p className="text-sm text-[var(--text-muted)]">
                                    {MOCK_STUDENTS.find(s => s.id === selectedStudent)?.name} ↔{' '}
                                    {MOCK_PARENTS.find(p => p.id === selectedParent)?.name}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLink}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium transition-colors"
                        >
                            <Link2 size={18} />
                            Hubungkan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
