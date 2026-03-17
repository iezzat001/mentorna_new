
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/lib/convex';
import FounderCard from './FounderCard';
import { normalizeSocialUrl } from '@/utils/socialLinks';

/** Shape returned by the Convex `founders.listActive` query. */
interface ConvexFounder {
  _id: string;
  name: string;
  title: string;
  shortBio: string;
  extendedBio: string;
  imageUrl: string;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  orderIndex: number;
  isActive: boolean;
}

const FoundersSection = () => {
  const founders = useQuery(api.founders.listActive) as ConvexFounder[] | undefined;

  // Convert Convex founder to the format expected by FounderCard
  const convertFounder = (founder: ConvexFounder) => ({
    id: parseInt(founder._id.slice(-8), 16) || 0, // Convex _id → numeric id for FounderCard compat
    name: founder.name,
    title: founder.title,
    shortBio: founder.shortBio,
    extendedBio: founder.extendedBio,
    image: founder.imageUrl,
    socialMedia: {
      linkedin: normalizeSocialUrl(founder.linkedinUrl ?? null, 'linkedin') ?? '',
      twitter: normalizeSocialUrl(founder.twitterUrl ?? null, 'twitter') ?? '',
      instagram: normalizeSocialUrl(founder.instagramUrl ?? null, 'instagram') ?? '',
      tiktok: normalizeSocialUrl(founder.tiktokUrl ?? null, 'tiktok') ?? ''
    }
  });

  return (
    <section className="bg-accent-purple border-b-4 border-foreground py-16 px-6" id="founders">
      <div className="container mx-auto max-w-5xl">
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
            MEET THE MENTORS
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
            FOUNDERS • OPERATORS • AI BUILDERS
          </div>
          <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg font-semibold text-foreground/80">
            You’re not buying theory. You’re working with mentors who build, ship, and help founders turn ideas into MVPs
            and first customers.
          </p>
        </div>

        {/* Mentors */}
        <div className="flex flex-col items-center gap-8 mb-12">
          {founders?.map((founder) => (
            <FounderCard key={founder._id} founder={convertFounder(founder)} />
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
            Founders trust us because we’ve shipped real products and built repeatable systems. The focus is execution:
            validate fast, build the MVP, launch, and get your first customers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
