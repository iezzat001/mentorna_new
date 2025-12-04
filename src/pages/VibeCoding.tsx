import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  Code,
  Zap,
  ArrowRight,
  Mail,
  MessageCircle,
  Gift,
  Rocket,
  BarChart3,
  Clock,
  Target,
  Quote,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const VibeCoding = () => {
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [contactValue, setContactValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!contactValue.trim()) return;
    setIsSubmitting(true);

    try {
      const leadData = {
        email: contactMethod === 'email' ? contactValue.trim() : null,
        whatsapp: contactMethod === 'whatsapp' ? contactValue.trim() : null,
        source: 'Vibe Coding',
      };

      const { error } = await supabase
        .from('magnet_leads')
        .insert([leadData]);

      if (error) throw error;

      setIsSubscribed(true);
      toast({
        title: "Success!",
        description: "You've been subscribed successfully!",
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
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
          {/* Profile Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Profile Image */}
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

            {/* Bio Info */}
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
              
              {/* Stats Row */}
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

              {/* Bio Text */}
              <p className="font-body text-sm text-foreground/80 max-w-lg">
                🚀 Co-founder @Akadeemy & @Asent AI • 🎓 MSc AI & Computer Vision • 🇫🇮 Helsinki-based • Helping you build apps with AI — no code required
              </p>
            </div>
          </div>
          
          {/* Welcome Message */}
          <div className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-3 leading-tight">
              Welcome to Your Vibe Coding Journey! 🚀
            </h1>
            <p className="font-body text-base md:text-lg font-semibold text-foreground/80">
              Thanks for watching my TikTok! Here's your complete guide to building apps with AI — 
              no coding experience required. Let's turn your ideas into reality.
            </p>
          </div>
        </div>
      </section>

      {/* What is Vibe Coding Section */}
      <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-4">
            The Basics
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-6">
            What is Vibe Coding?
          </h2>
          
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white mb-8">
            <CardContent className="p-6 md:p-10">
              <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-6">
                Vibe Coding is a new way to build software where <span className="font-bold">you describe what you want in plain English</span>, 
                and AI writes all the code for you. No syntax, no debugging, no computer science degree needed.
              </p>
              
              <div className="bg-accent-purple/30 border-4 border-foreground p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Quote className="w-8 h-8 text-foreground mb-3" />
                <p className="font-heading font-bold text-foreground text-lg md:text-xl italic mb-3">
                  "Fully give in to the vibes, embrace exponentials, and forget that the code even exists."
                </p>
                <p className="font-body text-sm font-semibold text-foreground/70">
                  — Andrej Karpathy, Former AI Director at Tesla
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "1. Describe", desc: "Tell the AI what you want to build in plain English" },
              { icon: Zap, title: "2. Generate", desc: "AI writes all the code, sets up databases, handles everything" },
              { icon: Rocket, title: "3. Launch", desc: "One-click deploy your app to the world" }
            ].map((item, i) => (
              <Card key={i} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent-yellow border-2 border-foreground flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                  <p className="font-body text-foreground/70">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-foreground text-background border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Badge className="bg-accent-yellow text-foreground font-black uppercase px-3 py-1 text-xs mb-4 border-2 border-foreground">
            <BarChart3 className="w-3 h-3 inline mr-1" />
            Market Stats
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-background mb-8">
            The Numbers Don't Lie
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { value: "$81B", label: "Market by 2035", icon: DollarSign, sublabel: "Generative AI Coding" },
              { value: "32%", label: "Annual Growth", icon: TrendingUp, sublabel: "CAGR" },
              { value: "50%", label: "Faster Coding", icon: Zap, sublabel: "Efficiency Boost" },
              { value: "95%", label: "Cost Savings", icon: Clock, sublabel: "vs Traditional Dev" }
            ].map((stat, i) => (
              <Card key={i} className="border-4 border-background shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] bg-background/10">
                <CardContent className="p-4 md:p-6 text-center">
                  <stat.icon className="w-8 h-8 text-accent-yellow mx-auto mb-2" />
                  <div className="font-heading text-2xl md:text-4xl font-black text-accent-yellow">{stat.value}</div>
                  <p className="font-body text-sm font-semibold text-background/90">{stat.label}</p>
                  <p className="font-body text-xs text-background/60">{stat.sublabel}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card className="border-4 border-background bg-background/10 overflow-hidden">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground py-4">
              <CardTitle className="font-black text-lg uppercase text-foreground text-center">
                Traditional Dev vs Vibe Coding
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-3 text-center">
                <div className="p-4 border-r-2 border-background/30 font-bold text-background/70">Metric</div>
                <div className="p-4 border-r-2 border-background/30 font-bold text-background/70">Traditional</div>
                <div className="p-4 font-bold text-accent-yellow">Vibe Coding</div>
              </div>
              {[
                { metric: "Time to MVP", old: "3-9 months", new: "Hours/Days" },
                { metric: "Cost", old: "$50K-$300K", new: "$25/month" },
                { metric: "Team Size", old: "3-5 people", new: "Just You" },
                { metric: "Code Knowledge", old: "Required", new: "Optional" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 text-center border-t-2 border-background/20">
                  <div className="p-3 md:p-4 border-r-2 border-background/20 font-semibold text-background/80 text-sm">{row.metric}</div>
                  <div className="p-3 md:p-4 border-r-2 border-background/20 text-background/60 text-sm">{row.old}</div>
                  <div className="p-3 md:p-4 font-bold text-accent-yellow text-sm">{row.new}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <p className="text-center text-background/50 text-xs mt-6">Sources: Market Research Future, Gartner, Business Wire 2025</p>
        </div>
      </section>


      {/* Lead Capture - Middle of Page */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-lg mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground text-center py-6">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-foreground" />
              <CardTitle className="font-black text-xl md:text-2xl uppercase">
                {isSubscribed ? "You're In! 🎉" : "Get More Tips & Updates"}
              </CardTitle>
              {!isSubscribed && (
                <p className="font-body text-sm text-foreground/80 mt-2">
                  Join the community learning to build with AI
                </p>
              )}
            </CardHeader>
            
            <CardContent className="p-6">
              {isSubscribed ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
                  <p className="font-body text-lg font-semibold text-foreground">
                    Thanks for joining! Check your inbox for more resources.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {!contactMethod && (
                    <div className="space-y-3">
                      <Button
                        onClick={() => setContactMethod('email')}
                        className="w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Subscribe with Email
                      </Button>
                      <Button
                        onClick={() => setContactMethod('whatsapp')}
                        className="w-full bg-accent-green text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Join WhatsApp Updates
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
                        onClick={handleSubmit}
                        disabled={isSubmitting || !contactValue.trim()}
                        className="w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-5 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe →'}
                      </Button>
                      <button
                        onClick={() => { setContactMethod(null); setContactValue(''); }}
                        className="w-full text-sm font-medium text-foreground/60 hover:text-foreground"
                      >
                        ← Choose different method
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-center text-foreground/60">🔒 No spam. Unsubscribe anytime.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Success Stories Section */}
      <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Badge className="bg-accent-green text-foreground font-black uppercase px-3 py-1 text-xs mb-4 border-2 border-foreground">
            <Users className="w-3 h-3 inline mr-1" />
            Success Stories
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-4">
            Real Founders, Real Revenue
          </h2>
          <p className="font-body text-lg text-foreground/70 mb-8 max-w-2xl">
            These founders used AI tools to build apps generating hundreds of thousands in revenue — with zero engineering teams.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Sabrine Matos - Plinq */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all overflow-hidden">
              <div className="h-48 overflow-hidden border-b-4 border-foreground">
                <img src="/plinq-app.png" alt="Plinq App" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="bg-accent-purple border-b-4 border-foreground py-4">
                <div className="flex items-center gap-3">
                  <img src="/sabrine-matos.png" alt="Sabrine Matos" className="w-12 h-12 rounded-full border-2 border-foreground object-cover" />
                  <div>
                    <CardTitle className="font-black text-lg text-foreground">Sabrine Matos</CardTitle>
                    <p className="text-xs font-semibold text-foreground/80">Growth Marketer • Brazil</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-2 mb-3">
                  <span className="bg-accent-yellow border-2 border-foreground px-2 py-0.5 font-black text-xs">$456K ARR</span>
                  <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs">45 Days</span>
                </div>
                <h4 className="font-bold text-base mb-2">Plinq</h4>
                <p className="font-body text-sm text-foreground/80 mb-3">
                  Women's safety app with instant criminal record checks. 10K+ users, 300% MoM growth, now raising $500K pre-seed.
                </p>
                <p className="text-xs text-foreground/60 italic">"Built with Lovable — no engineering degree needed."</p>
              </CardContent>
            </Card>

            {/* Steven Cravotta - Puff Count */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all overflow-hidden">
              <div className="h-48 overflow-hidden border-b-4 border-foreground">
                <img src="/puffcount-app.jpg" alt="Puff Count App" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="bg-accent-blue border-b-4 border-foreground py-4">
                <div className="flex items-center gap-3">
                  <img src="/steven-cravotta.jpg" alt="Steven Cravotta" className="w-12 h-12 rounded-full border-2 border-foreground object-cover" />
                  <div>
                    <CardTitle className="font-black text-lg text-foreground">Steven Cravotta</CardTitle>
                    <p className="text-xs font-semibold text-foreground/80">Solo Founder • Age 27</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-2 mb-3">
                  <span className="bg-accent-yellow border-2 border-foreground px-2 py-0.5 font-black text-xs">$40K/mo</span>
                  <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs">0 Employees</span>
                </div>
                <h4 className="font-bold text-base mb-2">Puff Count</h4>
                <p className="font-body text-sm text-foreground/80 mb-3">
                  Vaping cessation app helping 1M+ users quit. $480K/year revenue, acquired by Mobile App Studio. Featured in WSJ, Forbes, BBC.
                </p>
                <p className="text-xs text-foreground/60 italic">"Self-taught developer, built with React Native + AI."</p>
              </CardContent>
            </Card>

            {/* Yannis Karagiannidis - PrintPigeon */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all overflow-hidden">
              <div className="h-48 overflow-hidden border-b-4 border-foreground">
                <img src="/printpigeon-hero.png" alt="PrintPigeon App" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="bg-accent-green border-b-4 border-foreground py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-foreground bg-foreground flex items-center justify-center text-xl">🇬🇷</div>
                  <div>
                    <CardTitle className="font-black text-lg text-foreground">Yannis Karagiannidis</CardTitle>
                    <p className="text-xs font-semibold text-foreground/80">Growth Marketer • Greece</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-2 mb-3">
                  <span className="bg-accent-yellow border-2 border-foreground px-2 py-0.5 font-black text-xs">Profitable</span>
                  <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs">3 Days</span>
                </div>
                <h4 className="font-bold text-base mb-2">PrintPigeon</h4>
                <p className="font-body text-sm text-foreground/80 mb-3">
                  Send letters online without a printer. Built MVP in 3 days for $38 in Lovable credits. Now profitable micro-SaaS.
                </p>
                <p className="text-xs text-foreground/60 italic">"From frustration to revenue in a weekend."</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow">
            <CardContent className="p-6 md:p-8">
              <Quote className="w-8 h-8 text-foreground mb-3" />
              <p className="font-heading font-bold text-foreground text-lg md:text-xl mb-4">
                "Spend all of your time vibe-coding. Mastering this skill now gives you a 10,000-hour competitive advantage."
              </p>
              <p className="font-body text-sm font-semibold text-foreground/70">
                — Alexandr Wang, World's Youngest Self-Made Billionaire (Scale AI)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Tools Comparison Section */}
      <section className="py-12 md:py-16 bg-accent-blue/20 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Badge className="bg-accent-blue text-foreground font-black uppercase px-3 py-1 text-xs mb-4 border-2 border-foreground">
            <Code className="w-3 h-3 inline mr-1" />
            Tools
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-8">
            Popular Vibe Coding Tools
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: "Cursor", 
                ease: "⭐⭐⭐", 
                easeLabel: "Advanced",
                best: "Pro Developers", 
                color: "bg-white",
                desc: "AI-native code editor. Fork of VS Code with deep codebase awareness.",
                features: ["Full code control", "Language agnostic", "Local files"]
              },
              { 
                name: "Lovable", 
                ease: "⭐⭐⭐⭐⭐", 
                easeLabel: "Easiest",
                best: "Everyone", 
                color: "bg-accent-yellow", 
                recommended: true,
                desc: "Click-to-edit visual builder with auto database setup. Perfect for beginners.",
                features: ["Visual editing", "Auto Supabase", "One-click deploy"]
              },
              { 
                name: "Claude Code", 
                ease: "⭐⭐⭐⭐", 
                easeLabel: "Intermediate",
                best: "Power Users", 
                color: "bg-white",
                desc: "Command-line AI assistant from Anthropic. Great for complex projects.",
                features: ["Terminal-based", "Deep reasoning", "Full autonomy"]
              }
            ].map((tool, i) => (
              <Card key={i} className={`border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${tool.color} ${tool.recommended ? 'ring-4 ring-primary ring-offset-2' : ''}`}>
                {tool.recommended && (
                  <div className="bg-primary text-white text-center py-2 font-black text-sm uppercase border-b-4 border-foreground">
                    ⭐ Recommended for Beginners
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-heading text-2xl font-black mb-2">{tool.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{tool.ease}</span>
                    <span className="text-sm font-semibold text-foreground/70">{tool.easeLabel}</span>
                  </div>
                  <p className="font-body text-sm text-foreground/80 mb-4">{tool.desc}</p>
                  <div className="space-y-2">
                    {tool.features.map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent-green" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-foreground/20">
                    <span className="font-semibold text-sm">Best For: </span>
                    <span className="font-bold text-sm">{tool.best}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Badge className="bg-primary text-white font-black uppercase px-3 py-1 text-xs mb-4">
            <Rocket className="w-3 h-3 inline mr-1" />
            Tutorial
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-4">
            Build Your First App in 5 Steps
          </h2>
          <p className="font-body text-lg text-foreground/70 mb-10 max-w-2xl">
            Follow this guide to go from zero to a live app in under an hour. No coding required.
          </p>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Sign Up for Lovable (Free)",
                desc: "Create your free account at lovable.dev. Use my referral link below to get 10 bonus credits.",
                tip: "No credit card required to start",
                color: "bg-accent-yellow"
              },
              {
                step: "2",
                title: "Describe Your App Idea",
                desc: "In the chat box, describe what you want to build in plain English. Be specific about features, colors, and functionality.",
                tip: "Example: \"Build a habit tracker app with a calendar view, streak counter, and dark mode\"",
                color: "bg-accent-purple"
              },
              {
                step: "3",
                title: "Watch AI Generate Your App",
                desc: "Lovable will create your entire app — frontend, backend, database, and authentication — in minutes.",
                tip: "You'll see a live preview as it builds",
                color: "bg-accent-blue"
              },
              {
                step: "4",
                title: "Customize with Click-to-Edit",
                desc: "Click any element to change text, colors, or layout. Or chat to request changes like \"make the header bigger\" or \"add a login page\".",
                tip: "No code editing needed — just point and click",
                color: "bg-accent-green"
              },
              {
                step: "5",
                title: "Deploy with One Click",
                desc: "Hit 'Publish' and your app goes live instantly with a free lovable.app URL. Add your custom domain anytime.",
                tip: "Share your live app link with the world!",
                color: "bg-primary"
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6">
                <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 ${item.color} border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center`}>
                  <span className="font-heading text-2xl md:text-3xl font-black text-foreground">{item.step}</span>
                </div>
                <Card className="flex-1 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-heading text-lg md:text-xl font-black mb-2">{item.title}</h3>
                    <p className="font-body text-foreground/80 mb-3">{item.desc}</p>
                    <div className="bg-foreground/5 border-2 border-foreground/20 px-3 py-2 rounded">
                      <p className="font-body text-sm text-foreground/70">
                        <span className="font-bold">💡 Tip:</span> {item.tip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="font-body text-lg font-semibold text-foreground mb-4">
              Ready to build? Scroll down to claim your free credits! 👇
            </p>
          </div>
        </div>
      </section>


      {/* Lovable CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container mx-auto px-4">
          <Card className="border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white max-w-2xl mx-auto">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground text-center py-8">
              <Gift className="w-16 h-16 mx-auto mb-4 text-foreground" />
              <CardTitle className="font-black text-2xl md:text-3xl uppercase">
                Your Free Gift! 🎁
              </CardTitle>
              <p className="font-body text-sm text-foreground/80 mt-2">
                Start building with 10 FREE credits on Lovable
              </p>
            </CardHeader>
            <CardContent className="p-6 md:p-10 text-center">
              <p className="font-body text-lg font-semibold mb-6">
                Lovable is the easiest way to start vibe coding. Click-to-edit interface, automatic database setup, one-click deploy.
              </p>

              <div className="bg-accent-purple/20 border-2 border-foreground p-4 mb-6 text-left">
                <p className="font-bold text-sm mb-2">💎 What 10 Credits Gets You:</p>
                <ul className="font-body text-sm space-y-1 text-foreground/80">
                  <li>• Build a complete landing page</li>
                  <li>• Create multiple features & pages</li>
                  <li>• Worth ~$2.50 (10% of Pro subscription)</li>
                </ul>
              </div>

              <Button
                className="w-full bg-primary border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black text-lg py-8 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                onClick={() => window.open('https://lovable.dev/invite/9DSSP01', '_blank')}
              >
                <Rocket className="w-6 h-6 mr-2" />
                Get 10 Free Credits on Lovable
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>

              <p className="text-sm text-foreground/60 mt-4 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Opens lovable.dev with your bonus applied
              </p>
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
            <a href="https://www.tiktok.com/@ahmed.ezzat4695" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent-yellow transition-colors font-medium">TikTok</a>
            <a href="https://www.instagram.com/ahmedezzat_fi" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent-yellow transition-colors font-medium">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VibeCoding;
