import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  MessageCircle,
  Play,
  Star,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Footer from '@/components/Footer';
import CardFanCarousel from '@/components/ui/card-fan-carousel';
import { whatsappUrl } from '@/lib/whatsapp';
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

const PAGE_BG = 'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';
const brutal = 'border-4 border-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
const SECTION_ACCENTS = [AMBER, PURPLE, CYAN, TEAL, CORAL];

const DOTS = {
  backgroundImage: 'radial-gradient(rgba(0,0,0,.18) 1.3px, transparent 1.3px)',
  backgroundSize: '18px 18px',
};

/* ────────────────────────────────────────────────────────────
   Offer
   ──────────────────────────────────────────────────────────── */
const FRAMEWORK = 'The 0→1 Framework';
const CLUB = "Founders' Club";
const PRICE = 400;
const SEATS = 10;
/** Seats still open in the live cohort. Update when someone joins. */
const SEATS_LEFT = 4;
const COHORT_LABEL = '18 September';

/** Four proofs under the hero. Short enough to read without thinking.
 *  Icons: thiings.co (warranty, infinity-loop, money, handshake). */
const TRUST = [
  {
    k: 'Money-back',
    v: 'Come twice. If it is not for you, every dollar comes back.',
    img: '/method/guarantee.webp',
    alt: 'Guarantee',
  },
  {
    k: 'Yours forever',
    v: 'The plan, the tools, and the club. You keep them.',
    img: '/method/infinity.webp',
    alt: 'Infinity',
  },
  {
    k: '$10,000+',
    v: 'Made by students. In real businesses.',
    img: '/method/money.webp',
    alt: 'Money',
  },
  {
    k: 'Hands-on',
    v: 'Not theory. Building together.',
    img: '/method/handshake.webp',
    alt: 'Handshake',
  },
];

/**
 * Application happens over WhatsApp: the link opens with these three
 * questions pre-filled, so the first message is already a qualification.
 */
const APPLY_MESSAGE = `Hi Ahmed, I'd like to apply for the next 0→1 cohort.

1) Idea status (none / one I cannot start / too many to pick):

2) What I do right now (job / background):

3) Why now:`;

const QUESTION_MESSAGE = 'Hi Ahmed, I have a question about the 0→1 cohort.';

/* Instructor */
const BIO =
  "For 10 years, I've merged my expertise in entrepreneurship and AI into educational initiatives. I've helped students secure spots at top universities and launch innovative projects, and built startups worth over $5 million, raised $1.1M, and made two exits. I do not lecture. I build in the room with you.";

const STATS = [
  { v: '$5M+', l: 'Total valuation of startups I created' },
  { v: '$1.1M', l: 'Raised' },
  { v: '2', l: 'Startup exits' },
];

const ORGS = [
  { name: 'Slush', logo: '/orgs/slush.png' },
  { name: 'Antler', logo: '/orgs/antler.png' },
  { name: 'Akadeemy', logo: '/orgs/akadeemy.png' },
  { name: 'Robot Uprising', logo: '/orgs/robotuprising.png' },
  { name: 'AI Collective', logo: '/orgs/aicollective.png' },
  { name: 'Invention Convention', logo: '/orgs/inventionconvention.png' },
  { name: 'Helsinki XR Center', logo: '/orgs/helsinkixr.png' },
  { name: 'Predictiva', logo: null },
];

const AHMED_PHOTOS = [
  {
    src: 'https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png',
    alt: 'Ahmed Ezzat',
  },
  { src: '/workshop-helsinki/photo-174214.webp', alt: 'Ahmed Ezzat on stage teaching the room' },
  { src: '/workshop-helsinki/photo-185329.webp', alt: 'Ahmed leading the workshop floor' },
  { src: '/workshop-helsinki/photo-211945.webp', alt: 'Ahmed with the cohort after the session' },
  { src: '/workshop-helsinki/photo-unprompted.webp', alt: 'Ahmed coaching builders at the table' },
];

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
    title: 'You start with the tool',
    desc: 'You pick the stack first. Nobody asked for the thing yet.',
  },
  {
    n: '02',
    title: 'You keep it a secret',
    desc: 'You hide it so nobody steals it. Then nobody can tell you it is wrong.',
  },
  {
    n: '03',
    title: 'You add too much',
    desc: 'More features. Harder to explain. Nobody buys what they cannot say in one line.',
  },
  {
    n: '04',
    title: 'You build for everyone',
    desc: '"Anyone who needs this" is nobody. Pick one person.',
  },
  {
    n: '05',
    title: 'You wait for later',
    desc: 'You will start when work calms down. It will not.',
  },
];

/* The 0→1 Framework — thiings.co 3D icons. Free downloads are personal-use
   only; Mentorna.com needs their Indie commercial license before launch. */
const STEPS = [
  {
    n: '01',
    title: 'Validate the problem',
    desc: 'One person. One pain. Named so sharp the agents know what to build.',
    img: '/method/compass.webp',
    alt: 'Compass',
    float: 'method-float',
  },
  {
    n: '02',
    title: 'Validate the promise',
    desc: 'One offer a stranger would buy. You write it. They do not.',
    img: '/method/megaphone.webp',
    alt: 'Megaphone',
    float: 'method-float method-float-late',
  },
  {
    n: '03',
    title: 'Validate the demand',
    desc: 'Live. Real people. The market answers, not your friends.',
    img: '/method/rocket.webp',
    alt: 'Rocket',
    float: 'method-float method-float-last',
  },
  {
    n: '04',
    title: 'Build',
    desc: 'You direct. AI teammates ship version one, live, in the room. Not a deck.',
    img: '/weeks/laptop.webp',
    alt: 'Laptop',
    float: 'method-float',
  },
];

/* How it works — layout + spine copy from Alif Sessions "You have the what"
   section, adapted to four weeks. */
const HOW_IT_WORKS = [
  {
    title: 'Come with an idea and an open mind.',
    body: "You feel strongly about an idea. That is the starting point. We help you validate it: pressure-test the problem, sharpen who it is actually for, and make sure you are building the right version before you build too much of it.",
  },
  {
    title: 'Leave with a real product, real users, and a real community.',
    body: 'Over the four weeks you build your idea, get meaningful feedback from real users, and meet people on the same journey, then keep the key to Founders\' Club.',
  },
  {
    title: 'Find your channel, without the guesswork.',
    body: 'We help you identify where your customers actually live, and build a repeatable way to reach them every week.',
  },
];

/* What is included */
const INCLUDED = [
  '4 live sessions · 3 hours · 10 people',
  'Every recording · yours forever',
  `${FRAMEWORK} · the canvases`,
  'The prompts · the tools · the slides',
  'Guest sessions: marketing, funding, an investor',
  `${CLUB} · for life`,
  'You can still message me',
  'Week 4: you show the room',
];

/* Guest lineup — all three confirmed (sources: slush.org/about-us,
   ilabventures.tech, greenstep.fi/tilitoimisto-turku). */
const GUESTS = [
  {
    topic: 'Marketing',
    name: 'Marina Yurchenko',
    credential: 'Slush · Head of Marketing',
    punch: 'She grew the world’s loudest startup event. She will show you how attention turns into buyers.',
    photo:
      'https://cdn.prod.website-files.com/680cd45512772b4040d78def/69ef1877c33ad7be773c3089_Marina%20(1).JPG',
    status: 'confirmed',
  },
  {
    topic: 'Funding',
    name: 'Petri Saarinen',
    credential: 'iLab Ventures · Co-Founder',
    punch: '1,500 startups through his programs. He will tell you why most pitches die in the first line.',
    photo: 'https://ilabventures.tech/assets/team-petri-C62XuPhi.jpg',
    status: 'confirmed',
  },
  {
    topic: 'Growth',
    name: 'Anton Suomalainen',
    credential: 'Greenstep · Area Growth Manager',
    punch: 'He will keep the money side boring, so you can stay obsessed with the build.',
    photo:
      'https://greenstep.fi/wp-content/uploads/sites/2/2026/09/anton.suomalainen.jpg?v=1788494412',
    status: 'confirmed',
  },
];

const CLUB_PHOTO = {
  src: '/workshop-helsinki/photo-185329.webp',
  alt: 'The room after the cohort, builders still in the work',
};

const CLUB_BEATS = [
  {
    n: '01',
    t: 'Private',
    d: 'Not the free community. Only people who finished.',
  },
  {
    n: '02',
    t: 'Direct',
    d: 'Ahmed still answers. After week four. After that too.',
  },
  {
    n: '03',
    t: 'Already in',
    d: 'People who hit the same wall. They stayed.',
  },
];

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
];

/* Written feedback screenshots from /testimonials (Helsinki workshop). */
const WRITTEN_PROOF = [
  { src: '/workshop-helsinki/photo-IMG_9530.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9533.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9535.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9558.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9559.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9702.webp', alt: 'Workshop feedback message' },
  { src: '/workshop-helsinki/photo-IMG_9711.webp', alt: 'LinkedIn post about the workshop' },
  { src: '/workshop-helsinki/photo-IMG_9712.webp', alt: 'LinkedIn post about the workshop' },
];

/* Fit — three ways in. An idea is not a ticket. */
const FIT_PATHS = [
  {
    n: '01',
    t: 'No idea',
    d: 'You walk in empty. We find the one worth building.',
  },
  {
    n: '02',
    t: 'One idea',
    d: 'You have it. You do not know the first move.',
  },
  {
    n: '03',
    t: 'Too many',
    d: 'We test. We pick one. The rest wait.',
  },
];

const FIT_SKIP = [
  'You want to watch, not build',
  'You want someone else to build it',
  'You cannot keep three hours a week',
];

const FAQS = [
  {
    q: 'I am not technical. Is this for me?',
    a: 'Yes. You talk in plain words. AI does the building.',
  },
  {
    q: 'Can I do this with a full-time job?',
    a: 'Three hours a week. Outside work. That is the plan.',
  },
  {
    q: 'What if I have no idea?',
    a: 'Come anyway. No idea, one idea, or too many. We pick which.',
  },
  {
    q: 'What if I miss a session?',
    a: 'It is recorded. Yours forever. Message me between.',
  },
  {
    q: 'What happens when the four weeks end?',
    a: `The cohort ends. The ${CLUB} does not.`,
  },
  {
    q: 'What if it is not for me?',
    a: 'Come twice. If it is wrong, every dollar comes back.',
  },
  {
    q: 'How do I get in?',
    a: `WhatsApp. Three questions. ${SEATS} seats. I read every one.`,
  },
];

/* Main sales VSL — lives on CloudFront (S3: mybootcamp-ahmed-ezzat/build/). */
const VSL_URL = 'https://d2mp3ttz3u5gci.cloudfront.net/build/vsl.mp4';
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

const HERO_A = {
  prefix: 'Build your',
  // Animated cycle, in Ahmed's exact order; loops back to the start.
  words: ['idea', 'side-project', 'business', 'startup'],
  // Static word for reduced-motion + screen readers — deliberately DECOUPLED
  // from the cycle order. The cycle opens on "idea" (weak standalone), so the
  // non-motion anchor is a dedicated "business" instead of words[0].
  staticWord: 'business',
  connector: 'with',
  gradient: 'a team of AI workers', // the fixed leverage hook carries the gradient
  subhead: 'Live and designed for people with a full schedule.',
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
/*
 * Eyebrow — section label with a small accent dot, Fora-style. The dot is the
 * page's vividness rhythm: each cream section gets the next color from
 * SECTION_ACCENTS so the long run reads as chapters, not one flat slab.
 * Accent is optional; pass `color` to override the cycle.
 */
const Eyebrow = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <p className="inline-flex items-center gap-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/60">
    <span
      aria-hidden
      className="h-[7px] w-[7px] shrink-0 rounded-full"
      style={{ background: color ?? AMBER, boxShadow: `0 0 0 3px ${color ?? AMBER}22` }}
    />
    {children}
  </p>
);

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

/*
 * TypewriterWord — cycles a list of words with a type → hold → erase → next
 * loop and a blinking caret. prefers-reduced-motion users get ONE static word
 * (staticWord, decoupled from the cycle order) with no animation and no caret;
 * the guard is read synchronously so there is no flash of the animated state.
 * The animated text is aria-hidden — the full, stable headline is provided once
 * as sr-only text in the hero, so screen readers and crawlers get real copy.
 */
const TypewriterWord = ({
  words,
  staticWord,
  cursorColor,
}: {
  words: string[];
  staticWord?: string;
  cursorColor?: string;
}) => {
  const [reduced] = useState(prefersReducedMotion);
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? staticWord ?? words[0] ?? '' : '',
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;
    const current = words[wordIndex % words.length] ?? '';
    let timer: number;
    if (!deleting) {
      // typing forward, then a hold once the word is complete
      timer = window.setTimeout(
        () =>
          display.length < current.length
            ? setDisplay(current.slice(0, display.length + 1))
            : setDeleting(true),
        display.length < current.length ? 95 : 1500,
      );
    } else {
      // erasing back, then advance to the next word
      timer = window.setTimeout(
        () => {
          if (display.length > 0) {
            setDisplay(current.slice(0, display.length - 1));
          } else {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        },
        display.length > 0 ? 45 : 350,
      );
    }
    return () => window.clearTimeout(timer);
  }, [display, deleting, wordIndex, words, reduced]);

  return (
    <span className="whitespace-nowrap">
      <span>{display || ' '}</span>
      {!reduced && (
        <span
          aria-hidden="true"
          className="build-hero-cursor ml-0.5 inline-block font-normal"
          style={{ color: cursorColor }}
        >
          |
        </span>
      )}
    </span>
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
    <article className="w-[47%] max-w-[280px]">
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
            aria-label={`Play ${clip.name}'s testimonial`}
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
      <p className="mt-4 text-center font-heading text-lg font-light tracking-tight">{clip.name}</p>
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

      <div className="mt-8 grid grid-cols-2 items-start gap-3 sm:grid-cols-3 md:mt-10 md:gap-4">
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

      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
        {testimonials.map((t) => (
          <article
            key={t.id}
            className={`rounded-[22px] bg-white/70 p-5 shadow-[0_18px_40px_-28px_rgba(60,30,10,0.35)] ring-1 ring-[#1c100e]/10 md:p-6 ${
              t.highlight ? 'md:col-span-2' : ''
            }`}
          >
            <div className="mb-3 flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[hsl(38,95%,58%)] text-[hsl(38,95%,58%)] md:h-5 md:w-5"
                />
              ))}
            </div>
            <blockquote className="font-heading text-base font-normal leading-relaxed text-[hsl(0,0%,10%)]/90 md:text-lg">
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
                <p className="mt-0.5 font-heading text-sm font-light text-[hsl(0,0%,10%)]/55">
                  {t.role}
                </p>
              </div>
              <span className="rounded-full bg-[hsl(0,0%,10%)]/8 px-3 py-1 font-heading text-[10px] font-medium uppercase tracking-[0.16em] text-[hsl(0,0%,10%)]/65">
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
    title: 'The 0→1 Cohort · 4 Weeks, 10 Seats | Mentorna®',
    description:
      'For 9-to-5 domain experts. Build a profitable business in four weeks using the 0→1 Framework, without losing $10,000 on tech nobody needs. 10 seats per cohort.',
    canonical: 'https://mentorna.com/build',
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
      variant: 'build_v3',
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

  const ApplyButton = ({
    where,
    label = 'Apply for the next cohort',
    dark = true,
    tone = 'brutal',
  }: {
    where: string;
    label?: string;
    dark?: boolean;
    tone?: 'brutal' | 'hero' | 'page';
  }) => (
    <a
      href={applyHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(where)}
      className={
        tone === 'hero'
          ? 'inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium tracking-wide text-[hsl(0,0%,8%)] transition-colors hover:bg-white/90 md:min-h-[3.25rem] md:px-9 md:text-base'
          : tone === 'page'
            ? 'inline-flex min-h-12 items-center justify-center rounded-full bg-[hsl(0,0%,10%)] px-8 text-sm font-medium tracking-wide text-[#F7E9D6] transition-transform hover:scale-[1.03] md:min-h-[3.25rem] md:px-9 md:text-base'
            : `${brutal} inline-flex min-h-16 items-center justify-center gap-2 px-8 text-base font-extrabold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-lg ${
                dark ? 'bg-[hsl(0,0%,10%)] text-white' : 'bg-white'
              }`
      }
    >
      {tone !== 'hero' && (
        <MessageCircle className="h-5 w-5" style={{ color: dark ? TEAL : undefined }} />
      )}
      {label}
    </a>
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
                  href="#framework"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white md:inline md:text-xs"
                >
                  Framework
                </a>
                <a
                  href="#how-it-works"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white sm:inline md:text-xs"
                >
                  How it works
                </a>
                <a
                  href="#who-runs-it"
                  className="hidden text-[11px] font-medium tracking-wide text-white/55 transition-colors hover:text-white md:inline md:text-xs"
                >
                  Who runs it
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
                For 9-to-5 domain experts · Live · Fully remote · 4 weeks · {SEATS} seats
              </p>

              {variant === 'A' ? (
                <>
                  <style>{`
                    @keyframes buildHeroCaret { 0%, 45% { opacity: 1 } 55%, 100% { opacity: 0 } }
                    .build-hero-cursor { animation: buildHeroCaret 1.05s steps(1) infinite; }
                    @media (prefers-reduced-motion: reduce) { .build-hero-cursor { animation: none } }
                  `}</style>
                  <h1 className="mt-4 max-w-3xl font-heading text-[2.15rem] font-light leading-[1.08] tracking-tight md:text-5xl lg:text-[3.65rem]">
                    <span className="sr-only">
                      {HERO_A.prefix} {HERO_A.staticWord} {HERO_A.connector} {HERO_A.gradient}
                    </span>
                    <span aria-hidden="true">
                      {HERO_A.prefix}{' '}
                      <TypewriterWord
                        words={HERO_A.words}
                        staticWord={HERO_A.staticWord}
                        cursorColor="rgba(255,255,255,0.75)"
                      />
                      <br />
                      {HERO_A.connector} {HERO_A.gradient}
                    </span>
                  </h1>
                  <p className="mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-white/65 md:text-lg">
                    {HERO_A.subhead}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="mt-4 max-w-3xl font-heading text-[2.15rem] font-light leading-[1.08] tracking-tight md:text-5xl lg:text-[3.65rem]">
                    Four weeks, live, to your first paying customer.
                  </h1>
                  <p className="mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-white/65 md:text-lg">
                    {HERO_B_SUBHEAD}
                  </p>
                </>
              )}

              <div className="mt-7">
                <ApplyButton where="hero" tone="hero" />
              </div>
              <p className="mt-3 text-sm font-light text-white/45">
                <span style={{ color: AMBER }}>{SEATS_LEFT}</span> seats left in the {COHORT_LABEL}{' '}
                cohort.
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
        {/* ══ TRUST RIBBON ══ */}
        <section className="pt-2 md:pt-4">
          <Reveal>
            <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-8">
              {TRUST.map((item, i) => (
                <li
                  key={item.k}
                  className={`px-2 text-center md:px-6 ${
                    i > 0 ? 'md:border-l md:border-[hsl(0,0%,10%)]/10' : ''
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    width={88}
                    height={88}
                    className="mx-auto h-16 w-16 object-contain md:h-[4.5rem] md:w-[4.5rem]"
                    style={{ filter: 'drop-shadow(0 14px 20px rgba(80, 40, 16, 0.16))' }}
                  />
                  <p className="mt-3 font-heading text-[1.45rem] font-light leading-none tracking-tight md:text-[1.75rem]">
                    {item.k}
                  </p>
                  <p className="mx-auto mt-2 max-w-[16rem] font-heading text-sm font-light leading-snug text-[hsl(0,0%,10%)]/75 md:text-[15px]">
                    {item.v}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ══ MAIN VSL ══ */}
        <section className="pt-14 md:pt-20">
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow color={AMBER}>Watch this first</Eyebrow>
              <p className="mt-3 font-heading text-2xl font-light tracking-tight md:text-[1.85rem]">
                How the 0→1 Framework works.
              </p>
              <div className="mt-8 overflow-hidden rounded-[22px] bg-black shadow-[0_30px_70px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/10">
                <VideoPlayer
                  src={VSL_URL}
                  poster={VSL_POSTER}
                  alt="Ahmed explaining the 0→1 Framework"
                />
              </div>
              <p className="mt-4 font-heading text-sm font-light text-[hsl(0,0%,10%)]/70">
                Two and a half minutes. See if this is for you.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══ SEE THE CLASS ══ */}
        <section className="pt-14 md:pt-20">
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow color={CYAN}>See the class</Eyebrow>
              <p className="mt-3 font-heading text-2xl font-light tracking-tight md:text-[1.85rem]">
                This is what it looks like.
              </p>
              <div className="mx-auto mt-8 w-full max-w-[min(100%,22rem)] overflow-hidden rounded-[22px] bg-black shadow-[0_30px_70px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/10">
                <VideoPlayer
                  src={workshopVideoUrl}
                  poster={workshopVideoPoster}
                  alt="Inside the cohort"
                  portrait
                />
              </div>
              <p className="mt-4 font-heading text-sm font-light text-[hsl(0,0%,10%)]/70">
                90 seconds. Real people. A real room.
              </p>
            </div>
          </Reveal>
        </section>
        </div>

        {/* ══ THE 5 FAILURES ══
            Full-bleed ember chamber. Cream above is calm facts; this is the
            confrontation. Warm dark + cream type so it is neither the page
            body nor the black framework block that follows. */}
        <section className="relative mt-16 overflow-hidden text-[#F7E9D6] md:mt-24">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 55% at 50% 0%, #6B2A16 0%, #2A110C 44%, #140807 78%)',
            }}
          />
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
                <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7E9D6]/45">
                  The diagnosis
                </p>
                <h2 className="mt-4 font-heading text-4xl font-light leading-[1.1] tracking-tight md:text-5xl">
                  Why the idea is still an idea
                </h2>
                <p className="mt-5 font-heading text-base font-light leading-relaxed text-[#F7E9D6]/55 md:text-lg">
                  Five places people get stuck. You will see yourself in at least one.
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
                      className="w-12 shrink-0 font-heading text-3xl font-light tabular-nums leading-none md:w-16 md:text-4xl"
                      style={{ color: AMBER }}
                    >
                      {f.n}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-light leading-tight tracking-tight md:text-[2rem]">
                        {f.title}
                      </h3>
                      <p className="mt-2 font-heading text-sm font-light leading-relaxed text-[#F7E9D6]/55 md:text-base">
                        {f.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <p
                className="mt-12 text-center font-heading text-xl font-light tracking-tight md:text-2xl"
                style={{ color: AMBER }}
              >
                How many of these are you doing?
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4">
        {/* ══ THE FRAMEWORK ══ */}
        <section id="framework" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={PURPLE}>The 0→1 Framework</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                Problem. Promise. Demand. Build.
              </h2>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-3xl md:mt-20">
            {/* Center spine — stays in the gutter so it never crosses copy. */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 md:block"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, hsl(0 0% 10% / 0.22) 0 7px, transparent 7px 16px)',
              }}
            />

            <ol className="relative space-y-14 md:space-y-0">
              {STEPS.map((s, i) => {
                const textLeft = i % 2 === 1;
                const copy = (
                  <div className={`max-w-xs ${textLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/60">
                      {s.n}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-light tracking-tight md:text-[1.85rem]">
                      {s.title}
                    </h3>
                    <p className="mt-2 font-heading text-sm font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[15px]">
                      {s.desc}
                    </p>
                  </div>
                );
                const icon = (
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={176}
                    height={176}
                    className={`${s.float} h-36 w-36 object-contain md:h-44 md:w-44`}
                    style={{ filter: 'drop-shadow(0 22px 28px rgba(80, 40, 16, 0.18))' }}
                  />
                );
                return (
                  <Reveal key={s.n} delay={i * 90}>
                    <li className="relative">
                      {/* Desktop roadmap: icon | spine node | copy (alternating sides) */}
                      <div className="hidden items-center md:grid md:grid-cols-[1fr_3.25rem_1fr] md:py-10">
                        <div className="flex justify-end pr-10">
                          {textLeft ? copy : icon}
                        </div>
                        <div className="relative z-10 mx-auto flex h-5 w-5 items-center justify-center">
                          <span
                            className="absolute h-5 w-5 rounded-full"
                            style={{ background: `${PURPLE}28` }}
                          />
                          <span
                            className="relative h-2.5 w-2.5 rounded-full"
                            style={{ background: PURPLE }}
                          />
                        </div>
                        <div className="flex justify-start pl-10">
                          {textLeft ? icon : copy}
                        </div>
                      </div>

                      {/* Mobile: stacked, no spine */}
                      <div className="flex flex-col items-center gap-4 md:hidden">
                        {icon}
                        {copy}
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <Reveal>
            <p className="mt-14 text-center font-heading text-[11px] font-light tracking-wide text-[hsl(0,0%,10%)]/55">
              3D icons from{' '}
              <a
                href="https://www.thiings.co"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[hsl(0,0%,10%)]/25 underline-offset-4"
              >
                thiings.co
              </a>
            </p>
          </Reveal>
        </section>

        {/* ══ HOW IT WORKS — Alif "You have the what" layout + copy ══ */}
        <section id="how-it-works" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center md:mx-0 md:max-w-3xl md:text-left">
              <Eyebrow color={TEAL}>How it works</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-[2.65rem]">
                You have the &ldquo;what.&rdquo; You just need the &ldquo;how.&rdquo;
              </h2>
            </div>
          </Reveal>

          {/*
            Wide layout: text column sets the row height; photo is absolutely
            cropped to that height so the portrait's intrinsic size can't leave
            an empty band under the copy.
          */}
          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-2 md:items-stretch md:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_28px_70px_-28px_rgba(80,40,16,0.38)] ring-1 ring-[#1c100e]/10 md:aspect-auto md:min-h-0 md:h-full">
              <img
                src="https://d2mp3ttz3u5gci.cloudfront.net/build/about-me/4Q0A4211.jpg"
                alt="Ahmed teaching entrepreneurship to a packed hall"
                className="h-full w-full object-cover object-center md:absolute md:inset-0"
              />
            </div>

            <div className="flex flex-col gap-8 md:justify-between md:gap-6 md:py-1">
              {HOW_IT_WORKS.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div>
                    <h3 className="font-heading text-xl font-light tracking-tight md:text-[1.45rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        </div>

        {/* ══ INSTRUCTOR ══
            Celebrity drop: photos from Mentorna workshops. Fan sits in-flow
            with Who runs it and parallax-rotates as the section scrolls. */}
        <section
          id="who-runs-it"
          className="relative mt-16 scroll-mt-6 overflow-hidden text-[#F7E9D6] md:mt-24"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 50% at 50% 0%, #3a2418 0%, #16110f 46%, #0c0a0b 78%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[38%] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(232,168,90,0.32), transparent 68%)',
            }}
          />

          <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-24">
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
                <div className="overflow-hidden rounded-[28px] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
                  <img
                    src={AHMED_PHOTOS[0].src}
                    alt={AHMED_PHOTOS[0].alt}
                    className="aspect-[4/5] w-full object-cover object-[center_18%] md:aspect-[4/5]"
                  />
                </div>
                <div className="text-left">
                  <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7E9D6]/45">
                    Who runs it
                  </p>
                  <h2 className="mt-3 font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
                    Ahmed Ezzat
                  </h2>
                  <p className="mt-4 font-heading text-xl font-light leading-snug text-[#F7E9D6]/80 md:text-2xl">
                    Founder | AI/ML Engineer | Entrepreneur | Mentorship
                  </p>
                  <p className="mt-5 font-heading text-base font-light leading-relaxed text-[#F7E9D6]/55 md:text-[17px]">
                    {BIO}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 md:mt-14 -mx-4 md:-mx-8">
              <CardFanCarousel cards={EVENT_PHOTOS} scrollLinked />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-3">
              {STATS.map((s, i) => (
                <div
                  key={s.l}
                  className={`px-2 text-center ${
                    i > 0 ? 'md:border-l md:border-white/10' : ''
                  }`}
                >
                  <p
                    className="font-heading text-[1.85rem] font-light leading-none tracking-tight md:text-[2.1rem]"
                    style={{ color: i === 0 ? AMBER : '#F7E9D6' }}
                  >
                    {s.v}
                  </p>
                  <p className="mx-auto mt-2 max-w-[9rem] font-heading text-xs font-light leading-snug text-[#F7E9D6]/50 md:text-[13px]">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-[#0c0a0b] py-6 md:py-8">
            <p className="mb-5 text-center font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7E9D6]/40">
              Rooms he has already been in
            </p>
            <div className="flex flex-col gap-3 overflow-hidden">
              {[0, 1].map((row) => (
                <div
                  key={row}
                  className={`flex w-max ${row === 0 ? 'org-marquee' : 'org-marquee-rev'}`}
                >
                  {[0, 1].map((dup) => (
                    <div key={dup} className="flex">
                      {ORGS.map((o) => (
                        <span
                          key={`${row}-${dup}-${o.name}`}
                          className="mx-1.5 inline-flex shrink-0 items-center gap-3 rounded-2xl bg-white/[0.07] px-5 py-3 ring-1 ring-white/10 md:gap-3.5 md:px-7 md:py-3.5"
                        >
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
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GUEST SESSIONS — cinematic, same family as Who runs it. Names/faces are layout placeholders. ══ */}
        <section className="relative isolate overflow-hidden bg-[#120c10] text-[#F7E9D6]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(124,58,237,0.22), transparent 55%), radial-gradient(ellipse 40% 40% at 90% 80%, rgba(212,165,116,0.12), transparent 50%)',
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={DOTS} />

          <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
            <Reveal>
              <p className="text-center text-[11px] font-heading font-light uppercase tracking-[0.28em] text-[#F7E9D6]/45">
                Not just me
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
              {GUESTS.map((g, i) => (
                <Reveal key={g.name} delay={i * 90}>
                  <article>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] shadow-[0_28px_80px_-28px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
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
                      {g.status === 'confirmed' && (
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#F7E9D6] px-3 py-1 font-heading text-[10px] font-medium uppercase tracking-[0.18em] text-[#0c0a0b]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#B4691E]" />
                          Confirmed
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <p className="text-[10px] font-heading font-light uppercase tracking-[0.28em] text-[#D4A574]">
                          {g.topic}
                        </p>
                        <h3 className="mt-2 font-heading text-[1.85rem] font-light leading-[1.05] tracking-[-0.03em] text-white md:text-[2.1rem]">
                          {g.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 font-heading text-sm font-light text-[#F7E9D6]/50">
                      {g.credential}
                    </p>
                    <p className="mt-2 font-heading text-lg font-light leading-snug text-[#F7E9D6]/85">
                      {g.punch}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOUNDERS' CLUB ══
            Cream breath after the two dark bands. The photo is the room you
            keep — landscape portal, membership stamp, three quiet beats. */}
        <section className="relative pt-20 md:pt-28">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow color={AMBER}>What happens after</Eyebrow>
                <h2 className="mt-3 font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
                  {CLUB}
                </h2>
                <p className="mt-4 font-heading text-xl font-light leading-snug text-[hsl(0,0%,10%)]/80 md:text-2xl">
                  The cohort ends. You do not leave.
                </p>
                <p className="mx-auto mt-5 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                  Four weeks is enough to ship. A company needs a room after that. Everyone who
                  finishes walks in and keeps the key.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 max-w-6xl px-4 md:mt-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-28px_rgba(60,30,10,0.45)] ring-1 ring-[#D4A574]/30">
                <img
                  src={CLUB_PHOTO.src}
                  alt={CLUB_PHOTO.alt}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] md:aspect-[2/1]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
                  <div>
                    <p className="text-[10px] font-heading font-light uppercase tracking-[0.28em] text-[#D4A574]">
                      Member
                    </p>
                    <p className="mt-2 font-heading text-3xl font-light leading-none tracking-[-0.03em] text-[#F7E9D6] md:text-5xl">
                      Lifetime
                    </p>
                  </div>
                  <p className="hidden max-w-[12rem] text-right font-heading text-sm font-light leading-snug text-[#F7E9D6]/70 md:block">
                    The room stays open after week four.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 max-w-5xl px-4 md:mt-16">
            <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
              {CLUB_BEATS.map((b, i) => (
                <Reveal key={b.n} delay={i * 80}>
                  <li>
                    <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#C4893A]">
                      {b.n}
                    </p>
                    <p className="mt-3 font-heading text-2xl font-light leading-snug tracking-tight">
                      {b.t}
                    </p>
                    <p className="mt-2 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/70">
                      {b.d}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4">

        {/* ══ PROOF ══
            Two vertical selfie testimonials. Videos stay on S3 and only
            load after play — they are 50–90 MB HEVC phone files. */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={CYAN}>From the workshops this cohort is built on</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-5xl">
                They already did this.
              </h2>
              <p className="mx-auto mt-4 max-w-md font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                Two students on video. The rest in writing, from the workshops this
                cohort is built on.
              </p>
            </div>
          </Reveal>
          <ProofClips />
        </section>

        {/* ══ FIT ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={AMBER}>Who this is for</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-5xl">
                You do not need an idea.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
                You have a job. You want something of your own. I take you through which thing, and
                we start.
              </p>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {FIT_PATHS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <li className="text-center">
                  <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#C4893A]">
                    {p.n}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-light leading-snug tracking-tight md:text-[1.85rem]">
                    {p.t}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] font-heading text-sm font-light leading-relaxed text-[hsl(0,0%,10%)]/70 md:text-[15px]">
                    {p.d}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="mx-auto mt-14 max-w-2xl md:mt-16">
              <div
                className="overflow-hidden rounded-[28px] px-7 py-9 text-center shadow-[0_28px_70px_-28px_rgba(80,40,16,0.35)] ring-1 ring-[#1c100e]/12 md:px-12 md:py-11"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 80% at 50% 0%, #3a1c14 0%, #16110f 55%, #0c0a0b 100%)',
                }}
              >
                <p
                  className="font-heading text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: CORAL }}
                >
                  Skip this if
                </p>
                <ul className="mt-6 space-y-4">
                  {FIT_SKIP.map((f) => (
                    <li
                      key={f}
                      className="flex items-start justify-center gap-3 font-heading text-lg font-light leading-snug text-[#F7E9D6] md:text-xl"
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

        {/* ══ PRICE + GUARANTEE ══
            Full-bleed ivory so it breaks the cream sameness of Fit / Proof. */}
        <section
          id="apply"
          className="relative mt-16 scroll-mt-6 overflow-hidden md:mt-24"
          style={{ background: '#FFFCFA' }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#1c100e]/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#1c100e]/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'rgba(232,168,90,0.18)' }}
          />

          <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-24">
            <div className="grid items-start gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
              <Reveal>
                <div className="text-center md:text-left">
                  <Eyebrow color={PURPLE}>The offer</Eyebrow>
                  <h2
                    className="mt-3 font-heading text-[clamp(4.5rem,18vw,7.5rem)] font-light leading-none tracking-[-0.04em]"
                    style={{
                      background: `linear-gradient(120deg, ${AMBER} 10%, #C4893A 45%, ${CORAL} 90%)`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    ${PRICE}
                  </h2>
                  <p className="mt-4 font-heading text-xl font-light leading-snug text-[hsl(0,0%,10%)]/75 md:text-2xl">
                    One seat. Four weeks. {SEATS} people.
                  </p>
                  <p className="mt-3 font-heading text-sm font-light text-[hsl(0,0%,10%)]/55 md:text-[15px]">
                    Live · fully remote · {COHORT_LABEL}
                  </p>

                  <div className="mt-8 hidden md:block">
                    <ApplyButton where="pricing" tone="page" />
                    <p className="mt-4 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
                      <span style={{ color: '#B4691E' }}>{SEATS_LEFT}</span> seats left in the{' '}
                      {COHORT_LABEL} cohort.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="overflow-hidden rounded-[28px] border border-[#1c100e]/10 bg-white shadow-[0_28px_70px_-36px_rgba(80,40,16,0.35)]">
                  <div className="border-b border-[#1c100e]/8 bg-[#F7E9D6]/45 px-6 py-4 md:px-8">
                    <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/55">
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
                          className="mt-0.5 font-heading text-[11px] font-medium tabular-nums tracking-[0.14em] text-[#B4691E]"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-heading text-base font-light leading-snug text-[hsl(0,0%,10%)]/80 md:text-[17px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#1c100e]/8 bg-[#16110f] px-6 py-5 md:px-8">
                    <p className="font-heading text-sm font-light leading-relaxed text-[#F7E9D6]/85 md:text-[15px]">
                      Come twice. If it is not for you, you get every dollar back.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="mt-10 text-center md:hidden">
                <ApplyButton where="pricing" tone="page" />
                <p className="mt-4 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
                  <span style={{ color: '#B4691E' }}>{SEATS_LEFT}</span> seats left in the{' '}
                  {COHORT_LABEL} cohort.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4">
        {/* ══ FAQ ══
            Fora pattern: soft chip, quiet headline, rounded accordion rows
            with a circular chevron — no brutal boxes. */}
        <section id="faq" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <p className="inline-flex rounded-full bg-[hsl(0,0%,10%)]/[0.06] px-3.5 py-1 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/75">
                FAQ
              </p>
              <h2 className="mt-5 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-5xl">
                Answers to the questions that come up most.
              </h2>
              <p className="mt-4 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                Who it is for. What happens in the room. What you keep after.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-2xl space-y-3 md:mt-12">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group overflow-hidden rounded-[22px] border border-[#1c100e]/10 bg-[#FFFDF7] open:border-[#1c100e]/16 open:bg-white open:shadow-[0_18px_40px_-28px_rgba(60,30,10,0.4)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-heading text-base font-light leading-snug tracking-tight text-[hsl(0,0%,10%)] md:text-lg">
                      {f.q}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(0,0%,10%)]/[0.06] text-[hsl(0,0%,10%)]/70 transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </summary>
                  <p className="px-5 pb-5 font-heading text-sm font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:px-6 md:pb-6 md:text-[15px]">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FINAL CTA ══
            Dark closer after the cream FAQ. Same family as Who runs it. */}
      </div>

        <section className="relative mt-16 overflow-hidden text-[#F7E9D6] md:mt-24">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 50% at 50% 0%, #3a2418 0%, #16110f 46%, #0c0a0b 78%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[42%] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(232,168,90,0.28), transparent 68%)',
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
            <Reveal>
              <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4A574]">
                <span className="text-[#F7E9D6]">{SEATS_LEFT}</span> seats left · {COHORT_LABEL}
              </p>
              <h2 className="mt-5 font-heading text-[clamp(2.4rem,7vw,4.6rem)] font-light leading-[1.05] tracking-[-0.03em] text-[#F7E9D6]">
                The idea has waited long enough.
              </h2>
              <p className="mx-auto mt-5 max-w-lg font-heading text-base font-light leading-relaxed text-[#F7E9D6]/60 md:text-lg">
                Four weeks. Ten seats. I read every application. A product at the end, not notes.
              </p>
              <div className="mt-9">
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('footer')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F7E9D6] px-8 text-sm font-medium tracking-wide text-[#0c0a0b] transition-transform hover:scale-[1.03] md:min-h-[3.25rem] md:px-9 md:text-base"
                >
                  Apply for the next cohort
                </a>
              </div>
              <p className="mt-5 font-heading text-sm font-light text-[#F7E9D6]/45">
                Or{' '}
                <a
                  href={whatsappUrl(QUESTION_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#F7E9D6]/30 underline-offset-4 hover:decoration-[#F7E9D6]/60"
                >
                  ask a question first
                </a>
                .
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Build;
