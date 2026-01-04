/**
 * Halaman Detail Kehadiran Kelas
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Menampilkan daftar siswa dalam kelas dengan status kehadiran
 * Urutan berdasarkan alfabet nama depan
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    Search,
    Download,
    Calendar,
    Filter,
    UserCheck,
    FileText,
    Thermometer,
    ChevronDown,
    MoreVertical,
    Edit,
} from 'lucide-react';
import { MOCK_CLASSES } from '@/data/mock-students';

// Status kehadiran
type AttendanceStatus = 'hadir' | 'alpha' | 'izin' | 'sakit' | 'terlambat' | 'belum';

interface StudentAttendance {
    id: string;
    nis: string;
    name: string;
    status: AttendanceStatus;
    checkInTime?: string;
    note?: string;
}

// Generate mock students for class
const generateMockStudents = (classId: string, studentCount: number): StudentAttendance[] => {
    const firstNames = [
        'Ahmad', 'Aisyah', 'Budi', 'Cahya', 'Deni', 'Dewi', 'Eka', 'Fajar',
        'Gita', 'Hadi', 'Indah', 'Joko', 'Kartika', 'Lina', 'Made', 'Nadia',
        'Oscar', 'Putri', 'Qori', 'Rina', 'Siti', 'Taufik', 'Udin', 'Vina',
        'Wahyu', 'Xena', 'Yudi', 'Zahra', 'Akbar', 'Bella', 'Citra', 'Dimas',
        'Endang', 'Fitra', 'Galang', 'Hana'
    ];

    const lastNames = [
        'Pratama', 'Sari', 'Wijaya', 'Putri', 'Saputra', 'Rahayu', 'Kusuma',
        'Hidayat', 'Permana', 'Wati', 'Santoso', 'Lestari', 'Nugroho', 'Utami',
        'Setiawan', 'Handayani', 'Susanto', 'Fitriani', 'Purnama', 'Dewanto'
    ];

    const statuses: AttendanceStatus[] = ['hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'alpha', 'izin', 'sakit', 'terlambat', 'hadir'];
    const times = ['07:15', '07:22', '07:28', '07:35', '07:40', '07:45', '07:50', '07:55', '08:10', '08:25'];

    const students: StudentAttendance[] = [];
    const usedCombinations = new Set<string>();

    for (let i = 0; i < studentCount; i++) {
        let name = '';
        let attempts = 0;

        // Ensure unique names
        do {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            name = `${firstName} ${lastName}`;
            attempts++;
        } while (usedCombinations.has(name) && attempts < 100);

        usedCombinations.add(name);

        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const checkInTime = status === 'hadir' ? times[Math.floor(Math.random() * 8)] :
            status === 'terlambat' ? times[Math.floor(Math.random() * 2) + 8] : undefined;

        students.push({
            id: `${classId}-${i + 1}`,
            nis: `${2024}${String(Math.floor(Math.random() * 9999) + 1000).padStart(4, '0')}`,
            name,
            status,
            checkInTime,
            note: status === 'izin' ? 'Izin keluarga' : status === 'sakit' ? 'Demam' : undefined,
        });
    }

    // Sort by first name alphabetically
    return students.sort((a, b) => a.name.localeCompare(b.name, 'id'));
};

const STATUS_CONFIG: Record<AttendanceStatus, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
    hadir: { label: 'Hadir', color: '#10B981', bgColor: 'bg-green-500/15', icon: CheckCircle },
    alpha: { label: 'Alpha', color: '#EF4444', bgColor: 'bg-red-500/15', icon: XCircle },
    izin: { label: 'Izin', color: '#3B82F6', bgColor: 'bg-blue-500/15', icon: FileText },
    sakit: { label: 'Sakit', color: '#8B5CF6', bgColor: 'bg-purple-500/15', icon: Thermometer },
    terlambat: { label: 'Terlambat', color: '#F59E0B', bgColor: 'bg-amber-500/15', icon: Clock },
    belum: { label: 'Belum Absen', color: '#6B7280', bgColor: 'bg-gray-500/15', icon: AlertTriangle },
};

export default function ClassDetailPage() {
    const params = useParams();
    const classId = params.id as string;

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<AttendanceStatus | 'all'>('all');
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Find class info
    const classInfo = MOCK_CLASSES.find(c => c.id === classId) || {
        id: classId,
        name: 'XII PPLG 1',
        major: 'Pengembangan Perangkat Lunak dan Gim',
        studentCount: 34,
        campus: 1,
        waliKelas: 'Pak Budi Santoso',
    };

    // Generate mock students
    const allStudents = useMemo(() => generateMockStudents(classId, classInfo.studentCount), [classId, classInfo.studentCount]);

    // Filter students
    const filteredStudents = useMemo(() => {
        return allStudents.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.nis.includes(searchQuery);
            const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [allStudents, searchQuery, filterStatus]);

    // Calculate stats
    const stats = useMemo(() => {
        const result = {
            total: allStudents.length,
            hadir: 0,
            alpha: 0,
            izin: 0,
            sakit: 0,
            terlambat: 0,
            belum: 0,
        };

        allStudents.forEach(s => {
            result[s.status]++;
        });

        return result;
    }, [allStudents]);

    const attendancePercentage = Math.round(((stats.hadir + stats.terlambat) / stats.total) * 100);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-start gap-4">
                <Link
                    href="/absensi/rekap-kelas"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors mt-1"
                >
                    <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                        <Link href="/absensi" className="hover:text-blue-500">Dashboard</Link>
                        <span>/</span>
                        <Link href="/absensi/rekap-kelas" className="hover:text-blue-500">Rekap Kelas</Link>
                        <span>/</span>
                        <span>{classInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
                            <Users size={24} className="text-blue-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">{classInfo.name}</h1>
                            <p className="text-sm text-[var(--text-muted)]">{classInfo.major} • Kampus {classInfo.campus}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors">
                        <Download size={16} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors">
                        <Edit size={16} />
                        Edit Absensi
                    </button>
                </div>
            </div>

            {/* Date Selector */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-4 shadow-sm border border-[var(--border-light)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                            <Calendar size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">Kehadiran Hari Ini</p>
                            <p className="text-xs text-[var(--text-muted)]">
                                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{attendancePercentage}%</p>
                            <p className="text-xs text-[var(--text-muted)]">Kehadiran</p>
                        </div>
                        <div className="w-16 h-16 relative">
                            <svg className="w-16 h-16 -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border-light)" strokeWidth="6" />
                                <circle
                                    cx="32" cy="32" r="28" fill="none"
                                    stroke={attendancePercentage >= 90 ? '#10B981' : attendancePercentage >= 80 ? '#F59E0B' : '#EF4444'}
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${attendancePercentage * 1.76} 176`}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <StatCard
                    label="Total Siswa"
                    value={stats.total}
                    icon={<Users size={18} />}
                    color="#3B82F6"
                    active={filterStatus === 'all'}
                    onClick={() => setFilterStatus('all')}
                />
                <StatCard
                    label="Hadir"
                    value={stats.hadir}
                    icon={<CheckCircle size={18} />}
                    color="#10B981"
                    active={filterStatus === 'hadir'}
                    onClick={() => setFilterStatus('hadir')}
                />
                <StatCard
                    label="Alpha"
                    value={stats.alpha}
                    icon={<XCircle size={18} />}
                    color="#EF4444"
                    active={filterStatus === 'alpha'}
                    onClick={() => setFilterStatus('alpha')}
                />
                <StatCard
                    label="Izin"
                    value={stats.izin}
                    icon={<FileText size={18} />}
                    color="#3B82F6"
                    active={filterStatus === 'izin'}
                    onClick={() => setFilterStatus('izin')}
                />
                <StatCard
                    label="Sakit"
                    value={stats.sakit}
                    icon={<Thermometer size={18} />}
                    color="#8B5CF6"
                    active={filterStatus === 'sakit'}
                    onClick={() => setFilterStatus('sakit')}
                />
                <StatCard
                    label="Terlambat"
                    value={stats.terlambat}
                    icon={<Clock size={18} />}
                    color="#F59E0B"
                    active={filterStatus === 'terlambat'}
                    onClick={() => setFilterStatus('terlambat')}
                />
            </div>

            {/* Search & Filter */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-4 shadow-sm border border-[var(--border-light)]">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Cari nama siswa atau NIS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)]"
                        >
                            <Filter size={16} />
                            {filterStatus === 'all' ? 'Semua Status' : STATUS_CONFIG[filterStatus].label}
                            <ChevronDown size={14} />
                        </button>

                        {showFilterMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl shadow-lg z-10 overflow-hidden">
                                <button
                                    onClick={() => { setFilterStatus('all'); setShowFilterMenu(false); }}
                                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-hover)] ${filterStatus === 'all' ? 'bg-blue-500/10 text-blue-500' : 'text-[var(--text-primary)]'}`}
                                >
                                    Semua Status
                                </button>
                                {(Object.keys(STATUS_CONFIG) as AttendanceStatus[]).map(status => {
                                    const config = STATUS_CONFIG[status];
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => { setFilterStatus(status); setShowFilterMenu(false); }}
                                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--bg-hover)] flex items-center gap-2 ${filterStatus === status ? 'bg-blue-500/10 text-blue-500' : 'text-[var(--text-primary)]'}`}
                                        >
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                                            {config.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Students List */}
            <div className="bg-[var(--bg-card)] rounded-2xl shadow-sm border border-[var(--border-light)] overflow-hidden">
                <div className="p-4 border-b border-[var(--border-light)]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-[var(--text-primary)]">
                            Daftar Siswa
                            <span className="text-[var(--text-muted)] font-normal ml-2">
                                ({filteredStudents.length} dari {allStudents.length} siswa)
                            </span>
                        </h2>
                        <p className="text-xs text-[var(--text-muted)]">Urutan: A-Z berdasarkan nama</p>
                    </div>
                </div>

                <div className="divide-y divide-[var(--border-light)]">
                    {filteredStudents.length === 0 ? (
                        <div className="p-12 text-center">
                            <Users size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-[var(--text-secondary)] mb-2">Tidak ada data</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                {searchQuery ? 'Tidak ditemukan siswa dengan kriteria pencarian' : 'Tidak ada siswa dengan status ini'}
                            </p>
                        </div>
                    ) : (
                        filteredStudents.map((student, index) => {
                            const statusConfig = STATUS_CONFIG[student.status];
                            const StatusIcon = statusConfig.icon;

                            return (
                                <div
                                    key={student.id}
                                    className="flex items-center gap-4 p-4 hover:bg-[var(--bg-hover)] transition-colors"
                                >
                                    {/* Number */}
                                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center text-sm font-medium text-[var(--text-muted)]">
                                        {index + 1}
                                    </div>

                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{student.name}</p>
                                        <p className="text-xs text-[var(--text-muted)]">NIS: {student.nis}</p>
                                    </div>

                                    {/* Check-in Time */}
                                    {student.checkInTime && (
                                        <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                            <Clock size={12} />
                                            <span>{student.checkInTime}</span>
                                        </div>
                                    )}

                                    {/* Note */}
                                    {student.note && (
                                        <div className="hidden md:block text-xs text-[var(--text-muted)] max-w-[120px] truncate">
                                            {student.note}
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.bgColor}`}
                                        style={{ color: statusConfig.color }}
                                    >
                                        <StatusIcon size={14} />
                                        <span>{statusConfig.label}</span>
                                    </div>

                                    {/* Action */}
                                    <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({
    label,
    value,
    icon,
    color,
    active,
    onClick
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`bg-[var(--bg-card)] rounded-xl p-4 shadow-sm border transition-all text-left ${active
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-[var(--border-light)] hover:border-[var(--border-medium)]'
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{label}</p>
                </div>
            </div>
        </button>
    );
}
