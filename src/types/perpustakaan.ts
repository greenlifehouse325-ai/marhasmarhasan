/**
 * Perpustakaan Types
 * SMK Marhas Admin Dashboard
 */

// ============================================
// BOOK TYPES
// ============================================

export interface Book {
    id: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishedYear: number;
    category: BookCategory;
    location: string; // Shelf location
    totalCopies: number;
    availableCopies: number;
    cover?: string;
    description?: string;
    language: 'Indonesia' | 'English' | 'Other';
    pages: number;
    status: 'available' | 'limited' | 'unavailable';
    createdAt: Date;
    updatedAt: Date;
}

export type BookCategory =
    | 'Fiksi'
    | 'Non-Fiksi'
    | 'Pendidikan'
    | 'Teknologi'
    | 'Sains'
    | 'Agama'
    | 'Sejarah'
    | 'Bahasa'
    | 'Referensi'
    | 'Lainnya';

// ============================================
// LENDING TYPES
// ============================================

export interface Lending {
    id: string;
    bookId: string;
    book: Book;
    borrowerId: string;
    borrowerName: string;
    borrowerType: 'student' | 'teacher';
    borrowerClass?: string;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: LendingStatus;
    notes?: string;
    processedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export type LendingStatus =
    | 'active'      // Currently borrowed
    | 'overdue'     // Past due date
    | 'returned'    // Returned on time
    | 'returned_late' // Returned after due date
    | 'lost';        // Book reported lost

// ============================================
// FINE TYPES
// ============================================

export interface Fine {
    id: string;
    lendingId: string;
    lending: Lending;
    borrowerId: string;
    borrowerName: string;
    amount: number;
    daysOverdue: number;
    reason: 'overdue' | 'lost' | 'damaged';
    status: 'pending' | 'paid' | 'waived';
    paidAt?: Date;
    paidAmount?: number;
    waivedBy?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// DIGITAL CONTENT
// ============================================

export interface DigitalContent {
    id: string;
    title: string;
    type: 'ebook' | 'pdf' | 'video' | 'audio';
    category: BookCategory;
    fileUrl: string;
    thumbnailUrl?: string;
    fileSize: number; // in bytes
    description?: string;
    uploadedBy: string;
    downloadCount: number;
    viewCount: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// LIBRARY STATS
// ============================================

export interface LibraryStats {
    totalBooks: number;
    totalCopies: number;
    availableCopies: number;
    borrowedCopies: number;
    totalMembers: number;
    activeLoans: number;
    overdueLoans: number;
    totalFines: number;
    unpaidFines: number;
    todayLoans: number;
    todayReturns: number;
    popularBooks: { book: Book; loanCount: number }[];
}

// ============================================
// LIBRARY SETTINGS
// ============================================

export interface LibrarySettings {
    maxBooksPerStudent: number;
    maxBooksPerTeacher: number;
    loanDurationDays: number;
    finePerDay: number;
    maxRenewals: number;
    renewalDays: number;
    operatingHours: {
        open: string;
        close: string;
    };
    closedDays: string[];
}
