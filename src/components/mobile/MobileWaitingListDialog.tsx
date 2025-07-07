
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Users, GraduationCap, Heart } from 'lucide-react';

interface MobileWaitingListDialogProps {
  children: React.ReactNode;
}

const MobileWaitingListDialog = ({ children }: MobileWaitingListDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    childrenCount: '',
    ageGroups: [] as string[],
    codingExperience: ''
  });

  const ageGroupOptions = [
    '6-8 years',
    '9-12 years', 
    '13-16 years',
    '17+ years'
  ];

  const codingExperienceOptions = [
    'No experience',
    'Beginner', 
    'Intermediate',
    'Advanced'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.whatsapp || 
        !formData.childrenCount || formData.ageGroups.length === 0 || 
        !formData.codingExperience) {
      toast({
        title: "Missing Information ⚠️",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waiting_list')
        .insert({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          children_count: formData.childrenCount,
          age_groups: formData.ageGroups,
          coding_experience: formData.codingExperience
        });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: "Welcome Aboard! 🎉",
        description: "You're on the list! We'll contact you within 24 hours with next steps.",
      });

    } catch (error) {
      console.error('Error submitting to waiting list:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      ageGroups: checked
        ? [...prev.ageGroups, ageGroup]
        : prev.ageGroups.filter(group => group !== ageGroup)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      childrenCount: '',
      ageGroups: [],
      codingExperience: ''
    });
    setIsSuccess(false);
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        
        <DialogContent className="
          max-w-md 
          max-h-[90vh] 
          border-2 
          border-white 
          bg-gradient-to-br from-accent-yellow to-accent-yellow/90
          p-0
          rounded-2xl
        ">
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-black text-2xl uppercase text-foreground mb-3">
              You're In!
            </h3>
            <p className="font-body text-foreground/80 text-base mb-6">
              Welcome to the AI revolution! We'll contact you within 24 hours with your next steps.
            </p>
            <Button
              onClick={() => handleDialogChange(false)}
              className="
                w-full
                bg-foreground 
                text-background
                border-2 
                border-foreground 
                font-black 
                uppercase
                hover:bg-foreground/90
                rounded-xl
              "
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="
        max-w-md 
        max-h-[90vh] 
        h-[90vh]
        border-2 
        border-white 
        bg-gradient-to-br from-slate-900 to-black
        p-0
        flex
        flex-col
        rounded-2xl
      ">
        <DialogHeader className="bg-primary border-b-2 border-white p-4 flex-shrink-0 rounded-t-xl">
          <DialogTitle className="font-black text-xl uppercase text-primary-foreground text-center">
            <Sparkles className="h-5 w-5 inline mr-2" />
            Join the Revolution
          </DialogTitle>
          <p className="font-body text-primary-foreground/90 text-center text-sm">
            Secure your child's spot in the AI future!
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="font-black text-white text-sm uppercase flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Contact Information
              </h4>
              
              <div>
                <Label className="text-white/90 font-medium text-xs mb-1 block">
                  Parent/Guardian Name *
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className="
                    h-10
                    border-2 
                    border-white/30
                    bg-white/10
                    backdrop-blur-sm
                    text-white 
                    placeholder:text-white/60
                    focus:border-white/60
                    focus:bg-white/20
                    transition-all
                    rounded-lg
                    text-sm
                  "
                />
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-1 block">
                  Email Address *
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="
                    h-10
                    border-2 
                    border-white/30
                    bg-white/10
                    backdrop-blur-sm
                    text-white 
                    placeholder:text-white/60
                    focus:border-white/60
                    focus:bg-white/20
                    transition-all
                    rounded-lg
                    text-sm
                  "
                />
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-1 block">
                  WhatsApp Number *
                </Label>
                <Input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="
                    h-10
                    border-2 
                    border-white/30
                    bg-white/10
                    backdrop-blur-sm
                    text-white 
                    placeholder:text-white/60
                    focus:border-white/60
                    focus:bg-white/20
                    transition-all
                    rounded-lg
                    text-sm
                  "
                />
              </div>
            </div>

            {/* Children Information */}
            <div className="space-y-3">
              <h4 className="font-black text-white text-sm uppercase flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Child Information
              </h4>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  How many children? *
                </Label>
                <RadioGroup
                  value={formData.childrenCount}
                  onValueChange={(value) => handleInputChange('childrenCount', value)}
                  className="grid grid-cols-2 gap-2"
                >
                  {['1 child', '2 children', '3 children', '4+ children'].map((count) => (
                    <div key={count} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={count}
                        id={count}
                        className="border-white/40 text-accent-yellow"
                      />
                      <Label htmlFor={count} className="text-white/90 text-xs font-medium cursor-pointer">
                        {count}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  Age Groups (select all that apply) *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {ageGroupOptions.map((ageGroup) => (
                    <div key={ageGroup} className="flex items-center space-x-2">
                      <Checkbox
                        id={ageGroup}
                        checked={formData.ageGroups.includes(ageGroup)}
                        onCheckedChange={(checked) => handleAgeGroupChange(ageGroup, checked === true)}
                        className="border-white/40 data-[state=checked]:bg-accent-yellow data-[state=checked]:border-accent-yellow"
                      />
                      <Label htmlFor={ageGroup} className="text-white/90 text-xs font-medium cursor-pointer">
                        {ageGroup}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  Current coding experience *
                </Label>
                <RadioGroup
                  value={formData.codingExperience}
                  onValueChange={(value) => handleInputChange('codingExperience', value)}
                  className="space-y-2"
                >
                  {codingExperienceOptions.map((experience) => (
                    <div key={experience} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={experience}
                        id={experience}
                        className="border-white/40 text-accent-yellow"
                      />
                      <Label htmlFor={experience} className="text-white/90 text-xs font-medium cursor-pointer">
                        {experience}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="pt-4">
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
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Join Waiting List
                  </>
                )}
              </Button>
              <p className="text-white/60 text-xs text-center mt-2">
                We'll contact you within 24 hours!
              </p>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MobileWaitingListDialog;
