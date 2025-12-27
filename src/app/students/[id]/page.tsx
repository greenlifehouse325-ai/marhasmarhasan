'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import StudentHeader from '@/components/students/StudentHeader';
import Tabs from '@/components/ui/Tabs';
import ProfileTab from '@/components/students/ProfileTab';
import AttendanceTab from '@/components/students/AttendanceTab';
import TasksTab from '@/components/students/TasksTab';
import PaymentsTab from '@/components/students/PaymentsTab';
import ActivityLogTab from '@/components/students/ActivityLogTab';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { ArrowLeft, User, CalendarCheck, ClipboardList, CreditCard, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock student data
const mockStudent = {
    id: '1',
    name: 'Ahmad Rizky Pratama',
    studentId: 'SMK-2024-001',
    class: 'XII RPL 1',
    email: 'ahmad.rizky@student.marhas.sch.id',
    accountStatus: 'active' as const,
    dateOfBirth: '15 March 2007',
    gender: 'Male',
    address: 'Jl. Merdeka No. 123, Jakarta Selatan',
    phone: '+62 812-3456-7890',
    enrollmentDate: '10 July 2022',
    parentName: 'Bapak Surya Pratama',
    parentPhone: '+62 811-2222-3333',
    parentEmail: 'surya.pratama@email.com',
    parentRelation: 'Father',
};

const mockAttendanceData = {
    weeklyData: [1, 1, 1, 1, 1, 0, 0],
    monthlyRate: 94,
    records: [
        { date: '27 Dec 2024', day: 'Friday', status: 'present' as const },
        { date: '26 Dec 2024', day: 'Thursday', status: 'present' as const },
        { date: '25 Dec 2024', day: 'Wednesday', status: 'present' as const },
        { date: '24 Dec 2024', day: 'Tuesday', status: 'late' as const, note: 'Arrived 15 min late' },
        { date: '23 Dec 2024', day: 'Monday', status: 'present' as const },
    ],
    riskLevel: 'low' as const,
};

const mockTasks = [
    { id: '1', title: 'Database Project Final', subject: 'Database', dueDate: '30 Dec 2024', status: 'pending' as const },
    { id: '2', title: 'UI/UX Design Review', subject: 'Design', dueDate: '28 Dec 2024', status: 'complete' as const, grade: 'A' },
    { id: '3', title: 'Networking Quiz', subject: 'Networking', dueDate: '20 Dec 2024', status: 'complete' as const, grade: 'B+' },
    { id: '4', title: 'Programming Assignment 5', subject: 'Programming', dueDate: '15 Dec 2024', status: 'complete' as const, grade: 'A-' },
];

const mockGrades = [
    { subject: 'Programming', grade: 'A', score: 92 },
    { subject: 'Database', grade: 'A-', score: 88 },
    { subject: 'Networking', grade: 'B+', score: 85 },
    { subject: 'Design', grade: 'A', score: 95 },
    { subject: 'Mathematics', grade: 'B', score: 78 },
];

const mockPayments = [
    { id: '1', description: 'Tuition - December 2024', amount: 2500000, date: '01 Dec 2024', method: 'Bank Transfer', status: 'paid' as const },
    { id: '2', description: 'Tuition - November 2024', amount: 2500000, date: '01 Nov 2024', method: 'Bank Transfer', status: 'paid' as const },
    { id: '3', description: 'Activity Fee', amount: 500000, date: '15 Oct 2024', method: 'Cash', status: 'paid' as const },
];

const mockActivities = [
    { id: '1', type: 'login' as const, title: 'Logged in to student portal', timestamp: '2 hours ago' },
    { id: '2', type: 'profile' as const, title: 'Updated profile photo', timestamp: '1 day ago' },
    { id: '3', type: 'payment' as const, title: 'Payment received for December', description: 'Rp 2,500,000', timestamp: '3 days ago' },
    { id: '4', type: 'admin' as const, title: 'Account verified by admin', description: 'Admin Rizky', timestamp: '1 week ago' },
    { id: '5', type: 'login' as const, title: 'Logged in from new device', timestamp: '2 weeks ago' },
];

const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={16} /> },
    { id: 'tasks', label: 'Tasks & Academics', icon: <ClipboardList size={16} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={16} /> },
    { id: 'activity', label: 'Activity Log', icon: <Clock size={16} /> },
];

export default function StudentDetailPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('profile');
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [accessLimited, setAccessLimited] = useState(false);

    const handleBlock = (reason?: string) => {
        console.log('Blocking student with reason:', reason);
        setShowBlockModal(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab student={mockStudent} />;
            case 'attendance':
                return <AttendanceTab {...mockAttendanceData} />;
            case 'tasks':
                return <TasksTab tasks={mockTasks} grades={mockGrades} />;
            case 'payments':
                return (
                    <PaymentsTab
                        tuitionStatus={{
                            period: 'January 2025',
                            amount: 2500000,
                            dueDate: '05 January 2025',
                            status: 'due',
                        }}
                        payments={mockPayments}
                        accessLimited={accessLimited}
                        onToggleAccess={setAccessLimited}
                    />
                );
            case 'activity':
                return <ActivityLogTab activities={mockActivities} />;
            default:
                return null;
        }
    };

    return (
        <MainLayout activeNav="students" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/students/list"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Student List
                </Link>

                {/* Student Header */}
                <StudentHeader
                    student={mockStudent}
                    onEdit={() => console.log('Edit student')}
                    onBlock={() => setShowBlockModal(true)}
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

                {/* Block Confirmation Modal */}
                <ConfirmationModal
                    isOpen={showBlockModal}
                    onClose={() => setShowBlockModal(false)}
                    onConfirm={handleBlock}
                    title="Block Student Account"
                    message="Are you sure you want to block this student's account? They will no longer be able to access the student portal."
                    confirmText="Block Account"
                    confirmVariant="danger"
                    requireReason={true}
                />
            </div>
        </MainLayout>
    );
}
