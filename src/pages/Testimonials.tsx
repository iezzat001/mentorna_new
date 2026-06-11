import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Star, Play, X, ExternalLink } from 'lucide-react';

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
      <section className="bg-gradient-to-br from-[hsl(260,50%,75%)] via-[hsl(210,75%,70%)] to-[hsl(140,50%,60%)] border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="text-center">
            <Badge className="bg-foreground text-background font-bold uppercase px-3 py-1 text-xs mb-4">
              Helsinki XR Center · June 4, 2026
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-foreground mb-4">
              What People Say
            </h1>
            <p className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Real feedback from real founders and builders at the Vibe Coding 0→1 Workshop —
              co-organised with The AI Collective Finland.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-5 py-10">
        {/* Video Testimonial */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            🎬 Hear It From Our Participants
          </h2>

          <div
            className="cursor-pointer group relative"
            onClick={() => setVideoOpen(true)}
          >
            <div className="relative border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <img
                src={`${S3_BASE}/20260604_182905.JPEG`}
                alt="Video testimonial thumbnail"
                className="w-full object-cover group-hover:scale-[1.02] transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 rounded-full bg-[hsl(45,95%,65%)] border-4 border-[hsl(0,0%,15%)] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  <Play className="w-8 h-8 text-[hsl(0,0%,15%)] ml-1" />
                </div>
              </div>
            </div>
            <p className="text-center font-body italic text-[hsl(0,0%,15%)]/70 mt-4 text-lg">
              "I came here without an idea and I'm coming out with a solid idea."
            </p>
          </div>

          {videoOpen && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setVideoOpen(false)}
            >
              <button
                className="absolute top-6 right-6 text-white z-10"
                onClick={() => setVideoOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
              <div
                className="w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          )}
        </section>

        {/* Quote Cards */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            ⭐ Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`bg-white border-4 border-[hsl(0,0%,15%)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 ${
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
                <blockquote className="font-body text-lg font-semibold text-[hsl(0,0%,15%)] mb-4 leading-relaxed">
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
        <section className="mb-12">
          <div className="bg-[hsl(45,95%,65%)] border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '20+', label: 'Participants' },
                { value: '4h', label: 'Hands-On' },
                { value: '5/5', label: 'Avg Rating' },
                { value: '0→1', label: 'Idea to MVP' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-3xl md:text-4xl font-black text-[hsl(0,0%,15%)]">
                    {stat.value}
                  </div>
                  <div className="font-body font-semibold text-[hsl(0,0%,15%)]/70 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-6 pb-3 border-b-4 border-[hsl(0,0%,15%)] inline-block">
            📸 Workshop Moments
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {eventPhotos.map((photo, i) => (
              <div
                key={i}
                className="border-2 border-[hsl(0,0%,15%)] overflow-hidden cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                onClick={() => setLightboxSrc(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>

          {lightboxSrc && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxSrc(null)}
            >
              <button
                className="absolute top-6 right-6 text-white z-10"
                onClick={() => setLightboxSrc(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={lightboxSrc}
                alt="Enlarged"
                className="max-w-[90vw] max-h-[85vh] object-contain border-4 border-white"
              />
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-[hsl(0,0%,15%)] text-white border-4 border-[hsl(0,0%,15%)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-black uppercase mb-4">
              Ready to Build Your Startup?
            </h2>
            <p className="font-body text-lg text-white/80 mb-6 max-w-lg mx-auto">
              Join the next Vibe Coding workshop and go from idea to prototype
              in 4 hours.
            </p>
            <a href="mailto:ahmed.ezzat@mentorna.com">
              <Button className="bg-[hsl(45,95%,65%)] text-[hsl(0,0%,15%)] border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] font-black text-lg py-6 px-8 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                Get In Touch
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;