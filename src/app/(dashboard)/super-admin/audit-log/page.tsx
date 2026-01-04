/**
 * Audit Log Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk melihat semua aktivitas admin dalam sistem
 */

import AuditLogPageContent from '@/components/super-admin/AuditLogPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function AuditLogPage() {
    return <AuditLogPageContent />;
}
