'use server';

import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { requireSuperAdmin } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

const log = logger.child({ module: 'audit' });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'ARCHIVE'
  | 'RESTORE'
  | 'LOGIN'
  | 'LOGIN_FAILED'
  | 'ACCESS_DENIED'
  | string;

interface AuditEntry {
  userId: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  changes?: Prisma.InputJsonValue;
  status?: 'SUCCESS' | 'FAILED';
  ipAddress?: string;
  userAgent?: string;
}

// ---------------------------------------------------------------------------
// Core audit helper
// ---------------------------------------------------------------------------

/**
 * Write an entry to the AuditLog table and the structured logger.
 */
export async function writeAuditLog(entry: AuditEntry) {
  const {
    userId,
    action,
    entity,
    entityId,
    changes = {},
    status = 'SUCCESS',
    ipAddress,
    userAgent,
  } = entry;

  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        changes,
        status,
        ipAddress,
        userAgent,
      },
    });

    log.info('Audit log created', { action, entity, entityId, status });
  } catch (err) {
    // Don't let audit failures crash the caller — log and continue
    log.error('Failed to write audit log', {
      action,
      entity,
      entityId,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------

/**
 * Log an entity change with structured before/after values.
 */
export async function auditChange(
  userId: string,
  entity: string,
  entityId: string,
  action: AuditAction,
  before: Record<string, unknown> | null,
  after: Record<string, unknown> | null,
) {
  const changes: Record<string, unknown> = {};
  if (before) changes.before = before;
  if (after) changes.after = after;

  await writeAuditLog({ userId, action, entity, entityId, changes: changes as Prisma.InputJsonValue });
}

/**
 * Log a failed operation to the audit trail.
 */
export async function auditFailedOperation(
  userId: string,
  action: AuditAction,
  entity: string,
  entityId: string,
  error: string,
) {
  await writeAuditLog({
    userId,
    action,
    entity,
    entityId,
    changes: { error } as Prisma.InputJsonValue,
    status: 'FAILED',
  });
}

/**
 * Log a login attempt (success or failure) to the audit trail.
 */
export async function auditLoginAttempt(
  userId: string,
  email: string,
  success: boolean,
  ipAddress?: string,
  userAgent?: string,
) {
  await writeAuditLog({
    userId,
    action: success ? 'LOGIN' : 'LOGIN_FAILED',
    entity: 'Session',
    entityId: email,
    changes: { email, success } as Prisma.InputJsonValue,
    status: success ? 'SUCCESS' : 'FAILED',
    ipAddress,
    userAgent,
  });
}

/**
 * Log an unauthorized access attempt.
 */
export async function auditUnauthorizedAccess(
  userId: string,
  path: string,
  ipAddress?: string,
) {
  await writeAuditLog({
    userId,
    action: 'ACCESS_DENIED',
    entity: 'Route',
    entityId: path,
    changes: { path } as Prisma.InputJsonValue,
    status: 'FAILED',
    ipAddress,
  });
}

// ---------------------------------------------------------------------------
// Retention
// ---------------------------------------------------------------------------

/**
 * Delete audit log entries older than the specified retention period.
 * Requires SUPER_ADMIN role.
 */
export async function cleanupOldAuditLogs(retentionDays = 90) {
  await requireSuperAdmin();

  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

  const { count } = await prisma.auditLog.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  log.info('Audit log cleanup completed', { deletedCount: count, retentionDays });
  return count;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

interface ExportOptions {
  format: 'json' | 'csv';
  from?: string;
  to?: string;
}

/**
 * Export audit logs as JSON or CSV. Requires SUPER_ADMIN role.
 */
export async function exportAuditLogs(options: ExportOptions) {
  await requireSuperAdmin();

  const where: Record<string, unknown> = {};
  if (options.from || options.to) {
    const createdAt: Record<string, Date> = {};
    if (options.from) createdAt.gte = new Date(options.from);
    if (options.to) createdAt.lte = new Date(options.to);
    where.createdAt = createdAt;
  }

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true, name: true } } },
    take: 10000, // Safety limit
  });

  if (options.format === 'csv') {
    const headers = [
      'id',
      'createdAt',
      'userId',
      'userEmail',
      'userName',
      'action',
      'entity',
      'entityId',
      'status',
      'changes',
      'ipAddress',
      'userAgent',
    ];

    const rows = logs.map((entry) => [
      entry.id,
      entry.createdAt.toISOString(),
      entry.userId,
      entry.user.email,
      entry.user.name || '',
      entry.action,
      entry.entity,
      entry.entityId,
      entry.status,
      JSON.stringify(entry.changes),
      entry.ipAddress || '',
      entry.userAgent || '',
    ]);

    const csvLines = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
      ),
    ];

    return csvLines.join('\n');
  }

  return JSON.stringify(logs, null, 2);
}
