/**
 * Create Kelas Page
 * SMK Marhas Admin Dashboard
 */

import CreateKelasContent from '@/components/kelas/CreateKelasContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function CreateKelasPage() {
    return <CreateKelasContent />;
}
