/**
 * Export Button Component
 * SMK Marhas Admin Dashboard
 * 
 * Tombol export dengan dropdown format
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileSpreadsheet, Table, ChevronDown, Loader2 } from 'lucide-react';
import { useExport } from '@/hooks/useExport';

type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

interface ExportButtonProps<T extends Record<string, unknown>> {
    data: T[];
    filename?: string;
    title?: string;
    columns?: { key: string; label: string }[];
    formats?: ExportFormat[];
    variant?: 'primary' | 'secondary' | 'outline';
}

const FORMAT_OPTIONS: { value: ExportFormat; label: string; icon: React.ReactNode }[] = [
    { value: 'csv', label: 'CSV', icon: <Table size={14} /> },
    { value: 'xlsx', label: 'Excel', icon: <FileSpreadsheet size={14} /> },
    { value: 'pdf', label: 'PDF', icon: <FileText size={14} /> },
    { value: 'json', label: 'JSON', icon: <FileText size={14} /> },
];

export function ExportButton<T extends Record<string, unknown>>({
    data,
    filename = 'export',
    title = 'Data Export',
    columns,
    formats = ['csv', 'xlsx', 'pdf'],
    variant = 'secondary',
}: ExportButtonProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { isExporting, exportData } = useExport();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleExport = async (format: ExportFormat) => {
        await exportData(data, format, { filename, title, columns });
        setIsOpen(false);
    };

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
    };

    const filteredFormats = FORMAT_OPTIONS.filter((f) => formats.includes(f.value));

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isExporting || data.length === 0}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 ${variantStyles[variant]}`}
            >
                {isExporting ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Download size={16} />
                )}
                Export
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    {filteredFormats.map((format) => (
                        <button
                            key={format.value}
                            onClick={() => handleExport(format.value)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {format.icon}
                            {format.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExportButton;
