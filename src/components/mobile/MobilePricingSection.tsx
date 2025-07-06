import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Gift, Users, BookOpen, Award, Lock, Download, Sparkles } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

const MobilePricingSection = () => {
  const features = [
    {
      icon: <BookOpen className="h-4 w-4" />,
      text: "4 Live Expert Masterclasses"
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: "8 Weekly Parent & Kid Packages"
    },
    {
      icon: <Award className="h-4 w-4" />,
      text: "AI Innovators Challenge Entry"
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: "Private Parents Community Access"
    },
    {
      icon: <Lock className="h-4 w-4" />,
      text: "Lifetime Access to All Materials"
    },
    {
      icon: <Download className="h-4 w-4" />,
      text: "Digital AI Toolkit (First 30 only)"
    }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-accent-yellow via-accent-yellow/80 to-accent-yellow/60">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-foreground font-light tracking-wide text-xl">
          iLab® Program
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] p-4">
        {/* Section Title */}
        <div className="text-center mb-4">
          <h2 className="font-black text-2xl uppercase text-foreground mb-2 leading-tight">
            Transform Your Child's Future
          </h2>
          <p className="font-body text-sm font-semibold text-foreground/80 leading-tight">
            For less than the cost of a few tutoring sessions
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white mb-4 flex-1 flex flex-col">
          {/* Card Header */}
          <CardHeader className="bg-primary border-b-2 border-foreground text-center p-4">
            <Badge className="bg-foreground text-background font-black uppercase px-3 py-1 text-xs mb-2 mx-auto">
              LAUNCH SPECIAL
            </Badge>
            
            <div className="space-y-1">
              <div className="text-sm font-bold text-primary-foreground line-through opacity-70">
                $500 USD
              </div>
              <div className="text-4xl font-black text-primary-foreground">
                $329
              </div>
              <CardTitle className="font-black text-sm uppercase text-primary-foreground">
                LAUNCH SPECIAL PRICE
              </CardTitle>
            </div>
          </CardHeader>
          
          {/* Card Content */}
          <CardContent className="p-4 flex-1 flex flex-col">
            {/* Bonus Section */}
            <div className="bg-accent-purple border-2 border-foreground shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] p-3 mb-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-foreground flex-shrink-0" />
                <div>
                  <div className="font-black text-xs uppercase text-foreground mb-1">💎 BONUS</div>
                  <div className="font-body text-sm font-semibold text-foreground leading-tight">
                    First 30 get Digital AI Toolkit ($49)
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features List */}
            <div className="space-y-3 flex-1">
              <h3 className="font-black text-sm uppercase text-foreground mb-3">What's Included:</h3>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <WaitingListDialog>
            <Button className="
              w-full
              bg-primary 
              border-2 
              border-foreground 
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
              font-black 
              text-sm
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
              <Sparkles className="h-4 w-4 mr-2" />
              SECURE YOUR SPOT NOW!
            </Button>
          </WaitingListDialog>
          
          <p className="font-body text-xs font-semibold text-foreground/70 mt-2 text-center">
            Limited Time • First 30 Families Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobilePricingSection;