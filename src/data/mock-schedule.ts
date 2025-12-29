/**
 * Mock Schedule Data
 * SMK Marhas Admin Dashboard
 */

import type { ScheduleSlot, ClassSchedule, CalendarEvent, ScheduleChange } from '@/types/jadwal';

const TIME_SLOTS = [
    { start: '07:00', end: '07:45' },
    { start: '07:45', end: '08:30' },
    { start: '08:30', end: '09:15' },
    { start: '09:15', end: '10:00' },
    { start: '10:15', end: '11:00' }, // After break
    { start: '11:00', end: '11:45' },
    { start: '12:30', end: '13:15' }, // After lunch
    { start: '13:15', end: '14:00' },
    { start: '14:00', end: '14:45' },
];

export const MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
    // Senin - XII PPLG 1
    { id: 'slot-001', day: 'senin', startTime: '07:00', endTime: '08:30', subject: 'Pemrograman Web', teacher: 'Pak Rudi', teacherId: 'tch-001', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 1', campus: 1 },
    { id: 'slot-002', day: 'senin', startTime: '08:30', endTime: '10:00', subject: 'Basis Data', teacher: 'Bu Sari', teacherId: 'tch-002', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 2', campus: 1 },
    { id: 'slot-003', day: 'senin', startTime: '10:15', endTime: '11:45', subject: 'Matematika', teacher: 'Pak Budi', teacherId: 'tch-003', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },
    { id: 'slot-004', day: 'senin', startTime: '12:30', endTime: '14:00', subject: 'Bahasa Inggris', teacher: 'Bu Nina', teacherId: 'tch-004', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },

    // Selasa - XII PPLG 1
    { id: 'slot-005', day: 'selasa', startTime: '07:00', endTime: '08:30', subject: 'Pemrograman Mobile', teacher: 'Pak Ahmad', teacherId: 'tch-005', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 1', campus: 1 },
    { id: 'slot-006', day: 'selasa', startTime: '08:30', endTime: '10:00', subject: 'Jaringan Komputer', teacher: 'Pak Dedi', teacherId: 'tch-006', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab Jaringan', campus: 1 },
    { id: 'slot-007', day: 'selasa', startTime: '10:15', endTime: '11:45', subject: 'Bahasa Indonesia', teacher: 'Bu Rina', teacherId: 'tch-007', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },
    { id: 'slot-008', day: 'selasa', startTime: '12:30', endTime: '14:00', subject: 'PKn', teacher: 'Pak Joko', teacherId: 'tch-008', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },

    // Rabu - XII PPLG 1
    { id: 'slot-009', day: 'rabu', startTime: '07:00', endTime: '08:30', subject: 'Pemrograman Web', teacher: 'Pak Rudi', teacherId: 'tch-001', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 1', campus: 1 },
    { id: 'slot-010', day: 'rabu', startTime: '08:30', endTime: '10:00', subject: 'Desain Grafis', teacher: 'Bu Maya', teacherId: 'tch-009', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab Multimedia', campus: 1 },
    { id: 'slot-011', day: 'rabu', startTime: '10:15', endTime: '11:45', subject: 'Fisika', teacher: 'Pak Bambang', teacherId: 'tch-010', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },
    { id: 'slot-012', day: 'rabu', startTime: '12:30', endTime: '14:00', subject: 'PAI', teacher: 'Pak Hasan', teacherId: 'tch-011', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },

    // Kamis - XII PPLG 1
    { id: 'slot-013', day: 'kamis', startTime: '07:00', endTime: '08:30', subject: 'Basis Data', teacher: 'Bu Sari', teacherId: 'tch-002', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 2', campus: 1 },
    { id: 'slot-014', day: 'kamis', startTime: '08:30', endTime: '10:00', subject: 'Pemrograman Mobile', teacher: 'Pak Ahmad', teacherId: 'tch-005', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 1', campus: 1 },
    { id: 'slot-015', day: 'kamis', startTime: '10:15', endTime: '11:45', subject: 'Olahraga', teacher: 'Pak Fajar', teacherId: 'tch-012', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lapangan', campus: 1 },
    { id: 'slot-016', day: 'kamis', startTime: '12:30', endTime: '14:00', subject: 'Kewirausahaan', teacher: 'Bu Tina', teacherId: 'tch-013', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },

    // Jumat - XII PPLG 1
    { id: 'slot-017', day: 'jumat', startTime: '07:00', endTime: '08:30', subject: 'Pemrograman Web', teacher: 'Pak Rudi', teacherId: 'tch-001', classId: 'cls-010', className: 'XII PPLG 1', room: 'Lab 1', campus: 1 },
    { id: 'slot-018', day: 'jumat', startTime: '08:30', endTime: '10:00', subject: 'Matematika', teacher: 'Pak Budi', teacherId: 'tch-003', classId: 'cls-010', className: 'XII PPLG 1', room: 'Kelas A1', campus: 1 },
    { id: 'slot-019', day: 'jumat', startTime: '10:15', endTime: '11:00', subject: 'Shalat Jumat', teacher: '-', teacherId: '', classId: 'cls-010', className: 'XII PPLG 1', room: 'Masjid', campus: 1 },
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
    {
        id: 'evt-001',
        title: 'Libur Natal & Tahun Baru',
        type: 'holiday',
        date: new Date('2024-12-25'),
        endDate: new Date('2025-01-01'),
        allDay: true,
        campus: 'both',
        affectedClasses: 'all',
        createdBy: 'Admin Jadwal',
        createdAt: new Date('2024-12-01'),
    },
    {
        id: 'evt-002',
        title: 'UAS Semester Ganjil',
        type: 'exam',
        date: new Date('2025-01-06'),
        endDate: new Date('2025-01-17'),
        allDay: true,
        description: 'Ujian Akhir Semester Ganjil TP 2024/2025',
        campus: 'both',
        affectedClasses: 'all',
        createdBy: 'Admin Jadwal',
        createdAt: new Date('2024-12-01'),
    },
    {
        id: 'evt-003',
        title: 'Lomba Kompetensi Siswa',
        type: 'competition',
        date: new Date('2025-01-20'),
        endDate: new Date('2025-01-22'),
        allDay: true,
        description: 'LKS Tingkat Kota Bandung',
        campus: 1,
        affectedClasses: ['XII PPLG 1', 'XII PPLG 2'],
        createdBy: 'Admin Jadwal',
        createdAt: new Date('2024-12-15'),
    },
    {
        id: 'evt-004',
        title: 'Rapat Guru',
        type: 'meeting',
        date: new Date('2025-01-25'),
        allDay: false,
        description: 'Rapat koordinasi semester genap',
        campus: 'both',
        affectedClasses: 'all',
        createdBy: 'Admin Jadwal',
        createdAt: new Date('2024-12-20'),
    },
];

export const MOCK_SCHEDULE_CHANGES: ScheduleChange[] = [
    {
        id: 'chg-001',
        type: 'substitute',
        date: new Date(),
        originalSlot: MOCK_SCHEDULE_SLOTS[0],
        substituteTeacher: 'Pak Andi',
        substituteTeacherId: 'tch-014',
        reason: 'Pak Rudi izin sakit',
        status: 'pending',
        requestedBy: 'Admin Jadwal',
        requestedAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
        id: 'chg-002',
        type: 'cancel',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24),
        originalSlot: MOCK_SCHEDULE_SLOTS[5],
        reason: 'Guru mengikuti pelatihan',
        status: 'approved',
        requestedBy: 'Admin Jadwal',
        requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        approvedBy: 'Kepala Sekolah',
        approvedAt: new Date(Date.now() - 1000 * 60 * 60),
    },
];

export function getScheduleByClass(classId: string): ScheduleSlot[] {
    return MOCK_SCHEDULE_SLOTS.filter(s => s.classId === classId);
}

export function getScheduleByDay(day: string): ScheduleSlot[] {
    return MOCK_SCHEDULE_SLOTS.filter(s => s.day === day);
}

export function getScheduleByTeacher(teacherId: string): ScheduleSlot[] {
    return MOCK_SCHEDULE_SLOTS.filter(s => s.teacherId === teacherId);
}

export function getTodaySchedule(classId: string): ScheduleSlot[] {
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const today = days[new Date().getDay()];
    return MOCK_SCHEDULE_SLOTS.filter(s => s.classId === classId && s.day === today);
}
