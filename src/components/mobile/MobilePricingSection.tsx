
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Gift, Users, BookOpen, Award, Lock, Download, Sparkles } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

const MobilePricingSection = () => {
  const features = [
    {
      icon: <BookOpen className="h-3 w-3" />,
      text: "4 Live Expert Masterclasses"
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "8 Weekly Parent & Kid Packages"
    },
    {
      icon: <Award className="h-3 w-3" />,
      text: "AI Innovators Challenge Entry"
    },
    {
      icon: <Users className="h-3 w-3" />,
      text: "Private Parents Community Access"
    },
    {
      icon: <Lock className="h-3 w-3" />,
      text: "Lifetime Access to All Materials"
    },
    {
      icon: <Download className="h-3 w-3" />,
      text: "Digital AI Toolkit (First 30 only)"
    }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-accent-yellow via-accent-yellow/80 to-accent-yellow/60">
      {/* Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-8">
        <div className="font-heading text-foreground font-light tracking-wide text-lg">
          iLab® Program
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Main Content - with better space distribution */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-4rem)] p-4">
        {/* Section Title - more compact */}
        <div className="text-center mb-2">
          <h2 className="font-black text-base uppercase text-foreground mb-1 leading-tight">
            Transform Your Child's Future
          </h2>
          <p className="font-body text-xs font-semibold text-foreground/80 leading-tight max-w-sm mx-auto">
            For less than the cost of a few tutoring sessions
          </p>
        </div>

        {/* Pricing Card - optimized height */}
        <Card className="
          border-2 
          border-foreground 
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
          bg-white
          mb-2
          flex-1
          flex
          flex-col
          min-h-0
        ">
          {/* Pricing Header - more compact */}
          <CardHeader className="bg-primary border-b-2 border-foreground text-center p-2">
            <div className="space-y-1">
              <Badge className="
                bg-foreground 
                text-background 
                font-black 
                uppercase 
                px-2 
                py-0.5 
                text-xs
              ">
                LAUNCH SPECIAL
              </Badge>
              
              <div className="space-y-0.5">
                <div className="text-xs font-black text-primary-foreground line-through opacity-70">
                  $500 USD
                </div>
                <div className="text-2xl font-black text-primary-foreground">
                  $329
                </div>
              </div>
              
              <CardTitle className="font-black text-xs uppercase text-primary-foreground">
                LAUNCH SPECIAL PRICE
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="p-2 flex-1 flex flex-col min-h-0">
            {/* Bonus Section - more compact */}
            <div className="
              bg-accent-purple 
              border-2 
              border-foreground 
              shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] 
              p-1.5 
              mb-2
              rounded-lg
            ">
              <div className="flex items-center gap-1.5">
                <Gift className="h-3 w-3 text-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-black text-xs uppercase text-foreground">
                    💎 BONUS
                  </div>
                  <div className="font-body text-xs font-semibold text-foreground leading-tight">
                    First 30 get Digital AI Toolkit ($49)
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section - scrollable if needed */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="text-center mb-1.5">
                <h3 className="font-black text-xs uppercase text-foreground">
                  ✅ Everything You Get:
                </h3>
              </div>
              
              <div className="space-y-1 flex-1 overflow-y-auto">
                {features.map((feature, index) => (
                  <div key={index} className="
                    flex 
                    items-center 
                    gap-1.5 
                    p-1 
                    bg-background 
                    border border-foreground/30
                    rounded
                  ">
                    <div className="
                      bg-accent-green 
                      p-0.5 
                      border 
                      border-foreground
                      flex-shrink-0
                      rounded
                    ">
                      {feature.icon}
                    </div>
                    <span className="font-body text-xs font-semibold text-foreground leading-tight">
                      ✓ {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action - always visible at bottom */}
        <div className="flex-shrink-0">
          <WaitingListDialog>
            <Button className="
              w-full
              bg-primary 
              border-2 
              border-foreground 
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
              font-black 
              text-xs
              px-4 
              py-2.5
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              active:scale-95
            ">
              <Sparkles className="h-3 w-3 mr-1" />
              SECURE YOUR SPOT NOW!
            </Button>
          </WaitingListDialog>
          
          <p className="font-body text-xs font-semibold text-foreground/70 mt-1 text-center">
            Limited Time • First 30 Families Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobilePricingSection;
