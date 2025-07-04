import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

const SimpleNewsletterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interestedInWebinar: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
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
            description: "You're already on our list. Stay tuned for AI insights!",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        const webinarMessage = formData.interestedInWebinar 
          ? " You'll be notified about our FREE webinar!" 
          : "";
        
        toast({
          title: "Welcome to the AI Revolution! 🚀",
          description: `You'll receive cutting-edge AI insights and updates.${webinarMessage}`,
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
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
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-white/90 font-medium mb-2 block">
              Your Name
            </Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your name"
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
                duration-300
                rounded-xl
                font-medium
              "
            />
          </div>
          
          <div>
            <Label className="text-white/90 font-medium mb-2 block">
              Email Address *
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              disabled={isSubmitting}
              required
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
                duration-300
                rounded-xl
                font-medium
              "
            />
          </div>
        </div>

        {/* Webinar Interest Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="webinar-interest"
            checked={formData.interestedInWebinar}
            onCheckedChange={(checked) => handleInputChange('interestedInWebinar', checked === true)}
            disabled={isSubmitting}
            className="
              mt-1
              border-2 
              border-white/40
              bg-white/10
              data-[state=checked]:bg-accent-yellow 
              data-[state=checked]:border-accent-yellow
              data-[state=checked]:text-black
            "
          />
          <div className="flex-1">
            <Label 
              htmlFor="webinar-interest" 
              className="text-white/90 font-medium cursor-pointer leading-relaxed"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                <span>Yes, notify me about the FREE webinar!</span>
              </div>
              <p className="text-white/70 text-sm">
                Get early access to our exclusive AI bootcamp preview session
              </p>
            </Label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !formData.email.trim()}
          className="
            w-full
            h-14
            bg-gradient-to-r from-accent-yellow to-accent-yellow/90
            hover:from-accent-yellow/90 hover:to-accent-yellow/80
            text-black 
            font-bold
            text-lg
            border-2
            border-transparent
            hover:border-white/20
            transition-all
            duration-300
            rounded-xl
            group
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="h-5 w-5 mr-2" />
              Join the AI Revolution
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
      
    
    </div>
  );
};

export default SimpleNewsletterForm;