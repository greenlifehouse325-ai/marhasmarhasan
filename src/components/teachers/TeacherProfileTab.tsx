'use client';

import React from 'react';
import { User, Phone, Briefcase, Calendar } from 'lucide-react';

interface TeacherProfileTabProps {
    teacher: {
        name: string;
        teacherId: string;
        dateOfBirth: string;
        gender: string;
        address: string;
        phone: string;
        email: string;
        joinDate: string;
        department: string;
        subject: string;
        employmentType: string;
        qualification: string;
    };
}

export default function TeacherProfileTab({ teacher }: TeacherProfileTabProps) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <User size={18} className="text-[var(--primary-blue)]" />
                    Personal Information
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Full Name</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Teacher ID</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.teacherId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Date of Birth</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Gender</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.gender}</span>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <Phone size={18} className="text-[var(--primary-blue)]" />
                    Contact Information
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <span className="text-sm text-[var(--text-grey)]">Address</span>
                        <span className="text-sm font-medium text-[var(--text-dark)] text-right max-w-[200px]">{teacher.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Phone</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Email</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.email}</span>
                    </div>
                </div>
            </div>

            {/* Employment Information */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <Briefcase size={18} className="text-[var(--primary-blue)]" />
                    Employment Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Department</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.department}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Subject</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.subject}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Join Date</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Employment Type</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.employmentType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Qualification</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{teacher.qualification}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
