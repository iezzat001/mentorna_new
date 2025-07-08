
import React from 'react';
import { Button } from '@/components/ui/button';
import PhaseCard from '@/components/PhaseCard';
import WaitingListDialog from './WaitingListDialog';
import { useWeeksData } from '@/hooks/useWeeksData';
import { Loader2 } from 'lucide-react';

const ProgramSection = () => {
  const { data: weeks, isLoading, error } = useWeeksData();

  if (isLoading) {
    return (
      <section className="bg-background border-b-2 sm:border-b-4 border-foreground py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-semibold">Loading course content...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-background border-b-2 sm:border-b-4 border-foreground py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="bg-red-100 border-4 border-red-500 p-4 rounded">
              <p className="font-bold text-red-700">Failed to load course content</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Separate weeks by phase
  const phaseOneWeeks = weeks?.filter(week => week.phase === 'Foundation Building') || [];
  const phaseTwoWeeks = weeks?.filter(week => week.phase === 'Advanced Implementation') || [];

  return (
    <section className="
      bg-background 
      border-b-4 
      border-foreground 
      py-16 
      lg:py-24 
      px-4 
      sm:px-6
    ">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="
            font-heading 
            text-4xl 
            md:text-5xl 
            lg:text-6xl 
            xl:text-7xl 
            font-black 
            uppercase 
            text-foreground 
            mb-6
            leading-tight
            tracking-tight
          ">
            TECH ENTREPRENEUR IN 8 WEEKS
          </h2>
          <div className="
            bg-primary 
            text-primary-foreground 
            font-black 
            uppercase 
            px-8 
            py-3 
            text-sm 
            lg:text-base
            border-4 
            border-foreground 
            inline-block
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
            rounded-full
          ">
            TWO INTENSIVE PHASES
          </div>
        </div>

        {/* Two Phase Grid */}
        <div className="
          grid 
          grid-cols-1 
          lg:grid-cols-2 
          gap-8 
          lg:gap-12 
          xl:gap-16
          mb-16
          lg:mb-20
        ">
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
        <div className="text-center">
          <WaitingListDialog>
            <Button className="
              bg-primary 
              hover:bg-primary-hover
              border-4 
              border-foreground 
              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
              hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-[-2px]
              hover:translate-y-[-2px]
              font-black 
              text-base
              lg:text-lg 
              px-10 
              py-5
              uppercase
              transition-all
              duration-300
              rounded-xl
              min-w-[300px]
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
