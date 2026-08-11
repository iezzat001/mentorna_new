# Learner Auth & Progress — Future Plan

Status: **Deferred.** The current funnel MVP stays frictionless (no signup). Revisit when we are ready to persist scores across devices and open more tracks.

Discussed: 2026-08-11  
Context: `/problem-finder` and `/one-feature` Duolingo-style funnels.

---

## Goal

At the end of a lesson, let the user optionally save their score. Later the platform will expose multiple tracks and levels (learning-app style). The design must support that without complicating the current MVP.

## Decision

**Do not** use `magnet_leads` as the source of truth for progress. That table is marketing CRM (email / WhatsApp + source).

**Do** introduce a thin learner layer when we pick this up:

1. **Identity** — Supabase Auth magic link / email OTP (one field, no password).
2. **Progress table** — forward-compatible, minimal:

```sql
learner_progress (
  id uuid primary key,
  user_id uuid references auth.users,
  track_slug text,          -- e.g. 'startup-30'
  lesson_slug text,         -- e.g. 'problem-finder' | 'one-feature'
  score int,
  max_score int,
  status text,              -- 'completed' | 'in_progress'
  level int default 1,
  metadata jsonb default '{}',
  completed_at timestamptz,
  unique (user_id, track_slug, lesson_slug)
)
```

3. **Funnel UX** — keep the lesson frictionless; only ask at the end:

`… → score → action steps → احفظ نتيجتك (optional) → Society CTA`

- Saving is optional (never block the Society CTA).
- Skipped scores can live in `localStorage` and be claimed on next login.
- Already signed-in users auto-save and skip the form.

## What not to build in the first auth slice

- Full LMS / course platform UI
- XP, streaks, leaderboards
- Password accounts
- WhatsApp as authentication (WhatsApp stays for community)
- Storing scores only inside `magnet_leads.metadata`

## Why this shape

| Approach | MVP speed | Scales to tracks/levels | Risk |
|---|---|---|---|
| Score in `magnet_leads` | Fast | Weak | Confuses leads with learners |
| localStorage only | Fastest | No | Lost on new device |
| **Auth + `learner_progress`** | Slightly more work | Strong | Right long-term model |
| Full LMS now | Slow | Overkill | Delays shipping |

## Later (no redesign needed)

- `tracks` / `lessons` content tables
- Level / unlock rules
- A simple `/my-progress` page

Same `learner_progress` rows keep working.

## Current MVP (shipped)

- No auth, no progress persistence.
- Final screen: bold Society join CTA + prev/next episode links.
- Canvas download is intentionally hidden for now (too many CTAs); re-enable later if needed.
