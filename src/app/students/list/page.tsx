'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StudentFilters from '@/components/students/StudentFilters';
import StudentTable, { Student } from '@/components/students/StudentTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockStudents: Student[] = [
    {
        id: '1',
        name: 'Ahmad Rizky Pratama',
        studentId: 'SMK-2024-001',
        class: 'XII RPL 1',
        attendanceStatus: 'present',
        taskStatus: 'complete',
        paymentStatus: 'paid',
        accountStatus: 'active',
    },
    {
        id: '2',
        name: 'Siti Nurhaliza',
        studentId: 'SMK-2024-002',
        class: 'XII RPL 1',
        attendanceStatus: 'late',
        taskStatus: 'pending',
        paymentStatus: 'due',
        accountStatus: 'active',
    },
    {
        id: '3',
        name: 'Budi Santoso',
        studentId: 'SMK-2024-003',
        class: 'XII RPL 2',
        attendanceStatus: 'absent',
        taskStatus: 'overdue',
        paymentStatus: 'overdue',
        accountStatus: 'limited',
    },
    {
        id: '4',
        name: 'Dewi Lestari',
        studentId: 'SMK-2024-004',
        class: 'XI RPL 1',
        attendanceStatus: 'present',
        taskStatus: 'complete',
        paymentStatus: 'paid',
        accountStatus: 'active',
    },
    {
        id: '5',
        name: 'Eko Prasetyo',
        studentId: 'SMK-2024-005',
        class: 'XI RPL 1',
        attendanceStatus: 'excused',
        taskStatus: 'pending',
        paymentStatus: 'paid',
        accountStatus: 'active',
    },
    {
        id: '6',
        name: 'Fitri Handayani',
        studentId: 'SMK-2024-006',
        class: 'XI RPL 2',
        attendanceStatus: 'present',
        taskStatus: 'complete',
        paymentStatus: 'paid',
        accountStatus: 'active',
    },
    {
        id: '7',
        name: 'Gunawan Wibowo',
        studentId: 'SMK-2024-007',
        class: 'X RPL 1',
        attendanceStatus: 'present',
        taskStatus: 'pending',
        paymentStatus: 'due',
        accountStatus: 'active',
    },
    {
        id: '8',
        name: 'Hana Pertiwi',
        studentId: 'SMK-2024-008',
        class: 'X RPL 2',
        attendanceStatus: 'absent',
        taskStatus: 'overdue',
        paymentStatus: 'overdue',
        accountStatus: 'blocked',
    },
];

export default function StudentListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Filter students
    const filteredStudents = mockStudents.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesClass = selectedClass === 'all' || student.class.toLowerCase().replace(' ', '-') === selectedClass;
        const matchesStatus = selectedStatus === 'all' || student.accountStatus === selectedStatus;
        return matchesSearch && matchesClass && matchesStatus;
    });

    return (
        <MainLayout activeNav="students" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/students"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Overview
                </Link>

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--text-dark)]">Student List</h1>
                        <p className="text-sm text-[var(--text-grey)]">
                            {filteredStudents.length} students found
                        </p>
                    </div>
                    <button className="px-5 py-2.5 bg-[var(--primary-blue)] hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
                        + Add New Student
                    </button>
                </div>

                {/* Filters */}
                <StudentFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedClass={selectedClass}
                    onClassChange={setSelectedClass}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                />

                {/* Table */}
                <StudentTable students={filteredStudents} />

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-[var(--text-grey)]">
                        Showing 1-{filteredStudents.length} of {mockStudents.length} students
                    </span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-[var(--text-grey)] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-[var(--text-grey)] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
