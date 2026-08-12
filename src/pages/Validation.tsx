import React, { useMemo, useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import {
  BookOpen,
  Car,
  CheckCircle,
  MessageSquare,
  RefreshCw,
  Rocket,
  Target,
  Users,
  Wallet,
} from 'lucide-react';
import { getEpisodeByNumber, getNextEpisode, getPrevEpisode, SERIES_TITLE } from '@/data/series';
import FunnelShell, { FunnelContinue } from '@/components/funnel/FunnelShell';
import FunnelQuiz, { type FunnelQuizOption } from '@/components/funnel/FunnelQuiz';
import FunnelSocietyCta from '@/components/funnel/FunnelSocietyCta';

const EPISODE_NUMBER = 3;
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
    tag: 'فوبيا السرقة',
    question: 'صاحبك بيقول لك: "عندي فكرة startup عبقرية بس مش هقولها لحد".. ترد عليه بإيه؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'صح، ما تقولش لحد وابدأ نفّذ في السكات.',
        feedback: '❌ طب لو مش هتقول لحد، مين اللي هيقول لك إن الفكرة تنفع أصلاً؟',
      },
      {
        id: 'b',
        correct: true,
        text: 'طيب مين العميل بتاعك؟ واتكلمت مع كام واحد منهم؟',
        feedback:
          '✅ صح. الفكرة بتساوي صفر لحد ما تختبرها. الـ Feedback أهم بكتير من السرية.',
      },
      {
        id: 'c',
        correct: false,
        text: 'أنا مش هسرقها والله، قول لي أنا بس.',
        feedback:
          '❌ المشكلة مش في اللي هيسمعها منك. المشكلة إنك لسه ما اختبرتش لو حد محتاجها.',
      },
    ],
  },
  {
    tag: 'أول خطوة',
    question: 'فكرة startup لسه جاية في دماغك دلوقتي.. أول حاجة تعملها إيه؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'أسجّل الاسم التجاري وأعمل شركة عشان أحمي الفكرة.',
        feedback: '❌ دفعت فلوس ووقت في حماية حاجة لسه ما تعرفش السوق عايزها ولا لأ.',
      },
      {
        id: 'b',
        correct: false,
        text: 'أستنى لحد ما يبقى عندي Prototype شغال أعرضه للناس.',
        feedback: '❌ ممكن تقعد شهور تبني حاجة محدش عايزها. اختبر الطلب الأول.',
      },
      {
        id: 'c',
        correct: true,
        text: 'أعمل Landing Page في يوم واحد وأشوف الناس هتسجّل ولا لأ.',
        feedback:
          '✅ دي أرخص وأسرع validation. صفحة واحدة، وعد واحد، ومن غير ما تكتب سطر كود.',
      },
    ],
  },
  {
    tag: 'قدام المستثمر',
    question: 'مستثمر سألك: "إيه المنافسين بتوعك؟".. الرد الصح إيه؟',
    options: [
      {
        id: 'a',
        correct: false,
        text: 'مفيش منافسين خالص، فكرتي Unique.',
        feedback:
          '❌ أسوأ إجابة. المستثمر بيسمعها كـ Red Flag: يا إما السوق مش موجود، يا إما أنت ما بحثتش.',
      },
      {
        id: 'b',
        correct: true,
        text: 'في 3 حلول موجودة فعلاً، وأنا مختلف عنهم في كذا وكذا.',
        feedback:
          '✅ صح. وجود منافسين معناه إن فيه سوق. والاختلاف في التنفيذ هو اللي بيبيع.',
      },
      {
        id: 'c',
        correct: false,
        text: 'مش عارف، ما سألتش حد عشان محدش يسرق الفكرة.',
        feedback: '❌ مش عارف السوق يعني مش جاهز تنفّذ فيه. المستثمر هيمشي فوراً.',
      },
    ],
  },
];

const MYTHS = [
  {
    icon: Users,
    color: 'bg-[hsl(45,95%,65%)]',
    stat: 'نادر جداً',
    body: 'إن حد ياخد فكرتك وينفّذها وينجح بيها. الناس مشغولة بمشاكلها هي، ومحدش فاضي ينفّذ فكرة غيره.',
  },
  {
    icon: RefreshCw,
    color: 'bg-[hsl(196,85%,70%)]',
    stat: 'أسابيع مش شهور',
    body: 'ده الوقت اللي الفرق الشاطرة بتاخده في الـ Validation قبل ما تكتب سطر كود واحد.',
  },
  {
    icon: Target,
    color: 'bg-[hsl(262,70%,78%)]',
    stat: 'السبب رقم ١ للفشل',
    body: 'إن مفيش سوق محتاج المنتج. مش المنافسة، ولا السرقة، ولا قلة الفلوس.',
  },
];

const ACTION_STEPS = [
  {
    icon: MessageSquare,
    color: 'bg-[hsl(45,95%,65%)]',
    title: 'اتكلم مع 10 عملاء محتملين',
    body: 'مش عيلتك ومش أصحابك. عشرة ناس فعلاً من الشريحة اللي بتستهدفها. واسألهم عن المشكلة، مش عن الفكرة. لو ما عرفتش توصل لـ 10، دي أول إشارة إن الشريحة نفسها مش واضحة.',
  },
  {
    icon: Rocket,
    color: 'bg-[hsl(196,85%,70%)]',
    title: 'ابني Landing Page في 24 ساعة',
    body: 'صفحة واحدة، وعد واحد، وزرار "احجز مكانك". من غير كود. لو الناس سجّلت، عندك إشارة. لو محدش سجّل، يبقى الوعد ضعيف أو الشريحة غلط.',
  },
  {
    icon: Wallet,
    color: 'bg-[hsl(145,50%,70%)]',
    title: 'جرّب تاخد فلوس قبل ما تبني',
    body: 'Pre-order، أو عربون، أو اشتراك مبدئي، حتى لو دولار واحد. اللي بيدفع بيقول لك الحقيقة، واللي بيمدح ببلاش بيجاملك.',
  },
  {
    icon: RefreshCw,
    color: 'bg-[hsl(262,70%,78%)]',
    title: 'لو الإشارات ضعيفة.. اعمل Pivot بسرعة',
    body: 'غيّر الشريحة، أو العرض، أو السعر. الأفكار بتساوي صفر، فإنك تسيب فكرة مش خسارة، ده كسب وقت.',
  },
];

const STEP = {
  INTRO: 0,
  CONCEPT_1: 1,
  CONCEPT_2: 2,
  MYTHS: 3,
  QUIZ_0: 4,
  QUIZ_1: 5,
  QUIZ_2: 6,
  SCORE: 7,
  ACTION_0: 8,
  ACTION_1: 9,
  ACTION_2: 10,
  ACTION_3: 11,
  SOCIETY: 12,
} as const;

const TOTAL_STEPS = 13;

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

const Validation = () => {
  useSEO({
    title: 'وهم سرقة الأفكار — الفكرة بتساوي صفر والتنفيذ بيساوي ملايين | Mentorna',
    description:
      'بتخاف حد يسرق فكرة الـ Startup بتاعتك؟ اتعلم ليه كتمان الفكرة بيقتلها، وإزاي تعمل Validation صح من أول يوم. ابني Startup في 30 يوم — الحلقة التالتة.',
    canonical: 'https://mentorna.com/validation',
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
              ? 'شوف الـ Sprint'
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
              {SERIES_TITLE} · الحلقة ٣
            </p>
            <h1 className="mb-3 text-2xl font-extrabold leading-tight md:text-3xl">
              بتخاف حد <span className="bg-[hsl(45,95%,65%)] px-1">يسرق فكرتك</span>؟ اقرأ ده
              الأول
            </h1>
            <p className="mb-6 max-w-sm text-base font-semibold leading-relaxed opacity-70">
              الحقيقة المُرة: أفكار الـ Startups بتساوي صفر، والتنفيذ هو اللي بيساوي ملايين. كتمان
              فكرتك مش بيحميها، ده بيقتلها.
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
            icon={BookOpen}
            accent="bg-[hsl(45,95%,65%)]"
            title="لو الفكرة هي كل حاجة.. كلنا كنا بقينا فورمة"
          >
            <p>
              كتب التخسيس كلها بتقول نفس الكلام، والمعلومة مش سر ومتاحة ببلاش لأي حد.
            </p>
            <p className="mt-3">
              أمّال ليه مش كل اللي قروا الكتاب خسّوا؟ لأن المعرفة سهلة، واللي صعب إنك تنفّذ كل يوم
              وأنت مش فاضي ومش في مودك.
            </p>
            <p className="mt-4 font-extrabold">
              الفكرة (الكتاب) = <span className="bg-[hsl(45,95%,65%)] px-1">صفر</span> · التنفيذ
              (إنك تلتزم) = <span className="bg-[hsl(45,95%,65%)] px-1">ملايين</span>
            </p>
          </TeachCard>
        );

      case STEP.CONCEPT_2:
        return (
          <TeachCard
            icon={Car}
            accent="bg-[hsl(196,85%,70%)]"
            title="محدش «بيملك» فكرة عربية تنقلني"
          >
            <p>
              Uber و Careem و Bolt و InDrive و Yango.. نفس الفكرة بالظبط، وكلهم موجودين مع بعض
              دلوقتي.
            </p>
            <p className="mt-3">
              أفكار مسروقة؟ لأ.{' '}
              <span className="bg-[hsl(45,95%,65%)] px-1 font-extrabold">
                أسواق مختلفة وتنفيذ مختلف
              </span>
              ، ولسه فيه مكان للكل يكسب.
            </p>
            <p className="mt-4 font-extrabold">الفكرة مش هي اللي بتحميك، التنفيذ هو اللي بيفرق.</p>
          </TeachCard>
        );

      case STEP.MYTHS:
        return (
          <div className="flex flex-1 flex-col">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] opacity-45">
              نكسر الوهم
            </p>
            <h2 className="mb-5 text-2xl font-extrabold leading-tight">
              3 حاجات محدش بيقولهالك
            </h2>
            <div className="flex flex-col gap-3">
              {MYTHS.map((m) => (
                <div
                  key={m.stat}
                  className="flex items-start gap-3 border-[3px] border-[hsl(0,0%,10%)] bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[hsl(0,0%,10%)] ${m.color}`}
                  >
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold leading-tight">{m.stat}</p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed opacity-70">
                      {m.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              دلوقتي خد الـ Validation Sprint: 4 خطوات تختبر بيهم فكرتك الأسبوع ده.
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
              Validation Sprint · خطوة {i + 1} من {ACTION_STEPS.length}
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
            <p className="mt-5 text-center text-sm font-semibold leading-relaxed opacity-60">
              "أول حد يحكم على فكرتك مش أنت، ولا مستثمر، ولا صاحبك.. العميل. لو ما سألتوش، أنت بس
              بتخمّن."
            </p>
            <div className="mt-5 flex flex-col items-center gap-2 text-sm font-extrabold">
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

export default Validation;
