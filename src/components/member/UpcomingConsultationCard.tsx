
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
      bg-accent-yellow
    ">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-xl font-black uppercase">
          UPCOMING Workshop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="
          bg-background 
          border-2 
          border-foreground 
          rounded-lg 
          p-4 
          space-y-3
        ">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-body font-semibold">
              Tomorrow, March 15th
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-body font-semibold">
              2:00 PM - 3:00 PM
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-primary" />
            <span className="font-body font-semibold">
              Dr. Islam Mosa - TEDx Talk Pitching
            </span>
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
          JOIN Workshop
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingConsultationCard;
