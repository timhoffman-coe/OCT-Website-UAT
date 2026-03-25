import { describe, it, expect, vi, beforeEach } from 'vitest';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn() },
    team: { findUnique: vi.fn(), findMany: vi.fn() },
  },
}));

// Helper to set the mock email header
function mockEmail(email: string | null) {
  const h = new Headers();
  if (email) h.set('x-user-email', email);
  vi.mocked(headers).mockResolvedValue(h as Awaited<ReturnType<typeof headers>>);
}

// Factory for fake users
function fakeUser(overrides: Record<string, unknown> = {}) {
  return {
    id: 'user-1',
    email: 'test@edmonton.ca',
    name: 'Test User',
    role: 'VIEWER',
    teamPermissions: [],
    roadmapPermission: null,
    octWebDevPermission: null,
    ...overrides,
  };
}

describe('auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('returns null when no email header', async () => {
      mockEmail(null);
      const { getCurrentUser } = await import('./auth');
      const user = await getCurrentUser();
      expect(user).toBeNull();
    });

    it('returns user when email header is present', async () => {
      mockEmail('test@edmonton.ca');
      const user = fakeUser();
      vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);
      const { getCurrentUser } = await import('./auth');
      const result = await getCurrentUser();
      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@edmonton.ca' },
        include: { teamPermissions: true, roadmapPermission: true, octWebDevPermission: true },
      });
    });

    it('returns null when user not found in database', async () => {
      mockEmail('unknown@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null as never);
      const { getCurrentUser } = await import('./auth');
      const result = await getCurrentUser();
      expect(result).toBeNull();
    });
  });

  describe('requireUser', () => {
    it('throws Unauthorized when no user', async () => {
      mockEmail(null);
      const { requireUser } = await import('./auth');
      await expect(requireUser()).rejects.toThrow('Unauthorized');
    });

    it('returns user when authenticated', async () => {
      mockEmail('test@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(fakeUser() as never);
      const { requireUser } = await import('./auth');
      const result = await requireUser();
      expect(result.email).toBe('test@edmonton.ca');
    });
  });

  describe('requireTeamAccess', () => {
    it('SUPER_ADMIN always passes', async () => {
      mockEmail('admin@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ role: 'SUPER_ADMIN', email: 'admin@edmonton.ca' }) as never
      );
      const { requireTeamAccess } = await import('./auth');
      const user = await requireTeamAccess('team-1');
      expect(user.role).toBe('SUPER_ADMIN');
    });

    it('TEAM_ADMIN with matching teamId passes', async () => {
      mockEmail('ta@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({
          role: 'TEAM_ADMIN',
          teamPermissions: [{ teamId: 'team-1' }],
        }) as never
      );
      // team-1 has no parent
      vi.mocked(prisma.team.findUnique).mockResolvedValue({ parentId: null } as never);
      const { requireTeamAccess } = await import('./auth');
      const user = await requireTeamAccess('team-1');
      expect(user.role).toBe('TEAM_ADMIN');
    });

    it('TEAM_ADMIN with parent permission can access child team', async () => {
      mockEmail('ta@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({
          role: 'TEAM_ADMIN',
          teamPermissions: [{ teamId: 'parent-1' }],
        }) as never
      );
      // child-1 has parent-1 as parent; parent-1 has no parent
      vi.mocked(prisma.team.findUnique)
        .mockResolvedValueOnce({ parentId: 'parent-1' } as never)
        .mockResolvedValueOnce({ parentId: null } as never);
      const { requireTeamAccess } = await import('./auth');
      const user = await requireTeamAccess('child-1');
      expect(user.role).toBe('TEAM_ADMIN');
    });

    it('TEAM_ADMIN without matching teamId throws', async () => {
      mockEmail('ta@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({
          role: 'TEAM_ADMIN',
          teamPermissions: [{ teamId: 'team-2' }],
        }) as never
      );
      vi.mocked(prisma.team.findUnique).mockResolvedValue({ parentId: null } as never);
      const { requireTeamAccess } = await import('./auth');
      await expect(requireTeamAccess('team-1')).rejects.toThrow('Forbidden');
    });

    it('VIEWER always throws', async () => {
      mockEmail('viewer@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(fakeUser() as never);
      const { requireTeamAccess } = await import('./auth');
      await expect(requireTeamAccess('team-1')).rejects.toThrow('Forbidden');
    });
  });

  describe('requireTeamViewAccess', () => {
    it('SUPER_ADMIN always passes', async () => {
      mockEmail('admin@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ role: 'SUPER_ADMIN' }) as never
      );
      const { requireTeamViewAccess } = await import('./auth');
      const user = await requireTeamViewAccess('team-1');
      expect(user.role).toBe('SUPER_ADMIN');
    });

    it('user with matching team permission passes', async () => {
      mockEmail('viewer@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({
          role: 'VIEWER',
          teamPermissions: [{ teamId: 'team-1' }],
        }) as never
      );
      vi.mocked(prisma.team.findUnique).mockResolvedValue({ parentId: null } as never);
      const { requireTeamViewAccess } = await import('./auth');
      const user = await requireTeamViewAccess('team-1');
      expect(user).toBeDefined();
    });

    it('user with parent permission can view child team', async () => {
      mockEmail('viewer@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({
          role: 'VIEWER',
          teamPermissions: [{ teamId: 'parent-1' }],
        }) as never
      );
      vi.mocked(prisma.team.findUnique)
        .mockResolvedValueOnce({ parentId: 'parent-1' } as never)
        .mockResolvedValueOnce({ parentId: null } as never);
      const { requireTeamViewAccess } = await import('./auth');
      const user = await requireTeamViewAccess('child-1');
      expect(user).toBeDefined();
    });

    it('user without matching team permission throws', async () => {
      mockEmail('viewer@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({
          role: 'VIEWER',
          teamPermissions: [],
        }) as never
      );
      vi.mocked(prisma.team.findUnique).mockResolvedValue({ parentId: null } as never);
      const { requireTeamViewAccess } = await import('./auth');
      await expect(requireTeamViewAccess('team-1')).rejects.toThrow('Forbidden');
    });
  });

  describe('requireSuperAdmin', () => {
    it('passes for SUPER_ADMIN', async () => {
      mockEmail('admin@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ role: 'SUPER_ADMIN' }) as never
      );
      const { requireSuperAdmin } = await import('./auth');
      const user = await requireSuperAdmin();
      expect(user.role).toBe('SUPER_ADMIN');
    });

    it('throws for non-SUPER_ADMIN', async () => {
      mockEmail('ta@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ role: 'TEAM_ADMIN' }) as never
      );
      const { requireSuperAdmin } = await import('./auth');
      await expect(requireSuperAdmin()).rejects.toThrow('Forbidden: Super admin required');
    });
  });

  describe('canViewOctWebDev', () => {
    it('returns true for SUPER_ADMIN', async () => {
      mockEmail('admin@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ role: 'SUPER_ADMIN' }) as never
      );
      const { canViewOctWebDev } = await import('./auth');
      expect(await canViewOctWebDev()).toBe(true);
    });

    it('returns true when user has octWebDevPermission', async () => {
      mockEmail('dev@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ octWebDevPermission: { id: 'perm-1' } }) as never
      );
      const { canViewOctWebDev } = await import('./auth');
      expect(await canViewOctWebDev()).toBe(true);
    });

    it('returns false when user has no permission', async () => {
      mockEmail('noone@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(fakeUser() as never);
      const { canViewOctWebDev } = await import('./auth');
      expect(await canViewOctWebDev()).toBe(false);
    });

    it('returns false when not authenticated', async () => {
      mockEmail(null);
      const { canViewOctWebDev } = await import('./auth');
      expect(await canViewOctWebDev()).toBe(false);
    });
  });

  describe('requireOctWebDevAccess', () => {
    it('passes for SUPER_ADMIN', async () => {
      mockEmail('admin@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        fakeUser({ role: 'SUPER_ADMIN' }) as never
      );
      const { requireOctWebDevAccess } = await import('./auth');
      const user = await requireOctWebDevAccess();
      expect(user.role).toBe('SUPER_ADMIN');
    });

    it('throws when user has no octWebDevPermission', async () => {
      mockEmail('noone@edmonton.ca');
      vi.mocked(prisma.user.findUnique).mockResolvedValue(fakeUser() as never);
      const { requireOctWebDevAccess } = await import('./auth');
      await expect(requireOctWebDevAccess()).rejects.toThrow('Forbidden');
    });
  });

  describe('getManageableTeamIds', () => {
    it('returns child team IDs', async () => {
      vi.mocked(prisma.team.findMany).mockResolvedValue([
        { id: 'child-1' },
        { id: 'child-2' },
      ] as never);
      const { getManageableTeamIds } = await import('./auth');
      const ids = await getManageableTeamIds(['parent-1']);
      expect(ids).toEqual(['child-1', 'child-2']);
      expect(prisma.team.findMany).toHaveBeenCalledWith({
        where: { parentId: { in: ['parent-1'] } },
        select: { id: true },
      });
    });

    it('returns empty array when no children', async () => {
      vi.mocked(prisma.team.findMany).mockResolvedValue([] as never);
      const { getManageableTeamIds } = await import('./auth');
      const ids = await getManageableTeamIds(['orphan-team']);
      expect(ids).toEqual([]);
    });
  });
});
