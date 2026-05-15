'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { StatusBadge } from '@/components/status-badge';
import type { IdeaStatus } from '@/app/generated/prisma/client';

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; accent: string }> = {
  TECHNICAL_INNOVATION: { label: 'Technical Innovation', emoji: '⚙️', accent: 'from-blue-500 to-blue-600' },
  PROCESS_IMPROVEMENT:  { label: 'Process Improvement',  emoji: '🔄', accent: 'from-emerald-500 to-emerald-600' },
  CLIENT_SOLUTION:      { label: 'Client Solution',      emoji: '🤝', accent: 'from-orange-500 to-orange-600' },
  OTHER:                { label: 'Other',                emoji: '💡', accent: 'from-purple-500 to-purple-600' },
};

const CATEGORY_DATA_LABELS: Record<string, Record<string, string>> = {
  TECHNICAL_INNOVATION: { techStack: 'Tech Stack', complexity: 'Complexity', effort: 'Estimated Effort' },
  PROCESS_IMPROVEMENT:  { painPoints: 'Pain Points', improvement: 'Expected Improvement', affectedTeams: 'Affected Teams' },
  CLIENT_SOLUTION:      { clientIndustry: 'Target Industry', problemStatement: 'Problem Statement', businessImpact: 'Business Impact' },
  OTHER:                { additionalContext: 'Additional Context' },
};

const NEXT_STATUSES: Partial<Record<IdeaStatus, IdeaStatus[]>> = {
  SUBMITTED:    ['UNDER_REVIEW'],
  UNDER_REVIEW: ['ACCEPTED', 'REJECTED'],
};

const STATUS_LABELS: Record<IdeaStatus, string> = {
  SUBMITTED: 'Submitted', UNDER_REVIEW: 'Under Review', ACCEPTED: 'Accepted', REJECTED: 'Rejected',
};

const STAGES = ['INITIAL_SCREENING', 'TECHNICAL_REVIEW', 'BUSINESS_IMPACT', 'FINAL_SELECTION'];
const STAGE_LABELS: Record<string, string> = {
  INITIAL_SCREENING: 'Initial Screening',
  TECHNICAL_REVIEW:  'Technical Review',
  BUSINESS_IMPACT:   'Business Impact',
  FINAL_SELECTION:   'Final Selection',
};
const STAGE_EMOJI: Record<string, string> = {
  INITIAL_SCREENING: '🔍', TECHNICAL_REVIEW: '🔬', BUSINESS_IMPACT: '📊', FINAL_SELECTION: '🏆',
};
const NEXT_STAGES: Record<string, string> = {
  INITIAL_SCREENING: 'TECHNICAL_REVIEW',
  TECHNICAL_REVIEW:  'BUSINESS_IMPACT',
  BUSINESS_IMPACT:   'FINAL_SELECTION',
};

const SCORE_DIMENSIONS = [
  { key: 'innovation',  label: 'Innovation',  emoji: '💡' },
  { key: 'feasibility', label: 'Feasibility', emoji: '🔧' },
  { key: 'impact',      label: 'Impact',      emoji: '📈' },
  { key: 'clarity',     label: 'Clarity',     emoji: '🎯' },
];

interface Attachment { id: string; fileName: string; filePath: string }
interface Comment    { id: string; text: string; createdAt: Date; admin: { email: string } }
interface Score      { id: string; innovation: number; feasibility: number; impact: number; clarity: number; admin: { email: string } }
interface Idea {
  id: string; title: string; description: string; category: string; categoryData: string | null;
  status: IdeaStatus; reviewStage: string; blindReview: boolean; createdAt: Date;
  submitter: { email: string }; attachments: Attachment[]; comments: Comment[]; scores: Score[];
}

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= value ? 'bg-indigo-500' : 'bg-slate-200'}`} />
      ))}
      <span className="text-xs font-bold text-slate-600 ml-1">{value}</span>
    </div>
  );
}

export function AdminIdeasClient({ ideas: initialIdeas }: { ideas: Idea[] }) {
  const router = useRouter();
  const [ideas, setIdeas]                   = useState(initialIdeas);
  useEffect(() => { setIdeas(initialIdeas); }, [initialIdeas]);
  const [commentTexts, setCommentTexts]     = useState<Record<string, string>>({});
  const [selectedStatuses, setSelectedStatuses] = useState<Record<string, IdeaStatus>>({});
  const [scoreInputs, setScoreInputs]       = useState<Record<string, Record<string, string>>>({});
  const [errors, setErrors]                 = useState<Record<string, string>>({});
  const [expanded, setExpanded]             = useState<Record<string, boolean>>({});

  const stats = {
    total:      ideas.length,
    submitted:  ideas.filter((i) => i.status === 'SUBMITTED').length,
    reviewing:  ideas.filter((i) => i.status === 'UNDER_REVIEW').length,
    accepted:   ideas.filter((i) => i.status === 'ACCEPTED').length,
    rejected:   ideas.filter((i) => i.status === 'REJECTED').length,
  };

  async function updateStatus(ideaId: string) {
    const status = selectedStatuses[ideaId];
    if (!status) return;
    const res = await fetch(`/api/admin/${ideaId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (res.ok) {
      setIdeas((prev) => prev.map((i) => i.id === ideaId ? { ...i, status } : i));
      setSelectedStatuses((prev) => { const n = { ...prev }; delete n[ideaId]; return n; });
    } else {
      const d = await res.json().catch(() => ({}));
      setErrors((prev) => ({ ...prev, [ideaId]: d.error ?? 'Failed' }));
    }
  }

  async function advanceStage(ideaId: string, nextStage: string) {
    const res = await fetch(`/api/admin/${ideaId}/stage`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reviewStage: nextStage }) });
    if (res.ok) setIdeas((prev) => prev.map((i) => i.id === ideaId ? { ...i, reviewStage: nextStage } : i));
    else { const d = await res.json().catch(() => ({})); setErrors((prev) => ({ ...prev, [`stage-${ideaId}`]: d.error ?? 'Failed' })); }
  }

  async function toggleBlind(ideaId: string, current: boolean) {
    const res = await fetch(`/api/admin/${ideaId}/blind`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ blindReview: !current }) });
    if (res.ok) setIdeas((prev) => prev.map((i) => i.id === ideaId ? { ...i, blindReview: !current } : i));
  }

  async function addComment(ideaId: string) {
    const text = commentTexts[ideaId]?.trim();
    if (!text) return;
    const res = await fetch(`/api/admin/${ideaId}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
    if (res.ok) { setCommentTexts((prev) => ({ ...prev, [ideaId]: '' })); router.refresh(); }
    else { const d = await res.json().catch(() => ({})); setErrors((prev) => ({ ...prev, [`comment-${ideaId}`]: d.error ?? 'Failed' })); }
  }

  async function submitScore(ideaId: string) {
    const inputs = scoreInputs[ideaId] ?? {};
    const scores: Record<string, number> = {};
    for (const { key } of SCORE_DIMENSIONS) {
      const val = parseInt(inputs[key] ?? '');
      if (isNaN(val) || val < 1 || val > 5) {
        setErrors((prev) => ({ ...prev, [`score-${ideaId}`]: 'All scores must be 1–5' }));
        return;
      }
      scores[key] = val;
    }
    const res = await fetch(`/api/admin/${ideaId}/score`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(scores) });
    if (res.ok) { setScoreInputs((prev) => { const n = { ...prev }; delete n[ideaId]; return n; }); router.refresh(); }
    else { const d = await res.json().catch(() => ({})); setErrors((prev) => ({ ...prev, [`score-${ideaId}`]: d.error ?? 'Failed' })); }
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-slate-600 mb-2">No ideas yet</h3>
        <p className="text-slate-400">Ideas submitted by employees will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'bg-slate-100 text-slate-700', icon: '📋' },
          { label: 'Submitted', value: stats.submitted, color: 'bg-slate-100 text-slate-600', icon: '📬' },
          { label: 'Reviewing', value: stats.reviewing, color: 'bg-amber-50 text-amber-700', icon: '🔍' },
          { label: 'Accepted', value: stats.accepted, color: 'bg-emerald-50 text-emerald-700', icon: '✅' },
          { label: 'Rejected', value: stats.rejected, color: 'bg-rose-50 text-rose-700', icon: '❌' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs font-medium opacity-75">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Idea cards */}
      {ideas.map((idea) => {
        const cat       = CATEGORY_CONFIG[idea.category] ?? { label: idea.category, emoji: '💡', accent: 'from-slate-500 to-slate-600' };
        const nextStatuses = NEXT_STATUSES[idea.status] ?? [];
        const nextStage = NEXT_STAGES[idea.reviewStage];
        const parsedData = idea.categoryData ? JSON.parse(idea.categoryData) as Record<string, string> : null;
        const dataLabels = CATEGORY_DATA_LABELS[idea.category] ?? {};
        const avgScore   = idea.scores.length > 0
          ? (idea.scores.reduce((s, sc) => s + sc.innovation + sc.feasibility + sc.impact + sc.clarity, 0) / (idea.scores.length * 4))
          : null;
        const stageIdx  = STAGES.indexOf(idea.reviewStage);
        const isExpanded = expanded[idea.id] !== false;

        return (
          <div key={idea.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Colored top bar */}
            <div className={`h-1.5 bg-gradient-to-r ${cat.accent}`} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-lg">{cat.emoji}</span>
                    <h3 className="font-bold text-slate-800 text-lg">{idea.title}</h3>
                    {avgScore !== null && (
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-2.5 py-1 rounded-full">
                        ★ {avgScore.toFixed(1)}/5
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                    <span>{idea.blindReview ? '🔒 Anonymous' : idea.submitter.email}</span>
                    <span>·</span>
                    <span className="font-medium text-slate-600">{cat.label}</span>
                    <span>·</span>
                    <span>{format(new Date(idea.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={idea.status} />
                  <button onClick={() => setExpanded((p) => ({ ...p, [idea.id]: !isExpanded }))} className="text-slate-400 hover:text-slate-600 text-xl">
                    {isExpanded ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {/* Stage progress */}
              {idea.status === 'UNDER_REVIEW' && (
                <div className="mb-4">
                  <div className="flex items-center gap-0 mb-1">
                    {STAGES.map((s, i) => (
                      <div key={s} className="flex items-center flex-1">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${i <= stageIdx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <span>{STAGE_EMOJI[s]}</span>
                          <span className="hidden sm:block">{STAGE_LABELS[s]}</span>
                        </div>
                        {i < STAGES.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${i < stageIdx ? 'bg-indigo-400' : 'bg-slate-200'}`} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isExpanded && (
                <>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{idea.description}</p>

                  {/* Category-specific data */}
                  {parsedData && Object.keys(parsedData).filter((k) => parsedData[k]).length > 0 && (
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(parsedData).map(([key, val]) => val ? (
                        <div key={key} className="text-sm">
                          <span className="text-xs text-slate-400 block">{dataLabels[key] ?? key}</span>
                          <span className="font-medium text-slate-700">{val}</span>
                        </div>
                      ) : null)}
                    </div>
                  )}

                  {/* Attachments */}
                  {idea.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.attachments.map((a) => (
                        <a key={a.id} href={`/${a.filePath}`} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                          📎 {a.fileName}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button
                      onClick={() => toggleBlind(idea.id, idea.blindReview)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${idea.blindReview ? 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      {idea.blindReview ? '🔓 Reveal Identity' : '🔒 Enable Blind Review'}
                    </button>

                    {idea.status === 'UNDER_REVIEW' && nextStage && (
                      <button onClick={() => advanceStage(idea.id, nextStage)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 font-medium transition-colors">
                        {STAGE_EMOJI[nextStage]} Advance to {STAGE_LABELS[nextStage]}
                      </button>
                    )}
                  </div>

                  {errors[idea.id] && <p className="text-sm text-rose-600 mb-3">{errors[idea.id]}</p>}

                  {/* Status change */}
                  {nextStatuses.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-medium text-slate-500">Change Status:</span>
                      <select
                        value={selectedStatuses[idea.id] ?? ''}
                        onChange={(e) => setSelectedStatuses((prev) => ({ ...prev, [idea.id]: e.target.value as IdeaStatus }))}
                        className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
                      >
                        <option value="">Change status…</option>
                        {nextStatuses.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                      <button
                        onClick={() => updateStatus(idea.id)}
                        disabled={!selectedStatuses[idea.id]}
                        className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  )}

                  {/* Scoring */}
                  {idea.status === 'UNDER_REVIEW' && (
                    <div className="border border-slate-200 rounded-xl p-4 mb-4 space-y-3">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">⭐ Score This Idea (1–5)</p>
                      {errors[`score-${idea.id}`] && <p className="text-sm text-rose-600">{errors[`score-${idea.id}`]}</p>}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {SCORE_DIMENSIONS.map(({ key, label, emoji }) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">{emoji} {label}</label>
                            <input
                              type="number" min={1} max={5} placeholder="1–5"
                              value={scoreInputs[idea.id]?.[key] ?? ''}
                              onChange={(e) => setScoreInputs((prev) => ({ ...prev, [idea.id]: { ...(prev[idea.id] ?? {}), [key]: e.target.value } }))}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-400 outline-none text-center font-bold"
                            />
                          </div>
                        ))}
                      </div>
                      <button onClick={() => submitScore(idea.id)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Submit Score
                      </button>

                      {idea.scores.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-3">
                          <p className="text-xs font-medium text-slate-500">Submitted Scores</p>
                          {idea.scores.map((s) => (
                            <div key={s.id} className="bg-slate-50 rounded-lg p-3">
                              <p className="text-xs font-medium text-slate-600 mb-2">{s.admin.email}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {SCORE_DIMENSIONS.map(({ key, label }) => (
                                  <div key={key}>
                                    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                                    <ScoreBar value={s[key as keyof typeof s] as number} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Comments */}
                  {idea.comments.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">💬 Evaluation Comments</p>
                      {idea.comments.map((c) => (
                        <div key={c.id} className="bg-slate-50 rounded-xl p-3 text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-700 text-xs">{c.admin.email}</span>
                            <span className="text-xs text-slate-400">{format(new Date(c.createdAt), 'MMM d, yyyy')}</span>
                          </div>
                          <p className="text-slate-600">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">✍️ Add Comment</p>
                    {errors[`comment-${idea.id}`] && <p className="text-sm text-rose-600">{errors[`comment-${idea.id}`]}</p>}
                    <textarea
                      placeholder="Write an evaluation comment…"
                      value={commentTexts[idea.id] ?? ''}
                      onChange={(e) => setCommentTexts((prev) => ({ ...prev, [idea.id]: e.target.value }))}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                    />
                    <button onClick={() => addComment(idea.id)}
                      className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg font-medium hover:bg-slate-800 transition-colors">
                      Add Comment
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
