import React from 'react';
import { Button } from '@/components/ui/button';
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
        <div className="hidden md:flex items-center space-x-8">
          <a href="#mission" className="text-white/80 hover:text-white transition-colors duration-300 font-heading font-medium">
            Mission
          </a>
          <a href="#chapter" className="text-white/80 hover:text-white transition-colors duration-300 font-heading font-medium">
            Chapter
          </a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors duration-300 font-heading font-medium">
            About
          </a>
        </div>
        
        {/* CTA Button */}
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
          Watch Trailer
        </Button>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-20 flex flex-col h-full min-h-screen my-0 py-[100px]">
        <div className="flex-1" />
        
        <div className="pb-8 px-8 lg:pb-12 lg:px-12 mt-24">
          {/* Tagline */}
          <div className="text-white/60 text-sm font-light tracking-wide mb-6 font-heading">
            The World Changed. School Didn't.
          </div>
          
          {/* Main Headline */}
          <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none mb-8 font-heading">
            <div className="text-white mb-2">
              Your 8-Week Transformation Journey
            </div>
            <div className="text-white/90 text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 leading-tight">
              Launch real products, solve real problems, lead real change.
            </div>
          </div>
          
          {/* Description */}
          <div className="max-w-md lg:max-w-lg text-white/70 font-light leading-relaxed font-body text-lg">
            Build MVPs and compete for €5,000 prize.
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;