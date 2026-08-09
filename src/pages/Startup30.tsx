import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, PlayCircle, Users, MessageCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import {
  SERIES_TITLE,
  SERIES_TAGLINE,
  TOTAL_EPISODES,
  liveEpisodes,
  remainingEpisodes,
} from '@/data/series';
import { getLead, type LeadMemory } from '@/lib/leadMemory';

/**
 * Series hub for "ابني Startup في 30 يوم".
 *
 * This is the link-in-bio destination and the "start from episode 1" entry
 * point. Someone who lands on a random episode from a reel can get here and
 * see the whole series laid out.
 */
const Startup30 = () => {
  const [lead, setLead] = useState<LeadMemory | null>(null);

  useSEO({
    title: `${SERIES_TITLE} — سلسلة مجانية | Mentorna`,
    description: SERIES_TAGLINE,
    canonical: 'https://mentorna.com/startup-30',
  });

  useEffect(() => {
    setLead(getLead());
  }, []);

  const done = lead?.downloaded ?? [];
  const doneCount = done.filter((n) => liveEpisodes.some((e) => e.n === n)).length;

  return (
    <div className="min-h-screen bg-background font-body" dir="rtl">
      {/* ===== Hero ===== */}
      <header className="bg-accent-yellow border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <span className="inline-block bg-foreground text-background font-black text-xs px-3 py-1.5 border-2 border-foreground mb-4">
            سلسلة مجانية
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            {SERIES_TITLE} 🚀
          </h1>
          <p className="font-body text-base md:text-xl font-semibold text-foreground/80 max-w-2xl mx-auto">
            {SERIES_TAGLINE}
          </p>

          {/* Progress */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              {lead ? (
                <>
                  <p className="font-heading font-black text-lg text-foreground">
                    خلّصت {doneCount} من {liveEpisodes.length} حلقة متاحة
                  </p>
                  <div className="mt-3 h-4 bg-secondary border-2 border-foreground overflow-hidden">
                    <div
                      className="h-full bg-accent-green transition-all duration-700"
                      style={{
                        width: `${liveEpisodes.length ? (doneCount / liveEpisodes.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <p className="font-body text-xs text-foreground/60 mt-2">
                    كمّل باقي الحلقات، كل حلقة فيها أداة عملية تنزّلها.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-heading font-black text-lg text-foreground">
                    {liveEpisodes.length} حلقات متاحة دلوقتي
                  </p>
                  <p className="font-body text-sm text-foreground/70 mt-1">
                    ابدأ من الحلقة الأولى، وكل حلقة معاها أداة مجانية تنزّلها.
                  </p>
                </>
              )}
            </div>
          </div>

          {liveEpisodes.length > 0 && (
            <Link
              to={`/${liveEpisodes[0].slug}`}
              className="inline-flex items-center gap-2 mt-6 bg-foreground text-background border-4 border-foreground shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] font-black text-base md:text-lg px-8 py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              {doneCount > 0 ? 'ابدأ من الأول' : 'ابدأ من الحلقة الأولى'}
            </Link>
          )}
        </div>
      </header>

      {/* ===== Episode list ===== */}
      <section className="py-12 md:py-16 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-5">
            {liveEpisodes.map((ep) => {
              const collected = done.includes(ep.n);
              return (
                <Link
                  key={ep.n}
                  to={`/${ep.slug}`}
                  className="block bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-stretch">
                    {/* Number block */}
                    <div
                      className={`${
                        collected ? 'bg-accent-green' : 'bg-accent-yellow'
                      } border-l-4 border-foreground flex flex-col items-center justify-center w-20 md:w-24 shrink-0 gap-1`}
                    >
                      <span className="font-heading text-3xl md:text-4xl font-black text-foreground">
                        {ep.n}
                      </span>
                      {collected && <CheckCircle2 className="w-5 h-5 text-foreground" />}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h2 className="font-heading text-lg md:text-xl font-black text-foreground">
                          {ep.title}
                        </h2>
                        {collected && (
                          <span className="bg-accent-green border-2 border-foreground font-bold text-[10px] px-2 py-0.5">
                            نزّلتها ✓
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm md:text-base text-foreground/75 leading-relaxed">
                        {ep.hook}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 font-bold text-sm text-primary">
                        {collected ? 'راجع الحلقة' : 'ابدأ الحلقة'}
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Remaining episodes, count only */}
            {remainingEpisodes > 0 && (
              <div className="bg-white/60 border-4 border-dashed border-foreground/40 p-6 text-center">
                <Lock className="w-6 h-6 text-foreground/50 mx-auto mb-2" />
                <p className="font-heading font-black text-base md:text-lg text-foreground/70">
                  باقي {remainingEpisodes} حلقة في الطريق
                </p>
                <p className="font-body text-sm text-foreground/55 mt-1">
                  حلقة جديدة أول بأول على إنستجرام. تابعني عشان متفوتكش.
                </p>
                <a
                  href="https://www.instagram.com/ahmedezzat_fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 bg-foreground text-background border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] font-black text-sm px-5 py-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  تابعني على إنستجرام
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Community CTA ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-accent-green via-accent-green/90 to-accent-green/70 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-2xl mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardContent className="p-6 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-foreground text-background border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight">
                انضم لمجتمع الـ AI &amp; Entrepreneurial Society 🚀
              </h2>
              <p className="font-body text-base md:text-lg font-semibold text-foreground/80 mb-6 max-w-xl mx-auto">
                عايز insights أكتر و webinars وworkshops عملية؟ املأ الفورم وانضم لجروب الـ
                "AI &amp; Entrepreneurial Society" على الواتساب، وهشاركك كل الجديد والفرص هناك أول بأول.
              </p>
              <a
                href="https://tally.so/r/OD5dvY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background border-4 border-foreground shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] font-black text-base md:text-lg px-8 py-5 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Users className="w-5 h-5" />
                املأ الفورم وانضم للمجتمع
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-foreground text-background py-8 border-t-4 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-xl font-bold mb-2">Mentorna®</p>
          <p className="font-body text-sm text-background/70 mb-4">
            تمكين الجيل القادم من بناة الذكاء الاصطناعي
          </p>
          <p className="font-body text-xs text-background/50 mb-4">تابعني 👇</p>
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

export default Startup30;
