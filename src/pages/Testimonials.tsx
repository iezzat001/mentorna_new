import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import ContactDialog from '@/components/ContactDialog';
import { Star, Play, X, ExternalLink, Mail } from 'lucide-react';

const S3_BASE = 'https://mentorna-testimonials.s3.amazonaws.com/workshop-helsinki';

const videoUrl = `${S3_BASE}/video-testimonial.MP4`;

const testimonials = [
  {
    id: 1,
    name: 'Matti Tuominen',
    role: '40-year workshop veteran',
    rating: 5,
    quote:
      'This was perhaps the most interesting workshop I have ever attended during the last 40 years.',
    source: 'Luma Review',
    highlight: true,
  },
  {
    id: 2,
    name: 'Rudransh Khurana',
    role: 'Pre-DP Student, SYK IB',
    rating: 5,
    quote:
      "Truly one of the most helpful and educational sessions I've ever attended. Most workshops involve a lot of theory with very little action.",
    source: 'Instagram DM',
    highlight: false,
  },
  {
    id: 3,
    name: 'Loan Cindy Tran',
    role: 'B2B Market Entry Specialist',
    rating: 5,
    quote:
      "I walked away with a live landing page ready to capture waitlist sign-ups. Getting that level of clarity and technical output in a single evening is invaluable.",
    source: 'LinkedIn',
    highlight: true,
  },
  {
    id: 4,
    name: 'Bambi Dang',
    role: 'Founder @ FunFox, AI Collective',
    rating: 5,
    quote:
      "Ahmed Ezzat dropped the best workshop on building startups! Hands down! A 4-hour workshop felt so short when there's so much juice.",
    source: 'LinkedIn',
    highlight: false,
  },
  {
    id: 5,
    name: 'Sneh Patel',
    role: 'Pre-IB Student, HSYK',
    rating: 5,
    quote:
      '5 high schoolers. No prior startup experience. One raw idea. The event provided practical insights into AI tools, vibe coding, and the process of turning an idea into a startup.',
    source: 'LinkedIn',
    highlight: false,
  },
  {
    id: 6,
    name: 'Lily',
    role: 'Workshop Participant',
    rating: 5,
    quote: 'Thank you very much for the amazing vibe coding session!',
    source: 'Direct Message',
    highlight: false,
  },
];

const eventPhotos = [
  { src: `${S3_BASE}/20260604_174214.JPEG`, alt: 'Workshop participants at Helsinki XR Center' },
  { src: `${S3_BASE}/20260604_182905.JPEG`, alt: 'Ahmed Ezzat presenting at the workshop' },
  { src: `${S3_BASE}/20260604_185329.JPEG`, alt: 'Participants building their prototypes' },
  { src: `${S3_BASE}/20260604_211945(0).JPEG`, alt: 'Workshop group session' },
  { src: `${S3_BASE}/2c5265ca-bdcc-44f4-99e9-a33a8cc8c9b9.JPG`, alt: 'Team Unprompted presenting' },
  { src: `${S3_BASE}/IMG_9530.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9531.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9533.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9535.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9557.jpg`, alt: 'Workshop moment' },
  { src: `${S3_BASE}/IMG_9558.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9559.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9702.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9710.jpg`, alt: 'LinkedIn post about workshop' },
  { src: `${S3_BASE}/IMG_9711.jpg`, alt: 'LinkedIn post about workshop' },
  { src: `${S3_BASE}/IMG_9712.jpg`, alt: 'LinkedIn post about workshop' },
  { src: `${S3_BASE}/IMG_9713.jpg`, alt: 'LinkedIn post about workshop' },
];

const Testimonials = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[hsl(0,0%,98%)] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[hsl(260,50%,75%)] via-[hsl(210,75%,70%)] to-[hsl(140,50%,60%)] border-b-4 border-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-foreground text-background font-bold uppercase px-3 py-1 text-xs mb-4">
              Helsinki XR Center · June 4, 2026
            </Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-foreground mb-4 leading-tight">
              What People Say
            </h1>
            <p className="font-body text-base md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Real feedback from real founders and builders at the Vibe Coding
              0→1 Workshop — co-organised with The AI Collective Finland.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Video Testimonial */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            🎬 Hear It From Our Participants
          </h2>

          <div
            className="cursor-pointer group relative"
            onClick={() => setVideoOpen(true)}
          >
            <div className="relative border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-video">
              <img
                src={`${S3_BASE}/20260604_182905.JPEG`}
                alt="Video testimonial thumbnail"
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

        {/* Quote Cards */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            ⭐ Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`bg-white border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 md:p-6 ${
                  t.highlight ? 'md:col-span-2' : ''
                } hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[hsl(45,95%,65%)] text-[hsl(0,0%,15%)]"
                    />
                  ))}
                </div>
                <blockquote className="font-body text-base md:text-lg font-semibold text-[hsl(0,0%,15%)] mb-4 leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-heading font-bold text-[hsl(0,0%,15%)]">
                      {t.name}
                    </p>
                    <p className="text-sm text-[hsl(0,0%,15%)]/60">{t.role}</p>
                  </div>
                  <Badge className="bg-[hsl(0,0%,15%)] text-white text-xs font-bold uppercase">
                    {t.source}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Stats */}
        <section className="mb-14 md:mb-20">
          <div className="bg-[hsl(45,95%,65%)] border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: '20+', label: 'Participants' },
                { value: '4h', label: 'Hands-On' },
                { value: '5/5', label: 'Avg Rating' },
                { value: '0→1', label: 'Idea to MVP' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-3xl md:text-5xl font-black text-[hsl(0,0%,15%)]">
                    {stat.value}
                  </div>
                  <div className="font-body font-semibold text-[hsl(0,0%,15%)]/70 text-sm md:text-base mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            📸 Workshop Moments
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {eventPhotos.map((photo, i) => (
              <div
                key={i}
                className="border-2 border-[hsl(0,0%,15%)] overflow-hidden cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all aspect-square"
                onClick={() => setLightboxSrc(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>

          {lightboxSrc && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
              onClick={() => setLightboxSrc(null)}
            >
              <button
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
                onClick={() => setLightboxSrc(null)}
                aria-label="Close"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <img
                src={lightboxSrc}
                alt="Enlarged"
                className="max-w-[92vw] max-h-[85vh] object-contain border-4 border-white rounded"
              />
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="bg-[hsl(0,0%,15%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-4">
              Ready to Build Your Startup?
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Join the next Vibe Coding workshop and go from idea to prototype
              in 4 hours.
            </p>
            <ContactDialog>
              <Button className="bg-[hsl(45,95%,65%)] text-[hsl(0,0%,15%)] border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] font-black text-base md:text-lg py-5 md:py-6 px-6 md:px-8 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all mb-8">
                Send a Message
                <Mail className="w-5 h-5 ml-2" />
              </Button>
            </ContactDialog>

            <div className="border-t-2 border-white/20 pt-6">
              <p className="font-body text-sm text-white/60 uppercase tracking-wider mb-4 font-bold">
                Follow the journey
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
                <a
                  href="https://www.tiktok.com/@ahmed.ezzat__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white font-bold text-sm md:text-base py-3 px-4 md:px-5 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white hover:text-[hsl(0,0%,15%)] transition-all"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.51a8.16 8.16 0 0 0 4.77 1.52V6.69a4.85 4.85 0 0 1-1.84 0z" />
                    </svg>
                    TikTok
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                  </Button>
                </a>
                <a
                  href="https://www.instagram.com/ahmed.ezzat.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white font-bold text-sm md:text-base py-3 px-4 md:px-5 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white hover:text-[hsl(0,0%,15%)] transition-all"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                    Instagram
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmedezzat001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white font-bold text-sm md:text-base py-3 px-4 md:px-5 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white hover:text-[hsl(0,0%,15%)] transition-all"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;