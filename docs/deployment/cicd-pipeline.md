# CI/CD Pipeline — Local Build to GCP Production

This project uses a scripted deployment pipeline that builds Docker images locally, pushes them to GitHub Container Registry (ghcr.io), and deploys to the GCP production server via SSH.

## Architecture Overview

```
Dev Machine                    ghcr.io                      GCP Prod Server
┌──────────────┐    push      ┌──────────────┐    pull      ┌──────────────────┐
│ docker build │ ──────────►  │  Container   │ ──────────►  │ docker compose   │
│ deploy.sh    │              │  Registry    │              │ up -d app        │
└──────────────┘              └──────────────┘              └──────────────────┘
```

**No GitHub Actions are used.** Everything runs from the dev machine via `deploy.sh`.

## How It Works

1. `deploy.sh` runs pre-flight checks (Dockerfile exists, logged into ghcr.io, clean git tree)
2. Builds the Docker image locally using the multi-stage Dockerfile
3. Tags the image as `ghcr.io/jmcgilliscoe/oct-website:latest` and `:$GIT_SHA`
4. Pushes both tags to GitHub Container Registry
5. SSHs into the prod server and runs `docker compose pull app && docker compose up -d app`
6. Waits for the health check to confirm the app is running

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
ssh josh_mcgillis@datatech-dev-crewai \
  'echo "YOUR_PAT" | docker login ghcr.io -u JmcgillisCOE --password-stdin'
```

### 4. Copy the production compose file to the prod server

```bash
scp docker-compose.prod.yml josh_mcgillis@datatech-dev-crewai:~/apps/nextjs-site/docker-compose.yml
```

This replaces the existing `docker-compose.yml` on prod so it pulls from ghcr.io instead of building locally.

## Usage

### Standard deploy

```bash
bash deploy.sh
```

### Deploy with database migrations

```bash
RUN_MIGRATIONS=true bash deploy.sh
```

This builds and pushes an additional `:builder` image (which contains the Prisma CLI and migration files), then runs `docker compose run --rm migrate` on the prod server.

### Deploy and sync nginx config

```bash
SYNC_NGINX=true bash deploy.sh
```

Copies the local `nginx.conf` to the prod server and restarts the nginx container.

### Combine flags

```bash
RUN_MIGRATIONS=true SYNC_NGINX=true bash deploy.sh
```

## Image Tag Strategy

| Tag | Purpose |
|-----|---------|
| `:latest` | Always points to the most recent build. The prod compose file references this tag. |
| `:$GIT_SHA` | Short commit hash, pushed alongside for rollback capability. |
| `:builder` | The Dockerfile builder stage. Only pushed when `RUN_MIGRATIONS=true`. Used by the migrate service. |

## Key Files

| File | Location | Purpose |
|------|----------|---------|
| `deploy.sh` | Dev machine (project root) | Main deployment script |
| `docker-compose.prod.yml` | Dev machine (project root) | Production compose template |
| `docker-compose.yml` | Prod server (`~/apps/nextjs-site/`) | Active compose file (copy of prod template) |
| `docker-compose.yml` | Dev machine (project root) | Local dev compose (unchanged, uses `build:`) |
| `Dockerfile` | Dev machine (project root) | Multi-stage build (builder → runner) |

## Production Server Details

- **Host:** `josh_mcgillis@datatech-dev-crewai`
- **App path:** `~/apps/nextjs-site`
- **Containers:** `nextjs-site-app-1`, `nextjs-site-postgres-1`, `nextjs-site-nginx-1`
- **Health check:** `GET /api/health` on port 3000

## Rollback

If a deployment goes wrong, roll back to a known-good commit:

```bash
ssh josh_mcgillis@datatech-dev-crewai
cd ~/apps/nextjs-site
docker pull ghcr.io/jmcgilliscoe/oct-website:<known-good-sha>
docker tag ghcr.io/jmcgilliscoe/oct-website:<known-good-sha> ghcr.io/jmcgilliscoe/oct-website:latest
docker compose up -d app
```

You can find previous SHA tags in the GitHub Packages page for the repository.

## Troubleshooting

### "Repository not found" when pushing images
You're not logged into ghcr.io, or your PAT doesn't have `write:packages` scope. Re-run `docker login ghcr.io`.

### App not healthy after deploy
```bash
ssh josh_mcgillis@datatech-dev-crewai
cd ~/apps/nextjs-site
docker compose ps          # Check container status
docker compose logs app --tail 100  # Check app logs
```

### Migration fails
Check the migration logs, then fix the migration locally and redeploy:
```bash
ssh josh_mcgillis@datatech-dev-crewai
cd ~/apps/nextjs-site
docker compose logs migrate --tail 50
```
