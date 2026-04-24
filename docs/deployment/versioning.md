# Versioning & Releases

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate version management, changelog generation, and GitHub releases based on [Conventional Commits](https://www.conventionalcommits.org/).

---

## Semantic Versioning

Versions follow the **MAJOR.MINOR.PATCH** format:

| Component | When it increments | Example |
|-----------|-------------------|---------|
| **MAJOR** | Breaking changes | `1.0.0` -> `2.0.0` |
| **MINOR** | New features (backwards-compatible) | `1.0.0` -> `1.1.0` |
| **PATCH** | Bug fixes (backwards-compatible) | `1.0.0` -> `1.0.1` |

---

## Conventional Commits

Every commit message must follow this format:

```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types and Version Bumps

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | **Minor** (0.1.0 -> 0.2.0) |
| `fix` | Bug fix | **Patch** (0.1.0 -> 0.1.1) |
| `docs` | Documentation only | No release |
| `style` | Formatting, whitespace | No release |
| `refactor` | Code restructuring | No release |
| `perf` | Performance improvement | **Patch** |
| `test` | Adding/updating tests | No release |
| `chore` | Build process, tooling | No release |
| `ci` | CI/CD changes | No release |

### Breaking Changes

To trigger a **major** version bump, add `BREAKING CHANGE:` in the commit footer:

```
feat(auth): switch to OAuth2 authentication

BREAKING CHANGE: The /api/login endpoint now requires OAuth2 tokens instead of session cookies.
```

Or use the `!` shorthand: `feat(auth)!: switch to OAuth2 authentication`

### Examples

```bash
# Patch release (bug fix)
git commit -m "fix(dashboard): correct budget chart Y-axis scaling"

# Minor release (new feature)
git commit -m "feat(cms): add bulk content export for team pages"

# No release (documentation)
git commit -m "docs: update deployment guide with rollback steps"

# Major release (breaking change)
git commit -m "feat(api)!: restructure all API routes under /api/v2"
```

---

## Local Enforcement

### Commitlint + Husky

Commit messages are validated locally before they can be committed:

- **[husky](https://typicode.github.io/husky/)** — Runs git hooks automatically
- **[commitlint](https://commitlint.js.org/)** — Validates commit message format

When you try to commit with a non-conventional message, the commit is rejected:

```bash
$ git commit -m "updated the footer"
# ERROR: subject may not be empty
# ERROR: type may not be empty

$ git commit -m "fix(footer): correct copyright year display"
# Commit succeeds
```

### Configuration Files

| File | Purpose |
|------|---------|
| `commitlint.config.js` | Commitlint rules (extends `@commitlint/config-conventional`) |
| `.husky/commit-msg` | Git hook that runs commitlint on each commit |
| `.husky/pre-commit` | Git hook that runs tests before each commit |

---

## Automated Release Pipeline

### How It Works

On every push to `master`, the GitHub Actions workflow (`.github/workflows/release.yml`) runs:

```
Push to master
    |
    v
[Quality Gates] -- lint, test, build
    |
    v
[Semantic Release] -- analyze commits, bump version, update VERSION file,
    |                   generate changelog, create GitHub Release
    v
[Docker Build] -- build and push image to GHCR (only if new version published)
```

### What Semantic Release Does

1. **Analyzes commits** since the last release tag
2. **Determines the version bump** based on commit types
3. **Updates `package.json`** with the new version
4. **Writes the `VERSION` file** with the new version number
5. **Generates `CHANGELOG.md`** with release notes
6. **Creates a git tag** (e.g., `v1.2.0`)
7. **Creates a GitHub Release** with release notes
8. **Commits** the updated `package.json`, `package-lock.json`, `CHANGELOG.md`, and `VERSION` back to `master`

### Docker Image Tags

When a new version is released, Docker images are pushed to GHCR with three tags:

| Tag | Example | Purpose |
|-----|---------|---------|
| `latest` | `ghcr.io/jmcgilliscoe/oct-website:latest` | Always points to newest build |
| `v{semver}` | `ghcr.io/jmcgilliscoe/oct-website:v1.2.0` | Pinned to specific release |
| `{sha}` | `ghcr.io/jmcgilliscoe/oct-website:a1b2c3d` | Pinned to exact commit |

### Configuration

| File | Purpose |
|------|---------|
| `.releaserc.json` | Semantic release plugin config |
| `.github/workflows/release.yml` | GitHub Actions workflow |

---

## The VERSION File

The `VERSION` file in the project root is the **single source of truth** for the application version. It contains only the version number (e.g., `1.2.0`).

### How It Flows

```
semantic-release writes new version to VERSION file
    |
    v
next.config.ts reads VERSION file and sets NEXT_PUBLIC_APP_VERSION
    |
    v
Docker build inlines the version into the Next.js bundle
    |
    v
Footer component displays the version
```

- **Build time**: `next.config.ts` reads the `VERSION` file and sets `NEXT_PUBLIC_APP_VERSION` as an environment variable
- **Docker**: The `VERSION` file is copied into the container at `/app/VERSION` for runtime inspection
- **Runtime**: The Footer component renders `v{version}` below the copyright line
- The version is inlined at build time, so it always matches the version the Docker image was built from

---

## Checking the Current Version

| Method | How |
|--------|-----|
| **Website footer** | Scroll to the bottom of any page |
| **VERSION file** | `cat VERSION` |
| **Docker container** | `docker exec <container> cat VERSION` |
| **package.json** | `node -p "require('./package.json').version"` |
| **Git tags** | `git tag --sort=-v:refnumber \| head -5` |
| **GitHub Releases** | Visit the Releases page on GitHub |
| **Docker image** | Check the image tag (e.g., `v1.2.0`) |

---

## Manual Deployment with Versioning

The `deploy.sh` script also tags Docker images with the semver version:

```bash
./deploy.sh
# Output: Deploying commit: a1b2c3d (v1.2.0)
# Tags: latest, a1b2c3d, v1.2.0
```

---

## CHANGELOG

The `CHANGELOG.md` file in the project root is automatically generated and updated by semantic-release on each release. It contains a chronological list of all changes grouped by version and commit type.

---

## Troubleshooting

### Commitlint rejects my commit

Ensure your message follows the `type(scope): description` format. Common issues:
- Missing type prefix (`feat:`, `fix:`, etc.)
- Type not lowercase
- Empty subject line
- Subject line too long (max 100 characters)

### Semantic release didn't create a release

Only `feat` and `fix` commits trigger releases. Commits with `docs`, `chore`, `style`, `test`, `ci`, or `refactor` types do not create a new version. If your changes include a feature or fix, make sure at least one commit uses the appropriate type.

### How to skip CI on a commit

Add `[skip ci]` to the commit message body or footer. This is automatically done by the release commit.

### GitHub Actions workflow permissions

The workflow requires "Read and write permissions" in repository settings:
**Settings > Actions > General > Workflow permissions > Read and write permissions**

---

## Repository Setup Requirements

For the automated release pipeline to work, ensure:

1. **GitHub Actions enabled** on the repository
2. **Workflow permissions** set to "Read and write permissions"
3. **GHCR access** — the repository must allow GitHub Actions to push packages
4. **Branch protection** — if master has branch protection, allow GitHub Actions to push (or use a GitHub App token)
