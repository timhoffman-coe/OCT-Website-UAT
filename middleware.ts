import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect admin and CMS API routes
  if (!path.startsWith('/admin') && !path.startsWith('/api/cms')) {
    return NextResponse.next();
  }

  // Dev bypass: skip IAP verification in development
  if (process.env.DEV_BYPASS_IAP === 'true') {
    const response = NextResponse.next();
    response.headers.set(
      'x-user-email',
      process.env.DEV_USER_EMAIL || 'dev@edmonton.ca'
    );
    response.headers.set(
      'x-user-name',
      process.env.DEV_USER_NAME || 'Dev User'
    );
    return response;
  }

  // Production: check for IAP headers
  const iapEmail = request.headers.get('x-goog-authenticated-user-email');

  if (iapEmail) {
    // IAP email format is "accounts.google.com:user@domain.com"
    const email = iapEmail.replace('accounts.google.com:', '');
    const response = NextResponse.next();
    response.headers.set('x-user-email', email);
    return response;
  }

  // Simple password auth via cookie (pre-IAP)
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    const session = request.cookies.get('admin_session')?.value;
    if (session && session === (await hashPassword(adminPassword))) {
      const response = NextResponse.next();
      response.headers.set(
        'x-user-email',
        process.env.ADMIN_EMAIL || 'admin@edmonton.ca'
      );
      return response;
    }
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return new NextResponse('Unauthorized: Missing IAP headers', {
    status: 401,
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/cms/:path*'],
};
