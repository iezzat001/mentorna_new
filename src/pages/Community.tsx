import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ArrowLeft, CalendarDays, Clock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import WebinarPlayer from "@/components/community/WebinarPlayer";
import { getPublishedWebinars } from "@/data/webinars";
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
        {webinars.length === 0 ? (
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
          <>
            <div className="mb-6 flex items-center gap-2 font-heading font-black uppercase text-lg text-foreground">
              <span>All Sessions</span>
              <span className="inline-flex items-center justify-center border-2 border-foreground bg-accent-green px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {webinars.length}
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {webinars.map((webinar) => (
                <article key={webinar.id} className="flex flex-col">
                  <WebinarPlayer webinar={webinar} />
                  <div className="mt-4" dir={webinar.dir ?? "ltr"}>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase text-foreground/70">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(webinar.date)}
                      </span>
                      {webinar.durationSeconds ? (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDuration(webinar.durationSeconds)}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-2 font-heading font-black text-xl sm:text-2xl text-foreground">
                      {webinar.title}
                    </h2>
                    {webinar.tags && webinar.tags.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {webinar.tags.map((tag) => (
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
                      {webinar.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Community;
