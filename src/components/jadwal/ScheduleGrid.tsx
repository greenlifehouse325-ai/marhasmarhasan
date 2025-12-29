/**
 * Schedule Grid Component
 * SMK Marhas Admin Dashboard - Jadwal
 * 
 * Komponen grid jadwal mingguan
 */

'use client';

import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import type { ScheduleSlot } from '@/types/jadwal';

interface ScheduleGridProps {
    slots: ScheduleSlot[];
    days?: string[];
    timeSlots?: string[];
}

const DEFAULT_DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const DEFAULT_TIME_SLOTS = [
    '07:00 - 08:30',
    '08:30 - 10:00',
    '10:15 - 11:45',
    '12:30 - 14:00',
    '14:00 - 15:30',
];

export function ScheduleGrid({
    slots,
    days = DEFAULT_DAYS,
    timeSlots = DEFAULT_TIME_SLOTS,
}: ScheduleGridProps) {
    const getSlot = (day: string, time: string): ScheduleSlot | undefined => {
        return slots.find((s) => s.day === day && s.startTime === time.split(' - ')[0]);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 w-32">
                                Waktu
                            </th>
                            {days.map((day) => (
                                <th
                                    key={day}
                                    className="px-4 py-3 text-center text-sm font-medium text-gray-500"
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {timeSlots.map((time) => (
                            <tr key={time}>
                                <td className="px-4 py-3 text-sm text-gray-600 font-medium align-top">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {time}
                                    </div>
                                </td>
                                {days.map((day) => {
                                    const slot = getSlot(day, time);
                                    return (
                                        <td key={day} className="px-2 py-2 align-top">
                                            {slot ? (
                                                <ScheduleSlotCard slot={slot} />
                                            ) : (
                                                <div className="h-20 bg-gray-50 rounded-lg border border-dashed border-gray-200" />
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ScheduleSlotCard({ slot }: { slot: ScheduleSlot }) {
    const colors = [
        'from-blue-400 to-blue-500',
        'from-purple-400 to-purple-500',
        'from-emerald-400 to-emerald-500',
        'from-pink-400 to-pink-500',
        'from-amber-400 to-amber-500',
    ];
    const colorIndex = slot.subject.length % colors.length;
    const gradient = colors[colorIndex];

    return (
        <div
            className={`h-20 p-2 rounded-lg bg-gradient-to-br ${gradient} text-white text-xs`}
        >
            <p className="font-semibold truncate">{slot.subject}</p>
            <div className="mt-1 space-y-0.5 opacity-90">
                <p className="flex items-center gap-1 truncate">
                    <User size={10} />
                    {slot.teacher}
                </p>
                <p className="flex items-center gap-1">
                    <MapPin size={10} />
                    {slot.room}
                </p>
            </div>
        </div>
    );
}

export default ScheduleGrid;
