import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ ideaId: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { ideaId } = await params;
  const body = await req.json().catch(() => ({}));
  const { text } = body as { text: unknown };

  if (!text || typeof text !== 'string' || !text.trim()) {
    return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
  }

  const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!idea) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

  const comment = await prisma.evaluationComment.create({
    data: { text: text.trim(), adminId: user.id, ideaId },
  });

  return NextResponse.json(comment, { status: 201 });
}
