import { ReactNode } from "react";
import {
  Lightbulb, Code2, Server, Rocket,
  Snail, DollarSign, GraduationCap, Construction, CalendarDays,
  Zap, PiggyBank, Eye, DoorOpen, Timer,
  Target, Blocks, RefreshCw, Hourglass, CheckCircle2,
  Sparkles, Bolt, Terminal,
  Pencil, Bot, Search, Scissors,
  Pen, Layout, ImageIcon, Monitor, Database, Brush,
  Split, Scale,
  FileText, Workflow,
  Filter, Megaphone, Users, Building2, MousePointerClick, Heart, ShoppingCart, TrendingUp,
  Radio, Mic, MessageSquare, Network, Briefcase, Handshake, LineChart, Award, Trophy,
  Mail, UserCheck, PhoneCall, ClipboardList,
} from "lucide-react";
import { sections, pitchBlock, workshopInfo } from "@/data/workshop";

export type Slide = {
  sectionId?: number; // 0 = welcome/format/closing/pitch, 1-5 = section slides
  title: string;
  notes: string;
  render: () => ReactNode;
};

const Frame = ({ children, bg = "bg-background" }: { children: ReactNode; bg?: string }) => (
  <div className={`min-h-screen w-full ${bg} flex items-center justify-center px-4 md:px-8 py-20`}>
    <div className="max-w-6xl mx-auto w-full">{children}</div>
  </div>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h2 className="font-black uppercase text-3xl md:text-6xl leading-[0.95] tracking-tight">{children}</h2>
);

const Label = ({ children, color = "bg-foreground text-background" }: { children: ReactNode; color?: string }) => (
  <div className={`inline-block ${color} font-black uppercase text-xs px-3 py-1 mb-4 tracking-wider border-2 border-foreground`}>{children}</div>
);

const Quote = ({ children, attribution }: { children: ReactNode; attribution?: string }) => (
  <div className="bg-accent-purple/40 border-4 border-foreground brutal-shadow-sm p-6 md:p-8 my-6">
    <div className="font-black text-xl md:text-2xl leading-tight">"{children}"</div>
    {attribution && <div className="mt-2 font-bold text-sm text-foreground/70">— {attribution}</div>}
  </div>
);

const StepNum = ({ n, color = "bg-accent-yellow" }: { n: number; color?: string }) => (
  <div className={`w-14 h-14 md:w-16 md:h-16 ${color} border-4 border-foreground brutal-shadow-sm flex items-center justify-center font-black text-2xl md:text-3xl shrink-0`}>
    {n}
  </div>
);

const accentColors = ["bg-accent-yellow", "bg-accent-purple", "bg-accent-blue", "bg-accent-green", "bg-primary text-primary-foreground"];

function generateGenericSlides(): Slide[] {
  const result: Slide[] = [];
  for (const block of sections.slice(5)) {
    const blockId = block.id;
    const bgColor = blockId % 2 === 0 ? "bg-[hsl(0,0%,98%)]" : "bg-background";
    result.push({
      sectionId: blockId,
      title: "Section " + blockId + " Theory: " + block.theoryTitle,
      notes: "Section " + blockId + " theory. Keep this tight \u2014 10 minutes max. Hit the key points, then flip to the build slide and get them working immediately.",
      render: () => (
        <Frame bg={bgColor}>
          <Label color={block.color + " text-foreground"}>Section {blockId} · Theory · {block.theoryDuration}</Label>
          <Title>{block.theoryTitle}</Title>
          <div className="mt-10 space-y-3">
            {((block as any).theory?.points ?? []).map((point: string, i: number) => (
              <div key={i} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-stretch">
                <StepNum n={i + 1} color={accentColors[i]} />
                <div className="p-4 md:p-6 flex-1">
                  <div className="font-black text-lg md:text-xl">{point}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow p-6">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-2">Now Build · {block.buildDuration}</div>
            <div className="font-black text-xl md:text-2xl">{block.buildTitle}</div>
          </div>
        </Frame>
      ),
    });
    result.push({
      sectionId: blockId,
      title: "Section " + blockId + " Build: " + block.buildTitle,
      notes: 'Get them building. Walk around, help people narrow scope, rewrite prompts, get unstuck. Remind them: "Make it smaller. Get version one working first."',
      render: () => (
        <Frame bg="bg-accent-green/10">
          <Label color="bg-accent-green text-foreground">Section {blockId} · Build · {block.buildDuration}</Label>
          <Title>{block.buildTitle}</Title>
          <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">Your Prompt</div>
            <div className="font-mono text-base md:text-lg leading-relaxed">{block.buildPrompt}</div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { t: "Bolt", d: "bolt.new", c: "bg-accent-yellow" },
              { t: "Lovable", d: "lovable.dev", c: "bg-accent-purple" },
              { t: "Replit", d: "replit.com", c: "bg-accent-blue" },
            ].map((tool) => (
              <div key={tool.t} className={tool.c + " border-4 border-foreground brutal-shadow p-4 text-center"}>
                <div className="font-black uppercase text-xl">{tool.t}</div>
                <div className="font-bold text-sm">{tool.d}</div>
              </div>
            ))}
          </div>
          <Quote>Make it smaller. Get version one working first. Clarity before complexity.</Quote>
        </Frame>
      ),
    });
  }
  return result;
}

export const allSlides: Slide[] = [
  // ===== WELCOME =====
  {
    sectionId: 0,
    title: "Welcome",
    notes: "Welcome everyone. This workshop is not me talking at you for 4 hours. Every section is 10 minutes of theory then 30 minutes of YOU building. By the end, you'll have a live prototype. Let's go.",
    render: () => (
      <Frame bg="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70">
        <Label>{workshopInfo.organization}</Label>
        <h1 className="font-black uppercase text-6xl md:text-9xl leading-[0.85] tracking-tight">
          Vibe<br />Coding<br /><span className="text-primary">0 → 1</span>
        </h1>
        <p className="mt-6 text-xl md:text-3xl font-bold max-w-3xl">{workshopInfo.subtitle}</p>
        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl">
          {[
            { label: "Date", value: workshopInfo.date, sub: workshopInfo.time },
            { label: "Venue", value: "Helsinki XR Center", sub: "3rd Floor" },
            { label: "Co-hosts", value: workshopInfo.coHosts.join(" · "), sub: "" },
          ].map((c) => (
            <div key={c.label} className="border-4 border-foreground brutal-shadow bg-background p-4">
              <div className="font-black uppercase text-xs tracking-wider text-muted-foreground">{c.label}</div>
              <div className="font-black mt-1">{c.value}</div>
              {c.sub && <div className="font-bold text-sm">{c.sub}</div>}
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  // ===== FORMAT =====
  {
    sectionId: 0,
    title: "How This Works",
    notes: "This is the most important slide. Set expectations: 10 min theory, 30 min building, repeat 5 times. Then optional pitching. Less talking from me, more doing by you.",
    render: () => (
      <Frame>
        <Label>Format</Label>
        <Title>10 Min Theory. 30 Min You Build.</Title>
        <p className="mt-4 font-bold text-xl text-muted-foreground">5 sections. Same rhythm every time. Less talking, more doing.</p>
        <div className="mt-10 grid md:grid-cols-5 gap-4">
          {sections.map((b, i) => (
            <div key={b.id} className={`${accentColors[i]} border-4 border-foreground brutal-shadow-sm p-4 text-center`}>
              <div className="font-black text-4xl">{b.id}</div>
              <div className="font-black uppercase text-sm mt-2 leading-tight">{b.theoryTitle}</div>
              <div className="font-bold text-xs mt-2">10m + 30m</div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-accent-purple/30 border-4 border-foreground brutal-shadow p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="font-black text-5xl">🎤</div>
          <div>
            <div className="font-black uppercase text-lg">+ 30 Min Pitching (Optional)</div>
            <div className="font-semibold text-muted-foreground">Come to the stage. 2 minutes. Tell the story of what you built.</div>
          </div>
        </div>
      </Frame>
    ),
  },

  // ===== SECTION 1: Entrepreneurship =====
  {
    sectionId: 1,
    title: "S1 Technology × Liberal Arts",
    notes: "Steve Jobs quote. The most valuable tech company says technology alone is not enough. Engineers can build, artists can imagine. With vibe coding, one person can be both.",
    render: () => (
      <Frame bg="bg-gradient-to-br from-accent-yellow/30 to-accent-purple/20">
        <Label color="bg-accent-yellow text-foreground">Section 1 · Theory</Label>
        <div className="bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-8 md:p-12 my-6">
          <div className="font-black text-xl md:text-3xl leading-snug">
            "It's in Apple's DNA that technology alone is not enough. It's technology married with the liberal arts, married with the humanities, that yields us the result that makes our heart sing."
          </div>
          <div className="mt-4 font-bold text-sm md:text-base text-background/60">— Steve Jobs, iPad 2 Keynote, 2011</div>
        </div>
        <div className="bg-accent-purple/30 border-4 border-foreground brutal-shadow p-6 md:p-8 my-6">
          <div className="font-black text-lg md:text-xl leading-snug">
            "Part of what made the Macintosh great was that the people working on it were musicians, poets, and artists..."
          </div>
          <div className="mt-3 font-bold text-sm text-foreground/60">— Steve Jobs, 1995</div>
        </div>
        <p className="mt-6 font-black text-2xl md:text-4xl text-center">
          Engineers can <span className="text-primary">build</span>. Artists can <span className="text-accent-purple">imagine</span>.
        </p>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 The Art Before the Startup",
    notes: "Photos from theater performance. The point: art and entrepreneurship share the same DNA — showing up, committing fully, and creating something from nothing. No text needed on this slide. Let the images speak.",
    render: () => (
      <Frame bg="bg-foreground">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 w-full h-full">
          <div className="col-span-2 row-span-2">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/259fb90a-acde-4813-a879-a2ce6379da9a.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9352.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9495.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9493.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9494.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9353.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9492.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
          <div>
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/me-photos/IMG_9496.JPG" alt="Theater performance" className="w-full h-full object-cover border-4 border-foreground" />
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Good Artists Copy, Great Artists Steal",
    notes: "Picasso's quote, often attributed to Jobs too. A good artist copies one style. A great artist steals from many and combines them into something uniquely their own. This is what vibe coding lets you do — take the best of what works and make it yours.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 1 · Theory</Label>
        <Title>Good Artists Copy, Great Artists Steal.</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-10">
          <div className="font-black text-xl md:text-3xl leading-snug text-center">
            {"\"Good artists copy. Great artists steal.\""}
          </div>
          <div className="mt-4 font-bold text-sm text-background/60 text-center">—attributed to Picasso, made famous by Steve Jobs</div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="border-4 border-foreground brutal-shadow bg-red-50 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-red-600 mb-3">A Good Artist Copies</div>
            <div className="font-semibold leading-relaxed">
              Sees another artist's style and tries to emulate it as closely as they can. The result looks like the original — but lacks soul.
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/10 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-accent-green mb-3">A Great Artist Steals</div>
            <div className="font-semibold leading-relaxed">
              Selectively takes elements from multiple sources and creatively combines their influences to create something uniquely their own.
            </div>
          </div>
        </div>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow p-6 text-center">
          <div className="font-black text-lg md:text-xl">Vibe coding lets you steal from the best — and make it yours.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 The Tool Is Never the Talent",
    notes: "The J.K. Rowling analogy. Millions of software engineers existed before AI — most never started a startup. Vibe coding is your English. Everyone will have it. The question is whether you have the 1% that makes the difference.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-accent-yellow text-foreground">Section 1 · Theory</Label>
        <Title>The Tool Is Never the Talent.</Title>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8 flex flex-col gap-4">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow">Before AI</div>
            <div className="font-semibold text-base md:text-lg leading-relaxed">
              Millions of software engineers. Brilliant people. They knew every language, every framework. They wrote code 8 hours a day.
            </div>
            <div className="font-black text-xl md:text-2xl text-accent-yellow mt-2">
              Most never started a company.
            </div>
            <div className="font-semibold text-sm text-background/60">
              Code was never the bottleneck. The idea was. The vision was. The obsession was.
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow-lg bg-accent-purple/10 p-6 md:p-8 flex flex-col gap-4">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60">J.K. Rowling</div>
            <div className="font-semibold text-base md:text-lg leading-relaxed">
              Wrote 4,000 pages. Plain English. The kind you learned in school. Kids read it.
            </div>
            <div className="font-black text-xl md:text-2xl text-accent-purple mt-2">
              Became a billionaire.
            </div>
            <div className="font-semibold text-sm text-foreground/60">
              Not because she knew English. Everyone knows English. Because she built a world from zero — vision, obsession, taste.
            </div>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">J.K. Rowling</div>
            <div className="font-bold text-sm">Tool: Plain English — used by millions</div>
            <div className="font-black text-lg mt-2">What made her different: world-building vision</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">You</div>
            <div className="font-bold text-sm">Tool: Vibe Coding — soon used by millions</div>
            <div className="font-black text-lg mt-2">What makes you different: ?</div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 text-center">
          <div className="font-black text-2xl md:text-4xl text-accent-yellow">Vibe coding is your English.</div>
          <div className="font-black text-lg md:text-2xl mt-3">The tool is never the talent.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 AI Can't Write Good Will Hunting",
    notes: "Ben Affleck quote. AI can imitate patterns but can't create from lived experience. Same for your startup: AI can generate code, but it can't decide what problem is worth solving. Play the video clip.",
    render: () => (
      <Frame>
        <Label color="bg-accent-purple text-foreground">Section 1 · Theory</Label>
        <div className="bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-8 md:p-12">
          <div className="font-black text-xl md:text-3xl leading-snug">
            "AI can write you an imitation of a screenplay, but it can't write you <em>Good Will Hunting</em>. [...] Movies are about human expression, and I don't think AI is going to be replacing human expression anytime soon."
          </div>
          <div className="mt-4 font-bold text-sm md:text-base text-background/60">— Ben Affleck, DealBook Summit, 2023</div>
        </div>
        <div className="mt-8 w-full aspect-video border-4 border-foreground brutal-shadow">
          <iframe
            src="https://www.instagram.com/reel/DTv081SjF1c/embed/"
            className="w-full h-full"
            allowTransparency={true}
            allowFullScreen={true}
            scrolling="no"
            frameBorder="0"
          />
        </div>
        <p className="mt-6 font-black text-2xl md:text-3xl text-center">
          AI removes the <span className="text-primary">execution</span> bottleneck. Not the <span className="text-accent-purple">vision</span> bottleneck.
        </p>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 What Is a Startup?",
    notes: "Three definitions. Steve Blank: search for a repeatable scalable model. Paul Graham: designed to grow fast. Peter Thiel: going from 0 to 1. That's why this workshop is called 0 to 1.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 1 · Theory</Label>
        <Title>What Is a Startup?</Title>
        <Quote attribution="Steve Blank">A startup is an organization formed to search for a repeatable and scalable business model.</Quote>
        <Quote attribution="Paul Graham">A startup is a company designed to grow fast. The only essential thing is growth.</Quote>
        <Quote attribution="Peter Thiel">Every time we create something new, we go from 0 to 1.</Quote>
        <div className="mt-4 bg-foreground text-background border-4 border-foreground brutal-shadow p-6 text-center">
          <div className="font-black text-xl">That's why this workshop is called 0 → 1.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Three Core Traits of a Startup Entrepreneur",
    notes: "What makes someone an entrepreneur? Three traits: opportunity seekers who spot problems everywhere, owners who take responsibility, and risk takers who bet on themselves. Play the video clip first.",
    render: () => (
      <Frame bg="bg-accent-blue/20">
        <Label color="bg-accent-blue text-foreground">Section 1 · Theory</Label>
        <Title>Three Core Traits</Title>
        <p className="mt-2 font-semibold text-lg text-muted-foreground">What do startup entrepreneurs have in common?</p>
        <div className="mt-6 w-full aspect-video border-4 border-foreground brutal-shadow">
          <iframe
            src="https://www.youtube.com/embed/kwkGX-PlTxs"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-6">
            <div className="font-black uppercase text-3xl mb-2">1</div>
            <div className="font-black uppercase text-xl mb-2">Opportunity Seekers</div>
            <p className="font-semibold text-sm leading-relaxed">They see problems as possibilities. Where others complain, they spot potential.</p>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-purple/20 p-6">
            <div className="font-black uppercase text-3xl mb-2">2</div>
            <div className="font-black uppercase text-xl mb-2">Ownership Mentality</div>
            <p className="font-semibold text-sm leading-relaxed">They take full responsibility. No blaming the market, the timing, or the team.</p>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/20 p-6">
            <div className="font-black uppercase text-3xl mb-2">3</div>
            <div className="font-black uppercase text-xl mb-2">Risk Takers</div>
            <p className="font-semibold text-sm leading-relaxed">They bet on their own judgment — not recklessly, but with conviction that they can create something valuable.</p>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Finding Ideas",
    notes: "Ideas are everywhere but worth nothing without execution. Three sources of inspiration: complaints, cross-pollination from other markets, and passion. Your frustrations are your best ideas.",
    render: () => (
      <Frame>
        <Label color="bg-accent-yellow text-foreground">Section 1 · Theory</Label>
        <Title>Finding Ideas</Title>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-6 md:p-8">
          <div className="font-black text-lg md:text-xl leading-snug">
            "The first step is having an idea. How do you find these ideas? They're all around you. Ideas aren't worth much on their own — what matters is execution."
          </div>
        </div>
        <p className="mt-6 font-bold text-lg text-muted-foreground text-center">Startups often fail because reality clashes with our initial assumptions. The ability to pivot is essential.</p>
        <div className="mt-8 space-y-4">
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-6">
            <div className="font-black uppercase text-sm text-foreground/70 mb-2">Source 1 · The Power of Complaints</div>
            <div className="font-semibold leading-relaxed">
              "Every product or service you use is designed to solve a problem. But if you're frustrated with a specific app, service, or product — that complaint can be the start of your idea. List all those small improvements, and you might find yourself differentiating your idea into a potential business."
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-blue/20 p-6">
            <div className="font-black uppercase text-sm text-foreground/70 mb-2">Source 2 · Seek Inspiration Everywhere</div>
            <div className="font-semibold leading-relaxed">
              "Look around! See what's happening in other countries. Watch Shark Tank shows in Australia or Pakistan. Find things that are missing here. There is nothing wrong about 'stealing ideas' — it's all about the execution."
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-purple/20 p-6">
            <div className="font-black uppercase text-sm text-foreground/70 mb-2">Source 3 · Your Passion Is a Gold Mine</div>
            <div className="font-semibold leading-relaxed">
              "Passion is the most important source of ideas. Artists are entrepreneurs, because they work from the heart. They make things happen regardless of the challenges, and startup founders are the same."
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Steps & Expected Outcome",
    notes: "Walk them through the 4 steps. Create a folder, use StartupBlueprint to find the problem, brainstorm with ChatGPT on Arena, produce an MD file with the business concept and project brief. Be very clear about the deliverable.",
    render: () => (
      <Frame bg="bg-accent-yellow/20">
        <Label color="bg-accent-yellow text-foreground">Section 1 · Build · Steps</Label>
        <Title>Your 4 Steps</Title>
        <div className="mt-8 space-y-4">
          {[
            { step: 1, title: "Create a folder on your laptop", desc: "Name it after your idea or project. This is your workspace for the entire workshop.", color: "bg-accent-yellow" },
            { step: 2, title: "Use StartupBlueprint to find the problem", desc: "Go to startupblueprint.dev. Use the frameworks and canvases to identify and sharpen the problem you want to solve.", color: "bg-accent-purple" },
            { step: 3, title: "Brainstorm with ChatGPT on Arena", desc: "Go to arena.ai. Use AI to explore your idea, validate assumptions, and refine your concept through conversation.", color: "bg-accent-blue" },
            { step: 4, title: "Write an MD file: Business Concept + Project Brief", desc: "Create a markdown file with two sections: your business concept (problem, persona, promise) and your project brief (what you'll build, for whom, why it matters).", color: "bg-accent-green" },
          ].map((s) => (
            <div key={s.step} className="border-4 border-foreground brutal-shadow bg-background flex items-stretch">
              <div className={`${s.color} border-r-4 border-foreground flex flex-col items-center justify-center p-4 md:p-6 w-16 md:w-20 shrink-0`}>
                <div className="font-black text-3xl md:text-4xl text-foreground">{s.step}</div>
              </div>
              <div className="p-4 md:p-6 flex-1">
                <div className="font-black text-lg md:text-xl uppercase">{s.title}</div>
                <div className="font-semibold text-sm md:text-base text-muted-foreground mt-1 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-4">Expected Outcome</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background text-foreground border-2 border-foreground p-4">
              <div className="font-black uppercase text-sm mb-2">Business Concept</div>
              <ul className="space-y-1 font-semibold text-sm">
                <li>• The problem you're solving</li>
                <li>• The persona who feels it</li>
                <li>• The promise you're making</li>
              </ul>
            </div>
            <div className="bg-background text-foreground border-2 border-foreground p-4">
              <div className="font-black uppercase text-sm mb-2">Project Brief</div>
              <ul className="space-y-1 font-semibold text-sm">
                <li>• What you'll build</li>
                <li>• For whom</li>
                <li>• Why it matters</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <a href="https://www.startupblueprint.dev/" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-yellow/10 transition-colors flex items-center gap-4 p-4">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/startupblueprint-qr.svg" alt="StartupBlueprint QR Code" className="w-24 h-24 shrink-0" />
            <div>
              <div className="font-black uppercase text-xl">StartupBlueprint</div>
              <div className="font-bold text-sm">startupblueprint.dev</div>
              <div className="font-semibold text-xs text-foreground/60 mt-1">Frameworks &amp; canvases to sharpen your idea</div>
            </div>
          </a>
          <a href="https://arena.ai/" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-purple/10 transition-colors flex items-center gap-4 p-4">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/arena-qr.svg" alt="Arena QR Code" className="w-24 h-24 shrink-0" />
            <div>
              <div className="font-black uppercase text-xl">Arena</div>
              <div className="font-bold text-sm">arena.ai</div>
              <div className="font-semibold text-xs text-foreground/60 mt-1">AI-powered exploration, validation &amp; building</div>
            </div>
          </a>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Build: Find Your Problem",
    notes: "Get them scouting. List 3 problems, pick 1, define who feels it and why. Walk around and help people narrow. The key: pick a problem you genuinely understand and care about. Use StartupBlueprint for frameworks and Arena for AI-powered building.",
    render: () => (
      <Frame bg="bg-accent-green/10">
        <Label color="bg-accent-green text-foreground">Section 1 · Build · 30 min</Label>
        <Title>Find Your Problem</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">Your Assignment</div>
          <div className="font-mono text-base md:text-lg leading-relaxed">
            List 3 problems you've personally experienced. For each, write down who specifically feels this pain. Pick the ONE problem you understand best. Define it precisely: [Who] feels [what pain] because [why].
          </div>
        </div>
        <div className="mt-6 bg-accent-purple/40 border-4 border-foreground brutal-shadow p-6">
          <div className="font-black uppercase text-xs tracking-wider text-foreground/70 mb-3">The Outcome</div>
          <ul className="space-y-2 font-semibold">
            <li>✓ One problem you genuinely understand and care about</li>
            <li>✓ A specific persona — who feels this pain</li>
            <li>✓ A clear definition of why it matters</li>
          </ul>
        </div>
        <div className="mt-6">
          <div className="font-black uppercase text-sm tracking-wider mb-4">Your Tools</div>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.startupblueprint.dev/" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-yellow/10 transition-colors flex items-center gap-4 p-4">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/startupblueprint-qr.svg" alt="StartupBlueprint QR Code" className="w-24 h-24 shrink-0" />
              <div>
                <div className="font-black uppercase text-xl">StartupBlueprint</div>
                <div className="font-bold text-sm">startupblueprint.dev</div>
                <div className="font-semibold text-xs text-foreground/60 mt-1">Frameworks, canvases & guides to sharpen your idea</div>
              </div>
            </a>
            <a href="https://arena.ai/" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-purple/10 transition-colors flex items-center gap-4 p-4">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/arena-qr.svg" alt="Arena QR Code" className="w-24 h-24 shrink-0" />
              <div>
                <div className="font-black uppercase text-xl">Arena</div>
                <div className="font-bold text-sm">arena.ai</div>
                <div className="font-semibold text-xs text-foreground/60 mt-1">Explore, validate &amp; refine your concept with AI</div>
              </div>
            </a>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Read These",
    notes: "Three books that shaped the entrepreneurial thinking in this section. Zero to One by Peter Thiel — the philosophy of building something new. Steve Jobs biography by Walter Isaacson — vision and obsession. The Hard Thing About Hard Things by Ben Horowitz — the reality no one prepares you for.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 1 · Further Reading</Label>
        <Title>Read These.</Title>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
            <div className="bg-accent-yellow border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Peter Thiel</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/zero-to-one.jpg" alt="Zero to One book cover" className="w-32 h-48 object-cover border-2 border-foreground mb-4" />
              <div className="font-black text-lg text-center">Zero to One</div>
              <div className="font-semibold text-sm text-foreground/70 text-center mt-1">Starting a new venture means creating something that didn't exist. Not 1 to n — 0 to 1.</div>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
            <div className="bg-accent-purple border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Walter Isaacson</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/steve-jobs.jpg" alt="Steve Jobs biography cover" className="w-32 h-48 object-cover border-2 border-foreground mb-4" />
              <div className="font-black text-lg text-center">Steve Jobs</div>
              <div className="font-semibold text-sm text-foreground/70 text-center mt-1">Technology married with the liberal arts. Vision, obsession, and the willingness to say no.</div>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
            <div className="bg-accent-blue border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Ben Horowitz</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/hard-things.jpg" alt="The Hard Thing About Hard Things book cover" className="w-32 h-48 object-cover border-2 border-foreground mb-4" />
              <div className="font-black text-lg text-center">The Hard Thing About Hard Things</div>
              <div className="font-semibold text-sm text-foreground/70 text-center mt-1">No formula for the hard parts. Building is easy — leading through chaos is the real skill.</div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 1,
    title: "S1 Scan to Revisit",
    notes: "End-of-section QR. Tell participants to scan it now if they want to revisit all of Section 1's slides on their phone. The link only opens Section 1 — they won't be able to skip ahead to other sections.",
    render: () => {
      const url = "https://zero-to-one-workshop.lovable.app/section/1";
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=10&data=${encodeURIComponent(url)}`;
      return (
        <Frame bg="bg-accent-yellow">
          <Label color="bg-foreground text-background">Section 1 · Recap</Label>
          <Title>Scan to Revisit Section 1.</Title>
          <p className="mt-4 font-bold text-xl text-foreground/80">Point your phone camera. Read every slide from this section at your own pace.</p>
          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-background border-4 border-foreground brutal-shadow-lg p-6 shrink-0">
              <img src={qrSrc} alt="QR code to Section 1 slides" className="w-72 h-72 md:w-96 md:h-96 block" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">Link</div>
                <div className="font-mono font-bold break-all">{url}</div>
              </div>
              <div className="bg-foreground text-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-2">Heads up</div>
                <div className="font-bold">This link only opens Section 1. No spoilers for what comes next.</div>
              </div>
            </div>
          </div>
        </Frame>
      );
    },
  },

  // ===== SECTION 2: Offer Design (custom slides) =====

  {
    sectionId: 2,
    title: "S2 The Value Equation",
    notes: "From Alex Hormozi's $100M Offers. The four levers of value: increase Dream Outcome and Perceived Likelihood, decrease Time Delay and Effort. Move any lever and the offer becomes more valuable.",
    render: () => (
      <Frame bg="bg-accent-purple/15">
        <Label color="bg-accent-purple text-foreground">Section 2 · Theory</Label>
        <Title>The Value Equation</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-10">
          <div className="flex items-center justify-center gap-3 md:gap-4 font-black text-xl md:text-3xl">
            <span>Value</span>
            <span>=</span>
            <div className="flex flex-col items-center">
              <div className="border-b-4 border-background pb-1 md:pb-2 text-center">
                <span className="text-accent-yellow">Dream Outcome</span>
                <span className="mx-1">&times;</span>
                <span className="text-accent-yellow">Perceived Likelihood</span>
              </div>
              <div className="pt-1 md:pt-2 text-center">
                <span className="text-accent-purple">Time Delay</span>
                <span className="mx-1">&times;</span>
                <span className="text-accent-purple">Effort &amp; Sacrifice</span>
              </div>
            </div>
          </div>
          <div className="mt-3 font-bold text-sm text-background/60 text-center">— Alex Hormozi, $100M Offers</div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/20 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/70 mb-2">Increase ↗</div>
            <div className="font-black text-xl uppercase mb-2">Dream Outcome</div>
            <div className="font-semibold text-sm">What does the customer want more than anything? Align your offer with that aspirational identity.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/20 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/70 mb-2">Increase ↗</div>
            <div className="font-black text-xl uppercase mb-2">Perceived Likelihood</div>
            <div className="font-semibold text-sm">How confident is the customer they'll get the result? Boost with guarantees, testimonials, case studies.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/70 mb-2">Decrease ↘</div>
            <div className="font-black text-xl uppercase mb-2">Time Delay</div>
            <div className="font-semibold text-sm">How fast do they get results? Speed = value. Faster results increase perceived value.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/70 mb-2">Decrease ↘</div>
            <div className="font-black text-xl uppercase mb-2">Effort & Sacrifice</div>
            <div className="font-semibold text-sm">How hard is it to use? Less friction = more value. Make it dead simple.</div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 The Grand Slam Offer",
    notes: "A Grand Slam Offer is an offer so good that people feel stupid saying no. You don't compete on price, you compete on value. Stack value on all four dimensions simultaneously.",
    render: () => (
      <Frame>
        <Label color="bg-accent-purple text-foreground">Section 2 · Theory</Label>
        <Title>The Grand Slam Offer</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-8 md:p-12">
          <div className="font-black text-2xl md:text-4xl leading-snug text-center">
            Make an offer so good that people feel stupid saying no.
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-sm text-accent-purple mb-2">1 · Core Deliverable</div>
            <div className="font-semibold">The main promise — the transformation you're selling.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-sm text-accent-blue mb-2">2 · Bonuses</div>
            <div className="font-semibold">Value-adds that cost you little but mean a lot to the customer.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-sm text-accent-green mb-2">3 · Guarantee</div>
            <div className="font-semibold">Risk reversal — {"\"All the risk is on me.\""} Make it unconditional if possible.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-sm text-accent-yellow mb-2">4 · Naming</div>
            <div className="font-semibold">Give the offer a name that conjures the dream outcome.</div>
          </div>
        </div>
        <p className="mt-6 font-black text-lg md:text-xl text-center">
          You're not competing on price. You're competing on <span className="text-primary">value</span>.
        </p>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 Pick a Starving Crowd",
    notes: "The right market is more important than the right offer. A mediocre offer to a starving crowd beats a brilliant offer to a market that doesn\u2019t care.",
    render: () => (
      <Frame bg="bg-accent-yellow/20">
        <Label color="bg-accent-yellow text-foreground">Section 2 · Theory</Label>
        <Title>Pick a Starving Crowd.</Title>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black text-xl md:text-2xl leading-snug">
            {"The right market is more important than the right offer."}
          </div>
          <div className="mt-3 font-bold text-sm text-background/60">— Alex Hormozi, $100M Offers</div>
        </div>
        <p className="mt-6 font-bold text-lg text-center">A mediocre offer to a starving crowd beats a brilliant offer to a market that doesn't care.</p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Huge Pain", desc: "They\u2019re suffering badly and actively seeking a solution.", color: "bg-accent-yellow" },
            { title: "Purchasing Power", desc: "They can afford to pay for a solution.", color: "bg-accent-purple" },
            { title: "Easy to Target", desc: "You can find and reach them.", color: "bg-accent-blue" },
            { title: "Growing Market", desc: "The market is expanding, not shrinking.", color: "bg-accent-green" },
          ].map((c) => (
            <div key={c.title} className="border-4 border-foreground brutal-shadow bg-background">
              <div className={c.color + " border-b-4 border-foreground p-3 text-center"}>
                <div className="font-black uppercase">{c.title}</div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 The 19 Traction Channels",
    notes: "From Traction by Gabriel Weinberg. Most startups fail from lack of traction, not product failure. There are 19 channels to get customers. The key is finding the ONE that works right now.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 2 · Theory</Label>
        <Title>The 19 Traction Channels</Title>
        <div className="mt-4 bg-foreground text-background border-4 border-foreground brutal-shadow p-5 md:p-6">
          <div className="font-black text-lg md:text-xl leading-snug">
            Almost every failed startup has a product. What failed startups don't have are enough customers.
          </div>
          <div className="mt-2 font-bold text-sm text-background/60">— Gabriel Weinberg &amp; Justin Mares, Traction</div>
        </div>
        <div className="mt-6 space-y-3">
          {[
            { num: "01", name: "Viral Marketing", example: "Dropbox — invite friends, get free storage", color: "bg-accent-yellow" },
            { num: "02", name: "Public Relations", example: "Product Hunt launch, TechCrunch feature", color: "bg-accent-purple" },
            { num: "03", name: "Unconventional PR", example: "Stripe's \"Capture the Flag\" CTF challenge", color: "bg-accent-blue" },
            { num: "04", name: "Search Engine Marketing", example: "Google Ads targeting \"bookkeeping for freelancers\"", color: "bg-accent-green" },
            { num: "05", name: "Social & Display Ads", example: "Instagram/TikTok ads targeting students in Helsinki", color: "bg-accent-yellow" },
            { num: "06", name: "Offline Ads", example: "Billboard on the metro for a local service", color: "bg-accent-purple" },
            { num: "07", name: "Search Engine Optimization", example: "Blog posts ranking for \"best AI tools for startups\"", color: "bg-accent-blue" },
            { num: "08", name: "Content Marketing", example: "Hubspot's free marketing guides and templates", color: "bg-accent-green" },
            { num: "09", name: "Email Marketing", example: "Weekly newsletter with curated tips for founders", color: "bg-accent-yellow" },
            { num: "10", name: "Engineering as Marketing", example: "StartupBlueprint.dev free tool for idea validation", color: "bg-accent-purple" },
            { num: "11", name: "Target Market Blogs", example: "Guest post on a Finnish startup blog", color: "bg-accent-blue" },
            { num: "12", name: "Business Development", example: "Partnership between Spotify and Uber", color: "bg-accent-green" },
            { num: "13", name: "Sales", example: "Outbound emails to 50 prospects you researched", color: "bg-accent-yellow" },
            { num: "14", name: "Affiliate Programs", example: "Amazon Associates, referral bonuses", color: "bg-accent-purple" },
            { num: "15", name: "Existing Platforms", example: "Building a Figma or Shopify plugin for their marketplace", color: "bg-accent-blue" },
            { num: "16", name: "Trade Shows", example: "Demo booth at Slush or Arctic15", color: "bg-accent-green" },
            { num: "17", name: "Offline Events", example: "This workshop — AI Collective at Helsinki XR Center", color: "bg-accent-yellow" },
            { num: "18", name: "Speaking Engagements", example: "Pitch at a meetup, give a talk at a university", color: "bg-accent-purple" },
            { num: "19", name: "Community Building", example: "Discord community, Reddit, WhatsApp group", color: "bg-accent-blue" },
          ].map((ch) => (
            <div key={ch.num} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-stretch">
              <div className={ch.color + " border-r-4 border-foreground flex items-center justify-center w-16 md:w-20 shrink-0"}>
                <span className="font-black text-lg md:text-xl">{ch.num}</span>
              </div>
              <div className="p-3 md:p-4 flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <div className="font-black text-sm md:text-base md:w-52 shrink-0">{ch.name}</div>
                <div className="font-semibold text-xs md:text-sm text-foreground/60">{ch.example}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-accent-purple/30 border-4 border-foreground brutal-shadow p-5 text-center">
          <div className="font-black text-lg">Most channels won't work for you right now. The ones that do are moving targets.</div>
          <div className="font-semibold text-sm text-foreground/70 mt-2">That's why you need the Bullseye Framework.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 The Bullseye Framework",
    notes: "From Traction. Three rings: inner ring (1-2 channels moving the needle now), middle ring (3-4 promising), outer ring (everything else). Test cheap, focus on the inner ring, double down when one works.",
    render: () => (
      <Frame bg="bg-accent-purple/15">
        <Label color="bg-accent-purple text-foreground">Section 2 · Theory</Label>
        <Title>The Bullseye Framework</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">Find the ONE channel that moves the needle. Focus. Double down.</p>
        <div className="mt-8 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-foreground bg-muted/40 flex items-center justify-center">
              <span className="absolute top-3 left-1/2 -translate-x-1/2 font-black uppercase text-xs tracking-wider text-foreground/50">Outer — Everything Else</span>
              {/* Middle ring */}
              <div className="w-[62%] h-[62%] rounded-full border-4 border-foreground bg-accent-blue/20 flex items-center justify-center">
                <span className="absolute font-black uppercase text-xs tracking-wider text-accent-blue" style={{ top: "26%", left: "50%", transform: "translate(-50%, -50%)" }}>Middle — 3-4 Promising</span>
                {/* Inner ring */}
                <div className="w-[55%] h-[55%] rounded-full border-4 border-foreground bg-accent-yellow/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-black text-lg md:text-xl">🎯</div>
                    <div className="font-black uppercase text-xs md:text-sm">1-2 Channels</div>
                    <div className="font-semibold text-[10px] md:text-xs text-foreground/70">Move the needle</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="border-4 border-foreground brutal-shadow-lg bg-accent-yellow/30 p-4 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">Inner Ring</div>
            <div className="font-black text-lg">1–2 Channels</div>
            <div className="font-semibold text-xs text-foreground/70 mt-1">Invest the bulk of your resources here.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-blue/10 p-4 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">Middle Ring</div>
            <div className="font-black text-lg">3–4 Channels</div>
            <div className="font-semibold text-xs text-foreground/70 mt-1">Promising. Run cheap tests here.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-muted/50 p-4 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">Outer Ring</div>
            <div className="font-black text-lg">Everything Else</div>
            <div className="font-semibold text-xs text-foreground/70 mt-1">Could work, but needs validation.</div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-6">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">The 5-Step Process</div>
          <div className="grid grid-cols-5 gap-3 text-center">
            {["Brainstorm", "Categorize", "Rank", "Test Cheap", "Focus"].map((s, i) => (
              <div key={s} className="bg-background text-foreground border-2 border-foreground p-3">
                <div className="font-black text-2xl">{i + 1}</div>
                <div className="font-bold text-sm">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 The 50/50 Rule",
    notes: "Spend 50% of your time on product and 50% on traction. The Product Trap — believing customers will just come if you build something good — is the #1 killer of startups.",
    render: () => (
      <Frame>
        <Label color="bg-accent-purple text-foreground">Section 2 · Theory</Label>
        <Title>The 50/50 Rule</Title>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="border-4 border-foreground brutal-shadow bg-accent-blue/20 p-6 md:p-8 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">50%</div>
            <div className="font-black text-3xl uppercase mb-2">Product</div>
            <div className="font-semibold">Build, iterate, improve. Make something people want.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-purple/20 p-6 md:p-8 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">50%</div>
            <div className="font-black text-3xl uppercase mb-2">Traction</div>
            <div className="font-semibold">Find customers, test channels, get distribution.</div>
          </div>
        </div>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black text-lg md:text-xl leading-snug text-center">
            "The Product Trap: believing that if you build something good, customers will just come. That's the #1 killer of startups."
          </div>
          <div className="mt-3 font-bold text-sm text-background/60 text-center">— Adapted from Traction, Gabriel Weinberg & Justin Mares</div>
        </div>
        <div className="mt-6 bg-accent-yellow border-4 border-foreground brutal-shadow p-6 text-center">
          <div className="font-black text-xl md:text-2xl">Build it and they will come is a myth.</div>
          <div className="font-semibold text-sm mt-2">Build it. Then go find them. That's traction.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 Build: Craft Your Offer & Launch",
    notes: "Fill in the offer template, decide your channel, create your first post. The offer should be understood by a stranger in 10 seconds. The channel should be the one most likely to reach your persona. The first post is just one — you'll iterate.",
    render: () => (
      <Frame bg="bg-accent-green/10">
        <Label color="bg-accent-green text-foreground">Section 2 · Build · 30 min</Label>
        <Title>Craft Your Offer &amp; Launch.</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">Your Assignment</div>
          <div className="font-mono text-base md:text-lg leading-relaxed">
            We help <span className="text-accent-yellow font-black">[specific person]</span> solve <span className="text-accent-purple font-black">[specific problem]</span> by giving them <span className="text-accent-blue font-black">[solution]</span> so they can <span className="text-accent-green font-black">[desired result]</span> without <span className="text-primary font-black">[common frustration]</span>.
          </div>
          <div className="mt-4 font-bold text-sm text-background/60">Write it so a stranger understands it in 10 seconds.</div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">1 · Offer</div>
            <div className="font-black text-lg mb-1">Fill In the Template</div>
            <div className="font-semibold text-sm text-foreground/70">Who, what problem, what solution, what result, what frustration they avoid.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">2 · Channel</div>
            <div className="font-black text-lg mb-1">Pick ONE Channel</div>
            <div className="font-semibold text-sm text-foreground/70">From the 19 — which one reaches your persona fastest? Pick one, not three.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">3 · Launch</div>
            <div className="font-black text-lg mb-1">Create the First Post</div>
            <div className="font-semibold text-sm text-foreground/70">One post, one channel, one offer. That's it. You'll iterate from here.</div>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <a href="https://lovable.dev/invite/H52USL6" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-purple/10 transition-colors flex items-center gap-4 p-4">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/lovable-qr.svg" alt="Lovable QR Code" className="w-24 h-24 shrink-0" />
            <div>
              <div className="font-black uppercase text-xl">Lovable</div>
              <div className="font-bold text-sm">lovable.dev/invite/H52USL6</div>
              <div className="font-semibold text-xs text-foreground/60 mt-1">Your invite link — build the landing page for your offer</div>
            </div>
          </a>
          <a href="https://arena.ai/" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-blue/10 transition-colors flex items-center gap-4 p-4">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/arena-qr.svg" alt="Arena QR Code" className="w-24 h-24 shrink-0" />
            <div>
              <div className="font-black uppercase text-xl">Arena</div>
              <div className="font-bold text-sm">arena.ai</div>
              <div className="font-semibold text-xs text-foreground/60 mt-1">AI-powered exploration, validation &amp; building</div>
            </div>
          </a>
        </div>
        <div className="mt-6 bg-accent-green border-4 border-foreground brutal-shadow p-6 text-center">
          <div className="font-black text-xl md:text-2xl">One offer. One channel. One post.</div>
          <div className="font-semibold text-sm mt-2">You can't do everything. Do ONE thing well.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 Read These",
    notes: "Three books that shaped the offer design and traction thinking in this section. $100M Offers by Alex Hormozi — how to create offers so good people feel stupid saying no. Traction by Gabriel Weinberg & Justin Mares — 19 channels and how to find the one that works. $150M in 30 Months — the case study that proves it.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 2 · Further Reading</Label>
        <Title>Read These.</Title>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
            <div className="bg-accent-purple border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Alex Hormozi</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/100m-offers.jpg" alt="$100M Offers book cover" className="w-32 h-48 object-cover border-2 border-foreground mb-4" />
              <div className="font-black text-lg text-center">$100M Offers</div>
              <div className="font-semibold text-sm text-foreground/70 text-center mt-1">Make an offer so good people feel stupid saying no. The value equation, starving crowds, and Grand Slam Offers.</div>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
            <div className="bg-accent-blue border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Gabriel Weinberg &amp; Justin Mares</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/traction.jpg" alt="Traction book cover" className="w-32 h-48 object-cover border-2 border-foreground mb-4" />
              <div className="font-black text-lg text-center">Traction</div>
              <div className="font-semibold text-sm text-foreground/70 text-center mt-1">19 channels to get customers. The Bullseye Framework: find the ONE that works, then double down.</div>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
            <div className="bg-accent-green border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Alex Hormozi</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/150-million.jpg" alt="$150M in 30 Months book cover" className="w-32 h-48 object-cover border-2 border-foreground mb-4" />
              <div className="font-black text-lg text-center">$150M in 30 Months</div>
              <div className="font-semibold text-sm text-foreground/70 text-center mt-1">The real story: how Gym Launch went from zero to $150M using the offer and traction principles from section 2.</div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 2,
    title: "S2 Scan to Revisit",
    notes: "End-of-section QR. Tell participants to scan it now if they want to revisit all of Section 2's slides on their phone. The link only opens Section 2.",
    render: () => {
      const url = "https://zero-to-one-workshop.lovable.app/section/2";
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=10&data=${encodeURIComponent(url)}`;
      return (
        <Frame bg="bg-accent-purple">
          <Label color="bg-foreground text-background">Section 2 · Recap</Label>
          <Title>Scan to Revisit Section 2.</Title>
          <p className="mt-4 font-bold text-xl text-foreground/80">Point your phone camera. Read every slide from this section at your own pace.</p>
          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-background border-4 border-foreground brutal-shadow-lg p-6 shrink-0">
              <img src={qrSrc} alt="QR code to Section 2 slides" className="w-72 h-72 md:w-96 md:h-96 block" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">Link</div>
                <div className="font-mono font-bold break-all">{url}</div>
              </div>
              <div className="bg-foreground text-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-accent-purple mb-2">Heads up</div>
                <div className="font-bold">This link only opens Section 2. No spoilers for what comes next.</div>
              </div>
            </div>
          </div>
        </Frame>
      );
    },
  },

  // ===== SECTION 3: What Is Vibe Coding? (custom slides) =====
  {
    sectionId: 3,
    title: "S3 What Is Vibe Coding?",
    notes: "Karpathy coined the term. Vibe coding is not about avoiding thinking. It's about compressing execution time. You bring the vision, the AI writes the code.",
    render: () => (
      <Frame bg="bg-foreground text-background">
        <Label color="bg-accent-blue text-foreground">Section 3 · Theory</Label>
        <Title>What Is Vibe Coding?</Title>
        <div className="mt-10 md:mt-16">
          <div className="bg-background text-foreground border-4 border-foreground brutal-shadow-lg p-6 md:p-10">
            <div className="font-black text-xl md:text-2xl lg:text-3xl leading-snug">
              There's a new kind of coding I call {"\""}vibe coding{"\""} — where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.
            </div>
            <div className="mt-4 font-bold text-sm text-foreground/60">— Andrej Karpathy, February 2025</div>
          </div>
          <div className="mt-8 bg-accent-blue/20 border-4 border-foreground brutal-shadow p-6 md:p-8 text-center">
            <div className="font-black text-xl md:text-2xl">
              Vibe coding is not about avoiding thinking.
            </div>
            <div className="font-black text-xl md:text-2xl text-accent-blue mt-2">
              It's about compressing execution time.
            </div>
            <div className="font-semibold text-sm text-foreground/60 mt-4">You bring the vision. The AI writes the code.</div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 The Evolution of Coding",
    notes: "From machine code to vibe coding — every leap forward abstracts complexity so creators can focus on ideas, not implementation. Vibe coding is the next leap where you express intent and AI handles the rest.",
    render: () => (
      <Frame bg="bg-foreground text-background">
        <Label color="bg-accent-blue text-foreground">Section 3 · Theory</Label>
        <Title>The Evolution of Coding.</Title>
        <p className="mt-4 font-semibold text-lg text-background/70 text-center">Every leap forward abstracts complexity — so creators focus on ideas, not implementation.</p>
        <div className="mt-8 grid md:grid-cols-7 gap-2 md:gap-3">
          {[
            { icon: "\u0000", label: "Machine Code", year: "1940s", desc: "0s and 1s. Direct hardware.", level: "Hardware", color: "bg-background/10 border-2 border-background/20" },
            { icon: "\u2699\uFE0F", label: "Assembly", year: "1950s", desc: "MOV, ADD, JMP. Symbolic.", level: "Symbolic", color: "bg-background/10 border-2 border-background/20" },
            { icon: "\uD83D\uDCDD", label: "High-Level", year: "1970s", desc: "C, Python, Java. Logic.", level: "Logic", color: "bg-background/10 border-2 border-background/20" },
            { icon: "\uD83D\uDEE0\uFE0F", label: "Frameworks", year: "2000s", desc: "React, Rails, Django.", level: "Structure", color: "bg-background/10 border-2 border-background/20" },
            { icon: "\uD83C\uDFA8", label: "Visual", year: "2010s", desc: "Drag and drop. Wix, Figma.", level: "Visual", color: "bg-background/10 border-2 border-background/20" },
            { icon: "\u2728", label: "No-Code", year: "2020s", desc: "Softr, Bubble. Templates.", level: "Template", color: "bg-background/20 border-2 border-background/30" },
            { icon: "\uD83C\uDFAF", label: "Vibe Coding", year: "2024+", desc: "Natural language. Describe \u2192 Build.", level: "Intent", color: "bg-accent-purple/30 border-4 border-accent-purple" },
          ].map((era) => (
            <div key={era.label} className={era.color + " rounded-none p-3 md:p-4 text-center flex flex-col"}>
              <div className="font-black text-xl md:text-2xl">{era.icon}</div>
              <div className="font-black text-sm md:text-base mt-2">{era.label}</div>
              <div className="font-bold text-xs text-background/50">{era.year}</div>
              <div className="font-semibold text-xs mt-2 text-background/70">{era.desc}</div>
              <div className="mt-auto pt-2">
                <div className="font-black uppercase text-xs tracking-wider">{era.level} Level</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-accent-purple/20 border-4 border-accent-purple p-5 text-center">
          <div className="font-black text-lg md:text-xl">Vibe coding is the next leap.</div>
          <div className="font-semibold text-sm text-background/70 mt-1">You express intent. AI handles the rest.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 The World of Building Has Changed",
    notes: "Traditional dev was slow, expensive, and required deep expertise. Vibe coding is rapid, cheap, vision-driven, and accessible. Instead of learning syntax, you learn to communicate your vision. The AI handles the code.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 3 · The Shift</Label>
        <Title>The World of Building Has Changed.</Title>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-foreground/5 border-2 border-foreground/20 px-3 py-2 mb-4">
              <div className="font-black uppercase text-xs tracking-wider text-foreground/60">Traditional Development</div>
            </div>
            <div className="space-y-2">
              {[
                { Icon: Snail, label: "Slow", color: "text-foreground/60" },
                { Icon: DollarSign, label: "Expensive", color: "text-foreground/60" },
                { Icon: GraduationCap, label: "Requires Deep Expertise", color: "text-foreground/60" },
                { Icon: Construction, label: "High Barrier to Entry", color: "text-foreground/60" },
                { Icon: CalendarDays, label: "Months of Work", color: "text-foreground/60" },
              ].map((t) => (
                <div key={t.label} className="border-2 border-foreground/20 bg-foreground/5 p-3 flex items-center gap-3">
                  <t.Icon className={`w-7 h-7 ${t.color} shrink-0`} strokeWidth={2.5} />
                  <div className="font-bold text-base text-foreground/70">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow-lg bg-accent-yellow/10 p-5">
            <div className="bg-accent-yellow border-2 border-foreground px-3 py-2 mb-4">
              <div className="font-black uppercase text-xs tracking-wider text-foreground">Vibe Coding</div>
            </div>
            <div className="space-y-2">
              {[
                { Icon: Zap, label: "Rapid", color: "text-accent-yellow" },
                { Icon: PiggyBank, label: "Cost-Effective", color: "text-accent-green" },
                { Icon: Eye, label: "Focus on Vision", color: "text-accent-purple" },
                { Icon: DoorOpen, label: "Low Barrier to Entry", color: "text-accent-blue" },
                { Icon: Timer, label: "Hours to Prototype", color: "text-accent-yellow" },
              ].map((t) => (
                <div key={t.label} className="border-2 border-foreground bg-background p-3 flex items-center gap-3">
                  <t.Icon className={`w-7 h-7 ${t.color} shrink-0`} strokeWidth={2.5} />
                  <div className="font-black text-base">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-5 text-center">
          <div className="font-black text-lg md:text-xl">Instead of learning syntax, you learn to <span className="text-accent-yellow">communicate your vision</span>.</div>
          <div className="font-semibold text-sm text-background/70 mt-1">The AI handles the code.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 The Vibe Coding Flywheel",
    notes: "A continuous cycle: Idea → Prompt → Build → Iterate. You steer the vision, AI writes the code. Each loop sharpens the output. Ship fast.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 3 · Mental Model</Label>
        <Title>The Vibe Coding Flywheel.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">A continuous cycle of creation powered by AI. You steer the vision; the AI writes the code.</p>
        <div className="mt-8 relative">
          <div className="mx-auto w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-foreground relative bg-background brutal-shadow-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-accent-yellow border-4 border-foreground brutal-shadow flex flex-col items-center justify-center">
              <div className="font-black text-[10px] text-foreground/60">01</div>
              <div className="font-black text-xs md:text-sm">Idea</div>
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-accent-purple border-4 border-foreground brutal-shadow flex flex-col items-center justify-center">
              <div className="font-black text-[10px] text-foreground/60">02</div>
              <div className="font-black text-xs md:text-sm">Prompt</div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-accent-green border-4 border-foreground brutal-shadow flex flex-col items-center justify-center">
              <div className="font-black text-[10px] text-foreground/60">03</div>
              <div className="font-black text-xs md:text-sm">Build</div>
            </div>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-accent-blue border-4 border-foreground brutal-shadow flex flex-col items-center justify-center">
              <div className="font-black text-[10px] text-foreground/60">04</div>
              <div className="font-black text-xs md:text-sm">Iterate</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-foreground text-background border-4 border-foreground brutal-shadow-lg px-5 py-4 text-center">
                <Rocket className="w-8 h-8 mx-auto text-accent-yellow mb-1" strokeWidth={2.5} />
                <div className="font-black text-base md:text-lg">Ship Fast</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-4 gap-3">
          {[
            { step: "01", label: "Idea", desc: "Define the problem and solution.", color: "bg-accent-yellow" },
            { step: "02", label: "Prompt", desc: "Translate into clear AI instructions.", color: "bg-accent-purple" },
            { step: "03", label: "Build", desc: "AI generates the initial MVP.", color: "bg-accent-green" },
            { step: "04", label: "Iterate", desc: "Test, debug, refine with follow-ups.", color: "bg-accent-blue" },
          ].map((item) => (
            <div key={item.step} className={"border-4 border-foreground brutal-shadow-sm " + item.color + " p-4 text-center"}>
              <div className="font-black text-2xl">{item.step}</div>
              <div className="font-black uppercase text-sm mt-1">{item.label}</div>
              <div className="font-semibold text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 The Five Golden Rules",
    notes: "Be Precise (one task at a time). Be Organised (test after each addition, roll back when broken). Start Fresh (new chat per major feature). Be Patient (debugging is 70% of the process). Review & Trust (question what doesn't make sense, but trust unexpected creative solutions).",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 3 · Mindset</Label>
        <Title>The Five Golden Rules.</Title>
        <div className="mt-8 space-y-3">
          {[
            { num: 1, Icon: Target, title: "Be Precise", desc: "One task at a time. Break down complex features into smaller, unambiguous instructions.", color: "bg-accent-yellow", iconColor: "text-foreground" },
            { num: 2, Icon: Blocks, title: "Be Organised", desc: "Add features step-by-step. Test after each addition and roll back if something breaks.", color: "bg-accent-purple", iconColor: "text-foreground" },
            { num: 3, Icon: RefreshCw, title: "Start Fresh", desc: "Use a new chat or session for each major feature. Easier to track changes and debug.", color: "bg-accent-blue", iconColor: "text-foreground" },
            { num: 4, Icon: Hourglass, title: "Be Patient", desc: "Read the AI's explanations to learn as you go. Debugging is 70% of the process, even for pros.", color: "bg-accent-green", iconColor: "text-foreground" },
            { num: 5, Icon: CheckCircle2, title: "Review & Trust", desc: "Question things that don't make sense, but also trust that an unexpected AI solution might be creative and effective.", color: "bg-primary text-background", iconColor: "text-background" },
          ].map((item) => (
            <div key={item.num} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-stretch">
              <div className={`${item.color} border-r-4 border-foreground flex flex-col items-center justify-center w-20 shrink-0 gap-1 p-2`}>
                <item.Icon className={`w-8 h-8 ${item.iconColor}`} strokeWidth={2.5} />
                <span className="font-black text-lg">{item.num}</span>
              </div>
              <div className="p-4 md:p-6 flex-1">
                <div className="font-black text-lg md:text-xl">{item.title}</div>
                <div className="font-semibold text-sm text-foreground/70 mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 Recommended Platforms",
    notes: "Lovable: visual apps, MVPs, beautiful UI with native Supabase. Bolt: quick prototypes, landing pages, instant preview. Replit: full-stack, complex backend, learning to code. For advanced users mention Cursor, Claude Code CLI, Kiro.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 3 · Tools</Label>
        <Title>Recommended Platforms.</Title>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              name: "Lovable",
              Icon: Sparkles,
              accent: "bg-accent-purple",
              accentText: "text-accent-purple",
              best: "Visual apps, MVPs, beautiful UI out-of-the-box with native Supabase integration.",
              features: ["Stunning designs instantly", "Built-in authentication", "Database ready"],
            },
            {
              name: "Bolt",
              Icon: Bolt,
              accent: "bg-accent-yellow",
              accentText: "text-accent-yellow",
              best: "Quick prototypes, landing pages, simple tools with instant live preview.",
              features: ["Fastest setup", "Real-time updates", "One-click deploy"],
            },
            {
              name: "Replit",
              Icon: Terminal,
              accent: "bg-accent-green",
              accentText: "text-accent-green",
              best: "Full-stack apps, complex backend logic, APIs, and learning to code.",
              features: ["Complete environment", "PostgreSQL included", "See all the code"],
            },
          ].map((p) => (
            <div key={p.name} className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
              <div className={`${p.accent} border-b-4 border-foreground p-4 flex items-center gap-3`}>
                <div className="w-12 h-12 bg-background border-2 border-foreground flex items-center justify-center shrink-0">
                  <p.Icon className="w-7 h-7 text-foreground" strokeWidth={2.5} />
                </div>
                <div className="font-black text-2xl">{p.name}</div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className={`font-black uppercase text-xs tracking-wider ${p.accentText} mb-2`}>Best For</div>
                <p className="font-semibold text-sm text-foreground/80 leading-relaxed mb-4">{p.best}</p>
                <div className="space-y-2 mt-auto">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${p.accentText} shrink-0`} strokeWidth={2.5} />
                      <div className="font-semibold text-sm">{f}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-accent-green border-2 border-foreground px-3 py-1 inline-block self-start">
                  <div className="font-black text-xs uppercase tracking-wider">Free Tier</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-4 border-foreground brutal-shadow bg-foreground text-background p-4 flex items-center gap-4">
          <Rocket className="w-8 h-8 text-accent-yellow shrink-0" strokeWidth={2.5} />
          <div className="flex-1">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-1">For Advanced Users</div>
            <div className="flex flex-wrap gap-2">
              {["Cursor", "Claude Code CLI", "Kiro (AWS)"].map((t) => (
                <div key={t} className="bg-background text-foreground border-2 border-background px-3 py-1 font-black text-sm">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 Break It Down First",
    notes: "Before you build: sketch on paper, show it to an LLM, ask for criticism, strip to a lean MVP. Close the loop before you start — so you don't discover missing pieces mid-build. The goal isn't to build everything. It's to build the right thing — fast.",
    render: () => (
      <Frame bg="bg-accent-yellow/10">
        <Label color="bg-accent-yellow text-foreground">Section 3 · Before You Build</Label>
        <Title>Break It Down First.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">Close the loop before you start — so you don't discover missing pieces mid-build.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[
              { num: 1, Icon: Pencil, title: "Sketch on Paper", desc: "Draw your screens, flows, and user journey. It doesn't have to be pretty — just clear. Paper forces you to think through the experience.", color: "bg-accent-yellow" },
              { num: 2, Icon: Bot, title: "Show It to an LLM", desc: "Take a photo of your sketch. Upload it to ChatGPT, Claude, or Gemini. Explain what you want to achieve. Use the AI as your thinking partner.", color: "bg-accent-purple" },
              { num: 3, Icon: Search, title: "Ask for Criticism", desc: "\"What am I missing?\" \"What could go wrong?\" \"Is this too complex for an MVP?\" Let the AI challenge your assumptions before you invest time building.", color: "bg-accent-blue" },
              { num: 4, Icon: Scissors, title: "Strip to Lean MVP", desc: "Remove every feature that isn't essential. Ask: \"What's the ONE thing this must do well?\" Ship that first, add the rest later.", color: "bg-accent-green" },
            ].map((s) => (
              <div key={s.num} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-stretch">
                <div className={`${s.color} border-r-4 border-foreground flex flex-col items-center justify-center w-16 shrink-0 gap-1 p-2`}>
                  <s.Icon className="w-6 h-6 text-foreground" strokeWidth={2.5} />
                  <span className="font-black text-base">{s.num}</span>
                </div>
                <div className="p-3 md:p-4 flex-1">
                  <div className="font-black text-base md:text-lg">{s.title}</div>
                  <div className="font-semibold text-xs md:text-sm text-foreground/70 mt-1 leading-snug">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-4 border-foreground brutal-shadow-lg bg-foreground text-background p-5 md:p-6 flex flex-col">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-4">Why This Matters</div>
            <div className="space-y-3 flex-1">
              {[
                { strong: "Avoid scope creep", rest: "— No surprises mid-build that derail your project." },
                { strong: "Better prompts", rest: "— Clear thinking = clear instructions to AI." },
                { strong: "Faster iteration", rest: "— Smaller scope = quicker to build & test." },
                { strong: "Ship sooner", rest: "— A working MVP beats a perfect idea in your head." },
              ].map((b) => (
                <div key={b.strong} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="font-semibold text-sm leading-relaxed">
                    <span className="font-black">{b.strong}</span><span className="text-background/70">{b.rest}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-accent-yellow text-foreground border-4 border-accent-yellow p-4 text-center">
              <div className="font-black text-base md:text-lg">"The goal isn't to build everything. It's to build <span className="underline decoration-foreground decoration-4">the right thing</span> — fast."</div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 Anatomy of a Full-Stack App",
    notes: "Every application is built in layers. Concept Phase: Idea + Sketch. Design Phase: Wireframe, Low-Fi UI, Hi-Fi UI. Development Phase: Frontend + Backend. Vibe coding tools handle layers 5-7. Your job: nail layers 1-4. The clearer your vision, the better the output.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 3 · Understanding Apps</Label>
        <Title>Anatomy of a Full-Stack App.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">Every application is built in layers — from idea to infrastructure.</p>
        <div className="mt-8 space-y-5">
          {[
            {
              phase: "Concept Phase",
              PhaseIcon: Lightbulb,
              phaseColor: "text-accent-yellow",
              layers: [
                { num: 1, Icon: Lightbulb, img: null, name: "Idea & Problem", desc: "What problem are you solving? Who is it for?", color: "bg-accent-yellow/20" },
                { num: 2, Icon: Pencil, img: null, name: "Sketch", desc: "Rough drawings on paper, flows & screens.", color: "bg-accent-yellow/20" },
              ],
              yours: true,
            },
            {
              phase: "Design Phase",
              PhaseIcon: Brush,
              phaseColor: "text-accent-purple",
              layers: [
                { num: 3, Icon: Layout, img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/wireframe.jpg", name: "Wireframe", desc: "Basic structure, boxes & layout — no styling.", color: "bg-accent-purple/20" },
                { num: 4, Icon: ImageIcon, img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/mockup.avif", name: "Low-Fi UI", desc: "Simple mockups with basic components.", color: "bg-accent-purple/20" },
                { num: 5, Icon: Sparkles, img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/ui-ux.jpg", name: "Hi-Fi UI", desc: "Polished design, colors, fonts, final look.", color: "bg-accent-purple/20" },
              ],
              yours: false,
            },
            {
              phase: "Development Phase",
              PhaseIcon: Code2,
              phaseColor: "text-accent-blue",
              layers: [
                { num: 6, Icon: Monitor, img: null, name: "Frontend", desc: "What users see & interact with (UI, buttons, forms).", color: "bg-accent-blue/20" },
                { num: 7, Icon: Database, img: null, name: "Backend", desc: "Server, database, logic, APIs — the engine.", color: "bg-accent-blue/20" },
              ],
              yours: false,
            },
          ].map((phase) => {
            const isDesign = phase.phase === "Design Phase";
            return (
              <div key={phase.phase}>
                <div className="flex items-center gap-2 mb-2">
                  <phase.PhaseIcon className={`w-5 h-5 ${phase.phaseColor}`} strokeWidth={2.5} />
                  <div className={`font-black uppercase text-xs tracking-wider ${phase.phaseColor}`}>{phase.phase}</div>
                </div>
                <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${phase.layers.length}, minmax(0,1fr))` }}>
                  {phase.layers.map((layer) => (
                    layer.img ? (
                      <div key={layer.num} className={`border-4 border-foreground brutal-shadow ${layer.color} overflow-hidden flex flex-col`}>
                        <div className="relative bg-background border-b-4 border-foreground">
                          <img src={layer.img} alt={layer.name} className="w-full h-44 md:h-56 object-cover object-top" />
                          <div className="absolute top-2 left-2 bg-background border-2 border-foreground w-10 h-10 flex items-center justify-center brutal-shadow-sm">
                            <span className="font-black text-lg">{layer.num}</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="font-black text-base md:text-lg">{layer.name}</div>
                          <div className="font-semibold text-xs text-foreground/70 leading-snug mt-1">{layer.desc}</div>
                        </div>
                      </div>
                    ) : (
                      <div key={layer.num} className={`border-4 border-foreground brutal-shadow-sm ${layer.color} p-3 flex items-center gap-3`}>
                        <div className="bg-background border-2 border-foreground w-10 h-10 flex items-center justify-center shrink-0">
                          <span className="font-black text-lg">{layer.num}</span>
                        </div>
                        <layer.Icon className="w-6 h-6 shrink-0" strokeWidth={2.5} />
                        <div className="min-w-0">
                          <div className="font-black text-sm md:text-base truncate">{layer.name}</div>
                          <div className="font-semibold text-xs text-foreground/70 leading-snug">{layer.desc}</div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-5 flex items-center gap-4">
          <Target className="w-8 h-8 text-accent-yellow shrink-0" strokeWidth={2.5} />
          <div className="font-black text-base md:text-lg">Vibe coding tools handle layers 5-7 for you. Your job: <span className="text-accent-yellow">nail layers 1-4</span> — the clearer your vision, the better the output.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 One Thing at a Time",
    notes: "Focus on ONE user flow end-to-end before adding others. Then decide: function OR form. Either ugly-but-works (validated idea) or beautiful-mockup (for feedback). Don't try both at once. Ship a working slice, not a broken whole.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 3 · Build Strategy</Label>
        <Title>One Thing at a Time.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">You can't build everything at once — here's how to focus your effort.</p>
        <div className="mt-8 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent-yellow border-2 border-foreground w-12 h-12 flex items-center justify-center shrink-0">
                <Split className="w-7 h-7 text-foreground" strokeWidth={2.5} />
              </div>
              <div className="font-black text-lg md:text-xl">Focus on ONE Flow</div>
            </div>
            <div className="font-semibold text-sm text-foreground/80 leading-relaxed">
              Don't try to build every feature. Pick the most important user journey and make it work end-to-end before moving to the next one.
            </div>
            <div className="mt-4 bg-accent-yellow/15 border-2 border-foreground p-3">
              <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">Example: Landing Page</div>
              <div className="font-semibold text-xs leading-relaxed">
                <strong>First flow:</strong> Visitor reads → Sees CTA → Enters email.<br />
                <strong>Later:</strong> Testimonials, FAQ, multi-step forms, analytics.
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="bg-foreground text-background border-4 border-foreground brutal-shadow w-14 h-14 rounded-full flex items-center justify-center">
              <span className="font-black text-2xl text-accent-yellow">+</span>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent-purple border-2 border-foreground w-12 h-12 flex items-center justify-center shrink-0">
                <Scale className="w-7 h-7 text-foreground" strokeWidth={2.5} />
              </div>
              <div className="font-black text-lg md:text-xl">Function OR Form</div>
            </div>
            <div className="font-semibold text-sm text-foreground/80 leading-relaxed">
              Decide: are you testing if the idea works (functionality) or how it looks (appearance)? Trying both at once leads to confusion.
            </div>
            <div className="mt-4 bg-accent-purple/15 border-2 border-foreground p-3">
              <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">Pick Your Priority</div>
              <div className="font-semibold text-xs leading-relaxed">
                <strong>Functionality first:</strong> Ugly but works = validated idea.<br />
                <strong>Appearance first:</strong> Beautiful mockup for feedback.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-5 flex items-center gap-4">
          <Rocket className="w-8 h-8 text-accent-yellow shrink-0" strokeWidth={2.5} />
          <div className="font-black text-base md:text-lg">Ship a <span className="text-accent-yellow">working slice</span>, not a broken whole. Iterate from there.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 The PRD: Your App's Blueprint",
    notes: "A PRD is a structured document that describes what you're building, who it's for, and how it should work — before writing any code. 7 sections: Problem, User, Core Features, User Flow, Screens, Data, Style. Let AI help you write it, then paste into Lovable/Bolt/Replit as your first prompt.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 3 · Your Blueprint</Label>
        <Title>The PRD: Your App's Blueprint.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">A Product Requirements Document turns your vision into clear instructions for AI.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div>
            <div className="border-4 border-foreground brutal-shadow bg-background p-4 mb-3">
              <div className="font-black uppercase text-xs tracking-wider text-accent-blue mb-2">What is a PRD?</div>
              <div className="font-semibold text-sm text-foreground/80 leading-relaxed">
                A structured document that describes <strong>what</strong> you're building, <strong>who</strong> it's for, and <strong>how</strong> it should work — before writing any code. It's the bridge between your sketch and the AI.
              </div>
            </div>
            <div className="space-y-2">
              {[
                { num: 1, name: "Problem", desc: "What pain point are you solving?" },
                { num: 2, name: "User", desc: "Who is this for? What do they need?" },
                { num: 3, name: "Core Features", desc: "The essential functionality (MVP scope)." },
                { num: 4, name: "User Flow", desc: "Step-by-step journey through the app." },
                { num: 5, name: "Screens", desc: "What pages/views are needed?" },
                { num: 6, name: "Data", desc: "What information needs to be stored?" },
                { num: 7, name: "Style", desc: "Look & feel, colors, tone." },
              ].map((s) => (
                <div key={s.num} className="border-2 border-foreground bg-background p-2 flex items-center gap-3">
                  <div className="bg-accent-blue border-2 border-foreground w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="font-black text-sm">{s.num}</span>
                  </div>
                  <div className="font-black text-sm w-28 shrink-0">{s.name}</div>
                  <div className="font-semibold text-xs text-foreground/60 leading-snug">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="border-4 border-foreground brutal-shadow bg-foreground text-background p-5 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-6 h-6 text-accent-yellow" strokeWidth={2.5} />
                <div className="font-black uppercase text-xs tracking-wider text-accent-yellow">Let AI Create Your PRD</div>
              </div>
              <div className="font-mono text-xs md:text-sm leading-relaxed text-background/90">
                "I want to build <em className="text-accent-yellow">[app idea]</em>. Help me create a PRD that includes:<br /><br />
                • Problem statement<br />
                • Target user persona<br />
                • MVP feature list (max 5)<br />
                • Main user flow<br />
                • Required screens<br />
                • Data to store<br />
                • Visual style direction<br /><br />
                Keep it lean and focused on one core flow. Ask me questions if you need more clarity."
              </div>
            </div>
            <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-4 flex items-center gap-3">
              <Workflow className="w-7 h-7 text-foreground shrink-0" strokeWidth={2.5} />
              <div className="flex-1">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">The Connection</div>
                <div className="font-semibold text-xs md:text-sm leading-relaxed">
                  Your PRD maps directly to <span className="font-black">layers 1-5</span>. Once complete, paste it into Lovable/Bolt/Replit as your <span className="font-black">first prompt</span> — the AI now has everything it needs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 Build: From Problem to Prototype",
    notes: "Now we build — a simple app, not a landing page. Take your problem from section 1 and your offer from section 2. Pick ONE flow + decide: function-first (ugly but works) OR form-first (beautiful mockup for feedback). Don't try both. Ship a working slice.",
    render: () => (
      <Frame bg="bg-accent-green/10">
        <Label color="bg-accent-green text-foreground">Section 3 · Build · 30 min</Label>
        <Title>From Problem to Prototype.</Title>
        <p className="mt-3 font-semibold text-base text-muted-foreground text-center">Build a <span className="font-black text-foreground">simple app</span> — not a landing page. One flow. Function <span className="font-black text-foreground">OR</span> form. Ship a working slice.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/10 p-4">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">From Section 1</div>
            <div className="font-black text-base">{`Your Problem & Persona`}</div>
            <div className="font-semibold text-xs text-foreground/70 mt-1">The problem you picked. The person who feels it.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-purple/10 p-4">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">From Section 2</div>
            <div className="font-black text-base">Your Offer Statement</div>
            <div className="font-semibold text-xs text-foreground/70 mt-1">We help [who] solve [what] so they can [result].</div>
          </div>
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {/* PATH A — Function First */}
          <div className="border-4 border-foreground brutal-shadow-lg bg-background flex flex-col">
            <div className="bg-accent-yellow border-b-4 border-foreground p-3 flex items-center gap-3">
              <div className="bg-foreground text-background w-8 h-8 flex items-center justify-center font-black text-sm shrink-0">A</div>
              <div>
                <div className="font-black text-base md:text-lg uppercase">Function First</div>
                <div className="font-bold text-xs text-foreground/70">Ugly but works = validated idea</div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-mono text-xs md:text-sm leading-relaxed text-foreground/90 flex-1">
                Build a simple app for <span className="bg-accent-yellow/40 font-black px-1">[your persona]</span> that helps them <span className="bg-accent-purple/40 font-black px-1">[solve their problem]</span>.<br /><br />
                <span className="font-black">Core flow (the ONE thing it must do):</span><br />
                1. User <span className="bg-accent-blue/40 font-black px-1">[opens / inputs / uploads]</span> <span className="bg-accent-blue/40 font-black px-1">[what]</span><br />
                2. The app <span className="bg-accent-green/40 font-black px-1">[processes / generates / matches]</span><br />
                3. User gets <span className="bg-accent-green/40 font-black px-1">[the result they came for]</span><br /><br />
                <span className="font-black">Focus on functionality.</span> Use plain styling. No fancy design. The goal is to prove the idea works end-to-end.
              </div>
              <div className="mt-3 bg-accent-yellow/20 border-2 border-foreground p-2">
                <div className="font-black uppercase text-[10px] tracking-wider text-foreground/60 mb-1">Example</div>
                <div className="font-semibold text-xs italic">Input a job description → AI extracts skills → Match against your CV → Show fit score + missing skills.</div>
              </div>
            </div>
          </div>

          {/* PATH B — Form First */}
          <div className="border-4 border-foreground brutal-shadow-lg bg-background flex flex-col">
            <div className="bg-accent-purple border-b-4 border-foreground p-3 flex items-center gap-3">
              <div className="bg-foreground text-background w-8 h-8 flex items-center justify-center font-black text-sm shrink-0">B</div>
              <div>
                <div className="font-black text-base md:text-lg uppercase">Form First</div>
                <div className="font-bold text-xs text-foreground/70">Beautiful mockup = feedback magnet</div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-mono text-xs md:text-sm leading-relaxed text-foreground/90 flex-1">
                Build a polished, clickable mockup of an app for <span className="bg-accent-yellow/40 font-black px-1">[your persona]</span> that solves <span className="bg-accent-purple/40 font-black px-1">[their problem]</span>.<br /><br />
                <span className="font-black">Screens to design (one flow only):</span><br />
                1. <span className="bg-accent-blue/40 font-black px-1">[Entry / login / home]</span> screen<br />
                2. <span className="bg-accent-blue/40 font-black px-1">[Main action]</span> screen<br />
                3. <span className="bg-accent-green/40 font-black px-1">[Result / success]</span> screen<br /><br />
                <span className="font-black">Style direction:</span> <span className="bg-accent-yellow/40 font-black px-1">[modern / playful / minimal]</span>, color palette <span className="bg-accent-yellow/40 font-black px-1">[describe]</span>.<br /><br />
                Buttons don't need real logic. Focus on look & feel so you can show it to users for feedback.
              </div>
              <div className="mt-3 bg-accent-purple/20 border-2 border-foreground p-2">
                <div className="font-black uppercase text-[10px] tracking-wider text-foreground/60 mb-1">Example</div>
                <div className="font-semibold text-xs italic">3 polished screens: upload CV → see beautiful match dashboard → save curated job list.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-4 flex items-center gap-3">
          <Target className="w-7 h-7 text-accent-yellow shrink-0" strokeWidth={2.5} />
          <div className="font-black text-sm md:text-base">Pick <span className="text-accent-yellow">ONE path</span>, fill the placeholders with YOUR problem + persona + offer, then paste into Lovable. Don't switch paths mid-build.</div>
        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-4">
          <a href="https://lovable.dev/invite/H52USL6" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-purple/10 transition-colors flex items-center gap-3 p-3">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/lovable-qr.svg" alt="Lovable QR Code" className="w-20 h-20 shrink-0" />
            <div className="min-w-0">
              <div className="font-black uppercase text-lg">Lovable</div>
              <div className="font-bold text-xs truncate">lovable.dev/invite/H52USL6</div>
              <div className="font-semibold text-[11px] text-foreground/60 mt-1 leading-snug">Your invite link — build your simple app</div>
            </div>
          </a>
          <a href="https://app.emergent.sh/register?ref=ahme817456" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-green/10 transition-colors flex items-center gap-3 p-3">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/emergent-qr.svg" alt="Emergent QR Code" className="w-20 h-20 shrink-0" />
            <div className="min-w-0">
              <div className="font-black uppercase text-lg">Emergent</div>
              <div className="font-bold text-xs truncate">emergent.sh</div>
              <div className="font-semibold text-[11px] text-foreground/60 mt-1 leading-snug">AI-powered coding companion</div>
            </div>
          </a>
          <a href="https://wisprflow.ai/r?AHMED24" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow bg-background hover:bg-accent-blue/10 transition-colors flex items-center gap-3 p-3">
            <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/wispr-qr.svg" alt="Wispr Flow QR Code" className="w-20 h-20 shrink-0" />
            <div className="min-w-0">
              <div className="font-black uppercase text-lg">Wispr Flow</div>
              <div className="font-bold text-xs truncate">wisprflow.ai/r?AHMED24</div>
              <div className="font-semibold text-[11px] text-foreground/60 mt-1 leading-snug">1 month free — voice-to-text for prompts</div>
            </div>
          </a>
        </div>
        <Quote>Make it smaller. Get version one working first. Clarity before complexity.</Quote>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 MVP → MCP → MRP → MLP",
    notes: "MVP is just the start. MCP = Minimum Compelling Product (people want it). MRP = Minimum Reliable Product (it works every time). MLP = Minimum Lovable Product (people love it). Move through each stage — don't skip.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-accent-yellow text-foreground">Section 3 · Theory</Label>
        <Title>From MVP to MLP.</Title>
        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-2xl relative">
            {/* Center: MVP */}
            <div className="border-4 border-foreground brutal-shadow-lg bg-foreground text-background p-6 text-center mb-8">
              <div className="font-black uppercase text-5xl md:text-7xl tracking-tight">MVP</div>
              <div className="font-bold text-sm text-background/70 mt-1">Minimum Viable Product</div>
            </div>
            {/* Three cards around MVP */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-4 border-foreground brutal-shadow bg-accent-yellow p-5 text-center">
                <div className="font-black text-3xl md:text-4xl tracking-tight">MCP</div>
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mt-2">Minimum Compelling Product</div>
                <div className="mt-3 space-y-2">
                  <div className="font-bold text-sm">People want it.</div>
                  <div className="font-semibold text-xs text-foreground/70">Not just usable — desirable. It solves a pain people actually feel.</div>
                </div>
              </div>
              <div className="border-4 border-foreground brutal-shadow bg-accent-purple p-5 text-center">
                <div className="font-black text-3xl md:text-4xl tracking-tight text-foreground">MRP</div>
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mt-2">Minimum Reliable Product</div>
                <div className="mt-3 space-y-2">
                  <div className="font-bold text-sm">It works. Every time.</div>
                  <div className="font-semibold text-xs text-foreground/70">Not a demo — a dependable product. Trust is built on consistency.</div>
                </div>
              </div>
              <div className="border-4 border-foreground brutal-shadow bg-accent-green p-5 text-center">
                <div className="font-black text-3xl md:text-4xl tracking-tight">MLP</div>
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mt-2">Minimum Lovable Product</div>
                <div className="mt-3 space-y-2">
                  <div className="font-bold text-sm">People love it.</div>
                  <div className="font-semibold text-xs text-foreground/70">Not just functional — delightful. The experience makes them stay.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-5 text-center">
          <div className="font-black text-base md:text-lg">Viable gets you started. Compelling gets you users. Reliable keeps them. Lovable makes them stay.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 Read This",
    notes: "The Guide to Minimum Viable Products. The clearest, shortest playbook on stripping your idea to its essential core before you build. Read this before you write your PRD. Every page maps directly to the Break It Down First and One Thing at a Time slides.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 3 · Further Reading</Label>
        <Title>Read This.</Title>
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="border-4 border-foreground brutal-shadow-lg bg-background flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 bg-accent-blue/20 border-b-4 md:border-b-0 md:border-r-4 border-foreground flex items-center justify-center p-6">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/mvp.jpg" alt="The Guide to Minimum Viable Products book cover" className="w-48 md:w-56 h-auto border-2 border-foreground brutal-shadow" />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="bg-accent-blue text-foreground border-2 border-foreground px-3 py-1 inline-block self-start mb-3">
                <div className="font-black uppercase text-xs tracking-wider">Essential</div>
              </div>
              <div className="font-black text-2xl md:text-3xl leading-tight">The Guide To Minimum Viable Products</div>
              <div className="font-semibold text-sm md:text-base text-foreground/70 mt-4 leading-relaxed">
                The clearest, shortest playbook on stripping your idea down to its essential core — before you build a single screen.
              </div>
              <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-4">
                <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-2">Why read it now</div>
                <div className="font-semibold text-sm leading-relaxed">
                  Every page maps directly to <span className="font-black">Break It Down First</span> and <span className="font-black">One Thing at a Time</span>. Read it before you write your PRD.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 3,
    title: "S3 Scan to Revisit",
    notes: "End-of-section QR. Tell participants to scan it now if they want to revisit all of Section 3's slides on their phone. The link only opens Section 3.",
    render: () => {
      const url = "https://zero-to-one-workshop.lovable.app/section/3";
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=10&data=${encodeURIComponent(url)}`;
      return (
        <Frame bg="bg-accent-blue">
          <Label color="bg-foreground text-background">Section 3 · Recap</Label>
          <Title>Scan to Revisit Section 3.</Title>
          <p className="mt-4 font-bold text-xl text-foreground/80">Point your phone camera. Read every slide from this section at your own pace.</p>
          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-background border-4 border-foreground brutal-shadow-lg p-6 shrink-0">
              <img src={qrSrc} alt="QR code to Section 3 slides" className="w-72 h-72 md:w-96 md:h-96 block" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">Link</div>
                <div className="font-mono font-bold break-all">{url}</div>
              </div>
              <div className="bg-foreground text-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-accent-blue mb-2">Heads up</div>
                <div className="font-bold">This link only opens Section 3. No spoilers for what comes next.</div>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("section-goto", { detail: { index: 14 } }))}
                className="w-full bg-accent-yellow text-foreground border-4 border-foreground brutal-shadow p-5 font-black uppercase text-lg tracking-wider hover:translate-x-1 hover:translate-y-1 hover:brutal-shadow-sm transition-transform text-left flex items-center justify-between gap-3"
              >
                <span>→ Advanced Workflow</span>
                <span className="text-xs font-bold opacity-70 normal-case tracking-normal">Bonus slide</span>
              </button>
            </div>
          </div>
        </Frame>
      );
    },
  },
  {
    sectionId: 3,
    title: "S3 Advanced Workflow (Bonus)",
    notes: "Bonus slide: my personal advanced setup. Start the project on Lovable, connect to GitHub, clone to local machine, then develop locally with a multi-tool stack. Kiro for UX/UI, Claude Code + OpenCode for backend and functionality, Claude Desktop for complex brainstorming and beyond-tech thinking. I run Minimax and GLM as the local LLMs.",
    render: () => (
      <Frame bg="bg-accent-purple/20">
        <Label color="bg-accent-yellow text-foreground">Section 3 · Bonus · Advanced</Label>
        <Title>My Advanced Workflow.</Title>
        <p className="mt-3 font-bold text-base md:text-lg text-foreground/70">From Lovable prototype to a full local stack. For when you're ready to go beyond the browser.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-3">
          {[
            { n: 1, t: "Start on Lovable", d: "Spin up the prototype fast. PRD → working app in one session.", c: "bg-accent-purple" },
            { n: 2, t: "Connect to GitHub", d: "Sync the project to a repo so every change is versioned.", c: "bg-accent-blue" },
            { n: 3, t: "Clone Local", d: "Pull the repo to your local machine and open it in your editor.", c: "bg-accent-green" },
          ].map((s) => (
            <div key={s.n} className={`${s.c} border-4 border-foreground brutal-shadow p-4`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-foreground text-background font-black flex items-center justify-center border-2 border-foreground">{s.n}</div>
                <div className="font-black uppercase text-base">{s.t}</div>
              </div>
              <div className="font-semibold text-sm text-foreground/80 leading-snug">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-5">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">Step 4 · Develop Locally — My Stack</div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background text-foreground border-2 border-background p-3">
              <div className="font-black uppercase text-sm">Kiro</div>
              <div className="font-semibold text-xs text-foreground/70">UX / UI work</div>
            </div>
            <div className="bg-background text-foreground border-2 border-background p-3">
              <div className="font-black uppercase text-sm">Claude Code + OpenCode</div>
              <div className="font-semibold text-xs text-foreground/70">Backend & functionality</div>
            </div>
            <div className="bg-background text-foreground border-2 border-background p-3">
              <div className="font-black uppercase text-sm">Claude Desktop</div>
              <div className="font-semibold text-xs text-foreground/70">Complex tasks · brainstorming · beyond-tech</div>
            </div>
            <div className="bg-accent-yellow text-foreground border-2 border-foreground p-3">
              <div className="font-black uppercase text-sm">LLMs providers</div>
              <div className="font-semibold text-xs text-foreground/80">Minimax · GLM · Ollama</div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-accent-green border-4 border-foreground brutal-shadow p-4 text-center">
          <div className="font-black uppercase text-sm md:text-base">Prototype fast on Lovable. Scale deep on your own machine.</div>
        </div>
      </Frame>
    ),
  },


  // ===== SECTION 4: Distribution — B2C & B2B (custom slides) =====
  {
    sectionId: 4,
    title: "S4 Don't Confuse Building With Demand",
    notes: "This is the most important concept in the entire workshop. A prototype is not validation. Likes are not proof. Cool is not a business model. The first goal is not scale — it is signal. Distribution beats the product nine times out of ten.",
    render: () => (
      <Frame bg="bg-accent-green/15">
        <Label color="bg-accent-green text-foreground">Section 4 · Opener</Label>
        <Title>Don't Confuse Building With Demand.</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black text-xl md:text-2xl leading-snug text-center">
            A prototype is not validation. Likes are not proof. {"\""}Cool{"\""} is not a business model.
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-red-50 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-red-600 mb-2">Not Demand</div>
            <ul className="space-y-2 font-semibold text-sm">
              <li className="flex items-start gap-2"><span className="text-red-500">&#10005;</span> I built it, so people will come</li>
              <li className="flex items-start gap-2"><span className="text-red-500">&#10005;</span> My friends said it's cool</li>
              <li className="flex items-start gap-2"><span className="text-red-500">&#10005;</span> I got 200 likes on LinkedIn</li>
            </ul>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/10 p-6">
            <div className="font-black uppercase text-xs tracking-wider text-accent-green mb-2">Real Demand</div>
            <ul className="space-y-2 font-semibold text-sm">
              <li className="flex items-start gap-2"><span className="text-accent-green">&#10003;</span> A stranger gave me their email</li>
              <li className="flex items-start gap-2"><span className="text-accent-green">&#10003;</span> 3 people booked a call</li>
              <li className="flex items-start gap-2"><span className="text-accent-green">&#10003;</span> Someone paid a deposit</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-5 flex items-center gap-4">
          <Target className="w-8 h-8 text-accent-yellow shrink-0" strokeWidth={2.5} />
          <div className="font-black text-base md:text-lg">The first goal is not scale — it's <span className="text-accent-yellow">signal</span>. And signal comes from <span className="text-accent-yellow">distribution</span>, not the product.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 The Marketing Funnel",
    notes: "Awareness — they hear about you. Interest — they want to learn more. Consideration — they evaluate. Conversion — they act (email, call, payment). Loyalty — they come back and refer. Most founders only think about the bottom. Without a top, nothing else happens.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 4 · Theory</Label>
        <Title>The Marketing Funnel.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">Strangers don't buy. They <span className="font-black text-foreground">discover</span> first.</p>
        <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <div className="space-y-2">
            {[
              { stage: 1, Icon: Eye, label: "Awareness", desc: "Strangers hear about you for the first time.", width: "w-full", color: "bg-accent-yellow" },
              { stage: 2, Icon: MousePointerClick, label: "Interest", desc: "They want to learn more. They visit, follow, scroll.", width: "w-[88%]", color: "bg-accent-purple" },
              { stage: 3, Icon: Search, label: "Consideration", desc: "They evaluate. Compare. Read your reviews & content.", width: "w-[72%]", color: "bg-accent-blue" },
              { stage: 4, Icon: ShoppingCart, label: "Conversion", desc: "They act: email, demo, deposit, payment.", width: "w-[56%]", color: "bg-accent-green" },
              { stage: 5, Icon: Heart, label: "Loyalty & Referral", desc: "They come back, recommend, become your sales team.", width: "w-[40%]", color: "bg-primary text-background" },
            ].map((s) => (
              <div key={s.stage} className={`${s.width} mx-auto border-4 border-foreground brutal-shadow-sm ${s.color} flex items-center gap-3 p-3`}>
                <div className="bg-background border-2 border-foreground w-10 h-10 flex items-center justify-center shrink-0">
                  <span className="font-black text-base">{s.stage}</span>
                </div>
                <s.Icon className="w-6 h-6 shrink-0" strokeWidth={2.5} />
                <div className="min-w-0 flex-1">
                  <div className="font-black text-base md:text-lg">{s.label}</div>
                  <div className="font-semibold text-xs text-foreground/70 leading-snug">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-col items-center justify-center h-full">
            <Filter className="w-16 h-16 text-accent-blue mb-2" strokeWidth={2} />
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 text-center">Each stage filters the next</div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-5 text-center">
          <div className="font-black text-base md:text-lg">Most founders only think about the bottom. <span className="text-accent-yellow">Without a top, nothing else happens.</span></div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 Funnel = Dating to Marriage",
    notes: "The funnel feels abstract until you map it to something everyone has lived. Dating to marriage IS a funnel. You don't propose on day one. You notice → flirt → date → commit → marry. Skip a stage and you get a restraining order, not a customer. Same with your startup: don't ask strangers to marry your product on the first click.",
    render: () => (
      <Frame bg="bg-accent-purple/10">
        <Label color="bg-accent-purple text-foreground">Section 4 · Analogy</Label>
        <Title>The Funnel = Dating to Marriage.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">You don't propose on the first date. <span className="font-black text-foreground">Don't ask strangers to marry your product either.</span></p>
        <div className="mt-8 space-y-3">
          {[
            { stage: 1, Icon: Eye, funnel: "Awareness", dating: "Eyes Meet Across the Room", desc: "They see you exist. That's it. No pitch, no ring — just a glance.", color: "bg-accent-yellow" },
            { stage: 2, Icon: MessageSquare, funnel: "Interest", dating: "The First Hello", desc: "A smile, a follow, a DM. They want to know more about you.", color: "bg-accent-purple" },
            { stage: 3, Icon: Search, funnel: "Consideration", dating: "Dating & Vetting", desc: "Coffee. Dinner. Meet the friends. They compare you to alternatives.", color: "bg-accent-blue" },
            { stage: 4, Icon: Heart, funnel: "Conversion", dating: "The Yes — Commitment", desc: "They say yes: email, deposit, signature. The relationship is official.", color: "bg-accent-green" },
            { stage: 5, Icon: Users, funnel: "Loyalty & Referral", dating: "Marriage & Telling Friends", desc: "They stay. They rave. They bring the whole wedding party with them.", color: "bg-primary text-background" },
          ].map((s) => (
            <div key={s.stage} className={`${s.color} border-4 border-foreground brutal-shadow flex items-center gap-3 p-3`}>
              <div className="bg-background border-2 border-foreground w-10 h-10 flex items-center justify-center shrink-0">
                <span className="font-black text-base">{s.stage}</span>
              </div>
              <s.Icon className="w-6 h-6 shrink-0" strokeWidth={2.5} />
              <div className="min-w-0 flex-1 grid md:grid-cols-[140px_1fr] gap-1 md:gap-3 items-center">
                <div className="font-black uppercase text-xs tracking-wider opacity-70">{s.funnel}</div>
                <div>
                  <div className="font-black text-base md:text-lg leading-tight">{s.dating}</div>
                  <div className="font-semibold text-xs opacity-80 leading-snug">{s.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-5 text-center">
          <div className="font-black text-base md:text-lg">Skip a stage and you get a <span className="text-red-400">restraining order</span>, not a <span className="text-accent-yellow">customer</span>.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 Building in Public",
    notes: "Building in public means sharing the journey, not just the product. You document the why, the wins, the mess. Every post is a touchpoint that fills your funnel. Audience compounds while you build. By launch, distribution is already warm.",
    render: () => (
      <Frame bg="bg-accent-purple/10">
        <Label color="bg-accent-purple text-foreground">Section 4 · Distribution</Label>
        <Title>Building in Public.</Title>
        <p className="mt-4 font-semibold text-lg text-muted-foreground text-center">Share the journey, not just the product. Distribution starts <span className="font-black text-foreground">before</span> launch.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { Icon: Megaphone, title: "Share the Why", desc: "Why this problem matters to you. Why now. Why you. Stories travel further than features.", color: "bg-accent-yellow" },
            { Icon: TrendingUp, title: "Share the Wins", desc: "First user. First $1. First testimonial. Milestones are content. Numbers are proof.", color: "bg-accent-purple" },
            { Icon: Scissors, title: "Share the Mess", desc: "What broke. What surprised you. What you got wrong. Vulnerability builds trust.", color: "bg-accent-blue" },
          ].map((s) => (
            <div key={s.title} className="border-4 border-foreground brutal-shadow bg-background flex flex-col">
              <div className={`${s.color} border-b-4 border-foreground p-4 flex items-center justify-center`}>
                <s.Icon className="w-10 h-10 text-foreground" strokeWidth={2.5} />
              </div>
              <div className="p-4 flex-1">
                <div className="font-black text-lg md:text-xl">{s.title}</div>
                <div className="font-semibold text-sm text-foreground/70 mt-2 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-foreground text-background p-5">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">The Compound Effect</div>
            <ul className="space-y-2 font-semibold text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-yellow shrink-0 mt-1" strokeWidth={2.5} /><span>Every post is a touchpoint that fills your funnel.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-yellow shrink-0 mt-1" strokeWidth={2.5} /><span>Audience compounds while you build.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-yellow shrink-0 mt-1" strokeWidth={2.5} /><span>By launch day, distribution is already warm.</span></li>
            </ul>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-5">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-3">Where to Build in Public</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { Icon: Radio, name: "TikTok / Reels" },
                { Icon: MessageSquare, name: "LinkedIn" },
                { Icon: Mic, name: "Twitter / X" },
                { Icon: Network, name: "Communities" },
              ].map((p) => (
                <div key={p.name} className="bg-background border-2 border-foreground p-2 flex items-center gap-2">
                  <p.Icon className="w-5 h-5 text-foreground shrink-0" strokeWidth={2.5} />
                  <div className="font-black text-sm">{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    ),
  },

  // ----- B2C TRACK -----
  {
    sectionId: 4,
    title: "S4 B2C — Selling to People",
    notes: "Section divider — B2C track. The customer = the user = the buyer. Volume game. Distribution via content, community, paid ads, word of mouth. Decision is emotional. Fast cycle.",
    render: () => (
      <Frame bg="bg-foreground text-background">
        <Label color="bg-accent-yellow text-foreground">Section 4 · Track A</Label>
        <Title>B2C — Selling to People.</Title>
        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="border-4 border-accent-yellow bg-background text-foreground brutal-shadow-lg p-6 md:p-8 flex flex-col items-center text-center">
            <Users className="w-20 h-20 text-accent-yellow mb-4" strokeWidth={2.5} />
            <div className="font-black text-2xl md:text-3xl">Business → Consumer</div>
            <div className="font-semibold text-sm text-foreground/70 mt-2">The user is the buyer. The decision is emotional. The cycle is fast.</div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Game", value: "Volume" },
              { label: "Channel", value: "Content, community, ads, word of mouth" },
              { label: "Cycle", value: "Hours to days" },
              { label: "Trigger", value: "Emotion, identity, FOMO" },
            ].map((m) => (
              <div key={m.label} className="border-4 border-accent-yellow bg-background text-foreground p-4 flex items-center gap-4">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 w-20 shrink-0">{m.label}</div>
                <div className="font-black text-base md:text-lg flex-1">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 bg-accent-yellow text-foreground border-4 border-accent-yellow brutal-shadow-lg p-5 text-center">
          <div className="font-black text-lg md:text-xl">Next: how I helped Predictiva raise <span className="underline decoration-4">+$600K</span> using exactly this playbook.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 Case Study — Predictiva: $600K in 6 Weeks",
    notes: "Edinburgh, UK. Jan-Mar 2023. Predictiva — AI trading model for crypto and stock markets. Equity crowdfunding campaign. Real 6-step playbook Ahmed personally executed. Results: $600K+ raised, +50% brand visibility, +35% user acquisition month 1.",
    render: () => (
      <Frame bg="bg-accent-yellow/15">
        <Label color="bg-accent-yellow text-foreground">Section 4 · B2C Case Study</Label>
        <Title>Predictiva: $600K in 6 Weeks.</Title>
        <p className="mt-3 font-semibold text-base text-muted-foreground text-center">Edinburgh, UK · Jan–Mar 2023 · AI trading model · Equity crowdfunding</p>
        <div className="mt-5 space-y-2">
          {[
            { num: 1, Icon: Award, label: "Personal Branding", desc: "Crafted the founders' social media presence. Showcased their expertise and vision. Built trust and positioned them as the go-to experts in AI trading — connecting the community directly to the people behind the product.", color: "bg-accent-yellow" },
            { num: 2, Icon: Mic, label: "Webinars with Influencers", desc: "Hosted engaging webinars about crypto and the startup journey. Amplified reach by bringing in influential social media personalities as hosts — borrowed their audience to warm ours.", color: "bg-accent-purple" },
            { num: 3, Icon: Megaphone, label: "Social Media Strategy", desc: "Comprehensive strategy matching brand and campaign objectives. Regular posts on technology trends, crypto trading, and AI. One consistent story — adapted for each platform.", color: "bg-accent-blue" },
            { num: 4, Icon: MessageSquare, label: "Telegram Community", desc: "Built a dedicated Telegram channel for in-depth updates and community. Grew from 0 to 10,000 members in 3 weeks. Members became evangelists.", color: "bg-accent-green" },
            { num: 5, Icon: TrendingUp, label: "Riding the ChatGPT Wave", desc: "ChatGPT had just launched. We seamlessly inserted Predictiva into the AI conversations already happening globally — generated massive organic buzz by positioning inside an existing trend.", color: "bg-primary text-background" },
            { num: 6, Icon: MousePointerClick, label: "Funnel Landing Page", desc: "Crafted a compelling landing page that converted awareness into pledges. Clear value proposition, novel technology story, and a single CTA that moved strangers to investors.", color: "bg-accent-yellow" },
          ].map((l) => (
            <div key={l.num} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-stretch">
              <div className={`${l.color} border-r-4 border-foreground flex flex-col items-center justify-center w-14 shrink-0 gap-1 p-2`}>
                <l.Icon className="w-5 h-5" strokeWidth={2.5} />
                <span className="font-black text-sm">{l.num}</span>
              </div>
              <div className="p-3 flex-1">
                <div className="font-black text-sm md:text-base">{l.label}</div>
                <div className="font-semibold text-xs text-foreground/70 mt-0.5 leading-snug">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-4">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3 text-center flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" strokeWidth={2.5} /> The Result
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-accent-yellow text-foreground border-4 border-accent-yellow p-3 text-center">
              <div className="font-black text-2xl md:text-3xl">$600K+</div>
              <div className="font-bold text-[10px] mt-1 uppercase tracking-wider">Raised · 6 weeks</div>
            </div>
            <div className="bg-accent-purple text-foreground border-4 border-accent-purple p-3 text-center">
              <div className="font-black text-2xl md:text-3xl">+50%</div>
              <div className="font-bold text-[10px] mt-1 uppercase tracking-wider">Brand Visibility · M1</div>
            </div>
            <div className="bg-accent-green text-foreground border-4 border-accent-green p-3 text-center">
              <div className="font-black text-2xl md:text-3xl">+35%</div>
              <div className="font-bold text-[10px] mt-1 uppercase tracking-wider">User Acquisition · M1</div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 B2C Build — Your Week 1 Distribution Plan",
    notes: "Pick ONE channel — not three. Define your hook. Commit to 7 posts in 7 days. Track signal not vanity. Concrete homework, not theory.",
    render: () => (
      <Frame bg="bg-accent-green/10">
        <Label color="bg-accent-green text-foreground">Section 4 · B2C Build · 20 min</Label>
        <Title>Your Week 1 Distribution Plan.</Title>
        <p className="mt-3 font-semibold text-base text-muted-foreground text-center">Don't ship and pray. Ship and post. Every day. For one week.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-accent-yellow border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 1 · Pick ONE channel</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { Icon: Radio, name: "TikTok / Reels", desc: "Hooks + face" },
                { Icon: MessageSquare, name: "LinkedIn", desc: "Story posts" },
                { Icon: Mic, name: "Twitter / X", desc: "Short takes" },
                { Icon: Network, name: "Community", desc: "Discord, Slack, group" },
              ].map((c) => (
                <div key={c.name} className="border-2 border-foreground bg-background p-2 flex items-center gap-2">
                  <c.Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                  <div className="min-w-0">
                    <div className="font-black text-xs">{c.name}</div>
                    <div className="font-semibold text-[10px] text-foreground/60">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-foreground text-background p-2 text-center">
              <div className="font-black text-xs">One channel. Not three.</div>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-accent-purple border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 2 · Define your hook</div>
            </div>
            <div className="font-mono text-xs md:text-sm leading-relaxed bg-accent-purple/15 border-2 border-foreground p-3">
              "I'm building <span className="bg-accent-yellow/50 font-black px-1">[the simple app you built today]</span> for <span className="bg-accent-yellow/50 font-black px-1">[your persona]</span> who struggle with <span className="bg-accent-yellow/50 font-black px-1">[their problem]</span>. Here's day <span className="bg-accent-yellow/50 font-black px-1">[N]</span> of building it in public."
            </div>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-accent-blue border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 3 · Commit to 7 posts in 7 days</div>
            </div>
            <ul className="space-y-1 font-semibold text-sm">
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D1</span> The why — what problem & who for</li>
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D2</span> A demo of the working flow</li>
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D3</span> A behind-the-scenes mess</li>
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D4</span> A user quote / reaction</li>
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D5</span> A bold opinion in your space</li>
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D6</span> An ask (sign up / DM / feedback)</li>
              <li className="flex items-start gap-2"><span className="font-black text-accent-blue">D7</span> Week recap + numbers</li>
            </ul>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-foreground text-background p-5">
            <div className="bg-accent-green text-foreground border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 4 · Track signal, not vanity</div>
            </div>
            <ul className="space-y-2 font-semibold text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>Emails captured</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>Profile visits → product clicks</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>DMs / replies from your persona</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>Calls booked / pledges / waitlist</span></li>
            </ul>
            <div className="mt-4 bg-accent-yellow text-foreground border-2 border-accent-yellow p-3 text-center">
              <div className="font-black text-sm">Likes ≠ signal. Action = signal.</div>
            </div>
          </div>
        </div>
        <Quote>You don't have a product problem. You have a distribution problem.</Quote>
      </Frame>
    ),
  },

  // ----- B2B TRACK -----
  {
    sectionId: 4,
    title: "S4 B2B — Selling to Businesses",
    notes: "Section divider — B2B track. The buyer is not the user. Smaller volume, larger deals, longer cycle. Trust + ROI + integration. Distribution is interviews, pilots, network, design partners.",
    render: () => (
      <Frame bg="bg-foreground text-background">
        <Label color="bg-accent-blue text-foreground">Section 4 · Track B</Label>
        <Title>B2B — Selling to Businesses.</Title>
        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="border-4 border-accent-blue bg-background text-foreground brutal-shadow-lg p-6 md:p-8 flex flex-col items-center text-center">
            <Building2 className="w-20 h-20 text-accent-blue mb-4" strokeWidth={2.5} />
            <div className="font-black text-2xl md:text-3xl">Business → Business</div>
            <div className="font-semibold text-sm text-foreground/70 mt-2">The buyer is rarely the user. The decision is rational. The cycle is long.</div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Game", value: "Trust & ROI" },
              { label: "Channel", value: "Interviews, pilots, network, design partners" },
              { label: "Cycle", value: "Weeks to months" },
              { label: "Trigger", value: "Pain, mandate, budget cycle" },
            ].map((m) => (
              <div key={m.label} className="border-4 border-accent-blue bg-background text-foreground p-4 flex items-center gap-4">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 w-20 shrink-0">{m.label}</div>
                <div className="font-black text-base md:text-lg flex-1">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 bg-accent-blue text-foreground border-4 border-accent-blue brutal-shadow-lg p-5 text-center">
          <div className="font-black text-lg md:text-xl">Next: meet <span className="underline decoration-4">Tanja Karonen</span> — my co-founder building Bridget for Finnish infrastructure.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 Case Study — Bridget with Tanja Karonen",
    notes: "Tanja Karonen — my co-founder/CEO at Bridget. 20+ years in Finnish infrastructure QA. National transport agency relationships. Founded and scaled a rebar business from €0 to €13M. Bridget: turning Excel-based infra QA into a Microsoft-native workflow. 12/12 interviews confirm the pain. Pre-seed. Beachhead Finnish rail. Tagline: Keep the form. Ditch the file.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 4 · B2B Case Study</Label>
        <Title>Bridget — with Tanja Karonen.</Title>
        <p className="mt-3 font-semibold text-base text-muted-foreground text-center">Helsinki · Pre-seed · Beachhead: Finnish rail infrastructure</p>
        <div className="mt-6 grid md:grid-cols-[1fr_1.2fr] gap-5 items-stretch">
          {/* Tanja card */}
          <div className="border-4 border-foreground brutal-shadow-lg bg-background flex flex-col">
            <div className="bg-accent-blue border-b-4 border-foreground p-3">
              <div className="font-black uppercase text-xs tracking-wider">Co-founder / CEO</div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-foreground text-background border-2 border-foreground w-14 h-14 flex items-center justify-center shrink-0">
                  <span className="font-black text-xl">TK</span>
                </div>
                <div>
                  <div className="font-black text-xl">Tanja Karonen</div>
                  <div className="font-bold text-xs text-foreground/60">Co-founder · Bridget · Nexpert</div>
                </div>
              </div>
              <div className="space-y-2 mt-2">
                {[
                  { Icon: Briefcase, text: "20+ years in Finnish infrastructure QA" },
                  { Icon: Network, text: "Direct relationships with national transport agency" },
                  { Icon: TrendingUp, text: "Founded & scaled rebar business €0 → €13M" },
                  { Icon: Handshake, text: "Owns customer discovery & go-to-market" },
                ].map((c) => (
                  <div key={c.text} className="flex items-start gap-2">
                    <c.Icon className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div className="font-semibold text-sm leading-snug">{c.text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 bg-foreground text-background border-2 border-foreground p-3">
                <div className="font-black uppercase text-[10px] tracking-wider text-accent-yellow mb-1">Why she leads B2B</div>
                <div className="font-semibold text-xs leading-snug">When you sell to enterprises, you sell to people. Tanja IS the network. The product is the wedge — the relationship is the deal.</div>
              </div>
            </div>
          </div>

          {/* Bridget overview */}
          <div className="space-y-3">
            <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/15 p-4">
              <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">The Wedge</div>
              <div className="font-black text-base md:text-lg">"Bridget turns Excel-based infrastructure QA into a Microsoft-native workflow system."</div>
              <div className="font-bold text-sm text-foreground/70 mt-2 italic">Keep the form. Ditch the file.</div>
            </div>
            <div className="border-4 border-foreground brutal-shadow bg-background p-4">
              <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">The B2B Playbook</div>
              <div className="space-y-2">
                {[
                  { num: 1, Icon: PhoneCall, label: "Discovery", desc: "12 customer interviews before a single line of code" },
                  { num: 2, Icon: UserCheck, label: "Validation", desc: "12 / 12 confirm the pain. Buyer = project director, not IT" },
                  { num: 3, Icon: ClipboardList, label: "Design Partners", desc: "Pre-seed: target 3 paid pilots + 2 LOIs in negotiation" },
                  { num: 4, Icon: Award, label: "Land & Expand", desc: "€5–15k pilot → €60–250k ARR org license" },
                ].map((s) => (
                  <div key={s.num} className="border-2 border-foreground bg-background p-2 flex items-center gap-2">
                    <div className="bg-accent-blue border-2 border-foreground w-7 h-7 flex items-center justify-center shrink-0">
                      <span className="font-black text-xs">{s.num}</span>
                    </div>
                    <s.Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                    <div className="min-w-0 flex-1">
                      <div className="font-black text-xs">{s.label}</div>
                      <div className="font-semibold text-[11px] text-foreground/60 leading-snug">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-4 border-foreground brutal-shadow bg-foreground text-background p-3 text-center">
              <div className="font-black text-sm md:text-base">In B2B: <span className="text-accent-yellow">distribution = conversations</span>. Volume isn't the metric — depth is.</div>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 B2B Build — Your Week 1 Discovery Plan",
    notes: "List 5 ideal customers with names. Draft a discovery interview script (8 questions, no pitching). Book 3 interviews this week. Walk out with one validated insight per call.",
    render: () => (
      <Frame bg="bg-accent-green/10">
        <Label color="bg-accent-green text-foreground">Section 4 · B2B Build · 20 min</Label>
        <Title>Your Week 1 Discovery Plan.</Title>
        <p className="mt-3 font-semibold text-base text-muted-foreground text-center">In B2B, distribution starts with <span className="font-black text-foreground">5 conversations</span> — not 5,000 impressions.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-accent-yellow border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 1 · List 5 ideal customers</div>
            </div>
            <div className="font-mono text-xs leading-relaxed bg-accent-yellow/15 border-2 border-foreground p-3">
              Real people. Real companies. Real titles.<br /><br />
              1. <span className="bg-accent-yellow/40 font-black px-1">[Name]</span> · <span className="bg-accent-yellow/40 font-black px-1">[Title]</span> @ <span className="bg-accent-yellow/40 font-black px-1">[Company]</span><br />
              2. ___ · ___ @ ___<br />
              3. ___ · ___ @ ___<br />
              4. ___ · ___ @ ___<br />
              5. ___ · ___ @ ___<br /><br />
              No "anyone who could use this." Names only.
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-accent-purple border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 2 · Draft your interview script</div>
            </div>
            <div className="font-mono text-xs leading-relaxed bg-accent-purple/15 border-2 border-foreground p-3">
              8 questions. <span className="font-black">No pitching.</span><br /><br />
              1. Walk me through your day.<br />
              2. What part frustrates you most?<br />
              3. How do you handle it today?<br />
              4. What did you try before? Why didn't it stick?<br />
              5. What would "solved" look like?<br />
              6. Who else inside lives with this pain?<br />
              7. If a solution existed, who'd sign the cheque?<br />
              8. What budget category would it sit in?
            </div>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-background p-5">
            <div className="bg-accent-blue border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 3 · Book 3 interviews this week</div>
            </div>
            <div className="space-y-2 font-semibold text-sm">
              <div className="flex items-start gap-2"><Mail className="w-4 h-4 text-accent-blue shrink-0 mt-1" strokeWidth={2.5} /><span>Cold email: short, specific, no demo ask</span></div>
              <div className="flex items-start gap-2"><Network className="w-4 h-4 text-accent-blue shrink-0 mt-1" strokeWidth={2.5} /><span>Warm intro: 1 mutual = 10x reply rate</span></div>
              <div className="flex items-start gap-2"><MessageSquare className="w-4 h-4 text-accent-blue shrink-0 mt-1" strokeWidth={2.5} /><span>LinkedIn DM: comment on their post first</span></div>
              <div className="flex items-start gap-2"><Handshake className="w-4 h-4 text-accent-blue shrink-0 mt-1" strokeWidth={2.5} /><span>Community / event: meet, then ask for 15 min</span></div>
            </div>
            <div className="mt-3 bg-foreground text-background p-2 text-center">
              <div className="font-black text-xs">Ask for 15 min — not 30. Easier yes.</div>
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-foreground text-background p-5">
            <div className="bg-accent-green text-foreground border-2 border-foreground px-3 py-2 inline-block mb-3">
              <div className="font-black uppercase text-xs tracking-wider">Step 4 · Walk out with ONE insight per call</div>
            </div>
            <ul className="space-y-2 font-semibold text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>A direct quote about the pain</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>The current ugly workaround they use</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>Who else inside has the same problem</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-1" strokeWidth={2.5} /><span>The next person they'd intro you to</span></li>
            </ul>
            <div className="mt-4 bg-accent-yellow text-foreground border-2 border-accent-yellow p-3 text-center">
              <div className="font-black text-sm">3 calls × 1 insight = your first design partner.</div>
            </div>
          </div>
        </div>
        <Quote>In B2B, you don't ship and pray. You interview and build.</Quote>
      </Frame>
    ),
  },
  {
    sectionId: 4,
    title: "S4 Scan to Revisit",
    notes: "End-of-section QR. Tell participants to scan it now if they want to revisit all of Section 4's slides on their phone. The link only opens Section 4.",
    render: () => {
      const url = "https://zero-to-one-workshop.lovable.app/section/4";
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=10&data=${encodeURIComponent(url)}`;
      return (
        <Frame bg="bg-accent-green">
          <Label color="bg-foreground text-background">Section 4 · Recap</Label>
          <Title>Scan to Revisit Section 4.</Title>
          <p className="mt-4 font-bold text-xl text-foreground/80">Point your phone camera. Read every slide from this section at your own pace.</p>
          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-background border-4 border-foreground brutal-shadow-lg p-6 shrink-0">
              <img src={qrSrc} alt="QR code to Section 4 slides" className="w-72 h-72 md:w-96 md:h-96 block" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">Link</div>
                <div className="font-mono font-bold break-all">{url}</div>
              </div>
              <div className="bg-foreground text-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-accent-green mb-2">Heads up</div>
                <div className="font-bold">This link only opens Section 4. No spoilers for what comes next.</div>
              </div>
            </div>
          </div>
        </Frame>
      );
    },
  },

  // ===== SECTION 5: Ship & Iterate (custom slides) =====
  {
    sectionId: 5,
    title: "S5 The Smartest Person",
    notes: "Jensen Huang (NVIDIA CEO): the smartest person he ever met changes their mind at the speed of light. Stubbornness is not strength. The ability to update your beliefs when new evidence arrives — that's intelligence. In startups, the people who win are the ones who adapt fastest.",
    render: () => (
      <Frame bg="bg-accent-green/15">
        <Label color="bg-accent-green text-foreground">Section 5 · Theory</Label>
        <Title>The Smartest Person I Ever Met.</Title>
        <div className="mt-8 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black text-xl md:text-2xl leading-snug">
            The smartest person I ever met changes their mind at the speed of light.
          </div>
          <div className="mt-3 font-bold text-sm text-background/60">— Jensen Huang, CEO of NVIDIA</div>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-red-50 p-5 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-red-500 mb-3">&#10005; Stubborn</div>
            <div className="font-bold text-sm">Defends their idea no matter what.</div>
            <div className="font-semibold text-xs text-foreground/60 mt-2">Ignores feedback. Married to the first version.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/20 p-5 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-accent-green mb-3">&#10003; Adaptable</div>
            <div className="font-bold text-sm">Updates their beliefs when evidence changes.</div>
            <div className="font-semibold text-xs text-foreground/60 mt-2">Listens. Pivots. Learns faster than everyone else.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow p-5 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/70 mb-3">&#9889; Speed</div>
            <div className="font-bold text-sm">The faster you change course, the faster you win.</div>
            <div className="font-semibold text-xs text-foreground/60 mt-2">Iteration speed is the only true moat.</div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-5 text-center">
          <div className="font-black text-base md:text-lg">The people who win are the ones who adapt fastest. Not the ones who are right from the start.</div>
        </div>
        <div className="mt-4 text-center">
          <a href="https://www.instagram.com/reel/DYA-pVDvUfK/" target="_blank" rel="noreferrer" className="inline-block bg-accent-green text-foreground border-2 border-foreground font-black uppercase text-xs px-4 py-2 hover:underline">
            &#9654; Watch: Jensen Huang on the smartest person
          </a>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 Ugly But Live Beats Perfect But Imaginary",
    notes: "Ship fast. Learn from real feedback. A live link is already progress. You can't iterate on something that doesn't exist.",
    render: () => (
      <Frame bg="bg-accent-yellow/15">
        <Label color="bg-accent-yellow text-foreground">Section 5 · Theory</Label>
        <Title>Ugly But Live Beats Perfect But Imaginary.</Title>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-red-50 p-6 md:p-8">
            <div className="font-black uppercase text-xs tracking-wider text-red-500 mb-2">&#10005; The Perfect Trap</div>
            <ul className="space-y-3 font-semibold">
              <li>I'll launch when it's ready</li>
              <li>I need to add one more feature</li>
              <li>Let me polish the design first</li>
              <li>I'm not ready to show anyone</li>
            </ul>
            <div className="mt-4 font-bold text-red-600 text-sm">These are all excuses. Ship now.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-green/10 p-6 md:p-8">
            <div className="font-black uppercase text-xs tracking-wider text-accent-green mb-2">&#10003; The Ship Mindset</div>
            <ul className="space-y-3 font-semibold">
              <li>Launch with 1 feature that works</li>
              <li>Get feedback from real users</li>
              <li>Improve based on what they say</li>
              <li>Iterate in public. Speed is the edge.</li>
            </ul>
            <div className="mt-4 font-bold text-accent-green text-sm">A live link is already progress.</div>
          </div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 The 7-Day Action Plan",
    notes: "Day by day: show to 1 person, improve 1 thing, take 1 action, run 5 interviews, set up landing page, share on LinkedIn, join the community.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 5 · Theory</Label>
        <Title>The 7-Day Action Plan.</Title>
        <div className="mt-8 space-y-3">
          {[
            { day: "Day 1", action: "Show your prototype to 1 person tomorrow", color: "bg-accent-yellow" },
            { day: "Day 2", action: "Improve 1 thing based on their feedback", color: "bg-accent-purple" },
            { day: "Day 3", action: "Take 1 action in the next 48 hours", color: "bg-accent-blue" },
            { day: "Day 4", action: "Run 5 customer interviews this week", color: "bg-accent-green" },
            { day: "Day 5", action: "Set up a landing page with email capture", color: "bg-primary text-background" },
            { day: "Day 6", action: "Share what you built on LinkedIn", color: "bg-accent-yellow" },
            { day: "Day 7", action: "Join entrepreneurship communities", color: "bg-accent-purple" },
          ].map((item, i) => (
            <div key={i} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-stretch">
              <div className={`${item.color} border-r-4 border-foreground flex items-center justify-center w-20 md:w-28 flex-shrink-0`}>
                <span className="font-black text-sm md:text-base">{item.day}</span>
              </div>
              <div className="p-4 md:p-5 flex-1">
                <div className="font-bold text-lg md:text-xl">{item.action}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-6 text-center">
          <div className="font-black text-lg md:text-xl">You can't iterate on something that doesn't exist.</div>
          <div className="font-semibold text-sm text-background/70 mt-1">Ship it. Improve it. Repeat.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 VC vs Bootstrapping",
    notes: "Two paths to build a company. VC means raise money, grow fast, give up equity. Bootstrapping means own it all, grow on revenue, move at your pace. Most iconic bootstrapped companies never took a dollar of VC funding.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 5 · Theory</Label>
        <Title>VC vs Bootstrapping.</Title>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-accent-blue/10 p-5">
            <div className="font-black uppercase text-xs tracking-wider text-accent-blue mb-3">Venture Capital</div>
            <div className="space-y-2">
              <div className="font-semibold text-sm">&#x1F4B0; Raise money from investors</div>
              <div className="font-semibold text-sm">&#x1F680; Grow fast, dominate market</div>
              <div className="font-semibold text-sm">&#x2702; Give up equity &amp; control</div>
              <div className="font-semibold text-sm">&#x23F1;&#xFE0F; Pressure to scale quickly</div>
            </div>
            <div className="mt-3 font-bold text-xs text-accent-blue">Best for: winner-takes-all markets</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow-lg bg-accent-green/10 p-5">
            <div className="font-black uppercase text-xs tracking-wider text-accent-green mb-3">Bootstrapping</div>
            <div className="space-y-2">
              <div className="font-semibold text-sm">&#x1F4B5; Fund it from revenue</div>
              <div className="font-semibold text-sm">&#x1F3AF; Grow at your own pace</div>
              <div className="font-semibold text-sm">&#x1F512; Own 100% of the company</div>
              <div className="font-semibold text-sm">&#x1F9D1; Profit from day one if possible</div>
            </div>
            <div className="mt-3 font-bold text-xs text-accent-green">Best for: sustainable, profitable businesses</div>
          </div>
        </div>
        <div className="mt-6 border-4 border-foreground brutal-shadow bg-foreground text-background p-4">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">Most Successful Bootstrapped Companies</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Mailchimp", val: "$12B", desc: "Email marketing" },
              { name: "GitHub", val: "$7.5B", desc: "Before any VC" },
              { name: "Lemlist", val: "$50M+", desc: "Cold outreach platform" },
              { name: "Spanx", val: "$1B+", desc: "Sara Blakely, $5K start" },
            ].map((c) => (
              <div key={c.name} className="bg-background text-foreground border-2 border-foreground p-3 text-center">
                <div className="font-black text-sm">{c.name}</div>
                <div className="font-black text-lg text-accent-yellow">{c.val}</div>
                <div className="font-semibold text-xs text-foreground/60">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 font-black text-lg md:text-xl text-center">You don&#39;t need permission to start. You need a customer.</div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 The Investable Team",
    notes: "Investors invest in teams first, everything else second. Before you look for a co-founder, write the job description. Define ownership and responsibilities from day one. Ambiguity kills startups faster than competition.",
    render: () => (
      <Frame bg="bg-accent-blue/10">
        <Label color="bg-accent-blue text-foreground">Section 5 · Theory</Label>
        <Title>The Investable Team.</Title>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6">
          <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">What Investors Actually Care About — In Order</div>
          <div className="flex items-stretch gap-2">
            {[
              { rank: 1, label: "Team", pct: "40%", color: "bg-accent-yellow text-foreground" },
              { rank: 2, label: "Problem Size", pct: "25%", color: "bg-accent-purple text-foreground" },
              { rank: 3, label: "Traction", pct: "20%", color: "bg-accent-blue text-foreground" },
              { rank: 4, label: "Growth", pct: "15%", color: "bg-accent-green text-foreground" },
            ].map((item) => (
              <div key={item.rank} className={item.color + " border-2 border-foreground p-3 text-center flex-1"}>
                <div className="font-black text-2xl">{item.rank}</div>
                <div className="font-black text-xs uppercase">{item.label}</div>
                <div className="font-bold text-xs">{item.pct}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-[hsl(0,0%,98%)] p-5">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-3">How to Find a Team Member</div>
            <div className="space-y-2">
              {[
                "Look in communities you already trust",
                "Post what you&#39;re building — attract, don&#39;t recruit",
                "Do a small project together first — test the fit",
                "Shared values &gt; shared skills",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="bg-accent-blue text-foreground w-5 h-5 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">{i + 1}</div>
                  <div className="font-semibold text-sm">{tip}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-[hsl(0,0%,98%)] p-5">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-3">Set Ownership From Day One</div>
            <div className="space-y-2">
              {[
                "Write a job description — even for co-founders",
                "Define who owns what decisions",
                "Agree on equity split early — in writing",
                "Revisit roles every 3 months as you grow",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="bg-accent-yellow text-foreground w-5 h-5 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">{i + 1}</div>
                  <div className="font-semibold text-sm">{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-5 text-center">
          <div className="font-black text-base md:text-lg">Ambiguity kills startups faster than competition.</div>
          <div className="font-semibold text-xs text-background/60 mt-1">Write it down. Agree on it. Revisit it.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 Think Faster, Talk Smarter",
    notes: "Matt Abrahams from Stanford GSB. When you pitch, structure beats talent. Use the What-So What-Now What framework. Watch the full talk for deeper technique.",
    render: () => (
      <Frame bg="bg-accent-purple/15">
        <Label color="bg-accent-purple text-foreground">Section 5 · Theory</Label>
        <Title>Think Faster, Talk Smarter.</Title>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow-lg p-6">
          <div className="font-black text-xl md:text-2xl leading-snug">
            Spontaneous speaking is more common than planned speaking. The key is structure — not perfection.
          </div>
          <div className="mt-3 font-bold text-sm text-background/60">— Matt Abrahams, Stanford GSB</div>
        </div>
        <div className="mt-6">
          <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/pitch-framework.png" alt="Think Faster Talk Smarter framework" className="w-full border-4 border-foreground brutal-shadow" />
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="border-4 border-foreground brutal-shadow bg-accent-yellow/20 p-4 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">What</div>
            <div className="font-black text-lg">What happened?</div>
            <div className="font-semibold text-sm text-foreground/70 mt-1">State the fact or situation.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-purple/20 p-4 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">So What</div>
            <div className="font-black text-lg">Why does it matter?</div>
            <div className="font-semibold text-sm text-foreground/70 mt-1">Connect to the audience&#39;s need.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow bg-accent-blue/20 p-4 text-center">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">Now What</div>
            <div className="font-black text-lg">What&#39;s next?</div>
            <div className="font-semibold text-sm text-foreground/70 mt-1">Call to action. One clear next step.</div>
          </div>
        </div>
        <div className="mt-4 bg-foreground text-background border-4 border-foreground brutal-shadow p-4 text-center">
          <a href="https://www.youtube.com/watch?v=x6TsR3y5Qfg" target="_blank" rel="noreferrer" className="font-black text-base md:text-lg hover:underline">
            &#x25B6; Watch: Think Faster, Talk Smarter — Matt Abrahams
          </a>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 Read This",
    notes: "Sara Blakely started Spanx with $5,000 and no business experience. She bootstrapped it to a billion-dollar empire. Plus Y Combinator's free library — the best startup knowledge in the world, completely free.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 5 · Further Reading</Label>
        <Title>Read This.</Title>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border-4 border-foreground brutal-shadow-lg bg-background flex flex-col">
            <div className="bg-accent-green border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Sara Blakely</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1">
              <img src="https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/spanx.jpg" alt="The Spanx Story book cover" className="w-32 h-48 object-cover border-2 border-foreground mb-3" />
              <div className="font-black text-base text-center">The Spanx Story</div>
              <div className="font-semibold text-xs text-foreground/70 text-center mt-1">$5,000 savings. No business degree. No investors. A billion-dollar empire built from scratch.</div>
            </div>
          </div>
          <a href="https://www.ycombinator.com/library" target="_blank" rel="noreferrer" className="border-4 border-foreground brutal-shadow-lg bg-foreground text-background hover:bg-foreground/90 transition-colors flex flex-col">
            <div className="bg-accent-orange border-b-4 border-foreground p-3 text-center">
              <div className="font-black uppercase text-sm">Free Resource</div>
            </div>
            <div className="p-4 flex flex-col items-center flex-1 justify-center">
              <div className="font-black text-4xl mb-3">YC</div>
              <div className="font-black text-base text-center">Y Combinator Startup Library</div>
              <div className="font-semibold text-xs text-background/70 text-center mt-1">The best startup knowledge in the world — completely free. Essays, videos, and guides from the company that backed Airbnb, Stripe, and Reddit.</div>
              <div className="mt-4 bg-accent-orange text-foreground border-2 border-foreground font-black uppercase text-xs px-4 py-2">ycombinator.com/library</div>
            </div>
          </a>
        </div>
        <div className="mt-6 bg-foreground text-background border-4 border-foreground brutal-shadow p-5 text-center">
          <div className="font-black text-base md:text-lg">You don&#39;t need funding. You need grit, resourcefulness, and a problem worth solving.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 Watch These",
    notes: "Five movies and one series every founder should watch. Air — how Nike signed Jordan. The Social Network — Facebook's founding. The Founder — Ray Kroc and McDonald's. BlackBerry — rise and fall. Silicon Valley — the startup world, hilariously accurate.",
    render: () => (
      <Frame bg="bg-foreground text-background">
        <Label color="bg-foreground text-background">Section 5 · Further Watching</Label>
        <Title>Watch These.</Title>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { title: "Air", year: "2023", desc: "How Nike signed Jordan. Business Development and Partnership.", img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/air.jpeg", color: "bg-accent-yellow" },
            { title: "The Social Network", year: "2010", desc: "Facebook. Execution vs Idea.", img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/social-network.jpg", color: "bg-accent-blue" },
            { title: "The Founder", year: "2016", desc: "Ray Kroc built McDonald's. Not the McDonalds. Entrepreneurial vs Business Owner.", img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/founder.jpeg", color: "bg-accent-green" },
            { title: "BlackBerry", year: "2023", desc: "54% market share to zero. The market shift.", img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/blackberry.jpeg", color: "bg-accent-purple" },
            { title: "Silicon Valley", year: "2014–19", desc: "The startup world. Hilariously accurate.", img: "https://d2mp3ttz3u5gci.cloudfront.net/workshop-vibe-coding/silicon-valley.jpg", color: "bg-primary text-background" },
          ].map((movie) => (
            <div key={movie.title} className="border-4 border-foreground brutal-shadow bg-background text-foreground flex flex-col">
              <div className={movie.color + " border-b-4 border-foreground p-2 text-center"}>
                <div className="font-black uppercase text-xs">{movie.year}</div>
              </div>
              <div className="p-2 flex flex-col items-center flex-1">
                <img src={movie.img} alt={movie.title + " poster"} className="w-full h-32 md:h-40 object-cover border-2 border-foreground mb-2" />
                <div className="font-black text-sm text-center">{movie.title}</div>
                <div className="font-semibold text-xs text-foreground/60 text-center mt-1">{movie.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-accent-yellow text-foreground border-4 border-foreground brutal-shadow p-5 text-center">
          <div className="font-black text-base md:text-lg">You&#39;ll learn more about startups from these than most MBA programs.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 The Artist vs The Performer",
    notes: "The closing philosophy. Artist = indie painter, singer in a café — shows up because they cannot NOT create. Beyoncé/Taylor Swift started as artists but are now performers with 100s of team members. The art was in the early phase. Startup journey = artist's journey. Don't do it for the exit.",
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <Label color="bg-foreground text-background">Section 5 · Theory</Label>
        <Title>The Artist vs. The Performer.</Title>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <div className="border-4 border-foreground brutal-shadow-lg bg-accent-purple/10 p-6 flex flex-col gap-3">
            <div className="font-black uppercase text-xs tracking-wider text-accent-purple">The Performer</div>
            <div className="font-black text-2xl">Beyoncé. Taylor Swift.</div>
            <div className="font-semibold text-sm text-foreground/70 leading-relaxed">
              Today: hundreds of people managing their brand, image, diet, content. That's a corporation with a face. The art was the early phase — a girl in her bedroom writing songs. A young woman playing small venues for 200 people.
            </div>
            <div className="font-black text-base text-accent-purple mt-auto">That phase was pure. That was art.</div>
          </div>
          <div className="border-4 border-foreground brutal-shadow-lg bg-foreground text-background p-6 flex flex-col gap-3">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow">The Artist</div>
            <div className="font-black text-2xl text-accent-yellow">The indie painter. The café singer.</div>
            <div className="font-semibold text-sm text-background/70 leading-relaxed">
              Shows up to the studio every morning because they <span className="text-background font-black">cannot NOT create.</span> Playing to 40 people and feeling completely alive. No guarantee of fame. No exit plan.
            </div>
            <div className="font-black text-base text-accent-yellow mt-auto">The art is in the doing. Not the outcome.</div>
          </div>
        </div>
        <div className="mt-5 bg-accent-yellow border-4 border-foreground brutal-shadow-lg p-5 text-center">
          <div className="font-black text-xl md:text-2xl">Nobody here is guaranteed a unicorn.</div>
          <div className="font-semibold text-base mt-2 text-foreground/80">But the journey — if you build from obsession, vision, and taste — is worth it regardless of the exit.</div>
          <div className="font-black text-lg md:text-xl mt-3">Do it because you cannot NOT do it.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 Vinay Hiremath — $975M and Lost",
    notes: "Vinay Hiremath, co-founder and CTO of Loom. Sold to Atlassian for $975M in 2023. Wrote a blog post: 'I am rich and have no idea what to do with my life.' Turned down $60M retention. Ended a 2-year relationship. Tried to climb the Himalayas with no training. One-way ticket to Hawaii to study physics. The money didn't replace the identity the building gave him.",
    render: () => (
      <Frame bg="bg-foreground text-background">
        <Label color="bg-accent-yellow text-foreground">Section 5 · Theory</Label>
        <Title>Vinay Hiremath. $975M. Lost.</Title>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-4">
            <div className="border-4 border-background/20 p-5 flex flex-col gap-2">
              <div className="font-black uppercase text-xs tracking-wider text-accent-yellow">The Facts</div>
              <div className="font-semibold text-sm text-background/80 leading-relaxed space-y-2">
                <p>Co-founded Loom. Spent nearly <span className="font-black text-background">a decade</span> building it.</p>
                <p>Sold to Atlassian in 2023 for <span className="font-black text-accent-yellow">$975 million.</span></p>
                <p>Turned down <span className="font-black text-background">$60M</span> in retention pay.</p>
                <p>Ended a two-year relationship. Tried to summit the Himalayas with no training. Booked a one-way ticket to Hawaii to study physics.</p>
              </div>
            </div>
            <div className="bg-accent-yellow border-4 border-accent-yellow p-5">
              <div className="font-black text-foreground text-lg leading-snug">"Life has been a haze. Everything feels like a side quest — but not in an inspiring way."</div>
              <div className="font-bold text-xs text-foreground/60 mt-2">— Vinay Hiremath, blog post title: "I am rich and have no idea what to do with my life"</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-4 border-background/20 p-5 flex-1">
              <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-3">What Actually Happened</div>
              <div className="font-semibold text-sm text-background/80 leading-relaxed space-y-3">
                <p>The building gave him his identity. The obsession, the urgency, the sense of being needed — it all vanished overnight when the deal closed.</p>
                <p>The money couldn't replace it. <span className="font-black text-background">$975 million couldn't replace it.</span></p>
                <p>He wrote: <span className="italic text-background">"I needed to do something. Anything. To be alive again."</span></p>
              </div>
            </div>
            <div className="bg-background border-4 border-background p-5 text-center">
              <div className="font-black text-foreground text-2xl">To be alive again.</div>
              <div className="font-semibold text-foreground/60 text-sm mt-2">He had $975M in the bank.</div>
              <div className="font-black text-foreground text-base mt-1">And he needed to feel alive again.</div>
            </div>
          </div>
        </div>
        <div className="mt-4 border-4 border-background/20 p-4 text-center">
          <div className="font-black text-background text-lg">If you build for the exit — you will feel the void.</div>
          <div className="font-black text-accent-yellow text-lg mt-1">If you build because it's who you are — the journey is the success.</div>
        </div>
      </Frame>
    ),
  },
  {
    sectionId: 5,
    title: "S5 Scan to Revisit",
    notes: "End-of-section QR. Tell participants to scan it now if they want to revisit all of Section 5's slides on their phone. The link only opens Section 5.",
    render: () => {
      const url = "https://zero-to-one-workshop.lovable.app/section/5";
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=10&data=${encodeURIComponent(url)}`;
      return (
        <Frame bg="bg-accent-yellow">
          <Label color="bg-foreground text-background">Section 5 · Recap</Label>
          <Title>Scan to Revisit Section 5.</Title>
          <p className="mt-4 font-bold text-xl text-foreground/80">Point your phone camera. Read every slide from this section at your own pace.</p>
          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-background border-4 border-foreground brutal-shadow-lg p-6 shrink-0">
              <img src={qrSrc} alt="QR code to Section 5 slides" className="w-72 h-72 md:w-96 md:h-96 block" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-2">Link</div>
                <div className="font-mono font-bold break-all">{url}</div>
              </div>
              <div className="bg-foreground text-background border-4 border-foreground brutal-shadow p-5">
                <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-2">Heads up</div>
                <div className="font-bold">This link only opens Section 5. No spoilers for what comes next.</div>
              </div>
            </div>
          </div>
        </Frame>
      );
    },
  },

  ...generateGenericSlides(),

  // ===== PITCH =====
  {
    sectionId: 0,
    title: "Pitch",
    notes: "Optional. Whoever wants to represent what they've done — come to the stage. 2 minutes each. Tell the story: what problem, what you built, who it's for, what's next.",
    render: () => (
      <Frame bg="bg-accent-purple/30">
        <Label color="bg-accent-purple text-foreground">Optional</Label>
        <Title>Pitch What You Built.</Title>
        <p className="mt-4 font-bold text-xl">2 minutes each. Come to the stage. Tell the story.</p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["What problem you chose", "What you built", "Who it's for", "What you'll test next"].map((q, i) => (
            <div key={q} className="border-4 border-foreground brutal-shadow-sm bg-background flex items-center gap-4 p-4">
              <StepNum n={i + 1} color={accentColors[i]} />
              <div className="font-black text-lg">{q}</div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  // ===== CLOSING =====
  {
    sectionId: 0,
    title: "Closing",
    notes: "You don't need permission to start. You need a clear problem, the willingness to build imperfectly, and the discipline to validate before you scale. Go build.",
    render: () => (
      <Frame bg="bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <Label color="bg-foreground text-background">The End — The Beginning</Label>
        <h2 className="font-black uppercase text-5xl md:text-8xl leading-[0.9] text-background tracking-tight">
          You Don't Need<br />Permission<br />To Start.
        </h2>
        <div className="mt-10 bg-background border-4 border-foreground brutal-shadow-lg p-6 md:p-8">
          <div className="font-black text-lg md:text-2xl leading-snug">
            "The people who win in this next era will not be the people who consume the most AI content. They will be the people who can spot a real problem, communicate clearly, and turn ideas into motion fast."
          </div>
        </div>
        <div className="mt-10 text-center font-black uppercase text-3xl md:text-5xl text-background">Thank You — Now Go Build.</div>
      </Frame>
    ),
  },
];

// Helper: get slides for a specific section
export function getSectionSlides(sectionId: number): Slide[] {
  return allSlides.filter((s) => s.sectionId === sectionId);
}

// Full deck for the /presentation route
export const slides = allSlides;