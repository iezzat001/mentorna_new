export interface Webinar {
  /** Stable id used as the analytics key. Do not change once published. */
  id: string;
  /** Topic / title shown on the card and player. */
  title: string;
  /** Short brief describing what the session covered. */
  description: string;
  /** ISO date (YYYY-MM-DD) the webinar was recorded / held. */
  date: string;
  /** Total runtime of the recording, in seconds. */
  durationSeconds?: number;
  /** File name of the video within the media base (e.g. "2026-08-21-webinar.mp4"). */
  videoFile: string;
  /** Optional poster image file name within the media base. */
  posterFile?: string;
  /** Whether the webinar is visible on the public page. */
  published: boolean;
  /** Text direction for the title/brief (Arabic content should use "rtl"). */
  dir?: "ltr" | "rtl";
  /** Optional topic tags. */
  tags?: string[];
}

/**
 * Base URL where webinar media lives. Defaults to the project CloudFront
 * distribution; override with VITE_WEBINAR_MEDIA_BASE for local testing
 * (e.g. point it at a folder served by the dev server).
 */
const MEDIA_BASE = (
  (import.meta.env.VITE_WEBINAR_MEDIA_BASE as string | undefined) ??
  "https://d2mp3ttz3u5gci.cloudfront.net/webinars"
).replace(/\/$/, "");

export const webinarMediaUrl = (file: string): string => `${MEDIA_BASE}/${file}`;

/**
 * Poster images are committed to the app (public/webinars/) rather than the
 * CDN, so thumbnails work without a separate upload. Resolves to a root path.
 */
export const webinarPosterUrl = (file: string): string =>
  `${import.meta.env.BASE_URL}webinars/${file}`;

/**
 * Weekly community webinar recordings.
 *
 * NOTE: The title/description below are drawn from the recording's content
 * (a live pitch-deck review). Feel free to refine the copy — only `id` must
 * stay stable so historical analytics keep matching.
 */
export const webinars: Webinar[] = [
  {
    id: "webinar-2026-08-28",
    title: "AI Agents at Work: Subagents & Agent Teams",
    description:
      "How agentic AI workflows actually get things done — a lead agent spawning subagents, and \"agent teams\" coordinating through a shared task list. Practical patterns for building faster with AI coding tools.",
    date: "2026-08-28",
    durationSeconds: 5695,
    videoFile: "2026-08-28-community-webinar.mp4",
    posterFile: "2026-08-28-community-webinar.jpg",
    published: true,
    dir: "ltr",
    tags: ["AI Agents", "Cursor", "Workflows"],
  },
  {
    id: "webinar-2026-08-21",
    title: "Live Pitch Deck Review: Building a LegalTech Startup with AI",
    description:
      "Ahmed walks through a real startup pitch deck live — how to structure your story, validate the problem, and use AI tools to build and present faster. Recorded during our weekly community webinar.",
    date: "2026-08-21",
    durationSeconds: 5281,
    videoFile: "2026-08-21-community-webinar.mp4",
    posterFile: "2026-08-21-community-webinar.jpg",
    published: true,
    dir: "ltr",
    tags: ["AI", "Pitching", "Entrepreneurship"],
  },
  {
    id: "webinar-2026-09-04",
    title: "Community Webinar #3",
    description:
      "Third session of our weekly community webinar series — live discussion, Q&A, and member pitch reviews. Recorded during our weekly community webinar.",
    date: "2026-09-04",
    durationSeconds: 7528,
    videoFile: "2026-09-04-community-webinar.mp4",
    posterFile: "2026-09-04-community-webinar.jpg",
    published: true,
    dir: "ltr",
    tags: ["Community", "Q&A"],
  },
];

export const getPublishedWebinars = (): Webinar[] =>
  webinars
    .filter((w) => w.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getWebinarById = (id: string): Webinar | undefined =>
  webinars.find((w) => w.id === id);
