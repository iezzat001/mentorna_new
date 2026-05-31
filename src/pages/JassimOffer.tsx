import { useState, useEffect } from "react";
import { Check, Lock, ExternalLink, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const JassimOffer = () => {
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

  // Offer validity — update OFFER_SENT_AT whenever you send a new offer
  const OFFER_SENT_AT = new Date("2026-05-31T00:00:00Z"); // ← update this date when resending
  const OFFER_DURATION_HOURS = 48;
  const offerExpired = Date.now() > OFFER_SENT_AT.getTime() + OFFER_DURATION_HOURS * 60 * 60 * 1000;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (passcode === "2000") {
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
        offer_type: "vc_fundraising_mentorship",
        total_amount: 2000,
        currency: "EUR",
        installment_amount: 2000,
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
          <div className="w-16 h-16 bg-[hsl(14,90%,65%)] border-4 border-[hsl(0,0%,15%)] rounded-full flex items-center justify-center mx-auto mb-6">
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
              className="w-full py-4 px-8 text-lg font-extrabold uppercase bg-[hsl(14,90%,65%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unlock Offer
            </button>
          </form>
          <p className="text-xs font-medium opacity-50 mt-6">Mentorna® | Exclusive Access</p>
        </div>
      </div>
    );
  }

  if (offerExpired) {
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
            href="https://wa.me/message/XXXXXXX"
            className="inline-block mt-8 py-3 px-8 font-extrabold uppercase bg-[hsl(14,90%,65%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
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
      <header className="text-center py-10 px-5 bg-[hsl(14,90%,65%)] border-b-4 border-[hsl(0,0%,15%)]">        <div className="text-xl font-light tracking-[2px] mb-5 text-white">Mentorna®</div>
        <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
          Exclusive 1:1 Program
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-2 text-white">
          VC Fundraising Mentorship
        </h1>
        <p className="text-lg font-semibold text-white/90">Strategic Coaching with Ahmed Ezzat</p>
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
          <h2 className="text-3xl font-extrabold mt-3">Jassim Al Mathkour</h2>
          <p className="font-semibold opacity-80">SaaS Founder, UAE — Ready to Raise VC</p>
        </section>

        {/* Promise */}
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            The Promise
          </h2>
          <p className="text-xl font-semibold">
            You have the traction. You have the business. Now let's build the story, numbers, and
            confidence to{" "}
            <span className="bg-[hsl(14,90%,65%)] text-white px-1.5 py-0.5">
              walk into a VC room and close the deal.
            </span>
          </p>
        </div>

        {/* What You Get */}
        <section className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            What You Get
          </h2>
          {[
            {
              icon: "📊",
              title: "Pitch Deck Creation",
              color: "bg-[hsl(14,90%,90%)]",
              items: [
                "Investor-ready pitch deck built from scratch",
                "Problem, solution, market size, traction, team, ask — all structured",
                "Full structure & content provided — visual design is not included (you handle it, or hire a designer separately)",
                "Narrative crafted to hook and convert investors",
              ],
            },
            {
              icon: "📈",
              title: "Financial Plan",
              color: "bg-[hsl(210,75%,85%)]",
              items: [
                "Revenue model & projections (3–5 year)",
                "Unit economics: CAC, LTV, churn, MRR/ARR breakdown",
                "Use of funds slide with clear allocation",
                "VC due diligence-ready financial model",
              ],
            },
            {
              icon: "🎤",
              title: "Pitching Coaching",
              color: "bg-[hsl(140,50%,80%)]",
              items: [
                "Up to 16 live 1:1 sessions — 2 sessions per week, 1 hour each, over 2 months",
                "Pitch practice & feedback rounds",
                "Handling tough investor Q&A",
                "Body language, delivery, and confidence training",
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

        {/* Money-Back Guarantee */}
        <div className="bg-[hsl(140,50%,80%)] border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8 text-center">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-extrabold uppercase mb-2">14-Day Money-Back Guarantee</h3>
          <p className="font-semibold max-w-xl mx-auto">
            If you're not satisfied within the first 14 days of the program, you'll get a full refund — no questions asked. Your investment is completely risk-free.
          </p>
        </div>

        {/* Pricing */}
        <div className="bg-[hsl(14,90%,65%)] border-4 border-[hsl(0,0%,15%)] text-center p-10 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
            Investment
          </span>
          <div className="text-5xl md:text-6xl font-extrabold leading-none text-white">€2,000 EUR</div>
          <p className="text-lg font-semibold mt-3 text-white/90">One-time payment — full program access</p>
        </div>

        {/* Bank Details */}
        <div className="bg-[hsl(0,0%,15%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <span className="inline-block bg-[hsl(14,90%,65%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-white mb-4">
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
              "Built and scaled SaaS products across MENA & European markets",
              "Advisor to early-stage startups on product, fundraising & go-to-market",
              "Deep expertise in AI, product strategy, and investor relations",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-medium">
                <span className="bg-[hsl(14,90%,65%)] w-6 h-6 flex items-center justify-center font-extrabold flex-shrink-0 border-2 border-[hsl(0,0%,15%)] mt-0.5">
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
            className="inline-flex items-center gap-2 bg-[hsl(14,90%,65%)] text-white font-extrabold uppercase px-5 py-3 border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
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
              { label: "WhatsApp Number", key: "whatsapp", type: "tel", placeholder: "+971 xxx xxx xxxx" },
              { label: "Company / SaaS Name", key: "company", type: "text", placeholder: "Your business name" },
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
                { id: "agree1", text: "I understand the 3 deliverables: Pitch Deck (structure & content only, no design), Financial Plan, and up to 16 Pitching Coaching sessions (2 sessions/week × 1 hour × 2 months)." },
                { id: "agree2", text: "I commit to attending coaching sessions and providing necessary business information in a timely manner." },
                { id: "agree3", text: "I agree to pay €2,000 EUR as a one-time payment before the program begins." },
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
              className="w-full py-5 px-10 text-xl font-extrabold uppercase bg-[hsl(14,90%,65%)] text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "🚀 I'm In — Let's Raise!"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 border-t-4 border-[hsl(0,0%,15%)]">
          <p className="italic text-lg font-medium opacity-80 mb-5">
            "You have the business. Let's build the story that gets you funded."
          </p>
          <div className="font-bold">
            <p className="text-xl font-extrabold">— Ahmed Ezzat</p>
            <p className="text-sm opacity-70">Founder, Mentorna® | Startup Advisor & Investor Coach</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default JassimOffer;
