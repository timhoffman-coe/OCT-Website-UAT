import { NextResponse } from 'next/server';
import { getPool } from '@/lib/mssql';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = await getPool();
    await pool.request().query('SELECT 1 AS connected');

    return NextResponse.json({
      status: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Log details server-side only — never expose to clients
    console.error('SQL Server health check failed:', message);

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
