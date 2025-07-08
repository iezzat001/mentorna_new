
import React from 'react';
import { ArrowRight } from 'lucide-react';
import WeekDetailsDialog from '@/components/WeekDetailsDialog';

interface DesktopWeekButtonProps {
  week: {
    week: number;
    title: string;
    description: string;
    phase: string;
  };
}

const DesktopWeekButton = ({ week }: DesktopWeekButtonProps) => (
  <WeekDetailsDialog week={week}>
    <div className="
      group
      w-full 
      cursor-pointer
      bg-white 
      border-3 
      border-foreground 
      rounded-xl
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
      hover:translate-x-[-2px]
      hover:translate-y-[-2px]
      transition-all 
      duration-300
      p-6
      min-h-[120px]
      flex
      flex-col
      justify-between
    ">
      {/* Week Number Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="
          bg-foreground 
          text-background 
          px-3 
          py-1 
          rounded-full 
          font-black 
          text-xs 
          uppercase 
          tracking-wider
        ">
          WEEK {week.week}
        </div>
        <ArrowRight className="
          h-5 
          w-5 
          text-foreground/60 
          group-hover:text-foreground 
          group-hover:translate-x-1
          transition-all
          duration-300
          flex-shrink-0
        " />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="
          font-black 
          text-sm 
          lg:text-base
          uppercase 
          text-foreground 
          mb-3
          leading-tight
          line-clamp-2
        ">
          {week.title}
        </h3>
        <p className="
          font-body 
          text-xs 
          lg:text-sm
          text-foreground/70 
          leading-relaxed
          line-clamp-3
        ">
          {week.description}
        </p>
      </div>

      {/* Hover Indicator */}
      <div className="
        mt-4
        h-1 
        bg-accent-yellow/20 
        rounded-full 
        overflow-hidden
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
      ">
        <div className="
          h-full 
          bg-accent-yellow 
          w-0 
          group-hover:w-full 
          transition-all 
          duration-500
          ease-out
        "></div>
      </div>
    </div>
  </WeekDetailsDialog>
);

export default DesktopWeekButton;
