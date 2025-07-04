
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MobileWeekButton from '@/components/MobileWeekButton';
import DesktopWeekButton from '@/components/DesktopWeekButton';

interface Week {
  week: number;
  title: string;
  description: string;
  phase: string;
}

interface PhaseCardProps {
  weeks: Week[];
  phaseTitle: string;
  phaseSubtitle: string;
  phaseColor: string;
}

const PhaseCard = ({ weeks, phaseTitle, phaseSubtitle, phaseColor }: PhaseCardProps) => (
  <Card className="
    w-full 
    -mx-2 sm:mx-0
    border-2 sm:border-4 
    border-foreground 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
    bg-white
    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
    sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
    hover:scale-[1.01] sm:hover:scale-[1.02] 
    transition-all
    duration-200
    rounded-xl
  ">
    <CardHeader className={`${phaseColor} border-b-2 sm:border-b-4 border-foreground p-4 sm:p-6`}>
      <CardTitle className="font-black text-lg sm:text-xl lg:text-2xl uppercase text-foreground leading-tight">
        {phaseTitle}
      </CardTitle>
      <p className="font-body text-sm sm:text-sm font-semibold text-foreground/80 mt-2">
        {phaseSubtitle}
      </p>
    </CardHeader>
    
    <CardContent className="p-4 sm:p-6">
      <div className="grid gap-4 sm:gap-4">
        {weeks.map((week) => (
          <div key={week.week}>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <MobileWeekButton week={week} />
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden sm:block">
              <DesktopWeekButton week={week} />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default PhaseCard;
