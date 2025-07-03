
import React from 'react';
import { Button } from '@/components/ui/button';
import ContactInformationSection from './ContactInformationSection';
import ChildrenInformationSection from './ChildrenInformationSection';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  childrenCount: string;
  ageGroups: string[];
  codingExperience: string;
}

interface WaitingListFormProps {
  formData: FormData;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: string, value: string) => void;
  onAgeGroupChange: (ageGroup: string, checked: boolean) => void;
}

const WaitingListForm = ({
  formData,
  isSubmitting,
  onSubmit,
  onInputChange,
  onAgeGroupChange
}: WaitingListFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ContactInformationSection 
        formData={formData}
        onInputChange={onInputChange}
      />

      <ChildrenInformationSection
        formData={formData}
        onInputChange={onInputChange}
        onAgeGroupChange={onAgeGroupChange}
      />

      <div className="pb-4">
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

        <p className="text-center font-body text-sm font-semibold text-foreground/70 mt-4">
          We'll contact you within 24 hours with next steps!
        </p>
      </div>
    </form>
  );
};

export default WaitingListForm;
