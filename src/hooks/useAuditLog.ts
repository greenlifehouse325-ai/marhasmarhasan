/**
 * useAuditLog Hook
 * SMK Marhas Admin Dashboard
 * 
 * Hook untuk mencatat audit log
 */

'use client';

import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AuditLogEntry {
    action: string;
    resource: string;
    resourceId?: string;
    details?: Record<string, unknown>;
    beforeState?: unknown;
    afterState?: unknown;
}

interface UseAuditLogReturn {
    log: (entry: AuditLogEntry) => Promise<void>;
    logCreate: (resource: string, resourceId: string, data?: unknown) => Promise<void>;
    logUpdate: (resource: string, resourceId: string, before: unknown, after: unknown) => Promise<void>;
    logDelete: (resource: string, resourceId: string, data?: unknown) => Promise<void>;
    logView: (resource: string, resourceId: string) => Promise<void>;
    logExport: (resource: string, format: string) => Promise<void>;
}

export function useAuditLog(): UseAuditLogReturn {
    const { user } = useAuth();

    const createLog = useCallback(async (entry: AuditLogEntry) => {
        // In production, this would send to API
        const logEntry = {
            ...entry,
            id: `LOG-${Date.now()}`,
            timestamp: new Date().toISOString(),
            userId: user?.id || 'unknown',
            userName: user?.name || 'Unknown',
            userRole: user?.role || 'unknown',
            ipAddress: '127.0.0.1', // Would get from request
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        };

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[AUDIT LOG]', logEntry);
        }

        // Store in localStorage for demo
        const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
        logs.unshift(logEntry);
        localStorage.setItem('audit_logs', JSON.stringify(logs.slice(0, 100))); // Keep last 100
    }, [user]);

    const log = useCallback(async (entry: AuditLogEntry) => {
        await createLog(entry);
    }, [createLog]);

    const logCreate = useCallback(async (resource: string, resourceId: string, data?: unknown) => {
        await createLog({
            action: 'CREATE',
            resource,
            resourceId,
            afterState: data,
        });
    }, [createLog]);

    const logUpdate = useCallback(async (resource: string, resourceId: string, before: unknown, after: unknown) => {
        await createLog({
            action: 'UPDATE',
            resource,
            resourceId,
            beforeState: before,
            afterState: after,
        });
    }, [createLog]);

    const logDelete = useCallback(async (resource: string, resourceId: string, data?: unknown) => {
        await createLog({
            action: 'DELETE',
            resource,
            resourceId,
            beforeState: data,
        });
    }, [createLog]);

    const logView = useCallback(async (resource: string, resourceId: string) => {
        await createLog({
            action: 'VIEW',
            resource,
            resourceId,
        });
    }, [createLog]);

    const logExport = useCallback(async (resource: string, format: string) => {
        await createLog({
            action: 'EXPORT',
            resource,
            details: { format },
        });
    }, [createLog]);

    return {
        log,
        logCreate,
        logUpdate,
        logDelete,
        logView,
        logExport,
    };
}

export default useAuditLog;
