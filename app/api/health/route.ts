import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function checkPostgres(): Promise<'healthy' | 'error'> {
  try {
    await prisma.$queryRawUnsafe('SELECT 1');
    return 'healthy';
  } catch {
    return 'error';
  }
}

async function checkMssql(): Promise<'healthy' | 'unavailable' | 'error'> {
  try {
    const { getPool } = await import('@/lib/mssql');
    const pool = await getPool();
    await pool.request().query('SELECT 1');
    return 'healthy';
  } catch {
    // MSSQL may not be configured — that's OK, report as unavailable
    return 'unavailable';
  }
}

export async function GET() {
  const [postgres, mssql] = await Promise.all([checkPostgres(), checkMssql()]);

  const checks = { postgres, mssql };
  const isHealthy = postgres === 'healthy';

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: isHealthy ? 200 : 503 }
  );
}
