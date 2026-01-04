/**
 * Super Admin Users Page
 * SMK Marhas Admin Dashboard
 * 
 * Database semua user dalam sistem dengan NISN, NIP, NIS
 */

import UsersPageContent from '@/components/super-admin/UsersPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function SuperAdminUsersPage() {
    return <UsersPageContent />;
}
