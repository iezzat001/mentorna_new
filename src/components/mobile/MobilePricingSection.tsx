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
        <div className="absolute top-20 right-10 w-24 h-24 border-4 border-foreground rotate-12 animate-pulse" />
        <div className="absolute bottom-40 left-10 w-20 h-20 border-4 border-foreground -rotate-6 animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border-4 border-foreground rotate-45" />
      </div>

      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-foreground font-light tracking-wide text-xl">
          iLab®
        </div>
      </div>

      {/* Pricing Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] p-4">
        {/* Hero Section */}
        <div className="text-center mb-6 flex-shrink-0">
          <div className="relative inline-block mb-4">
            <h1 className="font-heading text-3xl font-black uppercase text-foreground mb-2 leading-tight">
              TRANSFORM
              <span className="block text-2xl text-primary">
                YOUR CHILD'S
              </span>
              <span className="block text-3xl">
                FUTURE
              </span>
            </h1>
            
            {/* Glowing effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-purple/20 to-primary/20 blur-xl -z-10" />
          </div>
          
          <p className="font-body text-base font-bold text-foreground/80 max-w-xs mx-auto">
            8 weeks • Real results • Life-changing
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className="max-w-xs mx-auto w-full">
            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
              {/* Card Header */}
              <CardHeader className="bg-gradient-to-r from-primary to-accent-purple border-b-4 border-foreground text-center p-4 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6" />
                
                <Badge className="bg-white text-foreground font-black uppercase px-3 py-1 text-xs mb-3 shadow-lg">
                  <Star className="h-3 w-3 mr-1" />
                  LAUNCH SPECIAL
                </Badge>
                
                {/* Price Display */}
                <div className="relative z-10">
                  <div className="text-white/60 text-base line-through font-bold mb-1">€997</div>
                  <div className="text-4xl font-black text-white mb-1">€329</div>
                  <div className="text-white/90 text-xs font-bold uppercase tracking-wide">
                    Early Bird Price
                  </div>
                </div>
              </CardHeader>
              
              {/* Card Content */}
              <CardContent className="p-4 text-center">
                {/* Value Proposition */}
                <div className="bg-gradient-to-r from-accent-green/20 to-accent-blue/20 border-2 border-foreground rounded-lg p-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-foreground" />
                    <span className="font-black text-xs uppercase text-foreground">Worth €5,000+</span>
                  </div>
                  <p className="font-body text-xs font-semibold text-foreground/80 leading-relaxed">
                    Complete AI entrepreneur transformation + competition prize
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex-shrink-0 mt-6 max-w-xs mx-auto w-full">
          <MobileWaitingListDialog>
            <Button className="
              w-full bg-white text-black 
              font-black text-base py-4 
              rounded-full shadow-lg
              hover:scale-105 transition-transform duration-200
              active:scale-95 touch-manipulation min-h-[48px]
            ">
              🚀 SECURE YOUR SPOT
            </Button>
          </MobileWaitingListDialog>
          
          <div className="text-center mt-3">
            <p className="font-body text-xs font-bold text-foreground/70">
              🔒 Limited to first 30 families
            </p>
            <p className="font-body text-xs font-semibold text-foreground/60 mt-1">
              Next cohort starts February 2025
            </p>
          </div>
        </div>

        {/* Safe Area for Mobile */}
        <div className="h-4 flex-shrink-0" />
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-gradient-to-r from-primary via-accent-purple to-primary" />
    </div>
  );
};

export default MobilePricingSection;