/**
 * Halaman Kalender Akademik
 * SMK Marhas Admin Dashboard - Jadwal
 * 
 * Halaman untuk mengelola kalender akademik sekolah
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Calendar as CalendarIcon,
    Plus,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Users,
    BookOpen,
    Trophy,
    Coffee,
    PartyPopper,
} from 'lucide-react';
import { MOCK_CALENDAR_EVENTS } from '@/data/mock-schedule';
import type { CalendarEvent, EventType } from '@/types/jadwal';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const EVENT_STYLES: Record<EventType, { bg: string; text: string; icon: React.ReactNode }> = {
    holiday: { bg: 'bg-red-100', text: 'text-red-700', icon: <Coffee size={14} /> },
    exam: { bg: 'bg-purple-100', text: 'text-purple-700', icon: <BookOpen size={14} /> },
    event: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <PartyPopper size={14} /> },
    meeting: { bg: 'bg-amber-100', text: 'text-amber-700', icon: <Users size={14} /> },
    competition: { bg: 'bg-green-100', text: 'text-green-700', icon: <Trophy size={14} /> },
};

export default function KalenderPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get calendar grid
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getEventsForDate = (date: Date): CalendarEvent[] => {
        return MOCK_CALENDAR_EVENTS.filter(event => {
            const eventStart = new Date(event.date);
            const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;

            eventStart.setHours(0, 0, 0, 0);
            eventEnd.setHours(23, 59, 59, 999);
            date.setHours(12, 0, 0, 0);

            return date >= eventStart && date <= eventEnd;
        });
    };

    const eventsForSelectedDate = selectedDate ? getEventsForDate(new Date(selectedDate)) : [];

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        calendarDays.push(i);
    }

    const today = new Date();
    const isToday = (day: number) => {
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href="/jadwal" className="hover:text-pink-600">Dashboard</Link>
                        <span>/</span>
                        <span>Kalender</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Kalender Akademik</h1>
                </div>

                <Link
                    href="/jadwal/kalender/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-xl hover:bg-pink-700 transition-colors"
                >
                    <Plus size={16} />
                    Tambah Event
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={prevMonth}
                            className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {MONTHS[month]} {year}
                        </h2>
                        <button
                            onClick={nextMonth}
                            className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, idx) => {
                            if (day === null) {
                                return <div key={idx} className="aspect-square" />;
                            }

                            const date = new Date(year, month, day);
                            const events = getEventsForDate(new Date(date));
                            const hasEvents = events.length > 0;
                            const isSelected = selectedDate?.getTime() === date.getTime();

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDate(date)}
                                    className={`aspect-square rounded-xl p-1 text-sm transition-all relative ${isToday(day)
                                            ? 'bg-pink-600 text-white font-bold'
                                            : isSelected
                                                ? 'bg-pink-100 text-pink-700 font-medium'
                                                : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="block">{day}</span>
                                    {hasEvents && !isToday(day) && (
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                            {events.slice(0, 3).map((event, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1.5 h-1.5 rounded-full ${EVENT_STYLES[event.type].bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Events Panel */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {selectedDate
                            ? selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })
                            : 'Pilih Tanggal'}
                    </h3>

                    {selectedDate ? (
                        eventsForSelectedDate.length > 0 ? (
                            <div className="space-y-3">
                                {eventsForSelectedDate.map(event => {
                                    const style = EVENT_STYLES[event.type];
                                    return (
                                        <div
                                            key={event.id}
                                            className={`p-4 rounded-xl ${style.bg}`}
                                        >
                                            <div className={`flex items-center gap-2 ${style.text} mb-1`}>
                                                {style.icon}
                                                <span className="text-xs font-medium uppercase">
                                                    {event.type === 'holiday' ? 'Libur' :
                                                        event.type === 'exam' ? 'Ujian' :
                                                            event.type === 'event' ? 'Kegiatan' :
                                                                event.type === 'meeting' ? 'Rapat' : 'Lomba'}
                                                </span>
                                            </div>
                                            <h4 className="font-medium text-gray-800">{event.title}</h4>
                                            {event.description && (
                                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                            )}
                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    Kampus {event.campus === 'both' ? '1 & 2' : event.campus}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <CalendarIcon size={40} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-gray-500">Tidak ada event</p>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-8">
                            <CalendarIcon size={40} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500">Pilih tanggal untuk melihat event</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Mendatang</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_CALENDAR_EVENTS.map(event => {
                        const style = EVENT_STYLES[event.type];
                        return (
                            <div
                                key={event.id}
                                className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                            >
                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                                    {style.icon}
                                    {event.type === 'holiday' ? 'Libur' :
                                        event.type === 'exam' ? 'Ujian' :
                                            event.type === 'event' ? 'Kegiatan' :
                                                event.type === 'meeting' ? 'Rapat' : 'Lomba'}
                                </div>
                                <h4 className="font-medium text-gray-800 mt-2">{event.title}</h4>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                    <Clock size={14} />
                                    {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}`}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
