
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

const ComingSoonHeader = () => {
  return (
    <div className="text-center mb-20">
      <Badge className="
        bg-foreground/10 
        text-white 
        border-white/20 
        font-heading 
        font-bold 
        text-sm 
        px-4 
        py-2 
        mb-6
        hover:bg-foreground/20
        transition-colors
        duration-300
      ">
        <Lock className="w-4 h-4 mr-2" />
        EXCLUSIVE ACCESS
      </Badge>
      
      <h2 className="
        text-5xl 
        md:text-6xl 
        lg:text-7xl 
        font-heading 
        font-light 
        text-white 
        mb-6 
        leading-none
      ">
        Coming Soon
      </h2>
      
      <div className="
        text-2xl 
        md:text-3xl 
        lg:text-4xl 
        text-white/80 
        font-heading 
        font-light 
        mb-8
      ">
        Revolutionary Programs That Will
        <span className="block text-accent-yellow font-medium mt-2">
          Define Your Future
        </span>
      </div>
      
      <p className="
        text-lg 
        md:text-xl 
        text-white/60 
        font-body 
        font-light 
        max-w-3xl 
        mx-auto 
        leading-relaxed
      ">
        Join the exclusive waiting list for our most ambitious programs yet. 
        Limited seats. Unlimited potential.
      </p>
    </div>
  );
};

export default ComingSoonHeader;
