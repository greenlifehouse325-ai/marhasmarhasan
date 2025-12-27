'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ParentFilters from '@/components/parents/ParentFilters';
import ParentTable, { Parent } from '@/components/parents/ParentTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockParents: Parent[] = [
    {
        id: '1',
        name: 'Surya Pratama',
        email: 'surya.pratama@email.com',
        phone: '+62 811-2222-3333',
        linkedStudents: ['Ahmad Rizky', 'Dewi Pratama'],
        contactStatus: 'verified',
        paymentStatus: 'good',
        accountStatus: 'active',
    },
    {
        id: '2',
        name: 'Ibu Siti Rahayu',
        email: 'siti.rahayu@email.com',
        phone: '+62 812-3333-4444',
        linkedStudents: ['Budi Santoso'],
        contactStatus: 'verified',
        paymentStatus: 'good',
        accountStatus: 'active',
    },
    {
        id: '3',
        name: 'Pak Joko Widodo',
        email: 'joko.w@email.com',
        phone: '+62 813-4444-5555',
        linkedStudents: ['Eko Prasetyo', 'Fitri Widodo'],
        contactStatus: 'pending',
        paymentStatus: 'issues',
        accountStatus: 'active',
    },
    {
        id: '4',
        name: 'Ibu Mega Wati',
        email: 'mega.wati@email.com',
        phone: '+62 814-5555-6666',
        linkedStudents: ['Hana Pertiwi'],
        contactStatus: 'verified',
        paymentStatus: 'overdue',
        accountStatus: 'limited',
    },
    {
        id: '5',
        name: 'Pak Bambang Susilo',
        email: 'bambang.s@email.com',
        phone: '+62 815-6666-7777',
        linkedStudents: ['Gunawan Wibowo'],
        contactStatus: 'unverified',
        paymentStatus: 'good',
        accountStatus: 'blocked',
    },
];

export default function ParentListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedEngagement, setSelectedEngagement] = useState('all');

    const filteredParents = mockParents.filter((parent) => {
        const matchesSearch = parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parent.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || parent.accountStatus === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <MainLayout activeNav="parents" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/parents"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-grey)] hover:text-[var(--text-dark)] mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Overview
                </Link>

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-dark)]">Parent List</h1>
                        <p className="text-sm text-[var(--text-grey)]">
                            {filteredParents.length} parents found
                        </p>
                    </div>
                    <button className="px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-orange-500/25">
                        + Add New Parent
                    </button>
                </div>

                {/* Filters */}
                <ParentFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    selectedEngagement={selectedEngagement}
                    onEngagementChange={setSelectedEngagement}
                />

                {/* Table */}
                <ParentTable parents={filteredParents} />

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <span className="text-sm text-[var(--text-grey)]">
                        Showing 1-{filteredParents.length} of {mockParents.length} parents
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
