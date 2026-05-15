import { NextResponse } from 'next/server';
import { destroySession, clearCookieOptions } from '@/lib/auth';

export async function POST() {
  await destroySession();
  const res = NextResponse.json({ success: true });
  res.cookies.set(clearCookieOptions());
  return res;
}
