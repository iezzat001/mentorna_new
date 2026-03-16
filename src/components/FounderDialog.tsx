
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import TikTokIcon from '@/components/icons/TikTokIcon';

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
    instagram?: string;
    tiktok?: string;
  };
}

interface FounderDialogProps {
  founder: Founder;
}

const FounderDialog = ({ founder }: FounderDialogProps) => {
  const socials = [
    { key: 'linkedin', label: 'LinkedIn', href: founder.socialMedia.linkedin, Icon: Linkedin },
    { key: 'twitter', label: 'Twitter', href: founder.socialMedia.twitter, Icon: Twitter },
    { key: 'instagram', label: 'Instagram', href: founder.socialMedia.instagram || '', Icon: Instagram },
    {
      key: 'tiktok',
      label: 'TikTok',
      href: founder.socialMedia.tiktok || '',
      Icon: (props: { className?: string }) => <TikTokIcon className={props.className} />,
    },
  ].filter((s) => !!s.href);

  return (
    <DialogContent className="
      max-w-2xl 
      max-h-[90vh]
      overflow-y-auto
      border-4 
      border-foreground 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      bg-white
      rounded-none
      p-0
    ">
      <div className="p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="
            font-heading 
            text-3xl 
            font-black 
            uppercase 
            text-foreground 
            text-center
            pr-8
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
          
          {socials.length > 0 && (
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
              <div className="flex gap-3 justify-center flex-wrap">
                {socials.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 flex items-center justify-center border-4 border-foreground bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Icon className="w-6 h-6 text-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default FounderDialog;
