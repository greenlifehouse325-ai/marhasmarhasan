/**
 * Mock Attendance Data
 * SMK Marhas Admin Dashboard
 */

import type { AttendanceSession, AttendanceRecord } from '@/types/absensi';

export const MOCK_SESSIONS: AttendanceSession[] = [
    {
        id: 'sess-001',
        title: 'Upacara Bendera',
        type: 'ceremony',
        date: new Date(),
        startTime: '07:00',
        endTime: '08:00',
        campus: 1,
        targetClasses: 'all',
        qrCode: 'QR-UPACARA-001',
        refreshInterval: 30,
        status: 'active',
        scannedCount: 1089,
        targetCount: 1247,
        createdBy: 'Admin Absensi',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'sess-002',
        title: 'Pelajaran Reguler',
        type: 'regular',
        date: new Date(),
        startTime: '07:00',
        endTime: '15:00',
        campus: 1,
        targetClasses: 'all',
        qrCode: 'QR-REGULER-001',
        refreshInterval: 30,
        status: 'active',
        scannedCount: 1156,
        targetCount: 1247,
        createdBy: 'Admin Absensi',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'sess-003',
        title: 'UAS Matematika',
        type: 'exam',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 hari lagi
        startTime: '08:00',
        endTime: '10:00',
        campus: 1,
        targetClasses: ['XII PPLG 1', 'XII PPLG 2', 'XII TMS 1'],
        qrCode: 'QR-EXAM-001',
        refreshInterval: 30,
        status: 'scheduled',
        scannedCount: 0,
        targetCount: 101,
        createdBy: 'Admin Absensi',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'sess-004',
        title: 'Workshop IT',
        type: 'event',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // Kemarin
        startTime: '09:00',
        endTime: '12:00',
        campus: 1,
        targetClasses: ['XI PPLG 1', 'XI PPLG 2'],
        qrCode: 'QR-WORKSHOP-001',
        refreshInterval: 30,
        status: 'ended',
        scannedCount: 65,
        targetCount: 67,
        createdBy: 'Admin Absensi',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
];

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
    {
        id: 'att-001',
        sessionId: 'sess-002',
        studentId: 'std-001',
        studentName: 'Ahmad Rizky Pratama',
        studentClass: 'XII PPLG 1',
        studentNIS: '12001',
        status: 'hadir',
        scanTime: new Date(new Date().setHours(7, 15)),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'att-002',
        sessionId: 'sess-002',
        studentId: 'std-002',
        studentName: 'Siti Nurhaliza',
        studentClass: 'XII PPLG 1',
        studentNIS: '12002',
        status: 'hadir',
        scanTime: new Date(new Date().setHours(7, 10)),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'att-003',
        sessionId: 'sess-002',
        studentId: 'std-003',
        studentName: 'Budi Santoso',
        studentClass: 'XI TMS 1',
        studentNIS: '12003',
        status: 'terlambat',
        scanTime: new Date(new Date().setHours(7, 45)),
        note: 'Terlambat 15 menit',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'att-004',
        sessionId: 'sess-002',
        studentId: 'std-004',
        studentName: 'Dewi Lestari',
        studentClass: 'XI TMS 1',
        studentNIS: '12004',
        status: 'izin',
        note: 'Izin mengikuti lomba',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'att-005',
        sessionId: 'sess-002',
        studentId: 'std-005',
        studentName: 'Reza Pratama',
        studentClass: 'X PPLG 1',
        studentNIS: '12005',
        status: 'sakit',
        note: 'Sakit demam',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'att-006',
        sessionId: 'sess-002',
        studentId: 'std-006',
        studentName: 'Deni Kusuma',
        studentClass: 'X TKJ 1',
        studentNIS: '12006',
        status: 'alpha',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export function getSessionById(id: string): AttendanceSession | undefined {
    return MOCK_SESSIONS.find(s => s.id === id);
}

export function getActiveSessions(): AttendanceSession[] {
    return MOCK_SESSIONS.filter(s => s.status === 'active');
}

export function getScheduledSessions(): AttendanceSession[] {
    return MOCK_SESSIONS.filter(s => s.status === 'scheduled');
}

export function getAttendanceBySession(sessionId: string): AttendanceRecord[] {
    return MOCK_ATTENDANCE_RECORDS.filter(a => a.sessionId === sessionId);
}

export function getTodayStats() {
    const records = MOCK_ATTENDANCE_RECORDS;
    return {
        hadir: records.filter(r => r.status === 'hadir').length,
        alpha: records.filter(r => r.status === 'alpha').length,
        izin: records.filter(r => r.status === 'izin').length,
        sakit: records.filter(r => r.status === 'sakit').length,
        terlambat: records.filter(r => r.status === 'terlambat').length,
        total: records.length,
    };
}
