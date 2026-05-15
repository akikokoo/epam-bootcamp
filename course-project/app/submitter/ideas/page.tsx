import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { SubmitterIdeasClient } from './client';

export default async function SubmitterIdeasPage() {
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role === 'admin') redirect('/admin/ideas');

  const ideas = await prisma.idea.findMany({
    where: { submitterId: user.id },
    include: { attachments: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h1 className="text-3xl font-bold mb-1">My Innovation Hub</h1>
          <p className="text-indigo-200 text-sm">Track and manage all your innovation ideas in one place</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <SubmitterIdeasClient ideas={ideas} />
      </div>
    </div>
  );
}
