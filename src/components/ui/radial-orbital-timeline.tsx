import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Radial orbital timeline — nodes orbit a centre hub, click one to expand it.
 *
 * Adapted from the 21st.dev component for Mentorna's cream editorial pages.
 * What changed, and why:
 *
 * - The original was a full-screen black stage (`h-screen bg-black`). This one
 *   is an inline block with a transparent background and a height derived from
 *   the orbit radius, so it can sit between two cream sections.
 * - The radius is measured from the container instead of a fixed 200px, so the
 *   orbit fits a phone without the side nodes hanging off the edge.
 * - The original telemetry — an "energy level" bar and a completed/pending
 *   status badge — carried no meaning for a teaching schedule, so the card now
 *   shows the item's `category` and `outcome` instead. `energy` and `status`
 *   are gone from the item type rather than left to be filled with noise.
 * - Auto-rotation stops for `prefers-reduced-motion`, and while the timeline is
 *   scrolled out of view, so an untouched page is not spinning a 50ms interval
 *   forever.
 * - Nodes are real buttons, so the orbit is reachable by keyboard.
 */
export interface OrbitalTimelineItem {
  id: number;
  /** Node label, shown under the dot and as the expanded card's title. */
  title: string;
  /** Small monospace marker on the card — here, "Week 1". */
  date: string;
  /** Body copy of the expanded card. */
  content: string;
  /** Chip above the title — here, the framework stage. */
  category: string;
  /** Accent colour for the chip and the node's active ring. */
  accent: string;
  /** Closing line of the card, prefixed with `outcomeLabel`. */
  outcome: string;
  icon: React.ElementType;
  /** Other item ids offered as follow-on buttons. */
  relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
  timelineData: OrbitalTimelineItem[];
  /** Label before `outcome` in the expanded card. */
  outcomeLabel?: string;
  /** Heading above the follow-on buttons. */
  relatedLabel?: string;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function RadialOrbitalTimeline({
  timelineData,
  outcomeLabel = 'You leave with',
  relatedLabel = 'Next to it',
  className,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [onScreen, setOnScreen] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(200);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const reduced = prefersReducedMotion();

  /* Radius follows the container so the side nodes and their labels stay
     inside it. ~0.3 of the width leaves room for a label either side. */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setRadius(Math.max(104, Math.min(200, el.clientWidth * 0.3)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Only spin while the orbit is actually on screen. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate || reduced || !onScreen) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate, reduced, onScreen]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setAutoRotate(true);
    }
  };

  /* Bring a node to the top of the orbit (270°), where its card has room. */
  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex < 0) return;
    setRotationAngle(270 - (nodeIndex / timelineData.length) * 360);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const wasOpen = !!prev[id];
      if (wasOpen) {
        setActiveNodeId(null);
        setAutoRotate(true);
        return {};
      }
      setActiveNodeId(id);
      setAutoRotate(false);
      centerViewOnNode(id);
      return { [id]: true };
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      // Nodes at the back of the orbit fade, so the front reads first.
      opacity: Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))),
    };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return (
      timelineData.find((item) => item.id === activeNodeId)?.relatedIds.includes(itemId) ??
      false
    );
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative flex w-full items-center justify-center ${className ?? ''}`}
      style={{ height: radius * 2 + 190 }}
    >
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Centre hub */}
        <div className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(0,0%,10%)]">
          <div className="h-6 w-6 rounded-full bg-[#F7E9D6]" />
        </div>

        {/* Orbit path */}
        <div
          aria-hidden
          className="absolute rounded-full border border-[#1c100e]/15"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = !!expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="absolute transition-all duration-700"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                className="group flex cursor-pointer flex-col items-center focus-visible:outline-none"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 ${
                    isExpanded
                      ? 'scale-125 bg-[hsl(0,0%,10%)] text-[#F7E9D6]'
                      : 'bg-[#FFFCFA] text-[hsl(0,0%,10%)]'
                  }`}
                  style={{
                    borderColor: isExpanded || isRelated ? item.accent : 'rgba(28,16,14,0.2)',
                  }}
                >
                  <Icon size={16} />
                </span>
                <span
                  className={`mt-2 whitespace-nowrap font-heading text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                    isExpanded ? 'text-[hsl(0,0%,10%)]' : 'text-[hsl(0,0%,10%)]/55'
                  }`}
                >
                  {item.title}
                </span>
              </button>

              {isExpanded && (
                <Card
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-1/2 top-20 w-72 -translate-x-1/2 overflow-visible border-[#1c100e]/10 bg-[#FFFCFA] text-left shadow-[0_28px_70px_-36px_rgba(80,40,16,0.45)]"
                >
                  <span
                    aria-hidden
                    className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2"
                    style={{ background: item.accent }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        className="border-transparent px-2 text-[10px] font-medium uppercase tracking-[0.16em] hover:bg-[var(--chip)]"
                        style={
                          {
                            '--chip': `color-mix(in srgb, ${item.accent} 18%, transparent)`,
                            background: `color-mix(in srgb, ${item.accent} 18%, transparent)`,
                            color: item.accent,
                          } as React.CSSProperties
                        }
                      >
                        {item.category}
                      </Badge>
                      <span className="font-heading text-[11px] uppercase tracking-[0.18em] text-[hsl(0,0%,10%)]/45">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="mt-2 font-heading text-lg font-light tracking-tight text-[hsl(0,0%,10%)]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="font-heading text-sm font-light leading-relaxed text-[hsl(0,0%,10%)]/75">
                    <p>{item.content}</p>

                    <p className="mt-4 border-t border-[#1c100e]/10 pt-3 text-[13px] text-[hsl(0,0%,10%)]/55">
                      <span className="text-[hsl(0,0%,10%)]/75">{outcomeLabel}:</span>{' '}
                      {item.outcome}
                    </p>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 border-t border-[#1c100e]/10 pt-3">
                        <h4 className="mb-2 font-heading text-[10px] font-medium uppercase tracking-[0.16em] text-[hsl(0,0%,10%)]/45">
                          {relatedLabel}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedIds.map((relatedId) => {
                            const related = timelineData.find((i) => i.id === relatedId);
                            if (!related) return null;
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                                className="h-7 rounded-full border-[#1c100e]/15 bg-transparent px-2.5 font-heading text-[11px] font-light text-[hsl(0,0%,10%)]/70 hover:bg-[#1c100e]/5 hover:text-[hsl(0,0%,10%)]"
                              >
                                {related.title}
                                <ArrowRight size={9} className="ml-1 opacity-60" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
