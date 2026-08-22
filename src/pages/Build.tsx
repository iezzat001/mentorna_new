import React, { useEffect } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { whatsappUrl } from '@/lib/whatsapp';
import { eventPhotos, workshopVideoPoster } from '@/data/testimonials';

/* ────────────────────────────────────────────────────────────
   Design tokens — same language as /workshop, /links, offer pages
   ──────────────────────────────────────────────────────────── */
const AMBER = 'hsl(38,95%,58%)';
const PURPLE = 'hsl(262,70%,60%)';
const CYAN = 'hsl(196,85%,52%)';
const TEAL = 'hsl(160,70%,45%)';
const CORAL = 'hsl(18,80%,63%)';
const SECTION_ACCENTS = [AMBER, PURPLE, CYAN, TEAL];

const PAGE_BG = 'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';
const brutal = 'border-4 border-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
const brutalLg = 'border-4 border-[hsl(0,0%,10%)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]';

const VIDEO_SRC = 'https://mentorna-testimonials.s3.amazonaws.com/testimonials/karla.mp4';
const STRIP_PHOTOS = eventPhotos.slice(0, 3);

const DOTS = {
  backgroundImage: 'radial-gradient(rgba(0,0,0,.18) 1.3px, transparent 1.3px)',
  backgroundSize: '18px 18px',
};

/* ────────────────────────────────────────────────────────────
   Locked English — docs/BUILD-COPY.md. Do not rewrite.
   ──────────────────────────────────────────────────────────── */
const SEO_TITLE = 'Your own thing. It exists on Monday | Mentorna';
const SEO_DESCRIPTION =
  '$275. Starts Friday 4 September, after the webinar. Full refund after 2 sessions. Register for the workshop on WhatsApp.';

const SUB =
  '$275. Starts Friday 4 September, after the webinar. Full refund after 2 sessions if you didn\'t get anything from it.';

const REFUND = 'Full refund after 2 sessions if you didn\'t get anything from it.';

const CTA_RESTATE =
  '$275. Starts Friday 4 September. Full refund after 2 sessions if you didn\'t get anything from it.';

const CTA_LABEL = 'Register for the workshop';
const CTA_MICRO = 'If you want a seat, I\'ll send the payment link.';

const APPLY_MESSAGE = [
  'Hi Ahmed, I want to register for the workshop — 4 September, $275',
  '1) What I\'m building, or the idea in my head:',
  '2) What I do right now (the job, not a bio):',
  '3) Why now:',
].join('\n');

const QUESTION_MESSAGE = 'Hi Ahmed — a question about the workshop (not registering yet):';

const ATF_FACTS = [
  { q: 'Free or paid?', a: 'Paid. $275' },
  { q: 'When do we start?', a: 'Friday 4 September, evening after the webinar' },
  { q: 'Refund?', a: REFUND },
];

const OUTCOMES = [
  'Your own thing — even if it\'s small. You build it. You can grow it. It\'s yours, not your job\'s.',
  'It exists on Monday — not a picture in your head. Too many features is the whole problem. Start with one, so it still exists.',
  'You understand the sequence — how the business mindset actually moves. So you can run it after the four Fridays.',
  'A path to the first client — how you market, how you pitch. Not a new salary in four weeks.',
];

const WHY_NOW =
  'ideas are not impossible anymore. We have the tools in our hands. What\'s left is getting it on the ground before the week ends.';

const FRIDAYS = [
  { n: 1, label: 'You know who it\'s for, and if it isn\'t worth you, you kill it early.' },
  { n: 2, label: 'One thing that works, in the session, you can open on Monday.' },
  { n: 3, label: 'Real people see it.' },
  { n: 4, label: 'A price, a path to the first client, and the other 9 see that it\'s yours.' },
];

const FOR_YOU = [
  'Full-time, ideas in your head, and you want something that\'s yours — not the company\'s',
  'You don\'t feel like you have business sense, and you want to understand the sequence',
  'You can do Friday, 3 hours, 4 times',
];

const NOT_FOR_YOU = [
  'Waiting for the right tool',
  'listen and have nothing on Monday',
  'someone else to build it — then it isn\'t yours.',
  'You want 1-on-1 — not this page',
];

const PAY_MARKS = ['WhatsApp', 'Visa', 'Transfer', 'Instapay'];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-50">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-extrabold leading-[1.15] md:text-4xl">{children}</h2>
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

  const ApplyButton = ({ where, dark = true }: { where: string; dark?: boolean }) => (
    <a
      href={applyHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(where)}
      className={`${brutal} inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-extrabold transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:min-h-14 md:px-6 md:text-lg ${
        dark ? 'bg-[hsl(0,0%,10%)] text-white' : 'bg-white'
      }`}
    >
      <MessageCircle className="h-5 w-5" style={{ color: dark ? TEAL : undefined }} />
      {CTA_LABEL}
    </a>
  );

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      <main className="mx-auto max-w-5xl px-4 pb-0" dir="ltr">
        {/* 1. Internshala fold — button in first viewport. No extra $275. */}
        <header className="relative pt-2">
          <div className={`${brutalLg} relative overflow-hidden bg-[hsl(0,0%,10%)] px-3 py-3 md:px-8 md:py-5`}>
            <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={DOTS} />
            <div className="relative">
              <span className="inline-block border-2 border-white/40 bg-white/10 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider text-white">
                $275 · 4 September · 10 seats
              </span>

              <h1 className="mt-2 text-[1.75rem] font-extrabold leading-[1.05] text-white md:text-5xl">
                Your own thing.
                <br />
                Even if it's small.
              </h1>

              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/85 md:text-lg">
                Monday, it still exists. It's yours.
              </p>

              <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-snug text-white/75">
                Not another week visualizing it with nothing on the ground.
              </p>

              <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-snug text-white/60">
                {SUB}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {ATF_FACTS.map((f) => (
                  <span
                    key={f.q}
                    className="border-2 border-white/25 bg-white/10 px-2 py-0.5 text-[11px] font-extrabold leading-snug text-white/80"
                  >
                    {f.q} {f.a}
                  </span>
                ))}
              </div>

              <div className="mt-3">
                <ApplyButton where="hero" dark={false} />
                <p className="mt-1.5 text-sm font-semibold text-white/50">{CTA_MICRO}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Real player — under the hero. No Reveal / opacity-0. No name. */}
        <section className="pt-4 md:pt-6">
          <div className={`${brutalLg} overflow-hidden bg-[hsl(0,0%,10%)]`}>
            <video
              src={VIDEO_SRC}
              poster={workshopVideoPoster}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black object-contain"
            />
            <div className="grid grid-cols-3 divide-x-2 divide-[hsl(0,0%,10%)] border-t-4 border-[hsl(0,0%,10%)] bg-white text-center">
              <p className="px-2 py-2 text-[11px] font-extrabold leading-snug">{REFUND}</p>
              <p className="px-2 py-2 text-[11px] font-extrabold leading-snug">10 seats</p>
              <p className="px-2 py-2 text-[11px] font-extrabold leading-snug">Price goes to ~$500</p>
            </div>
          </div>
        </section>

        {/* 2. Kennedy look-inside cards — 4×3h lives here */}
        <section className="pt-8 md:pt-10">
          <Eyebrow>The workshop</Eyebrow>
          <SectionTitle>Build Friday. It exists on Monday.</SectionTitle>
          <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
            <div className={`${brutal} bg-[hsl(0,0%,10%)] px-4 py-4`}>
              <p className="text-base font-extrabold leading-snug text-white">
                Monday, it still exists. It's yours.
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-white/75">
                4 sessions × 3 hours. Hands-on, not a webinar. The work happens in the session.
              </p>
            </div>
            <div className={`${brutal} bg-white px-4 py-4`}>
              <p className="text-sm font-semibold leading-snug opacity-80">
                First Friday: 4 September, around 7pm after the 6pm webinar. If you're travelling, you can join from there. There's a recording. Showing up is the point.
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug opacity-70">
                Technical people don't have a tool problem. Once they see how it works, they use it. The tool helps. What differs: what comes next, who you sell to, distribution.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Strategyzer outcomes — image-hugs-paragraph + Friday rows */}
        <section className="pt-8 md:pt-10">
          <Eyebrow>What you leave with</Eyebrow>
          <SectionTitle>Yours. And it exists.</SectionTitle>
          <ul className="mt-4 grid items-start gap-3 sm:grid-cols-2">
            {OUTCOMES.map((item, i) => (
              <li key={item} className={`${brutal} bg-white px-3 py-3`}>
                <span
                  className="mb-2 inline-flex h-8 w-8 items-center justify-center border-2 border-[hsl(0,0%,10%)] text-sm font-extrabold"
                  style={{ background: SECTION_ACCENTS[i] }}
                >
                  {i + 1}
                </span>
                <p className="text-sm font-extrabold leading-snug">{item}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-semibold leading-snug">{WHY_NOW}</p>
          <div className={`${brutal} mt-3 bg-white px-3 py-3`}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] opacity-50">
              The four Fridays
            </p>
            <ol className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {FRIDAYS.map((f) => (
                <li key={f.n} className="flex items-baseline gap-2 text-sm font-semibold leading-snug">
                  <span className="font-extrabold" style={{ color: CORAL }}>
                    {f.n}.
                  </span>
                  <span>{f.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Figma Expert price card + payment row */}
        <section id="apply" className="scroll-mt-6 pt-8 md:pt-10">
          <div className={`${brutalLg} mx-auto max-w-xl overflow-hidden bg-white`}>
            <div className="px-4 py-4">
              <Eyebrow>Price</Eyebrow>
              <h2 className="text-2xl font-extrabold md:text-3xl">$275. 10 seats.</h2>
              <p className="mt-1 text-sm font-extrabold opacity-70">
                4 sessions × 3 hours · Friday 4 September
              </p>
              <p className="mt-3 text-sm font-extrabold leading-snug">{REFUND}</p>
              <p className="mt-2 text-sm font-semibold leading-snug opacity-80">
                Not expensive. In EGP that's 14,000 or 13,900. There's a course at 20k for two sessions. This is half the price, then it goes to ~$500. First people in get access to everything that comes next.
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug opacity-70">
                Link on WhatsApp. Visa/card, transfer, Instapay from Egypt.
              </p>
              <div className="mt-4">
                <ApplyButton where="pricing" />
                <p className="mt-2 text-sm font-semibold opacity-70">{CTA_MICRO}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 border-t-4 border-[hsl(0,0%,10%)] bg-[hsl(0,0%,96%)] px-3 py-2">
              {PAY_MARKS.map((m) => (
                <span
                  key={m}
                  className="border-2 border-[hsl(0,0%,10%)] bg-white px-2 py-0.5 text-[11px] font-extrabold"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Al-Tayseer who */}
        <section className="pt-8 md:pt-10">
          <SectionTitle>This is for you if the question in your way is: is this mine? Will it still exist on Monday?</SectionTitle>
          <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
            <div className={`${brutal} bg-white px-4 py-3`}>
              <h3 className="text-base font-extrabold" style={{ color: TEAL }}>
                This is for you if
              </h3>
              <ul className="mt-2 space-y-1.5">
                {FOR_YOU.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} />
                    <span className="text-sm font-semibold leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${brutal} bg-[hsl(0,0%,96%)] px-4 py-3`}>
              <h3 className="text-base font-extrabold opacity-70">Not for you if</h3>
              <ul className="mt-2 space-y-1.5">
                {NOT_FOR_YOU.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 opacity-45" />
                    <span className="text-sm font-semibold leading-snug opacity-70">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Aida founder strip — real photos, not a bio / timer */}
        <section className="pt-8 md:pt-10">
          <div className={`${brutalLg} overflow-hidden bg-[hsl(0,0%,10%)]`}>
            <div className="grid grid-cols-3">
              {STRIP_PHOTOS.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt=""
                  className="aspect-[4/5] w-full object-cover"
                />
              ))}
            </div>
            <div className="relative px-4 py-4 md:px-6">
              <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={DOTS} />
              <div className="relative">
                <h2 className="text-2xl font-extrabold leading-[1.15] text-white md:text-3xl">
                  You're in. First group.
                </h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/85">
                  Price goes to ~$500. Access to everything after. Not a timer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. SCATCODE close — dark band. No English site footer. */}
      <section className="mt-8 bg-[hsl(0,0%,10%)]" dir="ltr">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 py-6 md:flex-row md:items-center md:py-8">
          <div>
            <h2 className="text-2xl font-extrabold leading-[1.15] text-white md:text-3xl">
              Register for the workshop
            </h2>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-snug text-white/70">
              {CTA_RESTATE}
            </p>
          </div>
          <div>
            <ApplyButton where="footer" dark={false} />
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
