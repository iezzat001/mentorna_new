import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Calendar,
  ChevronDown,
  Hammer,
  Home,
  MapPin,
  Mic,
  PlayCircle,
} from 'lucide-react';
import { workshopInfo, sections, pitchBlock, type Section } from '@/data/workshop';
import { getSectionSlides } from '@/components/slides/workshopSlides';

// Admin-only hub for the "Vibe Coding 0 → 1" workshop.
// Mirrors the original zero-to-one home: format strip + 5 expandable section
// cards (theory → build) + the closing pitch block.

function SectionCard({ s }: { s: Section }) {
  const [open, setOpen] = useState(false);
  const slideCount = getSectionSlides(s.id).length;

  return (
    <div className="border-4 border-foreground brutal-shadow bg-background">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`${s.color} w-full border-b-4 border-foreground px-6 py-4 flex flex-col md:flex-row md:items-center gap-2 text-left brutal-hover`}
      >
        <div className="font-black uppercase text-xs tracking-wider text-foreground/70 shrink-0">
          Section {s.id}
        </div>
        <div className="font-black uppercase text-xl md:text-3xl text-foreground">
          {s.theoryTitle}
        </div>
        <div className="md:ml-auto flex items-center gap-3 shrink-0">
          <span className="font-bold text-sm text-foreground/80">
            {s.time} · {s.theoryDuration} + {s.buildDuration}
          </span>
          <ChevronDown className={`w-6 h-6 text-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="p-6 md:p-8">
          <p className="font-semibold text-base md:text-lg leading-relaxed text-foreground/80">{s.brief}</p>

          <div className="mt-6 bg-accent-green/10 border-2 border-foreground p-4">
            <div className="font-black uppercase text-xs tracking-wider text-foreground/60 mb-1">
              By the end of this section
            </div>
            <div className="font-bold text-base">{s.outcome}</div>
          </div>

          <div className="mt-4 bg-foreground text-background border-2 border-foreground p-4">
            <div className="font-black uppercase text-xs tracking-wider text-accent-yellow mb-1">
              <Hammer className="w-3 h-3 inline mr-1" />
              {s.buildDuration} build
            </div>
            <div className="font-semibold text-sm leading-relaxed">{s.buildPrompt}</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/workshop-deck/section/${s.id}`}
              className="bg-primary text-primary-foreground border-4 border-foreground brutal-shadow brutal-hover font-black uppercase px-5 py-3 text-sm inline-flex items-center gap-2"
            >
              View Slides <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="font-bold text-sm text-muted-foreground self-center">
              {slideCount} slide{slideCount === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const WorkshopHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70 border-b-4 border-foreground">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="inline-block bg-foreground text-background font-black uppercase text-xs px-3 py-1 mb-4 tracking-wider border-2 border-foreground">
            {workshopInfo.organization}
          </div>
          <h1 className="font-heading font-black uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight">
            Vibe Coding <span className="text-primary">0 → 1</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-bold max-w-3xl">{workshopInfo.subtitle}</p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-3xl">
            <div className="bg-background border-4 border-foreground brutal-shadow p-4">
              <div className="font-black uppercase text-xs tracking-wider text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Date
              </div>
              <div className="font-bold text-sm mt-1">{workshopInfo.date}</div>
              <div className="font-semibold text-xs text-muted-foreground">{workshopInfo.time}</div>
            </div>
            <div className="bg-background border-4 border-foreground brutal-shadow p-4">
              <div className="font-black uppercase text-xs tracking-wider text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Venue
              </div>
              <div className="font-bold text-sm mt-1">{workshopInfo.venue}</div>
            </div>
            <div className="bg-background border-4 border-foreground brutal-shadow p-4">
              <div className="font-black uppercase text-xs tracking-wider text-muted-foreground">Co-Hosts</div>
              <div className="font-bold text-sm mt-1">{workshopInfo.coHosts.join(' · ')}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/workshop-deck/all')}
              className="bg-foreground text-background border-4 border-foreground brutal-shadow brutal-hover font-black uppercase px-6 py-3 text-sm inline-flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4" /> Present Full Deck
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-background border-4 border-foreground brutal-shadow brutal-hover font-black uppercase px-6 py-3 text-sm inline-flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Format strip */}
      <div className="bg-foreground text-background border-b-4 border-foreground">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6 items-center text-center">
            <div className="flex items-center justify-center gap-3">
              <Brain className="w-6 h-6 text-accent-yellow" />
              <span className="font-black uppercase text-sm tracking-wider">10 min theory</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Hammer className="w-6 h-6 text-accent-yellow" />
              <span className="font-black uppercase text-sm tracking-wider">30 min building</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mic className="w-6 h-6 text-accent-yellow" />
              <span className="font-black uppercase text-sm tracking-wider">30 min pitching</span>
            </div>
          </div>
          <p className="mt-3 text-center font-semibold text-sm text-background/80">
            Less talking. More doing. You build from minute one.
          </p>
        </div>
      </div>

      {/* Sections outline */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="inline-block bg-foreground text-background font-black uppercase text-xs px-3 py-1 mb-4 tracking-wider">
            Workshop Outline
          </div>
          <h2 className="font-heading font-black uppercase text-3xl md:text-5xl leading-tight max-w-4xl">
            {sections.length} sections. Each: theory → you build.
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground max-w-2xl">
            By the end you'll have a validated idea, a live landing page, and a pitch.
          </p>

          <div className="mt-10 space-y-6">
            {sections.map((s) => (
              <SectionCard key={s.id} s={s} />
            ))}
          </div>

          {/* Pitch block */}
          <div className="mt-8 border-4 border-foreground brutal-shadow-lg bg-accent-purple/30">
            <div className="bg-accent-purple border-b-4 border-foreground px-6 py-4 flex flex-col md:flex-row md:items-center gap-2">
              <Mic className="w-6 h-6 text-foreground shrink-0" />
              <div className="font-black uppercase text-2xl md:text-3xl text-foreground">{pitchBlock.title}</div>
              <div className="md:ml-auto font-bold text-sm text-foreground/80 shrink-0">
                {pitchBlock.time} · {pitchBlock.duration}
              </div>
            </div>
            <div className="p-6">
              <p className="font-semibold text-lg leading-relaxed">{pitchBlock.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopHub;
