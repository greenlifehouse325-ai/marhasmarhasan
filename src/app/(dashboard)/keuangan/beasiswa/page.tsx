/**
 * Keuangan Beasiswa Page - Responsive
 * SMK Marhas Admin Dashboard
 */

import BeasiswaPageContent from '@/components/keuangan/BeasiswaPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function BeasiswaPage() {
    return <BeasiswaPageContent />;
}
