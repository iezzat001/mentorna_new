import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import FunnelProgress from './FunnelProgress';

type FunnelShellProps = {
  /** Short label under the brand, e.g. episode title */
  eyebrow?: string;
  step: number;
  total: number;
  /** Close / exit destination. Defaults to Mentorna home. */
  exitHref?: string;
  children: React.ReactNode;
  /** Sticky bottom action area (Continue / Society CTA / etc.) */
  footer?: React.ReactNode;
};

/**
 * Full-viewport lesson shell: progress on top, one step in the middle,
 * primary action pinned at the bottom — Duolingo rhythm, Mentorna look.
 */
const FunnelShell = ({
  eyebrow,
  step,
  total,
  exitHref = '/',
  children,
  footer,
}: FunnelShellProps) => (
  <div
    className="flex min-h-[100dvh] flex-col bg-[hsl(42,45%,96%)] font-['Plus_Jakarta_Sans',sans-serif] text-[hsl(0,0%,10%)]"
    dir="rtl"
  >
    <header className="sticky top-0 z-30 border-b-[3px] border-[hsl(0,0%,10%)] bg-[hsl(42,45%,96%)]/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <a
          href={exitHref}
          aria-label="إغلاق"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-white transition-transform active:scale-95"
        >
          <X className="h-5 w-5" />
        </a>
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <p className="mb-1 truncate text-[10px] font-extrabold uppercase tracking-[0.14em] opacity-45">
              {eyebrow}
            </p>
          )}
          <FunnelProgress step={step} total={total} />
        </div>
      </div>
    </header>

    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-4 pt-6">
      <div
        key={step}
        className="funnel-step flex flex-1 flex-col"
      >
        {children}
      </div>
    </main>

    {footer && (
      <footer className="sticky bottom-0 z-30 border-t-[3px] border-[hsl(0,0%,10%)] bg-white/95 px-4 py-3 backdrop-blur safe-pb">
        <div className="mx-auto max-w-lg">{footer}</div>
      </footer>
    )}

    <style>{`
      @keyframes funnelIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .funnel-step {
        animation: funnelIn 0.35s ease-out both;
      }
      @media (prefers-reduced-motion: reduce) {
        .funnel-step { animation: none; }
      }
      .safe-pb {
        padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
      }
    `}</style>
  </div>
);

export const FunnelContinue = ({
  onClick,
  disabled,
  label = 'كمّل',
  variant = 'dark',
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  variant?: 'dark' | 'green' | 'amber';
}) => {
  const bg =
    variant === 'green'
      ? 'bg-[hsl(145,63%,42%)] text-white'
      : variant === 'amber'
        ? 'bg-[hsl(45,95%,65%)] text-[hsl(0,0%,10%)]'
        : 'bg-[hsl(0,0%,10%)] text-white';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex min-h-14 w-full items-center justify-center gap-2 border-[3px] border-[hsl(0,0%,10%)] ${bg} text-base font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
    >
      {label}
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

export default FunnelShell;
