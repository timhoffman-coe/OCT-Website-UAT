import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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

  if (!iapEmail) {
    return new NextResponse('Unauthorized: Missing IAP headers', {
      status: 401,
    });
  }

  // IAP email format is "accounts.google.com:user@domain.com"
  const email = iapEmail.replace('accounts.google.com:', '');

  const response = NextResponse.next();
  response.headers.set('x-user-email', email);
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/cms/:path*'],
};
