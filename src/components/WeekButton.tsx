
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import WeekDetailsDialog from '@/components/WeekDetailsDialog';

interface WeekData {
  week: number;
  title: string;
  description: string;
  phase: string;
}

interface WeekButtonProps {
  week: WeekData;
}

const WeekButton = ({ week }: WeekButtonProps) => {
  // Create a shorter mobile-friendly description
  const getMobileDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length > 8) {
      return words.slice(0, 8).join(' ') + '...';
    }
    return description;
  };

  return (
    <WeekDetailsDialog week={week}>
      <Button
        variant="outline"
        className="
          w-full 
          h-auto 
          p-3 sm:p-4 
          border-2 sm:border-4 
          border-foreground 
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
          hover:translate-x-1 
          hover:translate-y-1 
          hover:shadow-none 
          transition-all
          bg-white
          hover:bg-accent-yellow/20
          text-left
          flex
          items-start
          gap-2 sm:gap-3
        "
      >
        {/* Week number circle - more prominent on mobile */}
        <div className="
          flex-shrink-0
          w-8 h-8 sm:w-10 sm:h-10
          bg-foreground
          text-background
          rounded-full
          flex
          items-center
          justify-center
          font-black
          text-xs sm:text-sm
          mt-1
        ">
          {week.week}
        </div>
        
        {/* Content section */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="font-black text-sm sm:text-base uppercase mb-1 leading-tight">
            {week.title}
          </div>
          
          {/* Mobile description - shorter and hidden on very small screens */}
          <div className="hidden xs:block sm:hidden font-body text-xs text-foreground/70 leading-tight">
            {getMobileDescription(week.description)}
          </div>
          
          {/* Desktop description */}
          <div className="hidden sm:block font-body text-sm text-foreground/70 leading-tight">
            {week.description}
          </div>
        </div>
        
        {/* Arrow */}
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-2" />
      </Button>
    </WeekDetailsDialog>
  );
};

export default WeekButton;
