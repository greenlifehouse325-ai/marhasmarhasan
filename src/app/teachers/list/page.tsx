'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TeacherFilters from '@/components/teachers/TeacherFilters';
import TeacherTable, { Teacher } from '@/components/teachers/TeacherTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockTeachers: Teacher[] = [
    {
        id: '1',
        name: 'Budi Santoso, S.Pd',
        teacherId: 'TCH-2024-001',
        department: 'RPL',
        subject: 'Web Development',
        attendanceStatus: 'present',
        academicStatus: 'active',
        cashlessStatus: 'active',
        accountStatus: 'active',
    },
    {
        id: '2',
        name: 'Siti Rahayu, M.Pd',
        teacherId: 'TCH-2024-002',
        department: 'TKJ',
        subject: 'Computer Networks',
        attendanceStatus: 'present',
        academicStatus: 'active',
        cashlessStatus: 'active',
        accountStatus: 'active',
    },
    {
        id: '3',
        name: 'Ahmad Wijaya, S.Kom',
        teacherId: 'TCH-2024-003',
        department: 'RPL',
        subject: 'Database Management',
        attendanceStatus: 'late',
        academicStatus: 'moderate',
        cashlessStatus: 'limited',
        accountStatus: 'active',
    },
    {
        id: '4',
        name: 'Dewi Lestari, S.Pd',
        teacherId: 'TCH-2024-004',
        department: 'General',
        subject: 'Mathematics',
        attendanceStatus: 'present',
        academicStatus: 'active',
        cashlessStatus: 'active',
        accountStatus: 'active',
    },
    {
        id: '5',
        name: 'Eko Prasetyo, M.Kom',
        teacherId: 'TCH-2024-005',
        department: 'MM',
        subject: 'Graphic Design',
        attendanceStatus: 'leave',
        academicStatus: 'inactive',
        cashlessStatus: 'disabled',
        accountStatus: 'limited',
    },
    {
        id: '6',
        name: 'Fitri Handayani, S.Pd',
        teacherId: 'TCH-2024-006',
        department: 'Normatif',
        subject: 'Indonesian Language',
        attendanceStatus: 'present',
        academicStatus: 'active',
        cashlessStatus: 'active',
        accountStatus: 'active',
    },
    {
        id: '7',
        name: 'Gunawan Wibowo, S.T',
        teacherId: 'TCH-2024-007',
        department: 'TKJ',
        subject: 'Linux Administration',
        attendanceStatus: 'absent',
        academicStatus: 'moderate',
        cashlessStatus: 'active',
        accountStatus: 'suspended',
    },
    {
        id: '8',
        name: 'Hana Pertiwi, M.Pd',
        teacherId: 'TCH-2024-008',
        department: 'General',
        subject: 'English',
        attendanceStatus: 'present',
        academicStatus: 'active',
        cashlessStatus: 'active',
        accountStatus: 'active',
    },
];

export default function TeacherListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Filter teachers
    const filteredTeachers = mockTeachers.filter((teacher) => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDepartment === 'all' || teacher.department.toLowerCase() === selectedDepartment;
        const matchesStatus = selectedStatus === 'all' || teacher.accountStatus === selectedStatus;
        return matchesSearch && matchesDept && matchesStatus;
    });

    return (
        <MainLayout activeNav="teachers" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/teachers"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Overview
                </Link>

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--text-dark)]">Teacher List</h1>
                        <p className="text-sm text-[var(--text-grey)]">
                            {filteredTeachers.length} teachers found
                        </p>
                    </div>
                    <button className="px-5 py-2.5 bg-[var(--primary-blue)] hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
                        + Add New Teacher
                    </button>
                </div>

                {/* Filters */}
                <TeacherFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedDepartment={selectedDepartment}
                    onDepartmentChange={setSelectedDepartment}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                />

                {/* Table */}
                <TeacherTable teachers={filteredTeachers} />

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-[var(--text-grey)]">
                        Showing 1-{filteredTeachers.length} of {mockTeachers.length} teachers
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
