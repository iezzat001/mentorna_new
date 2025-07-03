
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface FounderDialogProps {
  founder: Founder;
}

const FounderDialog = ({ founder }: FounderDialogProps) => {
  return (
    <DialogContent className="
      max-w-2xl 
      border-4 
      border-foreground 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      bg-white
      rounded-none
    ">
      <DialogHeader>
        <DialogTitle className="
          font-heading 
          text-3xl 
          font-black 
          uppercase 
          text-foreground 
          text-center
        ">
          {founder.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="text-center">
          <div className="
            w-40 
            h-40 
            mx-auto 
            mb-4 
            border-4 
            border-foreground 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            overflow-hidden
            bg-accent-yellow
          ">
            <img 
              src={founder.image} 
              alt={founder.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="
            bg-accent-yellow 
            text-foreground 
            font-bold 
            text-base 
            px-6 
            py-3 
            border-2 
            border-foreground 
            inline-block 
            mb-6
          ">
            {founder.title}
          </div>
        </div>
        
        <div className="
          bg-accent-purple 
          border-4 
          border-foreground 
          p-6 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ">
          <h4 className="
            font-heading 
            text-lg 
            font-black 
            uppercase 
            mb-4 
            text-foreground
          ">
            BIOGRAPHY
          </h4>
          <p className="
            font-body 
            text-base 
            font-semibold 
            text-foreground 
            leading-relaxed
          ">
            "{founder.extendedBio}"
          </p>
        </div>
        
        <div className="
          bg-accent-blue 
          border-4 
          border-foreground 
          p-6 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ">
          <h4 className="
            font-heading 
            text-lg 
            font-black 
            uppercase 
            mb-4 
            text-foreground
          ">
            CONNECT WITH {founder.name.split(' ')[0].toUpperCase()}
          </h4>
          <div className="flex gap-4 justify-center">
            <a 
              href={founder.socialMedia.linkedin}
              className="
                bg-foreground 
                text-background 
                font-black 
                uppercase 
                px-6 
                py-3 
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-1 
                hover:translate-y-1 
                hover:shadow-none 
                transition-all
              "
            >
              LINKEDIN
            </a>
            <a 
              href={founder.socialMedia.twitter}
              className="
                bg-primary 
                text-primary-foreground 
                font-black 
                uppercase 
                px-6 
                py-3 
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-1 
                hover:translate-y-1 
                hover:shadow-none 
                transition-all
              "
            >
              TWITTER
            </a>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default FounderDialog;
