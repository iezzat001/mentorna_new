/**
 * "ابني Startup في 30 يوم" series registry.
 *
 * Single source of truth for every episode. The hub (/startup-30), the
 * episode navigation, and the smart capture card all read from here.
 *
 * To publish a new episode: add an entry below. Nothing else needs to change
 * except building the episode page itself.
 *
 * NOTE: `slug` must match the existing public route. Those URLs are already
 * live in Instagram reel captions and the link in bio, so they must not change.
 */

export type Episode = {
  /** Episode number as promoted on Instagram */
  n: number;
  /** Public route slug, e.g. "problem-finder" -> /problem-finder */
  slug: string;
  /** Short Arabic title used in nav and on the hub */
  title: string;
  /** One line Arabic hook shown on the hub card */
  hook: string;
  /** Key written to magnet_leads.source for this episode */
  source: string;
  /**
   * Direct canvas download URL. Optional: not every episode ships a canvas,
   * and the current funnel pages don't render them at all
   * (see docs/series-funnel-open-items.md). Only set this once the PDF is
   * actually live on CloudFront, so nothing can link to a missing file.
   */
  canvasUrl?: string;
  /** Display name of the canvas, when there is one */
  canvasName?: string;
};

export const SERIES_TITLE = 'ابني Startup في 30 يوم';
export const SERIES_TAGLINE = 'سلسلة عملية تمشي معاك خطوة بخطوة من فكرة لـ Startup حقيقية.';

/**
 * Total planned episodes in the series. The hub shows the remaining count
 * ("باقي X حلقة") without revealing unreleased titles. Change this if the
 * series ends up longer or shorter.
 */
export const TOTAL_EPISODES = 30;

export const episodes: Episode[] = [
  {
    n: 1,
    slug: 'problem-finder',
    title: 'المشكلة قبل الفكرة',
    hook: 'متضيعش وقتك تدوّر على فكرة عبقرية. اتعلم إزاي تلاقي وجع حقيقي تبني عليه.',
    source: 'Startup Problem Finder',
    canvasUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/Problem-Finder-Canvas.pdf',
    canvasName: 'Problem-Finder Canvas',
  },
  {
    n: 2,
    slug: 'one-feature',
    title: 'فخ الـ One Feature',
    hook: 'متجمعش مميزات المنافسين. اكتشف الـ Benefit الواحدة اللي هتخلي العميل يختارك.',
    source: 'One Feature Trap',
    canvasUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/1-Feature-Validator-Canvas.pdf',
    canvasName: '1-Feature Validator Canvas',
  },
  {
    n: 3,
    slug: 'validation',
    title: 'وهم سرقة الأفكار',
    hook: 'بتخاف حد يسرق فكرتك؟ الفكرة بتساوي صفر، التنفيذ هو اللي بيساوي ملايين.',
    source: 'Idea Validation Sprint',
    // No canvas for this episode. The reel's CTA points to the community
    // instead, so there is deliberately nothing to download here.
  },
];

/** Episodes that are actually published, ordered by number */
export const liveEpisodes = [...episodes].sort((a, b) => a.n - b.n);

/** How many episodes are still to come */
export const remainingEpisodes = Math.max(0, TOTAL_EPISODES - liveEpisodes.length);

export const getEpisodeBySlug = (slug: string): Episode | undefined =>
  episodes.find((e) => e.slug === slug);

export const getEpisodeByNumber = (n: number): Episode | undefined =>
  episodes.find((e) => e.n === n);

/** Previous published episode, or undefined if this is the first */
export const getPrevEpisode = (n: number): Episode | undefined => {
  const earlier = liveEpisodes.filter((e) => e.n < n);
  return earlier.length ? earlier[earlier.length - 1] : undefined;
};

/** Next published episode, or undefined if this is the newest so far */
export const getNextEpisode = (n: number): Episode | undefined =>
  liveEpisodes.find((e) => e.n > n);

export const HUB_PATH = '/startup-30';
