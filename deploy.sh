#!/usr/bin/env bash
set -euo pipefail

#───────────────────────────────────────────────────────
# Configuration
#───────────────────────────────────────────────────────
IMAGE="ghcr.io/jmcgilliscoe/oct-website"

#───────────────────────────────────────────────────────
# Pre-flight checks
#───────────────────────────────────────────────────────
echo "=== Pre-flight checks ==="

if [ ! -f "Dockerfile" ]; then
  echo "ERROR: Run this script from the project root (where Dockerfile lives)."
  exit 1
fi

if ! grep -q "ghcr.io" ~/.docker/config.json 2>/dev/null; then
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
# Step 1: Quality gates (lint, typecheck, test, build)
#───────────────────────────────────────────────────────
echo ""
echo "=== Running linter ==="
npm run lint || { echo "ERROR: Linting failed. Fix lint errors before deploying."; exit 1; }

echo ""
echo "=== Running type check ==="
npx tsc --noEmit || { echo "ERROR: Type checking failed. Fix type errors before deploying."; exit 1; }

echo ""
echo "=== Running unit/integration tests ==="
npm test || { echo "ERROR: Tests failed. Fix failing tests before deploying."; exit 1; }

echo ""
echo "=== Verifying build ==="
npm run build || { echo "ERROR: Build failed. Fix build errors before deploying."; exit 1; }

echo ""
echo "=== All quality gates passed ==="

#───────────────────────────────────────────────────────
# Step 2: Build Docker image
#───────────────────────────────────────────────────────
echo ""
echo "=== Building app image ==="
docker build \
  -t "${IMAGE}:latest" \
  -t "${IMAGE}:${GIT_SHA}" \
  .

#───────────────────────────────────────────────────────
# Step 3: Push to ghcr.io
#───────────────────────────────────────────────────────
echo ""
echo "=== Pushing images to ghcr.io ==="
docker push "${IMAGE}:latest"
docker push "${IMAGE}:${GIT_SHA}"

echo ""
echo "=== Build complete ==="
echo "Image: ${IMAGE}:latest (${GIT_SHA})"
echo ""
echo "To deploy, SSH into the prod server and run:"
echo "  cd ~/apps/nextjs-site"
echo "  docker compose pull app"
echo "  docker exec nextjs-site-app-1 prisma migrate deploy  # if schema changes"
echo "  docker compose up -d app"
