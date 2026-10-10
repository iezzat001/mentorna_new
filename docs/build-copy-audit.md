# /build — copy audit

**Page:** https://www.mentorna.com/build (`src/pages/Build.tsx`, `src/data/cohortWeeks.ts`)
**Reference:** https://ghareeb.school/ (same audience, different offer)
**Date:** 2026-10-09
**Companion docs:**
- `docs/build-section-audit.md`: design, contrast and structure.
- `docs/build-enhancement-plan.md`: the build plan for the coding agent.

**Summary**

| | Today | After this rewrite |
|---|---|---|
| Words on the page (hero + main, measured) | **~2,025** | **~1,250** (−38%) |
| Sections (including hero) | 18 | 13 |
| Names for the AI | 3 ("AI workers", "agents", "AI teammates") | 1 ("AI") |
| Uses of "not" | 33 | 15 |
| Places the club "for life" is restated | 9 | 4 (trust strip, week 6, the club section, the price list) |

**The core finding: short is not the same as simple.** Today's sentences average 11.5 words, so a readability score would call the page easy. It is not, because the meaning is compressed into fragments, metaphors and insider words that the reader has to decode. Ghareeb's sentences are longer but literal: every one has a subject, a verb and a plain benefit. The rewrite below does both. It uses fewer sentences and makes each one literal.

---

## 1. Who reads this page

- **Professionals with 10+ years in one field:** accounting, law, HR, design, logistics, operations. Not technical.
- **Many are reading in their second language.** The page's own code shows it: the main video was re-cut with Arabic subtitles (`Build.tsx:535–541`), and Ahmed confirms the audience overlaps with Ghareeb's, which is Arabic-first.
- For a second-language reader, the costly words are not the long ones. They are:
  - **idioms:** "no ground under it", "hit the same wall", "the door out"
  - **metaphors:** "the room", "the key", "the ceiling"
  - **fragments that drop the verb:** "One person. One pain."
  - **negations that leave the reader to guess the positive:** "Not a deck."

---

## 2. What Ghareeb's language does (and why it works for this audience)

Arabic quotes are from the live page, with an English gloss.

| # | Pattern | Example | Why it works |
|---|---|---|---|
| G1 | **Headings ask the reader's own question** | "لمن هذا الكورس؟" (Who is this course for?) · "لماذا يفشل معظم الناس مع الذكاء الاصطناعي؟" (Why do most people fail with AI?) · "كيف يعمل الكورس" (How the course works) | The reader knows what the section answers before reading it. |
| G2 | **The audience is named in everyday categories** | "للموظفين والمدراء وأصحاب الأعمال الحرة والطلاب" (For employees, managers, freelancers and students) | People find themselves in a list. Nobody calls themselves a "domain expert". |
| G3 | **A short label, then one plain sentence** | "محتوى بلا أساس" (Content without a foundation) → "Everyone gives you tools and ready prompts without explaining how they connect." | The label is scannable. The sentence removes any doubt. |
| G4 | **Benefits written as "you will…" outcomes** | "تستخدم أي أداة ذكاء اصطناعي بثقة" (You use any AI tool with confidence) | It describes the reader after the course, not the course's features. |
| G5 | **Numbers as digits, with time attached** | "خلال 7 أيام" (within 7 days) · "28+ درس" (28+ lessons) · "+1M" | Digits are read faster than words, in any language. |
| G6 | **One risk-reversal sentence, repeated word for word** | "استرد المبلغ بالكامل خلال ٧ أيام إذا كنت غير سعيد بمحتوى الدورة" (Full refund within 7 days if you are unhappy with the course) | The same sentence every time reads as a promise, not as copy. |
| G7 | **The words the audience already uses** | "Prompt", "Token", "Claude" are kept in English, as readers meet them. No internal framework names. Module titles are literal ("Understand AI before you rely on it") | Nothing has to be learned before the page makes sense. |

**Do not copy:**

- the countdown and "first 50" urgency
- the inflated "real value" price stack
- seven identical CTA blocks; Mentorna's selective framing needs fewer

---

## 3. What makes /build hard to read

| # | Pattern | Count / examples from the live page | Cost |
|---|---|---|---|
| M1 | **Fragments with no verb** | ~35 sentences of 3 words or fewer: "One person. One pain." · "Live. Real people." · "Six weeks. One move each." · "Problem. Promise. Demand. Build." | The reader rebuilds the sentence. In a second language, they often rebuild it wrong. |
| M2 | **Aphorisms and riddles** | "Strangers are not kind." · "Live and ugly beats perfect and imaginary." · "A room worth being in has to be a room that is hard to get into." · "You walk in empty." · "Anyone who needs this is nobody." | They sound wise but have to be decoded. The point arrives late, or not at all. |
| M3 | **Metaphors used as names** | "room" ×10 (it means class, group or club) · "the key" ×3 · "the door out" · "the ceiling" · "ship" ×6 · "show the room" | One word means three things, and none of them is the word's ordinary meaning. |
| M4 | **Insider vocabulary** | "Validate the promise / demand" ×6 · "signal" · "channel" ×4 · "agents" · "domain expert" · "version one" · "a deck" · "the stack" | These are startup words. The reader is an accountant. |
| M5 | **Three names for one thing** | "AI workers" ×5 · "agents" ×3 · "AI teammates" ×2 | The reader wonders whether these are three different things. |
| M6 | **Negation instead of a statement** | "not" ×33 on one page · "Not a deck." ×2 · "No call. No pitch." · "Not theory." · "not notes" · "Not the free community." | Each one makes the reader infer the positive. |
| M7 | **Same fact, many times** | Club "for life" ×9 · "ten seats" ×7 · money-back ×3 · "Nineteen channels" verbatim ×2 · "live, in the room. Not a deck." verbatim ×2 (full matrix: section audit §3.6) | Length without information. It is the main reason the page is ~2,000 words. |
| M8 | **Meta copy about the page itself** | "Watch this first" · "Two and a half minutes. See if this is for you." · "This is what it looks like." · "Answers to the questions that come up most." · "Who it is for. What happens in the room. What you keep after." | Words spent describing the page instead of the offer. |
| M9 | **Promise and proof that do not match** | The page promises "a live product" and "a business", but week 3 delivers "a landing page" · Three of the six quotes come from high-school students, on a page for 10+-year professionals | Readers notice. Trust drops at exactly the point the page asks for it. |

**What already works and must stay:**

- **Ahmed's first-person voice** ("I read every one myself").
- **The honest devices:** "Most answers are no", "Some of that exists now. Some I am still building."
- **The hero headline**, which is the A/B winner.
- **The concrete numbers:** $10,000+, 1,500 startups, $1.1M.
- **The gate**, which shows the four questions before the click.

Ghareeb has none of the honesty devices. They are Mentorna's edge; they only need plainer words.

---

## 4. House rules for the new copy

1. **One idea per sentence, and every sentence has a verb.** Fragments only for labels (card titles, chips).
2. **Use the reader's words, not the founder's.** Use the word list below.
3. **Every heading says what the section answers.** Use a question or a plain label, 8 words at most.
4. **One subhead line under each heading**, saying what the reader gets from the section (G3).
5. **Write outcomes as "you…".** "You leave with one clear offer," not "Offer design workshop."
6. **Use digits for numbers:** 6 weeks, 10 seats, 3 hours, 2 sessions.
7. **One "not" per section at most.** Say the positive.
8. **Say each fact once, where it matters.** Three things repeat by design: the money-back line (next to each CTA), "10 seats" (the eyebrow, the price list and the gate), and the club, once as a teaser (trust strip), once in full (its section) and once as a deliverable (week 6, the price list).
9. **One name for the AI: "AI".** If a noun is needed, "AI tools".
10. **Keep the honesty.** Simplify the words; never soften a "no".

### Word list

| Instead of | Write |
|---|---|
| domain expert | professional with 10+ years in one field |
| validate the problem / promise / demand | find the problem / write the offer / test with real buyers |
| AI workers, agents, AI teammates | AI |
| ship | launch, put live |
| the room (class) | the class, the group |
| the room (club) / keep the key / for life | Founders' Club / lifetime access |
| the door out | (cut; explain directly) |
| signal | real answers from buyers |
| channel | where your buyers are |
| version one | your first version |
| a deck | slides |
| show the room | present to the group |
| equity | ownership |
| exited twice | sold 2 startups *(Ahmed to confirm both exits were sales)* |
| See if I'd take you | **Check if I qualify** (keeps the ask-first intent from commit `6d5483d`, in plainer words) |

---

## 5. Copy deck: final strings, in the new page order

How to read this section:

- Each block is the **complete** text for one section. If a string is not in the block, it is removed from the page.
- `→` marks the constant or element it goes into.
- `[hl]…[/hl]` marks the one highlighted phrase per heading (accent colour, see the plan).
- Word counts compare the live section(s) with this block.

### 0. Hero: 64 → 59 words (now includes the button label)

```text
Eyebrow → hero <p> :1220: Cohort 2 · Starts mid-October · Live online · 6 weeks · 10 seats
H1 line 1 → HERO_A.headline[0] (unchanged, A/B winner): You spent 15 years getting good at your job.
H1 line 2 → HERO_A.headline[1] (unchanged, highlighted): [hl]AI just changed the job.[/hl]
Subhead → HERO_A.subhead (single line now): In 6 weeks, turn what you know into a product, and test it with real buyers.
Note → HERO_A.note: AI writes the code. You tell it what to build.
Button → CTA_LABEL: Check if I qualify
Under button → hero <p> :1257: Opens WhatsApp. 4 short questions.
```

*Why:*
- The subhead promised "a business", which the six weeks do not deliver. A tested product is honest and still strong.
- "A team of AI workers builds it with you" became the plain note.

### 1. Trust strip: 32 → 35 words

```text
Card 1 (img /method/money.webp) — title: $10,000+ — text: Earned by a past student, @_therealsigma.
Card 2 (img /method/guarantee.webp) — title: Money back — text: Try 2 sessions. Not for you? Full refund.
Card 3 (img /method/handshake.webp) — title: Hands-on — text: You build in every session, with me.
Card 4 (img /method/infinity.webp) — title: Lifetime club — text: Keep learning with the group after week 6.
```

*Why:* lead with the strongest proof ($10,000+), and replace the vague "Yours forever" with a concrete benefit.

### 2. Why now + video: 128 → 78 words (merges "Why now" and "Watch this first")

```text
Eyebrow: Why now
H2: One expert with AI can now do the work of a [hl]whole team[/hl].
P1: Andrew Ng, a leading AI teacher, asks why we have "10x engineers" but no "10x accountants." His answer: in most jobs, one person can only work so fast.
Big line: AI removes that limit.
P2: The winners will be people who know one field deeply. That is you.
Source: Source: Andrew Ng, "How AI Can Make You a 10x Professional," DeepLearning.AI
Caption under the video: How the program works · 2½ minutes
```

*Cut:*
- "Watch this first"
- "How the 0→1 Framework works."
- "Two and a half minutes. See if this is for you."
- "The people who win are not the ones who learn the tools…" (the reader gets the point)
- "That is what these six weeks are for."

### 3. Common mistakes: 141 → 108 words (includes the new CTA row line)

```text
Eyebrow: Common mistakes
H2: Why most good ideas [hl]never launch[/hl]
Subhead: 5 mistakes. Most people make at least one.
01 — You start with the tech — You choose tools before anyone wants the product.
02 — You keep it secret — You hide it, so nobody can tell you it is wrong.
03 — You build for everyone — A product for everyone sells to no one.
04 — You wait for a quiet month — You plan to start when work is calmer. It never is.
05 — You think you are too late — Tools take weeks to learn. Your experience took years.
Closing line: How many of these are you making right now?
CTA row line: Money back after 2 sessions if it is not for you.
```

*Cut:*
- Old 03, "You add too much" (decision: five, not six).
- "Can I help you?"

*Fixed:*
- F1 (the subhead said five, the list had six).
- F3: no "15 years" here any more.

### 4. Who this is for: 127 → 96 words

```text
Eyebrow: Who this is for
H2: Professionals with [hl]10+ years[/hl] in one field
Chips: Accounting · Law · HR · Design · Logistics · Operations
Body: You already know your field. That is the hard part. We teach the rest: how to sell, and how to build with AI.
Card — No idea yet — We help you find one worth building.
Card — One idea — We help you take the first step.
Card — Too many ideas — We test them and keep the best one.
Inset title: Not for you if
Inset — You want to watch, not build.
Inset — You want someone to build it for you.
Inset — You cannot give 3 hours a week.
```

*Cut:*
- "That is the entry requirement."
- "Deep knowledge in"
- "Most founders do not. They have an idea and no ground under it."
- FAQ #3, which repeated the three cards.

### 5. Your teacher: 77 → 58 words

```text
Eyebrow: Your teacher
H2: Ahmed Ezzat
Role line: Founder, AI engineer and teacher
Bio 1: I have built and sold startups. I have also failed many times, so I know which steps matter.
Bio 2: I do not lecture. I open my laptop and build next to you.
Stat — $5M+ — Value of startups I built
Stat — $1.1M — Money raised
Stat — 2 — Startups sold
Marquee label: Where I have worked and taught
```

*Cut:*
- The prose numbers (they are the stats).
- The org list in the bio (it is the marquee).
- The pipe title "Founder | AI/ML Engineer | Entrepreneur | Mentorship".
- "Ten years teaching… Now ten people at a time."

### 6. What people say: 176 → 121 words (includes the 3 kept quotes)

```text
Eyebrow: From past workshops
H2: What [hl]people say[/hl]
Subhead: This program is built on the same method as these workshops.
Clip labels: Mo · Karla · Inside a class (90 seconds)
Quote cards (data unchanged, show only these ids): 1 Matti Tuominen · 3 Loan Cindy Tran · 4 Bambi Dang
Screenshots: show 4 of the 8 (Ahmed to pick; default = the first 4)
CTA row line: Money back after 2 sessions if it is not for you.
```

*Cut:*
- Rudransh, Sneh and Lily from this page. Two are high-school students; Lily's quote has no detail. They stay on `/testimonials`.
- "People who sat in the room".
- "See the class / This is what it looks like / 90 seconds. Real people. A real room." The class clip moves here.

### 7. How the 6 weeks work: Framework 133 + What changes 106 + Weeks ~150 = 389 → 189 words (three sections become one)

```text
Eyebrow: The 0→1 Framework
H2: How the [hl]6 weeks[/hl] work
Subhead: 4 steps, in this order. You test with buyers before you build, so you do not waste money.

Step 1 — Find the problem — Week 1
  Week 1 — Pick a problem you know well, and name the person who has it.
  You leave with: One problem, in one sentence.

Step 2 — Write the offer — Week 2
  Week 2 — Write one offer that a stranger understands in 10 seconds.
  You leave with: An offer you have tested on strangers.

Step 3 — Test with real buyers — Weeks 3–5
  Week 3 — Build your landing page — AI builds your landing page in class, live on the web.
  Week 4 — Talk to buyers — 5 interviews, 20 messages and 1 sign-up form.
  Week 5 — Reach your buyers — Find where your buyers already are, and reach them.
  You leave with: Proof that people want it, and a way to reach them.

Step 4 — Build and launch — Week 6
  Week 6 — Launch your first version, and present it to the group and an investor.
  You leave with: A live first version, and your place in Founders' Club.

(Weeks 1, 2 and 6 have no title of their own: the step name is the title. Weeks 3–5 keep short titles because they share one step.)

CTA row line: Money back after 2 sessions if it is not for you.
```

*Fixed:*
- **F4.** Week 3 is now tagged Demand (decision), so "build comes last" is true.
- **F6.** The promise is now "a landing page" in week 3 and "a first version" in week 6; "a business" is gone.
- The "Nineteen channels" and "Not a deck" duplicates are gone.

*Cut entirely:* "What changes in six weeks". Its four points are now the "You leave with" lines.

**Ahmed to confirm:** week 6 now says "Launch your first version". Today's week-6 text is only the pitch.

### 8. Guest experts: 79 → 80 words (adds a real heading, removes the badge)

```text
Eyebrow: Guest experts
H2: 3 experts, [hl]1 live session[/hl] each
Card — Marketing — Marina Yurchenko — Head of Marketing, Slush — She runs marketing for one of the world's biggest startup events. She shows you how to turn attention into buyers.
Card — Funding — Petri Saarinen — Co-founder, iLab Ventures — He has worked with 1,500 startups. He shows you what investors want to hear first.
Card — Growth — Anton Suomalainen — Area Growth Manager, Greenstep — He shows you how to keep your money and accounting simple, so you can focus on building.
```

*Cut:*
- The "Confirmed" badge on all three.
- "Each one runs a live session on what they do best — marketing, funding, and growth." (the H2 now says it).

**Ahmed to supply:** which week each guest teaches. Show it as a "Week N" badge once known.

### 9. Founders' Club: 132 → 101 words

```text
Eyebrow: After the 6 weeks
H2: Founders' Club
Subhead: When the program ends, you stay in a private group. For life.
Photo stamp: Lifetime member
Card — Private — Only for people who finished the program.
Card — Direct access — You can still message me after week 6.
Card — Peers — People who are building the same way you are.
Wide card title: Why only 10 seats
Wide card body: A small group is easier to trust. I am building this club so members can meet investors, get free AI credits, and hear about grants early. Some of it exists today, and some I am still building. Before you pay, I will tell you which is which.
```

*Cut:*
- "Six weeks is enough to ship. A company needs a room after that."
- "Everyone who finishes walks in and keeps the key."
- "The room stays open after week six."
- "They stayed. So can you."
- "The door out" (the title now says what the card explains).

### 10. Price: 109 → 92 words

```text
Section heading (h2, eyebrow style): Price
Price: $425
Line: One seat. 6 live online weeks. Starts mid-October.
Guarantee badge title: Money-back guarantee
Guarantee badge text: Join the first 2 sessions. If it is not for you, you get every dollar back. No questions.
List title: What you get
1: 6 live sessions, 3 hours each, with 10 people
2: Recordings of every session, yours to keep
3: The 0→1 Framework and all its templates
4: The prompts, tools and slides we use
5: 3 guest sessions: marketing, funding and growth
6: Lifetime access to Founders' Club
7: Direct messages with me
Status under the button → COHORT_STATUS: Cohort 1 is closed. Cohort 2 is open.
```

*Cut:*
- The double label ("The offer" + "3. How much does it cost?").
- "Week 6: you show the room" (it is in the schedule).
- "(September) has officially closed".

### 11. FAQ: 270 → 113 words (11 questions → 6)

```text
H2: Questions
Q: I am not technical. Can I do this? — A: Yes. You explain what you want in plain words. AI writes the code.
Q: Can I do this with a full-time job? — A: Yes. It is 3 hours a week, outside work hours.
Q: Do I give up any ownership? — A: No. You own everything you build.
Q: Will I get funding? — A: Not from me. In week 6 you meet an investor who has worked with 1,500 startups.
Q: I am 45. Am I too old? — A: No. Tools are easy to learn. Experience is not, and you have it.
Q: Can I use this in my current job? — A: Yes. Working with AI helps in your own business and in your job.
```

*Cut:*
- The "FAQ" chip, the long H2 and the subhead.
- Five questions answered elsewhere on the page:
  - "What if I have no idea?" (Who this is for)
  - "What if I miss a session?" (What you get #2)
  - "What happens when the six weeks end?" (Founders' Club)
  - "What if it is not for me?" (money-back)
  - "How do I get in?" (How to apply)

### 12. How to apply (the closer): Gate 148 + Final CTA 40 = 188 → 121 words

```text
Eyebrow: How to apply
H2: I choose 10 people. [hl]Most who apply are not a fit yet.[/hl]
Body: I read every message myself. Send me 4 answers on WhatsApp:
Q1 → GATE_QUESTIONS[0]: What do you do, and for how many years?
Q2 → GATE_QUESTIONS[1]: What is one problem in your work that you would fix with software?
Q3 → GATE_QUESTIONS[2]: What have you tried with AI, and where did it stop helping?
Q4 → GATE_QUESTIONS[3]: Why now, and not in January?
After 1: I reply within a day.
After 2: If it is a yes, I send you the details and you decide. No sales call.
After 3: If it is a no, I tell you why. I also send you the workshop recording and a 90-day plan.
Button → CTA_LABEL: Check if I qualify
Link line: Not ready? Send "details" on WhatsApp for the full program.
```

The WhatsApp prefill (`APPLY_MESSAGE`) must match the four questions:

```text
Hi Ahmed, I want to apply for Cohort 2 (mid-October).

1) What I do, and for how many years:

2) One problem in my work I would fix with software:

3) What I have tried with AI, and where it stopped helping:

4) Why now, and not January:
```

*Fixed:* F2 ("nine people" → 10).

*Cut:*
- "You are probably not one of them" (kept as a softer, truthful line).
- The whole Final CTA band: "Ten seats. Mid-October." / "Cohort 1 is closed…" Its one unique element, the "details" link, moves here.

---

## 6. Totals

| # | Section | Words before | Words after |
|---|---|---|---|
| 0 | Hero | 64 | 59 |
| 1 | Trust strip | 32 | 35 |
| 2 | Why now + video (was 2 sections) | 128 | 78 |
| — | See the class (moved into 6) | 15 | — |
| 3 | Common mistakes | 141 | 108 |
| 4 | Who this is for | 127 | 96 |
| 5 | Your teacher | 77 | 58 |
| 6 | What people say | 176 | 121 |
| 7 | How the 6 weeks work (was 3 sections) | ~389 | 189 |
| 8 | Guest experts | 79 | 80 |
| 9 | Founders' Club | 132 | 101 |
| 10 | Price | 109 | 92 |
| 11 | FAQ | 270 | 113 |
| 12 | How to apply (was 2 sections) | 188 | 121 |
| | **Total** | **~2,025** | **~1,250 (−38%)** |

Measured by script: "before" from the live page's text, "after" from the deck blocks with the labels (Eyebrow:, Card —, etc.) removed. "After" includes the three kept quotes and the new CTA-row lines, so it is slightly generous. The biggest savings come from cutting repetition, not from squeezing sentences: the merged method section (−200), the FAQ (−157) and the merged closer (−67).

---

## 7. Facts the rewrite asserts — Ahmed to confirm before launch

1. **"Startups sold" / "I have built and sold startups":** both exits were sales.
2. **Week 6, "Launch your first version":** the curriculum includes launching, not only presenting.
3. **"Earned by a past student":** @_therealsigma was a student of the program or workshop.
4. **The FAQ says "In week 6 you meet an investor":** Petri's session is in week 6. Also supply the weeks for Marina and Anton.
5. **"Most who apply are not a fit yet":** still true for Cohort 2 applications.
6. **The CTA label "Check if I qualify":** keeps the ask-first intent from commit `6d5483d`, replacing "See if I'd take you".
