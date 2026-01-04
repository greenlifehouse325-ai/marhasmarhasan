/**
 * Breadcrumb Component
 * SMK Marhas Admin Dashboard
 * 
 * Komponen navigasi breadcrumb yang konsisten dan reusable
 * Menampilkan hierarki halaman untuk orientasi user
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    /** Label yang ditampilkan */
    label: string;
    /** URL tujuan, jika tidak ada maka item adalah current page */
    href?: string;
    /** Icon kustom (opsional) */
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    /** Daftar item breadcrumb */
    items: BreadcrumbItem[];
    /** Tampilkan icon home di awal */
    showHome?: boolean;
    /** URL untuk home icon */
    homeHref?: string;
    /** Separator antar item */
    separator?: 'chevron' | 'slash' | 'dot';
    /** Custom className */
    className?: string;
}

export function Breadcrumb({
    items,
    showHome = false,
    homeHref = '/super-admin',
    separator = 'chevron',
    className = ''
}: BreadcrumbProps) {
    if (items.length === 0) return null;

    const renderSeparator = () => {
        switch (separator) {
            case 'slash':
                return <span className="text-[var(--text-muted)] mx-1">/</span>;
            case 'dot':
                return <span className="text-[var(--text-muted)] mx-2">•</span>;
            case 'chevron':
            default:
                return <ChevronRight size={14} className="text-[var(--text-muted)] mx-1" />;
        }
    };

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center flex-wrap gap-y-1 text-sm ${className}`}
        >
            {/* Home Icon */}
            {showHome && (
                <>
                    <Link
                        href={homeHref}
                        className="flex items-center text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
                        title="Dashboard"
                    >
                        <Home size={16} />
                    </Link>
                    {renderSeparator()}
                </>
            )}

            {/* Breadcrumb Items */}
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <React.Fragment key={index}>
                        {index > 0 && renderSeparator()}

                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ) : (
                            <span className="flex items-center gap-1 text-[var(--text-primary)] font-medium">
                                {item.icon}
                                <span>{item.label}</span>
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}

/**
 * Helper function untuk membuat breadcrumb dari path
 * Contoh: createBreadcrumbFromPath('/data-master/kelas', pathLabels)
 */
export function createBreadcrumbFromPath(
    pathname: string,
    labelMap: Record<string, string> = {}
): BreadcrumbItem[] {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    let currentPath = '';

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;

        // Cari label dari map, atau capitalize segment
        const label = labelMap[segment] ||
            segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

        items.push({
            label,
            href: isLast ? undefined : currentPath
        });
    });

    return items;
}

// Default label mapping untuk path umum di dashboard
export const DEFAULT_PATH_LABELS: Record<string, string> = {
    'super-admin': 'Dashboard',
    'data-master': 'Data Master',
    'absensi': 'Absensi',
    'keuangan': 'Keuangan',
    'perpustakaan': 'Perpustakaan',
    'jadwal': 'Jadwal',
    'aplikasi': 'Aplikasi',
    'siswa': 'Data Siswa',
    'guru': 'Data Guru',
    'kelas': 'Kelas',
    'jurusan': 'Jurusan',
    'mapel': 'Mata Pelajaran',
    'tahun-ajaran': 'Tahun Ajaran',
    'ruangan': 'Ruangan',
    'ekstrakurikuler': 'Ekstrakurikuler',
    'dispensasi': 'Dispensasi',
    'session': 'Session QR',
    'hari-ini': 'Hari Ini',
    'riwayat': 'Riwayat',
    'rekap-kelas': 'Rekap Kelas',
    'izin': 'Izin',
    'laporan': 'Laporan',
    'settings': 'Pengaturan',
    'spp': 'Pembayaran SPP',
    'pemasukan': 'Pemasukan',
    'pengeluaran': 'Pengeluaran',
    'transaksi': 'Transaksi',
    'buku': 'Katalog Buku',
    'peminjaman': 'Peminjaman',
    'pengembalian': 'Pengembalian',
    'denda': 'Denda',
    'create': 'Tambah Baru',
    'edit': 'Edit',
};

export default Breadcrumb;
