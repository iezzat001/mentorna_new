
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Target, Users, Presentation } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import WeekDetailsDialog from '@/components/WeekDetailsDialog';
import WaitingListDialog from './WaitingListDialog';

const ProgramSection = () => {
  const phaseOneWeeks = [
    {
      week: 1,
      title: "The Entrepreneurial Mindset",
      description: "Learn to think like a founder and spot problems that become business ideas.",
      phase: "Foundation Building"
    },
    {
      week: 2,
      title: "From Idea to Digital Blueprint",
      description: "Turn ideas into clear plans using AI tools for brainstorming and structure.",
      phase: "Foundation Building"
    },
    {
      week: 3,
      title: "Build a Real App or Website",
      description: "Build a working app or website with drag-and-drop tools. No coding required.",
      phase: "Foundation Building"
    },
    {
      week: 4,
      title: "Talk to Customers",
      description: "Validate ideas by asking the right questions and listening to real feedback.",
      phase: "Foundation Building"
    }
  ];

  const phaseTwoWeeks = [
    {
      week: 5,
      title: "Improve It with AI",
      description: "Enhance apps with smart design and features using AI tools.",
      phase: "Advanced Implementation"
    },
    {
      week: 6,
      title: "Test & Get Feedback",
      description: "Test products with real users and learn to iterate based on feedback.",
      phase: "Advanced Implementation"
    },
    {
      week: 7,
      title: "Pitch Like a CEO",
      description: "Master storytelling and confidence to present like a young entrepreneur.",
      phase: "Advanced Implementation"
    },
    {
      week: 8,
      title: "Launch Day",
      description: "Showcase products in a final demo and celebrate the journey from idea to business.",
      phase: "Advanced Implementation"
    }
  ];

  // Mobile Week Button Component
  const MobileWeekButton = ({ week }) => (
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
        "
      >
        <div className="font-black text-sm uppercase leading-tight">
          WEEK {week.week}
        </div>
        <div className="font-black text-xs uppercase leading-tight text-foreground/90">
          {week.title}
        </div>
        <div className="font-body text-xs text-foreground/70 leading-tight">
          {week.description}
        </div>
      </Button>
    </WeekDetailsDialog>
  );

  // Desktop Week Button Component  
  const DesktopWeekButton = ({ week }) => (
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

  const PhaseCard = ({ weeks, phaseTitle, phaseSubtitle, phaseColor }) => (
    <Card className="
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
    ">
      <CardHeader className={`${phaseColor} border-b-2 sm:border-b-4 border-foreground p-4 sm:p-6`}>
        <CardTitle className="font-black text-lg sm:text-xl lg:text-2xl uppercase text-foreground leading-tight">
          {phaseTitle}
        </CardTitle>
        <p className="font-body text-xs sm:text-sm font-semibold text-foreground/80 mt-1">
          {phaseSubtitle}
        </p>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6">
        <div className="grid gap-2 sm:gap-4">
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

  return (
    <section className="bg-background border-b-2 sm:border-b-4 border-foreground py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="
            font-heading 
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
            font-black 
            uppercase 
            text-foreground 
            mb-4 sm:mb-6
            leading-tight
            px-2
          ">
            TECH ENTREPRENEUR IN 8 WEEKS
          </h2>
          <div className="
            bg-primary 
            text-primary-foreground 
            font-black 
            uppercase 
            px-4 sm:px-6 
            py-2 
            text-xs sm:text-sm 
            border-2 sm:border-4 
            border-foreground 
            inline-block
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          ">
            TWO INTENSIVE PHASES
          </div>
        </div>

        {/* Two Phase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <PhaseCard 
            weeks={phaseOneWeeks}
            phaseTitle="PHASE I: FOUNDATION"
            phaseSubtitle="4 weeks to build entrepreneurial thinking & first prototype"
            phaseColor="bg-accent-purple"
          />
          
          <PhaseCard 
            weeks={phaseTwoWeeks}
            phaseTitle="PHASE II: MASTERY"
            phaseSubtitle="4 weeks to refine, test, and launch like a pro"
            phaseColor="bg-accent-green"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <WaitingListDialog>
            <Button className="
              bg-primary 
              hover:bg-primary-hover
              border-2 sm:border-4 
              border-foreground 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
              font-black 
              text-sm sm:text-base lg:text-lg 
              px-6 sm:px-8 
              py-3 sm:py-4
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              w-full sm:w-auto
            ">
              START YOUR JOURNEY TODAY!
            </Button>
          </WaitingListDialog>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
