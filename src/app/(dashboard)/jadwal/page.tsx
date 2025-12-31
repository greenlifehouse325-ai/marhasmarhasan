/**
 * Admin Jadwal Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk Admin Jadwal dengan overview jadwal dan kalender
 * THEME-AWARE VERSION
 */

'use client';

import React from 'react';
import {
    Calendar,
    Clock,
    Users,
    AlertTriangle,
    ArrowRight,
    Plus,
    CalendarDays,
    RefreshCw,
    MapPin,
} from 'lucide-react';
import Link from 'next/link';

export default function JadwalDashboard() {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 via-pink-700 to-rose-700 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar size={20} />
                        <span className="text-sm font-medium text-pink-200">Admin Jadwal</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Dashboard Jadwal 📅
                    </h1>
                    <p className="text-pink-200 max-w-xl">
                        Kelola jadwal pelajaran, jadwal guru, dan kalender akademik
                        untuk Kampus 1 & 2 SMK Marhas.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <Calendar className="absolute right-10 top-10 w-32 h-32" />
                    <Clock className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Jadwal Hari Ini" value="48" icon={<CalendarDays size={20} />} color="#EC4899" subtext="Sesi pelajaran" />
                <StatCard label="Guru Aktif" value="67" icon={<Users size={20} />} color="#3B82F6" subtext="Mengajar hari ini" />
                <StatCard label="Jadwal Bentrok" value="2" icon={<AlertTriangle size={20} />} color="#EF4444" subtext="Perlu ditangani" urgent />
                <StatCard label="Request Perubahan" value="5" icon={<RefreshCw size={20} />} color="#F59E0B" subtext="Menunggu approval" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <QuickAction label="Edit Jadwal Kelas" icon={<CalendarDays size={20} />} color="#EC4899" href="/jadwal/jadwal-kelas" />
                            <QuickAction label="Jadwal Guru" icon={<Users size={20} />} color="#3B82F6" href="/jadwal/jadwal-guru" />
                            <QuickAction label="Tambah Event" icon={<Plus size={20} />} color="#10B981" href="/jadwal/kalender" />
                            <QuickAction label="Perubahan Jadwal" icon={<RefreshCw size={20} />} color="#F59E0B" href="/jadwal/perubahan" />
                        </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Jadwal Hari Ini</h2>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 text-sm bg-pink-500/20 text-pink-500 rounded-lg font-medium">Kampus 1</button>
                                <button className="px-3 py-1 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-hover)] rounded-lg">Kampus 2</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[600px]">
                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    <div className="text-xs font-medium text-[var(--text-muted)] text-center">Jam</div>
                                    {['XII PPLG 1', 'XII PPLG 2', 'XI TMS 1', 'XI TMS 2', 'X PPLG 1', 'X TKJ 1'].map((cls) => (
                                        <div key={cls} className="text-xs font-medium text-[var(--text-secondary)] text-center">{cls}</div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <ScheduleRow time="07:00" slots={[
                                        { subject: 'Matematika', teacher: 'Pak Budi' },
                                        { subject: 'B. Inggris', teacher: 'Bu Sarah' },
                                        { subject: 'Fisika', teacher: 'Pak Ahmad' },
                                        { subject: 'Kimia', teacher: 'Bu Rina' },
                                        { subject: 'PJOK', teacher: 'Pak Dedi' },
                                        { subject: 'Agama', teacher: 'Bu Siti' },
                                    ]} />
                                    <ScheduleRow time="08:30" slots={[
                                        { subject: 'PBO', teacher: 'Pak Reza', highlight: true },
                                        { subject: 'Database', teacher: 'Bu Lisa' },
                                        { subject: 'Jaringan', teacher: 'Pak Eko' },
                                        { subject: 'Web Dev', teacher: 'Bu Maya' },
                                        { subject: 'Algoritma', teacher: 'Pak Joni' },
                                        { subject: 'Hardware', teacher: 'Pak Tono' },
                                    ]} />
                                    <ScheduleRow time="10:00" slots={[
                                        { subject: 'B. Indonesia', teacher: 'Bu Dewi' },
                                        { subject: 'PKN', teacher: 'Pak Heri' },
                                        { subject: 'Sejarah', teacher: 'Bu Ani' },
                                        { subject: 'Seni', teacher: 'Bu Ratna' },
                                        { subject: 'B. Jawa', teacher: 'Pak Sugi' },
                                        { subject: 'BK', teacher: 'Bu Tari' },
                                    ]} />
                                </div>
                            </div>
                        </div>

                        <Link href="/jadwal/jadwal-kelas" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-pink-500 hover:text-pink-600 hover:bg-pink-500/10 rounded-lg transition-colors">
                            Lihat Jadwal Lengkap <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Schedule Conflicts */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Jadwal Bentrok</h2>
                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full font-medium">2 konflik</span>
                        </div>

                        <div className="space-y-3">
                            <ConflictCard type="teacher" description="Pak Budi dijadwalkan di 2 kelas berbeda" slot1={{ class: 'XII PPLG 1', time: '10:00 - 11:30' }} slot2={{ class: 'X TKJ 2', time: '10:00 - 11:30' }} />
                            <ConflictCard type="room" description="Lab Komputer 1 digunakan 2 kelas" slot1={{ class: 'XI TMS 1', time: '13:00 - 14:30' }} slot2={{ class: 'XI PPLG 2', time: '13:00 - 14:30' }} />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Upcoming Events */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Event Mendatang</h2>
                            <Link href="/jadwal/kalender" className="text-sm text-pink-500 hover:text-pink-600">Kalender</Link>
                        </div>
                        <div className="space-y-3">
                            <EventCard title="UAS Semester Ganjil" date="2 - 14 Jan 2025" type="exam" />
                            <EventCard title="Libur Tahun Baru" date="1 Jan 2025" type="holiday" />
                            <EventCard title="Workshop IT" date="20 Jan 2025" type="event" />
                            <EventCard title="Study Tour XII" date="25 - 27 Jan 2025" type="event" />
                        </div>
                    </div>

                    {/* Change Requests */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Request Perubahan</h2>
                            <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full font-medium">5 pending</span>
                        </div>
                        <div className="space-y-3">
                            <ChangeRequest teacher="Pak Budi" type="tukar" reason="Keperluan keluarga" date="30 Des 2024" />
                            <ChangeRequest teacher="Bu Sarah" type="izin" reason="Pelatihan luar kota" date="2 Jan 2025" />
                            <ChangeRequest teacher="Pak Ahmad" type="tukar" reason="Jadwal bentrok" date="3 Jan 2025" />
                        </div>
                        <Link href="/jadwal/perubahan" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-pink-500 hover:text-pink-600 hover:bg-pink-500/10 rounded-lg transition-colors">
                            Kelola Request <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Teacher Workload */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Beban Mengajar</h2>
                        <div className="space-y-3">
                            <WorkloadItem teacher="Pak Budi" hours={28} maxHours={24} overload />
                            <WorkloadItem teacher="Bu Sarah" hours={22} maxHours={24} />
                            <WorkloadItem teacher="Pak Ahmad" hours={24} maxHours={24} />
                            <WorkloadItem teacher="Bu Rina" hours={18} maxHours={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// SUB-COMPONENTS (THEME-AWARE)
// ============================================

function StatCard({ label, value, icon, color, subtext, urgent = false }: { label: string; value: string; icon: React.ReactNode; color: string; subtext: string; urgent?: boolean; }) {
    return (
        <div className={`bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-[var(--border-light)] ${urgent ? 'ring-2 ring-red-500/50' : ''}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color }}>{icon}</div>
                {urgent && <AlertTriangle size={14} className="text-red-500" />}
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className={`text-xs mt-1 ${urgent ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>{subtext}</p>
        </div>
    );
}

function QuickAction({ label, icon, color, href }: { label: string; icon: React.ReactNode; color: string; href: string; }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: color }}>{icon}</div>
            <span className="text-sm font-medium text-[var(--text-primary)] text-center">{label}</span>
        </Link>
    );
}

function ScheduleRow({ time, slots }: { time: string; slots: { subject: string; teacher: string; highlight?: boolean }[]; }) {
    return (
        <div className="grid grid-cols-7 gap-2">
            <div className="text-xs text-[var(--text-muted)] flex items-center justify-center">{time}</div>
            {slots.map((slot, index) => (
                <div key={index} className={`p-2 rounded-lg text-center ${slot.highlight ? 'bg-pink-500/20 border border-pink-500/30' : 'bg-[var(--bg-hover)] hover:bg-[var(--bg-active)]'} transition-colors`}>
                    <p className={`text-xs font-medium ${slot.highlight ? 'text-pink-500' : 'text-[var(--text-primary)]'}`}>{slot.subject}</p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">{slot.teacher}</p>
                </div>
            ))}
        </div>
    );
}

function ConflictCard({ description, slot1, slot2 }: { type: 'teacher' | 'room'; description: string; slot1: { class: string; time: string }; slot2: { class: string; time: string }; }) {
    return (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-2 mb-2">
                <AlertTriangle size={16} className="text-red-500 mt-0.5" />
                <p className="text-sm text-red-500">{description}</p>
            </div>
            <div className="flex gap-4 text-xs text-red-500">
                <div className="flex items-center gap-1"><MapPin size={12} /><span>{slot1.class} ({slot1.time})</span></div>
                <div className="flex items-center gap-1"><MapPin size={12} /><span>{slot2.class} ({slot2.time})</span></div>
            </div>
            <button className="mt-3 text-xs font-medium text-red-500 hover:text-red-600">Selesaikan Konflik →</button>
        </div>
    );
}

function EventCard({ title, date, type }: { title: string; date: string; type: 'exam' | 'holiday' | 'event'; }) {
    const typeStyles = { exam: 'bg-purple-500/20 text-purple-500', holiday: 'bg-green-500/20 text-green-500', event: 'bg-blue-500/20 text-blue-500' };
    const typeLabels = { exam: 'Ujian', holiday: 'Libur', event: 'Event' };
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeStyles[type]}`}><Calendar size={18} /></div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{title}</p>
                <p className="text-xs text-[var(--text-muted)]">{date}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${typeStyles[type]}`}>{typeLabels[type]}</span>
        </div>
    );
}

function ChangeRequest({ teacher, type, reason, date }: { teacher: string; type: 'tukar' | 'izin'; reason: string; date: string; }) {
    return (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">{teacher}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${type === 'tukar' ? 'bg-blue-500/20 text-blue-500' : 'bg-orange-500/20 text-orange-500'}`}>
                    {type === 'tukar' ? 'Tukar Jadwal' : 'Izin'}
                </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-1">{reason}</p>
            <p className="text-xs text-[var(--text-muted)]">{date}</p>
        </div>
    );
}

function WorkloadItem({ teacher, hours, maxHours, overload = false }: { teacher: string; hours: number; maxHours: number; overload?: boolean; }) {
    const percentage = (hours / maxHours) * 100;
    return (
        <div className={`p-3 rounded-xl ${overload ? 'bg-red-500/10 border border-red-500/20' : 'bg-[var(--bg-hover)]'}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">{teacher}</span>
                <span className={`text-xs ${overload ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>{hours}/{maxHours} jam</span>
            </div>
            <div className="h-2 bg-[var(--bg-active)] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${overload ? 'bg-red-500' : percentage > 90 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
            </div>
        </div>
    );
}
