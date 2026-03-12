# Prisma Migration Workflow

This document covers the full lifecycle of database schema changes — from local development through production deployment, including rollback procedures.

## Overview

Prisma Migrate manages all schema changes through versioned SQL migration files stored in `prisma/migrations/`. Migrations are deterministic and version-controlled, ensuring dev and prod stay in sync.

**Key files:**

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Source of truth for the database schema |
| `prisma.config.js` | Prisma configuration (datasource URL, seed command) |
| `prisma/migrations/` | Versioned migration SQL files |
| `prisma/seed.ts` | Seed data for local development |

## Local Development

### Creating a migration

1. Edit `prisma/schema.prisma` with your schema changes
2. Generate and apply the migration:

```bash
npx prisma migrate dev --name <description>
```

This command:
- Generates a new SQL migration file in `prisma/migrations/<timestamp>_<description>/`
- Applies the migration to your local database
- Regenerates the Prisma Client

Use descriptive names: `add_team_parent_child`, `add_widget_models`, `rename_oct_web_dev_permission`.

### Resetting the local database

To wipe and rebuild from scratch (applies all migrations + runs seed):

```bash
npx prisma migrate reset
```

This is useful when you want a clean slate or when testing seed data changes.

### Seeding

Seed data is defined in `prisma/seed.ts` and configured in `prisma.config.js`:

```js
module.exports = {
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
};
```

Seeds run automatically after `prisma migrate reset` and `prisma migrate dev` (on first migration). To run manually:

```bash
npx prisma db seed
```

The seed file uses `upsert` operations, making it safe to run repeatedly without creating duplicates.

### Inspecting the database

```bash
npx prisma studio
```

Opens a browser-based GUI for viewing and editing data in your local database.

## Production Deployment

Migrations are baked into the Docker image at build time (`prisma/migrations/` is copied into the container). Apply them after deploying a new image.

### Standard deploy with migrations

```bash
# 1. Build and push the image from dev machine
bash deploy.sh

# 2. SSH into prod server
cd ~/apps/nextjs-site
docker compose pull app
docker compose up -d app

# 3. Apply pending migrations
docker exec nextjs-site-app-1 prisma migrate deploy
```

`prisma migrate deploy` is safe to run even when there are no pending migrations — it will report "No pending migrations" and exit cleanly.

### Check migration status

```bash
docker exec nextjs-site-app-1 prisma migrate status
```

This shows which migrations have been applied and which are pending.

## Rollback Procedures

Prisma does not have a built-in `migrate rollback` command. Rollbacks require manual steps depending on the situation.

### Rolling back the application (no schema changes)

If a deployment introduced a bug but no schema changes, simply roll back the Docker image:

```bash
cd ~/apps/nextjs-site
docker pull ghcr.io/jmcgilliscoe/oct-website:<known-good-sha>
docker tag ghcr.io/jmcgilliscoe/oct-website:<known-good-sha> ghcr.io/jmcgilliscoe/oct-website:latest
docker compose up -d app
```

### Rolling back a migration

If a migration needs to be reversed:

1. **Write a corrective migration** locally that undoes the schema change:

```bash
# Edit schema.prisma to revert the change, then:
npx prisma migrate dev --name revert_<original_name>
```

2. **Deploy the corrective migration** through the normal deployment process (build, push, pull, apply).

3. **For emergencies**, you can manually execute SQL against the production database:

```bash
docker exec -it nextjs-site-postgres-1 psql -U coe_admin -d coe_cms
```

Then run the reversal SQL manually. After that, mark the migration as rolled back in the `_prisma_migrations` table if needed.

### Preventing bad migrations

- Always test migrations locally with `prisma migrate dev` before committing
- Review the generated SQL in `prisma/migrations/<timestamp>/migration.sql` before deploying
- For destructive changes (dropping columns/tables), consider a multi-step approach:
  1. Deploy code that stops using the column
  2. Deploy the migration that drops it

## Migration History

Migrations are timestamped and applied in order. Current migrations:

| Migration | Description |
|-----------|-------------|
| `20260212020645_init` | Initial schema |
| `20260213043249_add_widget_models` | Dashboard widget models |
| `20260218000000_add_team_parent_child` | Team hierarchy (parent-child) |
| `20260310000000_add_missing_tables` | Additional required tables |
| `20260311212938_add_project_roadmap_permission` | Roadmap editor permission |
| `20260311220000_rename_oct_web_dev_permission` | Renamed to OctWebDevPermission |

## Driver Adapter Note

This project uses the `@prisma/adapter-pg` driver adapter. When constructing a `PrismaClient` instance in application code, you must pass the adapter:

```typescript
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
```

The Prisma CLI commands (`migrate dev`, `migrate deploy`, `migrate status`) use the `DATABASE_URL` from `prisma.config.js` directly and do not require the adapter.
