/**
 * Security Center Page
 * SMK Marhas Admin Dashboard - Super Admin
 * 
 * Halaman pusat keamanan sistem
 */

import SecurityPageContent from '@/components/super-admin/SecurityPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function SecurityPage() {
    return <SecurityPageContent />;
}
