
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, TrendingUp, Rocket, Zap } from 'lucide-react';

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
      delay: "200ms"
    },
    {
      title: "Renewable Energy",
      subtitle: "Power Tomorrow's World", 
      description: "Create sustainable solutions with solar tech, wind systems, and revolutionary energy storage",
      icon: Zap,
      gradient: "from-accent-green to-green-600",
      delay: "400ms"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-purple/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-green/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

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
            animate-pulse
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

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="
                group 
                relative 
                bg-white/5 
                backdrop-blur-sm 
                border 
                border-white/10 
                rounded-2xl 
                p-8 
                hover:bg-white/10 
                hover:border-white/20 
                transition-all 
                duration-500 
                hover:scale-105
                animate-fade-in
              "
              style={{ animationDelay: program.delay }}
            >
              {/* Gradient Overlay */}
              <div className={`
                absolute 
                inset-0 
                bg-gradient-to-br 
                ${program.gradient} 
                opacity-0 
                group-hover:opacity-10 
                rounded-2xl 
                transition-opacity 
                duration-500
              `} />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`
                  w-16 
                  h-16 
                  rounded-full 
                  bg-gradient-to-br 
                  ${program.gradient} 
                  flex 
                  items-center 
                  justify-center 
                  group-hover:scale-110 
                  transition-transform 
                  duration-300
                `}>
                  <program.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="
                  text-2xl 
                  md:text-3xl 
                  font-heading 
                  font-medium 
                  text-white 
                  mb-3
                ">
                  {program.title}
                </h3>
                
                <p className="
                  text-accent-yellow 
                  font-heading 
                  font-medium 
                  text-lg 
                  mb-4
                ">
                  {program.subtitle}
                </p>
                
                <p className="
                  text-white/70 
                  font-body 
                  font-light 
                  leading-relaxed 
                  mb-6
                ">
                  {program.description}
                </p>
                
                {/* Mystery Element */}
                <div className="
                  flex 
                  items-center 
                  text-white/50 
                  text-sm 
                  font-body
                ">
                  <Lock className="w-4 h-4 mr-2" />
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

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default ComingSoon;
