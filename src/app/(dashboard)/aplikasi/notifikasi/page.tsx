/**
 * Notifikasi (Push Notifications) Page - Aplikasi Module  
 * SMK Marhas Admin Dashboard
 * 
 * Halaman manajemen push notification
 */

import NotifikasiPageContent from '@/components/aplikasi/NotifikasiPageContent';

// Prevent SSG prerendering for interactive pages
export const dynamic = 'force-dynamic';

export default function NotifikasiPage() {
    return <NotifikasiPageContent />;
}
