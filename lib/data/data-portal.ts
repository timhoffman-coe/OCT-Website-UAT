import { getPool, sql } from '@/lib/mssql';
import type {
  DateRange,
  IncidentMetric,
  BudgetActual,
  ServiceHealthRecord,
} from './data-portal-types';

/**
 * Data access functions for the on-prem SQL Server data portal.
 *
 * All queries use parameterized inputs via mssql's .input() API to prevent
 * SQL injection. Update the SQL statements below to match your actual
 * table/view names and column names.
 */

export async function getIncidentMetrics(range: DateRange): Promise<IncidentMetric[]> {
  const pool = await getPool();
  const result = await pool.request()
    .input('startDate', sql.Date, range.startDate)
    .input('endDate', sql.Date, range.endDate)
    .query<IncidentMetric>(`
      SELECT
        date,
        totalIncidents,
        resolvedIncidents,
        avgResolutionHours,
        category,
        priority
      FROM dbo.IncidentMetrics
      WHERE date BETWEEN @startDate AND @endDate
      ORDER BY date DESC
    `);

  return result.recordset;
}

export async function getBudgetActuals(fiscalYear: number): Promise<BudgetActual[]> {
  const pool = await getPool();
  const result = await pool.request()
    .input('fiscalYear', sql.Int, fiscalYear)
    .query<BudgetActual>(`
      SELECT
        fiscalYear,
        costCenter,
        program,
        category,
        approvedAmount,
        actualSpend,
        commitments
      FROM dbo.BudgetActuals
      WHERE fiscalYear = @fiscalYear
      ORDER BY program, category
    `);

  return result.recordset;
}

export async function getServiceHealth(): Promise<ServiceHealthRecord[]> {
  const pool = await getPool();
  const result = await pool.request()
    .query<ServiceHealthRecord>(`
      SELECT
        serviceName,
        status,
        uptimePercent,
        lastChecked,
        responseTimeMs
      FROM dbo.ServiceHealth
      ORDER BY serviceName
    `);

  return result.recordset;
}

/**
 * Run an arbitrary read-only query against the data portal.
 * Use this for ad-hoc queries during development. In production,
 * prefer dedicated functions above with typed results.
 */
export async function queryDataPortal<T = Record<string, unknown>>(
  queryText: string,
  params?: Record<string, { type: sql.ISqlTypeFactoryWithNoParams; value: unknown }>
): Promise<T[]> {
  const pool = await getPool();
  const request = pool.request();

  if (params) {
    for (const [name, { type, value }] of Object.entries(params)) {
      request.input(name, type, value);
    }
  }

  const result = await request.query<T>(queryText);
  return result.recordset;
}
