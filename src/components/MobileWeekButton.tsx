
import React from 'react';
import { Button } from '@/components/ui/button';
import WeekDetailsDialog from '@/components/WeekDetailsDialog';

interface MobileWeekButtonProps {
  week: {
    week: number;
    title: string;
    description: string;
    phase: string;
  };
}

const MobileWeekButton = ({ week }: MobileWeekButtonProps) => (
  <WeekDetailsDialog week={week}>
    <Button
      variant="outline"
      className="
        w-full 
        h-auto 
        p-3
        border-2 
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
        flex-col
        items-start
        gap-1
        overflow-hidden
      "
    >
      <div className="font-black text-xs uppercase leading-tight break-words">
        WEEK {week.week}
      </div>
      <div className="font-black text-xs uppercase leading-tight text-foreground/90 break-words text-wrap">
        {week.title}
      </div>
      <div className="font-body text-xs text-foreground/70 leading-tight break-words text-wrap">
        {week.description}
      </div>
    </Button>
  </WeekDetailsDialog>
);

export default MobileWeekButton;
