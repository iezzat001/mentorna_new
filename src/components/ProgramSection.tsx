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

  const PhaseCard = ({ weeks, phaseTitle, phaseSubtitle, phaseColor }) => (
    <Card className="
      border-4 
      border-foreground 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      bg-white
      hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
      hover:scale-[1.02] 
      transition-all
      duration-200
    ">
      <CardHeader className={`${phaseColor} border-b-4 border-foreground`}>
        <CardTitle className="font-black text-2xl uppercase text-foreground">
          {phaseTitle}
        </CardTitle>
        <p className="font-body text-sm font-semibold text-foreground/80">
          {phaseSubtitle}
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid gap-4">
          {weeks.map((week) => (
            <WeekDetailsDialog key={week.week} week={week}>
              <Button
                variant="outline"
                className="
                  w-full 
                  justify-between 
                  h-auto 
                  p-4 
                  border-4 
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
                <div className="text-left">
                  <div className="font-black text-sm uppercase mb-1">
                    WEEK {week.week}: {week.title}
                  </div>
                  <div className="font-body text-xs text-foreground/70">
                    {week.description}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0" />
              </Button>
            </WeekDetailsDialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="bg-background border-b-4 border-foreground py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="
            font-heading 
            text-4xl md:text-5xl lg:text-6xl 
            font-black 
            uppercase 
            text-foreground 
            mb-6
          ">
            TECH ENTREPRENEUR IN 8 WEEKS
          </h2>
          <div className="
            bg-primary 
            text-primary-foreground 
            font-black 
            uppercase 
            px-6 
            py-2 
            text-sm 
            border-4 
            border-foreground 
            inline-block
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          ">
            TWO INTENSIVE PHASES
          </div>
        </div>

        {/* Two Phase Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
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
        <div className="text-center mt-12">
          <WaitingListDialog>
            <Button className="
              bg-primary 
              hover:bg-primary-hover
              border-4 
              border-foreground 
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
              font-black 
              text-lg 
              px-8 
              py-4
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
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
