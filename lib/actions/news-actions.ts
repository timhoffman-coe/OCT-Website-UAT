'use server';

import { prisma } from '@/lib/prisma';
import { requireNewsAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import {
  savePost,
  deletePost as deletePostFile,
  generateSlug,
  generateFilename,
  findFilenameBySlug,
  getPostBySlug,
  clearOtherFeatured,
} from '@/lib/news';
import { NewsCategory } from '@/lib/news.types';

interface NewsPostData {
  title: string;
  date: string;
  category: NewsCategory;
  description: string;
  image: string;
  featured: boolean;
  author: string;
  content: string;
  draft: boolean;
}

export async function createNewsPost(data: NewsPostData) {
  const user = await requireNewsAccess();

  const slug = generateSlug(data.title);
  const filename = generateFilename(data.date, slug);

  if (data.featured && !data.draft) {
    clearOtherFeatured(filename);
  }
  savePost(filename, data);

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'NewsPost',
      entityId: slug,
      changes: { title: data.title, category: data.category, draft: data.draft },
    },
  });

  revalidatePath('/news');
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { slug };
}

export async function updateNewsPost(slug: string, data: NewsPostData) {
  const user = await requireNewsAccess();

  // Find existing file and delete it (date or title may have changed)
  const existingFilename = findFilenameBySlug(slug);
  if (existingFilename) {
    deletePostFile(existingFilename);
  }

  // Generate new filename with potentially updated date/title
  const newSlug = generateSlug(data.title);
  const newFilename = generateFilename(data.date, newSlug);

  if (data.featured && !data.draft) {
    clearOtherFeatured(newFilename);
  }
  savePost(newFilename, data);

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'NewsPost',
      entityId: newSlug,
      changes: { title: data.title, category: data.category, draft: data.draft },
    },
  });

  revalidatePath('/news');
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { slug: newSlug };
}

export async function deleteNewsPost(slug: string) {
  const user = await requireNewsAccess();

  const post = getPostBySlug(slug, { includeDrafts: true });
  const filename = findFilenameBySlug(slug);

  if (filename) {
    deletePostFile(filename);
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'NewsPost',
      entityId: slug,
      changes: { title: post?.title ?? slug },
    },
  });

  revalidatePath('/news');
  revalidatePath('/admin/news');
  revalidatePath('/');
}

export async function publishNewsPost(slug: string) {
  const user = await requireNewsAccess();

  const post = getPostBySlug(slug, { includeDrafts: true });
  if (!post) throw new Error('Post not found');

  const filename = findFilenameBySlug(slug);
  if (!filename) throw new Error('File not found');

  if (post.featured) {
    clearOtherFeatured(filename);
  }
  savePost(filename, { ...post, draft: false });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'NewsPost',
      entityId: slug,
      changes: { title: post.title, action: 'publish' },
    },
  });

  revalidatePath('/news');
  revalidatePath('/admin/news');
  revalidatePath('/');
}

export async function unpublishNewsPost(slug: string) {
  const user = await requireNewsAccess();

  const post = getPostBySlug(slug, { includeDrafts: true });
  if (!post) throw new Error('Post not found');

  const filename = findFilenameBySlug(slug);
  if (!filename) throw new Error('File not found');

  savePost(filename, { ...post, draft: true });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'NewsPost',
      entityId: slug,
      changes: { title: post.title, action: 'unpublish' },
    },
  });

  revalidatePath('/news');
  revalidatePath('/admin/news');
  revalidatePath('/');
}
