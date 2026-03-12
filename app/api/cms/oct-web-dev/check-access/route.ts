import { NextResponse } from 'next/server';
import { canViewOctWebDev } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasAccess = await canViewOctWebDev();
    return NextResponse.json({ canView: hasAccess });
  } catch (err) {
    console.error('[check-access] error:', err);
    return NextResponse.json({ canView: false });
  }
}
