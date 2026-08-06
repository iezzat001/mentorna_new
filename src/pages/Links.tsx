import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Compass,
  ExternalLink,
  Instagram,
  Linkedin,
  MessageCircle,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

const INK = "hsl(0,0%,10%)";
const PURPLE = "hsl(262,70%,60%)";
const PINK = "hsl(322,80%,62%)";
const AMBER = "hsl(38,95%,58%)";
const CYAN = "hsl(196,85%,52%)";
const TEAL = "hsl(160,70%,45%)";
const PAGE_BG =
  "linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 42%,#F6E5D2 72%,#EFDAC2 100%)";

const PROFILE_IMAGE =
  "https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png";
const WHATSAPP_NUMBER = "358414819241";

const brutal =
  "border-[3px] border-[hsl(0,0%,10%)] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]";

const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type InAppBrowser = {
  isInstagram: boolean;
  isAndroid: boolean;
  isIOS: boolean;
};

const detectInAppBrowser = (): InAppBrowser => {
  if (typeof navigator === "undefined") {
    return { isInstagram: false, isAndroid: false, isIOS: false };
  }

  const userAgent = navigator.userAgent;
  return {
    isInstagram: /Instagram/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
  };
};

const getExternalBrowserUrl = ({ isAndroid, isIOS }: InAppBrowser) => {
  const destination = new URL(window.location.href);
  destination.searchParams.set("_external", "1");
  const destinationUrl = destination.toString();

  if (isIOS) {
    return `instagram://extbrowser/?url=${encodeURIComponent(destinationUrl)}`;
  }

  if (isAndroid) {
    const intentTarget = `${destination.host}${destination.pathname}${destination.search}${destination.hash}`;
    return `intent://${intentTarget}#Intent;scheme=${destination.protocol.replace(
      ":",
      ""
    )};S.browser_fallback_url=${encodeURIComponent(destinationUrl)};end`;
  }

  return destinationUrl;
};

const Links = () => {
  const browser = useMemo(detectInAppBrowser, []);
  const [showBrowserNotice, setShowBrowserNotice] = useState(browser.isInstagram);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Ahmed Ezzat | Mentorna";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (!browser.isInstagram) return;

    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.get("_external") === "1") return;

    const timer = window.setTimeout(() => {
      window.location.href = getExternalBrowserUrl(browser);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [browser]);

  const openExternally = () => {
    window.location.href = getExternalBrowserUrl(browser);
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] text-[hsl(0,0%,10%)]"
      style={{ background: PAGE_BG }}
    >
      <style>{`
        @keyframes linkFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(12px, -18px, 0) scale(1.04); }
        }
        @keyframes linkEnter {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .links-blob { animation: linkFloat 12s ease-in-out infinite; }
        .links-enter { animation: linkEnter .65s ease-out both; }
        .links-enter-2 { animation-delay: .08s; }
        .links-enter-3 { animation-delay: .16s; }
        .links-enter-4 { animation-delay: .24s; }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,.18) 1.2px, transparent 1.2px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        aria-hidden
        className="links-blob pointer-events-none fixed -left-28 top-32 h-72 w-72 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: PURPLE }}
      />
      <div
        aria-hidden
        className="links-blob pointer-events-none fixed -right-32 top-[42%] h-72 w-72 rounded-full opacity-[0.16] blur-3xl"
        style={{ background: CYAN, animationDelay: "-4s" }}
      />

      {showBrowserNotice && (
        <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
          <div
            className={`${brutal} mx-auto max-w-md bg-[hsl(0,0%,10%)] p-3 text-white`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: AMBER }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold uppercase tracking-wide">
                  Open in your real browser
                </p>
                <p className="mt-1 text-[11px] font-medium leading-relaxed text-white/65">
                  For reliable booking and checkout, continue in Safari or your
                  default browser.
                </p>
                <button
                  type="button"
                  onClick={openExternally}
                  className="mt-2 inline-flex min-h-10 items-center gap-1.5 border-2 border-white bg-white px-3 py-2 text-xs font-extrabold uppercase text-[hsl(0,0%,10%)]"
                >
                  Open browser <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowBrowserNotice(false)}
                aria-label="Dismiss browser notice"
                className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-white/30"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto w-full max-w-[480px] px-4 pb-12">
        <header className="links-enter pb-7 pt-8 text-center">
          <div className="relative mx-auto mb-4 w-fit">
            <div
              className="absolute -inset-2 rotate-3 rounded-full border-[3px] border-[hsl(0,0%,10%)]"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
            />
            <img
              src={PROFILE_IMAGE}
              alt="Ahmed Ezzat"
              className="relative h-24 w-24 rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-white object-cover"
            />
            <div
              className="absolute -bottom-1 -right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)]"
              style={{ background: TEAL }}
              aria-label="Verified"
            >
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          </div>

          <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.24em] opacity-55">
            Mentorna®
          </p>
          <h1 className="text-3xl font-extrabold leading-none">Ahmed Ezzat</h1>
          <p className="mx-auto mt-3 max-w-[330px] text-sm font-semibold leading-relaxed opacity-70">
            I help founders find clarity, build with AI, and turn ideas into
            businesses people pay for.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <a
              href="https://www.instagram.com/ahmed.ezzat.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ahmed Ezzat on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmedezzat001"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ahmed Ezzat on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </header>

        <section className="links-enter links-enter-2 mb-7">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-45">
                Work with me
              </p>
              <h2 className="mt-1 text-xl font-extrabold uppercase">
                1:1 Mentorship
              </h2>
            </div>
            <Sparkles className="h-5 w-5" style={{ color: PURPLE }} />
          </div>

          <a
            href="/mentorship"
            className={`${brutal} group block overflow-hidden bg-[hsl(0,0%,10%)] text-white transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <div
              className="relative min-h-[196px] overflow-hidden p-6"
              style={{
                background: `linear-gradient(135deg, ${PURPLE} 0%, ${PINK} 100%)`,
              }}
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10"
              />
              <div className="relative flex h-full flex-col">
                <span className="w-fit border-2 border-white/40 bg-white/15 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-sm">
                  Flagship · 3 months
                </span>
                <Rocket className="mt-5 h-8 w-8" />
                <h3 className="mt-3 text-2xl font-extrabold uppercase leading-[1.02]">
                  Build your path.
                  <br />
                  Ship real work.
                </h3>
                <p className="mt-3 max-w-[300px] text-sm font-semibold leading-relaxed text-white/80">
                  Personal strategy, hands-on execution, and direct support
                  designed around your goals.
                </p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-2xl font-extrabold leading-none">$2,500</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-white/60">
                    24 sessions · 90 min each
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t-2 border-white/30 pt-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    Explore mentorship
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border-2 border-white bg-white text-[hsl(0,0%,10%)] transition-transform group-active:translate-x-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </section>

        <section className="links-enter links-enter-3 mb-7">
          <div className="mb-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-45">
              Need one focused answer?
            </p>
            <h2 className="mt-1 text-xl font-extrabold uppercase">
              1:1 Consultation
            </h2>
          </div>

          <a
            href={whatsappUrl(
              "Hi Ahmed, I’d like to book the €99 Clarity Session (90-minute 1:1 call)."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`${brutal} group block bg-[linear-gradient(145deg,#FFF8E6,#F5D18E)] p-5 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center border-[3px] border-[hsl(0,0%,10%)]"
                style={{ background: AMBER }}
              >
                <Compass className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-extrabold uppercase leading-tight">
                    Clarity Session
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-active:translate-x-1" />
                </div>

                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-2xl font-extrabold leading-none">€99</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide opacity-55">
                    90-minute call
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold leading-relaxed opacity-65">
                  One focused call to unpack your challenge and leave with a
                  practical next-step plan.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Business", "Product", "AI"].map((item) => (
                    <span
                      key={item}
                      className="border-2 border-[hsl(0,0%,10%)] bg-white/60 px-2 py-1 text-[10px] font-extrabold uppercase"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        </section>

        <section className="links-enter links-enter-3 mb-7">
          <div className="mb-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-45">
              Learn by doing
            </p>
            <h2 className="mt-1 text-xl font-extrabold uppercase">Workshop</h2>
          </div>

          <a
            href="/workshop"
            className={`${brutal} group block overflow-hidden bg-[linear-gradient(145deg,#DFF5FA,#9EE3F0)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span
                  className="border-2 border-[hsl(0,0%,10%)] px-2.5 py-1 text-[10px] font-extrabold uppercase"
                  style={{ background: CYAN }}
                >
                  Live & hands-on
                </span>
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold uppercase leading-[1.04]">
                From idea to
                <br />
                working prototype
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed opacity-65">
                Build, test, and ship with AI alongside founders and creators.
                No theory marathon.
              </p>
              <div className="mt-5 flex items-center justify-between border-t-[3px] border-[hsl(0,0%,10%)] pt-4">
                <span className="flex items-center gap-2 text-xs font-extrabold uppercase">
                  <CalendarDays className="h-4 w-4" /> View workshop
                </span>
                <ChevronRight className="h-5 w-5 transition-transform group-active:translate-x-1" />
              </div>
            </div>
          </a>
        </section>

        <section className="links-enter links-enter-4 mb-7">
          <div className="mb-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-45">
              Learn, connect, grow
            </p>
            <h2 className="mt-1 text-xl font-extrabold uppercase">Community</h2>
          </div>

          <a
            href="https://tally.so/r/OD5dvY"
            target="_blank"
            rel="noopener noreferrer"
            className={`${brutal} group block overflow-hidden bg-[linear-gradient(145deg,#DDF5E9,#8FDCB8)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <div className="relative p-5">
              <div
                aria-hidden
                className="absolute -bottom-16 -right-12 h-44 w-44 rounded-full border-[18px] border-white/25"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="border-2 border-[hsl(0,0%,10%)] px-2.5 py-1 text-[10px] font-extrabold uppercase"
                    style={{ background: TEAL }}
                  >
                    Free to join
                  </span>
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold uppercase leading-[1.04]">
                  Join My AI &amp;
                  <br />
                  Entrepreneurship Society
                </h3>
                <p className="mt-3 max-w-[320px] text-sm font-semibold leading-relaxed opacity-65">
                  Practical AI insights, workshops, opportunities, and honest
                  conversations with ambitious builders.
                </p>
                <div className="mt-5 flex items-center justify-between border-t-[3px] border-[hsl(0,0%,10%)] pt-4">
                  <span className="flex items-center gap-2 text-xs font-extrabold uppercase">
                    <Users className="h-4 w-4" /> Join the society
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-active:translate-x-1" />
                </div>
              </div>
            </div>
          </a>
        </section>

        <section className="links-enter links-enter-4 mb-8">
          <div className="mb-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-45">
              Real people. Real outcomes.
            </p>
            <h2 className="mt-1 text-xl font-extrabold uppercase">
              Testimonials
            </h2>
          </div>

          <a
            href="/testimonials"
            className={`${brutal} group block bg-[linear-gradient(150deg,#FFFBF4,#F4DDC2)] p-5 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <Quote className="h-8 w-8 opacity-25" fill="currentColor" />
            <blockquote className="mt-2 text-lg font-extrabold leading-snug">
              “This was perhaps the most interesting workshop I have ever
              attended during the last 40 years.”
            </blockquote>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <div className="mb-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4"
                      style={{ color: INK, fill: AMBER }}
                    />
                  ))}
                </div>
                <p className="text-xs font-extrabold">Matti Tuominen</p>
                <p className="text-[10px] font-semibold opacity-50">
                  Senior Advisor at Zadam Oy
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border-[3px] border-[hsl(0,0%,10%)] bg-[hsl(0,0%,10%)] text-white transition-transform group-active:translate-x-1">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </a>
        </section>

        <a
          href={whatsappUrl("Hi Ahmed, I have a question about Mentorna.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2 border-[3px] border-[hsl(0,0%,10%)] bg-[hsl(0,0%,10%)] px-5 py-4 text-sm font-extrabold uppercase text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.22)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <MessageCircle className="h-5 w-5" style={{ color: TEAL }} />
          Not sure? Message me
        </a>

        <footer className="pb-4 pt-9 text-center">
          <p className="text-sm font-extrabold">Mentorna®</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-40">
            Build what matters
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Links;
