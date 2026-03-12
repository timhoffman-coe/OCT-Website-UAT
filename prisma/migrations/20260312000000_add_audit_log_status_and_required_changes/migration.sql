-- Set null changes to empty JSON object before making column required
UPDATE "AuditLog" SET "changes" = '{}' WHERE "changes" IS NULL;

-- Make changes required with default
ALTER TABLE "AuditLog" ALTER COLUMN "changes" SET NOT NULL;
ALTER TABLE "AuditLog" ALTER COLUMN "changes" SET DEFAULT '{}';

-- Add status column
ALTER TABLE "AuditLog" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'SUCCESS';
