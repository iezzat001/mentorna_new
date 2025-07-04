
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Rocket } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

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
  const IconComponent = phase.icon;
  
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
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${phase.color} mb-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
            <IconComponent className="w-10 h-10 text-foreground" />
          </div>
          
          <h1 className="font-heading text-4xl font-black uppercase text-foreground mb-2 leading-tight">
            TECH ENTREPRENEUR
          </h1>
          <h2 className="font-heading text-3xl font-black uppercase text-foreground mb-2">
            IN 8 WEEKS
          </h2>
          
          <div className={`${phase.color} border-4 border-foreground font-black uppercase px-4 py-2 text-foreground inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
            {phase.phase}
          </div>
        </div>

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
                <div key={week.week} className="flex items-start space-x-3 p-2 bg-accent-yellow/30 rounded border-2 border-foreground/20">
                  <div className="font-bold text-xs bg-foreground text-background rounded-full w-6 h-6 flex items-center justify-center">
                    {week.week}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-foreground">{week.title}</h4>
                    <p className="text-xs text-foreground/70 mt-1">{week.description}</p>
                  </div>
                </div>
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-1 h-8 bg-foreground/50 rounded-full animate-pulse" />
          <span className="text-foreground/70 text-xs mt-1">Swipe up</span>
        </div>
      </div>
    </div>
  );
};

export default MobilePhasesSection;
