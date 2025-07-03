
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Phone, Mail, User, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WaitingListDialogProps {
  children: React.ReactNode;
}

const WaitingListDialog = ({ children }: WaitingListDialogProps) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.whatsapp || 
        !formData.childrenCount || formData.ageGroups.length === 0 || 
        !formData.codingExperience) {
      toast({
        title: "Missing Information",
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
        title: "Successfully Registered! 🎉",
        description: "Thank you for joining our waiting list. We'll contact you within 24 hours!",
      });

    } catch (error) {
      console.error('Error submitting to waiting list:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your information. Please try again.",
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
      // Reset form when dialog closes
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="
        max-w-2xl 
        max-h-[85vh] 
        border-4 
        border-foreground 
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
        bg-white
        p-0
        overflow-hidden
      ">
        <DialogHeader className="bg-primary border-b-4 border-foreground p-6 flex-shrink-0">
          <DialogTitle className="font-black text-2xl uppercase text-primary-foreground text-center">
            🚀 JOIN THE WAITING LIST
          </DialogTitle>
          <p className="font-body text-primary-foreground/90 text-center font-semibold">
            Secure your spot in our AI Education Bootcamp!
          </p>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h3 className="font-black text-2xl uppercase text-foreground mb-4">
                REGISTRATION SUCCESSFUL! 🎉
              </h3>
              <p className="font-body text-lg font-semibold text-foreground/80 mb-6">
                Thank you for joining our waiting list!<br />
                We'll contact you within 24 hours with next steps.
              </p>
              <Button
                onClick={() => handleDialogChange(false)}
                className="
                  bg-primary 
                  hover:bg-primary-hover
                  border-4 
                  border-foreground 
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  font-black 
                  uppercase
                  hover:translate-x-1 
                  hover:translate-y-1 
                  hover:shadow-none 
                  transition-all
                "
              >
                CLOSE
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information Section */}
              <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow/20">
                <CardContent className="p-6">
                  <h3 className="font-black text-lg uppercase text-foreground mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    CONTACT INFORMATION
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Parent/Guardian Name *
                      </Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="
                          border-4 
                          border-foreground 
                          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                          font-semibold
                          focus:translate-x-1 
                          focus:translate-y-1 
                          focus:shadow-none 
                          transition-all
                        "
                      />
                    </div>

                    <div>
                      <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address *
                      </Label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        className="
                          border-4 
                          border-foreground 
                          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                          font-semibold
                          focus:translate-x-1 
                          focus:translate-y-1 
                          focus:shadow-none 
                          transition-all
                        "
                      />
                    </div>

                    <div>
                      <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
                        <Phone className="h-4 w-4 inline mr-2" />
                        WhatsApp Number *
                      </Label>
                      <Input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        placeholder="Enter your WhatsApp number"
                        className="
                          border-4 
                          border-foreground 
                          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                          font-semibold
                          focus:translate-x-1 
                          focus:translate-y-1 
                          focus:shadow-none 
                          transition-all
                        "
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Questions Section */}
              <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-purple/20">
                <CardContent className="p-6">
                  <h3 className="font-black text-lg uppercase text-foreground mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    TELL US ABOUT YOUR CHILD(REN)
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Question 1: Number of children */}
                    <div>
                      <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
                        1. How many children do you have? *
                      </Label>
                      <RadioGroup
                        value={formData.childrenCount}
                        onValueChange={(value) => handleInputChange('childrenCount', value)}
                        className="grid grid-cols-2 gap-3"
                      >
                        {['1 child', '2 children', '3 children', '4+ children'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 bg-white border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="font-semibold text-sm">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Question 2: Age group - Multi-select */}
                    <div>
                      <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
                        2. What is their age group? * (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {['8-12 years', '13-15 years', '16-18 years', '19+ years'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 bg-white border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Checkbox
                              id={option}
                              checked={formData.ageGroups.includes(option)}
                              onCheckedChange={(checked) => handleAgeGroupChange(option, checked as boolean)}
                              className="border-2 border-foreground"
                            />
                            <Label htmlFor={option} className="font-semibold text-sm">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Question 3: Coding experience */}
                    <div>
                      <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
                        3. Have they participated in any coding school before? *
                      </Label>
                      <RadioGroup
                        value={formData.codingExperience}
                        onValueChange={(value) => handleInputChange('codingExperience', value)}
                        className="space-y-3"
                      >
                        {[
                          'No, complete beginner',
                          'Yes, online courses',
                          'Yes, coding bootcamp',
                          'Yes, school programs'
                        ].map((option) => (
                          <div key={option} className="flex items-center space-x-2 bg-white border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="font-semibold text-sm">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  bg-primary 
                  hover:bg-primary-hover
                  border-4 
                  border-foreground 
                  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
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
                {isSubmitting ? 'REGISTERING...' : '🚀 JOIN WAITING LIST NOW!'}
              </Button>

              <p className="text-center font-body text-sm font-semibold text-foreground/70">
                We'll contact you within 24 hours with next steps!
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitingListDialog;
