'use client';

import { useState, useRef } from 'react';

const CATEGORIES = [
  { value: 'TECHNICAL_INNOVATION', label: 'Technical Innovation', emoji: '⚙️', desc: 'New tools, engineering improvements, technical solutions', color: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { value: 'PROCESS_IMPROVEMENT',  label: 'Process Improvement',  emoji: '🔄', desc: 'Workflow optimizations, efficiency gains, automation',     color: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
  { value: 'CLIENT_SOLUTION',      label: 'Client Solution',      emoji: '🤝', desc: 'Products or services addressing specific client needs',   color: 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100' },
  { value: 'OTHER',                label: 'Other',                emoji: '💡', desc: 'Any other innovative idea worth exploring',              color: 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100' },
];

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'mp4', 'mov', 'pptx'];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

interface IdeaFormProps {
  onSuccess: () => void;
  draft?: { id: string; title: string; description: string; category: string; categoryData: string | null };
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function TextInput({ id, value, onChange, placeholder, maxLength, required }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number; required?: boolean }) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all text-sm"
    />
  );
}

function TextArea({ id, value, onChange, placeholder, maxLength, rows, required }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number; rows?: number; required?: boolean }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={rows ?? 4}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all text-sm resize-none"
    />
  );
}

function SelectInput({ id, value, onChange, options }: { id: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all text-sm"
    >
      <option value="">Select…</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function IdeaForm({ onSuccess, draft }: IdeaFormProps) {
  const [title, setTitle]             = useState(draft?.title ?? '');
  const [description, setDescription] = useState(draft?.description ?? '');
  const [category, setCategory]       = useState(draft?.category ?? '');
  const [categoryFields, setCategoryFields] = useState<Record<string, string>>(
    draft?.categoryData ? JSON.parse(draft.categoryData) : {}
  );
  const [error, setError]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const filesRef = useRef<HTMLInputElement>(null);

  function updateField(key: string, value: string) {
    setCategoryFields((prev) => ({ ...prev, [key]: value }));
  }

  function handleCategoryChange(v: string) {
    setCategory(v);
    setCategoryFields({});
  }

  async function submit(isDraft: boolean) {
    setError('');
    const files = filesRef.current?.files;
    if (files) {
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
          setError(`File type not allowed: .${ext}`);
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError(`"${file.name}" exceeds 50MB limit`);
          return;
        }
      }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('categoryData', JSON.stringify(categoryFields));
    formData.append('isDraft', String(isDraft));
    if (draft?.id) formData.append('draftId', draft.id);
    if (files) for (const file of Array.from(files)) formData.append('files', file);

    isDraft ? setSavingDraft(true) : setSubmitting(true);
    const res = await fetch('/api/ideas', { method: 'POST', body: formData });
    isDraft ? setSavingDraft(false) : setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Failed to submit idea');
      return;
    }

    setTitle(''); setDescription(''); setCategory(''); setCategoryFields({});
    if (filesRef.current) filesRef.current.value = '';
    onSuccess();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
        <h2 className="text-white font-bold text-lg">{draft ? '✏️ Edit Draft' : '💡 Submit a New Idea'}</h2>
        <p className="text-indigo-200 text-sm">Share your innovation with the team</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); submit(false); }} className="p-6 space-y-6">
        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <Field label="Title *">
          <TextInput id="title" value={title} onChange={setTitle} placeholder="Give your idea a clear, catchy title" maxLength={200} required />
        </Field>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">Category *</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => handleCategoryChange(c.value)}
                className={`flex items-start gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${
                  category === c.value
                    ? 'border-indigo-400 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="text-lg mt-0.5">{c.emoji}</span>
                <div>
                  <div className={`text-xs font-semibold ${category === c.value ? 'text-indigo-700' : 'text-slate-700'}`}>{c.label}</div>
                  <div className="text-xs text-slate-400 leading-tight mt-0.5">{c.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {category === 'TECHNICAL_INNOVATION' && (
          <div className="bg-blue-50 rounded-xl p-4 space-y-3 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">⚙️ Technical Details</p>
            <Field label="Technology Stack">
              <TextInput id="techStack" value={categoryFields.techStack ?? ''} onChange={(v) => updateField('techStack', v)} placeholder="e.g. React, Node.js, AWS" maxLength={200} />
            </Field>
            <Field label="Technical Complexity">
              <SelectInput id="complexity" value={categoryFields.complexity ?? ''} onChange={(v) => updateField('complexity', v)} options={[{ value: 'Low', label: 'Low' }, { value: 'Medium', label: 'Medium' }, { value: 'High', label: 'High' }]} />
            </Field>
            <Field label="Estimated Development Time">
              <TextInput id="effort" value={categoryFields.effort ?? ''} onChange={(v) => updateField('effort', v)} placeholder="e.g. 2 weeks, 3 months" maxLength={100} />
            </Field>
          </div>
        )}

        {category === 'PROCESS_IMPROVEMENT' && (
          <div className="bg-emerald-50 rounded-xl p-4 space-y-3 border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">🔄 Process Details</p>
            <Field label="Current Process Pain Points">
              <TextArea id="painPoints" value={categoryFields.painPoints ?? ''} onChange={(v) => updateField('painPoints', v)} placeholder="What's inefficient or broken today?" rows={3} maxLength={1000} />
            </Field>
            <Field label="Expected Improvement">
              <TextInput id="improvement" value={categoryFields.improvement ?? ''} onChange={(v) => updateField('improvement', v)} placeholder="e.g. 30% faster, saves 5 hrs/week" maxLength={200} />
            </Field>
            <Field label="Affected Teams">
              <TextInput id="affectedTeams" value={categoryFields.affectedTeams ?? ''} onChange={(v) => updateField('affectedTeams', v)} placeholder="e.g. QA, DevOps, Client Delivery" maxLength={200} />
            </Field>
          </div>
        )}

        {category === 'CLIENT_SOLUTION' && (
          <div className="bg-orange-50 rounded-xl p-4 space-y-3 border border-orange-100">
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">🤝 Client Details</p>
            <Field label="Target Client / Industry">
              <TextInput id="clientIndustry" value={categoryFields.clientIndustry ?? ''} onChange={(v) => updateField('clientIndustry', v)} placeholder="e.g. Healthcare, Retail, Finance" maxLength={200} />
            </Field>
            <Field label="Client Problem Statement">
              <TextArea id="problemStatement" value={categoryFields.problemStatement ?? ''} onChange={(v) => updateField('problemStatement', v)} placeholder="What specific problem does this solve?" rows={3} maxLength={1000} />
            </Field>
            <Field label="Expected Business Impact">
              <TextInput id="businessImpact" value={categoryFields.businessImpact ?? ''} onChange={(v) => updateField('businessImpact', v)} placeholder="e.g. $500K ARR, 20% churn reduction" maxLength={200} />
            </Field>
          </div>
        )}

        {category === 'OTHER' && (
          <div className="bg-purple-50 rounded-xl p-4 space-y-3 border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">💡 Additional Info</p>
            <Field label="Additional Context">
              <TextArea id="additionalContext" value={categoryFields.additionalContext ?? ''} onChange={(v) => updateField('additionalContext', v)} placeholder="Any extra details that help evaluators understand your idea…" rows={3} maxLength={1000} />
            </Field>
          </div>
        )}

        <Field label="Description *" hint="Explain your idea in detail — what, why, and how">
          <TextArea id="description" value={description} onChange={setDescription} placeholder="Describe your idea in full detail…" maxLength={2000} rows={5} required />
        </Field>

        <Field label="Attachments" hint="PDF, PNG, JPG, JPEG, DOCX, MP4, MOV, PPTX — max 50MB each">
          <div className="relative">
            <input
              ref={filesRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.docx,.mp4,.mov,.pptx"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl py-2 px-3"
            />
          </div>
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            disabled={savingDraft || submitting}
            onClick={() => submit(true)}
            className="flex-1 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50 text-sm"
          >
            {savingDraft ? '💾 Saving…' : '💾 Save as Draft'}
          </button>
          <button
            type="submit"
            disabled={submitting || savingDraft}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold transition-all disabled:opacity-50 shadow-lg shadow-indigo-200 text-sm"
          >
            {submitting ? 'Submitting…' : '🚀 Submit Idea'}
          </button>
        </div>
      </form>
    </div>
  );
}
