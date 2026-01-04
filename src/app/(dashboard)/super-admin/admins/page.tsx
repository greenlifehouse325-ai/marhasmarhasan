/**
 * Kelola Admin Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk mengelola semua admin dengan CRUD operations
 */

import AdminsPageContent from '@/components/super-admin/AdminsPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function KelolaAdminPage() {
    return <AdminsPageContent />;
}
