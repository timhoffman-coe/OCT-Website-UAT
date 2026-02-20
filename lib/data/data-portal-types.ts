/**
 * Types for data returned from the on-prem SQL Server data portal.
 *
 * Update these interfaces to match the actual columns in your SQL Server tables/views.
 * Each interface corresponds to a query function in data-portal.ts.
 */

export interface DateRange {
  startDate: string; // ISO date string, e.g. '2026-01-01'
  endDate: string;
}

// Example: IT incident/service desk metrics
export interface IncidentMetric {
  date: string;
  totalIncidents: number;
  resolvedIncidents: number;
  avgResolutionHours: number;
  category: string;
  priority: string;
}

// Example: Budget actuals from SAP or financial system
export interface BudgetActual {
  fiscalYear: number;
  costCenter: string;
  program: string;
  category: string;
  approvedAmount: number;
  actualSpend: number;
  commitments: number;
}

// Example: Service uptime/health from monitoring
export interface ServiceHealthRecord {
  serviceName: string;
  status: 'up' | 'down' | 'degraded';
  uptimePercent: number;
  lastChecked: string;
  responseTimeMs: number;
}

// Generic query result wrapper used by API routes
export interface DataPortalResponse<T> {
  data: T[];
  timestamp: string;
  rowCount: number;
}
