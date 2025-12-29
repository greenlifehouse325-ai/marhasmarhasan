/**
 * Data Guru Page
 * SMK Marhas Admin Dashboard
 * 
 * Halaman untuk melihat daftar guru
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    Search,
    Download,
    Eye,
    Mail,
    Phone,
    ChevronLeft,
    ChevronRight,
    BookOpen,
} from 'lucide-react';

// Mock teachers data
const MOCK_TEACHERS = [
    { id: '1', name: 'Budi Santoso, S.Pd', email: 'budi@marhas.sch.id', phone: '081234567890', subject: 'Matematika', status: 'active' },
    { id: '2', name: 'Siti Aminah, S.Kom', email: 'siti@marhas.sch.id', phone: '081234567891', subject: 'Pemrograman Web', status: 'active' },
    { id: '3', name: 'Ahmad Rizky, M.Pd', email: 'ahmad@marhas.sch.id', phone: '081234567892', subject: 'Bahasa Inggris', status: 'active' },
    { id: '4', name: 'Dewi Lestari, S.Pd', email: 'dewi@marhas.sch.id', phone: '081234567893', subject: 'Bahasa Indonesia', status: 'active' },
    { id: '5', name: 'Hendra Wijaya, S.T', email: 'hendra@marhas.sch.id', phone: '081234567894', subject: 'Produktif TKJ', status: 'active' },
    { id: '6', name: 'Ratna Sari, S.Pd', email: 'ratna@marhas.sch.id', phone: '081234567895', subject: 'PPKn', status: 'inactive' },
    { id: '7', name: 'Joko Prasetyo, S.E', email: 'joko@marhas.sch.id', phone: '081234567896', subject: 'Ekonomi', status: 'active' },
    { id: '8', name: 'Linda Kusuma, M.Si', email: 'linda@marhas.sch.id', phone: '081234567897', subject: 'Fisika', status: 'active' },
];

export default function DataGuruPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Filter teachers
    const filteredTeachers = MOCK_TEACHERS.filter(t => {
        const matchesSearch =
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredTeachers.length / pageSize);
    const paginatedTeachers = filteredTeachers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Data Guru</h1>
                    <p className="text-gray-500">{MOCK_TEACHERS.length} guru terdaftar</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download size={16} />
                    Export Data
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard
                    label="Total Guru"
                    value={MOCK_TEACHERS.length.toString()}
                    icon={<Users size={20} />}
                    color="#3B82F6"
                />
                <StatCard
                    label="Guru Aktif"
                    value={MOCK_TEACHERS.filter(t => t.status === 'active').length.toString()}
                    icon={<Users size={20} />}
                    color="#10B981"
                />
                <StatCard
                    label="Mata Pelajaran"
                    value={new Set(MOCK_TEACHERS.map(t => t.subject)).size.toString()}
                    icon={<BookOpen size={20} />}
                    color="#8B5CF6"
                />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari guru (nama atau mata pelajaran)..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    <div className="flex rounded-xl bg-gray-100 p-1">
                        <button
                            onClick={() => { setStatusFilter('all'); setCurrentPage(1); }}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-white shadow-sm' : 'text-gray-600'
                                }`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => { setStatusFilter('active'); setCurrentPage(1); }}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === 'active' ? 'bg-white shadow-sm' : 'text-gray-600'
                                }`}
                        >
                            Aktif
                        </button>
                        <button
                            onClick={() => { setStatusFilter('inactive'); setCurrentPage(1); }}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === 'inactive' ? 'bg-white shadow-sm' : 'text-gray-600'
                                }`}
                        >
                            Nonaktif
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm text-gray-500">
                                <th className="px-6 py-4 font-medium">Guru</th>
                                <th className="px-6 py-4 font-medium">Mata Pelajaran</th>
                                <th className="px-6 py-4 font-medium">Kontak</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedTeachers.map(teacher => (
                                <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                                <span className="text-sm font-bold text-pink-600">{teacher.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{teacher.name}</p>
                                                <p className="text-xs text-gray-500">{teacher.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{teacher.subject}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{teacher.phone}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {teacher.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link
                                                href={`/guru/${teacher.id}`}
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
                            Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredTeachers.length)} dari {filteredTeachers.length}
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
