import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ ideaId: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { ideaId } = await params;
  const body = await req.json().catch(() => ({}));
  const { innovation, feasibility, impact, clarity } = body as Record<string, unknown>;

  const dims = { innovation, feasibility, impact, clarity };
  for (const [key, val] of Object.entries(dims)) {
    if (typeof val !== 'number' || val < 1 || val > 5 || !Number.isInteger(val)) {
      return NextResponse.json({ error: `${key} must be an integer between 1 and 5` }, { status: 400 });
    }
  }

  const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!idea) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

  const score = await prisma.ideaScore.upsert({
    where: { ideaId_adminId: { ideaId, adminId: user.id } },
    create: {
      ideaId,
      adminId: user.id,
      innovation: innovation as number,
      feasibility: feasibility as number,
      impact: impact as number,
      clarity: clarity as number,
    },
    update: {
      innovation: innovation as number,
      feasibility: feasibility as number,
      impact: impact as number,
      clarity: clarity as number,
    },
  });

  return NextResponse.json(score, { status: 201 });
}
