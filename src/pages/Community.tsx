import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, PlayCircle } from "lucide-react";
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

/* Eyebrow — section label with a small accent dot, same as /build. */
const Eyebrow = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <p className="inline-flex items-center gap-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/60">
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
        <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-6 md:px-8 md:py-8">
          <Link
            to="/"
            className="font-heading text-[17px] font-light tracking-[0.06em] text-[hsl(0,0%,10%)] transition-opacity hover:opacity-60"
          >
            Mentorna®
          </Link>
          <Link
            to="/"
            className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/60 transition-opacity hover:opacity-80"
          >
            Home
          </Link>
        </nav>

        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-10 text-center md:pb-24 md:pt-16">
          <Eyebrow color={AMBER}>The weekly sessions</Eyebrow>
          <h1 className="mt-4 font-heading text-[2.5rem] font-light leading-[1.06] tracking-tight md:text-6xl">
            Community webinars.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/70 md:text-lg">
            Every week we go live on AI tools, building, pitching, and shipping.
            Catch up on past sessions here.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 md:px-8">
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
              <p className="font-heading text-sm font-light tabular-nums text-[hsl(0,0%,10%)]/55">
                {webinars.length}{" "}
                {webinars.length === 1 ? "recording" : "recordings"}
              </p>
            </div>

            <ol className="space-y-20 md:space-y-28">
              {webinars.map((webinar, i) => {
                const accent = SESSION_ACCENTS[i % SESSION_ACCENTS.length];
                return (
                  <li key={webinar.id}>
                    <article className="flex flex-col">
                      {/* Session heading block */}
                      <div
                        dir={webinar.dir ?? "ltr"}
                        className="mb-7 max-w-2xl"
                      >
                        <Eyebrow color={accent}>
                          Session {String(webinars.length - i).padStart(2, "0")}
                        </Eyebrow>
                        <h2 className="mt-3 font-heading text-2xl font-light leading-[1.15] tracking-tight md:text-4xl">
                          {webinar.title}
                        </h2>
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
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

                      {/* Player */}
                      <WebinarPlayer webinar={webinar} />

                      {/* Body copy */}
                      <div
                        dir={webinar.dir ?? "ltr"}
                        className="mt-7 max-w-2xl"
                      >
                        {webinar.tags && webinar.tags.length > 0 ? (
                          <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
                            {webinar.tags.map((tag, t) => (
                              <li
                                key={tag}
                                className="inline-flex items-center gap-2 font-heading text-[11px] font-medium uppercase tracking-[0.18em] text-[hsl(0,0%,10%)]/55"
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
                        <p className="font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-[15px]">
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

      <Footer />
    </div>
  );
};

export default Community;
