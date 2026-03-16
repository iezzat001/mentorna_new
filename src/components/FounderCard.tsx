
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import FounderDialog from './FounderDialog';
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

interface FounderCardProps {
  founder: Founder;
}

const FounderCard = ({ founder }: FounderCardProps) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Card className="
          w-full
          max-w-3xl
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          bg-white 
          cursor-pointer
          hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
          hover:-translate-y-0.5
          transition-all
          duration-200
          overflow-hidden
          rounded-none
        ">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-accent-yellow border-b-4 md:border-b-0 md:border-r-4 border-foreground">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-72 md:h-full md:w-64 object-cover object-center"
                />
              </div>

              <div className="p-6 md:p-8 flex-1">
                <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-foreground mb-2">
                  {founder.name}
                </h3>

                <div className="bg-foreground text-background font-black uppercase px-4 py-2 text-xs border-4 border-foreground inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
                  {founder.title}
                </div>

                <p className="font-body text-base md:text-lg font-semibold text-foreground/80 leading-relaxed mb-6">
                  {founder.shortBio}
                </p>

              {socials.length > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  {socials.map(({ key, href, label, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 flex items-center justify-center border-4 border-foreground bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                    >
                      <Icon className="w-5 h-5 text-foreground" />
                    </a>
                  ))}
                </div>
              )}

                <div className="bg-primary text-primary-foreground font-black uppercase px-4 py-2 text-sm border-4 border-foreground inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Click to read full bio
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <FounderDialog founder={founder} />
    </Dialog>
  );
};

export default FounderCard;
