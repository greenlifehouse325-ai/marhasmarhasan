/**
 * Student Profile Card Component
 * SMK Marhas Admin Dashboard
 * 
 * Card untuk menampilkan profil siswa
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Eye,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import type { Student } from '@/types/shared';

interface StudentProfileCardProps {
    student: Student;
    showActions?: boolean;
}

export function StudentProfileCard({ student, showActions = true }: StudentProfileCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="text-2xl font-bold">{student.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">{student.name}</h2>
                        <p className="text-blue-100">NIS: {student.nis}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${student.status === 'active'
                        ? 'bg-green-400/20 text-green-100'
                        : 'bg-red-400/20 text-red-100'
                        }`}>
                        {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-6 space-y-4">
                <InfoRow icon={<Mail size={16} />} label="Email" value={student.email || '-'} />
                <InfoRow icon={<Phone size={16} />} label="Telepon" value={student.phone || '-'} />
                <InfoRow icon={<MapPin size={16} />} label="Kampus" value={`Kampus ${student.campus}`} />
                <InfoRow icon={<User size={16} />} label="Kelas" value={(student as any).class || (student as any).classId || '-'} />
                <InfoRow
                    icon={<Calendar size={16} />}
                    label="Terdaftar"
                    value={student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString('id-ID') : '-'}
                />
            </div>

            {/* Actions */}
            {showActions && (
                <div className="px-6 pb-6">
                    <Link
                        href={`/siswa/${student.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                        <Eye size={16} />
                        Lihat Detail
                    </Link>
                </div>
            )}
        </div>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-gray-400">{icon}</span>
            <div className="flex-1">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );
}

export default StudentProfileCard;
