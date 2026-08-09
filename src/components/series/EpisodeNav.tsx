import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, LayoutGrid, Lock } from 'lucide-react';
import {
  HUB_PATH,
  SERIES_TITLE,
  TOTAL_EPISODES,
  getPrevEpisode,
  getNextEpisode,
  liveEpisodes,
} from '@/data/series';

/**
 * Thin strip that sits directly under the hero on every episode page.
 * Tells the visitor where they are in the series and gets them to the hub.
 *
 * RTL note: in Arabic, "forward" reads to the LEFT, so the next episode uses
 * ArrowLeft and the previous uses ArrowRight.
 */
export const EpisodeBreadcrumb = ({ n }: { n: number }) => (
  <div className="bg-foreground text-background border-b-4 border-foreground" dir="rtl">
    <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
      <Link
        to={HUB_PATH}
        className="inline-flex items-center gap-2 font-bold text-xs md:text-sm hover:text-accent-yellow transition-colors"
      >
        <LayoutGrid className="w-4 h-4" />
        <span>كل الحلقات</span>
      </Link>
      <span className="font-black text-xs md:text-sm tracking-wide">
        الحلقة {n} من {TOTAL_EPISODES}
      </span>
    </div>
  </div>
);

/**
 * Previous / next cards, placed near the bottom of an episode page so someone
 * who landed mid-series can keep moving in either direction.
 */
export const EpisodePager = ({ n }: { n: number }) => {
  const prev = getPrevEpisode(n);
  const next = getNextEpisode(n);

  return (
    <section className="py-10 md:py-14 bg-secondary border-b-4 border-foreground" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <p className="font-body text-sm font-bold text-foreground/60">{SERIES_TITLE}</p>
            <h2 className="font-heading text-xl md:text-2xl font-black text-foreground">
              كمّل السلسلة 👇
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Previous */}
            {prev ? (
              <Link
                to={`/${prev.slug}`}
                className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-2 text-foreground/60 font-bold text-xs mb-2">
                  <ArrowRight className="w-4 h-4" />
                  الحلقة السابقة
                </div>
                <p className="font-heading font-black text-base md:text-lg text-foreground">
                  {prev.n}. {prev.title}
                </p>
                <p className="font-body text-sm text-foreground/70 mt-1 leading-relaxed">{prev.hook}</p>
              </Link>
            ) : (
              <div className="bg-white/50 border-4 border-dashed border-foreground/30 p-5 flex items-center justify-center">
                <p className="font-bold text-sm text-foreground/50 text-center">
                  دي أول حلقة في السلسلة 🎬
                </p>
              </div>
            )}

            {/* Next */}
            {next ? (
              <Link
                to={`/${next.slug}`}
                className="bg-accent-yellow border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-end gap-2 text-foreground/70 font-bold text-xs mb-2">
                  الحلقة التالية
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <p className="font-heading font-black text-base md:text-lg text-foreground text-end">
                  {next.n}. {next.title}
                </p>
                <p className="font-body text-sm text-foreground/70 mt-1 leading-relaxed text-end">
                  {next.hook}
                </p>
              </Link>
            ) : (
              <div className="bg-white border-4 border-dashed border-foreground/40 p-5 text-center flex flex-col items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-foreground/50" />
                <p className="font-bold text-sm text-foreground/70">الحلقة الجاية لسه في الطريق</p>
                <p className="font-body text-xs text-foreground/50">
                  تابعني على إنستجرام عشان تعرف أول ما تنزل
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <Link
              to={HUB_PATH}
              className="inline-flex items-center gap-2 bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-black text-sm md:text-base px-6 py-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <LayoutGrid className="w-5 h-5" />
              شوف كل الحلقات ({liveEpisodes.length} متاحة دلوقتي)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
