
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ProgramSection = () => {
  const weeks = [
    {
      week: 1,
      title: "The Entrepreneurial Mindset",
      description: "Learn to think like a founder and spot problems that become business ideas."
    },
    {
      week: 2,
      title: "From Idea to Digital Blueprint",
      description: "Turn ideas into clear plans using AI tools for brainstorming and structure."
    },
    {
      week: 3,
      title: "Build a Real App or Website",
      description: "Build a working app or website with drag-and-drop tools. No coding required."
    },
    {
      week: 4,
      title: "Talk to Customers",
      description: "Validate ideas by asking the right questions and listening to real feedback."
    },
    {
      week: 5,
      title: "Improve It with AI",
      description: "Enhance apps with smart design and features using AI tools."
    },
    {
      week: 6,
      title: "Test & Get Feedback",
      description: "Test products with real users and learn to iterate based on feedback."
    },
    {
      week: 7,
      title: "Pitch Like a CEO",
      description: "Master storytelling and confidence to present like a young entrepreneur."
    },
    {
      week: 8,
      title: "Launch Day",
      description: "Showcase products in a final demo and celebrate the journey from idea to business."
    }
  ];

  return (
    <section className="bg-background border-b-4 border-foreground py-16 px-6">
      <div className="container mx-auto max-w-4xl">
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
            TECH ENTREPRENEUR IN 8 WEEKS
          </h2>
          <div className="
            bg-primary 
            text-primary-foreground 
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
            WHAT YOUR TEEN WILL GET
          </div>
        </div>

        {/* Program Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {weeks.map((week) => (
            <AccordionItem
              key={week.week}
              value={`week-${week.week}`}
              className="
                border-4 
                border-foreground 
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                bg-white
                rounded-none
              "
            >
              <AccordionTrigger className="
                bg-accent-yellow 
                border-b-4 
                border-foreground 
                px-6 
                py-6 
                hover:no-underline
                hover:bg-accent-yellow/90
                transition-colors
                [&[data-state=open]]:bg-accent-yellow/90
              ">
                <div className="flex items-center gap-4 text-left">
                  <div className="
                    bg-foreground 
                    text-background 
                    font-black 
                    text-lg 
                    w-12 
                    h-12 
                    flex 
                    items-center 
                    justify-center 
                    border-2 
                    border-foreground
                  ">
                    {week.week}
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase text-foreground">
                      WEEK {week.week}: {week.title}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 py-6">
                <p className="font-body text-base font-semibold leading-relaxed text-foreground">
                  {week.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ProgramSection;
