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
      'Three problems you have actually lived. You pick the one you understand best and name who feels it, so the agents know what they are building before anyone opens a tool.',
    outcome: 'A problem you can say in one line, and the person it belongs to.',
  },
  {
    n: 2,
    step: 'Promise',
    title: 'Design the offer',
    brief:
      'One promise to one person. Dream outcome up, time and effort down. You write it — a stranger has to understand it in ten seconds, and strangers are unforgiving.',
    outcome: 'An offer statement that survives being read by someone who owes you nothing.',
  },
  {
    n: 3,
    step: 'Build',
    title: 'Build version one',
    brief:
      'Your offer becomes the prompt. AI teammates ship the first version live in the room: the promise, the proof, the capture, the call to action. Not a deck.',
    outcome: 'A landing page at a real URL, built in front of you.',
  },
  {
    n: 4,
    step: 'Demand',
    title: 'Get real signal',
    brief:
      'A prototype is not validation. Likes are not proof. Five interviews, twenty targeted messages, one capture form — and you stop guessing what people want.',
    outcome: 'Evidence from someone who is not your friend.',
  },
  {
    n: 5,
    step: 'Demand',
    title: 'Find your channel, ship it',
    brief:
      'Nineteen channels exist. One of them is working for you right now. We test cheap, find the one, and put the live thing in front of it. Ugly but live beats perfect but imaginary.',
    outcome: 'A repeatable way to reach the person from week one.',
  },
  {
    n: 6,
    step: 'Build',
    title: 'You show the room',
    brief:
      'Two minutes on your feet. What problem, what you built, who it is for, what is next. The room that watches you is the room you keep afterwards.',
    outcome: 'The build told as a story — and the key to Founders’ Club.',
  },
];
