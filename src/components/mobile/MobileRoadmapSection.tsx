import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, Hammer, RotateCcw, TestTube, Presentation, Rocket, Heart, Share, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MobileWaitingListDialog from './MobileWaitingListDialog';

const MobileRoadmapSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Background images from the cohort
  const cohortImages = [
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_1.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_2.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_3.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_4.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_5.jpeg",
    "https://d2mp3ttz3u5gci.cloudfront.net/students_with_cheque_6.jpeg"
  ];

  const roadmapSteps = [
    {
      number: 1,
      title: "IDEATE",
      description: "Your child will learn how to spot real-world problems and come up with creative business ideas to solve them.",
      icon: Lightbulb,
      color: "bg-accent-purple",
      emoji: "💡",
      hashtags: ["innovation", "creativity", "problemsolving"],
      likes: "2.1k",
      comments: "89",
      shares: "45"
    },
    {
      number: 2,
      title: "VALIDATE", 
      description: "They'll talk to potential users and mentors to see if their idea truly solves a need.",
      icon: Users,
      color: "bg-accent-blue",
      emoji: "👥",
      hashtags: ["validation", "feedback", "mentorship"],
      likes: "1.8k",
      comments: "67",
      shares: "32"
    },
    {
      number: 3,
      title: "BUILD",
      description: "Using AI tools, your child will begin building a real product—like a mobile app or website—no coding required.",
      icon: Hammer,
      color: "bg-accent-yellow",
      emoji: "🔨",
      hashtags: ["aitools", "nocode", "building"],
      likes: "3.2k",
      comments: "124",
      shares: "78"
    },
    {
      number: 4,
      title: "ITERATE",
      description: "They'll learn how to improve their product based on feedback, just like real entrepreneurs do.",
      icon: RotateCcw,
      color: "bg-accent-green",
      emoji: "🔄",
      hashtags: ["iterate", "improvement", "growth"],
      likes: "1.9k",
      comments: "56",
      shares: "41"
    },
    {
      number: 5,
      title: "TEST",
      description: "Students will test their solution with real users to see how it performs and gather insights.",
      icon: TestTube,
      color: "bg-accent-purple",
      emoji: "🧪",
      hashtags: ["testing", "userresearch", "data"],
      likes: "2.4k",
      comments: "91",
      shares: "52"
    },
    {
      number: 6,
      title: "PRESENT LIKE A CEO",
      description: "They'll craft a confident pitch and learn to speak about their idea clearly and professionally.",
      icon: Presentation,
      color: "bg-accent-blue",
      emoji: "🎯",
      hashtags: ["pitching", "leadership", "confidence"],
      likes: "4.1k",
      comments: "187",
      shares: "126"
    },
    {
      number: 7,
      title: "LAUNCH",
      description: "By the end of the program, your child will proudly present their startup in a live demo day—ready to show the world what they've built!",
      icon: Rocket,
      color: "bg-primary",
      emoji: "🚀",
      hashtags: ["launch", "demoday", "success"],
      likes: "5.7k",
      comments: "234",
      shares: "189"
    }
  ];

  // Auto-advance through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % roadmapSteps.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Update progress
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / 50); // 5 seconds = 50 intervals of 100ms
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, [currentStep]);

  // Reset progress when step changes
  useEffect(() => {
    setProgress(0);
  }, [currentStep]);

  const currentStepData = roadmapSteps[currentStep];
  const currentImage = cohortImages[currentStep % cohortImages.length];

  const handleStepChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentStep((prev) => (prev + 1) % roadmapSteps.length);
    } else {
      setCurrentStep((prev) => prev === 0 ? roadmapSteps.length - 1 : prev - 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentImage}
          alt="Success celebration"
          className="w-full h-full object-cover transition-all duration-1000"
        />
      </div>

      {/* Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 z-10">
        {/* Primary dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50" />
        
        {/* Radial spotlight effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70" />
        
        {/* Step color accent */}
        <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-${currentStepData.color.replace('bg-', '')}/20`} />
      </div>

      {/* Artistic Background Elements */}
      <div className="absolute inset-0 z-20 opacity-10">
        <div className="absolute top-20 right-10 w-24 h-24 border-3 border-white rotate-12 animate-pulse" />
        <div className="absolute bottom-40 left-10 w-16 h-16 border-3 border-white -rotate-6 animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 border-3 border-white rotate-45" />
      </div>

      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl drop-shadow-lg">
          Mentorna®
        </div>

      </div>

      {/* Content Layout */}
      <div className="relative z-20 h-[calc(100vh-6rem)] flex">
        {/* Left Content Area (75%) */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-32">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full ${currentStepData.color} border-2 border-white mr-3 flex items-center justify-center shadow-lg`}>
              <span className="text-xl">{currentStepData.emoji}</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm drop-shadow-md">@Mentorna_PathToSuccess</div>
              <div className="text-white/80 text-xs">Step {currentStepData.number} • AI Education</div>
            </div>
          </div>

          {/* Step Badge */}
          <div className="mb-4">
            <Badge className={`${currentStepData.color} text-foreground font-black uppercase px-3 py-1 text-xs border-2 border-white shadow-lg`}>
              STEP {currentStepData.number}/7
            </Badge>
          </div>
          
          {/* Main Content */}
          <div className="mb-6">
            <h2 className="text-white text-2xl font-black uppercase mb-3 leading-tight drop-shadow-lg">
              {currentStepData.title}
            </h2>
            <p className="text-white/95 text-base font-semibold leading-relaxed mb-4 drop-shadow-md">
              {currentStepData.description}
            </p>
            
            {/* Hashtags */}
            <div className="flex flex-wrap gap-2">
              {currentStepData.hashtags.map((tag) => (
                <span key={tag} className="text-accent-blue text-sm font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <MobileWaitingListDialog>
            <Button className="w-full bg-white text-black font-black py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 active:scale-95 min-h-[48px]">
              🚀 START YOUR JOURNEY
            </Button>
          </MobileWaitingListDialog>
        </div>
        
        {/* Right Action Bar (25%) */}
        <div className="w-16 flex flex-col items-center justify-end pb-32 pr-2">
          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-6">
            {/* Like Button */}
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center mb-1 touch-manipulation active:scale-90 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </button>
              <span className="text-white/80 text-xs font-bold">{currentStepData.likes}</span>
            </div>

            {/* Comment Button */}
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center mb-1 touch-manipulation active:scale-90 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <span className="text-white/80 text-xs font-bold">{currentStepData.comments}</span>
            </div>

            {/* Share Button */}
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center mb-1 touch-manipulation active:scale-90 transition-transform">
                <Share className="w-6 h-6 text-white" />
              </button>
              <span className="text-white/80 text-xs font-bold">{currentStepData.shares}</span>
            </div>

            {/* Step Navigation */}
            <div className="flex flex-col items-center mt-8">
              <button 
                onClick={() => handleStepChange('prev')}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 touch-manipulation"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </button>
              <div className="flex flex-col gap-1">
                {roadmapSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-1 h-4 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => handleStepChange('next')}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mt-2 touch-manipulation"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Swipe Up Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
        <div className="w-1 h-8 bg-white/60 rounded-full" />
        <span className="text-white/70 text-xs mt-1 font-medium">Swipe up</span>
      </div>

      {/* Step Counter */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white/90 text-xs font-bold">
            {currentStep + 1} / {roadmapSteps.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileRoadmapSection;