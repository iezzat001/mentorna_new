import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Star,
  Presentation,
  GraduationCap,
  Handshake,
  Linkedin,
  Instagram,
  TrendingUp,
  Users,
  Wallet,
  Rocket,
  Target,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Data — Services & Pricing
// ─────────────────────────────────────────────────────────────
const services = [
  {
    icon: Presentation,
    name: 'Vibe Coding 0→1 Workshop',
    tagline: 'From idea to prototype in 4.5 hours',
    description:
      'Hands-on, beginner-friendly workshop where participants spot real problems, shape an offer, and build a working prototype or landing page with vibe-coding tools — no coding background required.',
    price: '€89 / seat',
    format: '4.5 hours · In-person (Helsinki XR Center)',
    audience: 'Students, recent graduates, career switchers',
    deliverable: 'Working prototype + landing page',
    highlight: false,
  },
  {
    icon: GraduationCap,
    name: 'Solopreneur Launchpad',
    tagline: '3-month 1:1 mentorship — idea → MVP → first customers',
    description:
      'Intensive 12-week program with 24 sessions of direct coaching. Validate, build, and launch. Includes async support, frameworks, templates, and done-with-you deliverables. 100% money-back guarantee if no launched MVP by end of Month 3.',
    price: '49,500 EGP (~$1,000 USD)',
    format: '12 weeks · 2× sessions/week (1.5h each) · 24 total',
    audience: 'Founders with an idea, no team required',
    deliverable: 'Launched MVP + clear offer + first customers',
    highlight: true,
  },
  {
    icon: Handshake,
    name: 'VC Fundraising Mentorship',
    tagline: 'Strategic 1:1 coaching for founders raising capital',
    description:
      'Targeted coaching for founders preparing to raise. Pitch refinement, investor narrative, data room preparation, and fundraising strategy.',
    price: '€2,000 EUR',
    format: '1:1 · Custom schedule',
    audience: 'Founders actively fundraising',
    deliverable: 'Investor-ready pitch + data room + strategy',
    highlight: false,
  },
];

// ─────────────────────────────────────────────────────────────
// Data — Workshop Feedback
// ─────────────────────────────────────────────────────────────
const workshopFeedback = [
  {
    name: 'Matti Tuominen',
    role: '40-year workshop veteran',
    quote:
      'This was perhaps the most interesting workshop I have ever attended during the last 40 years.',
    source: 'Luma Review',
  },
  {
    name: 'Bambi Dang',
    role: 'Founder @ FunFox, AI Collective',
    quote:
      "Ahmed Ezzat dropped the best workshop on building startups! Hands down! A 4-hour workshop felt so short when there's so much juice.",
    source: 'LinkedIn',
  },
  {
    name: 'Loan Cindy Tran',
    role: 'B2B Market Entry Specialist',
    quote:
      "I walked away with a live landing page ready to capture waitlist sign-ups. Getting that level of clarity and technical output in a single evening is invaluable.",
    source: 'LinkedIn',
  },
  {
    name: 'Rudransh Khurana',
    role: 'Pre-DP Student, SYK IB',
    quote:
      "Truly one of the most helpful and educational sessions I've ever attended. Most workshops are all theory with little action — this was the opposite.",
    source: 'Instagram DM',
  },
  {
    name: 'Sneh Patel',
    role: 'Pre-IB Student · Team Unprompted',
    quote:
      '5 high schoolers, no startup experience, one raw idea — turned into a real startup in a single evening using AI tools and vibe coding.',
    source: 'LinkedIn',
  },
  {
    name: 'Lily',
    role: 'Workshop Participant',
    quote:
      'Thank you so much for the amazing vibe coding session — I loved every minute of it!',
    source: 'Direct Message',
  },
];

const workshopStats = [
  { value: '20+', label: 'Participants' },
  { value: '4.5h', label: 'Hands-On' },
  { value: '5/5', label: 'Avg Rating' },
  { value: '0→1', label: 'Idea to MVP' },
];

// Workshop media (hosted on S3, reused from the public /testimonials page)
const WORKSHOP_MEDIA_BASE =
  'https://mentorna-testimonials.s3.amazonaws.com/workshop-helsinki';
const workshopVideo = `${WORKSHOP_MEDIA_BASE}/video-testimonial.MP4`;
const workshopPhotos = [
  { src: `${WORKSHOP_MEDIA_BASE}/20260604_174214.JPEG`, alt: 'Participants at Helsinki XR Center' },
  { src: `${WORKSHOP_MEDIA_BASE}/20260604_185329.JPEG`, alt: 'Building prototypes' },
  { src: `${WORKSHOP_MEDIA_BASE}/2c5265ca-bdcc-44f4-99e9-a33a8cc8c9b9.JPG`, alt: 'Team Unprompted presenting' },
  { src: `${WORKSHOP_MEDIA_BASE}/IMG_9557.jpg`, alt: 'Workshop moment' },
  { src: `${WORKSHOP_MEDIA_BASE}/IMG_9530.jpg`, alt: 'Written participant feedback' },
  { src: `${WORKSHOP_MEDIA_BASE}/IMG_9531.jpg`, alt: 'Written participant feedback' },
];

// ─────────────────────────────────────────────────────────────
// Data — Marketing & Reach
// ─────────────────────────────────────────────────────────────
const marketingChannels = [
  {
    icon: Linkedin,
    platform: 'LinkedIn',
    handle: 'in/ahmedezzat001',
    url: 'https://www.linkedin.com/in/ahmedezzat001',
    followers: '1K+',
    connections: '500+',
    notes: 'Workshop announcements, founder journey posts, AI education content',
  },
  {
    icon: Instagram,
    platform: 'Instagram',
    handle: '@ahmed.ezzat.ai',
    url: 'https://www.instagram.com/ahmed.ezzat.ai',
    followers: '7,908',
    posts: '69',
    notes: 'Reels, educational content, workshop highlights',
  },
];

// ─────────────────────────────────────────────────────────────
// Data — Traction & Momentum
// ─────────────────────────────────────────────────────────────
const tractionStats = [
  { value: '7,908', label: 'Instagram Followers', sub: '@ahmed.ezzat.ai · organic' },
  { value: '147K', label: 'Top Reel Views', sub: 'Instagram · last 90 days' },
  { value: '120K', label: '2nd Reel Views', sub: 'Instagram · last 90 days' },
  { value: '20+', label: 'Workshop Seats Sold', sub: '5/5 rating, repeat demand' },
];

const funnel = [
  { icon: TrendingUp, stage: 'Reach', value: 'Up to 147K / reel', note: 'Top reels (90d): 147K · 120K · 66K views' },
  { icon: Users, stage: 'Followers', value: '7,908 & growing', note: 'Founders, builders & career-switchers' },
  { icon: Target, stage: 'Leads', value: 'DM → discovery call', note: 'Warm inbound self-identifying as buyers' },
  { icon: Rocket, stage: 'Customers', value: '€89 → €2,000', note: 'Workshop entry → high-ticket mentorship' },
];

// Latest 9 posts — pulled live from the IG professional dashboard (last 90 days)
const latestPosts = [
  { topic: 'Uber = your startup’s growth lesson', views: '1,200', reach: '1,000', eng: '60' },
  { topic: 'Build a startup in 30 days', views: '1,600', reach: '1,300', eng: '115' },
  { topic: 'Workshop teaser — “form in bio”', views: '271', reach: '211', eng: '6' },
  { topic: 'How entrepreneurs think + roadmap', views: '283', reach: '237', eng: '4' },
  { topic: 'Spent $10K on an app, got no users', views: '348', reach: '281', eng: '5' },
  { topic: 'Founder story reply', views: '505', reach: '454', eng: '18' },
  { topic: 'Your startup’s staff', views: '1,500', reach: '1,200', eng: '103' },
  { topic: 'Zoom online meetings', views: '1,600', reach: '1,400', eng: '78' },
  { topic: '“Dam Fah” — start with one', views: '5,573', reach: '4,307', eng: '429' },
];

// ─────────────────────────────────────────────────────────────
// Data — Business Model & Year-1 Projection (modeled)
// ─────────────────────────────────────────────────────────────
const revenueStreams = [
  { name: 'Vibe Coding Workshop', price: '€89 / seat', volume: '18 runs × ~20 seats', year1: '€32,040' },
  { name: 'Solopreneur Launchpad', price: '~€1,000', volume: '12 clients', year1: '€12,000' },
  { name: 'VC Fundraising Mentorship', price: '€2,000', volume: '6 clients', year1: '€12,000' },
];
const year1Total = '€56,040';

// ─────────────────────────────────────────────────────────────
// Data — Growth: US & Global Expansion
// ─────────────────────────────────────────────────────────────
const expansionPoints = [
  {
    icon: Handshake,
    title: 'National Affiliate',
    text: 'Launch Invention Convention Finland as the country’s official AI-focused affiliate — a partnership already in active discussion with Nick Briere (Invention Academy, US).',
  },
  {
    icon: Wallet,
    title: '85 / 15 Economics',
    text: '85% of program revenue to Mentorna as the implementing partner, 15% to Invention Academy — a founder-friendly split already on the table.',
  },
  {
    icon: TrendingUp,
    title: 'Global Competition Pipeline',
    text: 'Finnish students feed into the international championship alongside peers from the US, India, Ukraine & Singapore — instant reach and credibility.',
  },
  {
    icon: Rocket,
    title: 'Scalable to Thousands',
    text: 'A proven playbook (already running in Nigeria, India, Ukraine) applied to Finland — a path from one workshop to thousands of students across the Nordics.',
  },
];

// ─────────────────────────────────────────────────────────────
// Data — The Ask
// ─────────────────────────────────────────────────────────────
const useOfFunds = [
  { icon: Instagram, label: 'Content & IG Growth', pct: '35%', amount: '€14,000', note: 'Editing, paid boosts, gear — scale the reach engine' },
  { icon: Rocket, label: 'Product & Funnel', pct: '25%', amount: '€10,000', note: 'Booking flow, site, automation, CRM' },
  { icon: Presentation, label: 'Workshop Operations', pct: '20%', amount: '€8,000', note: 'Venues, materials, expansion to new cities' },
  { icon: Wallet, label: 'Founder Runway', pct: '20%', amount: '€8,000', note: 'Focused full-time execution for 12 months' },
];

const investorGets = [
  '20–30% equity in the content + workshop venture at an early, founder-friendly valuation',
  'A live acquisition engine already generating inbound leads — not a pre-revenue idea',
  'A founder who ships weekly content and runs sold-out, 5/5-rated workshops',
  'A US partnership pathway (Invention Convention) that opens international scale',
  'Low burn, capital-efficient model with a clear path to profitability in Year 1',
];

// ─────────────────────────────────────────────────────────────
// Slide primitives (neubrutalist, matching the workshop deck)
// ─────────────────────────────────────────────────────────────
type Slide = { title: string; render: () => ReactNode };

const Frame = ({ children, bg = 'bg-background' }: { children: ReactNode; bg?: string }) => (
  <div className={`min-h-screen w-full ${bg} flex items-center justify-center px-4 md:px-10 py-16`}>
    <div className="max-w-6xl mx-auto w-full">{children}</div>
  </div>
);

const SlideLabel = ({ children, color = 'bg-foreground text-background' }: { children: ReactNode; color?: string }) => (
  <div className={`inline-block ${color} font-black uppercase text-xs px-3 py-1 mb-4 tracking-wider border-2 border-foreground`}>
    {children}
  </div>
);

const SlideTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="font-heading font-black uppercase text-3xl md:text-5xl leading-[0.95] tracking-tight">{children}</h2>
);

const brutal = 'border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
const brutalSm = 'border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';

// ─────────────────────────────────────────────────────────────
// Slides
// ─────────────────────────────────────────────────────────────
const slides: Slide[] = [
  // 0 — Cover
  {
    title: 'Investor Data Room',
    render: () => (
      <Frame bg="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70">
        <SlideLabel>Mentorna Oy · Confidential</SlideLabel>
        <h1 className="font-heading font-black uppercase text-5xl md:text-8xl leading-[0.9] tracking-tight">
          Investor<br />Data Room
        </h1>
        <p className="mt-6 text-xl md:text-3xl font-bold max-w-3xl">
          A content-led workshop &amp; mentorship engine for the next generation of founders.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-3xl">
          {[
            { v: '€40K', l: 'Raising' },
            { v: '20–30%', l: 'Equity' },
            { v: '7,908', l: 'IG Followers' },
          ].map((s) => (
            <div key={s.l} className={`bg-background ${brutal} p-4`}>
              <div className="font-heading text-2xl md:text-3xl font-black">{s.v}</div>
              <div className="text-xs md:text-sm font-bold text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  // 1 — Services & Pricing
  {
    title: 'Services & Pricing',
    render: () => (
      <Frame>
        <SlideLabel>01 · Offer</SlideLabel>
        <SlideTitle>Services &amp; Pricing</SlideTitle>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Card key={service.name} className={`${brutal} ${service.highlight ? 'bg-accent-yellow' : 'bg-background'}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="border-2 border-foreground p-2 bg-background">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-heading text-base font-black uppercase leading-tight">
                      {service.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">{service.tagline}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium leading-relaxed">{service.description}</p>
                <div className="space-y-1.5 pt-2 border-t-2 border-foreground/20">
                  {[
                    ['Price', service.price],
                    ['Format', service.format],
                    ['Audience', service.audience],
                    ['Outcome', service.deliverable],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm gap-3">
                      <span className="font-bold uppercase text-muted-foreground shrink-0">{k}</span>
                      <span className="font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Frame>
    ),
  },

  // 2 — Workshop Proof (stats + video + photos)
  {
    title: 'Workshop Proof',
    render: () => (
      <Frame>
        <SlideLabel color="bg-accent-purple text-foreground">02 · Proof</SlideLabel>
        <SlideTitle>The Workshop Works</SlideTitle>
        <p className="mt-4 text-sm md:text-lg font-medium text-muted-foreground max-w-3xl">
          The first Vibe Coding 0→1 Workshop ran at Helsinki XR Center on June 4, 2026, co-organised
          with The AI Collective Finland. Every attendee rated it 5/5 — this is the proof and the
          community the whole business is built on.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {workshopStats.map((stat) => (
            <div key={stat.label} className={`bg-accent-yellow ${brutalSm} p-4 text-center`}>
              <div className="font-heading text-3xl font-black">{stat.value}</div>
              <div className="text-sm font-semibold text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={`${brutal} overflow-hidden bg-foreground`}>
            <video
              controls
              preload="metadata"
              poster={`${WORKSHOP_MEDIA_BASE}/20260604_182905.JPEG`}
              className="w-full h-full object-cover aspect-video"
            >
              <source src={workshopVideo} type="video/mp4" />
            </video>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {workshopPhotos.map((photo) => (
              <div key={photo.src} className="border-2 border-foreground overflow-hidden aspect-square">
                <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },

  // 3 — Testimonials
  {
    title: 'What People Say',
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <SlideLabel color="bg-accent-purple text-foreground">02 · Feedback</SlideLabel>
        <SlideTitle>What People Say</SlideTitle>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {workshopFeedback.map((t) => (
            <Card key={t.name} className={`${brutal} bg-background`}>
              <CardContent className="pt-5">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-yellow text-foreground" />
                  ))}
                </div>
                <blockquote className="text-sm font-semibold leading-relaxed mb-4">"{t.quote}"</blockquote>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-heading font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <Badge className="bg-foreground text-white text-xs font-bold uppercase shrink-0">{t.source}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className={`bg-foreground text-background ${brutalSm} font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
          >
            <a href="/testimonials" target="_blank" rel="noopener noreferrer">
              View All Feedback &amp; Photos
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
            6 testimonials · video testimonial · 17 event photos
          </span>
        </div>
      </Frame>
    ),
  },

  // 4 — Marketing & Reach
  {
    title: 'Marketing & Reach',
    render: () => (
      <Frame>
        <SlideLabel color="bg-accent-blue text-foreground">03 · Distribution</SlideLabel>
        <SlideTitle>Marketing &amp; Reach</SlideTitle>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {marketingChannels.map((channel) => (
            <Card key={channel.platform} className={`${brutal} bg-background`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-foreground p-2">
                      <channel.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="font-heading text-lg font-black uppercase">{channel.platform}</CardTitle>
                      <p className="text-sm text-muted-foreground font-semibold">{channel.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-2xl font-black">{channel.followers}</div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase">Followers</div>
                    {'connections' in channel && channel.connections && (
                      <div className="text-xs font-semibold text-muted-foreground mt-1">{channel.connections} connections</div>
                    )}
                    {'posts' in channel && channel.posts && (
                      <div className="text-xs font-semibold text-muted-foreground mt-1">{channel.posts} posts</div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-3">{channel.notes}</p>
                <Button asChild variant="outline" className="border-2 border-foreground font-bold text-sm uppercase">
                  <a href={channel.url} target="_blank" rel="noopener noreferrer">
                    Visit Profile
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Frame>
    ),
  },

  // 5 — Traction & Momentum
  {
    title: 'Traction & Momentum',
    render: () => (
      <Frame>
        <SlideLabel color="bg-accent-green text-foreground">04 · Traction</SlideLabel>
        <SlideTitle>Traction &amp; Momentum</SlideTitle>
        <p className="mt-4 text-sm md:text-lg font-medium text-muted-foreground max-w-3xl">
          Sales are driven by a content engine that already works — reels turn cold reach into warm,
          self-qualified buyers who climb the value ladder.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {tractionStats.map((stat) => (
            <div key={stat.label} className={`bg-accent-yellow ${brutalSm} p-4`}>
              <div className="font-heading text-3xl font-black">{stat.value}</div>
              <div className="text-sm font-bold text-foreground mt-1">{stat.label}</div>
              <div className="text-xs font-semibold text-muted-foreground mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {funnel.map((step, i) => (
            <Card key={step.stage} className={`${brutal} bg-background`}>
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="border-2 border-foreground p-2 bg-accent-yellow">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <Badge className="bg-foreground text-background font-black text-xs">{i + 1}</Badge>
                </div>
                <p className="font-heading font-black uppercase text-sm">{step.stage}</p>
                <p className="font-black text-base mt-1">{step.value}</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1 leading-snug">{step.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Frame>
    ),
  },

  // 6 — Latest 9 posts
  {
    title: 'Latest Instagram Posts',
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <SlideLabel color="bg-accent-green text-foreground">04 · Live Data</SlideLabel>
        <SlideTitle>Latest 9 Posts · Live IG Data</SlideTitle>
        <Card className={`mt-8 ${brutal} bg-background overflow-hidden`}>
          <div className="grid grid-cols-12 bg-foreground text-background font-black uppercase text-xs">
            <div className="col-span-6 p-3">Topic</div>
            <div className="col-span-2 p-3 text-right">Views</div>
            <div className="col-span-2 p-3 text-right">Reach</div>
            <div className="col-span-2 p-3 text-right">Engag.</div>
          </div>
          {latestPosts.map((p, i) => (
            <div
              key={i}
              className={`grid grid-cols-12 border-t-2 border-foreground/15 items-center text-sm ${
                p.topic.includes('Dam Fah') ? 'bg-accent-yellow' : ''
              }`}
            >
              <div className="col-span-6 p-3 font-semibold leading-snug">{p.topic}</div>
              <div className="col-span-2 p-3 text-right font-black">{p.views}</div>
              <div className="col-span-2 p-3 text-right font-semibold">{p.reach}</div>
              <div className="col-span-2 p-3 text-right font-semibold">{p.eng}</div>
            </div>
          ))}
        </Card>
        <p className="text-xs font-semibold text-muted-foreground mt-3 max-w-3xl leading-relaxed">
          Pulled live from the Instagram professional dashboard (last 90 days). Views = total plays ·
          Reach = unique accounts · Engag. = likes + comments + saves + shares.
        </p>
      </Frame>
    ),
  },

  // 7 — Business Model & Year-1
  {
    title: 'Business Model',
    render: () => (
      <Frame>
        <SlideLabel>05 · Model</SlideLabel>
        <SlideTitle>Business Model &amp; Year-1</SlideTitle>
        <Card className={`mt-8 ${brutal} bg-background overflow-hidden`}>
          <div className="grid grid-cols-12 bg-foreground text-background font-black uppercase text-xs md:text-sm">
            <div className="col-span-5 p-3">Revenue Stream</div>
            <div className="col-span-2 p-3 text-right">Price</div>
            <div className="col-span-3 p-3 text-right hidden md:block">Volume (Yr 1)</div>
            <div className="col-span-5 md:col-span-2 p-3 text-right">Year 1</div>
          </div>
          {revenueStreams.map((r) => (
            <div key={r.name} className="grid grid-cols-12 border-t-2 border-foreground/20 items-center text-sm">
              <div className="col-span-5 p-3 font-bold">{r.name}</div>
              <div className="col-span-2 p-3 text-right font-semibold">{r.price}</div>
              <div className="col-span-3 p-3 text-right font-semibold text-muted-foreground hidden md:block">{r.volume}</div>
              <div className="col-span-5 md:col-span-2 p-3 text-right font-black">{r.year1}</div>
            </div>
          ))}
          <div className="grid grid-cols-12 border-t-4 border-foreground bg-accent-yellow items-center">
            <div className="col-span-7 md:col-span-10 p-3 font-black uppercase">Projected Year-1 Revenue</div>
            <div className="col-span-5 md:col-span-2 p-3 text-right font-heading font-black text-lg">{year1Total}</div>
          </div>
        </Card>
        <p className="text-xs font-semibold text-muted-foreground mt-3 max-w-3xl leading-relaxed">
          Model assumptions: 18 workshop runs/yr at ~20 seats (€89), 12 Launchpad clients (~€1,000),
          and 6 VC-mentorship clients (€2,000) — all fed by the Instagram funnel. Directional estimate.
        </p>
      </Frame>
    ),
  },

  // 8 — US & Global Expansion
  {
    title: 'US & Global Expansion',
    render: () => (
      <Frame bg="bg-[hsl(0,0%,98%)]">
        <SlideLabel color="bg-primary text-primary-foreground">06 · Growth</SlideLabel>
        <SlideTitle>US &amp; Global Expansion</SlideTitle>
        <p className="mt-4 text-sm md:text-lg font-medium text-muted-foreground max-w-3xl">
          Following the June 4 workshop, Invention Convention (US) opened a partnership conversation to
          make Mentorna their Finland affiliate — turning a local workshop into a global education brand.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {expansionPoints.map((p) => (
            <Card key={p.title} className={`${brutal} bg-background`}>
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <div className="border-2 border-foreground p-2 bg-accent-yellow shrink-0">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading font-black uppercase text-sm">{p.title}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 leading-snug">{p.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className={`mt-6 ${brutalSm} bg-accent-yellow p-5`}>
          <p className="font-heading font-black uppercase text-sm mb-2">Proof the pipeline already works</p>
          <p className="text-sm font-semibold leading-snug">
            Faris, a high-schooler from the June 4 workshop, found co-founders and is now being mentored
            toward his first venture. Team "Unprompted" (5 students) went from raw idea to a startup
            showcased at London Tech Week. The workshop doesn't just teach — it produces founders.
          </p>
        </div>
      </Frame>
    ),
  },

  // 9 — The Ask
  {
    title: 'The Ask',
    render: () => (
      <Frame>
        <SlideLabel>07 · The Ask</SlideLabel>
        <SlideTitle>The Ask</SlideTitle>
        <div className={`mt-6 bg-foreground text-background ${brutal} p-6 md:p-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <p className="text-xs font-bold uppercase text-background/60">Investment</p>
              <p className="font-heading text-4xl md:text-5xl font-black">€40,000</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-background/60">Equity</p>
              <p className="font-heading text-4xl md:text-5xl font-black">20–30%</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-background/60">Implied Valuation</p>
              <p className="font-heading text-2xl md:text-3xl font-black">€133K–€200K</p>
              <p className="text-xs font-semibold text-background/60 mt-1">post-money · this project</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-heading text-base font-black uppercase mb-3">Use of Funds</h3>
            <div className="grid grid-cols-1 gap-3">
              {useOfFunds.map((f) => (
                <Card key={f.label} className={`${brutalSm} bg-background`}>
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="border-2 border-foreground p-2 bg-accent-yellow">
                          <f.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-heading font-black uppercase text-sm">{f.label}</p>
                          <p className="text-xs font-semibold text-muted-foreground max-w-xs">{f.note}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-heading text-xl font-black">{f.pct}</p>
                        <p className="text-xs font-bold text-muted-foreground">{f.amount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-base font-black uppercase mb-3">What You Get</h3>
            <div className="grid grid-cols-1 gap-3">
              {investorGets.map((item) => (
                <div key={item} className={`flex items-start gap-3 ${brutalSm} bg-background p-4`}>
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    ),
  },

  // 10 — Closing
  {
    title: 'Let’s Build',
    render: () => (
      <Frame bg="bg-gradient-to-br from-accent-purple via-accent-blue/80 to-accent-green/70">
        <SlideLabel>Mentorna Oy</SlideLabel>
        <h2 className="font-heading font-black uppercase text-4xl md:text-7xl leading-[0.9] tracking-tight">
          Let’s build the<br />next generation<br />of founders.
        </h2>
        <p className="mt-6 text-lg md:text-2xl font-bold max-w-2xl">
          €40,000 · 20–30% · A proven engine, a global pathway, and a founder who ships.
        </p>
        <div className={`mt-8 inline-block bg-foreground text-background ${brutal} px-6 py-4`}>
          <p className="font-black uppercase text-sm tracking-wider">Ahmed Ezzat · ahmed.ezzat@mentorna.com</p>
        </div>
      </Frame>
    ),
  },
];

// ─────────────────────────────────────────────────────────────
// Presentation shell
// ─────────────────────────────────────────────────────────────
const Investment = () => {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setI((x) => Math.min(total - 1, x + 1)), [total]);
  const prev = useCallback(() => setI((x) => Math.max(0, x - 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const slide = slides[i];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pb-20">{slide.render()}</div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-foreground text-background border-t-4 border-foreground z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="hover:text-accent-yellow" aria-label="Back to dashboard">
            <Home className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-background/30" />
          <button onClick={prev} disabled={i === 0} className="hover:text-accent-yellow disabled:opacity-30" aria-label="Previous">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="font-black uppercase text-sm tracking-wider tabular-nums">
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <button onClick={next} disabled={i === total - 1} className="hover:text-accent-yellow disabled:opacity-30" aria-label="Next">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="hidden md:block ml-4 font-bold uppercase text-sm tracking-wider truncate text-background/80">
            {slide.title}
          </div>
          <div className="ml-auto font-black uppercase text-[10px] md:text-xs tracking-wider text-background/60">
            Mentorna Oy · Confidential
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
