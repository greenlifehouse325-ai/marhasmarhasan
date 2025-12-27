'use client';

import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react';

interface ActivityItem {
    id: string;
    user: string;
    action: string;
    time: string;
}

const recentActivities: ActivityItem[] = [
    { id: '1', user: 'Admin Rizky', action: 'Updated attendance', time: '2 hours ago' },
    { id: '2', user: 'Admin Rizky', action: 'Created announcement', time: '2 hours ago' },
    { id: '3', user: 'Admin Rizky', action: 'Added new student', time: '3 hours ago' },
];

const aiAlerts = [
    { id: '1', message: 'Show students with abnormal attendance today', color: 'text-orange-500' },
    { id: '2', message: 'Show students with absent attendance', color: 'text-red-500' },
];

export default function RightPanel() {
    return (
        <aside className="w-[280px] h-screen sticky top-0 py-6 px-4 flex flex-col gap-5">
            {/* Checked In Today Card */}
            <div className="card">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-blue)]/10 flex items-center justify-center">
                        <TrendingUp size={20} className="text-[var(--primary-blue)]" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-[var(--text-dark)]">1,245</p>
                        <p className="text-xs text-[var(--text-grey)]">Checked In Today</p>
                    </div>
                </div>
            </div>

            {/* Absent Today Card */}
            <div className="card">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                        <TrendingDown size={20} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-[var(--text-dark)]">15</p>
                        <p className="text-xs text-[var(--text-grey)]">Absent Today</p>
                    </div>
                </div>
            </div>

            {/* AI Alerts */}
            <div className="card">
                <h3 className="font-medium text-[var(--text-dark)] text-sm mb-3">Recent AI Alerts</h3>
                <div className="flex flex-col gap-3">
                    {aiAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-2">
                            <AlertCircle size={14} className={alert.color} />
                            <p className="text-xs text-[var(--text-grey)] leading-relaxed">{alert.message}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card flex-1">
                <h3 className="font-medium text-[var(--text-dark)] text-sm mb-3">Recent activity</h3>
                <div className="flex flex-col gap-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                AR
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--text-dark)] truncate">{activity.user}</p>
                                <div className="flex items-center gap-1 text-xs text-[var(--text-grey)]">
                                    <Clock size={10} />
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
