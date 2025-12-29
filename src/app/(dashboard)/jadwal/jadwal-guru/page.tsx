/**
 * Halaman Jadwal Guru
 * SMK Marhas Admin Dashboard - Jadwal
 * 
 * Halaman untuk melihat dan mengatur jadwal mengajar guru
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    Search,
    Filter,
    Calendar,
    Clock,
    MapPin,
    BookOpen,
    ChevronDown,
} from 'lucide-react';
import { MOCK_SCHEDULE_SLOTS } from '@/data/mock-schedule';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const MOCK_CLASSES = [
    { id: 'cls-001', name: 'X PPLG 1' },
    { id: 'cls-002', name: 'X PPLG 2' },
    { id: 'cls-003', name: 'XI PPLG 1' },
    { id: 'cls-004', name: 'XI PPLG 2' },
    { id: 'cls-005', name: 'XII PPLG 1' },
    { id: 'cls-006', name: 'XII PPLG 2' },
];

// Mock teachers data
const MOCK_TEACHERS = [
    { id: '1', name: 'Budi Santoso, S.Pd', subject: 'Matematika', photo: '', classes: 12 },
    { id: '2', name: 'Siti Aminah, S.Kom', subject: 'Pemrograman', photo: '', classes: 16 },
    { id: '3', name: 'Ahmad Rizky, M.Pd', subject: 'Bahasa Inggris', photo: '', classes: 14 },
    { id: '4', name: 'Dewi Lestari, S.Pd', subject: 'Bahasa Indonesia', photo: '', classes: 15 },
    { id: '5', name: 'Hendra Wijaya, S.T', subject: 'Produktif TKJ', photo: '', classes: 18 },
];

export default function JadwalGuruPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

    const filteredTeachers = MOCK_TEACHERS.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedTeacherData = MOCK_TEACHERS.find(t => t.id === selectedTeacher);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/jadwal" className="hover:text-pink-600">Dashboard</Link>
                        <span>/</span>
                        <span>Jadwal Guru</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Jadwal Mengajar Guru</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Teacher List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <div className="relative mb-4">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari guru..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                            />
                        </div>

                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {filteredTeachers.map(teacher => (
                                <button
                                    key={teacher.id}
                                    onClick={() => setSelectedTeacher(teacher.id)}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${selectedTeacher === teacher.id
                                        ? 'bg-pink-50 border-2 border-pink-500'
                                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                            <span className="text-sm font-bold text-pink-600">
                                                {teacher.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{teacher.name}</p>
                                            <p className="text-xs text-gray-500">{teacher.subject}</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium text-pink-600 bg-pink-100 rounded-full">
                                            {teacher.classes}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Schedule View */}
                <div className="lg:col-span-3">
                    {selectedTeacherData ? (
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            {/* Teacher Info */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-pink-600">
                                        {selectedTeacherData.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{selectedTeacherData.name}</h2>
                                    <p className="text-gray-500">{selectedTeacherData.subject}</p>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={14} />
                                            {selectedTeacherData.classes} kelas/minggu
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Schedule Grid */}
                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-6 gap-2 min-w-[600px]">
                                    {/* Day Headers */}
                                    {DAYS.map(day => (
                                        <div key={day} className="text-center py-2 font-medium text-gray-600 text-sm">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Schedule Slots */}
                                    {DAYS.map(day => (
                                        <div key={day} className="space-y-2">
                                            {[1, 2, 3].map(slot => (
                                                <div
                                                    key={slot}
                                                    className="p-3 bg-gray-50 rounded-xl text-center"
                                                >
                                                    <p className="text-xs text-gray-400 mb-1">
                                                        {slot === 1 ? '07:00 - 09:00' : slot === 2 ? '09:00 - 11:00' : '12:00 - 14:00'}
                                                    </p>
                                                    {Math.random() > 0.4 ? (
                                                        <div className="p-2 bg-white rounded-lg border-l-2 border-pink-500">
                                                            <p className="text-xs font-medium text-gray-800">
                                                                {selectedTeacherData.subject}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {MOCK_CLASSES[Math.floor(Math.random() * MOCK_CLASSES.length)]?.name || 'XII PPLG 1'}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-gray-400 py-2">-</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
                            <Users size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">Pilih Guru</h3>
                            <p className="text-gray-500">Pilih guru dari daftar untuk melihat jadwal mengajar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
