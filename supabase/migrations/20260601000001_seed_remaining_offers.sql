-- Seed remaining offer pages into offer_settings
insert into public.offer_settings (name, slug, url_path, is_active, expires_at, passcode)
values
  (
    'Mohamed — Solopreneur Launchpad (Private)',
    'solopreneur_launchpad_mohamed',
    '/offer/mohamed',
    true,
    null,
    '4948'
  ),
  (
    'Workshop — Solopreneur Launchpad (Public)',
    'solopreneur_launchpad_workshop',
    '/workshop',
    true,
    null,
    null
  )
on conflict (slug) do nothing;
