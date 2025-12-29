/**
 * Halaman Data Siswa
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk melihat daftar semua siswa
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    Search,
    Filter,
    Download,
    Eye,
    Mail,
    Phone,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_CLASSES } from '@/data/mock-students';

export default function DataSiswaPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCampus, setSelectedCampus] = useState<1 | 2 | 'all'>('all');
    const [selectedClass, setSelectedClass] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Filter students
    const filteredStudents = MOCK_STUDENTS.filter(s => {
        const matchesSearch =
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.nis.includes(searchQuery);
        const matchesCampus = selectedCampus === 'all' || s.campus === selectedCampus;
        const matchesClass = selectedClass === 'all' || s.class === MOCK_CLASSES.find(c => c.id === selectedClass)?.name;
        return matchesSearch && matchesCampus && matchesClass;
    });

    // Pagination
    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Classes for filter
    const filteredClasses = MOCK_CLASSES.filter(c =>
        selectedCampus === 'all' || c.campus === selectedCampus
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Data Siswa</h1>
                    <p className="text-gray-500">{MOCK_STUDENTS.length} siswa terdaftar</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download size={16} />
                    Export Data
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Siswa" value={MOCK_STUDENTS.length.toString()} color="#3B82F6" />
                <StatCard label="Kampus 1" value={MOCK_STUDENTS.filter(s => s.campus === 1).length.toString()} color="#10B981" />
                <StatCard label="Kampus 2" value={MOCK_STUDENTS.filter(s => s.campus === 2).length.toString()} color="#8B5CF6" />
                <StatCard label="Aktif" value={MOCK_STUDENTS.filter(s => s.status === 'active').length.toString()} color="#F59E0B" />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari siswa (nama atau NIS)..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex rounded-xl bg-gray-100 p-1">
                            <button
                                onClick={() => { setSelectedCampus('all'); setSelectedClass('all'); setCurrentPage(1); }}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 'all' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => { setSelectedCampus(1); setCurrentPage(1); }}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 1 ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Kampus 1
                            </button>
                            <button
                                onClick={() => { setSelectedCampus(2); setCurrentPage(1); }}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCampus === 2 ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                Kampus 2
                            </button>
                        </div>

                        <select
                            value={selectedClass}
                            onChange={e => { setSelectedClass(e.target.value); setCurrentPage(1); }}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        >
                            <option value="all">Semua Kelas</option>
                            {filteredClasses.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
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
                                <th className="px-6 py-4 font-medium">Siswa</th>
                                <th className="px-6 py-4 font-medium">NIS</th>
                                <th className="px-6 py-4 font-medium">Kelas</th>
                                <th className="px-6 py-4 font-medium">Kampus</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedStudents.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                                <span className="text-sm font-bold text-blue-600">{student.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{student.name}</p>
                                                <p className="text-xs text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{student.nis}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{student.class || '-'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${student.campus === 1 ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            Kampus {student.campus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link
                                                href={`/siswa/${student.id}`}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Eye size={14} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredStudents.length)} dari {filteredStudents.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <span className="text-sm text-gray-600">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                    <Users size={20} />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </div>
        </div>
    );
}
