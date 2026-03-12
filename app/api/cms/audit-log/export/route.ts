import { NextRequest, NextResponse } from 'next/server';
import { exportAuditLogs } from '@/lib/audit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cms/audit-log/export?format=json|csv&from=YYYY-MM-DD&to=YYYY-MM-DD
 * Export audit logs. Requires SUPER_ADMIN (enforced in exportAuditLogs).
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const format = searchParams.get('format') === 'csv' ? 'csv' : 'json';
    const from = searchParams.get('from') || undefined;
    const to = searchParams.get('to') || undefined;

    const data = await exportAuditLogs({ format, from, to });

    const contentType =
      format === 'csv' ? 'text/csv; charset=utf-8' : 'application/json';
    const filename = `audit-log-${new Date().toISOString().split('T')[0]}.${format}`;

    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    logger.error('Audit log export failed', {
      error: error instanceof Error ? error.message : String(error),
    });

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to export audit logs' },
      { status: 500 }
    );
  }
}
