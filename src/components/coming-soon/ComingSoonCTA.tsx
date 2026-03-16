
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const ComingSoonCTA = () => {
  return (
    <div className="text-center">
      <div className="mb-8">
        <p className="
          text-white/80 
          font-heading 
          font-medium 
          text-xl 
          mb-4
        ">
          Be among the first to know when applications open
        </p>
        <p className="
          text-white/60 
          font-body 
          font-light 
          text-lg
        ">
          Exclusive previews • Early bird pricing • Limited seats
        </p>
      </div>
      
      <Button 
        variant="outline" 
        size="lg"
        className="
          rounded-full 
          border-white/30 
          bg-transparent 
          text-white/80 
          hover:border-white/50 
          hover:text-white 
          hover:bg-white/10
          transition-all 
          duration-300
          font-heading
          font-medium
          px-8
          py-6
          text-lg
          group
        "
      >
        Join Exclusive Waiting List
        <Lock className="w-5 h-5 ml-2 group-hover:animate-pulse" />
      </Button>
    </div>
  );
};

export default ComingSoonCTA;
