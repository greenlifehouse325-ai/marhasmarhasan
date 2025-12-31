/**
 * Admin Keuangan Dashboard
 * SMK Marhas Admin Dashboard
 * 
 * Dashboard untuk Admin Keuangan dengan overview pembayaran dan cashflow
 * THEME-AWARE VERSION
 */

'use client';

import React from 'react';
import {
    Wallet,
    Receipt,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    ArrowRight,
    Plus,
    Calendar,
    Users,
    CheckCircle,
    FileText,
    Bell,
} from 'lucide-react';
import Link from 'next/link';

export default function KeuanganDashboard() {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-6 md:p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Wallet size={20} />
                        <span className="text-sm font-medium text-amber-100">Admin Keuangan</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Dashboard Keuangan 💰
                    </h1>
                    <p className="text-amber-100 max-w-xl">
                        Kelola pembayaran SPP, denda, pemasukan, dan pengeluaran
                        keuangan SMK Marhas.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <Wallet className="absolute right-10 top-10 w-32 h-32" />
                    <Receipt className="absolute right-32 bottom-5 w-20 h-20" />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Pemasukan Bulan Ini"
                    value="Rp 156.5 Jt"
                    icon={<TrendingUp size={20} />}
                    color="#10B981"
                    trend="+12% dari bulan lalu"
                    positive
                />
                <StatCard
                    label="Tunggakan SPP"
                    value="Rp 23.4 Jt"
                    icon={<AlertTriangle size={20} />}
                    color="#EF4444"
                    trend="45 siswa menunggak"
                />
                <StatCard
                    label="Pengeluaran"
                    value="Rp 89.2 Jt"
                    icon={<TrendingDown size={20} />}
                    color="#F59E0B"
                    trend="Normal budget"
                />
                <StatCard
                    label="Denda Perpustakaan"
                    value="Rp 1.2 Jt"
                    icon={<Receipt size={20} />}
                    color="#8B5CF6"
                    trend="Terkumpul bulan ini"
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <QuickAction
                                label="Verifikasi Pembayaran"
                                icon={<CheckCircle size={20} />}
                                color="#10B981"
                                href="/keuangan/spp"
                                badge={8}
                            />
                            <QuickAction
                                label="Kirim Tagihan"
                                icon={<Bell size={20} />}
                                color="#3B82F6"
                                href="/keuangan/spp/tagihan"
                            />
                            <QuickAction
                                label="Catat Pemasukan"
                                icon={<Plus size={20} />}
                                color="#8B5CF6"
                                href="/keuangan/pemasukan/create"
                            />
                            <QuickAction
                                label="Buat Laporan"
                                icon={<FileText size={20} />}
                                color="#F59E0B"
                                href="/keuangan/laporan"
                            />
                        </div>
                    </div>

                    {/* Cashflow Chart */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Cashflow</h2>
                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                <Calendar size={14} />
                                <span>6 bulan terakhir</span>
                            </div>
                        </div>

                        {/* Simple Bar Chart - Income vs Expense */}
                        <div className="flex items-end justify-between h-48 px-2 py-2">
                            {[
                                { income: 145, expense: 78 },
                                { income: 132, expense: 95 },
                                { income: 158, expense: 82 },
                                { income: 141, expense: 88 },
                                { income: 167, expense: 92 },
                                { income: 156, expense: 89 },
                            ].map((month, index) => (
                                <div key={index} className="flex items-end gap-1 flex-1 justify-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <div
                                            className="w-5 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t transition-all hover:from-emerald-600"
                                            style={{ height: `${month.income * 1}px` }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div
                                            className="w-5 bg-gradient-to-t from-red-400 to-red-300 rounded-t transition-all hover:from-red-500"
                                            style={{ height: `${month.expense * 1}px` }}
                                        />
                                    </div>
                                    <span className="absolute -bottom-6 text-xs text-[var(--text-muted)]">
                                        {['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-[var(--border-light)]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-xs text-[var(--text-muted)]">Pemasukan</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <span className="text-xs text-[var(--text-muted)]">Pengeluaran</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Transaksi Terakhir</h2>
                            <Link
                                href="/keuangan/pemasukan"
                                className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                            >
                                Lihat Semua <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            <TransactionItem
                                type="income"
                                description="Pembayaran SPP - Ahmad Rizky (XII PPLG 1)"
                                amount={850000}
                                time="10 menit lalu"
                            />
                            <TransactionItem
                                type="income"
                                description="Pembayaran SPP - Siti Nurhaliza (XI TKJ 2)"
                                amount={850000}
                                time="25 menit lalu"
                            />
                            <TransactionItem
                                type="expense"
                                description="Pembelian ATK Kantor"
                                amount={450000}
                                time="1 jam lalu"
                            />
                            <TransactionItem
                                type="income"
                                description="Denda Perpustakaan - Budi Santoso"
                                amount={15000}
                                time="2 jam lalu"
                            />
                            <TransactionItem
                                type="expense"
                                description="Pembayaran Listrik"
                                amount={3500000}
                                time="Kemarin"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Pending Payments */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Menunggu Verifikasi</h2>
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full font-medium">
                                8 pending
                            </span>
                        </div>

                        <div className="space-y-3">
                            <PendingPayment
                                name="Ahmad Rizky"
                                class="XII PPLG 1"
                                amount={850000}
                                time="10 menit lalu"
                            />
                            <PendingPayment
                                name="Dewi Lestari"
                                class="XI TMS 1"
                                amount={850000}
                                time="30 menit lalu"
                            />
                            <PendingPayment
                                name="Reza Pratama"
                                class="X PPLG 2"
                                amount={850000}
                                time="1 jam lalu"
                            />
                        </div>

                        <Link
                            href="/keuangan/spp"
                            className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 rounded-lg transition-colors"
                        >
                            Lihat Semua <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Outstanding by Class */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Tunggakan per Kelas</h2>

                        <div className="space-y-3">
                            <OutstandingClass
                                className="XII PPLG 1"
                                count={8}
                                total={6800000}
                            />
                            <OutstandingClass
                                className="XI TMS 2"
                                count={6}
                                total={5100000}
                            />
                            <OutstandingClass
                                className="X PPLG 1"
                                count={5}
                                total={4250000}
                            />
                            <OutstandingClass
                                className="XI TKJ 1"
                                count={4}
                                total={3400000}
                            />
                        </div>
                    </div>

                    {/* Summary Today */}
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Hari Ini</h2>

                        <div className="space-y-4">
                            <SummaryItem
                                label="Total Masuk"
                                value="Rp 4.250.000"
                                icon={<TrendingUp size={16} />}
                                color="#10B981"
                            />
                            <SummaryItem
                                label="Total Keluar"
                                value="Rp 3.950.000"
                                icon={<TrendingDown size={16} />}
                                color="#EF4444"
                            />
                            <SummaryItem
                                label="SPP Terbayar"
                                value="5 siswa"
                                icon={<Users size={16} />}
                                color="#3B82F6"
                            />
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

function StatCard({
    label,
    value,
    icon,
    color,
    trend,
    positive = false
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend: string;
    positive?: boolean;
}) {
    return (
        <div className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-[var(--border-light)]">
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}20`, color }}
                >
                    {icon}
                </div>
                {positive && <TrendingUp size={14} className="text-green-500" />}
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className={`text-xs mt-1 ${positive ? 'text-green-500' : 'text-[var(--text-muted)]'}`}>{trend}</p>
        </div>
    );
}

function QuickAction({
    label,
    icon,
    color,
    href,
    badge
}: {
    label: string;
    icon: React.ReactNode;
    color: string;
    href: string;
    badge?: number;
}) {
    return (
        <Link
            href={href}
            className="relative flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-hover)] hover:bg-[var(--bg-active)] transition-colors group"
        >
            {badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium bg-red-500 text-white rounded-full">
                    {badge}
                </span>
            )}
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)] text-center">{label}</span>
        </Link>
    );
}

function TransactionItem({
    type,
    description,
    amount,
    time
}: {
    type: 'income' | 'expense';
    description: string;
    amount: number;
    time: string;
}) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
            <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'income' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}
            >
                {type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)] truncate">{description}</p>
                <p className="text-xs text-[var(--text-muted)]">{time}</p>
            </div>
            <span className={`text-sm font-semibold ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {type === 'income' ? '+' : '-'}Rp {amount.toLocaleString('id-ID')}
            </span>
        </div>
    );
}

function PendingPayment({
    name,
    class: className,
    amount,
    time
}: {
    name: string;
    class: string;
    amount: number;
    time: string;
}) {
    return (
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
                <span className="text-xs text-blue-500">{time}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-2">{className}</p>
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Rp {amount.toLocaleString('id-ID')}
                </span>
                <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Verifikasi
                </button>
            </div>
        </div>
    );
}

function OutstandingClass({
    className,
    count,
    total
}: {
    className: string;
    count: number;
    total: number;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{className}</p>
                <p className="text-xs text-[var(--text-muted)]">{count} siswa menunggak</p>
            </div>
            <span className="text-sm font-semibold text-red-500">
                Rp {(total / 1000000).toFixed(1)} Jt
            </span>
        </div>
    );
}

function SummaryItem({
    label,
    value,
    icon,
    color
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}20`, color }}
                >
                    {icon}
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{label}</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">{value}</span>
        </div>
    );
}
