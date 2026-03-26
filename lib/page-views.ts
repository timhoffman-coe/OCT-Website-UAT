import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

const log = logger.child({ module: 'page-views' });

/**
 * Record a page view. Fire-and-forget — errors are logged but never thrown.
 */
export function recordPageView(data: {
  path: string;
  teamSlug?: string;
  userAgent?: string;
  referrer?: string;
}): void {
  prisma.pageView
    .create({ data })
    .catch((err) => {
      log.error('Failed to record page view', {
        path: data.path,
        error: err instanceof Error ? err.message : String(err),
      });
    });
}

/**
 * Delete page view entries older than the specified retention period.
 */
export async function cleanupOldPageViews(retentionDays = 90) {
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

  const { count } = await prisma.pageView.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  log.info('Page view cleanup completed', { deletedCount: count, retentionDays });
  return count;
}
