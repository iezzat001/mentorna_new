# Vibe Coding 0 → 1 — Workshop
**Mentorna® | Public workshop**
**URL:** `/workshop` | **Access:** Public, ungated

> Replaces the Solopreneur Launchpad offer that previously lived at `/workshop`.
> That program is retired from this route; `/offer/mohamed` is now its canonical page.

---

## The Offer

**Vibe Coding 0 → 1** — from a problem in your head to a prototype on the internet, in one evening.

| | |
|---|---|
| **Price** | $99 USD |
| **Duration** | 5 hours, live and hands-on |
| **Format** | Small group, limited seats |
| **Signup** | WhatsApp — `+358 41 481 9241` |

---

## What Participants Leave With

1. **A problem worth solving** — defined as *[who]* feels *[what pain]* because *[why]*
2. **An offer statement** a stranger understands in ten seconds
3. **A live landing page** built with AI in the room
4. **A way to collect signal** — email capture, waitlist, or feedback form
5. **A deployed link** shipped before they leave
6. **A 7-day action plan** for the week after

---

## Structure — Five Blocks

Every block is 10 minutes of theory followed by 30 minutes of building.
Source of truth for block content: `src/data/workshop.ts`.

| # | Theory | Build |
|---|---|---|
| 1 | What Is Entrepreneurship? | Find Your Problem |
| 2 | Offer Design | Craft Your Offer Statement |
| 3 | What Is Vibe Coding? | Build Your Landing Page |
| 4 | Validation Thinking | Add Validation to Your Prototype |
| 5 | Ship & Iterate | Ship It. Improve It. |

Closing: **optional 2-minute stage pitch** for anyone who wants to present what they built.

---

## Tools

Bolt (quick prototypes) · **Lovable** (recommended) · Replit Agent (full-stack).
All browser-based, free tiers are sufficient.

---

## Proof

Run at **Helsinki XR Center, June 4 2026**, co-organised with The AI Collective Finland.
20+ participants, 5/5 average rating. Testimonials and photos live in `src/data/testimonials.ts`
and are shared with the `/testimonials` page.

---

## Upsell — AI Entrepreneurship Bootcamp

**$325 USD · 6 weeks · online, cohort based**

- **Phase I — Foundation Building:** entrepreneurial mindset, idea to digital blueprint, build a real app, talk to customers
- **Phase II — Advanced Implementation:** improve it with AI, test and get feedback, pitch like a CEO, launch day
- Participants compete for a €5,000 prize

Conversion path on the page: a single WhatsApp CTA ("Ask about the bootcamp"). The
waiting-list dialog it used to link to has been retired site-wide — WhatsApp is now
the only signup channel.

---

## Maintenance Notes

- Next session date, format, and seat count are set in the `NEXT_SESSION` constant at the top of `src/pages/Workshop.tsx`.
- Prices are the `PRICE_USD` and `BOOTCAMP_PRICE_USD` constants in the same file.
- Agenda content is read from `src/data/workshop.ts`, which is shared with the admin deck at `/workshop-deck`. Editing it changes both.
