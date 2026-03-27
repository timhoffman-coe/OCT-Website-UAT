import { NextRequest, NextResponse } from 'next/server';
import { requireNewsAccess } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    await requireNewsAccess();

    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use PNG, JPG, or WebP.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 5MB.' }, { status: 400 });
    }

    const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .substring(0, 50);
    const filename = `${timestamp}-${safeName}.${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'images', 'news');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ path: `/images/news/${filename}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    const status = message.includes('Forbidden') || message.includes('Unauthorized') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
