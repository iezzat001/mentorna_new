import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, MapPin, GraduationCap, Award, Users, Heart } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

interface FounderData {
  name: string;
  title: string;
  image: string;
  background: string;
  experience: string;
  education: string;
  achievements: string[];
  quote: string;
  linkedin: string;
  email: string;
  color: string;
  location: string;
}

interface MobileFounderCardProps {
  founder: FounderData;
}

const MobileFounderCard = ({ founder }: MobileFounderCardProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-background to-accent-green/20">
      {/* Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-8">
        <div className="font-heading text-foreground font-light tracking-wide text-lg">
          iLab® Program
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-foreground/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-4rem)] p-4">
        {/* Section Title */}
        <div className="text-center mb-3">
          <h2 className="font-black text-lg uppercase text-foreground mb-1.5 leading-tight">
            Meet Your Mentors
          </h2>
          <p className="font-body text-xs font-semibold text-foreground/80 leading-tight">
            Expert entrepreneurs & AI specialists guiding your journey
          </p>
        </div>

        {/* Founder Card */}
        <Card className="
          border-2 
          border-foreground 
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
          bg-white
          mb-3
          flex-1
          flex
          flex-col
        ">
          {/* Founder Header */}
          <CardHeader className={`${founder.color} border-b-2 border-foreground text-center p-3`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="w-16 h-16 rounded-full border-3 border-foreground object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-accent-yellow border-2 border-foreground rounded-full p-1">
                  <Award className="h-3 w-3 text-foreground" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <CardTitle className="font-black text-sm uppercase text-foreground leading-tight">
                  {founder.name}
                </CardTitle>
                <p className="font-body text-xs font-semibold text-foreground/80 mt-1 leading-tight">
                  {founder.title}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-foreground/60" />
                  <span className="font-body text-xs text-foreground/60">
                    {founder.location}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-3 flex-1 flex flex-col">
            {/* Quote Section */}
            <div className="
              bg-accent-blue/10 
              border-2 
              border-accent-blue/30 
              rounded-lg 
              p-2.5 
              mb-3
            ">
              <div className="flex items-start gap-2">
                <Heart className="h-3 w-3 text-accent-blue mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs font-semibold text-foreground leading-tight italic">
                  "{founder.quote}"
                </p>
              </div>
            </div>

            {/* Background & Experience */}
            <div className="space-y-2 flex-1">
              <div className="bg-background/50 border border-foreground/20 rounded-lg p-2">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-3 w-3 text-accent-purple" />
                  <span className="font-black text-xs uppercase text-foreground">Background</span>
                </div>
                <p className="font-body text-xs text-foreground/80 leading-tight">
                  {founder.background}
                </p>
              </div>

              <div className="bg-background/50 border border-foreground/20 rounded-lg p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-3 w-3 text-accent-green" />
                  <span className="font-black text-xs uppercase text-foreground">Experience</span>
                </div>
                <p className="font-body text-xs text-foreground/80 leading-tight">
                  {founder.experience}
                </p>
              </div>

              {/* Key Achievements */}
              <div className="bg-background/50 border border-foreground/20 rounded-lg p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-3 w-3 text-accent-yellow" />
                  <span className="font-black text-xs uppercase text-foreground">Key Achievements</span>
                </div>
                <div className="space-y-1">
                  {founder.achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="flex items-start gap-1.5">
                      <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mt-1.5 flex-shrink-0" />
                      <span className="font-body text-xs text-foreground/80 leading-tight">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-foreground/20">
              <a 
                href={founder.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent-blue border border-foreground p-1.5 rounded hover:scale-105 transition-transform"
              >
                <Linkedin className="h-3 w-3 text-foreground" />
              </a>
              <a 
                href={`mailto:${founder.email}`}
                className="bg-accent-green border border-foreground p-1.5 rounded hover:scale-105 transition-transform"
              >
                <Mail className="h-3 w-3 text-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="pb-4">
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
              py-3
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              active:scale-95
            ">
              <Users className="h-3 w-3 mr-1.5" />
              LEARN FROM {founder.name.split(' ')[0].toUpperCase()}
            </Button>
          </WaitingListDialog>
          
          <p className="font-body text-xs font-semibold text-foreground/70 mt-1.5 text-center">
            Join to get mentored by industry experts
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileFounderCard;