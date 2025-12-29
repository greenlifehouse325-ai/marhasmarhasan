/**
 * Mock SPP Data
 * SMK Marhas Admin Dashboard
 */

import type { SPPPayment, Transaction } from '@/types/keuangan';

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export const MOCK_SPP_PAYMENTS: SPPPayment[] = [
    {
        id: 'spp-001',
        studentId: 'std-001',
        studentName: 'Ahmad Rizky Pratama',
        studentClass: 'XII PPLG 1',
        studentNIS: '12001',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'waiting',
        paymentMethod: 'transfer',
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-002',
        studentId: 'std-002',
        studentName: 'Siti Nurhaliza',
        studentClass: 'XII PPLG 1',
        studentNIS: '12002',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'verified',
        paymentMethod: 'transfer',
        paidAt: new Date('2024-12-15'),
        verifiedBy: 'Admin Keuangan',
        verifiedAt: new Date('2024-12-16'),
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-16'),
    },
    {
        id: 'spp-003',
        studentId: 'std-003',
        studentName: 'Budi Santoso',
        studentClass: 'XI TMS 1',
        studentNIS: '12003',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'pending',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-004',
        studentId: 'std-004',
        studentName: 'Dewi Lestari',
        studentClass: 'XI TMS 1',
        studentNIS: '12004',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'waiting',
        paymentMethod: 'virtual_account',
        createdAt: new Date('2024-12-22'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-005',
        studentId: 'std-005',
        studentName: 'Reza Pratama',
        studentClass: 'X PPLG 1',
        studentNIS: '12005',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'pending',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-006',
        studentId: 'std-006',
        studentName: 'Deni Kusuma',
        studentClass: 'X TKJ 1',
        studentNIS: '12006',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'verified',
        paymentMethod: 'cash',
        paidAt: new Date('2024-12-10'),
        verifiedBy: 'Admin Keuangan',
        verifiedAt: new Date('2024-12-10'),
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-10'),
    },
    {
        id: 'spp-007',
        studentId: 'std-007',
        studentName: 'Rina Safitri',
        studentClass: 'XII PPLG 2',
        studentNIS: '12007',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'pending',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-008',
        studentId: 'std-008',
        studentName: 'Agus Setiawan',
        studentClass: 'X TKJ 1',
        studentNIS: '12008',
        month: 12,
        year: 2024,
        amount: 850000,
        status: 'waiting',
        paymentMethod: 'transfer',
        createdAt: new Date('2024-12-25'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-009',
        studentId: 'std-003',
        studentName: 'Budi Santoso',
        studentClass: 'XI TMS 1',
        studentNIS: '12003',
        month: 11,
        year: 2024,
        amount: 850000,
        status: 'pending',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date(),
    },
    {
        id: 'spp-010',
        studentId: 'std-007',
        studentName: 'Rina Safitri',
        studentClass: 'XII PPLG 2',
        studentNIS: '12007',
        month: 11,
        year: 2024,
        amount: 850000,
        status: 'pending',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date(),
    },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'trx-001',
        type: 'income',
        category: 'SPP',
        description: 'Pembayaran SPP Desember - Siti Nurhaliza (XII PPLG 1)',
        amount: 850000,
        date: new Date('2024-12-16'),
        reference: 'SPP-202412-002',
        createdBy: 'Admin Keuangan',
        createdAt: new Date('2024-12-16'),
        updatedAt: new Date('2024-12-16'),
    },
    {
        id: 'trx-002',
        type: 'income',
        category: 'SPP',
        description: 'Pembayaran SPP Desember - Deni Kusuma (X TKJ 1)',
        amount: 850000,
        date: new Date('2024-12-10'),
        reference: 'SPP-202412-006',
        createdBy: 'Admin Keuangan',
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-10'),
    },
    {
        id: 'trx-003',
        type: 'income',
        category: 'Denda Perpustakaan',
        description: 'Denda keterlambatan - Budi Santoso',
        amount: 15000,
        date: new Date('2024-12-20'),
        createdBy: 'Admin Keuangan',
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-20'),
    },
    {
        id: 'trx-004',
        type: 'expense',
        category: 'ATK',
        description: 'Pembelian ATK Kantor',
        amount: 450000,
        date: new Date('2024-12-18'),
        createdBy: 'Admin Keuangan',
        createdAt: new Date('2024-12-18'),
        updatedAt: new Date('2024-12-18'),
    },
    {
        id: 'trx-005',
        type: 'expense',
        category: 'Operasional',
        description: 'Pembayaran Listrik Desember',
        amount: 3500000,
        date: new Date('2024-12-15'),
        createdBy: 'Admin Keuangan',
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2024-12-15'),
    },
];

export function getMonthName(month: number): string {
    return MONTHS[month - 1] || '';
}

export function getSPPByStatus(status: string): SPPPayment[] {
    if (status === 'all') return MOCK_SPP_PAYMENTS;
    return MOCK_SPP_PAYMENTS.filter(s => s.status === status);
}

export function getPendingSPP(): SPPPayment[] {
    return MOCK_SPP_PAYMENTS.filter(s => s.status === 'pending');
}

export function getWaitingSPP(): SPPPayment[] {
    return MOCK_SPP_PAYMENTS.filter(s => s.status === 'waiting');
}

export function calculateTunggakan(payments: SPPPayment[]): number {
    return payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
}
