
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Sparkles } from 'lucide-react';

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    interestedInWebinar: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: formData.email,
          name: formData.name || null,
          interested_in_webinar: formData.interestedInWebinar
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed!",
            description: "You're already on our newsletter list. Stay tuned for updates!",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome Aboard! 🚀",
          description: "You've successfully joined our newsletter. Expect amazing AI insights coming your way!",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          email: '',
          name: '',
          interestedInWebinar: true
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center px-8 py-16 relative overflow-hidden">
      {/* Subtle background elements for visual continuity */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-purple/20 to-accent-blue/15 rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-accent-yellow/15 to-accent-green/10 rounded-full blur-2xl animate-pulse opacity-25" style={{ animationDelay: '5s', animationDuration: '10s' }} />
      </div>

      <div className="text-center max-w-4xl space-y-12 relative z-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Join the AI Revolution
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-semibold leading-relaxed font-body max-w-3xl mx-auto">
            Get AI insights & early access
          </p>
        </div>
        
        {/* Newsletter Subscription Form */}
        <div className="pt-8 max-w-md mx-auto">
          {/* Webinar Announcement Box */}
          <div className="
            bg-accent-yellow 
            border-4 
            border-foreground 
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
            p-6 
            text-center
            mb-6
          ">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="h-6 w-6 mr-2 text-foreground" />
              <h3 className="font-heading text-lg font-black uppercase text-foreground">
                FREE WEBINAR COMING!
              </h3>
            </div>
            <p className="font-body text-sm font-semibold text-foreground/80">
              Get a taste of our AI bootcamp experience before anyone else. 
              Join our exclusive webinar and discover the future of AI education!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold text-sm uppercase text-white">
                Name (Optional)
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="YOUR NAME"
                className="
                  border-4 
                  border-white 
                  shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] 
                  font-semibold
                  bg-white/10
                  text-white
                  placeholder:text-white/60
                  focus:bg-white/20
                  focus:translate-x-1 
                  focus:translate-y-1 
                  focus:shadow-none 
                  transition-all
                "
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-sm uppercase text-white">
                Email Address *
              </Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="YOUR@EMAIL.COM"
                className="
                  border-4 
                  border-white 
                  shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] 
                  font-semibold
                  bg-white/10
                  text-white
                  placeholder:text-white/60
                  focus:bg-white/20
                  focus:translate-x-1 
                  focus:translate-y-1 
                  focus:shadow-none 
                  transition-all
                "
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Checkbox
                id="webinar"
                checked={formData.interestedInWebinar}
                onCheckedChange={(checked) => handleInputChange('interestedInWebinar', checked === true)}
                className="
                  border-2 
                  border-white 
                  data-[state=checked]:bg-accent-yellow 
                  data-[state=checked]:border-foreground
                "
              />
              <Label 
                htmlFor="webinar" 
                className="font-body text-sm font-semibold text-white/90 cursor-pointer"
              >
                Notify me about the free webinar
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                bg-primary 
                hover:bg-primary-hover
                border-4 
                border-white 
                shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
                font-black 
                text-lg 
                px-8 
                py-6
                uppercase
                hover:translate-x-1 
                hover:translate-y-1 
                hover:shadow-none 
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <Mail className="h-5 w-5 mr-2" />
              {isSubmitting ? 'SUBSCRIBING...' : '🚀 JOIN THE REVOLUTION!'}
            </Button>

            <p className="text-center font-body text-xs font-medium text-white/70 mt-4">
              Join thousands of parents preparing their kids for the AI future!
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
