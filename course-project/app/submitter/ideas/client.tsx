'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IdeaForm } from '@/components/idea-form';
import { IdeaCard } from '@/components/idea-card';
import type { IdeaStatus } from '@/app/generated/prisma/client';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryData: string | null;
  status: IdeaStatus;
  isDraft: boolean;
  createdAt: Date;
  attachments: { id: string; fileName: string; filePath: string }[];
}

export function SubmitterIdeasClient({ ideas }: { ideas: Idea[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingDraft, setEditingDraft] = useState<Idea | null>(null);

  function handleSuccess() {
    setShowForm(false);
    setEditingDraft(null);
    router.refresh();
  }

  function handleEditDraft(id: string) {
    const draft = ideas.find((i) => i.id === id);
    if (draft) {
      setEditingDraft(draft);
      setShowForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleNewIdea() {
    setEditingDraft(null);
    setShowForm((v) => !v);
  }

  const submitted = ideas.filter((i) => !i.isDraft);
  const drafts = ideas.filter((i) => i.isDraft);

  const statsByStatus = submitted.reduce<Record<string, number>>((acc, idea) => {
    acc[idea.status] = (acc[idea.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Submitted', value: submitted.length, color: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
          { label: 'Under Review',    value: statsByStatus['UNDER_REVIEW'] ?? 0, color: 'from-amber-400 to-orange-400', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
          { label: 'Accepted',        value: statsByStatus['ACCEPTED'] ?? 0, color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
          { label: 'Drafts',          value: drafts.length, color: 'from-slate-400 to-slate-500', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border ${s.border} ${s.bg} p-4 flex flex-col gap-1`}>
            <span className={`text-2xl font-bold ${s.text}`}>{s.value}</span>
            <span className="text-xs text-slate-500 font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* New Idea toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">
          {showForm ? (editingDraft ? '✏️ Editing Draft' : '💡 New Idea') : 'Your Ideas'}
        </h2>
        <button
          onClick={handleNewIdea}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            showForm
              ? 'border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200'
          }`}
        >
          {showForm ? '✕ Cancel' : '+ New Idea'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <IdeaForm
          onSuccess={handleSuccess}
          draft={editingDraft ? {
            id: editingDraft.id,
            title: editingDraft.title,
            description: editingDraft.description,
            category: editingDraft.category,
            categoryData: editingDraft.categoryData,
          } : undefined}
        />
      )}

      {/* Drafts section */}
      {drafts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              💾 Drafts ({drafts.length})
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {drafts.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                category={idea.category}
                status={idea.status}
                isDraft={idea.isDraft}
                createdAt={idea.createdAt}
                attachments={idea.attachments}
                onEdit={handleEditDraft}
              />
            ))}
          </div>
        </div>
      )}

      {/* Submitted section */}
      {submitted.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              🚀 Submitted ({submitted.length})
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {submitted.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                category={idea.category}
                status={idea.status}
                isDraft={idea.isDraft}
                createdAt={idea.createdAt}
                attachments={idea.attachments}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {ideas.length === 0 && !showForm && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="text-5xl mb-4">💡</div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">No ideas yet</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-xs mx-auto">
            Share your first innovation idea with the team and help shape the future of EPAM.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-lg shadow-indigo-200 transition-all"
          >
            Submit Your First Idea
          </button>
        </div>
      )}
    </div>
  );
}
