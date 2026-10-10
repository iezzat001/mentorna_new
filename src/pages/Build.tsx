import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ExternalLink, MessageCircle, Play, Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Footer from '@/components/Footer';
import CardFanCarousel from '@/components/ui/card-fan-carousel';
import { whatsappUrl } from '@/lib/whatsapp';
import { COHORT_WEEKS, type CohortWeek } from '@/data/cohortWeeks';
import {
  testimonials,
  workshopVideoPoster,
  workshopVideoUrl,
} from '@/data/testimonials';

/* ────────────────────────────────────────────────────────────
   Design tokens — same language as /workshop, /links, offer pages
   ──────────────────────────────────────────────────────────── */
const AMBER = 'hsl(38,95%,58%)';
const PURPLE = 'hsl(262,70%,60%)';
const CYAN = 'hsl(196,85%,52%)';
const TEAL = 'hsl(160,70%,45%)';
const CORAL = 'hsl(18,80%,63%)';

/* Accent text on light surfaces. The bright accents above are 1.5–3.8:1 on
   cream and disappear as text; these are the same hues darkened to ≥4.5:1. */
const AMBER_INK = '#8B5904'; // 4.60:1 on #F3E0CB
const PURPLE_INK = '#7A40DD'; // 4.52:1
const CYAN_INK = '#0B6B8E'; // 4.67:1
const TEAL_INK = '#147152'; // 4.67:1
const CORAL_INK = '#AE4213'; // 4.54:1

const PAGE_BG = 'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';

/* One surface per dark band, never shared between sections. The lightest stop
   of SIGNATURE_BG is #4B2A8C; a lighter stop under text drops cream/65 below
   4.5:1. Set these on the <section> itself so contrast tooling can read them. */
const SIGNATURE_BG =
  'radial-gradient(ellipse 90% 60% at 50% 0%, #4B2A8C 0%, #3F2378 55%, #35206A 100%)';
const INK_EMBER = 'radial-gradient(ellipse 90% 55% at 50% 0%, #6B2A16 0%, #2A110C 44%, #140807 78%)';
const INK_SMOKE = 'radial-gradient(ellipse 90% 50% at 50% 0%, #3a2418 0%, #16110f 46%, #0c0a0b 78%)';
const INK_GATE = 'radial-gradient(ellipse 80% 60% at 50% 0%, #3a1c14 0%, #16110f 55%, #0c0a0b 100%)';
const INK_FOREST = 'radial-gradient(ellipse 90% 60% at 50% 0%, #1F3A2E 0%, #0F1A15 55%, #0A0F0C 100%)';

/* Type. Headings were weight 300 everywhere, which is most of why the page
   read as pale; 600 matches the weight the reference page uses. */
const H2 = 'font-heading text-[1.85rem] font-semibold leading-[1.12] tracking-tight md:text-[2.6rem]';
const H3 = 'font-heading text-xl font-semibold leading-snug tracking-tight md:text-2xl';
const BODY = 'font-heading text-base font-normal leading-relaxed md:text-[17px]';
/* Text colours by surface. Floors are the AA minimums, not suggestions. */
const ON_LIGHT = 'text-[hsl(0,0%,10%)]/85'; // 9.1:1 on cream
const ON_LIGHT_MUTED = 'text-[hsl(0,0%,10%)]/70'; // 5.7:1 (labels, captions; never lower)
const ON_DARK = 'text-[#F7E9D6]/75'; // ≥5.6:1 on every dark surface
const ON_DARK_MUTED = 'text-[#F7E9D6]/65'; // ≥4.6:1 (labels; never lower)
/* Cards. White on cream is how the reference page gets figure/ground on a
   light page; translucent white melts into the cream, so keep it solid. */
const CARD =
  'rounded-[22px] bg-white p-6 ring-1 ring-[#1c100e]/10 shadow-[0_18px_40px_-28px_rgba(60,30,10,0.35)] md:p-7';
const CARD_ON_DARK = 'rounded-[22px] bg-white/[0.06] p-6 ring-1 ring-white/12 md:p-7';

/* ────────────────────────────────────────────────────────────
   Offer
   ──────────────────────────────────────────────────────────── */
const FRAMEWORK = 'The 0→1 Framework';
const CLUB = "Founders' Club";
const PRICE = 425;
const SEATS = 10;
const COHORT_LABEL = '1 November';
const CTA_LABEL = 'Check if I qualify';
/** Sits under every inline CTA; the one place the guarantee is repeated by design. */
const MONEY_BACK_LINE = 'Money back after 2 sessions if it is not for you.';
/** Alif-style status: name the closed round, then the open one. */
const COHORT_STATUS = 'Cohort 2 is full. Cohort 3 is open.';

/** Four proofs under the hero. Short enough to read without thinking.
 *  Icons: thiings.co (warranty, infinity-loop, money, handshake).
 *  `link` is optional — only the revenue proof credits a named student. */
type TrustItem = {
  k: string;
  v: string;
  link?: { label: string; url: string };
  img: string;
  alt: string;
};

const TRUST: TrustItem[] = [
  {
    k: '$10,000+',
    v: 'Earned by a past student, ',
    link: { label: '@_therealsigma', url: 'https://www.instagram.com/_therealsigma/' },
    img: '/method/money.webp',
    alt: 'Money',
  },
  {
    k: 'Money back',
    v: 'Try 2 sessions. Not for you? Full refund.',
    img: '/method/guarantee.webp',
    alt: 'Guarantee',
  },
  {
    k: 'Hands-on',
    v: 'You build in every session, with me.',
    img: '/method/handshake.webp',
    alt: 'Handshake',
  },
  {
    k: 'Lifetime club',
    v: 'Keep learning with the group after week 6.',
    img: '/method/infinity.webp',
    alt: 'Infinity',
  },
];

/**
 * Application happens over WhatsApp. The four questions arrive pre-filled and
 * unanswered, so the first message is already the qualification — and the
 * closing section shows the same four before anyone taps.
 */
const APPLY_MESSAGE = `Hi Ahmed, I want to apply for Cohort 3 (1 November).

1) What I do, and for how many years:

2) One problem in my work I would fix with software:

3) What I have tried with AI, and where it stopped helping:

4) Why now, and not January:`;

/** Shown in full in the closing section, and pre-filled into APPLY_MESSAGE. */
const GATE_QUESTIONS = [
  'What do you do, and for how many years?',
  'What is one problem in your work that you would fix with software?',
  'What have you tried with AI, and where did it stop helping?',
  'Why now, and not in January?',
];

/**
 * The low-friction path for people who are not ready to answer three
 * questions yet: one word, so nobody has to compose anything. Ahmed replies
 * with the doc — deliberately no call, which is the objection this removes.
 */
const DETAILS_MESSAGE = 'details';

/* Instructor */
/* Two paragraphs. The numbers and the org list live in STATS and the marquee,
   so the prose does not repeat them. */
const BIO = [
  'I have built and sold startups. I have also failed many times, so I know which steps matter.',
  'I do not lecture. I open my laptop and build next to you.',
];

/* STATS[0] renders as the badge on the photo; the stats row shows [1..2]. */
const STATS = [
  { v: '$5M+', l: 'Value of startups I built' },
  { v: '$1.1M', l: 'Money raised' },
  { v: '2', l: 'Startups sold' },
];

/* Companies in the marquee. `url` is the official site the chip links out to —
   entries with url: null render as a plain, non-clickable chip. */
const ORGS = [
  { name: 'Slush', logo: '/orgs/slush.png', url: 'https://slush.org' },
  { name: 'Antler', logo: '/orgs/antler.png', url: 'https://www.antler.co' },
  { name: 'Akadeemy', logo: '/orgs/akadeemy.png', url: 'https://www.akadeemy.com' },
  { name: 'Robot Uprising', logo: '/orgs/robotuprising.png', url: 'https://robotuprising.fi' },
  { name: 'AI Collective', logo: '/orgs/aicollective.png', url: 'https://www.aicollective.com' },
  { name: 'Invention Convention', logo: '/orgs/inventionconvention.png', url: 'https://www.cainventionconvention.org' },
  { name: 'Helsinki XR Center', logo: '/orgs/helsinkixr.png', url: 'https://helsinkixrcenter.com' },
  { name: 'Predictiva', logo: '/orgs/predictiva.webp', url: 'https://www.predictiva.co.uk' },
];

const ORG_CHIP =
  'mx-1.5 inline-flex shrink-0 items-center gap-3 rounded-2xl bg-white/[0.07] px-5 py-3 ring-1 ring-white/10 md:gap-3.5 md:px-7 md:py-3.5';

const AHMED_PHOTO = {
  src: 'https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png',
  alt: 'Ahmed Ezzat',
};

/* Event photos for the fan carousel in "Who runs it" — curated set from
   Desktop/Feedback/About Me (Canon workshop / stage album). Feedback chat
   screenshots are intentionally excluded. */
const CDN_ABOUT = 'https://d2mp3ttz3u5gci.cloudfront.net/build/about-me';
const EVENT_PHOTOS = [
  { imgUrl: `${CDN_ABOUT}/4Q0A4207.jpg`, alt: 'Ahmed on stage presenting to a full auditorium' },
  { imgUrl: `${CDN_ABOUT}/4Q0A4211.jpg`, alt: 'Ahmed teaching entrepreneurship to a packed hall' },
  { imgUrl: `${CDN_ABOUT}/4Q0A4267.jpg`, alt: 'Ahmed speaking with a headset mic to the room' },
  { imgUrl: `${CDN_ABOUT}/4Q0A4612.jpg`, alt: 'Ahmed with co-hosts at the Nanotechnology workshop' },
  { imgUrl: `${CDN_ABOUT}/4Q0A5319.jpg`, alt: 'Ahmed leading a hands-on workshop session' },
  { imgUrl: `${CDN_ABOUT}/4Q0A5327.jpg`, alt: 'Ahmed walking the workshop floor with students' },
  { imgUrl: `${CDN_ABOUT}/4Q0A5337.jpg`, alt: 'Ahmed mid-explanation during the workshop' },
  { imgUrl: `${CDN_ABOUT}/4Q0A5804.jpg`, alt: 'Ahmed speaking from the podium' },
  { imgUrl: `${CDN_ABOUT}/4Q0A5879.jpg`, alt: 'Ahmed answering questions from the audience' },
  { imgUrl: `${CDN_ABOUT}/4Q0A6354.jpg`, alt: 'Ahmed signing the Nanotechnology workshop cheque' },
  { imgUrl: `${CDN_ABOUT}/4Q0A6606.jpg`, alt: 'Ahmed receiving recognition at Huda Schools' },
  { imgUrl: `${CDN_ABOUT}/4Q0A6624.jpg`, alt: 'Ahmed on stage with award recipients' },
  { imgUrl: `${CDN_ABOUT}/4Q0A6803.jpg`, alt: 'Workshop winners with Ahmed at Huda Schools' },
];

/* Prisma hero media only — video + poster used as a blended atmosphere layer.
   No Prisma navbar/copy; Mentorna owns the UI. */
const PRISMA_BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';
const PRISMA_BG_POSTER = '/hero/prisma-bg.jpg';

/* Real AI worker logos that float in the hero — tools used hands-on in the cohort. */
const HERO_AI_TOOLS = [
  {
    name: 'Cursor',
    src: '/ai-tools/cursor.svg',
    className: 'left-[4%] top-[18%] lg:left-[8%] lg:top-[20%]',
    float: 'hero-tool-float',
  },
  {
    name: 'Claude',
    src: '/ai-tools/claude.svg',
    className: 'right-[4%] top-[15%] lg:right-[8%] lg:top-[17%]',
    float: 'hero-tool-float hero-tool-float-late',
  },
  {
    name: 'Codex',
    src: '/ai-tools/codex.svg',
    className: 'left-[6%] top-[44%] lg:left-[10%] lg:top-[46%]',
    float: 'hero-tool-float hero-tool-float-mid',
  },
  {
    name: 'Grokbot',
    src: '/ai-tools/grokbot.svg',
    className: 'right-[5%] top-[42%] lg:right-[9%] lg:top-[44%]',
    float: 'hero-tool-float hero-tool-float-last',
  },
] as const;

const FAILURES = [
  {
    n: '01',
    title: 'You start with the tech',
    desc: 'You choose tools before anyone wants the product.',
  },
  {
    n: '02',
    title: 'You keep it secret',
    desc: 'You hide it, so nobody can tell you it is wrong.',
  },
  {
    n: '03',
    title: 'You build for everyone',
    desc: 'A product for everyone sells to no one.',
  },
  {
    n: '04',
    title: 'You wait for a quiet month',
    desc: 'You plan to start when work is calmer. It never is.',
  },
  {
    n: '05',
    title: 'You think you are too late',
    desc: 'Tools take weeks to learn. Your experience took years.',
  },
];

/* The 0→1 Framework — thiings.co 3D icons. Free downloads are personal-use
   only; Mentorna.com needs their Indie commercial license before launch. */
const STEPS = [
  {
    n: '01',
    step: 'Problem',
    name: 'Find the problem',
    weeks: [1],
    outcome: 'One problem, in one sentence.',
    img: '/method/compass.webp',
    alt: 'Compass',
  },
  {
    n: '02',
    step: 'Promise',
    name: 'Write the offer',
    weeks: [2],
    outcome: 'An offer you have tested on strangers.',
    img: '/method/megaphone.webp',
    alt: 'Megaphone',
  },
  {
    n: '03',
    step: 'Demand',
    name: 'Test with real buyers',
    weeks: [3, 4, 5],
    outcome: 'Proof that people want it, and a way to reach them.',
    img: '/method/rocket.webp',
    alt: 'Rocket',
  },
  {
    n: '04',
    step: 'Build',
    name: 'Build and launch',
    weeks: [6],
    outcome: `A live first version, and your place in ${CLUB}.`,
    img: '/weeks/laptop.webp',
    alt: 'Laptop',
  },
] as const;

/* What is included */
const INCLUDED = [
  '6 live sessions, 3 hours each, with 10 people',
  'Recordings of every session, yours to keep',
  `${FRAMEWORK} and all its templates`,
  'The prompts, tools and slides we use',
  '3 guest sessions: marketing, funding and growth',
  `Lifetime access to ${CLUB}`,
  'Direct messages with me',
];

/** Ties a step's card back to its colour; decorative bars and dots only. */
const STEP_COLOR: Record<CohortWeek['step'], string> = {
  Problem: AMBER,
  Promise: PURPLE,
  Build: TEAL,
  Demand: CYAN,
};

/* Guest lineup — all three confirmed (sources: slush.org/about-us,
   ilabventures.tech, greenstep.fi/tilitoimisto-turku). `week` is left unset
   until the dates are fixed; when set, the card shows a "Week N" pill. */
const GUESTS: {
  topic: string;
  name: string;
  credential: string;
  punch: string;
  photo: string;
  week?: number;
}[] = [
  {
    topic: 'Marketing',
    name: 'Marina Yurchenko',
    credential: 'Head of Marketing, Slush',
    punch:
      'She runs marketing for one of the world’s biggest startup events. She shows you how to turn attention into buyers.',
    photo:
      'https://cdn.prod.website-files.com/680cd45512772b4040d78def/69ef1877c33ad7be773c3089_Marina%20(1).JPG',
  },
  {
    topic: 'Funding',
    name: 'Petri Saarinen',
    credential: 'Co-founder, iLab Ventures',
    punch: 'He has worked with 1,500 startups. He shows you what investors want to hear first.',
    photo: 'https://ilabventures.tech/assets/team-petri-C62XuPhi.jpg',
  },
  {
    topic: 'Growth',
    name: 'Anton Suomalainen',
    credential: 'Area Growth Manager, Greenstep',
    punch:
      'He shows you how to keep your money and accounting simple, so you can focus on building.',
    photo:
      'https://greenstep.fi/wp-content/uploads/sites/2/2026/09/anton.suomalainen.jpg?v=1788494412',
  },
];

const CLUB_PHOTO = {
  src: '/workshop-helsinki/photo-185329.webp',
  alt: 'The room after the cohort, builders still in the work',
};

const CLUB_BEATS = [
  { t: 'Private', d: 'Only for people who finished the program.' },
  { t: 'Direct access', d: 'You can still message me after week 6.' },
  { t: 'Peers', d: 'People who are building the same way you are.' },
];

/* Does different work from the three beats: it explains the seat cap and says
   plainly which of the club's benefits exist today. Full-width, not a grid cell. */
const CLUB_DOOR = {
  t: `Why only ${SEATS} seats`,
  body: 'A small group is easier to trust. I am building this club so members can meet investors, get free AI credits, and hear about grants early. Some of it exists today, and some I am still building. Before you pay, I will tell you which is which.',
};

/* Quote cards shown on /build; the full set stays on /testimonials. */
const PROOF_QUOTE_IDS = [1, 3, 4];

const PROOF_CLIPS = [
  {
    id: 'mo',
    name: 'Mo',
    src: 'https://mentorna-testimonials.s3.amazonaws.com/testimonials/mo.mp4',
    poster: '/proof/mo.jpg',
  },
  {
    id: 'karla',
    name: 'Karla',
    src: 'https://mentorna-testimonials.s3.amazonaws.com/testimonials/karla.mp4',
    poster: '/proof/karla.jpg',
  },
  {
    id: 'class',
    name: 'Inside a class (90 seconds)',
    src: workshopVideoUrl,
    poster: workshopVideoPoster,
  },
];

/* Written feedback screenshots from /testimonials (Helsinki workshop). */
const WRITTEN_PROOF = [
  { src: '/workshop-helsinki/photo-IMG_9530.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9533.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9535.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9558.webp', alt: 'Workshop feedback message' },
];

/* Who the program is for. The trades are named so a reader can find
   themselves in the list instead of guessing whether "expert" means them. */
const FIT_FIELDS = ['Accounting', 'Law', 'HR', 'Design', 'Logistics', 'Operations'];

const FIT_PATHS = [
  { t: 'No idea yet', d: 'We help you find one worth building.' },
  { t: 'One idea', d: 'We help you take the first step.' },
  { t: 'Too many ideas', d: 'We test them and keep the best one.' },
];

const FIT_SKIP = [
  'You want to watch, not build.',
  'You want someone to build it for you.',
  'You cannot give 3 hours a week.',
];

const FAQS = [
  {
    q: 'I am not technical. Can I do this?',
    a: 'Yes. You explain what you want in plain words. AI writes the code.',
  },
  {
    q: 'Can I do this with a full-time job?',
    a: 'Yes. It is 3 hours a week, outside work hours.',
  },
  {
    q: 'Do I give up any ownership?',
    a: 'No. You own everything you build.',
  },
  {
    q: 'Will I get funding?',
    a: 'Not from me. In week 6 you meet an investor who has worked with 1,500 startups.',
  },
  {
    q: 'I am 45. Am I too old?',
    a: 'No. Tools are easy to learn. Experience is not, and you have it.',
  },
  {
    q: 'Can I use this in my current job?',
    a: 'Yes. Working with AI helps in your own business and in your job.',
  },
];

/* Main sales VSL — lives on CloudFront (S3: mybootcamp-ahmed-ezzat/build/).
   Objects there are cached immutable for a year, so a new cut ships under a
   new filename rather than overwriting the old key — otherwise edge and
   browser caches would keep serving the previous video. vsl.mp4 (the cut
   without Arabic subtitles) stays in the bucket as an instant rollback.
   Keep this H.264: the source export was HEVC, which does not play in
   Firefox or in Chrome on Windows/Android. */
const VSL_URL = 'https://d2mp3ttz3u5gci.cloudfront.net/build/vsl2.mp4';
const VSL_POSTER = 'https://d2mp3ttz3u5gci.cloudfront.net/build/vsl-poster.jpg';

/* Same film as the Mentorna homepage hero. */
const HERO_VIDEO_URL = 'https://d2mp3ttz3u5gci.cloudfront.net/0703.mp4';

/* ────────────────────────────────────────────────────────────
   Hero A/B test — Variant A (animated typewriter headline) vs Variant B
   (the adapted "ours" line). Assignment is 50/50 on first load, persisted in
   localStorage so returning visitors keep their variant; a ?variant=A|B query
   param force-overrides for QA without overwriting the stored value.
   Copy is final (ux-writer task #10, Ahmed-approved): Variant A cycles
   idea → side-project → business → startup, with a decoupled static "business"
   fallback for reduced-motion / screen readers; Variant B is the "first paying
   customer" statement.
   ──────────────────────────────────────────────────────────── */
type HeroVariant = 'A' | 'B';
const HERO_VARIANT_KEY = 'build_hero_variant';

/* Each string is its own line in the hero — the break after the first is
   deliberate, not a wrap. `note` is the third line, quieter than the subhead:
   it answers the objection the headline raises. */
const HERO_A = {
  headline: ['You spent 15 years getting good at your job.', 'AI just changed the job.'],
  subhead: 'In 6 weeks, turn what you know into a product, and test it with real buyers.',
  note: 'AI writes the code. You tell it what to build.',
};

// Variant B — a static statement headline (gradient on "first paying customer",
// rendered inline in the hero) plus this subhead.
const HERO_B_SUBHEAD =
  'Ten seats, money-back after week two. You bring the expertise; the framework turns it into a product real buyers pay for.';

/* ────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────── */
/* SSR-safe reduced-motion guard, reused by Reveal and the typewriter. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/*
 * Phase easing for the hero exit — Fora-style choreography. Each element of
 * the hero (copy, video, dunes) gets its own window [from, to] inside the
 * scroll progress, with a cubic ease-in-out inside the window:
 *
 *   0.00–0.40  copy dissolves up; film grows into the freed space
 *   0.32–0.90  dunes rise only enough to tuck under the film's bottom edge
 *
 * Cream <main> then slides up over the sticky frame (negative margin) — same
 * handoff as Fora. Dunes must stay below the film's midline; earlier values
 * put the crest through the photo.
 */
const phase = (t: number, from: number, to: number) => {
  const x = Math.max(0, Math.min(1, (t - from) / (to - from)));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/* True only when the visitor granted analytics consent — the same source
   PageTracker reads. A/B events are gated on this; the variant renders
   regardless of consent. */
const analyticsConsentGranted = (): boolean => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('cookie_consent') : null;
    return raw ? JSON.parse(raw).analytics === true : false;
  } catch {
    return false;
  }
};
/* Section label with a small accent dot, Fora-style. The dot is decorative, so
   it keeps the bright AMBER on both tones; the label takes the muted floor for
   its surface. */
const Eyebrow = ({
  children,
  tone = 'light',
}: {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}) => (
  <p
    className={`inline-flex items-center gap-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.22em] ${
      tone === 'light' ? ON_LIGHT_MUTED : ON_DARK_MUTED
    }`}
  >
    <span
      aria-hidden
      className="h-[7px] w-[7px] shrink-0 rounded-full"
      style={{ background: AMBER, boxShadow: `0 0 0 3px ${AMBER}22` }}
    />
    {children}
  </p>
);

/* The one accent word in a heading. Bright amber only reads on dark and purple
   surfaces; on cream it needs the ink variant. */
const Highlight = ({
  children,
  tone = 'light',
}: {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}) => <span style={{ color: tone === 'light' ? AMBER_INK : AMBER }}>{children}</span>;

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  /*
   * Respect prefers-reduced-motion: users who ask for less motion get the
   * content immediately, with no translate/opacity transition at all. The
   * scroll-reveal is the page's dominant motion, so guarding it here covers
   * every section in one place.
   */
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={reduced ? undefined : { transitionDelay: `${delay}ms` }}
      className={
        reduced
          ? ''
          : `transition-all duration-700 ease-out ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`
      }
    >
      {children}
    </div>
  );
};

const HERO_POSTER = '/build-hero-poster.jpg';

/*
 * Mentorna pins `body { position: fixed; overflow: hidden }` under 768px and
 * scrolls `#root` instead (see index.css). Listening only to `window` never
 * fires there, so the Fora-style sticky hero stays frozen at p=0. Walk up from
 * the track to find the real scrollport and subscribe to that.
 */
const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
  let node = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
};

const useHeroScroll = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      setP(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const scrollParent = getScrollParent(trackRef.current);
    update();
    scrollParent.addEventListener('scroll', onScroll, { passive: true });
    // Window still scrolls on desktop; also catch resize / orientation.
    if (scrollParent !== window) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      scrollParent.removeEventListener('scroll', onScroll);
      if (scrollParent !== window) {
        window.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  return { trackRef, p: reduced ? 0 : p };
};

const HeroFilm = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reduced) return;
    const video = ref.current;
    if (!video) return;
    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };
    video.addEventListener('loadeddata', play);
    play();
    return () => video.removeEventListener('loadeddata', play);
  }, [reduced]);

  if (reduced) {
    return <img src={HERO_POSTER} alt="" className={className} />;
  }
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={HERO_POSTER}
      aria-hidden
      className={className}
    >
      <source src={HERO_VIDEO_URL} type="video/mp4" />
    </video>
  );
};

const VideoPlayer = ({
  src,
  poster,
  alt,
  portrait = false,
}: {
  src: string;
  poster: string;
  alt: string;
  /** Phone / vertical source — frame the player as 9:16 instead of 16:9. */
  portrait?: boolean;
}) => {
  const [playing, setPlaying] = useState(false);
  const frame = portrait
    ? 'aspect-[9/16] w-full bg-black object-contain'
    : 'aspect-video w-full bg-black object-contain';
  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        controlsList="nofullscreen nodownload noremoteplayback"
        disablePictureInPicture
        autoPlay
        playsInline
        /*
         * object-contain, not cover. Portrait sources letterbox in a landscape
         * frame (and vice versa) instead of cropping the speaker's head.
         */
        className={frame}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video"
      className={`group relative block overflow-hidden ${
        portrait ? 'aspect-[9/16] w-full' : 'aspect-video w-full'
      }`}
    >
      <img
        src={poster}
        alt={alt}
        className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-85"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[hsl(0,0%,10%)] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 md:h-[4.5rem] md:w-[4.5rem]">
          <Play className="ml-0.5 h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
        </span>
      </span>
    </button>
  );
};

const SelfieClip = ({
  clip,
  active,
  onPlay,
}: {
  clip: (typeof PROOF_CLIPS)[number];
  active: string | null;
  onPlay: (id: string) => void;
}) => {
  const playing = active === clip.id;
  return (
    <article className="w-[31%] max-w-[240px]">
      <div className="overflow-hidden rounded-[22px] bg-black shadow-[0_30px_70px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
        {playing ? (
          <video
            src={clip.src}
            poster={clip.poster}
            controls
            controlsList="nofullscreen nodownload noremoteplayback"
            disablePictureInPicture
            autoPlay
            playsInline
            className="aspect-[9/16] w-full bg-black object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => onPlay(clip.id)}
            aria-label={`Play ${clip.name}`}
            className="group relative block aspect-[9/16] w-full overflow-hidden"
          >
            <img
              src={clip.poster}
              alt=""
              className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[hsl(0,0%,10%)] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 md:h-16 md:w-16">
                <Play className="ml-0.5 h-6 w-6 md:h-7 md:w-7" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-center font-heading text-sm font-medium leading-snug tracking-tight md:text-base">
        {clip.name}
      </p>
    </article>
  );
};

const ProofClips = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="mt-10 md:mt-14">
      <div className="flex justify-center gap-3 md:gap-6">
        {PROOF_CLIPS.map((clip) => (
          <SelfieClip key={clip.id} clip={clip} active={active} onPlay={setActive} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 items-start gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
        {WRITTEN_PROOF.map((shot) => (
          <div
            key={shot.src}
            className="overflow-hidden rounded-[18px] shadow-[0_18px_40px_-28px_rgba(60,30,10,0.4)] ring-1 ring-[#1c100e]/10"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
        {testimonials
          .filter((t) => PROOF_QUOTE_IDS.includes(t.id))
          .map((t) => (
          <article key={t.id} className={CARD}>
            <div className="mb-3 flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[hsl(38,95%,58%)] text-[hsl(38,95%,58%)] md:h-5 md:w-5"
                />
              ))}
            </div>
            <blockquote className={`${BODY} ${ON_LIGHT}`}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-[hsl(0,0%,10%)] underline decoration-[#1c100e]/25 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    {t.name}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <p className="font-heading text-sm font-medium text-[hsl(0,0%,10%)]">
                    {t.name}
                  </p>
                )}
                <p className={`mt-0.5 font-heading text-sm font-normal ${ON_LIGHT_MUTED}`}>
                  {t.role}
                </p>
              </div>
              <span className="rounded-full bg-[hsl(0,0%,10%)]/8 px-3 py-1 font-heading text-[10px] font-medium uppercase tracking-[0.16em] text-[hsl(0,0%,10%)]/70">
                {t.source}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const Build = () => {
  const measurementId = (localStorage.getItem('google_analytics_id') || '').trim();
  const { trackEvent, isInitialized } = useGoogleAnalytics({ measurementId });

  /*
   * Hero A/B test concluded: Variant A is now the default hero for all
   * visitors. Variant B stays parked in the code, reachable only via an
   * explicit ?variant=B override (QA), so the test can be re-run later without
   * rebuilding the machinery. Resolved once and synchronously so the right
   * headline is present on first paint (no flash): a ?variant=A|B override wins
   * (QA), otherwise everyone — including visitors previously assigned B — gets A.
   */
  const [variant] = useState<HeroVariant>(() => {
    if (typeof window === 'undefined') return 'A';
    const forced = new URLSearchParams(window.location.search).get('variant')?.toUpperCase();
    if (forced === 'A' || forced === 'B') return forced;
    return 'A';
  });

  // Persist the assignment so returning visitors keep it — but a QA override
  // (?variant=) must never overwrite the stored value.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const forced = new URLSearchParams(window.location.search).get('variant')?.toUpperCase();
    if (forced === 'A' || forced === 'B') return;
    if (localStorage.getItem(HERO_VARIANT_KEY) !== variant) {
      localStorage.setItem(HERO_VARIANT_KEY, variant);
    }
  }, [variant]);

  useSEO({
    title: 'The 0→1 Cohort · 6 Weeks, 10 Seats | Mentorna®',
    description:
      'For 9-to-5 domain experts. Build a profitable business in six weeks using the 0→1 Framework, without losing $10,000 on tech nobody needs. 10 seats per cohort.',
    canonical: 'https://www.mentorna.com/build',
  });

  // Land at the hero. #root is the scrollport under 768px, so window alone is not enough.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('root')?.scrollTo(0, 0);
  }, []);

  // hero_variant_view — once per pageview, only after GA is ready and analytics
  // consent is granted (the variant itself renders regardless of consent).
  const viewTracked = useRef(false);
  useEffect(() => {
    if (viewTracked.current || !isInitialized || !analyticsConsentGranted()) return;
    viewTracked.current = true;
    trackEvent('hero_variant_view', { variant });
  }, [isInitialized, variant, trackEvent]);

  const track = (placement: string) => {
    // Existing funnel event — now variant-aware so every apply CTA carries it.
    trackEvent('cohort_apply_click', {
      page_path: window.location.pathname,
      placement,
      variant: 'build_v4',
      hero_variant: variant,
    });
    // A/B metric event, consent-gated.
    if (analyticsConsentGranted()) {
      trackEvent('hero_apply_click', { variant, placement });
    }
  };

  const { trackRef, p } = useHeroScroll();
  const applyHref = whatsappUrl(APPLY_MESSAGE);

  /* Phase values for the exit choreography (see `phase` above). */
  const copyP = phase(p, 0, 0.4); // copy exits first
  const filmP = phase(p, 0.05, 0.55); // film grows into freed space
  const groundP = phase(p, 0.32, 0.9); // dunes tuck under film bottom
  // No cream seal inside sticky — cream <main> slides up over the hero (Fora).

  /* 'hero' is the light pill, used on every dark and purple surface; 'page' is
     the ink pill, used on cream. */
  const ApplyButton = ({
    where,
    label = CTA_LABEL,
    tone = 'hero',
  }: {
    where: string;
    label?: string;
    tone?: 'hero' | 'page';
  }) => (
    <a
      href={applyHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(where)}
      className={
        tone === 'hero'
          ? 'inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium tracking-wide text-[hsl(0,0%,8%)] transition-colors hover:bg-white/90 md:min-h-[3.25rem] md:px-9 md:text-base'
          : 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[hsl(0,0%,10%)] px-8 text-sm font-medium tracking-wide text-[#F7E9D6] transition-transform hover:scale-[1.03] md:min-h-[3.25rem] md:px-9 md:text-base'
      }
    >
      {tone === 'page' && <MessageCircle className="h-5 w-5" style={{ color: TEAL }} />}
      {label}
    </a>
  );

  /* The page had no button between the hero and the price — ~15,000px on
     desktop. This is the inline answer to that (no sticky bar, by decision). */
  const CtaRow = ({ where, tone }: { where: string; tone: 'light' | 'dark' }) => (
    <div className="mt-12 flex flex-col items-center gap-3 text-center md:mt-14">
      <ApplyButton where={where} tone={tone === 'light' ? 'page' : 'hero'} />
      <p className={`font-heading text-sm ${tone === 'light' ? ON_LIGHT_MUTED : ON_DARK_MUTED}`}>
        {MONEY_BACK_LINE}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      {/* ══ HERO ══
          Fora composition: copy above, film in a floating portal, landscape
          layers stay at the bottom and only tuck under the portal's lower edge. */}
      <header className="bg-[#0c0a0b] text-white">
        <div ref={trackRef} className="relative h-[140vh]">
          <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
            {/* Atmosphere — Prisma video/image blended under Mentorna grade.
                No Prisma UI: only the vivid moving field + warm overlays. */}
            <div
              aria-hidden
              className="absolute inset-0 overflow-hidden"
              style={{
                transform: `translateY(${p * 14}px) scale(${1 + p * 0.03})`,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={PRISMA_BG_POSTER}
                className="absolute inset-0 h-full w-full scale-110 object-cover"
                src={PRISMA_BG_VIDEO}
              />
              {/* Warm Mentorna grade so the field stays ember, not pale grey */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(58,36,24,0.55) 0%, rgba(26,16,16,0.35) 38%, rgba(12,10,11,0.72) 100%)',
                }}
              />
              <div
                className="absolute inset-0 mix-blend-soft-light"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 55% at 50% 20%, rgba(232,168,90,0.45), transparent 62%)',
                }}
              />
              <div className="noise-overlay absolute inset-0 opacity-[0.28] mix-blend-overlay" />
            </div>

            {/* Soft ground haze — replaces rigid wave cutouts */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42%]"
              style={{
                background:
                  'linear-gradient(to top, #0c0a0b 0%, rgba(28,16,14,0.85) 28%, rgba(61,36,28,0.35) 58%, transparent 100%)',
                transform: `translateY(${groundP * -36}px)`,
                filter: 'blur(1.5px)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[-10%] bottom-[-8%] z-[3] h-[28%] rounded-[100%] bg-[#1c100e]/90 blur-3xl"
              style={{ transform: `translateY(${groundP * -48}px) scaleX(1.15)` }}
            />

            {/* Floating AI worker logos — Cursor, Codex, Grok */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
              style={{
                opacity: Math.max(1 - copyP * 1.35, 0),
                transform: `translateY(${copyP * -40}px)`,
              }}
            >
              {HERO_AI_TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className={`${tool.float} absolute ${tool.className}`}
                >
                  <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.35rem] bg-white/[0.08] shadow-[0_20px_60px_-18px_rgba(0,0,0,0.75)] ring-1 ring-white/20 backdrop-blur-md lg:h-[5.25rem] lg:w-[5.25rem]">
                    <img
                      src={tool.src}
                      alt=""
                      className="h-9 w-9 lg:h-11 lg:w-11"
                    />
                  </div>
                  <p className="mt-2 text-center font-heading text-[11px] font-medium tracking-[0.14em] text-white/55">
                    {tool.name}
                  </p>
                </div>
              ))}
            </div>

            <nav className="relative z-20 flex shrink-0 items-center justify-between px-6 py-5 md:px-10">
              <a
                href="/"
                className="font-heading text-[17px] font-light tracking-[0.06em] text-white"
              >
                Mentorna®
              </a>
              <div className="flex items-center gap-4 md:gap-7">
                <a
                  href="#how-it-works"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white md:inline md:text-xs"
                >
                  How it works
                </a>
                <a
                  href="#who-runs-it"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white sm:inline md:text-xs"
                >
                  Your teacher
                </a>
                <a
                  href="#price"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white md:inline md:text-xs"
                >
                  Price
                </a>
                <a
                  href="#faq"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white lg:inline md:text-xs"
                >
                  FAQ
                </a>
                <a
                  href="#apply"
                  className="rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/90 ring-1 ring-white/15 transition-colors hover:bg-white/15 hover:text-white md:text-xs"
                >
                  Apply
                </a>
              </div>
            </nav>

            <div
              className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-2 text-center md:pt-4"
              style={{
                opacity: Math.max(1 - copyP, 0),
                transform: `translateY(${copyP * -56}px)`,
                visibility: copyP === 1 ? 'hidden' : undefined,
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                Cohort 3 · Starts 1 November · Live online · 6 weeks · {SEATS} seats
              </p>

              {variant === 'A' ? (
                <>
                  <h1 className="mt-4 max-w-3xl font-heading text-[2.15rem] font-normal leading-[1.08] tracking-tight md:text-5xl lg:text-[3.65rem]">
                    {HERO_A.headline[0]}
                    <br />
                    <Highlight tone="dark">{HERO_A.headline[1]}</Highlight>
                  </h1>
                  <p className="mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-white/65 md:text-lg">
                    {HERO_A.subhead}
                  </p>
                  {/* Sits lower than the old headline did, over the bright
                      middle of the hero photo — hierarchy comes from size
                      here, not from dropping opacity into illegibility. */}
                  <p className="mt-3 max-w-xl font-heading text-sm font-light leading-relaxed text-white/60 md:text-base">
                    {HERO_A.note}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="mt-4 max-w-3xl font-heading text-[2.15rem] font-light leading-[1.08] tracking-tight md:text-5xl lg:text-[3.65rem]">
                    Six weeks, live, to your first paying customer.
                  </h1>
                  <p className="mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-white/65 md:text-lg">
                    {HERO_B_SUBHEAD}
                  </p>
                </>
              )}

              <div className="mt-7">
                <ApplyButton where="hero" tone="hero" />
              </div>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/60">
                Opens WhatsApp. 4 short questions.
              </p>
            </div>

            {/* Portal — grows up into freed space; stays above dune crest */}
            <div
              className="relative z-10 mx-auto mt-5 w-[min(720px,calc(100%-1.75rem))] md:mt-7"
              style={{
                /* Fade as cream <main> approaches so nothing ghosts through. */
                opacity: Math.max(1 - groundP * 0.35, 0.65),
                transform: `translateY(${-filmP * 88 + groundP * 12}px) scale(${1 + filmP * 0.2})`,
                transformOrigin: 'center bottom',
              }}
            >
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(232,168,90,0.32), rgba(120,90,180,0.12) 55%, transparent 70%)',
                  }}
                />
                <div
                  className="relative overflow-hidden rounded-[22px] bg-black ring-1 ring-white/15"
                  style={{
                    boxShadow:
                      '0 40px 90px -24px rgba(0,0,0,0.75), 0 0 60px -16px rgba(232,168,90,0.2)',
                  }}
                >
                  <div className="relative aspect-[16/10] md:aspect-[720/460]">
                    <HeroFilm className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Soft near ground — no hard wave silhouette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%]"
              style={{
                background:
                  'linear-gradient(to top, #0c0a0b 10%, rgba(28,16,14,0.75) 45%, transparent 100%)',
                transform: `translateY(${groundP * -56}px)`,
              }}
            />

          </div>
        </div>
      </header>

      {/* Cream page slides up over the sticky hero — same handoff as Fora.
          Negative margin overlaps the track's leftover scroll so trust arrives
          as the dunes tuck, instead of after a empty cream void. */}
      <main
        className="relative z-10 -mt-[36vh] pt-10 md:-mt-[32vh] md:pt-12"
        style={{ background: PAGE_BG }}
      >
        <div className="mx-auto max-w-5xl px-4">
        {/* ══ TRUST STRIP ══ */}
        <section className="pt-2 md:pt-4">
          <Reveal>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {TRUST.map((item) => (
                <li key={item.k} className={`${CARD} px-4 text-center md:px-5`}>
                  <img
                    src={item.img}
                    alt={item.alt}
                    width={88}
                    height={88}
                    className="mx-auto h-16 w-16 object-contain md:h-[4.5rem] md:w-[4.5rem]"
                    style={{ filter: 'drop-shadow(0 14px 20px rgba(80, 40, 16, 0.16))' }}
                  />
                  <p className="mt-3 font-heading text-[1.3rem] font-semibold leading-none tracking-tight md:text-[1.5rem]">
                    {item.k}
                  </p>
                  <p className={`mt-2 font-heading text-sm font-normal leading-snug md:text-[15px] ${ON_LIGHT}`}>
                    {item.v}
                    {item.link && (
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[hsl(0,0%,10%)]/25 underline-offset-2 transition-colors hover:text-[hsl(0,0%,10%)] hover:decoration-[hsl(0,0%,10%)]/60"
                      >
                        {item.link.label}
                      </a>
                    )}
                    {item.link && '.'}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ══ WHY NOW + VIDEO ══
            The persona hook and the explainer are one argument, so they share a
            section. Prose is left-aligned: it reads badly ragged when centred. */}
        <section id="why-now" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Why now</Eyebrow>
              <h2 className={`mt-3 ${H2}`}>
                One expert with AI can now do the work of a <Highlight>whole team</Highlight>.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={`mx-auto mt-10 max-w-2xl space-y-5 md:mt-12 ${BODY} ${ON_LIGHT}`}>
              <p>
                Andrew Ng, a leading AI teacher, asks why we have &ldquo;10x engineers&rdquo; but
                no &ldquo;10x accountants.&rdquo; His answer: in most jobs, one person can only
                work so fast.
              </p>
              <p className="font-heading text-2xl font-semibold leading-snug tracking-tight text-[hsl(0,0%,10%)] md:text-[2rem]">
                AI removes that limit.
              </p>
              <p>The winners will be people who know one field deeply. That is you.</p>
              <p className={`border-t border-[#1c100e]/10 pt-4 font-heading text-[13px] font-normal leading-relaxed ${ON_LIGHT_MUTED}`}>
                Source: Andrew Ng, &ldquo;How AI Can Make You a 10x Professional,&rdquo;
                DeepLearning.AI
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto mt-10 max-w-[720px] text-center md:mt-12">
              <div className="overflow-hidden rounded-[22px] bg-black shadow-[0_30px_70px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/10">
                <VideoPlayer
                  src={VSL_URL}
                  poster={VSL_POSTER}
                  alt="Ahmed explaining the 0→1 Framework"
                />
              </div>
              <p className={`mt-4 font-heading text-sm font-normal ${ON_LIGHT_MUTED}`}>
                How the program works · 2½ minutes
              </p>
            </div>
          </Reveal>
        </section>
        </div>

        {/* ══ COMMON MISTAKES ══
            Full-bleed ember chamber. Cream above is calm facts; this is the
            confrontation. */}
        <section
          id="mistakes"
          className="relative mt-16 overflow-hidden text-[#F7E9D6] md:mt-24"
          style={{ background: INK_EMBER }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[42%] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(232,168,90,0.38), transparent 68%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[80%] -translate-x-1/2 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(196,92,42,0.28), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow tone="dark">Common mistakes</Eyebrow>
                <h2 className={`mt-4 ${H2}`}>
                  Why most good ideas <Highlight tone="dark">never launch</Highlight>
                </h2>
                <p className={`mt-5 ${BODY} ${ON_DARK} md:text-lg`}>
                  5 mistakes. Most people make at least one.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <ol className="mx-auto mt-14 max-w-2xl md:mt-16">
                {FAILURES.map((f) => (
                  <li
                    key={f.n}
                    className="flex gap-5 border-t border-[#F7E9D6]/12 py-8 last:border-b md:gap-10 md:py-10"
                  >
                    <span
                      className="w-12 shrink-0 font-heading text-3xl font-semibold tabular-nums leading-none md:w-16 md:text-4xl"
                      style={{ color: AMBER }}
                    >
                      {f.n}
                    </span>
                    <div>
                      <h3 className={H3}>{f.title}</h3>
                      <p className={`mt-2 ${BODY} ${ON_DARK}`}>{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <p
                className="mt-12 text-center font-heading text-xl font-semibold tracking-tight md:text-2xl"
                style={{ color: AMBER }}
              >
                How many of these are you making right now?
              </p>
              <CtaRow where="mistakes" tone="dark" />
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4">
        {/* ══ WHO THIS IS FOR ══ */}
        <section id="who" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Who this is for</Eyebrow>
              <h2 className={`mt-3 ${H2}`}>
                Professionals with <Highlight>10+ years</Highlight> in one field
              </h2>

              <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                {FIT_FIELDS.map((f) => (
                  <li
                    key={f}
                    className="rounded-full bg-white px-4 py-2 font-heading text-sm font-medium ring-1 ring-[#1c100e]/15"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              <p className={`mx-auto mt-8 max-w-xl ${BODY} ${ON_LIGHT} md:text-lg`}>
                You already know your field. That is the hard part. We teach the rest: how to
                sell, and how to build with AI.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
            {FIT_PATHS.map((p, i) => (
              <Reveal key={p.t} delay={i * 80}>
                <li className={`${CARD} h-full`}>
                  <h3 className={H3}>{p.t}</h3>
                  <p className={`mt-2 ${BODY} ${ON_LIGHT}`}>{p.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mx-auto mt-10 max-w-2xl md:mt-12">
              <div className="rounded-[28px] bg-[#16110F] px-7 py-9 text-center shadow-[0_28px_70px_-28px_rgba(80,40,16,0.35)] ring-1 ring-[#1c100e]/12 md:px-12 md:py-11">
                <p
                  className="font-heading text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: CORAL }}
                >
                  Not for you if
                </p>
                <ul className="mt-6 space-y-4">
                  {FIT_SKIP.map((f) => (
                    <li
                      key={f}
                      className="flex items-start justify-center gap-3 font-heading text-lg font-normal leading-snug text-[#F7E9D6] md:text-xl"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: CORAL }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
        </div>

        {/* ══ YOUR TEACHER ══
            Photos from Mentorna workshops. The fan sits in-flow and
            parallax-rotates as the section scrolls. */}
        <section
          id="who-runs-it"
          className="relative mt-16 scroll-mt-6 overflow-hidden text-[#F7E9D6] md:mt-24"
          style={{ background: INK_SMOKE }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[38%] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(232,168,90,0.32), transparent 68%)',
            }}
          />

          <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
                <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
                  <img
                    src={AHMED_PHOTO.src}
                    alt={AHMED_PHOTO.alt}
                    className="aspect-[4/5] w-full object-cover object-[center_18%]"
                  />
                  <div className="absolute bottom-4 left-4 rounded-2xl bg-[#F7E9D6] px-5 py-3 text-[#0c0a0b]">
                    <p className="font-heading text-3xl font-semibold leading-none tracking-tight">
                      {STATS[0].v}
                    </p>
                    <p className="mt-1 font-heading text-xs font-medium">{STATS[0].l}</p>
                  </div>
                </div>
                <div className="text-left">
                  <Eyebrow tone="dark">Your teacher</Eyebrow>
                  <h2 className={`mt-3 ${H2}`}>Ahmed Ezzat</h2>
                  <p className={`mt-4 font-heading text-xl font-normal leading-snug md:text-2xl ${ON_DARK}`}>
                    Founder, AI engineer and teacher
                  </p>
                  <div className={`mt-5 space-y-4 ${BODY} ${ON_DARK}`}>
                    {BIO.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 md:mt-14 -mx-4 md:-mx-8">
              <CardFanCarousel cards={EVENT_PHOTOS} scrollLinked />
            </div>

            <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-y-8">
              {STATS.slice(1).map((s, i) => (
                <div
                  key={s.l}
                  className={`px-2 text-center ${i > 0 ? 'border-l border-white/10' : ''}`}
                >
                  <p className="font-heading text-[1.85rem] font-semibold leading-none tracking-tight text-[#F7E9D6] md:text-[2.1rem]">
                    {s.v}
                  </p>
                  <p className={`mx-auto mt-2 max-w-[9rem] font-heading text-xs font-normal leading-snug md:text-[13px] ${ON_DARK}`}>
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-[#0c0a0b] py-6 md:py-8">
            <p className={`mb-5 text-center font-heading text-[11px] font-medium uppercase tracking-[0.22em] ${ON_DARK_MUTED}`}>
              Where I have worked and taught
            </p>
            <div className="overflow-hidden">
              {/* Single row. The list is rendered twice so the loop is seamless —
                  the second copy is hidden from assistive tech and tab order. */}
              <div className="org-marquee flex w-max">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex" aria-hidden={dup === 1 || undefined}>
                    {ORGS.map((o) => {
                      const inner = (
                        <>
                          {o.logo ? (
                            <img
                              src={o.logo}
                              alt=""
                              width={28}
                              height={28}
                              className="h-7 w-7 rounded-md object-contain md:h-8 md:w-8"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 font-heading text-[10px] font-medium text-[#F7E9D6]/70 md:h-8 md:w-8"
                            >
                              {o.name.slice(0, 1)}
                            </span>
                          )}
                          <span className="font-heading text-base font-medium tracking-tight text-[#F7E9D6] md:text-xl">
                            {o.name}
                          </span>
                        </>
                      );

                      return o.url ? (
                        <a
                          key={`${dup}-${o.name}`}
                          href={o.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={dup === 1 ? -1 : undefined}
                          className={`${ORG_CHIP} transition-colors hover:bg-white/[0.13] hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(38,95%,58%)]`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <span key={`${dup}-${o.name}`} className={ORG_CHIP}>
                          {inner}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4">
        {/* ══ WHAT PEOPLE SAY ══
            Three vertical clips, three quotes, four chat screenshots. Videos
            stay on S3 and only load after play — they are 50–90 MB HEVC phone
            files. */}
        <section id="proof" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>From past workshops</Eyebrow>
              <h2 className={`mt-3 ${H2}`}>
                What <Highlight>people say</Highlight>
              </h2>
              <p className={`mt-4 ${BODY} ${ON_LIGHT} md:text-lg`}>
                This program is built on the same method as these workshops.
              </p>
            </div>
          </Reveal>
          <ProofClips />
          <CtaRow where="proof" tone="light" />
        </section>

        </div>

        {/* ══ HOW THE 6 WEEKS WORK ══
            The 4-step framework and the 6-week schedule are one story, so they
            are one grid: each step lists the weeks that belong to it. Static on
            every viewport — all six weeks readable without a click or hover. */}
        <section
          id="how-it-works"
          className="relative mt-16 scroll-mt-6 overflow-hidden text-[#F7E9D6] md:mt-24"
          style={{ background: SIGNATURE_BG }}
        >
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow tone="dark">{FRAMEWORK}</Eyebrow>
                <h2 className={`mt-3 ${H2}`}>
                  How the <Highlight tone="dark">6 weeks</Highlight> work
                </h2>
                <p className={`mt-4 ${BODY} ${ON_DARK} md:text-lg`}>
                  4 steps, in this order. You test with buyers before you build, so you do not
                  waste money.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <article className={`${CARD_ON_DARK} relative flex h-full flex-col overflow-hidden`}>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: STEP_COLOR[s.step] }}
                    />
                    <img
                      src={s.img}
                      alt={s.alt}
                      width={80}
                      height={80}
                      className="mt-2 h-20 w-20 object-contain"
                      style={{ filter: 'drop-shadow(0 16px 22px rgba(0, 0, 0, 0.3))' }}
                    />
                    <p className={`mt-4 font-heading text-[11px] font-medium uppercase tracking-[0.22em] ${ON_DARK_MUTED}`}>
                      {s.n}
                    </p>
                    <h3 className={`mt-1 ${H3}`}>{s.name}</h3>

                    <div className="mt-4 space-y-4">
                      {COHORT_WEEKS.filter((w) => (s.weeks as readonly number[]).includes(w.n)).map(
                        (w) => (
                          <div key={w.n}>
                            <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium">
                              Week {w.n}
                            </span>
                            {w.title && (
                              <p className="mt-2 font-heading font-semibold leading-snug">{w.title}</p>
                            )}
                            <p className={`mt-1 font-heading text-[15px] font-normal leading-relaxed ${ON_DARK}`}>
                              {w.brief}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-auto border-t border-white/10 pt-4">
                      <p className={`mt-4 font-heading text-xs font-medium ${ON_DARK_MUTED}`}>
                        You leave with:
                      </p>
                      <p className="mt-1 font-heading text-[15px] font-medium leading-snug">
                        {s.outcome}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className={`mt-10 text-center font-heading text-[11px] font-normal tracking-wide ${ON_DARK_MUTED}`}>
              3D icons from{' '}
              <a
                href="https://www.thiings.co"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#F7E9D6]/30 underline-offset-4"
              >
                thiings.co
              </a>
            </p>
            <CtaRow where="framework" tone="dark" />
          </div>
        </section>

        {/* ══ GUEST EXPERTS ══
            Real, confirmed guests (see GUESTS). They run one session each on
            their own expertise; they do not co-host the cohort, so keep the
            copy here free of "co-host". */}
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <section id="guests" className="scroll-mt-6 pt-16 md:pt-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow>Guest experts</Eyebrow>
                <h2 className={`mt-3 ${H2}`}>
                  3 experts, <Highlight>1 live session</Highlight> each
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
              {GUESTS.map((g, i) => (
                <Reveal key={g.name} delay={i * 90}>
                  <article>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] shadow-[0_28px_80px_-28px_rgba(0,0,0,0.5)] ring-1 ring-[#1c100e]/10">
                      <img
                        src={g.photo}
                        alt={g.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
                      />
                      {g.week && (
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#F7E9D6] px-3 py-1 font-heading text-[10px] font-medium uppercase tracking-[0.18em] text-[#0c0a0b]">
                          Week {g.week}
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <p className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4A574]">
                          {g.topic}
                        </p>
                        <h3 className="mt-2 font-heading text-[1.85rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[2.1rem]">
                          {g.name}
                        </h3>
                      </div>
                    </div>
                    <p className={`mt-4 font-heading text-sm font-medium ${ON_LIGHT_MUTED}`}>
                      {g.credential}
                    </p>
                    <p className={`mt-2 ${BODY} ${ON_LIGHT}`}>{g.punch}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        {/* ══ FOUNDERS' CLUB ══
            The photo is the group you keep: landscape portal, membership stamp,
            three quiet beats and one wide card on why the group is small. */}
        <section
          id="club"
          className="relative mt-16 scroll-mt-6 overflow-hidden text-[#F7E9D6] md:mt-24"
          style={{ background: INK_FOREST }}
        >
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow tone="dark">After the 6 weeks</Eyebrow>
                <h2 className={`mt-3 ${H2}`}>{CLUB}</h2>
                <p className={`mt-4 ${BODY} ${ON_DARK} md:text-lg`}>
                  When the program ends, you stay in a private group. For life.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative mt-12 overflow-hidden rounded-[28px] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.6)] ring-1 ring-[#D4A574]/30 md:mt-16">
                <img
                  src={CLUB_PHOTO.src}
                  alt={CLUB_PHOTO.alt}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] md:aspect-[2/1]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                />
                <p className="absolute bottom-0 left-0 p-6 font-heading text-3xl font-semibold leading-none tracking-tight text-[#F7E9D6] md:p-10 md:text-5xl">
                  Lifetime member
                </p>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {CLUB_BEATS.map((b, i) => (
                <Reveal key={b.t} delay={i * 80}>
                  <article className={`${CARD_ON_DARK} h-full`}>
                    <h3 className={H3}>{b.t}</h3>
                    <p className={`mt-2 ${BODY} ${ON_DARK}`}>{b.d}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <article className={`${CARD_ON_DARK} mt-4`}>
                <h3 className={H3}>{CLUB_DOOR.t}</h3>
                <p className={`mt-3 max-w-2xl ${BODY} ${ON_DARK}`}>{CLUB_DOOR.body}</p>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ══ PRICE + GUARANTEE ══ */}
        <section
          id="price"
          className="relative scroll-mt-6 overflow-hidden text-[#F7E9D6]"
          style={{ background: SIGNATURE_BG }}
        >
          <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
            <div className="grid items-start gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
              <Reveal>
                <div className="text-center md:text-left">
                  <h2
                    className={`inline-flex items-center gap-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.22em] ${ON_DARK_MUTED}`}
                  >
                    <span
                      aria-hidden
                      className="h-[7px] w-[7px] shrink-0 rounded-full"
                      style={{ background: AMBER, boxShadow: `0 0 0 3px ${AMBER}22` }}
                    />
                    Price
                  </h2>
                  <p className="mt-3 font-heading text-[clamp(4.5rem,18vw,7.5rem)] font-semibold leading-none tracking-[-0.04em] text-[#F7E9D6]">
                    ${PRICE}
                  </p>
                  <p className={`mt-4 font-heading text-xl font-normal leading-snug md:text-2xl ${ON_DARK}`}>
                    One seat. 6 live online weeks. Starts {COHORT_LABEL}.
                  </p>

                  <div className="mt-6 flex items-start gap-4 rounded-2xl bg-[#F7E9D6] p-5 text-left text-[#1a1a1a]">
                    <img
                      src="/method/guarantee.webp"
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 object-contain"
                    />
                    <div>
                      <p className="font-heading font-semibold">Money-back guarantee</p>
                      <p className="mt-1 font-heading text-[15px] font-normal leading-relaxed">
                        Join the first 2 sessions. If it is not for you, you get every dollar back.
                        No questions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <ApplyButton where="pricing" tone="hero" />
                    <p className={`mt-4 font-heading text-sm font-normal ${ON_DARK_MUTED}`}>
                      {COHORT_STATUS}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="overflow-hidden rounded-[28px] border border-[#1c100e]/10 bg-white text-[hsl(0,0%,10%)] shadow-[0_28px_70px_-36px_rgba(0,0,0,0.5)]">
                  <div className="border-b border-[#1c100e]/8 bg-[#F7E9D6]/45 px-6 py-4 md:px-8">
                    <p className={`font-heading text-[11px] font-medium uppercase tracking-[0.22em] ${ON_LIGHT_MUTED}`}>
                      What you get
                    </p>
                  </div>
                  <ul className="divide-y divide-[#1c100e]/8">
                    {INCLUDED.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-start gap-4 px-6 py-4 md:px-8 md:py-[1.15rem]"
                      >
                        <span
                          className="mt-0.5 font-heading text-[11px] font-medium tabular-nums tracking-[0.14em]"
                          style={{ color: AMBER_INK }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-heading text-base font-normal leading-snug md:text-[17px] ${ON_LIGHT}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4">
        {/* ══ FAQ ══
            Only the objections the rest of the page does not already answer. */}
        <section id="faq" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <h2 className={H2}>Questions</h2>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-2xl space-y-3 md:mt-12">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group overflow-hidden rounded-[22px] border border-[#1c100e]/10 bg-white open:border-[#1c100e]/16 open:shadow-[0_18px_40px_-28px_rgba(60,30,10,0.4)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-heading text-base font-semibold leading-snug tracking-tight text-[hsl(0,0%,10%)] md:text-lg">
                      {f.q}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(0,0%,10%)]/[0.06] text-[hsl(0,0%,10%)]/70 transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </summary>
                  <p className={`px-5 pb-5 font-heading text-[15px] font-normal leading-relaxed md:px-6 md:pb-6 ${ON_LIGHT}`}>
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
        </div>

        {/* ══ HOW TO APPLY ══
            The four questions are shown here in full before anyone taps, so the
            button is not a leap — it opens WhatsApp with these same four
            pre-filled (APPLY_MESSAGE). Last section before the footer. */}
        <section
          id="apply"
          className="relative mt-16 scroll-mt-6 overflow-hidden text-[#F7E9D6] md:mt-24"
          style={{ background: INK_GATE }}
        >
          <div className="relative mx-auto max-w-3xl px-4 py-20 md:py-28">
            <Reveal>
              <div className="text-center">
                <Eyebrow tone="dark">How to apply</Eyebrow>
                <h2 className={`mt-4 ${H2}`}>
                  I choose {SEATS} people.{' '}
                  <Highlight tone="dark">Most who apply are not a fit yet.</Highlight>
                </h2>
                <p className={`mx-auto mt-6 max-w-xl ${BODY} ${ON_DARK} md:text-lg`}>
                  I read every message myself. Send me 4 answers on WhatsApp:
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ol className="mt-10 space-y-6">
                {GATE_QUESTIONS.map((q, i) => (
                  <li key={q} className="flex gap-4">
                    <span className={`mt-1 shrink-0 font-heading text-sm font-medium tabular-nums ${ON_DARK_MUTED}`}>
                      {i + 1}.
                    </span>
                    <span className="font-heading text-lg font-normal leading-snug text-[#F7E9D6]/90 md:text-xl">
                      {q}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={140}>
              <div className={`mt-12 space-y-4 border-t border-[#F7E9D6]/15 pt-8 ${BODY} ${ON_DARK}`}>
                <p>I reply within a day.</p>
                <p>If it is a yes, I send you the details and you decide. No sales call.</p>
                <p>
                  If it is a no, I tell you why. I also send you the workshop recording and a
                  90-day plan.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 text-center">
                <ApplyButton where="gate" tone="hero" />
                <p className={`mt-5 font-heading text-sm font-normal ${ON_DARK_MUTED}`}>
                  Not ready? Send{' '}
                  <a
                    href={whatsappUrl(DETAILS_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('gate_details')}
                    className="underline decoration-[#F7E9D6]/30 underline-offset-4 hover:decoration-[#F7E9D6]/60"
                  >
                    &ldquo;details&rdquo;
                  </a>{' '}
                  on WhatsApp for the full program.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Build;
