import React from 'react';
import { Button } from '@/components/ui/button';
import WaitingListDialog from './WaitingListDialog';
const Hero = () => {
  return <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="https://d2mp3ttz3u5gci.cloudfront.net/0703.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Navigation Bar */}
      <nav className="relative z-30 flex items-center justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        
        {/* Navigation Links */}
        
        
        {/* CTA Button */}
        <WaitingListDialog>
          <Button variant="outline" className="
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
            ">
            Join the waiting list
          </Button>
        </WaitingListDialog>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-20 flex flex-col h-full min-h-screen my-0 py-[100px]">
        <div className="flex-1" />
        
        <div className="pb-8 px-8 lg:pb-12 lg:px-12 mt-24">
          {/* Main Headline */}
          <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none mb-8 font-heading">
            <div className="text-white mb-2">
            AI Entrepreneurship Camp
            </div>
            <div className="text-white/90 text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 leading-tight">
            8-weeks interactive online program that transforms students into startup founders.
            </div>
          </div>
          
          {/* Description */}
          <div className="max-w-md lg:max-w-lg text-white/70 font-light leading-relaxed font-body text-lg">
          Launch real prodcuts. Solve real problems. Get your first customer.
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;