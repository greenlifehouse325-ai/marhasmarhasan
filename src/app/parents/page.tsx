'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ParentOverviewStats from '@/components/parents/ParentOverviewStats';
import { UserCircle, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ParentsOverviewPage() {
    return (
        <MainLayout activeNav="parents" showRightPanel={false}>
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-dark)]">Parent Monitoring</h1>
                        <p className="text-sm text-[var(--text-grey)]">Monitor parents and guardians at SMK MARHAS</p>
                    </div>
                    <Link
                        href="/parents/list"
                        className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-orange-500/25"
                    >
                        <UserCircle size={18} />
                        <span className="hidden sm:inline">View All Parents</span>
                        <span className="sm:hidden">View All</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Stats Grid */}
                <ParentOverviewStats />

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
                    {/* Login Activity */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-[var(--text-dark)] flex items-center gap-2">
                                <TrendingUp size={18} className="text-amber-500" />
                                Login Activity
                            </h3>
                            <span className="text-xs text-[var(--text-grey)]">Last 7 days</span>
                        </div>

                        <div className="flex items-end justify-between h-32 md:h-40 px-2 md:px-4">
                            {[65, 78, 82, 70, 88, 75, 90].map((value, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div
                                        className="w-6 md:w-8 bg-gradient-to-t from-amber-500 to-orange-400 rounded-t-lg transition-all hover:from-amber-600 hover:to-orange-500"
                                        style={{ height: `${value}%` }}
                                    />
                                    <span className="text-[10px] md:text-xs text-[var(--text-grey)]">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Engagement Summary */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-[var(--text-dark)] flex items-center gap-2">
                                <Activity size={18} className="text-purple-500" />
                                Engagement Summary
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: 'Read Announcements', percentage: 85, color: 'bg-green-500' },
                                { label: 'Viewed Grades', percentage: 72, color: 'bg-blue-500' },
                                { label: 'Checked Attendance', percentage: 68, color: 'bg-amber-500' },
                                { label: 'Viewed Payment Info', percentage: 91, color: 'bg-purple-500' },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-[var(--text-grey)]">{item.label}</span>
                                        <span className="font-medium text-[var(--text-dark)]">{item.percentage}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                    {[
                        { label: 'Add Parent', color: 'text-amber-600', bgColor: 'bg-amber-50' },
                        { label: 'Link Student', color: 'text-blue-600', bgColor: 'bg-blue-50' },
                        { label: 'Send Notification', color: 'text-purple-600', bgColor: 'bg-purple-50' },
                        { label: 'Export Data', color: 'text-green-600', bgColor: 'bg-green-50' },
                    ].map((action, index) => (
                        <button
                            key={index}
                            className="card card-hover flex items-center gap-3 py-3 md:py-4"
                        >
                            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${action.bgColor} flex items-center justify-center`}>
                                <UserCircle size={18} className={action.color} />
                            </div>
                            <span className="text-xs md:text-sm font-medium text-[var(--text-dark)]">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
