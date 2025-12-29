/**
 * Mock Content Data
 * SMK Marhas Admin Dashboard
 */

import type { Announcement, News, Achievement, BugReport, ModerationReport } from '@/types/aplikasi';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: 'ann-001',
        title: 'Jadwal Ujian Akhir Semester Ganjil 2024/2025',
        content: 'Diberitahukan kepada seluruh siswa bahwa Ujian Akhir Semester akan dilaksanakan pada tanggal 6-17 Januari 2025. Mohon mempersiapkan diri dengan baik.',
        excerpt: 'UAS akan dilaksanakan pada tanggal 6-17 Januari 2025',
        category: 'academic',
        priority: 'high',
        targetAudience: { students: true, teachers: true, parents: true },
        publishedAt: new Date('2024-12-20'),
        status: 'published',
        views: 1234,
        createdBy: 'Admin Aplikasi',
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-20'),
    },
    {
        id: 'ann-002',
        title: 'Libur Natal dan Tahun Baru 2025',
        content: 'Sekolah akan libur mulai tanggal 25 Desember 2024 hingga 1 Januari 2025 dalam rangka Hari Raya Natal dan Tahun Baru.',
        excerpt: 'Libur 25 Desember - 1 Januari',
        category: 'holiday',
        priority: 'normal',
        targetAudience: { students: true, teachers: true, parents: true },
        publishedAt: new Date('2024-12-18'),
        status: 'published',
        views: 890,
        createdBy: 'Admin Aplikasi',
        createdAt: new Date('2024-12-18'),
        updatedAt: new Date('2024-12-18'),
    },
    {
        id: 'ann-003',
        title: 'Pendaftaran Lomba Kompetensi Siswa 2025',
        content: 'Dibuka pendaftaran LKS tingkat Kota Bandung untuk siswa kelas XII jurusan PPLG dan TMS. Pendaftaran dibuka hingga 10 Januari 2025.',
        excerpt: 'Pendaftaran LKS Tingkat Kota Bandung',
        category: 'event',
        priority: 'high',
        targetAudience: { students: true, teachers: false, parents: false, majors: ['PPLG', 'TMS'] },
        publishedAt: new Date('2024-12-22'),
        status: 'published',
        views: 456,
        createdBy: 'Admin Aplikasi',
        createdAt: new Date('2024-12-22'),
        updatedAt: new Date('2024-12-22'),
    },
    {
        id: 'ann-004',
        title: 'Pengumuman Pembayaran SPP Januari 2025',
        content: 'Batas pembayaran SPP bulan Januari adalah tanggal 10 Januari 2025. Pembayaran dapat dilakukan melalui transfer bank atau virtual account.',
        excerpt: 'Batas SPP: 10 Januari 2025',
        category: 'administrative',
        priority: 'normal',
        targetAudience: { students: false, teachers: false, parents: true },
        status: 'draft',
        views: 0,
        createdBy: 'Admin Aplikasi',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const MOCK_NEWS: News[] = [
    {
        id: 'news-001',
        title: 'Tim PPLG Raih Juara 1 di Hackathon Nasional 2024',
        content: 'Tim dari jurusan PPLG SMK Marhas berhasil meraih Juara 1 dalam Hackathon Nasional 2024 yang diselenggarakan di Jakarta.',
        excerpt: 'Tim PPLG SMK Marhas meraih Juara 1 Hackathon Nasional',
        category: 'achievement',
        images: [],
        author: 'Admin Berita',
        publishedAt: new Date('2024-12-15'),
        status: 'published',
        featured: true,
        views: 2345,
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2024-12-15'),
    },
    {
        id: 'news-002',
        title: 'Workshop IoT bersama Telkom University',
        content: 'SMK Marhas mengadakan workshop Internet of Things (IoT) bekerja sama dengan Telkom University untuk siswa kelas XI.',
        excerpt: 'Workshop IoT untuk siswa kelas XI',
        category: 'activity',
        images: [],
        author: 'Admin Berita',
        publishedAt: new Date('2024-12-10'),
        status: 'published',
        featured: false,
        views: 789,
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-10'),
    },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'ach-001',
        title: 'Juara 1 Hackathon Nasional 2024',
        description: 'Tim PPLG berhasil mengembangkan aplikasi smart city dan meraih juara pertama tingkat nasional.',
        level: 'national',
        type: 'technology',
        date: new Date('2024-12-15'),
        participants: [
            { id: 'std-001', name: 'Ahmad Rizky Pratama', class: 'XII PPLG 1' },
            { id: 'std-002', name: 'Siti Nurhaliza', class: 'XII PPLG 1' },
        ],
        medal: 'gold',
        rank: 1,
        status: 'published',
        createdBy: 'Admin Aplikasi',
        createdAt: new Date('2024-12-16'),
        updatedAt: new Date('2024-12-16'),
    },
    {
        id: 'ach-002',
        title: 'Juara 2 Olimpiade Matematika Kota Bandung',
        description: 'Siswa kelas XI meraih juara 2 dalam Olimpiade Matematika tingkat Kota Bandung.',
        level: 'city',
        type: 'academic',
        date: new Date('2024-11-20'),
        participants: [
            { id: 'std-009', name: 'Lisa Permata', class: 'XI PPLG 1' },
        ],
        medal: 'silver',
        rank: 2,
        status: 'published',
        createdBy: 'Admin Aplikasi',
        createdAt: new Date('2024-11-21'),
        updatedAt: new Date('2024-11-21'),
    },
];

export const MOCK_BUG_REPORTS: BugReport[] = [
    {
        id: 'bug-001',
        title: 'Login gagal di Android 14',
        description: 'Tidak bisa login menggunakan aplikasi di HP dengan Android 14',
        category: 'functionality',
        severity: 'high',
        platform: 'android',
        appVersion: '2.1.0',
        reporterId: 'std-003',
        reporterName: 'Budi Santoso',
        status: 'in_progress',
        assignedTo: 'Developer Team',
        createdAt: new Date('2024-12-25'),
        updatedAt: new Date('2024-12-26'),
    },
    {
        id: 'bug-002',
        title: 'Notifikasi tidak muncul',
        description: 'Push notification tidak muncul meskipun sudah diaktifkan',
        category: 'functionality',
        severity: 'medium',
        platform: 'ios',
        appVersion: '2.1.0',
        reporterId: 'std-007',
        reporterName: 'Rina Safitri',
        status: 'open',
        createdAt: new Date('2024-12-28'),
        updatedAt: new Date('2024-12-28'),
    },
];

export const MOCK_MODERATION_REPORTS: ModerationReport[] = [
    {
        id: 'mod-001',
        contentType: 'comment',
        contentId: 'cmt-123',
        contentPreview: 'Komentar tidak sopan pada postingan...',
        reportedUserId: 'usr-456',
        reportedUserName: 'User Example',
        reporterId: 'usr-789',
        reporterName: 'Reporter Name',
        reason: 'Bahasa kasar dan tidak pantas',
        status: 'pending',
        createdAt: new Date('2024-12-27'),
    },
];

export function getPublishedAnnouncements(): Announcement[] {
    return MOCK_ANNOUNCEMENTS.filter(a => a.status === 'published');
}

export function getDraftAnnouncements(): Announcement[] {
    return MOCK_ANNOUNCEMENTS.filter(a => a.status === 'draft');
}

export function getFeaturedNews(): News[] {
    return MOCK_NEWS.filter(n => n.featured && n.status === 'published');
}

export function getOpenBugReports(): BugReport[] {
    return MOCK_BUG_REPORTS.filter(b => b.status === 'open' || b.status === 'in_progress');
}

export function getPendingModerations(): ModerationReport[] {
    return MOCK_MODERATION_REPORTS.filter(m => m.status === 'pending');
}
