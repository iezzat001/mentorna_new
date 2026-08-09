-- Enrichment answers for the "ابني Startup في 30 يوم" series.
--
-- magnet_leads only stored a contact and a source, so the optional profiling
-- questions shown to returning visitors (what stage they're at, what their
-- biggest blocker is) had nowhere to persist. This adds a single jsonb column
-- so those answers land alongside the lead instead of only in the browser.
--
-- Nullable with a default of '{}', so every existing row and every insert that
-- doesn't supply metadata keeps working unchanged.

alter table public.magnet_leads
  add column if not exists metadata jsonb not null default '{}'::jsonb;

comment on column public.magnet_leads.metadata is
  'Optional enrichment collected from returning lead-magnet visitors. Shape: {"stage": "...", "blocker": "...", "episode": 2}';

-- Supports segmenting leads by answer, e.g.
--   select * from magnet_leads where metadata->>'blocker' = 'التمويل';
create index if not exists magnet_leads_metadata_gin
  on public.magnet_leads using gin (metadata);
