import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  Compass,
  Laptop,
  Lock,
  MessageCircle,
  Play,
  Quote,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  TrendingDown,
  Users,
  X,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Footer from '@/components/Footer';
import { whatsappUrl } from '@/lib/whatsapp';
import {
  eventPhotos,
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
const brutalLg = 'border-4 border-[hsl(0,0%,10%)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]';
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
const PRICE = 275;
const SEATS = 10;

/** Cohort status. Update these two when a cohort fills or a date is set. */
const CURRENT_COHORT = { label: '1 September', status: 'full' as const };
const NEXT_COHORT = { label: 'mid-September', status: 'waitlist' as const };

/**
 * Application happens over WhatsApp: the link opens with these three
 * questions pre-filled, so the first message is already a qualification.
 */
const APPLY_MESSAGE = `Hi Ahmed, I'd like to apply for the next 0→1 cohort.

1) What I'm building or thinking of building:

2) What I do right now (job / background):

3) Why now:`;

const QUESTION_MESSAGE = 'Hi Ahmed, I have a question about the 0→1 cohort.';

/* Instructor */
const BIO =
  "I've raised $600K, exited two startups, and taken companies from zero to $100K revenue inside three months. I've built communities of 100K people across Akadeemy, Slush and Robot Uprising. Now I compress what took me a decade into four weeks.";

const STATS = [
  { v: '$600K', l: 'Raised for Predictiva', c: AMBER },
  { v: '2', l: 'Startup exits', c: CORAL },
  { v: '100K', l: 'Community members built', c: PURPLE },
  { v: '$100K', l: 'Revenue in 3 months', c: TEAL },
];

const ORGS = ['Slush', 'Antler', 'Invention Convention', 'AI Collective Finland'];

/* Why people never ship */
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

const FAILURES = [
  {
    n: 1,
    title: 'The Tech-First Trap',
    desc: 'You start with which stack, which platform, which tool. None of those decide whether a single person wants the thing. This is how people spend $10,000 building something nobody asked for.',
  },
  {
    n: 2,
    title: 'The Silent Build',
    desc: 'You keep it quiet so nobody steals it. So you get no feedback, and you find out months later that the market was never there. Hiding an idea does not protect it, it starves it.',
  },
  {
    n: 3,
    title: 'The Feature Pile',
    desc: 'You collect every competitor feature and add five more, thinking more equals better. It makes the thing impossible to explain, and a product a stranger cannot explain is a product they will not buy.',
  },
  {
    n: 4,
    title: 'The Vague Audience',
    desc: '"Anyone who needs this" is nobody. Without a specific person in mind you cannot write the offer, price it, or find them. Every downstream decision stays fuzzy because this one was skipped.',
  },
  {
    n: 5,
    title: 'The Someday Start',
    desc: 'You will start when work calms down. It will not. An idea that never launches can never fail, which is exactly why it feels safe. This is the one that costs you the year.',
  },
];

/* The 0→1 Framework */
const STEPS = [
  {
    n: 1,
    icon: Compass,
    accent: AMBER,
    title: 'Validate the problem',
    desc: 'Before anything gets built, find a pain you actually understand and confirm someone else feels it. Specific person, specific problem, written in one line.',
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
    desc: 'A live product and a way to collect signal. Real responses from real people, not opinions from friends.',
  },
];

/* The four weeks */
const WEEKS = [
  {
    n: 1,
    title: 'Lock the problem and the person',
    goal: 'Leave with a problem worth solving and the exact person who feels it.',
    detail:
      'We pressure-test the idea you arrive with, or find one if you do not have it yet. By the end of week one you can say in one sentence who you are building for and what hurts.',
  },
  {
    n: 2,
    title: 'Shape the offer, build version one',
    goal: 'Leave with an offer a stranger understands and a working first version.',
    detail:
      'Write the offer statement, then build the thing with AI in the session. Not a deck, not a wireframe. Something real that exists at the end of the three hours.',
  },
  {
    n: 3,
    title: 'Put it in front of real people',
    goal: 'Leave with your product live and the first signal coming in.',
    detail:
      'Ship it, find where your people actually are, and start collecting responses. We read what users do, not what they politely say.',
  },
  {
    n: 4,
    title: 'Turn it into a business, then show it',
    goal: 'Leave with a price, a path to your first paid customer, and a plan.',
    detail:
      'Pricing, first revenue, and what happens after the cohort ends. We finish with a showcase where you present what you built to the room.',
  },
];

/* What is included */
const INCLUDED = [
  '4 live sessions, 3 hours each, capped at 10 people',
  'Lifetime access to every session recording',
  `The complete ${FRAMEWORK} canvases`,
  'The full prompt and tool playbook',
  'The complete slide deck, yours to keep',
  '3 guest sessions: marketing, funding, and an investor',
  `Lifetime access to the private ${CLUB}`,
  'Direct access to me between sessions',
  'Showcase session in week 4',
];

const GUESTS = [
  { icon: Target, accent: AMBER, title: 'A marketing expert', desc: 'How to find where your customers actually are, and reach them without a budget.' },
  { icon: Rocket, accent: CYAN, title: 'A funding expert', desc: 'What funding is really for, when to raise, and how to know if you should not.' },
  { icon: BadgeCheck, accent: TEAL, title: 'An investor', desc: 'What makes them lean in, and the things founders say that end the conversation.' },
];

/* Fit */
const FOR_YOU = [
  'You are established in your career and want leverage outside it',
  'You have an idea you keep circling but never start',
  'You are tired of waiting on a developer or an agency quote',
  'You want to test demand before you sink months into building',
  'You can protect three hours a week for four weeks',
];

const NOT_FOR_YOU = [
  'You want to sit back and watch a lecture',
  'You want someone else to build your product for you',
  'You are here for a certificate rather than a shipped product',
];

const FAQS = [
  {
    q: 'I am not technical at all. Is this really for me?',
    a: 'Yes, and it is designed for exactly that. You describe what you want in plain language and AI does the building. Past attendees include accountants, marketers and a 40-year workshop veteran who had never shipped anything.',
  },
  {
    q: 'Can I do this alongside a full-time job?',
    a: 'That is the assumption it is built on. Three hours a week for four weeks, scheduled outside working hours. The work happens in the session, so you are not carrying homework into your week.',
  },
  {
    q: 'What if I arrive without an idea?',
    a: 'That is fine and fairly common. Week one is finding a problem worth solving. Several people have arrived empty-handed and left with a validated direction and a live product.',
  },
  {
    q: 'What if I miss a session?',
    a: 'Every session is recorded and you keep lifetime access. You also have direct access to me between sessions, so you can catch up without falling behind the group.',
  },
  {
    q: 'What happens when the four weeks end?',
    a: `The cohort ends, the ${CLUB} does not. You keep lifetime access to the private community, every recording, and every template. That is where people go when they get stuck in month two.`,
  },
  {
    q: 'What if it is not for me?',
    a: 'Full refund. Attend the first two sessions, fill in a short feedback form telling me what did not work, and you get your money back.',
  },
  {
    q: 'How do I get in?',
    a: `Message me on WhatsApp. The link opens with three questions already written, so your first message tells me what you are building, what you do now, and why now. Cohorts are ${SEATS} people, so I read every one.`,
  },
];

/* VSL. Set VSL_URL when the sales video is recorded. */
const VSL_URL: string | null = null;
const VSL_POSTER: string | null = null;
const vslSrc = VSL_URL ?? workshopVideoUrl;
const vslPoster = VSL_POSTER ?? workshopVideoPoster;
const vslIsPlaceholder = VSL_URL === null;

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
        alt="Inside the cohort"
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
    title: 'The 0→1 Cohort — 4 Weeks, 10 Seats | Mentorna®',
    description:
      'For 9-5 domain experts. Build a profitable business in four weeks using the 0→1 Framework, without losing $10,000 on tech nobody needs. 10 seats per cohort.',
    canonical: 'https://mentorna.com/build',
  });

  const track = (placement: string) =>
    trackEvent('cohort_apply_click', {
      page_path: window.location.pathname,
      placement,
      variant: 'build_v3',
    });

  const applyHref = whatsappUrl(APPLY_MESSAGE);

  const ApplyButton = ({
    where,
    label = 'Apply for the next cohort',
    dark = true,
  }: {
    where: string;
    label?: string;
    dark?: boolean;
  }) => (
    <a
      href={applyHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(where)}
      className={`${brutal} inline-flex min-h-16 items-center justify-center gap-2 px-8 text-base font-extrabold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-lg ${
        dark ? 'bg-[hsl(0,0%,10%)] text-white' : 'bg-white'
      }`}
    >
      <MessageCircle className="h-5 w-5" style={{ color: dark ? TEAL : undefined }} />
      {label}
    </a>
  );

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      {/* ══ COHORT STATUS BAR ══ */}
      <div className="border-b-4 border-[hsl(0,0%,10%)] bg-[hsl(0,0%,10%)] px-4 py-3 text-center">
        <p className="text-xs font-extrabold uppercase tracking-wider text-white md:text-sm">
          <span style={{ color: CORAL }}>{CURRENT_COHORT.label} cohort is full.</span>{' '}
          <span className="text-white/70">
            Waitlist open for {NEXT_COHORT.label}. {SEATS} seats only.
          </span>
        </p>
      </div>

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
                  ✦ For 9-5 domain experts · 4 weeks · {SEATS} seats
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
                  In four weeks, using {FRAMEWORK}, without losing $10,000 on tech nobody needs.
                </p>

                <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { v: '4 weeks', l: '3 hours a week, live', c: AMBER },
                    {
                      v: 'Skip $10,000',
                      l: "The usual quote to get a product built. You'll build yours in the room.",
                      c: CYAN,
                    },
                    { v: 'No code', l: 'Nothing to install', c: TEAL },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="border-2 border-white/30 bg-white/10 p-4 backdrop-blur"
                    >
                      <div
                        className="text-xl font-extrabold leading-tight md:text-2xl"
                        style={{ color: s.c }}
                      >
                        {s.v}
                      </div>
                      <div className="mt-1 text-sm font-semibold leading-snug text-white/70">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <ApplyButton where="hero" dark={false} />
                </div>
                <p className="mt-3 text-sm font-semibold text-white/50">
                  Opens WhatsApp with three questions. Takes two minutes.
                </p>
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
                ? 'Real footage from a past session. What the room actually looks like.'
                : 'Two minutes on why this works, and whether it is right for you.'}
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
              I have watched smart people stall in exactly the same five places. Most have three of
              them running at once. You will recognise at least one.
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
          </Reveal>
        </section>

        {/* ══ THE FRAMEWORK ══ */}
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
                    {FRAMEWORK}
                  </span>
                </h2>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-white/70">
                  Three steps, run in order. You bring the domain expertise. AI does the building.
                  The framework decides what gets built at all, and when.
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
                  Every one of the five failures above is something this order prevents.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ THE FOUR WEEKS ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <SectionTitle>4 weeks. Built to compound.</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              One live session a week, three hours each. Every week ends with something that exists,
              not something you plan to do later.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {WEEKS.map((w, i) => (
              <Reveal key={w.n} delay={i * 70}>
                <div className={`${brutal} overflow-hidden bg-white`}>
                  <div
                    className="flex items-center gap-3 border-b-4 border-[hsl(0,0%,10%)] px-5 py-3"
                    style={{ background: SECTION_ACCENTS[i % SECTION_ACCENTS.length] }}
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]">
                      Week {w.n}
                    </span>
                    <span className="ml-auto text-[11px] font-extrabold uppercase tracking-wide opacity-60">
                      3 hours live
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg font-extrabold leading-tight md:text-xl">{w.title}</h3>
                    <p className="mt-2 flex items-start gap-2 text-sm font-extrabold">
                      <Target className="mt-0.5 h-4 w-4 shrink-0" style={{ color: CORAL }} />
                      {w.goal}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-relaxed opacity-70">
                      {w.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ GUEST SESSIONS ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Not just me</Eyebrow>
            <SectionTitle>Three guest sessions</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-70">
              People who have actually done the thing they are talking about, in the room with you.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {GUESTS.map((g, i) => (
              <Reveal key={g.title} delay={i * 70}>
                <div className={`${brutal} h-full bg-white p-6`}>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: g.accent }}
                  >
                    <g.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-extrabold">{g.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed opacity-70">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FOUNDERS' CLUB ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div
              className={`${brutalLg} relative overflow-hidden p-8 md:p-12`}
              style={{ background: TEAL }}
            >
              <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={DOTS} />
              <div className="relative">
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                  What happens after
                </p>
                <h2 className="text-3xl font-extrabold leading-[1.05] text-white md:text-5xl">
                  The cohort ends.
                  <br />
                  The {CLUB} does not.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/85">
                  Four weeks is enough to build something. It is not enough to build a business. So
                  everyone who finishes joins the private {CLUB} and stays, with direct access to me
                  and to everyone who has been through it before you.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Lock, t: 'Private and small', d: `Not the free community. Only people who have been through a cohort.` },
                    { icon: MessageCircle, t: 'Direct access to me', d: 'Between sessions, and after the cohort ends.' },
                    { icon: Users, t: 'The people who went first', d: 'Alumni who hit the same wall you are about to hit.' },
                  ].map((b) => (
                    <div key={b.t} className="border-2 border-white/35 bg-white/15 p-5 backdrop-blur">
                      <b.icon className="mb-3 h-6 w-6 text-white" />
                      <h3 className="text-base font-extrabold text-white">{b.t}</h3>
                      <p className="mt-1 text-sm font-semibold leading-relaxed text-white/80">
                        {b.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ INSTRUCTOR ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Who runs it</Eyebrow>
            <SectionTitle>Ahmed Ezzat</SectionTitle>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed opacity-75">
              {BIO}
            </p>
          </Reveal>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 60}>
                <div className={`${brutal} h-full bg-white p-5`}>
                  <div className="text-3xl font-extrabold leading-none" style={{ color: s.c }}>
                    {s.v}
                  </div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-wide opacity-60">
                    {s.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wide opacity-50">
                Worked with
              </span>
              {ORGS.map((o) => (
                <span
                  key={o}
                  className="border-2 border-[hsl(0,0%,10%)] bg-white px-3 py-1.5 text-xs font-extrabold"
                >
                  {o}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══ PROOF ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Not a stock photo on this page</Eyebrow>
            <SectionTitle>
              50 people have been
              <br />
              through the room
            </SectionTitle>
          </Reveal>

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

          {/* Outcomes */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className={`${brutal} h-full bg-white p-6`}>
                <span
                  className="inline-block border-2 border-[hsl(0,0%,10%)] px-2 py-1 text-[10px] font-extrabold uppercase"
                  style={{ background: AMBER }}
                >
                  Now building
                </span>
                <h3 className="mt-3 text-xl font-extrabold">Faris started FOMO</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed opacity-75">
                  He came in with an idea and left with a direction. He is building the MVP now and
                  validating it with potential customers.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={`${brutal} h-full bg-white p-6`}>
                <span
                  className="inline-block border-2 border-[hsl(0,0%,10%)] px-2 py-1 text-[10px] font-extrabold uppercase"
                  style={{ background: TEAL, color: 'white' }}
                >
                  Shipped
                </span>
                <h3 className="mt-3 text-xl font-extrabold">Karla built a donation platform</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed opacity-75">
                  {/* TODO: replace with Karla's testimonial when Ahmed sends it */}
                  Her testimonial is on the way and will go here.
                </p>
              </div>
            </Reveal>
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
                  <span className="text-sm font-extrabold text-white">{testimonials[0].name}</span>
                  <span className="text-sm font-semibold text-white/60">
                    {testimonials[0].role}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

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
                  <div className="mt-4 border-t-2 border-[hsl(30,20%,88%)] pt-3">
                    <p className="text-sm font-extrabold">{t.name}</p>
                    <p className="text-xs opacity-60">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FREE ONLINE OBJECTION ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} bg-[hsl(0,0%,10%)] p-8 md:p-12`}>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                The question everyone asks
              </p>
              <h2 className="text-3xl font-extrabold leading-[1.1] text-white md:text-4xl">
                &ldquo;Why do I need this? I can learn it free online.&rdquo;
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-base font-semibold leading-relaxed text-white/75">
                {/* TODO: Ahmed to supply his own answer in his own words */}
                <p>
                  You can. Everything in these four weeks exists somewhere online for free, and I
                  will not pretend otherwise.
                </p>
                <p>
                  You have also had free access to all of it for the last year. The idea is still an
                  idea.
                </p>
                <p className="font-extrabold text-white">
                  What you are paying for is not information. It is a deadline, ten people watching,
                  and someone telling you which of the five failures you are currently running.
                </p>
              </div>
            </div>
          </Reveal>
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
                  <h3 className="text-xl font-extrabold">Apply if</h3>
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
                  <h3 className="text-xl font-extrabold">Do not apply if</h3>
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

        {/* ══ PRICE + GUARANTEE ══ */}
        <section id="apply" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} overflow-hidden bg-white`}>
              <div className="p-6 md:p-8">
                <Eyebrow>Everything included</Eyebrow>
                <h2 className="text-2xl font-extrabold md:text-3xl">What a seat gets you</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                        style={{ background: TEAL }}
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-semibold leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 text-center" style={{ background: AMBER }}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-60">
                  One price, no tiers
                </p>
                <div className="mt-2 text-6xl font-extrabold leading-none md:text-7xl">
                  ${PRICE}
                </div>
                <p className="mt-3 text-sm font-extrabold uppercase tracking-wide opacity-70">
                  4 weeks · 12 hours live · {SEATS} seats
                </p>
                <div className="mt-6">
                  <ApplyButton where="pricing" />
                </div>
                <p className="mt-3 text-xs font-semibold opacity-60">
                  {CURRENT_COHORT.label} is full. Applying joins the {NEXT_COHORT.label} waitlist.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={`${brutal} mt-5 flex items-start gap-4 bg-white p-6`}>
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                style={{ background: TEAL }}
              >
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold">Full refund after session two</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed opacity-75">
                  Come to the first two sessions. If it is not what you expected, fill in a short
                  feedback form telling me what did not work and you get your money back in full. I
                  would rather refund you than have you sit through four weeks you do not want.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ FAQ ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Before you apply</Eyebrow>
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
                  Four weeks, {SEATS} seats, and a product that exists at the end of it.{' '}
                  {CURRENT_COHORT.label} is full, so this is the {NEXT_COHORT.label} list.
                </p>
                <div className="mt-8">
                  <ApplyButton where="footer" />
                </div>
                <p className="mt-3 text-xs font-semibold opacity-60">
                  Or{' '}
                  <a
                    href={whatsappUrl(QUESTION_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-2 underline-offset-4"
                  >
                    ask a question first
                  </a>
                  .
                </p>
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
