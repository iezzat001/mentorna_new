import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Sparkles } from 'lucide-react';
import MobileWaitingListDialog from './MobileWaitingListDialog';
import MobileSwipeIndicator from './MobileSwipeIndicator';

const MobilePricingSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-accent-yellow via-accent-yellow/80 to-accent-yellow/60">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-foreground font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] justify-center px-4 max-w-sm mx-auto text-center">
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-foreground text-2xl font-black uppercase mb-2 leading-tight">
            Transform Your Child's Future
          </h2>
          
        </div>

        {/* Pricing Display */}
        <div className="mb-6">
          <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-3">
            🚀 LAUNCH SPECIAL
          </Badge>
          
          <div className="mb-2">
            <div className="text-foreground/60 text-base font-bold line-through">
              $500 USD
            </div>
            <div className="text-foreground text-5xl font-black">
              $329
            </div>
          </div>
          
          <p className="text-foreground font-black text-sm uppercase tracking-wide">
            Launch Special Price
          </p>
        </div>

        {/* Bonus Section */}
        <div className="bg-foreground/10 backdrop-blur-sm border-2 border-foreground/30 rounded-xl p-3 mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gift className="h-4 w-4 text-foreground" />
            <span className="font-black text-xs uppercase text-foreground">💎 BONUS</span>
          </div>
          <p className="text-foreground font-semibold text-sm">
          First 10 families get a 1-1 roadmap consultation with our experts
          </p>
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <MobileWaitingListDialog>
            <Button className="
              w-full
              bg-foreground
              text-background
              border-2 
              border-foreground 
              shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] 
              font-black 
              text-base
              px-6 
              py-4
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              active:scale-95
              min-h-[52px]
              touch-manipulation
            ">
              <Sparkles className="h-4 w-4 mr-2" />
              SECURE YOUR SPOT NOW!
            </Button>
          </MobileWaitingListDialog>
          
          <p className="text-foreground/70 text-xs font-semibold">
            Limited Time • First 10 Families Only
          </p>
        </div>
      </div>

      {/* Swipe Indicator */}
      <MobileSwipeIndicator color="dark" />
    </div>
  );
};

export default MobilePricingSection;