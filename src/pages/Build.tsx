import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  Compass,
  Crown,
  Laptop,
  MessageCircle,
  Play,
  Quote,
  Rocket,
  Star,
  Target,
  TrendingDown,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Footer from '@/components/Footer';
import { whatsappUrl } from '@/lib/whatsapp';
import { sections } from '@/data/workshop';
import {
  eventPhotos,
  testimonials,
  workshopVideoPoster,
  workshopVideoUrl,
} from '@/data/testimonials';

/* ────────────────────────────────────────────────────────────
   Design tokens — same language as /workshop, /links and the offer pages
   ──────────────────────────────────────────────────────────── */
const AMBER = 'hsl(38,95%,58%)';
const PURPLE = 'hsl(262,70%,60%)';
const CYAN = 'hsl(196,85%,52%)';
const TEAL = 'hsl(160,70%,45%)';
const CORAL = 'hsl(18,80%,63%)';

const PAGE_BG = 'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';
const brutal = 'border-4 border-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
const brutalLg = 'border-4 border-[hsl(0,0%,10%)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]';
const SECTION_ACCENTS = [AMBER, PURPLE, CYAN, TEAL, CORAL];

const DOTS = {
  backgroundImage: 'radial-gradient(rgba(0,0,0,.18) 1.3px, transparent 1.3px)',
  backgroundSize: '18px 18px',
};

/* ────────────────────────────────────────────────────────────
   Offer data
   ⚠ PROPOSED PRICING — confirm before launch.
   Current /workshop sells the same 5 hours at $99, which reads as a
   beginner price. This page is positioned for busy professionals buying
   back time, so the anchor is higher and a follow-through tier is added.
   ──────────────────────────────────────────────────────────── */
/**
 * Early bird: $149 -> $99 until 1 September. Auto-expires, so the page
 * reverts to full price on its own with no code change needed.
 */
const EARLY_BIRD_DEADLINE = new Date('2026-09-01T00:00:00+03:00');
const EARLY_BIRD_PRICE = 99;
const EARLY_BIRD_LABEL = 'until 31 August';
const isEarlyBird = () => Date.now() < EARLY_BIRD_DEADLINE.getTime();

/** The named mechanism. Everything on the page ladders back to this. */
const MECHANISM = 'Vibe-preneurship';
const FRAMEWORK = '3-Step Market Validation Framework';

const TIERS = [
  {
    key: 'seat',
    name: 'The Seat',
    price: 149,
    earlyBird: true,
    tagline: 'The workshop itself',
    accent: 'bg-white',
    featured: false,
    includes: [
      'Five guided build blocks, start to finish',
      'Your landing page live before you leave',
      'The full prompt and tool walkthrough',
      'Direct feedback on your problem and offer',
      'A written 7-day plan for the week after',
    ],
  },
  {
    key: 'followthrough',
    name: 'Seat + Follow-Through',
    price: 279,
    tagline: 'For people who know the risk is week two',
    accent: 'bg-[hsl(38,95%,88%)]',
    featured: true,
    includes: [
      'Everything in The Seat',
      'A private 45-minute 1:1 with Ahmed, two weeks later',
      'We unblock whatever stalled and reset the plan',
      'Async question access in between',
      'Priority seat selection',
    ],
  },
  {
    key: 'team',
    name: 'Private Team Session',
    price: 1900,
    priceLabel: 'from $1,900',
    tagline: 'Run it inside your company',
    accent: 'bg-white',
    featured: false,
    includes: [
      'Up to 10 people from one organisation',
      'Built around a real problem in your business',
      'Your date, your location or online',
      'A shared plan your team owns afterwards',
      'Follow-up debrief with the lead',
    ],
  },
];

const NEXT_SESSION = {
  format: 'Live · Hands-on',
  duration: '5 hours',
  seats: 'Small group, limited seats',
};

/**
 * VSL (video sales letter).
 *
 * ⚠ PLACEHOLDER. Set VSL_URL to the real sales video once it is recorded and
 * uploaded to CloudFront, and update VSL_POSTER to its thumbnail. Until then
 * the section falls back to real footage from the last workshop, so the slot
 * is never empty. Everything else about the section stays the same.
 */
const VSL_URL: string | null = null;
const VSL_POSTER: string | null = null;

const vslSrc = VSL_URL ?? workshopVideoUrl;
const vslPoster = VSL_POSTER ?? workshopVideoPoster;
const vslIsPlaceholder = VSL_URL === null;

const RESERVE_MESSAGE = (tier: string, price: string) =>
  `Hi Ahmed, I'd like to reserve the "${tier}" option (${price}) for the 5-hour build workshop. When is the next date?`;
const QUESTION_MESSAGE = 'Hi Ahmed, I have a question about the 5-hour build workshop.';

/* The cost of doing it the slow way — the core argument of this page */
const COSTS = [
  {
    icon: Clock,
    accent: AMBER,
    stat: 'Months',
    label: 'lost to trial and error',
    desc: 'Reading, watching, restarting. The loop that feels like progress and produces nothing you can show anyone.',
  },
  {
    icon: Compass,
    accent: CORAL,
    stat: 'The wrong questions',
    label: 'asked confidently',
    desc: 'Which framework? Which stack? Which course? None of those decide whether anyone wants what you are making.',
  },
  {
    icon: TrendingDown,
    accent: PURPLE,
    stat: 'The real cost',
    label: 'is not the money',
    desc: 'It is the year you spend circling an idea while someone less talented and more decisive ships theirs.',
  },
];

/* The five failure modes. Named, numbered, so the reader recognises one. */
const FAILURES = [
  {
    n: 1,
    title: 'The Tech-First Trap',
    desc: 'You start with which stack, which platform, which tool. None of those decide whether a single person wants the thing. This is how people spend $10,000 building something nobody asked for, and it is the most expensive mistake on this list.',
  },
  {
    n: 2,
    title: 'The Silent Build',
    desc: 'You keep it quiet so nobody steals it. So you get no feedback, and you find out months later that the market was never there. Hiding an idea does not protect it, it starves it.',
  },
  {
    n: 3,
    title: 'The Feature Pile',
    desc: 'You collect every competitor feature and add five more, thinking more equals better. It does not. It makes the thing impossible to explain, and a product a stranger cannot explain is a product they will not buy.',
  },
  {
    n: 4,
    title: 'The Vague Audience',
    desc: '"Anyone who needs this" is nobody. Without a specific person in mind you cannot write the offer, price it, or find them. Every downstream decision stays fuzzy because this one was skipped.',
  },
  {
    n: 5,
    title: 'The Someday Start',
    desc: 'You will start when work calms down. It will not. The idea keeps its shape in your head, which feels safe, because an idea that never launches can never fail. This is the one that costs you the year.',
  },
];

/* The named mechanism, broken into its three steps */
const STEPS = [
  {
    n: 1,
    icon: Compass,
    accent: AMBER,
    title: 'Validate the problem',
    desc: 'Before anything gets built, we find a pain you actually understand and confirm someone else feels it. Specific person, specific problem, written down in one line.',
  },
  {
    n: 2,
    icon: Target,
    accent: CYAN,
    title: 'Validate the promise',
    desc: 'One offer a stranger understands in ten seconds. Not a feature list. The single outcome you are selling, in language your buyer already uses.',
  },
  {
    n: 3,
    icon: Rocket,
    accent: TEAL,
    title: 'Validate the demand',
    desc: 'A live page and a way to collect signal, shipped before you leave the room. Real responses from real people, not opinions from friends.',
  },
];

/**
 * Value stack shown just before the price.
 * ⚠ PROPOSED VALUES. Kept deliberately modest so the total stays credible
 * against the ticket price. An inflated anchor reads as a scam.
 */
const VALUE_STACK = [
  { item: 'The 5-hour live workshop, small group', value: 200 },
  { item: 'Your landing page, built with you in the room', value: 120 },
  { item: `The ${FRAMEWORK} and canvas`, value: 60 },
  { item: 'The full prompt and tool playbook', value: 40 },
  { item: 'Your written 7-day action plan', value: 30 },
];
const VALUE_TOTAL = VALUE_STACK.reduce((sum, v) => sum + v.value, 0);

const OUTCOMES = [
  {
    icon: Target,
    title: 'A problem worth solving',
    desc: 'Defined precisely: who feels the pain and why. Not the vague idea you keep circling.',
  },
  {
    icon: BadgeCheck,
    title: 'An offer a stranger understands',
    desc: 'One written statement that lands in ten seconds, built on the value equation.',
  },
  {
    icon: Laptop,
    title: 'A live landing page',
    desc: 'Built with AI in the room. Hero, value proposition and a real call to action.',
  },
  {
    icon: Zap,
    title: 'A way to collect signal',
    desc: 'Email capture or waitlist, so you learn whether anyone actually wants it.',
  },
  {
    icon: Rocket,
    title: 'A deployed link',
    desc: 'Shipped and shareable before you leave. Ugly but live beats perfect but imaginary.',
  },
  {
    icon: Clock,
    title: 'A 7-day action plan',
    desc: 'Exact next steps, so the momentum does not die in the car park.',
  },
];

/* Objection handling, written for someone with no spare hours */
const NO_TIME = [
  {
    icon: Clock,
    title: 'One evening. That is the whole commitment.',
    desc: 'No multi-week course you fall behind on. You block five hours once and walk out with something live.',
  },
  {
    icon: Laptop,
    title: 'Nothing to prepare, nothing to install',
    desc: 'Bring a laptop. Every tool runs in the browser on a free tier. No prerequisites, no pre-reading.',
  },
  {
    icon: Users,
    title: 'You build in the room, not at home',
    desc: 'The work happens during the session with help beside you. You do not leave with homework you will never do.',
  },
  {
    icon: Compass,
    title: 'No prior technical background needed',
    desc: 'If you can describe what you want in plain words, you can build it here. That is the whole point.',
  },
];

const FOR_YOU = [
  'You are established in your career and want leverage outside it',
  'You have an idea you keep circling but never start',
  'You are tired of waiting on a developer or an agency quote',
  'You want to test demand before you sink months into building',
  'Your time is the scarcest thing you own',
];

const NOT_FOR_YOU = [
  'You want to sit back and watch a lecture',
  'You want someone else to build your product for you',
  'You are here for a certificate rather than a shipped link',
];

const FAQS = [
  {
    q: 'I am not technical at all. Is this really for me?',
    a: 'Yes, and it is designed for exactly that. You describe what you want in plain language and AI does the building. Past attendees include accountants, marketers and a 40-year workshop veteran who had never shipped anything.',
  },
  {
    q: 'I genuinely do not have time. Why five hours?',
    a: 'Because five hours in a structured room replaces the months most people spend assembling this alone. It is one evening, and you leave with a live link rather than a reading list.',
  },
  {
    q: 'What if I arrive without an idea?',
    a: 'That is fine and fairly common. The first block is finding a problem worth solving. Several people have arrived empty-handed and left with a validated direction plus a live page.',
  },
  {
    q: 'What do I need to bring?',
    a: 'A laptop and a charger. Every tool we use runs in the browser on a free tier, so there is nothing to install beforehand.',
  },
  {
    q: 'What is the difference between the two individual tiers?',
    a: 'The workshop is identical. Follow-Through adds a private 45-minute session two weeks later, which is when most people stall. If you have a history of starting things and losing momentum, take that one.',
  },
  {
    q: 'Is the early bird price real?',
    a: `Yes, and it expires on its own. Seats are $${EARLY_BIRD_PRICE} ${EARLY_BIRD_LABEL}, then the price returns to $${TIERS[0].price}. No countdown that resets when you reload the page.`,
  },
  {
    q: 'When is the next date?',
    a: 'Dates go to the list first and seats are limited. Message me on WhatsApp and I will send the next date and hold your spot.',
  },
];

/* ────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
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
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-50">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-extrabold leading-[1.1] md:text-4xl">{children}</h2>
);

/** Click-to-play video. Poster first so nothing autoplays or preloads. */
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
        className="aspect-video w-full bg-black object-cover"
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
        alt="Inside the workshop"
        className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-85"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[hsl(0,0%,10%)] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-105 md:h-24 md:w-24"
          style={{ background: AMBER }}
        >
          <Play className="ml-1 h-9 w-9 md:h-10 md:w-10" fill="currentColor" />
        </span>
      </span>

      <span className="absolute bottom-4 left-4 flex items-center gap-2 border-2 border-white/40 bg-black/50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
        <Play className="h-3 w-3" fill="currentColor" /> Watch
      </span>
    </button>
  );
};

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const Build = () => {
  const measurementId = (localStorage.getItem('google_analytics_id') || '').trim();
  const { trackEvent } = useGoogleAnalytics({ measurementId });

  useSEO({
    title: 'Turn What You Know Into A Business — 5-Hour Workshop | Mentorna®',
    description:
      'For 9-5 domain experts. Build a profitable business in one evening using the 3-Step Market Validation Framework, without losing $10,000 on tech nobody needs.',
    canonical: 'https://mentorna.com/build',
  });

  const track = (placement: string) =>
    trackEvent('workshop_reserve_click', {
      page_path: window.location.pathname,
      placement,
      variant: 'build_v2',
    });

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      <main className="mx-auto max-w-5xl px-4 pb-20">
        {/* ══ HERO ══ */}
        <header className="relative pt-10 md:pt-16">
          <Reveal>
            <div className={`${brutalLg} relative overflow-hidden bg-[hsl(0,0%,10%)] p-8 md:p-14`}>
              <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={DOTS} />
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{ background: PURPLE }}
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-30 blur-3xl"
                style={{ background: CYAN }}
              />

              <div className="relative">
                <span className="inline-block border-2 border-white/40 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
                  ✦ For 9-5 domain experts · One evening · Helsinki
                </span>

                <h1 className="mt-5 text-4xl font-extrabold leading-[0.98] text-white md:text-6xl">
                  Turn what you already know into{' '}
                  <span
                    style={{
                      background: `linear-gradient(90deg, ${AMBER}, ${CORAL}, ${PURPLE})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    a business that pays you
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/75 md:text-lg">
                  In one evening, using our {FRAMEWORK}, without losing $10,000 on tech nobody
                  needs.
                </p>

                <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                  {[
                    { v: '5', l: 'Hours, once', c: AMBER },
                    { v: '1', l: 'Live link out', c: CYAN },
                    { v: '0', l: 'Code required', c: TEAL },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="border-2 border-white/30 bg-white/10 p-3 backdrop-blur md:p-4"
                    >
                      <div className="text-3xl font-extrabold md:text-4xl" style={{ color: s.c }}>
                        {s.v}
                      </div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/70 md:text-xs">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#pricing"
                    onClick={() => track('hero')}
                    className={`${brutal} inline-flex min-h-14 items-center justify-center gap-2 border-white bg-white px-7 text-base font-extrabold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
                  >
                    See the options <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappUrl(QUESTION_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-14 items-center justify-center gap-2 border-4 border-white/40 px-7 text-base font-extrabold uppercase text-white transition-colors hover:bg-white/10"
                  >
                    <MessageCircle className="h-5 w-5" /> Ask a question
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* ══ VSL ══ */}
        <section className="pt-10 md:pt-14">
          <Reveal>
            <p className="mb-4 text-center text-sm font-extrabold uppercase tracking-[0.14em] opacity-60">
              ▼ Watch this first ▼
            </p>

            <div className={`${brutalLg} overflow-hidden bg-[hsl(0,0%,10%)]`}>
              <VslPlayer />
            </div>

            <p className="mt-4 text-center text-sm font-semibold leading-relaxed opacity-60">
              {vslIsPlaceholder
                ? 'Real footage from the last session. Two minutes on what the evening actually looks like.'
                : 'Two minutes on why this works, and whether it is right for you.'}
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="#pricing"
                onClick={() => track('under_vsl')}
                className={`${brutal} inline-flex min-h-14 items-center justify-center gap-2 bg-[hsl(0,0%,10%)] px-8 text-base font-extrabold uppercase text-white transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                Reserve my seat <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-3 text-center text-xs font-semibold opacity-50">
              Small group · Limited seats · Message first, pay after we confirm your date
            </p>
          </Reveal>
        </section>

        {/* ══ THE COST OF THE SLOW WAY ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Why most people never ship</Eyebrow>
            <SectionTitle>
              The expensive part was never
              <br />
              the money
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              You are competent. You are busy. And that combination is exactly why the idea has sat
              untouched for a year.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COSTS.map((c, i) => (
              <Reveal key={c.stat} delay={i * 80}>
                <div className={`${brutal} h-full bg-white p-6`}>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: c.accent }}
                  >
                    <c.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xl font-extrabold leading-tight">{c.stat}</p>
                  <p className="text-sm font-extrabold uppercase tracking-wide opacity-50">
                    {c.label}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed opacity-75">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ THE 5 FAILURES ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>The diagnosis</Eyebrow>
            <SectionTitle>
              The 5 reasons your idea
              <br />
              is still an idea
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              I have watched hundreds of smart people stall in exactly the same five places. Most
              have three of them running at once. You will recognise at least one.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {FAILURES.map((f, i) => (
              <Reveal key={f.n} delay={i * 60}>
                <div className={`${brutal} flex items-stretch overflow-hidden bg-white`}>
                  <div
                    className="flex w-16 shrink-0 items-center justify-center border-l-4 border-[hsl(0,0%,10%)] md:w-20"
                    style={{ background: SECTION_ACCENTS[i % SECTION_ACCENTS.length] }}
                  >
                    <span className="text-3xl font-extrabold md:text-4xl">{f.n}</span>
                  </div>
                  <div className="flex-1 p-5 md:p-6">
                    <h3 className="text-lg font-extrabold leading-tight md:text-xl">{f.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed opacity-75">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 text-base font-extrabold">
              One honest question: how many of the five did you just recognise?
            </p>
            <p className="mt-1 text-sm font-semibold opacity-65">
              That recognition is exactly what the workshop turns into a fix.
            </p>
          </Reveal>
        </section>

        {/* ══ THE MECHANISM ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} relative overflow-hidden bg-[hsl(0,0%,10%)] p-8 md:p-12`}>
              <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={DOTS} />
              <div className="relative">
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                  The method
                </p>
                <h2 className="text-3xl font-extrabold leading-[1.05] text-white md:text-5xl">
                  <span
                    style={{
                      background: `linear-gradient(90deg, ${AMBER}, ${CORAL})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {MECHANISM}
                  </span>
                </h2>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-white/70">
                  Going from <span className="font-extrabold text-white">0 → 1</span> without a
                  developer, a co-founder, or a year of your life. You bring the domain expertise.
                  AI does the building. The {FRAMEWORK} decides what gets built at all, and in
                  which order.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {STEPS.map((s) => (
                    <div
                      key={s.n}
                      className="relative border-2 border-white/25 bg-white/10 p-5 backdrop-blur"
                    >
                      <span className="absolute right-4 top-3 text-5xl font-extrabold text-white/10">
                        {s.n}
                      </span>
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                        style={{ background: s.accent }}
                      >
                        <s.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-extrabold text-white">{s.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-white/65">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-7 border-t-2 border-white/15 pt-5 text-sm font-semibold leading-relaxed text-white/60">
                  Every one of the five failures above is something this order prevents. That is the
                  whole point of running the steps in sequence instead of starting wherever feels
                  most comfortable.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ WHAT YOU LEAVE WITH ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Deliverables, not takeaways</Eyebrow>
            <SectionTitle>What you walk out with</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              Not notes. Not inspiration. Six things that exist when you leave the room.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.title} delay={i * 60}>
                <div className={`${brutal} h-full bg-white p-6`}>
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: SECTION_ACCENTS[i % SECTION_ACCENTS.length] }}
                  >
                    <o.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-extrabold leading-tight">{o.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed opacity-70">{o.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ AGENDA ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>The five hours</Eyebrow>
            <SectionTitle>Ten minutes of method, then you build</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              Every block follows the same shape: a short, dense explanation, then you work on your
              own thing with help beside you.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {sections.slice(0, 5).map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <div className={`${brutal} overflow-hidden bg-white`}>
                  <div className="flex items-stretch">
                    <div
                      className="flex w-16 shrink-0 items-center justify-center border-l-4 border-[hsl(0,0%,10%)] md:w-20"
                      style={{ background: SECTION_ACCENTS[i % SECTION_ACCENTS.length] }}
                    >
                      <span className="text-3xl font-extrabold md:text-4xl">{s.id}</span>
                    </div>
                    <div className="flex-1 p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-extrabold leading-tight md:text-xl">
                          {s.theoryTitle}
                        </h3>
                        <span className="border-2 border-[hsl(0,0%,10%)] bg-[hsl(0,0%,96%)] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">
                          {s.theoryDuration} + {s.buildDuration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-relaxed opacity-70">
                        {s.outcome}
                      </p>
                      <p className="mt-3 flex items-start gap-2 text-sm font-extrabold">
                        <Rocket className="mt-0.5 h-4 w-4 shrink-0" style={{ color: CORAL }} />
                        {s.buildTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ NO TIME OBJECTION ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Let us address the real objection</Eyebrow>
            <SectionTitle>&ldquo;I do not have time for this&rdquo;</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              That is precisely the reason to come. This is built to give hours back, not consume
              them.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {NO_TIME.map((t, i) => (
              <Reveal key={t.title} delay={i * 70}>
                <div className={`${brutal} flex h-full items-start gap-4 bg-white p-5`}>
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: TEAL }}
                  >
                    <t.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold leading-tight">{t.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed opacity-70">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FIT ══ */}
        <section className="pt-16 md:pt-24">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className={`${brutal} h-full bg-white p-6 md:p-8`}>
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: TEAL }}
                  >
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold">Come if</h3>
                </div>
                <ul className="space-y-3">
                  {FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} />
                      <span className="text-sm font-semibold leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className={`${brutal} h-full bg-[hsl(0,0%,96%)] p-6 md:p-8`}>
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: CORAL }}
                  >
                    <X className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold">Skip it if</h3>
                </div>
                <ul className="space-y-3">
                  {NOT_FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 opacity-45" />
                      <span className="text-sm font-semibold leading-relaxed opacity-65">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ VALUE STACK ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Everything included</Eyebrow>
            <SectionTitle>What a seat actually contains</SectionTitle>
          </Reveal>

          <Reveal>
            <div className={`${brutalLg} mt-8 overflow-hidden bg-white`}>
              {VALUE_STACK.map((v) => (
                <div
                  key={v.item}
                  className="flex items-center justify-between gap-4 border-b-2 border-[hsl(30,20%,90%)] p-5"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                      style={{ background: TEAL }}
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-extrabold md:text-base">{v.item}</span>
                  </div>
                  <span className="whitespace-nowrap text-base font-extrabold md:text-lg">
                    ${v.value}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between gap-4 bg-[hsl(0,0%,10%)] p-5 text-white">
                <span className="text-sm font-extrabold uppercase tracking-wide md:text-lg">
                  Total value
                </span>
                <span
                  className="text-2xl font-extrabold line-through decoration-4 md:text-3xl"
                  style={{ textDecorationColor: CORAL }}
                >
                  ${VALUE_TOTAL}
                </span>
              </div>

              <div className="p-7 text-center" style={{ background: AMBER }}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-60">
                  {isEarlyBird() ? `Early bird, ${EARLY_BIRD_LABEL}` : 'Your investment'}
                </p>
                <div className="mt-2 flex items-baseline justify-center gap-3">
                  <span className="text-6xl font-extrabold leading-none md:text-7xl">
                    ${isEarlyBird() ? EARLY_BIRD_PRICE : TIERS[0].price}
                  </span>
                  {isEarlyBird() && (
                    <span className="text-2xl font-extrabold opacity-40 line-through md:text-3xl">
                      ${TIERS[0].price}
                    </span>
                  )}
                </div>
                {isEarlyBird() && (
                  <p className="mt-3 inline-block border-2 border-[hsl(0,0%,10%)] bg-[hsl(0,0%,10%)] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white">
                    Save ${TIERS[0].price - EARLY_BIRD_PRICE} · Price goes back up 1 September
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ PRICING ══ */}
        <section id="pricing" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Three ways in</Eyebrow>
            <SectionTitle>Pick the one that matches your risk</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              The workshop is identical in all three. What changes is how much support you get
              afterwards, which is where most people actually fall over.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.key} delay={i * 80}>
                <div
                  className={`${
                    t.featured ? brutalLg : brutal
                  } relative flex h-full flex-col ${t.accent} ${t.featured ? 'lg:-mt-4' : ''}`}
                >
                  {t.featured && (
                    <div
                      className="flex items-center justify-center gap-2 border-b-4 border-[hsl(0,0%,10%)] py-2 text-[11px] font-extrabold uppercase tracking-wider"
                      style={{ background: AMBER }}
                    >
                      <Crown className="h-4 w-4" /> Most people should take this
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="text-xl font-extrabold leading-tight">{t.name}</h3>
                    <p className="mt-1 text-sm font-semibold opacity-60">{t.tagline}</p>

                    <div className="mt-5 flex flex-wrap items-baseline gap-2">
                      <span className="text-5xl font-extrabold leading-none">
                        {t.priceLabel ??
                          `$${t.earlyBird && isEarlyBird() ? EARLY_BIRD_PRICE : t.price}`}
                      </span>
                      {t.earlyBird && isEarlyBird() && (
                        <span className="text-2xl font-extrabold opacity-35 line-through">
                          ${t.price}
                        </span>
                      )}
                    </div>
                    {t.earlyBird && isEarlyBird() && (
                      <p
                        className="mt-2 inline-block self-start border-2 border-[hsl(0,0%,10%)] px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                        style={{ background: AMBER }}
                      >
                        Early bird {EARLY_BIRD_LABEL}
                      </p>
                    )}

                    <ul className="mt-6 flex-1 space-y-3">
                      {t.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                            style={{ background: t.featured ? AMBER : TEAL }}
                          >
                            <Check
                              className={`h-3 w-3 ${t.featured ? '' : 'text-white'}`}
                              strokeWidth={3}
                            />
                          </span>
                          <span className="text-sm font-semibold leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={whatsappUrl(
                        RESERVE_MESSAGE(
                          t.name,
                          t.priceLabel ??
                            (t.earlyBird && isEarlyBird()
                              ? `$${EARLY_BIRD_PRICE} early bird`
                              : `$${t.price}`),
                        ),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track(t.key)}
                      className={`${brutal} mt-7 flex min-h-14 items-center justify-center gap-2 px-5 text-sm font-extrabold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-base ${
                        t.featured
                          ? 'bg-[hsl(0,0%,10%)] text-white'
                          : 'bg-white'
                      }`}
                    >
                      <MessageCircle
                        className="h-5 w-5"
                        style={{ color: t.featured ? TEAL : undefined }}
                      />
                      Reserve on WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 text-center text-xs font-semibold leading-relaxed opacity-55">
              {NEXT_SESSION.format} · {NEXT_SESSION.duration} · {NEXT_SESSION.seats}. Message me and
              I will confirm the next date, hold your seat and send payment details. No account, no
              checkout funnel.
            </p>
          </Reveal>
        </section>

        {/* ══ PROOF ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Not a stock photo on this page</Eyebrow>
            <SectionTitle>
              This already happened,
              <br />
              in a real room
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              Helsinki XR Center. Every person in these photos walked out with something live.
            </p>
          </Reveal>

          {/* Photo band */}
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {eventPhotos.slice(0, 4).map((p, i) => (
              <Reveal key={p.src} delay={i * 60}>
                <div className={`${brutal} overflow-hidden bg-white`}>
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Featured quote over a photo */}
          <Reveal>
            <div className={`${brutalLg} relative mt-6 overflow-hidden`}>
              <img
                src={eventPhotos[4]?.src ?? eventPhotos[0].src}
                alt={eventPhotos[4]?.alt ?? eventPhotos[0].alt}
                loading="lazy"
                className="h-[22rem] w-full object-cover md:h-[26rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <Quote className="mb-3 h-8 w-8" style={{ color: AMBER }} />
                <blockquote className="max-w-2xl text-xl font-extrabold leading-snug text-white md:text-3xl">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-extrabold text-white">
                    {testimonials[0].name}
                  </span>
                  <span className="text-sm font-semibold text-white/60">
                    {testimonials[0].role}
                  </span>
                  <span
                    className="border-2 border-[hsl(0,0%,10%)] px-2 py-1 text-[10px] font-extrabold uppercase"
                    style={{ background: AMBER }}
                  >
                    {testimonials[0].source}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Remaining quotes */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.slice(1, 4).map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div className={`${brutal} flex h-full flex-col bg-white p-6`}>
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4"
                        style={{ fill: AMBER, color: 'hsl(0,0%,10%)' }}
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm font-semibold leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-end justify-between gap-2 border-t-2 border-[hsl(30,20%,88%)] pt-3">
                    <div>
                      <p className="text-sm font-extrabold">{t.name}</p>
                      <p className="text-xs opacity-60">{t.role}</p>
                    </div>
                    <span
                      className="whitespace-nowrap border-2 border-[hsl(0,0%,10%)] px-2 py-1 text-[10px] font-extrabold uppercase"
                      style={{ background: AMBER }}
                    >
                      {t.source}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#pricing"
                onClick={() => track('under_proof')}
                className={`${brutal} inline-flex min-h-14 items-center justify-center gap-2 bg-[hsl(0,0%,10%)] px-8 text-base font-extrabold uppercase text-white transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                Reserve my seat <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/testimonials"
                className={`${brutal} inline-flex min-h-14 items-center justify-center gap-2 bg-white px-6 text-sm font-extrabold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                See all testimonials <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </section>

        {/* ══ FAQ ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Before you ask</Eyebrow>
            <SectionTitle>Questions people actually have</SectionTitle>
          </Reveal>

          <div className="mt-8 space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <details className={`${brutal} group bg-white`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                    <span className="text-base font-extrabold leading-tight">{f.q}</span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)] text-lg font-extrabold transition-transform group-open:rotate-45"
                      style={{ background: AMBER }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="border-t-2 border-[hsl(30,20%,88%)] p-5 pt-4 text-sm font-semibold leading-relaxed opacity-75">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div
              className={`${brutalLg} relative overflow-hidden p-8 text-center md:p-14`}
              style={{ background: AMBER }}
            >
              <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={DOTS} />
              <div className="relative">
                <h2 className="text-3xl font-extrabold leading-[1.05] md:text-5xl">
                  The idea has waited long enough
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-relaxed opacity-75 md:text-lg">
                  One evening. A live link. A plan for the week after. Message me and I will send
                  the next date.
                </p>
                <a
                  href={whatsappUrl(QUESTION_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('footer')}
                  className={`${brutal} mt-8 inline-flex min-h-16 items-center justify-center gap-2 bg-[hsl(0,0%,10%)] px-8 text-base font-extrabold uppercase text-white transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-lg`}
                >
                  <MessageCircle className="h-5 w-5" style={{ color: TEAL }} />
                  Reserve my seat
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Build;
