'use client';

import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function AttendanceOverview() {
    const checkedIn = 1245;
    const absent = 15;
    const percentage = 98;

    return (
        <div className="gradient-blue rounded-[20px] p-6 text-white relative overflow-hidden">
            {/* Background Accent Circle */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute right-4 top-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <CheckCircle size={28} className="text-white" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <p className="text-white/80 text-sm font-medium mb-3">Attendance Overview</p>

                <div className="flex items-baseline gap-8 mb-4">
                    <div>
                        <p className="text-4xl font-bold">{checkedIn.toLocaleString()}</p>
                        <p className="text-white/70 text-sm">Checked In Today</p>
                    </div>
                    <div className="h-10 w-px bg-white/30"></div>
                    <div>
                        <p className="text-4xl font-bold">{absent}</p>
                        <p className="text-white/70 text-sm">Absent Today</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Attendance Rate</span>
                        <span className="font-semibold">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-sm">
                    View Detailed Attendance
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
