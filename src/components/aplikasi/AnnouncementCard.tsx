/**
 * Announcement Card Component
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Card untuk menampilkan pengumuman
 */

'use client';

import React from 'react';
import {
    Megaphone,
    Calendar,
    Users,
    Eye,
    Edit,
    Trash2,
    Pin,
} from 'lucide-react';
import type { Announcement } from '@/types/aplikasi';

interface AnnouncementCardProps {
    announcement: Announcement;
    onView?: (a: Announcement) => void;
    onEdit?: (a: Announcement) => void;
    onDelete?: (a: Announcement) => void;
}

const CATEGORY_STYLES = {
    academic: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Akademik' },
    event: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Kegiatan' },
    administrative: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Administrasi' },
    holiday: { bg: 'bg-green-100', text: 'text-green-700', label: 'Libur' },
    general: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Umum' },
};

const PRIORITY_STYLES = {
    low: 'border-l-gray-300',
    normal: 'border-l-blue-400',
    high: 'border-l-amber-500',
    urgent: 'border-l-red-500',
};

export function AnnouncementCard({
    announcement,
    onView,
    onEdit,
    onDelete,
}: AnnouncementCardProps) {
    const category = CATEGORY_STYLES[announcement.category];
    const priorityBorder = PRIORITY_STYLES[announcement.priority];

    return (
        <div className={`bg-white rounded-xl shadow-sm border-l-4 ${priorityBorder} hover:shadow-md transition-shadow`}>
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <Megaphone size={20} className="text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                {announcement.priority === 'urgent' && (
                                    <Pin size={14} className="text-indigo-500" />
                                )}
                                <h3 className="font-semibold text-gray-800 truncate">{announcement.title}</h3>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                {announcement.content}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${category.bg} ${category.text}`}>
                            {category.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            {announcement.publishedAt ? new Date(announcement.publishedAt).toLocaleDateString('id-ID') : 'Draft'}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Users size={12} />
                            {[announcement.targetAudience.students && 'Siswa', announcement.targetAudience.teachers && 'Guru', announcement.targetAudience.parents && 'Ortu'].filter(Boolean).join(', ') || 'Semua'}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        {onView && (
                            <button
                                onClick={() => onView(announcement)}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Eye size={14} />
                            </button>
                        )}
                        {onEdit && (
                            <button
                                onClick={() => onEdit(announcement)}
                                className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            >
                                <Edit size={14} />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(announcement)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnnouncementCard;
