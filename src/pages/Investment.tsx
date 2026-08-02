import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

/**
 * Investment Pitch Deck — rendered from the original Claude Design export.
 *
 * The deck HTML (with its own deck-stage.js web component, Comfortaa/Quicksand
 * fonts, blob animations, clay cards, and inline styles) lives in
 * /public/pitch_deck/ and is served as a static asset.  We embed it in a
 * full-viewport iframe so every pixel, animation and interaction is identical
 * to the original design — no manual porting needed.
 *
 * The only addition is a thin top bar with a "← Dashboard" button that sits
 * above the iframe without interfering with the deck's own nav overlay.
 */
const Investment = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      {/* Minimal top bar — just enough to get back to the dashboard */}
      <div className="shrink-0 h-10 bg-black border-b border-white/10 flex items-center px-4 gap-3 z-50">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
          aria-label="Back to dashboard"
        >
          <Home className="w-4 h-4" />
          Dashboard
        </button>
        <span className="text-white/20 text-xs ml-auto uppercase tracking-widest font-bold">
          Mentorna · Confidential
        </span>
      </div>

      {/* The deck fills the remaining viewport — the web component handles
          its own keyboard nav, scaling, slide thumbnails, and animations */}
      <iframe
        src="/pitch_deck/Mentorna%20Pitch%20Deck.dc.html"
        title="Mentorna Investor Pitch Deck"
        className="flex-1 w-full border-0"
        allow="autoplay"
      />
    </div>
  );
};

export default Investment;
