# Deployment Guide

## Production Environment

| Component | Detail |
|-----------|--------|
| Host | `josh_mcgillis@datatech-dev-crewai` |
| App path | `~/apps/nextjs-site` |
| Platform | GCP Linux Compute Engine |
| Containers | `nextjs-site-app-1`, `nextjs-site-postgres-1`, `nextjs-site-nginx-1` |
| Auth | Google Cloud IAP |
| Database | PostgreSQL 16 (user: `coe_admin`, database: `coe_cms`) |

## Pre-Deployment Checklist

Before deploying, verify:

- [ ] All changes are committed and pushed to the repository
- [ ] Any new Prisma migrations are committed in `prisma/migrations/`
- [ ] `npm run lint` passes locally
- [ ] `npm run build` succeeds locally (catches TypeScript and build errors)
- [ ] You are logged in to GitHub Container Registry (`docker login ghcr.io`)
- [ ] Production server has sufficient disk space (`df -h` — Docker images are ~500MB each)

## Deployment Process

### Standard deploy (no schema changes)

1. On the dev machine, build and push the Docker image:
   ```bash
   bash deploy.sh
   ```

2. On the prod server:
   ```bash
   cd ~/apps/nextjs-site
   docker compose pull app
   docker compose up -d app
   ```

### Deploy with database migrations

1. On the dev machine:
   ```bash
   bash deploy.sh
   ```

2. On the prod server:
   ```bash
   cd ~/apps/nextjs-site
   docker compose pull app
   docker compose up -d app
   docker exec nextjs-site-app-1 prisma migrate deploy
   ```

`prisma migrate deploy` applies pending migrations. It is safe to run when there are no pending migrations.

For detailed CI/CD steps including prerequisites, GitHub Container Registry setup, and image tagging, see the CI/CD Pipeline document. For migration procedures and rollback strategies, see the Prisma Migration Workflow document.

## Post-Deployment Verification

After deploying, run through these checks:

1. **Health endpoint**: `curl http://localhost:3000/api/health` — should return `"status": "healthy"`
2. **Container status**: `docker compose ps` — all three containers should be `Up (healthy)`
3. **Public pages**: Spot-check a few public pages in the browser (home page, a team page)
4. **Admin panel**: Navigate to `/admin` and verify you can log in and see the dashboard
5. **Recent logs**: `docker compose logs app --tail 50` — check for errors or warnings
6. **Migration status**: `docker exec nextjs-site-app-1 prisma migrate status` — no pending migrations

## Health Checks

After deploying, verify the application is healthy:

```bash
# Check container status
docker compose ps

# Check application health endpoint
curl http://localhost:3000/api/health
```

The health endpoint checks PostgreSQL and MSSQL connectivity:

```json
{
  "status": "healthy",
  "checks": {
    "postgres": "healthy",
    "mssql": "healthy"
  }
}
```

A `status` of `degraded` means PostgreSQL is unreachable — the app will not function correctly.

## Check Migration Status

```bash
docker exec nextjs-site-app-1 prisma migrate status
```

## Rollback

### Application rollback

Roll back to a known-good commit SHA:

```bash
cd ~/apps/nextjs-site
docker pull ghcr.io/jmcgilliscoe/oct-website:<known-good-sha>
docker tag ghcr.io/jmcgilliscoe/oct-website:<known-good-sha> ghcr.io/jmcgilliscoe/oct-website:latest
docker compose up -d app
```

Find previous SHA tags on the GitHub Packages page for the repository.

### Database rollback

Prisma Migrate does not support automatic rollback. To undo a migration:

1. Write a new migration that reverses the changes
2. Apply it with `prisma migrate deploy`

See the Prisma Migration Workflow document for detailed rollback procedures.

## Disk Space Management

Old Docker images accumulate on the prod server. To reclaim space (preserves database volumes):

```bash
docker system prune -a
```

Monitor available space with:

```bash
df -h
```

## Troubleshooting

### App not healthy after deploy

```bash
# Check container status
docker compose ps

# View recent app logs
docker compose logs app --tail 100

# Check if migrations are pending
docker exec nextjs-site-app-1 prisma migrate status
```

### "Repository not found" when pushing images

Re-authenticate with GitHub Container Registry:

```bash
echo "YOUR_PAT" | docker login ghcr.io -u JmcgillisCOE --password-stdin
```

Ensure your PAT has `write:packages` scope.

### Database connection errors

```bash
# Check if Postgres container is running
docker compose ps postgres

# Check Postgres logs
docker compose logs postgres --tail 50

# Test connectivity
docker exec -it nextjs-site-postgres-1 psql -U coe_admin -d coe_cms -c "SELECT 1"
```

### Migration failures

Check the error output from `prisma migrate deploy`. Common causes:

- Schema conflict with existing data (add default values or backfill first)
- Migration file was edited after being applied (never edit applied migrations)

Fix the issue locally, create a corrective migration, rebuild, and redeploy.
