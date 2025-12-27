'use client';

import React from 'react';
import { FileText, Eye, BookOpen } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    category: string;
    publishedDate: string;
    isRead: boolean;
}

interface Announcement {
    id: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    date: string;
    isRead: boolean;
}

interface ParentBlogTabProps {
    blogPosts: BlogPost[];
    announcements: Announcement[];
    totalViews: number;
    engagementRate: number;
}

const priorityColors = {
    high: 'bg-red-100 text-red-600 border-red-200',
    medium: 'bg-amber-100 text-amber-600 border-amber-200',
    low: 'bg-blue-100 text-blue-600 border-blue-200',
};

export default function ParentBlogTab({ blogPosts, announcements, totalViews, engagementRate }: ParentBlogTabProps) {
    return (
        <div className="space-y-6">
            {/* Engagement Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 text-center">
                    <p className="text-3xl font-bold text-amber-500">{totalViews}</p>
                    <p className="text-sm text-[var(--text-grey)]">Content Views</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-3xl font-bold text-green-500">{engagementRate}%</p>
                    <p className="text-sm text-[var(--text-grey)]">Engagement Rate</p>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-amber-500" />
                    Blog & News
                </h3>
                <div className="space-y-2">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${post.isRead ? 'bg-gray-50' : 'bg-amber-50 border border-amber-100'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${post.isRead ? 'bg-gray-200 text-gray-500' : 'bg-amber-200 text-amber-600'
                                    }`}>
                                    <FileText size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{post.title}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{post.category} • {post.publishedDate}</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-1 text-xs ${post.isRead ? 'text-green-600' : 'text-gray-400'}`}>
                                <Eye size={14} />
                                <span>{post.isRead ? 'Read' : 'Unread'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Announcements */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4">
                    Important Announcements
                </h3>
                <div className="space-y-2">
                    {announcements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className={`flex items-center justify-between p-3 rounded-xl border ${priorityColors[announcement.priority]}`}
                        >
                            <div>
                                <p className="text-sm font-medium text-[var(--text-dark)]">{announcement.title}</p>
                                <p className="text-xs text-[var(--text-grey)]">{announcement.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[announcement.priority]}`}>
                                    {announcement.priority.toUpperCase()}
                                </span>
                                {announcement.isRead && (
                                    <span className="text-xs text-green-600">✓ Read</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
