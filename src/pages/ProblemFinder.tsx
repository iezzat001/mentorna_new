import React, { useMemo, useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import {
  Car,
  CheckCircle,
  Layers,
  PenTool,
  Pill,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { getEpisodeByNumber, getNextEpisode, SERIES_TITLE } from '@/data/series';
import FunnelShell, { FunnelContinue } from '@/components/funnel/FunnelShell';
import FunnelQuiz, { type FunnelQuizOption } from '@/components/funnel/FunnelQuiz';
import FunnelSocietyCta from '@/components/funnel/FunnelSocietyCta';

const EPISODE_NUMBER = 1;
const EPISODE = getEpisodeByNumber(EPISODE_NUMBER)!;
const NEXT = getNextEpisode(EPISODE_NUMBER);

type QuizQuestion = {
  tag: string;
  question: string;
  options: FunnelQuizOption[];
};

const QUIZ: QuizQuestion[] = [
  {
    tag: 'فخ المنافسة',
    question: 'نزلت السوق ولقيت شركة عملاقة بتعمل نفس فكرتك بالظبط.. إيه أول رد فعل صح؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'أقفل الشركة وأدوّر على فكرة جديدة تماماً.',
        feedback: '❌ ده تفكير الهواة. لو مفيش منافسة غالباً مفيش سوق.',
      },
      {
        id: 'b',
        correct: false,
        text: 'أدخل معاهم في حرب أسعار وأحرق فلوس عشان أخد عملاءهم.',
        feedback: '❌ الشركات الكبيرة هتكسبك وتخرجك برا السوق في حرب حرق الفلوس.',
      },
      {
        id: 'c',
        correct: true,
        text: 'أدرس الشريحة اللي الشركة دي مهمّشاها، وأركّز إني أحل مشكلتهم بشكل مخصّص.',
        feedback:
          '✅ صح جداً! دي "الفجوة" اللي اتكلمنا عنها. الشركات الكبيرة بطيئة ومبتعرفش ترضي كل الفئات.',
      },
    ],
  },
  {
    tag: 'وهم الاختبار',
    question:
      'عملت انترفيو مع 20 عميل محتمل، كلهم قالوا "فكرة عبقرية وهنشتريها"، بس لما المنتج نزل محدش دفع جنيه.. المشكلة فين؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'التسويق بتاعي ضعيف ومحتاج أصرف على الإعلانات أكتر.',
        feedback: '❌ المشكلة أعمق من التسويق، المنتج نفسه مبني على افتراض غلط.',
      },
      {
        id: 'b',
        correct: true,
        text: 'سألتهم أسئلة افتراضية عن "فكرتي" بدل ما أركّز على سلوكهم الحالي في حل "المشكلة".',
        feedback:
          '✅ ممتاز! العميل ممكن يجاملك في "الفكرة"، بس مش هيدفع إلا لو بتحل "وجع" حقيقي بيعاني منه دلوقتي أو بيصرف عليه.',
      },
      {
        id: 'c',
        correct: false,
        text: 'التسعير غالي ومحتاج أعمل خصومات.',
        feedback: '❌ لو المنتج "مسكن" حقيقي، الناس هتدفع فيه حتى لو غالي.',
      },
    ],
  },
  {
    tag: 'واقع الـ Pivot',
    question:
      'قضيت 6 شهور بتبني منتج، وبعد ما نزل اكتشفت إن المشكلة اللي بتحلها مش مهمة للناس أوي.. تعمل إيه؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'أكمّل شغل وأحاول أقنع الناس إنهم محتاجينه.',
        feedback: '❌ مستحيل تخلق احتياج من العدم. ده تضييع وقت ومجهود.',
      },
      {
        id: 'b',
        correct: false,
        text: 'أضيف features وخصائص جديدة يمكن المنتج يعجبهم.',
        feedback: '❌ المشكلة مش في الخصائص، الأساس في المشكلة نفسها.',
      },
      {
        id: 'c',
        correct: true,
        text: 'أرمي الحل اللي بنيته، وأرجع أدرس مشاكل الشريحة دي من الصفر، وأعمل Pivot.',
        feedback: '✅ عقلية Founder حقيقي! دايماً حب "المشكلة" مش "الحل" بتاعك.',
      },
    ],
  },
];

const ACTION_STEPS = [
  {
    icon: Users,
    color: 'bg-[hsl(45,95%,65%)]',
    title: 'حدد الشريحة بتاعتك',
    body: 'متستهدفش "كل الناس". اختار مجموعة بتفهمها كويس (زي الـ freelancers، طلبة الجامعة، الأمهات العاملات) واعرف إيه اللي مأرقهم بالليل.',
  },
  {
    icon: PenTool,
    color: 'bg-[hsl(196,85%,70%)]',
    title: 'افتح أداة التخطيط',
    body: 'روح على Startup Blueprint. الأداة دي هتساعدك ترسم المشكلة بشكل منظم بدل ما تفضل تخمّن.',
    link: { label: 'StartupBlueprint.dev', href: 'https://www.startupblueprint.dev/' },
  },
  {
    icon: Layers,
    color: 'bg-[hsl(262,70%,78%)]',
    title: 'املأ الفجوة',
    body: 'استخدم الأداة عشان ترسم المنافسين بتوعك، ولاقي "الفجوة" — نقطة الوجع اللي الشركات الكبيرة بطيئة أو أكبر من إنها تهتم بيها.',
  },
  {
    icon: ShieldCheck,
    color: 'bg-[hsl(145,50%,70%)]',
    title: 'اختبر "وجع" المشكلة',
    body: 'استخدم أطر التحقق في Startup Blueprint عشان تشوف الناس فعلاً مستعدة تدفع عشان المشكلة دي تتحل، ولا هي مجرد إزعاج بسيط.',
  },
];

/** Step indices */
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

const ProblemFinder = () => {
  useSEO({
    title: 'محدد مشكلة الـ Startup — المشكلة قبل الفكرة | Mentorna',
    description:
      'اتعلم إزاي تلاقي مشكلة حقيقية ("وجع") تبني عليها الـ Startup بتاعتك بدل ما تضيّع وقتك في تدوير على فكرة عبقرية. أداة مجانية من Mentorna.',
    canonical: 'https://mentorna.com/problem-finder',
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

  const quizLocked =
    quizIndex >= 0 && answers[quizIndex] === undefined;

  const footer =
    step === STEP.SOCIETY ? null : (
      <FunnelContinue
        onClick={next}
        disabled={quizLocked}
        label={
          step === STEP.INTRO
            ? 'ابدأ'
            : step === STEP.SCORE
              ? 'شوف الخطوات'
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
              {SERIES_TITLE} · الحلقة ١
            </p>
            <h1 className="mb-3 text-2xl font-extrabold leading-tight md:text-3xl">
              سر الـ 90% من الـ Startups الناجحة:{' '}
              <span className="bg-[hsl(45,95%,65%)] px-1">المشكلة قبل الفكرة</span>
            </h1>
            <p className="mb-6 max-w-sm text-base font-semibold leading-relaxed opacity-70">
              متضيعش وقتك في تدوير على فكرة عبقرية. اتعلم إزاي تلاقي "وجع" حقيقي تبني عليه
              البيزنس بتاعك.
            </p>
            <div className="mt-auto flex items-center gap-2 border-[3px] border-[hsl(0,0%,10%)] bg-white px-4 py-3 text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Target className="h-4 w-4" />
              {TOTAL_STEPS - 1} خطوة · دقيقتين تقريباً
            </div>
          </div>
        );

      case STEP.CONCEPT_1:
        return (
          <TeachCard icon={Pill} accent="bg-[hsl(145,50%,70%)]" title="بتبيع فيتامين ولا مسكن؟">
            <p>
              الفيتامين حلو بس الناس ممكن تنساه.. المسكن الناس بتجري تشتريه عشان يوقف الوجع.
            </p>
            <p className="mt-4">
              الـ Startup بتاعتك لازم تكون{' '}
              <span className="bg-[hsl(45,95%,65%)] px-1 font-extrabold">مسكن</span> لمشكلة
              حقيقية.
            </p>
          </TeachCard>
        );

      case STEP.CONCEPT_2:
        return (
          <TeachCard icon={Car} accent="bg-[hsl(196,85%,70%)]" title="هل أوبر قفلت السوق؟">
            <p>
              أوبر حلت مشكلة التاكسي.. بس ده ممعناش إن السوق قفل! ظهرت شركات تانية حلت نفس
              المشكلة بس لـ فئة تانية زي النقل الجماعي أو السكوترز.
            </p>
            <p className="mt-4 font-extrabold">المشكلة واحدة بس الزوايا مختلفة!</p>
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
              setAnswers((prev) => (prev[quizIndex] !== undefined ? prev : { ...prev, [quizIndex]: id }))
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
              دلوقتي نترجم العقلية دي لخطوات عملية تقدر تمشي عليها النهاردة.
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
            {s.link && (
              <a
                href={s.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-1 border-[3px] border-[hsl(0,0%,10%)] bg-white px-3 py-2 text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                {s.link.label} ←
              </a>
            )}
          </div>
        );
      }

      case STEP.SOCIETY:
        return (
          <div className="flex flex-1 flex-col">
            <FunnelSocietyCta title="كمّل الرحلة مع المجتمع 🚀" />
            {NEXT && (
              <a
                href={`/${NEXT.slug}`}
                className="mt-6 text-center text-sm font-extrabold underline decoration-2 underline-offset-4 opacity-55 hover:opacity-100"
              >
                الحلقة الجاية: {NEXT.title} ←
              </a>
            )}
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

export default ProblemFinder;
