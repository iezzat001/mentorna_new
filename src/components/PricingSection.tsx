import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Zap, TrendingUp } from 'lucide-react';
import WaitingListDialog from './WaitingListDialog';

const PricingSection = () => {
  return (
    <section className="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70 border-b-4 border-foreground py-20 px-6 relative overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-40 h-40 border-4 border-foreground rotate-12 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-32 h-32 border-4 border-foreground -rotate-6 animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-foreground rotate-45" />
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 border-4 border-foreground -rotate-12" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="
              font-heading 
              text-5xl md:text-6xl lg:text-7xl 
              font-black 
              uppercase 
              text-foreground 
              mb-4
              leading-none
            ">
              TRANSFORM
              <span className="block text-4xl md:text-5xl lg:text-6xl text-primary">
                YOUR CHILD'S
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl">
                FUTURE
              </span>
            </h2>
            
            {/* Glowing effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-purple/20 to-primary/20 blur-3xl -z-10" />
          </div>
          
          <p className="font-body text-xl md:text-2xl font-bold text-foreground/80 max-w-3xl mx-auto mb-6">
            8-week intensive program • Real products • Life-changing results
          </p>
          
          <Badge className="
            bg-gradient-to-r from-primary to-accent-purple
            text-white
            font-black 
            uppercase 
            px-6 
            py-3 
            text-sm
            border-4 
            border-white
            shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]
          ">
            <TrendingUp className="h-4 w-4 mr-2" />
            LIMITED LAUNCH OFFER
          </Badge>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <Card className="
            border-4 
            border-foreground 
            shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] 
            bg-white
            hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] 
            hover:scale-[1.02] 
            transition-all
            duration-300
            max-w-2xl
            w-full
            relative
            overflow-hidden
          ">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent-blue/10 to-transparent rounded-full -ml-20 -mb-20" />
            
            <CardHeader className="bg-gradient-to-r from-primary via-accent-purple to-primary border-b-4 border-foreground text-center p-8 relative z-10">
              <div className="space-y-6">
                <Badge className="
                  bg-white 
                  text-foreground 
                  font-black 
                  uppercase 
                  px-6 
                  py-3 
                  text-sm
                  border-2 
                  border-foreground
                  shadow-lg
                ">
                  <Star className="h-4 w-4 mr-2" />
                  LAUNCH SPECIAL
                </Badge>
                
                <div className="space-y-3">
                  <div className="text-2xl md:text-3xl font-black text-white/60 line-through">
                    €997
                  </div>
                  <div className="text-6xl md:text-7xl font-black text-white leading-none">
                    €329
                  </div>
                  <div className="text-white/90 text-lg font-bold uppercase tracking-wide">
                    Early Bird Pricing
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 md:p-12 text-center relative z-10">
              {/* Value Proposition */}
              <div className="space-y-6 mb-12">
                <div className="bg-gradient-to-r from-accent-green/20 to-accent-blue/20 border-4 border-foreground rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Zap className="h-6 w-6 text-foreground" />
                    <span className="font-black text-lg uppercase text-foreground">Program Value: €5,000+</span>
                  </div>
                  <p className="font-body text-base font-semibold text-foreground/80 leading-relaxed">
                    Complete AI entrepreneur transformation including mentorship, tools, and €5,000 competition prize
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-6">
                <WaitingListDialog>
                  <Button className="
                    w-full
                    bg-gradient-to-r from-primary to-accent-purple
                    hover:from-primary-hover hover:to-accent-purple
                    border-4 
                    border-foreground 
                    shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    font-black 
                    text-2xl 
                    px-10 
                    py-8
                    uppercase
                    hover:translate-x-2 
                    hover:translate-y-2 
                    transition-all
                    text-white
                    rounded-2xl
                    min-h-[70px]
                    transform hover:scale-105
                    relative overflow-hidden
                  ">
                    <Sparkles className="h-6 w-6 mr-4" />
                    SECURE YOUR SPOT NOW
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-2xl" />
                  </Button>
                </WaitingListDialog>
                
                <div className="space-y-2">
                  <p className="font-body text-sm font-bold text-foreground/70">
                    🔒 Limited to first 30 families
                  </p>
                  <p className="font-body text-sm font-semibold text-foreground/60">
                    Next cohort starts February 2025
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <div className="
            bg-gradient-to-r from-primary via-accent-yellow to-primary
            border-4 
            border-foreground
            shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]
            p-6
            inline-block
            max-w-2xl
            rounded-2xl
          ">
            <h3 className="
              font-heading 
              text-2xl md:text-3xl
              font-black 
              uppercase 
              text-white
              mb-3
              drop-shadow-lg
            ">
              🚀 INVESTMENT IN YOUR CHILD'S FUTURE
            </h3>
            <p className="font-body text-base md:text-lg font-bold text-white/95 leading-relaxed drop-shadow-md">
              Less than the cost of private tutoring, with
              <span className="block mt-1 text-accent-yellow font-black">
                UNLIMITED LIFETIME VALUE
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;