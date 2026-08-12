# Series Funnel — Open Items

Snapshot after PR #9 (Duolingo-style redesign of `/problem-finder` and `/one-feature`). Nothing here is broken from the visitor's point of view. These are items where the new funnel and the earlier capture-once work are out of alignment and should be reconciled before Episode 6 or 7.

Cross-reference: `docs/learner-auth-progress-future.md` (the proper long-term fix).

---

## 1. Funnel pages no longer capture leads

Both `/problem-finder` and `/one-feature` write **zero** rows to `magnet_leads`. `FunnelSocietyCta` routes everyone to the Tally form for the WhatsApp community, which sits outside the database.

Effects:

- The `source` field is no longer populated per episode, so we can't answer "which episode converts best" from Supabase.
- The `metadata` column added by migration `20260809000000_add_metadata_to_magnet_leads.sql` has nothing writing to it. Column is fine, just idle.
- The 1-Feature Validator canvas (uploaded manually to S3) is defined in `series.ts` but rendered nowhere.

Decision needed: reinstate a lightweight capture behind the Society CTA, or accept Tally as the sole capture and delete the unused Supabase plumbing.

## 2. Orphaned code from the capture-once fix

628 lines of dead code that was solving a real annoyance (asking the same follower for WhatsApp on every episode):

| File | Lines | Status |
|---|---|---|
| `src/components/series/SmartCapture.tsx` | 368 | orphaned |
| `src/components/series/EpisodeNav.tsx` | 120 | orphaned |
| `src/lib/leadMemory.ts` | 140 | still imported by `Startup30.tsx`, but nothing writes to it |

Only meaningful if capture returns.

## 3. `/startup-30` progress bar is permanently empty

The hub reads `lead.downloaded[]` from `leadMemory`. With no capture and no downloads happening on the funnel pages, this array can never fill.

Effect: "خلّصت X من Y" always shows 0. The retention hook silently does nothing.

Fix once we know the direction on item 1.

## 4. Canvas fields in `series.ts` are now optional

`canvasUrl` and `canvasName` are optional as of Episode 3. Episodes 1 and 2 still carry them (both PDFs are live on CloudFront); Episode 3 deliberately has none, because its reel CTA points to the community instead of a download.

Rule going forward: **only set `canvasUrl` once the PDF is actually live on CloudFront.** An entry pointing at a missing file is how Episode 2 shipped a download that returned AccessDenied for weeks.

Still open: the funnel pages don't render canvases at all, so even the two live ones are unreachable from the episode pages.

## 5. Vibe Coding PDF and other spec docs

`docs/lead_magnet/Lead Magnet Spec_ Startup Problem Finder.md` and the checked-in canvas PDFs may want to move under a `docs/lead_magnet/canvases/` and `docs/lead_magnet/specs/` split as Episodes 3+ arrive.

---

## Guiding principle

The `learner-auth-progress-future.md` doc is right: `magnet_leads` is a marketing CRM, not a progress store. When we add signup, progress belongs in a new `learner_progress` table. Until then, either:

- **Keep the funnel Tally-only** and accept blind per-episode analytics.
- **Add a minimal insert to `magnet_leads`** on the Society CTA click (fire-and-forget), which restores per-episode source tracking without adding UI friction. This is the smallest reversible step.

Pick before Episode 5.
