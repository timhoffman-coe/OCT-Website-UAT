import { NextResponse } from 'next/server';
import { getPool } from '@/lib/mssql';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT 1 AS connected');

    return NextResponse.json({
      status: 'connected',
      database: process.env.MSSQL_DATABASE,
      server: process.env.MSSQL_SERVER,
      timestamp: new Date().toISOString(),
      test: result.recordset[0],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('SQL Server health check failed:', message);

    return NextResponse.json(
      {
        status: 'error',
        error: message,
        server: process.env.MSSQL_SERVER,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
