import { NextResponse } from 'next/server';
import { requireOctWebDevAccess } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireOctWebDevAccess();

    const filePath = path.join(process.cwd(), 'content', 'oct-web-dev.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    return NextResponse.json({ content });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Forbidden')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
