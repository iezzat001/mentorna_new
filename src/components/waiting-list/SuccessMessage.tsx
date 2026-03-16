
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage = ({ onClose }: SuccessMessageProps) => {
  return (
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
        onClick={onClose}
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
  );
};

export default SuccessMessage;
