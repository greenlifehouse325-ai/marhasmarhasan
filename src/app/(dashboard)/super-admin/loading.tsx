/**
 * Loading States for Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Loading skeleton for dashboard pages
 */

import React from 'react';

export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded-xl" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                            <div className="flex-1">
                                <div className="h-6 w-16 bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div className="flex-1">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-1" />
                                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                    <div className="h-48 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
