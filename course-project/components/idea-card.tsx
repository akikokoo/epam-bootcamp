'use client';

import { format } from 'date-fns';
import { StatusBadge } from '@/components/status-badge';
import type { IdeaStatus } from '@/app/generated/prisma/client';

interface IdeaCardProps {
  id: string;
  title: string;
  category: string;
  status: IdeaStatus;
  isDraft: boolean;
  createdAt: Date;
  attachments?: { id: string; fileName: string; filePath: string }[];
  onEdit?: (id: string) => void;
}

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; className: string }> = {
  TECHNICAL_INNOVATION: { label: 'Technical Innovation', emoji: '⚙️', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  PROCESS_IMPROVEMENT:  { label: 'Process Improvement',  emoji: '🔄', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  CLIENT_SOLUTION:      { label: 'Client Solution',      emoji: '🤝', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  OTHER:                { label: 'Other',                emoji: '💡', className: 'bg-purple-50 text-purple-700 border-purple-200' },
};

const CATEGORY_ACCENT: Record<string, string> = {
  TECHNICAL_INNOVATION: 'from-blue-500 to-blue-600',
  PROCESS_IMPROVEMENT:  'from-emerald-500 to-emerald-600',
  CLIENT_SOLUTION:      'from-orange-500 to-orange-600',
  OTHER:                'from-purple-500 to-purple-600',
};

export function IdeaCard({ id, title, category, status, isDraft, createdAt, attachments, onEdit }: IdeaCardProps) {
  const cat = CATEGORY_CONFIG[category] ?? { label: category, emoji: '💡', className: 'bg-slate-50 text-slate-700 border-slate-200' };
  const accent = CATEGORY_ACCENT[category] ?? 'from-slate-500 to-slate-600';

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isDraft ? 'opacity-75 border-dashed' : 'border-slate-200'}`}>
      <div className={`h-1.5 bg-gradient-to-r ${isDraft ? 'from-slate-300 to-slate-400' : accent}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-slate-800 text-base leading-snug flex-1">{title}</h3>
          {isDraft ? (
            <span className="shrink-0 text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-medium border border-slate-200">
              Draft
            </span>
          ) : (
            <StatusBadge status={status} />
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cat.className}`}>
            <span>{cat.emoji}</span>
            {cat.label}
          </span>
          <span className="text-xs text-slate-400">{format(new Date(createdAt), 'MMM d, yyyy')}</span>
        </div>

        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attachments.map((a) => (
              <a
                key={a.id}
                href={`/${a.filePath}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                📎 {a.fileName}
              </a>
            ))}
          </div>
        )}

        {isDraft && onEdit && (
          <button
            onClick={() => onEdit(id)}
            className="mt-2 text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
          >
            ✏️ Edit Draft
          </button>
        )}
      </div>
    </div>
  );
}
