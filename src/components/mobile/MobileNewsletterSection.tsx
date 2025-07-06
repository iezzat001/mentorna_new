import React from 'react';
import SimpleNewsletterForm from '../SimpleNewsletterForm';

const MobileNewsletterSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-6rem)] justify-center px-4 max-w-sm mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h2 className="text-white text-3xl font-black uppercase mb-3 leading-tight">
            Join the AI
            <span className="block text-accent-yellow">Revolution</span>
          </h2>
          <p className="text-white/80 text-base font-medium leading-relaxed">
            Get exclusive updates and early access to our programs
          </p>
        </div>

        {/* Benefits - Simplified */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-center text-white/90 text-sm font-medium">
            <span className="text-accent-green mr-3 text-base">✓</span>
            <span>Weekly AI insights</span>
          </div>
          <div className="flex items-center justify-center text-white/90 text-sm font-medium">
            <span className="text-accent-green mr-3 text-base">✓</span>
            <span>Free webinar access</span>
          </div>
          <div className="flex items-center justify-center text-white/90 text-sm font-medium">
            <span className="text-accent-green mr-3 text-base">✓</span>
            <span>Priority program notifications</span>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="mb-6">
          <SimpleNewsletterForm />
        </div>

        {/* Simple privacy note */}
        <p className="text-white/50 text-xs leading-relaxed">
          No spam. Unsubscribe anytime. 🔒
        </p>
      </div>

      {/* End indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-1 h-6 bg-white/30 rounded-full" />
        <span className="text-white/50 text-xs mt-1">End</span>
      </div>
    </div>
  );
};

export default MobileNewsletterSection;