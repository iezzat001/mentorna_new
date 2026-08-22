import React, { useEffect, useRef, useState } from 'react';
import { Check, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Footer from '@/components/Footer';
import { whatsappUrl } from '@/lib/whatsapp';

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

const DOTS = {
  backgroundImage: 'radial-gradient(rgba(0,0,0,.18) 1.3px, transparent 1.3px)',
  backgroundSize: '18px 18px',
};

/* ────────────────────────────────────────────────────────────
   Locked offer — docs/BUILD-COPY.md. Do not rewrite Ashraf lines.
   ──────────────────────────────────────────────────────────── */
const PRICE = 275;
const SEATS = 10;

const SEO_TITLE = 'حاجتك. موجودة يوم الاثنين | Mentorna';
const SEO_DESCRIPTION =
  'التكلفة $275. البداية أول سبتمبر، جمعة بعد الويبينار. refund كامل بعد 2 sessions. سجّل في الـ workshop على WhatsApp.';

/** Ashraf, locked — do not rewrite. No trailing period. */
const ASHRAF_SUB =
  'التكلفة $275. البداية أول سبتمبر، يوم جمعة مساء بعد معاد الويبينار. بعد 2 sessions من حقك تطلب refund كامل لو ما استفدتش';

/** Ashraf, locked — do not rewrite. */
const ASHRAF_REFUND = 'بعد 2 sessions من حقك تطلب refund كامل لو ما استفدتش';

const CTA_LABEL = 'سجّل في الـ workshop';
const CTA_MICRO = 'لو مهتم تحجز هبعتلك رابط الدفع.';

const APPLY_MESSAGE = `سلام أحمد، عايز أسجّل في الـ workshop — أول سبتمبر، $275
1) ببني إيه، أو الفكرة اللي في دماغي:
2) بشتغل إيه دلوقتي (الشغلانة، مش bio):
3) ليه دلوقتي:`;

const QUESTION_MESSAGE = 'سلام أحمد — سؤال على الـ workshop (لسه مش بسجّل):';

const ATF_FACTS = [
  { q: 'فري ولا paid؟', a: 'مدفوع. $275' },
  { q: 'نبدء امتى؟', a: 'أول سبتمبر، جمعة مساء بعد الويبينار' },
  { q: 'Refund؟', a: ASHRAF_REFUND },
];

const OUTCOMES = ['بتاعتك.', 'موجودة يوم الاثنين.'];

const FOR_YOU = [
  'Full-time technical، أفكار في دماغك، ومفيش business sense',
  'عايز your own thing',
  'سمعت "one feature" ولسه ما عملتهاش',
  'تقدر الجمعة 3 ساعات × 4',
];

const NOT_FOR_YOU = [
  'مستني الـ tool الصح',
  'عايز webinar من غير ما تبني',
  'عايز حد يبنيهالك',
  'عايز 1-on-1',
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
  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-50">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-extrabold leading-[1.15] md:text-4xl">{children}</h2>
);

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const Build = () => {
  const measurementId = (localStorage.getItem('google_analytics_id') || '').trim();
  const { trackEvent } = useGoogleAnalytics({ measurementId });

  useSEO({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords: 'workshop 0→1, Mentorna, حاجتك, $275',
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
    html.lang = 'ar';
    html.dir = 'rtl';
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
      className={`${brutal} inline-flex min-h-14 items-center justify-center gap-2 px-6 text-base font-extrabold transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-lg ${
        dark ? 'bg-[hsl(0,0%,10%)] text-white' : 'bg-white'
      }`}
    >
      <MessageCircle className="h-5 w-5" style={{ color: dark ? TEAL : undefined }} />
      {CTA_LABEL}
    </a>
  );

  const ApplyBlock = ({
    where,
    dark = true,
    align = 'start',
  }: {
    where: string;
    dark?: boolean;
    align?: 'start' | 'center';
  }) => (
    <div className={align === 'center' ? 'text-center' : undefined}>
      <ApplyButton where={where} dark={dark} />
      <p
        className={`mt-3 text-sm font-semibold ${
          dark ? 'opacity-70' : 'text-white/50'
        }`}
      >
        {CTA_MICRO}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      <main className="mx-auto max-w-5xl px-4 pb-16" dir="rtl">
        {/* ══ 1. HEADLINE + SUB ══ */}
        <header className="relative pt-8 md:pt-12">
          <Reveal>
            <div className={`${brutalLg} relative overflow-hidden bg-[hsl(0,0%,10%)] p-6 md:p-10`}>
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
                <span className="inline-block border-2 border-white/40 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold tracking-wider text-white backdrop-blur">
                  ${PRICE} · أول سبتمبر · {SEATS} مقاعد
                </span>

                <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
                  حاجتك.
                  <br />
                  حتى لو صغيرة.
                  <br />
                  بتاعتك.
                </h1>

                <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-white/80 md:text-lg">
                  يوم الاثنين تبقى موجودة. بتاعتك.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-white/65 md:text-base">
                  {ASHRAF_SUB}
                </p>

                <dl className="mt-6 max-w-xl space-y-2">
                  {ATF_FACTS.map((f) => (
                    <div
                      key={f.q}
                      className="flex flex-col gap-0.5 border-2 border-white/25 bg-white/10 px-3 py-2 backdrop-blur sm:flex-row sm:items-baseline sm:gap-3"
                    >
                      <dt className="shrink-0 text-sm font-extrabold text-white">{f.q}</dt>
                      <dd className="text-sm font-semibold leading-snug text-white/75">{f.a}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6">
                  <ApplyBlock where="hero" dark={false} />
                </div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* ══ 2. WHAT IT IS ══ */}
        <section className="pt-10 md:pt-12">
          <Reveal>
            <Eyebrow>الـ workshop</Eyebrow>
            <SectionTitle>جمعة تبني. الاثنين موجودة.</SectionTitle>
            <div className={`${brutal} mt-5 bg-white px-4 py-4 md:px-5`}>
              <p className="text-base font-semibold leading-relaxed opacity-80">
                الناس التكنيكل مش عندها مشكلة في الأداة. لما تعرف الدنيا ماشية إزاي، تستخدمها. الـ
                tool بتساعدك. اللي بيفرّق: إيه اللي بعده، تبيع لمين، distribution.
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed opacity-80">
                4 sessions × 3 ساعات. Hands-on، مش ويبنار. الشغل جوه الـ session.
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed opacity-80">
                أول جمعة: 4 سبتمبر، حوالي 7 مساءً بعد الويبينار 6. لو مسافرة، حضورك من هناك ينفع.
                فيه recording. الحضور هو الأساس.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══ 3. PRICE, REFUND, DATE ══ */}
        <section id="apply" className="scroll-mt-6 pt-10 md:pt-12">
          <Reveal>
            <div className={`${brutalLg} overflow-hidden bg-white`}>
              <div className="px-4 py-4 md:px-6 md:py-5">
                <Eyebrow>السعر</Eyebrow>
                <h2 className="text-2xl font-extrabold md:text-3xl">
                  التكلفة ${PRICE}. {SEATS} مقاعد.
                </h2>
                <p className="mt-2 text-sm font-extrabold opacity-70">
                  4 sessions × 3 ساعات · الجمعة 4 سبتمبر
                </p>
              </div>

              <div className="px-4 py-6 text-center md:px-6" style={{ background: AMBER }}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-60">
                  التكلفة
                </p>
                <div className="mt-1 text-5xl font-extrabold leading-none md:text-6xl">${PRICE}</div>
                <p className="mt-3 text-sm font-extrabold leading-snug">{ASHRAF_REFUND}</p>
                <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-relaxed opacity-80">
                  مش غالي خالص. بالمصري عامل 14,000 أو 13,900. في كورس بـ 20 ألف على sessionين. ده
                  نص السعر، وبعدين هيروح ~$500. أول ناس تدخل، access على كل اللي جاي.
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed opacity-70">
                  لينك على الواتساب. فيزا/كارد، تحويل، Instapay من مصر.
                </p>
                <div className="mt-5">
                  <ApplyBlock where="pricing" align="center" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ 4. WHAT THEY LEAVE WITH ══ */}
        <section className="pt-10 md:pt-12">
          <Reveal>
            <Eyebrow>بتطلع بإيه</Eyebrow>
            <SectionTitle>بتاعتك. وموجودة.</SectionTitle>
          </Reveal>
          <ul className="mt-5 space-y-2">
            {OUTCOMES.map((item) => (
              <Reveal key={item}>
                <li className={`${brutal} bg-white px-4 py-2.5 text-sm font-extrabold leading-snug`}>
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Outcomes card (main ~839–852). Video src only; no names in locked copy. */}
        <section className="pt-10 md:pt-12">
          <Reveal>
            <div className={`${brutal} overflow-hidden bg-white`}>
              <div className="px-4 py-3 md:px-6">
                <span
                  className="inline-block border-2 border-[hsl(0,0%,10%)] px-2 py-1 text-[10px] font-extrabold uppercase"
                  style={{ background: TEAL, color: 'white' }}
                >
                  Shipped
                </span>
              </div>
              <video
                src="https://mentorna-testimonials.s3.amazonaws.com/testimonials/karla.mp4"
                controls
                playsInline
                className="aspect-video w-full bg-black object-contain"
              />
            </div>
          </Reveal>
        </section>

        {/* ══ 5. WHO IT IS / IS NOT ══ */}
        <section className="pt-10 md:pt-12">
          <Reveal>
            <SectionTitle>دي بتاعتي؟ هتفضل موجودة يوم الاثنين؟</SectionTitle>
          </Reveal>
          <div className="mt-5 grid items-start gap-3 md:grid-cols-2">
            <Reveal>
              <div className={`${brutal} bg-white px-4 py-4`}>
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                    style={{ background: TEAL }}
                  >
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold">لك</h3>
                </div>
                <ul className="space-y-2">
                  {FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} />
                      <span className="text-sm font-semibold leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className={`${brutal} bg-[hsl(0,0%,96%)] px-4 py-4`}>
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center border-2 border-[hsl(0,0%,10%)]"
                    style={{ background: CORAL }}
                  >
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold">مش لك</h3>
                </div>
                <ul className="space-y-2">
                  {NOT_FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 opacity-45" />
                      <span className="text-sm font-semibold leading-snug opacity-70">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ 6. FOUNDING ACCESS ══ */}
        <section className="pt-10 md:pt-12">
          <Reveal>
            <div
              className={`${brutalLg} relative overflow-hidden px-5 py-6 md:px-8 md:py-8`}
              style={{ background: TEAL }}
            >
              <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={DOTS} />
              <div className="relative">
                <h2 className="text-3xl font-extrabold leading-[1.15] text-white md:text-4xl">
                  دخلت، أنت in على طول.
                </h2>
                <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-white/90">
                  أول دفعة. السعر هيروح ~$500. Access على كل اللي بعده. مش timer.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ 7. CTA ══ */}
        <section className="pt-10 md:pt-12">
          <Reveal>
            <div
              className={`${brutalLg} relative overflow-hidden px-5 py-8 text-center md:px-10 md:py-10`}
              style={{ background: AMBER }}
            >
              <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={DOTS} />
              <div className="relative">
                <div className="mb-3 inline-flex items-center justify-center border-[3px] border-[hsl(0,0%,10%)] bg-white p-2">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-extrabold leading-[1.15] md:text-4xl">
                  سجّل في الـ workshop.
                </h2>
                <div className="mt-6">
                  <ApplyBlock where="footer" align="center" />
                </div>
                <p className="mt-3 text-sm font-semibold">
                  <a
                    href={questionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-2 underline-offset-4"
                  >
                    أو اسأل سؤال الأول.
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <div dir="ltr">
        <Footer />
      </div>
    </div>
  );
};

export default Build;
