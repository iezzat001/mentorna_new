
import React from 'react';
import { TrendingUp, GraduationCap } from 'lucide-react';
import ComingSoonBackground from './coming-soon/ComingSoonBackground';
import ComingSoonHeader from './coming-soon/ComingSoonHeader';
import ProgramCard from './coming-soon/ProgramCard';
import ComingSoonCTA from './coming-soon/ComingSoonCTA';

const ComingSoon = () => {
  const programs = [
    {
      title: "Economics",
      subtitle: "Master the Digital Economy",
      description: "Unlock the secrets of cryptocurrency, blockchain economics, and digital market dynamics",
      icon: TrendingUp,
      gradient: "from-accent-purple to-purple-600",
      delay: "0ms"
    },
    {
      title: "Study Abroad", 
      subtitle: "Master Global Education",
      description: "Develop a global student mindset, secure scholarships to world's best universities, and get seats in Ivy League institutions",
      icon: GraduationCap,
      gradient: "from-accent-blue to-blue-600", 
      delay: "100ms"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      <ComingSoonBackground />

      <div className="relative z-10 container mx-auto px-8 py-20 lg:py-32">
        <ComingSoonHeader />

        {/* Programs Grid - 1x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-4xl mx-auto">
          {programs.map((program) => (
            <ProgramCard
              key={program.title}
              title={program.title}
              subtitle={program.subtitle}
              description={program.description}
              icon={program.icon}
              gradient={program.gradient}
              delay={program.delay}
            />
          ))}
        </div>

        <ComingSoonCTA />
      </div>
    </section>
  );
};

export default ComingSoon;
