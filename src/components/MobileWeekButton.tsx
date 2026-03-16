
import React from 'react';
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
    <div className="
      w-full 
      cursor-pointer
      bg-white 
      border-3 
      border-foreground 
      rounded-xl
      shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
      hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
      hover:translate-x-[-1px]
      hover:translate-y-[-1px]
      transition-all 
      duration-300
      p-4
      min-h-[100px]
      flex
      flex-col
      gap-2
    ">
      {/* Week Number Badge */}
      <div className="
        bg-foreground 
        text-background 
        px-2 
        py-1 
        rounded-full 
        font-black 
        text-xs 
        uppercase 
        tracking-wider
        self-start
      ">
        WEEK {week.week}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="
          font-black 
          text-sm 
          uppercase 
          text-foreground 
          mb-2
          leading-tight
          line-clamp-2
        ">
          {week.title}
        </h3>
        <p className="
          font-body 
          text-xs 
          text-foreground/70 
          leading-relaxed
          line-clamp-3
        ">
          {week.description}
        </p>
      </div>
    </div>
  </WeekDetailsDialog>
);

export default MobileWeekButton;
