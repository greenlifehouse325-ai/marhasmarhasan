/**
 * Lending Form Component
 * SMK Marhas Admin Dashboard - Perpustakaan
 * 
 * Form peminjaman buku
 */

'use client';

import React, { useState } from 'react';
import { Search, BookOpen, User, Calendar, Loader2 } from 'lucide-react';

interface LendingFormProps {
    onSubmit: (data: { studentId: string; bookId: string; dueDate: string }) => Promise<void>;
    onCancel?: () => void;
}

export function LendingForm({ onSubmit, onCancel }: LendingFormProps) {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [bookId, setBookId] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchingStudent, setIsSearchingStudent] = useState(false);
    const [isSearchingBook, setIsSearchingBook] = useState(false);

    // Mock search functions
    const searchStudent = async (nis: string) => {
        setIsSearchingStudent(true);
        await new Promise(r => setTimeout(r, 500));
        if (nis.length >= 8) {
            setStudentName('Ahmad Rizky - XII RPL 1');
        }
        setIsSearchingStudent(false);
    };

    const searchBook = async (isbn: string) => {
        setIsSearchingBook(true);
        await new Promise(r => setTimeout(r, 500));
        if (isbn.length >= 10) {
            setBookTitle('Pemrograman Web dengan PHP');
        }
        setIsSearchingBook(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentId || !bookId || !dueDate) return;

        setIsLoading(true);
        try {
            await onSubmit({ studentId, bookId, dueDate });
        } finally {
            setIsLoading(false);
        }
    };

    // Set default due date (14 days from now)
    const minDate = new Date().toISOString().split('T')[0];
    const defaultDueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Search */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={14} className="inline mr-1" />
                    Siswa (NIS)
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => {
                            setStudentId(e.target.value);
                            searchStudent(e.target.value);
                        }}
                        placeholder="Masukkan NIS siswa..."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    {isSearchingStudent && (
                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />
                    )}
                </div>
                {studentName && (
                    <p className="mt-1 text-sm text-emerald-600">{studentName}</p>
                )}
            </div>

            {/* Book Search */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen size={14} className="inline mr-1" />
                    Buku (ISBN)
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={bookId}
                        onChange={(e) => {
                            setBookId(e.target.value);
                            searchBook(e.target.value);
                        }}
                        placeholder="Masukkan ISBN buku..."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    {isSearchingBook && (
                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />
                    )}
                </div>
                {bookTitle && (
                    <p className="mt-1 text-sm text-emerald-600">{bookTitle}</p>
                )}
            </div>

            {/* Due Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    Tanggal Kembali
                </label>
                <input
                    type="date"
                    value={dueDate || defaultDueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={minDate}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isLoading || !studentName || !bookTitle}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
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
                        className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
}

export default LendingForm;
