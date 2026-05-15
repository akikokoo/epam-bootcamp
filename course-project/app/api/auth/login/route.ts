import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';
import { createSession, sessionCookieOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email: unknown; password: unknown };

  if (!email || !password) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: (email as string).trim() } });
  if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

  const valid = await bcrypt.compare(password as string, user.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

  const token = await createSession(user.id);
  const res = NextResponse.json({ success: true, role: user.role });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
