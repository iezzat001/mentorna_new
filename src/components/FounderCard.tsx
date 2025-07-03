
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import FounderDialog from './FounderDialog';

interface Founder {
  id: number;
  name: string;
  title: string;
  shortBio: string;
  extendedBio: string;
  image: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
  };
}

interface FounderCardProps {
  founder: Founder;
}

const FounderCard = ({ founder }: FounderCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          bg-white 
          cursor-pointer
          hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
          hover:scale-[1.02] 
          transition-all
          duration-300
          overflow-hidden
          h-80
          relative
          group
        ">
          <CardContent className="p-0 h-full relative">
            {/* Background Image */}
            <div className="
              absolute 
              inset-0 
              w-full 
              h-full
            ">
              <img 
                src={founder.image} 
                alt={founder.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Sliding Text Overlay */}
            <div className="
              absolute 
              inset-x-0 
              bottom-0 
              bg-gradient-to-t 
              from-foreground 
              via-foreground/90 
              to-transparent 
              text-background 
              p-6 
              transform 
              translate-y-full 
              group-hover:translate-y-0 
              transition-transform 
              duration-500 
              ease-out
            ">
              <h3 className="
                font-heading 
                text-2xl 
                font-black 
                uppercase 
                mb-2
              ">
                {founder.name}
              </h3>
              
              <div className="
                bg-accent-yellow 
                text-foreground 
                font-bold 
                text-sm 
                px-4 
                py-2 
                border-2 
                border-background 
                inline-block 
                mb-4
              ">
                {founder.title}
              </div>
              
              <p className="
                font-body 
                text-base 
                font-medium 
                leading-relaxed
                mb-4
              ">
                "{founder.shortBio}"
              </p>
              
              <div className="
                bg-primary 
                text-primary-foreground 
                font-black 
                uppercase 
                px-4 
                py-2 
                text-sm 
                border-2 
                border-background 
                inline-block
                shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
              ">
                CLICK TO LEARN MORE
              </div>
            </div>

            {/* Name overlay that's always visible */}
            <div className="
              absolute 
              bottom-4 
              left-4 
              bg-foreground/80 
              text-background 
              px-3 
              py-1 
              font-black 
              uppercase 
              text-sm
              group-hover:opacity-0
              transition-opacity
              duration-300
            ">
              {founder.name}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <FounderDialog founder={founder} />
    </Dialog>
  );
};

export default FounderCard;
