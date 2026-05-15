import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';
import { validateEmail, validatePassword } from '@/lib/validation';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email: unknown; password: unknown };

  const emailError = validateEmail(email as string);
  if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

  const passwordError = validatePassword(password as string);
  if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email: (email as string).trim() } });
  if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

  const passwordHash = await bcrypt.hash(password as string, 12);
  await prisma.user.create({
    data: { email: (email as string).trim(), passwordHash, role: 'submitter' },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
