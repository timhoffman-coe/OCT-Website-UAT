import { vi } from 'vitest';

export const prisma = {
  user: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  octWebDevPermission: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  auditLog: {
    create: vi.fn(),
  },
  team: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  teamPermission: {
    findMany: vi.fn(),
  },
};
