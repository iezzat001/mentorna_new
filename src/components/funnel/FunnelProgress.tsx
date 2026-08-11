import React from 'react';

type FunnelProgressProps = {
  /** 0-indexed current step */
  step: number;
  /** Total number of steps */
  total: number;
};

/**
 * Duolingo-style top progress bar. Fills as the learner advances.
 */
const FunnelProgress = ({ step, total }: FunnelProgressProps) => {
  const pct = total <= 1 ? 100 : Math.min(100, Math.round(((step + 1) / total) * 100));

  return (
    <div className="w-full" dir="ltr" aria-hidden>
      <div className="h-3 w-full overflow-hidden rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-white">
        <div
          className="h-full rounded-full bg-[hsl(145,63%,42%)] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="sr-only">
        Step {step + 1} of {total}
      </span>
    </div>
  );
};

export default FunnelProgress;
