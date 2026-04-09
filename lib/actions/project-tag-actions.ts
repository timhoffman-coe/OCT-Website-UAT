'use server';

import { prisma } from '@/lib/prisma';
import { requireProjectAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function createTag(name: string) {
  await requireProjectAccess();

  const slug = generateSlug(name);
  const existing = await prisma.projectTag.findUnique({ where: { slug } });
  if (existing) return existing;

  return prisma.projectTag.create({
    data: { name, slug },
  });
}

export async function deleteTag(tagId: string) {
  await requireProjectAccess();

  await prisma.projectTag.delete({ where: { id: tagId } });
  revalidatePath('/admin/projects');
}

export async function getAllTags() {
  return prisma.projectTag.findMany({
    orderBy: { name: 'asc' },
  });
}
