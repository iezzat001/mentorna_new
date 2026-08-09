import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  CheckCircle,
  Download,
  Mail,
  MessageCircle,
  Rocket,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import type { Episode } from '@/data/series';
import {
  addDownload,
  clearLead,
  getLead,
  nextEnrichmentQuestion,
  saveEnrichment,
  saveLead,
  type ContactMethod,
  type EnrichmentQuestion,
  type LeadMemory,
} from '@/lib/leadMemory';

/**
 * Lead capture that only ever asks once.
 *
 *  - First time visitor      -> full contact form (unchanged behaviour)
 *  - Recognised visitor      -> no form at all, straight to the download
 *
 * Either way we still write a magnet_leads row tagged with this episode's
 * source, so per-episode conversion tracking is unaffected.
 */

type Props = {
  episode: Episode;
  /** Arabic pitch line shown above the form for new visitors */
  blurb: string;
};

const SmartCapture = ({ episode, blurb }: Props) => {
  const { toast } = useToast();

  const [lead, setLead] = useState<LeadMemory | null>(null);
  const [ready, setReady] = useState(false);

  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(null);
  const [contactValue, setContactValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubscribed, setJustSubscribed] = useState(false);

  const [question, setQuestion] = useState<EnrichmentQuestion | null>(null);
  const [enrichDone, setEnrichDone] = useState(false);

  // Recognise the visitor on mount
  useEffect(() => {
    setLead(getLead());
    setReady(true);
  }, []);

  const logEngagement = async (method: ContactMethod, value: string) => {
    const { error } = await supabase.from('magnet_leads').insert([
      {
        email: method === 'email' ? value.trim() : null,
        whatsapp: method === 'whatsapp' ? value.trim() : null,
        source: episode.source,
      },
    ]);
    if (error) throw error;
  };

  /** First time capture */
  const handleSubmit = async () => {
    if (!contactMethod || !contactValue.trim()) return;
    setIsSubmitting(true);
    try {
      await logEngagement(contactMethod, contactValue);
      const saved = saveLead(contactMethod, contactValue, episode.n);
      setLead(saved);
      setJustSubscribed(true);
      toast({ title: 'تم بنجاح! 🎉', description: 'الـ Canvas في طريقه ليك.' });
    } catch (err) {
      console.error('Error saving lead:', err);
      toast({
        title: 'خطأ',
        description: 'حصلت مشكلة. جرّب تاني بعد شوية.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Recognised visitor collecting this episode's canvas. Logs silently in the
   * background so the download is never blocked by the network.
   */
  const handleKnownDownload = () => {
    if (!lead) return;
    const alreadyHas = lead.downloaded.includes(episode.n);
    if (!alreadyHas) {
      logEngagement(lead.contactMethod, lead.contactValue).catch((err) =>
        console.error('Silent engagement log failed:', err)
      );
      const updated = addDownload(episode.n);
      setLead(updated);
      setQuestion(nextEnrichmentQuestion(updated));
    }
  };

  const handleAnswer = (field: EnrichmentQuestion['field'], answer: string) => {
    const updated = saveEnrichment({ [field]: answer });
    setLead(updated);
    setEnrichDone(true);
    setQuestion(null);
  };

  const handleNotYou = () => {
    clearLead();
    setLead(null);
    setJustSubscribed(false);
    setContactMethod(null);
    setContactValue('');
    setQuestion(null);
    setEnrichDone(false);
  };

  // Avoid a flash of the wrong state before localStorage is read
  if (!ready) {
    return (
      <Card className="w-full max-w-lg mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <CardContent className="p-10 text-center">
          <div className="animate-pulse font-bold text-foreground/50">جاري التحميل...</div>
        </CardContent>
      </Card>
    );
  }

  const recognised = !!lead && !justSubscribed;

  /* ── Recognised returning visitor: no form ── */
  if (recognised) {
    return (
      <Card className="w-full max-w-lg mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <CardHeader className="bg-accent-green border-b-4 border-foreground text-center py-6">
          <UserCheck className="w-12 h-12 mx-auto mb-3 text-foreground" />
          <CardTitle className="font-black text-xl md:text-2xl">أهلاً بيك تاني 👋</CardTitle>
          <p className="font-body text-sm text-foreground/80 mt-2">
            إحنا عارفينك، مش هنسألك على بياناتك تاني. الـ {episode.canvasName} جاهز ليك.
          </p>
        </CardHeader>

        <CardContent className="p-6 text-center">
          <a
            href={episode.canvasUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={handleKnownDownload}
            className="inline-flex items-center justify-center gap-2 w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-5 px-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <Download className="w-5 h-5" />
            نزّل الـ {episode.canvasName}
          </a>

          {/* Occasional, optional, never blocking */}
          {question && (
            <div className="mt-6 pt-5 border-t-4 border-dashed border-foreground/20 text-start">
              <p className="font-heading font-black text-base text-foreground mb-1">
                سؤال سريع (اختياري)
              </p>
              <p className="font-body text-sm text-foreground/70 mb-3">{question.question}</p>
              <div className="flex flex-wrap gap-2">
                {question.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(question.field, opt)}
                    className="bg-secondary border-2 border-foreground font-bold text-sm px-3 py-2 hover:bg-accent-yellow transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setQuestion(null)}
                className="mt-3 text-xs font-medium text-foreground/50 hover:text-foreground"
              >
                تخطي
              </button>
            </div>
          )}

          {enrichDone && (
            <p className="mt-5 font-body text-sm font-bold text-accent-green">
              شكراً! ده هيساعدني أظبط المحتوى الجاي ليك 🙏
            </p>
          )}

          <div className="mt-5 pt-4 border-t border-foreground/10">
            <p className="font-body text-xs text-foreground/50">
              هنبعتلك الحلقات الجاية على{' '}
              {lead?.contactMethod === 'whatsapp' ? 'الواتساب' : 'الإيميل'}.{' '}
              <button
                onClick={handleNotYou}
                className="underline underline-offset-2 font-bold hover:text-foreground"
              >
                مش أنت؟
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ── First time visitor ── */
  return (
    <Card className="w-full max-w-lg mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
      <CardHeader className="bg-accent-yellow border-b-4 border-foreground text-center py-6">
        {justSubscribed ? (
          <Rocket className="w-12 h-12 mx-auto mb-3 text-foreground" />
        ) : (
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-foreground" />
        )}
        <CardTitle className="font-black text-xl md:text-2xl">
          {justSubscribed ? 'وصلك بنجاح! 🎉' : 'مستعد تطبّق عملي؟'}
        </CardTitle>
        {!justSubscribed && <p className="font-body text-sm text-foreground/80 mt-2">{blurb}</p>}
      </CardHeader>

      <CardContent className="p-6">
        {justSubscribed ? (
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
                href={episode.canvasUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-black text-base py-4 px-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Download className="w-5 h-5" />
                تحميل الـ {episode.canvasName}
              </a>
            </div>
            <p className="mt-5 font-body text-xs text-foreground/50">
              🎬 من دلوقتي مش هنسألك على بياناتك تاني في باقي الحلقات.
            </p>
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
                  onClick={() => {
                    setContactMethod(null);
                    setContactValue('');
                  }}
                  className="w-full text-sm font-medium text-foreground/60 hover:text-foreground"
                >
                  اختر طريقة تانية ←
                </button>
              </div>
            )}

            <p className="text-xs text-center text-foreground/60">
              🔒 بدون إزعاج. إلغاء الاشتراك في أي وقت. مرة واحدة بس لكل السلسلة.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartCapture;
