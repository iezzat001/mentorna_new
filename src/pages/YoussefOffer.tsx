import React, { useState, useEffect, useRef } from "react";
import { Check, Lock, Clock, ArrowRight, Compass, Hammer, Rocket, HeartHandshake, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ────────────────────────────────────────────────────────────
   Design tokens
   ──────────────────────────────────────────────────────────── */
const INDIGO = "hsl(232,72%,58%)";
const CYAN = "hsl(196,85%,52%)";
const AMBER = "hsl(38,95%,58%)";
const TEAL = "hsl(160,70%,45%)";
const CORAL = "hsl(18,80%,63%)";

const brutal = "border-4 border-[hsl(0,0%,10%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
const brutalLg = "border-4 border-[hsl(0,0%,10%)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]";

const PAGE_BG = "linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)";

const BLOB_A = "46% 54% 48% 52% / 54% 46% 54% 46%";
const BLOB_B = "50% 50% 46% 54% / 52% 48% 52% 48%";
const BLOB_C = "52% 48% 52% 48% / 50% 50% 50% 50%";

const DOTS = {
  backgroundImage: "radial-gradient(rgba(0,0,0,.16) 1.4px, transparent 1.4px)",
  backgroundSize: "18px 18px",
};

const GlobalStyles = () => (
  <style>{`
    @keyframes floatBlob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(.95)} }
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes drift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-26px) rotate(6deg)} }
    .blob { animation: floatBlob 16s ease-in-out infinite; }
    .drift { animation: drift 11s ease-in-out infinite; }
    .card-cream { background: linear-gradient(150deg,#FFFBF4 0%,#F9EAD7 55%,#F3DEC6 100%); }
  `}</style>
);

const Blob = ({
  color, size, radius, className, delay = 0, opacity = 0.5,
}: { color: string; size: number; radius: string; className?: string; delay?: number; opacity?: number }) => (
  <div
    aria-hidden
    className={`blob pointer-events-none absolute blur-2xl ${className ?? ""}`}
    style={{ width: size, height: size, background: color, borderRadius: radius, opacity, animationDelay: `${delay}s` }}
  />
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
};

const CountUp = ({ to, prefix = "", duration = 1400 }: { to: number; prefix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}</span>;
};

/* ────────────────────────────────────────────────────────────
   Offer data
   ──────────────────────────────────────────────────────────── */
const PRICE = 2000;
const VALUE_STACK = [
  { item: "12 weekly 1:1 mentorship sessions", detail: "One focused hour a week, directly with Ahmed", value: 1800 },
  { item: "Async support between sessions", detail: "Mon–Fri, reply within 24h — you never stay stuck", value: 600 },
  { item: "Path diagnostic & personal roadmap", detail: "One direction chosen, with the reasoning behind it", value: 400 },
  { item: "Hands-on build guidance", detail: "Real projects reviewed and debugged with you", value: 500 },
  { item: "Offer & first-client playbook", detail: "How to package what you learn into paid work", value: 200 },
];
const TOTAL_VALUE = 3500;

const TRANSFORM = [
  { now: "Torn between four different AI paths", then: "One path chosen — and you know why" },
  { now: "Collecting courses, shipping nothing", then: "Real projects built, running and reviewed" },
  { now: '"Am I technical enough for this?"', then: "Proof you can build without a CS degree" },
  { now: "Startups are something you read about", then: "A concrete offer you can put in front of people" },
];

const CAPABILITY = [
  { icon: Compass, title: "You don't need to be technical", desc: "The automation track is built for non-programmers. Your accounting background already gave you structure, logic and comfort with numbers — that transfers directly." },
  { icon: HeartHandshake, title: "We pick the path that fits YOU", desc: "Not the trendiest one. The question isn't which field is best — it's which one you can sustain. We test that properly instead of guessing." },
  { icon: Hammer, title: "You learn by building", desc: "No theory marathons. Every week you build something small and real, because that's the only way this field actually sticks." },
  { icon: Rocket, title: "One thing at a time", desc: "The scattered feeling comes from four open doors. We close three, and go deep on one. That alone changes everything." },
];

const WHAT_YOU_GET = [
  {
    icon: "🎯", title: "Path Diagnostic & Decision", color: "hsl(232,60%,90%)",
    items: [
      "Structured assessment of the four directions you're weighing",
      "We test your actual energy and aptitude, not just interest",
      "You leave Week 2 with ONE path locked — and the reasoning written down",
    ],
  },
  {
    icon: "🗺️", title: "Your Personal Learning Roadmap", color: "hsl(196,70%,88%)",
    items: [
      "Exactly what to learn, in what order — nothing extra",
      "Curated resources instead of an endless list of tutorials",
      "Weekly milestones so you always know if you're on track",
    ],
  },
  {
    icon: "🤖", title: "Hands-On AI Building", color: "hsl(160,50%,85%)",
    items: [
      "Agentic AI & automation tools (n8n and similar) — no coding background required",
      "Build real, working projects from week one",
      "Your work reviewed and debugged together on the call",
    ],
  },
  {
    icon: "🚀", title: "Startup & First-Income Track", color: "hsl(38,90%,85%)",
    items: [
      "Turn the skill into a service people will actually pay for",
      "How to find, approach and talk to your first clients",
      "Pricing, scoping and delivering your first small projects",
    ],
  },
  {
    icon: "🤝", title: "Weekly 1:1 & Accountability", color: "hsl(18,70%,89%)",
    items: [
      "12 weekly 1:1 sessions — direct, personal, no group calls",
      "Async support Mon–Fri, answered within 24 hours",
      "Honest feedback — including when something isn't working",
    ],
  },
];

const JOURNEY = [
  { phase: "Clarity", weeks: "1–4", color: INDIGO, outcome: "Diagnostic complete, ONE path locked with clear reasoning, roadmap built, foundations started, first small automation working end-to-end" },
  { phase: "Build", weeks: "5–8", color: CYAN, outcome: "Multiple real projects shipped, core tools mastered, portfolio taking shape, comfortable building on your own" },
  { phase: "Launch", weeks: "9–12", color: TEAL, outcome: "Skills packaged into a clear offer, outreach started, first client conversations underway, plan for what comes after the program" },
];

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
const YoussefOffer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showBar, setShowBar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", whatsapp: "", country: "", signature: "",
    agree1: false, agree2: false, agree3: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerStatus, setOfferStatus] = useState<"loading" | "active" | "expired">("loading");

  useEffect(() => {
    const checkOffer = async () => {
      const { data } = await supabase
        .from("offer_settings")
        .select("is_active, expires_at")
        .eq("slug", "youssef_ai_mentorship")
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
    if (passcode === "2000") setIsAuthenticated(true);
    else { setError("Invalid passcode. Please try again."); setPasscode(""); }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("signed_contracts").insert({
        full_name: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        address: formData.country,
        signature: formData.signature,
        offer_type: "youssef_ai_mentorship",
        total_amount: PRICE,
        currency: "USD",
        installment_amount: PRICE,
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
      alert(`Thank you, ${formData.fullName}! 🎉\n\nYour enrollment has been received. Ahmed will be in touch shortly to kick things off.`);
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
        <GlobalStyles />
        <div className="absolute inset-0 opacity-60" style={{
          background: `radial-gradient(circle at 20% 20%, ${INDIGO}55, transparent 45%), radial-gradient(circle at 80% 70%, ${CYAN}44, transparent 45%), radial-gradient(circle at 50% 100%, ${AMBER}33, transparent 40%)`,
        }} />
        <div className={`relative card-cream ${brutalLg} p-8 md:p-12 max-w-md w-full text-center`}>
          <div className="w-16 h-16 border-4 border-[hsl(0,0%,10%)] rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-2">Private Offer</h1>
          <p className="text-sm font-medium opacity-70 mb-8">Enter the passcode to access this exclusive offer</p>
          <form onSubmit={handlePasscodeSubmit}>
            <input type="password" inputMode="numeric" maxLength={4} placeholder="Enter 4-digit passcode"
              className="w-full p-4 text-center text-2xl font-bold tracking-[0.5em] border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none mb-4"
              value={passcode} onChange={(e) => setPasscode(e.target.value.replace(/\D/g, "").slice(0, 4))} autoFocus />
            {error && <p className="text-red-600 font-semibold text-sm mb-4">{error}</p>}
            <button type="submit" disabled={passcode.length !== 4}
              className="w-full py-4 px-8 text-lg font-extrabold uppercase text-white border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
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
      <div style={{ background: PAGE_BG }} className="min-h-screen font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold text-[hsl(0,0%,40%)]">Loading...</div>
      </div>
    );
  }

  if (offerStatus === "expired") {
    return (
      <div style={{ background: PAGE_BG }} className="min-h-screen font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-5">
        <GlobalStyles />
        <div className={`card-cream ${brutalLg} p-10 md:p-14 max-w-md w-full text-center`}>
          <div className="w-16 h-16 border-4 border-[hsl(0,0%,10%)] rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(150deg,#E4DACE,#D6C9B8)" }}>
            <Clock className="w-8 h-8 text-[hsl(0,0%,40%)]" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-3">Offer Expired</h1>
          <p className="font-medium text-[hsl(0,0%,45%)] leading-relaxed">
            This offer is no longer available.<br /><br />
            If you'd like to discuss a new arrangement, feel free to reach out directly.
          </p>
          <a href="https://wa.me/358414819241"
            className="inline-block mt-8 py-3 px-8 font-extrabold uppercase text-white border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
            Contact Ahmed
          </a>
          <p className="text-xs font-medium opacity-40 mt-8">Mentorna® | Exclusive Access</p>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="relative min-h-screen font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden" style={{ background: PAGE_BG }}>
      <GlobalStyles />

      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <Blob color={INDIGO} size={520} radius={BLOB_A} className="-left-40 top-[12%]" opacity={0.16} />
        <Blob color={CYAN} size={460} radius={BLOB_B} className="-right-32 top-[34%]" opacity={0.15} delay={3} />
        <Blob color={TEAL} size={480} radius={BLOB_C} className="-left-32 top-[62%]" opacity={0.14} delay={6} />
        <Blob color={AMBER} size={420} radius={BLOB_A} className="-right-24 top-[84%]" opacity={0.17} delay={9} />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.16]" style={DOTS} />

      {/* ═══ HERO ═══ */}
      <header className="relative bg-[hsl(0,0%,10%)] border-b-4 border-[hsl(0,0%,10%)] overflow-hidden">
        <div className="blob absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl" style={{ background: INDIGO }} />
        <div className="blob absolute top-10 right-0 w-[380px] h-[380px] rounded-full opacity-40 blur-3xl" style={{ background: CYAN, animationDelay: "3s" }} />
        <div className="blob absolute -bottom-20 left-1/3 w-[340px] h-[340px] rounded-full opacity-30 blur-3xl" style={{ background: AMBER, animationDelay: "6s" }} />
        <div aria-hidden className="absolute inset-0 opacity-[0.18]" style={DOTS} />
        <div aria-hidden className="drift absolute top-16 left-[8%] w-16 h-16 border-4 border-white/25 hidden md:block" style={{ borderRadius: BLOB_A }} />
        <div aria-hidden className="drift absolute bottom-24 right-[10%] w-12 h-12 border-4 border-white/20 hidden md:block" style={{ borderRadius: BLOB_C, animationDelay: "4s" }} />
        <div aria-hidden className="drift absolute top-1/3 right-[6%] w-6 h-6 hidden md:block" style={{ background: AMBER, borderRadius: BLOB_B, animationDelay: "2s", opacity: 0.7 }} />

        <div className="relative max-w-4xl mx-auto px-5 py-14 md:py-20 text-center">
          <div className="text-lg font-light tracking-[3px] mb-6 text-white/80">Mentorna®</div>
          <span className="inline-block text-white text-xs font-extrabold uppercase py-2 px-4 border-2 border-white/40 mb-6 tracking-wider backdrop-blur" style={{ background: "rgba(255,255,255,.1)" }}>
            ✦ Private 1:1 Mentorship · Prepared for Youssef
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-[0.95] mb-5 text-white">
            From Scattered
            <br />
            <span style={{ background: `linear-gradient(90deg, ${AMBER}, ${CYAN}, ${INDIGO})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              To One Clear Path
            </span>
          </h1>
          <p className="text-lg md:text-xl font-semibold text-white/80 max-w-2xl mx-auto">
            90 days to stop guessing between four directions, commit to one, and actually build something real with AI —
            starting from zero, without a technical background.
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-10 max-w-2xl mx-auto">
            {[
              { v: "90", l: "Days", c: AMBER },
              { v: "12", l: "1:1 Sessions", c: CYAN },
              { v: "1", l: "Clear Path", c: TEAL },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 backdrop-blur border-2 border-white/30 p-3 md:p-4">
                <div className="text-2xl md:text-4xl font-extrabold" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <button onClick={scrollToForm}
            className="mt-10 inline-flex items-center gap-2 py-4 px-8 text-base md:text-lg font-extrabold uppercase text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.25)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
            Start My Path <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative border-t-2 border-white/20 py-3 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite", width: "max-content" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex">
                {["One Path Chosen", "Real Projects Shipped", "No CS Degree Needed", "Learn By Building", "First Offer Packaged", "Momentum, Not Confusion"].map((t, i) => (
                  <span key={`${dup}-${i}`} className="mx-6 text-sm font-extrabold uppercase tracking-widest text-white/50">✦ {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-5 py-10">
        {/* ═══ PREPARED FOR ═══ */}
        <Reveal>
          <section className="mb-12">
            <span className="inline-block bg-[hsl(0,0%,10%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,10%)]">
              Prepared For
            </span>
            <h2 className="text-3xl font-extrabold mt-3">Youssef</h2>
            <p className="font-semibold opacity-80">
              Iraq — accounting graduate, moving into AI from a non-technical background
            </p>
          </section>
        </Reveal>

        {/* ═══ TRANSFORMATION ═══ */}
        <Reveal>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6">
              Where you are <span className="opacity-40">→</span> where you'll be
            </h2>
            <div className={`${brutalLg} overflow-hidden`}>
              <div className="grid grid-cols-2">
                <div className="p-4 border-r-4 border-[hsl(0,0%,10%)]" style={{ background: "linear-gradient(150deg,#E4DACE,#D6C9B8)" }}>
                  <span className="text-xs font-extrabold uppercase tracking-widest opacity-60">Today</span>
                </div>
                <div className="p-4" style={{ background: TEAL }}>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-white">In 90 days</span>
                </div>
              </div>
              {TRANSFORM.map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-t-4 border-[hsl(0,0%,10%)]">
                  <div className="card-cream p-4 border-r-4 border-[hsl(0,0%,10%)] font-medium text-sm opacity-60 line-through decoration-2">{row.now}</div>
                  <div className="card-cream p-4 font-bold text-sm flex items-start gap-2">
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
          <div className={`card-cream ${brutalLg} p-8 mb-12`}>
            <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">The Promise</h2>
            <p className="text-xl font-semibold leading-relaxed">
              In 90 days, you'll go from scattered across four directions to{" "}
              <span className="text-white px-1.5 py-0.5" style={{ background: `linear-gradient(120deg, ${INDIGO}, ${CYAN})` }}>
                one clear path, real skills you've actually used, and work you can show.
              </span>{" "}
              Not another pile of courses — a direction you've committed to and proof that you can build in it.
            </p>
          </div>
        </Reveal>

        {/* ═══ CAPABILITY / OBJECTION ═══ */}
        <Reveal>
          <section className="mb-12">
            <div className={`bg-[hsl(0,0%,10%)] ${brutalLg} p-8 relative overflow-hidden`}>
              <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={DOTS} />
              <div className="relative">
                <span className="inline-block text-white text-xs font-extrabold uppercase py-1.5 px-3 mb-4 tracking-wider" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
                  Let's address the real question
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-3 text-white">
                  "Can I actually do this — I'm not technical?"
                </h2>
                <p className="font-semibold text-white/70 mb-7 leading-relaxed">
                  You said it yourself: the confusion is the problem, not the ambition. Here's how this program is built
                  around exactly that.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {CAPABILITY.map((t, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur border-2 border-white/25 p-5">
                      <t.icon className="w-6 h-6 mb-3" style={{ color: AMBER }} />
                      <h3 className="font-extrabold uppercase text-sm mb-2 text-white">{t.title}</h3>
                      <p className="text-sm font-medium text-white/65 leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ WHAT YOU GET ═══ */}
        <section className="mb-12">
          <Reveal>
            <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">What You Get</h2>
          </Reveal>
          {WHAT_YOU_GET.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 60}>
              <div className={`${brutal} p-6 mb-5 hover:-translate-y-1 transition-transform`} style={{ background: feature.color }}>
                <h3 className="text-lg font-extrabold uppercase mb-3">{feature.icon} {feature.title}</h3>
                <ul className="list-none">
                  {feature.items.map((item, i) => (
                    <li key={i} className="py-2 pl-6 relative font-medium">
                      <span className="absolute left-0 font-extrabold">→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ═══ VALUE STACK ═══ */}
        <Reveal>
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">What's Included</h2>
            <div className={`${brutalLg} overflow-hidden card-cream`}>
              {VALUE_STACK.map((v, i) => (
                <div key={i} className="flex items-start justify-between gap-4 p-5 border-b-2 border-[hsl(30,20%,82%)]">
                  <div className="flex-1">
                    <div className="font-extrabold text-sm md:text-base">{v.item}</div>
                    <div className="text-xs font-medium opacity-60 mt-1">{v.detail}</div>
                  </div>
                  <div className="font-extrabold text-lg md:text-xl whitespace-nowrap"><CountUp to={v.value} prefix="$" /></div>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 p-5 bg-[hsl(0,0%,10%)] text-white">
                <div className="font-extrabold uppercase text-sm md:text-lg">Standard Price</div>
                <div className="font-extrabold text-2xl md:text-3xl line-through decoration-4" style={{ textDecorationColor: CORAL }}>
                  <CountUp to={TOTAL_VALUE} prefix="$" />
                </div>
              </div>
              <div className="p-6 text-center" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
                <div className="text-xs font-extrabold uppercase tracking-widest text-white/80 mb-2">Your investment</div>
                <div className="text-5xl md:text-6xl font-extrabold text-white leading-none">${PRICE.toLocaleString()}</div>
                <div className="inline-block mt-4 font-extrabold text-sm py-2 px-4 border-2 border-[hsl(0,0%,10%)]" style={{ background: AMBER }}>
                  ${(TOTAL_VALUE - PRICE).toLocaleString()} off · one-time payment
                </div>
              </div>
            </div>
            <p className="text-xs font-semibold opacity-60 mt-3 leading-relaxed">
              This is a reduced rate offered personally to you, below the standard price for this program.
            </p>
          </section>
        </Reveal>

        {/* ═══ HONEST NOTE ═══ */}
        <Reveal>
          <div className={`${brutalLg} p-8 mb-12`} style={{ background: TEAL }}>
            <TrendingUp className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl md:text-2xl font-extrabold uppercase mb-4 text-white">Being honest with you</h3>
            <p className="font-semibold text-white/90 leading-relaxed mb-4">
              I'm not going to promise you a salary or a specific income in 90 days — anyone who does is selling you
              something. What I can promise is that you'll stop being scattered, you'll have one direction you've
              committed to, and you'll have built real things you can show people.
            </p>
            <div className="bg-white/15 backdrop-blur border-2 border-white/30 p-5">
              <p className="font-bold text-white leading-relaxed">
                The most expensive thing right now isn't this program — it's spending another year switching between
                four paths and finishing none of them.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ═══ JOURNEY ═══ */}
        <Reveal>
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,10%)] inline-block">The Journey</h2>
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
                  {JOURNEY.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 border-2 border-[hsl(0,0%,10%)]" style={{ background: row.color }}>
                        <span className="font-extrabold uppercase text-white">{row.phase}</span>
                      </td>
                      <td className="p-4 border-2 border-[hsl(0,0%,10%)] card-cream font-bold">{row.weeks}</td>
                      <td className="p-4 border-2 border-[hsl(0,0%,10%)] card-cream text-sm font-medium">{row.outcome}</td>
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
              Complete the program with full commitment, and if by the end of Month 3 you don't have a clear chosen
              path, real projects you've built, and a packaged offer ready to take to clients —{" "}
              <strong>you get 100% of your money back.</strong>
            </p>
            <p className="font-bold mb-3">Commitment Requirements:</p>
            {[
              "Attend all scheduled sessions (maximum 2 missed sessions allowed)",
              "Complete all assigned tasks and builds (maximum 2 incomplete tasks allowed)",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 py-2">
                <span className="w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,10%)]" style={{ background: TEAL }}>
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
            <span className="inline-block text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-white mb-4" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
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
                  <span className="text-xs font-extrabold uppercase tracking-widest opacity-60 sm:w-40 flex-shrink-0">{label}</span>
                  <span className="font-mono font-bold text-lg tracking-wider">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs opacity-50 mt-5 font-medium">Please use your full name as the payment reference.</p>
          </div>
        </Reveal>

        {/* ═══ MENTOR ═══ */}
        <Reveal>
          <div className={`card-cream ${brutal} p-8 mb-12`}>
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
                  <span className="w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,10%)] mt-0.5" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
                    <Check className="w-4 h-4 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ═══ FORM ═══ */}
        <div id="secure-spot" className={`bg-[hsl(0,0%,10%)] text-white ${brutalLg} p-8 md:p-10 mb-8 scroll-mt-6`}>
          <h2 className="text-2xl font-extrabold uppercase mb-2 pb-3 border-b-4 border-white inline-block">Secure Your Spot</h2>
          <p className="font-semibold text-white/60 mb-6">
            ${PRICE.toLocaleString()} one-time · 12 weekly 1:1 sessions · 100% money-back guarantee
          </p>
          <form onSubmit={handleFormSubmit}>
            {[
              { label: "Full Name", key: "fullName", type: "text", placeholder: "Enter your full name" },
              { label: "Email Address", key: "email", type: "email", placeholder: "Enter your email" },
              { label: "WhatsApp Number", key: "whatsapp", type: "tel", placeholder: "+964 xxx xxx xxxx" },
              { label: "Country / City", key: "country", type: "text", placeholder: "Iraq — your city" },
            ].map((field) => (
              <div className="mb-5" key={field.key}>
                <label className="block font-bold uppercase text-sm mb-2 tracking-wider">{field.label}</label>
                <input type={field.type} required placeholder={field.placeholder}
                  className="w-full p-4 text-[hsl(0,0%,10%)] font-semibold border-4 border-[hsl(0,0%,10%)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none"
                  value={formData[field.key as keyof typeof formData] as string}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} />
              </div>
            ))}

            <div className="card-cream border-4 border-[hsl(0,0%,10%)] p-5 mb-5">
              <div className="text-sm font-bold uppercase text-[hsl(0,0%,10%)] mb-3">Your Signature</div>
              <input type="text" required placeholder="Type your full name"
                className="w-full p-5 text-3xl text-center border-none border-b-[3px] border-[hsl(0,0%,10%)] bg-transparent text-[hsl(0,0%,10%)] outline-none"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
                value={formData.signature}
                onChange={(e) => setFormData({ ...formData, signature: e.target.value })} />
              <div className="text-right text-sm text-[hsl(0,0%,10%)] mt-3 font-semibold">Date: {today}</div>
            </div>

            <div className="bg-white/10 p-5 mb-5 border-2 border-white/30">
              <p className="text-sm mb-4">By signing above and submitting this form, I agree to the following:</p>
              {[
                { id: "agree1", text: "I understand the program covers: choosing one clear AI path, a personal learning roadmap, hands-on building with agentic AI & automation tools, and packaging my skills into an offer." },
                { id: "agree2", text: "I commit to attending the weekly sessions and completing the assigned tasks and builds in a timely manner." },
                { id: "agree3", text: "I agree to pay $2,000 USD as a one-time payment before the program begins." },
              ].map((cb) => (
                <div key={cb.id} className="flex items-start gap-3 mt-4">
                  <input type="checkbox" id={cb.id} required className="w-6 h-6 flex-shrink-0 mt-0.5 cursor-pointer"
                    checked={formData[cb.id as keyof typeof formData] as boolean}
                    onChange={(e) => setFormData({ ...formData, [cb.id]: e.target.checked })} />
                  <label htmlFor={cb.id} className="font-semibold cursor-pointer">{cb.text}</label>
                </div>
              ))}
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-5 px-10 text-xl font-extrabold uppercase text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
              {isSubmitting ? "Submitting..." : "🚀 I'm In — Let's Start"}
            </button>
          </form>
        </div>

        <footer className="text-center py-10 border-t-4 border-[hsl(0,0%,10%)] pb-28">
          <p className="italic text-lg font-medium opacity-80 mb-5">
            "The problem was never your ambition. It was having four doors open at once. Let's close three."
          </p>
          <div className="font-bold">
            <p className="text-xl font-extrabold">— Ahmed Ezzat</p>
            <p className="text-sm opacity-70">Founder, Mentorna® | Startup Advisor &amp; Growth Coach</p>
          </div>
        </footer>
      </main>

      {/* ═══ STICKY BAR ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[hsl(0,0%,10%)] border-t-4 border-[hsl(0,0%,10%)] transition-transform duration-300 ${showBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-extrabold text-white">${PRICE.toLocaleString()}</span>
              <span className="text-sm font-bold text-white/40 line-through">${TOTAL_VALUE.toLocaleString()}</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider" style={{ color: AMBER }}>
              3 months · 12 sessions
            </div>
          </div>
          <button onClick={scrollToForm}
            className="flex items-center gap-2 py-3 px-5 md:px-7 text-sm md:text-base font-extrabold uppercase text-white border-2 border-white hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
            style={{ background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})` }}>
            Start Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YoussefOffer;
