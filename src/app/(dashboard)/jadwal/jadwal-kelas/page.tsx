/**
 * Halaman Jadwal Kelas
 * SMK Marhas Admin Dashboard - Jadwal
 * 
 * Halaman untuk melihat dan mengelola jadwal per kelas
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Clock,
    MapPin,
    User,
    ChevronDown,
    Edit,
    Plus,
    AlertTriangle,
    BookOpen,
} from 'lucide-react';
import { MOCK_SCHEDULE_SLOTS, getScheduleByClass } from '@/data/mock-schedule';
import { MOCK_CLASSES } from '@/data/mock-students';
import type { ScheduleSlot, DayOfWeek } from '@/types/jadwal';

const DAYS: { key: DayOfWeek; label: string }[] = [
    { key: 'senin', label: 'Senin' },
    { key: 'selasa', label: 'Selasa' },
    { key: 'rabu', label: 'Rabu' },
    { key: 'kamis', label: 'Kamis' },
    { key: 'jumat', label: 'Jumat' },
    { key: 'sabtu', label: 'Sabtu' },
];

const TIME_SLOTS = ['07:00', '08:30', '10:15', '12:30', '14:00'];

export default function JadwalKelasPage() {
    const [selectedClass, setSelectedClass] = useState('cls-010');
    const [selectedCampus, setSelectedCampus] = useState<1 | 2 | 'all'>('all');

    const classSchedule = getScheduleByClass(selectedClass);
    const selectedClassInfo = MOCK_CLASSES.find(c => c.id === selectedClass);

    const filteredClasses = MOCK_CLASSES.filter(c =>
        selectedCampus === 'all' || c.campus === selectedCampus
    );

    const getSlotForDayTime = (day: DayOfWeek, time: string): ScheduleSlot | undefined => {
        return classSchedule.find(s => s.day === day && s.startTime === time);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/jadwal" className="hover:text-pink-600">Dashboard</Link>
                        <span>/</span>
                        <span>Jadwal Kelas</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Jadwal Kelas</h1>
                </div>

                <Link
                    href="/jadwal/jadwal-kelas/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-xl hover:bg-pink-700 transition-colors"
                >
                    <Plus size={16} />
                    Tambah Jadwal
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Campus Filter */}
                    <div className="flex rounded-xl bg-gray-100 p-1">
                        <button
                            onClick={() => setSelectedCampus('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 'all'
                                    ? 'bg-white text-pink-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Semua Kampus
                        </button>
                        <button
                            onClick={() => setSelectedCampus(1)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 1
                                    ? 'bg-white text-pink-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Kampus 1
                        </button>
                        <button
                            onClick={() => setSelectedCampus(2)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 2
                                    ? 'bg-white text-pink-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Kampus 2
                        </button>
                    </div>

                    {/* Class Selector */}
                    <div className="flex-1 relative">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                        >
                            {filteredClasses.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name} - Kampus {c.campus}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Class Info */}
            {selectedClassInfo && (
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{selectedClassInfo.name}</h2>
                            <p className="text-white/80 text-sm mt-1">
                                Kampus {selectedClassInfo.campus} • {selectedClassInfo.studentCount} Siswa • {selectedClassInfo.major}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                                <Edit size={16} />
                                Edit Jadwal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Schedule Grid */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 w-24">Waktu</th>
                                {DAYS.map(day => (
                                    <th key={day.key} className="px-4 py-3 text-center text-sm font-medium text-gray-500 min-w-[140px]">
                                        {day.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {TIME_SLOTS.map((time, idx) => (
                                <tr key={time} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {time}
                                        </div>
                                    </td>
                                    {DAYS.map(day => {
                                        const slot = getSlotForDayTime(day.key, time);
                                        return (
                                            <td key={day.key} className="px-2 py-2">
                                                {slot ? (
                                                    <ScheduleSlotCard slot={slot} />
                                                ) : (
                                                    <div className="h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                                                        <button className="text-gray-400 hover:text-pink-500 transition-colors">
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Keterangan</h3>
                <div className="flex flex-wrap gap-4">
                    <LegendItem color="#3B82F6" label="Mapel Produktif" />
                    <LegendItem color="#10B981" label="Mapel Normatif" />
                    <LegendItem color="#F59E0B" label="Mapel Adaptif" />
                    <LegendItem color="#8B5CF6" label="Keagamaan" />
                    <LegendItem color="#EC4899" label="Olahraga" />
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function ScheduleSlotCard({ slot }: { slot: ScheduleSlot }) {
    // Determine color based on subject type
    const getSubjectColor = (subject: string): string => {
        if (['Pemrograman Web', 'Basis Data', 'Pemrograman Mobile', 'Jaringan Komputer', 'Desain Grafis'].includes(subject)) {
            return '#3B82F6'; // Blue - Produktif
        }
        if (['Matematika', 'Fisika', 'Bahasa Indonesia', 'Bahasa Inggris'].includes(subject)) {
            return '#10B981'; // Green - Normatif
        }
        if (['PKn', 'Kewirausahaan'].includes(subject)) {
            return '#F59E0B'; // Amber - Adaptif
        }
        if (['PAI', 'Shalat Jumat'].includes(subject)) {
            return '#8B5CF6'; // Purple - Keagamaan
        }
        if (['Olahraga'].includes(subject)) {
            return '#EC4899'; // Pink - Olahraga
        }
        return '#6B7280'; // Gray - Default
    };

    const color = getSubjectColor(slot.subject);

    return (
        <div
            className="h-20 rounded-xl p-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: `${color}15`, borderLeft: `3px solid ${color}` }}
        >
            <p className="text-xs font-semibold text-gray-800 line-clamp-1">{slot.subject}</p>
            <div className="mt-1 space-y-0.5">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User size={10} />
                    <span className="truncate">{slot.teacher}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={10} />
                    <span>{slot.room}</span>
                </div>
            </div>
        </div>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
            <span className="text-sm text-gray-600">{label}</span>
        </div>
    );
}
