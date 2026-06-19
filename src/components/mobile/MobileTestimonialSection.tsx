import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const S3_BASE = 'https://mentorna-testimonials.s3.amazonaws.com/workshop-helsinki';
const videoUrl = `${S3_BASE}/video-testimonial.MP4`;

const MobileTestimonialSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-black">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${S3_BASE}/20260604_182905.JPEG`}
          alt="Workshop"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
      </div>

      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          Mentorna®
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-xs font-semibold uppercase tracking-wider">
            Testimonials
          </span>
        </div>
      </div>

      {/* Content Layout */}
      <div className="relative z-20 h-full flex flex-col justify-end p-4 pb-32">
        {/* Profile Section */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-yellow to-primary mr-3 flex items-center justify-center">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Workshop Feedback</div>
            <div className="text-white/70 text-xs">Helsinki XR Center · June 2026</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-accent-yellow text-accent-yellow"
              />
            ))}
            <span className="text-white/80 text-xs ml-2 font-semibold">5/5</span>
          </div>

          <h2 className="text-white text-xl font-bold leading-tight mb-3">
            Real founders. Real results.
          </h2>

          <p className="text-white/90 text-base leading-relaxed mb-4">
            "I came here without an idea and I'm coming out with a solid idea."
          </p>

          {/* Video play button */}
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 mb-6 active:scale-95 transition-transform touch-manipulation"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
            </div>
            <span className="text-white text-sm font-semibold">
              Watch video testimonial
            </span>
          </button>

          {/* CTA */}
          <Button
            onClick={() => navigate('/testimonials')}
            className="w-full bg-white text-black font-bold py-4 rounded-full active:scale-95 transition-transform touch-manipulation min-h-[48px] flex items-center justify-center gap-2"
          >
            See All Testimonials
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <div className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white bg-white/10 rounded-full p-2 z-10"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative w-full max-w-3xl max-h-[85vh] aspect-video"
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
    </div>
  );
};

export default MobileTestimonialSection;