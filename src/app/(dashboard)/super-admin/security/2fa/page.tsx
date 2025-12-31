/**
 * 2FA Settings Page
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState } from 'react';
import { Shield, Smartphone, Key, CheckCircle, AlertCircle } from 'lucide-react';

export default function TwoFactorPage() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [showSetup, setShowSetup] = useState(false);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Two-Factor Authentication</h1>
                <p className="text-[var(--text-muted)]">Tambah lapisan keamanan ekstra untuk akun admin</p>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${is2FAEnabled ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                        <Shield size={24} className={is2FAEnabled ? 'text-green-600' : 'text-amber-600'} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Status 2FA</h2>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${is2FAEnabled ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                {is2FAEnabled ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>
                        <p className="text-[var(--text-muted)] mt-1">
                            {is2FAEnabled ? 'Two-factor authentication sudah aktif untuk akun ini.' : 'Aktifkan 2FA untuk keamanan tambahan saat login.'}
                        </p>
                        {!is2FAEnabled && (
                            <button onClick={() => setShowSetup(true)} className="mt-4 px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl text-sm font-medium">
                                Aktifkan 2FA
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showSetup && !is2FAEnabled && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Setup Two-Factor Authentication</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-[var(--bg-hover)] rounded-xl text-center">
                            <div className="w-32 h-32 bg-white mx-auto rounded-lg flex items-center justify-center">
                                <span className="text-xs text-gray-400">QR Code</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)] mt-2">Scan dengan app authenticator</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Masukkan kode verifikasi</label>
                            <input type="text" maxLength={6} placeholder="000000" className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] text-center text-2xl tracking-widest font-mono" />
                        </div>
                        <button onClick={() => { setIs2FAEnabled(true); setShowSetup(false); }} className="w-full py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white rounded-xl font-medium">
                            Verifikasi & Aktifkan
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Key size={20} className="text-[var(--brand-primary)]" />
                    Recovery Codes
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">Simpan kode recovery untuk akses darurat jika kehilangan perangkat authenticator.</p>
                <button className="px-4 py-2 bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] text-[var(--text-secondary)] rounded-xl text-sm font-medium">
                    Generate Recovery Codes
                </button>
            </div>
        </div>
    );
}
