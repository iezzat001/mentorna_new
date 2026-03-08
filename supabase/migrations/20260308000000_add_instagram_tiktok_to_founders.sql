-- Add Instagram/TikTok links to founders and remove '#' defaults

ALTER TABLE public.founders
  ADD COLUMN IF NOT EXISTS instagram_url TEXT,
  ADD COLUMN IF NOT EXISTS tiktok_url TEXT;

ALTER TABLE public.founders
  ALTER COLUMN linkedin_url DROP DEFAULT,
  ALTER COLUMN twitter_url DROP DEFAULT;

UPDATE public.founders
SET linkedin_url = NULL
WHERE linkedin_url IS NULL OR btrim(linkedin_url) = '' OR linkedin_url = '#';

UPDATE public.founders
SET twitter_url = NULL
WHERE twitter_url IS NULL OR btrim(twitter_url) = '' OR twitter_url = '#';

UPDATE public.founders
SET instagram_url = NULL
WHERE instagram_url IS NULL OR btrim(instagram_url) = '' OR instagram_url = '#';

UPDATE public.founders
SET tiktok_url = NULL
WHERE tiktok_url IS NULL OR btrim(tiktok_url) = '' OR tiktok_url = '#';
