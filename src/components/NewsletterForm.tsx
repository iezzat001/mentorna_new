
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
    
    if (!formData.email.trim()) {
      toast({
        title: "Email Required ✉️",
        description: "Please enter your email address!",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        title: "Invalid Email 📧",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: formData.email.trim(),
          name: formData.name.trim() || null,
          interested_in_webinar: formData.interestedInWebinar
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed! ✨",
            description: "You're already on our list!",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome! 🚀",
          description: "You'll receive AI insights and updates.",
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
        title: "Subscription Failed",
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
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Subtle background elements for visual continuity */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-purple/20 to-accent-blue/15 rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-accent-yellow/15 to-accent-green/10 rounded-full blur-2xl animate-pulse opacity-25" style={{ animationDelay: '5s', animationDuration: '10s' }} />
      </div>

      <div className="text-center max-w-md mx-auto space-y-8 relative z-10">
        {/* Main Heading */}
        <div className="space-y-4">
          <h2 className="text-white text-3xl md:text-4xl font-black uppercase mb-3 leading-tight">
            Join the AI
            <span className="block text-accent-yellow">Revolution</span>
          </h2>
          <p className="text-white/80 text-sm md:text-base font-medium">
            Get AI insights & early access
          </p>
        </div>

        {/* Webinar Announcement Box */}
        <div className="
          bg-accent-yellow 
          border-2 md:border-4 
          border-foreground 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
          p-4 md:p-6 
          text-center
          rounded-lg
        ">
          <div className="flex items-center justify-center mb-2 md:mb-3">
            <Sparkles className="h-4 w-4 md:h-6 md:w-6 mr-2 text-foreground" />
            <h3 className="font-heading text-sm md:text-lg font-black uppercase text-foreground">
              FREE WEBINAR COMING!
            </h3>
          </div>
          <p className="font-body text-xs md:text-sm font-semibold text-foreground/80">
            Get a taste of our AI bootcamp experience before anyone else!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-bold text-xs md:text-sm uppercase text-white text-left block">
              Name
            </Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your Name"
              disabled={isSubmitting}
              className="
                h-12
                border-2 
                border-white/30
                bg-white/10
                backdrop-blur-sm
                text-white 
                placeholder:text-white/60
                focus:border-white/60
                focus:bg-white/20
                transition-all
                rounded-xl
                font-medium
              "
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs md:text-sm uppercase text-white text-left block">
              Email Address *
            </Label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              disabled={isSubmitting}
              className="
                h-12
                border-2 
                border-white/30
                bg-white/10
                backdrop-blur-sm
                text-white 
                placeholder:text-white/60
                focus:border-white/60
                focus:bg-white/20
                transition-all
                rounded-xl
                font-medium
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
                border-white/50 
                data-[state=checked]:bg-accent-yellow 
                data-[state=checked]:border-foreground
              "
            />
            <Label 
              htmlFor="webinar" 
              className="font-body text-xs md:text-sm font-semibold text-white/90 cursor-pointer"
            >
              Notify me about the free webinar
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              h-12
              bg-gradient-to-r from-accent-yellow to-accent-yellow/90
              hover:from-accent-yellow/90 hover:to-accent-yellow/80
              active:scale-95
              text-black 
              font-bold
              border-2
              border-transparent
              transition-all
              rounded-xl
              touch-manipulation
              min-h-[48px]
            "
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                Joining...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Join Revolution
                <Sparkles className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-center font-body text-xs font-medium text-white/50 mt-4">
            No spam. Unsubscribe anytime. 🔒
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
