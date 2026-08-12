import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Check,
  Clock,
  Compass,
  Crown,
  Laptop,
  MessageCircle,
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
import { testimonials } from '@/data/testimonials';

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
const TIERS = [
  {
    key: 'seat',
    name: 'The Seat',
    price: 149,
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

/* The three pillars of the "unfair advantage" */
const PILLARS = [
  {
    icon: Brain,
    accent: PURPLE,
    title: 'Proven business systems',
    desc: 'The same problem, offer and validation frameworks used by funded founders. Not theory, not motivation. A sequence you follow.',
  },
  {
    icon: Zap,
    accent: CYAN,
    title: 'AI as the execution layer',
    desc: 'You bring judgement, AI does the labour. What used to need a developer and six weeks now takes an afternoon in the room.',
  },
  {
    icon: Target,
    accent: TEAL,
    title: 'Compression, not information',
    desc: 'You are not short on information, you are short on time. Five hours replaces the months you would spend assembling this yourself.',
  },
];

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

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const Build = () => {
  const measurementId = (localStorage.getItem('google_analytics_id') || '').trim();
  const { trackEvent } = useGoogleAnalytics({ measurementId });

  useSEO({
    title: 'Build It In One Evening — 5-Hour Execution Workshop | Mentorna®',
    description:
      'An intensive 5-hour hands-on workshop for busy professionals. Stop the trial and error, skip the wrong questions, and use AI plus proven business systems to ship something real in a single evening.',
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
                  ✦ One evening · Small group · Helsinki
                </span>

                <h1 className="mt-5 text-4xl font-extrabold leading-[0.98] text-white md:text-6xl">
                  Five hours that replace{' '}
                  <span
                    style={{
                      background: `linear-gradient(90deg, ${AMBER}, ${CORAL}, ${PURPLE})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    six months of guessing
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/75 md:text-lg">
                  An intensive, hands-on execution workshop for professionals who do not have time
                  to waste. You will stop the trial and error, stop asking the wrong questions, and
                  leave with something real and live, built with AI and proven business systems.
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

        {/* ══ THE UNFAIR ADVANTAGE ══ */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} relative overflow-hidden bg-[hsl(0,0%,10%)] p-8 md:p-12`}>
              <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={DOTS} />
              <div className="relative">
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                  What you are actually buying
                </p>
                <h2 className="text-3xl font-extrabold leading-[1.1] text-white md:text-4xl">
                  An unfair advantage,
                  <br />
                  assembled for you
                </h2>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-white/70">
                  Everything in this room exists publicly somewhere. The advantage is that it has
                  been sequenced, tested and compressed, so you skip the part where you work out
                  the order yourself.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {PILLARS.map((p) => (
                    <div
                      key={p.title}
                      className="border-2 border-white/25 bg-white/10 p-5 backdrop-blur"
                    >
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                        style={{ background: p.accent }}
                      >
                        <p.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-extrabold text-white">{p.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-white/65">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
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

                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold leading-none">
                        {t.priceLabel ?? `$${t.price}`}
                      </span>
                    </div>

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
                        RESERVE_MESSAGE(t.name, t.priceLabel ?? `$${t.price}`),
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
            <Eyebrow>From the room</Eyebrow>
            <SectionTitle>What people said afterwards</SectionTitle>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.slice(0, 4).map((t, i) => (
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
            <a
              href="/testimonials"
              className={`${brutal} mt-6 inline-flex items-center gap-2 bg-white px-6 py-4 text-sm font-extrabold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
            >
              See all testimonials <ArrowRight className="h-4 w-4" />
            </a>
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
