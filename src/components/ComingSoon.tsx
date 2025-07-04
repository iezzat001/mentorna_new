
import React from 'react';
import { TrendingUp, Rocket, Zap, Atom } from 'lucide-react';
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
      title: "Space Tech", 
      subtitle: "Engineer the Final Frontier",
      description: "Design spacecraft systems, satellite technology, and explore Mars colonization strategies",
      icon: Rocket,
      gradient: "from-accent-blue to-blue-600", 
      delay: "100ms"
    },
    {
      title: "Renewable Energy",
      subtitle: "Power Tomorrow's World", 
      description: "Create sustainable solutions with solar tech, wind systems, and revolutionary energy storage",
      icon: Zap,
      gradient: "from-accent-green to-green-600",
      delay: "200ms"
    },
    {
      title: "Quantum Computing",
      subtitle: "Decode the Quantum Future",
      description: "Master quantum algorithms, quantum machine learning, and build applications for the next computing revolution",
      icon: Atom,
      gradient: "from-orange-500 to-red-600",
      delay: "300ms"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <ComingSoonBackground />

      <div className="relative z-10 container mx-auto px-8 py-20 lg:py-32">
        <ComingSoonHeader />

        {/* Programs Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-6xl mx-auto">
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
