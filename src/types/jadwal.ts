/**
 * Jadwal Types
 * SMK Marhas Admin Dashboard
 */

// ============================================
// SCHEDULE TYPES
// ============================================

export interface ScheduleSlot {
    id: string;
    day: DayOfWeek;
    startTime: string;
    endTime: string;
    subject: string;
    teacher: string;
    teacherId: string;
    classId: string;
    className: string;
    room: string;
    campus: 1 | 2;
}

export type DayOfWeek = 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu';

export interface ClassSchedule {
    classId: string;
    className: string;
    campus: 1 | 2;
    slots: ScheduleSlot[];
}

export interface TeacherSchedule {
    teacherId: string;
    teacherName: string;
    subject: string[];
    slots: ScheduleSlot[];
    totalHours: number;
}

// ============================================
// SCHEDULE CHANGE TYPES
// ============================================

export interface ScheduleChange {
    id: string;
    type: 'substitute' | 'swap' | 'cancel' | 'move';
    date: Date;
    originalSlot: ScheduleSlot;
    newSlot?: Partial<ScheduleSlot>;
    substituteTeacher?: string;
    substituteTeacherId?: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedBy: string;
    requestedAt: Date;
    approvedBy?: string;
    approvedAt?: Date;
}

// ============================================
// CALENDAR EVENT TYPES
// ============================================

export interface CalendarEvent {
    id: string;
    title: string;
    type: EventType;
    date: Date;
    endDate?: Date;
    allDay: boolean;
    description?: string;
    campus: 1 | 2 | 'both';
    affectedClasses: string[] | 'all';
    createdBy: string;
    createdAt: Date;
}

export type EventType =
    | 'holiday'       // Hari libur
    | 'exam'          // Ujian
    | 'event'         // Kegiatan sekolah
    | 'meeting'       // Rapat
    | 'competition';  // Lomba

// ============================================
// SETTINGS
// ============================================

export interface ScheduleSettings {
    defaultSlotDuration: number; // in minutes
    maxClassesPerDay: number;
    breakTimes: { start: string; end: string }[];
    schoolHours: { start: string; end: string };
    workDays: DayOfWeek[];
}
