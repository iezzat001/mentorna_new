
import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpcomingConsultationCard = () => {
  return (
    <Card className="
      border-4 
      border-foreground 
      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
      bg-accent-blue
    ">
      <CardHeader className="pb-4">
        <CardTitle className="
          font-heading 
          text-xl 
          font-black 
          uppercase 
          text-foreground 
          flex 
          items-center 
          gap-2
        ">
          <Calendar className="w-5 h-5" />
          UPCOMING CONSULTATION
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="
          bg-background 
          border-2 
          border-foreground 
          rounded-xl 
          p-4
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Dr. Sarah Johnson
            </h3>
            <span className="
              bg-accent-green 
              text-foreground 
              px-2 
              py-1 
              rounded-full 
              text-xs 
              font-bold 
              border-2 
              border-foreground
            ">
              AI SPECIALIST
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Today, Dec 15</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>3:00 PM</span>
            </div>
          </div>

          <Button className="
            w-full 
            bg-primary 
            border-2 
            border-foreground 
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
            font-black 
            uppercase
            hover:translate-x-1 
            hover:translate-y-1 
            hover:shadow-none
          ">
            <Video className="w-4 h-4 mr-2" />
            JOIN MEETING
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingConsultationCard;
