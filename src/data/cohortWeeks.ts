/**
 * The six weeks of the 0→1 cohort.
 *
 * Content is derived from the "Vibe Coding 0 → 1" deck (src/data/workshop.ts):
 * its five theory→build sections become weeks 1-5, and the optional pitch
 * block at the end of the workshop becomes week 6. The four-hour workshop is
 * the cohort in miniature, so the arc is the same one the room already walks.
 *
 * `step` ties each week to the 0→1 Framework step it belongs to (STEPS in
 * Build.tsx groups the weeks under their step). The "you leave with" outcomes
 * live on the steps, not on the weeks.
 */
export type CohortWeek = {
  n: number;
  /** Framework step — matches STEPS in Build.tsx. Week 3 is Demand: the
   *  landing page is the demand test, so "build comes last" stays true. */
  step: 'Problem' | 'Promise' | 'Demand' | 'Build';
  /** Only weeks that share a step need their own title (3–5). */
  title?: string;
  /** One plain sentence: what you do that week. */
  brief: string;
};

export const COHORT_WEEKS: CohortWeek[] = [
  {
    n: 1,
    step: 'Problem',
    brief: 'Pick a problem you know well, and name the person who has it.',
  },
  {
    n: 2,
    step: 'Promise',
    brief: 'Write one offer that a stranger understands in 10 seconds.',
  },
  {
    n: 3,
    step: 'Demand',
    title: 'Build your landing page',
    brief: 'AI builds your landing page in class, live on the web.',
  },
  {
    n: 4,
    step: 'Demand',
    title: 'Talk to buyers',
    brief: '5 interviews, 20 messages and 1 sign-up form.',
  },
  {
    n: 5,
    step: 'Demand',
    title: 'Reach your buyers',
    brief: 'Find where your buyers already are, and reach them.',
  },
  {
    n: 6,
    step: 'Build',
    brief: 'Launch your first version, and present it to the group and an investor.',
  },
];
