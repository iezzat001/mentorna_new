import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Sparkles } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

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
        <div className="mb-8">
          <h2 className="text-foreground text-3xl font-black uppercase mb-3 leading-tight">
            Transform Your Child's Future
          </h2>
          <p className="text-foreground/80 text-base font-medium leading-relaxed">
            For less than the cost of a few tutoring sessions
          </p>
        </div>

        {/* Pricing Display */}
        <div className="mb-6">
          <Badge className="bg-foreground text-background font-black uppercase px-4 py-2 text-sm mb-4">
            🚀 LAUNCH SPECIAL
          </Badge>
          
          <div className="mb-2">
            <div className="text-foreground/60 text-lg font-bold line-through">
              $500 USD
            </div>
            <div className="text-foreground text-6xl font-black">
              $329
            </div>
          </div>
          
          <p className="text-foreground font-black text-sm uppercase tracking-wide">
            Launch Special Price
          </p>
        </div>

        {/* Bonus Section */}
        <div className="bg-foreground/10 backdrop-blur-sm border-2 border-foreground/30 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gift className="h-5 w-5 text-foreground" />
            <span className="font-black text-sm uppercase text-foreground">BONUS</span>
          </div>
          <p className="text-foreground font-semibold text-sm leading-tight">
            First 30 get Digital AI Toolkit ($49 value)
          </p>
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <WaitingListDialog>
            <Button className="
              w-full
              bg-foreground
              text-background
              border-2 
              border-foreground 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
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
              min-h-[56px]
              touch-manipulation
            ">
              <Sparkles className="h-5 w-5 mr-2" />
              SECURE YOUR SPOT NOW!
            </Button>
          </WaitingListDialog>
          
          
        </div>
      </div>
    </div>
  );
};

export default MobilePricingSection;