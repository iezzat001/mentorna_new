import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export type FunnelQuizOption = {
  id: 'a' | 'b' | 'c';
  correct: boolean;
  text: string;
  feedback: string;
};

const LETTER: Record<FunnelQuizOption['id'], string> = {
  a: 'أ',
  b: 'ب',
  c: 'ج',
};

type FunnelQuizProps = {
  tag: string;
  question: string;
  options: FunnelQuizOption[];
  selected: FunnelQuizOption['id'] | null;
  onPick: (id: FunnelQuizOption['id']) => void;
};

const FunnelQuiz = ({ tag, question, options, selected, onPick }: FunnelQuizProps) => {
  const answered = selected !== null;

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="border-2 border-[hsl(0,0%,10%)] bg-[hsl(45,95%,65%)] px-2.5 py-1 text-[11px] font-extrabold">
          {tag}
        </span>
      </div>

      <h2 className="mb-6 text-xl font-extrabold leading-snug md:text-2xl">{question}</h2>

      <div className="space-y-3">
        {options.map((opt) => {
          const isPicked = selected === opt.id;
          const state = !answered
            ? 'bg-white hover:bg-[hsl(42,40%,92%)]'
            : opt.correct
              ? 'bg-[hsl(145,50%,88%)] border-[hsl(145,63%,42%)]'
              : isPicked
                ? 'bg-[hsl(0,70%,92%)] border-[hsl(0,70%,50%)]'
                : 'bg-white opacity-50';

          return (
            <div key={opt.id}>
              <button
                type="button"
                onClick={() => onPick(opt.id)}
                disabled={answered}
                className={`flex w-full items-start gap-3 border-[3px] border-[hsl(0,0%,10%)] p-4 text-start shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform ${state} ${
                  answered ? 'cursor-default' : 'active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                }`}
              >
                <span className="shrink-0 text-lg font-extrabold">{LETTER[opt.id]}</span>
                <span className="flex-1 text-sm font-semibold leading-relaxed md:text-base">
                  {opt.text}
                </span>
                {answered && opt.correct && (
                  <CheckCircle className="h-6 w-6 shrink-0 text-[hsl(145,63%,42%)]" />
                )}
                {answered && isPicked && !opt.correct && (
                  <XCircle className="h-6 w-6 shrink-0 text-[hsl(0,70%,50%)]" />
                )}
              </button>

              {answered && (isPicked || opt.correct) && (
                <p
                  className={`mt-2 px-1 text-sm font-bold ${
                    opt.correct ? 'text-[hsl(145,63%,32%)]' : 'text-[hsl(0,70%,45%)]'
                  }`}
                >
                  {opt.feedback}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelQuiz;
