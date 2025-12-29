/**
 * Academic Calendar Component
 * SMK Marhas Admin Dashboard - Jadwal
 * 
 * Kalender akademik dengan event markers
 */

'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin } from 'lucide-react';

interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: 'holiday' | 'exam' | 'event' | 'meeting';
    description?: string;
}

interface AcademicCalendarProps {
    events: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
    onDateSelect?: (date: Date) => void;
}

const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const EVENT_COLORS = {
    holiday: '#EF4444',
    exam: '#F59E0B',
    event: '#3B82F6',
    meeting: '#8B5CF6',
};

export function AcademicCalendar({ events, onEventClick, onDateSelect }: AcademicCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and number of days
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Navigate months
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    // Get events for a specific date
    const getEventsForDate = (date: Date) => {
        return events.filter(e =>
            e.date.getDate() === date.getDate() &&
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
        );
    };

    // Handle date selection
    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onDateSelect?.(date);
    };

    // Build calendar grid
    const calendarDays: (Date | null)[] = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        calendarDays.push(new Date(year, month - 1, daysInPrevMonth - i));
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(new Date(year, month, i));
    }

    // Next month days to fill grid
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
        calendarDays.push(new Date(year, month + 1, i));
    }

    const today = new Date();
    const isToday = (date: Date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const isCurrentMonth = (date: Date) => date.getMonth() === month;

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <div className="flex items-center justify-between">
                    <button
                        onClick={prevMonth}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-lg font-bold">{MONTHS[month]} {year}</h2>
                        <button
                            onClick={goToToday}
                            className="text-xs text-pink-100 hover:text-white"
                        >
                            Hari ini
                        </button>
                    </div>
                    <button
                        onClick={nextMonth}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                {DAYS.map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
                {calendarDays.map((date, idx) => {
                    if (!date) return <div key={idx} />;

                    const dayEvents = getEventsForDate(date);
                    const isSelected = selectedDate &&
                        date.getDate() === selectedDate.getDate() &&
                        date.getMonth() === selectedDate.getMonth();

                    return (
                        <button
                            key={idx}
                            onClick={() => handleDateClick(date)}
                            className={`relative p-2 h-20 border-b border-r border-gray-100 text-left hover:bg-gray-50 transition-colors ${!isCurrentMonth(date) ? 'text-gray-300' : ''
                                } ${isSelected ? 'bg-pink-50' : ''}`}
                        >
                            <span className={`text-sm font-medium ${isToday(date)
                                    ? 'w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center'
                                    : ''
                                }`}>
                                {date.getDate()}
                            </span>

                            {/* Event dots */}
                            <div className="mt-1 space-y-0.5">
                                {dayEvents.slice(0, 2).map((event) => (
                                    <div
                                        key={event.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEventClick?.(event);
                                        }}
                                        className="text-xs px-1 py-0.5 rounded truncate text-white cursor-pointer"
                                        style={{ backgroundColor: EVENT_COLORS[event.type] }}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                                {dayEvents.length > 2 && (
                                    <span className="text-xs text-gray-400">+{dayEvents.length - 2} lagi</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-gray-100 flex flex-wrap gap-4">
                {Object.entries(EVENT_COLORS).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs text-gray-600 capitalize">{type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AcademicCalendar;
