import React from 'react';
import { LucideIcon } from 'lucide-react';
import MobileComingSoonCard from './MobileComingSoonCard';

interface Program {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

interface MobileComingSoonSectionProps {
  programs: Program[];
  slideIndex: number;
}

const MobileComingSoonSection = ({ programs, slideIndex }: MobileComingSoonSectionProps) => {
  // Get 2 programs for this slide (slideIndex 0 = programs 0,1 and slideIndex 1 = programs 2,3)
  const startIndex = slideIndex * 2;
  const slidePrograms = programs.slice(startIndex, startIndex + 2);

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] justify-center px-4 max-w-sm mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-black uppercase mb-3 leading-tight">
            Coming Soon
          </h2>
          <p className="text-white/80 text-base font-medium leading-relaxed">
            Revolutionary Programs That Will
            <span className="block text-accent-yellow font-bold mt-1">
              Define Your Future
            </span>
          </p>
        </div>

        {/* Programs Cards */}
        <div className="space-y-6 mb-8">
          {slidePrograms.map((program) => (
            <MobileComingSoonCard
              key={program.title}
              title={program.title}
              subtitle={program.subtitle}
              description={program.description}
              icon={program.icon}
              gradient={program.gradient}
            />
          ))}
        </div>

        {/* Swipe Indicator */}
        <div className="flex flex-col items-center">
          <div className="w-1 h-6 bg-white/50 rounded-full animate-pulse" />
          <span className="text-white/70 text-xs mt-1">Swipe up</span>
        </div>
      </div>
    </div>
  );
};

export default MobileComingSoonSection;