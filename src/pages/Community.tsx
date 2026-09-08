import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, PlayCircle, ArrowUpRight } from "lucide-react";
import WebinarPlayer from "@/components/community/WebinarPlayer";
import Footer from "@/components/Footer";
import { getPublishedWebinars } from "@/data/webinars";
import { flushRetryQueue, formatRuntime } from "@/lib/webinarAnalytics";
import { useSEO } from "@/hooks/useSEO";

/* ────────────────────────────────────────────────────────────
   Design tokens — the same Fora editorial language as /build.
   Warm cream gradient, feather-light tracking-tight headings,
   muted-ink hierarchy, and a restrained accent rhythm. No more
   brutalist yellow/black: this page now reads as the same product.
   ──────────────────────────────────────────────────────────── */
const AMBER = "hsl(38,95%,58%)";
const PURPLE = "hsl(262,70%,60%)";
const CYAN = "hsl(196,85%,52%)";
const TEAL = "hsl(160,70%,45%)";
const CORAL = "hsl(18,80%,63%)";

const PAGE_BG =
  "linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)";
/* Each session card gets the next accent, so the list reads as chapters. */
const SESSION_ACCENTS = [AMBER, PURPLE, CYAN, TEAL, CORAL];
const TAG_DOT = [AMBER, PURPLE, CYAN, TEAL, CORAL];

/* Shared with /build so scarcity + date stay in sync. */
const SEATS_LEFT = 4;
const COHORT_LABEL = "18 September";

/* Prisma atmosphere (media only) — same blend as the /build hero. */
const PRISMA_BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";
const PRISMA_BG_POSTER = "/hero/prisma-bg.jpg";

const CTA_AI_TOOLS = [
  {
    name: "Cursor",
    src: "/ai-tools/cursor.svg",
    className: "left-[4%] top-[18%] lg:left-[8%]",
    float: "hero-tool-float",
  },
  {
    name: "Claude",
    src: "/ai-tools/claude.svg",
    className: "right-[4%] top-[16%] lg:right-[8%]",
    float: "hero-tool-float hero-tool-float-late",
  },
  {
    name: "Codex",
    src: "/ai-tools/codex.svg",
    className: "left-[6%] bottom-[18%] lg:left-[10%]",
    float: "hero-tool-float hero-tool-float-mid",
  },
  {
    name: "Grokbot",
    src: "/ai-tools/grokbot.svg",
    className: "right-[5%] bottom-[16%] lg:right-[9%]",
    float: "hero-tool-float hero-tool-float-last",
  },
] as const;

const scrollBuildToTop = () => {
  const toTop = () => {
    window.scrollTo(0, 0);
    document.getElementById("root")?.scrollTo(0, 0);
  };
  toTop();
  requestAnimationFrame(() => requestAnimationFrame(toTop));
};

/* Eyebrow — section label with a small accent dot, same as /build. */
const Eyebrow = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <p className="inline-flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/75">
    <span
      aria-hidden
      className="h-[7px] w-[7px] shrink-0 rounded-full"
      style={{
        background: color ?? AMBER,
        boxShadow: `0 0 0 3px ${color ?? AMBER}22`,
      }}
    />
    {children}
  </p>
);

const formatDate = (iso: string): string => {
  try {
    return format(parseISO(iso), "MMMM d, yyyy");
  } catch {
    return iso;
  }
};

const Community: React.FC = () => {
  useSEO({
    title: "Community Webinars — Weekly Sessions | Mentorna®",
    description:
      "Watch recordings of Mentorna's weekly community webinars on AI tools, coding, pitching, and entrepreneurship.",
    canonical: "https://mentorna.com/community",
  });

  useEffect(() => {
    void flushRetryQueue();
  }, []);

  const webinars = useMemo(() => getPublishedWebinars(), []);

  return (
    <div
      className="min-h-screen font-body text-[hsl(0,0%,10%)]"
      style={{ background: PAGE_BG }}
    >
      {/* ══ HERO ══
          Quiet editorial opener — no slab of yellow, just the cream canvas,
          the Mentorna wordmark, and a light heading over a warm glow. */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-96 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(232,168,90,0.35), transparent 68%)",
          }}
        />
        <nav className="relative mx-auto flex max-w-5xl items-center px-6 py-6 md:px-8 md:py-8">
          <Link
            to="/"
            className="font-heading text-[19px] font-normal tracking-[0.06em] text-[hsl(0,0%,10%)] transition-opacity hover:opacity-60"
          >
            Mentorna®
          </Link>
        </nav>

        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-10 text-center md:pb-24 md:pt-16">
          <Eyebrow color={AMBER}>The weekly sessions</Eyebrow>
          <h1 className="mt-4 font-heading text-[2.6rem] font-normal leading-[1.06] tracking-tight md:text-6xl">
            Community webinars.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-heading text-lg font-normal leading-relaxed text-[hsl(0,0%,10%)]/85 md:text-xl">
            Every week we go live on AI tools, building, pitching, and shipping.
            Catch up on past sessions here.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 md:px-8 md:pb-20">
        {webinars.length === 0 ? (
          <div className="rounded-[22px] bg-black/90 px-10 py-16 text-center shadow-[0_30px_70px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
            <PlayCircle className="mx-auto mb-4 h-12 w-12 text-[#F7E9D6]/70" />
            <p className="font-heading text-xl font-light tracking-tight text-[#F7E9D6]">
              No webinars published yet
            </p>
            <p className="mt-2 font-heading text-sm font-light text-[#F7E9D6]/60">
              Recordings will appear here after each weekly session.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 flex items-center justify-between md:mb-14">
              <Eyebrow color={CYAN}>All sessions</Eyebrow>
              <p className="font-heading text-base font-normal tabular-nums text-[hsl(0,0%,10%)]/75">
                {webinars.length}{" "}
                {webinars.length === 1 ? "recording" : "recordings"}
              </p>
            </div>

            <ol className="space-y-10 md:space-y-14">
              {webinars.map((webinar, i) => {
                const accent = SESSION_ACCENTS[i % SESSION_ACCENTS.length];
                return (
                  <li key={webinar.id}>
                    <article
                      className="relative flex flex-col overflow-hidden rounded-[28px] px-5 py-8 shadow-[0_28px_70px_-36px_rgba(60,30,10,0.35)] ring-1 md:px-8 md:py-11"
                      style={{
                        background: [
                          `radial-gradient(ellipse 95% 70% at 8% -5%, color-mix(in srgb, ${accent} 48%, transparent), transparent 58%)`,
                          `radial-gradient(ellipse 55% 55% at 100% 95%, color-mix(in srgb, ${accent} 24%, transparent), transparent 55%)`,
                          `linear-gradient(165deg, #FFFCFA 0%, color-mix(in srgb, ${accent} 10%, #F7E9D6) 48%, color-mix(in srgb, ${accent} 14%, #E8D0B4) 100%)`,
                        ].join(", "),
                        boxShadow: `0 28px 70px -36px color-mix(in srgb, ${accent} 28%, rgba(60,30,10,0.35)), 0 0 0 1px color-mix(in srgb, ${accent} 22%, transparent)`,
                      }}
                    >
                      {/* Soft chapter wash behind the player */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full blur-3xl md:top-28"
                        style={{
                          background: `color-mix(in srgb, ${accent} 35%, transparent)`,
                        }}
                      />

                      {/* Session heading block */}
                      <div dir={webinar.dir ?? "ltr"} className="relative mb-8">
                        <Eyebrow color={accent}>
                          Session {String(webinars.length - i).padStart(2, "0")}
                        </Eyebrow>
                        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                          <h2 className="max-w-2xl font-heading text-[1.65rem] font-normal leading-[1.12] tracking-tight md:text-4xl">
                            {webinar.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-heading text-[15px] font-normal text-[hsl(0,0%,10%)]/70 md:pb-1">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="h-4 w-4" />
                              {formatDate(webinar.date)}
                            </span>
                            {webinar.durationSeconds ? (
                              <span className="inline-flex items-center gap-1.5 tabular-nums">
                                <Clock className="h-4 w-4" />
                                {formatRuntime(webinar.durationSeconds)}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div
                          aria-hidden
                          className="mt-6 h-px w-full"
                          style={{
                            background: `linear-gradient(to right, ${accent}, transparent 62%)`,
                          }}
                        />
                      </div>

                      <div
                        className="relative rounded-[22px]"
                        style={{
                          boxShadow: `0 24px 48px -12px color-mix(in srgb, ${accent} 35%, transparent), 0 0 0 1px color-mix(in srgb, ${accent} 40%, transparent)`,
                        }}
                      >
                        <WebinarPlayer webinar={webinar} />
                      </div>

                      <div dir={webinar.dir ?? "ltr"} className="relative mt-9">
                        {webinar.tags && webinar.tags.length > 0 ? (
                          <ul className="mb-5 flex flex-wrap gap-x-3 gap-y-2">
                            {webinar.tags.map((tag, t) => (
                              <li
                                key={tag}
                                className="inline-flex items-center gap-2 rounded-full border bg-[hsl(0,0%,100%)]/50 px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(0,0%,10%)]/80"
                                style={{
                                  borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`,
                                }}
                              >
                                <span
                                  aria-hidden
                                  className="h-[6px] w-[6px] rounded-full"
                                  style={{
                                    background: TAG_DOT[t % TAG_DOT.length],
                                  }}
                                />
                                {tag}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <p
                          className="session-lede font-heading text-[17px] font-normal leading-[1.75] text-[hsl(0,0%,10%)]/88 md:text-[19px]"
                          style={
                            {
                              ["--lede-accent" as string]: accent,
                            } as React.CSSProperties
                          }
                        >
                          {webinar.description}
                        </p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </main>

      {/* ══ COHORT CTA ══
          Mini /build hero: Prisma atmosphere, floating AI workers, centered
          light type and a white pill CTA. Full-bleed so it reads as the next
          chapter, not a card ad. */}
      <section className="relative isolate mt-8 overflow-hidden text-white md:mt-12">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={PRISMA_BG_POSTER}
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            src={PRISMA_BG_VIDEO}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(58,36,24,0.55) 0%, rgba(26,16,16,0.4) 42%, rgba(12,10,11,0.82) 100%)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 18%, rgba(232,168,90,0.45), transparent 62%)",
            }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.28] mix-blend-overlay" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[38%]"
          style={{
            background:
              "linear-gradient(to top, #0c0a0b 0%, rgba(28,16,14,0.75) 40%, transparent 100%)",
            filter: "blur(1.5px)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
        >
          {CTA_AI_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className={`${tool.float} absolute ${tool.className}`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.15rem] bg-white/[0.08] shadow-[0_20px_60px_-18px_rgba(0,0,0,0.75)] ring-1 ring-white/20 backdrop-blur-md lg:h-[4.5rem] lg:w-[4.5rem]">
                <img
                  src={tool.src}
                  alt=""
                  className="h-8 w-8 lg:h-9 lg:w-9"
                />
              </div>
              <p className="mt-2 text-center font-heading text-[10px] font-medium tracking-[0.14em] text-white/50">
                {tool.name}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
            For 9-to-5 domain experts · Live · Fully remote · 4 weeks · 10 seats
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-[2.15rem] font-light leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            Go from idea to{" "}
            <span style={{ color: AMBER }}>reality.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-heading text-base font-light leading-relaxed text-white/65 md:text-lg">
            Live and designed for people with a full schedule. Four weeks with AI
            teammates, to a product people pay for.
          </p>

          <div className="mt-8">
            <Link
              to="/build"
              onClick={scrollBuildToTop}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium tracking-wide text-[hsl(0,0%,8%)] transition-colors hover:bg-white/90 md:min-h-[3.25rem] md:px-9 md:text-base"
            >
              Explore the 0→1 cohort
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <p className="mt-3 text-sm font-light text-white/45">
            <span style={{ color: AMBER }}>{SEATS_LEFT}</span> seats left in the{" "}
            {COHORT_LABEL} cohort.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
