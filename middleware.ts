import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, createRemoteJWKSet } from 'jose';

// IAP JWT verification (replaces trusting raw x-goog-authenticated-user-email)
const IAP_JWKS = createRemoteJWKSet(
  new URL('https://www.gstatic.com/iap/verify/public_key-jwk')
);

async function verifyIAPJwt(token: string) {
  const { payload } = await jwtVerify(token, IAP_JWKS, {
    issuer: 'https://cloud.google.com/iap',
    audience: process.env.IAP_AUDIENCE,
  });
  return {
    email: payload.email as string,
    name: (payload.name as string) || (payload.email as string),
  };
}

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// --- Rate limiting ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_RATE_LIMIT_ENTRIES = 10_000;

const CHAT_RATE_LIMIT = { windowMs: 60_000, maxRequests: 20 };
const LOGIN_RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };

function isRateLimited(key: string, limit: { windowMs: number; maxRequests: number }): boolean {
  const now = Date.now();

  // Prune stale entries when map grows too large
  if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
    for (const [k, v] of rateLimitMap) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + limit.windowMs });
    return false;
  }

  entry.count++;
  return entry.count > limit.maxRequests;
}

// Extract client IP using trusted headers (x-real-ip from GCP LB, then last x-forwarded-for entry)
function getClientIp(request: NextRequest): string {
  // x-real-ip is set by trusted reverse proxies (GCP IAP / Load Balancer)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  // Use the last entry in x-forwarded-for (the IP that connected to the first trusted proxy)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const parts = forwardedFor.split(',');
    return parts[parts.length - 1].trim();
  }

  return 'unknown';
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Rate limit the admin login endpoint (strict: 5 attempts/min)
  if (path === '/api/admin-login') {
    const ip = getClientIp(request);
    if (isRateLimited(`login:${ip}`, LOGIN_RATE_LIMIT)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }
    return NextResponse.next();
  }

  // Rate limit the chat API (20 requests/min)
  if (path === '/api/chat') {
    const ip = getClientIp(request);
    if (isRateLimited(`chat:${ip}`, CHAT_RATE_LIMIT)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    return NextResponse.next();
  }

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

  // Production: verify IAP JWT token (not just the spoofable email header)
  const iapJwt = request.headers.get('x-goog-iap-jwt-assertion');

  if (iapJwt) {
    try {
      const { email, name } = await verifyIAPJwt(iapJwt);
      const response = NextResponse.next();
      response.headers.set('x-user-email', email);
      response.headers.set('x-user-name', name);
      return response;
    } catch (err) {
      console.error('IAP JWT verification failed:', err);
      return new NextResponse('Unauthorized: Invalid IAP token', {
        status: 401,
      });
    }
  }

  // Password auth fallback — only available in dev mode
  if (process.env.DEV_BYPASS_IAP === 'true') {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword) {
      const session = request.cookies.get('admin_session')?.value;
      // Accept current or previous 8-hour time slot to avoid edge-case lockouts at rotation
      const currentSlot = Math.floor(Date.now() / (8 * 60 * 60 * 1000)).toString();
      const previousSlot = (Math.floor(Date.now() / (8 * 60 * 60 * 1000)) - 1).toString();
      const currentHash = await hashPassword(adminPassword + currentSlot);
      const previousHash = await hashPassword(adminPassword + previousSlot);

      if (session && (session === currentHash || session === previousHash)) {
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
  }

  return new NextResponse('Unauthorized: Missing IAP headers', {
    status: 401,
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/cms/:path*', '/api/chat', '/api/admin-login'],
};
