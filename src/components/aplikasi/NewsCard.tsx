/**
 * News Card Component
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Card untuk menampilkan berita
 */

'use client';

import React from 'react';
import {
    Calendar,
    Eye,
    Edit,
    Trash2,
    Image as ImageIcon,
    Tag,
} from 'lucide-react';
import type { News } from '@/types/aplikasi';

interface NewsCardProps {
    news: News;
    onView?: (n: News) => void;
    onEdit?: (n: News) => void;
    onDelete?: (n: News) => void;
}

const STATUS_STYLES = {
    published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Published' },
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
    archived: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Archived' },
};

export function NewsCard({ news, onView, onEdit, onDelete }: NewsCardProps) {
    const status = STATUS_STYLES[news.status];

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon size={40} className="text-indigo-300" />
                </div>

                {/* Status Badge */}
                <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                    {status.label}
                </span>

                {news.featured && (
                    <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-amber-400 text-amber-900">
                        Featured
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1 text-xs text-indigo-600">
                        <Tag size={12} />
                        {news.category}
                    </span>
                </div>

                <h3 className="font-semibold text-gray-800 line-clamp-2">{news.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{news.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('id-ID') : 'Draft'}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Eye size={12} />
                        {news.views} views
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 mt-3">
                    {onView && (
                        <button
                            onClick={() => onView(news)}
                            className="flex-1 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            Lihat
                        </button>
                    )}
                    {onEdit && (
                        <button
                            onClick={() => onEdit(news)}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                            <Edit size={14} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(news)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
