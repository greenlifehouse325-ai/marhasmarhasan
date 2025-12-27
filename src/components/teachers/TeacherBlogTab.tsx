'use client';

import React from 'react';
import { FileText, Eye, EyeOff, Edit, CheckCircle, Clock, XCircle } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

interface BlogPost {
    id: string;
    title: string;
    category: string;
    publishedDate: string;
    status: 'published' | 'draft' | 'hidden';
    views: number;
}

interface TeacherBlogTabProps {
    posts: BlogPost[];
    totalPosts: number;
    publishedCount: number;
    draftCount: number;
}

const statusIcons = {
    published: <CheckCircle size={16} className="text-green-500" />,
    draft: <Clock size={16} className="text-orange-500" />,
    hidden: <EyeOff size={16} className="text-gray-500" />,
};

const statusBadgeVariant = {
    published: 'success',
    draft: 'warning',
    hidden: 'neutral',
} as const;

const statusLabels = {
    published: 'Published',
    draft: 'Draft',
    hidden: 'Hidden',
};

export default function TeacherBlogTab({ posts, totalPosts, publishedCount, draftCount }: TeacherBlogTabProps) {
    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Stats */}
            <div className="card col-span-3">
                <div className="grid grid-cols-3 gap-6">
                    <div className="p-4 bg-blue-50 rounded-xl text-center">
                        <p className="text-3xl font-bold text-[var(--primary-blue)]">{totalPosts}</p>
                        <p className="text-sm text-[var(--text-grey)]">Total Posts</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl text-center">
                        <p className="text-3xl font-bold text-green-500">{publishedCount}</p>
                        <p className="text-sm text-[var(--text-grey)]">Published</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl text-center">
                        <p className="text-3xl font-bold text-orange-500">{draftCount}</p>
                        <p className="text-sm text-[var(--text-grey)]">Drafts</p>
                    </div>
                </div>
            </div>

            {/* Blog Posts List */}
            <div className="card col-span-3">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-[var(--primary-blue)]" />
                    Blog & Content
                </h3>
                <div className="space-y-3">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {statusIcons[post.status]}
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-dark)]">{post.title}</p>
                                    <p className="text-xs text-[var(--text-grey)]">{post.category} • {post.publishedDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-[var(--text-grey)]">
                                    <Eye size={14} />
                                    <span className="text-xs">{post.views}</span>
                                </div>
                                <StatusBadge variant={statusBadgeVariant[post.status]}>
                                    {statusLabels[post.status]}
                                </StatusBadge>
                                <div className="flex gap-1">
                                    <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                                        <Edit size={14} className="text-[var(--text-grey)]" />
                                    </button>
                                    <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                                        <EyeOff size={14} className="text-[var(--text-grey)]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
