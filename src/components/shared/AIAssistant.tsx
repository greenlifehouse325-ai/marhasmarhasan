/**
 * AI Assistant Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen AI assistant yang membantu admin dengan tugas sehari-hari
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Bot,
    Send,
    Sparkles,
    X,
    Minimize2,
    Maximize2,
    Loader2,
    User,
    Copy,
    Check,
    Lightbulb,
    Calendar,
    TrendingUp,
    Users,
} from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const QUICK_ACTIONS = [
    { icon: <TrendingUp size={14} />, label: 'Ringkasan hari ini', prompt: 'Berikan ringkasan aktivitas hari ini' },
    { icon: <Users size={14} />, label: 'Siswa bermasalah', prompt: 'Siapa siswa dengan absensi terendah minggu ini?' },
    { icon: <Calendar size={14} />, label: 'Jadwal minggu ini', prompt: 'Apa saja kegiatan penting minggu ini?' },
    { icon: <Lightbulb size={14} />, label: 'Saran peningkatan', prompt: 'Berikan saran untuk meningkatkan kinerja sekolah' },
];

const SAMPLE_RESPONSES: Record<string, string> = {
    'ringkasan hari ini': `📊 **Ringkasan Hari Ini (29 Des 2024)**

**Kehadiran:**
- Total siswa hadir: 892/950 (93.8%)
- Siswa terlambat: 23
- Alpha: 35

**Perpustakaan:**
- Peminjaman baru: 12 buku
- Pengembalian: 8 buku
- Denda terkumpul: Rp 45.000

**Keuangan:**
- SPP diterima: Rp 12.500.000 (25 siswa)
- Menunggu verifikasi: 8 transaksi

Ada yang ingin dianalisis lebih lanjut?`,

    'siswa bermasalah': `⚠️ **Siswa dengan Kehadiran Terendah**

| Nama | Kelas | Kehadiran | Status |
|------|-------|-----------|--------|
| Budi Santoso | XII PPLG 1 | 65% | Perlu perhatian |
| Rina Safitri | XI TKJ 2 | 70% | Perlu monitoring |
| Ahmad Rizky | X TMS 1 | 72% | Waspada |

**Rekomendasi:**
1. Hubungi wali siswa untuk Budi Santoso
2. Jadwalkan konseling untuk 3 siswa ini
3. Pantau perkembangan minggu depan`,

    'kegiatan minggu ini': `📅 **Agenda Minggu Ini**

**Senin (30 Des):**
- 07:30 - Upacara Bendera
- 13:00 - Rapat Guru

**Selasa (31 Des):**
- Libur Tahun Baru Eve

**Rabu (1 Jan):**
- 🎉 Libur Tahun Baru 2025

**Kamis-Jumat:**
- Kegiatan belajar normal
- 14:00 Kamis - Ekstrakurikuler

**Catatan:** Pastikan pengumuman libur sudah dikirim ke wali siswa.`,

    'default': `Saya adalah AI Assistant SMK Marhas! 🤖

Saya bisa membantu Anda dengan:
- 📊 Menganalisis data statistik sekolah
- 📅 Mengingatkan jadwal dan deadline
- 📝 Membuat ringkasan laporan
- 💡 Memberikan saran dan insight

Silakan tanyakan apa saja tentang data sekolah!`,
};

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Halo! Saya AI Assistant SMK Marhas. Ada yang bisa saya bantu hari ini? 🎓',
            timestamp: new Date(),
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    const handleSend = async (customPrompt?: string) => {
        const text = customPrompt || input.trim();
        if (!text) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Get response based on input
        let response = SAMPLE_RESPONSES['default'];
        const lowerText = text.toLowerCase();

        if (lowerText.includes('ringkasan') || lowerText.includes('hari ini')) {
            response = SAMPLE_RESPONSES['ringkasan hari ini'];
        } else if (lowerText.includes('siswa') && (lowerText.includes('bermasalah') || lowerText.includes('absensi'))) {
            response = SAMPLE_RESPONSES['siswa bermasalah'];
        } else if (lowerText.includes('jadwal') || lowerText.includes('minggu') || lowerText.includes('kegiatan')) {
            response = SAMPLE_RESPONSES['kegiatan minggu ini'];
        }

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
    };

    const handleCopy = (content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center z-50 group"
            >
                <Sparkles size={24} className="text-white group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </button>
        );
    }

    return (
        <div
            className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all ${isMinimized ? 'w-72 h-14' : 'w-96 h-[32rem]'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <span className="font-medium">AI Assistant</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                    >
                        {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${message.role === 'assistant'
                                            ? 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {message.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                                </div>
                                <div
                                    className={`group relative max-w-[80%] px-3 py-2 rounded-xl text-sm ${message.role === 'assistant'
                                            ? 'bg-gray-100 text-gray-700'
                                            : 'bg-indigo-500 text-white'
                                        }`}
                                >
                                    <div className="whitespace-pre-wrap">{message.content}</div>
                                    {message.role === 'assistant' && (
                                        <button
                                            onClick={() => handleCopy(message.content, message.id)}
                                            className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 w-6 h-6 bg-white shadow rounded-lg flex items-center justify-center transition-opacity"
                                        >
                                            {copiedId === message.id ? (
                                                <Check size={12} className="text-green-500" />
                                            ) : (
                                                <Copy size={12} className="text-gray-400" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                    <Bot size={16} className="text-indigo-600" />
                                </div>
                                <div className="px-3 py-2 bg-gray-100 rounded-xl">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {messages.length <= 2 && (
                        <div className="px-4 pb-2">
                            <p className="text-xs text-gray-400 mb-2">Coba tanyakan:</p>
                            <div className="flex flex-wrap gap-1">
                                {QUICK_ACTIONS.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(action.prompt)}
                                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t border-gray-100">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik pesan..."
                                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors disabled:opacity-50"
                            >
                                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AIAssistant;
