
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Users, GraduationCap, Heart, MapPin } from 'lucide-react';
import { countries } from '@/data/countries';

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
    country: '',
    childrenCount: '',
    ageGroups: [] as string[],
    codingExperience: '',
    englishLevel: '',
    relationship: '',
    preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as string[]
  });

  // Mobile keyboard handling
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Add keyboard event listener
      const handleKeyboardDismiss = () => {
        // Reset viewport after keyboard dismissal
        setTimeout(() => {
          if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
              // Force viewport reset
              const viewport = document.querySelector('meta[name=viewport]');
              if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
              }
            });
          }
        }, 100);
      };

      document.addEventListener('touchend', handleKeyboardDismiss);
      
      return () => {
        document.removeEventListener('touchend', handleKeyboardDismiss);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      };
    }
  }, [isOpen]);

  const ageGroupOptions = [
    '6-8 years',
    '9-12 years', 
    '13-16 years',
    '17+ years'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.country ||
        !formData.childrenCount || formData.ageGroups.length === 0 || 
        !formData.codingExperience || !formData.englishLevel || 
        !formData.relationship || formData.preferredDays.length === 0) {
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
          country: formData.country,
          children_count: formData.childrenCount,
          age_groups: formData.ageGroups,
          coding_experience: formData.codingExperience,
          english_level: formData.englishLevel,
          relationship: formData.relationship,
          preferred_days: formData.preferredDays
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

  const handlePreferredDayChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: checked
        ? [...prev.preferredDays, day]
        : prev.preferredDays.filter(d => d !== day)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      country: '',
      childrenCount: '',
      ageGroups: [],
      codingExperience: '',
      englishLevel: '',
      relationship: '',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
          mobile-dialog
          max-w-full
          max-h-full
          h-screen
          w-screen
          border-none
          bg-gradient-to-br from-accent-yellow to-accent-yellow/90
          p-0
          m-0
          rounded-none
          flex
          items-center
          justify-center
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
        mobile-dialog
        max-w-full
        max-h-full
        h-screen
        w-screen
        border-none
        bg-gradient-to-br from-slate-900 to-black
        p-0
        m-0
        flex
        flex-col
        rounded-none
        keyboard-safe
      ">
        <DialogHeader className="bg-primary border-b-2 border-white p-4 pt-safe-top flex-shrink-0 relative">
          <button
            onClick={() => handleDialogChange(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close dialog"
          >
            <span className="text-white text-lg font-bold">✕</span>
          </button>
          <DialogTitle className="font-black text-lg uppercase text-primary-foreground text-center">
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
                    rounded-lg
                    text-base
                    font-medium
                  "
                  style={{ fontSize: '16px' }}
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
                    rounded-lg
                    text-base
                    font-medium
                  "
                  style={{ fontSize: '16px' }}
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
                    rounded-lg
                    text-base
                    font-medium
                  "
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-1 block">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Country/Region *
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="
                    h-12
                    border-2 
                    border-white/30
                    bg-white/10
                    backdrop-blur-sm
                    text-white 
                    focus:border-white/60
                    focus:bg-white/20
                    transition-all
                    rounded-lg
                    text-base
                    font-medium
                    [&>span]:text-white/90
                    [&>span]:placeholder:text-white/60
                  " style={{ fontSize: '16px' }}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] bg-slate-800 border-white/20">
                    {countries.map((country) => (
                      <SelectItem 
                        key={country.value} 
                        value={country.value}
                        className="text-white hover:bg-white/10 focus:bg-white/10"
                      >
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    <Label
                      key={count}
                      htmlFor={`mobile-children-${count}`}
                      className="
                        flex items-center space-x-2 
                        bg-white/10 backdrop-blur-sm
                        border border-white/30 
                        rounded-lg p-2
                        cursor-pointer
                        hover:bg-white/20
                        hover:border-white/50
                        active:scale-95
                        transition-all duration-150
                        touch-manipulation
                      "
                    >
                      <RadioGroupItem
                        value={count}
                        id={`mobile-children-${count}`}
                        className="border-white/40 text-accent-yellow flex-shrink-0"
                      />
                      <span className="text-white/90 text-xs font-medium select-none flex-1">
                        {count}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  Age Groups (select all that apply) *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {ageGroupOptions.map((ageGroup) => (
                    <Label
                      key={ageGroup}
                      htmlFor={`mobile-age-${ageGroup}`}
                      className="
                        flex items-center space-x-2 
                        bg-white/10 backdrop-blur-sm
                        border border-white/30 
                        rounded-lg p-2
                        cursor-pointer
                        hover:bg-white/20
                        hover:border-white/50
                        active:scale-95
                        transition-all duration-150
                        touch-manipulation
                      "
                    >
                      <Checkbox
                        id={`mobile-age-${ageGroup}`}
                        checked={formData.ageGroups.includes(ageGroup)}
                        onCheckedChange={(checked) => handleAgeGroupChange(ageGroup, checked === true)}
                        className="border-white/40 data-[state=checked]:bg-accent-yellow data-[state=checked]:border-accent-yellow flex-shrink-0"
                      />
                      <span className="text-white/90 text-xs font-medium select-none flex-1">
                        {ageGroup}
                      </span>
                    </Label>
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
                  {['No, complete beginner', 'Yes, online courses', 'Yes, coding bootcamp', 'Yes, school programs'].map((experience) => (
                    <Label
                      key={experience}
                      htmlFor={`mobile-experience-${experience}`}
                      className="
                        flex items-center space-x-2 
                        bg-white/10 backdrop-blur-sm
                        border border-white/30 
                        rounded-lg p-2
                        cursor-pointer
                        hover:bg-white/20
                        hover:border-white/50
                        active:scale-95
                        transition-all duration-150
                        touch-manipulation
                        w-full
                      "
                    >
                      <RadioGroupItem
                        value={experience}
                        id={`mobile-experience-${experience}`}
                        className="border-white/40 text-accent-yellow flex-shrink-0"
                      />
                      <span className="text-white/90 text-xs font-medium select-none flex-1">
                        {experience}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  English language level *
                </Label>
                <RadioGroup
                  value={formData.englishLevel}
                  onValueChange={(value) => handleInputChange('englishLevel', value)}
                  className="grid grid-cols-3 gap-2"
                >
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <Label
                      key={level}
                      htmlFor={`mobile-english-${level}`}
                      className="
                        flex items-center space-x-2 
                        bg-white/10 backdrop-blur-sm
                        border border-white/30 
                        rounded-lg p-2
                        cursor-pointer
                        hover:bg-white/20
                        hover:border-white/50
                        active:scale-95
                        transition-all duration-150
                        touch-manipulation
                      "
                    >
                      <RadioGroupItem
                        value={level}
                        id={`mobile-english-${level}`}
                        className="border-white/40 text-accent-yellow flex-shrink-0"
                      />
                      <span className="text-white/90 text-xs font-medium select-none flex-1">
                        {level}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  I am the child's... *
                </Label>
                <RadioGroup
                  value={formData.relationship}
                  onValueChange={(value) => handleInputChange('relationship', value)}
                  className="grid grid-cols-3 gap-2"
                >
                  {['Father', 'Mother', 'Educator'].map((relation) => (
                    <Label
                      key={relation}
                      htmlFor={`mobile-relationship-${relation}`}
                      className="
                        flex items-center space-x-2 
                        bg-white/10 backdrop-blur-sm
                        border border-white/30 
                        rounded-lg p-2
                        cursor-pointer
                        hover:bg-white/20
                        hover:border-white/50
                        active:scale-95
                        transition-all duration-150
                        touch-manipulation
                      "
                    >
                      <RadioGroupItem
                        value={relation}
                        id={`mobile-relationship-${relation}`}
                        className="border-white/40 text-accent-yellow flex-shrink-0"
                      />
                      <span className="text-white/90 text-xs font-medium select-none flex-1">
                        {relation}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-white/90 font-medium text-xs mb-2 block">
                  Preferred days for workshops *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <Label
                      key={day}
                      htmlFor={`mobile-day-${day}`}
                      className="
                        flex items-center space-x-2 
                        bg-white/10 backdrop-blur-sm
                        border border-white/30 
                        rounded-lg p-2
                        cursor-pointer
                        hover:bg-white/20
                        hover:border-white/50
                        active:scale-95
                        transition-all duration-150
                        touch-manipulation
                      "
                    >
                      <Checkbox
                        id={`mobile-day-${day}`}
                        checked={formData.preferredDays.includes(day)}
                        onCheckedChange={(checked) => handlePreferredDayChange(day, checked === true)}
                        className="border-white/40 data-[state=checked]:bg-accent-yellow data-[state=checked]:border-accent-yellow flex-shrink-0"
                      />
                      <span className="text-white/90 text-xs font-medium select-none flex-1">
                        {day}
                      </span>
                    </Label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 pb-safe-bottom">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  h-14
                  bg-gradient-to-r from-accent-yellow to-accent-yellow/90
                  hover:from-accent-yellow/90 hover:to-accent-yellow/80
                  active:scale-95
                  text-black 
                  font-bold
                  text-lg
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
