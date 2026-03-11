# CI/CD Pipeline — Local Build to GCP Production

This project uses a scripted deployment pipeline that builds Docker images locally, pushes them to GitHub Container Registry (ghcr.io), and deploys to the GCP production server manually.

## Architecture Overview

```
Dev Machine                    ghcr.io                      GCP Prod Server
┌──────────────┐    push      ┌──────────────┐    pull      ┌──────────────────┐
│ docker build │ ──────────►  │  Container   │ ──────────►  │ docker compose   │
│ deploy.sh    │              │  Registry    │              │ up -d app        │
└──────────────┘              └──────────────┘              └──────────────────┘
```

**No GitHub Actions are used.** The dev machine runs `deploy.sh` to build and push. The prod server is updated manually via SSH.

## How It Works

1. `deploy.sh` runs pre-flight checks (Dockerfile exists, logged into ghcr.io, clean git tree)
2. Builds the Docker image locally using the multi-stage Dockerfile
3. Tags the image as `ghcr.io/jmcgilliscoe/oct-website:latest` and `:$GIT_SHA`
4. Pushes both tags to GitHub Container Registry
5. Prints the commands to run on the prod server

## Prerequisites (One-Time Setup)

### 1. Create a GitHub Personal Access Token

- Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
- Generate a new token with these scopes:
  - `write:packages`
  - `read:packages`

### 2. Login to ghcr.io on the dev machine

```bash
echo "YOUR_PAT" | docker login ghcr.io -u JmcgillisCOE --password-stdin
```

### 3. Login to ghcr.io on the prod server

```bash
echo "YOUR_PAT" | docker login ghcr.io -u JmcgillisCOE --password-stdin
```

### 4. Copy the production compose file to the prod server

```bash
scp docker-compose.prod.yml josh_mcgillis@datatech-dev-crewai:~/apps/nextjs-site/docker-compose.yml
```

This replaces the existing `docker-compose.yml` on prod so it pulls from ghcr.io instead of building locally.

## Usage

### Standard deploy (no schema changes)

From the dev machine:
```bash
bash deploy.sh
```

Then SSH into the prod server:
```bash
cd ~/apps/nextjs-site
docker compose pull app
docker compose up -d app
```

### Deploy with database migrations

From the dev machine:
```bash
bash deploy.sh
```

Then SSH into the prod server:
```bash
cd ~/apps/nextjs-site
docker compose pull app
docker compose up -d app
docker exec nextjs-site-app-1 prisma migrate deploy
```

The `prisma migrate deploy` command applies any pending migrations. It is safe to run even when there are no pending migrations.

### Check migration status

```bash
docker exec nextjs-site-app-1 prisma migrate status
```

## Database Migrations

Migrations are managed with Prisma Migrate:

- **Local development:** `npx prisma migrate dev --name <description>` — creates and applies a migration
- **Production:** `docker exec nextjs-site-app-1 prisma migrate deploy` — applies pending migrations
- **Check status:** `docker exec nextjs-site-app-1 prisma migrate status`

Migration files live in `prisma/migrations/` and are included in the Docker image. The Prisma CLI is installed in the production container at `/app/prisma-cli/`.

## Image Tag Strategy

| Tag | Purpose |
|-----|---------|
| `:latest` | Always points to the most recent build. The prod compose file references this tag. |
| `:$GIT_SHA` | Short commit hash, pushed alongside for rollback capability. |

## Key Files

| File | Location | Purpose |
|------|----------|---------|
| `deploy.sh` | Dev machine (project root) | Build and push script |
| `prisma.config.js` | Project root | Prisma configuration (datasource URL, schema path) |
| `docker-compose.prod.yml` | Dev machine (project root) | Production compose template |
| `docker-compose.yml` | Prod server (`~/apps/nextjs-site/`) | Active compose file (copy of prod template) |
| `docker-compose.yml` | Dev machine (project root) | Local dev compose (uses `build:`) |
| `Dockerfile` | Dev machine (project root) | Multi-stage build (builder → runner) |

## Production Server Details

- **Host:** `josh_mcgillis@datatech-dev-crewai`
- **App path:** `~/apps/nextjs-site`
- **Containers:** `nextjs-site-app-1`, `nextjs-site-postgres-1`, `nextjs-site-nginx-1`
- **Health check:** `GET /api/health` on port 3000

## Rollback

If a deployment goes wrong, roll back to a known-good commit:

```bash
cd ~/apps/nextjs-site
docker pull ghcr.io/jmcgilliscoe/oct-website:<known-good-sha>
docker tag ghcr.io/jmcgilliscoe/oct-website:<known-good-sha> ghcr.io/jmcgilliscoe/oct-website:latest
docker compose up -d app
```

You can find previous SHA tags in the GitHub Packages page for the repository.

## Disk Space

The prod server can run out of disk space from old Docker images. To reclaim space (preserves database volumes):

```bash
docker system prune -a
```

## Troubleshooting

### "Repository not found" when pushing images
You're not logged into ghcr.io, or your PAT doesn't have `write:packages` scope. Re-run `docker login ghcr.io`.

### App not healthy after deploy
```bash
cd ~/apps/nextjs-site
docker compose ps          # Check container status
docker compose logs app --tail 100  # Check app logs
```

### Migration fails
Check the error output from `prisma migrate deploy`, fix the migration locally, rebuild, and redeploy.
