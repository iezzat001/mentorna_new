-- /workshop now hosts the public Vibe Coding 0 → 1 workshop landing page, which is
-- evergreen and ungated. The Solopreneur Launchpad offer it used to gate is retired —
-- /offer/mohamed remains the canonical page for that program.
delete from public.offer_settings
where slug = 'solopreneur_launchpad_workshop';
