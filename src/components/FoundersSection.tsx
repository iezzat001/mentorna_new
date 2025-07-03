
import React from 'react';
import FounderCard from './FounderCard';
import { foundersData } from '@/data/foundersData';

const FoundersSection = () => {
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
          {foundersData.map((founder) => (
            <FounderCard key={founder.id} founder={founder} />
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
