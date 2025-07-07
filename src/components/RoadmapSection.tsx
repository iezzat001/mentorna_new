
import React from 'react';
import { Lightbulb, Users, Hammer, RotateCcw, TestTube, Presentation, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RoadmapSection = () => {
  const roadmapSteps = [
    {
      number: 1,
      title: "Ideate",
      description: "Your child will learn how to spot real-world problems and come up with creative business ideas to solve them.",
      icon: Lightbulb,
      color: "bg-accent-purple",
      position: "left"
    },
    {
      number: 2,
      title: "Validate", 
      description: "They'll talk to potential users and mentors to see if their idea truly solves a need.",
      icon: Users,
      color: "bg-accent-blue",
      position: "right"
    },
    {
      number: 3,
      title: "Build",
      description: "Using AI tools, your child will begin building a real product—like a mobile app or website—no coding required.",
      icon: Hammer,
      color: "bg-accent-yellow",
      position: "left"
    },
    {
      number: 4,
      title: "Iterate",
      description: "They'll learn how to improve their product based on feedback, just like real entrepreneurs do.",
      icon: RotateCcw,
      color: "bg-accent-green",
      position: "right"
    },
    {
      number: 5,
      title: "Test",
      description: "Students will test their solution with real users to see how it performs and gather insights.",
      icon: TestTube,
      color: "bg-accent-purple",
      position: "left"
    },
    {
      number: 6,
      title: "Present Like a CEO",
      description: "They'll craft a confident pitch and learn to speak about their idea clearly and professionally.",
      icon: Presentation,
      color: "bg-accent-blue",
      position: "right"
    },
    {
      number: 7,
      title: "Launch",
      description: "By the end of the program, your child will proudly present their startup in a live demo day—ready to show the world what they've built!",
      icon: Rocket,
      color: "bg-primary",
      position: "center"
    }
  ];

  return (
    <section className="bg-background border-b-4 border-foreground py-16 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-foreground rotate-12" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-foreground -rotate-12" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-4 border-foreground rotate-45" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
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
            THE TRANSFORMATION JOURNEY
          </h2>
          <div className="
            bg-primary 
            text-primary-foreground 
            font-black 
            uppercase 
            px-6 
            py-3 
            text-sm 
            border-4 
            border-foreground 
            inline-block
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            mb-4
          ">
            AN EXCITING PATH FOR YOUR CHILD
          </div>
          <p className="font-body text-xl font-semibold text-foreground/80 max-w-2xl mx-auto">
            It is an exciting journey for the lead student and their families
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Central Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-foreground transform -translate-x-1/2 hidden md:block" />
          
          {roadmapSteps.map((step, index) => (
            <div 
              key={step.number}
              className={`
                relative mb-12 last:mb-0 
                ${step.position === 'left' ? 'md:text-right md:pr-8' : 
                  step.position === 'right' ? 'md:text-left md:pl-8' : 
                  'text-center'}
              `}
            >
              {/* Step Number Circle */}
              <div className={`
                absolute left-1/2 transform -translate-x-1/2 
                w-16 h-16 
                ${step.color}
                border-4 
                border-foreground 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                flex 
                items-center 
                justify-center 
                font-heading 
                font-black 
                text-2xl 
                text-foreground
                z-20
                hidden md:flex
              `}>
                {step.number}
              </div>

              {/* Step Card */}
              <Card className={`
                border-4 
                border-foreground 
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
                hover:scale-[1.02] 
                transition-all
                duration-200
                ${step.position === 'left' ? 'md:mr-20' : 
                  step.position === 'right' ? 'md:ml-20' : 
                  'mx-auto max-w-lg'}
                ${step.position === 'center' ? step.color : 'bg-white'}
              `}>
                <CardContent className="p-6">
                  {/* Mobile Step Number */}
                  <div className={`
                    md:hidden 
                    w-12 h-12 
                    ${step.color}
                    border-4 
                    border-foreground 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    flex 
                    items-center 
                    justify-center 
                    font-heading 
                    font-black 
                    text-lg 
                    text-foreground
                    mb-4
                  `}>
                    {step.number}
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`
                      w-12 h-12 
                      ${step.position === 'center' ? 'bg-white' : step.color}
                      border-2 
                      border-foreground 
                      flex 
                      items-center 
                      justify-center
                      shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    `}>
                      <step.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className={`
                      font-heading 
                      text-2xl 
                      font-black 
                      uppercase 
                      ${step.position === 'center' ? 'text-white' : 'text-foreground'}
                    `}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`
                    font-body 
                    text-base 
                    font-semibold 
                    leading-relaxed
                    ${step.position === 'center' ? 'text-white/90' : 'text-foreground/80'}
                  `}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="
            bg-accent-yellow 
            border-4 
            border-foreground 
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
            p-8 
            inline-block
            max-w-2xl
          ">
            <h3 className="
              font-heading 
              text-2xl 
              font-black 
              uppercase 
              text-foreground 
              mb-4
            ">
              🚀 READY TO START THE JOURNEY?
            </h3>
            <p className="font-body text-base font-semibold text-foreground/80">
              Give your child the ultimate advantage in tomorrow's world with our cutting-edge AI education platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
