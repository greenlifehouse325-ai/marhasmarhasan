/**
 * Blocked Users Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Search, Ban, Clock, Eye, Unlock } from 'lucide-react';

const MOCK_BLOCKED = [
    { id: 'B1', email: 'hacker@example.com', reason: 'Brute force attempt', blockedAt: '2024-01-10 08:30', attempts: 15 },
    { id: 'B2', email: 'spam@test.com', reason: 'Suspicious activity', blockedAt: '2024-01-12 14:00', attempts: 8 },
    { id: 'B3', email: 'fake@domain.com', reason: 'Invalid credentials', blockedAt: '2024-01-14 09:45', attempts: 12 },
];

export default function BlockedPage() {
    const [blocked, setBlocked] = useState(MOCK_BLOCKED);
    const [searchQuery, setSearchQuery] = useState('');

    const unblock = (id: string) => {
        if (confirm('Unblock user ini?')) {
            setBlocked(blocked.filter(b => b.id !== id));
        }
    };

    const filtered = blocked.filter(b => b.email.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Blocked Users</h1>
                <p className="text-[var(--text-muted)]">Daftar user yang diblokir karena aktivitas mencurigakan</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-500">{blocked.length}</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Blocked</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">35</p>
                    <p className="text-sm text-[var(--text-muted)]">Total Attempts</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-amber-600">5</p>
                    <p className="text-sm text-[var(--text-muted)]">Hari Ini</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-sm text-[var(--text-muted)]">Unblocked</p>
                </div>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" placeholder="Cari email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)]" />
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[var(--bg-hover)] border-b border-[var(--border-light)]">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Alasan</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Waktu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">Attempts</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                        {filtered.map(item => (
                            <tr key={item.id} className="hover:bg-[var(--bg-hover)]">
                                <td className="px-4 py-4 font-mono text-sm text-[var(--text-primary)]">{item.email}</td>
                                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{item.reason}</td>
                                <td className="px-4 py-4 text-sm text-[var(--text-muted)]">{item.blockedAt}</td>
                                <td className="px-4 py-4"><span className="px-2 py-0.5 text-xs bg-red-500/10 text-red-500 rounded">{item.attempts}x</span></td>
                                <td className="px-4 py-4 text-center">
                                    <button onClick={() => unblock(item.id)} className="p-2 hover:bg-green-500/10 rounded-lg" title="Unblock">
                                        <Unlock size={16} className="text-green-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
