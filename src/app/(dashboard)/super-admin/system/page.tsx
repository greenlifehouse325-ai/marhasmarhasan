/**
 * System Control Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman kontrol sistem
 */

import SystemPageContent from '@/components/super-admin/SystemPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function SystemPage() {
    return <SystemPageContent />;
}
