
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
    border-4 
    border-foreground 
    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
    bg-white
    hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
    hover:translate-x-[-2px]
    hover:translate-y-[-2px]
    transition-all
    duration-300
    rounded-2xl
    overflow-hidden
  ">
    <CardHeader className={`${phaseColor} border-b-4 border-foreground p-8`}>
      <CardTitle className="
        font-black 
        text-2xl 
        lg:text-3xl 
        uppercase 
        text-foreground 
        leading-tight
        mb-3
      ">
        {phaseTitle}
      </CardTitle>
      <p className="
        font-body 
        text-base
        lg:text-lg 
        font-semibold 
        text-foreground/80
        leading-relaxed
      ">
        {phaseSubtitle}
      </p>
    </CardHeader>
    
    <CardContent className="p-8">
      <div className="grid gap-6">
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
