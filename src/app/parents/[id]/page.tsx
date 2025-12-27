'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ParentHeader from '@/components/parents/ParentHeader';
import Tabs from '@/components/ui/Tabs';
import ParentProfileTab from '@/components/parents/ParentProfileTab';
import LinkedStudentsTab from '@/components/parents/LinkedStudentsTab';
import PaymentMonitoringTab from '@/components/parents/PaymentMonitoringTab';
import ParentBlogTab from '@/components/parents/ParentBlogTab';
import ParentActivityLogTab from '@/components/parents/ParentActivityLogTab';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { ArrowLeft, User, Users, CreditCard, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockParent = {
    id: '1',
    name: 'Surya Pratama',
    email: 'surya.pratama@email.com',
    phone: '+62 811-2222-3333',
    address: 'Jl. Merdeka No. 123, Jakarta Selatan 12345',
    relation: 'Father',
    occupation: 'Business Owner',
    registeredDate: '15 August 2022',
    accountStatus: 'active' as const,
};

const mockStudents = [
    { id: '1', name: 'Ahmad Rizky Pratama', studentId: 'SMK-2024-001', class: 'XII RPL 1', relation: 'Son', attendanceRate: 94, paymentStatus: 'paid' as const },
    { id: '2', name: 'Dewi Pratama', studentId: 'SMK-2024-045', class: 'X RPL 2', relation: 'Daughter', attendanceRate: 98, paymentStatus: 'paid' as const },
];

const mockStudentPayments = [
    { studentId: '1', studentName: 'Ahmad Rizky', class: 'XII RPL 1', currentStatus: 'paid' as const, amount: 2500000, dueDate: '05 Jan 2025', lastPaymentDate: '28 Dec 2024' },
    { studentId: '2', studentName: 'Dewi Pratama', class: 'X RPL 2', currentStatus: 'due' as const, amount: 2500000, dueDate: '05 Jan 2025' },
];

const mockPaymentHistory = [
    { id: '1', studentName: 'Ahmad Rizky', description: 'SPP December 2024', amount: 2500000, date: '28 Dec 2024', status: 'paid' as const },
    { id: '2', studentName: 'Dewi Pratama', description: 'SPP December 2024', amount: 2500000, date: '27 Dec 2024', status: 'paid' as const },
    { id: '3', studentName: 'Ahmad Rizky', description: 'SPP November 2024', amount: 2500000, date: '25 Nov 2024', status: 'paid' as const },
];

const mockBlogPosts = [
    { id: '1', title: 'Year-End Academic Report Guide', category: 'Academic', publishedDate: '20 Dec 2024', isRead: true },
    { id: '2', title: 'Holiday Schedule Announcement', category: 'News', publishedDate: '18 Dec 2024', isRead: true },
    { id: '3', title: 'Parent-Teacher Meeting Invitation', category: 'Event', publishedDate: '15 Dec 2024', isRead: false },
];

const mockAnnouncements = [
    { id: '1', title: 'SPP Payment Deadline Reminder', priority: 'high' as const, date: '25 Dec 2024', isRead: true },
    { id: '2', title: 'School Reopening Schedule', priority: 'medium' as const, date: '22 Dec 2024', isRead: true },
    { id: '3', title: 'New Parent Portal Features', priority: 'low' as const, date: '20 Dec 2024', isRead: false },
];

const mockActivities = [
    { id: '1', type: 'login' as const, title: 'Logged in to parent portal', timestamp: '2 hours ago' },
    { id: '2', type: 'content' as const, title: 'Viewed academic report', description: 'Ahmad Rizky - Semester 1', timestamp: '3 hours ago' },
    { id: '3', type: 'payment' as const, title: 'Viewed payment status', timestamp: '1 day ago' },
    { id: '4', type: 'content' as const, title: 'Read announcement', description: 'SPP Payment Deadline', timestamp: '2 days ago' },
    { id: '5', type: 'admin' as const, title: 'Account verified', description: 'By Admin Rizky', timestamp: '1 week ago' },
];

const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'students', label: 'Linked Students', icon: <Users size={16} /> },
    { id: 'payments', label: 'Payment Monitoring', icon: <CreditCard size={16} /> },
    { id: 'blog', label: 'Blog & Announcements', icon: <BookOpen size={16} /> },
    { id: 'activity', label: 'Activity Log', icon: <Clock size={16} /> },
];

export default function ParentDetailPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showBlockModal, setShowBlockModal] = useState(false);

    const handleBlock = (reason?: string) => {
        console.log('Blocking parent with reason:', reason);
        setShowBlockModal(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ParentProfileTab parent={mockParent} />;
            case 'students':
                return <LinkedStudentsTab students={mockStudents} />;
            case 'payments':
                return <PaymentMonitoringTab studentPayments={mockStudentPayments} paymentHistory={mockPaymentHistory} />;
            case 'blog':
                return <ParentBlogTab blogPosts={mockBlogPosts} announcements={mockAnnouncements} totalViews={42} engagementRate={78} />;
            case 'activity':
                return <ParentActivityLogTab activities={mockActivities} />;
            default:
                return null;
        }
    };

    return (
        <MainLayout activeNav="parents" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/parents/list"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Parent List
                </Link>

                {/* Parent Header */}
                <ParentHeader
                    parent={mockParent}
                    onEdit={() => console.log('Edit parent')}
                    onBlock={() => setShowBlockModal(true)}
                    onMore={() => console.log('More options')}
                />

                {/* Tabs */}
                <div className="mt-6 mb-6 overflow-x-auto">
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
                    title="Block Parent Account"
                    message="Are you sure you want to block this parent's account? They will no longer be able to access the parent portal."
                    confirmText="Block Account"
                    confirmVariant="danger"
                    requireReason={true}
                />
            </div>
        </MainLayout>
    );
}
