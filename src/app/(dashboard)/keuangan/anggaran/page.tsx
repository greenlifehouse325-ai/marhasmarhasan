/**
 * Keuangan Anggaran Page - Responsive
 * SMK Marhas Admin Dashboard
 */

import AnggaranPageContent from '@/components/keuangan/AnggaranPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function AnggaranPage() {
    return <AnggaranPageContent />;
}
