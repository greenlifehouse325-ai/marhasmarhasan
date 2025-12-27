'use client';

import React from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';

interface ParentProfileTabProps {
    parent: {
        name: string;
        email: string;
        phone: string;
        address: string;
        relation: string;
        occupation: string;
        registeredDate: string;
    };
}

export default function ParentProfileTab({ parent }: ParentProfileTabProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Personal Information */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <User size={18} className="text-amber-500" />
                    Personal Information
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Full Name</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{parent.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Relation</span>
                        <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{parent.relation}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Occupation</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{parent.occupation}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[var(--text-grey)]">Registered</span>
                        <span className="text-sm font-medium text-[var(--text-dark)]">{parent.registeredDate}</span>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="card">
                <h3 className="text-base font-semibold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                    <Phone size={18} className="text-amber-500" />
                    Contact Information
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-sm text-[var(--text-dark)] break-all">{parent.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-sm text-[var(--text-dark)]">{parent.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-dark)]">{parent.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
