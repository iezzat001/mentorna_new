import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, ArrowRight } from 'lucide-react';

const MobileNewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required ✉️",
        description: "Please enter your email address!",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
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
          email: email.trim(),
          interested_in_webinar: true
        });

      if (error) {
        if (error.code === '23505') {
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
        setEmail('');
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

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] justify-center px-4 max-w-sm mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-6">
          <h2 className="text-white text-3xl font-black uppercase mb-3 leading-tight">
            Join the AI
            <span className="block text-accent-yellow">Revolution</span>
          </h2>
          <p className="text-white/80 text-sm font-medium">
            Get AI insights & early access
          </p>
        </div>

        {/* Simple Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              text-center
            "
          />
          
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
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Bottom Section */}
        <div className="space-y-3">
          <p className="text-white/50 text-xs">
            No spam. Unsubscribe anytime. 🔒
          </p>
          
          {/* End indicator */}
          <div className="flex flex-col items-center pt-2">
            <div className="w-1 h-4 bg-white/30 rounded-full" />
            <span className="text-white/50 text-xs mt-1">End</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNewsletterSection;