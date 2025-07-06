import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Gift, Users, BookOpen, Award, Lock, Download } from 'lucide-react';
import WaitingListDialog from './WaitingListDialog';
const PricingSection = () => {
  const features = [{
    icon: <BookOpen className="h-5 w-5" />,
    text: "4 Live Expert Masterclasses"
  }, {
    icon: <Users className="h-5 w-5" />,
    text: "8 Weekly Parent & Kid Packages"
  }, {
    icon: <Award className="h-5 w-5" />,
    text: "AI Innovators Challenge Entry"
  }, {
    icon: <Users className="h-5 w-5" />,
    text: "Private Parents Community Access"
  }, {
    icon: <Lock className="h-5 w-5" />,
    text: "Lifetime Access to All Materials"
  }, {
    icon: <Download className="h-5 w-5" />,
    text: "Digital AI Toolkit (First 30 only)"
  }];
  return <section className="bg-accent-yellow border-b-4 border-foreground px-0 py-0">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="
            font-heading 
            text-4xl md:text-5xl lg:text-6xl 
            font-black 
            uppercase 
            text-foreground 
            mb-6
          ">
            TRANSFORM YOUR CHILD'S FUTURE
          </h2>
          <p className="font-body text-xl font-semibold text-foreground/80 max-w-2xl mx-auto">
            For less than the cost of a few traditional tutoring sessions, you're investing in critical future skills, expert guidance, and a transformative learning experience.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <Card className="
            border-4 
            border-foreground 
            shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
            bg-white
            hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] 
            hover:scale-[1.02] 
            transition-all
            duration-200
            max-w-lg
            w-full
          ">
            <CardHeader className="bg-primary border-b-4 border-foreground text-center">
              <div className="space-y-4">
                <Badge className="
                  bg-foreground 
                  text-background 
                  font-black 
                  uppercase 
                  px-4 
                  py-2 
                  text-sm
                  border-2 
                  border-background
                ">
                  LAUNCH SPECIAL
                </Badge>
                
                <div className="space-y-2">
                  <div className="text-2xl font-black text-primary-foreground line-through opacity-70">
                    $500 USD
                  </div>
                  <div className="text-6xl font-black text-primary-foreground">
                    $329
                  </div>
                </div>
                
                <CardTitle className="font-black text-xl uppercase text-primary-foreground">
                  LAUNCH SPECIAL PRICE
                </CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Bonus Section */}
              <div className="
                bg-accent-purple 
                border-4 
                border-foreground 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                p-4 
                mb-8
                flex 
                items-center 
                gap-3
              ">
                <Gift className="h-6 w-6 text-foreground" />
                <div>
                  <div className="font-black text-sm uppercase text-foreground">
                    💎 BONUS
                  </div>
                  <div className="font-body text-sm font-semibold text-foreground">
                    The first 30 families get a Digital AI Toolkit for Teens (Value: $49)
                  </div>
                </div>
              </div>

              {/* Features Section */}
              

              {/* Call to Action */}
              <div className="mt-8 text-center">
                <WaitingListDialog>
                  <Button className="
                    w-full
                    bg-primary 
                    hover:bg-primary-hover
                    border-4 
                    border-foreground 
                    shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    font-black 
                    text-lg 
                    px-8 
                    py-6
                    uppercase
                    hover:translate-x-1 
                    hover:translate-y-1 
                    hover:shadow-none 
                    transition-all
                  ">
                    SECURE YOUR SPOT NOW!
                  </Button>
                </WaitingListDialog>
                
                <p className="font-body text-sm font-semibold text-foreground/70 mt-4">
                  Limited Time • First 30 Families Only
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default PricingSection;