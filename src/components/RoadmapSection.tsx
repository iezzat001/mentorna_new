import React from 'react';
import { Lightbulb, Users, Hammer, RotateCcw, TestTube, Presentation, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WaitingListDialog from './WaitingListDialog';

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

  // Background images from the cohort
  const cohortImages = [
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_1.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_2.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_3.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_4.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_5.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_6.jpeg"
  ];

  return (
    <section className="relative min-h-screen border-b-4 border-foreground py-16 px-6 overflow-hidden">
      {/* Dynamic Background Images Layer */}
      <div className="absolute inset-0 z-0">
        {/* Main background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${cohortImages[0]})`,
          }}
        />
        
        {/* Additional scattered background images */}
        <div 
          className="absolute top-20 right-10 w-80 h-60 bg-cover bg-center rounded-2xl opacity-20 rotate-12 transform scale-75"
          style={{
            backgroundImage: `url(${cohortImages[1]})`,
          }}
        />
        
        <div 
          className="absolute bottom-32 left-10 w-72 h-56 bg-cover bg-center rounded-2xl opacity-15 -rotate-6 transform scale-90"
          style={{
            backgroundImage: `url(${cohortImages[2]})`,
          }}
        />
        
        <div 
          className="absolute top-1/3 left-20 w-64 h-48 bg-cover bg-center rounded-2xl opacity-10 rotate-6 transform scale-110"
          style={{
            backgroundImage: `url(${cohortImages[3]})`,
          }}
        />
        
        <div 
          className="absolute bottom-20 right-32 w-60 h-40 bg-cover bg-center rounded-2xl opacity-12 -rotate-12 transform scale-85"
          style={{
            backgroundImage: `url(${cohortImages[4]})`,
          }}
        />
      </div>

      {/* Dynamic Gradient Overlays */}
      <div className="absolute inset-0 z-10">
        {/* Primary dark to light gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/40" />
        
        {/* Radial gradient for focus */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/60" />
        
        {/* Accent color gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-accent-yellow/20 to-transparent" />
      </div>

      {/* Artistic Background Elements */}
      <div className="absolute inset-0 z-20 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rotate-45 animate-pulse" />
        <div className="absolute bottom-40 right-10 w-24 h-24 border-4 border-accent-yellow -rotate-12" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border-4 border-accent-purple rotate-12" />
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border-4 border-accent-blue -rotate-6" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-30">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="
              font-heading 
              text-4xl md:text-6xl lg:text-7xl 
              font-black 
              uppercase 
              text-white 
              mb-8
              drop-shadow-2xl
              relative z-10
            ">
              THE PATH TO
              <span className="block text-accent-yellow text-5xl md:text-7xl lg:text-8xl mt-2">
                SUCCESS
              </span>
            </h2>
            
            {/* Glowing effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-yellow/20 to-primary/20 blur-3xl -z-10" />
          </div>
          
          <div className="
            bg-gradient-to-r from-primary to-accent-yellow
            text-white
            font-black 
            uppercase 
            px-8 
            py-4 
            text-sm md:text-base
            border-4 
            border-white
            inline-block
            shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]
            mb-6
            transform hover:scale-105 transition-transform duration-200
          ">
            🏆 FROM IDEA TO REAL BUSINESS
          </div>
          
          <p className="font-body text-xl md:text-2xl font-bold text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            Watch your child transform from curious learner to confident entrepreneur in just 8 weeks
          </p>
        </div>

        {/* Artistic Roadmap Layout */}
        <div className="relative">
          {/* Curved Path SVG */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
            viewBox="0 0 800 1400" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#ffd93d" />
                <stop offset="100%" stopColor="#6bcf7f" />
              </linearGradient>
            </defs>
            <path
              d="M 400 50 Q 600 200 300 350 Q 100 500 500 650 Q 700 800 200 950 Q 50 1100 400 1250"
              stroke="url(#pathGradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray="20,10"
              className="animate-pulse"
            />
          </svg>
          
          {roadmapSteps.map((step, index) => (
            <div 
              key={step.number}
              className={`
                relative mb-16 last:mb-0 
                ${step.position === 'left' ? 'lg:text-right lg:pr-20' : 
                  step.position === 'right' ? 'lg:text-left lg:pl-20' : 
                  'text-center'}
                transform transition-all duration-700 hover:scale-105
              `}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Floating Step Number */}
              <div className={`
                absolute left-1/2 transform -translate-x-1/2 
                w-20 h-20 
                bg-gradient-to-br ${step.color.replace('bg-', 'from-')} to-white
                border-4 
                border-white
                shadow-[0_0_30px_rgba(0,0,0,0.5)]
                flex 
                items-center 
                justify-center 
                font-heading 
                font-black 
                text-3xl 
                text-foreground
                z-40
                rounded-full
                hidden lg:flex
                animate-bounce
                hover:animate-none
              `}>
                {step.number}
              </div>

              {/* Enhanced Step Card */}
              <Card className={`
                border-4 
                border-white/80
                backdrop-blur-md
                bg-white/15
                shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] 
                hover:bg-white/25
                transition-all
                duration-300
                ${step.position === 'left' ? 'lg:mr-32' : 
                  step.position === 'right' ? 'lg:ml-32' : 
                  'mx-auto max-w-2xl'}
                transform hover:-translate-y-2
              `}>
                <CardContent className="p-8">
                  {/* Mobile Step Number with glow */}
                  <div className={`
                    lg:hidden 
                    w-16 h-16 
                    bg-gradient-to-br ${step.color.replace('bg-', 'from-')} to-white
                    border-4 
                    border-white
                    shadow-[0_0_20px_rgba(0,0,0,0.3)]
                    flex 
                    items-center 
                    justify-center 
                    font-heading 
                    font-black 
                    text-2xl 
                    text-foreground
                    mb-6
                    rounded-full
                    mx-auto
                  `}>
                    {step.number}
                  </div>

                  {/* Icon and Title with enhanced styling */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className={`
                      w-16 h-16 
                      bg-gradient-to-br ${step.color.replace('bg-', 'from-')} to-white
                      border-3 
                      border-white
                      flex 
                      items-center 
                      justify-center
                      shadow-[0_0_20px_rgba(0,0,0,0.2)]
                      rounded-xl
                      transform hover:rotate-12 transition-transform duration-300
                    `}>
                      <step.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="
                      font-heading 
                      text-2xl md:text-3xl
                      font-black 
                      uppercase 
                      text-white
                      drop-shadow-lg
                    ">
                      {step.title}
                    </h3>
                  </div>

                  {/* Enhanced Description */}
                  <p className="
                    font-body 
                    text-lg
                    font-semibold 
                    leading-relaxed
                    text-white/95
                    drop-shadow-md
                  ">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20 space-y-6">
          {/* Header Text Above Button */}
          <div>
            <h3 className="
              font-heading 
              text-3xl md:text-4xl
              font-black 
              uppercase 
              text-white
              mb-4
              drop-shadow-lg
            ">
              🚀 READY TO LAUNCH SUCCESS?
            </h3>
            <p className="font-body text-lg md:text-xl font-bold text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Join the cohort that turns young minds into tomorrow's business leaders
            </p>
          </div>

          {/* CTA Button */}
          <div className="py-4">
            <WaitingListDialog>
              <Button className="
                bg-foreground
                text-background
                hover:bg-foreground/90
                border-4 
                border-white 
                shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] 
                font-black 
                text-xl 
                px-10 
                py-6
                uppercase
                hover:translate-x-2 
                hover:translate-y-2 
                hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
                transition-all
                min-h-[60px]
              ">
                START YOUR CHILD'S JOURNEY NOW!
              </Button>
            </WaitingListDialog>
          </div>

          {/* Supporting Text Below Button */}
          <p className="font-body text-base font-semibold text-white/80 max-w-lg mx-auto drop-shadow-md">
            Your child's entrepreneurial journey starts here!
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;