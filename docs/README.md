# OCT Website Documentation

Documentation for the City of Edmonton Open City & Technology website — a Next.js 16 CMS and team portal.

## Getting Started

| Document | Audience | Description |
|----------|----------|-------------|
| [Development Setup](deployment/development-setup.md) | Developers | Local environment setup with Docker, env vars, database seeding |
| [Architecture Overview](deployment/architecture-overview.md) | Developers | Tech stack, directory structure, authentication flow, key patterns |

## Architecture & Design

| Document | Audience | Description |
|----------|----------|-------------|
| [Architecture Overview](deployment/architecture-overview.md) | Developers | System architecture, frontend/backend patterns, database layer |
| [CMS Overview](deployment/cms-overview.md) | Developers | CMS data model, team hierarchy, editing flow, news system |
| [Widget System](deployment/widget-system.md) | Developers | Widget types, template blocklist, how to add new widgets |
| [Projects System](deployment/projects-system.md) | Developers | Project pages, widget editors, permissions, tags, ongoing projects widget |

## Subsystem Guides

| Document | Audience | Description |
|----------|----------|-------------|
| [AI Assistant](deployment/ai-assistant.md) | Developers | Gemini chat: intent classification, Drive integration, circuit breaker |
| [Service Health](deployment/service-health.md) | Developers | Uptrends API integration, status mapping, caching, mock fallback |
| [Data Portal](deployment/data-portal.md) | Developers | MSSQL integration, NTLM auth, budget/incident queries |

## Operations

| Document | Audience | Description |
|----------|----------|-------------|
| [Deployment Guide](deployment/deployment-guide.md) | DevOps | Production deployment, rollback, health checks, troubleshooting |
| [CI/CD Pipeline](deployment/cicd-pipeline.md) | DevOps | Build, push, deploy workflow with GitHub Container Registry |
| [Prisma Migration Workflow](deployment/prisma-migration-workflow.md) | Developers | Creating, deploying, and rolling back database migrations |
| [Secret Management](deployment/secret-management.md) | DevOps | Google Secret Manager setup, rotation, local dev secrets |

## Reference

| Document | Audience | Description |
|----------|----------|-------------|
| [API Reference](deployment/api-reference.md) | Developers | All 23 API endpoints with request/response examples |
| [Database Schema](deployment/database-schema.md) | Developers | PostgreSQL schema reference: tables, columns, relationships, indexes |
| [Environment Variables](deployment/environment-variables.md) | Developers | Complete reference for all env vars, feature flags, per-environment guide |
| [Testing](deployment/testing.md) | Developers | Vitest/Playwright setup, mocking patterns, writing new tests |

## For CMS Users

| Document | Audience | Description |
|----------|----------|-------------|
| [CMS Admin Guide](deployment/cms-admin-guide.md) | CMS Admins | How to edit pages, manage users, publish news, view analytics |

## Project Status

| Document | Description |
|----------|-------------|
| [Roadmap](../ROADMAP.md) | Feature completion status, phases, and task tracking |

---

All documentation files live in `docs/deployment/` and are served in-app via the OCT-Web-Dev documentation reader at `/admin` (requires OctWebDevPermission).
