import React, { useMemo, useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import {
  CheckCircle,
  Filter,
  Layers,
  Lightbulb,
  Scissors,
  Target,
} from 'lucide-react';
import { getEpisodeByNumber, getNextEpisode, getPrevEpisode, SERIES_TITLE } from '@/data/series';
import FunnelShell, { FunnelContinue } from '@/components/funnel/FunnelShell';
import FunnelQuiz, { type FunnelQuizOption } from '@/components/funnel/FunnelQuiz';
import FunnelSocietyCta from '@/components/funnel/FunnelSocietyCta';

const EPISODE_NUMBER = 2;
const EPISODE = getEpisodeByNumber(EPISODE_NUMBER)!;
const PREV = getPrevEpisode(EPISODE_NUMBER);
const NEXT = getNextEpisode(EPISODE_NUMBER);

type QuizQuestion = {
  tag: string;
  question: string;
  options: FunnelQuizOption[];
};

const QUIZ: QuizQuestion[] = [
  {
    tag: 'رعب المنافسين',
    question:
      'صحيت لقيت أكبر منافس ليك نزّل 3 خصائص (Features) جديدة في الأبلكيشن بتاعه.. تتصرف إزاي؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'أجمع التيم فوراً ونبدأ نبرمج نفس الخصائص عشان منخسرش العملاء.',
        feedback: '❌ كده أنت بتبقى تابع، وبتلعب لعبتهم.',
      },
      {
        id: 'b',
        correct: true,
        text: 'أتجاهلهم تماماً وأركز إن الـ Core Value (المنفعة الأساسية) بتاعتي تكون أسرع وأحسن منهم.',
        feedback:
          '✅ عقلية ممتازة! جوجل مكسرهاش ياهو لما ضافوا أخبار وطقس، جوجل ركزت إن الـ Search بتاعها يبقى الأحسن.',
      },
      {
        id: 'c',
        correct: false,
        text: 'أعمل خصم على المنتج بتاعي عشان أعوض نقص الخصائص.',
        feedback: '❌ العملاء مش بيشتروا الرخيص، بيشتروا اللي بيحل مشكلتهم.',
      },
    ],
  },
  {
    tag: 'لخبطة العميل',
    question:
      'أطلقت الأبلكيشن والناس بتعمله Download، بس بيستخدموه مرة واحدة ويمسحوه.. المشكلة الأكبر غالباً بتكون إيه؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'الأبلكيشن محتاج خصائص أكتر عشان يرضي كل الأذواق.',
        feedback: '❌ إضافة خصائص على منتج مش مفهوم هيعقد المشكلة أكتر.',
      },
      {
        id: 'b',
        correct: false,
        text: 'محتاج أبعتلهم Notifications كتير عشان أذكرهم.',
        feedback: '❌ الإزعاج هيخليهم يمسحوه أسرع.',
      },
      {
        id: 'c',
        correct: true,
        text: 'الأبلكيشن زحمة، واليوزر مفهمش في أول 5 ثواني "ده بيعمل إيه بالظبط".',
        feedback: '✅ صح! لو اليوزر ملقاش الـ Benefit الواضحة في ثواني، هيمشي.',
      },
    ],
  },
  {
    tag: 'الـ Pitch',
    question: 'قاعد مع مستثمر في أسانسير، وسألك: الأبلكيشن بتاعك عبارة عن إيه؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'ده أبلكيشن فيه شات، وAI، وتوصيل، ومحفظة إلكترونية.',
        feedback: '❌ المستثمر تاه منك ومفهمش إنت مميز في إيه بالظبط.',
      },
      {
        id: 'b',
        correct: true,
        text: 'إحنا بنخلي [العميل] يوصل لـ [النتيجة] في [وقت أقل/بشكل أسهل] من غير ما يعاني من [المشكلة].',
        feedback: '✅ ممتاز! أنت كده ركزت على الـ Benefit مش الـ Features.',
      },
      {
        id: 'c',
        correct: false,
        text: 'ده أبلكيشن زي X بس بـ Y وC وD وE.',
        feedback: '❌ المقارنة بالمنافسين لوحدها مش كافية لو مش محدد الـ Core Value بتاعتك.',
      },
    ],
  },
];

const ACTION_STEPS = [
  {
    icon: Lightbulb,
    color: 'bg-[hsl(45,95%,65%)]',
    title: 'التفريغ (The Brain Dump)',
    body: 'اكتب كل الـ Features اللي في دماغك واللي شفتها عند المنافسين في ورقة واحدة.',
  },
  {
    icon: Scissors,
    color: 'bg-[hsl(196,85%,70%)]',
    title: 'اختبار "من غيرها"',
    body: 'امسك ميزة ميزة واسأل نفسك: "لو شلت دي، هل المنتج لسه بيحل المشكلة الأساسية؟" لو الإجابة آه.. اشطب عليها فوراً.',
  },
  {
    icon: Filter,
    color: 'bg-[hsl(262,70%,78%)]',
    title: 'الفلترة (The Filter)',
    body: 'هيفضل معاك 2 أو 3 خصائص.. اختار الخاصية الوحيدة اللي مرتبطة بـ "أكبر وجع" عند الشريحة بتاعتك.',
  },
  {
    icon: Target,
    color: 'bg-[hsl(145,50%,70%)]',
    title: 'ترجمة الخاصية لمنفعة',
    body: 'اكتب الخاصية دي بتعمل إيه، وبعدين اسأل "وإيه يعني؟" (So What?) لحد ما توصل للنتيجة النهائية اللي العميل بيشتريها.',
  },
];

const STEP = {
  INTRO: 0,
  CONCEPT_1: 1,
  CONCEPT_2: 2,
  QUIZ_0: 3,
  QUIZ_1: 4,
  QUIZ_2: 5,
  SCORE: 6,
  ACTION_0: 7,
  ACTION_1: 8,
  ACTION_2: 9,
  ACTION_3: 10,
  SOCIETY: 11,
} as const;

const TOTAL_STEPS = 12;

const TeachCard = ({
  icon: Icon,
  accent,
  title,
  children,
}: {
  icon: React.ElementType;
  accent: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-1 flex-col">
    <div
      className={`mb-5 flex h-14 w-14 items-center justify-center border-[3px] border-[hsl(0,0%,10%)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${accent}`}
    >
      <Icon className="h-7 w-7" />
    </div>
    <h2 className="mb-4 text-2xl font-extrabold leading-tight">{title}</h2>
    <div className="text-base font-semibold leading-relaxed opacity-80">{children}</div>
  </div>
);

const OneFeature = () => {
  useSEO({
    title: 'وهم الـ Features الكتير — المنفعة الواحدة اللي هتخلي عميلك يختارك | Mentorna',
    description:
      'اتعلم إزاي تبطل تجمع Features وتركز على المنفعة الواحدة اللي بتحل وجع حقيقي. أداة مجانية ابني Startup في 30 يوم — الحلقة التانية.',
    canonical: 'https://mentorna.com/one-feature',
  });

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, FunnelQuizOption['id']>>({});

  const quizIndex =
    step === STEP.QUIZ_0 ? 0 : step === STEP.QUIZ_1 ? 1 : step === STEP.QUIZ_2 ? 2 : -1;

  const score = useMemo(
    () =>
      QUIZ.reduce((acc, q, i) => {
        const chosen = q.options.find((o) => o.id === answers[i]);
        return acc + (chosen?.correct ? 1 : 0);
      }, 0),
    [answers],
  );

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const quizLocked = quizIndex >= 0 && answers[quizIndex] === undefined;

  const footer =
    step === STEP.SOCIETY ? null : (
      <FunnelContinue
        onClick={next}
        disabled={quizLocked}
        label={
          step === STEP.INTRO
            ? 'ابدأ'
            : step === STEP.SCORE
              ? 'شوف الـ Framework'
              : step === STEP.ACTION_3
                ? 'الخطوة الأخيرة'
                : 'كمّل'
        }
        variant={step === STEP.SCORE || step === STEP.ACTION_3 ? 'green' : 'dark'}
      />
    );

  const renderStep = () => {
    switch (step) {
      case STEP.INTRO:
        return (
          <div className="flex flex-1 flex-col items-center text-center">
            <div className="relative mb-5">
              <img
                src="https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png"
                alt="أحمد عزت"
                className="h-20 w-20 rounded-full border-[3px] border-[hsl(0,0%,10%)] object-cover shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              />
              <span className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[hsl(0,0%,10%)] bg-[hsl(196,85%,52%)]">
                <CheckCircle className="h-4 w-4 text-white" />
              </span>
            </div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] opacity-50">
              {SERIES_TITLE} · الحلقة ٢
            </p>
            <h1 className="mb-3 text-2xl font-extrabold leading-tight md:text-3xl">
              ليه كتر الـ Features{' '}
              <span className="bg-[hsl(45,95%,65%)] px-1">بيقتل الـ Startup</span> قبل ما تبدأ؟
            </h1>
            <p className="mb-6 max-w-sm text-base font-semibold leading-relaxed opacity-70">
              متجمعش مميزات المنافسين وتزود عليهم 5 كمان. اكتشف الـ Benefit الوحيدة اللي هتخلي
              العميل يختارك ويفتكرك.
            </p>
            <div className="mt-auto flex items-center gap-2 border-[3px] border-[hsl(0,0%,10%)] bg-white px-4 py-3 text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Target className="h-4 w-4" />
              {TOTAL_STEPS - 1} خطوة · دقيقتين تقريباً
            </div>
          </div>
        );

      case STEP.CONCEPT_1:
        return (
          <TeachCard
            icon={Layers}
            accent="bg-[hsl(145,50%,70%)]"
            title="الـ Feature مش الـ Benefit"
          >
            <p>
              الـ Feature بتقول: <span className="font-extrabold">"عندنا مساحة 1 تيرا"</span>
            </p>
            <p className="mt-3">
              الـ Benefit بتقول:{' '}
              <span className="bg-[hsl(45,95%,65%)] px-1 font-extrabold">
                "عمرك ما هتمسح صورة بتحبها تاني"
              </span>
            </p>
            <p className="mt-4 font-extrabold">الناس بتشتري النتيجة مش الأداة.</p>
          </TeachCard>
        );

      case STEP.CONCEPT_2:
        return (
          <TeachCard
            icon={Scissors}
            accent="bg-[hsl(196,85%,70%)]"
            title="سكينة سويسرية ولا مشرط جراح؟"
          >
            <p>
              السكينة السويسرية فيها 20 أداة، بس لو هتعمل عملية دقيقة محتاج{' '}
              <span className="bg-[hsl(45,95%,65%)] px-1 font-extrabold">"مشرط"</span> بيعمل
              حاجة واحدة بس بكفاءة 100%.
            </p>
            <p className="mt-4 font-extrabold">خلي الـ startup بتاعتك مشرط في البداية.</p>
          </TeachCard>
        );

      case STEP.QUIZ_0:
      case STEP.QUIZ_1:
      case STEP.QUIZ_2: {
        const q = QUIZ[quizIndex];
        return (
          <FunnelQuiz
            tag={q.tag}
            question={q.question}
            options={q.options}
            selected={answers[quizIndex] ?? null}
            onPick={(id) =>
              setAnswers((prev) =>
                prev[quizIndex] !== undefined ? prev : { ...prev, [quizIndex]: id },
              )
            }
          />
        );
      }

      case STEP.SCORE:
        return (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[hsl(0,0%,10%)] bg-[hsl(45,95%,65%)] text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              🎉
            </div>
            <h2 className="mb-2 text-2xl font-extrabold">خلّصت الاختبار!</h2>
            <p className="mb-2 text-base font-semibold opacity-70">
              إجاباتك الصح:{' '}
              <span className="font-extrabold text-[hsl(145,63%,32%)]">
                {score} من {QUIZ.length}
              </span>
            </p>
            <p className="max-w-xs text-sm font-semibold leading-relaxed opacity-55">
              دلوقتي نمشي على Framework بسيط يوصّلك للـ Feature الوحيدة بتاعتك.
            </p>
          </div>
        );

      case STEP.ACTION_0:
      case STEP.ACTION_1:
      case STEP.ACTION_2:
      case STEP.ACTION_3: {
        const i = step - STEP.ACTION_0;
        const s = ACTION_STEPS[i];
        return (
          <div className="flex flex-1 flex-col">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] opacity-45">
              خطوة عملية {i + 1} من {ACTION_STEPS.length}
            </p>
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center border-[3px] border-[hsl(0,0%,10%)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${s.color}`}
            >
              <s.icon className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-2xl font-extrabold leading-tight">{s.title}</h2>
            <p className="text-base font-semibold leading-relaxed opacity-80">{s.body}</p>
          </div>
        );
      }

      case STEP.SOCIETY:
        return (
          <div className="flex flex-1 flex-col">
            <FunnelSocietyCta title="كمّل الرحلة مع المجتمع 🚀" />
            <div className="mt-6 flex flex-col items-center gap-2 text-sm font-extrabold">
              {PREV && (
                <a
                  href={`/${PREV.slug}`}
                  className="underline decoration-2 underline-offset-4 opacity-55 hover:opacity-100"
                >
                  ← الحلقة اللي فاتت: {PREV.title}
                </a>
              )}
              {NEXT && (
                <a
                  href={`/${NEXT.slug}`}
                  className="underline decoration-2 underline-offset-4 opacity-55 hover:opacity-100"
                >
                  الحلقة الجاية: {NEXT.title} ←
                </a>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FunnelShell
      eyebrow={`${SERIES_TITLE} · ${EPISODE.title}`}
      step={step}
      total={TOTAL_STEPS}
      footer={footer}
    >
      {renderStep()}
    </FunnelShell>
  );
};

export default OneFeature;
