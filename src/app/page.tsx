'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AttendanceOverview from '@/components/dashboard/AttendanceOverview';
import AIAssistantCard from '@/components/dashboard/AIAssistantCard';
import QuickActions from '@/components/dashboard/QuickActions';
import SchoolUpdates from '@/components/dashboard/SchoolUpdates';

export default function Dashboard() {
  return (
    <MainLayout
      activeNav="dashboard"
      adminName="Admin Rizky"
      showRightPanel={true}
    >
      {/* Dashboard Content */}
      <div className="flex flex-col gap-6 animate-fadeIn">
        {/* Hero Section: Attendance + AI Assistant */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <AttendanceOverview />
          </div>
          <div className="col-span-1">
            <AIAssistantCard />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* School Updates */}
        <SchoolUpdates />
      </div>
    </MainLayout>
  );
}
