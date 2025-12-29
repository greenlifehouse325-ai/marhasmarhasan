/**
 * usePermission Hook
 * SMK Marhas Admin Dashboard
 * 
 * Hook untuk mengecek permission user
 */

'use client';

import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { canPerform, getAccessibleResources } from '@/lib/permissions';
import type { PermissionResource, PermissionAction, AdminRole } from '@/types/auth';

interface UsePermissionReturn {
    can: (resource: PermissionResource, action: PermissionAction) => boolean;
    canAny: (resource: PermissionResource, actions: PermissionAction[]) => boolean;
    canAll: (resource: PermissionResource, actions: PermissionAction[]) => boolean;
    accessibleResources: PermissionResource[];
    isSuperAdmin: boolean;
    role: AdminRole | null;
}

export function usePermission(): UsePermissionReturn {
    const { user } = useAuth();
    const role = user?.role || null;

    const accessibleResources = useMemo(() => {
        if (!role) return [];
        return getAccessibleResources(role);
    }, [role]);

    const can = (resource: PermissionResource, action: PermissionAction): boolean => {
        if (!role) return false;
        return canPerform(role, resource, action);
    };

    const canAny = (resource: PermissionResource, actions: PermissionAction[]): boolean => {
        return actions.some((action) => can(resource, action));
    };

    const canAll = (resource: PermissionResource, actions: PermissionAction[]): boolean => {
        return actions.every((action) => can(resource, action));
    };

    return {
        can,
        canAny,
        canAll,
        accessibleResources,
        isSuperAdmin: role === 'super_admin',
        role,
    };
}

export default usePermission;
