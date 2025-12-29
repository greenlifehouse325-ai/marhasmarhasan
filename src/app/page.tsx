'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIGS } from '@/types/admin';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Only redirect when loading is complete to avoid flash
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user) {
        // Redirect to specific role dashboard based on user role
        const config = ROLE_CONFIGS[user.role];
        if (config) {
          router.push(config.basePath);
        } else {
          // Fallback if role config missing
          router.push('/login');
        }
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={40} className="text-[#1E4D8C] animate-spin" />
        <p className="text-gray-500">Memuat...</p>
      </div>
    </div>
  );
}
