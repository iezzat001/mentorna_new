-- Create offer_settings table to control offer page access from the dashboard
create table if not exists public.offer_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null,                        -- Human-readable label e.g. "Jassim VC Mentorship"
  slug text not null unique,                 -- Matches the offer_type in signed_contracts e.g. "vc_fundraising_mentorship"
  url_path text not null,                    -- The page route e.g. "/mentorship-offer"
  is_active boolean not null default true,   -- Manual on/off toggle
  expires_at timestamptz,                    -- Optional hard expiry datetime (null = no expiry)
  passcode text,                             -- Optional passcode for the offer page
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed the existing Jassim offer (expired — set is_active false)
insert into public.offer_settings (name, slug, url_path, is_active, expires_at, passcode)
values (
  'Jassim — VC Fundraising Mentorship',
  'vc_fundraising_mentorship',
  '/mentorship-offer',
  false,
  '2026-06-02T00:00:00Z',
  '2000'
);

-- RLS: allow public read (offer pages are public-facing)
alter table public.offer_settings enable row level security;

create policy "Public can read offer settings"
  on public.offer_settings for select
  using (true);

create policy "Admins can manage offer settings"
  on public.offer_settings for all
  using (public.is_admin(auth.uid()));
