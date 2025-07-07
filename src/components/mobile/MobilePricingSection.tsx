import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Zap } from 'lucide-react';
import MobileWaitingListDialog from './MobileWaitingListDialog';

const MobilePricingSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 z-10 opacity-15">
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-foreground rotate-12 animate-pulse" />
        <div className="absolute bottom-40 left-10 w-24 h-24 border-4 border-foreground -rotate-6 animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 border-4 border-foreground rotate-45" />
      </div>

      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-foreground font-light tracking-wide text-xl">
          iLab®
        </div>
      </div>

      {/* Pricing Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] p-4 justify-center">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <h1 className="font-heading text-4xl md:text-5xl font-black uppercase text-foreground mb-2 leading-none">
              TRANSFORM
              <span className="block text-3xl md:text-4xl text-primary">
                YOUR CHILD'S
              </span>
              <span className="block text-4xl md:text-5xl">
                FUTURE
              </span>
            </h1>
            
            {/* Glowing effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-purple/20 to-primary/20 blur-2xl -z-10" />
          </div>
          
          <p className="font-body text-lg font-bold text-foreground/80 max-w-sm mx-auto mb-6">
            8 weeks • Real results • Life-changing experience
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-sm mx-auto w-full">
          <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white transform hover:scale-105 transition-all duration-300">
            {/* Card Header */}
            <CardHeader className="bg-gradient-to-r from-primary to-accent-purple border-b-4 border-foreground text-center p-6 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8" />
              
              <Badge className="bg-white text-foreground font-black uppercase px-4 py-2 text-xs mb-4 shadow-lg">
                <Star className="h-3 w-3 mr-1" />
                LAUNCH SPECIAL
              </Badge>
              
              {/* Price Display */}
              <div className="relative z-10">
                <div className="text-white/60 text-lg line-through font-bold mb-1">€997</div>
                <div className="text-5xl font-black text-white mb-2">€329</div>
                <div className="text-white/90 text-sm font-bold uppercase tracking-wide">
                  Early Bird Price
                </div>
              </div>
            </CardHeader>
            
            {/* Card Content */}
            <CardContent className="p-6 text-center">
              {/* Value Proposition */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-accent-green/20 to-accent-blue/20 border-2 border-foreground rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-foreground" />
                    <span className="font-black text-sm uppercase text-foreground">Worth €5,000+</span>
                  </div>
                  <p className="font-body text-xs font-semibold text-foreground/80 leading-relaxed">
                    Complete AI entrepreneur transformation + competition prize
                  </p>
                </div>
                
                {/* Urgency */}
                <div className="bg-primary/10 border-2 border-primary rounded-xl p-3">
                  <div className="font-black text-primary text-lg mb-1">67% OFF</div>
                  <div className="font-body text-xs font-bold text-foreground">
                    Only 18 spots left
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-8 max-w-sm mx-auto w-full">
          <MobileWaitingListDialog>
            <Button className="
              w-full bg-gradient-to-r from-primary to-accent-purple
              border-4 border-foreground 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              font-black text-base px-6 py-4 uppercase
              hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
              transition-all text-white
              active:scale-95 touch-manipulation min-h-[52px]
              rounded-xl
            ">
              <Sparkles className="h-4 w-4 mr-2" />
              SECURE YOUR SPOT
            </Button>
          </MobileWaitingListDialog>
          
          <div className="text-center mt-4">
            <p className="font-body text-xs font-bold text-foreground/70">
              🔒 Limited to first 30 families
            </p>
            <p className="font-body text-xs font-semibold text-foreground/60 mt-1">
              Next cohort starts February 2025
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-2 bg-gradient-to-r from-primary via-accent-purple to-primary" />
    </div>
  );
};

export default MobilePricingSection;