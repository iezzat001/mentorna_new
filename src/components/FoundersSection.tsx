
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FoundersSection = () => {
  const founders = [
    {
      id: 1,
      name: "Ahmed Ezzat",
      title: "AI Consultant & Serial Entrepreneur",
      shortBio: "For five years, I've merged my expertise in entrepreneurship and AI into educational initiatives for Arab communities.",
      extendedBio: "For five years, I've merged my expertise in entrepreneurship and AI into educational initiatives for Arab communities. I've helped students secure spots at top universities and launch innovative projects.",
      image: "https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur .png",
      socialMedia: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Islam Mosa",
      title: "Tech Entrepreneur, & 40 under 40 by HBJ",
      shortBio: "I believe our children have the brilliance to not just adapt, but to lead.",
      extendedBio: "I believe our children have the brilliance to not just adapt, but to lead. My role is to help spark that.",
      image: "https://d2mp3ttz3u5gci.cloudfront.net/islam_entrepreneur .png",
      socialMedia: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <section className="bg-accent-purple border-b-4 border-foreground py-16 px-6">
      <div className="container mx-auto max-w-6xl">
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
            MEET THE FOUNDERS
          </h2>
          <div className="
            bg-foreground 
            text-background 
            font-black 
            uppercase 
            px-6 
            py-2 
            text-sm 
            border-4 
            border-foreground 
            inline-block
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          ">
            EDUCATORS, AI INNOVATORS & ENTREPRENEURS
          </div>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {founders.map((founder) => (
            <Dialog key={founder.id}>
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
                  duration-200
                ">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="
                        w-32 
                        h-32 
                        mx-auto 
                        mb-6 
                        border-4 
                        border-foreground 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                        overflow-hidden
                        bg-accent-yellow
                      ">
                        <img 
                          src={founder.image} 
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="
                        font-heading 
                        text-2xl 
                        font-black 
                        uppercase 
                        text-foreground 
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
                        border-foreground 
                        inline-block 
                        mb-4
                      ">
                        {founder.title}
                      </div>
                      
                      <p className="
                        font-body 
                        text-base 
                        font-semibold 
                        text-foreground 
                        leading-relaxed
                      ">
                        "{founder.shortBio}"
                      </p>
                      
                      <div className="
                        mt-6 
                        bg-primary 
                        text-primary-foreground 
                        font-black 
                        uppercase 
                        px-4 
                        py-2 
                        text-sm 
                        border-2 
                        border-foreground 
                        inline-block
                        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                      ">
                        CLICK TO LEARN MORE
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
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
                        className="w-full h-full object-cover"
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
            </Dialog>
          ))}
        </div>

        {/* Trust Message */}
        <div className="
          bg-white 
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          p-8 
          text-center
        ">
          <p className="
            font-body 
            text-lg 
            font-bold 
            text-foreground 
            leading-relaxed
          ">
            Parents trust us because we've walked this journey. We've helped Arab students win scholarships, launch projects, and discover their passion early.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
