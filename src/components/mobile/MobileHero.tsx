
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Heart, MessageCircle, Share, ChevronDown } from 'lucide-react';
import MobileWaitingListDialog from './MobileWaitingListDialog';

const MobileHero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate video progress
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0; // Loop the progress
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://d2mp3ttz3u5gci.cloudfront.net/hero-mobile-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
      
      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>

      </div>

      {/* Content Layout */}
      <div className="relative z-20 h-full flex">
        {/* Left Content Area (75%) */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-32">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue mr-3" />
            <div>
              <div className="text-white font-semibold text-sm">@iLab_Official</div>
              <div className="text-white/70 text-xs">AI Education Platform</div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="mb-6">
            <Badge className="bg-primary text-primary-foreground font-black uppercase px-2 py-1 text-xs mb-3">
              🚀 LIMITED LAUNCH
            </Badge>
            <h1 className="text-white text-xl font-bold leading-tight mb-2">
              Your Child's 8-Week AI Transformation Journey
            </h1>
            <p className="text-white/90 text-base leading-relaxed">
              Launch real products, solve real problems, lead real change. Join the first 30 families! 
              <span className="text-accent-yellow font-semibold"> #AIEducation #Future</span>
            </p>
          </div>
          
          {/* CTA */}
          <MobileWaitingListDialog>
            <Button className="w-full bg-white text-black font-bold py-4 rounded-full active:scale-95 transition-transform touch-manipulation min-h-[48px]">
              Join Waiting List 🚀
            </Button>
          </MobileWaitingListDialog>
        </div>
        
        {/* Right Action Bar (25%) */}
        <div className="w-16 flex flex-col items-center justify-end pb-32 pr-2">
          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-6">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center touch-manipulation"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center touch-manipulation">
              <Heart className="w-6 h-6 text-white" />
              <span className="absolute -bottom-1 text-white text-xs font-semibold">15.2K</span>
            </button>
            
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center touch-manipulation">
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="absolute -bottom-1 text-white text-xs font-semibold">3.1K</span>
            </button>
            
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center touch-manipulation">
              <Share className="w-6 h-6 text-white" />
              <span className="absolute -bottom-1 text-white text-xs font-semibold">1.2K</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <ChevronDown className="w-6 h-6 text-white/70 animate-bounce" />
        <span className="text-white/70 text-xs mt-1">Swipe up</span>
      </div>
    </div>
  );
};

export default MobileHero;
