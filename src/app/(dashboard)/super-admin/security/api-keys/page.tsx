/**
 * API Keys Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2, RefreshCw } from 'lucide-react';

const MOCK_KEYS = [
    { id: 'K1', name: 'Production API', key: 'sk_live_xxxxxxxxxxxxxxxx', created: '2024-01-01', lastUsed: '2024-01-15', status: 'active' },
    { id: 'K2', name: 'Development API', key: 'sk_test_xxxxxxxxxxxxxxxx', created: '2024-01-05', lastUsed: '2024-01-14', status: 'active' },
];

export default function APIKeysPage() {
    const [keys, setKeys] = useState(MOCK_KEYS);
    const [visibleKey, setVisibleKey] = useState<string | null>(null);

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key);
        alert('API Key copied!');
    };

    const deleteKey = (id: string) => {
        if (confirm('Hapus API Key ini?')) {
            setKeys(keys.filter(k => k.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">API Keys</h1>
                    <p className="text-[var(--text-muted)]">Kelola API keys untuk integrasi eksternal</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium">
                    <Plus size={16} />
                    Generate New Key
                </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-sm text-amber-600">⚠️ Jangan bagikan API keys. Simpan dengan aman dan rotasi secara berkala.</p>
            </div>

            <div className="space-y-3">
                {keys.map(apiKey => (
                    <div key={apiKey.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center">
                                    <Key size={20} className="text-[var(--brand-primary)]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">{apiKey.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="text-sm font-mono text-[var(--text-muted)]">
                                            {visibleKey === apiKey.id ? apiKey.key : apiKey.key.replace(/./g, '•').slice(0, 20) + '...'}
                                        </code>
                                        <button onClick={() => setVisibleKey(visibleKey === apiKey.id ? null : apiKey.id)} className="p-1 hover:bg-[var(--bg-hover)] rounded">
                                            {visibleKey === apiKey.id ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <button onClick={() => copyKey(apiKey.key)} className="p-1 hover:bg-[var(--bg-hover)] rounded">
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                    <div className="flex gap-4 mt-2 text-xs text-[var(--text-muted)]">
                                        <span>Dibuat: {apiKey.created}</span>
                                        <span>Terakhir: {apiKey.lastUsed}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg" title="Regenerate">
                                    <RefreshCw size={16} className="text-[var(--text-muted)]" />
                                </button>
                                <button onClick={() => deleteKey(apiKey.id)} className="p-2 hover:bg-red-500/10 rounded-lg" title="Delete">
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
