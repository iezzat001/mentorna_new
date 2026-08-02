import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import {
  CheckCircle, XCircle, Target, Layers, Filter, ArrowLeft,
  Lightbulb, Scissors, Sparkles, Mail, MessageCircle, Download, Rocket, Users,
} from 'lucide-react';

const SOURCE = 'One Feature Trap';

// CloudFront CDN URL for the 1-Feature Validator Canvas PDF.
// Revealed only after successful lead capture — not stored in DB.
const CANVAS_URL = 'https://d2mp3ttz3u5gci.cloudfront.net/1-Feature-Validator-Canvas.pdf';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Quiz Data ────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    tag: 'رعب المنافسين',
    question: 'صحيت لقيت أكبر منافس ليك نزّل 3 خصائص (Features) جديدة في الأبلكيشن بتاعه.. تتصرف إزاي؟',
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
        feedback: '✅ عقلية ممتازة! جوجل مكسرهاش ياهو لما ضافوا أخبار وطقس، جوجل ركزت إن الـ Search بتاعها يبقى الأحسن.',
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
    question: 'أطلقت الأبلكيشن والناس بتعمله Download، بس بيستخدموه مرة واحدة ويمسحوه.. المشكلة الأكبر غالباً بتكون إيه؟',
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

// ─── Actionable Steps ─────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: Lightbulb,
    title: 'الخطوة الأولى: التفريغ (The Brain Dump)',
    body: 'اكتب كل الـ Features اللي في دماغك واللي شفتها عند المنافسين في ورقة واحدة.',
    color: 'bg-accent-yellow',
  },
  {
    icon: Scissors,
    title: 'الخطوة التانية: اختبار "من غيرها" (The "Without It" Test)',
    body: 'امسك ميزة ميزة واسأل نفسك: "لو شلت دي، هل المنتج لسه بيحل المشكلة الأساسية؟" لو الإجابة آه.. اشطب عليها فوراً.',
    color: 'bg-accent-blue',
  },
  {
    icon: Filter,
    title: 'الخطوة التالتة: الفلترة (The Filter)',
    body: 'هيفضل معاك 2 أو 3 خصائص.. اختار الخاصية الوحيدة اللي مرتبطة بـ "أكبر وجع" عند الشريحة بتاعتك (اللي حددناها في الحلقة الأولى).',
    color: 'bg-accent-purple',
  },
  {
    icon: Target,
    title: 'الخطوة الرابعة: ترجمة الخاصية لمنفعة (Translate Feature to Benefit)',
    body: 'اكتب الخاصية دي بتعمل إيه، وبعدين اسأل "وإيه يعني؟" (So What?) لحد ما توصل للنتيجة النهائية اللي العميل بيشتريها.',
    color: 'bg-accent-green',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const OneFeature = () => {
  const { toast } = useToast();

  useSEO({
    title: 'فخ الـ One Feature — المنفعة الواحدة اللي هتخلي عميلك يختارك | Mentorna',
    description:
      'اتعلم إزاي تبطل تجمع Features وتركز على المنفعة الواحدة اللي بتحل وجع حقيقي. أداة مجانية ابني Startup في 30 يوم — الحلقة التانية.',
    canonical: 'https://mentorna.com/one-feature',
  });

  // ── Quiz state ──────────────────────────────────────────────────────────────
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption['id']>>({});

  // ── Lead capture state ──────────────────────────────────────────────────────
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [contactValue, setContactValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handlePick = (optId: QuizOption['id']) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [currentQ]: optId }));
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentQ(0);
  };

  const handleSubmit = async () => {
    if (!contactValue.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('magnet_leads').insert([{
        email: contactMethod === 'email' ? contactValue.trim() : null,
        whatsapp: contactMethod === 'whatsapp' ? contactValue.trim() : null,
        source: SOURCE,
      }]);
      if (error) throw error;
      setIsSubscribed(true);
      toast({ title: 'تم بنجاح! 🎉', description: 'الـ Canvas في طريقه ليك.' });
    } catch (err) {
      console.error('Error saving lead:', err);
      toast({ title: 'خطأ', description: 'حصلت مشكلة. جرّب تاني بعد شوية.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
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
                ابني Startup في 30 يوم — الحلقة التانية
              </p>
            </div>
          </div>

          {/* Headline card */}
          <div className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <Badge className="bg-primary text-primary-foreground font-black uppercase px-3 py-1 text-xs mb-4">
              أداة مجانية
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black text-foreground mb-3 leading-tight">
              ليه كتر الـ Features{' '}
              <span className="text-primary">بيقتل الـ Startup بتاعتك قبل ما تبدأ؟</span> 💀
            </h1>
            <p className="font-body text-base md:text-lg font-semibold text-foreground/80 mb-6">
              متجمعش مميزات المنافسين وتزود عليهم 5 كمان. اكتشف الـ Benefit الوحيدة اللي هتخلي العميل
              يختارك ويفتكرك.
            </p>
            <Button
              onClick={() => scrollTo('quiz')}
              className="bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-black text-base md:text-lg px-6 py-6 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Target className="w-5 h-5 ml-2" />
              اختبر عقلية الـ Founder بتاعتك
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Concept Simplification & Analogies ===== */}
      <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-3">
              المفهوم الأساسي
            </Badge>
            <h2 className="font-heading text-2xl md:text-4xl font-black text-foreground">
              الـ Feature هي الأداة.. الـ Benefit هي النتيجة 🎯
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Feature vs Benefit card */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="bg-accent-green border-b-4 border-foreground py-4">
                <CardTitle className="font-black text-lg md:text-xl text-foreground flex items-center gap-2">
                  <Layers className="w-6 h-6" />
                  الـ Feature مش الـ Benefit
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <p className="font-body text-base text-foreground/90 leading-relaxed">
                  الـ Feature بتقول:{' '}
                  <span className="font-black">"عندنا مساحة 1 تيرا"</span>
                </p>
                <p className="font-body text-base text-foreground/90 leading-relaxed">
                  الـ Benefit بتقول:{' '}
                  <span className="font-black text-primary">"عمرك ما هتمسح صورة بتحبها تاني"</span>
                </p>
                <p className="font-body text-sm font-semibold text-foreground/70 pt-2 border-t-2 border-dashed border-foreground/20">
                  الناس بتشتري النتيجة مش الأداة.
                </p>
              </CardContent>
            </Card>

            {/* Swiss Army Knife vs Scalpel analogy */}
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="bg-accent-blue border-b-4 border-foreground py-4">
                <CardTitle className="font-black text-lg md:text-xl text-foreground flex items-center gap-2">
                  <Scissors className="w-6 h-6" />
                  سكينة سويسرية ولا مشرط جراح؟
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="font-body text-base text-foreground/90 leading-relaxed">
                  السكينة السويسرية فيها 20 أداة، بس لو هتعمل عملية دقيقة محتاج{' '}
                  <span className="font-black text-primary">"مشرط"</span> بيعمل حاجة واحدة بس بكفاءة 100%.
                </p>
                <p className="font-body text-sm font-semibold text-foreground/70 mt-4 pt-3 border-t-2 border-dashed border-foreground/20">
                  خلي الـ startup بتاعتك مشرط في البداية.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Section 3: Interactive Quiz ===== */}
      <section
        id="quiz"
        className="py-12 md:py-16 bg-gradient-to-br from-accent-purple/30 to-accent-blue/20 border-b-4 border-foreground scroll-mt-4"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-3">
                اختبار الـ True Founder
              </Badge>
              <h2 className="font-heading text-2xl md:text-4xl font-black text-foreground">
                عندك عقلية الـ Founder الصح؟
              </h2>
              <p className="font-body text-base font-semibold text-foreground/70 mt-2">
                3 أسئلة بتختبر فهمك لمشكلة الـ Feature Bloat
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-5">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 rounded-full border-2 border-foreground transition-all ${
                    i === currentQ
                      ? 'w-8 bg-primary'
                      : answers[i] !== undefined
                        ? 'w-2.5 bg-accent-green'
                        : 'w-2.5 bg-white'
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
                          !answered
                            ? 'hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer'
                            : 'cursor-default'
                        }`}
                      >
                        <span className="font-heading font-black text-lg text-foreground shrink-0">
                          {opt.id === 'a' ? 'أ' : opt.id === 'b' ? 'ب' : 'ج'}
                        </span>
                        <span className="font-body text-sm md:text-base text-foreground flex-1">
                          {opt.text}
                        </span>
                        {answered && opt.correct && (
                          <CheckCircle className="w-6 h-6 text-accent-green shrink-0" />
                        )}
                        {answered && isPicked && !opt.correct && (
                          <XCircle className="w-6 h-6 text-destructive shrink-0" />
                        )}
                      </button>

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

                {/* Next question */}
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

                {/* Final score */}
                {answered && isLastQuestion && (
                  <div className="pt-4 text-center border-t-4 border-dashed border-foreground/20 mt-2">
                    <p className="font-heading text-xl font-black text-foreground mt-4 mb-1">
                      خلّصت الاختبار! 🎉
                    </p>
                    <p className="font-body text-sm font-semibold text-foreground/70 mb-4">
                      إجاباتك الصح:{' '}
                      <span className="font-black text-accent-green">
                        {score} من {QUIZ.length}
                      </span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => scrollTo('steps')}
                        className="flex-1 bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        شوف الـ Framework ←
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
            <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-3">
              الـ Framework
            </Badge>
            <h2 className="font-heading text-2xl md:text-4xl font-black text-foreground mb-3">
              إزاي تلاقي الـ Feature الوحيدة بتاعتك؟ 🛠️
            </h2>
            <p className="font-body text-base font-semibold text-foreground/70">
              4 خطوات بسيطة تفلتر بيهم فكرتك وتوصل للـ Core Value
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-5">
            {STEPS.map((step, i) => (
              <Card
                key={i}
                className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div
                    className={`${step.color} border-b-4 md:border-b-0 md:border-l-4 border-foreground flex md:flex-col items-center justify-center gap-2 p-4 md:w-32 shrink-0`}
                  >
                    <span className="font-heading text-3xl md:text-4xl font-black text-foreground">
                      {i + 1}
                    </span>
                    <step.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <div className="p-5 md:p-6 flex-1">
                    <h3 className="font-heading text-lg md:text-xl font-black text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 5: Lead Capture CTA ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-lg mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground text-center py-6">
              {isSubscribed ? (
                <Rocket className="w-12 h-12 mx-auto mb-3 text-foreground" />
              ) : (
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-foreground" />
              )}
              <CardTitle className="font-black text-xl md:text-2xl">
                {isSubscribed ? 'وصلك بنجاح! 🎉' : 'مستعد تبسط فكرتك؟'}
              </CardTitle>
              {!isSubscribed && (
                <p className="font-body text-sm text-foreground/80 mt-2">
                  نزّل الـ 1-Feature Validator Canvas (مجاناً) عشان تفلتر أفكارك وتوصل للـ Core Value اللي
                  هتبني عليها الـ Startup بتاعتك في 30 يوم.
                </p>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {isSubscribed ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
                  <p className="font-body text-lg font-semibold text-foreground mb-5">
                    شكراً لاشتراكك! الـ Canvas في طريقه ليك على{' '}
                    {contactMethod === 'whatsapp' ? 'الواتساب' : 'الإيميل'}.
                  </p>
                  <div className="border-t-4 border-dashed border-foreground/20 pt-5">
                    <p className="font-body text-sm text-foreground/70 mb-3">
                      لو ما وصلكش، حمّل الـ Canvas من هنا مباشرةً 👇
                    </p>
                    <a
                      href={CANVAS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center justify-center gap-2 w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-black text-base py-4 px-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Download className="w-5 h-5" />
                      تحميل الـ 1-Feature Validator Canvas
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {!contactMethod && (
                    <div className="space-y-3">
                      <Button
                        onClick={() => setContactMethod('email')}
                        className="w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Mail className="w-5 h-5 ml-2" />
                        ابعتلي الـ Canvas على الإيميل
                      </Button>
                      <Button
                        onClick={() => setContactMethod('whatsapp')}
                        className="w-full bg-accent-green text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <MessageCircle className="w-5 h-5 ml-2" />
                        ابعتلي الـ Canvas على واتساب
                      </Button>
                    </div>
                  )}

                  {contactMethod && (
                    <div className="space-y-4">
                      <div>
                        <label className="font-bold text-sm mb-2 block text-start">
                          {contactMethod === 'email' ? 'بريدك الإلكتروني' : 'رقم واتساب'}
                        </label>
                        <Input
                          type={contactMethod === 'email' ? 'email' : 'tel'}
                          placeholder={contactMethod === 'email' ? 'your@email.com' : '+20 10 1234 5678'}
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          dir="ltr"
                          className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold text-base py-5 text-start"
                        />
                      </div>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !contactValue.trim()}
                        className="w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-6 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'ابعتلي المخطط ←'}
                      </Button>
                      <button
                        onClick={() => { setContactMethod(null); setContactValue(''); }}
                        className="w-full text-sm font-medium text-foreground/60 hover:text-foreground"
                      >
                        اختر طريقة تانية ←
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-center text-foreground/60">
                    🔒 بدون إزعاج. إلغاء الاشتراك في أي وقت.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== Community CTA ===== */}
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
                عايز insights أكتر وwebinars وworkshops عملية؟ املأ الفورم وانضم لجروب الـ
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

export default OneFeature;
