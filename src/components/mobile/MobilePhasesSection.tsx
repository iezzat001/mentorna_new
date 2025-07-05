
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, Rocket, ChevronDown, Calendar, Target, CheckCircle } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';
import { useWeeksData, useWeekDetails } from '@/hooks/useWeeksData';

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

const WeekDetailsExpanded = ({ weekNumber }: { weekNumber: number }) => {
  const { data: weekDetails, isLoading } = useWeekDetails(weekNumber);

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        <div className="animate-pulse">
          <div className="h-4 bg-foreground/20 rounded mb-2"></div>
          <div className="h-3 bg-foreground/20 rounded mb-1"></div>
          <div className="h-3 bg-foreground/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weekDetails) return null;

  return (
    <div className="p-4 space-y-4 bg-accent-yellow/10">
      {/* Learning Outcome */}
      {weekDetails.outcome && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-accent-green" />
            <h4 className="font-black text-sm uppercase text-foreground">Learning Outcome</h4>
          </div>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">
            {weekDetails.outcome}
          </p>
        </div>
      )}

      {/* Activities */}
      {weekDetails.activities && weekDetails.activities.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent-purple" />
            <h4 className="font-black text-sm uppercase text-foreground">Activities</h4>
          </div>
          <div className="space-y-2">
            {weekDetails.activities.map((activity, index) => (
              <div key={index} className="bg-white border-2 border-foreground/20 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="bg-foreground text-background font-bold uppercase text-xs px-2 py-1 rounded">
                    {activity.type}
                  </span>
                  <span className="text-xs text-foreground/70 font-semibold">{activity.duration}</span>
                </div>
                <h5 className="font-bold text-sm text-foreground mb-1">{activity.title}</h5>
                <p className="text-xs text-foreground/70 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {weekDetails.skills && weekDetails.skills.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent-green" />
            <h4 className="font-black text-sm uppercase text-foreground">Skills You'll Master</h4>
          </div>
          <div className="space-y-1">
            {weekDetails.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-accent-green flex-shrink-0" />
                <span className="font-semibold text-foreground/80">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobilePhasesSection = ({ phase }: MobilePhasesSectionProps) => {
  const IconComponent = phase.icon;
  const { data: weeksData } = useWeeksData();
  
  // Get the actual weeks data from the database that match this phase
  const phaseWeeks = weeksData?.filter(week => {
    if (phase.phase === "PHASE I") {
      return week.phase === "Foundation Building";
    } else if (phase.phase === "PHASE II") {
      return week.phase === "Advanced Implementation";
    }
    return false;
  }) || phase.weeks;
  
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

      {/* Scrollable Content */}
      <div className="relative z-20 h-full overflow-y-auto pb-24">
        <div className="p-6">
          {/* Phase Header */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${phase.color} mb-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <IconComponent className="w-8 h-8 text-foreground" />
            </div>
            
            <h1 className="font-heading text-3xl font-black uppercase text-foreground mb-2 leading-tight">
              TECH ENTREPRENEUR
            </h1>
            <h2 className="font-heading text-2xl font-black uppercase text-foreground mb-2">
              IN 8 WEEKS
            </h2>
            
            <div className={`${phase.color} border-4 border-foreground font-black uppercase px-4 py-2 text-foreground inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
              {phase.phase}
            </div>
          </div>

          {/* Phase Overview */}
          <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white mb-6">
            <CardHeader className={`${phase.color} border-b-4 border-foreground`}>
              <CardTitle className="font-black text-lg uppercase text-foreground">
                {phase.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="font-body text-sm font-semibold text-foreground/80">
                {phase.description}
              </p>
            </CardContent>
          </Card>

          {/* Expandable Weeks */}
          <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white mb-6">
            <CardHeader className="bg-foreground border-b-4 border-foreground">
              <CardTitle className="font-black text-lg uppercase text-white">
                WEEKLY BREAKDOWN
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {phaseWeeks.map((week) => (
                  <AccordionItem 
                    key={week.week} 
                    value={`week-${week.week}`}
                    className="border-b-2 border-foreground/20 last:border-b-0"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent-yellow/20 transition-colors">
                      <div className="flex items-center gap-3 text-left">
                        <div className="bg-foreground text-background font-black text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          {week.week}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-sm uppercase text-foreground leading-tight">
                            {week.title}
                          </h3>
                          <p className="font-body text-xs text-foreground/70 leading-tight mt-1">
                            {week.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <WeekDetailsExpanded weekNumber={week.week} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
