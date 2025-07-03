
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Lightbulb } from 'lucide-react';

const SuccessStories = () => {
  return (
    <section className="bg-accent-yellow border-b-4 border-foreground py-16 px-6">
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
            MEET OUR FUTURE TECH ENTREPRENEURS
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
            SUCCESS STORIES
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mariam's Story */}
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
            <CardHeader className="bg-accent-purple border-b-4 border-foreground p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="
                  bg-foreground 
                  text-background 
                  p-3 
                  border-2 
                  border-foreground
                ">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="font-black text-2xl uppercase text-foreground">
                    🎓 MARIAM ABDELAZIZ
                  </CardTitle>
                  <div className="
                    bg-accent-green 
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
                  ">
                    UNIVERSITY SCHOLARSHIP WINNER
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Video Container */}
              <div className="
                border-4 
                border-foreground 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                mb-6 
                bg-black
              ">
                <video 
                  controls 
                  className="w-full h-48 object-cover"
                  poster="/placeholder.svg"
                >
                  <source src="https://d2mp3ttz3u5gci.cloudfront.net/mariam.MOV" type="video/quicktime" />
                  <source src="https://d2mp3ttz3u5gci.cloudfront.net/mariam.MOV" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <p className="font-body text-base font-semibold mb-6 leading-relaxed">
                Through our mentorship program, Mariam secured a scholarship to study abroad at a top university. Her success story demonstrates the transformative power of future-focused education.
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

          {/* Omar's Story */}
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
            <CardHeader className="bg-accent-blue border-b-4 border-foreground p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="
                  bg-foreground 
                  text-background 
                  p-3 
                  border-2 
                  border-foreground
                ">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="font-black text-2xl uppercase text-foreground">
                    💡 OMAR MOSA
                  </CardTitle>
                  <div className="
                    bg-accent-yellow 
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
                  ">
                    YOUNG ENTREPRENEUR & INNOVATOR
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Video Container */}
              <div className="
                border-4 
                border-foreground 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                mb-6 
                bg-black
              ">
                <video 
                  controls 
                  className="w-full h-48 object-cover"
                  poster="/placeholder.svg"
                >
                  <source src="https://d2mp3ttz3u5gci.cloudfront.net/omar.MOV" type="video/quicktime" />
                  <source src="https://d2mp3ttz3u5gci.cloudfront.net/omar.MOV" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <p className="font-body text-base font-semibold mb-6 leading-relaxed">
                Omar learned how to come up with innovative ideas and created Omar Waters, the first subscription delivery service for bottled water in Tanta. Through our program, he discovered how to test the validity of his idea and assess market potential using AI while building his mobile app and getting ready to launch his business.
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
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
