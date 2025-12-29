/**
 * Login Loading State
 * SMK Marhas Admin Dashboard
 */

import React from 'react';

export default function LoginLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="w-full max-w-md mx-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div>
                            <div className="h-4 w-12 bg-gray-200 rounded mb-2" />
                            <div className="h-12 bg-gray-200 rounded-xl" />
                        </div>
                        <div>
                            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                            <div className="h-12 bg-gray-200 rounded-xl" />
                        </div>
                        <div className="h-12 bg-gray-200 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
