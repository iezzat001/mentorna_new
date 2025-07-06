
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
  const totalSlides = Math.ceil(programs.length / 2);

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 rounded-full blur-3xl animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-green/25 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-40" />
      </div>

      {/* Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] p-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="
            text-4xl 
            font-heading 
            font-light 
            text-white 
            mb-4 
            leading-none
          ">
            Coming Soon
          </h2>
          <p className="
            text-lg 
            text-white/80 
            font-heading 
            font-light
          ">
            Revolutionary Programs That Will
            <span className="block text-accent-yellow font-medium mt-1">
              Define Your Future
            </span>
          </p>
        </div>

        {/* Programs Cards */}
        <div className="flex-1 flex flex-col gap-6">
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

        {/* Slide indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }, (_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  slideIndex === index ? 'bg-accent-yellow' : 'bg-white/30'
                }`} 
              />
            ))}
          </div>
        )}

        {/* Swipe Indicator */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-1 h-6 bg-white/50 rounded-full animate-pulse" />
          <span className="text-white/70 text-xs mt-1">Swipe up</span>
        </div>
      </div>
    </div>
  );
};

export default MobileComingSoonSection;
