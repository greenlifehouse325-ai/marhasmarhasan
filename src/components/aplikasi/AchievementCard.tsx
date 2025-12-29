/**
 * Achievement Card Component
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Card untuk menampilkan prestasi
 */

'use client';

import React from 'react';
import {
    Trophy,
    Medal,
    Calendar,
    Eye,
    Edit,
    Trash2,
    User,
} from 'lucide-react';
import type { Achievement } from '@/types/aplikasi';

interface AchievementCardProps {
    achievement: Achievement;
    onView?: (a: Achievement) => void;
    onEdit?: (a: Achievement) => void;
    onDelete?: (a: Achievement) => void;
}

const LEVEL_STYLES = {
    international: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Internasional' },
    national: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Nasional' },
    province: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Provinsi' },
    city: { bg: 'bg-green-100', text: 'text-green-700', label: 'Kota/Kabupaten' },
    school: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Sekolah' },
};

const RANK_ICONS: Record<number, React.ReactNode> = {
    1: <Medal className="text-amber-400" size={20} />,
    2: <Medal className="text-gray-400" size={20} />,
    3: <Medal className="text-amber-700" size={20} />,
};

export function AchievementCard({
    achievement,
    onView,
    onEdit,
    onDelete,
}: AchievementCardProps) {
    const level = LEVEL_STYLES[achievement.level];
    const rankIcon = achievement.rank && achievement.rank <= 3 ? RANK_ICONS[achievement.rank] : null;

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-start gap-3">
                {/* Trophy Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                    {rankIcon || <Trophy size={24} className="text-amber-500" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${level.bg} ${level.text} mb-1`}>
                                {level.label}
                            </span>
                            <h3 className="font-semibold text-gray-800 line-clamp-2">{achievement.title}</h3>
                        </div>
                        {achievement.rank && (
                            <span className="text-lg font-bold text-gray-800">
                                #{achievement.rank}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <User size={12} />
                            {achievement.participants.length > 0 ? achievement.participants[0].name : '-'}
                            {achievement.participants.length > 1 && ` +${achievement.participants.length - 1}`}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(achievement.date).toLocaleDateString('id-ID')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-gray-100">
                {onView && (
                    <button
                        onClick={() => onView(achievement)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Eye size={14} />
                    </button>
                )}
                {onEdit && (
                    <button
                        onClick={() => onEdit(achievement)}
                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                        <Edit size={14} />
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(achievement)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default AchievementCard;
