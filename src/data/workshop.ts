export const workshopInfo = {
  title: "Vibe Coding 0 → 1",
  subtitle: "From Problem to Prototype in 4 Hours",
  date: "Thursday, June 4, 2026",
  time: "17:30 — 21:30",
  venue: "Helsinki XR Center, 3rd Floor, Hämeentie 135 A",
  coHosts: ["Ahmed Ezzat", "Bambi Dang", "Jussi Salonen"],
  organization: "AI Collective Finland",
  spots: "Limited spots — 50% already booked",
};

export type SectionSlide = {
  title: string;
  notes: string;
};

export type Section = {
  id: number;
  time: string;
  color: string;
  theoryTitle: string;
  theoryDuration: string;
  brief: string;
  outcome: string;
  buildTitle: string;
  buildDuration: string;
  buildPrompt: string;
  slides: SectionSlide[];
};

export const sections: Section[] = [
  {
    id: 1,
    time: "17:30",
    color: "bg-accent-yellow",
    theoryTitle: "What Is Entrepreneurship?",
    theoryDuration: "10 min",
    brief:
      "Technology alone is not enough — you need vision. Engineers can build, artists can imagine. With AI removing the execution barrier, the entrepreneurial mindset is about choosing the right problem, not writing code. A startup searches for a scalable model. A business owner optimizes an existing one. Same person, different question.",
    outcome: "You'll scout for a problem you genuinely understand and care about — then define the persona you'll build for.",
    buildTitle: "Find Your Problem",
    buildDuration: "30 min",
    buildPrompt:
      "List 3 problems you've personally experienced. For each, write down who specifically feels this pain. Pick the ONE problem you understand best. Define it precisely: [Who] feels [what pain] because [why].",
    slides: [
      {
        title: "Technology Married With the Liberal Arts",
        notes:
          "Steve Jobs: \"It's in Apple's DNA that technology alone is not enough. It's technology married with the liberal arts, married with the humanities, that yields us the result that makes our heart sing.\"\n\n\"Part of what made the Macintosh great was that the people working on it were musicians, poets, and artists...\"\n\nWhy did Apple hire musicians, poets, artists? Because engineers can build, but artists can imagine.",
      },
      {
        title: "AI Can't Write Good Will Hunting",
        notes:
          "Ben Affleck quote. AI can imitate patterns but can't create meaningful new work from lived experience. Same for your startup: AI can generate code, but it can't decide what problem is worth solving. Vibe coding = you bring the vision, AI brings the execution.",
      },
      {
        title: "What Is a Startup?",
        notes:
          "Three definitions. Steve Blank: search for a repeatable scalable model. Paul Graham: designed to grow fast. Peter Thiel: going from 0 to 1, not 1 to n. That's why this workshop is called 0 → 1.",
      },
      {
        title: "Business Owner vs. Entrepreneur",
        notes:
          "The key distinction. A business owner optimizes an existing system. An entrepreneur searches for a new one. Consultant = hours × rate. Startup = problem × scale. Same person, different question.",
      },
      {
        title: "Same Person, Different Question",
        notes:
          "Akadeemy story. Started as consulting — time for money. The shift: stopped asking 'How can I get more clients?' and started asking 'What problem do ALL these students share?' Built a platform. $120K ARR in 2 months, 11K members, zero hourly dependency.",
      },
      {
        title: "Alignment Is Everything",
        notes:
          "If you're working with someone — agree on the problem first. Not the app, not the features, not the design. The problem. At the beginning, alignment is all you have.",
      },
      {
        title: "Permissionless Leverage",
        notes:
          "Naval Ravikant: code and media are permissionless leverage. Before AI, you needed a developer — that's permissioned leverage. With vibe coding, AI is your leverage. But the leverage only works if you know what problem you're solving. That's why we started with entrepreneurship, not coding.",
      },
    ],
  },
  {
    id: 2,
    time: "18:10",
    color: "bg-accent-purple",
    theoryTitle: "Offer Design",
    theoryDuration: "10 min",
    brief:
      "A startup offer is not an idea — it's a specific promise to a specific person. Who is this for? What pain does it solve? What result do they want? The value equation: big outcome + believable result + less time + less friction.",
    outcome: "You'll have a written offer statement that a stranger can understand in 10 seconds.",
    buildTitle: "Craft Your Offer Statement",
    buildDuration: "30 min",
    buildPrompt:
      "Fill in the offer template: We help [specific person] solve [specific problem] by giving them [solution] so they can [desired result] without [common frustration]. Write it so a stranger understands it in 10 seconds.",
    slides: [
      {
        title: "The Value Equation",
        notes: "From Alex Hormozi's $100M Offers. Value = Dream Outcome × Perceived Likelihood ÷ (Time Delay × Effort and Sacrifice). The four levers you can pull to make any offer more valuable.",
      },
      {
        title: "The Grand Slam Offer",
        notes: "A Grand Slam Offer is an offer so good that people feel stupid saying no. You don't compete on price — you compete on value. Stack value on all four dimensions simultaneously.",
      },
      {
        title: "Pick a Starving Crowd",
        notes: "The right market is more important than the right offer. A mediocre offer to a starving crowd beats a brilliant offer to a market that doesn't care.",
      },
      {
        title: "The 19 Traction Channels",
        notes: "From Traction by Gabriel Weinberg. Most startups fail from lack of traction, not product failure. There are 19 channels to get customers. The key is finding the ONE that works right now.",
      },
      {
        title: "The Bullseye Framework",
        notes: "From Traction. Three rings: inner ring (1-2 channels moving the needle now), middle ring (3-4 promising), outer ring (everything else). Test cheap, focus on the inner ring, double down when one works.",
      },
      {
        title: "The 50/50 Rule",
        notes: "Spend 50% of your time on product and 50% on traction. The Product Trap — believing customers will just come if you build something good — is the #1 killer of startups.",
      },
    ],
  },
  {
    id: 3,
    time: "18:50",
    color: "bg-accent-blue",
    theoryTitle: "What Is Vibe Coding?",
    theoryDuration: "10 min",
    brief:
      "Vibe coding is not magic. It's a skill. The most important part is how you communicate with the AI. Vague prompts = vague results. Specific prompts = specific results. 5 skills: think in steps, give context, break into modules, test after each change, debug calmly.",
    outcome: "You'll understand how to write effective prompts and start building your landing page.",
    buildTitle: "Build Your Landing Page",
    buildDuration: "30 min",
    buildPrompt:
      "Use your offer statement as the prompt. Build a landing page on Bolt or Lovable. Include hero section, value proposition, email capture, and CTA.",
    slides: [
      {
        title: "Vibe Coding Is Not Magic",
        notes: "Bad prompt: 'Build me a startup app for students.' Good prompt: 'Build a clean landing page for international students in Finland looking for startup jobs. Include hero, value proposition, email capture, three benefit cards, and a CTA.' The difference is specificity.",
      },
      {
        title: "5 Core Skills",
        notes: "1. Think in steps. 2. Give context. 3. Break into modules. 4. Test after each change. 5. Debug calmly. These are what separate people who succeed with vibe coding from those who get frustrated.",
      },
      {
        title: "3 Tools, One Choice",
        notes: "Bolt for quick prototypes. Lovable for beautiful apps (recommended). Replit for full-stack. Start with Bolt or Lovable — ship first, optimize later.",
      },
    ],
  },
  {
    id: 4,
    time: "19:30",
    color: "bg-accent-green",
    theoryTitle: "Validation Thinking",
    theoryDuration: "10 min",
    brief:
      "A prototype is not validation. Likes are not proof. 'Cool' is not a business model. The first goal is not scale — it's signal. The validation ladder: Can I explain the pain? Do real people say it matters? Will they give me signal? What behavior proves interest?",
    outcome: "You'll add validation to your prototype — email capture, waitlist, or feedback form.",
    buildTitle: "Add Validation to Your Prototype",
    buildDuration: "30 min",
    buildPrompt:
      "Add an email capture, waitlist, or feedback form to your landing page. Make it easy for visitors to give you signal.",
    slides: [
      {
        title: "Don't Confuse Building With Demand",
        notes: "This is the most important concept in the entire workshop. A prototype is not validation. Likes are not proof. 'Cool' is not a business model. The first goal is not scale — it's signal.",
      },
      {
        title: "The Validation Ladder",
        notes: "1. Can I explain the pain clearly? 2. Do real people say this matters? 3. Will they give time, email, intro, meeting, or money? 4. What behavior proves interest? Each rung is harder but more meaningful.",
      },
      {
        title: "6 Validation Actions",
        notes: "5 customer interviews. 20 targeted messages. A landing page with signups. A waitlist. A demo to community. A pilot offer. The cheapest test wins.",
      },
    ],
  },
  {
    id: 5,
    time: "20:10",
    color: "bg-accent-yellow",
    theoryTitle: "Ship & Iterate",
    theoryDuration: "10 min",
    brief:
      "Ugly but live beats perfect but imaginary. Publish now, improve based on real feedback. A live link is already progress. The people who win are the ones who ship fast, learn from real users, and iterate.",
    outcome: "You'll deploy your page, share the link, and get at least one person to look at it.",
    buildTitle: "Ship It. Improve It.",
    buildDuration: "30 min",
    buildPrompt:
      "Deploy your page. Share the link with someone next to you or on your phone. Get 1 person to look at it. Improve based on what they say.",
    slides: [
      {
        title: "Ugly But Live Beats Perfect But Imaginary",
        notes: "Ship fast. Learn from real feedback. A live link is already progress. You can't iterate on something that doesn't exist.",
      },
      {
        title: "The 7-Day Action Plan",
        notes: "1. Show your prototype to 1 person tomorrow. 2. Improve 1 thing based on their feedback. 3. Take 1 action in the next 48 hours. 4. Run 5 customer interviews this week. 5. Set up a landing page with email capture. 6. Share what you built on LinkedIn. 7. Join the AI Collective community.",
      },
    ],
  },
];

export const pitchBlock = {
  time: "20:50",
  duration: "30 min",
  title: "Pitch (Optional)",
  description:
    "Whoever wants to represent what they've built — come to the stage. 2 minutes each. Tell the story: what problem, what you built, who it's for, what's next.",
};

export const tools = [
  {
    name: "Bolt",
    ease: "⭐⭐⭐⭐",
    easeLabel: "Fast & Simple",
    best: "Quick Prototypes",
    color: "bg-accent-yellow",
    desc: "Lightning-fast prototype generation. Best for landing pages and quick MVPs.",
    features: ["Instant generation", "Clean output", "One-click deploy"],
    url: "https://bolt.new",
  },
  {
    name: "Lovable",
    ease: "⭐⭐⭐⭐⭐",
    easeLabel: "Easiest",
    best: "Beautiful Apps",
    color: "bg-accent-purple",
    recommended: true,
    desc: "Visual builder with auto database setup. Perfect for polished MVPs and full apps.",
    features: ["Click-to-edit", "Auto Supabase", "One-click deploy"],
    url: "https://lovable.dev",
  },
  {
    name: "Replit Agent",
    ease: "⭐⭐⭐",
    easeLabel: "Most Powerful",
    best: "Full-Stack Apps",
    color: "bg-accent-blue",
    desc: "Complete development environment with databases and backend. For more complex projects.",
    features: ["Full environment", "Databases included", "Community templates"],
    url: "https://replit.com",
  },
];