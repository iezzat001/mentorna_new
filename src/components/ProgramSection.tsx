
import React from 'react';
import { Button } from '@/components/ui/button';
import PhaseCard from '@/components/PhaseCard';
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

  return (
    <section className="bg-background border-b-2 sm:border-b-4 border-foreground py-6 sm:py-8 lg:py-12 xl:py-16 px-3 sm:px-4 lg:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
          <h2 className="
            font-heading 
            text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
            font-black 
            uppercase 
            text-foreground 
            mb-3 sm:mb-4 lg:mb-6
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
            px-3 sm:px-4 lg:px-6 
            py-2 
            text-xs sm:text-sm 
            border-2 sm:border-4 
            border-foreground 
            inline-block
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            mx-2
          ">
            TWO INTENSIVE PHASES
          </div>
        </div>

        {/* Two Phase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-6 sm:mb-8 lg:mb-12">
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
        <div className="text-center px-2">
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
              px-4 sm:px-6 lg:px-8 
              py-3 sm:py-4
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              w-full sm:w-auto
              max-w-sm sm:max-w-none
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
