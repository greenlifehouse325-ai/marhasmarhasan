/**
 * Next.js Middleware
 * SMK Marhas Admin Dashboard
 * 
 * Proteksi route berdasarkan role dan status autentikasi
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes yang tidak perlu autentikasi
const PUBLIC_ROUTES = ['/login', '/verify-otp', '/forgot-password', '/reset-password'];

// Role-based path prefixes
const ROLE_PATHS: Record<string, string> = {
    super_admin: '/super-admin',
    admin_perpustakaan: '/perpustakaan',
    admin_keuangan: '/keuangan',
    admin_absensi: '/absensi',
    admin_jadwal: '/jadwal',
    admin_aplikasi: '/aplikasi',
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Allow static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // files like favicon.ico
    ) {
        return NextResponse.next();
    }

    // For now, just allow all routes (auth checking done client-side with mock)
    // In production, you would check JWT tokens here
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
