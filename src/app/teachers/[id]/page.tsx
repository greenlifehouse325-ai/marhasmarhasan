'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import TeacherHeader from '@/components/teachers/TeacherHeader';
import Tabs from '@/components/ui/Tabs';
import TeacherProfileTab from '@/components/teachers/TeacherProfileTab';
import TeacherAttendanceTab from '@/components/teachers/TeacherAttendanceTab';
import TeacherAcademicTab from '@/components/teachers/TeacherAcademicTab';
import TeacherCashlessTab from '@/components/teachers/TeacherCashlessTab';
import TeacherBlogTab from '@/components/teachers/TeacherBlogTab';
import TeacherActivityLogTab from '@/components/teachers/TeacherActivityLogTab';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { ArrowLeft, User, CalendarCheck, BookOpen, Wallet, FileText, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockTeacher = {
    id: '1',
    name: 'Budi Santoso, S.Pd',
    teacherId: 'TCH-2024-001',
    department: 'RPL',
    subject: 'Web Development',
    email: 'budi.santoso@marhas.sch.id',
    accountStatus: 'active' as const,
    dateOfBirth: '15 May 1985',
    gender: 'Male',
    address: 'Jl. Pendidikan No. 45, Jakarta Selatan',
    phone: '+62 812-9876-5432',
    joinDate: '10 August 2018',
    employmentType: 'Full-time',
    qualification: 'Bachelor of Education',
};

const mockAttendance = {
    weeklyData: [1, 1, 1, 1, 1, 0, 0],
    monthlyRate: 96,
    lateCount: 2,
    absentCount: 1,
    records: [
        { date: '27 Dec 2024', day: 'Friday', checkIn: '07:15', checkOut: '15:30', status: 'present' as const },
        { date: '26 Dec 2024', day: 'Thursday', checkIn: '07:45', checkOut: '15:25', status: 'late' as const },
        { date: '25 Dec 2024', day: 'Wednesday', checkIn: '07:10', checkOut: '15:35', status: 'present' as const },
        { date: '24 Dec 2024', day: 'Tuesday', checkIn: '07:20', checkOut: '15:20', status: 'present' as const },
        { date: '23 Dec 2024', day: 'Monday', checkIn: '07:05', checkOut: '15:40', status: 'present' as const },
    ],
};

const mockAcademic = {
    classes: [
        { id: '1', name: 'XII RPL 1', students: 32, subject: 'Web Development' },
        { id: '2', name: 'XII RPL 2', students: 30, subject: 'Web Development' },
        { id: '3', name: 'XI RPL 1', students: 34, subject: 'Database Management' },
        { id: '4', name: 'XI RPL 2', students: 31, subject: 'Database Management' },
    ],
    gradeActivities: [
        { id: '1', class: 'XII RPL 1', subject: 'Web Dev', type: 'Final Exam Grades', submittedDate: '25 Dec 2024', status: 'submitted' as const },
        { id: '2', class: 'XII RPL 2', subject: 'Web Dev', type: 'Final Exam Grades', submittedDate: 'Due 30 Dec', status: 'pending' as const },
        { id: '3', class: 'XI RPL 1', subject: 'Database', type: 'Practical Assessment', submittedDate: '20 Dec 2024', status: 'submitted' as const },
    ],
    totalSubmissions: 24,
    pendingSubmissions: 3,
    engagementScore: 92,
};

const mockCashless = {
    balance: 1250000,
    monthlySpent: 485000,
    spendingLimit: 750000,
    transactions: [
        { id: '1', description: 'Canteen - Lunch', amount: 25000, date: '27 Dec 2024', category: 'food' },
        { id: '2', description: 'Coffee Break', amount: 15000, date: '27 Dec 2024', category: 'drink' },
        { id: '3', description: 'Office Supplies', amount: 45000, date: '26 Dec 2024', category: 'supplies' },
        { id: '4', description: 'Canteen - Lunch', amount: 28000, date: '26 Dec 2024', category: 'food' },
    ],
};

const mockBlog = {
    totalPosts: 12,
    publishedCount: 8,
    draftCount: 4,
    posts: [
        { id: '1', title: 'Introduction to React Hooks', category: 'Tutorial', publishedDate: '20 Dec 2024', status: 'published' as const, views: 245 },
        { id: '2', title: 'Best Practices in Web Development', category: 'Article', publishedDate: '15 Dec 2024', status: 'published' as const, views: 189 },
        { id: '3', title: 'Upcoming School Event Announcement', category: 'News', publishedDate: 'Draft', status: 'draft' as const, views: 0 },
        { id: '4', title: 'JavaScript ES6+ Features', category: 'Tutorial', publishedDate: '10 Dec 2024', status: 'published' as const, views: 312 },
    ],
};

const mockActivities = [
    { id: '1', type: 'login' as const, title: 'Logged in to portal', timestamp: '1 hour ago' },
    { id: '2', type: 'academic' as const, title: 'Submitted grades for XII RPL 1', description: 'Final Exam', timestamp: '3 hours ago' },
    { id: '3', type: 'blog' as const, title: 'Published new article', description: 'React Hooks Tutorial', timestamp: '2 days ago' },
    { id: '4', type: 'cashless' as const, title: 'Cashless transaction', description: 'Rp 25,000', timestamp: '2 days ago' },
    { id: '5', type: 'admin' as const, title: 'Profile updated by admin', description: 'Admin Rizky', timestamp: '1 week ago' },
];

const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={16} /> },
    { id: 'academic', label: 'Academic & Grades', icon: <BookOpen size={16} /> },
    { id: 'cashless', label: 'Cashless', icon: <Wallet size={16} /> },
    { id: 'blog', label: 'Blog & Content', icon: <FileText size={16} /> },
    { id: 'activity', label: 'Activity Log', icon: <Clock size={16} /> },
];

export default function TeacherDetailPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('profile');
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [cashlessEnabled, setCashlessEnabled] = useState(true);

    const handleSuspend = (reason?: string) => {
        console.log('Suspending teacher with reason:', reason);
        setShowSuspendModal(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <TeacherProfileTab teacher={mockTeacher} />;
            case 'attendance':
                return <TeacherAttendanceTab {...mockAttendance} />;
            case 'academic':
                return <TeacherAcademicTab {...mockAcademic} />;
            case 'cashless':
                return (
                    <TeacherCashlessTab
                        {...mockCashless}
                        cashlessEnabled={cashlessEnabled}
                        onToggleCashless={setCashlessEnabled}
                    />
                );
            case 'blog':
                return <TeacherBlogTab {...mockBlog} />;
            case 'activity':
                return <TeacherActivityLogTab activities={mockActivities} />;
            default:
                return null;
        }
    };

    return (
        <MainLayout activeNav="teachers" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/teachers/list"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Teacher List
                </Link>

                {/* Teacher Header */}
                <TeacherHeader
                    teacher={mockTeacher}
                    onEdit={() => console.log('Edit teacher')}
                    onSuspend={() => setShowSuspendModal(true)}
                    onMore={() => console.log('More options')}
                />

                {/* Tabs */}
                <div className="mt-6 mb-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Tab Content */}
                <div className="animate-fadeIn">
                    {renderTabContent()}
                </div>

                {/* Suspend Confirmation Modal */}
                <ConfirmationModal
                    isOpen={showSuspendModal}
                    onClose={() => setShowSuspendModal(false)}
                    onConfirm={handleSuspend}
                    title="Suspend Teacher Account"
                    message="Are you sure you want to suspend this teacher's account? They will no longer be able to access the system."
                    confirmText="Suspend Account"
                    confirmVariant="warning"
                    requireReason={true}
                />
            </div>
        </MainLayout>
    );
}
