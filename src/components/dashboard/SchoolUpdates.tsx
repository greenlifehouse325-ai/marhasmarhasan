'use client';

import React from 'react';
import { Plus, Clock } from 'lucide-react';
import Image from 'next/image';

interface Update {
    id: string;
    title: string;
    categories: string[];
    status: 'published' | 'scheduled' | 'draft';
    timestamp: string;
    image: string;
}

const updates: Update[] = [
    {
        id: '1',
        title: 'Annual Science Fair Registration Open',
        categories: ['EVENT', 'ACADEMIC'],
        status: 'published',
        timestamp: '2 hours ago',
        image: '/placeholder-1.jpg',
    },
    {
        id: '2',
        title: 'Annual Science Fair Registration Open',
        categories: ['EVENT', 'ACADEMIC'],
        status: 'scheduled',
        timestamp: '2 hours ago',
        image: '/placeholder-2.jpg',
    },
];

function getCategoryClass(category: string) {
    switch (category.toLowerCase()) {
        case 'event':
            return 'badge-event';
        case 'academic':
            return 'badge-academic';
        default:
            return 'badge-admin';
    }
}

function getStatusClass(status: string) {
    switch (status) {
        case 'published':
            return 'badge-published';
        case 'scheduled':
            return 'badge-scheduled';
        case 'draft':
            return 'badge-draft';
        default:
            return 'badge-draft';
    }
}

export default function SchoolUpdates() {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[var(--text-dark)]">School Updates</h2>
                <button className="flex items-center gap-2 text-sm font-medium text-[var(--primary-blue)] hover:text-[var(--light-blue)] transition-colors">
                    <Plus size={16} />
                    Create Update
                </button>
            </div>

            {/* Update Cards */}
            <div className="grid grid-cols-2 gap-4">
                {updates.map((update) => (
                    <div key={update.id} className="card card-hover flex gap-4">
                        {/* Image Placeholder */}
                        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-[var(--text-grey)]">
                                <Image
                                    src="/placeholder.svg"
                                    alt={update.title}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 min-w-0">
                            {/* Categories & Status */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {update.categories.map((cat) => (
                                    <span key={cat} className={`badge ${getCategoryClass(cat)}`}>
                                        {cat}
                                    </span>
                                ))}
                                <span className={`badge ${getStatusClass(update.status)}`}>
                                    {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-medium text-[var(--text-dark)] text-sm mb-2 line-clamp-2">
                                {update.title}
                            </h3>

                            {/* Timestamp */}
                            <div className="flex items-center gap-1 text-xs text-[var(--text-grey)] mt-auto">
                                <Clock size={12} />
                                <span>{update.timestamp}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
