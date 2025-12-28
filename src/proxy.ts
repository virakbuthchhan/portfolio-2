// proxy.ts (formerly middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const siteEnabled = true;// process.env.NEXT_PUBLIC_COMING_SOON === 'true';
    const { pathname } = request.nextUrl;

    // Allow access to the coming-soon page itself and static assets
    if (pathname.startsWith('/coming-soon') || pathname.startsWith('/_next/static') || pathname.startsWith('/_next/image') || pathname.startsWith('/favicon.ico')) {
        return NextResponse.next();
    }

    // If the site is not enabled, rewrite all other requests to the coming-soon page
    if (!siteEnabled) {
        return NextResponse.rewrite(new URL('/coming-soon', request.url));
    }

    // Otherwise, proceed as normal
    return NextResponse.next();
}

// Optional: Configure which paths the proxy should run on for performance
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
