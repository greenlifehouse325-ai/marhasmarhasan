/**
 * Halaman Pengaturan Sistem
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman untuk mengatur konfigurasi sistem
 */

import SettingsPageContent from '@/components/super-admin/SettingsPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function SettingsPage() {
    return <SettingsPageContent />;
}
