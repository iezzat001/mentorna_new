import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import {
  CheckCircle, XCircle, Target, Pill, Car, Rocket, ArrowLeft,
  Users, PenTool, Layers, ShieldCheck, Sparkles, Mail, MessageCircle, Download,
} from 'lucide-react';
import { getEpisodeByNumber } from '@/data/series';
import { EpisodeBreadcrumb, EpisodePager } from '@/components/series/EpisodeNav';
import SmartCapture from '@/components/series/SmartCapture';

const EPISODE_NUMBER = 1;
const EPISODE = getEpisodeByNumber(EPISODE_NUMBER)!;

// Public CDN (S3 → CloudFront) URL for the downloadable lead-magnet PDF.
// Not stored in the database — served directly from the AWS bucket.
const CANVAS_URL = 'https://d2mp3ttz3u5gci.cloudfront.net/Problem-Finder-Canvas.pdf';

// Section 3 — sequential MCQ (Arabic copy from spec)
type QuizOption = {
  id: 'a' | 'b' | 'c';
  correct: boolean;
  text: string;
  feedback: string;
};

type QuizQuestion = {
  tag: string;
  question: string;
  options: QuizOption[];
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
        feedback: '✅ صح جداً! دي "الفجوة" اللي اتكلمنا عنها. الشركات الكبيرة بطيئة ومبتعرفش ترضي كل الفئات.',
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

// Section 4 — actionable steps (Arabic copy from spec)
const STEPS = [
  {
    icon: Users,
    title: 'حدد الشريحة بتاعتك',
    body: 'متستهدفش "كل الناس". اختار مجموعة بتفهمها كويس (زي الـ freelancers، طلبة الجامعة، الأمهات العاملات) واعرف إيه اللي مأرقهم بالليل.',
    color: 'bg-accent-yellow',
  },
  {
    icon: PenTool,
    title: 'افتح أداة التخطيط',
    body: 'روح على Startup Blueprint. الأداة دي هتساعدك ترسم المشكلة بشكل منظم بدل ما تفضل تخمّن.',
    color: 'bg-accent-blue',
    link: { label: 'StartupBlueprint.dev', href: 'https://www.startupblueprint.dev/' },
  },
  {
    icon: Layers,
    title: 'املأ الفجوة',
    body: 'استخدم الأداة عشان ترسم المنافسين بتوعك، ولاقي "الفجوة" — نقطة الوجع اللي الشركات الكبيرة بطيئة أو أكبر من إنها تهتم بيها.',
    color: 'bg-accent-purple',
  },
  {
    icon: ShieldCheck,
    title: 'اختبر "وجع" المشكلة',
    body: 'استخدم أطر التحقق في Startup Blueprint عشان تشوف الناس فعلاً مستعدة تدفع عشان المشكلة دي تتحل، ولا هي مجرد إزعاج بسيط.',
    color: 'bg-accent-green',
  },
];

const ProblemFinder = () => {
  const { toast } = useToast();

  useSEO({
    title: 'محدد مشكلة الـ Startup — المشكلة قبل الفكرة | Mentorna',
    description:
      'اتعلم إزاي تلاقي مشكلة حقيقية ("وجع") تبني عليها الـ Startup بتاعتك بدل ما تضيّع وقتك في تدوير على فكرة عبقرية. أداة مجانية من Mentorna.',
    canonical: 'https://mentorna.com/problem-finder',
  });

  // Quiz state (sequential, one question at a time)
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption['id']>>({});

  // Lead capture state

  const question = QUIZ[currentQ];
  const selected = answers[currentQ] ?? null;
  const answered = selected !== null;
  const isLastQuestion = currentQ === QUIZ.length - 1;

  const score = useMemo(
    () =>
      QUIZ.reduce((acc, q, i) => {
        const chosen = q.options.find((o) => o.id === answers[i]);
        return acc + (chosen?.correct ? 1 : 0);
      }, 0),
    [answers],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePick = (optId: QuizOption['id']) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [currentQ]: optId }));
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentQ(0);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* ===== Section 1: Hero Banner ===== */}
      <section className="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70 border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-10 md:py-14">
          {/* Creator identity */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
                <img
                  src="https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png"
                  alt="Ahmed Ezzat"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -left-1 bg-accent-blue border-2 border-foreground rounded-full p-1">
                <CheckCircle className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <div className="text-center md:text-start flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1 md:justify-start">
                <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground">أحمد عزت</h2>
                <Badge className="bg-foreground text-background font-bold text-xs px-2 py-0.5 w-fit mx-auto md:mx-0">
                  @mentorna
                </Badge>
              </div>
              <p className="font-body text-sm md:text-base font-semibold text-foreground/80">
                ابني Startup في 30 يوم — الحلقة الأولى
              </p>
            </div>
          </div>

          {/* Headline card */}
          <div className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <Badge className="bg-primary text-primary-foreground font-black uppercase px-3 py-1 text-xs mb-4">
              أداة مجانية
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black text-foreground mb-3 leading-tight">
              سر الـ 90% من الـ Startups الناجحة: <span className="text-primary">المشكلة قبل الفكرة</span> 🚀
            </h1>
            <p className="font-body text-base md:text-lg font-semibold text-foreground/80 mb-6">
              متضيعش وقتك في تدوير على فكرة عبقرية. اتعلم إزاي تلاقي "وجع" حقيقي تبني عليه البيزنس بتاعك.
            </p>
            <Button
              onClick={() => scrollTo('quiz')}
              className="bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-black text-base md:text-lg px-6 py-6 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Target className="w-5 h-5 ml-2" />
              ابدأ الاختبار دلوقتي
            </Button>
          </div>
        </div>
      </section>

      <EpisodeBreadcrumb n={EPISODE_NUMBER} />

      {/* ===== Lead Capture (smart: only asks first-time visitors) ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <SmartCapture
            episode={EPISODE}
            blurb="نزّل الـ Problem-Finder Canvas (مجاناً) وامشي على الخطوات عشان تطلع بأول 3 مشاكل تقدر تبني عليهم فكرتك."
          />
        </div>
      </section>


      {/* ===== Section 2: Concept Simplification & Analogies ===== */}
      <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-4xl font-black text-foreground mb-8 text-center">
            غيّر طريقة تفكيرك في الأول 🧠
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Painkiller vs Vitamin */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="bg-accent-green border-b-4 border-foreground py-4">
                <CardTitle className="font-black text-lg md:text-xl text-foreground flex items-center gap-2">
                  <Pill className="w-6 h-6" />
                  بتبيع فيتامين ولا مسكن؟
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="font-body text-base text-foreground/90 leading-relaxed">
                  الفيتامين حلو بس الناس ممكن تنساه.. المسكن الناس بتجري تشتريه عشان يوقف الوجع.
                  الـ Startup بتاعتك لازم تكون <span className="font-black text-primary">مسكن</span> لمشكلة حقيقية.
                </p>
              </CardContent>
            </Card>

            {/* Uber expansion */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="bg-accent-blue border-b-4 border-foreground py-4">
                <CardTitle className="font-black text-lg md:text-xl text-foreground flex items-center gap-2">
                  <Car className="w-6 h-6" />
                  هل أوبر قفلت السوق؟
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="font-body text-base text-foreground/90 leading-relaxed">
                  أوبر حلت مشكلة التاكسي.. بس ده ممعناش إن السوق قفل! ظهرت شركات تانية حلت نفس المشكلة بس
                  لـ فئة تانية زي النقل الجماعي أو السكوترز.
                  <span className="font-black text-primary"> المشكلة واحدة بس الزوايا مختلفة!</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Section 3: Interactive MCQ (3 questions, one by one) ===== */}
      <section id="quiz" className="py-12 md:py-16 bg-gradient-to-br from-accent-purple/30 to-accent-blue/20 border-b-4 border-foreground scroll-mt-4">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-3">
                اختبار سريع
              </Badge>
              <h2 className="font-heading text-2xl md:text-4xl font-black text-foreground">
                جرّب عقليتك قبل ما تاخد الأداة
              </h2>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-5">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 rounded-full border-2 border-foreground transition-all ${
                    i === currentQ ? 'w-8 bg-primary' : answers[i] ? 'w-2.5 bg-accent-green' : 'w-2.5 bg-white'
                  }`}
                />
              ))}
            </div>

            <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <CardHeader className="bg-accent-yellow border-b-4 border-foreground py-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <Badge className="bg-foreground text-background font-bold text-xs px-2 py-0.5">
                    {question.tag}
                  </Badge>
                  <span className="font-heading font-black text-sm text-foreground/80">
                    سؤال {currentQ + 1} من {QUIZ.length}
                  </span>
                </div>
                <CardTitle className="font-black text-lg md:text-xl text-foreground leading-snug">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {question.options.map((opt) => {
                  const isPicked = selected === opt.id;
                  const stateClasses = !answered
                    ? 'bg-white hover:bg-muted'
                    : opt.correct
                      ? 'bg-accent-green/25 border-accent-green'
                      : isPicked
                        ? 'bg-destructive/15 border-destructive'
                        : 'bg-white opacity-60';

                  return (
                    <div key={opt.id}>
                      <button
                        type="button"
                        onClick={() => handlePick(opt.id)}
                        disabled={answered}
                        className={`w-full text-start flex items-start gap-3 border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 font-semibold transition-all ${stateClasses} ${
                          !answered ? 'hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span className="font-heading font-black text-lg text-foreground shrink-0">
                          {opt.id === 'a' ? 'أ' : opt.id === 'b' ? 'ب' : 'ج'}
                        </span>
                        <span className="font-body text-sm md:text-base text-foreground flex-1">{opt.text}</span>
                        {answered && opt.correct && (
                          <CheckCircle className="w-6 h-6 text-accent-green shrink-0" />
                        )}
                        {answered && isPicked && !opt.correct && (
                          <XCircle className="w-6 h-6 text-destructive shrink-0" />
                        )}
                      </button>

                      {/* Feedback under the picked option, and under the correct one */}
                      {answered && (isPicked || opt.correct) && (
                        <p
                          className={`mt-2 font-body text-sm font-bold px-2 ${
                            opt.correct ? 'text-accent-green' : 'text-destructive'
                          }`}
                        >
                          {opt.feedback}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Next question / completion */}
                {answered && !isLastQuestion && (
                  <div className="pt-2">
                    <Button
                      onClick={() => setCurrentQ((q) => q + 1)}
                      className="w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-black text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      السؤال التالي ←
                    </Button>
                  </div>
                )}

                {answered && isLastQuestion && (
                  <div className="pt-4 text-center border-t-4 border-dashed border-foreground/20 mt-2">
                    <p className="font-heading text-xl font-black text-foreground mt-4 mb-1">
                      خلّصت الاختبار! 🎉
                    </p>
                    <p className="font-body text-sm font-semibold text-foreground/70 mb-4">
                      إجاباتك الصح: <span className="font-black text-accent-green">{score} من {QUIZ.length}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => scrollTo('steps')}
                        className="flex-1 bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        طبّق بالخطوات ←
                      </Button>
                      <Button
                        onClick={restartQuiz}
                        variant="ghost"
                        className="sm:w-auto font-medium text-foreground/60 hover:text-foreground"
                      >
                        ابدأ من الأول
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Actionable Steps ===== */}
      <section id="steps" className="py-12 md:py-16 bg-white border-b-4 border-foreground scroll-mt-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-4xl font-black text-foreground mb-3">
              خطوات عملية بالـ Startup Blueprint 🛠️
            </h2>
            <p className="font-body text-base font-semibold text-foreground/70">
              4 خطوات تتحقق بيها من المشكلة قبل ما تبدأ تبني
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-5">
            {STEPS.map((step, i) => (
              <Card
                key={i}
                className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className={`${step.color} border-b-4 md:border-b-0 md:border-l-4 border-foreground flex md:flex-col items-center justify-center gap-2 p-4 md:w-32 shrink-0`}>
                    <span className="font-heading text-3xl md:text-4xl font-black text-foreground">{i + 1}</span>
                    <step.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <div className="p-5 md:p-6 flex-1">
                    <h3 className="font-heading text-lg md:text-xl font-black text-foreground mb-2">{step.title}</h3>
                    <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed">{step.body}</p>
                    {step.link && (
                      <a
                        href={step.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 font-bold text-primary underline underline-offset-4 hover:text-primary-hover"
                      >
                        {step.link.label}
                        <ArrowLeft className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <EpisodePager n={EPISODE_NUMBER} />

      {/* ===== Community CTA: AI & Entrepreneurial Society (WhatsApp via Tally) ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-accent-green via-accent-green/90 to-accent-green/70 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-2xl mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardContent className="p-6 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-foreground text-background border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight">
                انضم لمجتمع الـ AI &amp; Entrepreneurial Society 🚀
              </h2>
              <p className="font-body text-base md:text-lg font-semibold text-foreground/80 mb-6 max-w-xl mx-auto">
                عايز insights أكتر و webinars وworkshops عملية؟ املأ الفورم وانضم لجروب الـ
                "AI &amp; Entrepreneurial Society" على الواتساب، وهشاركك كل الجديد والفرص هناك أول بأول.
              </p>
              <a
                href="https://tally.so/r/OD5dvY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background border-4 border-foreground shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] font-black text-base md:text-lg px-8 py-5 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Users className="w-5 h-5" />
                املأ الفورم وانضم للمجتمع
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-foreground text-background py-8 border-t-4 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-xl font-bold mb-2">Mentorna®</p>
          <p className="font-body text-sm text-background/70 mb-4">تمكين الجيل القادم من بناة الذكاء الاصطناعي</p>
          <p className="font-body text-xs text-background/50 mb-4">تابعني 👇</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.tiktok.com/@ahmed.ezzat4695"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-accent-yellow transition-colors font-medium"
            >
              TikTok
            </a>
            <a
              href="https://www.instagram.com/ahmedezzat_fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-accent-yellow transition-colors font-medium"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProblemFinder;
