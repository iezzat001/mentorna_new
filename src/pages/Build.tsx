import React, { useEffect } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { whatsappUrl } from '@/lib/whatsapp';
import { eventPhotos } from '@/data/testimonials';

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
   Locked offer — docs/BUILD-COPY.md. Do not rewrite Ashraf lines.
   ──────────────────────────────────────────────────────────── */
const PRICE = 275;
const SEATS = 10;

const SEO_TITLE = 'حاجتك. موجودة يوم الاثنين | Mentorna';
const SEO_DESCRIPTION =
  'التكلفة $275. البداية أول سبتمبر، جمعة بعد الويبينار. refund كامل بعد 2 sessions. سجّل في الـ workshop على WhatsApp.';

/** Ashraf, locked — do not rewrite. Ends with استفدتش. */
const ASHRAF_SUB =
  'التكلفة $275. البداية أول سبتمبر، يوم جمعة مساء بعد معاد الويبينار. بعد 2 sessions من حقك تطلب refund كامل لو ما استفدتش.';

/** Ashraf, locked — do not rewrite. */
const ASHRAF_REFUND = 'بعد 2 sessions من حقك تطلب refund كامل لو ما استفدتش.';

const CTA_RESTATE =
  'التكلفة $275. البداية أول سبتمبر. بعد 2 sessions من حقك تطلب refund كامل لو ما استفدتش.';

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

const OUTCOMES = [
  'تفهمي السيكونس ماشي إزاي والميندست بتاعت البزنس',
  'ابدأ بfeature واحدة (المشكلة كلها too much features)',
  'أول client',
  'ليه دلوقتي: الأفكار ما بقتش مستحيلة.',
];

const FRIDAYS = [
  { n: 1, label: 'تعرف هي بتاعت مين، ولو مش تستاهلك تقتلها بدري.' },
  { n: 2, label: 'حاجة واحدة شغالة، في الـ session، تقدر تفتحها الاثنين.' },
  { n: 3, label: 'ناس حقيقيين يشوفوها.' },
  { n: 4, label: 'سعر، طريق لأول client، والـ 9 الباقيين يشوفوا إنها بتاعتك.' },
];

const FOR_YOU = [
  'فول تايم، أفكار في راسك، وعايز حاجة ليا مش شغل الشركة',
  'مش حاسس إن عندك business sense، وعايز تفهم السيكونس',
  'تقدر الجمعة، 3 ساعات، 4 مرات',
];

const NOT_FOR_YOU = [
  'مستني الـ tool الصح',
  'عايز تسمع من غير ما تبني',
  'عايز حد يبنيهالك',
  'عايز 1-on-1 — مش الصفحة دي',
];

const PAY_MARKS = ['WhatsApp', 'فيزا', 'تحويل', 'Instapay'];

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
      className={`${brutal} inline-flex min-h-12 items-center justify-center gap-2 px-6 text-base font-extrabold transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:min-h-14 md:text-lg ${
        dark ? 'bg-[hsl(0,0%,10%)] text-white' : 'bg-white'
      }`}
    >
      <MessageCircle className="h-5 w-5" style={{ color: dark ? TEAL : undefined }} />
      {CTA_LABEL}
    </a>
  );

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      <main className="mx-auto max-w-5xl px-4 pb-0" dir="rtl">
        {/* 1. Internshala fold — button in first viewport. No extra $275. */}
        <header className="relative pt-3 md:pt-4">
          <div className={`${brutalLg} relative overflow-hidden bg-[hsl(0,0%,10%)] px-4 py-4 md:px-8 md:py-6`}>
            <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={DOTS} />
            <div className="relative">
              <span className="inline-block border-2 border-white/40 bg-white/10 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white">
                ${PRICE} · أول سبتمبر · {SEATS} مقاعد
              </span>

              <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.05] text-white md:text-5xl">
                حاجتك.
                <br />
                حتى لو صغيرة.
              </h1>

              <p className="mt-3 max-w-2xl text-base font-semibold leading-snug text-white/85 md:text-lg">
                يوم الاثنين تبقى موجودة. بتاعتك.
              </p>

              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/75 md:text-base">
                مش تفضل قاعد بتفجوليز مع نفسك ومفيش حاجة على الأرض.
              </p>

              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/60">
                {ASHRAF_SUB}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {ATF_FACTS.map((f) => (
                  <span
                    key={f.q}
                    className="border-2 border-white/25 bg-white/10 px-2 py-1 text-[11px] font-extrabold leading-snug text-white/80"
                  >
                    {f.q} {f.a}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <ApplyButton where="hero" dark={false} />
                <p className="mt-2 text-sm font-semibold text-white/50">{CTA_MICRO}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Real player — testimonial video. No Reveal / opacity-0. */}
        <section className="pt-8 md:pt-10">
          <div className={`${brutalLg} overflow-hidden bg-[hsl(0,0%,10%)]`}>
            <video
              src={VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black object-contain"
            />
            <div className="grid grid-cols-3 divide-x-2 divide-[hsl(0,0%,10%)] border-t-4 border-[hsl(0,0%,10%)] bg-white text-center">
              <p className="px-2 py-2 text-[11px] font-extrabold leading-snug">{ASHRAF_REFUND}</p>
              <p className="px-2 py-2 text-[11px] font-extrabold leading-snug">{SEATS} مقاعد</p>
              <p className="px-2 py-2 text-[11px] font-extrabold leading-snug">هيروح ~$500</p>
            </div>
          </div>
        </section>

        {/* 2. Kennedy look-inside cards — 4×3h lives here */}
        <section className="pt-8 md:pt-10">
          <Eyebrow>الـ workshop</Eyebrow>
          <SectionTitle>جمعة تبني. الاثنين موجودة.</SectionTitle>
          <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
            <div className={`${brutal} bg-[hsl(0,0%,10%)] px-4 py-4`}>
              <p className="text-base font-extrabold leading-snug text-white">
                يوم الاثنين تبقى موجودة. بتاعتك.
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-white/75">
                4 sessions × 3 ساعات. Hands-on، مش ويبنار. الشغل جوه الـ session.
              </p>
            </div>
            <div className={`${brutal} bg-white px-4 py-4`}>
              <p className="text-sm font-semibold leading-snug opacity-80">
                أول جمعة: 4 سبتمبر، حوالي 7 مساءً بعد الويبينار 6. لو مسافرة، حضورك من هناك ينفع.
                فيه recording. الحضور هو الأساس.
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug opacity-70">
                الناس التكنيكل مش عندها مشكلة في الأداة. لما تعرف الدنيا ماشية إزاي، تستخدمها. الـ
                tool بتساعدك. اللي بيفرّق: إيه اللي بعده، تبيع لمين، distribution.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Strategyzer outcomes — image-hugs-paragraph + Friday rows */}
        <section className="pt-8 md:pt-10">
          <Eyebrow>بتطلع بإيه</Eyebrow>
          <SectionTitle>بتاعتك. وموجودة.</SectionTitle>
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
          <div className={`${brutal} mt-3 bg-white px-3 py-3`}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] opacity-50">
              الأربع جمع
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
              <Eyebrow>السعر</Eyebrow>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                التكلفة ${PRICE}. {SEATS} مقاعد.
              </h2>
              <p className="mt-1 text-sm font-extrabold opacity-70">
                4 sessions × 3 ساعات · الجمعة 4 سبتمبر
              </p>
              <p className="mt-4 text-5xl font-extrabold leading-none">${PRICE}</p>
              <p className="mt-3 text-sm font-extrabold leading-snug">{ASHRAF_REFUND}</p>
              <p className="mt-2 text-sm font-semibold leading-snug opacity-80">
                مش غالي خالص. بالمصري عامل 14,000 أو 13,900. في كورس بـ 20 ألف على sessionين. ده
                نص السعر، وبعدين هيروح ~$500. أول ناس تدخل، access على كل اللي جاي.
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug opacity-70">
                لينك على الواتساب. فيزا/كارد، تحويل، Instapay من مصر.
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

        {/* 5. Al-Tayseer RTL who */}
        <section className="pt-8 md:pt-10">
          <SectionTitle>دي بتاعتي؟ هتفضل موجودة يوم الاثنين؟</SectionTitle>
          <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
            <div className={`${brutal} bg-white px-4 py-3`}>
              <h3 className="text-base font-extrabold" style={{ color: TEAL }}>
                ينفع ليك لو
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
              <h3 className="text-base font-extrabold opacity-70">مش ليك لو</h3>
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
                  دخلت، أنت in على طول.
                </h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/85">
                  أول دفعة. السعر هيروح ~$500. Access على كل اللي بعده. مش timer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. SCATCODE close — dark band. No English footer. */}
      <section className="mt-8 bg-[hsl(0,0%,10%)]" dir="rtl">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 py-6 md:flex-row md:items-center md:py-8">
          <div>
            <h2 className="text-2xl font-extrabold leading-[1.15] text-white md:text-3xl">
              سجّل في الـ workshop.
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
                أو اسأل سؤال الأول.
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Build;
