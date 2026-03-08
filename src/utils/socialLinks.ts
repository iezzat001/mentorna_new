export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'tiktok';

const hasScheme = (value: string) => /^https?:\/\//i.test(value);

const toHandle = (value: string) => value.replace(/^@/, '').trim();

export const normalizeSocialUrl = (
  raw: string | null | undefined,
  platform: SocialPlatform
): string | null => {
  const value = (raw ?? '').trim();
  if (!value || value === '#') return null;
  if (hasScheme(value)) return value;
  if (/^www\./i.test(value)) return `https://${value}`;

  const handle = toHandle(value);

  // If the user entered a handle, convert to a canonical URL.
  if (value.startsWith('@') || (!value.includes('.') && !value.includes('/'))) {
    switch (platform) {
      case 'instagram':
        return `https://www.instagram.com/${handle}`;
      case 'tiktok':
        return `https://www.tiktok.com/@${handle}`;
      case 'twitter':
        return `https://x.com/${handle}`;
      case 'linkedin':
        // LinkedIn is rarely a handle-only URL; keep as-is.
        return null;
    }
  }

  // Looks like a URL without scheme.
  return `https://${value}`;
};

export const hasSocialUrl = (raw: string | null | undefined, platform: SocialPlatform) =>
  normalizeSocialUrl(raw, platform) !== null;
