/**
 * Lending Form Component - Enhanced
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Features:
 * - User type selection (Siswa/Guru)
 * - NIS/ISBN format validation
 * - Auto-generated Kode Pinjam
 * - Borrow date input
 * - Theme-aware styling
 */

'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, Loader2, Hash, GraduationCap, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LendingFormProps {
    onSubmit: (data: {
        userType: 'siswa' | 'guru';
        userId: string;
        bookId: string;
        borrowDate: string;
        dueDate: string;
        kodePinjam: string;
    }) => Promise<void>;
    onCancel?: () => void;
}

// Generate unique Kode Pinjam: PMJ-YYYYMMDD-XXX
function generateKodePinjam(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    return `PMJ-${dateStr}-${randomNum}`;
}

// Validate NIS: 8 digits
function validateNIS(nis: string): { valid: boolean; message: string } {
    const cleaned = nis.replace(/\D/g, '');
    if (!cleaned) return { valid: false, message: '' };
    if (cleaned.length < 8) return { valid: false, message: 'NIS harus 8 digit' };
    if (cleaned.length > 8) return { valid: false, message: 'NIS terlalu panjang' };
    return { valid: true, message: 'NIS valid' };
}

// Validate NIP (Guru): 18 digits
function validateNIP(nip: string): { valid: boolean; message: string } {
    const cleaned = nip.replace(/\D/g, '');
    if (!cleaned) return { valid: false, message: '' };
    if (cleaned.length < 18) return { valid: false, message: 'NIP harus 18 digit' };
    if (cleaned.length > 18) return { valid: false, message: 'NIP terlalu panjang' };
    return { valid: true, message: 'NIP valid' };
}

// Validate ISBN: 10 or 13 digits
function validateISBN(isbn: string): { valid: boolean; message: string } {
    const cleaned = isbn.replace(/[\s-]/g, '');
    if (!cleaned) return { valid: false, message: '' };
    if (cleaned.length === 10 || cleaned.length === 13) {
        return { valid: true, message: 'ISBN valid' };
    }
    if (cleaned.length < 10) return { valid: false, message: 'ISBN harus 10 atau 13 digit' };
    return { valid: false, message: 'Format ISBN tidak valid' };
}

export function LendingForm({ onSubmit, onCancel }: LendingFormProps) {
    const [userType, setUserType] = useState<'siswa' | 'guru'>('siswa');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [bookId, setBookId] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [borrowDate, setBorrowDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState('');
    const [kodePinjam, setKodePinjam] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchingUser, setIsSearchingUser] = useState(false);
    const [isSearchingBook, setIsSearchingBook] = useState(false);

    // Validation states
    const [userIdValidation, setUserIdValidation] = useState<{ valid: boolean; message: string }>({ valid: false, message: '' });
    const [isbnValidation, setIsbnValidation] = useState<{ valid: boolean; message: string }>({ valid: false, message: '' });

    // Generate kode pinjam on mount
    useEffect(() => {
        setKodePinjam(generateKodePinjam());
    }, []);

    // Set default due date (14 days from borrow date)
    useEffect(() => {
        if (borrowDate) {
            const due = new Date(borrowDate);
            due.setDate(due.getDate() + 14);
            setDueDate(due.toISOString().split('T')[0]);
        }
    }, [borrowDate]);

    // Validate and search user
    const handleUserIdChange = async (value: string) => {
        setUserId(value);
        setUserName('');

        // Validate format
        const validation = userType === 'siswa' ? validateNIS(value) : validateNIP(value);
        setUserIdValidation(validation);

        // Mock search if valid
        if (validation.valid) {
            setIsSearchingUser(true);
            await new Promise(r => setTimeout(r, 500));
            if (userType === 'siswa') {
                setUserName('Ahmad Rizky - XII PPLG 1');
            } else {
                setUserName('Pak Budi Santoso - Guru Matematika');
            }
            setIsSearchingUser(false);
        }
    };

    // Validate and search book
    const handleBookIdChange = async (value: string) => {
        setBookId(value);
        setBookTitle('');

        // Validate ISBN format
        const validation = validateISBN(value);
        setIsbnValidation(validation);

        // Mock search if valid
        if (validation.valid) {
            setIsSearchingBook(true);
            await new Promise(r => setTimeout(r, 500));
            setBookTitle('Pemrograman Web dengan PHP & MySQL');
            setIsSearchingBook(false);
        }
    };

    // Reset user field when type changes
    const handleUserTypeChange = (type: 'siswa' | 'guru') => {
        setUserType(type);
        setUserId('');
        setUserName('');
        setUserIdValidation({ valid: false, message: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName || !bookTitle || !userIdValidation.valid || !isbnValidation.valid) return;

        setIsLoading(true);
        try {
            await onSubmit({ userType, userId, bookId, borrowDate, dueDate, kodePinjam });
        } finally {
            setIsLoading(false);
        }
    };

    const minDate = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Kode Pinjam Display */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Hash size={16} />
                    <span className="text-sm font-medium">Kode Pinjam</span>
                </div>
                <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">{kodePinjam}</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">Kode akan digunakan untuk pelacakan peminjaman</p>
            </div>

            {/* User Type Selection */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Tipe Peminjam
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleUserTypeChange('siswa')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${userType === 'siswa'
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                                : 'border-[var(--border-light)] bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:border-emerald-500/50'
                            }`}
                    >
                        <GraduationCap size={20} />
                        <span className="font-medium">Siswa</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUserTypeChange('guru')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${userType === 'guru'
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                                : 'border-[var(--border-light)] bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:border-emerald-500/50'
                            }`}
                    >
                        <Users size={20} />
                        <span className="font-medium">Guru</span>
                    </button>
                </div>
            </div>

            {/* User ID (NIS/NIP) */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    <User size={14} className="inline mr-1" />
                    {userType === 'siswa' ? 'NIS Siswa (8 digit)' : 'NIP Guru (18 digit)'}
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => handleUserIdChange(e.target.value)}
                        placeholder={userType === 'siswa' ? 'Masukkan NIS siswa...' : 'Masukkan NIP guru...'}
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-[var(--text-primary)]"
                    />
                    {isSearchingUser && (
                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[var(--text-muted)]" />
                    )}
                </div>
                {/* Validation Message */}
                {userIdValidation.message && (
                    <div className={`flex items-center gap-1 mt-1 text-xs ${userIdValidation.valid ? 'text-emerald-600' : 'text-red-500'}`}>
                        {userIdValidation.valid ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {userIdValidation.message}
                    </div>
                )}
                {userName && (
                    <p className="mt-1 text-sm text-emerald-600">{userName}</p>
                )}
            </div>

            {/* Book Search (ISBN) */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    <BookOpen size={14} className="inline mr-1" />
                    ISBN Buku (10 atau 13 digit)
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={bookId}
                        onChange={(e) => handleBookIdChange(e.target.value)}
                        placeholder="Masukkan ISBN buku..."
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-[var(--text-primary)]"
                    />
                    {isSearchingBook && (
                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[var(--text-muted)]" />
                    )}
                </div>
                {/* Validation Message */}
                {isbnValidation.message && (
                    <div className={`flex items-center gap-1 mt-1 text-xs ${isbnValidation.valid ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isbnValidation.valid ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {isbnValidation.message}
                    </div>
                )}
                {bookTitle && (
                    <p className="mt-1 text-sm text-emerald-600">{bookTitle}</p>
                )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                {/* Borrow Date */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        <Calendar size={14} className="inline mr-1" />
                        Tanggal Pinjam
                    </label>
                    <input
                        type="date"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        min={minDate}
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-[var(--text-primary)]"
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        <Calendar size={14} className="inline mr-1" />
                        Tanggal Kembali
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={borrowDate}
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-[var(--text-primary)]"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isLoading || !userName || !bookTitle || !userIdValidation.valid || !isbnValidation.valid}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        'Proses Peminjaman'
                    )}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-xl hover:bg-[var(--bg-active)] transition-colors"
                    >
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
}

export default LendingForm;
