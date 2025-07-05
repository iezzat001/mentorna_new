import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Linkedin, Twitter, Users } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';
import FounderDialog from '../FounderDialog';
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
interface MobileFounderCardProps {
  founder: Founder;
}
const MobileFounderCard = ({
  founder
}: MobileFounderCardProps) => {
  return <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-8">
        <div className="font-heading text-background font-light tracking-wide text-lg drop-shadow-lg">
          iLab® Program
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-background/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Full Screen Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img src={founder.image} alt={founder.name} className="w-full h-full object-cover object-center" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
        {/* Section Title */}
        <div className="text-center mb-4">
          <h2 className="font-black text-lg uppercase text-background mb-1.5 leading-tight drop-shadow-lg">
            Meet Your Mentors
          </h2>
          
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Founder Info Card - Original Perfect Size */}
        <div className="
          bg-background/10 
          backdrop-blur-md 
          border-2 
          border-background/30 
          rounded-2xl 
          p-4 
          mb-4
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ">
          {/* Founder Name & Title */}
          <div className="text-center mb-3">
            <h3 className="
              font-heading 
              text-2xl 
              font-black 
              uppercase 
              text-background 
              mb-2
              drop-shadow-lg
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
              border-foreground 
              inline-block
              shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
            ">
              {founder.title}
            </div>
          </div>
          
          {/* Short Bio */}
          <div className="text-center mb-4">
            <p className="
              font-body 
              text-sm 
              font-medium 
              leading-relaxed
              text-background/95
              drop-shadow-md
            ">
              "{founder.shortBio}"
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {founder.socialMedia.linkedin && <a href={founder.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="
                  bg-background/20 
                  backdrop-blur-sm 
                  border-2 
                  border-background/40 
                  p-2 
                  rounded-full 
                  hover:scale-110 
                  transition-transform
                  hover:bg-background/30
                ">
                <Linkedin className="h-5 w-5 text-background" />
              </a>}
            {founder.socialMedia.twitter && <a href={founder.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="
                  bg-background/20 
                  backdrop-blur-sm 
                  border-2 
                  border-background/40 
                  p-2 
                  rounded-full 
                  hover:scale-110 
                  transition-transform
                  hover:bg-background/30
                ">
                <Twitter className="h-5 w-5 text-background" />
              </a>}
          </div>

          {/* Learn More Button */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-center mb-3">
                <Button className="
                  bg-primary 
                  text-primary-foreground 
                  font-black 
                  uppercase 
                  px-6 
                  py-3 
                  text-sm 
                  border-2 
                  border-background 
                  shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
                  hover:scale-105
                  transition-transform
                  active:scale-95
                ">
                  LEARN MORE ABOUT {founder.name.split(' ')[0].toUpperCase()}
                </Button>
              </div>
            </DialogTrigger>
            <FounderDialog founder={founder} />
          </Dialog>
        </div>

        {/* Call to Action - Always Visible */}
        <div className="pb-4">
          <WaitingListDialog>
            <Button className="
              w-full
              bg-accent-yellow 
              text-foreground
              border-2 
              border-foreground 
              shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] 
              font-black 
              text-sm
              px-4 
              py-3
              uppercase
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
              active:scale-95
            ">
              <Users className="h-4 w-4 mr-2" />
              JOIN THE PROGRAM
            </Button>
          </WaitingListDialog>
          
          <p className="font-body text-xs font-semibold text-background/80 mt-1.5 text-center drop-shadow-md">
            Get mentored by industry experts
          </p>
        </div>
      </div>
    </div>;
};
export default MobileFounderCard;