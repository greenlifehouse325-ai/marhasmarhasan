/**
 * useExport Hook
 * SMK Marhas Admin Dashboard
 * 
 * Hook untuk export data ke berbagai format
 */

'use client';

import { useState, useCallback } from 'react';
import { useAuditLog } from './useAuditLog';

type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

interface ExportOptions {
    filename?: string;
    title?: string;
    columns?: { key: string; label: string }[];
}

interface UseExportReturn {
    isExporting: boolean;
    exportData: <T extends Record<string, unknown>>(
        data: T[],
        format: ExportFormat,
        options?: ExportOptions
    ) => Promise<void>;
}

export function useExport(): UseExportReturn {
    const [isExporting, setIsExporting] = useState(false);
    const { logExport } = useAuditLog();

    const exportData = useCallback(async <T extends Record<string, unknown>>(
        data: T[],
        format: ExportFormat,
        options: ExportOptions = {}
    ) => {
        setIsExporting(true);

        try {
            const filename = options.filename || `export-${Date.now()}`;

            switch (format) {
                case 'csv':
                    exportToCSV(data, filename, options);
                    break;
                case 'json':
                    exportToJSON(data, filename);
                    break;
                case 'xlsx':
                    // Would use xlsx library in production
                    alert('Excel export akan tersedia');
                    break;
                case 'pdf':
                    // Would use jspdf library in production
                    alert('PDF export akan tersedia');
                    break;
            }

            // Log export action
            await logExport(options.title || filename, format);
        } catch (error) {
            console.error('Export error:', error);
            throw error;
        } finally {
            setIsExporting(false);
        }
    }, [logExport]);

    return {
        isExporting,
        exportData,
    };
}

function exportToCSV<T extends Record<string, unknown>>(
    data: T[],
    filename: string,
    options: ExportOptions
) {
    if (data.length === 0) return;

    const columns = options.columns || Object.keys(data[0]).map((key) => ({ key, label: key }));

    // Header row
    const headers = columns.map((col) => col.label).join(',');

    // Data rows
    const rows = data.map((item) =>
        columns.map((col) => {
            const value = item[col.key];
            // Escape commas and quotes
            const stringValue = String(value ?? '');
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(',')
    ).join('\n');

    const csv = `${headers}\n${rows}`;
    downloadFile(csv, `${filename}.csv`, 'text/csv');
}

function exportToJSON<T extends Record<string, unknown>>(data: T[], filename: string) {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `${filename}.json`, 'application/json');
}

function downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default useExport;
