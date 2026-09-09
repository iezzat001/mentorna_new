import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

type PageEntry = {
  path: string;
  label: string;
  note?: string;
};

type PageGroup = {
  title: string;
  seo: 'index' | 'noindex' | 'admin' | 'legacy';
  pages: PageEntry[];
};

const GROUPS: PageGroup[] = [
  {
    title: 'Public SEO faces',
    seo: 'index',
    pages: [
      { path: '/build', label: '0→1 Cohort', note: 'Primary product page' },
      { path: '/mentorship', label: 'Private Mentorship', note: 'Primary product page' },
    ],
  },
  {
    title: 'Public hub & supporting',
    seo: 'index',
    pages: [
      { path: '/', label: 'Home hub / waitlist', note: 'Sitewide metadata lives here' },
      { path: '/legacy-home', label: 'Legacy bootcamp homepage', note: 'Hidden · old Index/MobileLanding' },
      { path: '/community', label: 'Community webinars' },
      { path: '/book-a-call', label: 'Consultation / book a call' },
      { path: '/links', label: 'Link in bio' },
      { path: '/testimonials', label: 'Testimonials' },
    ],
  },
  {
    title: 'Private offer pages (noindex)',
    seo: 'noindex',
    pages: [
      { path: '/offer/mohamed', label: 'Offer · Mohamed' },
      { path: '/offer/jaida', label: 'Offer · Jaida' },
      { path: '/offer/youssef', label: 'Offer · Youssef' },
      { path: '/mentorship-offer', label: 'Offer · Jassim / VC mentorship' },
    ],
  },
  {
    title: 'Legacy / series (review)',
    seo: 'legacy',
    pages: [
      { path: '/workshop', label: 'Workshop (Helsinki / vibe coding sales)' },
      { path: '/vibecoding', label: 'Vibe Coding' },
      { path: '/skills-in-2026', label: 'Skills in 2026' },
      { path: '/startup-30', label: 'Startup 30' },
      { path: '/problem-finder', label: 'Problem Finder' },
      { path: '/one-feature', label: 'One Feature' },
      { path: '/validation', label: 'Validation' },
      { path: '/valuation', label: 'Valuation' },
    ],
  },
  {
    title: 'Admin / protected',
    seo: 'admin',
    pages: [
      { path: '/dashboard', label: 'Dashboard', note: 'Admin auth required' },
      { path: '/investment', label: 'Investment', note: 'Admin auth required' },
      { path: '/workshop-deck', label: 'Workshop deck hub', note: 'Admin auth required' },
      { path: '/workshop-deck/all', label: 'Workshop deck · all', note: 'Admin auth required' },
      { path: '/member', label: 'Member area', note: 'Auth required' },
      { path: '/all-pages', label: 'This inventory', note: 'noindex · for you' },
    ],
  },
];

const badge = (seo: PageGroup['seo']) => {
  switch (seo) {
    case 'index':
      return 'index';
    case 'noindex':
      return 'noindex';
    case 'admin':
      return 'admin';
    case 'legacy':
      return 'review';
  }
};

/**
 * Internal inventory of every route — public, private, legacy, admin.
 * noindex so it never becomes a SEO surface.
 */
const AllPages = () => {
  useSEO({
    title: 'All pages · Mentorna (internal)',
    description: 'Internal route inventory for Mentorna.',
    canonical: 'https://mentorna.com/all-pages',
    noindex: true,
  });

  return (
    <div
      className="min-h-screen font-body text-[hsl(0,0%,10%)]"
      style={{
        background:
          'linear-gradient(180deg,#F7E9D6 0%,#F3E0CB 25%,#F6E5D2 55%,#EFDAC2 100%)',
      }}
    >
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <p className="font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-[hsl(0,0%,10%)]/50">
          Internal
        </p>
        <h1 className="mt-2 font-heading text-3xl font-light tracking-tight md:text-4xl">
          All pages
        </h1>
        <p className="mt-3 max-w-xl font-heading text-base font-light leading-relaxed text-[hsl(0,0%,10%)]/70">
          Every public and non-public route in one place. Use this to decide what
          stays, what gets noindex, and what to retire.
        </p>

        <div className="mt-12 space-y-12">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-xl font-light tracking-tight">
                  {group.title}
                </h2>
                <span className="rounded-full bg-[hsl(0,0%,10%)]/8 px-2.5 py-0.5 font-heading text-[10px] font-medium uppercase tracking-[0.16em] text-[hsl(0,0%,10%)]/60">
                  {badge(group.seo)}
                </span>
              </div>
              <ul className="divide-y divide-[#1c100e]/10 overflow-hidden rounded-[18px] bg-white/55 ring-1 ring-[#1c100e]/10">
                {group.pages.map((page) => (
                  <li key={page.path}>
                    <Link
                      to={page.path}
                      className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3.5 transition-colors hover:bg-white/80 md:px-5"
                    >
                      <span className="font-heading text-[15px] font-medium">
                        {page.label}
                      </span>
                      <span className="font-heading text-sm font-light tabular-nums text-[hsl(0,0%,10%)]/50">
                        {page.path}
                      </span>
                      {page.note ? (
                        <span className="w-full font-heading text-xs font-light text-[hsl(0,0%,10%)]/45">
                          {page.note}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPages;
