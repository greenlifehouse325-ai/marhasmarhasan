/**
 * Super Admin Analytics Page
 * SMK Marhas Admin Dashboard
 */

import AnalyticsPageContent from '@/components/super-admin/AnalyticsPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
    return <AnalyticsPageContent />;
}
