import { NextResponse } from 'next/server';
import { canViewOctWebDev } from '@/lib/auth';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasAccess = await canViewOctWebDev();
    return NextResponse.json({ canView: hasAccess });
  } catch (err) {
    logger.error('Oct-web-dev access check failed', { error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ canView: false });
  }
}
