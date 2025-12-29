/**
 * Absensi Types
 * SMK Marhas Admin Dashboard
 */

// ============================================
// SESSION TYPES
// ============================================

export interface AttendanceSession {
    id: string;
    title: string;
    type: SessionType;
    date: Date;
    startTime: string;
    endTime: string;
    campus: 1 | 2;
    targetClasses: string[] | 'all';
    qrCode: string;
    refreshInterval: number; // in seconds
    status: 'scheduled' | 'active' | 'ended';
    scannedCount: number;
    targetCount: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SessionType =
    | 'regular'      // Absensi harian
    | 'ceremony'     // Upacara
    | 'event'        // Kegiatan khusus
    | 'exam';        // Ujian

// ============================================
// ATTENDANCE TYPES
// ============================================

export interface AttendanceRecord {
    id: string;
    sessionId: string;
    studentId: string;
    studentName: string;
    studentClass: string;
    studentNIS: string;
    status: AttendanceStatus;
    scanTime?: Date;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AttendanceStatus =
    | 'hadir'
    | 'alpha'
    | 'izin'
    | 'sakit'
    | 'terlambat';

// ============================================
// RECAP TYPES
// ============================================

export interface ClassRecap {
    classId: string;
    className: string;
    date: Date;
    hadir: number;
    alpha: number;
    izin: number;
    sakit: number;
    terlambat: number;
    total: number;
    percentage: number;
}

export interface StudentRecap {
    studentId: string;
    studentName: string;
    studentClass: string;
    period: {
        from: Date;
        to: Date;
    };
    hadir: number;
    alpha: number;
    izin: number;
    sakit: number;
    terlambat: number;
    totalDays: number;
    percentage: number;
}

// ============================================
// SETTINGS
// ============================================

export interface AttendanceSettings {
    defaultStartTime: string;
    defaultEndTime: string;
    lateThresholdMinutes: number;
    qrRefreshInterval: number;
    autoEndSession: boolean;
    allowManualEntry: boolean;
    notifyParentOnAbsent: boolean;
}
