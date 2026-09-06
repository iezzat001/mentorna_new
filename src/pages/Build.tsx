import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Instagram,
  MessageCircle,
  Play,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Footer from '@/components/Footer';
import CardFanCarousel from '@/components/ui/card-fan-carousel';
import { whatsappUrl } from '@/lib/whatsapp';
import {
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
const COHORT_LABEL = 'mid-September';

/** Four proofs under the hero. Short enough to read without thinking. */
const TRUST = [
  {
    k: '100% back',
    v: 'You get all your money back.',
  },
  {
    k: 'Yours forever',
    v: 'The plan, the tools, and the club. You keep them.',
  },
  {
    k: '$10,000+',
    v: 'Made by students. In real businesses.',
  },
  {
    k: '200+ students',
    v: 'Already did this. You are not first.',
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
  'You already follow him. 10,000 people found Ahmed on Instagram in two months. Underneath the camera: startups he created worth over $5 million, $1.1M raised, two exits, communities of 100,000, and $100K revenue in ninety days. He does not lecture. He builds in the room with you.';

const STATS = [
  { v: '$5M+', l: 'Total valuation of startups he created' },
  { v: '$1.1M', l: 'Raised' },
  { v: '2', l: 'Startup exits' },
  { v: '100K', l: 'People in communities he built' },
  { v: '$100K', l: 'Revenue in 3 months' },
];

const ORGS = [
  { name: 'Slush', bg: '#FF4D00', fg: '#fff' },
  { name: 'Antler', bg: '#111111', fg: '#F7E9D6' },
  { name: 'Akadeemy', bg: '#6D5CFF', fg: '#fff' },
  { name: 'Robot Uprising', bg: '#00E0C0', fg: '#0c0a0b' },
  { name: 'AI Collective', bg: '#FF4FA3', fg: '#fff' },
  { name: 'Invention Convention', bg: '#FFD23F', fg: '#0c0a0b' },
  { name: 'Helsinki XR Center', bg: '#3D8BFF', fg: '#fff' },
  { name: 'Predictiva', bg: '#E8A84A', fg: '#0c0a0b' },
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

/* Event photos for the fan carousel in "Who runs it" — the full set from the
   Mentorna homepage + Helsinki workshop album. Portrait bio photo excluded
   (it anchors the section), 16 photos in the fan. */
const EVENT_PHOTOS = [
  { imgUrl: '/workshop-helsinki/photo-174214.webp', alt: 'Ahmed on stage teaching the room' },
  { imgUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_1.jpeg', alt: 'Students with their first revenue cheque' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9530.webp', alt: 'Cohort working session' },
  { imgUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_2.jpeg', alt: 'Founders celebrating a win' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9531.webp', alt: 'Ahmed leading the workshop floor' },
  { imgUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_3.jpeg', alt: 'Workshop session in Helsinki' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9533.webp', alt: 'Founders collaborating at the table' },
  { imgUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_4.jpeg', alt: 'Room full of builders' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9535.webp', alt: 'Ahmed coaching at the table' },
  { imgUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_5.jpeg', alt: 'Cohort presentation moment' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9557.webp', alt: 'Workshop crowd listening' },
  { imgUrl: 'https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_6.jpeg', alt: 'Students holding their cheques' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9558.webp', alt: 'Ahmed with the cohort' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9559.webp', alt: 'Deep in the build session' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9702.webp', alt: 'One-on-one coaching moment' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9710.webp', alt: 'The room mid-session' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9711.webp', alt: 'Cohort working the framework' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9712.webp', alt: 'Founders in discussion' },
  { imgUrl: '/workshop-helsinki/photo-IMG_9713.webp', alt: 'Workshop floor energy' },
];

const IG_URL = 'https://www.instagram.com/ahmed.ezzat.ai';

/* Why people never ship */
const COSTS = [
  {
    k: 'Months',
    v: 'Read. Watch. Start over. Nothing to show.',
  },
  {
    k: 'Wrong questions',
    v: 'Which tool? Which course? Nobody asked for that.',
  },
  {
    k: 'A whole year',
    v: 'The idea sat. Someone else shipped.',
  },
];

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
    desc: 'Live. Real people. The market answers — not your friends.',
    img: '/method/rocket.webp',
    alt: 'Rocket',
    float: 'method-float method-float-last',
  },
];

/* The four weeks — named chapters of the 0→1 recipe. */
const WEEKS = [
  {
    n: '01',
    chapter: 'Who',
    accent: AMBER,
    title: 'Design the buyer first.',
    body: 'You do not start with a tool. You start with one person and one pain. In the room, your AI teammates help you write it so sharp a stranger could repeat it. Until that line exists, nothing gets built.',
    punch: 'If you cannot name them, you are not ready to ship.',
    img: '/weeks/map.webp',
    alt: 'Map',
    glow: 'rgba(232,168,90,0.38)',
  },
  {
    n: '02',
    chapter: 'Make',
    accent: CORAL,
    title: 'You direct. The agents build.',
    body: 'You write the offer — the one promise a stranger understands. Then you run AI-agent teammates, live, to build version one in the three hours. Not a freelancer waiting on a brief. Not a course you watch on the train. You are the founder. They are the shop.',
    punch: 'A founder leaves with a thing. A student leaves with notes.',
    img: '/weeks/laptop.webp',
    alt: 'Laptop',
    glow: 'rgba(196,92,42,0.36)',
  },
  {
    n: '03',
    chapter: 'Ship',
    accent: CYAN,
    title: 'Live is the only test that counts.',
    body: 'You put it in front of real people before it feels ready. Entrepreneurs collect signal. Hobbyists hide the work so nobody can steal it — and nobody can buy it either. Your teammates keep shipping while you watch what humans actually do.',
    punch: 'Hidden work cannot earn.',
    img: '/method/rocket.webp',
    alt: 'Rocket',
    glow: 'rgba(80,170,210,0.32)',
  },
  {
    n: '04',
    chapter: 'Own',
    accent: TEAL,
    title: 'Build it so it can run beside your life.',
    body: 'A product is not a business until someone can pay, and until it can live next to your job. You set a price, a path to the first customer, and a system the agents can keep running. Then you show the room what you made.',
    punch: 'Freedom is designed into the work. It is not a prize at the end.',
    img: '/weeks/trophy.webp',
    alt: 'Trophy',
    glow: 'rgba(232,168,90,0.42)',
  },
];

/* What is included */
const INCLUDED = [
  '4 live sessions. 3 hours. 10 people.',
  'Every recording. Yours forever.',
  `The ${FRAMEWORK}. The canvases.`,
  'The prompts. The tools. The slides.',
  'Guest sessions: marketing, funding, an investor.',
  `${CLUB}. For life.`,
  'You can still message me.',
  'Week 4: you show the room.',
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
    punch: 'He will keep the money side boring — so you can stay obsessed with the build.',
    photo:
      'https://greenstep.fi/wp-content/uploads/sites/2/2026/09/anton.suomalainen.jpg?v=1788494412',
    status: 'confirmed',
  },
];

const CLUB_PHOTO = {
  src: '/workshop-helsinki/photo-185329.webp',
  alt: 'The room after the cohort — builders still in the work',
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

const FREE_ONLINE = [
  { k: 'You can', v: 'It is all online. True.' },
  { k: 'You did', v: 'A year of it. The idea is still sitting.' },
  { k: 'This', v: 'A date. Ten people. Someone who stops you.' },
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
    a: 'Come anyway. No idea, one idea, or too many — we pick which.',
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
    a: `WhatsApp. Three questions. ${SEATS} seats — I read every one.`,
  },
];

/* VSL. Set VSL_URL when the sales video is recorded. */
const VSL_URL: string | null = null;
const VSL_POSTER: string | null = null;
const vslSrc = VSL_URL ?? workshopVideoUrl;
const vslPoster = VSL_POSTER ?? workshopVideoPoster;
const vslIsPlaceholder = VSL_URL === null;

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
  subhead:
    'You bring what you already know — the AI does the building. Four weeks, live, ten seats.',
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
 * the hero (copy, video, dunes, seal) gets its own window [from, to] inside
 * the scroll progress, with a cubic ease-in-out inside the window:
 *
 *   0.00–0.42  copy dissolves up and out while video + ground hold still
 *   0.45–0.92  dunes sweep up and the video grows + sinks into them
 *   0.70–1.00  cream seal closes the last seam
 *
 * Holding the video and ground still for the first half is what removes the
 * stretching void mid-scroll — the composition stays packed until the tuck.
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
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
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

const VslPlayer = () => {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <video
        src={vslSrc}
        poster={vslPoster}
        controls
        autoPlay
        playsInline
        /*
         * object-contain, not cover. The source may be vertical (phone
         * footage) or landscape (a proper VSL). Cover crops a portrait video
         * to its middle and cuts off the speaker's head. Contain letterboxes
         * instead, so any aspect ratio plays back whole.
         */
        className="aspect-video w-full bg-black object-contain"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video"
      className="group relative block aspect-video w-full overflow-hidden"
    >
      <img
        src={vslPoster}
        alt="Inside the cohort"
        className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-85"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[hsl(0,0%,10%)] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 md:h-[4.5rem] md:w-[4.5rem]"
        >
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
            autoPlay
            playsInline
            className="aspect-[9/16] w-full bg-black object-cover"
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
    <div className="mt-10 flex justify-center gap-3 md:mt-14 md:gap-6">
      {PROOF_CLIPS.map((clip) => (
        <SelfieClip key={clip.id} clip={clip} active={active} onPlay={setActive} />
      ))}
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
    title: 'The 0→1 Cohort — 4 Weeks, 10 Seats | Mentorna®',
    description:
      'For 9-to-5 domain experts. Build a profitable business in four weeks using the 0→1 Framework, without losing $10,000 on tech nobody needs. 10 seats per cohort.',
    canonical: 'https://mentorna.com/build',
  });

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
  const copyP = phase(p, 0, 0.42); // copy exits first
  const groundP = phase(p, 0.45, 0.92); // dunes + video tuck
  const sealP = phase(p, 0.7, 1); // cream seam finishes last

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
          layers parallax on a sticky scroll so the window tucks into the ground. */}
      <header className="bg-[#0c0a0b] text-white">
        <div ref={trackRef} className="relative h-[185vh]">
          <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 90% 55% at 50% 18%, #3a2418 0%, #1a1010 42%, #0c0a0b 78%)',
                transform: `translateY(${p * 28}px) scale(${1 + p * 0.06})`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-[10%] h-[45%] blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, rgba(232,168,90,0.28), transparent 68%)',
                transform: `translateY(${p * 40}px)`,
              }}
            />

            <svg
              aria-hidden
              viewBox="0 0 1440 420"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-[18%] h-[42%] w-full blur-[10px]"
              style={{ transform: `translateY(${groundP * 64}px)` }}
            >
              <path
                fill="#2a1814"
                d="M0 250C120 210 210 300 340 240C490 170 560 290 720 230C880 170 980 280 1140 220C1260 176 1360 230 1440 210V420H0Z"
              />
            </svg>

            <nav className="relative z-20 flex shrink-0 items-center justify-between px-6 py-5 md:px-10">
              <a
                href="/"
                className="font-heading text-[17px] font-light tracking-[0.06em] text-white"
              >
                Mentorna®
              </a>
              <p className="text-[11px] font-medium tracking-wide text-white/55 md:text-xs">
                <span style={{ color: AMBER }}>{SEATS_LEFT}</span> seats left · {COHORT_LABEL}
              </p>
            </nav>

            <div
              className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-2 text-center md:pt-4"
              style={{
                opacity: Math.max(1 - copyP, 0),
                transform: `translateY(${copyP * -48}px)`,
                visibility: copyP === 1 ? 'hidden' : undefined,
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                For 9-to-5 domain experts · 4 weeks · {SEATS} seats
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

            <div className="relative z-10 mx-auto mt-5 w-[min(720px,calc(100%-1.75rem))] md:mt-7">
              <div
                className="relative origin-bottom"
                style={{
                  /* Fora move: as the copy dissolves (copyP) the film grows a
                     touch and rises to reclaim its space — the window takes
                     center stage. Then it sinks into the rising dunes (groundP). */
                  transform: `translateY(${groundP * 96 - copyP * 20}px) scale(${1 + copyP * 0.08 + groundP * 0.14})`,
                }}
              >
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

            <svg
              aria-hidden
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[28%] w-full blur-[2px] md:h-[32%]"
              style={{ transform: `translateY(${groundP * -190}px)` }}
            >
              <path
                fill="#3d241c"
                d="M0 170C160 120 280 210 430 150C590 86 700 200 860 140C1020 80 1160 170 1440 110V320H0Z"
              />
            </svg>
            <svg
              aria-hidden
              viewBox="0 0 1440 280"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 -bottom-[2%] z-30 h-[22%] w-full md:h-[26%]"
              style={{ transform: `translateY(${groundP * -260}px)` }}
            >
              <path
                fill="#1c100e"
                d="M0 150C200 90 340 190 520 130C700 70 820 180 1020 120C1180 76 1320 140 1440 100V280H0Z"
              />
            </svg>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[42%]"
              style={{
                /* Seal the ground. Dunes sweep up on their own window; this
                   gradient closes the last seam so nothing shows through. */
                background: `linear-gradient(to top, #F7E9D6 ${Math.round(sealP * 88)}%, transparent)`,
              }}
            />
          </div>
        </div>
      </header>

      <main className="-mt-[16vh] pb-20 md:-mt-[12vh]">
        <div className="mx-auto max-w-5xl px-4">
        {/* ══ TRUST RIBBON ══ */}
        <section className="pt-0 md:pt-2">
          <Reveal>
            <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
              {TRUST.map((item, i) => (
                <li
                  key={item.k}
                  className={`px-2 text-center md:px-6 ${
                    i > 0 ? 'md:border-l md:border-[hsl(0,0%,10%)]/10' : ''
                  }`}
                >
                  <p className="font-heading text-[1.7rem] font-light leading-none tracking-tight md:text-[2rem]">
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

        {/* ══ VSL ══ */}
        <section className="pt-14 md:pt-20">
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow color={CYAN}>See the class</Eyebrow>
              <p className="mt-3 font-heading text-2xl font-light tracking-tight md:text-[1.85rem]">
                This is what it looks like.
              </p>
              <div className="mt-8 overflow-hidden rounded-[22px] bg-black shadow-[0_30px_70px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/10">
                <VslPlayer />
              </div>
              <p className="mt-4 font-heading text-sm font-light text-[hsl(0,0%,10%)]/70">
                {vslIsPlaceholder
                  ? '90 seconds. Real people. A real room.'
                  : 'Two minutes. See if this is for you.'}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══ THE COST OF THE SLOW WAY ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={CORAL}>Why most people never ship</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                You are not losing money.
                <br />
                You are losing time.
              </h2>
              <p className="mt-4 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
                You are busy. The idea waits. A year goes by.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-y-10 md:grid-cols-3">
            {COSTS.map((c, i) => (
              <Reveal key={c.k} delay={i * 80}>
                <div
                  className={`px-2 text-center md:px-8 ${
                    i > 0 ? 'md:border-l md:border-[hsl(0,0%,10%)]/10' : ''
                  }`}
                >
                  <p className="font-heading text-[1.7rem] font-light leading-none tracking-tight md:text-[1.85rem]">
                    {c.k}
                  </p>
                  <p className="mx-auto mt-3 max-w-[16rem] font-heading text-sm font-light leading-snug text-[hsl(0,0%,10%)]/75 md:text-[15px]">
                    {c.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={PURPLE}>The 0→1 Framework</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                The recipe you cannot Google.
              </h2>
              <p className="mt-4 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
                Three moves, in this order. You are the founder. AI teammates are the shop. The order is the gem.
              </p>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-3xl md:mt-20">
            <svg
              aria-hidden
              viewBox="0 0 800 900"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full text-[hsl(0,0%,10%)]/16 md:block"
            >
              <path
                className="method-path"
                d="M168 90C168 210 632 190 632 330C632 470 168 450 168 590C168 730 632 710 632 840"
                fill="none"
                stroke="currentColor"
                strokeDasharray="7 12"
                strokeLinecap="round"
                strokeWidth="1.75"
              />
            </svg>

            <ol className="relative space-y-14 md:space-y-8">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 90}>
                  <li
                    className={`flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-14 ${
                      i % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <img
                      src={s.img}
                      alt={s.alt}
                      width={176}
                      height={176}
                      className={`${s.float} h-36 w-36 shrink-0 object-contain md:h-44 md:w-44`}
                      style={{ filter: 'drop-shadow(0 22px 28px rgba(80, 40, 16, 0.18))' }}
                    />
                    <div
                      className={`max-w-xs text-center ${
                        i % 2 === 1 ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
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
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal>
            <p className="mt-14 text-center font-heading text-base font-light text-[hsl(0,0%,10%)]/75">
              This order is the part you cannot download.
            </p>
            <p className="mt-4 text-center font-heading text-[11px] font-light tracking-wide text-[hsl(0,0%,10%)]/55">
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

        {/* ══ THE FOUR WEEKS ══
            Fora "What you get": sticky stacking cards. Copy always left,
            visual right. Do not wrap these in Reveal — transform on a parent
            breaks position:sticky. */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={TEAL}>How it works</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                Four weeks inside the recipe.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                You run the company. AI-agent teammates build with you, live — Claude Code in the
                session. Every week ends with something a founder would ship.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-14 md:mt-20">
            {WEEKS.map((w, i) => (
              <article
                key={w.n}
                className="sticky mb-[22vh] grid items-center gap-8 rounded-[28px] border-2 border-[#1c100e]/12 bg-[#FFFDF7] p-6 shadow-[0_28px_70px_-28px_rgba(80,40,16,0.38)] md:mb-[28vh] md:grid-cols-2 md:gap-12 md:p-10 last:mb-4 last:md:mb-6"
                style={{ top: `${18 + i * 16}px`, zIndex: i + 1 }}
              >
                <div className="min-w-0 text-left">
                  <p
                    className="font-heading text-[11px] font-medium uppercase tracking-[0.22em]"
                    style={{ color: w.accent }}
                  >
                    Week {w.n} — {w.chapter}
                  </p>
                  <h3 className="mt-3 font-heading text-[1.65rem] font-light leading-[1.2] tracking-tight md:text-[2rem]">
                    {w.title}
                  </h3>
                  <p className="mt-4 font-heading text-base font-light leading-[1.65] text-[hsl(0,0%,10%)]/75">
                    {w.body}
                  </p>
                  <p className="mt-4 font-heading text-base font-light italic leading-[1.55] text-[hsl(0,0%,10%)]/70">
                    {w.punch}
                  </p>
                </div>
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[22px] bg-[#16110f] md:aspect-[5/4]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 50% 42%, ${w.glow}, transparent 68%)`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-5 top-5 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7E9D6]/35"
                  >
                    {w.n}
                  </span>
                  <img
                    src={w.img}
                    alt={w.alt}
                    width={208}
                    height={208}
                    className={`${
                      i % 2 === 0 ? 'method-float' : 'method-float method-float-late'
                    } relative h-32 w-32 object-contain md:h-48 md:w-48`}
                    style={{ filter: 'drop-shadow(0 24px 32px rgba(0,0,0,0.45))' }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
        </div>

        {/* ══ INSTRUCTOR ══
            Celebrity drop: photos from the Mentorna homepage / Helsinki
            workshops as placeholders. Swap files later; keep the layout. */}
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
                    You know the face. This is the decade behind it.
                  </p>
                  <p className="mt-5 font-heading text-base font-light leading-relaxed text-[#F7E9D6]/55 md:text-[17px]">
                    {BIO}
                  </p>
                  <a
                    href={IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F7E9D6] px-5 py-2.5 font-heading text-sm font-medium text-[#0c0a0b] transition-transform hover:scale-[1.03]"
                  >
                    <Instagram className="h-4 w-4" />
                    @ahmed.ezzat.ai
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 md:mt-10 -mx-4 md:-mx-8">
              <CardFanCarousel cards={EVENT_PHOTOS} />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-y-8 md:grid-cols-5">
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
                          className="mx-1.5 inline-flex shrink-0 items-center rounded-2xl px-6 py-3 font-heading text-base font-medium tracking-tight md:px-8 md:py-4 md:text-xl"
                          style={{ background: o.bg, color: o.fg }}
                        >
                          {o.name}
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
              <h2 className="mx-auto mt-5 max-w-4xl text-center font-heading text-[clamp(2.4rem,7vw,5.2rem)] font-light leading-[0.95] tracking-[-0.035em] text-[#F7E9D6]">
                Three names.
                <br />
                Same room.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-center font-heading text-lg font-light leading-relaxed text-[#F7E9D6]/70 md:text-xl">
                Marina, Petri, and Anton — confirmed. Each runs a session with you inside the
                cohort.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
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
                Two students. Their phones. Press play.
              </p>
            </div>
          </Reveal>
          <ProofClips />
        </section>

        {/* ══ FREE ONLINE OBJECTION ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={CORAL}>The question everyone asks</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-5xl">
                I can learn this free.
              </h2>
              <p className="mt-4 font-heading text-xl font-light leading-snug text-[hsl(0,0%,10%)]/70 md:text-2xl">
                You already could.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-y-10 md:grid-cols-3">
            {FREE_ONLINE.map((c, i) => (
              <Reveal key={c.k} delay={i * 80}>
                <div
                  className={`px-2 text-center md:px-8 ${
                    i > 0 ? 'md:border-l md:border-[hsl(0,0%,10%)]/10' : ''
                  }`}
                >
                  <p className="font-heading text-[1.7rem] font-light leading-none tracking-tight md:text-[1.85rem]">
                    {c.k}
                  </p>
                  <p className="mx-auto mt-3 max-w-[16rem] font-heading text-sm font-light leading-snug text-[hsl(0,0%,10%)]/75 md:text-[15px]">
                    {c.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
                You have a job. You want something of your own. I take you through which thing — and
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
            <div className="mx-auto mt-14 max-w-2xl border-t border-[hsl(0,0%,10%)]/10 pt-10 text-center md:mt-16">
              <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/60">
                Skip this if
              </p>
              <ul className="mt-5 space-y-2">
                {FIT_SKIP.map((f) => (
                  <li
                    key={f}
                    className="font-heading text-base font-light text-[hsl(0,0%,10%)]/60"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ══ PRICE + GUARANTEE ══ */}
        <section id="apply" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow color={PURPLE}>The offer</Eyebrow>
              <h2
                className="mt-3 font-heading text-[clamp(4.2rem,16vw,8rem)] font-light leading-none tracking-[-0.04em]"
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
            </div>
          </Reveal>

          <ul className="mx-auto mt-12 grid max-w-2xl gap-x-12 gap-y-4 sm:grid-cols-2 md:mt-16">
            {INCLUDED.map((item, i) => (
              <Reveal key={item} delay={i * 40}>
                <li className="font-heading text-base font-light leading-snug text-[hsl(0,0%,10%)]/70">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mt-12 text-center md:mt-16">
              <ApplyButton where="pricing" tone="page" />
              <p className="mt-4 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
                <span style={{ color: '#B4691E' }}>{SEATS_LEFT}</span> seats left in the{' '}
                {COHORT_LABEL} cohort.
              </p>
              <p className="mx-auto mt-8 max-w-md font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75">
                Come twice. If it is not for you, you get every dollar back.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══ FAQ ══
            Fora pattern: soft chip, quiet headline, rounded accordion rows
            with a circular chevron — no brutal boxes. */}
        <section className="pt-16 md:pt-24">
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
                Four weeks. Ten seats. I read every application. A product at the end — not notes.
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
