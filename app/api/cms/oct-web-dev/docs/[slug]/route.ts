import { NextResponse } from 'next/server';
import { requireOctWebDevAccess } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const ALLOWED_DOCS: Record<string, string> = {
  'cicd-pipeline': 'docs/deployment/cicd-pipeline.md',
  'prisma-migration-workflow': 'docs/deployment/prisma-migration-workflow.md',
  'cms-overview': 'docs/deployment/cms-overview.md',
  'api-reference': 'docs/deployment/api-reference.md',
  'architecture-overview': 'docs/deployment/architecture-overview.md',
  'development-setup': 'docs/deployment/development-setup.md',
  'deployment-guide': 'docs/deployment/deployment-guide.md',
  'cms-admin-guide': 'docs/deployment/cms-admin-guide.md',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireOctWebDevAccess();

    const { slug } = await params;
    const relativePath = ALLOWED_DOCS[slug];
    if (!relativePath) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), relativePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    return NextResponse.json({ content });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Forbidden')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to load document' }, { status: 500 });
  }
}
