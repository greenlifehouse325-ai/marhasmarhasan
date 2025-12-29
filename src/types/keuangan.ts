/**
 * Keuangan Types
 * SMK Marhas Admin Dashboard
 */

// ============================================
// SPP TYPES
// ============================================

export interface SPPPayment {
    id: string;
    studentId: string;
    studentName: string;
    studentClass: string;
    studentNIS: string;
    month: number;
    year: number;
    amount: number;
    status: SPPStatus;
    paymentMethod?: 'transfer' | 'cash' | 'virtual_account';
    paymentProof?: string;
    paidAt?: Date;
    verifiedBy?: string;
    verifiedAt?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SPPStatus =
    | 'pending'      // Belum bayar
    | 'waiting'      // Menunggu verifikasi
    | 'verified'     // Sudah diverifikasi
    | 'rejected';    // Ditolak

// ============================================
// TRANSACTION TYPES
// ============================================

export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    category: string;
    description: string;
    amount: number;
    date: Date;
    reference?: string;
    attachments?: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IncomeCategory =
    | 'SPP'
    | 'Denda Perpustakaan'
    | 'Pendaftaran'
    | 'Seragam'
    | 'Kegiatan'
    | 'Lainnya';

export type ExpenseCategory =
    | 'Gaji'
    | 'Operasional'
    | 'Pemeliharaan'
    | 'ATK'
    | 'Kegiatan'
    | 'Lainnya';

// ============================================
// REPORT TYPES
// ============================================

export interface FinancialReport {
    period: {
        from: Date;
        to: Date;
    };
    totalIncome: number;
    totalExpense: number;
    balance: number;
    incomeByCategory: Record<string, number>;
    expenseByCategory: Record<string, number>;
    transactions: Transaction[];
}

// ============================================
// SETTINGS
// ============================================

export interface FinanceSettings {
    sppAmount: number;
    sppDueDay: number;
    lateFeePerDay: number;
    maxLateFee: number;
    bankAccounts: {
        name: string;
        number: string;
        bank: string;
    }[];
}
