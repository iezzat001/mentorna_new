
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Gift, Sparkles, Clock, Award } from 'lucide-react';
import MobileWaitingListDialog from './MobileWaitingListDialog';

const MobilePricingSection = () => {
  const features = [
    "8-Week Intensive Program",
    "AI & Coding Fundamentals", 
    "Real Product Development",
    "Entrepreneurship Training",
    "1-on-1 Mentorship",
    "Demo Day Presentation",
    "€5,000 Competition Prize",
    "Lifetime Alumni Network"
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-accent-yellow via-accent-yellow/80 to-accent-yellow/60">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-8">
        <div className="font-heading text-foreground font-light tracking-wide text-lg">
          iLab® Program
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Pricing Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-4rem)] p-4">
        {/* Section Title */}
        <div className="text-center mb-4">
          <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-3">
            🚀 LAUNCH SPECIAL
          </Badge>
          <h2 className="font-black text-lg uppercase text-foreground mb-1 leading-tight">
            Transform Your Child's Future
          </h2>
          <p className="font-body text-sm font-semibold text-foreground/80 leading-tight max-w-sm mx-auto">
            For less than the cost of a few tutoring sessions
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white mb-4 flex-1 flex flex-col">
            {/* Card Header */}
            <CardHeader className="bg-primary border-b-2 border-foreground text-center p-3">
              <Badge className="bg-foreground text-background font-black uppercase px-2 py-0.5 text-xs mb-2">
                LAUNCH SPECIAL
              </Badge>
              <div className="text-2xl font-black text-primary-foreground">$329</div>
              <div className="text-primary-foreground/80 text-xs line-through">$997</div>
              <CardTitle className="font-black text-sm uppercase text-primary-foreground">
                EARLY BIRD PRICING
              </CardTitle>
            </CardHeader>
            
            {/* Card Content */}
            <CardContent className="p-3 flex-1 flex flex-col">
              {/* Bonus Section */}
              <div className="bg-accent-purple border-2 border-foreground shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] p-2 mb-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-foreground flex-shrink-0" />
                  <div>
                    <div className="font-black text-xs uppercase text-foreground">💎 BONUS</div>
                    <div className="font-body text-xs font-semibold text-foreground leading-tight">
                      First 30 get Digital AI Toolkit ($49)
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-1 mb-4 flex-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-accent-green flex-shrink-0" />
                    <span className="font-body text-xs font-semibold text-foreground leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Urgency Indicators */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-foreground" />
                    <span className="font-semibold text-foreground">Limited Time</span>
                  </div>
                  <span className="font-black text-primary">67% OFF</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-foreground" />
                    <span className="font-semibold text-foreground">Spots Remaining</span>
                  </div>
                  <span className="font-black text-foreground">12/30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <MobileWaitingListDialog>
            <Button className="w-full bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm px-4 py-3 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-primary-foreground active:scale-95 touch-manipulation min-h-[48px]">
              <Sparkles className="h-3 w-3 mr-1" />
              SECURE YOUR SPOT NOW!
            </Button>
          </MobileWaitingListDialog>
          <p className="font-body text-xs font-semibold text-foreground/70 mt-2 text-center">
            Limited Time • First 30 Families Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobilePricingSection;
