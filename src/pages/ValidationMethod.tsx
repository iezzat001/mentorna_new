import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Lock } from 'lucide-react';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  CLOSING_CAVEAT,
  EVIDENCE_LADDER,
  FAILURE_MODES,
  LOOP_CAPTION,
  LOOP_STEPS,
  METHOD_ASSETS,
  METHOD_STEPS,
  SURVEY_PRINCIPLES,
  SURVEY_QUESTIONS,
} from '@/data/validationMethod';

/* ────────────────────────────────────────────────────────────
   Design tokens — the same Fora editorial language as /build and
   /community. Warm cream gradient, feather-light tracking-tight
   headings, muted-ink hierarchy, one accent per section.
   ──────────────────────────────────────────────────────────── */
const AMBER = 'hsl(38,95%,58%)';
const PURPLE = 'hsl(262,70%,60%)';
const CYAN = 'hsl(196,85%,52%)';
const TEAL = 'hsl(160,70%,45%)';
const CORAL = 'hsl(18,80%,63%)';
const PAGE_BG = 'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';

/** Tag written to magnet_leads.source so these leads are separable. */
const LEAD_SOURCE = 'Validation Method';
/** Remembers a returning visitor so they are not asked twice. */
const UNLOCK_KEY = 'validation_method_unlocked';

const CTA_LABEL = 'Get the Validation Method';

/* ────────────────────────────────────────────────────────────
   Shared primitives — mirrored from /build rather than imported,
   which is how Community.tsx does it too. Build.tsx keeps these
   module-private, so extracting them is a refactor of its own.
   ──────────────────────────────────────────────────────────── */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const Eyebrow = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <p className="flex items-center justify-center gap-2 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/55">
    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
    {children}
  </p>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
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

const ValidationMethod = () => {
  useSEO({
    title: 'The Validation Method · Problem to First Sale | Mentorna®',
    description:
      "A practical framework for validating a problem in the customer's own words, turning that evidence into an offer, testing it with the same people, and treating the first sale as the signal.",
    canonical: 'https://www.mentorna.com/validate',
  });

  const { toast } = useToast();
  const gateRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // A returning visitor who already gave an email should not hit the wall again.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(UNLOCK_KEY) === '1') setUnlocked(true);
    } catch {
      /* private mode — the gate simply shows again */
    }
  }, []);

  const scrollToGate = () => {
    gateRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || submitting) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('magnet_leads').insert([
        {
          email: value,
          whatsapp: null,
          source: LEAD_SOURCE,
          metadata: firstName.trim() ? { first_name: firstName.trim() } : {},
        },
      ]);
      if (error) throw error;

      setUnlocked(true);
      try {
        window.localStorage.setItem(UNLOCK_KEY, '1');
      } catch {
        /* nothing to remember in private mode */
      }
      toast({
        title: 'Unlocked',
        description: 'The survey set, the principles and the checklist are below.',
      });
    } catch (err) {
      console.error('Error saving lead:', err);
      toast({
        title: 'That did not go through',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      {/* ══ HERO ══
          Dark band, same family as the /build hero but without the scroll
          choreography — this page has one job and the button should be the
          first thing the eye lands on after the headline. */}
      <section className="relative overflow-hidden text-[#F7E9D6]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 0%, #3a1c14 0%, #16110f 55%, #0c0a0b 100%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center md:py-32">
          <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7E9D6]/45">
            The Validation Method
          </p>
          <h1 className="mt-5 font-heading text-[2.15rem] font-light leading-[1.08] tracking-tight md:text-5xl lg:text-[3.4rem]">
            Validate the problem before
            <br />
            you build the product.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-heading text-base font-light leading-relaxed text-[#F7E9D6]/65 md:text-lg">
            A practical framework for understanding real customer pain, turning that evidence into
            an offer, testing it with the same people, and using the first sale as a concrete
            signal.
          </p>
          <div className="mt-9">
            <button
              type="button"
              onClick={scrollToGate}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F7E9D6] px-8 text-sm font-medium tracking-wide text-[#0c0a0b] transition-transform hover:scale-[1.03] md:min-h-[3.25rem] md:px-9 md:text-base"
            >
              {CTA_LABEL}
            </button>
          </div>
          <p className="mt-5 font-heading text-sm font-light text-[#F7E9D6]/45">
            Free access · Practical framework · Built around customer evidence
          </p>
        </div>
      </section>

      <main className="relative">
        {/* ══ THE FAILURE MODE ══ */}
        <section className="pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow color={CORAL}>Why ideas die</Eyebrow>
                <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                  Most products are built on a guess about someone else.
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
                  Not a bad guess. Just an untested one — and the cost of finding out late is
                  months of building.
                </p>
              </div>
            </Reveal>

            <ul className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-5 md:mt-14 md:grid-cols-2">
              {FAILURE_MODES.map((f, i) => (
                <Reveal key={f} delay={i * 60}>
                  <li className="flex items-start gap-3 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: CORAL }}
                    />
                    <span>{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ THE LOOP ══
            The brief asks for the process to be readable in under 30 seconds.
            A numbered chain does that without an illustration to maintain, and
            it degrades to a plain ordered list on a phone. */}
        <section className="pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow color={PURPLE}>The loop</Eyebrow>
                <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                  Problem → evidence → offer → response → first sale.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ol className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-3 md:mt-14">
                {LOOP_STEPS.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-4 py-2 font-heading text-[13px] font-light leading-none ring-1 md:text-sm ${
                        i === LOOP_STEPS.length - 1
                          ? 'bg-[hsl(0,0%,10%)] text-[#F7E9D6] ring-transparent'
                          : 'bg-[#FFFCFA] text-[hsl(0,0%,10%)]/75 ring-[#1c100e]/10'
                      }`}
                    >
                      {s}
                    </span>
                    {i < LOOP_STEPS.length - 1 && (
                      <span aria-hidden className="text-[hsl(0,0%,10%)]/25">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={140}>
              <p className="mx-auto mt-10 max-w-2xl text-center font-heading text-lg font-light leading-snug tracking-tight text-[hsl(0,0%,10%)]/80 md:text-xl">
                {LOOP_CAPTION}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══ THE FIVE STEPS ══ */}
        <section className="pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow color={TEAL}>What you actually do</Eyebrow>
                <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                  Five steps, in order.
                </h2>
              </div>
            </Reveal>

            <ol className="mx-auto mt-12 max-w-3xl border-t border-[#1c100e]/10 md:mt-16">
              {METHOD_STEPS.map((s, i) => (
                <li key={s.n} className="border-b border-[#1c100e]/10">
                  <Reveal delay={i * 60}>
                    <div className="grid gap-2 py-7 md:grid-cols-[5rem_1fr] md:gap-8 md:py-9">
                      <p className="font-heading text-[11px] font-medium tracking-[0.22em] text-[#C4893A]">
                        {s.n}
                      </p>
                      <div>
                        <h3 className="font-heading text-2xl font-light leading-snug tracking-tight md:text-[1.75rem]">
                          {s.title}
                        </h3>
                        <p className="mt-3 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]">
                          {s.body}
                        </p>
                        <p className="mt-3 font-heading text-sm font-light leading-relaxed text-[hsl(0,0%,10%)]/55">
                          <span className="text-[hsl(0,0%,10%)]/75">You end up with:</span>{' '}
                          {s.output}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══ EVIDENCE LADDER ══
            Dark band: this is the argument the whole method rests on, and it
            should not read like more of the same cream page. */}
        <section className="relative mt-16 overflow-hidden text-[#F7E9D6] md:mt-24">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, #3a1c14 0%, #16110f 55%, #0c0a0b 100%)',
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 py-20 md:py-28">
            <Reveal>
              <div className="text-center">
                <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7E9D6]/45">
                  The evidence hierarchy
                </p>
                <h2 className="mt-4 font-heading text-3xl font-light leading-[1.12] tracking-tight md:text-[2.65rem]">
                  Not every signal is worth the same.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ol className="mt-12 space-y-0">
                {EVIDENCE_LADDER.map((e, i) => {
                  const last = i === EVIDENCE_LADDER.length - 1;
                  return (
                    <li
                      key={e.rung}
                      className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#F7E9D6]/12 py-4"
                    >
                      <span className="w-6 shrink-0 font-heading text-xs font-light tabular-nums text-[#F7E9D6]/35">
                        {i + 1}
                      </span>
                      <span
                        className={`font-heading font-light tracking-tight ${
                          last ? 'text-2xl text-[#F7E9D6] md:text-[1.9rem]' : 'text-lg md:text-xl'
                        }`}
                        style={last ? { color: AMBER } : undefined}
                      >
                        {e.rung}
                      </span>
                      <span className="font-heading text-sm font-light text-[#F7E9D6]/50 md:text-[15px]">
                        {e.q}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 font-heading text-sm font-light leading-relaxed text-[#F7E9D6]/55 md:text-base">
                {CLOSING_CAVEAT}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══ THE GATE ══
            Everything above makes the method tangible. This is where the
            email buys the parts you would otherwise have to rebuild yourself:
            the question set, the principles behind it, and the checklist. */}
        <section ref={gateRef} id="get-the-method" className="scroll-mt-6 pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow color={AMBER}>Get the method</Eyebrow>
                <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                  The survey set, the principles, the checklist.
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
                  One email. No call, no pitch. The full question set opens on this page.
                </p>
              </div>
            </Reveal>

            {!unlocked && (
              <Reveal delay={80}>
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-10 max-w-xl rounded-[28px] bg-[#FFFCFA] p-6 shadow-[0_28px_70px_-36px_rgba(80,40,16,0.35)] ring-1 ring-[#1c100e]/10 md:mt-12 md:p-8"
                >
                  <label
                    htmlFor="vm-first-name"
                    className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/45"
                  >
                    First name <span className="normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    id="vm-first-name"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className="mt-2 w-full rounded-full border border-[#1c100e]/15 bg-white px-5 py-3 font-heading text-base font-light text-[hsl(0,0%,10%)] outline-none transition-colors placeholder:text-[hsl(0,0%,10%)]/35 focus:border-[#C4893A]"
                    placeholder="Ahmed"
                  />

                  <label
                    htmlFor="vm-email"
                    className="mt-6 block font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/45"
                  >
                    Email
                  </label>
                  <input
                    id="vm-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="mt-2 w-full rounded-full border border-[#1c100e]/15 bg-white px-5 py-3 font-heading text-base font-light text-[hsl(0,0%,10%)] outline-none transition-colors placeholder:text-[hsl(0,0%,10%)]/35 focus:border-[#C4893A]"
                    placeholder="you@work.com"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[hsl(0,0%,10%)] px-8 text-sm font-medium tracking-wide text-[#F7E9D6] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-[3.25rem] md:text-base"
                  >
                    {submitting ? 'Opening…' : CTA_LABEL}
                  </button>
                  <p className="mt-4 text-center font-heading text-sm font-light text-[hsl(0,0%,10%)]/55">
                    Your email, and nothing else. Unsubscribe whenever.
                  </p>
                </form>
              </Reveal>
            )}

            {/* The asset list stays visible either way — before the gate it says
                what is coming, after it says what you now have. */}
            <Reveal delay={120}>
              <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/45">
                  What the method includes
                </p>
                <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
                  {METHOD_ASSETS.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-3 font-heading text-base font-light leading-snug text-[hsl(0,0%,10%)]/75"
                    >
                      <span aria-hidden className="mt-0.5 shrink-0 text-[#C4893A]">
                        {unlocked ? <Check className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ UNLOCKED: THE SURVEY SET ══ */}
        {unlocked && (
          <section className="pt-16 md:pt-24">
            <div className="mx-auto max-w-5xl px-4">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <Eyebrow color={CYAN}>The survey</Eyebrow>
                  <h2 className="mt-3 font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-4xl">
                    Thirteen questions. Most take one tap.
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
                    Low friction is the point. The open-ended question sits last, once answering
                    has already cost them almost nothing.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[28px] bg-[#FFFCFA] ring-1 ring-[#1c100e]/10 md:mt-14">
                  <ol className="divide-y divide-[#1c100e]/8">
                    {SURVEY_QUESTIONS.map((q, i) => (
                      <li key={q.question} className="px-6 py-5 md:px-8">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-heading text-[11px] font-medium tabular-nums tracking-[0.14em] text-[#B4691E]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-heading text-[11px] font-medium uppercase tracking-[0.16em] text-[hsl(0,0%,10%)]/40">
                            {q.section}
                          </span>
                        </div>
                        <p className="mt-2 font-heading text-lg font-light leading-snug tracking-tight md:text-xl">
                          {q.question}
                        </p>
                        <p className="mt-1.5 font-heading text-sm font-light text-[hsl(0,0%,10%)]/55">
                          {q.type} — {q.why}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                  <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/45">
                    Design principles
                  </p>
                  <ul className="mt-5 space-y-4">
                    {SURVEY_PRINCIPLES.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[17px]"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: CYAN }}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ══ COHORT CTA ══
            Same closing band as /community: dark, floating tool marks, one
            link into /build. */}
        <section className="relative mt-16 overflow-hidden text-[#F7E9D6] md:mt-24">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 0%, #3a1c14 0%, #16110f 55%, #0c0a0b 100%)',
            }}
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
            <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4A574]">
              Cohort 2 · Mid-October · Live · Remote · 6 weeks · 10 seats
            </p>
            <h2 className="mt-5 font-heading text-[clamp(2.2rem,6vw,3.6rem)] font-light leading-[1.05] tracking-[-0.03em]">
              Or run it with me for six weeks.
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-heading text-base font-light leading-relaxed text-[#F7E9D6]/60 md:text-lg">
              This method is one week of the 0→1 cohort. The other five take you from the evidence
              to a live product and the people who might pay for it.
            </p>
            <div className="mt-9">
              <Link
                to="/build"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7E9D6] px-8 text-sm font-medium tracking-wide text-[#0c0a0b] transition-transform hover:scale-[1.03] md:min-h-[3.25rem] md:px-9 md:text-base"
              >
                See the cohort
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ValidationMethod;
