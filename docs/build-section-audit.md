# /build — section-by-section audit

**Page:** https://www.mentorna.com/build (`src/pages/Build.tsx`, `src/data/cohortWeeks.ts`)
**Reference:** https://ghareeb.school/
**Date:** 2026-10-09
**Live page = this branch:** the production text matches `Build.tsx` at `eadbd16`, so every line number below points at what visitors see.

**The two complaints, confirmed and measured:**

1. **Pale, no contrast between sections.** Every light section sits on the same cream gradient. Every heading is weight 300. Body text is drawn at 55–75% opacity. All five accent colours fall below 3:1 on the cream, so the colour the page relies on for rhythm barely shows. Between Proof and Guests there are **~5,000px of unbroken cream on desktop (6.5 screens) and ~6,500px on a phone (8 screens).**
2. **Redundant information.** The same facts are restated 3–9 times. The method arc is told three times in a row (Framework → What changes → Week by week). Five of the eleven FAQs repeat answers already given higher up the page.

There are also six factual inconsistencies, and the page contradicts itself in at least one of them (§3.5). Fix those first; they cost minutes.

---

## 1. Method

- Read all 2,416 lines of `Build.tsx` and the data files it imports.
- Measured the live page in a browser at 1024×768 and 375×812: section tops and heights, computed font weights, text colours with their alpha, and the background each section sits on.
- Computed WCAG contrast ratios for every text style against the background it actually renders on (alpha blended onto cream `#F3E0CB` or dark `#16110F`).
- Did the same for ghareeb.school: band colours, heading weights, accent and button colours, section order.

Thresholds: WCAG AA is **4.5:1** for normal text, **3:1** for large text (≥24px, or ≥18.66px bold). The project's own `docs/guides/DESIGN_SYSTEM.md` sets "High contrast" as a core principle and requires "All text maintains WCAG AA compliance (4.5:1 minimum)". `/build` currently breaks that rule in 13 text styles (tables 3.2 and 3.3, plus the price).

---

## 2. What ghareeb.school actually does

This is the most useful finding. **Ghareeb is not high-contrast because of its backgrounds.** It alternates pure white with a pale blue `#F1F8FD`, which is only **1.07:1**: even flatter than Mentorna's cream-to-ivory step (1.26:1). The contrast comes from five other things, and every one of them transfers:

| Ghareeb does | Measured | Mentorna /build today |
|---|---|---|
| Heavy headings | H2 weight **700–800**, 42–48px, `#1A1A1A` | H2 weight **300** on every section, 36–60px |
| Solid body text | `#1A1A1A` / `#363535`, 18px, weight 400 | `#1A1A1A` at **55–75% alpha**, 15–17px, weight 300 |
| One saturated brand accent, used on words | Blue `#3860C0` highlights a keyword in each headline and the step numbers; **5.83:1** on white | Five accents (amber, purple, cyan, teal, coral) used as 7px dots and 11px labels; **1.46–3.81:1** on cream |
| Figure/ground through cards | White cards with a border and shadow on the tinted bands. Almost every section is framed content, not loose text | Mostly loose text on cream. Cards appear only in Proof, FAQ, Price and the Club "door" |
| Repeated CTA plus risk reversal | Green button and "full refund within 7 days" after **11 sections**, plus a sticky top bar holding the offer and a button | **4** apply buttons. None between the hero and the price: **~15,000px (≈19 screens)** on desktop, **~18,800px (≈23 screens)** on a phone |
| One section, one job, one component type | Testimonial cards → numbered problems → module timeline → quiz → instructor card with stat badge → numbered "for whom" → 3 steps → outcome grid → **Before/After** → bonus cards → student video → guarantee → value stack → FAQ. No two neighbours share a layout | VSL and "See the class" are identical layouts back to back. Framework, What changes and Weeks are three numbered lists back to back |

**Do not copy:**

- **The countdown and "first 50 subscribers" urgency.** It contradicts the honest, selective framing the page is built on (the Alif-style cohort status, the "most answers are no" gate).
- **White text on the green `#16C183` button.** It is only 2.34:1 and fails AA.
- **The value stack with inflated "real value" prices.** A $425 hand-picked cohort loses credibility with that move.
- **Background alternation on its own.** It barely works for them either (1.07:1). The cards and type do the work.

---

## 3. Page-wide findings

### 3.1 Typography: everything is weight 300

Every `h2` on the page (13 of them) computes to `font-weight: 300`, and so does almost all body copy. Plus Jakarta Sans at 300 is a hairline face. At 15–17px on a light warm background, that is the main reason the page reads as "pale" even where the colour contrast technically passes. The font is already loaded at 300–800 (`DESIGN_SYSTEM.md` line 51), so this costs nothing to change.

### 3.2 Text contrast on cream (`#F3E0CB`)

| Style on the page | Where | Ratio | AA |
|---|---|---|---|
| Ink 100% | headings | 13.54 | ✅ |
| Ink /80 | Club subhead, What-you-get items | 7.80 | ✅ |
| Ink /75 | most body copy | 6.66 | ✅ |
| Ink /70 | Fit paths, Club beats, Door, captions | 5.69 | ✅ |
| Ink /65 | Weeks intro, Price paragraph | 4.87 | ✅ (barely) |
| Ink /60 | **Eyebrows (11px)**, step numbers, cohort status | 4.19 | ❌ |
| Ink /55 | Testimonial roles, week labels, icon credit | 3.62 | ❌ |
| Ink /45 | "Deep knowledge in", Andrew Ng citation, week labels | 2.74 | ❌ |
| `#C4893A` tan | Section numbers 01/02/03 (Fit, What changes, Club) | 2.34 | ❌ |
| `#B4691E` | What-you-get numbers | 3.28 (4.13 on ivory) | ❌ |
| AMBER `hsl(38,95%,58%)` | Week "Problem" tag, eyebrow dot | **1.46** | ❌ |
| TEAL `hsl(160,70%,45%)` | Week "Build" tag | **1.76** | ❌ |
| CYAN `hsl(196,85%,52%)` | Week "Demand" tag | **1.84** | ❌ |
| CORAL `hsl(18,80%,63%)` | eyebrow dot | 2.06 | ❌ |
| PURPLE `hsl(262,70%,60%)` | Week "Promise" tag, spine nodes | 3.81 | ❌ (small text) |

**Root cause:** the accents were tuned for the dark sections, where they glow (amber is 10:1 on `#16110F`), and then reused unchanged on cream, where they disappear.

### 3.3 Text contrast on the dark bands (`#16110F`)

| Style | Where | Ratio | AA |
|---|---|---|---|
| Cream /85–/100 | headings, guest punchlines, gate questions | 11.5–15.7 | ✅ |
| Cream /55 | Failure descriptions, Instructor bio | 5.37 | ✅ (but reads dim) |
| Cream /50 | stat labels, guest credentials | 4.64 | ✅ (barely) |
| Cream /45 | **Eyebrows**: "1. Can I help you?", "Who runs it", "How you get in", "Guest experts…" | 3.98 | ❌ |
| Cream /40 | "Companies I worked with" | 3.40 | ❌ |

### 3.4 Surface rhythm: the actual map

Measured section tops and heights. **C** = cream gradient, **I** = ivory `#FFFCFA`, **D** = dark.

| # | Section | Surface | Desktop h | Phone h |
|---|---|---|---|---|
| 0 | Hero | D (film) | 140vh | 140vh |
| 1 | Trust ribbon | C | 198 | 359 |
| 2 | Why now (Ceiling) | C | 634 | 739 |
| 3 | Watch this first (VSL) | C | 621 | 385 |
| 4 | See the class | C | 842 | 802 |
| 5 | Why the idea is still an idea | D ember | 1,464 | 1,441 |
| 6 | Who this is for | C | 1,007 | 1,324 |
| 7 | Who runs it + marquee | D | 1,725 | 1,942 |
| 8 | People who sat in the room | C | 1,996 | 2,092 |
| 9 | The 0→1 Framework | C | 1,420 | 1,579 |
| 10 | What changes in six weeks | C | 659 | 924 |
| 11 | Week by week | C | 814 | 1,884 |
| 12 | Guest experts | D aubergine | 892 | 2,049 |
| 13 | Founders' Club | C | 1,479 | 1,672 |
| 14 | Price | I | 755 | 1,248 |
| 15 | Gate | D ember | 1,055 | 1,152 |
| 16 | FAQ | C | 1,308 | 1,186 |
| 17 | Final CTA | D | 579 | 483 |

Total height: **19,278px desktop, 23,052px phone.**

**Unbroken light runs** (the "pale" feeling is mostly these):

| Run | Sections | Desktop | Phone |
|---|---|---|---|
| A | 1–4 | ~2,390px (3.1 screens) | ~2,350px (2.9 screens) |
| B | 8–11 | **~4,980px (6.5 screens)** | **~6,540px (8 screens)** |
| C | 13–14 | ~2,430px (3.2 screens) | ~3,050px (3.8 screens) |

The ivory price band does not break run C. Ivory against cream is **1.26:1**, and the gradient itself already varies 1.14:1 from top to bottom, so the eye sees the same surface.

**The dark bands do not vary either.** All five sit on the same near-black base (`#0C0A0B`–`#16110F`). Instructor (`Build.tsx:1620`) and Final CTA (`:2359`) use the identical gradient string. Gate (`:2249`) and the Fit "Skip this if" card (`:1578`) share another one. The page is binary, cream or black, with no mid-tone surface anywhere.

### 3.5 Factual inconsistencies (fix first)

| # | Problem | Where |
|---|---|---|
| F1 | Subtitle says **"Five places people get stuck"**, but the list has **six** items (the code comment also still says "THE 5 FAILURES") | `Build.tsx:1486`, list `:227–258`, comment `:1446` |
| F2 | Gate says **"choosing nine people"**. Every other mention says ten | `:2268` vs `:54`, `:1220`, `:2181`, `:2259`, `:2375` |
| F3 | Hero and Failure 06 say **15 years**; Fit says **"10 years or more"** | `:565`, `:256` vs `:1544` |
| F4 | Framework says **"Build comes last for a reason"**, but the schedule tags **week 3 as Build**, before the two Demand weeks. The desktop orbit shows the tag on week 3, so a reader can see the contradiction | `:1773` vs `cohortWeeks.ts:42` |
| F5 | The same agents are called **"AI workers"** in six places and **"AI teammates"** once | `:290` |
| F6 | The promised output is a **"live product"** (What changes 02, Final CTA) in one place and a **"landing page"** (week 3 outcome) in another | `:308`, `:2378` vs `cohortWeeks.ts:46` |

**Compliance item:** the comment at `Build.tsx:260–261` says the thiings.co 3D icons are "personal-use only; Mentorna.com needs their Indie commercial license before launch." The page is live with those icons (Trust, Framework, Weeks). **Confirm the licence was bought**, or swap the icons.

### 3.6 Redundancy matrix

Each row is one claim. The cells show where it appears.

| Claim | Appearances | Where |
|---|---|---|
| The club continues after week 6, for life | **9** | Trust #2 `:82` · What changes #04 `:318` · Week 6 outcome `cohortWeeks.ts` · Club subhead `:2068` · Club "Lifetime" card `:2092` · card caption `:2096` · Club beat 02 `:411` · Included #6 `:329` · FAQ #5 `:507` |
| Ten seats / ten people | **7** (+1 "nine") | hero eyebrow `:1220` · bio `:137` · price `:2181` · Included #1 `:324` · Club door `:427` · gate `:2259` · final `:2375` |
| "Pick one person, one problem" | **5** | Failure 04 `:246` · Framework 01 `:266` · What changes 01 `:303` · Week 1 · Week 2 |
| You do not code; AI workers build | **5** | hero note `:570` · Framework 04 `:290` · What changes 02 `:308` · Week 3 · FAQ #1 `:491` |
| "Live, in the room. Not a deck." | **2, verbatim** | Framework 04 `:290` · Week 3 `cohortWeeks.ts:45` |
| "Nineteen channels exist. One is working for you" | **2, verbatim** | What changes 03 `:313` · Week 5 `cohortWeeks.ts:61` |
| Money back after two sessions | **3** | Trust #1 `:75` · Price `:2186` · FAQ #6 `:511` |
| Recordings yours forever | **3** | Trust #2 `:82` · Included #2 `:325` · FAQ #4 `:503` |
| "If it's a no: recorded workshop + 90-day plan" | **2, verbatim** | Gate `:2296` · FAQ #7 `:515` |
| "I read every one myself" | **3** | hero `:1257` · gate `:2269` · FAQ #7 `:515` |
| No idea / one idea / too many ideas | **2** | Fit paths `:464–480` · FAQ #3 `:499` |
| Cohort 1 closed, Cohort 2 open | **3** | hero eyebrow · price `:59` · final `:2380` |
| $5M / $1.1M / 2 exits | **2** (deliberate, per the comment at `:131`) | bio prose `:135` · STATS `:141` |
| Slush, Antler, Helsinki XR | **2** | bio `:137` · marquee `:148` |
| "You are the domain expert" persona | **4** | hero `:565` · Ceiling `:1387` · Failure 06 `:256` · Fit `:1533–1549` |
| The method arc itself | **3 consecutive sections** | Framework (4 steps) → What changes (4 shifts) → Week by week (6 weeks) |

Repetition across a long page is not wrong by default. A reader who skips needs the guarantee again near the price. The problem is repetition **inside one section** (the Club says "for life" four ways), **verbatim** repeats, and **three neighbouring sections telling one story**.

### 3.7 CTA distribution

| | Ghareeb | Mentorna /build |
|---|---|---|
| Buttons | 11 inline + sticky top bar | 4 (hero, price, gate, final) |
| Longest gap without a button | ~1 section | **hero → price: ~15,000px desktop, ~18,800px phone** |
| Nav "Apply" | in the sticky bar, always visible | in the hero only; gone once the cream slides over it |
| Button styles | 1 | 3 (white pill on dark, ink pill on light, cream pill on dark), plus an unused "brutal" variant |

---

## 4. Section-by-section audit

Verdicts: **KEEP** (light touch) · **REWORK** (same job, new treatment) · **MERGE** (fold into a neighbour) · **CUT**.

### 0. Hero: `Build.tsx:1083–1307`

- **Job:** name the reader and the promise; one button.
- **Surface:** dark film with an ember grade. Not part of the pale problem.
- **Contrast:**
  - The eyebrow (white/55, 11px) and the note (white/60) sit over the bright middle of the video. They pass on the dark grade, but the video's luminance varies by frame.
  - The heading is weight 300 at 58px on dark, which is acceptable.
- **Redundancy:**
  - The eyebrow carries cohort, date, format, length and seats. Every one of these is repeated later.
  - "Four questions. I read every one myself." returns in the Gate and the FAQ.
- **Ghareeb parallel:** an audience pill above the headline; one keyword in the headline in brand blue ("الذكاء الاصطناعي", "7 أيام").
- **Verdict: KEEP.**
- **Changes:**
  - Highlight one phrase in the H1 with the accent, Ghareeb-style. For example "AI just changed the job." in amber: amber is 10:1 on the dark, so it works there.
  - Raise the H1 to weight 400.
  - Add a slim **sticky bar** that appears once the hero scrolls out: "Cohort 2 · mid-October · 10 seats" plus the button. No countdown.

### 1. Trust ribbon: `:1317–1356` (data `:72–98`)

- **Job:** four proofs under the fold.
- **Surface:** cream, loose items with no frame.
- **Contrast:** the label `k` is weight 300; the value text is /75 (passes).
- **Redundancy:**
  - "Money-back" is said three times on the page.
  - "Yours forever… and the club" repeats the Club section.
  - "Hands-on" repeats the bio.
  - Only **$10,000+ made by @_therealsigma** is unique, and it is the strongest of the four, yet it sits third.
- **Ghareeb parallel:** the first block after the hero is a framed price card, then four framed testimonial cards.
- **Verdict: REWORK.**
- **Changes:**
  - Put the four items in **white cards** (`bg-white`, `ring-1 ring-[#1c100e]/10`, a soft shadow). This alone gives the cream a figure/ground.
  - Lead with $10,000+.
  - Replace "Yours forever" with a proof the page lacks. Options: "6 live sessions", "Cohort 1 shipped", or the Matti Tuominen quote as a one-liner.
  - Labels to weight 500.

### 2. Why now (The Ceiling): `:1358–1398`

- **Job:** the persona hook (Andrew Ng's "10x professional").
- **Surface:** cream, ~5 paragraphs of prose.
- **Contrast:** body /75 passes; the **citation /45 fails (2.74)**; headings are weight 300.
- **Redundancy:**
  - "who already know something deeply, and now have a team that can build" repeats Fit's "you already have the hardest part".
  - "That is what these six weeks are for" is a soft bridge with no new information.
- **Verdict: MERGE with section 3.**
- **Changes:**
  - Cut the prose to three beats: Ng's observation → "AI removes that limit." (keep it as the large line) → "That is you."
  - Raise the citation to /70.
  - Let the VSL follow directly as the payoff, under one heading.

### 3. Watch this first (VSL): `:1400–1420`

- **Job:** the 2½-minute explainer.
- **Surface:** cream; the same layout as section 4.
- **Contrast:** caption /70 passes.
- **Redundancy:** none in the content. The problem is structural: two video sections back to back with identical framing (eyebrow → one line → player → caption).
- **Verdict: MERGE** into section 2, as described there.

### 4. See the class: `:1422–1443`

- **Job:** a 90-second portrait clip of the room.
- **Verdict: MERGE into Proof (section 8).**
- **Why:** this clip is evidence, not explanation. Its caption says so: "Real people. A real room." Moving it removes the double-video stack and shortens run A by ~840px.

### 5. Why the idea is still an idea (Failures): `:1446–1524`

- **Job:** confrontation; the reader recognises themselves. **The strongest section on the page.**
- **Surface:** ember radial. The one dark band with its own colour.
- **Contrast:**
  - The descriptions at /55 pass at 5.37 but read dim.
  - The **eyebrow /45 fails (3.98)**.
  - The amber numbers glow (10:1).
- **Redundancy:**
  - Failure 04 ("pick one person") becomes Framework 01 / Week 1. That is fine: problem, then fix.
  - Failure 06 repeats the hero persona.
- **Bugs:**
  - F1: says "five", lists six.
  - The eyebrow "1. Can I help you?" starts a numbered-question sequence at the sixth section, and the "3." ends up inside an H2 (see section 14).
- **Ghareeb parallel:** "Why do most people fail with AI?", four numbered cards, then a CTA and the guarantee line.
- **Verdict: KEEP.**
- **Changes:**
  - Fix to "Six places…", or cut to five.
  - Descriptions to /75; eyebrow to /65.
  - Keep the closing question "How many of these are you doing right now?" and **put the first mid-page CTA directly under it**: a button plus "Four questions on WhatsApp. Money back after session two."
  - Either drop the numbered-question eyebrows, or apply them consistently (see 3.5).

### 6. Who this is for (Fit): `:1527–1605`

- **Job:** self-qualification.
- **Surface:** cream with loose text; the "Skip this if" card is dark (same gradient as the Gate).
- **Contrast:**
  - **"Deep knowledge in" /45 fails (2.74).**
  - **Path numbers `#C4893A` fail (2.34).**
  - Path descriptions /70 pass.
- **Redundancy:**
  - The three paths are repeated as FAQ #3.
  - "10 years or more" conflicts with the hero's 15 (F3).
  - The opening two paragraphs repeat the Ceiling.
- **Ghareeb parallel:** "Who is this course for?", four numbered **white cards** on the tinted band.
- **Verdict: REWORK.**
- **Changes:**
  - Turn the fields (Accounting · Law · HR…) into chips: white pills with an ink border.
  - Make the three paths **white cards** with an ink-amber number (`#8B5904`, 4.6:1).
  - Keep the dark "Skip this if" inset. It is good contrast inside a light section; give it its own gradient so it stops matching the Gate.
  - Delete FAQ #3.
  - Pick one number of years, 10 or 15, and use it everywhere.

### 7. Who runs it (Instructor + marquee): `:1608–1744`

- **Job:** authority.
- **Surface:** dark. **The gradient is identical to the Final CTA's.**
- **Contrast:**
  - Bio /55 passes but reads dim.
  - Stat labels /50 pass barely (4.64).
  - **The eyebrow /45 (3.98) and the marquee label /40 (3.40) fail.**
- **Redundancy:**
  - The bio states $5M / $1.1M / two exits in prose, then STATS repeats them as figures. The comment says this is deliberate; on a page this long it reads as filler.
  - The bio's "Slush, Antler, Helsinki XR Center" repeats the marquee directly below.
  - "Founder | AI/ML Engineer | Entrepreneur | Mentorship" reads as a LinkedIn headline, not a sentence.
- **Ghareeb parallel:** a photo with **one huge stat badge** overlapping it ("+1M learners"), three short beats, then a CTA.
- **Verdict: KEEP, tighten.**
- **Changes:**
  - Keep STATS. Cut the numbers from bio paragraph 1, keeping "I have also failed enough times to know which parts actually matter."
  - Cut the org list from bio paragraph 3, since the marquee shows it.
  - Move the $5M+ figure onto the photo as a badge.
  - Replace the pipe title with one plain line.
  - Bio to /75; labels to /65.

### 8. People who sat in the room (Proof): `:1747–1760`, component `:893–968`

- **Job:** social proof.
- **Surface:** cream. 1,996px desktop, 2,092px phone. **Opens the longest cream run.**
- **Contrast:**
  - Cards are `bg-white/70`. On cream, 70% white melts into the background.
  - **Roles /55 fail (3.62).**
  - Source pills /65 pass.
- **Content:** 2 selfie clips, then 8 chat screenshots, then 6 quote cards. Three formats stacked, all on cream.
- **Ghareeb parallel:** proof appears **twice**. Creator testimonial cards come right after the price (early); student chats and a video come near the end.
- **Verdict: REWORK + SPLIT.**
- **Changes:**
  - Pull the **3 strongest quotes** up to just after Why now / VSL as solid white cards: Matti Tuominen ("most interesting workshop… in 40 years"), Loan Cindy Tran ("walked away with a live landing page"), Bambi Dang.
  - Keep the rest here: Mo and Karla, the class clip moved in from section 4, and the remaining quotes.
  - Cap the screenshots at 4, or put them in a horizontal scroller.
  - Cards to solid `bg-white`; roles to /70.

### 9. The 0→1 Framework: `:1762–1863`

- **Job:** the IP: Problem → Promise → Demand → Build.
- **Surface:** cream, airy. The 3D icons and the dashed spine are lovely but low-ink.
- **Contrast:**
  - **Step numbers /60 at 11px fail (4.19).**
  - Purple spine nodes are 3.81 (decorative, which is fine).
  - Headings are weight 300.
- **Redundancy / conflict:**
  - **F4.** "Build comes last" vs week 3 = Build.
  - "live, in the room. Not a deck." is repeated verbatim in Week 3.
  - This is the first of three back-to-back tellings of the arc.
- **Compliance:** thiings.co licence (3.5).
- **Verdict: MERGE with Week by week (section 11)** into one "Framework × Weeks" section, on a **signature surface** (see §5).
- **Shape:** the four steps become the columns or rows, and each step lists the weeks that belong to it, e.g. Problem → Week 1, Promise → Week 2. That turns the `STEP_COLOR` link the code already builds into the layout, instead of hiding it in 11px tags. **Resolve F4 before this merge**, because the merge makes it unmissable. Two options:
  - Re-tag week 3 as "Demand", since the landing page is the demand test.
  - Change the framework copy to say the build happens in two passes.

### 10. What changes in six weeks: `:1865–1896` (data `:299–320`)

- **Job:** the transformation.
- **Surface:** cream, a loose 2×2 grid.
- **Contrast:** **numbers `#C4893A` fail (2.34)**; weight 300.
- **Redundancy:** every item restates another section:
  - 01 = Framework 01 + Week 1.
  - 02 = Week 3 (and F6).
  - 03 = Week 5, **verbatim**.
  - 04 = Founders' Club.
- **Ghareeb parallel:** **"How will your use of AI change?"**, a two-column **Before (✕, grey)** / **After (✓, blue)** block.
- **Verdict: CUT as written → replace with Before / After.**
- **Changes:** two white cards side by side.
  - Before: "You have 15 years of judgment and no way to ship." · "You start with the tool." · "You wait for work to calm down."
  - After: "A live URL." · "Proof from a stranger." · "One channel that works." · "A room that stays."
  - This states the outcome without restating the schedule, and it adds the one layout the page lacks: a side-by-side comparison.

### 11. Week by week: `:1899–1980` (data `cohortWeeks.ts`)

- **Job:** the schedule.
- **Surface:** cream. Desktop shows the orbit; phones get a list that is 1,884px tall.
- **Contrast:**
  - **Step tags fail badly:** amber "Problem" 1.46, teal "Build" 1.76, cyan "Demand" 1.84, purple "Promise" 3.81.
  - **Week labels /45–/55 fail.**
- **Usability:** on desktop the orbit shows only titles until a node is clicked, so the schedule itself is hidden behind an interaction.
- **Verdict: MERGE into section 9** as described there.
- **If kept separate:**
  - Darken the tags to the text variants in §6 (each 4.5:1 or better).
  - On desktop, show the list beside the orbit, not instead of it.

### 12. Guest experts: `:1982–2051`

- **Job:** borrowed authority (Slush, iLab, Greenstep).
- **Surface:** aubergine `#120C10` with a purple glow. **The best-differentiated dark band.**
- **Contrast:**
  - Credentials /50 pass barely (4.64).
  - **The eyebrow /45 fails (3.98).**
  - Topic labels `#D4A574` at 10px pass on dark (8.4).
- **Redundancy:** Included #5 lists the same three topics. FAQ #9 ("a VC who has seen 1,500 startups") repeats Petri's card.
- **Verdict: KEEP.**
- **Changes:**
  - Now that all three are confirmed, the "Confirmed" badge on every card is noise. Replace it with **which week** each guest runs (concrete and new information).
  - Eyebrow to /65; credentials to /65.

### 13. Founders' Club: `:2053–2138`

- **Job:** what happens after week 6.
- **Surface:** cream, with an ivory "door" card (1.26:1 against the cream, so the card edge is barely visible).
- **Contrast:**
  - **Beat numbers `#C4893A` fail (2.34).**
  - Body /70 passes.
  - The headline is weight 300 at 60px.
- **Redundancy, the worst on the page:**
  - Within this one section, "for life" is said four ways: "keeps the key. For life." `:2068` · "Lifetime" `:2092` · "The room stays open after week six." `:2096` · beat 02 "After week six. After that too." `:411`.
  - It is said five more times elsewhere (3.6).
- **Verdict: REWORK.**
- **Changes:**
  - Keep the photo with the "Lifetime" stamp as the single statement of permanence.
  - Cut the subhead sentence and the photo caption.
  - Make the three beats white cards.
  - Keep "The door out", which carries the only genuinely new information (why ten; what exists today versus what is still being built).
  - Remove the Club line from Trust (section 1) and What changes (cut anyway). Remove FAQ #5.

### 14. Price + What you get: `:2140–2236`

- **Job:** the number, the guarantee, the button.
- **Surface:** ivory `#FFFCFA`, full-bleed. **Visually the same as the cream** (1.26:1), so it does not register as a moment.
- **Contrast:**
  - **The $425 itself is an amber → tan → coral gradient on ivory: 1.83 / 2.94 / 2.60.** At 120px it needs 3:1 to pass, and it fails across most of the glyph. The single most important number on the page is the lowest-contrast large text on it.
  - What-you-get numbers `#B4691E` 4.13 (fail at 11px).
  - Paragraph /65 passes barely.
- **Redundancy:**
  - The eyebrow "The offer" and the H2 "3. How much does it cost?" label the section twice.
  - The money-back paragraph is the third telling.
  - The cohort-status line is repeated by the Final CTA.
- **Ghareeb parallel:** a framed price card with strikethrough, a guarantee badge, then the button.
- **Verdict: REWORK.**
- **Changes:**
  - Give this section a **real surface** (see §5).
  - Set **$425 in solid ink**, or in the signature colour if that colour passes 3:1 on the chosen band.
  - Show the guarantee as a **badge**, not a paragraph: "Money back after session two. No conversation."
  - Use one label: either the eyebrow or the numbered H2.
  - What-you-get numbers to `#8B5904`.

### 15. How you get in (Gate): `:2238–2308`

- **Job:** qualification. The four questions, shown before the button.
- **Surface:** ember dark.
- **Contrast:**
  - Questions at /90 are excellent.
  - **The eyebrow /45 fails (3.98).**
  - Body /65 passes.
- **Bug:** **F2** ("nine people").
- **Redundancy:** "If it is a no…" is verbatim FAQ #7; "I read every message myself" is said three times.
- **Verdict: KEEP, and move it to the end of the page.** It is a stronger closer than the current Final CTA.
- **Changes:**
  - Absorb the Final CTA's one unique asset, the low-friction **"Reply 'details' and I send the doc. No call."** link (`:2394–2404`), and put it under the button.
  - Delete FAQ #7.

### 16. FAQ: `:2311–2348` (data `:488–533`)

- **Job:** remaining objections.
- **Surface:** cream with `#FFFDF7` rows (1.26:1 against the cream, saved by the border).
- **Contrast:** answers /75 pass; the chip /75 passes.
- **Redundancy: 5 of 11 answers repeat on-page content:**
  - #3 "no idea" = Fit
  - #4 "miss a session" = Included #2
  - #5 "after six weeks" = Club
  - #6 "not for me" = Trust + Price
  - #7 "how do I get in" = Gate
- The subhead "Who it is for. What happens in the room. What you keep after." adds nothing.
- **Ghareeb parallel:** 4 questions.
- **Verdict: REWORK, and move it above the Gate.**
- **Changes:**
  - Keep the six that answer **new** objections: not technical · full-time job · equity · funding · "I am 45" · use it at my current job.
  - Optionally keep "miss a session" as a one-liner.
  - Drop the subhead.
  - Rows to solid white.

### 17. Final CTA: `:2351–2408`

- **Job:** the last push.
- **Surface:** dark, **the identical gradient to Instructor.**
- **Redundancy:** "Ten seats. Mid-October." and "Cohort 1 is closed. Cohort 2 is open." both repeat the price section. The only unique element is the "details" link.
- **Verdict: CUT; its details link moves into the Gate (section 15).**

---

## 5. Proposed running order and surfaces

Four surfaces with defined roles, replacing today's binary of cream or black:

| Surface | Value | Role | Text on it |
|---|---|---|---|
| **Cream** | `#F7E9D6` → `#EFDAC2` (unchanged) | reading surface | ink /85 body, ink 100 headings |
| **Card** | `#FFFFFF`, `ring-1` ink/10, soft shadow | anything listable sits in a card on cream (Ghareeb's main device) | as cream |
| **Ink** | `#0C0A0B`–`#16110F`, **one gradient per section, no duplicates** | Ahmed's voice and confrontation | cream /80 body, /65 labels |
| **Signature** (new, used at most twice) | Option A **deep purple `#4B2A8C`**: cream text 8.75:1, 8.1:1 against the cream page, 1.9:1 against ink, so it reads as neither. Option B **terracotta `#8A3A1C`**: cream text 6.51:1, 6.0:1 against the cream page | the IP and the commitment | cream text, bright accents allowed |

Purple is recommended for the signature band. The framework already "owns" purple: its eyebrow and spine nodes use `PURPLE`.

| # | Section | Surface | Verdict | CTA row after |
|---|---|---|---|---|
| 0 | Hero | Ink (film) | KEEP | — (sticky bar appears after) |
| 1 | Trust: 4 cards, $10,000+ first | Cream + cards | REWORK | |
| 2 | Why now + VSL (merged) | Cream | MERGE | |
| 3 | 3 top quotes (from Proof) | Cream + cards | NEW (split) | ✅ |
| 4 | Six places people get stuck | Ink (ember) | KEEP | ✅ |
| 5 | Who this is for | Cream + cards + dark inset | REWORK | ✅ |
| 6 | Who runs it + marquee | Ink (new gradient) | KEEP | |
| 7 | The 0→1 Framework × the six weeks | **Signature** | MERGE | ✅ |
| 8 | Before → After | Cream + 2 cards | REPLACES "What changes" | |
| 9 | Guest experts | Ink (aubergine) | KEEP | |
| 10 | People who sat in the room (clips + class video + rest) | Cream + cards | REWORK | ✅ |
| 11 | Founders' Club | Cream + cards | REWORK | |
| 12 | Price + What you get | **Signature** (or ink with a white price card) | REWORK | ✅ (built in) |
| 13 | FAQ (6) | Cream + cards | REWORK | |
| 14 | How you get in (Gate) + "details" link | Ink (ember) | KEEP, closer | ✅ (built in) |

**Effect:**

- 18 sections become 15.
- The longest light run drops from ~4,980px to roughly one section plus cards (≈1,300px).
- No two dark sections share a gradient.
- An apply button appears at most about two sections away, everywhere.
- Estimated page height drops by ~3,000–4,000px on desktop, from merging 2+3+4, merging 9+10+11, cutting 17, and cutting 5 FAQs.

Mid-page CTA row (one component, reused): the button, plus one line: "Four questions on WhatsApp. Money back after session two." Same label as everywhere: "See if I'd take you".

---

## 6. Token fixes (apply page-wide)

| Token / pattern | Today | Change to | Result on cream |
|---|---|---|---|
| H2 weight | `font-light` (300) | `font-medium` (500) or `font-semibold` (600) | Ghareeb-level weight |
| H3 / card titles | 300 | 500 | |
| Body on cream | `/75`, `/70`, `/65` | **`/85`** (secondary `/80`) | 9.11 / 7.80 |
| Small labels / eyebrows on cream | `/60`, `/55`, `/45` | **`/70` minimum** | 5.69 |
| Body on ink | cream `/55` | cream **`/75`** | 9.09 (on `#16110F`) |
| Eyebrows on ink | cream `/45`, `/40` | cream **`/65`** | 7.07 (on `#16110F`) |
| Section numbers | `#C4893A` | `#8B5904` (amber-ink) | 4.60 |
| Week tag: Problem | AMBER | `#8B5904` | 4.60 |
| Week tag: Build | TEAL | `#147152` | 4.67 |
| Week tag: Demand | CYAN | `#0B6B8E` | 4.67 |
| Week tag: Promise | PURPLE | `#7A40DD` | 4.52 |
| Coral text on cream | CORAL | `#AE4213` | 4.54 |
| Testimonial / FAQ cards | `bg-white/70`, `#FFFDF7` | `bg-white` + `ring-1 ring-[#1c100e]/10` | figure/ground on cream |
| $425 | amber→coral gradient | solid ink, or signature colour that passes 3:1 | ≥ 3:1 large text |

Keep the bright accents (`AMBER`, `TEAL`…) for **fills, dots, icons and text on dark**. Add the `-INK` text variants next to them at `Build.tsx:34–38`. One highlighted keyword per H2 in the ink variant is the Ghareeb move: e.g. "Every job has a ceiling. AI just removed **yours**."

---

## 7. Priority order

**P0: copy and compliance bugs (minutes)**

1. F1: "Five places" → "Six places" (`:1486`).
2. F2: "nine people" → "ten" (`:2268`).
3. F3: one number of years, 10 or 15, everywhere.
4. F4: re-tag week 3, or reword "Build comes last".
5. F5 and F6: "AI workers" everywhere; decide "live product" vs "landing page".
6. Confirm the thiings.co commercial licence.

**P1: contrast system (one pass, no layout change)**

7. The token table in §6: heading weights, opacity floors, accent ink variants.
8. Solid white cards for Trust, Fit paths, quotes, Club beats and FAQ.
9. Fix the $425 contrast.
10. De-duplicate the dark gradients (Instructor ≠ Final, Gate ≠ Fit inset).

**P2: structure and redundancy**

11. Merge Why now + VSL; move "See the class" into Proof.
12. Merge Framework × Weeks onto the signature band; replace "What changes" with Before → After.
13. Split Proof: 3 quotes early, the rest after Guests.
14. Club: one statement of "lifetime".
15. FAQ to 6 and above the Gate; Gate becomes the closer with the "details" link; cut the Final CTA.
16. Mid-page CTA rows plus a sticky bar after the hero.

**P3: polish**

17. One highlighted keyword per H2.
18. A stat badge on Ahmed's photo.
19. Week labels on the guest cards.
20. Dead code (below).

---

## 8. Decisions (resolved 2026-10-09)

| # | Question | Decision |
|---|---|---|
| 1 | Signature band colour | **Deep purple `#4B2A8C`** (left to Claude; the framework already uses purple) |
| 2 | Six failures or five | **Five.** Cut 03 "You add too much", which overlaps 04 |
| 3 | Week 3 conflict (F4) | **Re-tag week 3 as Demand** |
| 4 | Years: 10 or 15 | Not answered. The copy audit keeps the A/B-approved hero line ("15 years") as the example and sets the requirement at **10+ years**, so the two no longer conflict. Failure 06 drops its number |
| 5 | Sticky bar after the hero | **No.** The mid-page CTA rows stay |
| 6 | Desktop orbit | **Retired** for a static step × week grid |

The copy follow-up and the build plan are in `docs/build-copy-audit.md` and `docs/build-enhancement-plan.md`. Where this audit and the plan differ, the plan is the later decision and wins: for example, it cuts "What changes" outright instead of replacing it with Before/After, and it reorders the dark bands.

---

## Appendix: dead code found during the audit

- `SECTION_ACCENTS` (`:41`) is never read, but the comment on `Eyebrow` (`:617`) says each cream section takes the next colour from it. Eyebrow colours are hardcoded per call. Either use it or delete it along with the comment.
- `ApplyButton`'s `'brutal'` tone (`:1069`) is the default but no call site uses it (every call passes `tone`). `brutal` (`:40`) only feeds that branch.
- `AHMED_PHOTOS[1..4]` (`:167–170`) are unused; only `[0]` renders.
- `HERO_B` / `HERO_B_SUBHEAD` are parked deliberately for the A/B test (`:977–984`). Leave them.
