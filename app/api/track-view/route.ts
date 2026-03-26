import { NextRequest, NextResponse } from 'next/server';
import { recordPageView } from '@/lib/page-views';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-internal-secret');
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();

  recordPageView({
    path: body.path,
    teamSlug: body.teamSlug || undefined,
    userAgent: body.userAgent || undefined,
    referrer: body.referrer || undefined,
  });

  return NextResponse.json({ ok: true });
}
