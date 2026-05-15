# Implementation Plan: InnovatEPAM Portal — Phase 2: Smart Submission Forms

**Branch**: `002-smart-forms` | **Date**: 2026-05-15 | **Spec**: `specs/002-smart-forms/spec.md`

## Summary

Extend `components/idea-form.tsx` with a category-driven dynamic field system. When a category is selected, a matching section renders additional inputs. All values are collected into a `categoryFields` state object and submitted as a JSON string (`categoryData`) via the existing `/api/ideas` POST endpoint. The admin dashboard renders the parsed fields in a color-coded section per idea.

## Technical Context

**Changed files**:
- `prisma/schema.prisma` — add `categoryData String?` to `Idea` model
- `components/idea-form.tsx` — add dynamic field sections per category
- `app/api/ideas/route.ts` — parse and persist `categoryData` from FormData
- `app/admin/ideas/client.tsx` — display parsed `categoryData` per idea

**No new dependencies** — uses existing React state, native HTML form elements, Tailwind CSS.

## Implementation Design

### State management in `IdeaForm`

```ts
const [categoryFields, setCategoryFields] = useState<Record<string, string>>({});

function updateField(key: string, value: string) {
  setCategoryFields(prev => ({ ...prev, [key]: value }));
}

function handleCategoryChange(v: string) {
  setCategory(v);
  setCategoryFields({});  // reset on category switch
}
```

### Category field definitions (static)

| Category | Fields |
|---|---|
| TECHNICAL_INNOVATION | techStack (text), complexity (select: Low/Medium/High), effort (text) |
| PROCESS_IMPROVEMENT | painPoints (textarea), improvement (text), affectedTeams (text) |
| CLIENT_SOLUTION | clientIndustry (text), problemStatement (textarea), businessImpact (text) |
| OTHER | additionalContext (textarea) |

### API changes

`POST /api/ideas` reads `categoryData` from FormData and passes it to `prisma.idea.create`.

### Admin display

`categoryData` is parsed with `JSON.parse` and each key-value pair is rendered in a labeled grid inside the idea card.
