'use server';

import { prisma } from '@/lib/prisma';
import { requireLinksAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

function revalidateLinks() {
  revalidatePath('/links');
  revalidatePath('/admin/links');
}

// ── LinkCategory CRUD ──────────────────────────────────

interface CategoryData {
  title: string;
  subtitle: string;
  iconBg?: string;
  iconColor?: string;
  isTeamGrid?: boolean;
}

export async function createLinkCategory(data: CategoryData) {
  const user = await requireLinksAccess();

  const maxSort = await prisma.linkCategory.aggregate({
    _max: { sortOrder: true },
  });

  const category = await prisma.linkCategory.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      iconBg: data.iconBg ?? 'bg-blue-50',
      iconColor: data.iconColor ?? 'text-process-blue',
      isTeamGrid: data.isTeamGrid ?? false,
      sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'LinkCategory',
      entityId: category.id,
      description: `Created link category '${data.title}'`,
      changes: { ...data },
    },
  });

  revalidateLinks();
  return category;
}

export async function updateLinkCategory(id: string, data: Partial<CategoryData>) {
  const user = await requireLinksAccess();

  const before = await prisma.linkCategory.findUniqueOrThrow({ where: { id } });

  const updated = await prisma.linkCategory.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
      ...(data.iconBg !== undefined && { iconBg: data.iconBg }),
      ...(data.iconColor !== undefined && { iconColor: data.iconColor }),
      ...(data.isTeamGrid !== undefined && { isTeamGrid: data.isTeamGrid }),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'LinkCategory',
      entityId: id,
      description: `Updated link category '${before.title}'`,
      changes: { before, after: updated },
    },
  });

  revalidateLinks();
  return updated;
}

export async function deleteLinkCategory(id: string) {
  const user = await requireLinksAccess();

  const category = await prisma.linkCategory.findUniqueOrThrow({ where: { id } });

  await prisma.linkCategory.delete({ where: { id } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'LinkCategory',
      entityId: id,
      description: `Deleted link category '${category.title}'`,
      changes: category,
    },
  });

  revalidateLinks();
}

export async function reorderLinkCategories(orderedIds: string[]) {
  const user = await requireLinksAccess();

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.linkCategory.update({ where: { id }, data: { sortOrder: index } })
    )
  );

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'LinkCategory',
      entityId: 'bulk',
      description: `Reordered ${orderedIds.length} link categories`,
      changes: { orderedIds },
    },
  });

  revalidateLinks();
}

// ── LinkItem CRUD ──────────────────────────────────────

interface LinkItemData {
  name: string;
  url: string;
}

export async function createLinkItem(categoryId: string, data: LinkItemData) {
  const user = await requireLinksAccess();

  const maxSort = await prisma.linkItem.aggregate({
    where: { categoryId },
    _max: { sortOrder: true },
  });

  const link = await prisma.linkItem.create({
    data: {
      categoryId,
      name: data.name,
      url: data.url,
      sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'LinkItem',
      entityId: link.id,
      description: `Created link '${data.name}'`,
      changes: { categoryId, ...data },
    },
  });

  revalidateLinks();
  return link;
}

export async function updateLinkItem(id: string, data: Partial<LinkItemData>) {
  const user = await requireLinksAccess();

  const before = await prisma.linkItem.findUniqueOrThrow({ where: { id } });

  const updated = await prisma.linkItem.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.url !== undefined && { url: data.url }),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'LinkItem',
      entityId: id,
      description: `Updated link '${before.name}'`,
      changes: { before, after: updated },
    },
  });

  revalidateLinks();
  return updated;
}

export async function deleteLinkItem(id: string) {
  const user = await requireLinksAccess();

  const link = await prisma.linkItem.findUniqueOrThrow({ where: { id } });

  await prisma.linkItem.delete({ where: { id } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'LinkItem',
      entityId: id,
      description: `Deleted link '${link.name}'`,
      changes: link,
    },
  });

  revalidateLinks();
}

export async function reorderLinkItems(categoryId: string, orderedIds: string[]) {
  const user = await requireLinksAccess();

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.linkItem.update({ where: { id }, data: { sortOrder: index } })
    )
  );

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'LinkItem',
      entityId: 'bulk',
      description: `Reordered ${orderedIds.length} links in category`,
      changes: { categoryId, orderedIds },
    },
  });

  revalidateLinks();
}
