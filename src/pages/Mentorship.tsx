import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  CheckCircle2,
  Compass,
  ExternalLink,
  Hammer,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  X,
} from 'lucide-react';
import Footer from '@/components/Footer';
import { whatsappUrl } from '@/lib/whatsapp';
import {
  testimonials,
  workshopVideoPoster,
  workshopVideoUrl,
} from '@/data/testimonials';

/* ────────────────────────────────────────────────────────────
   Design tokens — shared with /workshop, /links and the offer pages
   ──────────────────────────────────────────────────────────── */
const INK = 'hsl(0,0%,10%)';
const INDIGO = 'hsl(232,72%,58%)';
const PURPLE = 'hsl(262,70%,60%)';
const PINK = 'hsl(322,80%,62%)';
const AMBER = 'hsl(38,95%,58%)';
const CYAN = 'hsl(196,85%,52%)';
const TEAL = 'hsl(160,70%,45%)';
const CORAL = 'hsl(18,80%,63%)';

const PAGE_BG =
  'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';

const brutal = 'border-4 border-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
const brutalLg = 'border-4 border-[hsl(0,0%,10%)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]';

const ACCENTS = [PURPLE, CYAN, AMBER, TEAL, CORAL, INDIGO];

/* ────────────────────────────────────────────────────────────
   Offer data
   ──────────────────────────────────────────────────────────── */
const PRICE_USD = 2500;
const MONTHS = 3;
const SESSIONS = 24;
const SESSION_MINUTES = 90;
const TOTAL_HOURS = (SESSIONS * SESSION_MINUTES) / 60;

const APPLY_MESSAGE = `Hi Ahmed, I'd like to apply for your 1:1 mentorship ($${PRICE_USD.toLocaleString()} — ${MONTHS} months, ${SESSIONS} sessions). Can we talk about whether it's a fit?`;
const QUESTION_MESSAGE =
  "Hi Ahmed, I have a question about the 1:1 mentorship program.";

const HERO_STATS = [
  { value: `${MONTHS}`, label: 'Months' },
  { value: `${SESSIONS}`, label: 'Sessions' },
  { value: `${SESSION_MINUTES}m`, label: 'Each' },
  { value: `${TOTAL_HOURS}h`, label: 'With me' },
];

const TAILORING = [
  {
    icon: Compass,
    title: 'We start with a diagnostic, not a curriculum',
    desc: 'The first two sessions map where you actually are — your skills, your constraints, your runway, and the goal you care about. Nothing gets planned before that is honest and on paper.',
  },
  {
    icon: Target,
    title: 'One goal, chosen deliberately',
    desc: 'Most people are stuck because four directions are open at once. We close three. You leave the first month knowing which one you are building and, more importantly, why.',
  },
  {
    icon: Brain,
    title: 'Your roadmap is written for you',
    desc: 'Exactly what to learn and build, in what order, with nothing extra. A founder validating a B2B idea and a consultant productising their service get genuinely different plans.',
  },
  {
    icon: Hammer,
    title: 'Every session ends with a decision or a build',
    desc: 'No lectures. We work on your real project on the call — reviewing, debugging, rewriting the offer, rehearsing the sales conversation. You leave with something changed.',
  },
];

const INCLUDED = [
  {
    icon: '🎯',
    title: `${SESSIONS} private sessions, ${SESSION_MINUTES} minutes each`,
    color: PURPLE,
    items: [
      'Twice a week for 12 weeks, one-to-one with me',
      `${TOTAL_HOURS} hours of focused work on your business`,
      'Recorded, so you can revisit any decision we made',
    ],
  },
  {
    icon: '💬',
    title: 'Support between sessions',
    color: CYAN,
    items: [
      'Direct WhatsApp access for the questions that cannot wait',
      'Written and Loom feedback on what you build',
      'Replies within 24 hours, Monday to Friday',
    ],
  },
  {
    icon: '📦',
    title: 'Frameworks and templates',
    color: AMBER,
    items: [
      'Customer interview scripts and validation checklists',
      'Offer creation framework and pricing structures',
      'Landing page templates and launch campaign playbook',
    ],
  },
  {
    icon: '🛠️',
    title: 'Done-with-you deliverables',
    color: TEAL,
    items: [
      'A working product or MVP, built alongside you',
      'A live landing page and a funnel that captures leads',
      'A traction plan with the channels that fit your market',
    ],
  },
  {
    icon: '🌐',
    title: 'Access to my network',
    color: CORAL,
    items: [
      'Warm introductions to operators, founders and clients',
      'Subject to my honest read of where your project stands',
    ],
  },
  {
    icon: '🤖',
    title: 'An AI execution system',
    color: INDIGO,
    items: [
      'The exact AI workflows I use to ship faster',
      'Built into how you work, not handed over as a course',
    ],
  },
];

const JOURNEY = [
  {
    month: 'Month 1',
    title: 'Clarity & Validation',
    color: PURPLE,
    outcome: 'Problem validated, customer defined, offer drafted',
    items: [
      'Diagnostic of where you are and what you actually want',
      'One direction chosen, with the reasoning written down',
      'Customer interviews run — real conversations, not guesses',
      'A first offer a stranger understands in ten seconds',
    ],
  },
  {
    month: 'Month 2',
    title: 'Build & Ship',
    color: CYAN,
    outcome: 'Product live, landing page up, funnel working',
    items: [
      'Your product built with AI, reviewed with me each session',
      'Landing page live and collecting real signal',
      'Pricing set and the offer tested against objections',
      'The first version out in front of actual people',
    ],
  },
  {
    month: 'Month 3',
    title: 'Traction & Revenue',
    color: TEAL,
    outcome: 'First customers, a repeatable channel, a plan that outlasts us',
    items: [
      'Traction channels tested, the working one doubled down on',
      'Sales conversations rehearsed and then run for real',
      'First paying customers and the feedback loop that follows',
      'A written plan for the six months after we stop',
    ],
  },
];

const FOR_YOU = [
  'You are building something real and want it to actually work',
  'You can commit to two 90-minute sessions a week for three months',
  'You will do the work between sessions, not just attend them',
  'You want honest feedback more than encouragement',
];

const NOT_FOR_YOU = [
  'You want someone to build the product for you',
  'You are looking for a course to watch at your own pace',
  'You cannot protect three hours a week for the next three months',
];

const FAQS = [
  {
    q: 'Do I need an idea before we start?',
    a: 'No. If you arrive without one, Month 1 is spent finding a problem you genuinely understand and care about. If you arrive with one, we pressure-test it before you spend another month building the wrong thing.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. A large part of what I teach is building with AI, which is exactly what removes the need for a developer. Your background matters less than your willingness to ship badly and improve.',
  },
  {
    q: 'What makes this different from a course?',
    a: 'A course is the same for everyone. This is built around your situation after a proper diagnostic, and every session works on your actual project rather than a hypothetical one.',
  },
  {
    q: 'What if I need to reschedule a session?',
    a: 'Life happens — reschedule with reasonable notice and we move it. The guarantee allows up to two missed sessions, so there is room for the unexpected without derailing the program.',
  },
  {
    q: 'How do payments work?',
    a: `The program is $${PRICE_USD.toLocaleString()} for the full ${MONTHS} months. Message me and I will send the payment options, including instalments, along with the agreement.`,
  },
];

/* ────────────────────────────────────────────────────────────
   Primitives
   ──────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @keyframes mentorFloat {
      0%,100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(28px,-28px) scale(1.08); }
      66% { transform: translate(-18px,18px) scale(.95); }
    }
    .mentor-blob { animation: mentorFloat 17s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .mentor-blob { animation: none; }
    }
  `}</style>
);

const Blob = ({
  color,
  size,
  className,
  delay = 0,
  opacity = 0.32,
}: {
  color: string;
  size: number;
  className?: string;
  delay?: number;
  opacity?: number;
}) => (
  <div
    aria-hidden
    className={`mentor-blob pointer-events-none fixed rounded-full blur-3xl ${className ?? ''}`}
    style={{
      width: size,
      height: size,
      background: color,
      opacity,
      animationDelay: `${delay}s`,
    }}
  />
);

const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

const SectionHeading = ({
  eyebrow,
  title,
  accent = INK,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) => (
  <div className="mb-7">
    <p
      className="text-[11px] font-extrabold uppercase tracking-[0.22em]"
      style={{ color: accent }}
    >
      {eyebrow}
    </p>
    <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[1.05] md:text-4xl">
      {title}
    </h2>
  </div>
);

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const Mentorship = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const previous = document.title;
    document.title = '1:1 Mentorship | Mentorna®';
    return () => {
      document.title = previous;
    };
  }, []);

  const featured = testimonials.filter((t) => t.highlight);
  const rest = testimonials.filter((t) => !t.highlight);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] text-[hsl(0,0%,10%)]"
      style={{ background: PAGE_BG }}
    >
      <GlobalStyles />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,.18) 1.3px, transparent 1.3px)',
          backgroundSize: '18px 18px',
        }}
      />
      <Blob color={PURPLE} size={330} className="-left-24 top-20" />
      <Blob color={INDIGO} size={300} className="-right-28 top-[36%]" delay={-6} />
      <Blob color={AMBER} size={280} className="-left-20 bottom-28" delay={-11} />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 md:pb-24">
        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="pt-10 md:pt-16">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-lg font-light tracking-[3px]">Mentorna®</span>
              <span className="opacity-30">/</span>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] opacity-55">
                1:1 Mentorship
              </span>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {['Private · One-to-one', `${MONTHS} months`, 'By application'].map(
                (chip) => (
                  <span
                    key={chip}
                    className="border-2 border-[hsl(0,0%,10%)] bg-white/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>

            <h1 className="text-[2.5rem] font-extrabold uppercase leading-[0.96] sm:text-6xl md:text-7xl">
              Build the thing.
              <br />
              <span
                className="inline-block px-2"
                style={{ background: AMBER, WebkitBoxDecorationBreak: 'clone' }}
              >
                Get it paid for.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed opacity-75 md:text-xl">
              Three months of private mentorship built around your situation — not a
              course, not a template. We choose one direction, build it together, and
              put it in front of people who pay.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappUrl(APPLY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${brutal} inline-flex min-h-14 items-center justify-center gap-2 bg-[hsl(0,0%,10%)] px-7 text-base font-extrabold uppercase text-white transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                Apply for a place
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#included"
                className="inline-flex min-h-14 items-center justify-center gap-2 border-4 border-[hsl(0,0%,10%)] px-6 text-sm font-extrabold uppercase transition-colors hover:bg-white/60"
              >
                See what is included
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className={`${brutal} mt-10 grid grid-cols-2 bg-white md:grid-cols-4`}>
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={[
                    'border-[hsl(0,0%,10%)] p-4 text-center md:p-5 md:border-b-0',
                    i % 2 === 0 ? 'border-r-2' : '',
                    i < 2 ? 'border-b-2' : '',
                    i === 3 ? 'md:border-r-0' : 'md:border-r-2',
                  ].join(' ')}
                >
                  <div className="text-2xl font-extrabold md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wide opacity-55 md:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </header>

        {/* ── The promise ──────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} bg-white p-7 md:p-10`}>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] opacity-45">
                The promise
              </p>
              <p className="mt-4 text-xl font-semibold leading-snug md:text-2xl">
                In {MONTHS} months you go from an idea in your head to a{' '}
                <span className="px-1.5 py-0.5" style={{ background: AMBER }}>
                  launched product with a clear offer
                </span>{' '}
                — ready to generate revenue. And if you do the work and that does not
                happen, you get your money back.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Tailoring ────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Why this is not a course"
              title="Built around you, deliberately"
              accent={PURPLE}
            />
            <p className="-mt-3 mb-8 max-w-2xl text-base font-medium leading-relaxed opacity-65">
              Two people never get the same program. What follows is the method I use
              to make sure yours fits the situation you are actually in.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {TAILORING.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className={`${brutal} h-full bg-white p-5 md:p-6`}>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: ACCENTS[i % ACCENTS.length] }}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold uppercase leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed opacity-65">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── What you get ─────────────────────────────────── */}
        <section id="included" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow="What you get"
              title="Everything in the program"
              accent={CYAN}
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {INCLUDED.map((block, i) => (
              <Reveal key={block.title} delay={i * 70}>
                <div className={`${brutal} h-full overflow-hidden bg-white`}>
                  <div
                    className="flex items-center gap-3 border-b-4 border-[hsl(0,0%,10%)] p-4"
                    style={{ background: block.color }}
                  >
                    <span className="text-xl">{block.icon}</span>
                    <h3 className="text-sm font-extrabold uppercase leading-tight md:text-base">
                      {block.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5 p-5">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 opacity-40" />
                        <span className="text-sm font-medium leading-relaxed opacity-75">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Journey ──────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow="The three months"
              title="Where you will be, month by month"
              accent={TEAL}
            />
          </Reveal>

          <div className="space-y-4">
            {JOURNEY.map((phase, i) => (
              <Reveal key={phase.month} delay={i * 90}>
                <article className={`${brutal} overflow-hidden bg-white`}>
                  <div
                    className="flex flex-wrap items-center gap-3 border-b-4 border-[hsl(0,0%,10%)] p-4 md:p-5"
                    style={{ background: phase.color }}
                  >
                    <span className="border-2 border-[hsl(0,0%,10%)] bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase">
                      {phase.month}
                    </span>
                    <h3 className="text-lg font-extrabold uppercase leading-tight md:text-xl">
                      {phase.title}
                    </h3>
                  </div>

                  <div className="p-5 md:p-6">
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                            style={{ background: phase.color }}
                          >
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-sm font-medium leading-relaxed opacity-75">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t-2 border-[hsl(0,0%,10%)] pt-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-45">
                        By the end of this month
                      </p>
                      <p className="mt-1 text-sm font-extrabold">{phase.outcome}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Fit ──────────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Honest filter"
              title="Who I take on"
              accent={CORAL}
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className={`${brutal} h-full bg-[linear-gradient(150deg,#E4F7EE,#B9E8D2)] p-6`}>
                <h3 className="mb-4 text-lg font-extrabold uppercase">Apply if…</h3>
                <ul className="space-y-3">
                  {FOR_YOU.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                        style={{ background: TEAL }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </span>
                      <span className="text-sm font-semibold leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className={`${brutal} h-full bg-white p-6`}>
                <h3 className="mb-4 text-lg font-extrabold uppercase">Do not apply if…</h3>
                <ul className="space-y-3">
                  {NOT_FOR_YOU.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)] bg-[hsl(0,0%,90%)]">
                        <X className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold leading-relaxed opacity-70">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Guarantee ────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} overflow-hidden bg-white`}>
              <div
                className="flex items-center gap-3 border-b-4 border-[hsl(0,0%,10%)] p-5 md:p-6"
                style={{ background: TEAL }}
              >
                <ShieldCheck className="h-7 w-7 text-white" />
                <h2 className="text-xl font-extrabold uppercase text-white md:text-2xl">
                  The Guarantee
                </h2>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-lg font-semibold leading-relaxed">
                  Complete the program with full commitment, and if you do not have a
                  launched product with a clear offer by the end of Month {MONTHS} —{' '}
                  <strong>you get 100% of your money back.</strong>
                </p>

                <p className="mt-6 text-sm font-extrabold uppercase tracking-wide">
                  Commitment requirements
                </p>
                <div className="mt-3 space-y-2.5">
                  {[
                    `Attend all ${SESSIONS} scheduled sessions (maximum 2 missed sessions allowed)`,
                    'Complete all assigned tasks (maximum 2 incomplete tasks allowed)',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                        style={{ background: TEAL }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </span>
                      <span className="text-sm font-semibold leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 border-2 border-[hsl(0,0%,10%)] p-4 text-sm font-semibold"
                  style={{ background: AMBER }}
                >
                  ⚠️ If either condition is not met, the guarantee is void.
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Proof ────────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Workshops · Programs · Mentoring"
              title="What people say after working with me"
              accent={PINK}
            />
            <p className="-mt-3 mb-8 max-w-2xl text-base font-medium leading-relaxed opacity-65">
              Feedback from founders, operators and students I have taught and
              mentored. Same approach, same directness — mentorship is simply the
              longest version of it.
            </p>
          </Reveal>

          <Reveal>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className={`${brutalLg} group relative mb-5 block w-full overflow-hidden`}
            >
              <div className="relative aspect-video">
                <img
                  src={workshopVideoPoster}
                  alt="Participants working with Ahmed Ezzat in Helsinki"
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/45">
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none"
                    style={{ background: AMBER }}
                  >
                    <Play className="ml-1 h-8 w-8" fill="currentColor" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 text-left">
                  <p className="text-base font-extrabold text-white md:text-lg">
                    “I came here without an idea and I&apos;m coming out with a solid
                    idea.”
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/60">
                    In their own words · Watch the video
                  </p>
                </div>
              </div>
            </button>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <figure
                  className={`${brutal} h-full bg-[linear-gradient(150deg,#FFFBF4,#F4DDC2)] p-5 md:p-6`}
                >
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4"
                        style={{ color: INK, fill: AMBER }}
                      />
                    ))}
                  </div>
                  <blockquote className="text-base font-extrabold leading-snug md:text-lg">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      {t.linkedin ? (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-extrabold underline decoration-2 underline-offset-2 hover:opacity-65"
                        >
                          {t.name}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <p className="text-sm font-extrabold">{t.name}</p>
                      )}
                      <p className="text-xs font-semibold opacity-50">{t.role}</p>
                    </div>
                    <span className="shrink-0 border-2 border-[hsl(0,0%,10%)] bg-white px-2 py-1 text-[10px] font-extrabold uppercase">
                      {t.source}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.map((t, i) => (
              <Reveal key={t.id} delay={i * 60}>
                <figure className={`${brutal} h-full bg-white p-5`}>
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-3.5 w-3.5"
                        style={{ color: INK, fill: AMBER }}
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm font-semibold leading-relaxed opacity-80">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-3">
                    <p className="text-xs font-extrabold">{t.name}</p>
                    <p className="text-[11px] font-semibold opacity-50">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a
              href="/testimonials"
              className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold uppercase underline decoration-2 underline-offset-4 hover:opacity-65"
            >
              Read all testimonials
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </section>

        {/* ── Investment ───────────────────────────────────── */}
        <section id="apply" className="scroll-mt-6 pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} overflow-hidden bg-white`}>
              <div
                className="border-b-4 border-[hsl(0,0%,10%)] p-8 text-center md:p-10"
                style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${PINK} 100%)` }}
              >
                <span className="inline-block border-2 border-white/50 bg-white/15 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm">
                  The investment
                </span>
                <div className="mt-5 text-6xl font-extrabold leading-none text-white md:text-7xl">
                  ${PRICE_USD.toLocaleString()}
                </div>
                <p className="mt-3 text-base font-extrabold uppercase tracking-wide text-white/80">
                  {MONTHS} months · {SESSIONS} sessions · {SESSION_MINUTES} minutes each
                </p>
                <p className="mt-2 text-sm font-semibold text-white/65">
                  That is {TOTAL_HOURS} hours of private work, backed by the guarantee
                </p>
              </div>

              <div className="p-6 md:p-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    `${SESSIONS} private ${SESSION_MINUTES}-minute sessions`,
                    'Direct WhatsApp access between sessions',
                    'A roadmap written for your situation',
                    'Frameworks, templates and playbooks',
                    'Done-with-you product and landing page',
                    'Introductions from my network',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                        style={{ background: TEAL }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </span>
                      <span className="text-sm font-semibold leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(APPLY_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${brutal} mt-7 flex min-h-16 w-full items-center justify-center gap-2 bg-[hsl(0,0%,10%)] px-6 text-base font-extrabold uppercase text-white transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-lg`}
                >
                  <MessageCircle className="h-5 w-5" style={{ color: TEAL }} />
                  Apply on WhatsApp
                </a>

                <p className="mt-4 text-center text-xs font-semibold leading-relaxed opacity-55">
                  I take on a small number of people at a time. Message me and we will
                  talk properly about whether this is the right fit before any money
                  changes hands.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Mentor ───────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutal} bg-white p-6 md:p-8`}>
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                <div className="relative shrink-0">
                  <img
                    src="https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png"
                    alt="Ahmed Ezzat"
                    className="h-28 w-28 rounded-full border-4 border-[hsl(0,0%,10%)] bg-white object-cover"
                  />
                  <span
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)]"
                    style={{ background: TEAL }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-45">
                    Who you work with
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">Ahmed Ezzat</h3>
                  <p className="mt-1 text-sm font-extrabold uppercase tracking-wide opacity-60">
                    AI Consultant &amp; Serial Entrepreneur
                  </p>
                  <p className="mt-4 text-sm font-medium leading-relaxed opacity-70">
                    I have built businesses, made the expensive mistakes, and spent
                    years helping founders validate ideas, build MVPs and ship offers
                    that convert. You get me directly for every one of the {SESSIONS}{' '}
                    sessions — there is no junior coach behind this program.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-5 md:justify-start">
                    {[
                      { value: '10+', label: 'Years in AI' },
                      { value: '300+', label: 'Founders helped' },
                      { value: '3', label: 'Startups built' },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="text-xl font-extrabold">{stat.value}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wide opacity-50">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <SectionHeading eyebrow="Before you apply" title="Questions" accent={INDIGO} />
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 50}>
                  <div className={`${brutal} overflow-hidden bg-white`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="text-base font-extrabold">{faq.q}</span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)] text-lg font-extrabold"
                        style={{ background: open ? AMBER : 'transparent' }}
                      >
                        {open ? '−' : '+'}
                      </span>
                    </button>
                    {open && (
                      <p className="border-t-2 border-[hsl(0,0%,10%)] p-5 text-sm font-medium leading-relaxed opacity-70">
                        {faq.a}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section className="pt-16 md:pt-24">
          <Reveal>
            <div className={`${brutalLg} bg-[hsl(0,0%,10%)] p-8 text-center text-white md:p-12`}>
              <Sparkles className="mx-auto h-8 w-8" style={{ color: AMBER }} />
              <h2 className="mt-5 text-3xl font-extrabold uppercase leading-[1.05] md:text-5xl">
                Three months
                <br />
                from now.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-relaxed text-white/70">
                You will either be where you are today, or you will have a product,
                an offer, and the first people paying for it.
              </p>

              <a
                href={whatsappUrl(APPLY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-16 items-center justify-center gap-2 border-4 border-white px-8 text-base font-extrabold uppercase text-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-lg"
                style={{ background: AMBER }}
              >
                Apply for a place
                <ArrowRight className="h-5 w-5" />
              </a>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/45">
                Not sure yet?{' '}
                <a
                  href={whatsappUrl(QUESTION_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 underline-offset-4 hover:text-white"
                >
                  Ask me anything first
                </a>
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ── Sticky mobile bar ──────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-[hsl(0,0%,10%)] bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <div className="text-xl font-extrabold leading-none">
              ${PRICE_USD.toLocaleString()}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wide opacity-50">
              {MONTHS} months · {SESSIONS} sessions
            </div>
          </div>
          <a
            href={whatsappUrl(APPLY_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-1 items-center justify-center gap-2 border-[3px] border-[hsl(0,0%,10%)] bg-[hsl(0,0%,10%)] text-sm font-extrabold uppercase text-white active:translate-x-0.5 active:translate-y-0.5"
          >
            Apply now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Footer />

      {/* Clearance so the sticky bar never covers the end of the footer */}
      <div aria-hidden className="h-20 md:hidden" />

      {/* ── Video lightbox ─────────────────────────────────── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border-4 border-white text-white transition-colors hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            controls
            autoPlay
            playsInline
            src={workshopVideoUrl}
            poster={workshopVideoPoster}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-3xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default Mentorship;
