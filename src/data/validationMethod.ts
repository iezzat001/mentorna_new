/**
 * The Evidence-Driven Validation Method — content for /validate.
 *
 * Source: Validation_Method_Landing_Page_Brief.docx. The brief is explicit
 * that nothing here may be embellished: no invented statistics, testimonials,
 * client logos or results, and no promise that following the method produces a
 * sale. The first sale is described as an initial validation signal, not proof
 * of product-market fit — see CLOSING_CAVEAT.
 *
 * Copy is split pre-gate / post-gate. Everything above the email form makes
 * the method tangible; the survey question set, the design principles and the
 * checklist are what the email actually buys.
 */

/* ── Pre-gate ─────────────────────────────────────────────────────────── */

/** The failure mode the method exists to prevent. */
export const FAILURE_MODES = [
  'Building a product before knowing whether the problem is real and painful.',
  "Relying on your own assumptions about the customer instead of their account of it.",
  'Reading likes, comments and compliments as if they were purchases.',
  'Asking people to design your product instead of describing their problem.',
  "Writing marketing language instead of using the customer's language.",
  'Setting a price with no evidence about pain, existing spend, or perceived value.',
];

/** The loop, as the brief's suggested visual model orders it. */
export const LOOP_STEPS = [
  'Persona',
  'Problem content',
  'Low-friction survey',
  'Customer evidence',
  'Offer',
  'Price',
  'Same persona',
  'Response and objections',
  'Iterate',
  'First sale',
];

export const LOOP_CAPTION =
  'The goal is not to prove your idea is good. The goal is to discover what the market will actually respond to — and eventually pay for.';

export type MethodStep = {
  n: string;
  title: string;
  body: string;
  /** The one thing you hold at the end of the step. */
  output: string;
};

export const METHOD_STEPS: MethodStep[] = [
  {
    n: '01',
    title: "Understand the problem in the customer's own words",
    body: "The first step is not proving your solution is right. It is describing the customer's problem as accurately as they would. Capture their wording and their framing — the moment you paraphrase it into your own language, you have started guessing again.",
    output: 'The problem, written the way the person with it would write it.',
  },
  {
    n: '02',
    title: 'Put the problem in front of the persona',
    body: 'Make one piece of content for the persona you think has this problem. Describe the problem, what you have found out about it so far, how people currently cope, and what it costs to leave it alone. End by inviting them into the survey, not by selling.',
    output: 'One piece of content that earns the right to ask questions.',
  },
  {
    n: '03',
    title: 'Run a low-friction survey',
    body: 'Multiple choice, ratings and yes/no, so answering costs almost nothing. You are not collecting demographics for their own sake. You are measuring how severe the problem is, how badly they want it solved, what they already do about it, and what it costs them in time and money.',
    output: 'Structured evidence, plus their exact phrasing to reuse.',
  },
  {
    n: '04',
    title: 'Turn the evidence into an offer',
    body: "Read the patterns. Build the offer out of what they actually said: their words for the problem, the pains that came up repeatedly, the outcome described the way they described it. Set price against the severity of the problem and what they already spend on it.",
    output: 'An offer written in the market’s language, not yours.',
  },
  {
    n: '05',
    title: 'Test it with the same persona, then iterate',
    body: 'Go back to the same people. Watch what happens: questions, confusion, objections, price pushback, interest without action, or a purchase. If they do not understand the problem, the messaging is wrong. If they understand it and still say no, the offer, positioning or price may be — the product does not always have to change.',
    output: 'A reason to change something specific, rather than everything.',
  },
];

/** The brief asks for a progression, not a claim that all signals are equal. */
export const EVIDENCE_LADDER = [
  { rung: 'Problem awareness', q: 'Do they recognise the problem?' },
  { rung: 'Pain', q: 'How severe is it?' },
  { rung: 'Desire', q: 'How badly do they want it solved?' },
  { rung: 'Current behaviour', q: 'Are they already trying to solve it?' },
  { rung: 'Cost', q: 'Does it consume time or money?' },
  { rung: 'Desired outcome', q: 'What does solved look like to them?' },
  { rung: 'Offer response', q: 'How do they react to a concrete offer?' },
  { rung: 'Payment', q: 'Has someone actually paid?' },
];

/* ── Post-gate: what the email actually buys ──────────────────────────── */

export type SurveyQuestion = {
  section: string;
  question: string;
  type: string;
  why: string;
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  { section: 'Contact', question: 'Name', type: 'Short input', why: 'Identify the respondent and personalise follow-up.' },
  { section: 'Contact', question: 'Email', type: 'Email input', why: 'Primary access and follow-up channel.' },
  { section: 'Contact', question: 'WhatsApp', type: 'Phone input', why: 'Optional direct channel.' },
  { section: 'Profile', question: 'Which age group are you in?', type: 'Multiple choice', why: 'Basic segmentation.' },
  { section: 'Profile', question: 'What is your background, area of study or work?', type: 'Multiple choice', why: 'Understand persona and context.' },
  { section: 'Pain', question: 'How painful is this problem for you?', type: '1–5 rating', why: 'Measures perceived severity.' },
  { section: 'Urgency', question: 'How much do you want to solve this problem?', type: '1–5 rating', why: 'Measures desire and urgency.' },
  { section: 'Current behaviour', question: 'Are you currently solving this problem in some way?', type: 'Yes / No', why: 'Tests whether the problem drives action.' },
  { section: 'Current behaviour', question: 'If yes, how are you solving it right now?', type: 'Choices + optional text', why: 'Reveals the alternatives you compete with.' },
  { section: 'Cost', question: 'Does this problem cost you time?', type: 'Yes / No', why: 'Identifies time impact.' },
  { section: 'Cost', question: 'Does this problem cost you money?', type: 'Yes / No', why: 'Identifies financial impact.' },
  { section: 'Cost', question: 'Roughly how much time or money does it cost?', type: 'Ranges', why: 'Quantifies impact without a long answer.' },
  { section: 'Desired outcome', question: 'If this problem were solved, what would you be happy to have as the result?', type: 'Open-ended', why: "Captures the outcome in their own words." },
];

export const SURVEY_PRINCIPLES = [
  'Make the easy questions easy. Buttons, radio choices, ratings, yes/no.',
  'Keep open-ended questions at the bottom, once effort has already been low.',
  'Ask about the problem, current behaviour, consequences and desired outcome — not whether your idea is good.',
  'Avoid leading questions that imply the answer you are hoping for.',
  'Preserve exact wording. Their language is the raw material for the offer.',
  'Do not read high stated interest as a purchase. Look for behaviour.',
];

/** What is packaged behind the email gate. */
export const METHOD_ASSETS = [
  'Validation framework overview',
  'Problem-validation checklist',
  'Problem-focused content template',
  'Low-friction survey template',
  'Customer-language capture sheet',
  'Pain and urgency analysis worksheet',
  'Current-solution and time/money cost worksheet',
  'Desired-outcome extraction worksheet',
  'Offer-building template built from survey language',
  'Pricing hypothesis worksheet',
  'Offer-testing checklist',
  'Objection and feedback log',
  'Iteration decision sheet',
  'First-sale validation checklist',
];

/** Required by the brief: the first sale is a milestone, not proof of scale. */
export const CLOSING_CAVEAT =
  'A first sale is the signal this method is built around. It is not, on its own, proof of product-market fit, repeatability, retention or a sustainable business. Those are later questions. Treat it as the first concrete milestone, not a finish line.';
