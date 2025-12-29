/**
 * Announcement Editor Component
 * SMK Marhas Admin Dashboard - Aplikasi
 * 
 * Rich text editor untuk pengumuman
 */

'use client';

import React, { useState } from 'react';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link2,
    Image,
    Send,
    Eye,
    Save,
    Users,
    Calendar,
    Bell,
} from 'lucide-react';

interface AnnouncementEditorProps {
    initialTitle?: string;
    initialContent?: string;
    onSave?: (data: { title: string; content: string; targetAudience: string[]; publishDate: string }) => void;
    onPublish?: (data: { title: string; content: string; targetAudience: string[]; publishDate: string }) => void;
}

const AUDIENCE_OPTIONS = [
    { value: 'all', label: 'Semua' },
    { value: 'students', label: 'Siswa' },
    { value: 'teachers', label: 'Guru' },
    { value: 'parents', label: 'Orang Tua' },
];

export function AnnouncementEditor({
    initialTitle = '',
    initialContent = '',
    onSave,
    onPublish,
}: AnnouncementEditorProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [targetAudience, setTargetAudience] = useState<string[]>(['all']);
    const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
    const [sendNotification, setSendNotification] = useState(true);
    const [isPreview, setIsPreview] = useState(false);

    const toggleAudience = (value: string) => {
        if (value === 'all') {
            setTargetAudience(['all']);
        } else {
            const newAudience = targetAudience.includes(value)
                ? targetAudience.filter(a => a !== value)
                : [...targetAudience.filter(a => a !== 'all'), value];
            setTargetAudience(newAudience.length ? newAudience : ['all']);
        }
    };

    const handleSave = () => {
        onSave?.({ title, content, targetAudience, publishDate });
    };

    const handlePublish = () => {
        onPublish?.({ title, content, targetAudience, publishDate });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-1">
                    <ToolbarButton icon={<Bold size={16} />} />
                    <ToolbarButton icon={<Italic size={16} />} />
                    <div className="w-px h-5 bg-gray-200 mx-1" />
                    <ToolbarButton icon={<List size={16} />} />
                    <ToolbarButton icon={<ListOrdered size={16} />} />
                    <div className="w-px h-5 bg-gray-200 mx-1" />
                    <ToolbarButton icon={<Link2 size={16} />} />
                    <ToolbarButton icon={<Image size={16} />} />
                </div>
                <button
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isPreview ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <Eye size={16} />
                    Preview
                </button>
            </div>

            {/* Editor */}
            <div className="p-4 space-y-4">
                {/* Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul Pengumuman"
                    className="w-full px-0 py-2 text-xl font-bold text-gray-800 border-0 border-b-2 border-transparent focus:border-indigo-500 focus:outline-none bg-transparent"
                />

                {/* Content */}
                {isPreview ? (
                    <div
                        className="min-h-[200px] p-4 bg-gray-50 rounded-xl prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
                    />
                ) : (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tulis isi pengumuman di sini..."
                        className="w-full min-h-[200px] px-0 py-2 text-gray-700 border-0 focus:outline-none resize-none bg-transparent"
                    />
                )}
            </div>

            {/* Settings */}
            <div className="p-4 border-t border-gray-100 space-y-4">
                {/* Target Audience */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Users size={14} />
                        Target Audience
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {AUDIENCE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => toggleAudience(opt.value)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${targetAudience.includes(opt.value)
                                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Publish Date */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={14} />
                        Tanggal Publish
                    </label>
                    <input
                        type="date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Send Notification */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={sendNotification}
                        onChange={(e) => setSendNotification(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <Bell size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Kirim notifikasi push</span>
                </label>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                    <Save size={16} />
                    Simpan Draft
                </button>
                <button
                    onClick={handlePublish}
                    disabled={!title || !content}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    <Send size={16} />
                    Publish
                </button>
            </div>
        </div>
    );
}

function ToolbarButton({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
    return (
        <button
            className={`p-2 rounded-lg transition-colors ${active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
        >
            {icon}
        </button>
    );
}

export default AnnouncementEditor;
