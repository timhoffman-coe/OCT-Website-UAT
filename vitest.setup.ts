import '@testing-library/jest-dom/vitest';

// Global mock for next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Headers()),
}));

// Global mock for next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));
