/**
 * Permissions Management Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * View and manage role permissions (Menu Peraturan)
 */

import PermissionsPageContent from '@/components/super-admin/PermissionsPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function PermissionsPage() {
    return <PermissionsPageContent />;
}
