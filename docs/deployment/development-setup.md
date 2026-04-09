# Development Setup Guide

## Prerequisites

- **Node.js 20.x** (used in Docker images and for local development)
- **Docker** and **Docker Compose** (recommended approach)
- **npm** (package manager)

## Quick Start (Docker)

The fastest way to get running:

```bash
git clone <repo-url>
cd coe-website
docker compose -f docker-compose.dev.yml up
```

The app will be available at `http://localhost:3000`. The admin panel is at `http://localhost:3000/admin`.

## Docker Dev Environment

`docker-compose.dev.yml` runs two containers:

| Container | Image | Port | Purpose |
|-----------|-------|------|---------|
| postgres | postgres:16-alpine | 5432 | PostgreSQL database |
| app | Dockerfile.dev | 3000 | Next.js dev server with hot reload |

### Key details

- Source code is volume-mounted (`.:/app`) so file changes trigger hot reload
- `node_modules` is excluded from the mount to avoid conflicts
- `WATCHPACK_POLLING=true` enables file watching inside Docker
- PostgreSQL uses a named volume (`pgdata_dev`) for data persistence
- The app container waits for PostgreSQL to be healthy before starting

### Database credentials (dev)

| Setting | Value |
|---------|-------|
| Database | `coe_cms` |
| User | `coe_admin` |
| Password | `dev_password` |
| Host | `postgres` (from app container) or `localhost` (from host) |
| Port | 5432 |

## Environment Variables

The Docker Compose file sets these automatically. If running locally without Docker, create a `.env` file:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `DEV_BYPASS_IAP` | Yes (dev) | Set to `true` to skip IAP authentication |
| `DEV_USER_EMAIL` | Yes (dev) | Email for the auto-logged-in dev user |
| `DEV_USER_NAME` | No | Display name for the dev user |
| `ADMIN_PASSWORD` | No | Optional password gate for shared dev servers |
| `ADMIN_EMAIL` | No | Email associated with password login |
| `GOOGLE_APPLICATION_CREDENTIALS` | No | Path to GCP service account JSON (for Gemini AI) |
| `GEMINI_API_KEY` | No | API key for Gemini AI chat |
| `MSSQL_SERVER` | No | SQL Server hostname (Data Portal features) |
| `MSSQL_DATABASE` | No | SQL Server database name |
| `MSSQL_PORT` | No | SQL Server port (default 1433) |
| `MSSQL_DOMAIN` | No | Active Directory domain for NTLM auth |
| `MSSQL_USER` | No | SQL Server service account |
| `MSSQL_PASSWORD` | No | SQL Server password |
| `SERVICEHEALTH_API_BASE_URL` | No | Service health API base URL |
| `SERVICEHEALTH_IAP_CLIENT_ID` | No | IAP OAuth client ID for service health API |

The MSSQL and service health variables are only needed if you're working on Data Portal or service health features.

## npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `next dev --webpack` | Start dev server with hot reload |
| `npm run build` | `next build` | Production build (4GB heap limit) |
| `npm run start` | `next start` | Run production server |
| `npm run db:migrate` | `npx prisma migrate dev` | Create and apply migrations |
| `npm run db:seed` | `npx prisma db seed` | Run seed script |
| `npm run db:reset` | `npx prisma migrate reset` | Full database reset with migrations and seed |
| `npm run db:studio` | `npx prisma studio` | Prisma Studio GUI on port 5555 |
| `npm run db:generate` | `npx prisma generate` | Regenerate Prisma client |

## Database Setup

### First-time setup

If using Docker Compose, migrations run automatically on container start (via `Dockerfile.dev`). For local development:

```bash
npm install
npx prisma migrate dev
npx prisma db seed
```

### Creating a new migration

After modifying `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name describe-your-change
```

This creates a migration file in `prisma/migrations/` and applies it. See the Prisma Migration Workflow document for detailed procedures.

### Prisma Studio

Browse and edit database records in a GUI:

```bash
npx prisma studio
```

Opens at `http://localhost:5555`.

### Full reset

To drop and recreate the database with seed data:

```bash
npx prisma migrate reset
```

This runs all migrations from scratch and then executes `prisma/seed.ts`.

## Authentication in Development

With `DEV_BYPASS_IAP=true`, the middleware automatically sets `x-user-email` to the value of `DEV_USER_EMAIL`. No login is required — you are automatically authenticated as that user.

### Optional password gate

If `ADMIN_PASSWORD` is set, the `/admin` route requires a password. Navigate to `/login` and enter the password. This is useful for shared development servers where you don't want open access.

### Seeded users

The seed script (`prisma/seed.ts`) creates a default user with SUPER_ADMIN role. You can modify the seed file or add users through the admin panel at `/admin/users`.

## Local Development Without Docker

If you prefer to run without Docker:

1. Install Node.js 20.x and PostgreSQL 16
2. Create the database:
   ```bash
   createdb coe_cms
   ```
3. Set environment variables in `.env`:
   ```
   DATABASE_URL=postgresql://your_user:your_password@localhost:5432/coe_cms
   DEV_BYPASS_IAP=true
   DEV_USER_EMAIL=dev@edmonton.ca
   DEV_USER_NAME=Dev User
   ```
4. Install dependencies and set up the database:
   ```bash
   npm install
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

## Troubleshooting

### Docker container won't start / crashes on startup

```bash
# Check container logs
docker compose -f docker-compose.dev.yml logs app

# If Prisma client is out of date after pulling new changes
docker compose -f docker-compose.dev.yml exec app npx prisma generate
docker compose -f docker-compose.dev.yml restart app
```

### Database connection errors

The app container waits for PostgreSQL to be healthy, but occasionally the timing can be tight:

```bash
# Restart just the app container
docker compose -f docker-compose.dev.yml restart app

# If the database is corrupted, reset it
docker compose -f docker-compose.dev.yml down -v  # removes volumes!
docker compose -f docker-compose.dev.yml up
```

### Port 3000 or 5432 already in use

```bash
# Find what's using the port
lsof -i :3000
# or on Linux
ss -tlnp | grep 3000
```

Stop the conflicting process, or change the port mapping in `docker-compose.dev.yml`.

### File changes not triggering hot reload

- Docker uses `WATCHPACK_POLLING=true` for file watching inside containers. If changes still aren't detected, restart the app container.
- On WSL2, ensure your project is on the Linux filesystem (not `/mnt/c/...`) for reliable file watching.

### `node_modules` issues after pulling new changes

The `node_modules` directory is excluded from the Docker volume mount to avoid host/container conflicts. If dependencies change:

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml build --no-cache app
docker compose -f docker-compose.dev.yml up
```

### Prisma client errors ("Cannot find module @prisma/client")

```bash
docker compose -f docker-compose.dev.yml exec app npx prisma generate
docker compose -f docker-compose.dev.yml restart app
```

### AI/MSSQL/Service Health features not working

These features require additional environment variables not set by default. See the Environment Variables Reference for the full list. Add them to `.env.local` if needed — Docker Compose will pick them up.
