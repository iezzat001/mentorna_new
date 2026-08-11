import React from 'react';
import { Users } from 'lucide-react';
import { SOCIETY_URL } from '@/lib/society';

type FunnelSocietyCtaProps = {
  title?: string;
  body?: string;
};

/**
 * Final screen of every funnel episode — join the AI Society.
 * Single bold CTA. Episode prev/next links live in the parent page.
 *
 * Canvas download intentionally omitted (too many CTAs). Re-add later if needed;
 * see docs/learner-auth-progress-future.md.
 */
const FunnelSocietyCta = ({
  title = 'كمّل الرحلة مع المجتمع 🚀',
  body = 'عندك سؤال؟ اسأله هناك. بنتبادل المعرفة، نتعارف، وبنبني سوا كل أسبوع في ويبنار حي.',
}: FunnelSocietyCtaProps) => (
  <div className="flex flex-1 flex-col items-center justify-center text-center">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-[hsl(145,63%,42%)] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <Users className="h-8 w-8" />
    </div>

    <h2 className="mb-3 text-2xl font-extrabold leading-tight md:text-3xl">{title}</h2>
    <p className="mb-8 max-w-sm text-base font-semibold leading-relaxed opacity-70">{body}</p>

    <a
      href={SOCIETY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 w-full items-center justify-center gap-2 border-[3px] border-[hsl(0,0%,10%)] bg-[hsl(145,63%,42%)] px-6 text-base font-extrabold text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
    >
      <Users className="h-5 w-5" />
      انضم للمجتمع مجاناً
    </a>
  </div>
);

export default FunnelSocietyCta;
