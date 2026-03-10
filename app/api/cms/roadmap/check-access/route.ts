import { NextResponse } from 'next/server';
import { canEditRoadmap } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasAccess = await canEditRoadmap();
    return NextResponse.json({ canEdit: hasAccess });
  } catch {
    return NextResponse.json({ canEdit: false });
  }
}
