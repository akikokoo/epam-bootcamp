import type { IdeaStatus } from '@/app/generated/prisma/client';

const STATUS_CONFIG: Record<IdeaStatus, { label: string; emoji: string; className: string }> = {
  SUBMITTED:    { label: 'Submitted',    emoji: '📬', className: 'bg-slate-100 text-slate-700 border-slate-200' },
  UNDER_REVIEW: { label: 'Under Review', emoji: '🔍', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  ACCEPTED:     { label: 'Accepted',     emoji: '✅', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  REJECTED:     { label: 'Rejected',     emoji: '❌', className: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export function StatusBadge({ status }: { status: IdeaStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.className}`}>
      <span>{cfg.emoji}</span>
      {cfg.label}
    </span>
  );
}
