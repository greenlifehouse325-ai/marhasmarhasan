'use client';

import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, Users } from 'lucide-react';

interface ProfileTabProps {
    student: {
        name: string;
        studentId: string;
        dateOfBirth: string;
        gender: string;
        address: string;
        phone: string;
        email: string;
        enrollmentDate: string;
        parentName: string;
        parentPhone: string;
        parentEmail: string;
        parentRelation: string;
    };
}

export default function ProfileTab({ student }: ProfileTabProps) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Student Identity */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <User size={18} className="text-[var(--primary-blue)]" />
                    Student Identity
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Full Name</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Student ID</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Date of Birth</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Gender</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.gender}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Enrollment Date</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.enrollmentDate}</span>
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
                        <span className="text-sm font-medium text-[var(--text-dark)] text-right max-w-[200px]">{student.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Phone</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Email</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{student.email}</span>
                    </div>
                </div>
            </div>

            {/* Parent / Guardian */}
            <div className="card col-span-2">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <Users size={18} className="text-[var(--primary-blue)]" />
                    Parent / Guardian Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Name</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{student.parentName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Relation</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{student.parentRelation}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Phone</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{student.parentPhone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--text-grey)]">Email</span>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{student.parentEmail}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
