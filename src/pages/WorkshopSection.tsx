import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, LayoutGrid, NotebookText, X } from 'lucide-react';
import { sections } from '@/data/workshop';
import { getSectionSlides } from '@/components/slides/workshopSlides';

// Admin-only per-section presentation: shows only the slides belonging to one
// workshop section (theory → build → reading → revisit).
const WorkshopSection = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  const id = Number(sectionId);

  const section = sections.find((s) => s.id === id);
  const slides = getSectionSlides(id);
  const total = slides.length;

  const [i, setI] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);

  // Reset to the first slide whenever the section changes
  useEffect(() => setI(0), [sectionId]);

  const next = useCallback(() => setI((x) => Math.min(total - 1, x + 1)), [total]);
  const prev = useCallback(() => setI((x) => Math.max(0, x - 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); prev(); }
      else if (e.key === 'p' || e.key === 'P') setNotesOpen((o) => !o);
      else if (e.key === 'Escape') setNotesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!section || total === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-black uppercase text-4xl">Section not found</h1>
          <button
            onClick={() => navigate('/workshop-deck')}
            className="mt-4 inline-block bg-primary text-primary-foreground border-4 border-foreground brutal-shadow font-black uppercase px-6 py-3"
          >
            Back to Outline
          </button>
        </div>
      </div>
    );
  }

  const slide = slides[i];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pb-20">{slide.render()}</div>

      {/* Presenter notes */}
      {notesOpen && (
        <div className="fixed bottom-16 left-0 right-0 bg-background border-t-4 border-foreground p-6 max-h-[40vh] overflow-y-auto z-40">
          <div className="max-w-6xl mx-auto flex gap-4 items-start">
            <div className="bg-accent-yellow border-2 border-foreground font-black uppercase text-xs px-2 py-1 tracking-wider shrink-0">
              Notes
            </div>
            <p className="font-semibold text-foreground/80 leading-relaxed">{slide.notes}</p>
            <button onClick={() => setNotesOpen(false)} className="ml-auto shrink-0" aria-label="Close notes">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-foreground text-background border-t-4 border-foreground z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="hover:text-accent-yellow" aria-label="Dashboard">
            <Home className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/workshop-deck')} className="hover:text-accent-yellow" aria-label="Workshop outline">
            <LayoutGrid className="w-5 h-5" />
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
            §{section.id} {section.theoryTitle}
          </div>
          <button
            onClick={() => setNotesOpen((o) => !o)}
            className={`ml-auto inline-flex items-center gap-2 font-black uppercase text-xs px-3 py-2 border-2 border-background tracking-wider ${
              notesOpen ? 'bg-accent-yellow text-foreground' : 'hover:bg-background hover:text-foreground'
            }`}
            aria-label="Toggle presenter notes"
          >
            <NotebookText className="w-4 h-4" /> <span className="hidden sm:inline">Notes</span> <span className="opacity-60">(P)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopSection;
