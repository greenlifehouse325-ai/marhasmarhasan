/**
 * Detail Session QR Page
 * SMK Marhas Admin Dashboard - Absensi
 * 
 * Halaman detail session dengan QR code display
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    RefreshCw,
    Clock,
    Users,
    Calendar,
    MapPin,
    Pause,
    User,
} from 'lucide-react';
import { getSessionById, getAttendanceBySession } from '@/data/mock-attendance';
import { DynamicQRCode, AttendanceStats } from '@/components/absensi';

export default function SessionDetailPage() {
    const params = useParams();
    const sessionId = params.id as string;
    const session = getSessionById(sessionId);
    const attendance = getAttendanceBySession(sessionId);

    // Local state for live updates
    const [scannedCount, setScannedCount] = useState(session ? session.scannedCount : 0);

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Clock size={48} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Session Tidak Ditemukan</h2>
                <p className="text-gray-500 mb-4">Session dengan ID tersebut tidak ada.</p>
                <Link
                    href="/absensi/session"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Session
                </Link>
            </div>
        );
    }

    const percentage = Math.round((scannedCount / session.targetCount) * 100);

    const stats = {
        hadir: attendance.filter(a => a.status === 'hadir').length,
        terlambat: attendance.filter(a => a.status === 'terlambat').length,
        izin: attendance.filter(a => a.status === 'izin').length,
        sakit: attendance.filter(a => a.status === 'sakit').length,
        alpha: attendance.filter(a => a.status === 'alpha').length,
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/absensi" className="hover:text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <Link href="/absensi/session" className="hover:text-blue-600">Session</Link>
                        <span>/</span>
                        <span>Detail</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/absensi/session"
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{session.title}</h1>
                            {session.status === 'active' && (
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                        <RefreshCw size={10} className="animate-spin" />
                                        Aktif
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {session.status === 'active' && (
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                        <Pause size={16} />
                        Akhiri Session
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* QR Code Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">QR Code Scanner</h2>
                        <span className="text-sm text-gray-500">Auto-refresh setiap 30 detik</span>
                    </div>

                    <div className="flex justify-center py-6">
                        <DynamicQRCode
                            sessionId={sessionId}
                            onScan={(count) => setScannedCount(prev => prev + 1)}
                        />
                    </div>

                    {/* Session Info Details */}
                    <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                        <InfoItem icon={<Calendar size={16} />} label="Tanggal" value={session.date.toLocaleDateString('id-ID')} />
                        <InfoItem icon={<Clock size={16} />} label="Waktu" value={`${session.startTime} - ${session.endTime}`} />
                        <InfoItem icon={<MapPin size={16} />} label="Kampus" value={`Kampus ${session.campus}`} />
                        <InfoItem icon={<Users size={16} />} label="Target" value={`${session.targetCount} siswa`} />
                    </div>
                </div>

                {/* Stats & Attendance */}
                <div className="space-y-6">
                    {/* Progress & Stats */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress Absensi</h2>
                        {/* AttendanceStats handles the donut chart + breakdown grid */}
                        <AttendanceStats
                            present={stats.hadir}
                            late={stats.terlambat}
                            absent={stats.alpha}
                            sick={stats.sakit}
                            permission={stats.izin}
                            total={session.targetCount}
                        />
                    </div>

                    {/* Recent Scans */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Scan Terakhir</h2>
                            <Link href={`/absensi/session/${sessionId}/attendance`} className="text-sm text-blue-600 hover:text-blue-700">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {attendance.slice(0, 5).map((record) => (
                                <div key={record.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${record.status === 'hadir' ? 'bg-green-100' :
                                        record.status === 'terlambat' ? 'bg-amber-100' :
                                            record.status === 'alpha' ? 'bg-red-100' :
                                                'bg-blue-100'
                                        }`}>
                                        <User size={18} className={
                                            record.status === 'hadir' ? 'text-green-600' :
                                                record.status === 'terlambat' ? 'text-amber-600' :
                                                    record.status === 'alpha' ? 'text-red-600' :
                                                        'text-blue-600'
                                        } />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{record.studentName}</p>
                                        <p className="text-xs text-gray-500">{record.studentClass}</p>
                                    </div>
                                    <div className="text-right">
                                        <StatusBadge status={record.status} />
                                        {record.scanTime && (
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {record.scanTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
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

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-400">{icon}</span>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
        hadir: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hadir' },
        terlambat: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Terlambat' },
        izin: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Izin' },
        sakit: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Sakit' },
        alpha: { bg: 'bg-red-100', text: 'text-red-700', label: 'Alpha' },
    };

    const style = styles[status] || styles.hadir;

    return (
        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${style.bg} ${style.text}`}>
            {style.label}
        </span>
    );
}
