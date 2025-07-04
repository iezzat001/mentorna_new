
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, TrendingUp, Rocket, Zap, Atom } from 'lucide-react';

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
      {/* Multi-layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-green/25 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '6s', animationDuration: '12s' }} />
        
        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-accent-yellow/20 to-accent-purple/15 rounded-full blur-2xl animate-pulse opacity-30" style={{ animationDelay: '3s', animationDuration: '10s' }} />
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-tr from-accent-blue/25 to-accent-green/15 rounded-full blur-2xl animate-pulse opacity-35" style={{ animationDelay: '9s', animationDuration: '14s' }} />
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent-yellow rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent-blue rounded-full" />
        </div>
      </div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />

      <div className="relative z-10 container mx-auto px-8 py-20 lg:py-32">
        {/* Header Section */}
        <div className="text-center mb-20">
          <Badge className="
            bg-foreground/10 
            text-white 
            border-white/20 
            font-heading 
            font-bold 
            text-sm 
            px-4 
            py-2 
            mb-6
            hover:bg-foreground/20
            transition-colors
            duration-300
          ">
            <Lock className="w-4 h-4 mr-2" />
            EXCLUSIVE ACCESS
          </Badge>
          
          <h2 className="
            text-5xl 
            md:text-6xl 
            lg:text-7xl 
            font-heading 
            font-light 
            text-white 
            mb-6 
            leading-none
          ">
            Coming Soon
          </h2>
          
          <div className="
            text-2xl 
            md:text-3xl 
            lg:text-4xl 
            text-white/80 
            font-heading 
            font-light 
            mb-8
          ">
            Revolutionary Programs That Will
            <span className="block text-accent-yellow font-medium mt-2">
              Define Your Future
            </span>
          </div>
          
          <p className="
            text-lg 
            md:text-xl 
            text-white/60 
            font-body 
            font-light 
            max-w-3xl 
            mx-auto 
            leading-relaxed
          ">
            Join the exclusive waiting list for our most ambitious programs yet. 
            Limited seats. Unlimited potential.
          </p>
        </div>

        {/* Programs Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="
                group 
                relative 
                bg-gradient-to-br from-white/8 to-white/4
                backdrop-blur-md 
                border 
                border-white/20 
                rounded-3xl 
                p-8 
                hover:bg-gradient-to-br hover:from-white/15 hover:to-white/8
                hover:border-white/40 
                transition-all 
                duration-700 
                hover:scale-[1.03]
                hover:shadow-2xl
                hover:shadow-white/20
                animate-fade-in
                h-full
                flex
                flex-col
                overflow-hidden
              "
              style={{ 
                animationDelay: program.delay,
                animationFillMode: 'both'
              }}
            >
              {/* Enhanced Gradient Overlay with blur effect */}
              <div className={`
                absolute 
                inset-0 
                bg-gradient-to-br 
                ${program.gradient} 
                opacity-0 
                group-hover:opacity-10 
                rounded-3xl 
                transition-all
                duration-700
                blur-sm
              `} />
              
              {/* Subtle inner glow */}
              <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated border effect */}
              <div className={`
                absolute inset-0 rounded-3xl 
                bg-gradient-to-r ${program.gradient}
                opacity-0 group-hover:opacity-20
                transition-opacity duration-500
                blur-[1px]
              `} style={{ clipPath: 'inset(0 round 1.5rem)' }} />
              
              {/* Enhanced Icon */}
              <div className="relative mb-6 z-10">
                <div className={`
                  w-24 
                  h-24 
                  rounded-2xl 
                  bg-gradient-to-br 
                  ${program.gradient} 
                  flex 
                  items-center 
                  justify-center 
                  group-hover:scale-110 
                  transition-all
                  duration-500
                  shadow-xl
                  shadow-black/20
                  group-hover:shadow-2xl
                  relative
                  overflow-hidden
                `}>
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-50 blur-md group-hover:opacity-70 transition-opacity duration-500`} />
                  <program.icon className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="relative flex-1 flex flex-col z-10">
                <h3 className="
                  text-2xl 
                  md:text-3xl 
                  font-heading 
                  font-bold 
                  text-white 
                  mb-3
                  group-hover:text-white
                  transition-all
                  duration-300
                  leading-tight
                ">
                  {program.title}
                </h3>
                
                <p className="
                  text-accent-yellow 
                  font-heading 
                  font-semibold 
                  text-lg 
                  mb-6
                  group-hover:text-accent-yellow/90
                  transition-colors
                  duration-300
                ">
                  {program.subtitle}
                </p>
                
                <p className="
                  text-white/85 
                  font-body 
                  leading-relaxed 
                  mb-8
                  flex-1
                  text-base
                  group-hover:text-white/95
                  transition-colors
                  duration-300
                ">
                  {program.description}
                </p>
                
                {/* Enhanced Mystery Element */}
                <div className="
                  flex 
                  items-center 
                  text-white/70 
                  text-sm 
                  font-body
                  font-medium
                  pt-6
                  border-t
                  border-white/20
                  group-hover:border-white/30
                  group-hover:text-white/80
                  transition-all
                  duration-300
                ">
                  <Lock className="w-4 h-4 mr-3 text-accent-yellow group-hover:animate-pulse" />
                  Details revealed to early subscribers
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="mb-8">
            <p className="
              text-white/80 
              font-heading 
              font-medium 
              text-xl 
              mb-4
            ">
              Be among the first to know when applications open
            </p>
            <p className="
              text-white/60 
              font-body 
              font-light 
              text-lg
            ">
              Exclusive previews • Early bird pricing • Limited seats
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="lg"
            className="
              rounded-full 
              border-white/30 
              bg-transparent 
              text-white/80 
              hover:border-white/50 
              hover:text-white 
              hover:bg-white/10
              transition-all 
              duration-300
              font-heading
              font-medium
              px-8
              py-6
              text-lg
              group
            "
          >
            Join Exclusive Waiting List
            <Lock className="w-5 h-5 ml-2 group-hover:animate-pulse" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
