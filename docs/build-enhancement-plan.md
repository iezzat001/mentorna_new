# /build enhancement plan — brief for the coding agent

**Goal:** make https://www.mentorna.com/build shorter, plainer and higher-contrast.

- 18 sections → 13.
- ~2,025 words → ~1,250.
- Every text style passes WCAG AA.
- No light stretch longer than one section.
- An apply button about every 2–3 sections.

**Files you will change:**
- `src/pages/Build.tsx` (the whole page, ~2,400 lines)
- `src/data/cohortWeeks.ts` (week data; only `Build.tsx` imports it)
- optionally delete `src/components/ui/radial-orbital-timeline.tsx`

**Sources of truth, in this order:**

1. **This plan:** structure, design and what to build.
2. **`docs/build-copy-audit.md` §5 (copy deck):** every user-facing string, verbatim. Do not rewrite copy. If a string you need is missing from the deck, stop and ask; do not invent one.
3. **`docs/build-section-audit.md`:** the measurements and reasoning behind this plan. Read it for context; where it and this plan differ, this plan wins.

**Baseline:** `npx eslint src/pages/Build.tsx src/data/cohortWeeks.ts` is clean and `npx tsc -p tsconfig.app.json --noEmit` reports 0 errors. Keep it that way.

---

## 0. Locked decisions (do not re-open)

| Decision | Value |
|---|---|
| Signature colour (new strong band) | Deep purple `#4B2A8C` |
| Failures | 5. The old 03 "You add too much" is removed |
| Week 3 | Re-tagged from `Build` to `Demand` |
| Years | Hero keeps "15 years" (the A/B winner); the requirement is "10+ years" |
| Sticky bar | **None.** Use inline CTA rows instead |
| Desktop orbit | **Retired.** Replace it with a static step × week grid on every viewport |
| CTA label | "Check if I qualify" (replaces "See if I'd take you") |

## 1. Do not touch

- **The hero A/B machinery:**
  - the `variant` state, `HERO_VARIANT_KEY` and the `?variant=` override
  - `HERO_B` / `HERO_B_SUBHEAD`, parked deliberately
  - `useHeroScroll`, `phase`, `getScrollParent` and `HeroFilm`
  - the sticky-hero scroll choreography and the `-mt-[36vh]` handoff
- **`Reveal` and every `prefers-reduced-motion` guard.**
- **Analytics event names and consent gating:**
  - event names `cohort_apply_click`, `hero_apply_click`, `hero_variant_view`
  - the `analyticsConsentGranted()` checks
- **`useSEO(...)`.** Ahmed asked to leave the description alone (commit `273b624`). Same for `index.html` and `defaultSEO`.
- **`src/data/testimonials.ts`.** Quotes stay verbatim; you only filter which ones render.
- **All video and image URLs**, and `Footer`.

## 2. Target page map

| # | Section (`id`) | Surface | Main components | CTA |
|---|---|---|---|---|
| 0 | Hero (header) | dark film (unchanged) | existing | hero button |
| 1 | Trust strip | cream | 4 × `Card` | — |
| 2 | Why now + video (`why-now`) | cream | prose + `VideoPlayer` (VSL) | — |
| 3 | Common mistakes (`mistakes`) | `INK_EMBER` | numbered list | `CtaRow` `mistakes` |
| 4 | Who this is for (`who`) | cream | chips + 3 × `Card` + dark inset | — |
| 5 | Your teacher (`who-runs-it`, keep the id) | `INK_SMOKE` | photo + stat badge, bio, 2 stats, fan carousel, marquee | — |
| 6 | What people say (`proof`) | cream | 3 clips + 3 quote `Card`s + 4 screenshots | `CtaRow` `proof` |
| 7 | How the 6 weeks work (`how-it-works`) | **`SIGNATURE`** | 4-column step × week grid | `CtaRow` `framework` |
| 8 | Guest experts (`guests`) | cream | 3 photo cards | — |
| 9 | Founders' Club (`club`) | `INK_FOREST` | photo + stamp, 3 cards, wide card | — |
| 10 | Price (`price`) | **`SIGNATURE`** | price, guarantee badge, What-you-get card | pricing button |
| 11 | FAQ (`faq`) | cream | 6 rows | — |
| 12 | How to apply (`apply`) | `INK_GATE` | questions + button + details link | gate button + details link |

**Removed:**

| Section | Where its content goes |
|---|---|
| "Watch this first" | merged into 2 |
| "See the class" | its clip moves to 6 |
| "The 0→1 Framework", "What changes in six weeks" and "Week by week" | merged into 7 ("What changes" is cut) |
| Final CTA | its "details" link moves to 12 |

**Surface sequence:** dark → cream → cream → ember → cream → smoke → cream → purple → cream → forest → purple → cream → ember.

- No two dark sections share a gradient.
- The only adjacent light pair is 1 → 2 (a short strip, then prose).

**Nav links** (hero `<nav>`, `Build.tsx:1170–1209`), left to right:

| Label | Target | Visible from |
|---|---|---|
| How it works | `#how-it-works` | `md` |
| Your teacher | `#who-runs-it` | `sm` |
| Price | `#price` | `md` |
| FAQ | `#faq` | `lg` |
| Apply | `#apply` (now the closing section) | always |

Delete the "Framework" link. Move `id="apply"` from the price section to the closing section.

---

## 3. Phase 1 — tokens and primitives

**Commit message:** "Add text-safe accents, surfaces and type for /build."

Put these next to the existing tokens (`Build.tsx:34–46`). Each one needs a one-line comment saying why; the file's style is to explain the reason, not the what.

### 3.1 Text-safe accents

The bright accents stay for fills, dots, icons and text on dark. They fail as text on cream (1.46–3.81:1).

```ts
/* Accent text on light surfaces. The bright accents above are 1.5–3.8:1 on
   cream and disappear as text; these are the same hues darkened to ≥4.5:1. */
const AMBER_INK = '#8B5904'; // 4.60:1 on #F3E0CB
const PURPLE_INK = '#7A40DD'; // 4.52:1
const CYAN_INK = '#0B6B8E'; // 4.67:1
const TEAL_INK = '#147152'; // 4.67:1
const CORAL_INK = '#AE4213'; // 4.54:1
```

### 3.2 Surfaces

One constant per dark band, and no string shared between sections. The lightest stop of `SIGNATURE_BG` is `#4B2A8C`; do not add a lighter stop where text sits, because cream at /65 drops below 4.5:1 on anything lighter.

```ts
const SIGNATURE_BG =
  'radial-gradient(ellipse 90% 60% at 50% 0%, #4B2A8C 0%, #3F2378 55%, #35206A 100%)';
const INK_EMBER = /* today's Failures gradient, Build.tsx:1456 */;
const INK_SMOKE = /* today's Instructor gradient, Build.tsx:1620 */;
const INK_GATE = /* today's Gate gradient, Build.tsx:2249 */;
const INK_FOREST =
  'radial-gradient(ellipse 90% 60% at 50% 0%, #1F3A2E 0%, #0F1A15 55%, #0A0F0C 100%)';
```

Measured on the darkest-text-relevant stop:

| Surface | Cream text | Cream /75 | Cream /65 | `AMBER` |
|---|---|---|---|---|
| Purple `#4B2A8C` | 8.75 | 5.63 | 4.63 | 5.59 |
| Forest `#1F3A2E` | 10.32 | 6.56 | 5.34 | 6.59 |

On purple, **do not** use `CYAN` (4.43) or `CORAL` (3.94) as small text. `STEP_COLOR` may be used there only for decorative bars and dots.

### 3.3 Shared class strings

These replace dozens of one-off strings. Use them in every section.

```ts
/* Type. Headings were weight 300 everywhere, which is most of why the page
   read as pale; 600 matches the weight the reference page uses. */
const H2 = 'font-heading text-[1.85rem] font-semibold leading-[1.12] tracking-tight md:text-[2.6rem]';
const H3 = 'font-heading text-xl font-semibold leading-snug tracking-tight md:text-2xl';
const BODY = 'font-heading text-base font-normal leading-relaxed md:text-[17px]';
/* Text colours by surface. Floors are the AA minimums, not suggestions. */
const ON_LIGHT = 'text-[hsl(0,0%,10%)]/85'; // 9.1:1 on cream
const ON_LIGHT_MUTED = 'text-[hsl(0,0%,10%)]/70'; // 5.7:1 (labels, captions; never lower)
const ON_DARK = 'text-[#F7E9D6]/75'; // ≥5.6:1 on every dark surface
const ON_DARK_MUTED = 'text-[#F7E9D6]/65'; // ≥4.6:1 (labels; never lower)
/* Cards. White on cream is how the reference page gets figure/ground on a
   light page; translucent white melts into the cream, so keep it solid. */
const CARD =
  'rounded-[22px] bg-white p-6 ring-1 ring-[#1c100e]/10 shadow-[0_18px_40px_-28px_rgba(60,30,10,0.35)] md:p-7';
const CARD_ON_DARK = 'rounded-[22px] bg-white/[0.06] p-6 ring-1 ring-white/12 md:p-7';
```

**Body weight changes from 300 to 400 everywhere except the hero.** The hero H1 goes from 300 to 400 (`font-normal`).

### 3.4 Components

- **`Eyebrow`** (`:620`): add `tone: 'light' | 'dark'` (default `'light'`).
  - Label colour: `ON_LIGHT_MUTED` or `ON_DARK_MUTED`.
  - Keep the dot.
  - Delete `SECTION_ACCENTS` (`:41`) and the stale comment that claims it drives the dot colours (`:614–619`).
- **`Highlight`** (new): `({ children, tone })`. Renders a `<span>` in `AMBER_INK` on light surfaces and `AMBER` on dark and purple. It is the only accent text in headings. The copy deck marks it as `[hl]…[/hl]`, once per heading at most.
- **`ApplyButton`** (`:1048`):
  - Keep the `'hero'` tone (light pill, used on every dark and purple surface) and the `'page'` tone (ink pill, used on cream).
  - **Delete the `'brutal'` branch and the `brutal` const** (`:40`); no call site uses them.
  - The default label becomes `CTA_LABEL = 'Check if I qualify'`.
- **`CtaRow`** (new): one reusable block placed after sections 3, 6 and 7.
  ```tsx
  /* The page had no button between the hero and the price — ~15,000px on
     desktop. This is the inline answer to that (no sticky bar, by decision). */
  const CtaRow = ({ where, tone }: { where: string; tone: 'light' | 'dark' }) => (
    <div className="mt-12 flex flex-col items-center gap-3 text-center md:mt-14">
      <ApplyButton where={where} tone={tone === 'light' ? 'page' : 'hero'} />
      <p className={`font-heading text-sm ${tone === 'light' ? ON_LIGHT_MUTED : ON_DARK_MUTED}`}>
        {MONEY_BACK_LINE}
      </p>
    </div>
  );
  ```
  `MONEY_BACK_LINE` is a constant holding the deck's "CTA row line". Since `ApplyButton` is defined inside `Build`, define `CtaRow` there too.

**Acceptance for Phase 1:**
- The page looks the same apart from heavier type and stronger body text.
- Lint and tsc are clean.

---

## 4. Phase 2 — data and copy constants

**Commit message:** "Rewrite the /build copy in plain English."

Replace each constant's content with the copy deck (`build-copy-audit.md` §5). Keep the constant names where they exist, so the render code changes stay small.

| Constant | Change |
|---|---|
| `CTA_LABEL` | Deck §0 "Button" |
| `COHORT_STATUS` | Deck §10 "Status under the button" |
| `HERO_A` | `subhead` becomes a single string (update the hero render: no `<br />`). `headline` is unchanged. `note` comes from the deck |
| `TRUST` | Deck §1, in that order. Keep the `link` field for @_therealsigma |
| `FAILURES` | Deck §3: **5 items**, renumbered 01–05 |
| `FIT_FIELDS`, `FIT_PATHS`, `FIT_SKIP` | Deck §4. `FIT_PATHS` loses its `n` numbers; the cards need none |
| `BIO`, `STATS` | Deck §5. `BIO` has 2 paragraphs. `STATS[0]` ($5M+) renders as the photo badge; the stats row shows `STATS[1..2]` |
| `GUESTS` | Deck §8 lines. Delete `status`. Add an optional `week?: number`, left undefined until Ahmed supplies the weeks |
| `CLUB_BEATS`, `CLUB_DOOR` | Deck §9. `CLUB_DOOR.body` becomes one string |
| `INCLUDED` | Deck §10, 7 items |
| `FAQS` | Deck §11, 6 items |
| `GATE_QUESTIONS`, `APPLY_MESSAGE` | Deck §12. The prefill must match the four questions |
| `STEPS` | Reshape (below) |
| **Delete** | `HOW_IT_WORKS`, `WEEK_TIMELINE`, `WEEK_ICONS`, `DOTS` (only Guests used it), `AHMED_PHOTOS[1..4]` (keep `[0]`, or inline it) |
| **New** | `MONEY_BACK_LINE`; `PROOF_QUOTE_IDS = [1, 3, 4]`; `WRITTEN_PROOF` cut to its first 4 entries |

### 4.1 `cohortWeeks.ts`

Week-level outcomes move up to the step level (see `STEPS`).

```ts
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
```

| Week | `step` | `title` | `brief` |
|---|---|---|---|
| 1 | Problem | — | deck §7 Week 1 |
| 2 | Promise | — | deck §7 Week 2 |
| 3 | **Demand** | deck §7 Week 3 | deck §7 Week 3 |
| 4 | Demand | deck §7 Week 4 | deck §7 Week 4 |
| 5 | Demand | deck §7 Week 5 | deck §7 Week 5 |
| 6 | Build | — | deck §7 Week 6 |

Update the file's header comment: the week-to-step mapping changed, and the outcomes now live on the steps.

### 4.2 `STEPS`

```ts
const STEPS = [
  { n: '01', step: 'Problem', name: /* deck §7 Step 1 */, weeks: [1], outcome: /* "You leave with" */, img: '/method/compass.webp', alt: 'Compass' },
  { n: '02', step: 'Promise', name: /* Step 2 */, weeks: [2], outcome: …, img: '/method/megaphone.webp', alt: 'Megaphone' },
  { n: '03', step: 'Demand', name: /* Step 3 */, weeks: [3, 4, 5], outcome: …, img: '/method/rocket.webp', alt: 'Rocket' },
  { n: '04', step: 'Build', name: /* Step 4 */, weeks: [6], outcome: …, img: '/weeks/laptop.webp', alt: 'Laptop' },
] as const;
```

Keep the thiings.co licence comment (`:260–261`) above it.

**Acceptance for Phase 2:**
- `grep -in "See if I'd take you\|AI teammates\|AI workers\|Five places\|nine people\|the door out\|show the room" src/pages/Build.tsx src/data/cohortWeeks.ts` returns nothing. Comments included: update them too.
- tsc is clean. The render code may still be the old layout at this point.

---

## 5. Phase 3 — sections

**Commit messages:**
- Sections 0–6: "Rebuild the top half of /build on the new surfaces."
- Sections 7–12: "Merge the method into one step-by-week section and close on the gate."

Every section follows these rules:

- **Headings:** `H2` with at most one `Highlight`.
- **Body text:** `BODY` plus the surface's text colour (`ON_LIGHT`, `ON_DARK`).
- **Labels:** never below the `*_MUTED` floors.
- **Spacing:** use the same top padding on every light section (`pt-16 md:pt-24`). Dark and purple sections use `py-20 md:py-28`.
- **Background placement:** put each dark or purple surface on the `<section>` element itself (`style={{ background: INK_… }}`), not on an absolutely positioned child as today. Glow layers can stay as `aria-hidden` children. This keeps the surface readable by the contrast check in §7, and it is one less wrapper.
- **Motion:** keep `Reveal` wrappers as they are today.

**S0 Hero** (`:1083–1307`):
- Copy from deck §0.
- `HERO_A.headline[1]` is wrapped in `<Highlight tone="dark">`.
- The H1 goes to `font-normal`.
- The subhead is one line.
- Replace the text under the button (`:1257`).
- Nav per §2. Nothing else in the hero changes.

**S1 Trust strip** (`:1317–1356`):
- Grid `grid-cols-2 gap-3 md:grid-cols-4 md:gap-4`. Each item is a `CARD` with the icon on top (keep the size and drop-shadow), the title `font-semibold` and the text in `ON_LIGHT`.
- Remove the vertical divider borders; the cards replace them.

**S2 Why now + video** (merge `:1358–1398` and `:1400–1420`):
- One `<section id="why-now">`.
- Order: eyebrow + H2 (centred) → prose (left-aligned, `max-w-2xl`) → video (`max-w-[720px]`, the current player frame) → caption (`ON_LIGHT_MUTED`).
- The "Big line" is `font-semibold text-2xl md:text-[2rem]` in full ink.
- The source line uses `ON_LIGHT_MUTED` at `text-[13px]`; it was /45 (2.74:1).

**S3 Common mistakes** (`:1446–1524`):
- Surface `INK_EMBER`. Keep the existing glow layers.
- Items:
  - numbers in `AMBER` (keep)
  - titles `H3` in cream
  - descriptions `ON_DARK`
  - eyebrow `<Eyebrow tone="dark">`
- Closing question in `AMBER`, then `<CtaRow where="mistakes" tone="dark" />`.

**S4 Who this is for** (`:1527–1605`):
- Chips: `rounded-full bg-white px-4 py-2 ring-1 ring-[#1c100e]/15 font-heading text-sm font-medium` in a wrapping row.
- The three paths become 3 `CARD`s (`md:grid-cols-3`), with titles in `H3`.
- "Not for you if" inset:
  - solid `bg-[#16110F]` card, not the Gate gradient
  - title in `CORAL` (7.06:1 on that colour)
  - bullets in cream
  - CORAL dots, as now

**S5 Your teacher** (`:1608–1744`):
- Surface `INK_SMOKE`. Must not equal any other section's gradient.
- On the photo, a bottom-left badge: `rounded-2xl bg-[#F7E9D6] px-5 py-3 text-[#0c0a0b]`, holding `STATS[0].v` (`font-semibold text-3xl`) over `STATS[0].l` (`text-xs`).
- Role line in `ON_DARK`. Bio paragraphs in `ON_DARK`.
- Stats row shows `STATS[1..2]` only.
- Marquee label in `ON_DARK_MUTED`.
- The fan carousel and the marquee behaviour do not change.

**S6 What people say** (`:1747–1760`, `ProofClips` `:893–968`):
- The clips row holds 3 portrait players: Mo, Karla, and the class clip (`workshopVideoUrl` / `workshopVideoPoster`, label from the deck).
- To include the class clip, extend `PROOF_CLIPS` with `{ id: 'class', name: …, src: workshopVideoUrl, poster: workshopVideoPoster }`. The `SelfieClip` widths go from `w-[47%] max-w-[280px]` to `w-[31%] max-w-[240px]`.
- Quote cards: render only `PROOF_QUOTE_IDS`, as solid `CARD`s; roles in `ON_LIGHT_MUTED`.
- Screenshots: the first 4 only.
- Then `<CtaRow where="proof" tone="light" />`.

**S7 How the 6 weeks work** (replaces `:1762–1980`; delete the Framework, What-changes and Weeks sections and the `RadialOrbitalTimeline` usage):
- `<section id="how-it-works">` on `SIGNATURE_BG`, with cream text.
- Header: `<Eyebrow tone="dark">`, H2 with `Highlight tone="dark"`, subhead in `ON_DARK`.
- Grid: `grid gap-4 md:grid-cols-2 lg:grid-cols-4`. One `CARD_ON_DARK` per step, top to bottom:
  1. A 4px top bar in `STEP_COLOR[step]` (decorative).
  2. The 3D icon (`h-20 w-20`, drop the float animation inside cards).
  3. `n` in `ON_DARK_MUTED`.
  4. The step `name` in `H3`, cream.
  5. One row per week:
     - a pill `Week N` (`rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium`)
     - the week's `title` if present (`font-semibold`)
     - `brief` in `ON_DARK`
  6. At the bottom, after a hairline (`border-t border-white/10 pt-4`): "You leave with:" in `ON_DARK_MUTED`, then `outcome` in cream.
- Under the grid: the thiings.co credit line in `ON_DARK_MUTED`, then `<CtaRow where="framework" tone="dark" />`.
- **Acceptance:**
  - All 6 weeks are readable with no click or hover, on every viewport.
  - No element of the page rotates or animates on scroll here.
  - Week 3 shows under step 03.

**S8 Guest experts** (`:1982–2051`):
- **The surface changes to cream.** The aubergine band and the `DOTS` overlay go.
- Header: `Eyebrow` + H2 from the deck.
- Photo cards keep their dark bottom gradient and white name. **Remove the "Confirmed" badge.** If `g.week` is set, show a `Week {g.week}` pill top-left (`bg-[#F7E9D6] text-[#0c0a0b]`, the same shape the badge had).
- Below each photo: the credential in `ON_LIGHT_MUTED`, the line in `ON_LIGHT`.

**S9 Founders' Club** (`:2053–2138`):
- **The surface changes to `INK_FOREST`**, with cream text.
- Header, then the landscape photo. Keep `ring-1 ring-[#D4A574]/30`. Stamp: "Member"/"Lifetime" become a single line from the deck. Delete the right-hand caption.
- 3 beats as `CARD_ON_DARK`s (titles `H3`, text `ON_DARK`), then one wide `CARD_ON_DARK`: title `H3`, body `ON_DARK`.
- Delete every per-section number (01–04).

**S10 Price** (`:2140–2236`):
- `<section id="price">` on `SIGNATURE_BG`. Remove `id="apply"` from it.
- Left column:
  - an `h2` styled as an eyebrow ("Price")
  - **`$425` in solid `#F7E9D6`.** Delete the gradient text: it was 1.8–2.9:1 on ivory. 8.75:1 on purple.
  - the line in `ON_DARK`
  - a guarantee badge: `rounded-2xl bg-[#F7E9D6] p-5 text-[#1a1a1a]`, with `/method/guarantee.webp` at 48px on the left and the deck's badge title (`font-semibold`) and text
  - `ApplyButton where="pricing" tone="hero"`, then `COHORT_STATUS` in `ON_DARK_MUTED`
- Right column: keep the white "What you get" card, with 7 items, numbers in `AMBER_INK` and items in `ON_LIGHT`.
- **Delete the duplicate mobile button block (`:2227–2234`).** Show the left-column button on every viewport instead; it no longer needs to be hidden on mobile.

**S11 FAQ** (`:2311–2348`):
- **Move it above S12.**
- Header: H2 only (deck). Delete the chip and the subhead.
- Rows: `bg-white` (was `#FFFDF7`) with the same ring. Answers in `ON_LIGHT`.

**S12 How to apply** (`:2238–2308` plus the details link from `:2393–2405`):
- `<section id="apply">` on `INK_GATE`. **It is the last section before `<Footer />`.**
- H2 from the deck, with the second sentence in `Highlight tone="dark"`.
- Questions as today (they already pass).
- The three "after" lines in `ON_DARK`.
- `ApplyButton where="gate" tone="hero"`.
- Under it, the details link with `onClick={() => track('gate_details')}` and `href={whatsappUrl(DETAILS_MESSAGE)}`.
- **Delete the Final CTA section (`:2351–2408`).**

---

## 6. Phase 4 — cleanup and analytics

**Commit message:** "Drop the orbit, the dead tokens and the closing band from /build."

- Remove the `RadialOrbitalTimeline` import and its type import. `grep -rn "radial-orbital-timeline" src` must return nothing; then delete `src/components/ui/radial-orbital-timeline.tsx`.
- Remove the lucide icons that only `WEEK_ICONS` used (`Compass`, `Megaphone`, `Code2`, `Radar`, `Send`, `Presentation`). Keep any icon still referenced; check each one with grep.
- Remove `STEP_COLOR` entries or types that no longer match. `STEP_COLOR` itself stays; S7 uses it.
- In `track()` (`:1025`), change `variant: 'build_v3'` to `variant: 'build_v4'`, so GA can separate the new page from the old.
- Placement IDs after this change:
  - `hero`, `mistakes`, `proof`, `framework`, `pricing`, `gate`, `gate_details`
  - removed: `footer`, `footer_details`
- Put the placement list in the commit body.

---

## 7. Verification (required before each commit; full pass before the last)

1. Run `npx eslint src/pages/Build.tsx src/data/cohortWeeks.ts` and `npx tsc -p tsconfig.app.json --noEmit`. Both must be clean.
2. Run `npm run build`. It must succeed.
3. Start the dev server and open `/build` at **1280×800** and **375×812**:
   - no console errors
   - every nav anchor scrolls to its section
   - each `ApplyButton`'s `href` is a `wa.me` link whose decoded text equals `APPLY_MESSAGE`
   - the details link carries `details`
4. **Contrast check.** Paste this into the browser console on `/build`. It must print `0 failures`.
   - Text inside `aria-hidden` and the hero is excluded.
   - For a gradient it tests every colour stop and keeps the worst, so it is conservative.
   ```js
   (() => {
     const nums = s => (s.match(/[\d.]+/g) || []).map(Number);
     const lum = ([r, g, b]) => [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
       .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
     const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };
     // Nearest painted surface: a solid colour (alpha > 0.9) or every rgb() stop of a gradient.
     const stopsOf = el => { for (let n = el; n; n = n.parentElement) { const cs = getComputedStyle(n);
       const c = nums(cs.backgroundColor); if (c.length === 3 || (c[3] ?? 0) > 0.9) return [c.slice(0, 3)];
       const g = [...cs.backgroundImage.matchAll(/rgba?\(([^)]+)\)/g)].map(m => nums(m[1])).filter(s => (s[3] ?? 1) > 0.9);
       if (g.length) return g.map(s => s.slice(0, 3)); }
       return [[247, 233, 214]]; };
     const fails = [];
     document.querySelectorAll('main *').forEach(el => {
       if (el.closest('[aria-hidden="true"]') || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
       const cs = getComputedStyle(el); const fg = nums(cs.color); const a = fg[3] ?? 1;
       const worst = Math.min(...stopsOf(el).map(bg => ratio(fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a)), bg)));
       const large = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
       if (worst < (large ? 3 : 4.5)) fails.push([worst.toFixed(2), el.textContent.trim().slice(0, 40)]);
     });
     console.table(fails); return `${fails.length} failures`;
   })();
   ```
   Text drawn over photos (guest names, the club stamp) reads its colour from the overlay gradient, not the photo. Check any hits there by eye and list them in the PR.

   **Smoke test it first, on the live page before your changes.** Tested 2026-10-10, it reports 130 failures. The cream-section hits are real: eyebrows 4.11, the Ng citation 2.71, the tan numbers 2.22. The dark-section hits show 1.00 and are false: those backgrounds sit on `aria-hidden` child layers, so the script falls back to cream. They disappear once every surface is on its `<section>` (the §5 rule). If you still see a 1.00 after Phase 3, a background was left on a child layer.
5. **Word count.** It must be ≤ 1,300. The live page measures 2,028 with this script (2026-10-10).
   ```js
   (() => { const c = document.body.cloneNode(true); c.querySelectorAll('[aria-hidden="true"], footer, nav').forEach(n => n.remove());
     const t = [...c.querySelectorAll('header h1, header p, main')].map(e => e.textContent).join(' ');
     return (t.match(/[A-Za-z0-9$]+/g) || []).length; })();
   ```
   The marquee's duplicate copy is `aria-hidden`, so it is excluded.
6. Turn on reduced motion in the OS or in DevTools rendering. Every section must be visible immediately, with nothing animating.
7. Take one screenshot per section at each size. Attach them to the PR for Ahmed.

---

## 8. Open items for Ahmed

None of these block the build; they block the deploy.

**Facts the new copy asserts** (copy audit §7) — confirm each:
1. Both exits were sales.
2. Week 6 includes launching, not only presenting.
3. @_therealsigma was a student.
4. Petri's session is in week 6.
5. "Most who apply are not a fit yet" is still true.

**Data still missing:**
6. **Guest weeks:** fill `GUESTS[i].week`. Until then no badge renders.
7. **Screenshots:** pick 4 of the 8. Default: the first 4.

**Compliance:**
8. **thiings.co commercial licence** for the 3D icons (`Build.tsx:260–261`). The icons are live today.
