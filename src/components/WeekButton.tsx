
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
  return (
    <WeekDetailsDialog week={week}>
      <Button
        variant="outline"
        className="
          w-full 
          justify-between 
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
        "
      >
        <div className="text-left flex-1">
          <div className="font-black text-xs sm:text-sm uppercase mb-1 leading-tight">
            WEEK {week.week}: {week.title}
          </div>
          <div className="font-body text-xs text-foreground/70 leading-tight">
            {week.description}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0" />
      </Button>
    </WeekDetailsDialog>
  );
};

export default WeekButton;
