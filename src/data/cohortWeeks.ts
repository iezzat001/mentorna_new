/**
 * The six weeks of the 0→1 cohort.
 *
 * Content is derived from the "Vibe Coding 0 → 1" deck (src/data/workshop.ts):
 * its five theory→build sections become weeks 1-5, and the optional pitch
 * block at the end of the workshop becomes week 6. The four-hour workshop is
 * the cohort in miniature, so the arc is the same one the room already walks.
 *
 * `step` ties each week back to the 0→1 Framework shown above this section on
 * /build, so the framework is not a separate promise from the schedule.
 */
export type CohortWeek = {
  n: number;
  /** Framework stage this week belongs to — matches STEPS in Build.tsx. */
  step: 'Problem' | 'Promise' | 'Build' | 'Demand';
  title: string;
  /** What actually happens in the room that week. */
  brief: string;
  /** What the builder leaves with — the reason the week was worth three hours. */
  outcome: string;
};

export const COHORT_WEEKS: CohortWeek[] = [
  {
    n: 1,
    step: 'Problem',
    title: 'Find the problem',
    brief:
      'Three problems you have actually lived. You pick the one you know best. You name the person who feels it. The agents cannot build until you do this.',
    outcome: 'a problem you can say in one line, and the person it belongs to.',
  },
  {
    n: 2,
    step: 'Promise',
    title: 'Design the offer',
    brief:
      'One promise. One person. A stranger has to get it in ten seconds. Strangers are not kind.',
    outcome: 'an offer that survives someone who owes you nothing.',
  },
  {
    n: 3,
    step: 'Build',
    title: 'Build version one',
    brief:
      'Your offer becomes the prompt. AI workers build the first version live, in the room. Not a deck.',
    outcome: 'a landing page at a real URL, built in front of you.',
  },
  {
    n: 4,
    step: 'Demand',
    title: 'Get real signal',
    brief:
      'A prototype is not proof. Likes are not proof. Five interviews. Twenty messages. One form.',
    outcome: 'evidence from someone who is not your friend.',
  },
  {
    n: 5,
    step: 'Demand',
    title: 'Find your channel, ship it',
    brief:
      'Nineteen channels exist. One is already working for you. We test cheap and find it. Live and ugly beats perfect and imaginary.',
    outcome: 'a repeatable way to reach the person from week one.',
  },
  {
    n: 6,
    step: 'Build',
    title: 'You show the room',
    brief:
      'Two minutes on your feet. The problem, what you built, who it is for, what is next.',
    outcome: 'your story, and the key to Founders’ Club.',
  },
];
