/**
 * Admin Absensi Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk Admin Absensi dengan overview kehadiran dan session QR
 * Redesigned with comprehensive navigation menu
 */

'use client';

import React from 'react';
import {
    ClipboardCheck,
    Users,
    QrCode,
    AlertTriangle,
    ArrowRight,
    Plus,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    UserX,
    FileText,
    RefreshCw,
    History,
    FileCheck,
    CalendarDays,
    Settings,
    ChevronRight,
    UserCheck,
    ClipboardList,
} from 'lucide-react';
import Link from 'next/link';

// ============================================
// MENU DATA
// ============================================
const ABSENSI_MENUS = [
    {
        title: 'Kehadiran',
        description: 'Kelola absensi harian',
        items: [
            { label: 'Absensi Hari Ini', href: '/absensi/hari-ini', icon: CalendarDays, color: '#3B82F6', description: 'Input absensi manual' },
            { label: 'Session QR', href: '/absensi/session', icon: QrCode, color: '#8B5CF6', description: 'Kelola session QR Code' },
            { label: 'Riwayat Absensi', href: '/absensi/riwayat', icon: History, color: '#10B981', description: 'Lihat riwayat kehadiran' },
        ]
    },
    {
        title: 'Rekap & Laporan',
        description: 'Data dan laporan absensi',
        items: [
            { label: 'Rekap Per Kelas', href: '/absensi/rekap-kelas', icon: Users, color: '#F59E0B', description: 'Rekap kehadiran per kelas' },
            { label: 'Laporan', href: '/absensi/laporan', icon: FileText, color: '#EC4899', description: 'Generate laporan absensi' },
        ]
    },
    {
        title: 'Izin & Dispensasi',
        description: 'Kelola perizinan siswa',
        items: [
            { label: 'Dispensasi', href: '/absensi/dispensasi', icon: FileCheck, color: '#06B6D4', description: 'Kelola dispensasi siswa' },
            { label: 'Izin', href: '/absensi/izin', icon: ClipboardList, color: '#8B5CF6', description: 'Kelola surat izin siswa' },
        ]
    },
    {
        title: 'Pengaturan',
        description: 'Konfigurasi absensi',
        items: [
            { label: 'Pengaturan Absensi', href: '/absensi/settings', icon: Settings, color: '#64748B', description: 'Konfigurasi sistem absensi' },
        ]
    },
];

export default function AbsensiDashboard() {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <ClipboardCheck size={20} />
                        <span className="text-sm font-medium text-blue-200">Admin Absensi</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Dashboard Absensi
                    </h1>
                    <p className="text-blue-200 max-w-xl">
                        Kelola kehadiran siswa, buat session QR code, dan pantau
                        rekap absensi per kelas.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <ClipboardCheck className="absolute right-10 top-10 w-32 h-32" />
                    <QrCode className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Today's Attendance Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <AttendanceStatCard
                    label="Hadir"
                    value="1,156"
                    percentage={92.7}
                    icon={<CheckCircle size={20} />}
                    color="#10B981"
                />
                <AttendanceStatCard
                    label="Alpha"
                    value="23"
                    percentage={1.8}
                    icon={<XCircle size={20} />}
                    color="#EF4444"
                />
                <AttendanceStatCard
                    label="Izin"
                    value="34"
                    percentage={2.7}
                    icon={<FileText size={20} />}
                    color="#F59E0B"
                />
                <AttendanceStatCard
                    label="Sakit"
                    value="28"
                    percentage={2.2}
                    icon={<UserX size={20} />}
                    color="#8B5CF6"
                />
                <AttendanceStatCard
                    label="Belum Absen"
                    value="6"
                    percentage={0.5}
                    icon={<Clock size={20} />}
                    color="#6B7280"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <QuickAction
                        label="Buat Session QR"
                        icon={<QrCode size={20} />}
                        color="#3B82F6"
                        href="/absensi/session/create"
                    />
                    <QuickAction
                        label="Absensi Manual"
                        icon={<Plus size={20} />}
                        color="#10B981"
                        href="/absensi/hari-ini"
                    />
                    <QuickAction
                        label="Buat Dispensasi"
                        icon={<FileCheck size={20} />}
                        color="#06B6D4"
                        href="/absensi/dispensasi/create"
                    />
                    <QuickAction
                        label="Export Laporan"
                        icon={<FileText size={20} />}
                        color="#F59E0B"
                        href="/absensi/laporan"
                    />
                </div>
            </div>

            {/* Menu Navigation */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Menu Absensi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ABSENSI_MENUS.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm border border-[var(--border-light)]"
                        >
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-[var(--text-primary)]">{section.title}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{section.description}</p>
                            </div>
                            <div className="space-y-2">
                                {section.items.map((item, itemIdx) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors group"
                                        >
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                                                <p className="text-xs text-[var(--text-muted)] truncate">{item.description}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Sessions */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Session Aktif</h2>
                            <Link
                                href="/absensi/session"
                                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                            >
                                Semua Session <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SessionCard
                                title="Upacara Bendera"
                                date="02 Jan 2026"
                                time="07:00 - 08:00"
                                status="active"
                                scanned={1089}
                                total={1247}
                            />
                            <SessionCard
                                title="Pelajaran Reguler"
                                date="02 Jan 2026"
                                time="07:00 - 15:00"
                                status="active"
                                scanned={1156}
                                total={1247}
                            />
                        </div>
                    </div>

                    {/* Class Attendance Today */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Kehadiran Per Kelas Hari Ini</h2>
                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                <Calendar size={14} />
                                <span>02 Jan 2026</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ClassAttendanceRow classId="class-12-pplg-1" className="XII PPLG 1" hadir={32} alpha={0} izin={1} sakit={1} total={34} />
                            <ClassAttendanceRow classId="class-12-pplg-2" className="XII PPLG 2" hadir={30} alpha={2} izin={1} sakit={0} total={33} />
                            <ClassAttendanceRow classId="class-11-tms-1" className="XI TMS 1" hadir={28} alpha={3} izin={2} sakit={1} total={34} />
                            <ClassAttendanceRow classId="class-11-tms-2" className="XI TMS 2" hadir={31} alpha={1} izin={0} sakit={2} total={34} />
                            <ClassAttendanceRow classId="class-10-pplg-1" className="X PPLG 1" hadir={33} alpha={0} izin={1} sakit={1} total={35} />
                        </div>

                        <Link
                            href="/absensi/rekap-kelas"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                            Lihat Semua Kelas <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Pending Dispensasi */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Dispensasi Pending</h2>
                            <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full font-medium">
                                3 pending
                            </span>
                        </div>

                        <div className="space-y-3">
                            <DispensasiItem name="Ahmad Rizky" class="XII PPLG 1" reason="Lomba Debat" date="02 Jan" />
                            <DispensasiItem name="Siti Nurhaliza" class="XI TKJ 2" reason="Sakit" date="02 Jan" />
                            <DispensasiItem name="Budi Santoso" class="X PPLG 1" reason="Acara Keluarga" date="01 Jan" />
                        </div>

                        <Link
                            href="/absensi/dispensasi"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                            Kelola Dispensasi <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Frequent Absentees */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Sering Bolos</h2>
                            <AlertTriangle size={18} className="text-amber-500" />
                        </div>

                        <div className="space-y-3">
                            <AbsenteeItem name="Deni Pratama" class="XI TMS 1" absences={8} />
                            <AbsenteeItem name="Rina Safitri" class="XII PPLG 2" absences={6} />
                            <AbsenteeItem name="Agus Setiawan" class="X TKJ 1" absences={5} />
                            <AbsenteeItem name="Lisa Permata" class="XI PPLG 1" absences={4} />
                        </div>

                        <Link
                            href="/absensi/riwayat"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                            Lihat Riwayat <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Weekly Trend */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Tren Minggu Ini</h2>

                        <div className="flex items-end justify-between h-32 px-2">
                            {[94, 92, 95, 91, 93, 89, 93].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                    <div
                                        className={`w-6 rounded-t transition-all ${value >= 93 ? 'bg-green-500' : value >= 90 ? 'bg-amber-500' : 'bg-red-500'}`}
                                        style={{ height: `${value}px` }}
                                    />
                                    <span className="text-xs text-[var(--text-muted)]">
                                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--text-muted)]">Rata-rata minggu ini</span>
                                <span className="font-semibold text-green-500">92.4%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function AttendanceStatCard({
    label,
    value,
    percentage,
    icon,
    color
}: {
    label: string;
    value: string;
    percentage: number;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div className="bg-[var(--bg-card)] rounded-2xl p-4 shadow-sm border border-[var(--border-light)]">
            <div className="flex items-center gap-3 mb-2">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}20`, color }}
                >
                    {icon}
                </div>
                <span className="text-xs text-[var(--text-muted)]">{label}</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-xs text-[var(--text-muted)]">{percentage}% dari total</p>
        </div>
    );
}

function QuickAction({
    label,
    icon,
    color,
    href
}: {
    label: string;
    icon: React.ReactNode;
    color: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors group"
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)] text-center">{label}</span>
        </Link>
    );
}

function SessionCard({
    title,
    date,
    time,
    status,
    scanned,
    total
}: {
    title: string;
    date: string;
    time: string;
    status: 'active' | 'ended' | 'scheduled';
    scanned: number;
    total: number;
}) {
    const percentage = Math.round((scanned / total) * 100);

    return (
        <div className="p-4 rounded-xl border border-[var(--border-light)] hover:border-blue-500/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-medium text-[var(--text-primary)]">{title}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{date} • {time}</p>
                </div>
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-[var(--bg-hover)] text-[var(--text-muted)]'
                    }`}>
                    {status === 'active' && <RefreshCw size={10} className="animate-spin" />}
                    {status === 'active' ? 'Aktif' : status === 'ended' ? 'Selesai' : 'Terjadwal'}
                </span>
            </div>

            <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-muted)]">Progress</span>
                    <span className="font-medium text-[var(--text-primary)]">{scanned}/{total}</span>
                </div>
                <div className="h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <Link
                href="/absensi/session/1"
                className="flex items-center justify-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600"
            >
                <QrCode size={14} />
                Lihat QR Code
            </Link>
        </div>
    );
}

function ClassAttendanceRow({
    classId,
    className,
    hadir,
    alpha,
    izin,
    sakit,
    total
}: {
    classId: string;
    className: string;
    hadir: number;
    alpha: number;
    izin: number;
    sakit: number;
    total: number;
}) {
    const percentage = Math.round((hadir / total) * 100);

    return (
        <Link
            href={`/absensi/rekap-kelas/${classId}`}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-500/10 transition-colors cursor-pointer group"
        >
            <div className="w-24">
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">{className}</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-500 rounded">{hadir}H</span>
                <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-500 rounded">{alpha}A</span>
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-500 rounded">{izin}I</span>
                <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-500 rounded">{sakit}S</span>
            </div>
            <div className="text-right">
                <span className={`text-sm font-semibold ${percentage >= 95 ? 'text-green-500' : percentage >= 90 ? 'text-amber-500' : 'text-red-500'
                    }`}>
                    {percentage}%
                </span>
            </div>
        </Link>
    );
}

function DispensasiItem({
    name,
    class: className,
    reason,
    date
}: {
    name: string;
    class: string;
    reason: string;
    date: string;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
                <p className="text-xs text-[var(--text-muted)]">{className} • {reason}</p>
            </div>
            <span className="text-xs text-amber-500">{date}</span>
        </div>
    );
}

function AbsenteeItem({
    name,
    class: className,
    absences
}: {
    name: string;
    class: string;
    absences: number;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
                <p className="text-xs text-[var(--text-muted)]">{className}</p>
            </div>
            <span className="text-sm font-semibold text-red-500">{absences}x alpha</span>
        </div>
    );
}
