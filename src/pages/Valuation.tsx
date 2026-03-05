import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, CheckCircle, Mail, MessageCircle, Sparkles } from 'lucide-react';

type ContactMethod = 'email' | 'whatsapp' | null;

type IndustryKey = 'saas' | 'fintech' | 'healthtech' | 'ecommerce';

const INDUSTRIES: Array<{ key: IndustryKey; label: string; multiple: number }> = [
  { key: 'saas', label: 'SaaS', multiple: 8 },
  { key: 'fintech', label: 'FinTech', multiple: 7 },
  { key: 'healthtech', label: 'HealthTech', multiple: 8.5 },
  { key: 'ecommerce', label: 'E-Commerce', multiple: 3 },
];

const formatMoney = (value: number) => {
  if (!Number.isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const Valuation = () => {
  const { toast } = useToast();

  const [mrr, setMrr] = useState('');
  const [industry, setIndustry] = useState<IndustryKey>('saas');
  const [growthRate, setGrowthRate] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const [contactMethod, setContactMethod] = useState<ContactMethod>(null);
  const [contactValue, setContactValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const numeric = useMemo(() => {
    const mrrNum = Number(mrr);
    const growthNum = Number(growthRate);
    const investNum = Number(investmentAmount);

    return {
      mrr: Number.isFinite(mrrNum) ? Math.max(0, mrrNum) : 0,
      growthRate: Number.isFinite(growthNum) ? Math.max(0, growthNum) : 0,
      investmentAmount: Number.isFinite(investNum) ? Math.max(0, investNum) : 0,
    };
  }, [mrr, growthRate, investmentAmount]);

  const results = useMemo(() => {
    const arr = numeric.mrr * 12;
    const multiple = INDUSTRIES.find(i => i.key === industry)?.multiple ?? 8;
    const baseValuation = arr * multiple;
    const growthMultiplier = 1 + (numeric.growthRate / 100);
    const growthAdjustedValuation = baseValuation * growthMultiplier;
    const postMoney = growthAdjustedValuation + numeric.investmentAmount;
    const dilution = postMoney > 0 ? (numeric.investmentAmount / postMoney) * 100 : 0;

    return {
      arr,
      multiple,
      baseValuation,
      growthAdjustedValuation,
      postMoney,
      dilutionPercent: clamp(dilution, 0, 100),
    };
  }, [numeric.mrr, numeric.growthRate, numeric.investmentAmount, industry]);

  const canUnlock = useMemo(() => {
    const hasInputs = numeric.mrr >= 0 && numeric.growthRate >= 0 && numeric.investmentAmount >= 0;
    const hasContact = contactValue.trim().length > 0 && !!contactMethod;
    return hasInputs && hasContact;
  }, [numeric, contactValue, contactMethod]);

  const handleUnlock = async () => {
    if (!canUnlock) return;
    setIsSubmitting(true);

    try {
      const leadData = {
        email: contactMethod === 'email' ? contactValue.trim() : null,
        whatsapp: contactMethod === 'whatsapp' ? contactValue.trim() : null,
        source: 'Valuation Calculator',
      };

      const { data: leadRow, error: leadError } = await supabase
        .from('magnet_leads')
        .insert([leadData])
        .select('id')
        .single();

      if (leadError) throw leadError;

      const { error: submissionError } = await supabase
        .from('valuation_submissions')
        .insert([
          {
            lead_id: leadRow?.id ?? null,
            mrr: numeric.mrr,
            industry: INDUSTRIES.find(i => i.key === industry)?.label ?? 'SaaS',
            growth_rate: numeric.growthRate,
            investment_amount: numeric.investmentAmount,
            base_valuation: results.baseValuation,
            growth_adjusted_valuation: results.growthAdjustedValuation,
            post_money_valuation: results.postMoney,
            dilution_percent: results.dilutionPercent,
          },
        ]);

      if (submissionError) throw submissionError;

      setIsUnlocked(true);
      toast({
        title: 'Unlocked!',
        description: "We've sent your results on-screen. You're subscribed successfully.",
      });
    } catch (error) {
      console.error('Unlock valuation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to unlock results. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Personalized Welcome Header - TikTok/IG Style */}
      <section className="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70 border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
                <img
                  src="https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png"
                  alt="Ahmed Ezzat"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-accent-blue border-2 border-foreground rounded-full p-1">
                <CheckCircle className="w-5 h-5 text-foreground" />
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground">
                  Ahmed Ezzat
                </h2>
                <Badge className="bg-foreground text-background font-bold text-xs px-2 py-0.5 w-fit mx-auto md:mx-0">
                  @mentorna
                </Badge>
              </div>
              <p className="font-body text-sm md:text-base font-semibold text-foreground/80 mb-3">
                AI Consultant & Serial Entrepreneur
              </p>

              <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <p className="font-heading font-black text-lg md:text-xl text-foreground">10+</p>
                  <p className="text-xs font-semibold text-foreground/70">Years in AI</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-black text-lg md:text-xl text-foreground">300+</p>
                  <p className="text-xs font-semibold text-foreground/70">Students Helped</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-black text-lg md:text-xl text-foreground">3</p>
                  <p className="text-xs font-semibold text-foreground/70">Startups</p>
                </div>
              </div>

              <p className="font-body text-sm text-foreground/80 max-w-lg">
                🚀 Co-founder @Akadeemy & @Asent AI • 🎓 MSc AI & Computer Vision • 🇫🇮 Helsinki-based • Helping you build apps with AI — no code required
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-foreground text-background border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground leading-tight">
                  Startup Valuation Calculator
                </h1>
                <p className="font-body text-sm md:text-base font-semibold text-foreground/80">
                  Quick estimate using MRR, industry multiple, growth rate, and investment amount.
                </p>
              </div>
            </div>
            <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs">
              Lead Magnet
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <CardHeader className="bg-accent-blue border-b-4 border-foreground">
                <CardTitle className="font-black text-xl uppercase">Inputs</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="font-bold text-sm uppercase block">Monthly Recurring Revenue (MRR)</label>
                  <Input
                    inputMode="decimal"
                    placeholder="e.g. 15000"
                    value={mrr}
                    onChange={(e) => setMrr(e.target.value)}
                    className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-sm uppercase block">Industry</label>
                  <Select value={industry} onValueChange={(v) => setIndustry(v as IndustryKey)}>
                    <SelectTrigger className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-foreground">
                      {INDUSTRIES.map((i) => (
                        <SelectItem key={i.key} value={i.key} className="font-semibold">
                          {i.label} ({i.multiple}x ARR)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-sm uppercase block">Annual Growth Rate (%)</label>
                  <Input
                    inputMode="decimal"
                    placeholder="e.g. 50"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                    className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-sm uppercase block">Investment Amount</label>
                  <Input
                    inputMode="decimal"
                    placeholder="e.g. 500000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <CardHeader className="bg-accent-purple border-b-4 border-foreground">
                <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Unlock Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {isUnlocked ? (
                  <div className="text-center py-2">
                    <CheckCircle className="w-14 h-14 text-accent-green mx-auto mb-3" />
                    <p className="font-body text-lg font-semibold text-foreground">Results unlocked.</p>
                    <p className="text-sm text-foreground/70">Scroll to see your valuation breakdown.</p>
                  </div>
                ) : (
                  <>
                    {!contactMethod && (
                      <div className="space-y-3">
                        <Button
                          onClick={() => setContactMethod('email')}
                          className="w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Unlock with Email
                        </Button>
                        <Button
                          onClick={() => setContactMethod('whatsapp')}
                          className="w-full bg-accent-green text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Unlock with WhatsApp
                        </Button>
                      </div>
                    )}

                    {contactMethod && (
                      <div className="space-y-4">
                        <div>
                          <label className="font-bold text-sm uppercase mb-2 block">
                            {contactMethod === 'email' ? 'Your Email' : 'WhatsApp Number'}
                          </label>
                          <Input
                            type={contactMethod === 'email' ? 'email' : 'tel'}
                            placeholder={contactMethod === 'email' ? 'your@email.com' : '+1 234 567 8900'}
                            value={contactValue}
                            onChange={(e) => setContactValue(e.target.value)}
                            className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold text-base py-5"
                          />
                        </div>

                        <Button
                          onClick={handleUnlock}
                          disabled={isSubmitting || !canUnlock}
                          className="w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-5 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? 'Unlocking...' : 'Unlock Results →'}
                        </Button>

                        <button
                          onClick={() => {
                            setContactMethod(null);
                            setContactValue('');
                          }}
                          className="w-full text-sm font-medium text-foreground/60 hover:text-foreground"
                        >
                          ← Choose different method
                        </button>
                        <p className="text-xs text-center text-foreground/60">🔒 No spam. Unsubscribe anytime.</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container mx-auto px-4">
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
              <CardTitle className="font-black text-2xl uppercase">Results</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!isUnlocked ? (
                <div className="text-center py-10">
                  <p className="font-body text-lg font-semibold text-foreground mb-2">
                    Enter your info above to unlock your valuation.
                  </p>
                  <p className="text-sm text-foreground/70">Results are hidden until you subscribe.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-2 border-foreground/20 p-3">
                      <span className="font-semibold">ARR</span>
                      <span className="font-black">{formatMoney(results.arr)}</span>
                    </div>
                    <div className="flex items-center justify-between border-2 border-foreground/20 p-3">
                      <span className="font-semibold">Industry Multiple</span>
                      <span className="font-black">{results.multiple}x</span>
                    </div>
                    <div className="flex items-center justify-between border-2 border-foreground/20 p-3">
                      <span className="font-semibold">Base Valuation</span>
                      <span className="font-black">{formatMoney(results.baseValuation)}</span>
                    </div>
                    <div className="flex items-center justify-between border-2 border-foreground/20 p-3">
                      <span className="font-semibold">Growth-Adjusted Valuation</span>
                      <span className="font-black">{formatMoney(results.growthAdjustedValuation)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-2 border-foreground/20 p-3">
                      <span className="font-semibold">Post-money Valuation</span>
                      <span className="font-black">{formatMoney(results.postMoney)}</span>
                    </div>
                    <div className="flex items-center justify-between border-2 border-foreground/20 p-3">
                      <span className="font-semibold">Dilution</span>
                      <span className="font-black">{results.dilutionPercent.toFixed(1)}%</span>
                    </div>
                    <div className="border-4 border-foreground p-4 bg-accent-green/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold uppercase text-sm mb-1">Reminder</p>
                      <p className="text-sm text-foreground/80">
                        This is a directional estimate based on ARR multiples and growth; investor terms vary by market,
                        margins, retention, and capital efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 border-t-4 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-xl font-bold mb-2">Mentorna®</p>
          <p className="font-body text-sm text-background/70 mb-4">Empowering the next generation of AI builders</p>
          <p className="font-body text-xs text-background/50 mb-4">Follow me 👇</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.tiktok.com/@ahmed.ezzat4695"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-accent-yellow transition-colors font-medium"
            >
              TikTok
            </a>
            <a
              href="https://www.instagram.com/ahmedezzat_fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-accent-yellow transition-colors font-medium"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Valuation;
