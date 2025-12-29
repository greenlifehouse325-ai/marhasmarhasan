/**
 * Halaman Rekap Kelas (Absensi)
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Halaman untuk melihat rekap absensi per kelas
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    Download,
    Search,
    Filter,
    ChevronDown,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
} from 'lucide-react';
import { MOCK_CLASSES } from '@/data/mock-students';

// Mock rekap data
const MOCK_CLASS_RECAP = MOCK_CLASSES.map(cls => ({
    ...cls,
    hadir: Math.floor(cls.studentCount * 0.85),
    alpha: Math.floor(cls.studentCount * 0.05),
    izin: Math.floor(cls.studentCount * 0.05),
    sakit: Math.floor(cls.studentCount * 0.03),
    terlambat: Math.floor(cls.studentCount * 0.02),
    percentage: Math.round(85 + Math.random() * 10),
}));

export default function RekapKelasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCampus, setSelectedCampus] = useState<1 | 2 | 'all'>('all');
    const [selectedMonth, setSelectedMonth] = useState('12');

    const filteredClasses = MOCK_CLASS_RECAP.filter(cls => {
        const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCampus = selectedCampus === 'all' || cls.campus === selectedCampus;
        return matchesSearch && matchesCampus;
    });

    // Overall stats
    const totalStudents = filteredClasses.reduce((sum, c) => sum + c.studentCount, 0);
    const totalHadir = filteredClasses.reduce((sum, c) => sum + c.hadir, 0);
    const totalAlpha = filteredClasses.reduce((sum, c) => sum + c.alpha, 0);
    const overallPercentage = Math.round((totalHadir / totalStudents) * 100);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/absensi" className="hover:text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span>Rekap Kelas</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Rekap Absensi per Kelas</h1>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download size={16} />
                    Export Rekap
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Siswa" value={totalStudents.toString()} icon={<Users size={20} />} color="#3B82F6" />
                <StatCard label="Hadir Hari Ini" value={totalHadir.toString()} icon={<CheckCircle size={20} />} color="#10B981" />
                <StatCard label="Alpha" value={totalAlpha.toString()} icon={<XCircle size={20} />} color="#EF4444" />
                <StatCard label="Kehadiran" value={`${overallPercentage}%`} icon={<BarChart3 size={20} />} color="#8B5CF6" />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari kelas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex rounded-xl bg-gray-100 p-1">
                            <button
                                onClick={() => setSelectedCampus('all')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setSelectedCampus(1)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 1 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Kampus 1
                            </button>
                            <button
                                onClick={() => setSelectedCampus(2)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 2 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Kampus 2
                            </button>
                        </div>

                        <select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        >
                            <option value="12">Desember 2024</option>
                            <option value="11">November 2024</option>
                            <option value="10">Oktober 2024</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm text-gray-500">
                                <th className="px-6 py-4 font-medium">Kelas</th>
                                <th className="px-6 py-4 font-medium text-center">Siswa</th>
                                <th className="px-6 py-4 font-medium text-center">Hadir</th>
                                <th className="px-6 py-4 font-medium text-center">Alpha</th>
                                <th className="px-6 py-4 font-medium text-center">Izin</th>
                                <th className="px-6 py-4 font-medium text-center">Sakit</th>
                                <th className="px-6 py-4 font-medium text-center">Terlambat</th>
                                <th className="px-6 py-4 font-medium">Persentase</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredClasses.map(cls => (
                                <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{cls.name}</p>
                                            <p className="text-xs text-gray-500">Kampus {cls.campus} • {cls.major}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm text-gray-600">{cls.studentCount}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium text-green-600">{cls.hadir}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-sm font-medium ${cls.alpha > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                            {cls.alpha}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm text-blue-600">{cls.izin}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm text-purple-600">{cls.sakit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm text-amber-600">{cls.terlambat}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${cls.percentage >= 90 ? 'bg-green-500' :
                                                            cls.percentage >= 80 ? 'bg-amber-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${cls.percentage}%` }}
                                                />
                                            </div>
                                            <span className={`text-sm font-medium ${cls.percentage >= 90 ? 'text-green-600' :
                                                    cls.percentage >= 80 ? 'text-amber-600' : 'text-red-600'
                                                }`}>
                                                {cls.percentage}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </div>
        </div>
    );
}
