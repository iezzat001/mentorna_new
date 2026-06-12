
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const S3_BASE = 'https://mentorna-testimonials.s3.amazonaws.com/workshop-helsinki';
const videoUrl = `${S3_BASE}/video-testimonial.MP4`;

const TestimonialHighlight = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="bg-[hsl(0,0%,98%)] border-b-4 border-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground leading-tight">
            Hear It From Real Participants
          </h2>
        </div>

        <div
          className="cursor-pointer group relative max-w-3xl mx-auto"
          onClick={() => setVideoOpen(true)}
        >
          <div className="relative border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-video">
            <img
              src={`${S3_BASE}/20260604_182905.JPEG`}
              alt="Workshop video testimonial"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[hsl(45,95%,65%)] border-4 border-[hsl(0,0%,15%)] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[hsl(0,0%,15%)] ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
          <p className="text-center font-body italic text-[hsl(0,0%,15%)]/70 mt-4 text-base md:text-lg px-2">
            "I came here without an idea and I'm coming out with a solid idea."
          </p>
        </div>

        <div className="text-center mt-8">
          <Link to="/testimonials">
            <Button className="bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm md:text-base py-4 md:py-5 px-6 md:px-7 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              See All Testimonials
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-8"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoUrl}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain bg-black rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialHighlight;