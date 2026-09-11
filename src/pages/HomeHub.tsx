import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import { useSEO, defaultSEO } from '@/hooks/useSEO';
import { whatsappUrl, WHATSAPP_MESSAGES } from '@/lib/whatsapp';

const PAGE_BG =
  'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)';
const AMBER = 'hsl(38,95%,58%)';
const PURPLE = 'hsl(262,70%,60%)';
const CYAN = 'hsl(196,85%,52%)';
const TEAL = 'hsl(160,70%,45%)';

const PATHS = [
  {
    to: '/build',
    label: '0→1 Cohort',
    blurb: 'Four weeks, live, ten seats. September is full. Waitlist for mid-October.',
    accent: AMBER,
  },
  {
    to: '/mentorship',
    label: 'Private Mentorship',
    blurb: '1:1 with Ahmed. A personal roadmap, not a curriculum.',
    accent: PURPLE,
  },
  {
    to: '/community',
    label: 'Community',
    blurb: 'Weekly sessions and recordings. Free to watch.',
    accent: CYAN,
  },
  {
    to: '/book-a-call',
    label: 'Consultation',
    blurb: 'Book a call. Figure out which path fits.',
    accent: TEAL,
  },
] as const;

/**
 * Public homepage hub — replaces the retired bootcamp sales page.
 * Waitlist + doors into the live products (Build, Mentorship, Community, Call).
 */
const HomeHub = () => {
  useSEO({
    ...defaultSEO,
    title: 'Mentorna® · 0→1 Cohort & Private Mentorship',
    description: defaultSEO.description,
    canonical: 'https://mentorna.com/',
    ogUrl: 'https://mentorna.com/',
  });

  return (
    <div className="min-h-screen font-body text-[hsl(0,0%,10%)]" style={{ background: PAGE_BG }}>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 h-80 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(232,168,90,0.4), transparent 68%)',
          }}
        />

        <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-6 md:px-8 md:py-8">
          <span className="font-heading text-[17px] font-light tracking-[0.06em]">
            Mentorna®
          </span>
          <a
            href={whatsappUrl(WHATSAPP_MESSAGES.cohortWaitlist)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[hsl(0,0%,10%)] px-4 py-2 font-heading text-xs font-medium tracking-wide text-[#F7E9D6] transition-transform hover:scale-[1.03] md:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Mid-October waitlist
          </a>
        </nav>

        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-6 text-center md:pb-20 md:pt-10">
          <p className="inline-flex items-center gap-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/55">
            <span
              aria-hidden
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: AMBER, boxShadow: '0 0 0 3px rgba(232,168,90,0.22)' }}
            />
            Coming soon · 0→1 cohort full · next mid-October
          </p>
          <h1 className="mt-5 font-heading text-4xl font-light leading-[1.08] tracking-tight md:text-6xl lg:text-[4rem]">
            Mentorna®
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/75 md:text-lg">
            Build a business with AI teammates in four weeks, or work 1:1 mentorship
            with Ahmed Ezzat. The September cohort is full. Join the mid-October waitlist,
            or pick a path below.
          </p>
          <a
            href={whatsappUrl(WHATSAPP_MESSAGES.cohortWaitlist)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[hsl(0,0%,10%)] px-8 text-sm font-medium tracking-wide text-[#F7E9D6] transition-transform hover:scale-[1.03] md:min-h-[3.25rem] md:px-9 md:text-base"
          >
            <MessageCircle className="h-4 w-4" />
            Join the mid-October waitlist
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/50">
              Open now
            </p>
            <h2 className="mt-2 font-heading text-2xl font-light tracking-tight md:text-3xl">
              Choose your path
            </h2>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {PATHS.map((p) => (
            <li key={p.to}>
              <Link
                to={p.to}
                className="group flex h-full flex-col rounded-[22px] bg-white/55 p-6 shadow-[0_18px_40px_-28px_rgba(60,30,10,0.35)] ring-1 ring-[#1c100e]/10 transition-transform hover:scale-[1.015] md:p-7"
              >
                <span
                  aria-hidden
                  className="mb-4 h-2 w-2 rounded-full"
                  style={{ background: p.accent, boxShadow: `0 0 0 3px ${p.accent}22` }}
                />
                <span className="font-heading text-xl font-light tracking-tight md:text-2xl">
                  {p.label}
                </span>
                <span className="mt-2 flex-1 font-heading text-sm font-light leading-relaxed text-[hsl(0,0%,10%)]/65 md:text-[15px]">
                  {p.blurb}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-medium text-[hsl(0,0%,10%)]">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default HomeHub;
