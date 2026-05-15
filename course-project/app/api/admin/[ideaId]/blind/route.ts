import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ ideaId: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { ideaId } = await params;
  const body = await req.json().catch(() => ({}));
  const { blindReview } = body as { blindReview: unknown };

  if (typeof blindReview !== 'boolean') {
    return NextResponse.json({ error: 'blindReview must be a boolean' }, { status: 400 });
  }

  const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!idea) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

  const updated = await prisma.idea.update({
    where: { id: ideaId },
    data: { blindReview },
  });

  return NextResponse.json(updated);
}
