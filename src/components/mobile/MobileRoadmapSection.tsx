import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, Hammer, RotateCcw, TestTube, Presentation, Rocket, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MobileWaitingListDialog from './MobileWaitingListDialog';

const MobileRoadmapSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const roadmapSteps = [
    {
      number: 1,
      title: "IDEATE",
      description: "Your child will learn how to spot real-world problems and come up with creative business ideas to solve them.",
      icon: Lightbulb,
      color: "bg-accent-purple",
      emoji: "💡"
    },
    {
      number: 2,
      title: "VALIDATE", 
      description: "They'll talk to potential users and mentors to see if their idea truly solves a need.",
      icon: Users,
      color: "bg-accent-blue",
      emoji: "👥"
    },
    {
      number: 3,
      title: "BUILD",
      description: "Using AI tools, your child will begin building a real product—like a mobile app or website—no coding required.",
      icon: Hammer,
      color: "bg-accent-yellow",
      emoji: "🔨"
    },
    {
      number: 4,
      title: "ITERATE",
      description: "They'll learn how to improve their product based on feedback, just like real entrepreneurs do.",
      icon: RotateCcw,
      color: "bg-accent-green",
      emoji: "🔄"
    },
    {
      number: 5,
      title: "TEST",
      description: "Students will test their solution with real users to see how it performs and gather insights.",
      icon: TestTube,
      color: "bg-accent-purple",
      emoji: "🧪"
    },
    {
      number: 6,
      title: "PRESENT LIKE A CEO",
      description: "They'll craft a confident pitch and learn to speak about their idea clearly and professionally.",
      icon: Presentation,
      color: "bg-accent-blue",
      emoji: "🎯"
    },
    {
      number: 7,
      title: "LAUNCH",
      description: "By the end of the program, your child will proudly present their startup in a live demo day—ready to show the world what they've built!",
      icon: Rocket,
      color: "bg-primary",
      emoji: "🚀"
    }
  ];

  // Auto-advance through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % roadmapSteps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Update progress based on current step
  useEffect(() => {
    setProgress(((currentStep + 1) / roadmapSteps.length) * 100);
  }, [currentStep]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const currentStepData = roadmapSteps[currentStep];

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rotate-12 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-white -rotate-12 animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-4 border-white rotate-45 animate-pulse" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />
      
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content Layout */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] p-4">
        {/* Section Title */}
        <div className="text-center mb-6">
          <Badge className="bg-primary text-primary-foreground font-black uppercase px-3 py-1 text-xs mb-3">
            TRANSFORMATION JOURNEY
          </Badge>
          <h2 className="text-white text-2xl font-black uppercase mb-2 leading-tight">
            THE PATH TO SUCCESS
          </h2>
          <p className="text-white/80 text-sm font-medium leading-relaxed max-w-sm mx-auto">
            An exciting journey for the lead student and their families
          </p>
        </div>

        {/* Step Navigation Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {roadmapSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentStep ? 'bg-white w-6' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Current Step Display */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Step Number & Emoji */}
          <div className="text-center mb-6">
            <div className={`
              w-20 h-20 mx-auto mb-4
              ${currentStepData.color}
              border-4 border-white
              shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]
              flex items-center justify-center
              font-heading font-black text-2xl text-foreground
              rounded-full
            `}>
              {currentStepData.number}
            </div>
            <div className="text-4xl mb-2">{currentStepData.emoji}</div>
          </div>

          {/* Step Title & Description */}
          <div className="text-center mb-8">
            <h3 className="text-white text-xl font-black uppercase mb-4 leading-tight">
              {currentStepData.title}
            </h3>
            <p className="text-white/90 text-base font-medium leading-relaxed px-4 max-w-sm mx-auto">
              {currentStepData.description}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center px-8">
            <button
              onClick={() => setCurrentStep((prev) => prev === 0 ? roadmapSteps.length - 1 : prev - 1)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center touch-manipulation"
            >
              <ChevronRight className="w-6 h-6 text-white rotate-180" />
            </button>
            
            <div className="text-white/60 text-sm font-semibold">
              {currentStep + 1} / {roadmapSteps.length}
            </div>
            
            <button
              onClick={() => setCurrentStep((prev) => (prev + 1) % roadmapSteps.length)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center touch-manipulation"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex-shrink-0 mt-6">
          <MobileWaitingListDialog>
            <Button className="
              w-full bg-primary border-2 border-white 
              shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] 
              font-black text-sm px-4 py-3 uppercase
              hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
              transition-all text-primary-foreground
              active:scale-95 touch-manipulation min-h-[48px]
            ">
              <Rocket className="h-4 w-4 mr-2" />
              START THE JOURNEY!
            </Button>
          </MobileWaitingListDialog>
          <p className="font-body text-xs font-medium text-white/60 mt-2 text-center">
            Transform Your Child's Future Today
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <div className="w-1 h-8 bg-white/50 rounded-full animate-pulse" />
        <span className="text-white/70 text-xs mt-1">Swipe up</span>
      </div>
    </div>
  );
};

export default MobileRoadmapSection;
