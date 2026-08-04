import React, { useState, useEffect, useRef } from "react";
import { Check, Lock, ExternalLink, Clock, ArrowRight, Zap, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ────────────────────────────────────────────────────────────
   Design tokens
   ──────────────────────────────────────────────────────────── */
const INK = "hsl(0,0%,10%)";
const PURPLE = "hsl(262,70%,60%)";
const PINK = "hsl(322,80%,62%)";
const AMBER = "hsl(38,95%,58%)";
const TEAL = "hsl(160,70%,45%)";
const BLUE = "hsl(210,85%,60%)";

const brutal = "border-4 border-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
const brutalLg = "border-4 border-[hsl(0,0%,10%)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]";

/* ────────────────────────────────────────────────────────────
   Scroll reveal
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
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Count-up number
   ──────────────────────────────────────────────────────────── */
const CountUp = ({ to, prefix = "", duration = 1400 }: { to: number; prefix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
    </span>
  );
};

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */
const VALUE_STACK = [
  { item: "Stock clearance & sales campaign", detail: "Pricing, bundles, launch offers, channel activation", value: 2000 },
  { item: "Sales & growth engine", detail: "Documented, repeatable — yours to keep forever", value: 3000 },
  { item: "Brand positioning + GCC → international roadmap", detail: "Story, visual direction, expansion plan", value: 2500 },
  { item: "Grant proposal + financial projections", detail: "Built to submission standard, fully reviewed", value: 3500 },
  { item: "12 weekly 1:1 sessions + async access", detail: "Direct line to Ahmed, Mon–Fri within 24h", value: 4800 },
];
const CORE_TOTAL = 15800;

const BONUSES = [
  { icon: "🤖", title: "AI Marketing & Ops Toolkit", desc: "Prompt library + workflows to run marketing, content and admin at a fraction of the time.", value: 600 },
  { icon: "📁", title: "Grant & Proposal Template Library", desc: "The exact templates, financial models and structures that get proposals funded.", value: 450 },
  { icon: "🔄", title: "30-Day Post-Program Check-In", desc: "A follow-up session after the program to course-correct and keep momentum.", value: 500 },
];
const BONUS_TOTAL = 1550;
const GRAND_TOTAL = CORE_TOTAL + BONUS_TOTAL;
const PRICE = 2500;

const TIME_ANSWERS = [
  { icon: Clock, title: "60–90 min / week", desc: "One focused session. That's the whole time commitment. Built around your schedule, not mine." },
  { icon: MessageCircle, title: "Never stuck waiting", desc: "Async support Mon–Fri, replies within 24h. You don't lose a week because you hit a wall on Tuesday." },
  { icon: Zap, title: "Done WITH you, not assigned to you", desc: "We build the plans, decks and proposals together on the call — you don't leave with homework piles." },
  { icon: Sparkles, title: "AI does the heavy lifting", desc: "We automate the slow parts — content, research, admin — so your hours go to decisions, not busywork." },
];

const TRANSFORM = [
  { now: "Stock sitting unsold, cash tied up", then: "Stock cleared, cash back in the business" },
  { now: "Selling in bursts, no system", then: "A repeatable engine you can run alone" },
  { now: "Brand known only locally", then: "GCC positioning + international roadmap" },
  { now: "Grant plan stuck as a draft proposal", then: "Submitted, reviewed, funding-ready" },
];

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const JaidaOffer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showBar, setShowBar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    company: "",
    signature: "",
    agree1: false,
    agree2: false,
    agree3: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerStatus, setOfferStatus] = useState<"loading" | "active" | "expired">("loading");

  useEffect(() => {
    const checkOffer = async () => {
      const { data } = await supabase
        .from("offer_settings")
        .select("is_active, expires_at")
        .eq("slug", "jaida_business_growth")
        .single();

      if (data) {
        const isExpired = data.expires_at ? new Date(data.expires_at) < new Date() : false;
        setOfferStatus(data.is_active && !isExpired ? "active" : "expired");
      } else {
        setOfferStatus("active");
      }
    };
    checkOffer();
  }, []);

  // Sticky price bar after hero
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const scrollToForm = () => document.getElementById("secure-spot")?.scrollIntoView({ behavior: "smooth" });

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (passcode === "2500") {
      setIsAuthenticated(true);
    } else {
      setError("Invalid passcode. Please try again.");
      setPasscode("");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("signed_contracts").insert({
        full_name: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        address: formData.company,
        signature: formData.signature,
        offer_type: "jaida_business_growth",
        total_amount: 2500,
        currency: "USD",
        installment_amount: 2500,
        installments_count: 1,
        agreed_terms: {
          deliverables_commitment: formData.agree1,
          sessions_commitment: formData.agree2,
          payment_agreement: formData.agree3,
        },
        status: "pending",
      });
      if (error) throw error;
      toast.success("Contract signed successfully!");
      alert(
        `Thank you, ${formData.fullName}! 🎉\n\nYour enrollment has been received. Ahmed will be in touch shortly to kick things off.`
      );
    } catch (err) {
      console.error("Error saving contract:", err);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Passcode gate ── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,10%)] font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${PURPLE}55, transparent 45%), radial-gradient(circle at 80% 70%, ${PINK}44, transparent 45%), radial-gradient(circle at 50% 100%, ${AMBER}33, transparent 40%)`,
          }}
        />
        <div className={`relative bg-white ${brutalLg} p-8 md:p-12 max-w-md w-full text-center`}>
          <div
            className="w-16 h-16 border-4 border-[hsl(0,0%,10%)] rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-2">Private Offer</h1>
          <p className="text-sm font-medium opacity-70 mb-8">Enter the passcode to access this exclusive offer</p>
          <form onSubmit={handlePasscodeSubmit}>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit passcode"
              className="w-full p-4 text-center text-2xl font-bold tracking-[0.5em] border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none mb-4"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              autoFocus
            />
            {error && <p className="text-red-600 font-semibold text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={passcode.length !== 4}
              className="w-full py-4 px-8 text-lg font-extrabold uppercase text-white border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
            >
              Unlock Offer
            </button>
          </form>
          <p className="text-xs font-medium opacity-50 mt-6">Mentorna® | Exclusive Access</p>
        </div>
      </div>
    );
  }

  if (offerStatus === "loading") {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold text-[hsl(0,0%,40%)]">Loading...</div>
      </div>
    );
  }

  if (offerStatus === "expired") {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-5">
        <div className={`bg-white ${brutalLg} p-10 md:p-14 max-w-md w-full text-center`}>
          <div className="w-16 h-16 bg-[hsl(0,0%,90%)] border-4 border-[hsl(0,0%,10%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-[hsl(0,0%,40%)]" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-3">Offer Expired</h1>
          <p className="font-medium text-[hsl(0,0%,45%)] leading-relaxed">
            This offer was valid for 48 hours and is no longer available.
            <br />
            <br />
            If you'd like to discuss a new arrangement, feel free to reach out directly.
          </p>
          <a
            href="https://wa.me/358414819241"
            className="inline-block mt-8 py-3 px-8 font-extrabold uppercase text-white border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
          >
            Contact Ahmed
          </a>
          <p className="text-xs font-medium opacity-40 mt-8">Mentorna® | Exclusive Access</p>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="min-h-screen bg-[hsl(40,30%,97%)] font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
      <style>{`
        @keyframes floatBlob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(.95)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .blob { animation: floatBlob 14s ease-in-out infinite; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <header className="relative bg-[hsl(0,0%,10%)] border-b-4 border-[hsl(0,0%,10%)] overflow-hidden">
        <div
          className="blob absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl"
          style={{ background: PURPLE }}
        />
        <div
          className="blob absolute top-10 right-0 w-[380px] h-[380px] rounded-full opacity-40 blur-3xl"
          style={{ background: PINK, animationDelay: "3s" }}
        />
        <div
          className="blob absolute -bottom-20 left-1/3 w-[340px] h-[340px] rounded-full opacity-30 blur-3xl"
          style={{ background: AMBER, animationDelay: "6s" }}
        />

        <div className="relative max-w-4xl mx-auto px-5 py-14 md:py-20 text-center">
          <div className="text-lg font-light tracking-[3px] mb-6 text-white/80">Mentorna®</div>

          <span
            className="inline-block text-white text-xs font-extrabold uppercase py-2 px-4 border-2 border-white/40 mb-6 tracking-wider backdrop-blur"
            style={{ background: "rgba(255,255,255,.1)" }}
          >
            ✦ Exclusive 1:1 Program · Prepared for Jaida
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-[0.95] mb-5 text-white">
            Business Revival
            <br />
            <span
              style={{
                background: `linear-gradient(90deg, ${AMBER}, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              & Growth Program
            </span>
          </h1>

          <p className="text-lg md:text-xl font-semibold text-white/80 max-w-2xl mx-auto">
            90 days to clear your stock, build a sales engine that runs without you, and turn your manufacturing
            plan into a funded reality.
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-10 max-w-2xl mx-auto">
            {[
              { v: "90", l: "Days", c: AMBER },
              { v: "60–90", l: "Min / week", c: TEAL },
              { v: "$17.3K", l: "Total value", c: PINK },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 backdrop-blur border-2 border-white/30 p-3 md:p-4">
                <div className="text-2xl md:text-4xl font-extrabold" style={{ color: s.c }}>
                  {s.v}
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/70 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToForm}
            className="mt-10 inline-flex items-center gap-2 py-4 px-8 text-base md:text-lg font-extrabold uppercase text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.25)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
          >
            Claim Your Spot <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Marquee */}
        <div className="relative border-t-2 border-white/20 py-3 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite", width: "max-content" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex">
                {["Stock Cleared", "Sales Engine Built", "Brand Positioned", "Grant Submitted", "GCC → International", "Funding Ready"].map(
                  (t, i) => (
                    <span key={`${dup}-${i}`} className="mx-6 text-sm font-extrabold uppercase tracking-widest text-white/50">
                      ✦ {t}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 48-hour notice */}
      <div className="bg-[hsl(0,0%,10%)] text-center py-3 px-5 border-b-4 border-[hsl(0,0%,10%)]">
        <p className="text-sm font-bold text-white">
          ⏳ This offer is valid for <span style={{ color: AMBER }}>48 hours</span> only.
        </p>
      </div>

      <main className="max-w-3xl mx-auto px-5 py-10">
        {/* ═══ TRANSFORMATION ═══ */}
        <Reveal>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6">
              Where you are <span className="opacity-40">→</span> where you'll be
            </h2>
            <div className={`${brutalLg} overflow-hidden`}>
              <div className="grid grid-cols-2">
                <div className="bg-[hsl(0,0%,90%)] p-4 border-r-4 border-[hsl(0,0%,10%)]">
                  <span className="text-xs font-extrabold uppercase tracking-widest opacity-60">Today</span>
                </div>
                <div className="p-4" style={{ background: TEAL }}>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-white">In 90 days</span>
                </div>
              </div>
              {TRANSFORM.map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-t-4 border-[hsl(0,0%,10%)]">
                  <div className="bg-white p-4 border-r-4 border-[hsl(0,0%,10%)] font-medium text-sm opacity-60 line-through decoration-2">
                    {row.now}
                  </div>
                  <div className="bg-white p-4 font-bold text-sm flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                    {row.then}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ═══ PROMISE ═══ */}
        <Reveal>
          <div className={`bg-white ${brutalLg} p-8 mb-12`}>
            <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">
              The Promise
            </h2>
            <p className="text-xl font-semibold leading-relaxed">
              In 90 days, you'll go from "reviving the business" to{" "}
              <span className="text-white px-1.5 py-0.5" style={{ background: `linear-gradient(120deg, ${PURPLE}, ${PINK})` }}>
                a business that's selling, growing, and fundable.
              </span>{" "}
              We'll clear your existing kids' stock, build your sales &amp; brand engine, and take your sanitary pad
              manufacturing plan from proposal to grant-ready.
            </p>
          </div>
        </Reveal>

        {/* ═══ TIME OBJECTION ═══ */}
        <Reveal>
          <section className="mb-12">
            <div className={`bg-[hsl(0,0%,10%)] ${brutalLg} p-8`}>
              <span
                className="inline-block text-white text-xs font-extrabold uppercase py-1.5 px-3 mb-4 tracking-wider"
                style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
              >
                Let's address the real question
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-3 text-white">
                "I don't have time for this."
              </h2>
              <p className="font-semibold text-white/70 mb-7 leading-relaxed">
                You're running a business, not looking for a course to fall behind on. This program is designed around
                that reality — it gives you time back, it doesn't take it.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {TIME_ANSWERS.map((t, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur border-2 border-white/25 p-5">
                    <t.icon className="w-6 h-6 mb-3" style={{ color: AMBER }} />
                    <h3 className="font-extrabold uppercase text-sm mb-2 text-white">{t.title}</h3>
                    <p className="text-sm font-medium text-white/65 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ WHAT YOU GET ═══ */}
        <section className="mb-12">
          <Reveal>
            <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">
              What You Get
            </h2>
          </Reveal>
          {[
            {
              icon: "📦",
              title: "Stock Clearance & Sales",
              color: "hsl(262,55%,92%)",
              items: [
                "Sell out your existing kids' products — pricing, bundles & launch offers",
                "Sales channels & campaigns activated (WhatsApp, Instagram, marketplaces)",
                "Weekly revenue targets with clear tracking",
              ],
            },
            {
              icon: "📈",
              title: "Sales & Growth Engine",
              color: "hsl(210,75%,88%)",
              items: [
                "Repeatable customer acquisition system you can run alone",
                "Funnel, follow-up & conversion processes documented",
                "AI-assisted marketing, content & operations — leveraging the tools you already use",
              ],
            },
            {
              icon: "🌍",
              title: "Regional & International Brand Building",
              color: "hsl(160,50%,85%)",
              items: [
                "Clear brand positioning, story & visual direction",
                "GCC-first growth plan, then an international expansion roadmap",
                "Social presence & content strategy to build a known brand",
              ],
            },
            {
              icon: "📝",
              title: "Grant & Funding Readiness",
              color: "hsl(45,95%,85%)",
              items: [
                "Business plan & proposal finalised to submission standard",
                "Financial projections & use-of-funds built cleanly",
                "Grant application strategy & full review before you submit",
              ],
            },
            {
              icon: "🛠️",
              title: "Structure, Focus & Accountability",
              color: "hsl(322,70%,92%)",
              items: [
                "Weekly 1:1 sessions + async support (response within 24 hours, Mon–Fri)",
                "Simple planning & decision frameworks built around how you work",
                "A priority system so you stay focused on what moves the needle",
              ],
            },
          ].map((feature, idx) => (
            <Reveal key={idx} delay={idx * 60}>
              <div className={`${brutal} p-6 mb-5 hover:-translate-y-1 transition-transform`} style={{ background: feature.color }}>
                <h3 className="text-lg font-extrabold uppercase mb-3">
                  {feature.icon} {feature.title}
                </h3>
                <ul className="list-none">
                  {feature.items.map((item, i) => (
                    <li key={i} className="py-2 pl-6 relative font-medium">
                      <span className="absolute left-0 font-extrabold">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ═══ BONUSES ═══ */}
        <section className="mb-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-extrabold uppercase pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">
                Included Free
              </h2>
              <span
                className="text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,10%)]"
                style={{ background: AMBER, color: INK }}
              >
                +${BONUS_TOTAL} value
              </span>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {BONUSES.map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`bg-white ${brutal} p-5 h-full flex flex-col hover:-translate-y-1 transition-transform`}>
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="font-extrabold uppercase text-sm mb-2 leading-tight">{b.title}</h3>
                  <p className="text-sm font-medium opacity-70 leading-relaxed flex-1">{b.desc}</p>
                  <div
                    className="mt-4 font-extrabold text-sm py-1 px-2 border-2 border-[hsl(0,0%,10%)] inline-block self-start"
                    style={{ background: AMBER }}
                  >
                    ${b.value} value
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ VALUE STACK ═══ */}
        <Reveal>
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">
              What This Is Actually Worth
            </h2>
            <div className={`${brutalLg} overflow-hidden bg-white`}>
              {VALUE_STACK.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 p-5 border-b-2 border-[hsl(0,0%,88%)]"
                >
                  <div className="flex-1">
                    <div className="font-extrabold text-sm md:text-base">{v.item}</div>
                    <div className="text-xs font-medium opacity-60 mt-1">{v.detail}</div>
                  </div>
                  <div className="font-extrabold text-lg md:text-xl whitespace-nowrap">
                    <CountUp to={v.value} prefix="$" />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between gap-4 p-5 border-b-2 border-[hsl(0,0%,88%)]" style={{ background: "hsl(45,95%,95%)" }}>
                <div className="font-extrabold text-sm md:text-base">
                  ✦ Bonuses <span className="opacity-60 font-medium">(toolkit, templates, follow-up)</span>
                </div>
                <div className="font-extrabold text-lg md:text-xl whitespace-nowrap">
                  <CountUp to={BONUS_TOTAL} prefix="$" />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between gap-4 p-5 bg-[hsl(0,0%,10%)] text-white">
                <div className="font-extrabold uppercase text-sm md:text-lg">Total Value</div>
                <div className="font-extrabold text-2xl md:text-3xl line-through decoration-4" style={{ textDecorationColor: PINK }}>
                  <CountUp to={GRAND_TOTAL} prefix="$" />
                </div>
              </div>

              {/* Your price */}
              <div className="p-6 text-center" style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}>
                <div className="text-xs font-extrabold uppercase tracking-widest text-white/80 mb-2">Your investment</div>
                <div className="text-5xl md:text-6xl font-extrabold text-white leading-none">
                  ${PRICE.toLocaleString()}
                </div>
                <div
                  className="inline-block mt-4 font-extrabold text-sm py-2 px-4 border-2 border-[hsl(0,0%,10%)]"
                  style={{ background: AMBER }}
                >
                  You save ${(GRAND_TOTAL - PRICE).toLocaleString()} · {Math.round((1 - PRICE / GRAND_TOTAL) * 100)}% off
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ ROI REFRAME ═══ */}
        <Reveal>
          <div className={`${brutalLg} p-8 mb-12`} style={{ background: TEAL }}>
            <TrendingUp className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl md:text-2xl font-extrabold uppercase mb-4 text-white">
              This should pay for itself before Month 3
            </h3>
            <p className="font-semibold text-white/90 leading-relaxed mb-4">
              You already have stock sitting in inventory. Clearing it is the very first thing we do together —
              and that revenue alone should cover this investment. Everything after that (the sales engine, the
              brand, the grant) is upside.
            </p>
            <div className="bg-white/15 backdrop-blur border-2 border-white/30 p-5">
              <p className="font-bold text-white leading-relaxed">
                Think of it this way: this isn't $2,500 leaving the business. It's $2,500 that unlocks the cash
                already trapped in your inventory — and builds the system that keeps it moving.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ═══ JOURNEY ═══ */}
        <Reveal>
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">
              The Journey
            </h2>
            <div className={`${brutalLg} overflow-hidden`}>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[hsl(0,0%,10%)] text-white">
                    <th className="p-4 text-left font-extrabold uppercase text-sm">Phase</th>
                    <th className="p-4 text-left font-extrabold uppercase text-sm">Weeks</th>
                    <th className="p-4 text-left font-extrabold uppercase text-sm">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      phase: "Revive",
                      weeks: "1–4",
                      outcome:
                        "Stock inventory & clearance plan live, brand & offer reset, weekly system running, business plan outline updated",
                      color: PURPLE,
                    },
                    {
                      phase: "Grow",
                      weeks: "5–8",
                      outcome:
                        "First sales campaigns launched, regional traction building, sales engine documented, grant business plan drafted",
                      color: BLUE,
                    },
                    {
                      phase: "Fund & Scale",
                      weeks: "9–12",
                      outcome:
                        "Stock cleared, grant proposal submitted, international brand roadmap set, growth system in place",
                      color: TEAL,
                    },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 border-2 border-[hsl(0,0%,10%)]" style={{ background: row.color }}>
                        <span className="font-extrabold uppercase text-white">{row.phase}</span>
                      </td>
                      <td className="p-4 border-2 border-[hsl(0,0%,10%)] bg-white font-bold">{row.weeks}</td>
                      <td className="p-4 border-2 border-[hsl(0,0%,10%)] bg-white text-sm font-medium">{row.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* ═══ GUARANTEE ═══ */}
        <Reveal>
          <div className={`${brutalLg} p-8 mb-12`} style={{ background: "hsl(160,50%,85%)" }}>
            <h3 className="text-xl font-extrabold uppercase mb-4 flex items-center gap-3">🛡️ The Guarantee</h3>
            <p className="font-semibold mb-4 leading-relaxed">
              Complete the program with full commitment, and if by the end of Month 3 you don't have your stock
              clearance executed, a working sales &amp; growth system, and a grant-ready submission —{" "}
              <strong>you get 100% of your money back.</strong>
            </p>
            <p className="font-bold mb-3">Commitment Requirements:</p>
            {[
              "Attend all scheduled sessions (maximum 2 missed sessions allowed)",
              "Complete all assigned tasks (maximum 2 incomplete tasks allowed)",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 py-2">
                <span
                  className="w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,10%)]"
                  style={{ background: TEAL }}
                >
                  <Check className="w-4 h-4 text-white" />
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
            <div className="border-2 border-[hsl(0,0%,10%)] p-4 mt-5 font-semibold" style={{ background: AMBER }}>
              ⚠️ If either condition is not met, the guarantee is void.
            </div>
          </div>
        </Reveal>

        {/* ═══ PAYMENT DETAILS ═══ */}
        <Reveal>
          <div className={`bg-[hsl(0,0%,10%)] text-white ${brutalLg} p-8 mb-12`}>
            <span
              className="inline-block text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-white mb-4"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
            >
              Payment Details
            </span>
            <h3 className="text-xl font-extrabold uppercase mb-5">🏦 Bank Transfer Details</h3>
            <div className="space-y-4">
              {[
                { label: "IBAN", value: "ES73 1583 0001 1290 8220 1110" },
                { label: "BIC / SWIFT", value: "REVOES M2" },
                { label: "Bank", value: "Revolut Bank UAB" },
                { label: "Correspondent BIC", value: "CHASDEFX" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-white/20 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest opacity-60 sm:w-40 flex-shrink-0">
                    {label}
                  </span>
                  <span className="font-mono font-bold text-lg tracking-wider">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs opacity-50 mt-5 font-medium">Please use your full name as the payment reference.</p>
          </div>
        </Reveal>

        {/* ═══ MENTOR ═══ */}
        <Reveal>
          <div className={`bg-white ${brutal} p-8 mb-12`}>
            <h3 className="text-xl font-extrabold uppercase mb-4">👤 Your Mentor</h3>
            <p className="font-extrabold text-xl mb-1">Ahmed Ezzat</p>
            <p className="font-semibold opacity-70 mb-4">Founder of Mentorna® | Senior PM &amp; CTO | Startup Advisor</p>
            <ul className="list-none space-y-2">
              {[
                "Founder of Mentorna — EdTech & AI venture studio",
                "Built and scaled businesses across MENA & European markets",
                "Advisor to early-stage startups on product, growth & fundraising",
                "Deep expertise in AI, product strategy, and go-to-market",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-medium">
                  <span
                    className="w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,10%)] mt-0.5"
                    style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ═══ PAST WORK ═══ */}
        <Reveal>
          <div className={`bg-white ${brutal} p-8 mb-12`}>
            <span className="inline-block bg-[hsl(0,0%,10%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,10%)] mb-4">
              Real Results
            </span>
            <h3 className="text-xl font-extrabold uppercase mb-3">🇫🇮 A Similar Business I Helped in Finland</h3>
            <p className="font-semibold opacity-80 mb-5">
              I worked with a Finnish fintech startup to help them raise funding and significantly enhance their user
              experience. The result speaks for itself.
            </p>
            <a
              href="https://www.fisofi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-extrabold uppercase px-5 py-3 border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
            >
              Visit Fisofi.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* ═══ SIGN-UP FORM ═══ */}
        <div id="secure-spot" className={`bg-[hsl(0,0%,10%)] text-white ${brutalLg} p-8 md:p-10 mb-8 scroll-mt-6`}>
          <h2 className="text-2xl font-extrabold uppercase mb-2 pb-3 border-b-4 border-white inline-block">
            Secure Your Spot
          </h2>
          <p className="font-semibold text-white/60 mb-6">
            ${GRAND_TOTAL.toLocaleString()} of value · ${PRICE.toLocaleString()} one-time · 100% money-back guarantee
          </p>
          <form onSubmit={handleFormSubmit}>
            {[
              { label: "Full Name", key: "fullName", type: "text", placeholder: "Enter your full name" },
              { label: "Email Address", key: "email", type: "email", placeholder: "Enter your email" },
              { label: "WhatsApp Number", key: "whatsapp", type: "tel", placeholder: "+968 xxx xxxx" },
              { label: "Business / Brand Name", key: "company", type: "text", placeholder: "Your business name" },
            ].map((field) => (
              <div className="mb-5" key={field.key}>
                <label className="block font-bold uppercase text-sm mb-2 tracking-wider">{field.label}</label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full p-4 text-[hsl(0,0%,10%)] font-semibold border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none"
                  value={formData[field.key as keyof typeof formData] as string}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                />
              </div>
            ))}

            <div className="bg-white border-4 border-[hsl(0,0%,10%)] p-5 mb-5">
              <div className="text-sm font-bold uppercase text-[hsl(0,0%,10%)] mb-3">Your Signature</div>
              <input
                type="text"
                required
                placeholder="Type your full name"
                className="w-full p-5 text-3xl text-center border-none border-b-[3px] border-[hsl(0,0%,10%)] bg-transparent text-[hsl(0,0%,10%)] outline-none"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
                value={formData.signature}
                onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
              />
              <div className="text-right text-sm text-[hsl(0,0%,10%)] mt-3 font-semibold">Date: {today}</div>
            </div>

            <div className="bg-white/10 p-5 mb-5 border-2 border-white/30">
              <p className="text-sm mb-4">By signing above and submitting this form, I agree to the following:</p>
              {[
                {
                  id: "agree1",
                  text: "I understand the program covers: stock clearance & sales for my kids' products business, a sales & growth system, regional & international brand building, and grant-ready preparation for my sanitary pad manufacturing business.",
                },
                { id: "agree2", text: "I commit to attending coaching sessions and completing assigned tasks in a timely manner." },
                { id: "agree3", text: "I agree to pay $2,500 USD as a one-time payment before the program begins." },
              ].map((cb) => (
                <div key={cb.id} className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    id={cb.id}
                    required
                    className="w-6 h-6 flex-shrink-0 mt-0.5 cursor-pointer"
                    checked={formData[cb.id as keyof typeof formData] as boolean}
                    onChange={(e) => setFormData({ ...formData, [cb.id]: e.target.checked })}
                  />
                  <label htmlFor={cb.id} className="font-semibold cursor-pointer">
                    {cb.text}
                  </label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-10 text-xl font-extrabold uppercase text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
            >
              {isSubmitting ? "Submitting..." : "🚀 I'm In — Let's Grow!"}
            </button>
          </form>
        </div>

        {/* ═══ FOOTER ═══ */}
        <footer className="text-center py-10 border-t-4 border-[hsl(0,0%,10%)] pb-28">
          <p className="italic text-lg font-medium opacity-80 mb-5">
            "Your discipline is already there. Let's add the structure that turns it into results."
          </p>
          <div className="font-bold">
            <p className="text-xl font-extrabold">— Ahmed Ezzat</p>
            <p className="text-sm opacity-70">Founder, Mentorna® | Startup Advisor &amp; Growth Coach</p>
          </div>
        </footer>
      </main>

      {/* ═══ STICKY PRICE BAR ═══ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[hsl(0,0%,10%)] border-t-4 border-[hsl(0,0%,10%)] transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-extrabold text-white">${PRICE.toLocaleString()}</span>
              <span className="text-sm font-bold text-white/40 line-through">${GRAND_TOTAL.toLocaleString()}</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider" style={{ color: AMBER }}>
              Save ${(GRAND_TOTAL - PRICE).toLocaleString()} · 48h only
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="flex items-center gap-2 py-3 px-5 md:px-7 text-sm md:text-base font-extrabold uppercase text-white border-2 border-white hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PINK})` }}
          >
            Claim Spot <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JaidaOffer;
