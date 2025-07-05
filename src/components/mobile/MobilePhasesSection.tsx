
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WaitingListDialog from '../WaitingListDialog';
import PhaseHeader from './PhaseHeader';
import PhaseWeekCard from './PhaseWeekCard';
import PhaseSwipeIndicator from './PhaseSwipeIndicator';

interface PhaseData {
  phase: string;
  title: string;
  description: string;
  color: string;
  icon: React.ElementType;
  weeks: Array<{
    week: number;
    title: string;
    description: string;
  }>;
}

interface MobilePhasesSectionProps {
  phase: PhaseData;
}

const MobilePhasesSection = ({ phase }: MobilePhasesSectionProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-background to-accent-yellow/20">
      {/* Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-foreground font-light tracking-wide text-xl">
          iLab® Program
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-center p-6">
        {/* Phase Header */}
        <PhaseHeader 
          phase={phase.phase}
          title={phase.title}
          color={phase.color}
          icon={phase.icon}
        />

        {/* Phase Description */}
        <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white mb-6">
          <CardHeader className={`${phase.color} border-b-4 border-foreground`}>
            <CardTitle className="font-black text-lg uppercase text-foreground">
              {phase.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="font-body text-sm font-semibold text-foreground/80 mb-4">
              {phase.description}
            </p>
            
            {/* Weeks Preview */}
            <div className="space-y-2">
              {phase.weeks.map((week) => (
                <PhaseWeekCard key={week.week} week={week} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <WaitingListDialog>
          <Button className="
            w-full 
            bg-primary 
            border-4 
            border-foreground 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
            font-black 
            uppercase 
            py-4 
            text-base
            hover:translate-x-1 
            hover:translate-y-1 
            hover:shadow-none 
            transition-all
          ">
            JOIN WAITING LIST 🚀
          </Button>
        </WaitingListDialog>
      </div>

      {/* Swipe Indicator */}
      <PhaseSwipeIndicator />
    </div>
  );
};

export default MobilePhasesSection;
