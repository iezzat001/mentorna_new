import { useState, useEffect } from "react";
import { Check, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MohamedOffer = () => {
  // All hooks must be at the top, before any conditional returns
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    signature: "",
    agree1: false,
    agree2: false,
    agree3: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("mohamed_offer_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (passcode === "4948") {
      sessionStorage.setItem("mohamed_offer_auth", "true");
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
        signature: formData.signature,
        offer_type: "solopreneur_launchpad",
        total_amount: 49500,
        currency: "EGP",
        installment_amount: 16500,
        installments_count: 3,
        agreed_terms: {
          sessions_commitment: formData.agree1,
          tasks_commitment: formData.agree2,
          payment_agreement: formData.agree3,
        },
        status: "pending",
      });

      if (error) throw error;

      toast.success("Contract signed successfully!");
      alert(
        `Thank you, ${formData.fullName}! 🎉\n\nYour enrollment has been received. I'll confirm your payment and send onboarding details shortly.`
      );
    } catch (err) {
      console.error("Error saving contract:", err);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,98%)] flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-5">
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[hsl(45,95%,65%)] border-4 border-[hsl(0,0%,15%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
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
              className="w-full py-4 px-8 text-lg font-extrabold uppercase bg-[hsl(45,95%,65%)] text-[hsl(0,0%,15%)] border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unlock Offer
            </button>
          </form>
          <p className="text-xs font-medium opacity-50 mt-6">Mentorna® | Exclusive Access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="text-center py-10 px-5 bg-[hsl(45,95%,65%)] border-b-4 border-[hsl(0,0%,15%)]">
        <div className="text-xl font-light tracking-[2px] mb-5">Mentorna®</div>
        <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
          Exclusive 1:1 Program
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-2">
          Solopreneur Launchpad
        </h1>
        <p className="text-lg font-semibold opacity-90">3-Month Mentorship with Ahmed Ezzat</p>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        {/* For Who */}
        <section className="mb-8">
          <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)]">
            Prepared For
          </span>
          <h2 className="text-3xl font-extrabold mt-3">Mohamed Youssef</h2>
          <p className="font-semibold opacity-80">Media Buyer → Digital Product Creator</p>
        </section>

        {/* Promise */}
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            The Promise
          </h2>
          <p className="text-xl font-semibold">
            In 90 days, you will go from "idea in your head" to{" "}
            <span className="bg-[hsl(45,95%,65%)] px-1.5 py-0.5">launched MVP with a clear offer</span> —
            ready to generate revenue from your own digital product.
          </p>
        </div>

        {/* What You Get */}
        <section className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            What You Get
          </h2>
          {[
            {
              icon: "📅",
              title: "12 Weeks of 1:1 Mentorship",
              items: ["2x sessions per week (1.5 hours each)", "24 total sessions of direct coaching"],
            },
            {
              icon: "💬",
              title: "Async Support",
              items: [
                "Telegram access for quick questions",
                "Loom videos",
                "Response within 24 hours (business days Mon-Fri)",
              ],
            },
            {
              icon: "📦",
              title: "Frameworks & Templates",
              items: [
                "Customer interview scripts",
                "Idea validation checklist",
                "Landing page templates",
                "Offer creation framework",
                "Launch campaign playbook",
              ],
            },
            {
              icon: "🛠️",
              title: "Done-With-You Deliverables",
              items: [
                "Professional portfolio/landing page (already started for you)",
                "Sales funnel setup",
                "Social media traction strategy",
              ],
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 mb-5"
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
                    phase: "Validate",
                    weeks: "1–4",
                    outcome: "Problem validated, target customer defined, offer drafted",
                    color: "bg-[hsl(260,50%,75%)]",
                  },
                  {
                    phase: "Build",
                    weeks: "5–8",
                    outcome: "MVP built, landing page live, funnel ready",
                    color: "bg-[hsl(210,75%,70%)]",
                  },
                  {
                    phase: "Launch",
                    weeks: "9–12",
                    outcome: "First customers, revenue generated, growth system in place",
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

        {/* Portfolio Preview */}
        <div className="bg-[hsl(260,50%,75%)] border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-5 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            🎁 Already Started For You
          </h2>
          <p className="text-lg font-semibold mb-5">
            I've already built a preview of your new professional portfolio. This is just the beginning
            — we'll refine it together to convert visitors into clients.
          </p>
          <a
            href="https://mohamedyoussef.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[hsl(0,0%,15%)] text-white py-4 px-8 font-extrabold uppercase no-underline border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            👀 Preview Your Portfolio
          </a>
        </div>

        {/* Pricing */}
        <div className="bg-[hsl(45,95%,65%)] border-4 border-[hsl(0,0%,15%)] text-center p-10 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="inline-block bg-[hsl(0,0%,15%)] text-white text-xs font-extrabold uppercase py-1.5 px-3 border-2 border-[hsl(0,0%,15%)] mb-4">
            Investment
          </span>
          <div className="text-5xl md:text-6xl font-extrabold leading-none">49,500 EGP</div>
          <p className="text-lg font-semibold mt-3">3 monthly installments of 16,500 EGP</p>
        </div>

        {/* Payment Info */}
        <div className="bg-[hsl(140,50%,60%)] border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 mb-8">
          <h3 className="text-lg font-extrabold uppercase mb-3">💳 Payment Details</h3>
          <p className="font-semibold mb-4">
            First installment: <strong>16,500 EGP</strong>
          </p>
          <p className="font-bold mb-2">Send via InstaPay to:</p>
          <div className="bg-white border-4 border-[hsl(0,0%,15%)] p-4 text-2xl md:text-3xl font-extrabold text-center tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            +20 120 532 9570
          </div>
          <p className="text-sm mt-3 opacity-80">
            After payment, fill the form below to confirm your enrollment.
          </p>
        </div>

        {/* Guarantee */}
        <div className="bg-white border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <h3 className="text-xl font-extrabold uppercase mb-4 flex items-center gap-3">
            🛡️ The Guarantee
          </h3>
          <p className="font-semibold mb-4">
            Complete the program with full commitment, and if you don't have a launched MVP with a
            clear offer by the end of Month 3 —{" "}
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

        {/* Form Section */}
        <div className="bg-[hsl(0,0%,15%)] text-white p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-extrabold uppercase mb-6 pb-3 border-b-4 border-white inline-block">
            Secure Your Spot
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-5">
              <label className="block font-bold uppercase text-sm mb-2 tracking-wider">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full p-4 text-[hsl(0,0%,15%)] font-semibold border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label className="block font-bold uppercase text-sm mb-2 tracking-wider">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full p-4 text-[hsl(0,0%,15%)] font-semibold border-4 border-[hsl(0,0%,15%)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
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
            {/* Agreement */}
            <div className="bg-white/10 p-5 mb-5 border-2 border-white/30">
              <p className="text-sm mb-4">By signing above and submitting this form, I agree to the following:</p>
              {[
                {
                  id: "agree1",
                  text: "I commit to attending all scheduled sessions and completing assigned tasks as outlined in the program.",
                },
                {
                  id: "agree2",
                  text: "I understand that missing more than 2 sessions OR failing to complete more than 2 assigned tasks will void the money-back guarantee.",
                },
                {
                  id: "agree3",
                  text: "I agree to pay 49,500 EGP in 3 installments (16,500 EGP each via InstaPay).",
                },
              ].map((checkbox) => (
                <div key={checkbox.id} className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    required
                    className="w-6 h-6 flex-shrink-0 mt-0.5 cursor-pointer"
                    checked={formData[checkbox.id as keyof typeof formData] as boolean}
                    onChange={(e) => setFormData({ ...formData, [checkbox.id]: e.target.checked })}
                  />
                  <label htmlFor={checkbox.id} className="font-semibold cursor-pointer">
                    {checkbox.text}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-10 text-xl font-extrabold uppercase bg-[hsl(45,95%,65%)] text-[hsl(0,0%,15%)] border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "🚀 I'm In — Let's Build!"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 border-t-4 border-[hsl(0,0%,15%)]">
          <p className="italic text-lg font-medium opacity-80 mb-5">
            "Your skills got you here. Let's build the product that scales them."
          </p>
          <div className="font-bold">
            <p className="text-xl font-extrabold">— Ahmed Ezzat</p>
            <p className="text-sm opacity-70">Founder, Mentorna® | AI & Solopreneurship</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MohamedOffer;
