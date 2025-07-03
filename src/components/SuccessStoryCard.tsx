
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface SuccessStoryCardProps {
  name: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  headerColor: string;
  icon: LucideIcon;
  videoUrl: string;
  description: string;
}

const SuccessStoryCard = ({
  name,
  emoji,
  badge,
  badgeColor,
  headerColor,
  icon: Icon,
  videoUrl,
  description
}: SuccessStoryCardProps) => {
  return (
    <Card className="
      border-4 
      border-foreground 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      bg-white 
      hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
      hover:scale-[1.02] 
      transition-all 
      duration-200
    ">
      <CardHeader className={`${headerColor} border-b-4 border-foreground p-6`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="
            bg-foreground 
            text-background 
            p-3 
            border-2 
            border-foreground
          ">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="font-black text-2xl uppercase text-foreground">
              {emoji} {name}
            </CardTitle>
            <div className={`
              ${badgeColor}
              text-foreground 
              font-bold 
              uppercase 
              px-3 
              py-1 
              text-xs 
              border-2 
              border-foreground 
              inline-block 
              mt-2
            `}>
              {badge}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <VideoPlayer videoUrl={videoUrl} />
        
        <p className="font-body text-base font-semibold mb-6 leading-relaxed">
          {description}
        </p>
        
        <Button className="
          bg-primary 
          border-4 
          border-foreground 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          font-black 
          uppercase 
          hover:translate-x-1 
          hover:translate-y-1 
          hover:shadow-none 
          transition-all
        ">
          WATCH STORY
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessStoryCard;
