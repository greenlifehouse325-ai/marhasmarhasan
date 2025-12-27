'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StudentOverviewStats from '@/components/students/StudentOverviewStats';
import { Users, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function StudentsOverviewPage() {
    return (
        <MainLayout activeNav="students" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--text-dark)]">Student Monitoring</h1>
                        <p className="text-sm text-[var(--text-grey)]">Monitor and manage all students at SMK MARHAS</p>
                    </div>
                    <Link
                        href="/students/list"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-blue)] hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                        <Users size={18} />
                        View All Students
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Stats Grid */}
                <StudentOverviewStats />

                {/* Charts Section */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    {/* Attendance Trend */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-[var(--text-dark)] flex items-center gap-2">
                                <TrendingUp size={18} className="text-[var(--primary-blue)]" />
                                Attendance Trend
                            </h3>
                            <span className="text-xs text-[var(--text-grey)]">Last 7 days</span>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="flex items-end justify-between h-40 px-4">
                            {[85, 92, 88, 95, 90, 78, 94].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div
                                        className="w-8 bg-[var(--primary-blue)] rounded-t-lg transition-all hover:bg-blue-600"
                                        style={{ height: `${value}%` }}
                                    />
                                    <span className="text-xs text-[var(--text-grey)]">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[var(--primary-blue)]" />
                                <span className="text-xs text-[var(--text-grey)]">Present Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Risk Indicators */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-[var(--text-dark)] flex items-center gap-2">
                                <AlertTriangle size={18} className="text-orange-500" />
                                Students at Risk
                            </h3>
                            <Link href="/students/list?filter=risk" className="text-xs text-[var(--primary-blue)] hover:underline">
                                View All →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: 'Attendance Issues', count: 32, color: 'bg-orange-500', bgColor: 'bg-orange-50' },
                                { label: 'Payment Overdue', count: 18, color: 'bg-red-500', bgColor: 'bg-red-50' },
                                { label: 'Missing Assignments', count: 45, color: 'bg-purple-500', bgColor: 'bg-purple-50' },
                                { label: 'Account Blocked', count: 5, color: 'bg-gray-500', bgColor: 'bg-gray-50' },
                            ].map((item, index) => (
                                <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${item.bgColor}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                        <span className="text-sm text-[var(--text-dark)]">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-[var(--text-dark)]">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                    {[
                        { label: 'Add New Student', icon: <Users size={20} />, color: 'text-blue-500', bgColor: 'bg-blue-50' },
                        { label: 'Import Students', icon: <Users size={20} />, color: 'text-green-500', bgColor: 'bg-green-50' },
                        { label: 'Export Data', icon: <Users size={20} />, color: 'text-purple-500', bgColor: 'bg-purple-50' },
                        { label: 'Bulk Actions', icon: <Users size={20} />, color: 'text-orange-500', bgColor: 'bg-orange-50' },
                    ].map((action, index) => (
                        <button
                            key={index}
                            className="card card-hover flex items-center gap-3 py-4"
                        >
                            <div className={`w-10 h-10 rounded-xl ${action.bgColor} flex items-center justify-center`}>
                                <span className={action.color}>{action.icon}</span>
                            </div>
                            <span className="text-sm font-medium text-[var(--text-dark)]">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
