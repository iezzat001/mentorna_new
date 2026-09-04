import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ArrowLeft, CalendarDays, Clock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import WebinarPlayer from "@/components/community/WebinarPlayer";
import { getPublishedWebinars, type Webinar } from "@/data/webinars";
import { flushRetryQueue, formatDuration } from "@/lib/webinarAnalytics";
import { useSEO } from "@/hooks/useSEO";

const formatDate = (iso: string): string => {
  try {
    return format(parseISO(iso), "MMMM d, yyyy");
  } catch {
    return iso;
  }
};

const Community: React.FC = () => {
  useSEO({
    title: "Community Webinars - Mentorna",
    description:
      "Watch recordings of Mentorna's weekly community webinars on AI tools, coding, pitching, and entrepreneurship.",
    canonical: "https://mentorna.com/community",
  });

  useEffect(() => {
    void flushRetryQueue();
  }, []);

  const webinars = useMemo(() => getPublishedWebinars(), []);
  const [activeId, setActiveId] = useState<string | undefined>(webinars[0]?.id);
  const active: Webinar | undefined =
    webinars.find((w) => w.id === activeId) ?? webinars[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-accent-yellow">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-4 border-2 border-foreground bg-background px-3 py-1 font-bold uppercase text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <h1 className="font-heading font-black uppercase text-3xl sm:text-5xl text-foreground">
            Community Webinars
          </h1>
          <p className="mt-2 max-w-2xl font-semibold text-foreground/80">
            Every week we go live on AI tools, coding, pitching, and building
            startups. Catch up on past sessions here.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {!active ? (
          <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-10 text-center">
              <PlayCircle className="mx-auto mb-4 h-12 w-12 text-foreground/60" />
              <p className="font-black uppercase text-foreground">
                No webinars published yet
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground/70">
                Recordings will appear here after each weekly session.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Featured player */}
            <section className="lg:col-span-2">
              <WebinarPlayer key={active.id} webinar={active} />
              <div className="mt-5" dir={active.dir ?? "ltr"}>
                <div className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase text-foreground/70">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(active.date)}
                  </span>
                  {active.durationSeconds ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(active.durationSeconds)}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 font-heading font-black text-2xl sm:text-3xl text-foreground">
                  {active.title}
                </h2>
                {active.tags && active.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="border-2 border-foreground bg-accent-purple text-foreground font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-accent-purple"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <p className="mt-4 font-semibold leading-relaxed text-foreground/90">
                  {active.description}
                </p>
              </div>
            </section>

            {/* Episode list */}
            <aside className="lg:col-span-1">
              <h3 className="mb-4 font-heading font-black uppercase text-lg text-foreground">
                All Sessions ({webinars.length})
              </h3>
              <div className="flex flex-col gap-4">
                {webinars.map((w) => {
                  const isActive = w.id === active.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setActiveId(w.id)}
                      className={`text-left border-4 border-foreground p-4 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-none translate-x-1 translate-y-1"
                          : "bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                      }`}
                      dir={w.dir ?? "ltr"}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-80">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(w.date)}
                        {w.durationSeconds ? (
                          <>
                            <span aria-hidden>•</span>
                            {formatDuration(w.durationSeconds)}
                          </>
                        ) : null}
                      </div>
                      <div className="mt-1 font-black leading-snug">{w.title}</div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
