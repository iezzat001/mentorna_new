
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import WaitingListForm from './waiting-list/WaitingListForm';
import SuccessMessage from './waiting-list/SuccessMessage';

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
        max-h-[90vh] 
        h-[90vh]
        border-4 
        border-foreground 
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
        bg-white
        p-0
        flex
        flex-col
      ">
        <DialogHeader className="bg-primary border-b-4 border-foreground p-6 flex-shrink-0">
          <DialogTitle className="font-black text-2xl uppercase text-primary-foreground text-center">
            🚀 JOIN THE WAITING LIST
          </DialogTitle>
          <p className="font-body text-primary-foreground/90 text-center font-semibold">
            Secure your spot in our AI Education Bootcamp!
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          {isSuccess ? (
            <SuccessMessage onClose={() => handleDialogChange(false)} />
          ) : (
            <WaitingListForm
              formData={formData}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              onAgeGroupChange={handleAgeGroupChange}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default WaitingListDialog;
