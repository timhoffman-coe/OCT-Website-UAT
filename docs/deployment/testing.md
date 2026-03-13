# Testing

This project uses **Vitest** for unit/integration tests and **Playwright** for end-to-end tests.

## Quick Start

```bash
# Run all unit & integration tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run E2E tests (requires dev server + database)
npm run test:e2e
```

## Framework Choices

| Layer | Tool | Why |
|-------|------|-----|
| Unit / Integration | Vitest | ESM-native, fast, built-in TypeScript support, React 19 compatible |
| Component rendering | React Testing Library | Standard DOM-based testing for React components |
| E2E | Playwright | Multi-browser support, reliable, good Next.js App Router support |

## Test File Conventions

Tests are **co-located** next to the source file they test:

```
lib/
  slugify.ts
  slugify.test.ts        ← unit test
  auth.ts
  auth.test.ts           ← unit test with mocks
app/api/cms/oct-web-dev/
  check-access/
    route.ts
    route.test.ts         ← API route test
__tests__/
  integration/
    permission-crud.test.ts  ← integration test
e2e/
  auth-gate.spec.ts       ← Playwright E2E test
  oct-web-dev-docs.spec.ts
```

- Unit/integration tests: `*.test.ts` or `*.test.tsx`
- E2E tests: `*.spec.ts` in the `e2e/` directory

## Configuration Files

- `vitest.config.ts` — Vitest configuration (jsdom environment, path aliases, setup file)
- `vitest.setup.ts` — Global test setup (jest-dom matchers, `next/headers` and `next/cache` mocks)
- `playwright.config.ts` — Playwright configuration (chromium, localhost:3000, webServer auto-start)

## Mocking Patterns

### Prisma

The database is mocked at the module level. A mock file at `lib/__mocks__/prisma.ts` provides `vi.fn()` stubs for each model method.

```typescript
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn(), findMany: vi.fn() },
    // ... other models
  },
}));
```

For integration tests that need stateful behavior, use inline `vi.mock` factories with local state (Maps, arrays) to simulate database operations.

### next/headers

Mocked globally in `vitest.setup.ts`. Override per-test to control the email header:

```typescript
import { headers } from 'next/headers';

function mockEmail(email: string | null) {
  const h = new Headers();
  if (email) h.set('x-user-email', email);
  vi.mocked(headers).mockResolvedValue(h);
}
```

### next/cache

`revalidatePath` and `revalidateTag` are mocked globally as no-ops. No per-test setup needed.

### File System (fs)

For API routes that read files, use `vi.hoisted()` to create the mock before the module loads:

```typescript
const { mockReadFileSync } = vi.hoisted(() => ({
  mockReadFileSync: vi.fn(),
}));

vi.mock('fs', () => ({
  default: { readFileSync: mockReadFileSync },
  readFileSync: mockReadFileSync,
}));
```

### next/dynamic

For components using `next/dynamic`, mock the dynamic import to return a simple placeholder:

```typescript
vi.mock('next/dynamic', () => ({
  default: () => () => <div>Mock Component</div>,
}));
```

## Writing New Tests

1. Create a `*.test.ts` file next to the source file
2. Import from `vitest` (`describe`, `it`, `expect`, `vi`)
3. Mock dependencies with `vi.mock()` at the top of the file
4. Use `beforeEach(() => vi.clearAllMocks())` to reset between tests
5. For API route tests, call the exported handler functions directly — they're async functions that take a `Request` and return a `Response`

### Example: Testing an API Route

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/auth', () => ({
  requireSuperAdmin: vi.fn(),
}));

import { GET } from './route';
import { requireSuperAdmin } from '@/lib/auth';

describe('GET /api/my-route', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns data when authorized', async () => {
    vi.mocked(requireSuperAdmin).mockResolvedValue({} as never);
    const res = await GET();
    expect(res.status).toBe(200);
  });
});
```

## E2E Tests

E2E tests live in the `e2e/` directory and use Playwright. They require:

- A running dev server (`npm run dev`)
- A seeded PostgreSQL database
- For authenticated tests: `DEV_BYPASS_IAP=true` and a user with appropriate permissions

Run with:

```bash
# Install browsers (first time only)
npx playwright install chromium

# Run E2E tests
npm run test:e2e

# Run with Playwright UI
npx playwright test --ui
```

Some E2E tests are gated behind `E2E_FULL=true` to skip when the full environment isn't available.

## Test Coverage

The test suite covers:

- **Utility functions**: slugify, logger, feature flags, icon resolver, environment validation
- **Auth layer**: all permission checks (getCurrentUser, requireUser, requireTeamAccess, canViewOctWebDev, etc.)
- **API routes**: oct-web-dev check-access, content, and docs endpoints
- **Server actions**: permission add/remove with audit logging
- **Components**: oct-web-dev page rendering, admin viewers management
- **Integration**: full permission CRUD lifecycle with stateful mocks
- **E2E**: access gate, page rendering, docs navigation
