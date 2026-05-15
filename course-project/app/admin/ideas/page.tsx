import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdminIdeasClient } from './client';

export default async function AdminIdeasPage() {
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/submitter/ideas');

  const ideas = await prisma.idea.findMany({
    where: { isDraft: false },
    include: {
      submitter: { select: { email: true } },
      attachments: true,
      comments: {
        include: { admin: { select: { email: true } } },
        orderBy: { createdAt: 'asc' },
      },
      scores: {
        include: { admin: { select: { email: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-indigo-700 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-3xl font-bold mb-1">Admin Review Dashboard</h1>
          <p className="text-indigo-200 text-sm">Review, score, and advance ideas through the evaluation pipeline</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <AdminIdeasClient ideas={ideas} />
      </div>
    </div>
  );
}
