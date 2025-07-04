
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, BookOpen } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

const MobileHero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-screen Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://d2mp3ttz3u5gci.cloudfront.net/0703.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      {/* Top Bar - Logo and Menu */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>
      
      {/* Main Content - TikTok Style Layout */}
      <div className="relative z-20 h-full flex">
        {/* Left side - Content (takes most space) */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-32">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue mr-3" />
            <div>
              <div className="text-white font-semibold text-sm">@iLab_Official</div>
              <div className="text-white/70 text-xs">AI Education Platform</div>
            </div>
            <Button 
              size="sm" 
              className="ml-3 bg-transparent border border-white/50 text-white text-xs px-3 py-1 h-7"
            >
              Follow
            </Button>
          </div>
          
          {/* Main Text Content */}
          <div className="mb-6">
            <h1 className="text-white text-xl font-bold leading-tight mb-2">
              Your 8-Week Transformation Journey
            </h1>
            <p className="text-white/90 text-base leading-relaxed mb-3">
              Launch real products, solve real problems, lead real change.
            </p>
            <p className="text-white/80 text-sm">
              Build MVPs and compete for €5,000 prize 💰
            </p>
            
            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-accent-blue text-sm">#AIEducation</span>
              <span className="text-accent-blue text-sm">#CodeBootcamp</span>
              <span className="text-accent-blue text-sm">#TechSkills</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <WaitingListDialog>
            <Button className="
              w-full 
              bg-white 
              text-black 
              font-bold 
              py-4 
              rounded-full 
              hover:bg-white/90
              transition-all
              text-base
            ">
              Join Waiting List 🚀
            </Button>
          </WaitingListDialog>
        </div>
        
        {/* Right side - TikTok Style Action Bar */}
        <div className="w-16 flex flex-col items-center justify-end pb-32 pr-2">
          {/* Like Button */}
          <div className="flex flex-col items-center mb-6">
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-xs font-semibold">12.4K</span>
          </div>
          
          {/* Comment Button */}
          <div className="flex flex-col items-center mb-6">
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-xs font-semibold">2.1K</span>
          </div>
          
          {/* Share Button */}
          <div className="flex flex-col items-center mb-6">
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <Share className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-xs font-semibold">856</span>
          </div>
          
          {/* Learn More Button */}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full bg-accent-yellow/80 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <BookOpen className="w-6 h-6 text-black" />
            </button>
            <span className="text-white text-xs font-semibold">Learn</span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div className="h-full bg-white w-3/4 transition-all duration-1000" />
      </div>
      
      {/* Swipe Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-1 h-8 bg-white/50 rounded-full animate-pulse" />
          <span className="text-white/70 text-xs mt-1">Swipe up</span>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
