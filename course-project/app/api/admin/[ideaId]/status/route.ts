import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import type { IdeaStatus } from '@/app/generated/prisma/client';

const VALID_TRANSITIONS: Record<IdeaStatus, IdeaStatus[]> = {
  SUBMITTED:    ['UNDER_REVIEW'],
  UNDER_REVIEW: ['ACCEPTED', 'REJECTED'],
  ACCEPTED:     [],
  REJECTED:     [],
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ ideaId: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { ideaId } = await params;
  const body = await req.json().catch(() => ({}));
  const { status } = body as { status: IdeaStatus };

  const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!idea) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

  const allowed = VALID_TRANSITIONS[idea.status] ?? [];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: 'Invalid status transition' }, { status: 400 });
  }

  const updated = await prisma.idea.update({
    where: { id: ideaId },
    data: { status },
  });

  return NextResponse.json(updated);
}
