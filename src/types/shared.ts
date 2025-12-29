/**
 * Shared Types
 * SMK Marhas Admin Dashboard
 */

// ============================================
// COMMON TYPES
// ============================================

export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface SortParams {
    field: string;
    direction: 'asc' | 'desc';
}

export interface FilterParams {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    [key: string]: string | undefined;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    pagination?: PaginationParams;
}

// ============================================
// TABLE TYPES
// ============================================

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableAction<T> {
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    color?: 'primary' | 'danger' | 'warning' | 'success';
    show?: (row: T) => boolean;
}

// ============================================
// EXPORT TYPES
// ============================================

export type ExportFormat = 'pdf' | 'excel' | 'csv';

export interface ExportOptions {
    format: ExportFormat;
    filename: string;
    title: string;
    columns: string[];
    dateRange?: {
        from: Date;
        to: Date;
    };
}

// ============================================
// STATUS TYPES
// ============================================

export type StatusType =
    | 'active'
    | 'inactive'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'completed'
    | 'cancelled'
    | 'overdue'
    | 'draft'
    | 'published';

export interface StatusConfig {
    label: string;
    color: string;
    bgColor: string;
}

export const STATUS_CONFIGS: Record<StatusType, StatusConfig> = {
    active: { label: 'Aktif', color: '#10B981', bgColor: '#D1FAE5' },
    inactive: { label: 'Tidak Aktif', color: '#6B7280', bgColor: '#F3F4F6' },
    pending: { label: 'Menunggu', color: '#F59E0B', bgColor: '#FEF3C7' },
    approved: { label: 'Disetujui', color: '#10B981', bgColor: '#D1FAE5' },
    rejected: { label: 'Ditolak', color: '#EF4444', bgColor: '#FEE2E2' },
    completed: { label: 'Selesai', color: '#3B82F6', bgColor: '#DBEAFE' },
    cancelled: { label: 'Dibatalkan', color: '#6B7280', bgColor: '#F3F4F6' },
    overdue: { label: 'Terlambat', color: '#EF4444', bgColor: '#FEE2E2' },
    draft: { label: 'Draft', color: '#6B7280', bgColor: '#F3F4F6' },
    published: { label: 'Dipublikasi', color: '#10B981', bgColor: '#D1FAE5' },
};

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

// ============================================
// SCHOOL DATA TYPES
// ============================================

export interface Student {
    id: string;
    nis: string;
    nisn: string;
    name: string;
    email?: string;
    phone?: string;
    class: string;
    major: 'PPLG' | 'TMS' | 'TKJ';
    campus: 1 | 2;
    gender: 'L' | 'P';
    birthDate: Date;
    birthPlace: string;
    address: string;
    parentName: string;
    parentPhone: string;
    parentEmail?: string;
    photo?: string;
    status: 'active' | 'inactive' | 'graduated' | 'dropped';
    enrolledAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Teacher {
    id: string;
    nip?: string;
    nuptk?: string;
    name: string;
    email: string;
    phone: string;
    subject: string[];
    campus: 1 | 2 | 'both';
    gender: 'L' | 'P';
    birthDate: Date;
    address: string;
    photo?: string;
    status: 'active' | 'inactive' | 'retired';
    isHomeroom: boolean;
    homeroomClass?: string;
    joinedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Class {
    id: string;
    name: string;
    grade: 10 | 11 | 12;
    major: 'PPLG' | 'TMS' | 'TKJ';
    campus: 1 | 2;
    homeroomTeacher?: Teacher;
    studentCount: number;
    academicYear: string;
}

// ============================================
// DATE RANGE TYPES
// ============================================

export interface DateRange {
    from: Date;
    to: Date;
}

export type DatePreset = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';
