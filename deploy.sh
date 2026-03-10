#!/usr/bin/env bash
set -euo pipefail

#───────────────────────────────────────────────────────
# Configuration
#───────────────────────────────────────────────────────
IMAGE="ghcr.io/jmcgilliscoe/oct-website"
PROD_HOST="josh_mcgillis@datatech-dev-crewai"
PROD_DIR="~/apps/nextjs-site"
RUN_MIGRATIONS="${RUN_MIGRATIONS:-false}"
SYNC_NGINX="${SYNC_NGINX:-false}"

#───────────────────────────────────────────────────────
# Pre-flight checks
#───────────────────────────────────────────────────────
echo "=== Pre-flight checks ==="

if [ ! -f "Dockerfile" ]; then
  echo "ERROR: Run this script from the project root (where Dockerfile lives)."
  exit 1
fi

if ! docker login ghcr.io --get-login >/dev/null 2>&1; then
  echo "ERROR: Not logged in to ghcr.io. Run:"
  echo '  echo "YOUR_PAT" | docker login ghcr.io -u JmcgillisCOE --password-stdin'
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "WARNING: Uncommitted changes detected. Deploying current working tree."
  read -rp "Continue? [y/N] " confirm
  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
fi

GIT_SHA=$(git rev-parse --short HEAD)
echo "Deploying commit: ${GIT_SHA}"

#───────────────────────────────────────────────────────
# Step 1: Build images
#───────────────────────────────────────────────────────
echo ""
echo "=== Building app image (runner stage) ==="
docker build \
  --target runner \
  -t "${IMAGE}:latest" \
  -t "${IMAGE}:${GIT_SHA}" \
  .

if [ "${RUN_MIGRATIONS}" = "true" ]; then
  echo ""
  echo "=== Building builder image (for migrations) ==="
  docker build \
    --target builder \
    -t "${IMAGE}:builder" \
    .
fi

#───────────────────────────────────────────────────────
# Step 2: Push to ghcr.io
#───────────────────────────────────────────────────────
echo ""
echo "=== Pushing images to ghcr.io ==="
docker push "${IMAGE}:latest"
docker push "${IMAGE}:${GIT_SHA}"

if [ "${RUN_MIGRATIONS}" = "true" ]; then
  docker push "${IMAGE}:builder"
fi

#───────────────────────────────────────────────────────
# Step 3: Sync config files (optional)
#───────────────────────────────────────────────────────
if [ "${SYNC_NGINX}" = "true" ]; then
  echo ""
  echo "=== Syncing nginx.conf to prod ==="
  scp nginx.conf "${PROD_HOST}:${PROD_DIR}/nginx.conf"
fi

#───────────────────────────────────────────────────────
# Step 4: Deploy on prod server
#───────────────────────────────────────────────────────
echo ""
echo "=== Deploying on production server ==="

ssh "${PROD_HOST}" bash -s -- "${RUN_MIGRATIONS}" "${IMAGE}" "${SYNC_NGINX}" <<'REMOTE_SCRIPT'
  set -euo pipefail

  RUN_MIGRATIONS="$1"
  IMAGE="$2"
  SYNC_NGINX="$3"

  cd ~/apps/nextjs-site

  echo "--- Pulling latest app image ---"
  docker compose pull app

  if [ "${RUN_MIGRATIONS}" = "true" ]; then
    echo "--- Pulling builder image ---"
    docker pull "${IMAGE}:builder"
    echo "--- Running migrations ---"
    docker compose run --rm migrate
  fi

  echo "--- Restarting app service ---"
  docker compose up -d app

  if [ "${SYNC_NGINX}" = "true" ]; then
    echo "--- Restarting nginx ---"
    docker compose restart nginx
  fi

  echo "--- Waiting for health check ---"
  sleep 5
  if docker compose ps app | grep -q "healthy"; then
    echo "App is healthy!"
  else
    echo "WARNING: App may not be healthy yet. Check with:"
    echo "  docker compose ps"
    echo "  docker compose logs app --tail 50"
  fi

  echo "--- Cleaning up old images ---"
  docker image prune -f
REMOTE_SCRIPT

echo ""
echo "=== Deployment complete ==="
echo "Image: ${IMAGE}:latest (${GIT_SHA})"
echo "Server: ${PROD_HOST}"
