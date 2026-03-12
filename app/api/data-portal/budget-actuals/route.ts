import { NextRequest, NextResponse } from 'next/server';
import { getBudgetActuals } from '@/lib/data/data-portal';
import { logger } from '@/lib/logger';
import type { DataPortalResponse, BudgetActual } from '@/lib/data/data-portal-types';

export const revalidate = 300; // 5 min — financial data updated infrequently, freshness less critical

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const fiscalYear = parseInt(searchParams.get('year') || String(new Date().getFullYear()));

    if (isNaN(fiscalYear) || fiscalYear < 2000 || fiscalYear > 2100) {
      return NextResponse.json(
        { error: 'Invalid fiscal year parameter' },
        { status: 400 }
      );
    }

    const data = await getBudgetActuals(fiscalYear);

    const response: DataPortalResponse<BudgetActual> = {
      data,
      timestamp: new Date().toISOString(),
      rowCount: data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Data portal budget-actuals error', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: 'Failed to fetch budget actuals' },
      { status: 500 }
    );
  }
}
