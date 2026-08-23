import React, { useEffect } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { whatsappUrl } from '@/lib/whatsapp';
import { eventPhotos, workshopVideoPoster } from '@/data/testimonials';

/* Mentorna restyle of CodeFast rhythm. Not a coding course. Copy: docs/BUILD-COPY.md */

const VIDEO_KARLA = 'https://mentorna-testimonials.s3.amazonaws.com/testimonials/karla.mp4';
const VIDEO_MO = 'https://mentorna-testimonials.s3.amazonaws.com/testimonials/mo.mp4';
const STRIP_PHOTOS = eventPhotos.slice(0, 3);

const SEO_TITLE = 'Four weeks to something of yours | Mentorna';
const SEO_DESCRIPTION =
  '$275. Starts Friday 4 September after the webinar. Full refund after 2 sessions. Take a seat on WhatsApp.';

const CTA_LABEL = 'Take a seat';
const CTA_MICRO = "WhatsApp. I'll send the payment link.";
const REFUND = "Full refund after 2 sessions if you didn't get anything from it";

const APPLY_MESSAGE = [
  'Hi Ahmed, I want a seat — 4 September, $275',
  "1) What I'm building, or the idea in my head:",
  '2) What I do all day (the job, not a bio):',
  '3) Why now:',
].join('\n');

const QUESTION_MESSAGE = 'Hi Ahmed — a question on the workshop (not taking a seat yet):';

const FACTS = [
  'Paid. $275',
  'Starts Friday 4 September, after the webinar',
  REFUND,
];

const FRIDAYS = [
  { n: 1, line: "4 September: You pick one. If it doesn't deserve you, it dies here." },
  { n: 2, line: 'One feature. Built in the room. You open it on Monday.' },
  { n: 3, line: 'A stranger understands it.' },
  { n: 4, line: 'A price, and a path to the first client.' },
];

const WATCHING = [
  'Another Friday of notes',
  'Two ideas, too many features',
  'YouTube when the week slides',
  "Monday it's gone",
  'Tell yourself the webinar is enough',
];

const COACHED = [
  'One idea. One feature.',
  'A trainer who knows you',
  'A room that will not let the week slide',
  'Monday it still exists',
  'A path to the first client',
];

const FOR_YOU = [
  "Full-time. Ideas in your head. You want something that's yours, not the company's.",
  "You can already build. You don't have a business sequence.",
  'You can keep Friday, 3 hours, four times.',
];

const NOT_FOR_YOU = [
  "You're waiting for the right tool",
  'You want to listen and have nothing on Monday',
  'You want someone else to build it',
  "You want 1-on-1 — that's not this page",
];

const FLYWHEEL = ['Pick one', 'Build one feature', 'Put it in front of someone', 'Learn'];

const SEQUENCE = [
  { n: 1, title: 'The pick', body: "Whose is this. If it doesn't deserve you, kill it early." },
  { n: 2, title: 'One feature', body: 'Too many features is the whole problem. One, so it still exists on Monday.' },
  { n: 3, title: 'A stranger', body: 'Someone who is not you has to understand it.' },
  { n: 4, title: 'A price', body: 'How you talk about it. How you get to the first client. Not a new salary in four weeks.' },
];

const FAQ = [
  {
    q: 'What if I miss that Friday?',
    a: "There's a recording. Traveling that Friday is fine. Showing up is still the point.",
  },
  {
    q: "Isn't the webinar enough?",
    a: "Friday already feels like enough. That's the stall. Watching is the gym at home. This is a trainer and a plan.",
  },
  {
    q: 'I need to think.',
    a: "Think. 10 seats. First Friday is 4 September. After 2 sessions you can take the money back if you didn't get anything from it.",
  },
  {
    q: 'How do I pay?',
    a: "WhatsApp me. Card, transfer, or Instapay from Egypt. I'll send the link.",
  },
  {
    q: 'Is this 1-on-1?',
    a: 'No. This page is the group. 10 seats.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'You already build. This is the business sequence, not another tools course.',
  },
];

const VideoPair = () => (
  <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-black/10 md:grid-cols-2">
    <video
      src={VIDEO_KARLA}
      poster={workshopVideoPoster}
      controls
      playsInline
      preload="metadata"
      className="aspect-video w-full bg-black object-contain"
    />
    <video
      src={VIDEO_MO}
      poster={workshopVideoPoster}
      controls
      playsInline
      preload="metadata"
      className="aspect-video w-full bg-black object-contain"
    />
  </div>
);

const Build = () => {
  const measurementId = (localStorage.getItem('google_analytics_id') || '').trim();
  const { trackEvent } = useGoogleAnalytics({ measurementId });

  useSEO({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords: 'workshop 0→1, Mentorna, $275',
    ogTitle: SEO_TITLE,
    ogDescription: SEO_DESCRIPTION,
    ogUrl: 'https://mentorna.com/build',
    twitterTitle: SEO_TITLE,
    twitterDescription: SEO_DESCRIPTION,
    canonical: 'https://mentorna.com/build',
  });

  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevDir = html.dir;
    html.lang = 'en';
    html.dir = 'ltr';
    return () => {
      html.lang = prevLang;
      html.dir = prevDir;
    };
  }, []);

  const track = (placement: string) =>
    trackEvent('workshop_apply_click', {
      page_path: window.location.pathname,
      placement,
      variant: 'build_workshop_sept',
    });

  const applyHref = whatsappUrl(APPLY_MESSAGE);
  const questionHref = whatsappUrl(QUESTION_MESSAGE);

  const SeatButton = ({ where, light = false }: { where: string; light?: boolean }) => (
    <a
      href={applyHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(where)}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-5 text-sm font-extrabold md:min-h-12 md:text-base ${
        light ? 'bg-white text-[hsl(0,0%,10%)]' : 'bg-[hsl(14,90%,65%)] text-white'
      }`}
    >
      <MessageCircle className="h-4 w-4" />
      {CTA_LABEL}
    </a>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-body text-[hsl(0,0%,10%)]">
      <main className="mx-auto max-w-5xl px-4 pb-0" dir="ltr">
        {/* 1. Hero — fold only. Button in first viewport. Videos under. */}
        <header className="pt-3 md:pt-8">
          <p className="text-[11px] font-extrabold tracking-[0.14em] text-black/50">
            $275 · 4 September · 10 seats
          </p>
          <h1 className="mt-2 max-w-3xl text-[1.7rem] font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            Four weeks to something of yours.
            <br />
            Not more months of notes.
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-black/75 md:text-base">
            Even if Friday already feels like enough. Even if you can learn this online.
          </p>
          <p className="mt-1.5 max-w-2xl text-sm font-medium leading-snug text-black/60">
            You can already build. What's missing is the sequence, and a room that will not let the week slide.
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {FACTS.map((f) => (
              <span
                key={f}
                className="rounded-full border border-black/15 bg-white px-2 py-0.5 text-[11px] font-bold leading-snug text-black/70"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <SeatButton where="hero" />
            <p className="mt-1.5 text-sm font-semibold text-black/50">{CTA_MICRO}</p>
            <p className="mt-0.5 text-xs font-semibold text-black/40">First room of 10.</p>
          </div>
        </header>

        <section className="pt-4 md:pt-6">
          <VideoPair />
        </section>

        {/* 2. Timeline — CodeFast Day 1/4/9/14 rhythm */}
        <section className="pt-8 md:pt-12">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Four Fridays. Then it exists.</h2>
          <ol className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {FRIDAYS.map((f) => (
              <li key={f.n} className="rounded-xl border border-black/10 bg-white px-3 py-3">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[hsl(14,90%,45%)]">
                  Friday {f.n}
                </p>
                <p className="mt-1 text-sm font-extrabold leading-snug">{f.line}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 3. Enemy — watching vs coached. Who under it. */}
        <section className="pt-8 md:pt-12">
          <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight md:text-3xl">
            Friday notes are for watching. This room is not.
          </h2>
          <div className="mt-4 grid items-start gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
              <h3 className="text-sm font-extrabold text-black/45">Watching</h3>
              <ul className="mt-2 space-y-1.5">
                {WATCHING.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-snug text-black/70">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-black/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
              <h3 className="text-sm font-extrabold text-[hsl(14,90%,45%)]">Being coached</h3>
              <ul className="mt-2 space-y-1.5">
                {COACHED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(14,90%,45%)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold leading-snug text-black/60">
            People who already know still sit in a room. Same reason.
          </p>
          <div className="mt-4 grid items-start gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
              <h3 className="text-sm font-extrabold">For you if</h3>
              <ul className="mt-2 space-y-1.5">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(14,90%,45%)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-black/10 bg-[#F3F3F0] px-4 py-3">
              <h3 className="text-sm font-extrabold text-black/50">Not for you if</h3>
              <ul className="mt-2 space-y-1.5">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-snug text-black/60">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-black/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Flywheel */}
        <section className="pt-8 md:pt-12">
          <p className="text-sm font-extrabold text-black/45">
            Instead of another year of Friday notes and YouTube...
          </p>
          <ol className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {FLYWHEEL.map((step, i) => (
              <li key={step} className="rounded-xl border border-black/10 bg-white px-3 py-3">
                <span className="text-[11px] font-extrabold text-[hsl(14,90%,45%)]">{i + 1}</span>
                <p className="mt-1 text-sm font-extrabold leading-snug">{step}</p>
              </li>
            ))}
          </ol>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight md:text-3xl">Start a shipping flywheel</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-black/70">
            Four weeks. Something of yours on the ground, even if it's small. Then you have something real to learn from.
          </p>
          <div className="mt-3">
            <SeatButton where="flywheel" />
            <p className="mt-1.5 text-sm font-semibold text-black/50">{CTA_MICRO}</p>
          </div>
        </section>

        {/* 5. Sequence */}
        <section className="pt-8 md:pt-12">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">The sequence. Not the tools.</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-black/70">
            The technical part is the easy part. You already have the tools. What changes you is the order: who it's for, one feature, a stranger, a price.
          </p>
          <ol className="mt-4 grid items-start gap-2 sm:grid-cols-2">
            {SEQUENCE.map((s) => (
              <li key={s.n} className="rounded-xl border border-black/10 bg-white px-3 py-3">
                <p className="text-sm font-extrabold leading-snug">
                  {s.n}. {s.title}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-black/65">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm font-semibold text-black/55">
            4 sessions × 3 hours, after the webinar. The work happens in the session.
          </p>
        </section>

        {/* 6. Speed objection */}
        <section className="pt-8 md:pt-12">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Is four Friday nights enough?</h2>
          <div className="mt-4 grid items-start gap-2 md:grid-cols-2">
            <p className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold leading-snug text-black/70">
              The old way has no end. Another webinar. Another YouTube tab. Another week of notes and nothing a stranger has used.
            </p>
            <p className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold leading-snug">
              The new way is 4 sessions × 3 hours, and a trainer who knows your name.
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-sm font-extrabold leading-snug">
            You do not need more information. You need someone who will not let the week slide.
          </p>
        </section>

        {/* 7. Founder — short. Unnamed photos. */}
        <section className="pt-8 md:pt-12">
          <div className="overflow-hidden rounded-xl border border-black/10">
            <div className="grid grid-cols-3">
              {STRIP_PHOTOS.map((p) => (
                <img key={p.src} src={p.src} alt="" className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
            <div className="bg-white px-4 py-4">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Hey, it's Ahmed.</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-black/70">
                I already taught the tool side. Building with AI, before people called it vibe coding.
              </p>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-black/70">
                The people in the room can already ship pixels. What they don't have is the business sequence.
              </p>
              <p className="mt-2 text-sm font-extrabold">This is the room I wish I had.</p>
            </div>
          </div>
        </section>

        {/* 8. Proof — the two videos. No names. No fake counts. */}
        <section className="pt-8 md:pt-12">
          <VideoPair />
        </section>

        {/* 9. Price — one card. No timer. No bundle. */}
        <section id="apply" className="scroll-mt-6 pt-8 md:pt-12">
          <div className="mx-auto max-w-md rounded-xl border border-black/10 bg-white px-5 py-5">
            <h2 className="text-2xl font-extrabold tracking-tight">$275. 10 seats.</h2>
            <p className="mt-1 text-sm font-semibold text-black/60">
              4 sessions × 3 hours. First Friday 4 September, after the webinar.
            </p>
            <p className="mt-3 text-sm font-extrabold leading-snug">{REFUND}.</p>
            <p className="mt-2 text-sm font-medium leading-snug text-black/65">
              No discount. Pay on WhatsApp: card, transfer, or Instapay from Egypt.
            </p>
            <div className="mt-4">
              <SeatButton where="pricing" />
              <p className="mt-2 text-sm font-semibold text-black/50">{CTA_MICRO}</p>
            </div>
          </div>
        </section>

        {/* 10. FAQ — copy visible, no accordion hide */}
        <section className="pt-8 md:pt-12">
          <div className="mx-auto max-w-2xl space-y-2">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border border-black/10 bg-white px-4 py-3">
                <p className="text-sm font-extrabold leading-snug">{item.q}</p>
                <p className="mt-1 text-sm font-medium leading-snug text-black/65">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 11. Close — dark band. No site footer. */}
      <section className="mt-10 bg-[hsl(0,0%,10%)]" dir="ltr">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 py-8 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-xl text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-3xl">
              Four weeks to something of yours. Or more months of notes.
            </h2>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-snug text-white/65">
              $275. Starts 4 September. Full refund after 2 sessions if you didn't get anything from it.
            </p>
          </div>
          <div>
            <SeatButton where="footer" light />
            <p className="mt-2 text-sm font-semibold text-white/50">{CTA_MICRO}</p>
            <p className="mt-2 text-sm font-semibold">
              <a
                href={questionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-2 underline-offset-4"
              >
                Or ask a question first.
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Build;
