import { useState, useEffect } from "react";
import { Check, Lock, ExternalLink, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const JaidaOffer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
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
        setOfferStatus("active"); // default to active if no record found
      }
    };
    checkOffer();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-5">
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[hsl(262,60%,62%)] border-4 border-[hsl(0,0%,15%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-2">Private Offer</h1>
          <p className="text-sm font-medium opacity-70 mb-8">
            Enter the passcode to access this exclusive offer
          </p>
          <form onSubmit={handlePasscodeSubmit}>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit passcode"
              className="w-full p-4 text-center text-2xl font-bold tracking-[0.5em] border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none mb-4"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              autoFocus
            />
            {error && <p className="text-red-600 font-semibold text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={passcode.length !== 4}
              className="w-full py-4 px-8 text-lg font-extrabold uppercase bg-[hsl(262,60%,62%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10 md:p-14 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[hsl(0,0%,90%)] border-4 border-[hsl(0,0%,15%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-[hsl(0,0%,40%)]" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-3">Offer Expired</h1>
          <p className="font-medium text-[hsl(0,0%,45%)] leading-relaxed">
            This offer was valid for 48 hours and is no longer available.
            <br /><br />
            If you'd like to discuss a new arrangement, feel free to reach out directly.
          </p>
          <a
            href="https://wa.me/358414819241"
            className="inline-block mt-8 py-3 px-8 font-extrabold uppercase bg-[hsl(262,60%,62%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Contact Ahmed
          </a>
          <p className="text-xs font-medium opacity-40 mt-8">Mentorna® | Exclusive Access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="text-center py-10 px-5 bg-[hsl(262,60%,62%)] border-b-4 border-[hsl(0,0%,15%)]">
        <div className="text-xl font-light tracking-[2px] mb-5 text-white">Mentorna®</div>
        <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
          Exclusive 1:1 Program
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-2 text-white">
          Business Revival & Growth Program
        </h1>
        <p className="text-lg font-semibold text-white/90">3-Month Mentorship with Ahmed Ezzat</p>
      </header>

      {/* 48-Hour Notice */}
      <div className="bg-[hsl(0,0%,98%)] border-b border-[hsl(0,0%,85%)] text-center py-3 px-5">
        <p className="text-sm font-medium text-[hsl(0,0%,45%)]">
          ⏳ This offer is valid for <span className="font-semibold text-[hsl(0,0%,15%)]">48 hours</span> only.
        </p>
      </div>
      <main className="max-w-3xl mx-auto px-5 py-8">
        {/* Prepared For */}
        <section className="mb-8">
          <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)]">
            Prepared For
          </span>
          <h2 className="text-3xl font-extrabold mt-3">Jaida Al Hinai</h2>
          <p className="font-semibold opacity-80">Founder, Oman — Reviving her brand, building for growth & funding</p>
        </section>

        {/* Promise */}
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            The Promise
          </h2>
          <p className="text-xl font-semibold">
            In 90 days, you'll go from "reviving the business" to{" "}
            <span className="bg-[hsl(262,60%,62%)] text-white px-1.5 py-0.5">
              a business that's selling, growing, and fundable.
            </span>{" "}
            We'll clear your existing kids' stock, build your sales & brand engine, and take your
            sanitary pad manufacturing plan from proposal to grant-ready.
          </p>
        </div>

        {/* What You Get */}
        <section className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            What You Get
          </h2>
          {[
            {
              icon: "📦",
              title: "Stock Clearance & Sales",
              color: "bg-[hsl(262,55%,90%)]",
              items: [
                "Sell out your existing kids' products — pricing, bundles & launch offers",
                "Sales channels & campaigns activated (WhatsApp, Instagram, marketplaces)",
                "Weekly revenue targets with clear tracking",
              ],
            },
            {
              icon: "📈",
              title: "Sales & Growth Engine",
              color: "bg-[hsl(210,75%,85%)]",
              items: [
                "Repeatable customer acquisition system you can run alone",
                "Funnel, follow-up & conversion processes documented",
                "AI-assisted marketing, content & operations — leveraging the tools you already use",
              ],
            },
            {
              icon: "🌍",
              title: "Regional & International Brand Building",
              color: "bg-[hsl(140,50%,80%)]",
              items: [
                "Clear brand positioning, story & visual direction",
                "GCC-first growth plan, then an international expansion roadmap",
                "Social presence & content strategy to build a known brand",
              ],
            },
            {
              icon: "📝",
              title: "Grant & Funding Readiness",
              color: "bg-[hsl(45,95%,80%)]",
              items: [
                "Business plan & proposal finalised to submission standard",
                "Financial projections & use-of-funds built cleanly",
                "Grant application strategy & full review before you submit",
              ],
            },
            {
              icon: "🛠️",
              title: "Structure, Focus & Accountability",
              color: "bg-[hsl(14,90%,90%)]",
              items: [
                "Weekly 1:1 sessions + async support (response within 24 hours, Mon–Fri)",
                "Simple planning & decision frameworks built around how you work",
                "A priority system so you stay focused on what moves the needle",
              ],
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`${feature.color} border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 mb-5`}
            >
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
          ))}
        </section>

        {/* Journey */}
        <section className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            The Journey
          </h2>
          <div className="border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[hsl(0,0%,15%)] text-white">
                  <th className="p-4 text-left font-extrabold uppercase">Phase</th>
                  <th className="p-4 text-left font-extrabold uppercase">Weeks</th>
                  <th className="p-4 text-left font-extrabold uppercase">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    phase: "Revive",
                    weeks: "1–4",
                    outcome: "Stock inventory & clearance plan live, brand & offer reset, weekly system running, business plan outline updated",
                    color: "bg-[hsl(260,50%,75%)]",
                  },
                  {
                    phase: "Grow",
                    weeks: "5–8",
                    outcome: "First sales campaigns launched, regional traction building, sales engine documented, grant business plan drafted",
                    color: "bg-[hsl(210,75%,70%)]",
                  },
                  {
                    phase: "Fund & Scale",
                    weeks: "9–12",
                    outcome: "Stock cleared, grant proposal submitted, international brand roadmap set, growth system in place",
                    color: "bg-[hsl(140,50%,60%)]",
                  },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className={`p-4 border-2 border-[hsl(0,0%,15%)] ${row.color}`}>
                      <span className="font-extrabold uppercase">{row.phase}</span>
                    </td>
                    <td className="p-4 border-2 border-[hsl(0,0%,15%)] bg-white">{row.weeks}</td>
                    <td className="p-4 border-2 border-[hsl(0,0%,15%)] bg-white">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Money-Back Guarantee */}
        <div className="bg-[hsl(140,50%,80%)] border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h3 className="text-xl font-extrabold uppercase mb-4 flex items-center gap-3">
            🛡️ The Guarantee
          </h3>
          <p className="font-semibold mb-4">
            Complete the program with full commitment, and if by the end of Month 3 you don't have
            your stock clearance executed, a working sales & growth system, and a grant-ready
            submission —{" "}
            <strong>you get 100% of your money back.</strong>
          </p>
          <p className="font-bold mb-3">Commitment Requirements:</p>
          {[
            "Attend all scheduled sessions (maximum 2 missed sessions allowed)",
            "Complete all assigned tasks (maximum 2 incomplete tasks allowed)",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 py-2">
              <span className="bg-[hsl(140,50%,60%)] w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,15%)]">
                <Check className="w-4 h-4" />
              </span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
          <div className="bg-[hsl(45,95%,65%)] border-2 border-[hsl(0,0%,15%)] p-4 mt-5 font-semibold">
            ⚠️ If either condition is not met, the guarantee is void.
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-[hsl(262,60%,62%)] border-4 border-[hsl(0,0%,15%)] text-center p-10 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
            Investment
          </span>
          <div className="text-5xl md:text-6xl font-extrabold leading-none text-white">$2,500 USD</div>
          <p className="text-lg font-semibold mt-3 text-white/90">One-time payment — full 3-month program</p>
        </div>

        {/* Payment Details */}
        <div className="bg-[hsl(0,0%,15%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <span className="inline-block bg-[hsl(262,60%,62%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-white mb-4">
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

        {/* About Mentor */}
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h3 className="text-xl font-extrabold uppercase mb-4">👤 Your Mentor</h3>
          <p className="font-extrabold text-xl mb-1">Ahmed Ezzat</p>
          <p className="font-semibold opacity-70 mb-4">Founder of Mentorna® | Senior PM & CTO | Startup Advisor</p>
          <ul className="list-none space-y-2">
            {[
              "Founder of Mentorna — EdTech & AI venture studio",
              "Built and scaled businesses across MENA & European markets",
              "Advisor to early-stage startups on product, growth & fundraising",
              "Deep expertise in AI, product strategy, and go-to-market",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-medium">
                <span className="bg-[hsl(262,60%,62%)] w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,15%)] mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Past Work Reference */}
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
            Real Results
          </span>
          <h3 className="text-xl font-extrabold uppercase mb-3">🇫🇮 A Similar Business I Helped in Finland</h3>
          <p className="font-semibold opacity-80 mb-5">
            I worked with a Finnish fintech startup to help them raise funding and significantly enhance their user experience. The result speaks for itself.
          </p>
          <a
            href="https://www.fisofi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[hsl(262,60%,62%)] text-white font-extrabold uppercase px-5 py-3 border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Visit Fisofi.com <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Sign-up Form */}
        <div className="bg-[hsl(0,0%,15%)] text-white p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-white inline-block">
            Secure Your Spot
          </h2>
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
                  className="w-full p-4 text-[hsl(0,0%,15%)] font-semibold border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none"
                  value={formData[field.key as keyof typeof formData] as string}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                />
              </div>
            ))}

            {/* Signature */}
            <div className="bg-white border-4 border-[hsl(0,0%,15%)] p-5 mb-5">
              <div className="text-sm font-bold uppercase text-[hsl(0,0%,15%)] mb-3">Your Signature</div>
              <input
                type="text"
                required
                placeholder="Type your full name"
                className="w-full p-5 text-3xl text-center border-none border-b-[3px] border-[hsl(0,0%,15%)] bg-transparent text-[hsl(0,0%,15%)] outline-none"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
                value={formData.signature}
                onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
              />
              <div className="text-right text-sm text-[hsl(0,0%,15%)] mt-3 font-semibold">Date: {today}</div>
            </div>

            {/* Agreements */}
            <div className="bg-white/10 p-5 mb-5 border-2 border-white/30">
              <p className="text-sm mb-4">By signing above and submitting this form, I agree to the following:</p>
              {[
                { id: "agree1", text: "I understand the program covers: stock clearance & sales for my kids' products business, a sales & growth system, regional & international brand building, and grant-ready preparation for my sanitary pad manufacturing business." },
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
                  <label htmlFor={cb.id} className="font-semibold cursor-pointer">{cb.text}</label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-10 text-xl font-extrabold uppercase bg-[hsl(262,60%,62%)] text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "🚀 I'm In — Let's Grow!"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 border-t-4 border-[hsl(0,0%,15%)]">
          <p className="italic text-lg font-medium opacity-80 mb-5">
            "Your discipline is already there. Let's add the structure that turns it into results."
          </p>
          <div className="font-bold">
            <p className="text-xl font-extrabold">— Ahmed Ezzat</p>
            <p className="text-sm opacity-70">Founder, Mentorna® | Startup Advisor & Growth Coach</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default JaidaOffer;
