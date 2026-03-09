import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const ip = request.headers.get('x-real-ip')
    || request.headers.get('x-forwarded-for')?.split(',').pop()?.trim()
    || 'unknown';

  if (!adminPassword || password !== adminPassword) {
    logger.warn('Admin login failed', { ip });
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  logger.info('Admin login success', { ip });

  // Token includes a time-based salt that rotates every 8 hours
  const timeSlot = Math.floor(Date.now() / (8 * 60 * 60 * 1000)).toString();
  const token = createHash('sha256').update(adminPassword + timeSlot).digest('hex');

  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}
