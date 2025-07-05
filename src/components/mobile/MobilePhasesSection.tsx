
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import WaitingListDialog from '../WaitingListDialog';
import PhaseHeader from './PhaseHeader';
import PhaseSwipeIndicator from './PhaseSwipeIndicator';
import { ChevronRight, Clock, Target, BookOpen, Users, Presentation, Lightbulb as LightbulbIcon, CheckCircle } from 'lucide-react';
import { weekDetailsData } from '@/data/weekDetailsData';

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="h-4 w-4" />;
      case 'workshop':
        return <Users className="h-4 w-4" />;
      case 'seminar':
        return <Presentation className="h-4 w-4" />;
      case 'project':
        return <LightbulbIcon className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-accent-blue text-foreground';
      case 'workshop':
        return 'bg-accent-green text-foreground';
      case 'seminar':
        return 'bg-accent-purple text-foreground';
      case 'project':
        return 'bg-accent-yellow text-foreground';
      default:
        return 'bg-foreground text-background';
    }
  };

  const WeekCard = ({ week }: { week: { week: number; title: string; description: string } }) => {
    const weekData = weekDetailsData[week.week];
    const phaseColor = phase.phase === "PHASE I" ? "bg-accent-purple" : "bg-accent-blue";
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative group active:scale-95 transition-transform duration-150">
            <Card className="
              border-2 
              border-foreground 
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
              bg-white 
              group-active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
              group-active:translate-x-1
              group-active:translate-y-1
              transition-all
              duration-150
            ">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      ${phaseColor}
                      text-foreground 
                      font-black 
                      text-sm 
                      w-8 
                      h-8 
                      flex 
                      items-center 
                      justify-center 
                      border-2 
                      border-foreground
                      rounded-full
                    `}>
                      {week.week}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-xs uppercase text-foreground leading-tight">
                        {week.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Target className="h-3 w-3 text-accent-green" />
                          <span className="text-xs font-semibold text-foreground/60">
                            {weekData?.skills?.length || 0} skills
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-accent-blue" />
                          <span className="text-xs font-semibold text-foreground/60">
                            {weekData?.activities?.length || 0} activities
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-foreground/70" />
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogTrigger>
        
        <DialogContent className="
          w-[calc(100vw-24px)] 
          max-w-lg 
          max-h-[85vh] 
          overflow-y-auto
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          bg-white
          p-0
          mx-auto
          rounded-xl
        ">
          <DialogHeader className={`p-4 border-b-4 border-foreground ${phaseColor}`}>
            <div className="flex items-center gap-3">
              <div className="
                bg-foreground 
                text-background 
                font-black 
                text-lg 
                w-12 
                h-12 
                flex 
                items-center 
                justify-center 
                border-3 
                border-foreground
                rounded-full
              ">
                {week.week}
              </div>
              <div className="flex-1">
                <DialogTitle className="font-black text-lg uppercase text-foreground leading-tight">
                  WEEK {week.week}
                </DialogTitle>
                <p className="font-body text-sm text-foreground/80 mt-1">
                  {week.title}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="p-4 space-y-4">
            {/* Learning Outcome */}
            <div className="bg-accent-green/10 border-2 border-accent-green/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-accent-green" />
                <h3 className="font-black text-sm uppercase text-foreground">Learning Outcome</h3>
              </div>
              <p className="font-body text-xs text-foreground/80 leading-relaxed">
                {weekData?.outcome || 'Learning outcomes are being prepared for this week.'}
              </p>
            </div>

            {/* Activities */}
            {weekData?.activities && weekData.activities.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-black text-sm uppercase text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent-blue" />
                  Activities
                </h3>
                {weekData.activities.map((activity, index) => (
                  <div key={index} className="bg-background/50 border-2 border-foreground/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${getActivityColor(activity.type)} font-black uppercase text-xs px-2 py-0.5`}>
                            {activity.type}
                          </Badge>
                          <span className="text-xs text-foreground/60 font-semibold">
                            {activity.duration}
                          </span>
                        </div>
                        <h4 className="font-black text-xs uppercase text-foreground mb-1">
                          {activity.title}
                        </h4>
                        <p className="font-body text-xs text-foreground/70 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {weekData?.skills && weekData.skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-black text-sm uppercase text-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Skills You'll Master
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {weekData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-accent-green/10 border-2 border-accent-green/30 rounded-lg">
                      <CheckCircle className="h-3 w-3 text-accent-green flex-shrink-0" />
                      <span className="font-body text-xs font-semibold text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-background to-accent-yellow/20">
      {/* Compact Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-8">
        <div className="font-heading text-foreground font-light tracking-wide text-lg">
          iLab® Program
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col p-4 pt-2">
        {/* Compact Phase Header */}
        <div className="text-center mb-4">
          <div className={`inline-flex items-center gap-3 ${phase.color} border-3 border-foreground font-black uppercase px-4 py-2 text-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg`}>
            <phase.icon className="w-5 h-5 text-foreground" />
            <span className="text-sm">{phase.phase}</span>
          </div>
          <h2 className="font-black text-lg uppercase text-foreground mt-2">
            {phase.title}
          </h2>
        </div>

        {/* Compact Phase Description */}
        <div className="bg-white/90 backdrop-blur-sm border-2 border-foreground rounded-xl p-3 mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body text-xs font-semibold text-foreground/80 text-center leading-tight">
            {phase.description}
          </p>
        </div>

        {/* All 4 Weeks - No Scrolling */}
        <div className="flex-1 space-y-2">
          {phase.weeks.map((week) => (
            <WeekCard key={week.week} week={week} />
          ))}
        </div>

        {/* Always Visible CTA Button */}
        <div className="mt-3 mb-6">
          <WaitingListDialog>
            <Button className="
              w-full 
              bg-primary 
              border-3 
              border-foreground 
              shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] 
              font-black 
              uppercase 
              py-3 
              text-sm
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              active:scale-95
            ">
              JOIN WAITING LIST 🚀
            </Button>
          </WaitingListDialog>
        </div>
      </div>

      {/* Swipe Indicator */}
      <PhaseSwipeIndicator />
    </div>
  );
};

export default MobilePhasesSection;
